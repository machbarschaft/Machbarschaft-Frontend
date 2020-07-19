import React from 'react';
import { Space, Steps, Result, Spin } from 'antd';
import AuthenticationContext from '../../contexts/authentication';
import {
  postAddress,
  postPlaceRequest,
  putPlaceRequest,
  putPublishRequest,
} from '../../utils/api/placeRequestApi';
import { putConfirmTan } from '../../utils/api/phoneApi';

const queryString = require('query-string');

const { Step } = Steps;

const PlaceRequestWizardAddress = React.lazy(() =>
  import('./wizard/place-request-wizard-address')
);
const PlaceRequestWizardCategory = React.lazy(() =>
  import('./wizard/place-request-wizard-category')
);
const PlaceRequestWizardFinish = React.lazy(() =>
  import('./wizard/place-request-wizard-finish')
);
const PlaceRequestWizardName = React.lazy(() =>
  import('./wizard/place-request-wizard-name')
);
const PlaceRequestWizardTan = React.lazy(() =>
  import('./wizard/place-request-wizard-tan')
);
const PlaceRequestWizardUrgency = React.lazy(() =>
  import('./wizard/place-request-wizard-urgency')
);
const PlaceRequestWizardSummary = React.lazy(() =>
  import('./wizard/place-request-wizard-summary')
);

function PlaceRequestReducer(state, action) {
  switch (action.type) {
    case 'loaded':
      return {
        ...state,
        isLoading: false,
      };
    case 'validating':
      return {
        ...state,
        isValidating: true,
        hasError: false,
        errorMsg: '',
      };
    case 'error':
      return {
        ...state,
        isValidating: false,
        hasError: true,
        errorMsg: action.data,
      };
    case 'nextPage':
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    case 'prevPage':
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    default:
      throw new Error('Unsupported Type');
  }
}

export default function PlaceRequestWindow(props) {
  const { phoneNumber, countryCode } = queryString.parse(props.location.search);

  const [wizardState, dispatch] = React.useReducer(PlaceRequestReducer, {
    currentStep: 0,
    formData: [],
    isValidating: false,
    isLoading: true,
    hasError: false,
    errorMsg: '',
  });

  const processID = React.useRef(null);
  const phoneVerified = React.useRef(false);
  const phoneVerifiedInitial = React.useRef(false);
  const formData = React.useRef({});

  const authenticationContext = React.useContext(AuthenticationContext);

  React.useEffect(() => {
    const isAuthenticated = authenticationContext.isAuthenticated();

    const formValues = {};
    if (isAuthenticated) {
      formValues.phoneNumber =
        authenticationContext.authenticationState.phoneNumber;
    } else if (typeof phoneNumber !== 'undefined') {
      formValues.phoneNumber = phoneNumber;
    } else {
      // ToDo: Throw Error
    }
    if (isAuthenticated) {
      formValues.countryCode =
        authenticationContext.authenticationState.countryCode;
    } else if (typeof countryCode !== 'undefined') {
      formValues.countryCode = countryCode;
    } else {
      // ToDo: Throw Error
    }
    if(isAuthenticated) phoneVerifiedInitial.current = true;

    postPlaceRequest({ formValues, isAuthenticated })
      .then((res) => {
        processID.current = res._id;

        // Pre-Fill
        if (
          typeof res.forename !== 'undefined' &&
          typeof res.surname !== 'undefined'
        ) {
          formData.current['place-request-wizard-name'] = {
            forename: res.forename,
            surname: res.surname,
          };
        } else if (authenticationContext.isAuthenticated()) {
          formData.current['place-request-wizard-name'] = {
            forename:
              authenticationContext.authenticationState.profile.forename,
            surname: authenticationContext.authenticationState.profile.surname,
          };
        }

        formData.current['place-request-wizard-address'] = {
          street: res.address.street,
          houseNumber: res.address.houseNumber,
          zipCode: res.address.zipCode,
          city: res.address.city,
        };
        formData.current['place-request-wizard-category'] = {
          requestType: res.requestType,
          carNecessary: res.extras.carNecessary,
          prescriptionRequired: res.extras.prescriptionRequired,
        };
        formData.current['place-request-wizard-urgency'] = {
          urgency: res.urgency,
        };

        if (
          typeof res.phoneVerifiedCookieMatch !== 'undefined' &&
          res.phoneVerifiedCookieMatch === true
        ) {
          phoneVerified.current = true;
          phoneVerifiedInitial.current = true;
        }

        dispatch({
          type: 'loaded',
        });
      })
      .catch((error) => {
        dispatch({
          type: 'error',
          data: error.toString(), // ToDo: Pretty Print
        });
      });
  }, []);

  const handleNextPage = (formName, formValues) => {
    formData.current[formName] = formValues;

    dispatch({
      type: 'validating',
    });

    // ToDo: Improve Handling
    if (authenticationContext.isAuthenticated() || phoneVerifiedInitial.current) {
      wizardSteps = wizardSteps.filter((item) => item.title !== 'Identität');
    }

    wizardSteps[wizardState.currentStep]
      .handleBackend(formValues)
      .then((result) => {
        if(formName == "place-request-wizard-tan") phoneVerified.current = true;
        dispatch({
          type: 'nextPage',
        });
      })
      .catch((error) => {
        dispatch({
          type: 'error',
          data: `${error}`,
        });
      });
  };

  const handlePreviousPage = () => {
    dispatch({
      type: 'prevPage',
    });
  };

  const handleUpdateRequest = async (formValues) => {
    await putPlaceRequest({
      processID: processID.current,
      phoneNumber,
      countryCode,
      formValues,
      isAuthenticated: authenticationContext.isAuthenticated(),
    });
  };

  const handleAddressCreateRequest = async (formValues) => {
    try {
      const addressId = await postAddress(formValues);
      return addressId;
    } catch (error) {
      throw error;
    }
  };

  const handlePublish = async () => {
    await putPublishRequest({
      processID: processID.current,
      phoneNumber,
      countryCode,
      isAuthenticated: authenticationContext.isAuthenticated(),
    });
  };

  let wizardSteps = [
    {
      title: 'Name',
      content: (
        <PlaceRequestWizardName
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          wizardState={wizardState}
          formData={formData}
        />
      ),
      handleBackend: async (formValues) => {
        await handleUpdateRequest(formValues);
      },
    },
    {
      title: 'Adresse',
      content: (
        <PlaceRequestWizardAddress
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          wizardState={wizardState}
          formData={formData}
        />
      ),
      handleBackend: async (formValues) => {
        const addressId = await handleAddressCreateRequest(formValues);
        await handleUpdateRequest({ addressId: addressId });
      },
    },
    {
      title: 'Kategorie',
      content: (
        <PlaceRequestWizardCategory
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          wizardState={wizardState}
          formData={formData}
        />
      ),
      handleBackend: async (formValues) => {
        await handleUpdateRequest(formValues);
      },
    },
    {
      title: 'Dringlichkeit',
      content: (
        <PlaceRequestWizardUrgency
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          wizardState={wizardState}
          formData={formData}
        />
      ),
      handleBackend: async (formValues) => {
        await handleUpdateRequest(formValues);
      },
    },
    {
      title: 'Identität',
      content: (
        <PlaceRequestWizardTan
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          wizardState={wizardState}
          formData={formData}
          phoneNumber={phoneNumber}
          countryCode={countryCode}
          isVerified={authenticationContext.isAuthenticated() || phoneVerified.current}
        />
      ),
      handleBackend: async (formValues) => {
        if(formValues.tanDone == "true") return;
        await putConfirmTan({
          phone: phoneNumber,
          countryCode: countryCode,
          tan: formValues.code,
        });
      },
    },
    {
      title: 'Übersicht',
      content: (
        <PlaceRequestWizardSummary
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          wizardState={wizardState}
          formData={formData}
          phoneNumber={phoneNumber}
          countryCode={countryCode}
        />
      ),
      handleBackend: async (formValues) => {
        await handlePublish();
      },
    },
    {
      title: 'Fertig',
      content: (
        <PlaceRequestWizardFinish
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          wizardState={wizardState}
          formData={formData}
          phoneNumber={phoneNumber}
          countryCode={countryCode}
        />
      ),
      handleBackend: async (formValues) => {},
    },
  ];

  if (wizardState.isLoading) {
    return <Result icon={<Spin size="large" />} />;
  }

  return (
    <Space
      direction="vertical"
      size="large"
      className="content-container-default"
    >
      <Steps current={wizardState.currentStep}>
        {wizardSteps
          .filter((wizardItem) => {
            if (
              wizardItem.title === 'Identität' &&
              (phoneVerifiedInitial.current)
            ) {
              return false;
            }
            return true;
          })
          .map((wizardItem) => (
            <Step key={wizardItem.title} title={wizardItem.title} />
          ))}
      </Steps>
      <div className="steps-content">
        {
          wizardSteps.filter((wizardItem) => {
            return !(
              wizardItem.title === 'Identität' &&
              (phoneVerifiedInitial.current)
            );
          })[wizardState.currentStep].content
        }
      </div>
    </Space>
  );
}

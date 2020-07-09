import React from 'react';
import { Space, Steps } from 'antd';
import AuthenticationContext from '../../contexts/authentication';
import {
  postAddress,
  postPlaceRequest,
  putPlaceRequest,
  putPublishRequest,
} from '../../utils/api/placeRequestApi';

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
    case 'validating':
      return {
        ...state,
        isValidating: true,
        hasError: false,
        errorMsg: '',
        formData: {
          [action.data.formName]: action.data.formValues,
        },
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
  const { phoneNumber } = queryString.parse(props.location.search);

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

    postPlaceRequest({ formValues, isAuthenticated })
      .then((res) => {
        processID.current = res._id;
        if (
          typeof res.phoneVerifiedCookieMatch !== 'undefined' &&
          res.phoneVerifiedCookieMatch === true
        ) {
          phoneVerified.current = true;
        }
      })
      .catch((error) => {
        dispatch({
          type: 'error',
          data: error.toString(), // ToDo: Pretty Print
        });
      });
  }, []);

  const handleNextPage = (formName, formValues) => {
    dispatch({
      type: 'validating',
      data: {
        formName,
        formValues,
      },
    });

    // ToDo: Improve Handling
    if (authenticationContext.isAuthenticated() || phoneVerified.current) {
      wizardSteps = wizardSteps.filter((item) => item.title !== 'Identität');
    }

    wizardSteps[wizardState.currentStep]
      .handleBackend(formValues)
      .then((result) => {
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
      formValues,
      isAuthenticated: authenticationContext.isAuthenticated(),
    });
  };

  const handleAddressCreateRequest = async (formValues) => {
    postAddress(formValues)
      .then((addressId) => {
        return addressId;
      })
      .catch((error) => {
        throw error;
      });
  };

  const handlePublish = async () => {
    await putPublishRequest({
      processID: processID.current,
      phoneNumber,
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
        />
      ),
      handleBackend: async (formValues) => {},
    },
    {
      title: 'Übersicht',
      content: (
        <PlaceRequestWizardSummary
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          wizardState={wizardState}
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
        />
      ),
      handleBackend: async (formValues) => {},
    },
  ];

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
              (authenticationContext.isAuthenticated() || phoneVerified.current)
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
              (authenticationContext.isAuthenticated() || phoneVerified.current)
            );
          })[wizardState.currentStep].content
        }
      </div>
    </Space>
  );
}

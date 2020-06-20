import React from 'react';
import ReactDOM from 'react-dom';
import {useLocation} from "react-router-dom";
import {Steps, Space, Divider, Button} from "antd";

const queryString = require("query-string");

const {Step} = Steps;

const PlaceRequestWizardAddress = React.lazy(() => import("./wizard/place-request-wizard-address"));
const PlaceRequestWizardCategory = React.lazy(() => import("./wizard/place-request-wizard-category"));
const PlaceRequestWizardFinish = React.lazy(() => import("./wizard/place-request-wizard-finish"));
const PlaceRequestWizardName = React.lazy(() => import("./wizard/place-request-wizard-name"));
const PlaceRequestWizardTan = React.lazy(() => import("./wizard/place-request-wizard-tan"));
const PlaceRequestWizardUrgency = React.lazy(() => import("./wizard/place-request-wizard-urgency"));
const PlaceRequestWizardSummary = React.lazy(() => import("./wizard/place-request-wizard-summary"));

function PlaceRequestReducer(state, action) {
    switch (action.type) {
        case "validating":
            return {
                ...state,
                isValidating: true,
                hasError: false,
                errorMsg: "",
                formData: {
                    [action.data.formName]: action.data.formValues
                }
            }
        case "error":
            return {
                ...state,
                isValidating: false,
                hasError: true,
                errorMsg: action.data
            }
        case "nextPage":
            return {
                ...state,
                currentStep: state.currentStep + 1
            }
        case "prevPage":
            return {
                ...state,
                currentStep: state.currentStep - 1
            }
        default:
            throw new Error("Unsupported Type");
    }
}

function PlaceRequestWindow() {
    const [wizardState, dispatch] = React.useReducer(PlaceRequestReducer, {
        currentStep: 0,
        formData: [],
        isValidating: false,
        hasError: false,
        errorMsg: "",
    });

    React.useState(() => {
        // ToDo: Depending on authentication
    }, [])

    const handleNextPage = (formName, formValues) => {
        dispatch({
            type: "validating",
            data: {
                formName: formName,
                formValues: formValues
            }

        })
        wizardSteps[wizardState.currentStep].handleBackend(formValues).then((result) => {
            dispatch({
                type: "nextPage"
            });
            /*dispatch({
                type: "error",
                data: "Es ist ein Fehler aufgetreten."
            })*/
        });
    }

    const handlePreviousPage = () => {
        dispatch({
            type: "prevPage"
        });
    }

    const handlePublish = () => {

    }

    const wizardSteps = [
        {
            title: 'Name',
            content: <PlaceRequestWizardName handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} wizardState={wizardState}/>,
            handleBackend: async (formValues) => {
            }
        },
        {
            title: 'Addresse',
            content: <PlaceRequestWizardAddress handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} wizardState={wizardState}/>,
            handleBackend: async (formValues) => {
            }
        },
        {
            title: 'Kategorie',
            content: <PlaceRequestWizardCategory handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} wizardState={wizardState}/>,
            handleBackend: async (formValues) => {
            }
        },
        {
            title: 'Dringlichkeit',
            content: <PlaceRequestWizardUrgency handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} wizardState={wizardState}/>,
            handleBackend: async (formValues) => {
            }
        },
        {
            title: 'Identität',
            content: <PlaceRequestWizardTan handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} wizardState={wizardState}/>,
            handleBackend: async (formValues) => {
            }
        },
        {
            title: 'Übersicht',
            content: <PlaceRequestWizardSummary handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} wizardState={wizardState}/>,
            handleBackend: async (formValues) => {
            }
        },
        {
            title: 'Fertig',
            content: <PlaceRequestWizardFinish handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} wizardState={wizardState}/>,
            handleBackend: async (formValues) => {
            }
        }
    ]

    return (
        <Space direction="vertical" size="large" className="content-container-default">
            <Steps current={wizardState.currentStep}>
                {wizardSteps.map(wizardItem => (
                    <Step key={wizardItem.title} title={wizardItem.title}/>
                ))}
            </Steps>
            <div className="steps-content">
                {wizardSteps[wizardState.currentStep].content}
            </div>
        </Space>
    );
}

export default PlaceRequestWindow;
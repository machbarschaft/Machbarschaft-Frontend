import React from "react"
import {Result, Row, Col, Typography, Input, Button, Radio, Space, Form} from 'antd';
import PropTypes from "prop-types";
import PlaceRequestWizardNavigation from "./place-request-wizard-navigation";
import {NavLink} from "react-router-dom";

const {Title} = Typography;
/**
 * Optional component of seek help wizard. Used, if user account has been found.
 * @returns {*}
 * @constructor
 */
export default function PlaceRequestWizardFinish({handlePreviousPage, handleNextPage, wizardState}) {
    //const authenticationContext = React.useContext(AuthenticationContext);

    return (
        <Result
            status={"success"}
            title={"Ihre Anfrage wurde entgegengenommen."}
            subTitle={"Unser Netzwerk aus freiwilligen Helferinnen und Helfern wurde benachrichtigt. Sie erhalten in Kürze eine Rückmeldung."}
            extra={[
                <Title level={4}>Erstellen Sie jetzt ein Benutzerkonto!</Title>,
                <NavLink to={"/"}><Button>Zurück zur Startseite</Button></NavLink>
            ]}
        />
    )
}

PlaceRequestWizardFinish.propTypes = {
    handleNextPage: PropTypes.func.isRequired,
    handlePreviousPage: PropTypes.func.isRequired,
    wizardState: PropTypes.object.isRequired
}
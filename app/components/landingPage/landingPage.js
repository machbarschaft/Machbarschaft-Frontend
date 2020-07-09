import React from 'react';
import WelcomeSection from './welcomeSection.js';
import AuthenticationContext from "../../contexts/authentication";

export default function LandingPage() {
    const authProps = React.useContext(AuthenticationContext);

    return (
        <WelcomeSection/>
    )
}
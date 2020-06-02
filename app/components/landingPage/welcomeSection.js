import React from 'react'
import {Input, Button} from 'antd';
import {PhoneOutlined} from '@ant-design/icons';

export default function WelcomeSection() {
    return (
        <div className="landing-page-container content-container-default">
            <h1>MACHBARSCHAFT</h1>
            <div className="landing-page-split-element">
                <div>
                    MACHBARSCHAFT ist eine Nachbarschaftshilfe für Menschen ohne Internetzugang oder Internetkompetenz.<br /><br />
                    Mehr als 10 Mio. Menschen in Deutschland sind über 60, vom Virus besonders gefährdet und hilfsbedürftig - aber ohne Internet.<br /><br />
                    Wir entwickeln eine Lösung, die für alle erreichbar ist: Einen technologie-gestützten Telefonservice, bei dem ältere Nachbar:innen ihre Anfragen für Einkäufe abgeben können. Zusammen mit einer App, in der freiwillige Helfer:innen Anfragen in der Nähe annehmen können.<br /><br />
                    Mit unserer technologischen Plattform und künstlicher Intelligenz können wir schnell, sicher und skalierbar Hilfe zur Hilfe leisten.
                </div>
                <div style={{textAlign: 'center'}}>
                    <Input size="large" placeholder="Ihre Telefonnummer" prefix={<PhoneOutlined />} /><br /><br /><br />
                    <Button type="primary">Hilfe anfordern</Button>
                </div>
            </div>
        </div>
    );
}
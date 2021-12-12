import React from 'react';
import { Col, Row } from 'antd';
import { NavLink } from 'react-router-dom';

export default function WelcomeComponent() {
  return (
    <div className="welcome-section-container content-container-default">
      <Row type="flex" style={{ alignItems: 'center' }}>
        <Col xs={{ span: 24 }} xxl={{ span: 12 }}>
          <div style={{ fontSize: '18px' }}>
            <h1>Machbarschaft</h1>
            Machbarschaft ist eine Nachbarschaftshilfe für Menschen ohne
            Internetzugang oder Internetkompetenz.
            <br />
            <br />
            Mehr als 10 Mio. Menschen in Deutschland sind über 60, vom Virus
            besonders gefährdet und hilfsbedürftig - aber ohne Internet.
            <br />
            <br />
            Wir entwickeln eine Lösung, die für alle erreichbar ist: Einen
            technologie-gestützten Telefonservice, bei dem ältere Nachbar:innen
            ihre Anfragen für Einkäufe abgeben können. Zusammen mit einer App,
            in der freiwillige Helfer:innen Anfragen in der Nähe annehmen
            können.
            <br />
            <br />
            Mit unserer technologischen Plattform und künstlicher Intelligenz
            können wir schnell, sicher und skalierbar Hilfe zur Hilfe leisten.
          </div>
        </Col>
        <Col xs={{ span: 24 }} xxl={{ span: 12 }}>
          <NavLink className="register-button" to="/registrieren" exact>
            Registrieren
          </NavLink>
        </Col>
      </Row>
    </div>
  );
}

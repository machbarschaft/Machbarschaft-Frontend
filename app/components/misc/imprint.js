import React from 'react';
import { Typography } from 'antd';
const { Title } = Typography;

export default function ImprintWindow() {
  return (
    <div className={'overflow-scroll content-container-default'}>
      <div className={'imprint-text'}>
        <Title level={2}>Impressum</Title>
        <div>
          MACHBARSCHAFT ist ein gemeinnütziges Projekt aus dem Hackathon der
          Bundesregierung #WirvsVirus vom 20.03.- 22.03.2020
        </div>
        <br />
        <br />
        <div>
          E-Mail: kontakt[at]machbarschaft.jetzt
          <br />
          Für Presseanfragen: presse[at]machbarschaft.jetzt
        </div>
        <br />
        <br />
        <div>
          Inhaltlich Verantwortlicher gemäß § 55 Abs. 2 RStV:
          <br />
          Machbarschaft e.V.
          <br />
          Herkulesstraße 95
          <br />
          34119 Kassel
          <br /><br />
          Vertretungsberechtigter Vorstand: Manuela Greipel, Alexander Hodes, Niklas Schöllhorn
        </div>
        <br />
        <br />
        <div>
          Datenschutz ist uns ein wichtiges Anliegen. Hierbei werden wir in
          naher Zukunft durch eine externe Datenschutzbeauftragte unterstützt.
          Die EU-Website zur Online-Streitbeilegung findest du hier:
          http://ec.europa.eu/consumers/odr/.
        </div>
        <br />
        <br />
        <div>
          Wenn du Sicherheitsprobleme auf machbarschaft.jetzt entdeckst, schick
          uns eine Nachricht an security[at]machbarschaft.jetzt. Wir weisen
          darauf hin, dass wir nicht bereit und nicht verpflichtet sind, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </div>
      </div>
    </div>
  );
}

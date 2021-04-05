import React from 'react';
import { Typography } from 'antd';
import WelcomeComponent from '../../components/landingPage/welcome-component';
import WirVsVirus from '../../assets/img/landingpage/wirvsvirus_logo.jpg';
import GrafikFive from '../../assets/img/landingpage/Grafik_5.png';
import VerhaltensEmpfehlungenPdf from '../../assets/documents/Verhaltensempfehlungen_für_MACHBAR_EINKAUF.pdf';
import FlyerPdf from '../../assets/documents/Flyer_für_Hilfesuchende.pdf';

const { Title } = Typography;

export default function LandingPage() {
  return (
    <div className="overflow-scroll">
      <WelcomeComponent />
      <div className="landing-page-container">
        <div className="landingpage-spacing" />
        <div className="landingpage-element">
          <img src={WirVsVirus} className="landingpage-wirvsvirus" alt="" />
        </div>
        <div className="landingpage-text landingpage-element">
          Wir sind 1 von 20 ausgewählten Projekten aus insgesamt 1.500
          eingereichten Projekten des #WirVsVirus Hackathons der Bundesregierung
          und arbeiten an der Umsetzung.
        </div>
        <div className="landingpage-divider landingpage-element" />
        <Title
          level={2}
          className="landingpage-element landingpage-text text-align-center"
        >
          Mach mit uns deine Nachbarschaften zu Machbarschaften.
        </Title>
        <div className="landingpage-two-section landingpage-element landingpage-text">
          <img
            src={GrafikFive}
            className="landingpage-two-section-image"
            alt=""
          />
          <div className="landingpage-two-section-text">
            Deine Daten werden an unsere Datenbank übertragen und dein Auftrag
            kommt bereits real in unserer App an. Wird dein Auftrag nicht
            angenommen, erhältst du nach 24 Stunden einen Anruf, dass dein
            Auftrag noch nicht bearbeitet werden konnte, du aber den Auftrag
            verlängern kannst. Beide Sequenzen kannst du testen, indem du am
            Anfang des Anrufes zwischen beiden auswählen kannst (damit du nicht
            24 Stunden auf deinen Rückruf warten musst).
          </div>
        </div>
        <Title
          level={1}
          className="landingpage-element landingpage-text text-align-center headline-red"
        >
          Ältere Menschen sind aktuell besonders gefährdet und hilfebedürftig,
          haben oft jedoch keinen Zugang zu digitalen Nachbarschaftshilfen.
        </Title>
        <div className="landingpage-text landingpage-element text-align-center">
          Ein Anruf bei Machbarschaft hilft bereits.
        </div>
        <div className="landingpage-two-section landingpage-element landingpage-text">
          <div className="landingpage-two-section-text">
            <a
              href={VerhaltensEmpfehlungenPdf}
              target="_blank"
              rel="noreferrer"
              className="landingpage-download-button"
            >
              Empfehlung herunterladen
            </a>
            <br />
            <br />
            Unsere Hilfesuchenden tätigen einen einfachen Telefonanruf über
            unsere kostenfreie Hotline und Ihre Anliegen werden über Systeme
            künstlicher Intelligenz verarbeitet und schließlich an unsere
            MACHBAR:INNEN als Auftrag auf der Webapp oder in der mobilen App
            angezeigt. Ganz ohne persönlichen Kontakt!
          </div>
          <div className="landingpage-two-section-text">
            <a
              href={FlyerPdf}
              target="_blank"
              rel="noreferrer"
              className="landingpage-download-button"
            >
              Flyer herunterladen
            </a>
            <br />
            <br />
            Damit du als MACHBAR:IN und Helfer:in bestmöglichvor Infektion
            geschützt bist, haben wir bereits detaillierte Verhaltensregeln, die
            den RKI-Vorgaben entsprechen, für dich und unsere Hilfesuchenden
            entwickelt. So sind alle geschützt!
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

import React from 'react';
import { Typography } from 'antd';
const { Title } = Typography;

export default function FAQ() {
  return (
    <div className={'overflow-scroll content-container-default'}>
      <div className={'imprint-text'}>
        <Title level={2}>FAQ</Title>
        <br/><br/>
        <Title level={3}>Wie funktioniert Machbarschaft für MACHBAR:INNEN genau?</Title>
        <div>
          Auf der Karte unserer kostenfreien Webapp und mobilen App “Machbarschaft” kannst du dich orientieren, wer in deiner Umgebung Hilfe braucht.<br/>
          Klicke auf den Auftrag und du kannst Details über die Art der Anfrage einsehen. Sobald du dich entschieden hast, den Auftrag anzunehmen, wird die Telefonnummer des oder der Hilfesuchenden angezeigt. Rufe die Person an und kläre den genauen Bedarf, den Zeitrahmen und die Bezahlmethode. Gib uns Bescheid, sobald du unterwegs bist, und die hilfesuchende Person wird automatisch von uns darüber informiert.<br/>
          Auf geht's - Wir freuen uns auf Ihr Feedback!
        </div>
        <br/><br/>
        <Title level={3}>Wie funktioniert die Warenübergabe und die Bezahlung?</Title>
        <div>
          Generell handelt es sich um eine kostenfreie Dienstleistung, die auf deinem ehrenamtlichen Engagement basiert. Die Einkaufsliste solltest du vorher telefonisch mit den Hilfesuchenden absprechen. Darüberhinaus kannst du auch die Bezahlung individuell arrangieren (Bezahlung im Voraus oder erst nach deiner Hilfeleistung? In Bar oder andere Bezahlmethode?). Um volle Transparenz zu gewährleisten, bitten wir dich darum, den Kassenzettel aufzubewahren. Bei der Übergabe der Ware sowie bei der Bezahlung gilt, Körperkontakt bitte zu vermeiden! Halte den Mindestabstand von 1m bis 2m ein, indem du deine Einkäufe an der Wohnungstür abstellst. Das Bargeld soll dir in einem Briefumschlag o.Ä. ebenfalls vor die Wohnungstür gelegt werden. So werden beide Seiten bestmöglich geschützt.<br/>
          Hier kannst du unsere Verhaltensempfehlungen Schritt für Schritt nachlesen
        </div>
        <br/><br/>
        <Title level={3}>Wann sind die Besorgungen zu tätigen?</Title>
        <div>
          Den genauen zeitlichen Rahmen legst du telefonisch mit der zu unterstützenden Person fest.
        </div>
        <br/><br/>
        <Title level={3}>Was mache ich, wenn ich die Person telefonisch nicht erreiche?</Title>
        <div>
          Es kann durchaus vorkommen, dass die Person kurzfristig telefonisch nicht erreichbar ist. Wir bitten dich hier, es noch ein weiteres Mal zu versuchen. Falls es wieder nicht klappt, kannst du die Anfrage gerne ablehnen, sodass sie wieder in den Anfragenpool aufgenommen wird.
        </div>
        <br/><br/>
        <Title level={3}>Zielgruppe/Persona:</Title>
        <div>
          "Machbarschaft" wurde aus gegebenem Anlass – der Corona Krise – ins Leben gerufen. Wir möchten Menschen miteinander verbinden, Solidarität groß schreiben und vor allem da Hilfe leisten, wo sie dringend benötigt wird.<br/>
          Das Machbarschaftsangebot richtet sich an Menschen, welche aufgrund von COVID-19 stärkeren Einschränkungen unterliegen als die Allgemeinheit und nicht auf weitreichende soziale Kontakte zurückgreifen können, die Einkäufe sowie Apothekengänge o.Ä. moment erledigen können. Hierzu zählen vor allem ältere Menschen sowie Menschen mit Vorerkrankungen.<br/>
          Wir möchten Menschen, die altersbedingt oder aus gesundheitlichen Gründen einer Risikogruppe angehören, mit Menschen verbinden, die sie in dieser Zeit freiwillig unterstützen und so zu ihrem Schutz beitragen.
        </div>
        <br/><br/>
        <Title level={3}>Unsere Richtlinien basieren auf folgenden Werten:</Title>
        <div>
          Schutz – Es ist unser oberstes Ziel, die Ausbreitung des COVID-19-Virus zu verlangsamen und Risikogruppen zu schützen. Bei Übergabe der Besorgungen solltest du mindestens 1 - 2 m Abstand halten, indem die Besorungen vor der Wohnungstür abgestellt werden. Für die Bezahlung in bar wird das passende Bargeld beispielsweise in einem Briefumschlag vor die Wohnungstür gelegt.<br/>
          Verbindlichkeit – Zugesagte Erledigungen werden nach bestem Wissen und Gewissen sowie im abgesprochenen zeitlichen Rahmen erledigt.<br/>
          Vertrauen – Um die Hilfesuchenden bestmöglich zu schützen, führen wir eine individuelle Identitätsprüfung durch. Bewahre zudem den Rechnungsbeleg der getätigten Einkäufe für Transparanezerhaltung auf.<br/>
          Diskretion – Mit Ihren persönlichen Daten gehen wir verantwortungsvoll um und schützen die Privatsphäre der Helfenden und Hilfesuchenden.<br/>
          Ehrenamtliches & nachbarschaftliches Engagement – Für die erbrachte Dienstleistung wird kein Entgelt verlangt. Wir bitten um einen sorgsamen Umgang miteinander. Besonders in einer Ausnahmesituation wie dieser ist unsere Gesellschaft darauf angewiesen, dass alle bestmöglichst zusammenhalten.
        </div>
        <br/><br/>
      </div>
    </div>
  );
}

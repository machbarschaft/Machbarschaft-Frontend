import React from 'react';
import ReactDOM from 'react-dom';
import {Typography} from 'antd';
const {Text} = Typography;

export default function ResetPasswordUsernameRightCard() {
    return (
        <>
            Bitte geben Sie Ihre E-Mail Adresse oder Telefonnummer in das Eingabefeld ein und
            klicken Sie dann auf <Text strong>Anfrage abschicken</Text>.<br /><br />
            Im nächsten Schritt müssen Sie einen Sicherheitscode eingeben.<br />
            Wenn Sie Ihre E-Mail Adresse eingeben, wird eine E-Mail mit diesem Code an Sie gesendet.<br />
            Bei Eingabe einer Telefonnummer wird Sie unser
            automatischer Telefonservice umgehend anrufen und den Sicherheitscode mitteilen.<br />
            Sobald Sie den Code eingegeben haben, können Sie ein neues Passwort setzen.
        </>
    );
}

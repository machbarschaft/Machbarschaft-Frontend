import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ResetPasswordFinalStep() {
  return (
    <div style={{width: '100%'}}>
      <h5 style={{fontSize: '19px'}}>An die angegebene Email Adresse wurde ein Link zum zurücksetzen deines Passwortes geschickt.</h5>
      <NavLink className="register-button" to="/login" exact>
        Login
      </NavLink>
    </div>
  );
}

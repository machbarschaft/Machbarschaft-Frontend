import React from 'react';

const AuthenticationContext = React.createContext();

/**
 * AuthenticationContext is used to induce information about the current authentication status into the component tree.
 * Use with 'const authProps = React.useContext(AuthenticationContext);'
 */
export default AuthenticationContext;

export const AuthenticationProvider = AuthenticationContext.Provider;
export const AuthenticationConsumer = AuthenticationContext.Consumer;

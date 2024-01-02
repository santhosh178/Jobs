import React from "react";
import AuthState from './UserAuthentication/Context/AuthContext/authState';
import AppNavigator from './UserAuthentication/Views/Navigation/appNavigator';


function App() {
    return (
        <AuthState>
            <AppNavigator />
        </AuthState>
    )
};

export default App;
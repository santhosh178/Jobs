import React, { useEffect, useState } from "react";
import AuthContext from "./authContext";
import EncryptedStorage from "react-native-encrypted-storage";

const AuthState = (props) => {
    const [userToken, SetUserToken] = useState(null);
    const [isLoading, SetIsLoading] = useState(true);

    const onAuthentication = async (userToken) => {
        await EncryptedStorage.setItem('user-token', userToken);
        SetUserToken(userToken);
        // console.warn("user has been authenticated!");
    }

    useEffect(() => {
        checkAuthenticationStatus();
    }, [])

    const checkAuthenticationStatus = async () => {
        try {
            const returnedToken = await EncryptedStorage.getItem('user-token');
            SetUserToken(returnedToken);

        } catch (err) {
            console.warn(`Here's the error that occured while retrieving token : ${err}`)
        }
        SetIsLoading(false)
    }

    const userSignout = async () => {
        try {
            await EncryptedStorage.removeItem('user-token');
            SetUserToken(null);
            // console.warn("User signout success!")
        }
        catch (err) {
            console.warn(`Here's the error that occured while retrieving token : ${err}`)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                onAuthentication,
                userSignout,
                userToken,
                isLoading,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthState;
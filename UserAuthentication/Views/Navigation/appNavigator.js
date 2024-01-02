import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "../../Context/AuthContext/authContext";
import PreAuthNavigator from "./preAuthNavigator";
import PostAuthNavigator from "./postAuthNavigator";
import TransitionScreen from "../transitionScreen";

const AppNavigator = () => {
    const { Navigator, Screen } = createNativeStackNavigator();
    const authContext = useContext(AuthContext);
    const { userToken, isLoading } = authContext;

    if (isLoading) {
        return <TransitionScreen />
    }

    return (
        <NavigationContainer>
            <Navigator>
                {
                    userToken == null ? (
                        <Screen
                            name="PreAuth"
                            component={PreAuthNavigator}
                            options={{ header: () => null }}
                        />
                    ) : (
                        <Screen
                            name="PostAuth"
                            component={PostAuthNavigator}
                            options={{ header: () => null }}
                        />
                    )
                }
            </Navigator>
        </NavigationContainer>
    )
};

export default AppNavigator;
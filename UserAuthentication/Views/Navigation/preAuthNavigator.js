import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Screens/PreAuthScreens/loginScreen";
import I18n from "../../I18N/i18n";

const PreAuthNavigator = () => {
    const { Navigator, Screen } = createNativeStackNavigator();

    return (
        <Navigator initialRouteName="Welcome">
            <Screen
                name={I18n.t('login.screen_header_name')}
                component={LoginScreen}
                options={{ headerShown: false }}
            />
        </Navigator>
    )
};

export default PreAuthNavigator;
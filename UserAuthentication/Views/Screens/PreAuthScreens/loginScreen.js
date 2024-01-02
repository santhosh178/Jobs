import React, { useState, useContext } from "react";
import Loader from "../../loader";
import { Pressable, Text, View } from "react-native";
import Button from "../button";
import styles from "../../../Themes/styles";
import { login } from "../../../Util/NetworkUtils";
import AuthContext from "../../../Context/AuthContext/authContext";
import I18n from "../../../I18N/i18n";
import Signup from "../signup";

const LoginScreen = () => {
    const { onAuthentication } = useContext(AuthContext);
    const [loading, SetLoading] = useState(false);

    const loginApi = async () => {
        let values = {
            "email": ('raj@gmail.com'),
            "password": ('raj@123'),
        }
        try {
            SetLoading(true);
            const data = await login(values);
            onAuthentication(`${data.tokenType} ${data.accessToken}`);
        }
        catch (error) {
            SetLoading(false);
            return error;
        }
    };

    return (
        <View>
            <Loader loading={loading} />
            <View style={styles.Container}>
                <Text style={styles.Text}>{I18n.t('login.screen_name')}</Text>
                <Pressable onPress={loginApi} >
                    <Button name={I18n.t('button.login')} />
                </Pressable>
                <Signup />
            </View>
        </View>
    )
};

export default LoginScreen;

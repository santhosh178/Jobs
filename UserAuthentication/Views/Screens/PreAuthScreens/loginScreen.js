import React, { useState, useContext } from "react";
import Loader from "../../loader";
import { Pressable, Text, View, Image, TextInput, KeyboardAvoidingView, Alert } from "react-native";
import Button from "../button";
import styles, { themeColor } from "../../../Themes/styles";
import { login } from "../../../Util/NetworkUtils";
import AuthContext from "../../../Context/AuthContext/authContext";
import I18n from "../../../I18N/i18n";
import Signup from "../signup";
import { useHeaderHeight } from '@react-navigation/elements';


const LoginScreen = () => {
    const { onAuthentication } = useContext(AuthContext);
    const [loading, SetLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const headerHeight = useHeaderHeight();

    const onInputChange = (value, setState) => {
        setState(value);
    }

    const loginApi = async () => {


        if (!email) {
            Alert.alert(
                I18n.t('alert.Alert'),
                I18n.t('alert.email'),
                [{ text: I18n.t('alert.ok') }]
            );
            return;
        }
        if (!password) {
            Alert.alert(
                I18n.t('alert.Alert'),
                I18n.t('alert.password'),
                [{ text: I18n.t('alert.ok') }]
            );
            return;
        }

        let values = {
            "email": (email),
            "password": (password),
        }
        try {
            SetLoading(true);
            const data = await login(values);
            setEmail('');
            setPassword('');
            onAuthentication(`${data.tokenType} ${data.accessToken}`);
        }
        catch (error) {
            SetLoading(false)
            if (error.message == "Invalid email or password") {
                Alert.alert(
                    I18n.t('alert.Alert'),
                    I18n.t('alert.check_email_password'),
                    [{ text: I18n.t('alert.ok') }]
                );
                setEmail('');
                setPassword('');
                return;
            }
            if (error.status == 400) {
                Alert.alert(
                    I18n.t('alert.Alert'),
                    I18n.t('alert.go_to_signup'),
                    [{ text: I18n.t('alert.ok') }]
                );
                setEmail('');
                setPassword('');
                return;
            }
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
            keyboardVerticalOffset={headerHeight}
        >
            <Loader loading={loading} />
            <View>
                <Image style={styles.loginimage} source={require('/home/test/Git-Clone/Jobs/UserAuthentication/Images/job.png')} />
            </View>
            <View style={styles.loginContainer}>
                <Text style={styles.welcomeMsg}>{I18n.t('login.header_name')}</Text>
                <TextInput style={styles.input} placeholder={I18n.t('placeholder.email')} placeholderTextColor={'#A9A9A9'} keyboardType='email-address' value={email}
                    onChangeText={(value) => onInputChange(value, setEmail)}
                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    blurOnSubmit={false}
                    returnKeyType='next'
                    selectionColor={themeColor}
                >
                </TextInput>
                <TextInput style={styles.input} placeholder={I18n.t('placeholder.password')} placeholderTextColor={'#A9A9A9'} value={password} secureTextEntry={true}
                    onChangeText={(value) => onInputChange(value, setPassword)}
                    ref={(input) => { this.secondTextInput = input; }}
                    returnKeyType='next'
                    selectionColor={themeColor}
                >
                </TextInput>

                <Pressable onPress={loginApi}>
                    <Button name={I18n.t('button.login')} />
                </Pressable>
                <View style={styles.loginBtn}>
                    <Text style={styles.text}>{I18n.t('login.new_here')}</Text>
                    <Signup />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
};

export default LoginScreen;

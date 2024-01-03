import React, { useState, useContext } from "react";
import Loader from "../../loader";
import { Pressable, Text, View, Image, TextInput, KeyboardAvoidingView } from "react-native";
import Button from "../button";
import styles from "../../../Themes/styles";
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
            alert('Please fill Email');
            return;
        }
        if (!password) {
            alert('Please fill Password');
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
            SetLoading(false);
            return error;
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
            keyboardVerticalOffset={headerHeight}
        >
            <Loader loading={loading} />
            <View>
                <Image style={styles.image} source={require('/home/test/Git-Clone/Jobs/UserAuthentication/Images/job.png')} />
            </View>
            <View style={styles.loginContainer}>
                <Text style={styles.name}>{I18n.t('login.screen_header_name')}</Text>
                <TextInput style={styles.input} placeholder={I18n.t('placeholder.email')} placeholderTextColor={'#7E77FF'} keyboardType='email-address' value={email}
                    onChangeText={(value) => onInputChange(value, setEmail)}
                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    blurOnSubmit={false}
                    returnKeyType='next'
                >
                </TextInput>
                <TextInput style={styles.input} placeholder={I18n.t('placeholder.password')} placeholderTextColor={'#7E77FF'} value={password} secureTextEntry={true}
                    onChangeText={(value) => onInputChange(value, setPassword)}
                    ref={(input) => { this.secondTextInput = input; }}
                    returnKeyType='next'
                >
                </TextInput>

                <Pressable onPress={loginApi}>
                    <Button name={I18n.t('button.login')} />
                </Pressable>
                <View style={styles.loginBtn}>
                    <Text style={styles.text}>{I18n.t('login.new_here')}?</Text>
                    <Signup />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
};

export default LoginScreen;

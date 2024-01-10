import React, { useState } from "react";
import { Text, View, Pressable, Modal, TextInput, Image, KeyboardAvoidingView, Platform, Alert } from "react-native";
import styles, { placeHolderTextColor, themeColor } from "../../Themes/styles";
import Button from "./button";
import Loader from "../loader";
import I18n from "../../I18N/i18n";
import { signup } from "../../Util/NetworkUtils";
import { useHeaderHeight } from '@react-navigation/elements';

const Signup = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, SetLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const headerHeight = useHeaderHeight();

    const onInputChange = (value, setState) => {
        setState(value);
    }

    const signupApi = async () => {

        if (!name) {
            Alert.alert(
                I18n.t('alert.Alert'),
                I18n.t('alert.name'),
                [{ text: I18n.t('alert.ok') }]
            );
            return;
        }
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
        if (!phoneNumber) {
            Alert.alert(
                I18n.t('alert.Alert'),
                I18n.t('alert.phoneNumber'),
                [{ text: I18n.t('alert.ok') }]
            );
            return;
        }

        let values = {
            "name": (name),
            "email": (email),
            "password": (password),
            "phoneNumber": (phoneNumber),
        };
        try {
            SetLoading(true);
            const data = await signup(values);
            if (data.success == true) {
                Alert.alert(
                    I18n.t('alert.Alert'),
                    I18n.t('signup.success'),
                    [{ text: I18n.t('alert.ok') }]
                );
                setModalVisible(false);
                SetLoading(false);
                setName('');
                setEmail('');
                setPassword('');
                setPhoneNumber('');
            }
        } catch (error) {
            SetLoading(false);
            Alert.alert(
                I18n.t('alert.Alert'),
                I18n.t('signup.email_already_used'),
                [{ text: I18n.t('alert.ok') }]
            );
            setName('');
            setEmail('');
            setPassword('');
            setPhoneNumber('');
            return;
        }
    };

    return (
        <View>
            <Loader loading={loading} />
            <Modal
                animationType='slide'
                transparent={false}
                visible={modalVisible}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
                    keyboardVerticalOffset={headerHeight}
                >
                    <View>
                        <Image style={styles.image} source={require('/home/test/Git-Clone/Jobs/UserAuthentication/Images/job.jpeg')} />
                    </View>
                    <View style={[styles.signupContainer]}>
                        <Text style={styles.welcomeMsg}>{I18n.t('signup.header_name')}</Text>
                        <TextInput placeholder={I18n.t('placeholder.name')} style={styles.input}
                            value={name}
                            onChangeText={(value) => onInputChange(value, setName)}
                            placeholderTextColor={placeHolderTextColor}
                            returnKeyType="next"
                            onSubmitEditing={() => { this.secondTextInput.focus(); }}
                            blurOnSubmit={false}
                            selectionColor={themeColor}
                        >
                        </TextInput>
                        <TextInput placeholder={I18n.t('placeholder.email')} style={styles.input}
                            value={email}
                            onChangeText={(value) => onInputChange(value, setEmail)}
                            placeholderTextColor={placeHolderTextColor}
                            keyboardType="email-address"
                            returnKeyType="next"
                            ref={(input) => { this.secondTextInput = input; }}
                            onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                            blurOnSubmit={false}
                            selectionColor={themeColor}
                        >
                        </TextInput>
                        <TextInput placeholder={I18n.t('placeholder.password')} style={styles.input}
                            value={password}
                            onChangeText={(value) => onInputChange(value, setPassword)}
                            placeholderTextColor={placeHolderTextColor}
                            returnKeyType="next"
                            ref={(input) => { this.thirdTextInput = input; }}
                            onSubmitEditing={() => { this.fourTextInput.focus(); }}
                            blurOnSubmit={false}
                            selectionColor={themeColor}
                        >
                        </TextInput>
                        <TextInput placeholder={I18n.t('placeholder.phoneNumber')} style={styles.input}
                            value={phoneNumber}
                            returnKeyType="next"
                            onChangeText={(value) => onInputChange(value, setPhoneNumber)}
                            placeholderTextColor={placeHolderTextColor}
                            ref={(input) => { this.fourTextInput = input; }}
                            selectionColor={themeColor}
                        >
                        </TextInput>
                        <Pressable onPress={signupApi}>
                            <Button name={I18n.t('button.signup')} />
                        </Pressable>
                        <View style={styles.loginBtn}>
                            <Text style={styles.text}>{I18n.t('signup.already_account')}</Text>
                            <Text style={styles.text} onPress={() => setModalVisible(false)}>{I18n.t('button.login')}</Text>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            <Pressable
                onPress={() => setModalVisible(true)}>
                <Text style={styles.text}>{I18n.t('button.signup')}</Text>
            </Pressable>
        </View>
    )
};

export default Signup;
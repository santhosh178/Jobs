import React, { useState } from "react";
import { Text, View, Pressable, Modal, TextInput, Image, KeyboardAvoidingView, Platform } from "react-native";
import styles from "../../Themes/styles";
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
            alert('Please fill Name');
            return;
        }
        if (!email) {
            alert('Please fill Email');
            return;
        }
        if (!password) {
            alert('Please fill Password');
            return;
        }
        if (!phoneNumber) {
            alert('Please fill Phonenumber');
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
                alert('signup success');
                setModalVisible(false);
                SetLoading(false);
                setName('');
                setEmail('');
                setPassword('');
                setPhoneNumber('');
            }

        } catch (error) {
            SetLoading(false);
            alert('This emailid already used');
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
                    style={styles.overAll}>
                    <View>
                        <Image style={styles.image} source={require('/home/test/Git-Clone/Jobs/UserAuthentication/Images/job.png')} />
                    </View>
                    <View style={[styles.signupContainer]}>
                        <Text style={styles.name}>Create Account</Text>
                        <TextInput placeholder="name" style={styles.input}
                            value={name}
                            onChangeText={(value) => onInputChange(value, setName)}
                            placeholderTextColor={'black'}
                            returnKeyType="next"
                            onSubmitEditing={() => { this.secondTextInput.focus(); }}
                            blurOnSubmit={false}
                        >
                        </TextInput>
                        <TextInput placeholder="Email" style={styles.input}
                            value={email}
                            onChangeText={(value) => onInputChange(value, setEmail)}
                            placeholderTextColor={'black'}
                            keyboardType="email-address"
                            returnKeyType="next"
                            ref={(input) => { this.secondTextInput = input; }}
                            onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                            blurOnSubmit={false}
                        >
                        </TextInput>
                        <TextInput placeholder="Password" style={styles.input}
                            value={password}
                            onChangeText={(value) => onInputChange(value, setPassword)}
                            placeholderTextColor={'black'}
                            returnKeyType="next"
                            ref={(input) => { this.thirdTextInput = input; }}
                            onSubmitEditing={() => { this.fourTextInput.focus(); }}
                            blurOnSubmit={false}
                        >
                        </TextInput>
                        <TextInput placeholder="Mobile Number" style={styles.input}
                            value={phoneNumber}
                            returnKeyType="next"
                            onChangeText={(value) => onInputChange(value, setPhoneNumber)}
                            placeholderTextColor={'black'}
                            ref={(input) => { this.fourTextInput = input; }}
                        >
                        </TextInput>
                        <Pressable onPress={signupApi}>
                            <Button name={I18n.t('button.signup')} />
                        </Pressable>
                        <View style={styles.loginBtn}>
                            <Text style={styles.text}>Already have an account ?</Text>
                            <Text onPress={() => setModalVisible(false)}>sign in</Text>
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
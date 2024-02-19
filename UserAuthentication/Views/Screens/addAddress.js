import React, { useState } from "react";
import { View, Text, Modal, Pressable, ScrollView, TextInput } from "react-native";
import Button from "./button";
import I18n from "../../I18N/i18n";
import styles, { placeholderTextColor, themeColor } from "../../Themes/styles";
import Back from "../../../assets/svg/back.svg";
import { addAddress } from "../../Util/NetworkUtils";

const AddAddress = ({ onAddAddress }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const onInputChange = (value, setState) => {
        setState(value);
    }

    const addAddressApi = async () => {
        let values = {
            streetAddress: (streetAddress),
            city: (city),
            state: (state),
            country: (country),
            pinCode: (pinCode),
            latitude: (latitude),
            longitude: (longitude)
        };
        try {
            const data = await addAddress(values);
            setModalVisible(false);
            onAddAddress(data);
            setStreetAddress('');
            setCity('');
            setState('');
            setCountry('');
            setPinCode('');
            setLatitude('');
            setLongitude('');
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <View>
            <Modal animationType="slide" transparent={false} visible={modalVisible}>
                <ScrollView>
                    <View>
                        <View style={styles.header}>
                            <View style={styles.backSvg}>
                                <Back onPress={() => setModalVisible(false)} />
                            </View>
                            <View>
                                <Text style={styles.headername}>{I18n.t('addAddress.header_name')}</Text>
                            </View>
                        </View>

                        <View style={styles.addJobTextInput}>
                            <TextInput placeholder={I18n.t('addAddress.street_name')} style={styles.input}
                                value={streetAddress}
                                onChangeText={(value) => onInputChange(value, setStreetAddress)}
                                placeholderTextColor={placeholderTextColor}
                                returnKeyType="next"
                                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                blurOnSubmit={false}
                                selectionColor={themeColor}
                            >
                            </TextInput>

                            <TextInput placeholder={I18n.t('address.city')} style={styles.input}
                                value={city}
                                onChangeText={(value) => onInputChange(value, setCity)}
                                placeholderTextColor={placeholderTextColor}
                                returnKeyType="next"
                                ref={(input) => { this.secondTextInput = input; }}
                                onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                                blurOnSubmit={false}
                                selectionColor={themeColor}
                            >
                            </TextInput>

                            <TextInput placeholder={I18n.t('address.state')} style={styles.input}
                                value={state}
                                onChangeText={(value) => onInputChange(value, setState)}
                                placeholderTextColor={placeholderTextColor}
                                returnKeyType="next"
                                ref={(input) => { this.thirdTextInput = input; }}
                                onSubmitEditing={() => { this.fourthTextInput.focus(); }}
                                blurOnSubmit={false}
                                selectionColor={themeColor}
                            >
                            </TextInput>

                            <TextInput placeholder={I18n.t('address.country')} style={styles.input}
                                value={country}
                                onChangeText={(value) => onInputChange(value, setCountry)}
                                placeholderTextColor={placeholderTextColor}
                                returnKeyType="next"
                                ref={(input) => { this.fourthTextInput = input; }}
                                onSubmitEditing={() => { this.fifthTextInput.focus(); }}
                                blurOnSubmit={false}
                                selectionColor={themeColor}
                            >
                            </TextInput>

                            <TextInput placeholder={I18n.t('address.pincode')} style={styles.input}
                                value={pinCode}
                                onChangeText={(value) => onInputChange(value, setPinCode)}
                                placeholderTextColor={placeholderTextColor}
                                returnKeyType="next"
                                ref={(input) => { this.fifthTextInput = input; }}
                                onSubmitEditing={() => { this.sixthTextInput.focus(); }}
                                blurOnSubmit={false}
                                selectionColor={themeColor}
                            >
                            </TextInput>

                            <TextInput placeholder={I18n.t('addAddress.latitude')} style={styles.input}
                                value={latitude}
                                onChangeText={(value) => onInputChange(value, setLatitude)}
                                placeholderTextColor={placeholderTextColor}
                                returnKeyType="next"
                                ref={(input) => { this.sixthTextInput = input; }}
                                onSubmitEditing={() => { this.seventhTextInput.focus(); }}
                                blurOnSubmit={false}
                                selectionColor={themeColor}
                            >
                            </TextInput>

                            <TextInput placeholder={I18n.t('addAddress.longitude')} style={styles.input}
                                value={longitude}
                                onChangeText={(value) => onInputChange(value, setLongitude)}
                                placeholderTextColor={placeholderTextColor}
                                returnKeyType="next"
                                ref={(input) => { this.seventhTextInput = input; }}
                                selectionColor={themeColor}
                            >
                            </TextInput>
                        </View>

                        <View style={styles.addAddressButton}>
                            <Pressable onPress={() => setModalVisible(false)}>
                                <Button name={I18n.t('button.cancel')} cancel={styles.cancelBtn}/>
                            </Pressable>

                            <Pressable onPress={addAddressApi}>
                                <Button name={I18n.t('button.submit')} />
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </Modal>

            <View>
                <Pressable onPress={() => setModalVisible(true)}>
                    <Button name={I18n.t('button.addAddress')} />
                </Pressable>
            </View>
        </View>
    )
};
export default AddAddress;
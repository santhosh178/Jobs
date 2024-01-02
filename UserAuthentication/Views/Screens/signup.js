import React, { useState } from "react";
import { Text, View, Pressable, Modal } from "react-native";
import styles from "../../Themes/styles";
import Button from "./button";
import Loader from "../loader";
import I18n from "../../I18N/i18n";

const Signup = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, SetLoading] = useState(false);

    return (
        <View>
            <Loader loading={loading} />
            <Modal
                animationType='slide'
                transparent={false}
                visible={modalVisible}>
                <View style={styles.Container}>
                    <Text style={styles.Text}>{I18n.t('signup.screen_name')}</Text>
                    <Button name={I18n.t('button.signup')} />
                    <Text onPress={() => setModalVisible(false)}>{I18n.t('button.login')}</Text>
                </View>
            </Modal>

            <Pressable
                onPress={() => setModalVisible(true)}>
                <Text>{I18n.t('button.signup')}</Text>
            </Pressable>
        </View>
    )
};

export default Signup;
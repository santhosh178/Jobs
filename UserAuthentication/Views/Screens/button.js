import React from "react";
import { View, Text } from "react-native";
import styles from "../../Themes/styles";

const Button = ({ name,cancel }) => {
    return (
        <View style={[styles.btn,cancel]}>
            <Text style={styles.btnText}>{name}</Text>
        </View>
    )
};

export default Button;
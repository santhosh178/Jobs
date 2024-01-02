import React from "react";
import { View, Text } from "react-native";
import styles from "../../Themes/styles";

const Button = ({ name }) => {
    return (
        <View style={styles.btn}>
            <Text style={styles.Click}>{name}</Text>
        </View>
    )
};

export default Button;
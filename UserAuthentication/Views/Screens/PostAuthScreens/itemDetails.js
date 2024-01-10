import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

const ItemDetails = ({ route }) => {
    const { payment, mode } = route.params;

    return (
        <View>
            <Text>{payment}</Text>
            <Text>{mode}</Text>
        </View>
    )
};

export default ItemDetails;
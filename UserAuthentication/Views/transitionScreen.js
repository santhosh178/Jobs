import React from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "../Themes/styles";

const TransitionScreen = () => {
    return (
        <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
                <ActivityIndicator
                    animating={true}
                    color="#000000"
                    size="large"
                    style={styles.activityIndicator}
                />
            </View>
        </View>
    )
};

export default TransitionScreen;
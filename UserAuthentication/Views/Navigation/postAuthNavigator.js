import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Alert, Pressable, Text, View } from "react-native";
import styles from "../../Themes/styles";
import AuthContext from "../../Context/AuthContext/authContext";
import HomeScreen from "../Screens/PostAuthScreens/homeScreen";
import I18n from "../../I18N/i18n";

const PostAuthNavigator = () => {
    const { Navigator, Screen } = createNativeStackNavigator();
    const { userSignout } = useContext(AuthContext);

    const onLogout = () => {
        Alert.alert('', I18n.t('alert.exit'), [
            {
                text: I18n.t('alert.cancel'),
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: I18n.t('alert.ok'),
                onPress: () => userSignout()
            },
        ]);
    }

    return (
        <Navigator initialRouteName="Home">
            <Screen
                name={I18n.t('home.screen_header_name')}
                component={HomeScreen}
                options={{
                    headerRight: () =>
                        <View>
                            <Pressable onPress={onLogout} style={styles.parent}>
                                <Text style={styles.dot}></Text>
                                <Text style={styles.dot}></Text>
                                <Text style={styles.dot}></Text>
                            </Pressable>
                        </View>
                }}
            />
        </Navigator>
    )
};

export default PostAuthNavigator;

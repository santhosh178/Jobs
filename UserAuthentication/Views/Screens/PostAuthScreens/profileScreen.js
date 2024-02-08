import React, { useContext } from "react";
import { ScrollView, View, Text, Pressable,Alert } from "react-native";
import AuthContext from "../../../Context/AuthContext/authContext";
import Button from "../button";

const ProfileScreen = () => {
    const { userSignout } = useContext(AuthContext)

    const onLogout = () => {
  
      Alert.alert('', 'Are You Exit', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => userSignout() },
      ]);
    };
    return (
        <ScrollView>
            <View>
                <Text>profileScreen</Text>
            </View>
            <Pressable onPress={onLogout}>
                <Button name='logout'/>
            </Pressable>
        </ScrollView>
    )
};

export default ProfileScreen;
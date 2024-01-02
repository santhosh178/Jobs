import React, { useState, useContext, useEffect } from "react";
import { Text, View, Pressable, Alert } from "react-native";
import Loader from "../../loader";
import Button from "../button";
import styles from "../../../Themes/styles";
import AuthContext from "../../../Context/AuthContext/authContext";
import { getCurrentUser } from "../../../Util/NetworkUtils";
import I18n from "../../../I18N/i18n";

const HomeScreen = () => {
  const [loading, SetLoading] = useState(false);
  const { userSignout } = useContext(AuthContext);

  useEffect(() => {
    onPress();
  }, [])

  async function onPress() {
    try {
      SetLoading(true);
      await getCurrentUser(userSignout);
      SetLoading(false);
    }
    catch (error) {
      console.warn(error);
    }
  };

  const logout = () => {
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
    <View>
      <Loader loading={loading} />
      <View style={styles.Container}>
        <Text style={styles.Text}>{I18n.t('home.screen_name')}</Text>
        <Pressable onPress={logout}>
          <Button name={I18n.t('button.logout')} />
        </Pressable>
      </View>
    </View>
  )
};

export default HomeScreen;
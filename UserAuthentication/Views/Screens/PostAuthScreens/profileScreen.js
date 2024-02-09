import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Text, Pressable, Alert } from "react-native";
import Button from "../button";
import I18n from "../../../I18N/i18n";
import AuthContext from "../../../Context/AuthContext/authContext";
import { getCurrentUser } from "../../../Util/NetworkUtils";
import { themeColor } from "../../../Themes/styles";
import styles from "../../../Themes/styles";
import Back from "../../../../assets/svg/back.svg";

const ProfileScreen = ({ navigation }) => {
  const { userSignout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    onPress();
  }, [])

  async function onPress() {
    try {
      setLoading(true);
      setData(await getCurrentUser());
      setLoading(false);
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
    <ScrollView>
      <View style={{ padding: 10 }}>
        <View style={styles.header}>
          <View style={styles.backSvg}>
            <Back onPress={() => { navigation.navigate('All Jobs') }} />
          </View>
          <View>
            <Text style={styles.headername}>Profile</Text>
          </View>
        </View>
        <View style={{ width: 150, height: 150, backgroundColor: themeColor, borderRadius: 500, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
        </View>
        <View>
          <Text style={{ textAlign: 'center', fontSize: 20, padding: 10, color: 'black' }}>{data.name}</Text>
        </View>
        <Pressable onPress={logout}>
          <Button name={I18n.t('button.logout')} />
        </Pressable>
      </View>
    </ScrollView>
  )
};

export default ProfileScreen;
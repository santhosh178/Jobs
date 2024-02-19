import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Text, Pressable, Alert, Image, FlatList } from "react-native";
import I18n from "../../../I18N/i18n";
import AuthContext from "../../../Context/AuthContext/authContext";
import { getCurrentUser } from "../../../Util/NetworkUtils";
import styles from "../../../Themes/styles";
import Back from "../../../../assets/svg/back.svg";
import { getImageData } from "../../../Util/NetworkUtils";
import Plus from "../../../../assets/svg/plus.svg";
import DocumentPicker from 'react-native-document-picker';
import { addImageUser } from "../../../Util/NetworkUtils";
import Edit from "../../../../assets/svg/edit.svg";
import { Svg } from "react-native-svg";
import Language from "../../../../assets/svg/language.svg";
import About from "../../../../assets/svg/about.svg";
import Feedback from "../../../../assets/svg/feedback.svg";
import Settings from "../../../../assets/svg/setting.svg";
import Logout from "../../../../assets/svg/logout.svg";
import Rating from "../../../../assets/svg/star-shape.svg";
import RightArrow from "../../../../assets/svg/right-arrow.svg";
import { getCredit } from "../../../Util/NetworkUtils";


const ProfileScreen = ({ navigation }) => {
  const { userSignout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [credit, setCredit] = useState('');


  const [imageName, setImageName] = useState('');
  const [imageType, setImageType] = useState('');
  const [imageUri, setImageUri] = useState('');

  async function openGallery() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(res);
      const name = res[0]?.name;
      const uri = res[0]?.uri;
      const type = res[0]?.type;

      setImageName(name);
      setImageType(type);
      setImageUri(uri);
      saveImage();

      const sizeInBytes = res[0]?.size;
      const sizeInKilobytes = sizeInBytes / 1024;
      if (sizeInKilobytes > 50) {
        Alert.alert(
          I18n.t('alert.Alert'),
          I18n.t('alert.image_size'),
          [{ text: I18n.t('alert.ok') }]
        );
        return;
      }
    }
    catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.log('Error: ', err);
      }
    }
  }


  const saveImage = async () => {
    try {
      const datas = new FormData();
      datas.append('file', {
        uri: imageUri,
        name: imageName,
        type: imageType,
      });
      setLoading(true);
      const data = await addImageUser(datas);

    } catch (error) {
      setLoading(false);
      console.log(error);
      // alert("Image alredy uploaded");
      return;
    }
  };


  useEffect(() => {
    onPress();
    userCredit();
  }, [])

  async function onPress() {
    try {
      setLoading(true);
      const userData = await getCurrentUser();
      setData(userData);

      const imageData = await getImageData(userData.image_id);
      const base64Data = await blobToBase64(imageData);
      setImageData(base64Data);
      setLoading(false);
    }
    catch (error) {
      // console.log(error);
    }
  };

  function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };



  async function userCredit() {
    try {
      setLoading(true);
      const credit = await getCredit();
      setCredit(credit);
      setLoading(false);
    }
    catch (error) {
      console.log(error);
    }
  }


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

  const handleItemPress = (itemId) => {
    console.log(`Item ${itemId} pressed`);
    if (itemId == 5) {
      logout();
    }
  }

  const menuItems = [
    { id: '1', title: I18n.t('profile.choose_language'), icon: 'language', icons: 'right-arrow', borderColor: '#D9DAE2', color: '#D9DAE2' },
    { id: '2', title: I18n.t('profile.about'), icon: 'about', icons: 'right-arrow', borderColor: '#D9DAE2', },
    { id: '3', title: I18n.t('profile.send_feedback'), icon: 'feedback', icons: 'right-arrow', borderColor: '#D9DAE2', },
    { id: '4', title: I18n.t('profile.settings'), icon: 'settings', icons: 'right-arrow', borderColor: '#D9DAE2', },
    { id: '5', title: I18n.t('button.logout'), icon: 'logout', borderColor: 'white', },
  ];

  const getSvgComponent = (icon) => {
    switch (icon) {
      case 'language':
        return <Language />;
      case 'about':
        return <About />;
      case 'feedback':
        return <Feedback />;
      case 'settings':
        return <Settings />;
      case 'logout':
        return <Logout />;
      case 'right-arrow':
        return <RightArrow />;
      default:
        return null;
    }
  };

  const RightArrowSvgComponent = (icons) => {
    switch (icons) {
      case 'right-arrow':
        return <RightArrow />;
      default:
        return null;
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.profileFlatListOverall}>
      <Pressable style={styles.flatList} onPress={() => handleItemPress(item.id)} >
        <View style={styles.flatListLeftSideImage}>
          <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
            {getSvgComponent(item.icon)}
          </Svg>
        </View>
        <View style={{...styles.flatListView,borderBottomColor: item.borderColor,}}>
          <Text style={styles.flatListText}>{item.title}</Text>
          <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D9DAE2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.flatListRightArrow} >
            {RightArrowSvgComponent(item.icons)}
          </Svg>         
        </View>
      </Pressable>
    </View>
  );



  return (
    <ScrollView>
      <View>
        <View style={styles.header}>
          <View style={styles.backSvg}>
            <Back onPress={() => { navigation.navigate(I18n.t('home.screen_header_name')) }} />
          </View>
          <View>
            <Text style={styles.headername}>{I18n.t('profile.header_name')}</Text>
          </View>
        </View>

        <View style={styles.profileOverall}>
          <View style={styles.profileScreenImage}>
            {imageData ? (
              <View>
                <Image source={{ uri: `${imageData}` }} style={styles.selectImage} />
                <Pressable style={styles.selectImageButton} onPress={openGallery}>
                  <Edit width={40} height={40} />
                </Pressable>
              </View>
            ) : (
              <View>
                <Image style={styles.selectImage} source={require('/home/test/Home/web/workspace/Jobs/UserAuthentication/Images/profile.jpg')} />
                <Pressable style={styles.selectImageButton} onPress={openGallery}>
                  <Plus width={40} height={40} />
                </Pressable>
              </View>
            )}
          </View>

          <View style={styles.profileUser}>
            <Text style={styles.profileUserDetails}>{data.name}</Text>
            <Text style={[styles.profileUserDetails,styles.profileUser]}>{data.email}</Text>
            <Text style={styles.profileUserDetails}>{data.phoneNumber}</Text>
          </View>


          <View style={styles.ratingCreditOverall}>
            <View style={styles.ratingCredit}>
              <View style={styles.ratingCreditImage}>
                <Rating width={22} height={22} />
                <Text style={styles.radingCreditText}>{I18n.t('profile.rating')}</Text>
              </View>
              <View>
                <Text style={styles.rating}>4.5/5</Text>
              </View>
            </View>
            <View style={styles.ratingCredit}>
              <View style={styles.ratingCreditImage}>
                <Text style={styles.creditImage}>₹</Text>
                <Text style={styles.radingCreditText}>{I18n.t('profile.credit')}</Text>
              </View>
              <View>
                <Text style={styles.creditText}>{credit.credit}</Text>
              </View>
            </View>
          </View>
          <View>
            <FlatList
              data={menuItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
};

export default ProfileScreen;
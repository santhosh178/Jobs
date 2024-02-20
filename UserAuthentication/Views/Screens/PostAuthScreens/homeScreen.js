import React, { useState, useEffect, useContext } from "react";
import { Text, View, FlatList, ActivityIndicator, RefreshControl, Pressable, Image } from "react-native";
import { getJobs, modifiedTime } from "../../../Util/NetworkUtils";
import styles, { themeColor } from "../../../Themes/styles";
import AuthContext from "../../../Context/AuthContext/authContext";
import I18n from "../../../I18N/i18n";
import { getCurrentUser } from "../../../Util/NetworkUtils";
import Item from "./item";
import { getImageData } from "../../../Util/NetworkUtils";

import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ navigation, route }) => {
  const { itemDetailsScreen } = route.params;
  const [loading, setLoading] = useState(false);
  const { userSignout } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);

  const [lastTime, setLastTime] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const limit = 5;
  const [backendLimitExists, setBackendLimitExists] = useState(false);
  const [firstTimeEndReached, setFirstTimeEndReached] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modifiedTimes, setModifiedTimes] = useState('');
  const [count, SetCount] = useState(1);
  const [newHasMoreData, setNewHasMoreData] = useState(false);
  const [itemDetailsScreenOpen, setItemDetailsScreenOpen] = useState(itemDetailsScreen);
  const [newCount, setNewCount] = useState(0);
  const [newModifiedData, setNewModifiedData] = useState([]);

  const [image, setImage] = useState([]);
  const [imageData, setImageData] = useState(null);

  const onRefresh = async () => {
    try {
      setData([]);
      setHasMoreData(false);
      setNewHasMoreData(true);
    } catch (error) {
      setNewHasMoreData(false);
      setLoadingMore(false);
      console.error("Error during refresh:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (itemDetailsScreenOpen) {
        onRefresh();
        setItemDetailsScreenOpen(itemDetailsScreen);
      }
    }, [itemDetailsScreen])
  );

  useEffect(() => {
    onPress();
  }, [])

  async function onPress() {
    try {
      setLoading(true);
      // setData(await getCurrentUser());
      // console.log(data);
      const userData = await getCurrentUser();
      setImage(userData);

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

 
  const params = {
    limit: limit,
  };
  if (!firstTimeEndReached) {
    params.lastModifiedTime = lastTime;
  };

  const values = {
    limit: limit,
    lastModifiedTime: modifiedTimes,
  }

  async function getModifiedTime() {
    try {
      setNewCount(0);
      const newDatas = await modifiedTime(values);
      if (newDatas.length > 0) {
        setNewCount(0);
        const lastTimess = newDatas[newDatas.length - 1].modifiedTime;
        setModifiedTimes(lastTimess.slice(0, 19).replace('T', ' '));
        setData((prevData) => [...prevData, ...newDatas]);
        setNewModifiedData(newDatas);
        setNewCount(1);
      }
      else {
        if (newCount === 1) {
          setNewCount(0);
          setData([]);
          const newArrayWithoutFirstElement = [...newData];
          newArrayWithoutFirstElement.slice(1);
          setData((prevData) => [...prevData, ...newModifiedData]);
          setData((prevData) => [...prevData, ...newData]);

          const loadData = newArrayWithoutFirstElement[newArrayWithoutFirstElement.length - 1];
          if (loadData) {
            setLastTime(loadData.modifiedTime.slice(0, 19).replace('T', ' '));
          }
          setHasMoreData(true);
          setNewHasMoreData(false);
        }
        else {
          setNewCount(0);
          setData([]);
          setData((prevData) => [...prevData, ...newModifiedData]);
          setData((prevData) => [...prevData, ...newData]);
          const loadData = newData[newData.length - 1];
          if (loadData) {
            setLastTime(loadData.modifiedTime.slice(0, 19).replace('T', ' '));
          }
          setHasMoreData(true);
          setNewHasMoreData(false);
        }
      }
    }
    catch (error) {
      setNewHasMoreData(false);
      setLoadingMore(false);
      console.log("error : ", error);
    }
  };

  async function getAllJobs() {
    try {
      const newJobs = await getJobs(params);
      if (newJobs.length > 0) {
        const newDataList = [...newJobs];
        const lastTimes = newJobs[newJobs.length - 1].modifiedTime;
        const firstModifiedTime = newJobs[0].modifiedTime;

        if (newJobs.length <= limit) {
          setData((prevData) => [...prevData, ...newDataList]);
          setNewData((prevData) => [...prevData, ...newDataList]);
          setLastTime(lastTimes.slice(0, 19).replace('T', ' '));
          if (count === 1) {
            setModifiedTimes(firstModifiedTime.slice(0, 19).replace('T', ' '));
            SetCount(count + 1);
          }
          else {
            SetCount(count + 1);
          }
          setLoadingMore(true);
          setFirstTimeEndReached(false);
        } else {
          setHasMoreData(true);
          setLoadingMore(false);
        }
      }
      else {
        setHasMoreData(false);
        setLoadingMore(false);
      }
    } catch (error) {
      setBackendLimitExists(true);
      setHasMoreData(false);
      setLoadingMore(false);
    }
  };

  const handleEndReached = () => {
    if (hasMoreData) {
      getAllJobs();
    }
    if (newHasMoreData) {
      getModifiedTime();
    }
  };

  return (
    <View style={styles.overallListbackground}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.profileImageOverall}>
            <Text style={styles.listHeader}>{I18n.t('home.screen_header_name')}</Text>
            <Pressable onPress={() => navigation.navigate('Profile')}>
              {imageData ? (
                <Image style={styles.profileImage} source={{ uri: `${imageData}` }} />
              ) : (
                <Image style={styles.profileImage} source={require('/home/test/Home/web/workspace/Jobs/UserAuthentication/Images/profile.jpg')} />
              )}
            </Pressable>
          </View>
        }
        data={data}
        renderItem={({ item }) => <Item item={item} navigation={navigation} onNavigateToItemDetails={() => setItemDetailsScreenOpen(true)} />}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            color={themeColor}
          />
        }
        onEndReached={handleEndReached}
        ListFooterComponent={() =>
          loadingMore ? (
            <ActivityIndicator size="large" color={themeColor} style={styles.listLoader} />
          )
            : hasMoreData ? null : (
              data.length > 0 ? (
                <Text style={styles.listBottomText}>
                  {I18n.t('home.list_no_data')}
                </Text>
              ) : null
            )
        }
      // ListEmptyComponent={() =>
      //   data.length === 0 ? (
      //     <View style={{ height: 640, alignSelf: 'center', justifyContent: 'center' }}>
      //       <Text>
      //         {I18n.t('home.list_no_data')}
      //       </Text>
      //     </View>
      //   ) : null
      // }
      />
    </View>
  )
};

export default HomeScreen; 
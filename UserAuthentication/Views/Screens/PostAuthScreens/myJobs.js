import React, { useState, useEffect, useContext } from "react";
import { Text, View, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { getMyJobs, getCurrentUser } from "../../../Util/NetworkUtils";
import styles from "../../../Themes/styles";
import I18n from "../../../I18N/i18n";
import Item from "./item";
import AuthContext from "../../../Context/AuthContext/authContext";

const MyJobs = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { userSignout } = useContext(AuthContext);
  const [data, setData] = useState([]);
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

  useEffect(() => {
    onPress();
  }, [])

  async function onPress() {
    try {
      setLoading(true);
      await getCurrentUser(userSignout);
      setLoading(false);
    }
    catch (error) {
      console.warn(error);
    }
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
      const newData = await modifiedTime(values);

      if (newData.length > 0) {
        const lastTimes = newData[newData.length - 1].modifiedTime;
        setModifiedTimes(lastTimes.slice(0, 19).replace('T', ' '));

        setData((prevData) => [...prevData, ...newData]);
        if (newData.length < limit) {
          setLoadingMore(false);
          setFirstTimeEndReached(true);
          setHasMoreData(true);
          setNewHasMoreData(false);
        } else {
          setLoadingMore(true);
          setHasMoreData(true);
        }
      }
      else {
        setLoadingMore(false);
        setFirstTimeEndReached(true);
        setHasMoreData(true);
        setNewHasMoreData(false);
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
      const newJobs = await getMyJobs(params);
      if (newJobs.length > 0) {
        const newDataList = [...newJobs];
        const lastTimes = newJobs[newJobs.length - 1].modifiedTime;
        const firstModifiedTime = newJobs[0].modifiedTime;

        if (newJobs.length <= limit) {
          setData((prevData) => [...prevData, ...newDataList]);
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
          setHasMoreData(false);
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

  return (
    <View style={styles.overallListbackground}>
      <FlatList
        ListHeaderComponent={
          <View>
            <Text style={styles.listHeader}>{I18n.t('home.screen_header_name')}</Text>
          </View>}
        data={data}
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        onEndReached={() => {
          if (hasMoreData) {
            getAllJobs();
          }
          if (newHasMoreData) {
            getModifiedTime();
          }
        }}
        ListFooterComponent={() =>
          loadingMore ? (
            <ActivityIndicator size="large" color="green" style={styles.listLoader} />
          )
            : (hasMoreData) ? null : (
              <Text style={styles.listBottomText}>
                {I18n.t('home.list_no_data')}
              </Text>
            )
        }
      />
    </View>
  )
};

export default MyJobs;
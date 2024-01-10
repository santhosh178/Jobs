import React, { useState, useEffect, useContext } from "react";
import { Text, View, FlatList, ActivityIndicator, Pressable } from "react-native";
import { getJobs, getCurrentUser } from "../../../Util/NetworkUtils";
import styles from "../../../Themes/styles";
import AuthContext from "../../../Context/AuthContext/authContext";

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { userSignout } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [lastJobId, setLastJobId] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const limit = 5;
  const [backendLimitExists, setBackendLimitExists] = useState(false);

  useEffect(() => {
    getAllJobs();
    onPress();
  }, [])

  const params = {
    status: 'open',
    lastJobId: (lastJobId),
    limit: (limit)
  };

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

  async function getAllJobs() {
    try {
      const newJobs = await getJobs(params);
      if (newJobs.length > 0) {
        setLastJobId(newJobs[newJobs.length - 1].id);
        setData((prevData) => [...prevData, ...newJobs]);
        setLoadingMore(true);
      }
      else {
        setHasMoreData(false);          // No more data available
        setLoadingMore(false);
      }
    } catch (error) {
      setBackendLimitExists(true);    // Backend limit exists
      setLoadingMore(false);
    }
  };

  const Item = ({ item }) => (
    <Pressable onPress={() => navigation.navigate('ItemDetails', item)}>
      <View style={[styles.card, styles.box]}>
        <View style={styles.cardHeader}>
          <Text style={styles.jobDescription}>{item.jobDescription}</Text>
          <Text style={styles.status}>{item.status}</Text>
        </View>
        <Text style={styles.categoryName}>{item.category.name}</Text>
        <Text style={styles.mode}>{item.mode}</Text>
        <View style={styles.cardBottom}>
          <Text style={styles.payment}>${item.payment}</Text>
          <Text style={styles.jobTime}>{item.jobTime}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => {
          if (hasMoreData) {
            getAllJobs();
          }
        }}
        ListFooterComponent={() =>
          loadingMore ? (
            <ActivityIndicator size="large" color="green" style={{ padding: 10 }} />
          )
            : hasMoreData && !backendLimitExists ? null : (
              <Text style={{ textAlign: 'center', padding: 10, color: 'lightgrey' }}>
                {backendLimitExists ? 'Limits exist' : 'No more data'}
              </Text>
            )
        }
      />
    </View>
  )
};

export default HomeScreen; 
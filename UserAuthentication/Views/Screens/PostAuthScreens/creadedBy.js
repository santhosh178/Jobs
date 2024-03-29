import React, { useState, useEffect, useContext } from "react";
import { Text, View, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { getMyJobs, modifiedTime, getCurrentUser, getImageData, modifiedTimeById, modifiedTimeByUserId } from "../../../Util/NetworkUtils";
import styles, { themeColor } from "../../../Themes/styles";
import AuthContext from "../../../Context/AuthContext/authContext";
import I18n from "../../../I18N/i18n";
import Item from "./item";

import { useFocusEffect } from "@react-navigation/native";

const CreatedBy = ({ navigation }) => {
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
    const [itemDetailsScreenOpen, setItemDetailsScreenOpen] = useState(false);
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
                setItemDetailsScreenOpen(itemDetailsScreenOpen);
            }
        },
            [itemDetailsScreenOpen]
        )
    );

    useEffect(() => {
        onPress();
    }, [])

    async function onPress() {
        try {
            setLoading(true);
            const userData = await getCurrentUser(userSignout);
            setImage(userData);

            const imageData = await getImageData(userData.image_id);
            const base64Data = await blobToBase64(imageData);
            setImageData(base64Data);
            setLoading(false);
        }
        catch (error) {
            console.log(error);
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
            const newDatas = await modifiedTimeByUserId(values);
            if (newDatas.length > 0) {
                setNewCount(0);
                const lastTimess = newDatas[newDatas.length - 1].modifiedTime;
                console.log("last times", lastTimess.slice(0, 19).replace('T', ' '));
                setModifiedTimes(lastTimess.slice(0, 19).replace('T', ' '));
                setData((prevData) => [...prevData, ...newDatas]);
                setNewModifiedData((prevData) => [...prevData, ...newDatas]);
                setNewCount(1);
            }
            else {
                if (newCount === 1) {
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

    async function getAllMyJobs() {
        try {
            const newJobs = await getMyJobs(params);
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
            getAllMyJobs();
        }
        if (newHasMoreData) {
            getModifiedTime();
        }
    };

    return (
        <View style={styles.overallListbackground}>
            <FlatList
                ListHeaderComponent={
                    <View style={{ padding: 1 }}>
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
            />
        </View>
    )
};

export default CreatedBy; 
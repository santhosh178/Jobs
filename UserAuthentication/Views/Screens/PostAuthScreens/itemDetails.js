import React, { useEffect, useState, useMemo } from "react";
import { View, Text, Pressable, Image, ActivityIndicator } from "react-native";
import { addAssignerJobs, getUserImage, getjobDetails, } from "../../../Util/NetworkUtils";
import Button from "../button";
import styles, { themeColor } from "../../../Themes/styles";
import Back from "../../../../assets/svg/back.svg";

const ItemDetails = ({ route, navigation }) => {
    const { payment, mode, category, address, jobTime, id, status, getAllJobsApi, jobDescription, assigner, imageId, streetAddress, pinCode, state, country } = route.params;
    const color = mode === 'immediate' ? themeColor : 'black';
    const [imageData, setImageData] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fullImageVisible, setFullImageVisible] = useState(false);

    const categoryName = data.category ? data.category.name : '';

    const formattedDateTime = useMemo(() => {
        const inputDateString = jobTime;
        const date = new Date(inputDateString);

        if (!isNaN(date)) {
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear().toString().slice(-2);
            const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

            return `${day} ${month} '${year} ${time}`;
        } else {
            console.log("Invalid Date");
            return null;
        }
    }, [jobTime]);

    useEffect(() => {
        getjobIdDetails();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (imageId !== 0) {
                getImage();
            }
        }, 2000);

    }, []);

    const values = {
        "imageId": imageId
    };  

    async function getImage() {
        try {
            const imageData = await getUserImage(values);
            const base64Data = await blobToBase64(imageData);
            setImageData(base64Data);
        } catch (error) {
            console.log("Error fetching image:", error);
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
        jobId: (id),
    };

    async function getjobIdDetails() {
        try {
            const jobDetils = await getjobDetails(params);
            setData(jobDetils);
        } catch (error) {
            console.log(error);
        }
    }
    async function addAssigner() {
        try {
            const newJobs = await addAssignerJobs(params);
            if (newJobs.success) {
                setRefresh(true);
                console.log('job updated success');
            } else {
                console.log("error ", " no pick the job");
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#FFFFFF' }}>
            <View style={styles.header}>
                <View style={styles.backSvg}>
                    <Back onPress={() => {navigation.navigate('All Jobs')}} />
                </View>
                <View>
                    <Text style={styles.headername}>Job Details</Text>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', padding: 40 }}>
                <View style={{ gap: 12 }}>
                    <Pressable onPress={() => setFullImageVisible(true)} style={{ alignSelf: 'center' }}>
                        {loading ? (
                            <View style={{ width: 240, height: 200, alignItems: 'center', justifyContent: 'center' }}>
                                <ActivityIndicator size="large" color={themeColor} />
                            </View>
                        ) : (imageData ? <Image source={{ uri: `${imageData}` }} style={{ width: 240, height: 200, borderRadius: 20, resizeMode: fullImageVisible ? 'cover' : 'center' }} /> : <Image source={require('/home/test/Home/web/workspace/Jobs/UserAuthentication/Images/no-image.jpg')} style={{ width: 240, height: 200, borderRadius: 20 }} />)}
                    </Pressable>
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 26, alignSelf: 'center', color: 'black' }}>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</Text>
                    <Text style={{ fontSize: 18, alignSelf: 'center' }}>₹{data.payment}</Text>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 26, color: 'black' }}>Job description: </Text>
                            <View style={{ backgroundColor: 'white', alignSelf: 'center', borderColor: '#EFEFEF', borderWidth: 1, borderRadius: 6, marginVertical: 6 }}>
                                <Text style={{ color: color, margin: 3 }}>{data.mode}</Text>
                            </View>
                        </View>
                        <Text style={{ fontSize: 16, paddingVertical: 16, width: 316 }}>{jobDescription.charAt(0).toUpperCase() + jobDescription.slice(1)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 16, color: '#000000', fontFamily: 'OpenSans-SemiBold' }}>Address : </Text>
                        <Text style={{ paddingVertical: 3, width: 240 }}>{`${address.streetAddress}, ${address.city}, ${address.state}, ${address.country}, ${address.pinCode}`}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 16, color: '#000000', fontFamily: 'OpenSans-SemiBold' }}>JobTime : </Text>
                        <Text style={{ paddingVertical: 3 }}>{formattedDateTime}</Text>
                    </View >
                    {status != 'open' &&
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16, color: '#000000', fontFamily: 'OpenSans-SemiBold' }}>assigner : </Text>
                            <Text style={{ paddingVertical: 3 }}>{assigner.name}</Text>
                        </View>
                    }
                </View>
                <View>
                    {status === "open" && (
                        <Pressable onPress={addAssigner} style={{ alignItems: 'center', }}>
                            <Button name='pick job' />
                        </Pressable>
                    )}
                </View>
            </View>
        </View>
    )
};

export default ItemDetails;
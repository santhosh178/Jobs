import React, { useEffect, useState, useMemo } from "react";
import { View, Text, Pressable, Alert, } from "react-native";
import { addAssignerJobs, getUserImage, getjobDetails, jobDelete } from "../../../Util/NetworkUtils";
import Button from "../button";
import styles, { themeColor } from "../../../Themes/styles";
import Back from "../../../../assets/svg/back.svg";
import ThreeDot from '../../../../assets/svg/dots-three-vertical.svg';
import I18n from "../../../I18N/i18n";
import ImageFullScreen from "./imageFullScreen";
import Loader from "../../loader";
import { Menu, Divider, Provider, PaperProvider } from 'react-native-paper';

const ItemDetails = ({ route, navigation }) => {
    const { mode, id, imageId } = route.params;
    const color = mode === 'immediate' ? themeColor : '#000000';
    const [imageData, setImageData] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loader, setLoader] = useState(false);

    const categoryName = data.category ? data.category.name : '';
    const assignerName = data.assigner ? data.assigner.name : '';
    const streetAddress = data.address ? data.address.streetAddress : '';
    const city = data.address ? data.address.city : '';
    const pinCode = data.address ? data.address.pinCode : '';
    const state = data.address ? data.address.state : '';
    const country = data.address ? data.address.country : '';

    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const formattedDateTime = useMemo(() => {
        const inputDateString = data.jobTime;
        const date = new Date(inputDateString);

        if (!isNaN(date)) {
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear().toString().slice(-2);
            const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

            return `${day} ${month} '${year} ${time}`;
        } else {
            return null;
        }
    }, [data.jobTime]);

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

    const handleGoBack = () => {
        navigation.goBack();
        if (route.params?.onNavigateBack) {
            route.params.onNavigateBack();
        }
    };

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
    };
    const assignJob = () => {
        Alert.alert('', I18n.t('alert.pick_job'), [
            {
                text: I18n.t('alert.cancel'),
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: I18n.t('alert.ok'),
                onPress: () => {
                    setLoader(true),
                        addAssigner()
                }
            },
        ]);
    }
    async function addAssigner() {
        try {
            const newJobs = await addAssignerJobs(params);
            setData(newJobs);
            getjobIdDetails();
            setLoader(true);
            setTimeout(() => {
                setLoader(false);
            }, 1000)
        }
        catch (error) {
            setLoader(false);
            alert(I18n.t('alert.assigner'));
        }
    };

    const deleteTheJob = () => {
        Alert.alert('', I18n.t('alert.delete_job'), [
            {
                text: I18n.t('alert.cancel'),
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: I18n.t('alert.ok'),
                onPress: () => {
                    deleteJob()
                }
            },
        ]);
    }

    async function deleteJob() {
        try {
            const job = await jobDelete(params);
            navigation.goBack();
        }
        catch (error) {
            alert(I18n.t('alert.no_delete'))
        }
    };

    return (
        <View style={styles.itemDetailsHeader}>
            <Loader loading={loader} />
            <View style={{ position: 'absolute' }}>
                <View style={styles.header}>
                    <View style={styles.backSvg}>
                        <Back onPress={handleGoBack} />
                    </View>
                    <View style={styles.itemHeadertop}>
                        <Text style={styles.headername}></Text>
                        <View style={styles.itemHeaderRight}>
                            <PaperProvider>
                                <View>
                                    <Menu
                                        visible={visible}
                                        onDismiss={closeMenu}
                                        anchor={<ThreeDot width={30} height={30} onPress={openMenu} />}
                                        style={styles.menuContainer}
                                    >
                                        {data.status === 'open' && <Menu.Item onPress={deleteTheJob} title="Delete" />}
                                        <Menu.Item title="Report" />
                                        <Menu.Item title="Feed Back" />
                                    </Menu>
                                </View>
                            </PaperProvider>
                        </View>
                    </View>
                </View>

                <View style={styles.itemMiddleOverAll}>
                    <View style={styles.itemMiddleHeader}>
                        <ImageFullScreen imageData={imageData} loading={loading} imageStyle={styles.itemDetailsImageStyle} />
                        <Text style={styles.itemDetailsCategoryName}>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</Text>
                        <Text style={styles.itemDetailsPayment}>₹{data.payment}</Text>
                        <View>
                            <View style={styles.itemDeatilsView}>
                                <Text style={[styles.itemDeatilsAddress, styles.itemDetailsDescriptionLabel]}>{I18n.t('jobDetails.job_description')}: </Text>
                                <View style={styles.itemDeatilsModeView}>
                                    <Text style={{ color: color, ...styles.itemDeatilsModeText }}>{data.mode}</Text>
                                </View>
                            </View>
                            <Text style={styles.itemDetailsDescription}>{data.jobDescription}</Text>
                        </View>
                        <View style={styles.itemDeatilsView}>
                            <Text style={styles.itemDeatilsAddress}>{I18n.t('jobDetails.address')} : </Text>
                            <Text style={[styles.itemDeatilsAssignerName, styles.itemDetailsAddressText]}>{`${streetAddress} , ${city} , ${state} , ${country} - ${pinCode}`}</Text>
                        </View>
                        <View style={styles.itemDeatilsView}>
                            <Text style={styles.itemDeatilsAddress}>{I18n.t('jobDetails.job_time')} : </Text>
                            <Text style={styles.itemDeatilsAssignerName}>{formattedDateTime}</Text>
                        </View >
                        {data.status != 'open' &&
                            <View style={styles.itemDeatilsView}>
                                <Text style={styles.itemDeatilsAssignerText}>{I18n.t('jobDetails.assigner')} : </Text>
                                <Text style={styles.itemDeatilsAssignerName}>{assignerName}</Text>
                            </View>
                        }
                    </View>
                    <View style={{ top: 80 }}>
                        {data.status === "open" && (
                            <Pressable onPress={assignJob} style={styles.itemDeatilsBtn}>
                                <Button name={I18n.t('button.pick_job')} />
                            </Pressable>
                        )}
                    </View>
                </View>
            </View>
        </View >
    )
};

export default ItemDetails;

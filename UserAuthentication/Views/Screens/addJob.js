import React, { useState, useEffect } from "react";
import { Text, View, Modal, Pressable, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
import Loader from "../loader";
import styles, { placeHolderTextColor, placeholderTextColor, themeColor } from "../../Themes/styles";
import Button from "./button";
import I18n from "../../I18N/i18n";
import { addJobs } from "../../Util/NetworkUtils";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import Address from "./address";
import { getCategory } from "../../Util/NetworkUtils";
import Back from "../../../assets/svg/back.svg";
import Plus from "../../../assets/svg/plus.svg";
import DocumentPicker, { types } from 'react-native-document-picker';
import Cancel from "../../../assets/svg/cancel.svg";


const AddJob = ({initialParams,updateItemDetailsScreenOpen}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [jobDescription, setJobDescription] = useState('');
    const [payment, setPayment] = useState('');
    const [mode, setMode] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [hasSelectedCategory, setHasSelectedCategory] = useState(false);


    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isAddressModalVisible, setAddressModalVisible] = useState(false);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dateSelected, setDateSelected] = useState(false);

    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [timeSelected, setTimeSelected] = useState(false);

    const [pressCount, setPressCount] = useState(0);
    const [timePressCount, setTimePressCount] = useState(0);

    const [imageName, setImageName] = useState('');
    const [imageType, setImageType] = useState('');
    const [imageUri, setImageUri] = useState('');


    /*------- image upload ---------*/
    async function openGallery() {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            const name = res[0]?.name;
            const uri = res[0]?.uri;
            const type = res[0]?.type;

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
            setImageName(name);
            setImageType(type);
            setImageUri(uri);
        }
        catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                console.log('Error: ', err);
            }
        }
    }

  const [itemDetailsScreenOpen, setItemDetailsScreenOpen] = useState(initialParams);

    /*------- Focus ---------*/
    const [focusedInput, setFocusedInput] = useState(null);
    const [blurredInput, setBlurredInput] = useState(null);

    const onFocus = (inputName) => {
        setFocusedInput(inputName);
        setBlurredInput(null);
        if (inputName === 'category' && !hasSelectedCategory) {
            setHasSelectedCategory(true);
        }
    }

    const onBlur = (inputName) => {
        setBlurredInput(inputName);
        setFocusedInput(null);
        if (inputName === 'category' && hasSelectedCategory) {
            setHasSelectedCategory(false);
        }
    }

    /*------- Date Time ---------*/
    const onChangeDate = (event, selected) => {
        setShowDatePicker(false);
        if (selected) {
            setSelectedDate(selected);
            setDateSelected(true);

            if (mode === 'immediate') {
                setSelectedTime(new Date());
                setTimeSelected(true);
            }

        }
    };

    const handleDatePress = () => {
        setPressCount((prevCount) => prevCount + 1);

        if (pressCount === 0) {
            setMode('later');
            setShowDatePicker(true);
            setDateSelected(false); // Reset dateSelected when switching to 'later' mode
        }
    };

    const handleDateTextClick = () => {
        if (mode === 'later') {
            setPressCount((prevCount) => prevCount + 1);
            setShowDatePicker(true);
            // You may want to update dateSelected here if needed
        }
    };

    const onChangeTime = (event, selected) => {
        setShowTimePicker(false);
        if (selected) {
            setSelectedTime(selected);
            setTimeSelected(true);
        }
    };

    const handleTimePress = () => {
        setTimePressCount((prevCount) => prevCount + 1);

        if (timePressCount === 0) {
            setMode('later');
            setShowTimePicker(true);
            setTimeSelected(false); // Reset dateSelected when switching to 'later' mode
        }
    };

    const handleTimeTextClick = () => {
        if (mode === 'later') {
            setTimePressCount((prevCount) => prevCount + 1);
            setShowTimePicker(true);
        }
    };

    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    const formattedTime = format(selectedTime, 'HH:mm');


    /*------- Address ---------*/
    const handleSelectAddress = (selectedAddress) => {
        setSelectedAddress(selectedAddress);
    };

    const openAddressModal = () => {
        setAddressModalVisible(true);
    };

    const closeAddressModal = () => {
        setAddressModalVisible(false);
    };


    /*------- Mode ---------*/
    const handleRadioButtonChange = (value) => {
        setMode(value);
    };


    /*------- Category ---------*/
    useEffect(() => {
        category();
    }, []);


    const category = async () => {
        try {
            const data = await getCategory();
            setCategories(data);
        }
        catch (error) {
            console.log(error);
        }
    }


    /*------- Job Description ---------*/
    const onInputChange = (value, setState, inputText) => {
        setState(value);
        if (inputText !== undefined) {
            if (inputText.length <= 220) {
                setJobDescription(inputText);
            }
        }
    }


    /*-------addJob Api ---------*/
    const addJobApi = async () => {

        if (!mode) {
            Alert.alert(
                I18n.t('alert.Alert'),
                I18n.t('alert.mode'),
                [{ text: I18n.t('alert.ok') }]
            );
            return;
        }
        if (mode === 'later') {
            if (!dateSelected) {
                Alert.alert(
                    I18n.t('alert.Alert'),
                    I18n.t('alert.date'),
                    [{ text: I18n.t('alert.ok') }]
                );
                return;
            }
        }
        if (mode === 'later') {
            if (!timeSelected) {
                Alert.alert(
                    I18n.t('alert.Alert'),
                    I18n.t('alert.time'),
                    [{ text: I18n.t('alert.ok') }]
                );
                return;
            }
        }
        if (!jobDescription) {
            Alert.alert(
                I18n.t('alert.Alert'),
                I18n.t('alert.job_description'),
                [{ text: I18n.t('alert.ok') }]
            );
            return;
        }
        if (!selectedCategory) {
            Alert.alert(
                I18n.t('alert.Alert'),
                I18n.t('alert.category'),
                [{ text: I18n.t('alert.ok') }]
            );
            return;
        }
        if (!selectedAddress) {
            Alert.alert(
                I18n.t('alert.Alert'),
                I18n.t('alert.address'),
                [{ text: I18n.t('alert.ok') }]
            );
            return;
        }
        if (!payment) {
            Alert.alert(
                I18n.t('alert.Alert'),
                I18n.t('alert.payment'),
                [{ text: I18n.t('alert.ok') }]
            );
            return;
        }


        let values = {
            jobDescription: (jobDescription),
            category_id: (selectedCategory),
            address_id: (selectedAddress.id),
            mode: (mode),
            payment: (payment),
            jobTime: (`${formattedDate} ${formattedTime}`),
        };
        try {
            const datas = new FormData();
            datas.append('file', {
                uri: imageUri,
                name: imageName,
                type: imageType,
            });
            setLoading(true);
            const data = await addJobs(values, datas);
            updateItemDetailsScreenOpen(true);
            setModalVisible(false);
            setLoading(false);
            setMode('');
            setJobDescription('');
            setPayment('');
            setSelectedCategory('');
            setDateSelected('');
            setTimeSelected('');
            setSelectedAddress('');
            setImageName('');
        }
        catch (error) {
            setLoading(false)
            console.log(error);
            return;
        }
    };

    return (
        <View>
            <Loader loading={loading} />
            <Modal
                animationType='slide'
                transparent={false}
                visible={modalVisible}
            >
                <ScrollView>
                    <View>
                        <View style={styles.header}>
                            <View style={styles.backSvg}>
                                <Back onPress={() => { setModalVisible(false); setMode(''); setJobDescription(''); setSelectedCategory(''); setPayment(''); setDateSelected(''); setTimeSelected(''); setSelectedAddress(''), setImageName(''); }} />
                            </View>
                            <View>
                                <Text style={styles.headername}>{I18n.t('addJob.header_name')}</Text>
                            </View>
                        </View>


                        <View style={styles.addJobOverall}>
                            <View style={styles.radioButtonOverAll}>
                                <Text style={styles.TextSize}>{I18n.t('addJob.mode')}</Text>
                                <RadioButton.Group onValueChange={handleRadioButtonChange} value={mode}>
                                    <View style={styles.radioButtonValueOverAll} >
                                        <TouchableOpacity onPress={() => handleRadioButtonChange('immediate')}>
                                            <View style={styles.radioButtonValue}>
                                                <RadioButton value="immediate" color={themeColor} />
                                                <Text style={styles.fontFamily}>{I18n.t('addJob.immediate')}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleRadioButtonChange('later')}>
                                            <View style={styles.radioButtonValue}>
                                                <RadioButton value="later" color={themeColor} />
                                                <Text style={styles.fontFamily}>{I18n.t('addJob.later')}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </RadioButton.Group>
                            </View>


                            <View style={{ display: mode === 'immediate' || mode === '' ? 'none' : 'flex' }}>
                                <View style={styles.dateTimeOverall}>
                                    <View style={styles.date}>
                                        {mode === 'later' && (
                                            <Pressable onPress={handleDatePress}>
                                                <Text style={styles.TextSize}>{I18n.t('addJob.date')}</Text>
                                                <TextInput style={{ ...styles.formattedDate, borderBottomColor: focusedInput === 'date' ? themeColor : placeHolderTextColor, display: mode === 'later' ? 'flex' : 'none' }}
                                                    selectionColor={themeColor}
                                                    onFocus={() => onFocus('date')}
                                                    onBlur={() => {
                                                        onBlur('date');
                                                        setFocusedInput(null);
                                                    }}
                                                    caretHidden={focusedInput !== 'date'}
                                                    onPressIn={() => {
                                                        handleDateTextClick();
                                                        onFocus('date');
                                                        setFocusedInput('date');
                                                    }}
                                                >
                                                    {dateSelected ? formattedDate : ''}
                                                </TextInput>
                                            </Pressable>
                                        )}

                                        {showDatePicker && mode === 'later' && (
                                            <DateTimePicker
                                                value={selectedDate}
                                                mode="date"
                                                is24Hour={true}
                                                display="default"
                                                onChange={onChangeDate}
                                            />
                                        )}
                                    </View>

                                    <View style={styles.time}>
                                        {mode === 'later' && (
                                            <Pressable onPress={handleTimePress}>
                                                <Text style={styles.TextSize}>{I18n.t('addJob.time')}</Text>
                                                <TextInput style={{ ...styles.formattedTime, borderBottomColor: focusedInput === 'time' ? themeColor : placeHolderTextColor, display: mode === 'later' ? 'flex' : 'none', }}
                                                    selectionColor={themeColor}
                                                    onFocus={() => onFocus('time')}
                                                    onBlur={() => {
                                                        onBlur('time');
                                                        setFocusedInput(null);
                                                    }}
                                                    caretHidden={focusedInput !== 'time'}
                                                    onPressIn={() => {
                                                        handleTimeTextClick();
                                                        onFocus('time');
                                                        setFocusedInput('time');
                                                    }}
                                                >
                                                    {timeSelected ? formattedTime : ''}
                                                </TextInput>
                                            </Pressable>
                                        )}

                                        {showTimePicker && mode === 'later' && (
                                            <DateTimePicker
                                                value={selectedTime}
                                                mode="time"
                                                is24Hour={true}
                                                display="default"
                                                onChange={onChangeTime}
                                            />
                                        )}
                                    </View>
                                </View>
                            </View>


                            <View style={styles.jobDescriptionOverall}>
                                <Text style={styles.TextSize}>{I18n.t('addJob.job_description')}</Text>
                                <TextInput style={{ ...styles.jobDescriptionTextInput, borderBottomColor: focusedInput === 'jobDescription' ? themeColor : placeHolderTextColor }}
                                    selectionColor={themeColor}
                                    value={jobDescription}
                                    onChangeText={(value) => onInputChange(value, setJobDescription)}
                                    maxLength={220}
                                    multiline
                                    numberOfLines={1}
                                    onFocus={() => onFocus('jobDescription')}
                                    onBlur={() => {
                                        onBlur('jobDescription');
                                        setFocusedInput(null);
                                    }}
                                    caretHidden={focusedInput !== 'jobDescription'}
                                    onPressIn={() => {
                                        onFocus('jobDescription');
                                        setFocusedInput('jobDescription');
                                    }}
                                >
                                </TextInput>
                            </View>


                            <View style={{ ...styles.categoryOverall, borderBottomColor: focusedInput === 'category' ? themeColor : placeHolderTextColor }}>
                                <Text style={styles.TextSize}>{I18n.t('addJob.category')}</Text>
                                <Picker
                                    style={styles.categoryPicker}
                                    selectedValue={selectedCategory}
                                    onValueChange={(itemValue) => {
                                        const selectedCategoryObject = categories.find(category => category.id === itemValue);
                                        setSelectedCategory(selectedCategoryObject ? selectedCategoryObject.id : null);
                                    }}
                                    onFocus={() => onFocus('category')}
                                    onBlur={() => onBlur('category')}
                                >
                                    <Picker.Item label={I18n.t('addJob.select_category')} value={null} />
                                    {categories.map((category) => (
                                        <Picker.Item
                                            key={category.id}
                                            label={category.name}
                                            value={category.id}
                                            style={{
                                                backgroundColor: hasSelectedCategory && selectedCategory === category.id ? 'red' : 'transparent',
                                                color: hasSelectedCategory && selectedCategory === category.id ? 'white' : 'black',
                                            }}
                                        />
                                    ))}
                                </Picker>
                            </View>


                            <View style={styles.addressOverall}>
                                <Text style={styles.TextSize}>{I18n.t('addJob.address')}</Text>
                                <TouchableOpacity onPress={() => { openAddressModal(); onFocus('address'); }}>
                                    <TextInput
                                        style={{ ...styles.addressView, borderColor: focusedInput === 'address' ? themeColor : placeHolderTextColor }}
                                        editable={false}
                                        value={selectedAddress ? `${selectedAddress.streetAddress}, ${selectedAddress.city}` : ""}
                                    />
                                </TouchableOpacity>

                                <Address
                                    isVisible={isAddressModalVisible}
                                    onClose={() => closeAddressModal()}
                                    onSelectAddress={handleSelectAddress}
                                    onBlur={() => onBlur('address')}
                                />
                            </View>


                            <View style={styles.paymentOverall}>
                                <Text style={styles.TextSize}>{I18n.t('addJob.payment')}</Text>
                                <TextInput style={{ ...styles.paymentTextInput, borderBottomColor: focusedInput === 'payment' ? themeColor : placeHolderTextColor }}
                                    value={payment} keyboardType='number-pad'
                                    onChangeText={(value) => onInputChange(value, setPayment)}
                                    placeholderTextColor={placeholderTextColor}
                                    selectionColor={themeColor}
                                    onFocus={() => onFocus('payment')}
                                    onBlur={() => {
                                        onBlur('payment');
                                        setFocusedInput(null);
                                    }}
                                    caretHidden={focusedInput !== 'payment'}
                                    onPressIn={() => {
                                        onFocus('payment');
                                        setFocusedInput('payment');
                                    }}
                                >
                                </TextInput>
                            </View>


                            <Pressable onPress={openGallery} style={styles.uploadImageOverAll}>
                                {imageName ? (
                                    <View style={styles.uploadImageView}>
                                        <Text style={styles.uploadImageViewName} numberOfLines={1} ellipsizeMode="tail">{imageName}</Text>
                                        <Pressable onPress={() => setImageName('')} style={styles.uploadImageCancelButton}>
                                            <Cancel width={25} height={25} />
                                        </Pressable>
                                    </View>
                                ) : (
                                    <Text style={styles.uploadImageText}>{I18n.t('addJob.upload_image')}</Text>
                                )}
                            </Pressable>
                        </View>


                        <View style={styles.addJobButton}>
                            <Pressable onPress={() => { setModalVisible(false); setMode(''); setJobDescription(''); setPayment(''); setSelectedCategory(''); setDateSelected(''); setTimeSelected(''); setSelectedAddress(''); setImageName(''); }}>
                                <Button name={I18n.t('button.cancel')} cancel={styles.cancelBtn} />
                            </Pressable>

                            <Pressable onPress={addJobApi}>
                                <Button name={I18n.t('button.submit')} />
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </Modal>


            <Pressable onPress={() => setModalVisible(true)} style={styles.addJobPlusButton}>
                <Plus width={47} height={47} />
            </Pressable>
        </View>
    )
};
export default AddJob;
import { StyleSheet } from "react-native";

export const themeColor = '#E42527';
export const placeHolderTextColor = '#A9A9A9';


const styles = StyleSheet.create({
    /*---------- Button -------------*/
    btn: {
        width: 120,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        height: 40,
        backgroundColor: themeColor,
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '600',
    },
    cancelBtn: {
        backgroundColor: placeHolderTextColor,
    },

    /*--------- Loader ------------*/
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#e5e6e5',
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },

    /*--------- Login ------------*/
    loginImage: {
        width: 540,
        height: 330,
    },
    loginContainer: {
        gap: 30,
        alignItems: 'center',
        padding: 40
    },
    welcomeMsg: {
        fontSize: 25,
        color: 'black',
        width: 300,
        textAlign: 'center',
        fontFamily: 'OpenSans-Bold',
    },
    input: {
        height: 40,
        width: 310,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        borderColor: placeHolderTextColor,
    },
    loginBtn: {
        flexDirection: 'row',
        gap: 5,
    },

    text: {
        color: '#7E77FF',
    },

    /*------- Signup  ------*/
    signupContainer: {
        alignItems: 'center',
        gap: 25,
        padding: 40,
    },
    image: {
        width: 390,
        height: 260,
    },

    /*------- Homepage  ------*/
    overallListbackground: {
        backgroundColor: 'white'
    },
    listHeader: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 30,
        color: '#000000'
    },
    card: {
        borderRadius: 10,
        height: 132,
        margin: 12,
        marginBottom: 0,
        padding: 14,
        color: 'white',
        backgroundColor: 'white',
        textAlign: 'center',
        gap: 8,
        borderLeftWidth: 5,
    },
    box: {
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        backgroundColor: 'white',
    },
    jobDescription: {
        color: 'black',
        width: 310,
        fontSize: 18,
        fontFamily: 'OpenSans-SemiBold',
    },
    status: {
        fontSize: 14,
        width: 60,
        fontFamily: 'OpenSans-Bold',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    categoryView: {
        backgroundColor: '#F1F1FD',
        alignSelf: 'center',
        borderRadius: 7,
    },
    categoryName: {
        margin: 4,
        color: '#9091CC'
    },
    payment: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'OpenSans-Bold',
    },
    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    jobTime: {
        fontSize: 12,
        color: 'grey'
    },
    listBottomText: {
        textAlign: 'center',
        padding: 10,
        color: 'lightgrey',
    },
    listLoader: {
        padding: 10,
    },
    profileImageOverall: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        margin: 14 
    },
    profileImage: {
        width: 32,
        height: 32,
        marginTop: 5,
        borderRadius: 50
    },

    /*----------Add jobs -----*/
    header: {
        flexDirection: 'row',
        gap: 10,
        padding: 10,
    },
    backSvg: {
        width: 20,
        height: 20,
        marginTop: 7,
    },
    headername: {
        fontSize: 25,
        color: 'black',
        fontFamily: 'OpenSans-Bold',
    },
    addJobOverall: {
        padding: 10,
        gap: 10,
        height: 690,
        paddingLeft: 30,
    },
    radioButtonOverAll: {
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    radioButtonValueOverAll: {
        flexDirection: 'row',
        marginTop: 15,
        columnGap: 40,
        marginLeft: -8,
    },
    radioButtonValue: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    TextSize: {
        fontSize: 16,
        fontFamily: 'OpenSans-SemiBold',
        color: 'black',
    },
    fontFamily: {
        fontSize: 16,
        color: 'black',
    },
    dateTimeOverall: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        width: 260,
        gap: 10
    },
    date: {
        width: 180,
    },
    formattedDate: {
        width: 180,
        borderBottomWidth: 1,
    },
    time: {
        width: 130,
    },
    formattedTime: {
        width: 130,
        borderBottomWidth: 1,
    },
    jobDescriptionOverall: {
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    jobDescriptionTextInput: {
        width: 320,
        borderBottomWidth: 1,
    },
    categoryOverall: {
        width: 320,
        borderBottomWidth: 1,
        marginLeft: 11,
    },
    categoryPicker: {
        marginLeft: -10,
    },
    addressOverall: {
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    addressView: {
        borderBottomWidth: 1,
        width: 320,
        color: 'black',
    },
    paymentOverall: {
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    paymentTextInput: {
        borderBottomWidth: 1,
        width: 320,
    },  
    uploadImageOverAll: {
        width: 340,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    uploadImageView: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 10, 
        borderRadius: 10, 
        borderWidth: 1, 
        borderStyle: 'solid', 
        color: 'white', 
        backgroundColor: '#f2f2f2', 
        borderColor: '#e6e6e6'
    },
    uploadImageViewName: {
        color: '#000',
        padding: 5
    },
    uploadImageCancelButton:{
        height: 30, 
        width: 30, 
        padding: 3,
    },
    uploadImageText: {
        width: 320, 
        height: 40, 
        textAlign: 'center', 
        padding: 5, 
        borderRadius: 10, 
        fontSize: 20, 
        borderWidth: 1, 
        borderStyle: 'dashed', 
        color: 'black' 
    },
    addJobPlusButton: {
        alignItems: 'center', 
        width: 131
    },
    addJobButton: {
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 10,
        position: 'absolute', left: 0, right: 0, bottom: 0
    },


    /*----------Address card -------*/
    addressCard: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.20,
        shadowRadius: 5.62,
        elevation: 8,
        borderRadius: 10,
        height: 180,
        margin: 12,
        padding: 10,
        backgroundColor: '#fff',
        borderRightWidth: 5,
        borderRightColor: themeColor,
    },
    addressCardText: {
        fontSize: 16,
        color: 'black',
    },
    addressCardList: {
        gap: 10,
        padding: 6,
    },
    addressCardButton: {
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'center',
        margin: 15
    },
    selectAddress: {
        position: 'absolute', 
        top: 6, 
        right: 0
    },

    /*---------- Add Address -------*/
    addAddressButton: {
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: 140,
    },
    addJobTextInput: {
        padding: 30,
        gap: 35,
        alignItems: 'center',
    },


     /*----------Profile Screen -------*/
     profileOverall: {
        paddingHorizontal: 20,
     },
     profileScreenImage: {
        justifyContent: 'center', 
        alignItems: 'center',
     },
     selectImage: {
        width: 100, 
        height: 100, 
        borderRadius: 500
     },
     selectImageButton: {
        position: 'absolute', 
        top: 75, 
        left: 65
     },
     profileUser: {
        paddingVertical: 15,
     },
     profileUserDetails: {
        textAlign: 'center', 
        fontSize: 20, 
        color: '#000000',
     },
     ratingCreditOverall: {
        flexDirection: 'row', 
        gap: 10, 
        paddingVertical: 20, 
        justifyContent: 'center'
     },
     ratingCredit: {
        width: 170, 
        height: 85, 
        backgroundColor: '#ffffff', 
        borderRadius: 10, 
        justifyContent: 'center', 
        alignItems: 'center',
     },
     ratingCreditImage: {
        flexDirection: 'row', 
        gap: 7
     },
     radingCreditText: {
        color: '#000000', 
        fontSize: 16,
     },
     rating: {
        color: '#000000', 
        marginLeft: 15, 
        padding: 5
     },
     creditImage: {
        fontSize: 20, 
        color: '#000000', 
        textAlign: 'center'
     },
     creditText: {
        color: '#000000',
     },
     profileFlatListOverall: {
        width: 370, 
        height: 60, 
        backgroundColor: '#FFFFFF', 
        paddingTop: 15, 
        opacity: 0.7
     }, 
     flatList: {
        flexDirection: 'row',
     },
     flatListLeftSideImage: {
        padding: 10,
     },
     flatListView: {
        width: 310, 
        flexDirection: 'row', 
        padding: 10,
        justifyContent: 'space-between', 
        borderBottomWidth: 1,
     },
     flatListText: {
        color: '#000000', 
        fontFamily: 'OpenSans-Bold',
     },
     flatListRightArrow: {
        marginTop: -2, 
        opacity: 0.6, 
        marginRight: 5
     },

});

export const getDynamicStyles = (status) => {
    let statusColor;
    let borderColor;

    switch (status) {
        case 'open':
            statusColor = 'green';
            borderColor = 'green';
            break;
        case 'working':
            statusColor = 'blue';
            borderColor = 'blue';
            break;
        case 'close':
            statusColor = themeColor;
            borderColor = themeColor;
            break;
        default:
            statusColor = 'black';
            borderColor = 'black';
    }

    return StyleSheet.create({
        status: {
            color: statusColor,
        },
        card: {
            borderLeftColor: borderColor,
        },
    });
};

export default styles;
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
        marginVertical: 6,
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
    profileImage: {
        width: 32,
        height: 32,
        marginTop: 8,
    },

    /*----------Add jobs -----*/
    addJobOverall: {
        padding: 10,
        gap: 10,
        height: 690,
        paddingLeft: 25,
    },
    dateTimeOverall: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        width: 260,
        gap: 15
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
        padding: 11,
    },
    jobDescriptionTextInput: {
        width: 320,
        borderBottomWidth: 1,
    },
    addJobButton: {
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'center',
        height: 205,
        alignItems: 'flex-end',
        padding: 10,
        position: 'absolute', left: 0, right: 0, bottom: 0
    },
    addJob: {
        width: 45,
        height: 45,
        backgroundColor: themeColor,
        borderRadius: 50,
    },
    addJobTextInput: {
        padding: 30,
        gap: 35,
        alignItems: 'center',
    },
    headername: {
        fontSize: 25,
        color: 'black',
        fontFamily: 'OpenSans-Bold',
    },
    addJobInput: {
        height: 100,
        width: 330,
        borderBottomWidth: 1,
        padding: 10,
        borderColor: placeHolderTextColor,
        borderRadius: 10,
    },
    addInput: {
        width: 330,
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        borderColor: placeHolderTextColor,
    },
    categoryOverall: {
        width: 320,
        borderBottomWidth: 1,
        // borderRadius: 5,
        // padding: 10,
        marginLeft: 11,
    },
    categoryPicker: {
        // height: 40,
        marginLeft: -10,
        // fontFamily: 'OpenSans-Bold',
    },
    addressOverall: {
        padding: 10,
    },
    // addressText: {
    //     fontSize: 16, 
    //     fontFamily: 'OpenSans-Bold'
    // },
    addressView: {
        borderBottomWidth: 1,
        width: 320,
        color: 'black',
    },
    paymentOverall: {
        marginTop: 10,
        paddingLeft: 10,
    },
    paymentTextInput: {
        borderBottomWidth: 1,
        width: 320,
    },
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
    homeBackSvg: {
        width: 20,
        height: 20,
        marginTop: 7,
        marginLeft: 10
    },
    radioButtonOverAll: {
        // padding: 20,
        // flexDirection: 'row',
        columnGap: 70,
        padding: 10,
    },
    TextSize: {
        fontSize: 16,
        fontFamily: 'OpenSans-SemiBold',
        color: 'black',
    },
    fontFamily: {
        fontSize: 16,
        color: 'black',
        // fontFamily: 'OpenSans-Bold',
    },
    radioButtonValueOverAll: {
        flexDirection: 'row',
        // columnGap: 10,
        // marginTop: -6,
        marginTop: 15,
        columnGap: 40,
        marginLeft: -8,

    },
    radioButtonValue: {
        flexDirection: 'row',
        alignItems: 'center',
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

    /*---------- Add Address -------*/
    addAddressButton: {
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: 140,
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
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

    /*--------- Loader ------------*/
    modalBackground: {
        flex: 1,
        alignItems: 'center',
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
        marginLeft: 12,
        marginTop: 14,
        marginBottom: 0,
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
    categoryName: {
        color: '#9091CC',
        textAlign: 'center',
        fontSize: 16,
        backgroundColor: '#F1F1FD',
        borderRadius: 7,
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
        color: 'grey',
    },
    listBottomText: {
        textAlign: 'center',
        padding: 10,
        color: 'lightgrey',
    },
    listLoader: {
        padding: 10,
    },
    categoryView: {
        width: 50,
        height: 36,
    }
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
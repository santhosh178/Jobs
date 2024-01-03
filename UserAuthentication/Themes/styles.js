import { StyleSheet } from "react-native";

export const themeColor = '#E42527';

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
    bthText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '600',
    },

    /*--------- Loader ------------*/
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 200,
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
    loginimage: {
        width: 540,
        height: 330,
    },
    loginContainer: {
        gap: 30,
        alignItems: 'center',
        padding: 50
    },
    welcomeMsg: {
        fontSize: 30,
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
        borderColor: '#A9A9A9',
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

});
export default styles;
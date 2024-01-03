import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    /*---------- Button -------------*/
    btn: {
        width: 120,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        height: 40,
        backgroundColor: '#FF0000',
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
    image: {
        width: 390,
        height: 260,
    },
    loginContainer: {
        padding: 20,
        gap: 30,
        alignItems: 'center'
    },
    name: {
        fontSize: 30,
        fontWeight: '500',
        color: 'black',
    },
    input: {
        height: 40,
        width: 310,
        borderWidth: 1,
        opacity: 0.6,
        borderRadius: 20,
        padding: 10,
        borderColor: '#7E77FF',
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
        justifyContent : 'space-around',
        alignItems:'center',
        gap :25,
    },

});

export default styles;
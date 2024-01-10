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
    bthText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '600',
    },

    /*--------- Loader ------------*/
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent :'center',
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
    card: {
        borderRadius: 10,
        height: 140,
        margin: 12,
        marginBottom:0,
        padding: 10,
        backgroundColor: '#fff',
    },
    box: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.20,
        shadowRadius: 5.62,
        elevation: 8,
    },
    jobDescription : {
        color:'black',
        width:290,
        fontSize :16,
        fontFamily :'OpenSans-Bold',
    },
    status : {
        fontFamily :'OpenSans-Bold',
        color : 'green',
    },
    cardHeader : {
        flexDirection : 'row',
        justifyContent:'space-between'
    },
    categoryName : {
        color : 'black',
        fontStyle:'italic',
        fontSize : 16,
    },
    mode : {
        color : 'black',
        fontSize : 14,  
        opacity:0.6, 
    },
    payment: {
        color : 'black',
        fontSize : 16,
        fontFamily: 'OpenSans-Bold',
    },
    cardBottom : {
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    jobTime : {
        fontSize :12,
        color : 'grey'
    },

});
export default styles;
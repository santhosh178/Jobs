import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    /*---------- Button -------------*/
    btn: {
        width: 120,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        height: 40,
        backgroundColor: '#7E77FF',

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
        margin: 10,
        borderRadius: 15,
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
        width: 380,
        height: 250,
    },
    loginContainer: {
        padding: 20,
        gap: 30,
        alignItems: 'center'
    },

    name: {
        fontSize: 30,
        fontWeight: '600',
        color: '#7E77FF',
        textAlign: 'center'
    },

    input: {
        height: 40,
        width: 280,
        borderWidth: 2,
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

});
export default styles;
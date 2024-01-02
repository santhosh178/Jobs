import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    // common style

    Container: {
        alignItems: 'center',
        top: 200,
        gap: 20,

    },
    Text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000'
    },

    // Three Dot button in homescreen header 

    parent: {
        right: 10,
        top: 4,
    },
    dot: {
        backgroundColor: 'black',
        marginBottom: 3,
        width: 6,
        height: 6,
        borderRadius: 5,
    },

    // button 
    
    btn: {
        width: 180,
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        height: 40,
        backgroundColor: '#FF0000',

    },
    Click: {
        textAlign: 'center',
        color: '#fff'
    },

    // Loader

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
    }

});

export default styles;
import React, { useState } from "react";
import { View, Modal, Pressable, ActivityIndicator, Image } from "react-native";
import styles, { themeColor } from "../../../Themes/styles";
import Back from "../../../../assets/svg/back.svg";

const ImageFullScreen = ({ imageData, loading, imageStyle }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.imageOverallView}>
                    <View style={styles.imageBackImageView}>
                        <Back width={20} height={20} onPress={() => setModalVisible(false)} />
                    </View>
                    <Pressable style={styles.imageFullView}>
                        <Image
                            source={{ uri: `${imageData}` }}
                            style={styles.imageFullViewStyle}
                        />
                    </Pressable>
                </View>
            </Modal>
            <Pressable style={styles.imageFullView} onPress={() => { if (imageData) setModalVisible(true) }}>
                {loading ? (
                    <View style={styles.itemDetailsDummyImageStyle}>
                        <ActivityIndicator size="large" color={themeColor} />
                    </View>
                ) :
                    (imageData ?
                        <Image source={{ uri: `${imageData}` }} style={{...imageStyle}} />
                        :
                        <Image source={require('/home/test/Home/web/workspace/Jobs/UserAuthentication/Images/no-image.jpg')} style={{...imageStyle}} />)}
            </Pressable>
        </View>
    )
}

export default ImageFullScreen;
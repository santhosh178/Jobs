import React, { useState, useEffect } from "react";
import { Pressable, View, Modal, Text, FlatList, ScrollView } from "react-native";
import styles from "../../Themes/styles";
import { getAddress } from "../../Util/NetworkUtils";
import AddAddress from "./addAddress";
import Back from "../../../assets/svg/back.svg";
import Loader from "../loader";
import Button from "./button";
import I18n from "../../I18N/i18n";
import Check from "../../../assets/svg/check.svg";


const Address = ({ onSelectAddress, isVisible, onClose, }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);


  useEffect(() => {
    onPress();
  }, []);

  const onAddAddress = async () => {
    try {
      await onPress();
    } catch (error) {
      console.log(error);
    }
  };


  async function onPress() {
    try {
      setLoading(true);
      setData(await getAddress());
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const Item = ({ item }) => (
    <View style={styles.addressCard}>
      <Pressable
        onPress={() => {
          onSelectAddress({
            streetAddress: item.streetAddress,
            city: item.city,
            id: item.id
          },
          );
          onClose();
          setSelectedAddress(item);
        }}
      >
        <View style={styles.addressCardList}>
          <Text style={styles.addressCardText}>{I18n.t('address.street_address')} : {item.streetAddress}</Text>
          <Text style={styles.addressCardText}>{I18n.t('address.city')} : {item.city}</Text>
          <Text style={styles.addressCardText}>{I18n.t('address.state')} : {item.state}</Text>
          <Text style={styles.addressCardText}>{I18n.t('address.pincode')} : {item.pinCode}</Text>
          <Text style={styles.addressCardText}>{I18n.t('address.country')} : {item.country}</Text>
        </View>

        {selectedAddress && selectedAddress.id === item.id && (
          <View style={styles.selectAddress}>
            <Check  width={20} height={20} />
          </View>
        )}
      </Pressable>
    </View>
  );

  return (
    <View>
      <Loader loading={loading} />
      <Modal
        animationType="slide"
        transparent={false}
        visible={isVisible}
        onRequestClose={onClose}
      >
        <ScrollView>
          <View>
            <View style={styles.header}>
              <View style={styles.backSvg}>
                <Back onPress={onClose} />
              </View>
              <View>
                <Text style={styles.headername}>{I18n.t('address.header_name')}</Text>
              </View>
            </View>
            <View>
              <FlatList
                data={data}
                renderItem={({ item }) => <Item item={item} />}
                scrollEnabled={false}
              />
            </View>
            <View style={styles.addressCardButton}>
              <Pressable onPress={onClose}>
                <Button name={I18n.t('button.cancel')} cancel={styles.cancelBtn}/>
              </Pressable>
              <AddAddress onAddAddress={onAddAddress} />
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default Address;

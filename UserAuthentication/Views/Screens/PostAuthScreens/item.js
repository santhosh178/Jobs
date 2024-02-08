import React, { memo, useMemo } from "react";
import { Text, View, Pressable } from "react-native";
import styles, { getDynamicStyles } from "../../../Themes/styles";
import Warning from '../../../../assets/svg/warning.svg';

const Item = memo(({ item, navigation }) => {
    const { status, card } = getDynamicStyles(item.status);

    const formattedDateTime = useMemo(() => {
        const inputDateString = item.jobTime;
        const date = new Date(inputDateString);

        if (!isNaN(date)) {
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear().toString().slice(-2);
            const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

            return `${day} ${month} '${year} ${time}`;
        } else {
            console.log("Invalid Date");
            return null;
        }
    }, [item.jobTime]);

    return (
        <Pressable onPress={() => navigation.navigate('ItemDetails', item)}>
            <View style={[styles.card, styles.box, { backgroundColor: 'white' }, card]}>
                <View style={styles.cardHeader}>
                    <Text style={[styles.status, status]}>{item.status}</Text>
                    {item.mode === 'immediate' && item.status === 'open' && <Warning width={24} heigh={24} />}
                    <Text style={styles.jobTime}>{formattedDateTime}</Text>
                </View>
                <Text style={styles.jobDescription} numberOfLines={2} ellipsizeMode="tail">{item.jobDescription}</Text>
                <View style={styles.cardBottom}>
                    <View style={styles.categoryView}>
                        <Text style={styles.categoryName}>{item.category.name}</Text>
                    </View>
                    <Text style={styles.payment}>₹{item.payment}</Text>
                </View>
            </View>
        </Pressable>
    )
});
export default Item;

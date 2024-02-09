import React, { memo, useMemo } from "react";
import { Text, View, Pressable } from "react-native";
import styles, { getDynamicStyles, themeColor } from "../../../Themes/styles";

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
                    <View style={{flexDirection: 'row',gap: 5}}>
                        {item.mode === 'immediate' && item.status === 'open' && <View style={{ width: 8, height: 8, backgroundColor: themeColor, borderRadius: 2, marginTop: 7 }}></View>}
                        <Text style={[styles.status, status]}>{item.status}</Text>
                    </View>
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

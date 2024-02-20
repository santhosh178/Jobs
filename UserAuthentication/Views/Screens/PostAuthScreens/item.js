import React, { memo, useMemo } from "react";
import { Text, View, Pressable } from "react-native";
import styles, { getDynamicStyles } from "../../../Themes/styles";
import I18n from "../../../I18N/i18n";

const Item = memo(({ item, navigation, onNavigateToItemDetails }) => {
    const { status, card } = getDynamicStyles(item.status);
    const assingerName = item.assigner ? item.assigner.name : '';

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
        <Pressable onPress={() => {
            onNavigateToItemDetails();
            navigation.navigate('ItemDetails', item)
        }}>
            <View style={[styles.card, styles.box, card]}>
                <View style={styles.cardHeader}>
                    <View style={styles.cardHeaderLine}>
                        {item.mode === 'immediate' && <View style={styles.square}></View>}
                        <Text style={[styles.status, status]}>{item.status}</Text>
                    </View>
                    <Text style={styles.jobTime}>{formattedDateTime}</Text>
                </View>
                <Text style={styles.jobDescription} numberOfLines={2} ellipsizeMode="tail">{item.jobDescription}</Text>
                <View>
                    <View style={styles.categoryView}>
                        <Text style={styles.categoryName}>{item.category.name}</Text>
                    </View>
                </View>
                <View style={styles.cardBottom}>
                    <Text style={{ width: 100 }}>{item.assigner ? `${I18n.t('home.assigned')} : ${assingerName}` : I18n.t('home.unassigned')}</Text>
                    <Text style={styles.payment}>₹{item.payment}</Text>

                </View>
            </View>
        </Pressable>
    )
});
export default Item;

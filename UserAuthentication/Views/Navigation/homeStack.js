import React, { useState } from "react";
import HomeScreen from "../Screens/PostAuthScreens/homeScreen";
import I18n from "../../I18N/i18n";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyJobs from "../Screens/PostAuthScreens/myJobs";
import Home from '../../../assets/svg/home.svg';
import Businessman from '../../../assets/svg/businessman.svg';
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { themeColor } from "../../Themes/styles";
import AddJob from "../Screens/addJob";

const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName, focused) => {
    let icon;
    let iconStyle = {
        width: 24,
        height: 24,
        fill: focused ? themeColor : 'grey',
    };

    switch (routeName) {
        case 'All Jobs':
            icon = <Home style={iconStyle} />;
            break;
        case 'My Jobs':
            icon = <Businessman style={iconStyle} />;
            break;
        default:
            break;
    }

    return icon;
};

const HomeStack = ({ route }) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'All Jobs';
    const [itemDetailsScreen, setItemDetailsScreen] = useState(false);

    const updateItemDetailsScreenOpen = (value) => {
        setItemDetailsScreen(value);
    };

    return (
        <Tab.Navigator
            initialRouteName="All Jobs"
            screenOptions={() => ({
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderTopColor: '#F3F3F3',
                },
            })}
        >
            <Tab.Screen
                name={I18n.t('home.screen_header_name')}
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => getTabBarIcon(I18n.t('home.screen_header_name'), focused),
                    tabBarLabelStyle: { color: routeName === I18n.t('home.screen_header_name') ? themeColor : '#000000' },
                    headerShown: false,
                }}
                initialParams={{ itemDetailsScreen }}
            />
            <Tab.Screen
                name="Add Job"
                component={AddJob}
                options={{
                    tabBarIcon: () => ( <AddJob initialParams={ itemDetailsScreen } updateItemDetailsScreenOpen={updateItemDetailsScreenOpen}/>),
                    tabBarLabel: () => null,
                    headerShown: false,
                }}
                
            />
            <Tab.Screen
                name="My Jobs"
                component={MyJobs}
                options={{
                    tabBarIcon: ({ focused }) => getTabBarIcon('My Jobs', focused),
                    tabBarLabelStyle: { color: routeName === 'My Jobs' ? themeColor : '#000000' },
                    headerShown: false,
                }}
                initialParams={{ itemDetailsScreen }}
            />
        </Tab.Navigator>
    )
};

export default HomeStack;
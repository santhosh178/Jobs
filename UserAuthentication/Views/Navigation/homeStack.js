import React from "react";
import HomeScreen from "../Screens/PostAuthScreens/homeScreen";
import I18n from "../../I18N/i18n";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../Screens/PostAuthScreens/profileScreen";
import MyJobs from "../Screens/PostAuthScreens/myJobs";
import Home from '../../../assets/svg/home.svg';
import Profile from '../../../assets/svg/profile (2).svg';
import Businessman from '../../../assets/svg/businessman.svg';
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { themeColor } from "../../Themes/styles";

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
            icon = <Businessman style={iconStyle}/>;
            break;
        case 'Profile':
            icon = <Profile style={iconStyle}/>;
            break;
        default:
            break;
    }

    return icon;
};

const HomeStack = ({ route }) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'All Jobs';
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
                    tabBarLabelStyle: { color: routeName === I18n.t('home.screen_header_name') ? themeColor : 'black' },
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="My Jobs"
                component={MyJobs}
                options={{
                    tabBarIcon: ({ focused }) => getTabBarIcon('My Jobs', focused),
                    tabBarLabelStyle: { color: routeName === 'My Jobs' ? themeColor : 'black' },
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => getTabBarIcon('Profile', focused),
                    tabBarLabelStyle: { color: routeName === 'Profile' ? themeColor : 'black' },
                }}
            />
        </Tab.Navigator>
    )
};

export default HomeStack;
import React from "react";
import HomeScreen from "../Screens/PostAuthScreens/homeScreen";
import I18n from "../../I18N/i18n";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../Screens/PostAuthScreens/profileScreen";
import MyJobs from "../Screens/PostAuthScreens/myJobs";
import Home from '../../../assets/svg/home.svg';
import Profile from '../../../assets/svg/profile.svg';
import Detective from '../../../assets/svg/detective.svg';

const Tab = createBottomTabNavigator();

const HomeStack = () => {
    return (
        <Tab.Navigator
            initialRouteName="All Jobs"
            screenOptions={() => ({
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'green',
                tabBarStyle: {
                    display: 'flex',
                },
            })}
        >
            <Tab.Screen
                name={I18n.t('home.screen_header_name')}
                component={HomeScreen}
                options={{
                    tabBarIcon: () => (
                        <Home width={24} height={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="My Jobs"
                component={MyJobs}
                options={{
                    tabBarIcon: () => (
                        <Detective width={24} height={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: () => (
                        <Profile width={24} height={24} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
};

export default HomeStack;
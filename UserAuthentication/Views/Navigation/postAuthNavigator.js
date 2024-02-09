import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemDetails from "../Screens/PostAuthScreens/itemDetails";
import HomeStack from "./homeStack";
import ProfileScreen from "../Screens/PostAuthScreens/profileScreen";

const PostAuthNavigator = () => {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator initialRouteName="home">
      <Screen
        name="home"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="ItemDetails"
        component={ItemDetails}
        options={{ headerShown: false }}
      />
      <Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Navigator>
  )
};
export default PostAuthNavigator;
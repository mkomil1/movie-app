import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Home } from "../screens/home";
import Movie from "../screens/movie";
import Ionicons from "react-native-vector-icons/Ionicons";
const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <NavigationContainer>
      {/* Biz screenOptions di ichidagi objectdan route distruktratsiya (Destructuring) qilib olvolibmiz undan so'ng route name da biz turgan oynalarni name bo'ladi shundan biz foydalanib harbir oynada o'zimizga kerakli icon yoki boshqa narsalardi chiqarsak bo'ladi */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Details") {
              iconName = focused ? "settings" : "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          /// buyerda biz tab Button di active bo'lgan yoki bo'lmagan holatlariga rang beribmiz
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Details"
          component={Movie}
          options={{ headerShown: false, tabBarBadge: 2 }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;

import React from 'react'
import {NavigationContainer} from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/home';
import Movie from '../screens/movie';

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
    /// biz NavigationContainer reactdagi BrowserRouter router ga o'xshaydi, Stack bu bizga oynadan oyna o'tish uchun kerak bo'ladi
    // NavigationContainer = BrowserRouter
    // Stack.Navigator = Routes
    // Stack.Screen = Route
    // <Stack.Screen name="Home"/> bu yerdagi name dagi Home id desak bo'ladi boshqa screenga o'tish uchun Home id kerak bo'ladi
    // Stack.Screen dagi componentlarga navigation props orqali methodlar bervoradi uni ichida navigate degan mehod bor shu bilan biz boshqa screeenga o'ta olamiz, huddi react dagi useNavigate ha o'xshaydi vaqat buni propsdan olib ishlatamiz

  return (
    <NavigationContainer>  
      <Stack.Navigator>
        {/* headerShown qo'yganimiz sababi tepadagi headerda biz name bergan, Home headerda chiqadi shuni o'chiradi */}
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Movie" component={Movie} options={{headerShown: false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation

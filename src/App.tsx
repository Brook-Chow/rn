/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {type PropsWithChildren} from 'react';
import {Platform,Text,View} from 'react-native';

import HomeScreen from './page/home/index'
import TestScreen from './page/test/index'
import WviewScreen from './page/webView';


type RootStackParamList = {
  Home: undefined,
  Profile: { name: string }
  [propName:string]:any
};

const Stack = createNativeStackNavigator<RootStackParamList>()



const App = () => {
  return (
    <NavigationContainer >
    <Stack.Navigator>
     <Stack.Screen name="Home" 
     options={{
         headerTitle:"首页",
         headerRight: () => (<View><Text>分享</Text></View>),
         headerBackButtonMenuEnabled:true,
         headerBackVisible:true,
         headerShown:false
       }} 
     component={HomeScreen} />
          <Stack.Screen name="Wview"
        options={{
         headerBackTitle:"",
         headerBackButtonMenuEnabled:true,
         headerBackVisible:true,//是否显示返回
         headerTransparent:true,
         headerShown:true,
         headerShadowVisible:false,
         
        //  statusBarStyle:Platform.OS ==='ios'?'auto':'dark'
       }} 
     component={WviewScreen} />
     <Stack.Screen name="Test"
        options={{
         headerTitle:"个人中心",
         headerBackTitle:"",
         headerLeft:() => (<View><Text>左</Text></View>),
         headerRight: () => (<View><Text>右</Text></View>),
         headerBackButtonMenuEnabled:true,
         headerBackVisible:true,//是否显示返回
        //  headerTransparent:false,
         headerShown:true,
         headerShadowVisible:false,
         
        //  statusBarStyle:Platform.OS ==='ios'?'auto':'dark'
       }} 
     component={TestScreen} />

   </Stack.Navigator>
 </NavigationContainer>
  );
};


export default App;

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {Alert, Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import { login } from '../../api/test';
import { getItem, setItem } from '../../utils/storage';

type RootStackParamList = {
  Home: undefined;
  Profile: {name: string};
  [propName: string]: any;
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};


export default function Home({navigation}: Props) {

    const doLogin = async () => {
        console.log('login');
        try {
          let result = await login({
            'mobile': '18797812308',
            'code': '8888',
            'uuid': '8888',
          });
          setItem('userInfo',result.data)
        } catch(e) {
          console.log(e)
        }
      }
      
      const getStorage = async ()=>{
        let res =await getItem('userInfo')
        Alert.alert(JSON.stringify(res))
      }



      const chooseImage = ()=>{
        ImageCropPicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
          })
      }



      const chooseCamera = ()=>{
        ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            console.log(image);
          });
    }

   
  
  return (
    <SafeAreaView>
      <ScrollView>
      <Text>home page</Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Test')}>
        <Text style={styles.btn_text}>跳转</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.btn} onPress={() => doLogin()}>
        <Text style={styles.btn_text}>请求</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.btn} onPress={() => getStorage()}>
        <Text style={styles.btn_text}>读取storage</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.btn}
        onPress={() => chooseImage()}>
        <Text style={styles.btn_text}>照片</Text>
      </TouchableOpacity>



      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.btn}
        onPress={() => chooseCamera()}>
        <Text style={styles.btn_text}>相机</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.btn}
        onPress={() => navigation.navigate('Wview',{url:'https://qq.com'})}>
        <Text style={styles.btn_text}>webview</Text>
      </TouchableOpacity>


</ScrollView>
    </SafeAreaView>
  );

}


const styles = StyleSheet.create({
    home: {
      marginTop: 40,
    },
    btn: {
      backgroundColor: 'blue',
      width: 100,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      marginLeft: 20,
      marginBottom:40
    },
    btn_text: {
      color: 'white',
    }
  });

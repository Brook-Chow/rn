import React, {useRef} from 'react';
import {
  Animated,
  AppState,
  Dimensions,
  Easing,
  FlatList,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {_panResponder} from '../../utils/util';

export default function Test() {
  let data: any[] = [];

  AppState.addEventListener('change',(e)=>{
    console.log('current state:',e)
  })

  

  const translateX = useRef(new Animated.Value(0)).current;

  const xAnimate = async () => {
    Animated.spring(translateX, {
      toValue: -140,
      useNativeDriver: true,
   
      friction:5,
      tension:80
    //   duration:200
    }).start();
    await Share.share({title:'dsds',message:'message'})
  };

  const xAnimate2 = () => {
    Animated.timing(translateX, {
      toValue: 0,
      duration:100,
      useNativeDriver: true,
    //   friction:10,
    //   tension:80
    }).start();
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View>
        <View style={styles.block}>
          <Animated.View
            {..._panResponder({rtl: xAnimate,ltr:xAnimate2}).panHandlers}
            style={[styles.item, {transform: [{translateX: translateX}]}]}>
            <View>
              <Text> 某某</Text>
            </View>
          </Animated.View>
          <View style={{width: 140, backgroundColor: 'red', height: 80}}>
            <Text> 操作</Text>
          </View>
        </View>

        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <Text>{item.name}</Text>}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    width: Dimensions.get('window').width,
    height: 80,
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    width: Dimensions.get('window').width,
    backgroundColor: 'blue',
    height: 80,
  },
});


import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Wview({navigation,route}:any){

    const [title,setTitle] = useState('D27')
    useEffect(()=>{
        navigation.setOptions({
            headerTitle:title
          })
    },[title])
    return (
        <SafeAreaView   style={{width:'100%',height:'100%'}}>
        <WebView source={{uri:route.params.url}} onLoadEnd={(e)=>setTitle(e.nativeEvent.title||'D27')} />  
         </SafeAreaView>
    )
}

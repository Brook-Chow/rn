import { PermissionsAndroid,PanResponder, PanResponderInstance } from "react-native";
import { init, Geolocation } from "react-native-amap-geolocation";

export async function getLocation(){
    await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
      
      await init({
        ios: "9bd6c82e77583020a73ef1af59d0c759",
        android: "043b24fe18785f33c491705ffe5b6935",
      });
      
      Geolocation.getCurrentPosition(({ coords }) => {
        console.log(coords);
      });
}

type PanCallBack = {
  ltr?:Function
  rtl?:Function
  ttb?:Function
  btt?:Function
}

export const _panResponder = (callback:PanCallBack):PanResponderInstance=>{
  return PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
        // console.log('开始移动：');
    },
    onPanResponderMove: (evt, gs) => {
        // console.log('正在移动：X轴：' + gs.dx + '，Y轴：' + gs.dy);
    },
    onPanResponderRelease: (evt, gs) => {
        console.log('结束移动：X轴移动了：' + gs.dx + '，Y轴移动了：' + gs.dy);
        if (gs.dx > 50) {
            console.log('由左向右');

            callback.ltr&&callback.ltr()
        } else if (gs.dx < -50) {
            console.log('由右向左');
            callback.rtl&&callback.rtl(gs.dx)
        } else if (gs.dy > 50) {
            console.log('由上向下');
            callback.ttb&&callback.ttb()
        } else if (gs.dy < -50) {
            console.log('由下向上');
          callback.btt&&callback.btt()

        }
    }
  })
}

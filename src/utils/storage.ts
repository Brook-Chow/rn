import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getItem(key: string, isObj: boolean = true) {
  try {
    let result = await AsyncStorage.getItem(key);
    return result&&(isObj?JSON.parse(<string>result):result);
  } catch (e) {
    console.log(e);
  }
}

export async function setItem(key: string, val: object | string) {
  try {
    await AsyncStorage.setItem(
      key,
      typeof val === 'object' ? JSON.stringify(val) : val,
    );
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function rmItem(key: string) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function clearAll() {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

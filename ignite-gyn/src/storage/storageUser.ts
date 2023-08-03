import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDTO } from "@dtos/UserDTO";
import { USER_STORAGE } from "./storageConfig";


export async function storageUserSave(user: UserDTO) {
  try {
    const saveUser = JSON.stringify(user)

    await AsyncStorage.setItem(USER_STORAGE, saveUser )

  } catch (error) {
    throw error;
  }
}


export async function storageGetUser() {
  try {
    const storage = await AsyncStorage.getItem(USER_STORAGE)

    const user: UserDTO = storage ? JSON.parse(storage) : {}

    return user

  } catch (error) {
    throw error
  }
}

export async function storageRemoveUser() {
  try {
    
    await AsyncStorage.removeItem(USER_STORAGE)

  } catch (error) {
    throw error
  }
}
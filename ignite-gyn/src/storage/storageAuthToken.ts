import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN } from "./storageConfig";

type StorageAuthTokenProps = {
  token: string;
  refresh_token: string;
}

export async function storageAuthTokenSave({ refresh_token, token }: StorageAuthTokenProps) {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN, JSON.stringify({ refresh_token, token }));
  } catch (error) {
    throw error;
  }
}

export async function storageAuthTokenGet() {
  try {
    const response = await AsyncStorage.getItem(AUTH_TOKEN);

    const { refresh_token, token }: StorageAuthTokenProps = response ? JSON.parse(response) : {}

    return { refresh_token, token };
    
  } catch (error) {
    throw error;
  }
}


export async function storageAuthTokenRemove() {
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN);
  } catch (error) {
    throw error;
  }
}

import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerRemoveByGroup(group: string, name: string) {

  try {
    const players = await playersGetByGroup(group)

    const filter = players.filter(player => player.name !== name);
    const storage = JSON.stringify(filter)
  
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage )
  }catch(error) {
    throw error
  }
}
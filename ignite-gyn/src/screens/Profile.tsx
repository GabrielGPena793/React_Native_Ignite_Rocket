import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Center, Heading, ScrollView, Skeleton, VStack, useToast } from "native-base";
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from 'expo-file-system';

import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoLoading, setPhotoLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('http://github.com/gabrielgpena793.png')

  const toast = useToast()

  async function handleUserPhotoSelect() {

    setPhotoLoading(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      })

      if (photoSelected.canceled) {
        return;
      }

      const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

      if(photoInfo.exists && (photoInfo.size / 1024 / 1024) > 5) {
        return toast.show({
          title: "Imagem muito grande, tamanho máximo suportado 5MB",
          placement: 'top',
          bgColor: 'red.500'

        })
      }

      setUserPhoto(photoSelected.assets[0].uri)
    } catch (error) {
      console.log('handleUserPhotoSelect', error)
    }

    setPhotoLoading(false)
  }

  return (
    <VStack flex={1}>
      <ScreenHeader tittle="Perfil" />

      <ScrollView _contentContainerStyle={{ pb: 12 }}>
        <Center mt={6} px={10}>
          {photoLoading ? (
            <Skeleton
              h={PHOTO_SIZE}
              w={PHOTO_SIZE}
              rounded='full'
              startColor='gray.500'
              endColor='gray.400'
            />
          ) : (
            <UserPhoto
              source={{ uri: userPhoto }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Heading color='green.500' fontSize='md' mt={3} mb={8}>
              Alterar foto
            </Heading>
          </TouchableOpacity>

          <Input
            bg='gray.600'
            placeholder="Nome"
            mb={3}
          />

          <Input
            bg='gray.600'
            placeholder="gabrielgpenatech@hotmail.com"
            isDisabled
          />

          <Heading color='gray.200' fontSize='md' mb={2} mt={12} alignSelf='flex-start'>
            Alterar senha
          </Heading>

          <Input
            bg='gray.600'
            placeholder="Senha antiga"
            secureTextEntry
            mb={3}
          />

          <Input
            bg='gray.600'
            placeholder="Nova senha"
            secureTextEntry
            mb={3}
          />

          <Input
            bg='gray.600'
            placeholder="Confirme a nova senha"
            secureTextEntry
            mb={3}
          />

          <Button
            text="Atualizar"
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, Heading, ScrollView, Skeleton, VStack } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoLoading, setPhotoLoading] = useState(false)

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
              source={{ uri: 'http://github.com/gabrielgpena793.png' }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity>
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
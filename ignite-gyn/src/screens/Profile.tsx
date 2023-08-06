import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Center, Heading, ScrollView, Skeleton, VStack, useToast } from "native-base";

import * as ImagePicker from "expo-image-picker"
import * as FileSystem from 'expo-file-system';
import userPhotoDefaultPng from "@assets/userPhotoDefault.png"

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"

import { Button } from "@components/Button";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";

import { useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import { ControlledInput } from "@components/ControlledInput";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";

type FormDataType = {
  email: string;
  name: string;
  password: string;
  old_password: string;
  confirm_password: string;
}

const profileSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  password: yup.string().min(6, "A senha deve conter pelo menos 6 dígitos").nullable().transform(value => !!value ? value : null),
  confirm_password: yup.string().when("password", {
    is: (password: string) => !!password,
    then: (profileSchema) => profileSchema.required("Confirme a senha.").transform(value => !!value ? value : null)
  })
    .nullable()
    .transform(value => !!value ? value : null)
    .oneOf([yup.ref('password'), null], "A senhas não são iguais.")
}) 

const PHOTO_SIZE = 33;

export function Profile() {
  const [updatingUser, setUpdatingUser] = useState(false)
  const [photoLoading, setPhotoLoading] = useState(false)

  const toast = useToast()
  const { user, updateUserProfile } = useAuth()

  const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormDataType>({
    defaultValues: {
      name: user.name,
      email: user.email
    },
    resolver: yupResolver(profileSchema)
  })

  function resetField() {
    setValue('confirm_password', '')
    setValue('password', '')
    setValue('old_password', '')
  }

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
        setPhotoLoading(false)
        return;
      }

      const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

      if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 5) {
        return toast.show({
          title: "Imagem muito grande, tamanho máximo suportado 5MB",
          placement: 'top',
          bgColor: 'red.500'

        })
      }

      const fileExtension = photoSelected.assets[0].uri.split('.').pop()

      const photoFile = {
        name: `${user.name}.${fileExtension}`.toLowerCase(),
        uri: photoSelected.assets[0].uri,
        type: `${photoSelected.assets[0].type}/${fileExtension}`,
      } as any;

      const userPhotoUploadForm = new FormData()
      userPhotoUploadForm.append("avatar", photoFile)

      const userAvatarUpdated = await api.patch("/users/avatar", userPhotoUploadForm, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const avatarUpdated = user
      avatarUpdated.avatar = userAvatarUpdated.data.avatar
      updateUserProfile(avatarUpdated)

      toast.show({
        title: "Foto atualizada.",
        placement: 'top',
        bg: 'green.500'
      })

    } catch (error) {
      const title = AppError.isAppError(error)

      toast.show({
        title,
        placement: 'top',
        bg: 'red.500'
      })
    }

    setPhotoLoading(false);
  }

  async function handleUpdatePassword(data: FormDataType) {
    try {
      setUpdatingUser(true)

      const userUpdated = user
      userUpdated.name = data.name

      await api.put("/users", data)

      await updateUserProfile(userUpdated)
      resetField()
      
      toast.show({
        title: "Perfil atualizado com sucesso",
        placement: 'top',
        bg: 'green.500'
      })

    } catch (error) {
      const title = AppError.isAppError(error)

      toast.show({
        title,
        placement: 'top',
        bg: 'red.500'
      })
    }

    setUpdatingUser(false)
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
              source={user.avatar ? { uri : `${api.defaults.baseURL}/avatar/${user.avatar}` } : userPhotoDefaultPng }
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Heading color='green.500' fontSize='md' fontFamily="heading" mt={3} mb={8}>
              Alterar foto
            </Heading>
          </TouchableOpacity>

          <ControlledInput
            name="name"
            control={control}
            bg='gray.600'
            placeholder="Nome"
            error={errors.name}
          />

          <ControlledInput
            name="email"
            control={control}
            bg='gray.600'
            placeholder="gabrielgpenatech@hotmail.com"
            isDisabled
            isReadOnly
          />

          <Heading color='gray.200' fontSize='md' fontFamily="heading" mb={2} mt={12} alignSelf='flex-start'>
            Alterar senha
          </Heading>

          <ControlledInput
            name="old_password"
            control={control}
            bg='gray.600'
            placeholder="Senha antiga"
            secureTextEntry
          />

          <ControlledInput
            name="password"
            control={control}
            bg='gray.600'
            placeholder="Nova senha"
            secureTextEntry
            error={errors.password}
          />

          <ControlledInput
            name="confirm_password"
            control={control}
            bg='gray.600'
            placeholder="Confirme a nova senha"
            secureTextEntry
            error={errors.confirm_password}
          />

          <Button
            text="Atualizar"
            onPress={handleSubmit(handleUpdatePassword)}
            isLoading={updatingUser}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}
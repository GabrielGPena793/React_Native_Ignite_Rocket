import { useNavigation } from "@react-navigation/native"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import { api } from "@services/api"

import { Center, Heading, Image, Text, VStack, ScrollView, useToast } from "native-base"
import { Button } from "@components/Button"
import { ControlledInput } from "@components/ControlledInput"

import LogoSvg from '@assets/logo.svg'
import backgroundImg from "@assets/background.png"
import { Alert } from "react-native"
import { AppError } from "@utils/AppError"


type FormDataProps = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  email: yup.string().required("Informe o email.").email("E-mail invalido."),
  password: yup.string().required("Informe a senha.").min(6, "A senha deve ter pelo menos 6 dígitos."),
  passwordConfirm: yup.string().required("Confirme a senha.").oneOf([yup.ref("password")], 'As senhas não são iguais.')
})

export function SignUp() {

  const toast = useToast()

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  })

  const navigation = useNavigation()

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      const response = await api.post('/users', { 
        email,
        name,
        password
      })

      console.log(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : "Não foi possível criar a conta, tente novamente mais tarde."

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })

    }  
  }

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} opacity={0.93} px={10} pb={12}>
        <Image
          source={backgroundImg}
          defaultSource={backgroundImg}
          alt="Duas pessoas treinando bicicleta"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize='sm'>
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color='gray.100' fontSize='xl' mb={6} fontFamily='heading'>
            Crie sua conta
          </Heading>

          <ControlledInput
            name="name"
            control={control}
            placeholder="Nome"
            error={errors.name}
          />

          <ControlledInput
            name="email"
            control={control}
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <ControlledInput
            name="password"
            control={control}
            placeholder="Senha"
            secureTextEntry
            error={errors.password}
          />

          <ControlledInput
            name="passwordConfirm"
            control={control}
            placeholder="Confirme a senha"
            secureTextEntry
            onSubmitEditing={handleSubmit(handleSignUp)}
            returnKeyType="send"
            error={errors.passwordConfirm}
          />

          <Button text="Criar e acessar" onPress={handleSubmit(handleSignUp)} />
        </Center>

        <Button
          text="Voltar para o login"
          variant='outline'
          mt={12}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  )
}
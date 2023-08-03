import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from "@routes/auth.routes"

import { Center, Heading, Image, Text, VStack, ScrollView, useToast } from "native-base"
import { Button } from "@components/Button"

import LogoSvg from '@assets/logo.svg'
import backgroundImg from "@assets/background.png"
import { useAuth } from '@hooks/useAuth'
import { ControlledInput } from '@components/ControlledInput'
import { useForm } from 'react-hook-form'

import * as yup from 'yup'
import { yupResolver} from '@hookform/resolvers/yup'
import { AppError } from '@utils/AppError'
import { useState } from 'react'

const schema = yup.object({
  email: yup.string().email("E-mail inválido.").required("Insira o e-mail."),
  password: yup.string().required("Insira a senha.")
})

type SignInDataProps = typeof schema.__outputType

export function SignIn() {

  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = useAuth()
  const toast = useToast()

  const { control, handleSubmit, formState: { errors } } = useForm<SignInDataProps>({
    resolver: yupResolver(schema)
  })

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  async function handleSignIn({ email, password }: SignInDataProps) {
    try {
      setIsLoading(true)
      await signIn(email, password)

    } catch (error) {
      const isAppError = error instanceof AppError

      setIsLoading(false)

      const title = isAppError ? error.message : "Erro no servidor."
      if(isAppError) {
        toast.show({ title, placement: 'top', bg: 'red.500' })
      } else {
        toast.show({ title, placement: 'top', bg: 'red.500' })
      }
    }
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
            Acesse sua conta
          </Heading>

          <ControlledInput
            name='email'
            control={control}
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <ControlledInput
            name='password'
            control={control}
            placeholder="Senha"
            secureTextEntry
            error={errors.password}
          />

          <Button 
            text="Acessar" 
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
        </Center>

        <Center mt={24}>
          <Text color='gray.100' fontSize='sm' mb={3} fontFamily='body'>
            Ainda não tem acesso ?
          </Text>

          <Button text="Criar conta" variant='outline' onPress={handleNewAccount} />
        </Center>
      </VStack>
    </ScrollView>
  )
}
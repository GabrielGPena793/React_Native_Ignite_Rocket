import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from "@routes/auth.routes"

import { Center, Heading, Image, Text, VStack, ScrollView } from "native-base"
import { Input } from "@components/Input"
import { Button } from "@components/Button"

import LogoSvg from '@assets/logo.svg'
import backgroundImg from "@assets/background.png"

export function SignIn() {

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNewAccount() {
    navigation.navigate('signUp')
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

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            mb={4}
          />

          <Input
            placeholder="Senha"
            secureTextEntry
            mb={4}
          />

          <Button text="Acessar" />
        </Center>

        <Center mt={24}>
          <Text color='gray.100' fontSize='sm' mb={3} fontFamily='body'>
            Ainda não tem acesso ?
          </Text>

          <Button text="Acessar" variant='outline' onPress={handleNewAccount} />
        </Center>
      </VStack>
    </ScrollView>
  )
}
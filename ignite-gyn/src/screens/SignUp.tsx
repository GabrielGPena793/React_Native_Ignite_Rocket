import { useNavigation } from "@react-navigation/native"

import { Center, Heading, Image, Text, VStack, ScrollView } from "native-base"
import { Input } from "@components/Input"
import { Button } from "@components/Button"

import LogoSvg from '@assets/logo.svg'
import backgroundImg from "@assets/background.png"


export function SignUp() {

  const navigation = useNavigation()

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


          <Input
            placeholder="Nome"
            mb={4}
          />

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

        <Button
          text="Voltar para o login"
          variant='outline'
          mt={24}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  )
}
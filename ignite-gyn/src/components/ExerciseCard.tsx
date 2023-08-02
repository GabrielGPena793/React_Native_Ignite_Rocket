import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";

import { Entypo } from  '@expo/vector-icons'

type ExerciseCardPros = TouchableOpacityProps & {}

export function ExerciseCard({...rest}: ExerciseCardPros) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg='gray.500' alignItems='center'  p={2} pr={4} rounded='md' mb={3}>
        <Image 
          source={{ uri: 'https://p2.trrsf.com/image/fget/cf/1200/900/middle/images.terra.com/2023/06/01/1855366748-remada-alta-1.jpg'}}
          alt="Imagem do exercício"
          resizeMode="cover"
          w={16}
          h={16}
          rounded='md'
          mr={4}
        />

        <VStack flex={1}>
          <Heading fontSize='lg' color='white' fontFamily="heading">
            Remada alta
          </Heading>
          <Text fontSize='sm' color='gray.200' numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>

        <Icon 
          as={Entypo}
          name="chevron-thin-right"
          color='gray.300'
        />
      </HStack>
    </TouchableOpacity>
  )
}
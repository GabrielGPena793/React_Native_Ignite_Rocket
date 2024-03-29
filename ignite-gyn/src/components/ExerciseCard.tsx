import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";

import { Entypo } from  '@expo/vector-icons'
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/api";

type ExerciseCardPros = TouchableOpacityProps & {
  data: ExerciseDTO
}

export function ExerciseCard({data, ...rest}: ExerciseCardPros) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg='gray.500' alignItems='center'  p={2} pr={4} rounded='md' mb={3}>
        <Image 
          source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`}}
          alt="Imagem do exercício"
          resizeMode="cover"
          w={16}
          h={16}
          rounded='md'
          mr={4}
        />

        <VStack flex={1}>
          <Heading fontSize='lg' color='white' fontFamily="heading">
            {data.name}
          </Heading>
          <Text fontSize='sm' color='gray.200' numberOfLines={2}>
            {data.series} séries x {data.repetitions} repetições
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
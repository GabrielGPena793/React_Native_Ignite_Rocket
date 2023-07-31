import { Box, HStack, Heading, Icon, Image, ScrollView, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";

import BodySvg from "@assets/body.svg"
import SeriesSVG from "@assets/series.svg"
import RepetitionsSVG from "@assets/repetitions.svg"

import { Feather } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { Button } from "@components/Button";

export function Exercise() {

  const navigation = useNavigation()

  function handleGoBack() { 
    navigation.goBack();
  }

  return (
    <VStack flex={1}>
      <VStack px={8} bg='gray.600' pt={12} >
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color='green.500' size={6} />
        </TouchableOpacity>

        <HStack textAlign='center' justifyContent='space-between' mt={4} mb={8}>
          <Heading color='gray.100' fontSize='lg' flexShrink={1}>
            Puxada frontal
          </Heading>

          <HStack alignItems='center'>
            <BodySvg />
            <Text color='gray.200' ml={1} textTransform='capitalize'>
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Image 
            source={{ uri: 'https://p2.trrsf.com/image/fget/cf/1200/900/middle/images.terra.com/2023/06/01/1855366748-remada-alta-1.jpg'}}
            alt="Nome do exercício"
            w='full'
            h={80}
            mb={3}
            resizeMode="cover"
            rounded='lg'
          />

          <Box bg='gray.600' rounded='md' pb={4} px={4}>
            <HStack alignItems='center' justifyContent='space-around' mb={6} mt={5}>
              <HStack>
                <SeriesSVG />

                <Text color='gray.200' ml={2}>
                  3 series
                </Text>
              </HStack>

              <HStack>
                <RepetitionsSVG />

                <Text color='gray.200' ml={2}>
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button 
              text="Marcar como realizado"
            />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
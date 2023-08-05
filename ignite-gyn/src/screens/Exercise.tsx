import { Box, HStack, Heading, Icon, Image, ScrollView, Text, VStack, useToast } from "native-base";
import { TouchableOpacity } from "react-native";

import BodySvg from "@assets/body.svg"
import SeriesSVG from "@assets/series.svg"
import RepetitionsSVG from "@assets/repetitions.svg"

import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "@components/Button";
import { useEffect, useState } from "react";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type RouteParams = {
  exerciseId: string
}

export function Exercise() {
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingCompleteExercise, setLoadingCompleteExercise] = useState(false)

  const toast = useToast()

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const route = useRoute()
  const { exerciseId } = route.params as RouteParams

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchExerciseById() {
    try {
      setIsLoading(true)
      const response = await api.get(`/exercises/${exerciseId}`)

      setExercise(response.data);

    } catch (error) {
      const title = AppError.isAppError(error)

      toast.show({
        title,
        placement: 'top',
        bg: 'red.500'
      })
    }
    setIsLoading(false)
  }

  async function handleCompleteExercise() {
    try {
      setLoadingCompleteExercise(true)

      await api.post(`/history`, { exercise_id: exerciseId })

      toast.show({
        title: 'Parabéns! O exercício foi registrado no seu histórico!',
        placement: 'top',
        bg: 'green.500'
      })

      navigation.navigate('history')
      
    } catch (error) {
      const title = AppError.isAppError(error)

      toast.show({
        title,
        placement: 'top',
        bg: 'red.500'
      })
    }
    setLoadingCompleteExercise(false)
  }

  useEffect(() => {
    fetchExerciseById()
  }, [exerciseId])

  return (
    <VStack flex={1}>
      <VStack px={8} bg='gray.600' pt={12} >
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color='green.500' size={6} />
        </TouchableOpacity>

        <HStack textAlign='center' justifyContent='space-between' mt={4} mb={8}>
          <Heading color='gray.100' fontSize='lg' fontFamily="heading" flexShrink={1}>
            {exercise.name}
          </Heading>

          <HStack alignItems='center'>
            <BodySvg />
            <Text color='gray.200' ml={1} textTransform='capitalize'>
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      {isLoading ? <Loading /> :
        <ScrollView>
          <VStack p={8}>
            <Box rounded='lg' mb={3} overflow='hidden'>
              <Image
                source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }}
                alt="Nome do exercício"
                w='full'
                h={80}
                resizeMode="cover"
              />
            </Box>

            <Box bg='gray.600' rounded='md' pb={4} px={4}>
              <HStack alignItems='center' justifyContent='space-around' mb={6} mt={5}>
                <HStack>
                  <SeriesSVG />

                  <Text color='gray.200' ml={2}>
                    {exercise.series} series
                  </Text>
                </HStack>

                <HStack>
                  <RepetitionsSVG />

                  <Text color='gray.200' ml={2}>
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>

              <Button
                text="Marcar como realizado"
                onPress={handleCompleteExercise}
                isLoading={loadingCompleteExercise}
              />
            </Box>
          </VStack>
        </ScrollView>
      }
    </VStack>
  )
}
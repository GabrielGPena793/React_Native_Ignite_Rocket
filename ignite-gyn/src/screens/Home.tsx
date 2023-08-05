import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { VStack, FlatList, HStack, Heading, Text, useToast } from "native-base";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";

export function Home() {
  const [groups, setGroups] = useState<string[]>([])
  const [exercise, setExercise] = useState<ExerciseDTO[]>([])
  const [groupSelected, setGroupSelected] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const toast = useToast()

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleNavigateExerciseDetails(exerciseId: string) {
    navigation.navigate('exercise', { exerciseId })
  }

  async function fetchGroups() {
    try {
      const groups = await api.get('/groups');

      setGroups(groups.data);
      setGroupSelected(groups.data[0])

    } catch (error) {
      const title = AppError.isAppError(error)

      toast.show({
        title,
        placement: 'top',
        bg: 'red.500'
      })
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true)

      const exercises = await api.get(`/exercises/bygroup/${groupSelected}`)

      setExercise(exercises.data);

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

  useEffect(() => {
    fetchGroups()
  }, [])

  useFocusEffect(useCallback(() => {
    fetchExercisesByGroup()
  }, [groupSelected]))

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
      />
      {isLoading ? <Loading /> :
        <VStack flex={1} px={8}>
          <HStack justifyContent='space-between' mb={5}>
            <Heading color='gray.200' fontSize='md' fontFamily="heading">
              Exercícios
            </Heading>
            <Text color='gray.200' fontSize='sm'>
              4
            </Text>
          </HStack>


          <FlatList
            data={exercise}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                onPress={() => handleNavigateExerciseDetails(item.id)}
                data={item}
              />
            )}
            _contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />

        </VStack>
      }
    </VStack>
  )
}
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Heading, SectionList, Text, Toast, VStack } from "native-base";

import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";
import { ScreenHeader } from "@components/ScreenHeader";

import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";

import { AppError } from "@utils/AppError";

import { api } from "@services/api";

export function History() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([] as HistoryByDayDTO[])


  async function fetchHistory() {
    try {
      setIsLoading(true)

      const history = await api.get("/history")
      setExercises(history.data)

    } catch (error) {
      const title = AppError.isAppError(error)

      Toast.show({
        title,
        placement: 'top',
        bg: 'red.500'
      })
    }
    setIsLoading(false)
  }

  useFocusEffect(useCallback(() => {
    fetchHistory()
  }, []))

  return (
    <VStack flex={1}>
      <ScreenHeader tittle="Histórico de Exercícios" />

      {isLoading ? <Loading /> :
        <SectionList
          sections={exercises}
          keyExtractor={item => item.id}
          renderSectionHeader={({ section }) => (
            <Heading color='gray.200' fontSize='md' fontFamily="heading" mt={10} mb={3}>
              {section.title}
            </Heading>
          )}
          renderItem={({ item }) => <HistoryCard history={item} /> }
          px={8}
          contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text color='gray.100' textAlign='center'>
              Não há exercícios registrados ainda. {'\n'}
              Que tal começar a praticar?
            </Text>
          )}
        />
      }
    </VStack>
  )
}
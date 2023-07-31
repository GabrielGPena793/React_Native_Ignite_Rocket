import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Heading, SectionList, Text, VStack } from "native-base";
import { useState } from "react";

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '20.08.23',
      data: ['Puxada frontal',  'Remada unilateral']
    },
    {
      title: '21.08.23',
      data: ['Agachamento']
    }
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader tittle="Histórico de Exercícios" />


      <SectionList
        sections={exercises}
        keyExtractor={item => item}
        renderSectionHeader={({ section }) => (
          <Heading color='gray.200' fontSize='md' mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        renderItem={({ item }) => (
          <HistoryCard />
        )}
        px={8}
        contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center'}}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text color='gray.100' textAlign='center'>
            Não há exercícios registrados ainda. {'\n'}
            Que tal começar a praticar?
          </Text>
        )}
      />

    </VStack>
  )
}
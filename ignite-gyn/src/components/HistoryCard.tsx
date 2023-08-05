import { HistoryDTO } from "@dtos/HistoryDTO";
import { HStack, Heading, Text, VStack } from "native-base";

type HistoryCardProps = {
  history: HistoryDTO
}

export function HistoryCard({ history }: HistoryCardProps) {
  return (
    <HStack w='full' px={5} py={4} mb={3} bg='gray.600' rounded='md' alignItems='center' justifyContent='space-between'>
      <VStack  flex={1} mr={5}>
        <Heading color='white' fontSize='md' fontFamily="heading" textTransform='capitalize' numberOfLines={1}>
          {history.group}
        </Heading>
        <Text color='gray.100' fontSize='lg'  numberOfLines={1}>
          {history.name}
        </Text>
      </VStack>

      <Text  color='gray.300' fontSize='md' >
        {history.hour}
      </Text>
    </HStack>
  )
}
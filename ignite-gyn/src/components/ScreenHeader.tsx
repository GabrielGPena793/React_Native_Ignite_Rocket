import { Center, Heading } from "native-base";

type ScreenHeaderProps = {
  tittle: string
}

export function ScreenHeader({ tittle }: ScreenHeaderProps) {
  return (
    <Center bg='gray.600' pb={6} pt={16}>
      <Heading color='gray.100' fontSize='xl'>
        {tittle}
      </Heading>
    </Center>
  )
}
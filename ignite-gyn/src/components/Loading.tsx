import { Center, Spinner } from "native-base";

export function Loading() {

  return (
    <Spinner 
      flex={1}
      color="green.500" 
      bg="gray.700" 
    />
  )
}
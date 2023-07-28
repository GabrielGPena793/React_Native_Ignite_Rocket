import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base'

type ButtonProps = IButtonProps & {
  text: string;
  variant?: 'solid' | 'outline';
}

export function Button({ text, variant = 'solid', ...rest }: ButtonProps) {
  return (
    <NativeBaseButton
      w='full'
      h={14}
      bg={variant === 'outline' ? 'transparent' : 'green.700'}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor='green.500'
      rounded='sm'
      _pressed={{
        bg: variant === 'outline' ? 'gray.500' : 'green.500'
      }}
      {...rest}
    >
      <Text
        color={variant === 'outline' ? 'green.500' : 'white'}
        fontFamily='body'
        fontSize='sm'
      >
        {text}
      </Text>
    </NativeBaseButton>
  )
}
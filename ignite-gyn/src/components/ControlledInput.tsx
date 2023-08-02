import { Controller, Control, FieldError } from "react-hook-form";
import { IInputProps, FormControl } from 'native-base'
import { Input } from "./Input";

type ControlledInputProps = IInputProps & {
  name: string;
  control: Control<any>;
  error?: FieldError
}

export function ControlledInput({ name, control, error, ...rest }: ControlledInputProps) {
  const invalid = !!error?.message

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <Controller
        name={name}
        control={control}
        rules={{ 
          required: `informe o ${name}`
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={onChange}
            value={value}
            isInvalid={invalid}
            {...rest}
          />
        )}
      />

      <FormControl.ErrorMessage _text={{ color: 'red.500'}}>
       {error?.message}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}
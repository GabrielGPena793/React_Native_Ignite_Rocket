import { Image, IImageProps } from "native-base";

type UserPhotoProps =  IImageProps & {
  size: number
}

export function UserPhoto({ size, ...rest }: UserPhotoProps) {
  return (
    <Image
      h={size}
      w={size}
      rounded='full'
      {...rest}
    />
  )
}
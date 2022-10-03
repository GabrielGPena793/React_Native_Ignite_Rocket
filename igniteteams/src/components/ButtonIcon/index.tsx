import { TouchableOpacityProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { Container, Icon, ButtonIconStyledProps } from './styles,'

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap
  type?: ButtonIconStyledProps

}

export function ButtonIcon({ icon, type = 'PRIMARY', ...rest}: Props){
  return (
    <Container>
      <Icon 
        name={icon} 
        type={type} 
        { ...rest}  
      />
    </Container>
  )

}
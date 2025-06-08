import colors from '@/shared/colors'
import { Text, TouchableOpacity } from 'react-native'
const Button = ({title,onPress,backgroundColor}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    style={{
      padding : 20,
      backgroundColor : backgroundColor,
      width : '100%', 
      borderRadius : 20

    }}>
      <Text style={{
        fontSize : 20,
        color : colors.WHITE,
        textAlign : 'center'
      }}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button
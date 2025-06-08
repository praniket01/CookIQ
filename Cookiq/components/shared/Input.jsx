import { TextInput } from 'react-native'
import colors from '../../shared/colors'

const Input = ({placeholder,onChangeText,password=false}) => {
  return (
      <TextInput placeholder={placeholder}
      secureTextEntry = {password}
      onChangeText={(value)=>{ onChangeText(value)}}
      placeholderTextColor={colors.LIGHTWHITE}
      style={{
        padding : 10,
        borderWidth : 1,
        borderRadius : 10,
        width : '95%',
        fontSize : 20,
        margin : 10,
        
        color: colors.WHITE,
        borderColor : colors.WHITE
      }}
      />
  )
}

export default Input
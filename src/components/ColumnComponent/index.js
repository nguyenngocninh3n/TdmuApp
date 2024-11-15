import { TouchableOpacity, View } from 'react-native'

const ColumnComponent = ({ children, style, onPress }) => {
  const defaultValue = {
    onPress: () => {},
    styles: {
      flexDirection: 'column',
      justifyContent:'space-between'
    }
  }

  const customStyles = [defaultValue.styles, style]

  return onPress ? (
    <TouchableOpacity onPress={onPress} style={customStyles}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={customStyles}>{children}</View>
  )
}

export default ColumnComponent

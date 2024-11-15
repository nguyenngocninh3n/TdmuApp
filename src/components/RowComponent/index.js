import { TouchableOpacity, View } from 'react-native'

const RowComponent = ({ children, style, justify, alignItems, onPress }) => {
  const defaultValue = {
    onPress: () => {},
    styles: {
      flexDirection: 'row',
      alignItems: alignItems && 'center',
      justifyContent: justify && 'center'
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

export default RowComponent

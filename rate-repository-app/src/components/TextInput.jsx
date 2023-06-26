import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({});//eslint-disable-line

const TextInput = ({ style, error, ...props }) => {//eslint-disable-line
  const textInputStyle = [style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
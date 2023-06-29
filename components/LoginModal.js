import { useState } from "react";
import { Modal, StyleSheet, View, Button, Text, TextInput, KeyboardAvoidingView } from "react-native";
import { getAdminPassword, getIsAdmin, hashCode, storeAdmin } from "../util/Security";


export default function LoginModal(props) {
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(false);

  function onPasswordChange(input) {
    setUserInput(input);
  }

  async function loginHandler() {
    adminPass = await getAdminPassword();
    if (hashCode(userInput) === adminPass) {
      storeAdmin();
      props.setAdmin(getIsAdmin())
      props.onClose()
    } else { 
      setUserInput('');
      setError(<Text style={styles.errorMessage}>Incorrect Password</Text>);
    }
  }

  function onCloseModal() {
    setUserInput('');
    setError(false);
    props.onClose();
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.loginText}>Login</Text>
        <View>
          <TextInput
            style={styles.passwordInput}
            onChangeText={onPasswordChange}
            value={userInput}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        {error}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button color={'red'} onPress={onCloseModal} title="Close" />
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={loginHandler} title="Log In" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
    marginTop: 200
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  buttonContainer: {
    marginHorizontal: 10
  },
  passwordInput: {
    height: 50,
    minWidth: '60%',
    maxWidth: '80%',
    fontSize: 16,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  loginText: {
    fontFamily: 'CourierPrimeBold',
    fontSize: 30,
    margin: 5
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10
  }
})
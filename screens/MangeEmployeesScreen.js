import { useState } from "react";
import { StyleSheet, Text, View, FlatList, Button, TextInput, Pressable, Alert, ToastAndroid } from "react-native";
import { addUser, deleteUserById, getEmployees, updateUserColor } from "../util/dbHandler";
import { Ionicons } from '@expo/vector-icons';
import PersonCard from "../components/PersonCard";
import { ColorPickerModal } from "../components/modals/ColorPickerModal";

let editingUserColor = false;
let userEditing = '';

export function ManageEmployeesScreen() {
  const [employees, setEmployees] = useState(getEmployees())
  const [colorPickerVivible, SetColorPickerVisible] = useState(false);
  const [currentColor, setCurrentColor] = useState('#c3febe')
  const [enteredName, setEnteredName] = useState('')
  const [refresh, setRefresh] = useState(false)

  function showColourPicker() {
    SetColorPickerVisible(true)
  }

  function openColorPickerNewUser() {
    editingUserColor = false
    showColourPicker()
  }

  function openColorPickerEditUser(usrId) {
    editingUserColor = true
    userEditing = usrId
    showColourPicker()
  }


  async function setColor(color) {
    if (editingUserColor) {
      await updateUserColor(userEditing, color)
    } else {
      setCurrentColor(color);
    }
    SetColorPickerVisible(false)
    setRefresh(!refresh);
    console.log('refreshed')
  }

  async function deleteUserHandler(id) {
    // await deleteUserById(id);
    setEmployees(getEmployees());
    Alert.alert(
      'Deleting Employee',
      'Deleting an employee will remove all shifts with this employee, are you sure?',
      [
        {
          text: 'cancel',
          onPress: () => console.log('Cancel'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            await deleteUserById(id);
            ToastAndroid.show('Employee Deleted!', ToastAndroid.SHORT);
            setEmployees(getEmployees())
          }
        }
      ]
    );
  }

  function textChangeHandler(text) {
    setEnteredName(text)
  }

  function cancelColorPicker() {
    SetColorPickerVisible(false)
  }

  async function onAddUser() {
    await addUser(enteredName, currentColor);
    setEmployees(getEmployees());
    setRefresh(!refresh);
    setEnteredName('')
    console.log('User Added')
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.addContainer}>
        <Text style={{ textAlign: 'center', fontFamily: 'CourierPrime', fontSize: 25, marginBottom: 10 }}>Add Employee</Text>
        <View style={styles.textInputContainer} >
          <TextInput
            style={styles.textInput}
            placeholder="Name"
            value={enteredName}
            autoCapitalize="none"
            onChangeText={textChangeHandler}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'CourierPrime', fontSize: 16, paddingLeft: 4 }}>Colour: </Text>
            <Pressable onPress={openColorPickerNewUser}>
              <View style={[styles.colorSelectButton, { backgroundColor: currentColor }]}></View>
            </Pressable>
          </View>
          <Button onPress={onAddUser} title="Add" />
        </View>
      </View>
      <View style={{ maxHeight: '70%' }}>
        <FlatList
          data={employees}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <View style={{ flex: 4 }}>
                <PersonCard editing={false} personData={item} />
              </View>
              <Pressable style={styles.editUserColorContainer} onPress={() => openColorPickerEditUser(item.id)}>
                <View style={[styles.colorSelectButton, { backgroundColor: item.color }]}></View>
              </Pressable>
              <View style={{ marginLeft: 10 }}>
                <Pressable onPress={() => deleteUserHandler(item.id)}>
                  <Ionicons color={'grey'} size={30} name="trash-sharp"></Ionicons>
                </Pressable>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <ColorPickerModal cancelColorPicker={cancelColorPicker} setColor={setColor} vivible={colorPickerVivible} />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    paddingTop: '10%',
    // justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  textInput: {
    borderBottomWidth: 1,
    padding: 2,
    marginBottom: 15,
    fontFamily: 'CourierPrime',
    fontSize: 20,
    textAlign: "center"
  },
  textInputContainer: {
    alignItems: 'center'
  },
  colorSelectButton: {
    backgroundColor: 'red',
    borderWidth: 1,
    width: 70,
    flex: 1,
    borderRadius: 5,
    marginRight: 10,
    minHeight: 30
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  addContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 40,
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 1,
    shadowOpacity: 0.2,
  },
  editUserColorContainer: {
    flex: 1,
    marginHorizontal: 6,
    marginVertical: 4
  }
});
import { useEffect, useState } from "react";
import { Button, Image, Platform, SafeAreaView, StyleSheet, View, Text } from "react-native";
import { getIsAdmin, loadAdmin, revokeAdmin } from "../util/Security";
import LoginModal from "./modals/LoginModal";
import StyledButton from "./buttons/StyledButton";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function AppHeader(props) {
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  function editButtonPressHandler() {
    props.setEditing(!props.editing)
  }

  function openLoginHandler() {
    setLoginModalVisible(true);
  }

  function onLoginModalClose() {
    setLoginModalVisible(false);
  }

  async function logOutHandler() {
    await revokeAdmin();
    props.setAdmin(getIsAdmin())
    props.setEditing(false)
  }


  const navToEmployeeButton = <StyledButton onPress={() => { props.setScreen('employeeManage') }}>Employees</StyledButton>
  const loginButton = <StyledButton onPress={openLoginHandler}>Login</StyledButton>
  const logOutButton = <StyledButton onPress={logOutHandler}>Logout</StyledButton>
  const editButton = <StyledButton disabled={!props.admin} onPress={editButtonPressHandler}>{props.editing ? 'Done' : 'Edit'}</StyledButton>

  if (Platform.OS === 'web' && windowWidth > 700) {
    return (
      <View style={styles.headerContainerWeb}>
        <View style={styles.headerButtonsWeb}>
          <View style={styles.headerButtonWeb}>
            {props.admin ? logOutButton : loginButton}
          </View>

          <View style={styles.headerButtonWeb}>
            {props.admin ? navToEmployeeButton : null}
          </View>
        </View>
        <Image style={styles.logoWeb} source={require('../assets/images/toastHouseLogo.png')} />
        <View style={{ flex: 1 }}></View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 20 }}>
          <View style={styles.headerButtonWeb}>
            {props.admin ? editButton : null}
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={props.lastMonthHandler} title={'<'} />
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={props.nextMonthHandler} title={'>'} />
          </View>
        </View>
        <LoginModal setAdmin={props.setAdmin} onClose={onLoginModalClose} visible={loginModalVisible} />
      </View>
    );
  } else {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerButton}>
          {props.admin ? logOutButton : loginButton}
        </View>
        <Image style={styles.logo} source={require('../assets/images/toastHouseLogo.png')} />
        <View style={styles.headerButton}>
          {props.admin ? editButton : null}
        </View>
        <LoginModal setAdmin={props.setAdmin} onClose={onLoginModalClose} visible={loginModalVisible} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 10 : 20,
    marginBottom: 20,
  },
  logo: {
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    flex: 7
  },
  headerButton: {
    flex: 5,
  },
  headerContainerWeb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 10,
  },
  logoWeb: {
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    flex: 13
  },
  headerButtonsWeb: {
    flex: 4,
    flexDirection: 'row',
    marginLeft: 30,
  },
  headerButtonWeb: {
    // flex: 1,
    marginRight: 50,
    alignItems: 'stretch',
  },
  buttonContainer: {
    width: 40,
  }
})
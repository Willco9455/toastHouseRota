import { useState } from "react";
import { Button, Image, Platform, SafeAreaView, StyleSheet, View } from "react-native";
import { getIsAdmin, loadAdmin, revokeAdmin } from "../util/Security";
import LoginModal from "./modals/LoginModal";
import StyledButton from "./buttons/StyledButton";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function AppHeader(props) {

  const [admin, setAdmin] = useState(getIsAdmin())
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
    setAdmin(getIsAdmin())
    props.setEditing(false)
  }



  const loginButton = <StyledButton onPress={openLoginHandler}>Login</StyledButton>
  const logOutButton = <StyledButton onPress={logOutHandler}>Logout</StyledButton>
  const editButton = <StyledButton disabled={!admin} onPress={editButtonPressHandler}>{props.editing ? 'Done' : 'Edit'}</StyledButton>

  if (Platform.OS === 'web' && windowWidth > 700) {
    return (
      <View style={styles.headerContainerWeb}>
        <View style={styles.headerButtonsWeb}>
          <View style={styles.headerButtonWeb}>
            {admin ? logOutButton : loginButton}
          </View>
          <View style={styles.headerButtonWeb}>
            {admin ? editButton : null}
          </View>
        </View>
        {/* <View style={styles.headerButtonWeb}>
        </View> */}
        <Image style={styles.logoWeb} source={require('../assets/images/toastHouseLogo.png')} />
        <View style={{ flex: 1 }}></View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 20 }}>
          <View style={styles.buttonContainer}>
            <Button onPress={props.lastMonthHandler} title={'<'} />
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={props.nextMonthHandler} title={'>'} />
          </View>
        </View>
        <LoginModal setAdmin={setAdmin} onClose={onLoginModalClose} visible={loginModalVisible} />
      </View>
    );
  } else {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerButton}>
          {admin ? logOutButton : loginButton}
        </View>
        <Image style={styles.logo} source={require('../assets/images/toastHouseLogo.png')} />
        <View style={styles.headerButton}>
          {admin ? editButton : null}
        </View>
        <LoginModal setAdmin={setAdmin} onClose={onLoginModalClose} visible={loginModalVisible} />
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
    flex: 2,
    flexDirection: 'row',
    marginLeft: 30,
  },
  headerButtonWeb: {
    flex: 1,
    alignItems: 'stretch',
  },
  buttonContainer: {
    width: 40,
  }
})
import React, {Component} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:"451038432500-eose8hholid08eujrkgf7tbveqj7016t.apps.googleusercontent.com",
  iosClientId:"451038432500-eose8hholid08eujrkgf7tbveqj7016t.apps.googleusercontent.com"
  })


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    this.isSignedIn();
  }
  isSignedIn = async () => {
  const isSignedIn = await GoogleSignin.isSignedIn();
    console.log('is signed in?', isSignedIn)
  };
  getCurrentUser = async () => {
    try {
      const currentUser = await GoogleSignin.getCurrentUser();
      console.log('current user',currentUser)

    } catch(error) {
      console.log('error fetching current user',error)
    }
  };
  getTokens = async () => {
    try {
      const tokens = await GoogleSignin.getTokens();
      console.log('getTokens',tokens)

    } catch(error) {
      console.log('error getting tokens',error)
    }
  }
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  signOut = async () => {
  try {
    await GoogleSignin.signOut();
    this.setState({ user: null }); // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
};
  render() {
    console.log('state',this.state)
    return (
      <View style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
        }}>
        <TouchableOpacity style={styles.button}
        onPress={()=>{
          this.signIn();
          }}>
      <Text>login with google
      </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
      onPress={()=>{
        this.signOut();
        }}>
    <Text>sign out of google
    </Text>
    </TouchableOpacity>
      <TouchableOpacity style={styles.button}
        onPress={()=>{
          this.getTokens();
        }}
      >
      <Text>get tokens</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
        onPress={()=>{
          this.getCurrentUser();
        }}
      >
      <Text>get current user</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
        onPress={()=>{
          this.isSignedIn();
        }}
      >
      <Text>check if signed in</Text>
      </TouchableOpacity>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  button : {
    padding:8,
    backgroundColor:'pink',
    marginBottom:7,
    width:100,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default App;

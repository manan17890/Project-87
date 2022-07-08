import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('in iffff');
        this.props.navigation.navigate('DashboardScreen');
      } else {
        console.log('in else' + JSON.stringify(this.props.navigation));
        this.props.navigation.navigate('LoginScreen');
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

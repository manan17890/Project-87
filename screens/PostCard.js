import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import DrawerNavigator from '../navigation/DrawerNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import { AppLoading } from 'expo-app-loading';

export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (snapshot) => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === 'light' });
      });
  };

  render() {
    if (!this.state) {
      return <AppLoading />;
    } else {
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() => this.props.navigation.navigate('PostScreen', {})}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View
            style={
              this.state.light_theme
                ? styles.cardContainerLight
                : styles.cardContainer
            }>
            <Image
              source={require('../assets/image_1.jpg')}
              style={styles.postImage}></Image>
            <View style={styles.titleContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.captionTitleTextLight
                    : styles.captionTitleText
                }></Text>
              <Text
                style={
                  this.state.light_theme
                    ? styles.authorTextLight
                    : styles.authorText
                }></Text>
            </View>

            <View style={styles.actionContainer}>
              <View style={styles.likeButton}>
                <Ionicons
                  name={'heart'}
                  size={RFValue(30)}
                  color={this.state.light_theme ? 'black' : 'white'}
                />
                <Text
                  style={
                    this.state.light_theme
                      ? styles.likeTextLight
                      : styles.likeText
                  }>
                  12k
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: '#333333',
    borderRadius: RFValue(20),
  },
  cardContainerLight: {
    margin: RFValue(13),
    backgroundColor: 'white',
    borderRadius: RFValue(20),
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2),
  },
  postImage: {
    resizeMode: 'contain',
    width: '95%',
    alignSelf: 'center',
    height: RFValue(250),
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: 'center',
  },
  captionTitleText: {
    fontSize: RFValue(25),
    color: 'white',
  },
  captionTitleTextLight: {
    fontSize: RFValue(25),
    color: 'black',
  },
  authorText: {
    fontSize: RFValue(18),
    color: 'white',
  },
  authorTextLight: {
    fontSize: RFValue(18),
    color: 'black',
  },
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#eb3948',
    borderRadius: RFValue(30),
  },
  likeText: {
    color: 'white',
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
  likeTextLight: {
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
});

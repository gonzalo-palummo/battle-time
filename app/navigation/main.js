import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {useTheme} from '@config';
import {Icon} from '@components';

import Profile from 'app/navigation/profile';

import SignUp from '@screens/SignUp';
import SignIn from '@screens/SignIn';
import ResetPassword from '@screens/ResetPassword';
import EditProfile from '@screens/EditProfile';
import PreSignIn from '@screens/PreSignIn';
import ContactUs from '@screens/ContactUs';
import Errors from '@screens/Errors';
import Notification from '@screens/Notification';
import Home from '@screens/Home';
import VideoCall from '@screens/VideoCall';
import LiveStreamingVideoCall from '@screens/LiveStreamingVideoCall';
import VideoRecorded from '@screens/VideoRecorded';
import ConfigProfile from '@screens/ConfigProfile';
import ModalInfo from '@screens/ModalInfo';
import MyAccount from '@screens/MyAccount';
import NewPassword from '@screens/NewPassword';
import Tournaments from '@screens/Tournaments';
import TournamentProfile from '@screens/TournamentProfile';
import TournamentHall from '@screens/TournamentHall';
import TrainingConfig from '@screens/TrainingConfig';
import Training from '@screens/Training';
import PreBattle from '@screens/PreBattle';
import {Images} from '../config/images';

const MainStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function Main() {
  const isLoggedIn = useSelector(state => state.auth).isLoggedIn;
  const hasProfileConfigured = !!useSelector(state => state.auth).profileConfigured;

  return (
    <MainStack.Navigator
      headerMode="none"
      initialRouteName="BottomTabNavigator"
      screenOptions={{animationEnabled: false}}>
      <>
        {isLoggedIn ? (
          hasProfileConfigured ? (
            <>
              <MainStack.Screen
                name="BottomTabNavigator"
                component={BottomTabNavigator}
              />
              <MainStack.Screen name="EditProfile" component={EditProfile} />
              <MainStack.Screen name="Notification" component={Notification} />
              <MainStack.Screen name="ContactUs" component={ContactUs} />
              <MainStack.Screen
                name="LiveStreamingVideoCall"
                component={LiveStreamingVideoCall}
              />
              <MainStack.Screen name="VideoCall" component={VideoCall} />
              <MainStack.Screen name="VideoRecorded" component={VideoRecorded} />
              <MainStack.Screen name="ModalInfo" component={ModalInfo} />

              <MainStack.Screen name="MyAccount" component={MyAccount} />
              <MainStack.Screen name="NewPassword" component={NewPassword} />
              <MainStack.Screen name="TournamentProfile" component={TournamentProfile} />
              <MainStack.Screen name="TournamentHall" component={TournamentHall} />
              <MainStack.Screen name="TrainingConfig" component={TrainingConfig} />
              <MainStack.Screen name="Training" component={Training} />
              <MainStack.Screen name="PreBattle" component={PreBattle} />
            </>
          ) : (
            <MainStack.Screen name="ConfigProfile" component={ConfigProfile} />
          )
        ) : (
          <>
            <MainStack.Screen name="PreSignIn" component={PreSignIn} />
            <MainStack.Screen name="SignIn" component={SignIn} />
            <MainStack.Screen name="SignUp" component={SignUp} />
            <MainStack.Screen name="ResetPassword" component={ResetPassword} />
          </>
        )}

        <MainStack.Screen name="Errors" component={Errors} />
      </>
    </MainStack.Navigator>
  );
}

function BottomTabNavigator() {
  const {colors} = useTheme();
  const iconStyle = {width: 24, height: 24};
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      headerMode="none"
      tabBarOptions={{
        showIcon: true,
        activeTintColor: colors.primary,
        inactiveTintColor: colors.primaryDark,
        style: {borderTopWidth: 0, paddingTop: 5, height: 60},
      }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => {
            return focused ? (
              <Image source={Images.homeIcon} style={iconStyle} />
            ) : (
              <Image source={Images.homeIconTransparent} style={iconStyle} />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Tournaments"
        component={Tournaments}
        options={{
          tabBarLabel: 'Torneos',
          tabBarIcon: ({focused}) => {
            return focused ? (
              <Image source={Images.tournamentsIcon} style={iconStyle} />
            ) : (
              <Image source={Images.tournamentsIconTransparent} style={iconStyle} />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({focused}) => {
            return focused ? (
              <Image source={Images.profileIcon} style={iconStyle} />
            ) : (
              <Image source={Images.profileIconTransparent} style={iconStyle} />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
}

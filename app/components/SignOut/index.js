import React, {useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-community/google-signin';
import {
  LoginManager as FacebookLoginManager,
  AccessToken as FacebookAccessToken,
} from 'react-native-fbsdk';
import {AuthActions, ApplicationActions} from '@actions';
import {useDispatch} from 'react-redux';
import {Loading} from '@components';
import {checkAuth} from '@repositories/Repository';

export default function SignOut(navigation) {
  const dispatch = useDispatch();
  const onLogOut = async () => {
    const isGoogleSignedIn = await GoogleSignin.isSignedIn();
    if (isGoogleSignedIn) {
      googleLogOut();
    } else {
      FacebookAccessToken.getCurrentAccessToken().then(data => {
        const isFacebookSignedIn = data;

        if (isFacebookSignedIn) {
          FacebookLoginManager.logOut();
        }
      });
    }

    // CALL LOG OUT ENDPOINT API

    dispatch(AuthActions.logout());
    dispatch(ApplicationActions.resetLoading());
    checkAuth();
  };

  const googleLogOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GoogleSignin.configure();
    onLogOut();
  }, []);

  return <Loading />;
}

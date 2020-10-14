import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme, BaseSetting} from '@config';
import SplashScreen from 'react-native-splash-screen';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {useSelector} from 'react-redux';

/* Main Stack Navigator */
import Main from 'app/navigation/main';
/* Modal Screen only affect iOS */

const RootStack = createStackNavigator();

export default function Navigator() {
  const storeLanguage = useSelector(state => state.application.language);
  const {theme, colors} = useTheme();

  /*const forFade = ({current, closing}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });*/

  useEffect(() => {
    i18n.use(initReactI18next).init({
      resources: BaseSetting.resourcesLanguage,
      lng: storeLanguage ?? BaseSetting.defaultLanguage,
      fallbackLng: BaseSetting.defaultLanguage,
    });
    SplashScreen.hide();
    StatusBar.setBackgroundColor(colors.primary, true);
    StatusBar.setBarStyle('light-content', true);
  });

  /* React.useEffect(() => {
    return () => (isReadyRef.current = false);
  }, []);
  */

  return (
    <NavigationContainer
      theme={theme}
      ref={navigationRef}
      //onReady={() => {
      //  isReadyRef.current = true;
      //}}
    >
      <RootStack.Navigator mode="modal" headerMode="none" initialRouteName="Main">
        <RootStack.Screen name="Main" component={Main} />

        {/*  <RootStack.Screen
          name="MyPreferences"
          component={MyPreferences}
          options={{
            cardStyleInterpolator: forFade,
            cardStyle: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
          }}
        /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

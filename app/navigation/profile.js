import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SignOut from '@components/SignOut';
import ProfileHome from '@screens/Profile';
import EditProfile from '@screens/EditProfile';
import Settings from '@screens/Settings';
import {Icon} from '@components';
import {useTheme} from '@config';

const Drawer = createDrawerNavigator();

export default function Profile() {
  const {colors} = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName="Mi perfil"
      drawerContentOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: 'black',
        style: {backgroundColor: 'white'},
      }}>
      <Drawer.Screen
        name="Mi perfil"
        component={ProfileHome}
        options={{
          drawerIcon: () => {
            return <Icon color="black" name="user" size={24} solid />;
          },
        }}
      />
      <Drawer.Screen
        name="Editar perfil"
        component={EditProfile}
        options={{
          drawerIcon: () => {
            return <Icon color="black" name="edit" size={24} solid />;
          },
        }}
      />
      <Drawer.Screen
        name="Battle Coins"
        component={ProfileHome}
        options={{
          drawerIcon: () => {
            return <Icon color="black" name="coins" size={24} />;
          },
        }}
      />
      <Drawer.Screen
        name="Configuración"
        component={Settings}
        options={{
          drawerIcon: () => {
            return <Icon color="black" name="cog" size={24} />;
          },
        }}
      />

      {/*<Drawer.Screen
        name="FAQs / Ayuda"
        component={ProfileHome}
        options={{
          drawerIcon: () => {
            return <Icon color="black" name="question-circle" size={24} solid />;
          },
        }}
      />*/}

      <Drawer.Screen
        name="Cerrar Sesión"
        component={SignOut}
        options={{
          drawerIcon: () => {
            return <Icon color="black" name="sign-out-alt" size={24} />;
          },
        }}
      />
    </Drawer.Navigator>
  );
}

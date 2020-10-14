import React from 'react';
import {StyleSheet, I18nManager} from 'react-native';
import {BaseStyle} from '@config';

export default StyleSheet.create({
  contain: {height: 80, flexDirection: 'row'},
  contentLeft: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: 60,
  },
  contentCenter: {
    flex: 4,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  contentRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 20,
    height: '100%',
  },
  contentRightSecond: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    height: '100%',
  },
  right: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  shells: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shell: {
    width: 28,
    height: 28,
    marginRight: 15,
  },
});

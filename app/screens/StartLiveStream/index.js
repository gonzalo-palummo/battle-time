import React from 'react';
import {SafeAreaView, Button, Text} from '@components';

export default function StartLiveStream({navigation}) {
  return (
    <SafeAreaView style={{padding: 20}}>
      <Button
        onPress={() => {
          navigation.navigate('LiveStreamingVideoCall', {clientRole: 1});
        }}
        style={{marginVertical: 10}}>
        Entrar como Host
      </Button>
      <Button
        onPress={() => {
          navigation.navigate('LiveStreamingVideoCall', {clientRole: 2});
        }}
        style={{marginVertical: 10}}>
        Entrar como Viewer
      </Button>
    </SafeAreaView>
  );
}

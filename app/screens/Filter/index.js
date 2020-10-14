import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text, FormOption} from '@components';
import * as Utils from '@utils';
import {useTranslation, composeInitialProps} from 'react-i18next';

export default function Filter({navigation, route}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [pubsCategoriesSelected, setPubsCategoriesSelected] = useState(
    route.params.pubsCategoriesSelected,
  );

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title={t('filter')}
        renderLeft={() => {
          return <Icon name="times" size={20} color={colors.primary} />;
        }}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => {
          route.params.onGoBack(pubsCategoriesSelected);
          navigation.goBack();
        }}
      />
      <ScrollView
        scrollEnabled={scrollEnabled}
        onContentSizeChange={(contentWidth, contentHeight) =>
          setScrollEnabled(Utils.scrollEnabled(contentWidth, contentHeight))
        }>
        <View style={{padding: 20}}>
          <FormOption
            style={{marginTop: 20}}
            options={route.params.pubsCategories}
            label={t('pub_type')}
            multiple={true}
            values={pubsCategoriesSelected}
            onChange={values => setPubsCategoriesSelected(values)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

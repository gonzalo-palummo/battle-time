import React, {useState} from 'react';
import {View, ActivityIndicator, FlatList, ScrollView} from 'react-native';
import {BaseStyle, useTheme, Images} from '@config';
import {Header, SafeAreaView, PubItem, Text, Card} from '@components';
import {useTranslation} from 'react-i18next';
import styles from './styles';

export default function Favorites({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [pubs, setPubs] = useState([
    {
      id: '1',
      image: Images.pub1,
      meters: '78 metros',
      name: '878 Bar',
      address: 'Corrientes 1232',
      rate: 4.3,
      reviews: 302,
      favorite: true,
    },
    {
      id: '2',
      image: Images.pub2,
      meters: '278 metros',
      name: 'The Temple Bar',
      address: 'Malabia 2785',
      rate: 4.8,
      reviews: 153,
      favorite: true,
    },
    {
      id: '3',
      image: Images.pub3,
      meters: '468 metros',
      name: 'Antares',
      address: 'Gorriti 4654',
      rate: 4.3,
      reviews: 276,
      favorite: true,
    },
  ]);
  const [pubsVisited, setPubsVisited] = useState(pubs);

  const onFav = index => {
    let pubsArray = pubs;
    pubsArray[index].favorite = !pubsArray[index].favorite;
    setPubs(pubsArray);
    setLoading(true);
    setTimeout(() => setLoading(false), 100);
  };

  const renderContent = () => {
    const renderLoading = () => {
      return (
        <ActivityIndicator size="large" style={{marginTop: 50}} color={colors.primary} />
      );
    };

    const renderFavorites = () => {
      return (
        <View style={{paddingVertical: 20}}>
          {pubs.length > 0 ? (
            <FlatList
              data={pubs}
              keyExtractor={item => item.id.toString()}
              renderItem={({item, index}) => (
                <PubItem
                  list
                  image={item.image}
                  name={item.name}
                  location={item.address}
                  style={{
                    marginHorizontal: 20,
                    marginBottom: 15,
                  }}
                  bigFonts={true}
                  onPress={() => {
                    navigation.navigate('PubDetail');
                  }}
                  favorite={item.favorite}
                  onFav={() => onFav(index)}
                />
              )}
            />
          ) : (
            <View>
              <Text title2 semibold textAlign="center" style={{paddingVertical: 20}}>
                {t('no_favorites')}
              </Text>
              <Text headline textAlign="center">
                {t('mark_your_favorite_pub')}
              </Text>
            </View>
          )}

          {pubsVisited.length > 0 ? (
            <View>
              <Text style={{paddingVertical: 40}} title3 semibold textAlign="center">
                {t('recently_visited')}
              </Text>

              <FlatList
                contentContainerStyle={{paddingLeft: 5, paddingRight: 20}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={pubs}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({item, index}) => (
                  <Card
                    style={[styles.pubItem, {marginLeft: 15}]}
                    image={item.image}
                    onPress={() => navigation.navigate('PubDetail')}>
                    <Text title2 whiteColor semibold>
                      {item.name}
                    </Text>
                  </Card>
                )}
              />
            </View>
          ) : null}
        </View>
      );
    };

    if (loading) {
      return renderLoading();
    } else {
      return renderFavorites();
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header title={t('favorites')} />
      <ScrollView>{renderContent()}</ScrollView>
    </SafeAreaView>
  );
}

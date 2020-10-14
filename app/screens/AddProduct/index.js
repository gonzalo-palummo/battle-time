import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity, Animated} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Button, Text, TextInput} from '@components';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import * as Utils from '@utils';

export default function AddProduct({navigation, route}) {
  const product = route.params.product;
  const [comment, setComment] = useState(route.params.comment);
  const {colors} = useTheme();
  const deltaY = new Animated.Value(0);
  const {t} = useTranslation();
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const heightImageBanner = Utils.scaleWithPixel(240, 1);
  const marginTopBanner = heightImageBanner - heightHeader + 10;
  const [quantityCounter, setQuantityCounter] = useState(route.params.quantityCounter);
  const onChangeCounter = type => {
    if (type === 'up') {
      setQuantityCounter(quantityCounter + 1);
    } else if (type === 'down') {
      setQuantityCounter(quantityCounter - 1);
    }
  };
  return (
    <View style={{flex: 1}}>
      <Animated.Image
        source={product.image}
        style={[
          styles.imgBanner,
          {
            height: deltaY.interpolate({
              inputRange: [0, Utils.scaleWithPixel(180), Utils.scaleWithPixel(180)],
              outputRange: [heightImageBanner, heightHeader, heightHeader],
            }),
          },
        ]}
      />

      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title=""
          renderLeft={() => {
            return <Icon name="times" size={20} color={colors.primary} />;
          }}
          onPressLeft={() => navigation.goBack()}
        />
        <ScrollView>
          <View
            style={{
              paddingHorizontal: 20,
              marginTop: marginTopBanner,
            }}>
            <Text title1 semibold>
              {product.name}
            </Text>
            <Text title3 grayColor style={{marginVertical: 10}}>
              {product.description}
            </Text>
            <Text title2 semibold primaryColor>
              {product.categoryId === 4
                ? `${product.price} ${t('points')}`
                : `$ ${product.price}`}
            </Text>
            <TextInput
              style={{marginVertical: 30, height: 80}}
              onChangeText={text => setComment(text)}
              textAlignVertical="top"
              multiline={true}
              placeholder={t('comments')}
              value={comment}
            />
          </View>
        </ScrollView>
        <View style={[styles.contentButtonBottom, {borderTopColor: colors.border}]}>
          <View>
            <Text title1 semibold>
              {product.categoryId === 4
                ? `${product.price * quantityCounter} ${t('points')}`
                : `$ ${product.price * quantityCounter}`}
            </Text>
          </View>
          <View style={styles.addButtons}>
            <TouchableOpacity
              onPress={() => onChangeCounter('down')}
              disabled={quantityCounter === 1}>
              <Icon name="minus-circle" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text title1 style={{marginHorizontal: 10}}>
              {quantityCounter}
            </Text>
            <TouchableOpacity onPress={() => onChangeCounter('up')}>
              <Icon name="plus-circle" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <Button
            onPress={() => {
              route.params.onGoBack({
                product: product,
                quantity: quantityCounter,
                comment,
              });
              navigation.goBack();
            }}>
            {t('add')}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}

import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { AppContext } from '../hooks/appContext';
import CircledEmoji from './partials/circledEmoji';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  item: {
    flex: 1,
    margin: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const SelectCategory = ({ navigation }) => {
  const { categories } = useContext(AppContext);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={() => navigation.navigate('Categorization', { selectedCategoryId: item.id })}>
      <CircledEmoji emoji={item.emoji} color={item.color} size={60} emojiSize={25} />
      <Text style={{textAlign: 'center'}}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Icon name="arrowleft" size={25} color="#323A47" onPress={() => navigation.goBack()} />
        <Text style={{ marginLeft: 10, fontSize: 22, color: '#323A47', fontWeight: 800 }}>Select Category</Text>
      </View>
      <View style={{paddingTop: 20}}>
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={item => item.name}
          numColumns={3} 
        />
      </View>
    </View>
  );
}

export default SelectCategory;

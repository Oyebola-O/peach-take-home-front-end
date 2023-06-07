import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PieChart from './partials/piechart';
import TransactionsList from './partials/transactionsList';
import { AppContext } from '../hooks/appContext';
import { pieData } from '../helpers/functions';
import Icon from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  button: {
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  }
});

const HomePage = ({ navigation }) => {
  const { transactions, categories } = useContext(AppContext);
  useEffect(() => {}, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {
          transactions.length > 0 && categories.length > 0 && 
          <PieChart data={ pieData(transactions, categories) } />
        }
        { transactions.reduce((count, transaction) => transaction.reviewed ? count : count + 1, 0) > 0 &&
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Categorization')}>
            <LinearGradient
              colors={['#F4D9D0', '#C0CEFF']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.button}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.buttonText}>{`${transactions.length} New Transactions to Review`}</Text>
                  <Icon name="arrowright" size={25} color="#323A47" />
                </View>
            </LinearGradient>
          </TouchableOpacity>
        }
        {
          transactions.length > 0 && categories.length > 0 && 
          <TransactionsList transactions={transactions} categories={categories} />
        }
      </ScrollView>
    </View>
  );
}

export default HomePage;

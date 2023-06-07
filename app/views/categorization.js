import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { AppContext } from '../hooks/appContext';
import CircledEmoji from './partials/circledEmoji';
import { formatMoney, formatDate } from '../helpers/functions';
import apiActions from '../actions/apiActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  categorySummary: {
    borderWidth: 1,
    borderColor: '#E6EBF0',
    borderRadius: 6,
    alignItems: 'center',
  },
  date: {
    marginTop: 50,
    fontSize: 14,
    color: '#949CA8'
  },
  transactionName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#323A47'
  },
  merchant: {
    fontSize: 13,
    fontWeight: '400',
    color: '#949CA8'
  },
  amount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#323A47',
    paddingVertical: 15,
  },
  button: {
    width: '90%',
    borderRadius: 6,
    backgroundColor: '#323A47',
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  }
});

const Categorization = ({ route, navigation, refreshTransactions }) => {
  const { transactions, categories } = useContext(AppContext);
  const categoriesHash = categories.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
  const nameCatHash = categories.reduce((acc, item) => ({ ...acc, [item.name]: item }), {});

  const [flowTransactions, setFlowTransactions] = useState(transactions.filter(transaction => transaction.reviewed == false));
  const [currTransactionIndex, setCurrTransactionIndex] = useState(0);
  const [currTransaction, setCurrTransaction] = useState(flowTransactions[currTransactionIndex]);

  const progressWidth = Dimensions.get('window').width / (flowTransactions.length + 3);
  const progress = Array.from({ length: flowTransactions.length }, (_, index) => index);

  
  useEffect(() => {
    const updateReviewed = flowTransactions.map((transaction, index) =>
      index === currTransactionIndex ? { ...transaction, reviewed: true } : transaction
    );
    setFlowTransactions(updateReviewed);

    if(route.params && route.params.selectedCategoryId) {
      const categoryId = route.params.selectedCategoryId;
      const updatedCategory = flowTransactions.map((transaction, index) =>
        index === currTransactionIndex ? { ...transaction, category: categoriesHash[categoryId].name } : transaction
      );
      setFlowTransactions(updatedCategory);
      setCurrTransaction(updatedCategory[currTransactionIndex]);
      route.params = null;
    }
  }, [currTransactionIndex, route.params]);

  

  const incrementIndex = () => {
    if(currTransactionIndex == flowTransactions.length - 1) {
      apiActions.updateTransactions(flowTransactions)
      apiActions.getTransactions();
      refreshTransactions();
      navigation.navigate('Home');
    } else {
      setCurrTransaction(flowTransactions[currTransactionIndex + 1]);
      setCurrTransactionIndex(currTransactionIndex + 1);
    }
  }  

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        {
          progress.map((index) => (
            <View key={index} style={{ width: progressWidth, height: 3, margin: 1, backgroundColor: index <= currTransactionIndex ? '#7981FF' : '#C5CBD4'}}></View>
          ))
        }
        <Icon name="close" size={25} color="#323A47" onPress={() => navigation.goBack()} />
      </View>
      { currTransaction && 
        <View style={styles.categorySummary}>
          <Text style={styles.date}>{formatDate(currTransaction.date)}</Text>
          <Text style={styles.transactionName}>{currTransaction.transaction_name}</Text>
          <Text style={styles.merchant}>{currTransaction.merchant}</Text>
          <Text style={styles.amount}>{formatMoney(currTransaction.amount)}</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SelectCategory')}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <CircledEmoji emoji={nameCatHash[currTransaction.category].emoji} color={nameCatHash[currTransaction.category].color} />
              <Text style={{ margin: 5 }}>{currTransaction.category}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => incrementIndex() }>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
}

export default Categorization;

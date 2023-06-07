import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CircledEmoji from './circledEmoji';
import { formatMoney, formatDate } from '../../helpers/functions';

const reviewed = false;
const styles = StyleSheet.create({
  transactionSection: {
    flex: 1,
    marginTop: 20,
  },
  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#E6EBF0',
    borderRadius: 5,
    padding: 5,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#B6E4FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 15,
  },
});

const Transaction = ({ transaction, categories }) => {
  const customStyles = StyleSheet.create({
    borderLeftWidth: transaction.reviewed ? 1 : 5,
    borderLeftColor: transaction.reviewed ? '#E6EBF0' : '#7981FF'
  });

  const categoryHash = categories?.reduce((acc, item) => ({ ...acc, [item.name]: item }), {});

  return (
    <View style={[styles.transactionContainer, customStyles]}>
      <CircledEmoji emoji={categoryHash[transaction.category].emoji} color={categoryHash[transaction.category].color} />
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
        <View>
          <Text>{transaction.transaction_name}</Text>
          <Text>{transaction.category}</Text>
        </View>

        <View>
          <Text>{formatMoney(transaction.amount)}</Text>
          <Text>{formatDate(transaction.date)}</Text>
        </View>
      </View>
    </View>
  );
};

const TransactionsList = ({ transactions, categories }) => {
  return (
    <View style={styles.transactionSection}>
      <Text>Recent Transactions</Text>
      <View>
        {
          transactions.map((transaction, index) => (
            <Transaction key={index} transaction={transaction} categories={categories} />
          ))
        }
      </View>
    </View>
  );
};


export default TransactionsList;
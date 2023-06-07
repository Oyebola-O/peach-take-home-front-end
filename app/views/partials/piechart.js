import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { VictoryPie, VictoryLabel } from "victory-native";
import { formatMoney } from '../../helpers/functions'; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E6EBF0',
    borderRadius: 6,
    marginVertical: 15,
    padding: 15,
  },
  pieLengendContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  legendContainer: {
    flex: 1,
  },
  legendText: {
    fontSize: 12,
  },
  legendAmountText: {
    fontSize: 15,
    fontWeight: '700',
  },
  pieContainer: {
    flex: 2,
  }
});


const PieChart = ({ data }) => {
  const total = data.reduce((sum, obj) => sum + Number(obj.amount), 0);

  return (
    <View style={styles.container}>
      <Text style={{marginBottom: 20}}>Top spending categories</Text>
      <View style={styles.pieLengendContainer}>
        <View style={styles.legendContainer}>
          {
            data && data.map((transaction, index) => (
              <View key={index} style={{ flexDirection: 'row', marginBottom: 5 }}>
                <View style={{width: 5, height: 30, backgroundColor: transaction.color}}></View>
                <View style={{marginLeft: 5, justifyContent: 'space-between'}}>
                  <Text style={styles.legendText}>{`${transaction.emoji}${transaction.category}`}</Text>
                  <Text style={styles.legendAmountText}>{`${formatMoney(transaction.amount)}`}</Text>
                </View>
              </View>
            ))
          }
        </View>
        <View style={styles.pieContainer}>
          <VictoryPie
            data={data.map(transaction => ({ x: transaction.category, y: Math.abs(transaction.amount) }))}
            innerRadius={50}
            colorScale={data.map(transaction => transaction.color)}
            width={250}
            height={210}
            padding={{ top: 10, bottom: 10, left: 50, right: 50 }}
            labels={({ datum }) => `${(datum.y / total * 100).toFixed(1)}%`}
            labelRadius={80}
            labelComponent={<VictoryLabel style={{ fill: '#6C727C', fontSize: 13 }}/>}
          />
          <Text style={{alignSelf:'center'}}>{`Total: +${formatMoney(total)}`}</Text>
        </View>
      </View>
    </View>
  );
}

export default PieChart;
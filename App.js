import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppContext } from './app/hooks/appContext';
import apiActions from './app/actions/apiActions';
import apiStore from './app/stores/apiStore';

import HomePage from './app/views/home';
import Categorization from './app/views/categorization';
import SelectCategory from './app/views/selectCategory';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const refreshTransactions = () => {
    apiActions.getTransactions();
  };

  useEffect(() => {
    const unsubscribe = apiStore.listen(onStateChange);

    apiActions.getCategories();
    apiActions.getMerchants();
    apiActions.getTransactions();

    return () => unsubscribe;
  }, []);

  const onStateChange = data => {
    switch (data.target) {
      case 'UPDATE_CATEGORIES':
        updateCategories(); break;
      case 'UPDATE_MERCHANTS':
        updateMerchants(); break;
      case 'UPDATE_TRANSACTIONS':
        updateTransactions(); break;
      default:
        return;
    }
  };

  const updateCategories = () => {
    const currentState = apiStore.getCurrentState();
    setCategories(currentState.categories);
  };

  const updateMerchants = () => {
    const currentState = apiStore.getCurrentState();
    setMerchants(currentState.merchants);
  };

  const updateTransactions = () => {
    const currentState = apiStore.getCurrentState();
    setTransactions(currentState.transactions);
  };

  const Stack = createStackNavigator();

  return (
    <AppContext.Provider value={{ transactions, categories, merchants }}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen 
            name="Categorization"
            options={{ headerShown: false }}>
            {(props) => <Categorization {...props} refreshTransactions={refreshTransactions} />}
          </Stack.Screen>
          <Stack.Screen 
            name="SelectCategory"
            component={SelectCategory}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </SafeAreaView>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;

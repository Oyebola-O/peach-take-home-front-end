import Reflux from 'reflux';

// TODO: Set your Backend URL here!
const BASE_URL = 'http://192.168.1.156:3000';

const apiActions = Reflux.createActions({
  getCategories: { asyncResult: true },
  getMerchants: { asyncResult: true },
  getTransactions: { asyncResult: true },
  updateTransactions: { asyncResult: true }
});

apiActions.getCategories.listen(() => {
  const reqUrl = `${BASE_URL}/categories`;
  fetch(reqUrl)
    .then(data => data.json())
    .then(data => {
      apiActions.getCategories.completed({
        data: data,
      });
      console.log('apiActions.getCategories - success!');
    })
    .catch(error => {
      rollbarError('apiActions.getCategories - error! ', error);
      apiActions.getCategories.completed({
        data: error,
        loadFail: true,
      });
    })
});

apiActions.getMerchants.listen(() => {
  const reqUrl = `${BASE_URL}/merchants`;
  fetch(reqUrl)
    .then(data => data.json())
    .then(data => {
      apiActions.getMerchants.completed({
        data: data,
      });
      console.log('apiActions.getMerchants - success!');
    })
    .catch(error => {
      rollbarError('apiActions.getMerchants - error! ', error);
      apiActions.getMerchants.completed({
        data: error,
        loadFail: true,
      });
    })
});

apiActions.getTransactions.listen(() => {
  const reqUrl = `${BASE_URL}/transactions`;
  fetch(reqUrl)
    .then(data => data.json())
    .then(data => {
      apiActions.getTransactions.completed({
        data: data,
      });
      console.log('apiActions.getTransactions - success!');
    })
    .catch(error => {
      rollbarError('apiActions.getTransactions - error! ', error);
      apiActions.getTransactions.completed({
        data: error,
        loadFail: true,
      });
    })
});

apiActions.updateTransactions.listen((transactions) => {
  const reqUrl = `${BASE_URL}/transactions/update_transactions`;
  
  fetch(reqUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ transactions })
  })
    .then(data => data.json())
    .then(data => {
      apiActions.updateTransactions.completed({
        data: data,
      });
      console.log('apiActions.updateTransactions - success!');
      apiActions.getTransactions.triggerAsync();
    })
    .catch(error => {
      rollbarError('apiActions.updateTransactions - error! ', error);
      apiActions.updateTransactions.completed({
        data: error,
        loadFail: true,
      });
    })
});

export default apiActions;

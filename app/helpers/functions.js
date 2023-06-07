const formatMoney = (amount) => {
  const formattedMoney = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
  return formattedMoney;
}

const formatDate = (date) => {
  const newDate = new Date(date);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(newDate);
  return formattedDate;
}

const filterTopCategories = (data, cap) => {
  let array = Object.keys(data).map(key => ({ x: key, y: Math.abs(data[key]) }));
  array.sort((a, b) => b.y - a.y);

  let other = 0;
  let sortedData = {};
  for(let i = 0; i < array.length; i++) {
    if(i >= cap) {
      other += array[i].y;
      continue;
    }
    sortedData[array[i].x] = array[i].y;
  }

  if (other !== 0) {
    sortedData['Other'] = other;
  }

  return sortedData;
};


const pieData = (transactions, categories) => {
  let dataObj = {}
  for(let transaction of transactions) {
    if(transaction.amount < 0) continue;
    if(!(transaction.category in dataObj)) {
      dataObj[transaction.category] = 0;
    }
    dataObj[transaction.category] += Number(transaction.amount);
  }

  let categoriesHash = categories.reduce((acc, item) => ({ ...acc, [item.name]: item }), {});

  dataObj = filterTopCategories(dataObj, 3);
  let data = [];
  for(let item in dataObj) {
    data.push({
      category: item,
      amount: dataObj[item],
      color: item == "Other" ? "#964B00" :categoriesHash[item].color,
      emoji: item == "Other" ? "🤷🏽‍♂️" : categoriesHash[item].emoji
    });
  }

  return data;
};

export { formatMoney, formatDate, pieData };


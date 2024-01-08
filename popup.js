

document.addEventListener('DOMContentLoaded', function () {

  function fetchData(url, successCallback, errorCallback) {
    fetch(url)
      .then(response => response.json())
      .then(successCallback)
      .catch(errorCallback);
  }

  function updateDataAndChart(data, lastPriceElement, changeElement, percentChangeElement, highElement, lowElement, priceChart, currentPriceDotClass) {
    let data_price = data.indices.lastprice;
    let data_change = data.indices.change;
    let data_percentchange = data.indices.percentchange;
    let data_high = data.indices.high;
    let data_low = data.indices.low;

    lastPriceElement.innerText = data_price;
    changeElement.innerText = data_change;
    percentChangeElement.innerText = data_percentchange;
    highElement.innerText = data_high;
    lowElement.innerText = data_low;

    const int_data_price = parseFloat(data_price.replace(/,/g, ''));
    const int_data_low = parseFloat(data_low.replace(/,/g, ''));
    const int_data_high = parseFloat(data_high.replace(/,/g, ''));
    const percentage = ((int_data_price - int_data_low) / (int_data_high - int_data_low)) * 100;

    priceChart.style.width = `${percentage}%`;

    const previousDot = document.querySelector(`.${currentPriceDotClass}`);
    if (previousDot) {
      previousDot.remove();
    }

    const currentPriceDot = document.createElement('div');
    currentPriceDot.className = currentPriceDotClass;
    currentPriceDot.style.left = `${percentage}%`;
    priceChart.appendChild(currentPriceDot);
  }

  function handleFetchError(error, resultElement) {
    console.error('Error fetching data:', error);
    resultElement.innerText = 'Error fetching data. Check console for details.';
  }

  function fetchAndUpdateData(url, lastPriceElement, changeElement, percentChangeElement, highElement, lowElement, priceChart, currentPriceDotClass, resultElement) {
    fetchData(url,
      (data) => updateDataAndChart(data, lastPriceElement, changeElement, percentChangeElement, highElement, lowElement, priceChart, currentPriceDotClass),
      (error) => handleFetchError(error, resultElement)
    );
  }

  // Call the function immediately
  fetchAndUpdateData(
    'https://appfeeds.moneycontrol.com/jsonapi/market/indices&format=json&t_device=iphone&t_app=MC&t_version=48&ind_id=23',
    document.getElementById('BN_LASTPRICE'),
    document.getElementById('BN_CHANGE'),
    document.getElementById('BN_PERCENTCHANGE'),
    document.getElementById('BN_HIGH'),
    document.getElementById('BN_LOW'),
    document.getElementById('BN_PRICE_CHART'),
    'bn-current-price-dot',
    document.getElementById('resultBN')
  );

  fetchAndUpdateData(
    'https://appfeeds.moneycontrol.com/jsonapi/market/indices&format=json&t_device=iphone&t_app=MC&t_version=48&ind_id=9',
    document.getElementById('N_LASTPRICE'),
    document.getElementById('N_CHANGE'),
    document.getElementById('N_PERCENTCHANGE'),
    document.getElementById('N_HIGH'),
    document.getElementById('N_LOW'),
    document.getElementById('N_PRICE_CHART'),
    'n-current-price-dot',
    document.getElementById('resultN')
  );

  // Call the function every 2 seconds
  setInterval(function () {
    fetchAndUpdateData(
      'https://appfeeds.moneycontrol.com/jsonapi/market/indices&format=json&t_device=iphone&t_app=MC&t_version=48&ind_id=23',
      document.getElementById('BN_LASTPRICE'),
      document.getElementById('BN_CHANGE'),
      document.getElementById('BN_PERCENTCHANGE'),
      document.getElementById('BN_HIGH'),
      document.getElementById('BN_LOW'),
      document.getElementById('BN_PRICE_CHART'),
      'bn-current-price-dot',
      document.getElementById('resultBN')
    );

    fetchAndUpdateData(
      'https://appfeeds.moneycontrol.com/jsonapi/market/indices&format=json&t_device=iphone&t_app=MC&t_version=48&ind_id=9',
      document.getElementById('N_LASTPRICE'),
      document.getElementById('N_CHANGE'),
      document.getElementById('N_PERCENTCHANGE'),
      document.getElementById('N_HIGH'),
      document.getElementById('N_LOW'),
      document.getElementById('N_PRICE_CHART'),
      'n-current-price-dot',
      document.getElementById('resultN')
    );
  }, 5000);
});

// document.addEventListener('DOMContentLoaded', function () {
//   // Fetch data from MoneyControl API
//   fetch('https://appfeeds.moneycontrol.com/jsonapi/market/indices&format=json&t_device=iphone&t_app=MC&t_version=48&ind_id=23')
//     .then(response => response.json())
//     .then(data => {
//       // Display the fetched data in the popup
//       let data_price = data.indices.lastprice;
//       let data_change = data.indices.change;
//       let data_percentchange = data.indices.percentchange;
//       let data_high = data.indices.high;
//       let data_low = data.indices.low;


//       const BN_LASTPRICE = document.getElementById('BN_LASTPRICE');
//       BN_LASTPRICE.innerText = data_price;
//       // BN_LASTPRICE.innerText = JSON.stringify(data_price, null, 2);

//       const BN_CHANGE = document.getElementById('BN_CHANGE');
//       BN_CHANGE.innerText = data_change;

//       const BN_PERCENTCHANGE = document.getElementById('BN_PERCENTCHANGE');
//       BN_PERCENTCHANGE.innerText = data_percentchange;

//       const BN_HIGH = document.getElementById('BN_HIGH');
//       BN_HIGH.innerText = data_high;

//       const BN_LOW = document.getElementById('BN_LOW');
//       BN_LOW.innerText = data_low;

//       const int_data_price = parseFloat(data_price.replace(/,/g, ''));
//       const int_data_low = parseFloat(data_low.replace(/,/g, ''));
//       const int_data_high = parseFloat(data_high.replace(/,/g, ''));
//       const percentage = ((int_data_price - int_data_low) / (int_data_high - int_data_low)) * 100;
//       const priceChart = document.getElementById('BN_PRICE_CHART');
//       priceChart.style.width = `${percentage}%`;
//       const previousDot = document.querySelector('.bn-current-price-dot');
//       if (previousDot) {
//         previousDot.remove();
//       }
//       const currentPriceDot = document.createElement('div');
//       currentPriceDot.className = 'bn-current-price-dot';
//       currentPriceDot.style.left = `${percentage}%`;
//       priceChart.appendChild(currentPriceDot);
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//       const resultElement = document.getElementById('resultBN');
//       resultElement.innerText = 'Error fetching data. Check console for details.';
//     });


//   fetch('https://appfeeds.moneycontrol.com/jsonapi/market/indices&format=json&t_device=iphone&t_app=MC&t_version=48&ind_id=9')
//     .then(response => response.json())
//     .then(data => {
//       // Display the fetched data in the popup
//       let data_price = data.indices.lastprice;
//       let data_change = data.indices.change;
//       let data_percentchange = data.indices.percentchange;
//       let data_high = data.indices.high;
//       let data_low = data.indices.low;


//       const N_LASTPRICE = document.getElementById('N_LASTPRICE');
//       N_LASTPRICE.innerText = data_price;
//       // N_LASTPRICE.innerText = JSON.stringify(data_price, null, 2);

//       const N_CHANGE = document.getElementById('N_CHANGE');
//       N_CHANGE.innerText = data_change;

//       const N_PERCENTCHANGE = document.getElementById('N_PERCENTCHANGE');
//       N_PERCENTCHANGE.innerText = data_percentchange;

//       const N_HIGH = document.getElementById('N_HIGH');
//       N_HIGH.innerText = data_high;

//       const N_LOW = document.getElementById('N_LOW');
//       N_LOW.innerText = data_low;
//       const int_data_price = parseFloat(data_price.replace(/,/g, ''));
//       const int_data_low = parseFloat(data_low.replace(/,/g, ''));
//       const int_data_high = parseFloat(data_high.replace(/,/g, ''));
//       const percentage = ((int_data_price - int_data_low) / (int_data_high - int_data_low)) * 100;
//       const priceChart = document.getElementById('N_PRICE_CHART');
//       priceChart.style.width = `${percentage}%`;
//       const previousDot = document.querySelector('.n-current-price-dot');
//       if (previousDot) {
//         previousDot.remove();
//       }
//       const currentPriceDot = document.createElement('div');
//       currentPriceDot.className = 'n-current-price-dot';
//       currentPriceDot.style.left = `${percentage}%`;
//       priceChart.appendChild(currentPriceDot);


//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//       const resultElement = document.getElementById('resultN');
//       resultElement.innerText = 'Error fetching data. Check console for details.';
//     });
// });

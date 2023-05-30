document.addEventListener('DOMContentLoaded', () => {
    const exchangeRateElement = document.getElementById('exchange-rate');
    const amount1Element = document.getElementById('amount1');
    const currency1Element = document.getElementById('currency1');
    const amount2Element = document.getElementById('amount2');
    const currency2Element = document.getElementById('currency2');
  
    // Fetch exchange rates from API
    fetch('https://api.exchangerate-api.com/v4/latest/UAH')
      .then(response => response.json())
      .then(data => {
        const rates = data.rates;
        const baseCurrency = data.base;
  
        exchangeRateElement.textContent = `Exchange Rate: 1 ${baseCurrency} = ${rates.USD} USD, ${rates.EUR} EUR`;
  
        // Convert currency
        const convertCurrency = () => {
          const amount1 = parseFloat(amount1Element.value);
          const amount2 = parseFloat(amount2Element.value);
          const rate1 = rates[currency1Element.value];
          const rate2 = rates[currency2Element.value];
  
          if (!isNaN(amount1)) {
            amount2Element.value = (amount1 * (rate2 / rate1)).toFixed(2);
          } else if (!isNaN(amount2)) {
            amount1Element.value = (amount2 * (rate1 / rate2)).toFixed(2);
          }
        };
  
        amount1Element.addEventListener('input', convertCurrency);
        currency1Element.addEventListener('change', convertCurrency);
        amount2Element.addEventListener('input', convertCurrency);
        currency2Element.addEventListener('change', convertCurrency);
      })
      .catch(error => {
        console.error('Error:', error);
        exchangeRateElement.textContent = 'Error retrieving exchange rate.';
      });
  });
  
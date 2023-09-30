let currencyData;

async function fetchCurrencyData() {
  try {
    const response = await fetch('https://interview.switcheo.com/prices.json'); // Replace with the actual URL
    currencyData = await response.json();
    populateCurrencyOptions();
    calculateConversion();
  } catch (error) {
    console.error('Error fetching currency data:', error);
  }
}

function populateCurrencyOptions() {
  const inputCurrencySelect = document.getElementById('input-currency');
  const outputCurrencySelect = document.getElementById('output-currency');

  const currencies = new Set(currencyData.map(data => data.currency));

  for (const currency of currencies) {
    
    const option = document.createElement('option');
    option.value = currency;
    option.textContent = currency;

    inputCurrencySelect.appendChild(option.cloneNode(true));
    outputCurrencySelect.appendChild(option);
  }
  inputCurrencySelect.addEventListener('change', getInputLogo());
  outputCurrencySelect.addEventListener('change', getOutputLogo());
}

  

function getExchangeRate(currency) {
  const currencyInfo = currencyData.find((data) => data.currency === currency);
  return currencyInfo ? currencyInfo.price : null;
}

function calculateConversion() {
  const inputAmount = parseFloat(document.getElementById('input-amount').value);
  const outputAmountField = document.getElementById('output-amount');
  const inputCurrency = document.getElementById('input-currency').value;
  const outputCurrency = document.getElementById('output-currency').value;

  const inputExchangeRate = getExchangeRate(inputCurrency);
  const outputExchangeRate = getExchangeRate(outputCurrency);

  if (!isNaN(inputAmount) && inputExchangeRate !== null && outputExchangeRate !== null) {
    const convertedAmount = (inputAmount * outputExchangeRate) / inputExchangeRate;
    const formattedAmount = `${convertedAmount.toFixed(2)}`;
    outputAmountField.value = formattedAmount;
  } else {
    outputAmountField.value = '';
  }
}

function getInputLogo() {
  const selectedCurrency = document.getElementById('input-currency').value;
  const currencyLogo = document.querySelector('.input-logo');
  const iconPath = `tokens/${selectedCurrency}.svg`;
  currencyLogo.src = iconPath;
}

function getOutputLogo() {
  const selectedCurrency = document.getElementById('output-currency').value;
  const currencyLogo = document.querySelector('.output-logo');
  const iconPath = `tokens/${selectedCurrency}.svg`;
  currencyLogo.src = iconPath;
}

document.getElementById('input-amount').addEventListener('input', calculateConversion);
document.getElementById('input-currency').addEventListener('change', calculateConversion);
document.getElementById('input-currency').addEventListener('change', fetchCurrencyData);
document.getElementById('output-currency').addEventListener('change', calculateConversion);
document.getElementById('output-currency').addEventListener('change', fetchCurrencyData);


document.getElementById('clear-button').addEventListener('click', () => {
  document.getElementById('input-amount').value = '';
  document.getElementById('output-amount').value = '';
});

fetchCurrencyData();

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
  
    function toggleTheme() {
      const body = document.body;
      body.classList.toggle('light-theme');
      body.classList.toggle('dark-theme');
    }
  
    themeToggleCheckbox.addEventListener('change', toggleTheme);
  });
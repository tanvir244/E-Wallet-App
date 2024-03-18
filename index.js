
document.querySelector('#ewallet-form').
  addEventListener('submit', function (e) {
    e.preventDefault();

    const type = document.querySelector('.add__type').value;
    const desc = document.querySelector('.add__description').value;
    const value = document.querySelector('.add__value').value;

    if (desc.length > 0 && value.length > 0) {
      addItems(type, desc, value);
      resetForm();
    }

  })

// *************************************************
// ********* UI ************************************
// *************************************************
showItems();

function showItems() {
  let items = getItemsFromLS();
  const collection = document.querySelector('.collection');

  for (let item of items) {
    const newHtml = `
    <div class="item">
    <div class="item-description-time">
      <div class="item-description">
        <p>${item.desc}</p>
      </div>
      <div class="item-time">
        <p>${item.timeFormated}</p>
      </div>
    </div>
    <div class="item-amount ${item.type === '+' ? 'income-amount' : 'expense-amount'}">
      <p>${item.type}$${sep(item.value)}</p>
    </div>
  </div>
    `;
    collection.insertAdjacentHTML('afterbegin', newHtml);
  }
}


function addItems(type, desc, value) {
  const timeFormated = getFormattedTime();
  const collection = document.querySelector('.collection');
  const newHtml = `
    <div class="item">
    <div class="item-description-time">
      <div class="item-description">
        <p>${desc}</p>
      </div>
      <div class="item-time">
        <p>${timeFormated}</p>
      </div>
    </div>
    <div class="item-amount ${type === '+' ? 'income-amount' : 'expense-amount'}">
      <p>${type}$${sep(value)}</p>
    </div>
  </div>
    `;
  collection.insertAdjacentHTML('afterbegin', newHtml);
  addItemsToLS(type, desc, value, timeFormated);

  showTotalIncome();
  showTotalExpense();
  showTotalBalance();
}

function resetForm() {
  document.querySelector('.add__type').value = '+';
  document.querySelector('.add__description').value = '';
  document.querySelector('.add__value').value = '';
}

// Storing Data to Local Storage
function getItemsFromLS() {
  let items = localStorage.getItem('items');

  if (items) {
    items = JSON.parse(items)
  } else {
    items = []
  }

  return items;
}

function addItemsToLS(type, desc, value, timeFormated) {
  const items = getItemsFromLS();

  items.push({ type, desc, value, timeFormated })
  localStorage.setItem('items', JSON.stringify(items));
}

// ************************************************
// ****** Show total income & expences ***********************
// ************************************************
showTotalIncome();
function showTotalIncome() {
  let items = getItemsFromLS();
  let totalIncome = 0;
  for (let item of items) {
    if (item.type === '+') {
      totalIncome += parseInt(item.value);
    }
  }
  document.querySelector('.income__amount p').innerText = `$${sep(totalIncome)}`;
}

showTotalExpense();
function showTotalExpense() {
  let items = getItemsFromLS();
  let totalExpense = 0;
  for (let item of items) {
    if (item.type === '-') {
      totalExpense += parseInt(item.value);
    }
  }
  document.querySelector('.expense__amount p').innerText = `$${sep(totalExpense)}`;
}

showTotalBalance();
function showTotalBalance(){
  const items = getItemsFromLS();
  let balance = 0;

  for(let item of items){
    if(item.type === '+'){
      balance += parseInt(item.value);
    } else {
      balance -= parseInt(item.value);
    }
  }
  document.querySelector('.balance__amount p').innerText = sep(balance);
  if(balance >= 0){
    document.querySelector('header').className = 'green';
  } else {
    document.querySelector('header').className = 'red';
  }
}

function sep(amount){
  amount = parseInt(amount);
  return amount.toLocaleString();
}

// ************************************************
// *** Utilites functions *************************
// ************************************************
function getFormattedTime() {
  const now = new Date();

  // getting current month
  const currentMonth = now.toLocaleString('en', {
    month: 'short',
    day: 'numeric'
  });
  const reversMonth = currentMonth.split(' ')[0];
  const reversMonthDay = currentMonth.split(' ')[1];
  const expectedMonthFormate = `${reversMonthDay} ${reversMonth}`;

  // getting current time
  const time = now.toLocaleTimeString();
  const hours = time.split(' ')[0].split(':')[0];
  const minutes = time.split(' ')[0].split(':')[1];
  const AMorPM = time.split(' ')[1];
  const expectedTimeFormate = `${hours.length < 2 ? `0${hours}` : `${hours}`}:${minutes.length < 2 ? `0${minutes}` : `${minutes}`} ${AMorPM}`;

  return (`${expectedMonthFormate}, ${expectedTimeFormate}`);
} 

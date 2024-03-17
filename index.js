
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
      <p>${type}$${value}</p>
    </div>
  </div>
    `;
  collection.insertAdjacentHTML('afterbegin', newHtml);
}

function resetForm() {
  document.querySelector('.add__type').value = '+';
  document.querySelector('.add__description').value = '';
  document.querySelector('.add__value').value = '';
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
  console.log(expectedMonthFormate);

  // getting current time
  const time = now.toLocaleTimeString();
  const hours = time.split(' ')[0].split(':')[0];
  const minutes = time.split(' ')[0].split(':')[1];
  const AMorPM = time.split(' ')[1];
  const expectedTimeFormate = `${hours.length < 2 ? `0${hours}` : `${hours}`}:${minutes.length < 2 ? `0${minutes}` : `${minutes}`} ${AMorPM}`;
  console.log(expectedTimeFormate);
  
  return (`${expectedMonthFormate}, ${expectedTimeFormate}`);
} 
const result = getFormattedTime();
console.log(result);
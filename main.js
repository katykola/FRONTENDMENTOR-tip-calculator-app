const bill = document.getElementById('bill');
const tipPercent = document.querySelectorAll('.tip-percent');
const tipPercentButton = document.querySelectorAll('.tip-button');
const peopleNumber = document.getElementById('numberPeople');
const peopleNumberErr = document.querySelector('.numberPeopleErr');
const tipCustom = document.querySelector('.tip-input');
let total = document.getElementById('total');
let tip = document.getElementById('tip');
const reset = document.querySelector('.reset');


let currentBillValue = 0;
let currentPercentValue = 0;
let currentPeopleNumber = 0; // počet lidí nesmí být nula, pak by byl výsledek vždy špatně


// Counting results
const updateTipnTotal = () => {
  if (!isNaN(currentBillValue) && !isNaN(currentPercentValue) && !isNaN(currentPeopleNumber)) {
    const totalAmount = (currentBillValue + (currentBillValue * currentPercentValue))/currentPeopleNumber;
    total.innerText = `$${totalAmount.toFixed(2)}`;
    const tipAmount = (currentBillValue*currentPercentValue)/currentPeopleNumber; //100 * (1 - 0.15)
    tip.innerText = `$${tipAmount.toFixed(2)}`;
  } else {
    total.innerText = "$0.00";
    tip.innerText = "$0.00";
  }
};

// Setting input event listerens
bill.addEventListener('input', function() {
  currentBillValue = parseFloat(bill.value); // parses a string argument and returns a floating point number
  peopleIsNotZero(currentPeopleNumber);
});


tipPercentButton.forEach(button => {
  button.addEventListener('click', function() {
    currentPercentValue = parseFloat(button.value);
    peopleIsNotZero(currentPeopleNumber);
    removeClassTipPercent();
    button.classList.add('tip-percent-selected');
  });
});

tipCustom.addEventListener('input', function(){
  currentPercentValue = parseFloat(tipCustom.value)/100;
  peopleIsNotZero(currentPeopleNumber);
  removeClassTipPercent();
  tipCustom.classList.add('tip-percent-selected');
})

peopleNumber.addEventListener('input', function() {
  currentPeopleNumber = parseFloat(peopleNumber.value);
  peopleIsNotZero(currentPeopleNumber);
});

// Reset all inputs and results

reset.addEventListener('click', function(){
  bill.value = 0;
  removeClassTipPercent();
  peopleNumber.value = 0;
  total.innerText = "$0.00";
  tip.innerText = "$0.00";
})

// Handling input errors
function peopleIsNotZero(currentPeopleNumber){
  if(currentPeopleNumber === 0){
    peopleNumberErr.classList.add('numberPeopleErr-show');
    peopleNumber.classList.add('input-people-err');
    total.innerText = "$0.00";
    tip.innerText = "$0.00";
  } else{    
    peopleNumberErr.classList.remove('numberPeopleErr-show');
    peopleNumber.classList.remove('input-people-err');
    updateTipnTotal();
  }
}

function removeClassTipPercent(){
  tipPercentButton.forEach(btn => btn.classList.remove('tip-percent-selected'));
}
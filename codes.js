buttonsLabelArray =['%','CE','C','&#10498','1/x','x<sup>2</sup>','&#8730;x','&#247;','7','8','9','&#215;','4','5','6','&#8722;','1','2','3','+','&#177;','0','.','='];
memOpButtonLabelArray = ['MC','MR','M+','M-','MS','M&#8744;']
inactiveButtonsIndices = [0,3,4,5,6,20,22];
const buttonWidth = 30;
const buttonsMargin = 1;
const buttonsArr = [];
const memOpButtonsArr = [];
let lastNumber = 0;
let currentNumber = 0;
let lastOperation = '+';
let nextNumberFlag = false;

function createButtons(){    
    const buttonsPane = document.querySelector('.buttons-pane');
    index = 0;
    for (let iRow = 1 ; iRow<=6;iRow++){
        for (let iCol = 1;iCol<=4;iCol++){
            buttonsArr[index] = document.createElement("button");
            buttonsArr[index].innerHTML = buttonsLabelArray[index];
            buttonsArr[index].id = `${iRow}-${iCol}-${buttonsLabelArray[index]}`;
            buttonsArr[index].style.gridColumn = `${iCol}/ span 1`;
            buttonsArr[index].style.gridRow = `${iRow}/ span 1`;
            buttonsArr[index].classList.add('buttons');            
            buttonsPane.appendChild(buttonsArr[index]);    
            let currentElementId = buttonsArr[index].id; 
            document.getElementById(currentElementId).addEventListener("click",updateCurrentNumber); 
            if (inactiveButtonsIndices.includes(index)){
                buttonsArr[index].style.color = 'gray';
                buttonsArr[index].style.textDecoration  = 'line-through';
                buttonsArr[index].style.background = 'white';
            }
            index++;
        }
    }
}
function createMemOperationButtons(){
    const memOpbuttonsPane = document.querySelector('.memOperations-panel');
    index = 0;
    for (let i = 0;i<memOpButtonLabelArray.length;i++){
        memOpButtonsArr[index] = document.createElement("button");
        memOpButtonsArr[index].innerHTML = memOpButtonLabelArray[index];
        memOpButtonsArr[index].id = `${i}-${memOpButtonLabelArray[index]}`;
        
        memOpButtonsArr[index].classList.add('memOperation-button');
        memOpbuttonsPane.appendChild(memOpButtonsArr[index]);
        index++;
    }  
}

function updateLastOperationFromIndex(i,j){
    if (j === 4){
        if (i == 2){
            lastOperation = '/';
        }else if (i == 3){
            lastOperation = '*';
        }else if (i == 4){
            lastOperation = '-';
        }else if (i == 5){
            lastOperation = '+';
        }else if (i == 6){
            lastOperation = '=';
        }        
    }
}


function handleOperation(){
    if (lastOperation == '+'){
        let result = lastNumber + currentNumber
        lastNumber = result;
        currentNumber = 0;
        document.getElementById('screen-input').value = lastNumber
    }
    if (lastOperation == '-'){
        let result = lastNumber - currentNumber
        lastNumber = result;
        currentNumber = 0;
        document.getElementById('screen-input').value = lastNumber
    }
    if (lastOperation == '*'){
        let result = lastNumber * currentNumber
        lastNumber = result;
        currentNumber = 0;
        document.getElementById('screen-input').value = lastNumber
    }
    if (lastOperation == '/'){
        let result = lastNumber / currentNumber
        lastNumber = result;
        currentNumber = 0;
        document.getElementById('screen-input').value = lastNumber
    }
}

function checkForCommands(val){
    if (val === 'CE' || val === 'C'){
        document.getElementById('screen-input').value = ''
        lastNumber = 0;
        currentNumber = 0;
        lastOperation = '+'
        nextNumberFlag = false;
        return true;
    }
    return false;
}
function updateCurrentNumber(){
    idText = this.id;
    idTextParts = idText.split('-');    
    elementVal = idTextParts[2];    
    if (!isNaN(Number(elementVal))){
        if (nextNumberFlag === true){
            document.querySelector('#screen-input').value = '';
        }
        let temp = document.querySelector('#screen-input').value;
        if (temp === ''){
            temp = 0
        }
        document.querySelector('#screen-input').value = Number(`${temp}${elementVal}`)
    }else if (checkForCommands(elementVal) === false)
    {        
        currentNumber = Number(document.querySelector('#screen-input').value)
        handleOperation()
        updateLastOperationFromIndex(Number(idTextParts[0]),Number(idTextParts[1]))
        nextNumberFlag = true
    }
    
}




document.getElementById('screen-input').value = 0
createMemOperationButtons();
createButtons();





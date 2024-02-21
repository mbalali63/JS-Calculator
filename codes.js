buttonsLabelArray =['%','CE','C','&#10498','1/x','x<sup>2</sup>','&#8730;x','&#247;','7','8','9','&#215;','4','5','6','-','1','2','3','+','&#177;','0','.','='];
memOpButtonLabelArray = ['MC','MR','M+','M-','MS','M&#8744;']
const buttonWidth = 30;
const buttonsMargin = 1;
const buttonsArr = [];
const memOpButtonsArr = [];
let lastNumber = 0;
let currentNumber = 0;
let lastOperation = '+'

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
            document.getElementById(currentElementId).addEventListener("click",updateLastCurrentNumber); 
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

function updateLastCurrentNumber(){
    idText = this.id;
    idTextParts = idText.split('-');    
    elementVal = idTextParts[2];    
    let temp = document.querySelector('#screen-input').value;
    document.querySelector('#screen-input').value = Number(`${temp}${elementVal}`)
}



document.getElementById('screen-input').value = 0
createMemOperationButtons();
createButtons();





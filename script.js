const stringsymbol = ["+", "-", "/", "x"];
const stringnumber = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
const arrayButton = [
  "%",
  "CE",
  "C",
  "delete",
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "x",
  "1",
  "2",
  "3",
  "+",
  "~",
  "0",
  ".",
  "=",
];
var number1 = "";
var number2 = "";
var symbol = "";

let dau = 0;
var numberAndSign = "";

const displayNumber = (num) => {
  const text = document.getElementById("context");
  if (text) {
    text.innerHTML = num;
    text.style.color = "white";
    text.style.visibility = "visible";
  }
};

const displayNumberAndSign = (num) => {
  const text = document.getElementById("context__input");
  if (text) {
    text.innerHTML = num;
    text.style.color = "grey";
    text.style.visibility = "visible";
  }
};

const getValue = (id) => {
  if (stringsymbol.includes(id)) {
   

    if (dau != 0) {
      let oldSymbol = symbol;
       symbol = id;
       numberAndSign += " ";
        numberAndSign += id + " ";
      displayNumberAndSign(numberAndSign);
      
      if(number2 != ''){
        let value = calculate(number1, number2, oldSymbol);
        number2 ='';
        number1 = value;
        displayNumber(value);
      }

    }
  } else {
    if (symbol !== "") {
      console.log("vo day A");
      dau += 1;
      number2 += id;

    
      displayNumber(number2);
      numberAndSign += id;
    } else {
      
      console.log("vo dayB");
      dau += 1;
      number1 += id;
           numberAndSign += id;
       console.log("dau" +dau);
     if(dau != 1)
     {
    displayNumber(number1);
      displayNumberAndSign(numberAndSign);
     }
     else {
       displayNumber(number1);
     }
    }
  }

  console.log(number1);
  console.log(number2);
};


const calculate = (a, b, element) => {
  const Soa  = Number(a);
  const Sob = Number(b);
    switch (element) {
        case '+':
            return Soa + Sob;
        case '-':
            return  Soa - Sob;
        case '*':
            return  Soa * Sob;
        case '/':
          {
            if(b == 0)
            displayNumberAndSign("Not 0");
            else 
             return ( Soa / Sob).toFixed(2);
          }
          
        default:
            return 'Invalid operator';
    }
};

const containerButton = () => {
  const element = document.getElementById("groupButton");

  for (let i = 0; i < arrayButton.length; i++) {
    const element = arrayButton[i];
    const button = document.createElement("div");
    const text = document.createElement("p");

    text.innerHTML = element;

    button.appendChild(text);

    button.addEventListener("click", () => {
      getValue(element);
    });
    button.classList.add("button", "hovermain");
    // button.setAttribute("id",element)
    for (let i = 0; i < stringnumber.length; i++) {
      if (element.includes(stringnumber[i])) {
        button.classList.add("buttonNumber", "hovermain");
      }
    }

    for (let i = 0; i < stringsymbol.length; i++) {
      if (element.includes(stringsymbol[i])) {
        button.classList.add("button", "hoverBttSpecial");
      }
    }

    if (element === "=") {
      button.classList.add("buttonEqual", "hoverBttSpecial");
    }

    groupButton.appendChild(button);
  }
};

containerButton();

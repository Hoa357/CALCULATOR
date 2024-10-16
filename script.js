const stringsymbol = ["+", "-", "/", "x", "="];
const stringnumber = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
const arrayButton = [
  "CE",
  "C",
  "delete",
  "-",
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
const charResult = "=";
const charClearAll = "C";
const charClear = "CE";
const charDelete = "delete";
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

const setDefault = () => {
  number1 = "";
  number2 = "";
  symbol = "";
  numberAndSign = "";
  dau = 0;
};

const print = (printnumber, printnumberandsign) => {
  displayNumberAndSign(printnumberandsign);
  displayNumber(printnumber);
};

const getValue = (id) => {
  ////////// Clear C //////////////////
  if (id == charClearAll) {
    print(0, " ");

    setDefault();

    return;
  }
  if (stringsymbol.includes(id)) {
    let oldSymbol = symbol;
    if (id == charResult) {
      if (number2 == "") {
        number2 = number1;
      }
      let value = calculate(number1, number2, oldSymbol);

      number1 = value;

      numberAndSign = "";

      print(value, numberAndSign);
      dau = 0;
    } 
    else if (number1 != "" && dau == 0) {
      number2 = "";
      numberAndSign = number1 + " " + id + " ";
      symbol = id;
      dau += 1;

      print(number1, numberAndSign);
    } 

    if (dau != 0) {
      symbol = id;

      //////////////
      const lastChar = numberAndSign[numberAndSign.length - 2];
      // Kiểm tra xem cả hai ký tự đều là phép toán
      if (
        numberAndSign.length > 1 &&
        stringsymbol.includes(lastChar) &&
        id != charResult
      ) {
        // Xóa ký tự kế cuối

        numberAndSign = numberAndSign.replace(lastChar, id);
      } else {
        numberAndSign += " " + id + " ";
      }

      displayNumberAndSign(numberAndSign);

      if (number2 != "") {
        let value = calculate(number1, number2, oldSymbol);
        number2 = "";
        number1 = value;

        displayNumber(value);
      }
    }
  } else {
    if (symbol !== "") {
      ///////////// CE ////////////////

      if (id == charClear) {
        
        numberAndSign = numberAndSign.replace(number2, "0");

        number2 = "0";
      } else {
        dau += 1;

        //// delete
        if (id === charDelete) {
          number2 = number2.slice(0, -1);
          numberAndSign = numberAndSign.slice(0, -1);
         
        } else if (number2 === "0") {
          number2 = id;
          numberAndSign += id;
        } else {
          number2 += id;
          numberAndSign += id;
        }
      }

      displayNumber(number2);
    } else {
      if ( id == charClear) {
       

        displayNumber(0);
        setDefault();

        return;
      }

      dau += 1;
      /// delete
      if (id === charDelete) {
        number1 = number1.slice(0, -1);
        numberAndSign = numberAndSign.slice(0, -1);
      } else {
        number1 += id;
        numberAndSign += id;
      }

      if ((id = charResult)) {
        displayNumber(number1);

        return;
      } else if (dau != 0) {
        print(number1, numberAndSign);
      } else {
        displayNumber(number1);
      }
    }
  }
};

const calculate = (a, b, element) => {
  const Soa = Number(a);
  const Sob = Number(b);
  switch (element) {
    case "+":
      return Soa + Sob;
    case "-":
      return Soa - Sob;
    case "x":
      return Soa * Sob;
    case "/": {
      if (b == 0) displayNumberAndSign("Not 0");
      else return (Soa / Sob).toFixed(2);
    }

    default:
      displayNumber(Soa);
      break;
     
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

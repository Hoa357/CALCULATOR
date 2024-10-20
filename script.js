
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
// Hàm lấy giá trị kết quả
const displayNumber = (num) => {
  const text = document.getElementById("context");
  if (text) {
    text.innerHTML = num;
    text.style.color = "white";
    text.style.visibility = "visible";
  }
};

// Hàm lấy giá trị phép tính
const displayNumberAndSign = (num) => {
  const text = document.getElementById("context__input");
  if (text) {
    text.innerHTML = num;
    text.style.color = "grey";
    text.style.visibility = "visible";
  }
};

// Hàm đưa về giá trị mặc định 
const setDefault = () => {
  number1 = "";
  number2 = "";
  symbol = "";
  numberAndSign = "";
  dau = 0;
};

// Hàm in ra giá trị phép tính và kết quả phép tính

const print = (printnumber, printnumberandsign) => {
  displayNumberAndSign(printnumberandsign);
  displayNumber(printnumber);
};


// Hàm lấy giá trị 
const getValue = (id) => {
  
  // Kiểm tra có phải button C//
  if (id == charClearAll) {
    print(0, " ");

    setDefault();

    return;
  }

  // Kiểm tra id có phải là dấu //
      // Nếu Id là dấu //
  if (stringsymbol.includes(id)) {
    let oldSymbol = symbol;
     // Nếu id là dấu = //
    if (id == charResult) {
       // TH1 - Phép tính kết thúc là dấu -
      if (number2 == "") {
        number2 = number1;
      }
      // TH2 - Phép tính kết thúc là số -
      let value = calculate(number1, number2, oldSymbol);
      
      number1 = value.toString();
      numberAndSign = "";
      print(value, numberAndSign);
      dau = 0;
    } 
     // Nếu id là không dấu = //
     // Xử lý lưu trữ bình thường //
    else if (number1 != "" && dau == 0) {
      number2 = "";
      numberAndSign = number1 + " " + id + " ";
      symbol = id;
      dau += 1;

      print(number1, numberAndSign);
    } 

    // Kiểm tra dấu khác lần nhập đầu //
    if (dau != 0) {
      symbol = id;

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
      // Thực hiện logic bình thường //
      if (number2 != "") {
        let value = calculate(number1, number2, oldSymbol);
        number2 = "";
        number1 = value.toString();

        displayNumber(value);
      }
    }
  } else {
    // Nếu id không là dấu //
    // Kiểm tra Symbol có lưu trữ dấu chưa => number2 //
    if (symbol !== "") {
      
      // Kiểm tra có phải là nút CE //
      if (id == charClear) {
        
        numberAndSign = numberAndSign.replace(number2, "0");
        number2 = "0";
      } else {
        dau += 1;

        // Kiểm tra có phải là nút Delete //
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
        // Kiểm tra có phải là nút CE //
      if ( id == charClear) {
         number1 = "0";
        displayNumber(number1);
        setDefault();
       
        return;
      }
      else {
        dau += 1;

     
     // Kiểm tra có phải là nút Delete //
      if (id === charDelete) {
        number1 = number1.slice(0, -1);
        numberAndSign = numberAndSign.slice(0, -1);
      }
       else if (number1 === "0") {
          number2 = id;
          numberAndSign += id;
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
  }
};




// Hàm máy tính 
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

// Hàm tạo ra các nút button
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


/// LOGIC Tính 2 số   ///
/// Number 1 = value(number1 + number2) , sau 1 dấu là giá trị của number2 ( number2 = " ") /////
/// Dùng symbol lưu trữ dấu ///
///
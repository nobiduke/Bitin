

const IF = "?";
const BITSLENGTH = 32;
const BILLION = 1000000000;

function switchRun(){
   RUN = RUN ? false: true;
}

// addition and BITS are in base 10
function addTotal(addition){
    let total = addition + BITS;

    BITS = total;
    BITS_2 = convertBits(total);
}

// convert base 10 into base 2
function convertBits(){
    let strNum = num.toString(2);
    let zeros = "";
    for(let i = 0; i < 32-strNum.length; i++){
        zeros+="0";
    }
    strNum = zeros+strNum;
    return strNum;
}

let code = 0;

function buyCode(){
    let cost = (code+60)/5.6;
    if (num >= cost){
        num = num - Math.floor(cost);
        code++;
        return true;
    }

    return false;
    
}

let ifs = 0;
function buyIfs(){
    let cost = (2**(ifs+10))/100;
    if (num >= cost){
        num = num - Math.floor(cost);
        ifs++;
        return true;
    }

    return false;
}

// selects a random bit checks if its on, if so double the base points gained 
function useConditionals(Condition , Code){
    strNum = convertBits();
    if(strNum[Condition] == "1"){
        return Code;
    }

    return 0;
}

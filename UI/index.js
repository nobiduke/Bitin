

var bitGrid = document.getElementById('bit-grid');
var bitAmount = document.getElementById('shop-bit-amount');
const BITDIM = 20;
const BIT_OFF = '#AA1111';
const BIT_ON = '#00CC00';

// intialize bit grid
for(let i = 0; i < 32; i++){
    let bitElem = document.createElement('div');
    bitElem.style.width = `${BITDIM}px`;
    bitElem.style.height = `${BITDIM}px`;
    bitElem.style.backgroundColor = BIT_OFF;
    bitElem.id = `bit-${31-i}`;

    // add each bit to bit grid 
    // (most sig -> least sig)
    bitGrid.appendChild(bitElem);
}

let num = 0;

function updateBits(num){
    let strNum = num.toString(2);
    let zeros = "";
    for(let i = 0; i < 32-strNum.length; i++){
        zeros+="0";
    }
    strNum = zeros+strNum;
    let i = 0
    for(const node of document.getElementById('bit-grid').children){
        
        if (strNum[i] == '0'){
            node.style.backgroundColor = BIT_OFF;
        } else{
            node.style.backgroundColor = BIT_ON;
        }
        i++;
    }
}

let frame = 0;
let delay = 64;
function looper(d){
    if (frame % delay == 0){
        num+=1;
        updateBits(num);
    }
    
    frame++;
    bitAmount.innerHTML = num;
    window.requestAnimationFrame(looper);
}

window.requestAnimationFrame(looper)
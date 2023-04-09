// buyable enum type thing
const CODES = {
    IF: 0,
    CONDITION: 1,
    CODE: 2,
    TIMER: 3
}

// important game variables
var num = 0; // the current bit amount
var ifindex = 0;
var fieldindex = 0;
var console = document.getElementById('console-holder');
var ifholder = document.getElementById('console-if-holder');
var blockholder= document.getElementById('block-holder');

// bit grid initialization variables
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
    bitElem.style.display = 'flex';
    bitElem.style.justifyContent = 'center';
    bitElem.style.alignItems = 'center';
    bitElem.style.fontSize = `${BITDIM-5}px`;
    bitElem.style.fontFamily = 'consolas';
    bitElem.innerHTML = 31-i;
    bitElem.id = `bit-${31-i}`;

    // add each bit to bit grid 
    // (most sig -> least sig)
    bitGrid.appendChild(bitElem);
}

// create elements after purchase
function buy(OPCODE){
    // console.log(OPCODE);
    switch(OPCODE){
        case CODES.IF:
            if(ifindex >= 5){
                break;
            }
            let ifelem = document.createElement('span');
            ifelem.classList.add('if-block');
            ifelem.id = `if-${ifindex}`;
            ifelem.innerHTML = "if";

            let conditionelem = document.createElement('span');
            conditionelem.classList.add('base-condition');
            conditionelem.innerHTML = 'CONDITION';
            conditionelem.id = `condition-${ifindex}`;

            ifelem.appendChild(conditionelem);
            ifelem.innerHTML+="then";

            let codeelem = document.createElement('span');
            codeelem.classList.add('base-code');
            codeelem.innerHTML = 'CODE';
            codeelem.id = `code-${ifindex}`;
            ifelem.appendChild(codeelem);

            ifindex++;

            ifholder.appendChild(ifelem);
            break;
        case CODES.CONDITION:
            let condelem = document.createElement('span');
            condelem.id = `cn-${fieldindex}`;
            condelem.classList.add('base-condition');
            condelem.innerHTML = `bit ${Math.floor(Math.random()*31)}`;
            blockholder.appendChild(condelem);

            fieldindex++;

            break;
        case CODES.CODE:
            let cdelem = document.createElement('span');
            cdelem.id = `cd-${fieldindex}`;
            cdelem.classList.add('base-code');
            cdelem.innerHTML = `x${Math.ceil(Math.random()*15)}`;
            blockholder.appendChild(cdelem);
            fieldindex++;

            break;
        case CODES.TIMER:
            let tmelem = document.createElement('span');
            tmelem.id = `tm-${fieldindex}`;
            tmelem.classList.add('base-timer');
            tmelem.innerHTML = `${Math.floor(Math.random()*31)}s`;
            blockholder.appendChild(tmelem);
            fieldindex++;

            break;
        default:
            console.log("ERROR")
    }
}

// button functions
const buyIF = () => buy(CODES.IF);
const buyCN = () => buy(CODES.CONDITION);
const buyCD = () => buy(CODES.CODE);
const buyTM = () => buy(CODES.TIMER);

// updates the bits visually
function updateBits(num){
    let strNum = convertBits(num);
    let i = 0;
    for(const node of document.getElementById('bit-grid').children){
        
        if (strNum[i] == '0'){
            node.style.backgroundColor = BIT_OFF;
        } else{
            node.style.backgroundColor = BIT_ON;
        }
        i++;
    }
}


// game loop init
let frame = 0;
let delay = 64;

function looper(d){
    if (frame % delay == 0){ // on set amount of frames inc
        buyCode();
        num+=1;
    }
    
    updateBits(num); // update the bit visuals
    frame++; // inc frame amount
    bitAmount.innerHTML = num; // update shop bit amount
    window.requestAnimationFrame(looper); // loop
}

window.requestAnimationFrame(looper)
// index.js for Bitin' by Nobiduke

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
var mouseX = 0;
var mouseY = 0;
var draggable = false;
var moving = false;
var console = document.getElementById('console-holder');
var ifholder = document.getElementById('console-if-holder');
var blockholder= document.getElementById('block-holder');
document.addEventListener('mousemove', (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;

    if(moving === true){
        draggable.style.position = 'absolute';
        draggable.style.left = `${mouseX-draggable.offsetWidth}px`;
        draggable.style.top = `${mouseY-draggable.offsetHeight}px`;
    }
});
document.addEventListener('mousedown', (e) => {
    if(draggable === false){return;}
    
    moving = true;
});
document.addEventListener('mouseup', (e) =>{
    if(draggable === false){return;}
    moving = false;
    draggable.style.left = "";
    draggable.style.top = "";
    draggable.style.position = "relative";
    draggable = false;
});

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

/* 
     adds drag events to a passed in field elem
*/
function addFieldDragEvents(elem){
    elem.addEventListener('mouseenter', (e) =>{
        if (draggable === false){
            draggable = elem;
        }
    });
    elem.addEventListener('mouseleave', (e) =>{
        if (!moving){
            draggable = false;
        }
    })
}

/*
    adds drag events to passed in statement element
*/
function addStatementDragEvents(elem){
    elem.addEventListener('mouseenter', (e) =>{
        if(!moving){return;}
        let type = draggable.id[0] + draggable.id[1]; // first two char of id is type

    });
    elem.addEventListener('mouseleave', (e) =>{
        console.log(elem);
    });
}

// create elements after purchase
function buy(OPCODE){

    switch(OPCODE){
        case CODES.IF: // if statement purchased
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

            addStatementDragEvents(ifelem);

            ifholder.appendChild(ifelem);
            break;
        case CODES.CONDITION: // condition purchase selected
            if (fieldindex >= 30){break;}
            let condelem = document.createElement('span');
            condelem.id = `cn-${fieldindex}`;
            condelem.classList.add('base-condition');
            condelem.innerHTML = `bit ${Math.floor(Math.random()*31)}`;
            addFieldDragEvents(condelem);
            blockholder.appendChild(condelem);
            fieldindex++;
            
            break;
        case CODES.CODE: // code purchase selected
            if (fieldindex >= 30){break;}
            let cdelem = document.createElement('span');
            cdelem.id = `cd-${fieldindex}`;
            cdelem.classList.add('base-code');
            cdelem.innerHTML = `x${Math.ceil(Math.random()*15)}`;
            addFieldDragEvents(cdelem);
            blockholder.appendChild(cdelem);
            fieldindex++;
            
            break;
        case CODES.TIMER: // timer purchase selected
            if (fieldindex >= 30){break;}
            let tmelem = document.createElement('span');
            tmelem.id = `tm-${fieldindex}`;
            tmelem.classList.add('base-timer');
            tmelem.innerHTML = `${Math.floor(Math.random()*31)}s`;
            addFieldDragEvents(tmelem);
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

// game loop init
let frame = 0;
let delay = 64;

// game loop
function looper(d){
    if (frame % delay == 0){ // on set amount of frames inc
        num+=1;
    }
    
    updateBits(num); // update the bit visuals
    frame++; // inc frame amount
    bitAmount.innerHTML = num; // update shop bit amount
    window.requestAnimationFrame(looper); // loop
}

window.requestAnimationFrame(looper)
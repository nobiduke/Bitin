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
var ifindex = 0; // current ifamount
var fieldindex = 0; // current field id
var fieldAmount = 0;
var mouseX = 0; // mouse pos
var mouseY = 0;
var draggable = false; // current held elem
var moving = false; // is elem held
var droppable = false; // elem that is dropped on

// import arrays
var currConditionals = [-1, -1, -1, -1, -1];
var currCodes = [-1, -1, -1, -1, -1];
var currTimer = -1;

// import references
var consoleelem = document.getElementById('console-holder');
var ifholder = document.getElementById('console-if-holder');
var blockholder= document.getElementById('block-holder');

/*
    game state functions
*/
function addField(id, text, ifnum){
    switch(id){
        case 'cd':
            currCodes[ifnum] = parseInt(text.split('x')[0]);
            break;
        case 'cn':
            currConditionals[ifnum] = parseInt(text.split(' ')[1]);
            break;
        case 'tm':
            currTimer = parseInt(text.split('s')[0]);
            break;
        default:
            console.log("ERROR: invalid field added");
    }

}

/* 
    document event listeners
*/
document.addEventListener('mousemove', (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;

    if(moving === true){
        draggable.style.pointerEvents = 'none';
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
    if(droppable !== false){
        if(draggable.id[0]+draggable.id[1] == "cn" || draggable.id[0]+draggable.id[1] == "tm"){
            droppable.children[0].innerHTML = draggable.innerHTML;
        } else{
            droppable.children[1].innerHTML = draggable.innerHTML;
        }
        addField((draggable.id[0]+draggable.id[1]), draggable.innerHTML, draggable[3]);
        blockholder.removeChild(draggable);
        fieldAmount--;
    }
    moving = false;
    draggable.style.pointerEvents = 'auto';
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
    bitElem.style.userSelect = 'none';
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
    elem.addEventListener('dragstart', (e)=>{
        e.dataTransfer.setData("text", e.target.id);
    })
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
    adds drag events to while statement element
*/
let whileElem = document.getElementById('console-while');
whileElem.addEventListener('mouseenter', (e) =>{
    if(!moving){return;}
    let type = draggable.id[0] + draggable.id[1]; // first two char of id is type

    let targetElem;
    if (type == "tm"){
        targetElem = whileElem.children[0];
    } else{
        return;
    }

    targetElem.style.backgroundColor = "#666687";
    droppable = whileElem;
});

whileElem.addEventListener('mouseleave', (e) =>{
    whileElem.children[0].style.backgroundColor = "#222243";
    droppable = false;
});

/*
    adds drag events to if statement element
*/
function addIfDragEvents(elem){
    elem.addEventListener('mouseenter', (e) =>{
        if(!moving){return;}
        let type = draggable.id[0] + draggable.id[1]; // first two char of id is type

        let targetElem;
        if (type == "cn"){
            targetElem = elem.children[0];
        } else if(type == "cd"){
            targetElem = elem.children[1];
        } else{
            return;
        }

        targetElem.style.backgroundColor = "#666687";
        droppable = elem;

    });
    elem.addEventListener('mouseleave', (e) =>{
        let condelem = elem.children[0];
        let codeelem = elem.children[1];
        condelem.style.backgroundColor = "#222243";
        codeelem.style.backgroundColor = "#222243";
        droppable = false;
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

            addIfDragEvents(ifelem);

            ifholder.appendChild(ifelem);
            break;
        case CODES.CONDITION: // condition purchase selected
            if (fieldAmount >= 30){break;}
            let condelem = document.createElement('span');
            condelem.id = `cn-${fieldindex}`;
            condelem.classList.add('base-condition');
            condelem.innerHTML = `bit ${Math.floor(Math.random()*31)}`;
            addFieldDragEvents(condelem);
            blockholder.appendChild(condelem);
            fieldindex++;
            fieldAmount++;
            
            break;
        case CODES.CODE: // code purchase selected
            if (fieldAmount >= 30){break;}
            let cdelem = document.createElement('span');
            cdelem.id = `cd-${fieldindex}`;
            cdelem.classList.add('base-code');
            cdelem.innerHTML = `${Math.ceil(Math.random()*15)+1}x`;
            addFieldDragEvents(cdelem);
            blockholder.appendChild(cdelem);
            fieldindex++;
            fieldAmount++;
            
            break;
        case CODES.TIMER: // timer purchase selected
            if (fieldAmount >= 30){break;}
            let tmelem = document.createElement('span');
            tmelem.id = `tm-${fieldindex}`;
            tmelem.classList.add('base-timer');
            tmelem.innerHTML = `${Math.ceil(Math.random()*15)+4}s`;
            addFieldDragEvents(tmelem);
            blockholder.appendChild(tmelem);
            fieldindex++;
            fieldAmount++;

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
    let onBits = []
    for(const node of document.getElementById('bit-grid').children){
        if (strNum[i] == '0'){
            node.style.backgroundColor = BIT_OFF;
            onBits.push(0);
        } else{
            onBits.push(1);
            node.style.backgroundColor = BIT_ON;
        }
        i++;
    }
    return onBits;
}

// game loop init
let frame = 0;
let delay = 64;

// game loop
function looper(d){
    if (frame % delay == 0){ // on set amount of frames inc
        onBits = updateBits(num); // update the bit visuals
        num+=1;
        let run = false;
        for(let i = 0; i < 5; i++){
            if(currConditionals[i] == -1){
                break;
            } else{
                run = true;

            }
        }
        if(run){
            currTimer--;
        }
        if(currTimer >= 0){}
    }
    
    whileElem.children[0].innerHTML = currTimer<0?"TIMER":`${currTimer}s`;
    updateBits(num); // update the bit visuals
    frame++; // inc frame amount
    bitAmount.innerHTML = num; // update shop bit amount
    window.requestAnimationFrame(looper); // loop
}

window.requestAnimationFrame(looper)
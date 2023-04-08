const res = require("express/lib/response")

var BITS = 0
let BITS_2= ""
let whiles = 1
var RUN = false
var CMD= ""
let whileCost = 100;

const IF = "?"
const BITSLENGTH = 32


function baseBits(){
    return whiles
}

function switchRun(){
   RUN = RUN ? false: true
}

// addition and BITS are in base 10
function addTotal(addition){
    let total = addition + BITS

    BITS = total
    BITS_2 = convertBits(total)
}

// convert base 10 into base 2
function convertBits(int){
    let convert = ""

    // add leading zeroes
    for(let x = 0; x < (BITSLENGTH-int.length); x++){
        convert += "0"
    }
    convert += int.toString(2)

    return convert
}

// selects a random bit checks if its on, if so double the base points gained 
function Conditionals(){
    let random = Math.floor(math.random()* BITSLENGTH)
    if(BITS_2[random] == "1"){
        return baseBits() *2
    }
    return 0
}

// buy a while loop bonus
function getWhile(){
    if(BITS >= whileCost){
        BITS -= whileCost
        whiles++
    }

    else{
        console.log("Not enough bits to purchase")
    }
}

function gameLoop(delta){
    let addition = 0
    for(let x in CMD){
        if( x == IF){
            addition += Conditionals()
        }
    }

    addTotal(addition)
    window.requestAnimationFrame(gameLoop)
}

window.requestAnimationFrame(gameLoop);
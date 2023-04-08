let bitGrid = document.getElementById('bit-grid');
for(let i = 0; i < 32; i++){
    let bitElem = document.createElement('div');
    bitElem.style.width = '20px';
    bitElem.style.height = '20px';
    bitElem.style.backgroundColor = '#AA1111';
    bitElem.style.marginTop = '20px';
    bitElem.style.zIndex = '10';
    bitElem.id = `bit-${31-i}`;

    bitGrid.appendChild(bitElem);
}

let num = 0;

function updateBits(strNum){
    let i = 0
    for(const node of document.getElementById('bit-grid').children){
        
        if (strNum[i] == '0'){
            node.style.backgroundColor = '#AA1111';
        } else{
            node.style.backgroundColor = '#00CC00';
        }
        i++;
    }
}

let frame = 0;
function looper(d){
    frame++;
    if (frame % 64 != 0){
        requestAnimationFrame(looper);
        return;
    }
    let strNum = num.toString(2);
    let zeros = "";
    for(let i = 0; i < 32-strNum.length; i++){
        zeros+="0";
    }
    strNum = zeros+strNum;
    updateBits(strNum);
    num++;
    window.requestAnimationFrame(looper);
}

window.requestAnimationFrame(looper)
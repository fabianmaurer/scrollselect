let historyCount = 0;
const historyRadius = 2;
let historyPosition = 0;
let historyTarget=0;
let historyAnimation = false;
let historyChanged=[];
let historyMovement=0;
let width=1000;
generatePanels();
historyPanelLoop();
function generatePanels() {
    for (let i = 0; i < 10; i++) {
        initPanel(i);
    }
}

function initPanel(index) {
    let panel = document.createElement('div');
    panel.setAttribute('class', 'history-element');
    $('#history').append(panel);
    historyCount++;
}

function addPanel() {
    let panel = document.createElement('div');
    panel.setAttribute('class', 'history-element');
    $('#history').append(panel);
    historyCount++;
}
$('#history').bind('mousewheel', function (e) {
    
    if (e.originalEvent.wheelDelta > 0) {
        
        //left
        if (historyTarget > 0) {
            historyTarget--;
            historyAnimation = true;
            console.log(historyTarget);
        }
    }
    else {
        //right        
        if (historyTarget < historyCount-1) {
            historyTarget++;
            historyAnimation = true;
            console.log(historyTarget);
        }
    }
});

function historyPanelLoop() {
    if (historyAnimation) {
        updateHistoryPosition();
        updateHistoryDOM();
        
    }
    requestAnimationFrame(historyPanelLoop);
}

function updateHistoryDOM(){
    let ch=$('#history').children();
    //console.log('changing:');
    for(let i=0;i<historyCount;i++){
        let pos=(i-historyPosition+historyRadius)/(historyRadius*2);
        console.log('pos:'+pos)
        //console.log((i-historyPosition+historyRadius)/(historyRadius*2));
        if(pos<0) pos=0;
        if(pos>1) pos=1;
        //console.log(i+': '+pos)
        $(ch[i]).css('left',width*positionConverter(pos)+'px');
    }
}

/**
 * converts from 0..1 to 0..1 using some mathematical function to create smooth movement from linear movement.
 */
function positionConverter(pos){
    if(pos==0) return 0;
    if(pos==1) return 1;
    return pos;
    if(pos>=0.5){
        pos=1-pos;
        let a=pos/0.1;
        return 1-0.5*Math.pow(0.5,a);
    }
    if(pos<0.5){
        let a=pos/0.1;
        return 0.5*Math.pow(0.5,a);
    }
}

function updateHistoryPosition() {
    historyMovement=(historyTarget-historyPosition)/8;

    if(Math.abs(historyTarget-historyPosition)<0.005){
        historyPosition=historyTarget;
        historyAnimation=false;
        console.log('stopped scrolling');
    }else historyPosition+=historyMovement;
    console.log('pos: '+historyPosition);
}
/*
$('#history').scroll(function(event){
    console.log(this.scrollY);
})
*/
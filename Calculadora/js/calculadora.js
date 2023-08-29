let labelPanel = document.getElementById("calc-panel-label");

document.addEventListener('keydown', (event) => {
    if (['1','2','3','4','5','6','7','8','9','0','-','+'].includes(event.key)) {
        pressKey(event.key);
    } else if (event.key == 'Backspace') {
        cleanPanel();
    } else if (event.key == '*') {
        pressKey('x');
    } else if (event.key == 'Enter') {
        pressEquals();
    } else if (event.key == 'Delete') {
        dellKey();
    }
})

function cleanPanel(params) {
    labelPanel.innerHTML = ""
}

function pressKey(params) {
    labelPanel.innerHTML = labelPanel.innerHTML.concat(params);
}

function dellKey(params) {
    let text = labelPanel.innerHTML;
    text = text.substring(0, text.length - 1);
    labelPanel.innerHTML = text;
}

function pressEquals(params) {
    let text = labelPanel.innerHTML;
    text = text.replace('x', '*');
    labelPanel.innerHTML = eval(text);
}
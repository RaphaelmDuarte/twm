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
    if (isNaN(text)) {
        let values = split(text);
        labelPanel.innerHTML = values;
    } else labelPanel.innerHTML = text;
}

function split(text) {
    if (text.includes('+')) {
        let values = text.split('+');
        for (x in values) {
            if (isNaN(values[x])) {
                values[x] = split(values[x]);
            }
        }
        let sum = 0;
        for (x in values) {
            if (sum != 0) {
                sum = sum + parseFloat(values[x]);
            } else { sum = parseFloat(values[x]); }
        }
        return sum;
    } else if (text.includes('-')) {
        let values = text.split('-');
        for (x in values) {
            if (isNaN(values[x])) {
                values[x] = split(values[x]);
            }
        }
        let sub = 0;
        for (x in values) {
            if (sub != 0) {
                sub = sub - parseFloat(values[x]);
            } else { sub = parseFloat(values[x]); }
        }
        return sub;
    } else if (text.includes('x')) {
        let values = text.split('x');
        for (x in values) {
            if (isNaN(values[x])) {
                values[x] = split(values[x]);
            }
        }
        let mul = 0;
        for (x in values) {
            if (mul != 0) {
                mul = mul * parseFloat(values[x]);;
            } else { mul = parseFloat(values[x]);; }
        }
        return mul;
    } else if (text.includes('/')) {
        let values = text.split('/');
        for (x in values) {
            if (isNaN(values[x])) {
                values[x] = split(values[x]);
            }
        }
        let div = 0;
        for (x in values) {
            if (div != 0) {
                div = div / parseFloat(values[x]);;
            } else { div = parseFloat(values[x]);; }
        }
        return div;
    } else if (text.includes('%')) {
        let values = text.split('%');
        for (x in values) {
            if (isNaN(values[x])) {
                values[x] = split(values[x]);
            }
        }
        let per = values[0];
        return per = per/100;
    }
}
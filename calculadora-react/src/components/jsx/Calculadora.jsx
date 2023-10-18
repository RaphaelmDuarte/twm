import '../css/Calculadora.css'
import React from "react";

document.addEventListener('keydown', (event) => {
    if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+'].includes(event.key)) {
        pressKey(event.key);
    } else if (event.key === 'Backspace') {
        cleanPanel();
    } else if (event.key === '*') {
        pressKey('x');
    } else if (event.key === 'Enter') {
        pressEquals();
    } else if (event.key === 'Delete') {
        dellKey();
    }
})

function cleanPanel(params) {
    let labelPanel = document.getElementById("calc-panel-label");
    labelPanel.innerHTML = ""
}

function pressKey(params) {
    let labelPanel = document.getElementById("calc-panel-label");
    labelPanel.innerHTML = labelPanel.innerHTML.concat(params);
}

function dellKey(params) {
    let labelPanel = document.getElementById("calc-panel-label");
    let text = labelPanel.innerHTML;
    text = text.substring(0, text.length - 1);
    labelPanel.innerHTML = text;
}

function pressEquals(params) {
    let labelPanel = document.getElementById("calc-panel-label");
    let text = labelPanel.innerHTML;
    if (isNaN(text)) {
        let values = split(text);
        labelPanel.innerHTML = values;
    } else labelPanel.innerHTML = text;
}

function split(text) {
    if (text.includes('+')) {
        let values = text.split('+');
        for (let x in values) {
            if (isNaN(values[x])) {
                values[x] = split(values[x]);
            }
        }
        let sum = 0;
        for (let x in values) {
            if (sum !== 0) {
                sum = sum + parseFloat(values[x]);
            } else { sum = parseFloat(values[x]); }
        }
        return sum;
    } else if (text.includes('-')) {
        let values = text.split('-');
        for (let x in values) {
            if (isNaN(values[x])) {
                values[x] = split(values[x]);
            }
        }
        let sub = 0;
        for (let x in values) {
            if (sub !== 0) {
                sub = sub - parseFloat(values[x]);
            } else { sub = parseFloat(values[x]); }
        }
        return sub;
    } else if (text.includes('x')) {
        let values = text.split('x');
        for (let x in values) {
            if (isNaN(values[x])) {
                values[x] = split(values[x]);
            }
        }
        let mul = 0;
        for (let x in values) {
            if (mul !== 0) {
                mul = mul * parseFloat(values[x]);;
            } else { mul = parseFloat(values[x]);; }
        }
        return mul;
    } else if (text.includes('/')) {
        let values = text.split('/');
        for (let x in values) {
            if (isNaN(values[x])) {
                values[x] = split(values[x]);
            }
        }
        let div = 0;
        for (let x in values) {
            if (div !== 0) {
                div = div / parseFloat(values[x]);;
            } else { div = parseFloat(values[x]);; }
        }
        return div;
    } else if (text.includes('%')) {
        let values = text.split('%');
        for (let x in values) {
            if (isNaN(values[x])) {
                values[x] = split(values[x]);
            }
        }
        let per = values[0];
        return per = per / 100;
    }
}

const Calculadora = (props) => {
    return (
        <div className='page'>
            <div id="calc">
                <div id="calc-full">
                    <div id="calc-panel">
                        <label id="calc-panel-label"></label>
                    </div>
                    <div id="calc-keys">
                        <div className="keys" id="c-button" onClick={e => cleanPanel()}>C</div>
                        <div className="keys" id="+-button" onClick={e => console.log("+/-")}>+/-</div>
                        <div className="keys" id="%-button" onClick={e => pressKey('%')}>%</div>
                        <div className="keys" id="del-button" onClick={e => dellKey()}>DEL</div>
                        <div className="keys" id="7-button" onClick={e => pressKey(7)}>7</div>
                        <div className="keys" id="8-button" onClick={e => pressKey(8)}>8</div>
                        <div className="keys" id="9-button" onClick={e => pressKey(9)}>9</div>
                        <div className="keys" id="div-button" onClick={e => pressKey('/')}>/</div>
                        <div className="keys" id="4-button" onClick={e => pressKey(4)}>4</div>
                        <div className="keys" id="5-button" onClick={e => pressKey(5)}>5</div>
                        <div className="keys" id="6-button" onClick={e => pressKey(6)}>6</div>
                        <div className="keys" id="mult-button" onClick={e => pressKey('x')}>x</div>
                        <div className="keys" id="1-button" onClick={e => pressKey(1)}>1</div>
                        <div className="keys" id="2-button" onClick={e => pressKey(2)}>2</div>
                        <div className="keys" id="3-button" onClick={e => pressKey(3)}>3</div>
                        <div className="keys" id="min-button" onClick={e => pressKey('-')}>-</div>
                        <div className="keys" id="0-button" onClick={e => pressKey(0)}>0</div>
                        <div className="keys" id="cm-button" onClick={e => pressKey('.')}>.</div>
                        <div className="keys" id="eq-button" onClick={e => pressEquals()}>=</div>
                        <div className="keys" id="pls-button" onClick={e => pressKey('+')}>+</div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Calculadora;
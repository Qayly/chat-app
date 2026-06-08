import React, { useState } from 'react';

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [firstOperand, setFirstOperand] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForSecond, setWaitingForSecond] = useState(false);

    const inputDigit = (digit) => {
        if (waitingForSecond) {
            setDisplay(String(digit));
            setWaitingForSecond(false);
        } else {
            setDisplay(display === '0' ? String(digit) : display + digit);
        }
    };

    const inputDecimal = () => {
        if (waitingForSecond) {
            setDisplay('0.');
            setWaitingForSecond(false);
            return;
        }
        if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const handleOperator = (nextOperator) => {
        const current = parseFloat(display);

        if (firstOperand !== null && !waitingForSecond) {
            const result = calculate(firstOperand, current, operator);
            setDisplay(String(result));
            setFirstOperand(result);
        } else {
            setFirstOperand(current);
        }

        setWaitingForSecond(true);
        setOperator(nextOperator);
    };

    const calculate = (a, b, op) => {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '×': return a * b;
            case '÷': return b !== 0 ? a / b : 'Error';
            default: return b;
        }
    };

    const handleEquals = () => {
        if (operator === null || waitingForSecond) return;

        const current = parseFloat(display);
        const result = calculate(firstOperand, current, operator);
        setDisplay(String(result));
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecond(false);
    };

    const handleClear = () => {
        setDisplay('0');
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecond(false);
    };

    const handleToggleSign = () => {
        setDisplay(String(parseFloat(display) * -1));
    };

    const handlePercent = () => {
        setDisplay(String(parseFloat(display) / 100));
    };

    const Button = ({ label, onClick, className }) => (
        <button className={`calc-btn ${className || ''}`} onClick={onClick}>
            {label}
        </button>
    );

    return (
        <div className="calculator">
            <div className="calc-display">
                <span className="calc-operator-indicator">{operator || ''}</span>
                <span className="calc-value">{display}</span>
            </div>
            <div className="calc-buttons">
                <Button label="AC" onClick={handleClear} className="calc-btn-function" />
                <Button label="+/-" onClick={handleToggleSign} className="calc-btn-function" />
                <Button label="%" onClick={handlePercent} className="calc-btn-function" />
                <Button label="÷" onClick={() => handleOperator('÷')} className={`calc-btn-operator${operator === '÷' ? ' active' : ''}`} />

                <Button label="7" onClick={() => inputDigit('7')} />
                <Button label="8" onClick={() => inputDigit('8')} />
                <Button label="9" onClick={() => inputDigit('9')} />
                <Button label="×" onClick={() => handleOperator('×')} className={`calc-btn-operator${operator === '×' ? ' active' : ''}`} />

                <Button label="4" onClick={() => inputDigit('4')} />
                <Button label="5" onClick={() => inputDigit('5')} />
                <Button label="6" onClick={() => inputDigit('6')} />
                <Button label="-" onClick={() => handleOperator('-')} className={`calc-btn-operator${operator === '-' ? ' active' : ''}`} />

                <Button label="1" onClick={() => inputDigit('1')} />
                <Button label="2" onClick={() => inputDigit('2')} />
                <Button label="3" onClick={() => inputDigit('3')} />
                <Button label="+" onClick={() => handleOperator('+')} className={`calc-btn-operator${operator === '+' ? ' active' : ''}`} />

                <Button label="0" onClick={() => inputDigit('0')} className="calc-btn-zero" />
                <Button label="." onClick={inputDecimal} />
                <Button label="=" onClick={handleEquals} className="calc-btn-operator" />
            </div>
        </div>
    );
};

export default Calculator;

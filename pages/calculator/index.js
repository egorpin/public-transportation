
export class CalculatorPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div class="container">
            <h1>Калькулятор поездок</h1>
            <div class="calc-section">
                <div class="calc-wrapper">
                    <div id="result" class="result">0</div>

                    <div class="calc-row">
                        <button id="btn_op_clear" class="my-btn secondary">C</button>
                        <button id="btn_op_sign" class="my-btn secondary">+/-</button>
                        <button id ="btn_op_percent" class = "my-btn secondary">%</button>
                        <button id="btn_op_div" class="my-btn primary">÷</button>
                    </div>

                    <div class="calc-row">
                        <button id="btn_digit_7" class="my-btn">7</button>
                        <button id="btn_digit_8" class="my-btn">8</button>
                        <button id="btn_digit_9" class="my-btn">9</button>
                        <button id="btn_op_mult" class="my-btn primary">×</button>
                    </div>

                    <div class="calc-row">
                        <button id="btn_digit_4" class="my-btn">4</button>
                        <button id="btn_digit_5" class="my-btn">5</button>
                        <button id="btn_digit_6" class="my-btn">6</button>
                        <button id="btn_op_minus" class="my-btn primary">−</button>
                    </div>

                    <div class="calc-row">
                        <button id="btn_digit_1" class="my-btn">1</button>
                        <button id="btn_digit_2" class="my-btn">2</button>
                        <button id="btn_digit_3" class="my-btn">3</button>
                        <button id="btn_op_plus" class="my-btn primary">+</button>
                    </div>

                    <div class="calc-row">
                        <button id="btn_digit_0" class="my-btn">0</button>
                        <button id="btn_digit_dot" class="my-btn secondary">.</button>
                        <button id ="btn_op_square" class = "my-btn primary">x^2</button>
                        <button id="btn_op_equal" class="my-btn execute">=</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    render() {

        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
    }
}

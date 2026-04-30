export class CalculatorPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    canFormRoute(available, required) {
        const vehicleCounts = {};
        for (const vehicle of available) {
            if (!vehicleCounts[vehicle]){
                vehicleCounts[vehicle] = 0;
            }
            vehicleCounts[vehicle]++;
        }
        for (const route of required) {
            if (!vehicleCounts[route] || vehicleCounts[route] === 0) {
                return false;
            }
            vehicleCounts[route]--;
        }
        return true;
    }

    rleEncode(serialCode) {
        if (serialCode.length === 0) return "";
        let result = "";
        let count = 1;
        for (let i = 1; i <= serialCode.length; i++) {
            if (i < serialCode.length && serialCode[i] === serialCode[i - 1]) {
                count++;
            } else {
                result += serialCode[i - 1] + count;
                count = 1;
            }
        }
        return result;
    }

    planRoute(tripPlan) {
        const startTime = Date.now();
        const targetTime = startTime + 3000;
        let checkDone = false;

        do {
            const currentTime = Date.now();
            checkDone = currentTime >= targetTime;
        }
        while (!checkDone);

        tripPlan.status = "confirmed";
    }

    handleRoutePlanning() {
        const output = document.getElementById('route-output');
        if (!output) return;

        const fleet = ["BUS-101", "BUS-101", "BUS-102", "TROLLEY-1", "TRAM-5",
                       "TRAM-5", "TRAM-5", "ELECBUS-7", "ELECBUS-7", "ELECBUS-8"];
        const required = ["TRAM-5", "TRAM-5", "BUS-101", "ELECBUS-7"];

        const tripPlan = {
            route_id: "M25",
            stations: ["Сокольники", "Красносельская", "Комсомольская"],
            status: "pending"
        };

        const canOperate = this.canFormRoute(fleet, required);

        const vehicleSerial = "RRRBBBRRRRR";
        const compressed = this.rleEncode(vehicleSerial);

        this.planRoute(tripPlan);

        output.innerHTML = `
                <div class="route-result">
                    <h3 style="margin-bottom:16px;">Результаты планирования</h3>
                    <div class="route-info">
                        <p><strong>Маршрут:</strong> ${tripPlan.route_id}</p>
                        <p><strong>Станции:</strong> ${tripPlan.stations.join(" → ")}</p>
                        <p><strong>Статус:</strong> <span class="status-badge">${tripPlan.status}</span></p>
                    </div>

                    <hr style="margin:16px 0; border:none; border-top:1px solid #E6E6E6;">

                    <h4>Задание 2.9</h4>
                    <p><strong>Доступные ТС:</strong> [${fleet.join(", ")}]</p>
                    <p><strong>Требуются:</strong> [${required.join(", ")}]</p>
                    <p><strong>Достаточно техники:</strong> ${canOperate
                        ? '<span style="color:#22c55e;font-weight:700;">✓ Да</span>'
                        : '<span style="color:#ef4444;font-weight:700;">✗ Нет</span>'}</p>

                    <hr style="margin:16px 0; border:none; border-top:1px solid #E6E6E6;">

                    <h4>Задание 3.6</h4>
                    <p><strong>Серийный код:</strong> "${vehicleSerial}"</p>
                    <p><strong>После RLE:</strong> "${compressed}"</p>
                </div>
            `;
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

            <div class="route-planner-section" style="margin-top: 48px;">
                <div class="content-card">
                    <h2 style="margin-bottom: 8px;">Планирование маршрута</h2>
                    <button id="plan-route-btn" class="hero-btn" style="padding: 12px 32px; font-size: 15px;">
                        Запустить проверку маршрута
                    </button>
                    <div id="route-output" style="margin-top: 20px;"></div>
                </div>
            </div>
        </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const script = document.createElement('script');
        script.src = 'script.js';
        script.onload = () => {
            document.getElementById('plan-route-btn')
                .addEventListener('click', () => this.handleRoutePlanning());
        };
        document.body.appendChild(script);
    }
}

const readline = require('readline');

class Array  {
    canFormRoute(available, required) {
        const vehicleCounts = {};
        for (const vehicle of available) {
            if (!vehicleCounts[vehicle]) {
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

    main(oldArr, newArr) {
        const canOperate = this.canFormRoute(oldArr, newArr);
        console.log(canOperate);

        //const vehicleSerial = "RRRBBBRRRRR";
        //const compressed = this.rleEncode(vehicleSerial);
        //console.log(compressed);
    }
}

my_arr = new Array();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function readArrays() {
    rl.question('Изначальный массив: ', (firstInput) => {
        const mainArr = firstInput.trim().split(' ').map(Number);

        rl.question('Новый массив: ', (secondInput) => {
            const newArr = secondInput.trim().split(' ').map(Number);

            rl.close();
            my_arr.main(mainArr, newArr);
        });
    });
}

readArrays();

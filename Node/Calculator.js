
class Calculator {

    constructor() {
        this.result = 0;
    }
    add(num) {
        this.result += num;
        return this;
    }
    subtract(num) {
        this.result -= num;
        return this;
    }
    multiply(num) {
        this.result *= num;
        return this;
    }
    divide(num) {
        if (num === 0) {
            throw new console.error("Not divisible by zero");

        }
        this.result /= num;
        return this;
    }
    getResult() {
        return this.result;
    }

}

const calc = new Calculator();
const result = calc.add(5).subtract(2).multiply(3).divide(2).getResult()
console.log(result);


function fetchData() {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            const sucess = Math.random() > 0.2;

            if (sucess) {
                resolve("Data fetched sucessfully");
            } else {
                reject("Error something went wrong");
            }
        }, 2000);
    })
}

fetchData()
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.log(error);
    })
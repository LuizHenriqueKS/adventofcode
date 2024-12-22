import { readLines } from "../../util/inputUtils";

const OPERATORS = ["+", "*", "||"];

function main() {
    //testOperators();
    test("input_test2.txt");
    test("input_test.txt");
    test("input_puzzle.txt");
}

function testOperators() {
    console.log("Operators:");
    const operators = initOperators(3);
    while (operators.length > 0) {
        console.log(operators);
        nextOperators(operators);
    }
}

function test(filename: string) {
    const rows = readRows(filename);
    let result = 0;
    for (const row of rows) {
        const operators = getOperators(row);
        if (operators.length > 0) {
            result += row.result;
        }
    }
    console.log(filename, "-> result:", result);
}

function getOperators(row: Row): string[] {
    const operators: string[] = initOperators(row.numbers.length - 1);
    while (operators.length > 0) {
        const result = calculate(row.numbers, operators);
        if (result === row.result) {
            return operators;
        }
        nextOperators(operators);
    }
    return operators;
}

function nextOperators(operators: string[]): void {
    for (let i = 0; i < operators.length; i++) {
        const operator = operators[i];
        const nextOperator = getNextOperator(operator);
        if (nextOperator === undefined) {
            if (i === operators.length - 1) {
                operators.length = 0;
                return;
            }
            operators[i] = OPERATORS[0];
            continue;
        }
        operators[i] = nextOperator;
        break;
    }
}

function getNextOperator(operator: string): string | undefined {
    const index = OPERATORS.indexOf(operator);
    if (index === OPERATORS.length - 1) {
        return undefined;
    }
    return OPERATORS[index + 1];
}

function initOperators(length: number): string[] {
    const operators: string[] = [];
    for (let i = 0; i < length; i++) {
        operators.push(OPERATORS[0]);
    }
    return operators;
}

function calculate(numbers: number[], operators: string[]): number {
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        const number = numbers[i];
        const operator = operators[i - 1];
        if (operator === "+") {
            result += number;
        } else if (operator === "*") {
            result *= number;
        } else if (operator === "||") {
            result = + (result.toString() + number.toString());
        } else {
            throw new Error("Unknown operator: " + operator);
        }
    }
    return result;
}

function readRows(filename: string): Row[] {
    const lines = readLines(filename, __dirname);
    const rows: Row[] = [];
    for (const line of lines) {
        const resultAndNumbers = line.split(":");
        const result = parseInt(resultAndNumbers[0]);
        const numbers = resultAndNumbers[1].split(" ").filter(val => val.trim() !== "").map(n => parseInt(n));
        rows.push({result, numbers});
    }
    return rows;
}

interface Row {
    result: number;
    numbers: number[];
}

main();
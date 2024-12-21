import { readLines } from "../../util/inputUtils";
import Rule from "./domain/Rule";

function main() {
    test("input_test2.txt");
    test("input_test.txt");
    test("input_puzzle.txt");
}

function test(filename: string) {
    const lines = readLines(filename, __dirname);
    const {updates, rules} = getUpdatesAndRules(lines);
    let result = 0;
    for (const update of updates) {
        if (!isRightOrder(update, rules)) {
            const orderedUpdate = orderBy(update, rules);
            result += getMiddleValue(orderedUpdate);
        }
    }
    console.log(filename, "->", result);
}

function orderBy(update: number[], rules: Rule[]): number[] {
    let ordered = [...update];
    ordered.sort((a, b) => {
        const rule = findRule(rules, a, b);
        if (!rule) {
            return 0;
        } if (rule.x == a) {
            return -1;
        } else if (rule.y == a) {
            return 1;
        }
        return 0;
    });
    return ordered;
}

function findRule(rules: Rule[], a: number, b: number): Rule | null {
    for (const rule of rules) {
        if (rule.x == a && rule.y == b) {
            return rule;
        } else if (rule.x == b && rule.y == a) {
            return rule;
        }
    }
    return null;
}

function isRightOrder(update: number[], rules: Rule[]): boolean {
    for (const rule of rules) {
        if (isRuleApplicable(update, rule) && !isRuleApplied(update, rule)) {
            return false;
        }
    }
    return true;
}

function isRuleApplied(update: number[], rule: Rule) {
    let xIndex = -1, yIndex = -1;
    while ((xIndex = update.indexOf(rule.x, xIndex + 1)) != -1) {
        if (xIndex == -1) {
            break;
        }
        yIndex = update.indexOf(rule.y, xIndex + 1);
        if (xIndex >= yIndex) {
            return false;
        }    
    }
    return true;    
}

function isRuleApplicable(update: number[], rule: Rule) {
    return update.indexOf(rule.x) != -1 && update.indexOf(rule.y) != -1;
}

function getMiddleValue(update: number[]) : number {
    const index = Math.floor(update.length / 2);
    return update[index];
}

function getUpdatesAndRules(lines: string[]): any {
    const updates : number[][] = [];
    const rules : Rule[] = [];
    let isUpdate = false;
    for (const line of lines) {
        if (line === "") {
            isUpdate = true;
        } else if (isUpdate) {
            updates.push(line.split(",").map(Number));
        } else {
            const xy = line.split("|").map(Number);
            rules.push({x: xy[0], y: xy[1]});
        }
    }
    return {updates, rules};
}

main();

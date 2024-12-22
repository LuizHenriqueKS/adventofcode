void onStart() {
    test("input_puzzle.txt");
}

void test(String filename) {
    def blinks = 75;
    def numbers = readNumbers(filename);
    def stones = numbersToStones(numbers);
    for (def i = 0; i < blinks; i++) {
        blink(stones);
        println("Blink ${i + 1}: ${countStones(stones)}");
    }
    def countStones = countStones(stones);
    println("${filename}: Number of stones: ${countStones}");
}

void blink(Stone firstStone) {
    Stone currentStone = firstStone;
    while (currentStone != null) {
        /*
            If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
        */
        if (currentStone.value == 0) {
            currentStone.value = 1;
        }
        /*
            If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
        */
        else if (currentStone.value.toString().size() % 2 == 0) {
            def value = currentStone.value.toString();
            def half = value.size() / 2;
            def left = value[0..half - 1].toLong();
            def right = value[half..value.size() - 1].toLong();
            def leftStone = currentStone;
            leftStone.value = left;
            def rightStone = new Stone();
            rightStone.value = right;
            rightStone.next = currentStone.next;
            leftStone.next = rightStone;
            currentStone = rightStone;
        }
        /*
            If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone. 
        */
        else {
            currentStone.value = currentStone.value * 2024;
        }
        currentStone = currentStone.next;
    }
}

long countStones(Stone firstStone) {
    def currentStone = firstStone;
    def count = 0L;
    while (currentStone != null) {
        count++;
        currentStone = currentStone.next;
    }
    return count;
}

Stone numbersToStones(long[] numbers) {
    Stone firstStone = null;
    Stone currentStone = null;
    for (int i = 0; i < numbers.size(); i++) {
        def stone = new Stone();
        stone.value = numbers[i];
        if (firstStone == null) {
            firstStone = stone;
        } 
        if (currentStone != null) {
            currentStone.next = stone;
        }
        currentStone = stone;
    }
    return firstStone;
}

long[] readNumbers(String filename) {
    def numbers = [];
    def file = getFile(filename);
    file.eachLine { line ->
        numbers = line.split(" ").collect { it.toLong() };
    }
    return numbers;
}

File getFile(String filename) {
    def dir = "day11/part02/";
    def file = new File(filename);
    if (!file.exists()) {
        file = new File(dir, filename);
    }
    return file;
}

class Stone {
    long value;
    Stone next;
}

onStart();
class Counter {

    private count: number = 0;

    inc(step: number = 1) {
        this.count += step;
    }

    value() {
        return this.count;
    }

}

export default Counter;
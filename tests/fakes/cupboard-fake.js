"use strict";

class CupboardFake {
    constructor() {
        this._isEmpty = false;
    }

    isOpen() {
        return true;
    };

    hasDrink(drinkName, volume) {
        return !this._isEmpty;
    };

    getDrink(drinkName, volume) {
        return volume;
    }

    set empty(value) {
        this._isEmpty = value;
    }
}

module.exports = CupboardFake;
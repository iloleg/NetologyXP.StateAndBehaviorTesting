'use strict';

class Barmen {
    constructor(cupboard, smsService) {
        this._cupboard = cupboard;
        this._smsService = smsService;
        this._wasSmsSent = false;
    }

    get wasSmsSent() {
        return this._wasSmsSent;
    }

    pour(drinkName, volume, visitor) {
        if (!this._cupboard.hasDrink(drinkName, volume)) {
            this._smsService.send("Hello. We have run out of " + drinkName + ". Please buy several bottles.");
            this._wasSmsSent = this._smsService.wasCalled();
        }

        return this._cupboard.getDrink(drinkName, volume);
    }
}

module.exports = Barmen;
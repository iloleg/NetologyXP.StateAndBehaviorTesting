"use strict";

class SmsServiceFake {
    constructor() {
        this._lastSentSms = '';
    }

    send(message) {
        this._lastSentSms = message;
    }

    get lastSentSms() {
        return this._lastSentSms;
    }
}

module.exports = SmsServiceFake;
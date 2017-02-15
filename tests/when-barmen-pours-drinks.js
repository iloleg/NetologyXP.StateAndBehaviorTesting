"use strict";

var assert = require('chai').assert;
var Barmen = require('../src/barmen');
var sinon = require('sinon');

var SmsService = require('../src/sms-service');
var Visitor = require('../src/visitor');
var CupboardFake = require('../tests/fakes/cupboard-fake');
var SmsServiceFake = require('../tests/fakes/sms-service-fake');

suite('When barmen pours drinks', function () {
    suite('cupboard is empty', function () {
        let visitor = {};
        let barmen = {};
        let emptyCupboard = {};

        setup(function () {
            visitor = new Visitor();
            visitor.sober();

            emptyCupboard = new CupboardFake();
            emptyCupboard.empty = true;
        });

        test('sms to buy drink is sent to boss', function () {
            let smsService = new SmsServiceFake();
            barmen = new Barmen(emptyCupboard, smsService);

            barmen.pour("vodka", 100, visitor);

            assert.equal(smsService.lastSentSms, "Hello. We have run out of vodka. Please buy several bottles.");
        });





        test('sms service is called if no drink is available', function () {
            let smsService = new SmsService();
            let smsServiceMock = sinon.mock(smsService);
            barmen = new Barmen(emptyCupboard, smsService);
            smsServiceMock.expects("send")
                .once()
                .withArgs("Hello. We have run out of vodka. Please buy several bottles.");

            barmen.pour("vodka", 100, visitor);

            smsServiceMock.verify();
            smsServiceMock.restore();
        });






        test('barmen sends sms to buy drink to boss', function () {
            let smsService = new SmsServiceFake();
            barmen = new Barmen(emptyCupboard, smsService);

            barmen.pour("vodka", 100, visitor);

            assert.equal(true, barmen.wasSmsSent);
        });

        test('barmen sends sms to buy Wine', function () {
            let smsService = new SmsService();
            let smsServiceMock = sinon.mock(smsService);
            barmen = new Barmen(emptyCupboard, smsService);
            smsServiceMock.expects("send")
                .once()
                .withArgs("Wine ran out must be ordered.");

            barmen.pour("Wine", 100, visitor);

            smsServiceMock.verify();
            smsServiceMock.restore();
        })


    });

});

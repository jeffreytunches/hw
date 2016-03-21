(function(){
    'use strict';

    angular
        .module('app')
        .service('fdUnitService', fdUnitService);

    function fdUnitService() {
        var units = {};

        units.getImperialVal = getImperialVal;
        units.getMetricVal = getMetricVal;
        units.getImperialMaleShoe = getImperialMaleShoe;
        units.getImperialFemaleShoe = getImperialFemaleShoe;
        units.getMetricMaleShoe = getMetricMaleShoe;
        units.getMetricFemaleShoe = getMetricFemaleShoe;
        units.getMetricChest = getMetricChest;
        units.getImperialDress = getImperialDress;
        units.getMetricDress = getMetricDress;

        function getImperialVal(metricVal) {
            var conversionRate = 0.393701;
            return Math.round(metricVal * conversionRate);
        }

        function getMetricVal(imperialVal) {
            var conversionRate = 2.54;
            return Math.round(imperialVal * conversionRate);
        }

        function getMetricChest(imperialVal) {
            var conversionRate = 2.54,
                converted = imperialVal * conversionRate;
            return (2 * Math.round(converted / 2));
        }

        function getImperialDress(metricVal) {
            var sizeMap = {
                '28' : '000',
                '30' : '00',
                '32' : '0',
                '34' : '2',
                '36' : '4',
                '38' : '6',
                '40' : '8',
                '42' : '10',
                '44' : '12',
                '46' : '14',
                '48' : '16',
                '50' : '18',
                '52' : '20'
            };
            return sizeMap[''+metricVal];
        }

        function getMetricDress(imperialVal) {
            var sizeMap = {
                '000' : 28,
                '00' : 30,
                '0' : 32,
                '2' : 34,
                '4' : 36,
                '6' : 38,
                '8' : 40,
                '10' : 42,
                '12' : 44,
                '14' : 46,
                '16' : 48,
                '18' : 50,
                '20' : 52
            };
            return sizeMap[''+imperialVal];
        }

        function getImperialMaleShoe(metricVal) {
            var sizeMap = {
                '23' : 6,
                '23.5' : 6.5,
                '24' : 6.5,
                '24.5' : 7,
                '25' : 7.5,
                '25.5' : 8,
                '26' : 9,
                '26.5' : 9.5,
                '27' : 10,
                '27.5' : 10.5,
                '28' : 11,
                '28.5' : 11.5,
                '29' : 12.5,
                '29.5' : 13,
                '30' : 14,
                '30.5' : 14.5,
                '31' : 15,
                '31.5' : 15.5,
                '32' : 16
            };
            return sizeMap[''+metricVal];
        }

        function getImperialFemaleShoe(metricVal) {
            var sizeMap = {
                '21' : 4,
                '21.5' : 4.5,
                '22' : 5.5,
                '22.5' : 6,
                '23' : 6.5,
                '23.5' : 7,
                '24' : 8,
                '24.5' : 8.5,
                '25' : 9,
                '25.5' : 9.5,
                '26' : 10,
                '26.5' : 11,
                '27' : 11.5,
                '27.5' : 12
            };
            return sizeMap[''+metricVal];
        }

        function getMetricMaleShoe(imperialVal) {
            var sizeMap = {
                '6' : 23.5,
                '6.5' : 24,
                '7' : 24.5,
                '7.5' : 25,
                '8' : 25.5,
                '8.5' : 25.5,
                '9' : 26,
                '9.5' : 26.5,
                '10' : 27,
                '10.5' : 27.5,
                '11' : 28,
                '11.5' : 28.5,
                '12' : 28.5,
                '12.5' : 29,
                '13' : 29.5,
                '13.5' : 30,
                '14' : 30,
                '14.5' : 30.5,
                '15' : 31,
                '15.5' : 31.5,
                '16' : 32
            };
            return sizeMap[''+imperialVal];
        }

        function getMetricFemaleShoe(imperialVal) {
            var sizeMap = {
                '4' : 21,
                '4.5' : 21.5,
                '5' : 21.5,
                '5.5' : 22,
                '6' : 22.5,
                '6.5' : 23,
                '7' : 23.5,
                '7.5' : 24,
                '8' : 24,
                '8.5' : 24.5,
                '9' : 25,
                '9.5' : 25.5,
                '10' : 26,
                '10.5' : 26,
                '11' : 26.5,
                '11.5' : 27,
                '12' : 27.5
            };
            return sizeMap[''+imperialVal];
        }

        return units;
    }

})();

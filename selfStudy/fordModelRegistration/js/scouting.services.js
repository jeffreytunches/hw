(function(){
    'use strict';

    angular
        .module('app')
        .factory('fdUsernameService', fdUsernameService)
        .service('fdUserOptions', fdUserOptions)
        .service('fdUserData', fdUserData)
        .service('fdScoutingFlow', fdScoutingFlow);

    /* @ngInject */
    function fdUsernameService($http) {
        var getAvailability = function(username) {
            return $http.post('/api/users/availability', { "username" : username});
        };

        return {
            getAvailability: getAvailability
        };
    }

    function fdScoutingFlow() {
        var flow = {};

        flow.step = '';
        flow.setStep = setStep;
        flow.getStep = getStep;

        function setStep(step) {
            flow.step = step;
        }
        function getStep() {
            return flow.step;
        }

        return flow;
    }

    function fdUserOptions() {
        var options = {};

        options.ageMin = 13;
        options.ageMax = 100;

        options.getGenders = getGenders;
        options.getMonths = getMonths;
        options.getDays = getDays;
        options.getYears = getYears;
        options.getCountries = getCountries;
        options.getOptionsWithDefault = getOptionsWithDefault;
        options.getUsHeights = getUsHeights;
        options.getRangedValues = getRangedValues;
        options.getFractionalInches = getFractionalInches;
        options.getMaleShoeSizes = getMaleShoeSizes;
        options.getFemaleShoeSizes = getFemaleShoeSizes;
        options.getDressSizes = getDressSizes;
        options.getCupSizes = getCupSizes;
        options.getChestSizes = getChestSizes;


        function getGenders() {
            var genders = [
                { value: null, name: 'Select one...' },
                { value: 'male', name: 'Male' },
                { value: 'female', name: 'Female' }
            ];
            genders.fdDefault = genders[0].value;
            return genders;
        }

        function getMonths() {
            var i, months = [
                { value: null, name: 'Month' },
                { value: 0, name: 'January' },
                { value: 1, name: 'February' },
                { value: 2, name: 'March' },
                { value: 3, name: 'April' },
                { value: 4, name: 'May' },
                { value: 5, name: 'June' },
                { value: 6, name: 'July' },
                { value: 7, name: 'August' },
                { value: 8, name: 'September' },
                { value: 9, name: 'October' },
                { value: 10, name: 'November' },
                { value: 11, name: 'December' }
            ];
            for (i = months.length -1; i >= 0; i--) { // do with map?
                months[i].name = months[i].name;
            }
            months.fdDefault = months[0].value;
            return months;
        }

        function getDays() {
            var i, days = [];
            for (i = 31; i > 0; i--) {
                days.unshift({
                    value: i,
                    name: i
                });
            }
            days.unshift({ value: null, name: 'Day' });
            days.fdDefault = days[0].value;
            return days;
        }

        function getYears() {
            var i,
                years = [],
                end = new Date().getFullYear() - options.ageMin,
                start = end - options.ageMax;

            for (i = end; i >= start; i--) {
                years.push({
                    value: i,
                    name: i
                });
            }
            years.unshift({ value: null, name: 'Year' });
            years.fdDefault = years[0].value;
            return years;
        }


        function getCountries(countries) {
            var i, countriesOptions = [];

            for (i = countries.length - 1; i >= 0; i--) {
                countriesOptions.unshift({
                    value: formatCountryValue(countries[i]),
                    name: formatCountryName(countries[i])
                });
            }
            countriesOptions.unshift({ value: null, name: 'Select one...' });
            countriesOptions.fdDefault = countriesOptions[0].value;
            return countriesOptions;
        }

        function formatCountryValue(country) {
            country = country.replace(/ /g,"_");
            return country.toLowerCase();
        }
        function formatCountryName(country) {
            country = country.replace('&eacute;','Ã©');
            return country;
        }

        function getUsHeights() {
            var i,
                min = 36,
                max = 84,
                heights = [
                    { value: null, name: 'ft / in' }
                ];

            for(i = min; i <= max; i++) {
                heights.push( { value: i, name: getFeetAndInches(i) } );
            }
            heights.fdDefault = heights[0].value;
            return heights;
        }

        function getFeetAndInches(totalInches) {
            var feet = '' + Math.floor(totalInches / 12)+ '\'',
                inches = ' ' + (totalInches % 12) + '\"';
            return feet + inches;
        }

        function getFractionalInches() {
            var fractional = [
                { value: null, name: 'Fraction' },
                { value: 0.25, name: '1/4"' },
                { value: 0.5, name: '1/2"' },
                { value: 0.75, name: '3/4"' }
            ];
            fractional.fdDefault = fractional[0].value;
            return fractional;
        }

        function getMaleShoeSizes(isMetric) {
            var sizes = getRangedValues(6, 16, ' US', 'Select US Size', 0.5);
            if(isMetric) {
                sizes = getRangedValues(23, 32, ' cm', 'cm', 0.5);
            }
            return sizes;
        }

        function getFemaleShoeSizes(isMetric) {
            var sizes = getRangedValues(4, 12, ' US', 'Select US Size', 0.5);
            if(isMetric) {
                sizes = getRangedValues(20, 28, ' cm', 'cm', 0.5);
            }
            return sizes;
        }

        function getDressSizes(isMetric) {
            var sizes = [
                { value: null, name: 'Select US Size' },
                { value: '00', name: '00 US' },
                { value: '0', name: '0 US' },
                { value: '2', name: '2 US' },
                { value: '4', name: '4 US' },
                { value: '6', name: '6 US' },
                { value: '8', name: '8 US' },
                { value: '10', name: '10 US' },
                { value: '12', name: '12 US' },
                { value: '14', name: '14 US' },
                { value: '16', name: '16 US' },
                { value: '18', name: '18 US' },
                { value: '20', name: '20 US' }
            ];
            if(isMetric) {
                sizes = getRangedValues(28, 50, ' cm', 'cm', 2);
            }
            sizes.fdDefault = sizes[0].value;
            return sizes;
        }

        function getCupSizes() {
            var sizes = [
                { value: null, name: 'Cup' },
                { value: 'AA', name: 'AA' },
                { value: 'A', name: 'A' },
                { value: 'B', name: 'B' },
                { value: 'C', name: 'C' },
                { value: 'D', name: 'D' },
                { value: 'DD', name: 'DD' }
            ];
            sizes.fdDefault = sizes[0].value;
            return sizes;
        }

        function getChestSizes(isMetric) {
            var sizes = getRangedValues(28, 46, ' in', 'in');
            if(isMetric) {
                sizes = getRangedValues(70, 118, ' cm', 'cm', 2);
            }
            return sizes;
        }

        function getRangedValues(min, max, units, defaultName) { // optional 5th param: step
            var i, step = 1,
                values = [
                    { value: null, name: defaultName }
                ];

            if(arguments[4] && !isNaN(arguments[4])) {
                step = arguments[4];
            }
            for(i = min; i <= max; i+=step) {
                values.push( { value: i, name: ''+ i + units } );
            }
            //values = toUpperCaseNames(values);
            values.fdDefault = values[0].value;
            return values;
        }

        function getOptionsWithDefault(options) {
            var optionsSet = options,
                defaultName = arguments[1] || '';

            optionsSet = toTitleCaseNames(optionsSet);
            optionsSet.unshift({ value: null, name: defaultName });
            optionsSet.fdDefault = optionsSet[0].value;

            return optionsSet;
        }

        function toTitleCase(str) {
            return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        }

        function toTitleCaseNames(options) {
            var optionsSet = options;

            optionsSet = optionsSet.map(function(obj) {
                obj.name = toTitleCase(obj.name.toUpperCase());
                return obj;
            });

            return optionsSet;
        }

        return options;
    }

    function fdUserData() {
        var userData = this;

        userData.isUserComplete = isUserComplete;
        userData.getFinalData = getFinalData;
        userData.getAge = getAge;
        userData.isValidBirthday = isValidBirthday;
        userData.calculateAge = calculateAge;
        userData.getProp = getProp;
        userData.setProp = setProp;
        userData.setPhotosTypePortfolio = setPhotosTypePortfolio;

        userData.props = {};
        userData.isPhotosTypePortfolio = false;

        function getProp(name) {
            return userData.props[name];
        }

        function setProp(name, val) {
            userData.props[name] = val;
        }

        function setPhotosTypePortfolio(isPortfolio) {
            userData.isPhotosTypePortfolio = isPortfolio;
        }

        function isUserComplete(user) {
            if (!hasCoreData(user)) {
                //console.log("leaving early, don't have enough data to tell what fields are required");
                return false;
            }
            return isModelPopulated(getRequiredValues(user), user);
        }

        // opportunity to fail quickly if we don't have the fields that determine what other fields are required
        function hasCoreData(user) {
            //console.log("hasCoreData()");
            return !!(user.accept_rules) && !!(user.age) && !!(user.gender);
        }

        function isModelPopulated(requiredData, data) {
            //console.log("isModelPopulated()");

            for (var i = requiredData.length - 1; i >= 0; i--) {

                //console.log('data['+requiredData[i]+']',data[requiredData[i]]);
                if (data[requiredData[i]] === null || typeof data[requiredData[i]] === 'undefined') {

                    //console.log(requiredData[i]+" not populated",data);
                    return false;
                }
            }

            return isShoeSizeSet(data);
        }

        function isShoeSizeSet(data) {
            // shoe size is the one field where the units of measure are different between men and women
            if (data.gender === 'male') {
                return !!(data.shoe_size_male);
            }
            if (data.gender === 'female') {
                return !!(data.shoe_size_female);
            }
        }

        function getRequiredValues(user) {
            var values = [
                    'first_name','last_name','metro','country','phone','email','gender',
                    'birthday_month','birthday_day','birthday_year','bio','height',
                    'profile_photo','accept_rules'];

            if (user.age < 18) {
                values = values.concat(['guardian_full_name','guardian_phone','guardian_email']);
            }
            if (!userData.isPhotosTypePortfolio) {
                values = values.concat(['full_length','waist_up','shoulder_forward','shoulder_three_quarters']);
            }

            //console.log("getRequiredValues()", values);
            return values;
        }

        function getFinalData(user) {
            var data = {
                'profile_photo': user.profile_photo,
                'full_length': user.full_length,
                'waist_up': user.waist_up,
                'shoulder_forward': user.shoulder_forward,
                'shoulder_three_quarters': user.shoulder_three_quarters
            };

            data.registration = getRegistrationData(user);
            data.registration = getUserSetupData(data.registration, user);
            data = transformDataForApi(data);
            data.registration.birthday = getApiDate(user.birthday_month,user.birthday_day,user.birthday_year);

            //to support fractions of inches, need to remove height from getRegistrationValues and write a new method getHeightWithFraction(user);

            data.registration = new Blob([JSON.stringify(data.registration)], {
                type: 'application/octet-stream'
            });
            return data;
        }

        function getRegistrationData(user) {
            var i,
                value,
                data = {},
                values = getRegistrationValues(user);

            for (i = values.length - 1; i >= 0; i--) {
                value = values[i];
                if (user[value]) {
                    data[value] = user[value];
                }
            }
            //console.log("getRegistrationData()", data);
            return data;
        }

        function getRegistrationValues(user) {
            var values = [
                    'first_name','last_name','metro','country','phone','email','instagram_username','gender',
                    'bio','height','waist_size','eye_color','hair_color','ethnic_look','accept_rules',
                    'is_ford_community_member'];

            if (user.gender === 'male') {
                values = values.concat(['shoe_size_male']);
            }
            if (user.gender === 'female') {
                values = values.concat(['hip_size','dress_size','shoe_size_female']);
            }

            if (user.country === 'united_states') {
                values.push('zip_code');
            }

            if (user.age < 18) {
                values = values.concat(['guardian_full_name','guardian_phone','guardian_email']);
            }

            //console.log("getRegistrationValues()", values);
            return values;
        }

        function getUserSetupData(data, user) {
            if (user.username !== null && user.password !== null) {
                data.username = user.username;
                data.password = user.password;
            }
            return data;
        }

        function getApiDate(m,d,y) {
            m++;
            // leading zeros
            m = (m < 10) ? '0' + m : m;
            d = (d < 10) ? '0' + d : d;
            // format: "%Y-%m-%d"
            return y + '-' + m + '-' + d;
        }

        function transformDataForApi(data) {
            data.registration = renameProperty(data.registration, 'height', 'height_cm');
            data.registration = renameProperty(data.registration, 'shoe_size_female', 'shoe_size');
            data.registration = renameProperty(data.registration, 'shoe_size_male', 'shoe_size');
            data.registration.has_representation = false;
            data.registration.talent_type = 'model';

            if (data.registration.ethnic_look) {
                data.registration.ethnic_look = [data.registration.ethnic_look];
            }

            if (userData.isPhotosTypePortfolio) {
                data = renameProperty(data, 'full_length', 'portfolio_photo_1');
                data = renameProperty(data, 'waist_up', 'portfolio_photo_2');
                data = renameProperty(data, 'shoulder_forward', 'portfolio_photo_3');
                data = renameProperty(data, 'shoulder_three_quarters', 'portfolio_photo_4');
            }

            return data;
        }

        function renameProperty(object, oldName, newName) {
            if (object.hasOwnProperty(oldName)) {
                object[newName] = object[oldName];
                delete object[oldName];
            }
            return object;
        }

        function getAge(m,d,y) {
            if (isValidBirthday(m,d,y)) {
                return calculateAge(m,d,y);
            }
            else {
                return null;
            }
        }

        function isValidBirthday(m,d,y) {
            return (m !== null && d !== null && y !== null);
        }

        function calculateAge(birthMonth, birthDay, birthYear) {
            var todaysDate, todaysYear, todaysMonth, todaysDay, age;

            todaysDate = new Date();
            todaysYear = todaysDate.getFullYear();
            todaysMonth = todaysDate.getMonth();
            todaysDay = todaysDate.getDate();
            age = todaysYear - birthYear;

            if (todaysMonth < birthMonth) {
                age--;
            }
            if (birthMonth === todaysMonth && todaysDay < birthDay) {
                age--;
            }
            return age;
        }

        return userData;
    }
})();

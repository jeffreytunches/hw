(function(){
    'use strict';

    angular
        .module('app.scouting')
        .config(configure)
        .controller('GetScouted', GetScouted)
        .controller('AddPhoto', AddPhoto)
        .controller('EmailForm', EmailForm)
        .controller('UserPassForm', UserPassForm);

    /* @ngInject */
    function configure($interpolateProvider) {
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
    }

    /* @ngInject */
    function GetScouted($scope, $http, $timeout, Upload, fdScoutingFlow, fdUserOptions, fdUserData, fdUnitService, fdUsernameService) {
        var scouting = this;

        scouting.months = fdUserOptions.getMonths();
        scouting.days = fdUserOptions.getDays();
        scouting.years = fdUserOptions.getYears();
        scouting.countries = fdUserOptions.getCountries(Ford.countries);
        scouting.metros = fdUserOptions.getOptionsWithDefault(Ford.metros, 'Select one...');
        scouting.genders = fdUserOptions.getGenders();
        scouting.eyeColors = fdUserOptions.getOptionsWithDefault(Ford.eye_colors, 'Select Color...');
        scouting.hairColors = fdUserOptions.getOptionsWithDefault(Ford.hair_colors, 'Select Color...');
        scouting.ethnicLooks = fdUserOptions.getOptionsWithDefault(Ford.ethnic_looks, 'Select...');
        scouting.heights = fdUserOptions.getUsHeights();
        scouting.fractionalInches = fdUserOptions.getFractionalInches();
        scouting.heights_metric = fdUserOptions.getRangedValues(92, 214, 'cm', 'cm');
        scouting.waist_sizes = fdUserOptions.getRangedValues(21, 50, ' in', ' in');
        scouting.waist_sizes_metric = fdUserOptions.getRangedValues(53, 127, ' cm', ' cm');
        scouting.hip_sizes = fdUserOptions.getRangedValues(21, 50, ' in', ' in');
        scouting.hip_sizes_metric = fdUserOptions.getRangedValues(73, 127, ' cm', ' cm');
        scouting.dress_sizes = fdUserOptions.getDressSizes(false);
        scouting.dress_sizes_metric = fdUserOptions.getDressSizes(true);
        scouting.cup_sizes = fdUserOptions.getCupSizes();
        scouting.chest_sizes = fdUserOptions.getChestSizes(false);
        scouting.chest_sizes_metric = fdUserOptions.getChestSizes(true);
        scouting.shoe_sizes_male = fdUserOptions.getMaleShoeSizes(false);
        scouting.shoe_sizes_male_metric = fdUserOptions.getMaleShoeSizes(true);
        scouting.shoe_sizes_female = fdUserOptions.getFemaleShoeSizes(false);
        scouting.shoe_sizes_female_metric = fdUserOptions.getFemaleShoeSizes(true);
        scouting.serverError = false;
        scouting.isUsernameAvailable = true;
        scouting.uploadProgress = 0;

        scouting.isFormComplete = isFormComplete;
        scouting.checkUsername = checkUsername;
        scouting.submit = submit;
        scouting.updateUserAge = updateUserAge;
        scouting.isUsUnits = isUsUnits;
        scouting.safeApply = safeApply;
        scouting.fieldChanged = fieldChanged;
        scouting.isStep = isStep;
        scouting.setStep = setStep;
        scouting.nextForm = nextForm;
        scouting.isUserSetupComplete = isUserSetupComplete;
        scouting.setPhotosTypePortfolio = setPhotosTypePortfolio;
        scouting.isPhotosTypePortfolio = isPhotosTypePortfolio;

        scouting.user = {
            username : null,
            password : null,
            metro : scouting.metros.fdDefault,
            country : scouting.countries.fdDefault,
            birthday_month : scouting.months.fdDefault,
            birthday_day : scouting.days.fdDefault,
            birthday_year : scouting.days.fdDefault,
            gender : scouting.genders.fdDefault,
            unit_type : 'US', // haven't found a reason not be be lazy on this one
            height : scouting.heights.fdDefault,
            //height_fraction : scouting.fractionalInches.fdDefault,
            height_metric : scouting.heights_metric.fdDefault,
            waist_size : scouting.waist_sizes.fdDefault,
            waist_metric : scouting.waist_sizes_metric.fdDefault,
            hip_size : scouting.hip_sizes.fdDefault,
            hip_size_metric : scouting.hip_sizes_metric.fdDefault,
            dress_size : scouting.dress_sizes.fdDefault,
            dress_size_metric : scouting.dress_sizes_metric.fdDefault,
            chest_size : scouting.chest_sizes.fdDefault,
            chest_size_metric : scouting.chest_sizes_metric.fdDefault,
            cup_size : scouting.cup_sizes.fdDefault,
            eye_color : scouting.eyeColors.fdDefault,
            hair_color : scouting.hairColors.fdDefault,
            ethnic_look : scouting.ethnicLooks.fdDefault,
            shoe_size_male : scouting.shoe_sizes_male.fdDefault,
            shoe_size_male_metric : scouting.shoe_sizes_male_metric.fdDefault,
            shoe_size_female : scouting.shoe_sizes_female.fdDefault,
            shoe_size_female_metric : scouting.shoe_sizes_female_metric.fdDefault
        };

        function isStep(step) {
            return fdScoutingFlow.getStep() === step;
        }
        function setStep(step) {
            fdScoutingFlow.setStep(step);
        }

        function isPhotosTypePortfolio() {
            return fdUserData.isPhotosTypePortfolio;
        }
        function setPhotosTypePortfolio(isPortfolio) {
            fdUserData.setPhotosTypePortfolio(isPortfolio);
        }

        function isFormComplete() {
            return fdUserData.isUserComplete(scouting.user);
        }

        function isUserSetupComplete() {
            var u = scouting.user;
            return u.username !== null && u.password !== null && scouting.isUsernameAvailable;
        }

        function checkUsername(username) {
            fdUsernameService.getAvailability(username).then(function(response) {
                scouting.isUsernameAvailable = response.data.available;
            }).catch(function() {
                // if there's a problem fallback to true, catch any issues on the server side
                scouting.isUsernameAvailable = true;
            });
        }

        function nextForm() {
            if (isUserSetupComplete()) {
                if (fdUserData.getProp('email')) {
                    scouting.user.email = fdUserData.getProp('email');
                }
                setStep('scoutingForm');
            }
        }

        function submit() {
            // Bail if errors
            if (!fdUserData.isUserComplete(scouting.user)) {
                //console.log("FORM IS NOT COMPLETE!");
                scrollToError();
                return;
            }
            fdScoutingFlow.setStep('scoutingFormLoading');

            var data = fdUserData.getFinalData(scouting.user);

            Upload.upload({
                url: scouting.action,
                data: data,
                objectKey: '.k'
            }).progress(function (e) {
                var progress = parseInt(100.0 * e.loaded / e.total);
                scouting.uploadProgress = progress;
            }).success(function (data, status, headers, config) {
                console.log('success!',data);
                fdScoutingFlow.setStep('scoutingFormSuccess');
            }).error(function (data, status, headers, config) {
                fdScoutingFlow.setStep('scoutingForm');
                if (data.message) {
                    scouting.serverError = data.message;
                    console.log(data.message, scouting.user);
                }
            });
        }

        function fieldChanged(field, modelVal) {
            if(isShoe(field)) {
                syncShoe(field, modelVal);
            }
            else if(isChest(field)) {
                syncChest(field, modelVal);
            }
            else if(isDress(field)) {
                syncDress(field, modelVal);
            }
            else {
                syncNumerical(field, modelVal);
            }
        }

        function syncNumerical(field, modelVal) {
            var convertedVal;
            if(isMetric(field)) {
                convertedVal = fdUnitService.getImperialVal(modelVal);
            }
            else {
                convertedVal = fdUnitService.getMetricVal(modelVal);
            }
            scouting.user[getOtherField(field)] = convertedVal;
        }

        function syncShoe(field, modelVal) {
            var convertedVal;
            if(isMale()) {
                if(isMetric(field)) {
                    convertedVal = fdUnitService.getImperialMaleShoe(modelVal);
                }
                else {
                    convertedVal = fdUnitService.getMetricMaleShoe(modelVal);
                }
            }
            else {
                if(isMetric(field)) {
                    convertedVal = fdUnitService.getImperialFemaleShoe(modelVal);
                }
                else {
                    convertedVal = fdUnitService.getMetricFemaleShoe(modelVal);
                }
            }
            scouting.user[getOtherField(field)] = convertedVal;
        }

        function syncChest(field, modelVal) {
            var convertedVal;
            if(isMetric(field)) {
                convertedVal = fdUnitService.getImperialVal(modelVal);
            }
            else {
                convertedVal = fdUnitService.getMetricChest(modelVal);
            }
            scouting.user[getOtherField(field)] = convertedVal;
        }

        function syncDress(field, modelVal) {
            var convertedVal;
            if(isMetric(field)) {
                convertedVal = fdUnitService.getImperialDress(modelVal);
            }
            else {
                convertedVal = fdUnitService.getMetricDress(modelVal);
            }
            scouting.user[getOtherField(field)] = convertedVal;
        }

        function getOtherField(field) {
            var otherField,
                fieldNameEnd = field.indexOf('_metric');
            if(isMetric(field)) {
                otherField = field.substring(0,fieldNameEnd);
            }
            else {
                otherField = field + '_metric';
            }
            return otherField;
        }

        function isMetric(field) {
            return field.indexOf('_metric') !== -1;
        }

        function isShoe(field) {
            return field.indexOf('shoe') !== -1;
        }

        function isChest(field) {
            return field.indexOf('chest') !== -1;
        }

        function isDress(field) {
            return field.indexOf('dress') !== -1;
        }

        function isMale() {
            return scouting.user.gender === 'male';
        }

        function updateUserAge() {
            var u = scouting.user;
            u.age = fdUserData.getAge(u.birthday_month, u.birthday_day, u.birthday_year);
        }

        function isUsUnits() {
            return scouting.user.unit_type === 'US';
        }

        function scrollToError() {
            var parent, target = $('.ng-invalid:not(form)');

            target.each(function () {
                if ($(this).parents('.ng-hide').length === 0) {

                    parent = $(this).parent();
                    $('html, body').animate({
                        scrollTop: $(parent).offset().top
                    }, 1000);
                    return false;
                }
            });
        }

        function safeApply(fn) {
            var phase = $scope.$$phase;

            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                    fn();
                }
            }
            else {
                $scope.$apply(fn);
            }
        }
    }

    /* @ngInject */
    function AddPhoto($scope, $http, $timeout, Upload) {

        var addphoto = this;

        addphoto.getBlob = getBlob;
        addphoto.setBlob = setBlob;
        addphoto.init = init;
        addphoto.deletePhoto = deletePhoto;

        addphoto.started = false;

        addphoto.photo = null;
        addphoto.blob = null;
        addphoto.existingPhoto = null;
        addphoto.isTooBig = false;

        function init(photoSelector, type, containerSelector, padSelector) {
            addphoto.photo = $(photoSelector);
            addphoto.type = type;
            addphoto.containerSelector = containerSelector;
            addphoto.padSelector = padSelector;
            watchForDrop();
        }

        function watchForDrop() {
            $scope.$watch('addphoto.file', addphoto.getBlob);
        }

        function getBlob() {
            if(!addphoto.file) {
                return;
            }
            addphoto.started = true;
            $timeout(requestBlob, 500);
        }

        function requestBlob() {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', addphoto.file.$ngfBlobUrl, true);
            xhr.responseType = 'blob';
            xhr.onload = function(e) {
                if (this.status == 200) {
                    addphoto.blob = this.response;
                    $timeout(resizeUploadBoxHeight, 100);
                    addphoto.setBlob();
                }
            };
            xhr.send();
        }

        function setBlob() {
            $scope.$parent.scouting.user[addphoto.type] = addphoto.blob;
            $timeout(function() {
                $scope.$parent.scouting.safeApply();
            }, 500);
        }

        function resizeUploadBoxHeight() {
            var img,
                fr = new FileReader;

            fr.onload = function() {
                img = new Image;
                img.onload = function() {
                    setHeight(img.width, img.height);
                    addphoto.isTooBig = (addphoto.blob.size > 8000000);
                    $scope.$digest();
                };
                img.src = fr.result;
            };

            fr.readAsDataURL(addphoto.file);
        }

        function setHeight(width, height) {
            var containerWidth,
                widthRatio,
                scaledHeight,
                container = $(addphoto.containerSelector),
                pad = $(addphoto.padSelector);
            if(container) {
                containerWidth = container.outerWidth();
                widthRatio = containerWidth / width;
                scaledHeight = Math.floor(height * widthRatio);
                if(pad) {
                    scaledHeight += pad.outerHeight();
                }
                container.css('height', scaledHeight + 'px');
            }
        }

        function deletePhoto($event) {
            if ($event) {
                $event.stopPropagation();
            }
            $scope.$parent.scouting.user[addphoto.type] = null;
            addphoto.file = null;

            // reset height from where setHeight had it
            var container = $(addphoto.containerSelector);
            container.css('height', '');
        }
    }

    function EmailForm($scope, $http, $timeout, Upload, fdScoutingFlow, fdUserData) {
        var emailForm = this;

        emailForm.isFormComplete = isFormComplete;
        emailForm.submit = submit;
        emailForm.isStep = isStep;
        emailForm.setStep = setStep;

        emailForm.user = {
            casting_code : Ford.casting_code || null,
            email : null
        };

        function isFormComplete() {
            var u = emailForm.user;
            return u.casting_code !== null && u.email !== null;
        }

        function submit() {
            setStep('emailFormLoading');
            $http.post('/users/scouted-email-exists', emailForm.user, {
                transformRequest : [formatCastingCode].concat($http.defaults.transformRequest)
            })
            .then(function checkEmailSuccess(response){
                    handleEmailCheck(response);
                },
                function checkEmailError(response) {
                    setStep('emailForm');
                    if (response.data && response.data.message) {
                        emailForm.serverError = response.data.message;
                    }
                }
            );
        }

        function formatCastingCode(data) {
            data.casting_code = data.casting_code.toLowerCase();
            return data;
        }

        function handleEmailCheck(response) {
            if(response && response.data && response.data.exists) {
                setStep('emailRecognized');
                fdUserData.setProp('email', emailForm.user.email);
                fdUserData.setProp('casting_code', emailForm.user.casting_code);
            }
            if(response && response.data && !response.data.exists) {
                setStep('emailUnrecognized');
                fdUserData.setProp('email', emailForm.user.email);
            }
        }

        function isStep(step) {
            return fdScoutingFlow.getStep() === step;
        }
        function setStep(step) {
            fdScoutingFlow.setStep(step);
        }
    }

    function UserPassForm($scope, $http, $timeout, Upload, fdScoutingFlow, fdUserData, fdUsernameService) {
        var userPassForm = this;

        userPassForm.isUsernameAvailable = true;

        userPassForm.isFormComplete = isFormComplete;
        userPassForm.submit = submit;
        userPassForm.isStep = isStep;
        userPassForm.setStep = setStep;
        userPassForm.checkUsername = checkUsername;

        userPassForm.user = {
            email : null,
            casting_code : null,
            username : null,
            password : null
        };

        function isFormComplete() {
            var u = userPassForm.user;
            return u.username !== null && u.password !== null && userPassForm.isUsernameAvailable;
        }

        function checkUsername(username) {
            fdUsernameService.getAvailability(username).then(function(response) {
                userPassForm.isUsernameAvailable = response.data.available;
            }).catch(function() {
                // if there's a problem fallback to true, catch any issues on the server side
                userPassForm.isUsernameAvailable = true;
            });
        }

        function submit() {
            setStep('emailRecognizedLoading');
            setEmailAndCastingCode();
            $http.post('/users/select-unowned/talent', userPassForm.user)
            .then(function checkEmailSuccess(response){
                    setStep('scoutingFormSuccess');
                },
                function checkEmailError(response) {
                    setStep('emailRecognized');
                    if (response.data && response.data.message) {
                        userPassForm.serverError = response.data.message;
                    }
                }
            );
        }

        function setEmailAndCastingCode() {
            var u = userPassForm.user;
            u.email = fdUserData.getProp('email');
            u.casting_code = fdUserData.getProp('casting_code');
        }

        function isStep(step) {
            return fdScoutingFlow.getStep() === step;
        }
        function setStep(step) {
            fdScoutingFlow.setStep(step);
        }
    }

})();

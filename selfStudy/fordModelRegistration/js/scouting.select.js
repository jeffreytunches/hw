(function(){
    'use strict';

    angular
        .module('app.scouting')
        .directive('scoutingSelect', ScoutingSelect);

    /* @ngInject */
    function ScoutingSelect() {
        return {
            scope: {
                ngModel : '=',
                items : '=',
                fieldName: '@',
                selectName : '@',
                required : '@',
                syncUnits : '&'
            },
            link: function($scope, el, attrs) {
                //console.info('link:', attrs);
                //if(attrs.required) {
                //    el.find('select').attr('required', 'required');
                //    console.log('defined!',el);
                //}
            },
            template:
                '<div class="select-field-icon"><span class="glyphicon glyphicon-chevron-down"></span></div>' +
                '<select class="select-field" name="[[selectName]]" id="[[selectName]]" class="form-control" ng-required="[[required]]" ' +
                    'ng-model="ngModel" ' +
                    'ng-change="syncUnits({field: fieldName, modelVal: ngModel})" ' +
                    'ng-options="option.value as option.name for option in items">' +
                '</select>'

        }
    }
})();

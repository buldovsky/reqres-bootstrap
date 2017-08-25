/**
 *
 * Поля типа Boolean
 *
 *
 */
define(['./field'], function(fieldClass){


    return fieldClass.extend({

        init : function(input){

            this._super(input)
            var _this = this

            this.$button = this.root.find('button')

            this.$button.click(function(){

                if(_this.val() == '1') _this.val(false)
                else _this.val(true)

            })

        },

        _setValue: function(value){

            if(typeof value !== 'boolean') value = (value === '1')

            if(value) this.$button.addClass('btn-primary').removeClass('btn-default')
            else this.$button.addClass('btn-default').removeClass('btn-primary')

            this.$input.val(value ? '1' : '')

        },

        _getValue: function(){

            return this.$input.val()

        },

        /**
         *
         * Возвращаем текущее значение в читемом виде HTML
         *
         *
         */  
        _getValuePretty: function(val){
            
            return val ? 'Да' : 'Нет'

        },      

    });

});

/**
 *
 * Поля типа Int
 *
 *
 */
define(['./field', 'jquery-number'], function(fieldClass){


    return fieldClass.extend({

        init : function(input){

            this._super(input)

            /*
            // ограничиваем ввод только числами
            this.$input.keydown(function(e){

                //console.log(e)

            })
            */
        },
        
        /**
         *
         * Возвращаем текущее значение
         *
         *
         */  
        _getValue: function(){
            
            var x = parseInt(this.$input.val())
            
            return isNaN(x) ? 0 : x

        },        
        
        /**
         *
         * Возвращаем текущее значение в читемом виде HTML
         *
         *
         */  
        _getValuePretty: function(){
            
            return $.number(this._getValue(), 2, '.')

        }

        
    });

});

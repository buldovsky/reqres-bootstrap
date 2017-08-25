/**
 *
 * Поля типа Int
 *
 *
 */
define(['./field-float', 'jquery-number'], function(fieldClass){


    return fieldClass.extend({

        init : function(input){

            this._super(input)
            var _this = this

            var $plusbutton = this.root.find('.plus_button').click(function(){ 

                
                _this.val(_this.val() +1)
                
            })

            var $minusbutton = this.root.find('.minus_button').click(function(){ 
            
                _this.val(_this.val() -1)
                
            })

            this.decLength = this.$input.attr('dec') || 0
            
        },
        
        /**
         *
         * Возвращаем текущее значение
         *
         *
         */  
        _getValue: function(){
            
            var value = parseInt(this.$input.inputmask('unmaskedvalue'))
            
            return isNaN(value) ? 0 : value

        },        
        

        /**
         *
         * Возвращаем текущее значение в читемом виде HTML
         *
         *
         */  
        _getValuePretty: function(val){
            
            return $.number(val, 0, '.')
            
        }
        
    });

});

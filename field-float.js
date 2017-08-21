/**
 *
 * Поля типа Int
 *
 *
 */
define(['./field', 'jquery-number'], function(fieldClass){


    return fieldClass.extend({

        init : function(input){

            var _this = this
            this._super(input)

            this.decLength = this.$input.attr('dec') || 2
            
            // ограничиваем ввод только числами
            this.$input.inputmask("decimal",{
                
                 radixPoint:".", 
                 groupSeparator: " ", 
                 digits: this.dec,
                 autoGroup: true,
                 prefix: ''
                
             })
                
        },
        
        dec: function(){
          
            return this.decLength
            
        },
        
        
        format: function(value, dec){
            
            if(!value) value = 0
            if(!dec) dec = this.dec()
            return $.number(value, dec, '.')
            
        },
        
        /**
         *
         * Возвращаем текущее значение
         *
         *
         */  
        _getValue: function(){
            
            var value = parseFloat(this.$input.inputmask('unmaskedvalue'))
            
            return isNaN(value) ? 0 : value

        },        
        
        /**
         *
         * Возвращаем текущее значение
         *
         *
         */  
        _setValue: function(value){
            
            this.$input.val(value)
            
        },

        /**
         *
         * Возвращаем текущее значение в читемом виде HTML
         *
         *
         */  
        _getValuePretty: function(val){
            
            return $.number(val, 2, '.')
            
        }

        
    });

});

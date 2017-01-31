/**
 *
 * Поля типа Text
 *
 *
 */
define(['./field'], function(fc){
    
    return fc.extend({

        init : function(input){

            this._super(input)

        },

        _setValue : function(value){

            this.$input.val(value)

        },
        _getValue : function(){

            return this.$input.val()

        }
    }); 

})

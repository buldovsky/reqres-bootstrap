/**
 *
 * Поля типа Phone
 *
 *
 */
define(['./field', '/bower/jquery.inputmask/extra/phone-codes/phone.js', '/bower/jquery.inputmask/extra/phone-codes/phone-ru.js'], function(fc){ // 'inputmask'
    
    return fc.extend({

        init : function(input){

            this._super(input)

            var _this = this

			this.$input.inputmask("phoneru", {
                onKeyValidation: function () {
                  
                	//console.log($(this).inputmask("getmetadata"));
					// region, city                  
                  
                }
            }) 
           
        },
        
        _setValue: function(value){
        
            if(value[0] == '7') value = value.substr(1)
            this.$input.val(value)
            
        },

        _getValueSystem: function(){
        
			return this.val().replace(/[\_\-\+]/g, '').replace(/[\(\)]/g, '-')
            
        },
        
        _getValuePretty: function(val){
        
            // !!! слишком долго при большом количестве строк
            return Inputmask.format(val, { alias: "phoneru" })
            
        },
        
    });     

});

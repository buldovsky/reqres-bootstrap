/**
 *
 * Поля типа Date
 *
 *
 */
define(['./field', 'moment', 'bootstrap3-datetimepicker'], function(fieldClass, moment){
    
    return fieldClass.extend({

        init : function(input){

            this._super(input)
            var _this = this

            this.$input_value = this.root.find('input:eq(1)')
            
                .on('dp.change', function(){

                    _this._setValue( moment($(this).val(), "DD.MM.YYYY HH:mm:ss") )
                    _this.change()

                })
                .datetimepicker({

                    //calendarWeeks: true,
                    locale: 'ru',
                    format:'DD.MM.YYYY HH:mm:ss',

                })

            var $button = this.root.find('.calendar_button').click(function(){ 
            
                _this.$input_value.focus()
                
            })
            
        },
        
        _setValue: function(value){

            if(typeof value == 'string') value = moment(value, "YYYY-MM-DD HH:mm:ssP")
            
            this.moment = value
            
            this.$input.val(value.format("YYYY.MM.DD HH:mm:ssP"))
            this.$input_value.val(value.format("DD.MM.YYYY HH:mm:ss"))
            
            return value

        },

        
        _getValue: function(){

            return this.moment

        },

        _getValuePretty: function(){

            return this.moment.format("DD.MM.YYYY HH:mm:ss")

        },
        
        
        _getValueSystem: function(){

            return this.$input.val()

        }
        
    });
    
});

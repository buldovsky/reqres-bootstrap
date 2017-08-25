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

            this.$input.on('dp.change', function(){

                    _this._setValue( moment(this.value, "DD.MM.YYYY") )
                    _this.change()

                })
                .datetimepicker({

                    //calendarWeeks: true,
                    locale: 'ru',
                    format:'DD.MM.YYYY',

                })

            var $button = this.root.find('.calendar_button').click(function(){ 
            
                _this.$input.focus()
                
            })
            
        },
        
        /**
         *
         * Привязываем даты одна к другой
         *
         */
        moreThen: function(Date2){

            return this

        },

        _reset: function(){
          
            this.$input.val('')
            
        },        
        
        _setValue: function(value){

            if(typeof value == 'string') value = moment(value, "YYYY-MM-DD")
            
            this.moment = value
            
            this.$input.val(value.format("DD.MM.YYYY"))
            
            return value

        },
        
        _getValue: function(){

            if(!this.moment) return ''
            // возвращаем копию объекта
            return this.moment.clone()
            //return moment(this.moment)

        },

        _getValuePretty: function(val){

            if(typeof val == 'string') val = moment(val, "YYYY-MM-DD")
			return val.format("DD.MM.YYYY")

        },        
        
        _getValueSystem: function(){

            if(!this._getValue()) return ''
            return this._getValue().format("YYYY-MM-DD")

        },
        
        
    });
    
});

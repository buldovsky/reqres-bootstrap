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

            this.checkbox = this.root.find('input[type=checkbox]')

            this.checkbox.change(function(){

                _this.val($(this).prop('checked'))

            })
            
            // активируем нажатие на label p 
            // почему label p а не label
            // потомучто сама галочка у нас находится тоже внутри label
            this.root.find('label p').click(function(){
                
                _this.valInvert()
                
            })

        },
        
        valInvert: function(value){

            this.val( !this.val() )
            return this
            
        },

        _setValue: function(value){

            if(typeof value !== 'boolean') value = (value === '1')

            this.checkbox.prop('checked', value)
            this.$input.val(value ? '1' : '')

        },

        _getValue: function(){

            return this.checkbox.prop('checked') ? '1' : ''

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


})

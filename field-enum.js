/**
 *
 * Поля типа Enum
 *
 *
 */
define(['./field'], function(fieldClass){
    
    return fieldClass.extend({

        init : function(input){

            var _this = this
            this._super(input)

            this.$select = this.root.find('select').change(function(){
                
                _this.change()
                
            })

            
        },

        _reset: function(){

            this.$select.find('option').first().prop('selected', true)

        },

        setValues: function(data){

            var _this = this

            this.$select.empty()

            $.each(data, function(key, value){
                $('<option>').attr('value', key).text(value).appendTo(_this.$select)
            })

            return this
            
        },

        _setValue : function(value){

            this.$select.val(value).change()

        },
        _getValue : function(){

            
            if(this.$select.find('option').length == 0) return undefined
            return this.$select.val()

        }       

    });
    
})


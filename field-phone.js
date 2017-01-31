/**
 *
 * Поля типа Phone
 *
 *
 */
define(['./field'], function(fc){
    
    return fc.extend({

        init : function(input){

            this._super(input)

            var _this = this

            this.$code1 = this.root.find('input[type=text]').eq(0)
            this.$code2 = this.root.find('input[type=text]').eq(1)
            this.$number = this.root.find('input[type=text]').eq(2)

            this.$code1.add(this.$code2).add(this.$number).on('input', function(){
                
                var value = _this.$code1.val() + '-' + _this.$code2.val() + '-' + _this.$number.val()
                _this.$input.val( value )

            })

        },

        _setValue: function(value){

            var val = value.split('-')
            if(val.length == 1){

                this.$number.val(val[0])
                return

            }
            this.$code1.val(val[0])
            this.$code2.val(val[1])
            
            this.$number.val(val.splice(2).join('-'))

            this.$input.val(value)

        }           

    });     

});

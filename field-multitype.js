/**
 *
 * Поля типа Multitype
 *
 *
 */
define(['./field', 'reqres-classes/form'], function(field_class, formClass){
    
    return field_class.extend({

        init : function(input){

            var _this = this
            this._super(input)

            
            this.subtypes = {}
            var x
            
            formClass.around(this.cont).fields(function(key, Field, index){

                // первый элемент не заносим
                if(!x){ x = true; return; }
                _this.subtypes[key] = Field
                
                // при изменении поля будем менять и нас
                Field.change(function(){
                    
                    _this.change(true)
                    
                })

            }, this.cont)

            this.cont.find('.change_button').click(function(){
                
                _this.val('')
                
            })
            
            this.$input.change(function(){

                var val = $(this).val()
                $.each(_this.subtypes, function(key, Field){
                    Field.cont.toggle(key === val)
                })
                _this.root.toggle(val === '')

                _this.change()
                
            })

            
        },

        /**
         *
         * Возвращаем активные поля вместо текущих значений
         *
         *
         */         
        _change: function(val, oldval){

            return [ !val ? undefined : this.subtypes[val], !oldval ? undefined : this.subtypes[oldval] ]
            
        },

        
        _reset: function(){

            this.$input.find('option').first().prop('selected', true)

        },

        _setValue : function(value){

            var _this = this
            
			this.$input.val(value).change()
            
        },
        
        _getValue : function(){

            
            if(this.$input.find('option').length == 0) return undefined
            return this.$input.val()

        }

    });
    
})

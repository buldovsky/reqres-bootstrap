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

            var Form = formClass.around(this.cont)
            if(!Form instanceof formClass) return

            Form.fields(function(key, Field, index, lastfield){

                    // первый элемент не заносим
                    if(!x){ x = true; return; }
                    _this.subtypes[key] = Field


                    // при изменении поля будем менять и нас
                    Field.change(function(){  _this.change()  })
                      

                    // после загрузки всех полей проверяем
					if(lastfield) {
                        
                        // если хоть одно подполе имеет значение, присаиваем нам его
                        $.each(_this.subtypes, function(key, Field){
                            if(Field.val() !== undefined)
                                _this.val(Field.$input.attr('name'))
                        })
                        
                        _this.$input.trigger('onload')
                        
                    }

                }, this.cont)
            

            this.cont.find('.change_button').click(function(){
                
                _this.val('')
                
            })


            this.change(function(e, Field, OldField, val){

                $.each(_this.subtypes, function(key, Field){
                    Field.cont.toggle(key === val)
                })
                _this.root.toggle(val === '')

                _this.change()

            }) 
            
        },

        
        /**
         *
         * Добавляем обработчик события после загрузки всех подполей
         *
         */
        onload: function(handler){
            
            this.$input.on('onload', handler)
            
            return this
            
        },
        
        /**
         *
         * Возвращаем классы полей вместо текущих значений
         *
         */         
        _change: function(val, oldval){

            return [ !val ? undefined : this.subtypes[val], !oldval ? undefined : this.subtypes[oldval], val ]
            
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

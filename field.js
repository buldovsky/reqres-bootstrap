/**
 * 
 * Класс Полей
 * 
 */
define(['reqres-classes/field', 'reqres-classes/form', 'inputmask'], function(fieldClass, formClass){ // , 'inputmask-multi'
    
    return fieldClass.extend({

        init: function(input){

            var _this = this
            this._super(input)            

            var prefix = 'mod_bootstrap_field_'

            // сохраняем верховный тэг
            this.root = this.$input.parentsUntil('fieldset.'+prefix+'root').last().parent()
            this.cont = this.root.parent()
            
            // создаем коллекции элементов играющие определенные роли
            this.collection = {

                'null_button'       : this.root.find('[nullbutton]').addBack('[nullbutton]'),
                'types_button'      : this.root.find('[typesbutton]').addBack('[typesbutton]'),
   
            }

            $.each(['error_indicator', 'error_container', 'readonly_container', 'edit_container'], function(i, tag){
                
            	_this.collection[tag] = _this.root.find('.'+prefix+tag).addBack('.'+prefix+tag)
                
            })
            
            // при нажатии на null устанавливаем значение null
            this.collection.null_button.click(function(){

                if(_this.isNull()) _this.unsetNull()
                else _this.setNull()

                _this.change()

            })

            
			// при нажатии на смену типа
            if(this.collection.types_button.length > 0){

                formClass.around(function(key, Field, index){

                    if(!_this.typeselect) { _this.typeselect = Field; return }
                    
                }, this.cont.parent())
                
                this.collection.types_button.click(function(){ _this.typeselect.val(''); })
            }
            
            
        },
        
        /**
         *
         * Инициализация второй волны когда первая уже прошла полностью вся
         *
         *
         * /         
        oninit: function(){

            alert('!')
            this.readonly( this.root.attr('readonly') === "readonly" )

        },


        /**
         *
         * Получаем текстовое (HTML) значение
         *
         *
         */  
        _getPretty: function(){

            return this.collection.readonly_container.html()

        },
        
        /**
         *
         * 
         *
         */  
        _setPretty: function(value){

            // проставляем значение в readonly
            this.collection.readonly_container.html(value)
            
        },        
        
        _setDisabled: function(){
            
			this.root.prop('disabled', true)

        },          

        
        _removeDisabled: function(){
            
			this.root.prop('disabled', false)
                
        },  
        
        
        _isNullable: function(){
            
            return this.collection.null_button.length > 0

        },          

        
        _setNull: function(){
            
            this.collection.null_button.parent().siblings().css('visibility', 'hidden')
            this.collection.null_button.addClass('btn-link').removeClass('btn-default')
            
            return this            

        },          

        
        _unsetNull: function(){
            
            this.collection.null_button.parent().siblings().css('visibility', 'visible')
            this.collection.null_button.addClass('btn-default').removeClass('btn-link')

            return this
            
        },

        /**
         *
         * Устанавливаем ошибку
         *
         *
         */  
        _setErrors: function(errors){
            
            if(errors instanceof Object) errors = errors.join('; ')

            // !!! ошибки отображаем только в первок контейнере ошибок
            this.collection.error_container.first().popover({ trigger:'hover', content:errors, placement:'top' })                  
            this.collection.error_indicator.addClass('has-error')

        },          

        /**
         *
         * Снимаем ошибку
         *
         *
         */  
        _removeErrors: function(){
            
            this.collection.error_container.first().popover('destroy')
            this.collection.error_indicator.removeClass('has-error')

        },  

        /**
         *
         * Проверяем есть ли ошибки
         *
         *
         */  
        hasErrors: function(){
            
            return this.collection.error_indicator.hasClass('has-error')

        },
        
        /**
         *
         * Устанавливаем только чтение
         *
         *
         */  
        _setReadonly: function(value){
            
            this.collection.edit_container.hide()
            this.collection.readonly_container.show().html(value)

        },          

        /**
         *
         * Снимаем только чтение
         *
         *
         */  
        _removeReadonly: function(){
            
            this.collection.edit_container.show()
            this.collection.readonly_container.hide()
            
        }        


    });

})


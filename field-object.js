/**
 *
 * Поля типа Object
 *
 *
 */
define(['./field'], function(field_class){
    
    return field_class.extend({
        
        init : function(input){

            this._super(input)

            var _this = this


            this.$input_value = this.root.find('input:eq(1)')
			this.mainInput(this.$input_value)
            
			this.stopModal = false

            this.urlTemplate = this.$input.attr('data-modal-uri')
            this.urlParams = {}

            var modal = function(){

                //if(_this.stopModal) return
                //_this.stopModal = true
                
                // приписываем иекущее значение
                var val = $(input).val()
                if(val !== '') val = '&rid='+val
                
                /*
                _this.objectDeferred = $.Deferred().done(function(modal, object){
                    
                    //_this.stopModal = false

                })
                .fail(function(){

                    
                })
                */
                    
                $.ajax({ url: _this.$input.attr('data-modal-uri') + val, context: _this }).on('protocolObjectList', function(e, List, Modal){
                    
                    // после закрытия списка убираем 
                    modal.hide(function(){ _this.$input_value.val('') })

                    modal.get().find('.' + object.options.classes.search).val( _this.$input_value.val() ).focus()
                    
                    //List.active().scroll(modal.whenOpened())
                    //_this.stopModal = false
                    
                })
                
            }
            
            this.$input_value.on('input', function(){
                
                modal()
                
            })
            
            var $button = this.root.find('.object_button').click(function(){ modal() })
            
        },

        /*
        setObject: function(modal, object){
          
            // подтверждаем ранее созданный Deferred
            this.objectDeferred.resolve(modal, object)
            
            object.setField(this, modal)
            
            return this
            
        },
        */
        
        /**
         *
         * В атрибуте data-modal-uri может быть не url а шаблон, в который можно подставлять параметры, например [:client]
         *
         * @var param - имя параметра без [:] чисто client
         * @var Field - класс поля || undefined
         *
         */
        setUrlParam: function(param, arg){

            // у нас может быть в качестве параметра придти поле
            var param_str = (arg instanceof field_class) ? arg.valueSystem() : arg
            
            if(typeof param_str !== 'string') param_str = ''
            
            
            this.urlParams[param] = param_str
                
            var url = this.urlTemplate
            $.each(this.urlParams, function(par, value){
                if(value === undefined) return
                url = url.replace('[:'+par+']', value)
            })

            this.$input.attr('data-modal-uri', url)
            
            return this

        },
        
        
        usedBy: function(Field, param){
            
            var _this = this
            
            Field.disabled(true)
            
            this.change(function(){ 
                
                if(!Field) return;
				// сбрасываем контакт, и выключаем поле на время
                Field.reset().disabled(true)

                Field.setUrlParam(param, _this).disabled(false)

            }, true)
            
        },
        
        /**
         *
         * 
         *
         */  
        _setPretty: function(value){

            // проставляем значение в readonly
            this.collection.readonly_container.text(value._text)
            
        },        
        
        _reset: function(){

            this.val({ _rid:'', _text:''})

        },
        
        _getValue: function(){

            return this.valueObject

        },
        
        _setValue: function(value){

            if(typeof value !== 'object') return false

            this.valueObject = value
            this.$input.val(value._rid)
            this.$input_value.attr('placeholder', value._text)
                
        },

        _getValueSystem: function(){

            return this.$input.val()
            
            var value = this.val()
            if(value === undefined) return undefined
            if(!value._rid) return undefined
            return value._rid
            
        },
		
		
        _getValuePretty: function(val){

            //return this.$input_value.attr('placeholder')
            return val._text

        },
		

    });


})


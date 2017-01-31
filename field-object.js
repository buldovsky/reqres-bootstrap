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

                if(_this.stopModal) return
                
                _this.stopModal = true
                
                // приписываем иекущее значение
                var val = $(input).val()
                if(val !== '') val = '&rid='+val
                
                _this.objectDeferred = $.Deferred().done(function(modal, object){
                    
                    _this.stopModal = false

                    // после закрытия списка убираем 
                    modal.hide(function(){
                        _this.$input_value.val('')
                    })

                    modal.get().find('.' + object.options.classes.search_class).val( _this.$input_value.val() ).focus().change()

                })
                .fail(function(){

                    _this.stopModal = false
                    
                })
                
                    
                $.ajax({ url: _this.$input.attr('data-modal-uri') + val, context: _this })
                
            }
            
            this.$input_value.on('input', function(){
                
                modal()
                
            })
            
            var $button = this.root.find('.object_button').click(function(){ modal() })
            
        },

        setObject: function(modal, object){
          
            // подтверждаем ранее созданный Deferred
            this.objectDeferred.resolve(modal, object)
            
            object.setField(this, modal)
            
            return this
            
        },
        
        /**
         *
         * В атрибуте data-modal-uri может быть не url а шаблон, в который можно подставлять параметры, например [:client]
         *
         * @var param - имя параметра без [:] чисто client
         * @var Field - класс поля || undefined
         *
         */
        setUrlParam: function(param, Field){

            this.urlParams[param] = (Field === undefined) ? undefined : Field.systemValue()
                
            var url = this.urlTemplate
            $.each(this.urlParams, function(par, value){
                if(value === undefined) return
                url = url.replace('[:'+par+']', value)
            })

            this.$input.attr('data-modal-uri', url)
            
            return this

        },
        
        
        _reset: function(){

            this.val(['', ''])

        },
        
        _setValue: function(value){

            
            if($.isArray(value)){

                this.value = value
                this.$input.val(value[0])
                this.$input_value.attr('placeholder', value[1])
                
            } else this.$input.val(value)

        },
        
        _getValueSystem: function(){

            return this.$input.val()

        },

        _getValue: function(){

            return this.value

        },

		/*
        _getValuePretty: function(){

            return this._getValue()[1]

        },
		*/
        
        _getPretty: function(){

            return this._getValue()[1]

        },        
                              
    });     


})


/**
 *
 * Поля типа StringList
 *
 *
 */
define(['./field-string'], function(fc){
    
    return fc.extend({

        init : function(input){

            var _this = this
            this._super(input)

            this.soptions1 = this.root.find('.soption1')
            this.soptions2 = this.root.find('.soption2')

            this.select = this.root.find('select')

            
            this.select.change(function(){
                
                var option = $('option:selected', this)
                
                if(option.hasClass('other')) {

                    _this.$input.val( _this.input.lastValue || '')
                    _this.show()
                    
                } else {
                    
                    _this.$input.val(_this.select.val())        
                    _this.hide()
                    
                }
                
            })

            this.soptions1.click(function(){

                _this.show()

            })

            this.soptions2.click(function(){


                var found
                $('option', _this.select).not('.empty').each(function(){
                    
                    if($(this).text() === _this.$input.val()){
                        found = true
                        $(this).prop('selected', true)
                    }
                        
                })

                if(!found) $('option:first', _this.select).prop('selected',true)

                _this.$input.lastValue = _this.$input.val()
                _this.hide()

            })
            

            this.hide() 

        },

        setValues: function(data){

            var _this = this

            this.select.empty()

            $.each(data, function(key, value){
                $('<option>').attr('value', value).text(value).appendTo(_this.select)
            })

            this.select.change()
            
            return this
            
        },
        
        hide: function(){

            this.soptions2.hide()
            this.soptions1.show()
            
            
            this.$input.hide()
            this.select.show().focus()

            this.change()            
            
        },

        show: function(){


            this.soptions1.hide()
            this.soptions2.show()

            this.$input.show().focus()
            this.select.hide()
            
            this.change()            

        },
        _reset:function(){

            this.select.find('option:first').prop('selected', true)
            this.hide()

        },
        _setValue: function(value){

            var _this = this
            var found = false

            $('option', this.select).not('.empty').each(function(){
                
                if($(this).text() == value){
                    found = true
                    $(this).prop('selected', true)
                    _this.hide()      
                }
                    
            })

            if(!found) {
                
                this.input.lastValue = value
                this.show()      
            }

            this.$input.val(value)

        }

        
    });
    
});

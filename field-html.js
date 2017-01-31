/**
 *
 * Поля типа HTML
 *
 *
 */
define(['./field', 'summernote', 'css!bower/summernote/dist/summernote'], function(fc){ //, 'bower/summernote/dist/lang/summernote-ru-RU.min'
    
    return fc.extend({

        init : function(input){

            this._super(input)

            $().popover({container: 'body'})
            
            this.$input.summernote({
                //lang: 'ru-RU',
                minHeight: 150,
                dialogsInBody: true
                /*
                airMode: true,
                popover: {
                  image: [
                    ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
                    ['float', ['floatLeft', 'floatRight', 'floatNone']],
                    ['remove', ['removeMedia']]
                  ],
                  link: [
                    ['link', ['linkDialogShow', 'unlink']]
                  ],
                  air: [
                    ['color', ['color']],
                    ['font', ['bold', 'underline', 'clear']],
                    ['para', ['ul', 'paragraph']],
                    ['table', ['table']],
                    ['insert', ['link', 'picture']]
                  ]
                }
                */
            });
            
        },

        _setValue : function(value){

            this.$input.summernote('code', value);
            this.$input.val(value)

        },
        
        _getValue : function(){

            return this.$input.summernote('code');

        },
        
        _focus: function(){
            
			this.$input.summernote('focus')
            
        },
        
        _reset: function(){
            
			this.$input.summernote('reset')
            
        },
        
        /**
         *
         * Устанавливаем блокировку
         *
         */  
        _setDisabled: function(){
            
			this.$input.summernote('disable')

        },          

        /**
         *
         * Снимаем блокировку
         *
         */  
        _removeDisabled: function(){
            
			this.$input.summernote('enable')
        },  
        
    }); 

})

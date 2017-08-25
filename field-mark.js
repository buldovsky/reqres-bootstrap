/**
 *
 * Поля типа Mark
 *
 *
 */
define(['./field'], function(fieldClass){
    
    return fieldClass.extend({

        init : function(input){

            this._super(input)

            var _this = this
            
            this.$stars = $('.markstar', this.root)
                
            this.$stars.click(function(){
            
                var val = $(this).index()+1
                _this.val(val)
                    
            })

        },

        _setValue: function(value){

            var i = 0
            this.$stars
                .removeClass('glyphicon-star')
                .removeClass('glyphicon-star-empty')
                .each(function(){

                    $(this).addClass( i < value ? 'glyphicon-star' : 'glyphicon-star-empty' )
                    i++
                })
            
            this.$input.val(value)    

        }           

    });

});

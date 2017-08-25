/**
 *
 * Поля типа upload
 *
 *
 */
define(['./field'], function(fieldClass){

    
    return fieldClass.extend({

        init : function(input){

            var _this = this
            this._super(input)

            this.url = this.$input.attr('url')
            
            this.files = this.root.find('.files')
            this.progress = this.root.find('.progress')
                
            this.$input.fileupload({
                url: this.url,
                dataType: 'json',
                done: function (e, data) {
                    $.each(data.result.files, function (index, file) {
                        $('<p/>').text(file.name).appendTo( _this.files );
                    });
                },
                progressall: function (e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    this.progress.find('.progress-bar').css('width', progress + '%');
                }
                
            })
                .prop('disabled', !$.support.fileInput)
                .parent().addClass($.support.fileInput ? undefined : 'disabled');

            
            
        }

    });
    

});

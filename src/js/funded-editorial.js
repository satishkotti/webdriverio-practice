var webmd;

if(!webmd){
    webmd = {};
}

webmd.fundedEditorial = {

    init : function(){
        this.bindEvents();

        if($('#attribution_rdr').length) {
            this.moveAttribution();
        }
    },

    bindEvents : function(){
        var self = this,
            mastheadH = $('.masthead').outerHeight(true);

        $(window).scroll(function() {
            if ($(document).scrollTop() > mastheadH) {
                self.stickMasthead(mastheadH);
            }
            else {
                self.unstickMasthead();
            }
        });
    },

    stickMasthead : function(mastheadH){
        $('body').addClass('masthead-stuck');
        $('body').css('padding-top',mastheadH);
    },

    unstickMasthead: function(){
        $('body').removeClass('masthead-stuck');
        $('body').css('padding-top','');
    },

    moveAttribution : function(){
        $('#attribution_rdr').detach().appendTo('.masthead-right').addClass('animate-in');
    }

};

$(function() {
    webmd.fundedEditorial.init();
});
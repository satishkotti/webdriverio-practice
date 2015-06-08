var webmd;

if(!webmd){
    webmd = {};
}

webmd.fundedEditorial = {

    uaType : webmd.useragent.ua.type,

    init : function(){
        this.bindEvents();

        if($('#attribution_rdr').length) {
            this.moveAttribution();
        }

        if(s_sponsor_program !== 'undefined' && s_sponsor_program !== ''){
            // Funded Editorial Specific Method
            this.fundedPages();
        }

        if(this.uaType !== 'mobile'){
            this.stickIt();
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
    },

    fundedPages : function(){
        // Set Global Class
        $('html').addClass('funded-editorial');

        // Hide Elements
        $('.healthSolutions').hide();
    },

    stickIt : function(){
        $('#ContentPane30').hcSticky({
            wrapperClassName : 'wmd-sidebar-sticky',
            className : 'wmd-sticky',
            responsive : true,
            offResolutions : [-736],
            //followScroll : false,
            top: 60
        });
    }

};

$(function() {
    webmd.fundedEditorial.init();
});
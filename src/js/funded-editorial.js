var webmd;

if(!webmd){
    webmd = {};
}

webmd.fundedEditorial = {

    uaType : webmd.useragent.ua.type,

    init : function(){
        this.bindEvents();

        this.createAds(this.uaType);

        if($('#attribution_rdr').length) {
            this.moveAttribution();
        }

        if(s_sponsor_program !== 'undefined' && s_sponsor_program !== ''){
            // Funded Editorial Specific Method
            this.fundedPages();
        }

        if(this.uaType !== 'mobile'){
            //this.stickIt();
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

    createAds : function(env){
        if(env !== 'mobile'){
            // Desktop Ads
            var bannerAdHTML = '<div id=bannerAd_rdr><div class=bannerAd_top_fmt></div><div id=bannerAd_fmt class="bannerAd_BG_fmt loaded"><div id=ads2-pos-101-ad_banner class=ad_placeholder></div></div></div>',
                bannerAdContainer = $('.masthead'),
                rrAdHTML = '<div id=rightAd_rdr><div class=rightAd_top_fmt></div><div id=rightAd_fmt class="rightAd_BG_fmt loaded"><div id=ads2-pos-121-ad_rr_p1 class=ad_placeholder></div></div><div class=rightAd_bottom_fmt></div></div><div class=moduleSpacer_rdr></div>',
                rrAdContainer = $('#ContentPane30');

            bannerAdContainer.after(bannerAdHTML);
            rrAdContainer.append(rrAdHTML);

            webmd.ads2.defineAd({
                id: 'ads2-pos-101-ad_banner',
                pos:'101',
                sizes:[[728,90],[970, 90],[970,250]],
                refresh:false,
                immediate:false
            });

            webmd.ads2.defineAd({
                id: 'ads2-pos-121-ad_rr_p1',
                pos:'121',
                sizes:[[300,250],[300, 600],[300,1050]],
                refresh:false,
                immediate:false
            });

            if (webmd && webmd.ads2 && webmd.ads2Consumer) {
                webmd.ads2Consumer.display();
            }

        } else {
            // Mobile Ads
        }
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
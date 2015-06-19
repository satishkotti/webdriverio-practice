webmd.object.set('webmd.responsive');

webmd.responsive = {

    breakpoint : {},

    init : function(){
        var self = this;

        $(window).resize(function () {
            self.refreshValue();
        }).resize();
    },

    refreshValue : function(){
        var cssBreakpoint = window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/["']/g, "");

        if(this.breakpoint.value !== cssBreakpoint){
            this.breakpoint.value = cssBreakpoint;
            this.setBreakPointValue();
        }
    },

    setBreakPointValue : function(){
        switch(this.breakpoint.value) {
            case 'Large Screen|Retina':
                webmd.debug('Large Screen|Retina');
                $('body').trigger('largeScreenRetina');
                break;
            case 'Large Screen':
                webmd.debug('Large Screen');
                $('body').trigger('largeScreen');
                break;
            case 'Desktop|Laptop|Retina':
                webmd.debug('Desktop|Laptop|Retina');
                $('body').trigger('desktopLaptopRetina');
                break;
            case 'Desktop|Laptop':
                webmd.debug('Desktop|Laptop');
                $('body').trigger('desktopLaptop');
                break;
            case 'iPad|Tablet|Portrait|Retina':
                webmd.debug('iPad|Tablet|Portrait|Retina');
                $('body').trigger('ipadTabletPortraitRetina');
                break;
            case 'iPad|Tablet|Portrait':
                webmd.debug('iPad|Tablet|Portrait');
                $('body').trigger('ipadTabletPortrait');
                break;
            case 'iPad|Tablet|Landscape|Retina':
                webmd.debug('iPad|Tablet|Landscape|Retina');
                $('body').trigger('ipadTabletLandscapeRetina');
                break;
            case 'iPad|Tablet|Landscape':
                webmd.debug('iPad|Tablet|Landscape');
                $('body').trigger('ipadTabletLandscape');
                break;
            case 'iPad|Tablet|Portrait|Landscape|Retina':
                webmd.debug('iPad|Tablet|Portrait|Landscape|Retina');
                $('body').trigger('ipadTabletPortraitLandscapeRetina');
                break;
            case 'iPad|Tablet|Portrait|Landscape':
                webmd.debug('iPad|Tablet|Portrait|Landscape');
                $('body').trigger('ipadTabletPortraitLandscape');
                break;
            case 'Small Screen|Retina':
                webmd.debug('Small Screen|Retina');
                $('body').trigger('smallScreenRetina');
                break;
            case 'Small Screens':
                webmd.debug('Small Screens');
                $('body').trigger('smallScreens');
                break;
            case 'Smartphone|Portrait':
                webmd.debug('Smartphone|Portrait');
                $('body').trigger('smartphonePortrait');
                break;
            case 'Smartphone|Landscape':
                webmd.debug('Smartphone|Landscape');
                $('body').trigger('smartphoneLandscape');
                break;
            case 'Smartphone|Portrait|Landscape':
                webmd.debug('Smartphone|Portrait|Landscape');
                $('body').trigger('smartphonePortraitLandscape');
                break;
        }
    }

};

$(function() {
    webmd.responsive.init();
});
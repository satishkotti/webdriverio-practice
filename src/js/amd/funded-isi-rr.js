webmd.object.set('webmd.fundedEditorial.isiRR');

webmd.fundedEditorial.isiRR = {
	init : function(){
		if($('#isi-rr-as').length > 0){
			this.setUpAs();
		}
	},
	setUpAs : function(){
		var as,
			asSettings = {
				delay : 1500,
				id : 'isi-rr-as', /* isi_content class also gets this id */
				interval : 40,
				reset_position_on_load : true,
				reset_position_on_end : true,
				scroll_on_load : true
			};

		if(window.asOverrides){
			asSettings = $.extend({}, asSettings, window.asOverrides);
		}

		as = new Autoscroller(asSettings);
	}
}
$(function () {
	webmd.fundedEditorial.isiRR.init();
});
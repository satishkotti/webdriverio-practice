<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet exclude-result-prefixes="fo xs fn xdt" version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions" xmlns:xdt="http://www.w3.org/2005/xpath-datatypes">
	<xsl:output method="html"/>
	<xsl:param name="module_label_2">
		<xsl:for-each select="webmd_rendition/content/wbmd_asset/webmd_module/module_settings/md_pb_module_label2_group/wbmd_pb_module_label2">
			<xsl:value-of select="@wbmd_disp_nm"/><xsl:text> </xsl:text>
		</xsl:for-each>
	</xsl:param>

	<!-- ISI Type Param -->
	<xsl:param name="isi_type">
		<xsl:if test="$module_label_2 != ''">
			<xsl:choose>
				<xsl:when test="contains($module_label_2, 'Item 1')">
					<xsl:text>main</xsl:text>
				</xsl:when>
				<xsl:when test="contains($module_label_2, 'Item 2')">
					<xsl:text>fixed</xsl:text>
				</xsl:when>
				<xsl:when test="contains($module_label_2, 'Item 3')">
					<xsl:text>right</xsl:text>
				</xsl:when>
			</xsl:choose>
		</xsl:if>
	</xsl:param>

	<!-- ISI Auto Scroll Param -->
	<xsl:param name="isi_as">
		<xsl:if test="$module_label_2 != ''">
			<xsl:if test="contains($module_label_2, 'List')">
				<xsl:text>true</xsl:text>
			</xsl:if>
		</xsl:if>
	</xsl:param>

	<xsl:template match="/">
		<xsl:apply-templates select="//contentText"/>
	</xsl:template>

	<xsl:template match="contentText">

		<!-- ISI Main Position - Start -->
		<xsl:if test="$isi_type = 'main'">
			<div class="isi-main-content">
				<xsl:value-of select="." disable-output-escaping="yes"/>
			</div>
		</xsl:if>
		<!-- ISI Main Position - End -->


		<!-- ISI Right Rail Position - Start -->
		<xsl:if test="$isi_type = 'right'">
			<div class="isi-rr">
				<xsl:element name="div">
					<xsl:if test="$isi_as = 'true'">
						<xsl:attribute name="id"><xsl:text>isi-rr-as</xsl:text></xsl:attribute>
					</xsl:if>
					<xsl:attribute name="class"><xsl:text>isi-rr-content</xsl:text></xsl:attribute>
					<!-- Content -->
					<xsl:value-of select="." disable-output-escaping="yes"/>
				</xsl:element>
			</div>
			<xsl:if test="$isi_as = 'true'">
				<xsl:element name="script">
					<xsl:attribute name="type"><xsl:text>text/javascript</xsl:text></xsl:attribute>
					<xsl:attribute name="src"><xsl:text>http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/modules/icm/autoscroll.js</xsl:text></xsl:attribute>
				</xsl:element>
				<xsl:element name="script">
					<![CDATA[
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
					]]>
				</xsl:element>
			</xsl:if>
		</xsl:if>
		<!-- ISI Right Rail Position - End -->


		<!-- ISI Fixed Position - Start -->
		<xsl:if test="$isi_type = 'fixed'">
			<div class="isi">
				<div class="isi-btn">
					<a href="#" class="isi-toggle">
						<span class="isi-toggle-txt">Show <span>More</span></span>
						<i class="isi-toggle-arw icon-arrow-up"></i>
					</a>
				</div>
				<xsl:element name="div">
					<xsl:if test="$isi_as = 'true'">
					<xsl:attribute name="id"><xsl:text>isi-as</xsl:text></xsl:attribute>
					</xsl:if>
					<xsl:attribute name="class"><xsl:text>isi-container</xsl:text></xsl:attribute>
					<div class="isi-content">
						<xsl:value-of select="." disable-output-escaping="yes"/>
					</div>
				</xsl:element>
			</div>
			<xsl:if test="$isi_as = 'true'">
				<xsl:element name="script">
					<xsl:attribute name="type"><xsl:text>text/javascript</xsl:text></xsl:attribute>
					<xsl:attribute name="src"><xsl:text>http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/modules/icm/autoscroll.js</xsl:text></xsl:attribute>
				</xsl:element>
			</xsl:if>
			<xsl:element name="script">
				<![CDATA[
				// Waypoints
				!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s],l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var n in t){var r=t[n];for(var s in this.waypoints[n]){var a,l,h,p,u,c=this.waypoints[n][s],d=c.options.offset,f=c.triggerPoint,w=0,y=null==f;c.element!==c.element.window&&(w=c.adapter.offset()[r.offsetProp]),"function"==typeof d?d=d.apply(c):"string"==typeof d&&(d=parseFloat(d),c.options.offset.indexOf("%")>-1&&(d=Math.ceil(r.contextDimension*d/100))),a=r.contextScroll-r.contextOffset,c.triggerPoint=w+a-d,l=f<r.oldScroll,h=c.triggerPoint>=r.oldScroll,p=l&&h,u=!l&&!h,!y&&p?(c.queueTrigger(r.backward),o[c.group.id]=c.group):!y&&u?(c.queueTrigger(r.forward),o[c.group.id]=c.group):y&&r.oldScroll>=c.triggerPoint&&(c.queueTrigger(r.forward),o[c.group.id]=c.group)}}for(var g in o)o[g].flushTriggers();return this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();

				webmd.object.set('webmd.fundedEditorial.isi');
				webmd.fundedEditorial.isi = {
					init : function() {
						this.bindEvents();

						this.setIsiH();

						if($('#isi-as').length > 0){
							this.setUpAs();
						}

						// Hide when it is scrolled past ISI in the article
						if($('.isi-main-content').length > 0){
							this.scrollCloseIsi();
						}
					},

					bindEvents : function() {
						var _this = this;

						// Re Calc Min Height of ISI if window size changes
						$(window).resize(function(){
							var isi = $('.isi');

							if(!isi.hasClass('open')){
								$('.isi .isi-container').scrollTop(0);

								_this.setIsiH();

								if($('#isi-as').length > 0){
									//as = new Autoscroller(asSettings);
								}
							}
						});

						// Toggle button
						$('.isi-toggle').on('click', function(e){
							e.preventDefault();

							var isi = $('.isi'),
								isiArw = $('.isi-toggle-arw'),
								isiBtnTxt = $('.isi-toggle-txt span');

							if(isi.hasClass('open')){
								isi.removeClass('open');
								isiArw.removeClass('icon-arrow-down');
								isiBtnTxt.text('More');
								_this.closeIsi();
							} else {
								isi.addClass('open');
								isiArw.addClass('icon-arrow-down');
								isiBtnTxt.text('Less');
							}
						});
					},

					setIsiH : function() {
						var isiIntH = null;

						var device = webmd.useragent.getType();
							isiMinShwDeskPos = $('.isi .isi-min-show-desktop').position().top,
							isiMinShwMblPos = $('.isi .isi-min-show-mobile').position().top,
							isiBtnH = $('.isi .isi-btn').outerHeight(),
							isiContPadTop = parseInt($('.isi-container').css('padding-top')),
							isiMinH = null;

						if(device !== 'mobile'){
							isiMinH = isiMinShwDeskPos + isiBtnH + isiContPadTop;
						} else {
							isiMinH = isiMinShwMblPos + isiBtnH + isiContPadTop;
						}

						isiIntH = isiMinH;

						$('.isi').css('margin-top', -isiMinH);
					},

					closeIsi : function() {
						$('.isi').css('margin-top', -isiIntH);
					},

					scrollCloseIsi : function(){
						var isiHideName;

						if($('.isi-main-content .isi-min-show-mobile').length > 0 && webmd.useragent.ua.type === 'mobile'){
							isiHideName = $('.isi-main-content .isi-min-show-mobile');
						} else if ($('.isi-main-content .isi-min-show-desktop').length > 0 && webmd.useragent.ua.type !== 'mobile') {
							isiHideName = $('.isi-main-content .isi-min-show-desktop');
						} else {
							isiHideName = $('.isi-main-content');
						}
						var isiArtInView = new Waypoint({
							element: isiHideName,
							handler: function(direction) {
								if(direction == "up"){
									$('.isi').removeClass('hide open');
									$('.isi-toggle-arw').removeClass('icon-arrow-down');
									$('.isi-toggle-txt span').text('More');
								} else {
									$('.isi-container').scrollTop(0);
									$('.isi').addClass('hide');
								}
							},
							offset: '98%'
						});
					},

					setUpAs : function(){
						var as,
							asSettings = {
								delay : 1500,
								id : 'isi-as', /* isi_content class also gets this id */
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
					webmd.fundedEditorial.isi.init();
				});
				]]>
			</xsl:element>
		</xsl:if>
		<!-- ISI Fixed Position - End -->

	</xsl:template>
</xsl:stylesheet>
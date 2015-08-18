<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet exclude-result-prefixes="fo xs fn xdt" version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions" xmlns:xdt="http://www.w3.org/2005/xpath-datatypes">
	<xsl:output method="html"/>
	<xsl:param name="module_label_2">
		<xsl:value-of select="webmd_rendition/content/wbmd_asset/webmd_module/module_settings/md_pb_module_label2_group/wbmd_pb_module_label2/@wbmd_disp_nm" />
	</xsl:param>
	<xsl:template match="/">
		<xsl:apply-templates select="//contentText"/>
	</xsl:template>
	<xsl:template match="contentText">
		<div class="isi">
			<div class="isi-btn">
				<a href="#" class="isi-toggle">
					<span class="isi-toggle-txt">Show <span>More</span></span>
					<i class="isi-toggle-arw icon-arrow-up"></i>
				</a>
			</div>
			<xsl:element name="div">
				<xsl:if test="$module_label_2 = 'List'">
				<xsl:attribute name="id"><xsl:text>isi-as</xsl:text></xsl:attribute>
				</xsl:if>
				<xsl:attribute name="class"><xsl:text>isi-container</xsl:text></xsl:attribute>
				<div class="isi-content">
					<xsl:value-of select="." disable-output-escaping="yes"/>
				</div>
			</xsl:element>
		</div>
		<xsl:if test="$module_label_2 = 'List'">
			<xsl:element name="script">
				<xsl:attribute name="type"><xsl:text>text/javascript</xsl:text></xsl:attribute>
				<xsl:attribute name="src"><xsl:text>http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/modules/icm/autoscroll.js</xsl:text></xsl:attribute>
			</xsl:element>
		</xsl:if>
		<xsl:element name="script">
		<![CDATA[
		$(function () {
			(function(){
				var isiIntH = null,
					as,
					asSettings = {
						delay : 1500,
						id : 'isi-as', /* isi_content class also gets this id */
						interval : 40,
						reset_position_on_load : true,
						reset_position_on_end : true,
						scroll_on_load : true
					};

				// Set ISI Height
				function setIsiH() {
					var device = webmd.useragent.getType();
						isiMinShwDeskPos = $('.isi-min-show-desktop').position().top,
						isiMinShwMblPos = $('.isi-min-show-mobile').position().top,
						isiBtnH = $('.isi-btn').outerHeight(),
						isiContPadTop = parseInt($('.isi-container').css('padding-top')),
						isiMinH = null;

					if(device !== 'mobile'){
						isiMinH = isiMinShwDeskPos + isiBtnH + isiContPadTop;
					} else {
						isiMinH = isiMinShwMblPos + isiBtnH + isiContPadTop;
					}

					isiIntH = isiMinH;

					$('.isi').css('margin-top', -isiMinH);
				}

				// Close ISI to Original Height
				function closeIsi() {
					$('.isi').css('margin-top', -isiIntH);
				}

				// Set Min Height of ISI on Page Load
				setIsiH();

				// Set Up Auto Scroller
				if($('#isi-as').length > 0){
					as = new Autoscroller(asSettings);
				}

				// Re Calc Min Height of ISI if window size changes
				$(window).resize(function(){
					var isi = $('.isi');

					as.reset_scroller();

					if(!isi.hasClass('open')){
						setIsiH();

						if($('#isi-as').length > 0){
							as = new Autoscroller(asSettings);
						}
					}
				});

				// Toggle button
				$('.isi-toggle').on('click', function(e){
					var isi = $('.isi'),
						isiArw = $('.isi-toggle-arw'),
						isiBtnTxt = $('.isi-toggle-txt span');

					if(isi.hasClass('open')){
						isi.removeClass('open');
						isiArw.removeClass('icon-arrow-down');
						isiBtnTxt.text('More');
						closeIsi();
					} else {
						isi.addClass('open');
						isiArw.addClass('icon-arrow-down');
						isiBtnTxt.text('Less');
					}

					e.preventDefault();
				});
			})();
		});
		]]>
		</xsl:element>
	</xsl:template>
</xsl:stylesheet>
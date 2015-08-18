<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet exclude-result-prefixes="fo xs fn xdt" version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions" xmlns:xdt="http://www.w3.org/2005/xpath-datatypes">
    <xsl:output method="html"/>
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
			<div class="isi-container">
				<div class="isi-content">
					<xsl:value-of select="." disable-output-escaping="yes"/>
				</div>
			</div>
		</div>
		<xsl:element name="script">
		<![CDATA[
		$(function () {
			(function(){
				function setIsiH () {
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

					$('.isi').css('margin-top', -isiMinH);
				}

				// Set Min Height of ISI on Page Load
				setIsiH();

				// Re Calc Min Height of ISI if window size changes
				$(window).resize(function(){
					var isi = $('.isi');

					if(!isi.hasClass('open')){
						setIsiH();
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
						setIsiH();
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
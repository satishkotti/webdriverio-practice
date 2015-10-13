<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet exclude-result-prefixes="fo xs fn xdt" version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions" xmlns:xdt="http://www.w3.org/2005/xpath-datatypes">
	<xsl:output method="html"/>
	<xsl:template match="/">
		<xsl:apply-templates select="//contentText"/>
	</xsl:template>
	<xsl:template match="contentText">
		<div class="ed_disclaimer" data-metrics-module="disclaimer">
			<xsl:value-of select="." disable-output-escaping="yes"/>
		</div>
		<xsl:element name="script">
			<xsl:attribute name="type">
				<xsl:text>text/javascript</xsl:text>
			</xsl:attribute>
			<xsl:text>
				<![CDATA[try{addTitleBarCSS();}catch(e){}
					require(['tooltips/1/tooltips'],function(tooltip){
						$(function(){
							var platform = (webmd.useragent.ua.type === 'mobile') ? "mobile" : "core";
							if(platform == "mobile"){
								$(".ed_disclaimer a").webmdTooltip({
									ajax:true,
									content:{
										button:true
									},
									trigger:"click",
									position:{
										corner:{
											target:"bottom"
										}
									},
									api: {
										onShow: function(){
											wmdPageLink('disclaimer');
										}
									}
								});
							}else{
								$(".ed_disclaimer a").webmdTooltip({
									ajax:true,
									trigger:"click",
									position:{
										corner:{
											target:"bottom",
											tooltip:"left"
										}
									},
									api: {
										onShow: function(){
											wmdPageLink('disclaimer');
										}
									}
								});
							}
						});
					});]]>
			</xsl:text>
		</xsl:element>
	</xsl:template>
</xsl:stylesheet>








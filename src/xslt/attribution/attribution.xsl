<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<!-- Force the output to be strict XHTML -->
	<xsl:output method="xml" version="1.0" indent="yes" omit-xml-declaration="yes"></xsl:output>
	<xsl:param name="class_id"></xsl:param>
	<xsl:param name="image_server_url"></xsl:param>
	<xsl:param name="moduletitle"></xsl:param>
	<xsl:param name="site_id">1</xsl:param>
	<xsl:param name="domain"></xsl:param>
	<xsl:template match="/">
		<xsl:apply-templates select="webmd_rendition/content/wbmd_asset/webmd_module/module_data"></xsl:apply-templates>
	</xsl:template>
	<xsl:template match="module_data">
		<xsl:variable name="furl">
			<xsl:call-template name="GetURLRef">
				<xsl:with-param name="ObjectID">
					<xsl:value-of select="module_link/@chronic_id"></xsl:value-of>
				</xsl:with-param>
			</xsl:call-template>
		</xsl:variable>
		<div class="attrib_right_fmt">
			<div class="attrib_content">
				<div class="link_fmt">
					<xsl:value-of select="description" disable-output-escaping="yes"></xsl:value-of>
					<xsl:choose>
						<xsl:when test="$furl !=''">
							<a href="{$furl}">
								<xsl:attribute name="onclick">return sl(this,'
									<xsl:call-template name="GetLinkType">
										<xsl:with-param name="Value">
											<xsl:value-of select="module_link_view"></xsl:value-of>
										</xsl:with-param>
									</xsl:call-template>
									','
									<xsl:value-of select="$moduletitle"></xsl:value-of>
									');</xsl:attribute>
								<xsl:value-of select="title" disable-output-escaping="yes"></xsl:value-of>
							</a>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="title"></xsl:value-of>
						</xsl:otherwise>
					</xsl:choose>
					<xsl:call-template name="GetImg">
						<xsl:with-param name="src">
							<xsl:value-of select="$image_server_url"></xsl:value-of>
							<xsl:text>/</xsl:text>
							<xsl:value-of select="icon_image/@path"></xsl:value-of>
						</xsl:with-param>
						<xsl:with-param name="alt">
							<xsl:value-of select="icon_image/@alt"></xsl:value-of>
						</xsl:with-param>
					</xsl:call-template>
				</div>
			</div>
		</div>
		<!-- end small editorial-->
		<xsl:element name="script">
			<xsl:attribute name="type">
				<xsl:text>text/javascript</xsl:text>
			</xsl:attribute>
			<xsl:text disable-output-escaping="yes">
				<![CDATA[require(['tooltips/1/tooltips'], function(tooltip) {
					var platform = (webmd.useragent.ua.type === 'mobile') ? "mobile" : "core";
					var $attribLink = $(".attrib_right_fmt a");
					if ($attribLink.length) {
						$attribLink.attr("href", $attribLink.attr("href").replace(/\s/g, ''));
						if (platform == "mobile") {
							$attribLink.webmdTooltip({
								ajax:true,
								content:{
									button:true
								},
								trigger:"click",
								position:{
									corner:{
										target:"bottom",
										tooltip:"right"
									},
								adjust:{
									x:-20
								},
								api: {
									onShow: function(){
										wmdPageLink('attribution');
									}
								}
							}
						});
						} else {
							$attribLink.webmdTooltip({
								ajax:true,
								trigger:"click",
								position:{
									corner:{
										target:"bottom"
									}
								},
								api: {
									onShow: function(){
										wmdPageLink('attribution');
									}
								}
							});
						}
					}
				});]]>
			</xsl:text>
		</xsl:element>
	</xsl:template>
	<xsl:template name="GetURLRef">
		<xsl:param name="ObjectID"></xsl:param>
		<xsl:if test="(//referenced_objects/object[@chronic_id=$ObjectID and @pointer='0']/target/@friendlyurl) or (//referenced_objects/object[@chronic_id=$ObjectID and @pointer='1']/target/@friendlyurl)">
			<xsl:choose>
				<xsl:when test="//referenced_objects/object[@chronic_id=$ObjectID]//@pointer = '1'">
					<xsl:value-of select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target/@friendlyurl"></xsl:value-of>
				</xsl:when>
				<xsl:otherwise>http://
					<xsl:value-of select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target/@prefix[1]"></xsl:value-of>
					.
					<xsl:value-of select="$domain"></xsl:value-of>
					<xsl:value-of select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target/@friendlyurl[1]"></xsl:value-of>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:if>
	</xsl:template>
	<xsl:template name="GetLinkType">
		<xsl:param name="Value"></xsl:param>
		<xsl:choose>
			<xsl:when test="$Value = 'Window' or $Value = 'New Window – 1000x600'">nw</xsl:when>
			<xsl:when test="$Value = 'Pop Up' or $Value = 'Small Pop Up - 380x210'">sp</xsl:when>
			<xsl:when test="$Value = 'SDC Pop Up – 600x700'">sdp</xsl:when>
			<xsl:when test="$Value = 'Scrollable Pop Up – 530x490'">scp</xsl:when>
			<xsl:otherwise></xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="GetImg">
		<xsl:param name="src"></xsl:param>
		<xsl:param name="alt"></xsl:param>
		<img src="{$src}" alt="{$alt}" border="0"/>
	</xsl:template>
</xsl:stylesheet>








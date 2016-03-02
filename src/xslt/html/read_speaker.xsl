<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions" xmlns:xdt="http://www.w3.org/2005/xpath-datatypes">
	<xsl:output method="xml" version="1.0" omit-xml-declaration="yes" encoding="utf-8"></xsl:output>
	
	<xsl:param name="prefix">
		<xsl:text>www</xsl:text>
	</xsl:param>
	
	<xsl:param name="domain"></xsl:param>
	
	<xsl:param name="image_server_url">
		<xsl:text>http://img.preview.webmd.com/dtmcms/preview</xsl:text>
	</xsl:param>
	
	<xsl:param name="moduletitle">readspeaker</xsl:param>
	<!--
		$env = the environment for the current domain
		Will be an empty string for production environment, or a value like "perf." or "qa00." for other environments.
		Then the environment can be used in a URL such as "http://member.{ENV}webmd.com"
	-->
	<xsl:variable name="env">
		<xsl:choose>
			<xsl:when test="contains($domain, 'perf.')">perf.</xsl:when>
			<xsl:when test="contains($domain, 'qa00.')">qa00.</xsl:when>
			<xsl:when test="contains($domain, 'qa01.')">qa01.</xsl:when>
			<xsl:when test="contains($domain, 'qa02.')">qa02.</xsl:when>
			<xsl:otherwise></xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	
	<!--
		$lifecycle = the lifecycle for the current domain
		Will be an empty string for active lifecyle, or a value like "preview." or "staging." for other lifecycles.
		Then the lifecycle can be used in a URL such as "http://diabetes.{LIFECYCLE}{ENV}webmd.com"
		NOTE: typically we use relative URLs to handle the lifecyle, but adding this just in case we need it elsewhere.
	-->
	<xsl:variable name="lifecycle">
		<xsl:choose>
			<xsl:when test="contains($domain, 'preview.')">preview.</xsl:when>
			<xsl:when test="contains($domain, 'staging.')">staging.</xsl:when>
			<xsl:otherwise></xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	
	<xsl:template match="/">
		
		<xsl:element name="div">
			<xsl:attribute name="id">readspeaker_area</xsl:attribute>

			<xsl:element name="div">
				<xsl:attribute name="class">readspeaker_button1</xsl:attribute>
				
				<xsl:element name="a">
					<xsl:attribute name="accesskey">L</xsl:attribute>
					<xsl:attribute name="href">http://app.readspeaker.com/cgi-bin/rsent?customerid=5841&amp;lang=en_us&amp;readid=textArea</xsl:attribute>
					<xsl:attribute name="target">_blank</xsl:attribute>
					<xsl:attribute name="onclick">readpage(this.href, 'readspeaker_controls'); return false;</xsl:attribute>
					<xsl:attribute name="title">Listen to article content</xsl:attribute>
				</xsl:element>
			</xsl:element>

			<xsl:element name="div">
				<xsl:attribute name="id">readspeaker_controls</xsl:attribute>
			</xsl:element>

			<xsl:element name="script">
				<xsl:attribute name="type">text/javascript</xsl:attribute>
				<xsl:text disable-output-escaping="yes"><![CDATA[
				$(function(){
					if (($('#textArea').length > 0) && (webmd.useragent.ua.type !== "mobile")) {
						require(['http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/javascript/readspeaker/en.js'], function(){
							$('#readspeaker_area').show();
							webmd.readspeakerPrep.init({
							]]></xsl:text>
				<xsl:apply-templates select="//contentText"></xsl:apply-templates>
				<xsl:text><![CDATA[
							});
						});
					}
				});
				]]></xsl:text>
			</xsl:element>

		</xsl:element>
			
	</xsl:template>
	
	<xsl:template match="contentText">
		
		<!-- Replace the {IMAGE_SERVER_URL} token -->
		<xsl:variable name="out1">
			<xsl:call-template name="ReplaceParams">
				<xsl:with-param name="orig_text">
					<xsl:value-of select="." disable-output-escaping="yes"></xsl:value-of>
				</xsl:with-param>
				<xsl:with-param name="param_to_replace">
					<xsl:text disable-output-escaping="yes">{IMAGE_SERVER_URL}</xsl:text>
				</xsl:with-param>
				<xsl:with-param name="param_value">
					<xsl:value-of select="$image_server_url"></xsl:value-of>
				</xsl:with-param>
			</xsl:call-template>
		</xsl:variable>
		
		<!-- Replace the {BASE_URL} token -->
		<xsl:variable name="out2">
			<xsl:call-template name="ReplaceParams">
				<xsl:with-param name="orig_text">
					<xsl:value-of select="$out1" disable-output-escaping="yes"></xsl:value-of>
				</xsl:with-param>
				<xsl:with-param name="param_to_replace">
					<xsl:text disable-output-escaping="yes">{BASE_URL}</xsl:text>
				</xsl:with-param>
				<xsl:with-param name="param_value">
					<xsl:text>http://</xsl:text>
					<xsl:value-of select="$prefix"></xsl:value-of>
					<xsl:text>.</xsl:text>
					<xsl:value-of select="$domain"></xsl:value-of>
				</xsl:with-param>
			</xsl:call-template>
		</xsl:variable>
		
		<!-- Replace the {ENV} token -->
		<xsl:variable name="out3">
			<xsl:call-template name="ReplaceParams">
				<xsl:with-param name="orig_text">
					<xsl:value-of select="$out2" disable-output-escaping="yes"></xsl:value-of>
				</xsl:with-param>
				<xsl:with-param name="param_to_replace">
					<xsl:text disable-output-escaping="yes">{ENV}</xsl:text>
				</xsl:with-param>
				<xsl:with-param name="param_value">
					<xsl:value-of select="$env"></xsl:value-of>
				</xsl:with-param>
			</xsl:call-template>
		</xsl:variable>
		
		<!-- Replace the {LIEFCYCLE} token -->
		<xsl:variable name="out4">
			<xsl:call-template name="ReplaceParams">
				<xsl:with-param name="orig_text">
					<xsl:value-of select="$out3" disable-output-escaping="yes"></xsl:value-of>
				</xsl:with-param>
				<xsl:with-param name="param_to_replace">
					<xsl:text disable-output-escaping="yes">{LIFECYCLE}</xsl:text>
				</xsl:with-param>
				<xsl:with-param name="param_value">
					<xsl:value-of select="$lifecycle"></xsl:value-of>
				</xsl:with-param>
			</xsl:call-template>
		</xsl:variable>
		
		<!-- Output the result -->
		<xsl:value-of select="$out4" disable-output-escaping="yes"></xsl:value-of>
		
	</xsl:template>
	
	<xsl:template name="ReplaceParams">
		<xsl:param name="orig_text"></xsl:param>
		<xsl:param name="parsed_text"></xsl:param>
		<xsl:param name="param_to_replace"></xsl:param>
		<xsl:param name="param_value"></xsl:param>
		<xsl:choose>
			<xsl:when test="$orig_text != ''">
				<xsl:choose>
					<xsl:when test="contains($orig_text, $param_to_replace)">
						<xsl:call-template name="ReplaceParams">
							<xsl:with-param name="orig_text">
								<xsl:value-of select="substring-after($orig_text, $param_to_replace)" disable-output-escaping="yes"></xsl:value-of>
							</xsl:with-param>
							<xsl:with-param name="parsed_text">
								<xsl:value-of select="$parsed_text" disable-output-escaping="yes"></xsl:value-of>
								<xsl:value-of select="substring-before($orig_text, $param_to_replace)" disable-output-escaping="yes"></xsl:value-of>
								<xsl:value-of select="$param_value" disable-output-escaping="yes"></xsl:value-of>
							</xsl:with-param>
							<xsl:with-param name="param_to_replace">
								<xsl:value-of select="$param_to_replace"></xsl:value-of>
							</xsl:with-param>
							<xsl:with-param name="param_value">
								<xsl:value-of select="$param_value"></xsl:value-of>
							</xsl:with-param>
						</xsl:call-template>
					</xsl:when>
					<xsl:otherwise>
						<xsl:call-template name="ReplaceParams">
							<xsl:with-param name="orig_text"></xsl:with-param>
							<xsl:with-param name="parsed_text">
								<xsl:value-of select="concat($parsed_text, $orig_text)" disable-output-escaping="yes"></xsl:value-of>
							</xsl:with-param>
							<xsl:with-param name="param_to_replace">
								<xsl:value-of select="$param_to_replace"></xsl:value-of>
							</xsl:with-param>
							<xsl:with-param name="param_value">
								<xsl:value-of select="$param_value"></xsl:value-of>
							</xsl:with-param>
						</xsl:call-template>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:when test="$orig_text = ''">
				<xsl:value-of select="$parsed_text" disable-output-escaping="yes"></xsl:value-of>
			</xsl:when>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>















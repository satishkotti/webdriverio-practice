<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<!-- Force the output to be strict XHTML -->
	<xsl:output method="xml" omit-xml-declaration="yes" indent="yes"/>
	<xsl:param name="class_id"/>
	<xsl:param name="image_server_url"/>
	<xsl:param name="moduletitle"/>
	<xsl:param name="site_id">3</xsl:param>
	<xsl:param name="domain"/>
	<xsl:template match="/">
		<xsl:apply-templates select="webmd_rendition/content/wbmd_asset/webmd_module/module_data"/>
	</xsl:template>
	<xsl:template match="module_data">
		<div class="isi-rr-links">
			<ul>
				<xsl:apply-templates select="links/link"/>
			</ul>
		</div>
	</xsl:template>

	<xsl:template match="links/link">
		<xsl:element name="li">
			<xsl:variable name="furl">
				<xsl:call-template name="GetURLRef">
					<xsl:with-param name="ObjectID">
						<xsl:value-of select="link_link/@chronic_id"/>
					</xsl:with-param>
				</xsl:call-template>
			</xsl:variable>

			<xsl:choose>
				<xsl:when test="$furl !=''">
					<a href="{$furl}">
						<xsl:value-of select="link_text" disable-output-escaping="yes"/>
					</a>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="link_text" disable-output-escaping="yes"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:element>
	</xsl:template>

	<xsl:template name="GetURLRef">
		<xsl:param name="ObjectID"/>
		<xsl:if test="(//referenced_objects/object[@chronic_id=$ObjectID and @pointer='0']/target[@siteid=$site_id]/@friendlyurl) or (//referenced_objects/object[@chronic_id=$ObjectID and @pointer='1']/target/@friendlyurl)">
			<xsl:choose>
				<xsl:when test="//referenced_objects/object[@chronic_id=$ObjectID]//@pointer = '1'">
					<xsl:value-of select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target/@friendlyurl"/>
				</xsl:when>
				<xsl:otherwise>http://<xsl:value-of select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target[@siteid=$site_id]/@prefix[1]"/>.<xsl:value-of select="$domain"/>
					<xsl:value-of select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target[@siteid=$site_id]/@friendlyurl[1]"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:if>
	</xsl:template>
</xsl:stylesheet>


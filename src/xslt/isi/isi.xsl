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
				<xsl:when test="contains($module_label_2, 'Middle')">
					<xsl:text>main</xsl:text>
				</xsl:when>
				<xsl:when test="contains($module_label_2, 'Right')">
					<xsl:text>right</xsl:text>
				</xsl:when>
				<xsl:when test="contains($module_label_2, 'Bottom')">
					<xsl:text>fixed</xsl:text>
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
				<a id="isi-cw" class="faux-top"></a>
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
					<![CDATA[require(["funded-editorial/1/funded-isi-rr"]);]]>
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
				<![CDATA[require(["funded-editorial/1/funded-isi"]);]]>
			</xsl:element>
		</xsl:if>
		<!-- ISI Fixed Position - End -->

	</xsl:template>
</xsl:stylesheet>
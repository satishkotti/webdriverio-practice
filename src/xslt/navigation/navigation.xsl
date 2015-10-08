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

    <xsl:template match="/">
        <xsl:element name="div">
            <xsl:attribute name="class">
                <xsl:text>article-nav-container</xsl:text>
            </xsl:attribute>
            <xsl:attribute name="data-metrics-module">
                <xsl:value-of select="webmd_rendition/content/wbmd_asset/webmd_module/module_settings/title"></xsl:value-of>
            </xsl:attribute>
        </xsl:element>
        <xsl:element name="script">
        <![CDATA[require(["funded-editorial/1/funded-navigation"]);]]>
        </xsl:element>
    </xsl:template>

</xsl:stylesheet>

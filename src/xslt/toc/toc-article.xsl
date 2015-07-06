<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!-- Force the output to be strict XHTML -->
    <xsl:output method="html" omit-xml-declaration="yes" indent="yes"></xsl:output>
    <xsl:param name="class_id"></xsl:param>
    <xsl:param name="image_server_url">
        <xsl:text>http://img.preview.webmd.com/dtmcms/preview</xsl:text>
    </xsl:param>
    <xsl:param name="moduletitle">test</xsl:param>
    <xsl:param name="site_id">3</xsl:param>
    <xsl:param name="domain">webmd.com</xsl:param>

    <xsl:template match="/">
        <xsl:apply-templates select="webmd_rendition/content/wbmd_asset/webmd_module/module_data"></xsl:apply-templates>
    </xsl:template>
    
    <!-- TOC Article Template -->
    <xsl:template name="articleTemplate">
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="module_data">
        <xsl:for-each select="links/link">
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:text>wbmd-grid-item</xsl:text>
                </xsl:attribute>
                <xsl:attribute name="data-article-num">
                    <xsl:apply-templates select="link_text"/>
                </xsl:attribute>
                <xsl:comment><xsl:text>Article Unit</xsl:text></xsl:comment>
            </xsl:element>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>

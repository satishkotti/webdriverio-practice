<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!-- Force the output to be strict XHTML -->
    <xsl:output method="html" omit-xml-declaration="yes" indent="yes"/>
    <xsl:param name="class_id"/>
    <xsl:param name="image_server_url">
        <xsl:text>http://img.preview.webmd.com/dtmcms/preview</xsl:text>
    </xsl:param>
    <xsl:param name="moduletitle">test</xsl:param>
    <xsl:param name="site_id">3</xsl:param>
    <xsl:param name="domain">webmd.com</xsl:param>

    <xsl:variable name="max-header-length" select="55"/>
    <xsl:variable name="max-text-length" select="200"/>
    
    <xsl:template match="/">
        <xsl:apply-templates select="webmd_rendition/content/wbmd_asset/webmd_module/module_data" />
    </xsl:template>

    <xsl:template match="module_data">
        <xsl:element name="div">
            <xsl:attribute name="class">
                <xsl:text>wbmd-menutab</xsl:text>
            </xsl:attribute>
            
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:text>wbmd-navbar</xsl:text>
                </xsl:attribute>
                <xsl:attribute name="style">
                    <xsl:text>background-color: </xsl:text>
                    <xsl:choose>
                        <xsl:when test="module_title != ''">
                            <xsl:value-of select="module_title"></xsl:value-of>
                            <xsl:text>;</xsl:text>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:text>#1b88bf;</xsl:text>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:attribute>
                <xsl:element name="div">
                    <xsl:attribute name="style">
                        <xsl:text>background-color: </xsl:text>
                        <xsl:choose>
                            <xsl:when test="module_title != ''">
                                <xsl:value-of select="module_title"></xsl:value-of>
                                <xsl:text>;</xsl:text>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:text>#1b88bf;</xsl:text>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>
                    <xsl:element name="a">
                        <xsl:attribute name="id">
                            <xsl:text>wbmd-panel-link</xsl:text>
                        </xsl:attribute>
                        <xsl:text>MENU</xsl:text>
                    </xsl:element>
                </xsl:element>
            </xsl:element>
        </xsl:element>

        <xsl:element name="script">
            <xsl:text disable-output-escaping="yes">
                <![CDATA[require(["funded-editorial/1/funded-menutab"]);]]>
            </xsl:text>
        </xsl:element>
    </xsl:template>
</xsl:stylesheet>

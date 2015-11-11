<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!-- Force the output to be strict XHTML -->
    <xsl:output method="html" omit-xml-declaration="yes" indent="yes"></xsl:output>
    <xsl:param name="class_id"></xsl:param>
    <xsl:param name="image_server_url">
        <xsl:text>http://img.preview.webmd.com/dtmcms/preview</xsl:text>
    </xsl:param>
    <xsl:param name="moduletitle">lln-rspsvalsoin</xsl:param>
    <xsl:param name="site_id">3</xsl:param>
    <xsl:param name="domain">webmd.com</xsl:param>
    
    <xsl:param name="data_metrics_module">
        <xsl:value-of select="/webmd_rendition/content/wbmd_asset/webmd_module/module_settings/title"/>
    </xsl:param>
    
    <xsl:param name="full_length">
        <xsl:value-of select="count(/webmd_rendition/content/wbmd_asset/webmd_module/module_data/links/link)"/>
    </xsl:param>
    
    <xsl:param name="show_output_length">
        <xsl:choose>
            <xsl:when test="($full_length mod 3 = 2)">
                <xsl:value-of select="$full_length - 2"/>
            </xsl:when>
            <xsl:when test="($full_length mod 3 = 1)">
                <xsl:value-of select="$full_length - 1"/>
            </xsl:when>
            <xsl:when test="($full_length mod 3 = 0)">
                <xsl:value-of select="$full_length"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:text>0</xsl:text>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:param>
    
    <xsl:template match="/">
        <xsl:apply-templates select="/webmd_rendition/content/wbmd_asset/webmd_module/module_data"/>
    </xsl:template>
    <xsl:template match="module_data">
        <xsl:variable name="label">
            <xsl:value-of select="descriptions/description/description_text"/>
        </xsl:variable>
        
        <xsl:if test="$show_output_length > 0">
            <xsl:element name="h4">
                <xsl:attribute name="class">
                    <xsl:text>wbmd-moreabout-label</xsl:text>
                </xsl:attribute>
                <xsl:choose>
                    <xsl:when test="$label != ''">
                        <xsl:value-of select="$label"></xsl:value-of>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text><![CDATA[From WebMD]]></xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:element>
            
            <xsl:element name="h3">
                <xsl:attribute name="class">
                    <xsl:text>wbmd-moreabout-title</xsl:text>
                </xsl:attribute>
                <xsl:apply-templates select="module_title" />
            </xsl:element>
            
            <xsl:for-each select="links/link">
                <xsl:variable name="i" select="position()"/>
                <xsl:if test="number($i) &lt;= number($show_output_length)">
                    <xsl:element name="div">
                        <xsl:attribute name="class">
                            <xsl:text>wbmd-moreabout-grid-item</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name="data-metrics-module">
                            <xsl:value-of select="$data_metrics_module"></xsl:value-of>
                        </xsl:attribute>
                        <xsl:attribute name="data-article-num">
                            <xsl:apply-templates select="link_text" />
                        </xsl:attribute>
                        <xsl:element name="a">
                            <xsl:attribute name="data-metrics-link">
                                <xsl:value-of select="$i"></xsl:value-of>
                            </xsl:attribute>
                            <xsl:element name="img"></xsl:element>
                            <xsl:element name="p">
                                <xsl:element name="span"></xsl:element>
                            </xsl:element>
                        </xsl:element>
                    </xsl:element>
                </xsl:if>
            </xsl:for-each>
            
            <xsl:element name="script">
                <![CDATA[require(["funded-editorial/1/funded-more-about"]);]]>
            </xsl:element>
        </xsl:if>
    </xsl:template>  
</xsl:stylesheet>
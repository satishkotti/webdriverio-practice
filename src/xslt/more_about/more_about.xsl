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
    
    <xsl:template match="module_data">
        <xsl:variable name="full_length" select="count(links/link)"/>
        
        <xsl:choose>
            <xsl:when test="($full_length mod 3 = 2)">
                <xsl:call-template name="showOutput">
                    <xsl:with-param name="length"><xsl:value-of select="$full_length - 2"/></xsl:with-param>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="($full_length mod 3 = 1)">
                <xsl:call-template name="showOutput">
                    <xsl:with-param name="length"><xsl:value-of select="$full_length - 1"/></xsl:with-param>
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:call-template name="showOutput">
                    <xsl:with-param name="length"><xsl:value-of select="$full_length"/></xsl:with-param>
                </xsl:call-template>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <xsl:template name="showOutput">
        <xsl:param name="length"/>
        
        <xsl:if test="$length > 0">
            <xsl:element name="h3">
                <xsl:attribute name="class">
                    <xsl:text>wbmd-moreabout-title</xsl:text>
                </xsl:attribute>
                <xsl:apply-templates select="module_title" />
            </xsl:element>
            
            <xsl:for-each select="links/link">
                <xsl:variable name="i" select="position()"/>
                <xsl:if test="number($i) &lt;= number($length)">
                    <xsl:element name="div">
                        <xsl:attribute name="class">
                            <xsl:text>wbmd-moreabout-grid-item</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name="data-article-num">
                            <xsl:apply-templates select="link_text" />
                        </xsl:attribute>
                        <xsl:comment><xsl:text>Article Unit</xsl:text></xsl:comment>
                    </xsl:element>
                </xsl:if>
            </xsl:for-each>
            
            <xsl:element name="script">
                <![CDATA[require(["funded/1/funded-more-about.min"]);]]>
            </xsl:element>
        </xsl:if>
    </xsl:template>   
</xsl:stylesheet>
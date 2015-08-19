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
                <xsl:text>wbmd-tips</xsl:text>
            </xsl:attribute>
            
            <xsl:element name="ul">
                <xsl:attribute name="id">tips_slides</xsl:attribute>
            
                <xsl:for-each select="links/link">
                    <xsl:variable name="header" select="normalize-space(link_text)" />
                    <xsl:variable name="text" select="normalize-space(action_text)" />
                    <xsl:variable name="href">
                        <xsl:call-template name="GetURLRef">
                            <xsl:with-param name="ObjectID">
                                <xsl:value-of select="link_url/@chronic_id"></xsl:value-of>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:variable>
                    
                    <xsl:if test="(($header != '') and ($text != ''))">
                        <xsl:element name="li">
                            <xsl:attribute name="class">
                                <xsl:text>slide</xsl:text>
                            </xsl:attribute>
                            
                            <xsl:element name="div">
                                <xsl:attribute name="class">
                                    <xsl:text>slide_content</xsl:text>
                                </xsl:attribute>
                                
                                <xsl:element name="div">
                                    <xsl:attribute name="class">
                                        <xsl:text>slide_media</xsl:text>
                                    </xsl:attribute>
                                
                                    <xsl:element name="div">
                                        <xsl:attribute name="class">
                                            <xsl:text>slide_controls</xsl:text>
                                        </xsl:attribute>
                                        
                                        <xsl:element name="ul">
                                            <xsl:element name="li">
                                                <xsl:element name="a">
                                                    <xsl:attribute name="href">#</xsl:attribute>
                                                    <xsl:attribute name="class">tips_prev</xsl:attribute>
                                                    <xsl:element name="span">
                                                        <xsl:attribute name="class">icon-arrow-left</xsl:attribute>
                                                    </xsl:element>
                                                </xsl:element>
                                            </xsl:element>
                                            <xsl:element name="li">
                                                <xsl:element name="a">
                                                    <xsl:attribute name="href">#</xsl:attribute>
                                                    <xsl:attribute name="class">tips_next</xsl:attribute>
                                                    <xsl:element name="span">
                                                        <xsl:attribute name="class">icon-arrow-right</xsl:attribute>
                                                    </xsl:element>
                                                </xsl:element>
                                            </xsl:element>
                                        </xsl:element>
                                    </xsl:element>
                                </xsl:element>
                            
                                <xsl:element name="div">
                                    <xsl:attribute name="class">
                                        <xsl:text>slide_text</xsl:text>
                                    </xsl:attribute>
                                    
                                    <xsl:element name="h3">
                                        <xsl:value-of select="substring($header, 1, $max-header-length)" disable-output-escaping="yes"/>
                                    </xsl:element>
                                    
                                    <xsl:element name="div">
                                        <xsl:choose>
                                            <xsl:when test="string-length($text) &gt; $max-text-length">
                                                <xsl:value-of select="substring($text, 1, ($max-text-length - 3))" disable-output-escaping="yes"/>
                                                <xsl:text>...</xsl:text>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <xsl:value-of select="substring($text, 1, $max-text-length)" disable-output-escaping="yes"/>
                                            </xsl:otherwise>
                                        </xsl:choose>
                                    </xsl:element>
                                    
                                    <xsl:if test="$href != ''">
                                        <xsl:element name="a">
                                            <xsl:attribute name="href">
                                                <xsl:value-of select="$href"></xsl:value-of>
                                            </xsl:attribute>
                                            <xsl:text>Read More</xsl:text>
                                        </xsl:element>
                                    </xsl:if>
                                </xsl:element>
                            </xsl:element>
                        </xsl:element>
                    </xsl:if>
                </xsl:for-each>
            </xsl:element>
        </xsl:element>

        <xsl:element name="script">
            <xsl:text disable-output-escaping="yes">
                <![CDATA[
                    $(window).load(function() {
                        require(['funded-editorial/1/funded-tips'], function(tips) {
                            tips.init();
                        });
                    });
                ]]>
            </xsl:text>
        </xsl:element>
    </xsl:template>
    
    <xsl:template name="GetURLRef">
        <xsl:param name="ObjectID"></xsl:param>
        <xsl:if test="(//referenced_objects/object[@chronic_id=$ObjectID and @pointer='0']/target[@siteid=$site_id]/@friendlyurl) or (//referenced_objects/object[@chronic_id=$ObjectID and @pointer='1']/target/@friendlyurl)">
            <xsl:choose>
                <xsl:when test="//referenced_objects/object[@chronic_id=$ObjectID]//@pointer = '1'">
                    <xsl:value-of select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target/@friendlyurl"></xsl:value-of>
                </xsl:when>
                <xsl:otherwise>http://<xsl:value-of select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target[@siteid=$site_id]/@prefix[1]"></xsl:value-of>.<xsl:value-of select="$domain"></xsl:value-of>
                    <xsl:value-of select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target[@siteid=$site_id]/@friendlyurl[1]"></xsl:value-of>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:if>
    </xsl:template>
</xsl:stylesheet>

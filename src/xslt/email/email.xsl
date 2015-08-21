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
        <xsl:variable name="headline"></xsl:variable>
        <xsl:variable name="href">
            <xsl:call-template name="GetURLRef">
                <xsl:with-param name="ObjectID">
                    <xsl:value-of select="link_url/@chronic_id"></xsl:value-of>
                </xsl:with-param>
            </xsl:call-template>
        </xsl:variable>
        
        <xsl:element name="div">
            <xsl:attribute name="class">
                <xsl:text>wbmd-restricted-email</xsl:text>
            </xsl:attribute>
            
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:text>title</xsl:text>
                </xsl:attribute>
                <xsl:choose>
                    <xsl:when test="(module_title != '')">
                        <xsl:value-of select="module_title"></xsl:value-of>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text><![CDATA[Raincheck!]]></xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:element>
            
            <xsl:for-each select="links/link">
                <xsl:variable name="index" select="position()" />
                <xsl:variable name="message" select="normalize-space(link_text)" />
                <xsl:if test="$index = '1'">
                    <xsl:element name="div">
                        <xsl:attribute name="class">
                            <xsl:text>message</xsl:text>
                        </xsl:attribute>
                        <xsl:choose>
                            <xsl:when test="link_text != ''">
                                <xsl:value-of select="$message"></xsl:value-of>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:text><![CDATA[This information is restricted on mobile devices but can be viewed on a computer or tablet.]]></xsl:text>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:element>
                </xsl:if>
            </xsl:for-each>
            
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:text>info</xsl:text>
                </xsl:attribute>
                <xsl:value-of select="concat('Get a one-time reminder email to read ', $headline, ' later.')"></xsl:value-of>
            </xsl:element>
            
            <xsl:element name="form">
                <xsl:attribute name="method">
                    <xsl:text>post</xsl:text>                      
                </xsl:attribute>
                <xsl:element name="input">
                    <xsl:attribute name="type">
                        <xsl:text>email</xsl:text>                      
                    </xsl:attribute>
                    <xsl:attribute name="placeholder">
                        <xsl:text>Enter Your Email Address</xsl:text>
                    </xsl:attribute>
                </xsl:element>
                <xsl:element name="input">
                    <xsl:attribute name="type">
                        <xsl:text>submit</xsl:text>                      
                    </xsl:attribute>
                    <xsl:attribute name="name">
                        <xsl:text>submit</xsl:text>                      
                    </xsl:attribute>
                    <xsl:attribute name="placeholder">
                        <xsl:text>Send</xsl:text>
                    </xsl:attribute>
                </xsl:element>
            </xsl:element>
        </xsl:element>
        
        <xsl:element name="script">
            <xsl:text disable-output-escaping="yes">
                <![CDATA[require(["funded-editorial/1/funded-restricted-email"]);]]>
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

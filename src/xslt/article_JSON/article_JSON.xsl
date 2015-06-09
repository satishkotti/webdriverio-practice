<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!-- Force the output to be strict XHTML -->
    <xsl:output method="xml" omit-xml-declaration="yes" indent="yes"></xsl:output>
    <xsl:param name="class_id"></xsl:param>
    <xsl:param name="image_server_url">
        <xsl:text>http://img.preview.webmd.com/dtmcms/preview</xsl:text>
    </xsl:param>
    <xsl:param name="moduletitle"></xsl:param>
    <xsl:param name="site_id">3</xsl:param>
    <xsl:param name="domain">webmd.com</xsl:param>
    <xsl:template match="/">
        <xsl:apply-templates select="webmd_rendition/content/wbmd_asset/webmd_module/module_data"></xsl:apply-templates>
    </xsl:template>
    <xsl:template match="module_data">

        <xsl:element name="script">
        <![CDATA[var article_data = {
            articles : []]>
                <xsl:for-each select="links/link">
                    <xsl:variable name="href">
                        <xsl:call-template name="GetURLRef">
                            <xsl:with-param name="ObjectID">
                                <xsl:value-of select="link_url/@chronic_id"></xsl:value-of>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:variable>
                    <xsl:variable name="position">
                        <xsl:value-of select="position()"></xsl:value-of>
                    </xsl:variable>
                    <![CDATA[{]]>
                        <![CDATA["id" :]]> <xsl:value-of select="position()"/><![CDATA[,]]>
                        <![CDATA["article" : {]]>
                            <![CDATA["title" : "]]><xsl:choose>
                                <xsl:when test="substring-before(substring-after(link_text, ' ['), ']')">
                                    <xsl:value-of select="substring-before(link_text,' [')"/>
                                </xsl:when>
                                <xsl:when test="substring-before(substring-after(link_text, '['), ']')">
                                    <xsl:value-of select="substring-before(link_text,'[')"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="link_text"/>
                                </xsl:otherwise>
                            </xsl:choose><![CDATA[",]]>
                            <![CDATA["description" : "]]><xsl:value-of select="action_text" disable-output-escaping="yes"></xsl:value-of><![CDATA[",]]>
                            <![CDATA["link" : "]]><xsl:value-of select="$href"></xsl:value-of><![CDATA[",]]>
                            <![CDATA["image" : "]]><xsl:value-of select="$image_server_url"></xsl:value-of><xsl:value-of select="link_source_icon/@path"></xsl:value-of><![CDATA["]]>
                        <![CDATA[},]]>
                        <![CDATA["type" : "]]><xsl:choose>
                                <xsl:when test="substring-before(substring-after(link_text, ' ['), ']')">
                                    <xsl:text>sponsor</xsl:text>
                                </xsl:when>
                                <xsl:when test="substring-before(substring-after(link_text, '['), ']')">
                                    <xsl:text>sponsor</xsl:text>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:text>normal</xsl:text>
                                </xsl:otherwise>
                            </xsl:choose><![CDATA["]]>
                    <![CDATA[}]]><xsl:if test="position()!=last()"><xsl:text>,</xsl:text></xsl:if>
                </xsl:for-each>
            <![CDATA[]
        };]]>
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
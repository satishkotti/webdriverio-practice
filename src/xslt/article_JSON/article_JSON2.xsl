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
                                    <xsl:value-of select="normalize-space(substring-before(link_text,' ['))"/>
                                </xsl:when>
                                <xsl:when test="substring-before(substring-after(link_text, '['), ']')">
                                    <xsl:value-of select="normalize-space(substring-before(link_text,'['))"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="normalize-space(link_text)"/>
                                </xsl:otherwise>
                            </xsl:choose><![CDATA[",]]>
                            <![CDATA["description" : "]]><xsl:value-of select="normalize-space(action_text)" disable-output-escaping="yes"></xsl:value-of><![CDATA[",]]>
                            <![CDATA["link" : "]]><xsl:value-of select="$href"></xsl:value-of><![CDATA[",]]>
                            <![CDATA["images" : {]]>
                                <![CDATA["image650x350" : "]]><xsl:value-of select="$image_server_url"/><xsl:value-of select="link_source_icon/@path"/><![CDATA[",]]>
                                <![CDATA["image493x335" : "]]><xsl:call-template name="getImgPath"><xsl:with-param name="path"><xsl:value-of select="link_source_icon/@path"/></xsl:with-param><xsl:with-param name="width">493</xsl:with-param><xsl:with-param name="height">335</xsl:with-param></xsl:call-template><![CDATA[",]]>
                                <![CDATA["image375x321" : "]]><xsl:call-template name="getImgPath"><xsl:with-param name="path"><xsl:value-of select="link_source_icon/@path"/></xsl:with-param><xsl:with-param name="width">375</xsl:with-param><xsl:with-param name="height">321</xsl:with-param></xsl:call-template><![CDATA[",]]>
                                <![CDATA["image280x190" : "]]><xsl:call-template name="getImgPath"><xsl:with-param name="path"><xsl:value-of select="link_source_icon/@path"/></xsl:with-param><xsl:with-param name="width">280</xsl:with-param><xsl:with-param name="height">190</xsl:with-param></xsl:call-template><![CDATA[",]]>
                                <![CDATA["image210x130" : "]]><xsl:call-template name="getImgPath"><xsl:with-param name="path"><xsl:value-of select="link_source_icon/@path"/></xsl:with-param><xsl:with-param name="width">210</xsl:with-param><xsl:with-param name="height">130</xsl:with-param></xsl:call-template><![CDATA[",]]>
                                <![CDATA["image198x134" : "]]><xsl:call-template name="getImgPath"><xsl:with-param name="path"><xsl:value-of select="link_source_icon/@path"/></xsl:with-param><xsl:with-param name="width">198</xsl:with-param><xsl:with-param name="height">134</xsl:with-param></xsl:call-template><![CDATA[",]]>
                                <![CDATA["image127x72" : "]]><xsl:call-template name="getImgPath"><xsl:with-param name="path"><xsl:value-of select="link_source_icon/@path"/></xsl:with-param><xsl:with-param name="width">127</xsl:with-param><xsl:with-param name="height">72</xsl:with-param></xsl:call-template><![CDATA[",]]>
                                <![CDATA["image156x150" : "]]><xsl:call-template name="getImgPath"><xsl:with-param name="path"><xsl:value-of select="link_source_icon/@path"/></xsl:with-param><xsl:with-param name="width">156</xsl:with-param><xsl:with-param name="height">150</xsl:with-param></xsl:call-template><![CDATA[",]]>
                                <![CDATA["image110x70" : "]]><xsl:call-template name="getImgPath"><xsl:with-param name="path"><xsl:value-of select="link_source_icon/@path"/></xsl:with-param><xsl:with-param name="width">110</xsl:with-param><xsl:with-param name="height">70</xsl:with-param></xsl:call-template><![CDATA[",]]>
                                <![CDATA["image79x79" : "]]><xsl:call-template name="getImgPath"><xsl:with-param name="path"><xsl:value-of select="link_source_icon/@path"/></xsl:with-param><xsl:with-param name="width">79</xsl:with-param><xsl:with-param name="height">79</xsl:with-param></xsl:call-template><![CDATA[",]]>
                                <![CDATA["image69x75" : "]]><xsl:call-template name="getImgPath"><xsl:with-param name="path"><xsl:value-of select="link_source_icon/@path"/></xsl:with-param><xsl:with-param name="width">69</xsl:with-param><xsl:with-param name="height">75</xsl:with-param></xsl:call-template><![CDATA[",]]>
                                <![CDATA["image56x40" : "]]><xsl:call-template name="getImgPath"><xsl:with-param name="path"><xsl:value-of select="link_source_icon/@path"/></xsl:with-param><xsl:with-param name="width">56</xsl:with-param><xsl:with-param name="height">40</xsl:with-param></xsl:call-template><![CDATA[",]]>
                                <![CDATA["image50x50" : "]]><xsl:call-template name="getImgPath"><xsl:with-param name="path"><xsl:value-of select="link_source_icon/@path"/></xsl:with-param><xsl:with-param name="width">50</xsl:with-param><xsl:with-param name="height">50</xsl:with-param></xsl:call-template><![CDATA["]]>
                            <![CDATA[}]]>
                        <![CDATA[},]]>
                        <![CDATA["sponsored" : ]]><xsl:choose>
                                <xsl:when test="substring-before(substring-after(link_text, ' ['), ']')">
                                    <xsl:text>true</xsl:text>
                                </xsl:when>
                                <xsl:when test="substring-before(substring-after(link_text, '['), ']')">
                                    <xsl:text>true</xsl:text>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:text>false</xsl:text>
                                </xsl:otherwise>
                            </xsl:choose><![CDATA[]]>
                    <![CDATA[}]]><xsl:if test="position()!=last()"><xsl:text>,</xsl:text></xsl:if>
                </xsl:for-each>
            <![CDATA[]
        };]]>
        </xsl:element>
    </xsl:template>

    <xsl:template name="getImgPath">
        <xsl:param name="width"/>
        <xsl:param name="height"/>
        <xsl:variable name="path">
            <xsl:call-template name="string-replace-all">
                <xsl:with-param name="text">
                    <xsl:value-of select="link_source_icon/@path"/>
                </xsl:with-param>
                <xsl:with-param name="replace">
                    <xsl:text>650x350</xsl:text>
                </xsl:with-param>
                <xsl:with-param name="by">
                    <xsl:value-of select="$width"/><xsl:text>x</xsl:text><xsl:value-of select="$height"/>
                </xsl:with-param>
            </xsl:call-template>
        </xsl:variable>
        <xsl:if test="$path != ''">
            <xsl:value-of select="$image_server_url"/><xsl:value-of select="$path"/>

            <!-- <xsl:choose>
                <xsl:when test="contains($path, '493x335')">
                    <xsl:value-of select="$image_server_url"/><xsl:value-of select="$path"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="$image_server_url"/><xsl:value-of select="$path"/><xsl:text>?crop=</xsl:text><xsl:value-of select="$width"/><xsl:text>:</xsl:text><xsl:value-of select="$height"/><xsl:text>;78,7</xsl:text>
                </xsl:otherwise>
            </xsl:choose> -->
        </xsl:if>
    </xsl:template>
    <xsl:template name="string-replace-all">
        <xsl:param name="text" />
        <xsl:param name="replace" />
        <xsl:param name="by" />
        <xsl:choose>
            <xsl:when test="contains($text, $replace)">
                <xsl:value-of select="substring-before($text,$replace)" />
                <xsl:value-of select="$by" />
                <xsl:call-template name="string-replace-all">
                    <xsl:with-param name="text" select="substring-after($text,$replace)" />
                    <xsl:with-param name="replace" select="$replace" />
                    <xsl:with-param name="by" select="$by" />
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="$text" />
            </xsl:otherwise>
        </xsl:choose>
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
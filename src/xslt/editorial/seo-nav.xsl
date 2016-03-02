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
		<xsl:comment>SEO Nav</xsl:comment>
		<xsl:element name="noscript">
			<xsl:element name="ul">
				<xsl:attribute name="class">seo-nav</xsl:attribute>
				<xsl:element name="li">
					<xsl:element name="a">
						<xsl:attribute name="href">
							<xsl:call-template name="GetURLRef"><xsl:with-param name="ObjectID"><xsl:value-of select="module_link/@chronic_id" /></xsl:with-param></xsl:call-template>
						</xsl:attribute>
						<xsl:choose>
							<xsl:when test="substring-before(substring-after(module_title, ' ['), ']')">
								<xsl:value-of select="normalize-space(substring-before(module_title,' ['))"/>
							</xsl:when>
							<xsl:when test="substring-before(substring-after(module_title, '['), ']')">
								<xsl:value-of select="normalize-space(substring-before(module_title,'['))"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="normalize-space(module_title)"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:element>
				</xsl:element>
				<xsl:for-each select="links/link">
					<xsl:element name="li">
						<xsl:call-template name="articleList"/>
					</xsl:element>
				</xsl:for-each>
			</xsl:element>
		</xsl:element>
	</xsl:template>

	<xsl:template name="articleList">
		<xsl:element name="a">
			<xsl:attribute name="href">
				<xsl:call-template name="GetURLRef">
					<xsl:with-param name="ObjectID">
						<xsl:value-of select="link_url/@chronic_id"></xsl:value-of>
					</xsl:with-param>
				</xsl:call-template>
			</xsl:attribute>
			<xsl:choose>
				<xsl:when test="substring-before(substring-after(link_text, ' ['), ']')">
					<xsl:value-of select="normalize-space(substring-before(link_text,' ['))"/>
				</xsl:when>
				<xsl:when test="substring-before(substring-after(link_text, '['), ']')">
					<xsl:value-of select="normalize-space(substring-before(link_text,'['))"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="normalize-space(link_text)"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:element>
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
	<xsl:template name="GetFriendlyUrl">
		<xsl:param name="href" />
		<xsl:choose>
			<xsl:when test="not(contains($href, '/'))">
				<xsl:value-of select="$href"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:call-template name="GetFriendlyUrl">
					<xsl:with-param name="href" select="substring-after($href, '/')"/>
				</xsl:call-template>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="GetLinkIconType">
		<xsl:param name="link_href" />
		<xsl:param name="link_text" />
		<xsl:choose>
			<xsl:when test="contains(string($link_text),'[toc]')">
				<xsl:text>type_toc</xsl:text>
			</xsl:when>
			<xsl:when test="contains(string($link_text),'[blogs]') or contains(string($link_text),'[boards]')">
				<xsl:text>type_com</xsl:text>
			</xsl:when>
			<xsl:when test="contains(string($link_text),'[video]') or contains(string($link_text),'[vid]')">
				<xsl:text>type_vid</xsl:text>
			</xsl:when>
			<xsl:when test="contains(string($link_text),'[slideshow]') or contains(string($link_text),'[ss]')">
				<xsl:text>type_ss</xsl:text>
			</xsl:when>
			<xsl:when test="contains(string($link_text),'[quiz]') or contains(string($link_text),'[rmq]')">
				<xsl:text>type_rmq</xsl:text>
			</xsl:when>
			<xsl:when test="contains(string($link_text),'[article]') or contains(string($link_text),'[art]')">
				<xsl:text>type_art</xsl:text>
			</xsl:when>
			<xsl:when test="contains(string($link_href),'/default.htm')">
				<xsl:text>type_toc</xsl:text>
			</xsl:when>
			<xsl:when test="contains(string($link_href),'blogs.') or contains(string($link_href),'boards.')">
				<xsl:text>type_com</xsl:text>
			</xsl:when>
			<xsl:when test="contains(string($link_href),'video')">
				<xsl:text>type_vid</xsl:text>
			</xsl:when>
			<xsl:when test="contains(string($link_href),'slideshow')">
				<xsl:text>type_ss</xsl:text>
			</xsl:when>
			<xsl:when test="contains(string($link_href),'quiz')">
				<xsl:text>type_rmq</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>type_art</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>




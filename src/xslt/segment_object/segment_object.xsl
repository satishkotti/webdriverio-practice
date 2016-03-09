<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:exslt="http://exslt.org/common">
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
		<xsl:if test="count(links/link) >= 1">
			<xsl:element name="script"><xsl:attribute name="id"><xsl:text>segments</xsl:text></xsl:attribute><![CDATA[
		webmd.fundedEditorial.segments = []]>
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
					<xsl:choose>
						<xsl:when test="link_text != ''">
							<xsl:variable name="ids">
								<xsl:call-template name="SimpleStringLoop">
									<xsl:with-param name="text" select="link_text"/>
								</xsl:call-template>
							</xsl:variable>
							<xsl:variable name="id1">
								<xsl:value-of select="exslt:node-set($ids)/id[1]"/>
							</xsl:variable>
							<xsl:variable name="id2">
								<xsl:value-of select="exslt:node-set($ids)/id[2]"/>
							</xsl:variable><![CDATA[{]]>
					<![CDATA["artDataId" : "]]><xsl:choose>
						<xsl:when test="substring-before(substring-after($id1, ' ['), ']')">
							<xsl:value-of select="normalize-space(substring-before($id1,' ['))"/>
							</xsl:when>
						<xsl:when test="substring-before(substring-after($id1, '['), ']')">
							<xsl:value-of select="normalize-space(substring-before($id1,'['))"/>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="normalize-space($id1)"/>
						</xsl:otherwise>
					</xsl:choose><![CDATA[",]]>
					<![CDATA["playlistDataId" : "]]><xsl:choose>
						<xsl:when test="substring-before(substring-after($id2, ' ['), ']')">
							<xsl:value-of select="normalize-space(substring-before($id2,' ['))"/>
							</xsl:when>
						<xsl:when test="substring-before(substring-after($id2, '['), ']')">
							<xsl:value-of select="normalize-space(substring-before($id2,'['))"/>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="normalize-space($id2)"/>
						</xsl:otherwise>
					</xsl:choose><![CDATA[",]]>
					<![CDATA["currentSeg" : ]]><xsl:choose>
						<xsl:when test="substring-before(substring-after(link_text, ' ['), ']')">
							<xsl:text>true</xsl:text>
						</xsl:when>
						<xsl:when test="substring-before(substring-after(link_text, '['), ']')">
							<xsl:text>true</xsl:text>
						</xsl:when>
						<xsl:otherwise>
							<xsl:text>false</xsl:text>
						</xsl:otherwise>
					</xsl:choose><![CDATA[,]]>
					<![CDATA["promotedArticles" : []]><xsl:call-template name="tokenize">
						<xsl:with-param name="text">
							<xsl:value-of select="action_text"/>
						</xsl:with-param>
					</xsl:call-template><![CDATA[],]]>
				<![CDATA[}]]></xsl:when><xsl:otherwise><![CDATA[{}]]></xsl:otherwise></xsl:choose><xsl:if test="position()!=last()"><xsl:text>,</xsl:text></xsl:if>
				</xsl:for-each>
		<![CDATA[];]]>
</xsl:element>
</xsl:if>
</xsl:template>
	
	<xsl:template name="tokenize">
		<xsl:param name="text" select="."/>
		<xsl:param name="separator" select="','"/>
		<xsl:choose>
			<xsl:when test="not(contains($text, $separator))">
				<!-- Last Item -->
				<xsl:value-of select="normalize-space($text - 1)"/>
			</xsl:when>
			<xsl:otherwise>
				<!-- Items in List -->
				<xsl:variable name="num">
					<xsl:value-of select="normalize-space(substring-before($text, $separator))"/>
				</xsl:variable>
				
				<xsl:value-of select="normalize-space($num - 1)"/><xsl:value-of select="normalize-space($separator)"/>
				
				<xsl:call-template name="tokenize">
					<xsl:with-param name="text" select="substring-after($text, $separator)"/>
				</xsl:call-template>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template name="SimpleStringLoop">
		<xsl:param name="text"/>
		<xsl:param name="separator" select="','"/>
		<xsl:if test="string-length($text) &gt; 0">
			<xsl:choose>
				<xsl:when test="not(contains($text, $separator))">
					<!-- Last Item -->
					<id>
						<xsl:value-of select="normalize-space($text)"/>
					</id>
				</xsl:when>
				<xsl:otherwise>
					<!-- Items in List -->
					<xsl:variable name="id" select="substring-before($text, $separator)"/>
					<id>
						<xsl:value-of select="$id"/>
					</id>
					<xsl:call-template name="SimpleStringLoop">
						<xsl:with-param name="text" select="substring-after($text, $separator)"/>
					</xsl:call-template>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:if>
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
		</xsl:if>
	</xsl:template>
	
	<xsl:template name="getImgPathNew">
		<xsl:param name="width"/>
		<xsl:param name="height"/>
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
	<xsl:template name="GetLinkIconType">
		<xsl:param name="link_href"></xsl:param>
		<xsl:choose>
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


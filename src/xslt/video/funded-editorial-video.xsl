<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="xml" omit-xml-declaration="yes" indent="yes"/>
	<xsl:param name="class_id"/>
	<xsl:param name="domain">webmd.com</xsl:param>
	<xsl:param name="identity"/>
	<xsl:param name="image_server_url">http://img.preview.webmd.com/dtmcms/preview</xsl:param>
	<xsl:param name="moduletitle">fed-video-player</xsl:param>
	<xsl:param name="pg_furl"/>
	<xsl:param name="prefix"/>
	<xsl:param name="site_id">3</xsl:param>
	<xsl:param name="spon"/>

	
	<xsl:variable name="content" select="/webmd_rendition/content/wbmd_asset/content_section"/>
	<xsl:variable name="metadata" select="/webmd_rendition/content/wbmd_asset/metadata_section"/>
	<xsl:variable name="video_url" select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_c_loc_url[1]"/>
	
	<xsl:template match="/">
		<xsl:if test="$identity = 1">
			<xsl:call-template name="CreateIdentity"/>
		</xsl:if>
		
		<xsl:element name="div">
			<xsl:attribute name="class">fed-video</xsl:attribute>
			<xsl:element name="div">
				<xsl:attribute name="id"><xsl:value-of select="$moduletitle" /></xsl:attribute>
				<xsl:attribute name="class">player</xsl:attribute>
			</xsl:element>
			<xsl:element name="div">
				<xsl:attribute name="class">desc</xsl:attribute>
				<xsl:call-template name="insertBreaks">
					<xsl:with-param name="pText">
						<xsl:value-of select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_desc_user"/>
					</xsl:with-param>
				</xsl:call-template>
			</xsl:element>
		</xsl:element>

		
		<xsl:element name="script"><![CDATA[

			s_not_pageview='y';
			
			requirejs(['funded-editorial/1/video'], function(fundedEditorialVideo){
				fundedEditorialVideo.init("]]><xsl:value-of select="$moduletitle" disable-output-escaping="yes" /><![CDATA[", "]]><xsl:value-of select="$video_url"/><![CDATA[");
			});
		]]></xsl:element>
	</xsl:template>
	
	
	<xsl:template name="GetURLRef">
		<xsl:param name="ObjectID"/>
		<xsl:if test="(//referenced_objects/object[@chronic_id = $ObjectID and @pointer = '0']/target[@siteid = $site_id]/@friendlyurl) or (//referenced_objects/object[@chronic_id = $ObjectID and @pointer = '1']/target/@friendlyurl)">
			<xsl:choose>
				<xsl:when test="//referenced_objects/object[@chronic_id = $ObjectID]//@pointer = '1'">
					<xsl:value-of select="//referenced_objects/object[@chronic_id = $ObjectID][1]/target/@friendlyurl"/>
				</xsl:when>
				<xsl:otherwise>http://<xsl:value-of select="//referenced_objects/object[@chronic_id = $ObjectID][1]/target[@siteid = $site_id]/@prefix[1]"/>.<xsl:value-of select="$domain"/><xsl:value-of
					select="//referenced_objects/object[@chronic_id = $ObjectID][1]/target[@siteid = $site_id]/@friendlyurl[1]"/></xsl:otherwise>
			</xsl:choose>
		</xsl:if>
	</xsl:template>
	
	<xsl:template name="GetLinkType">
		<xsl:param name="Value"/>
		<xsl:choose>
			<xsl:when test="$Value = 'Window' or $Value = 'New Window – 1000x600'">nw</xsl:when>
			<xsl:when test="$Value = 'Pop Up' or $Value = 'Small Pop Up - 380x210'">sp</xsl:when>
			<xsl:when test="$Value = 'SDC Pop Up – 600x700'">sdp</xsl:when>
			<xsl:when test="$Value = 'Scrollable Pop Up – 530x490'">scp</xsl:when>
			<xsl:otherwise>
				<xsl:text><![CDATA[]]></xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template name="GetOnclickVal">
		<xsl:param name="link_type"/>
		<xsl:param name="tracking_val"/>
		<xsl:text>return sl(this,'</xsl:text>
		<xsl:value-of select="$link_type"/>
		<xsl:text>','</xsl:text>
		<xsl:value-of select="$tracking_val"/>
		<xsl:text>');</xsl:text>
	</xsl:template>
	
	<xsl:template name="ReplaceString">
		<xsl:param name="string" select="''"/>
		<xsl:param name="find" select="''"/>
		<xsl:param name="replace" select="''"/>
		<xsl:choose>
			<xsl:when test="contains($string,$find)">
				<xsl:value-of select="concat(substring-before($string,$find),$replace)"/>
				<xsl:call-template name="ReplaceString">
					<xsl:with-param name="string" select="substring-after($string,$find)"/>
					<xsl:with-param name="find" select="$find"/>
					<xsl:with-param name="replace" select="$replace"/>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$string"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template match="text()" name="insertBreaks">
		<xsl:param name="pText" select="." />
		<xsl:param name="nl">
			<xsl:text>
</xsl:text>
		</xsl:param>

		<xsl:choose>
			<xsl:when test="not(contains($pText, $nl))">
				<xsl:copy-of select="$pText"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="substring-before($pText, $nl)"/>
				<xsl:element name="br" />
				<xsl:call-template name="insertBreaks">
					<xsl:with-param name="pText" select="substring-after($pText, $nl)"/>
				</xsl:call-template>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template name="CreateIdentity">
		<xsl:text disable-output-escaping="yes"><![CDATA[<!-- ]]></xsl:text>
		<xsl:text><![CDATA[
		image_server_url:  ]]></xsl:text>
		<xsl:value-of select="$image_server_url"/>
		<xsl:text><![CDATA[
		domain:  ]]></xsl:text>
		<xsl:value-of select="$domain"/>
		<xsl:text><![CDATA[
		site_id:  ]]></xsl:text>
		<xsl:value-of select="$site_id"/>
		<xsl:text><![CDATA[
		class_id:  ]]></xsl:text>
		<xsl:value-of select="$class_id"/>
		<xsl:text><![CDATA[
		moduletitle:  ]]></xsl:text>
		<xsl:value-of select="$moduletitle"/>
		<xsl:text><![CDATA[
		spon:  ]]></xsl:text>
		<xsl:value-of select="$spon"/>
		<xsl:text><![CDATA[
		pg_furl:  ]]></xsl:text>
		<xsl:value-of select="$pg_furl"/>
		<xsl:text><![CDATA[
		prefix:  ]]></xsl:text>
		<xsl:value-of select="$prefix"/>
		<xsl:text><![CDATA[
		]]></xsl:text>
		<xsl:for-each select="/*">
			<xsl:apply-templates mode="identity" select="."/>
		</xsl:for-each>
		<xsl:text disable-output-escaping="yes"><![CDATA[
		-->
		]]></xsl:text>
	</xsl:template>
	
	<xsl:template match="@*|*|processing-instruction()|comment()" mode="identity">
		<xsl:choose>
			<xsl:when test="count(. | ../@*) = count(../@*) and contains(.,'--')">
				<xsl:attribute name="{name()}">
					<xsl:variable name="out1">
						<xsl:call-template name="ReplaceParams">
							<xsl:with-param name="orig_text">
								<xsl:value-of select="." disable-output-escaping="yes"/>
							</xsl:with-param>
							<xsl:with-param name="param_to_replace">
								<xsl:text disable-output-escaping="yes">--</xsl:text>
							</xsl:with-param>
							<xsl:with-param name="param_value">
								<xsl:text disable-output-escaping="yes"><![CDATA[&#45;&#45;]]></xsl:text>
							</xsl:with-param>
						</xsl:call-template>
					</xsl:variable>
					<xsl:value-of select="$out1" disable-output-escaping="yes"/>
				</xsl:attribute>
			</xsl:when>
			<xsl:otherwise>
				<xsl:copy>
					<xsl:apply-templates select="*|@*|text()|processing-instruction()|comment()" mode="identity"/>
				</xsl:copy>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template match="text()" mode="identity">
		<xsl:choose>
			<xsl:when test="contains(., '--' )">
				<xsl:variable name="out1">
					<xsl:call-template name="ReplaceParams">
						<xsl:with-param name="orig_text">
							<xsl:value-of select="." disable-output-escaping="yes"/>
						</xsl:with-param>
						<xsl:with-param name="param_to_replace">
							<xsl:text disable-output-escaping="yes">--</xsl:text>
						</xsl:with-param>
						<xsl:with-param name="param_value">
							<xsl:text disable-output-escaping="yes"><![CDATA[&#45;&#45;]]></xsl:text>
						</xsl:with-param>
					</xsl:call-template>
				</xsl:variable>
				<xsl:value-of select="$out1" disable-output-escaping="yes"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="."/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template name="ReplaceParams">
		<xsl:param name="orig_text"/>
		<xsl:param name="parsed_text"/>
		<xsl:param name="param_to_replace"/>
		<xsl:param name="param_value"/>
		<xsl:choose>
			<xsl:when test="$orig_text != ''">
				<xsl:choose>
					<xsl:when test="contains($orig_text, $param_to_replace)">
						<xsl:call-template name="ReplaceParams">
							<xsl:with-param name="orig_text">
								<xsl:value-of select="substring-after($orig_text, $param_to_replace)" disable-output-escaping="yes"/>
							</xsl:with-param>
							<xsl:with-param name="parsed_text">
								<xsl:value-of select="$parsed_text" disable-output-escaping="yes"/>
								<xsl:value-of select="substring-before($orig_text, $param_to_replace)" disable-output-escaping="yes"/>
								<xsl:value-of select="$param_value" disable-output-escaping="yes"/>
							</xsl:with-param>
							<xsl:with-param name="param_to_replace">
								<xsl:value-of select="$param_to_replace"/>
							</xsl:with-param>
							<xsl:with-param name="param_value">
								<xsl:value-of select="$param_value"/>
							</xsl:with-param>
						</xsl:call-template>
					</xsl:when>
					<xsl:otherwise>
						<xsl:call-template name="ReplaceParams">
							<xsl:with-param name="orig_text"/>
							<xsl:with-param name="parsed_text">
								<xsl:value-of select="concat($parsed_text, $orig_text)" disable-output-escaping="yes"/>
							</xsl:with-param>
							<xsl:with-param name="param_to_replace">
								<xsl:value-of select="$param_to_replace"/>
							</xsl:with-param>
							<xsl:with-param name="param_value">
								<xsl:value-of select="$param_value"/>
							</xsl:with-param>
						</xsl:call-template>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:when test="$orig_text = ''">
				<xsl:value-of select="$parsed_text" disable-output-escaping="yes"/>
			</xsl:when>
		</xsl:choose>
	</xsl:template>
	
</xsl:stylesheet>
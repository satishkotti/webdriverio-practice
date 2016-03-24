<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" encoding="UTF-8" indent="yes"/>
	<xsl:strip-space elements="*"/>

	<!-- Parameters -->
	<xsl:param name="site_id">3</xsl:param>
	<xsl:param name="domain">webmd.com</xsl:param>
	<xsl:param name="image_server_url">
		<xsl:text>http://img.preview.webmd.com/dtmcms/preview</xsl:text>
	</xsl:param>
	<xsl:param name="moduletitle">
		<xsl:text>slideshow</xsl:text>
	</xsl:param>
	<xsl:param name="chronicleId" select="//metadata_section/i_chronicle_id"/>

	<!-- Variables -->
	<xsl:variable name="related">
		<xsl:choose>
			<xsl:when test="//related_links_text/node()">
				<xsl:text disable-output-escaping="yes">true</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text disable-output-escaping="yes">false</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	<xsl:variable name="friendlyName">
		<xsl:call-template name="string-replace-all">
			<xsl:with-param name="text" select="//metadata_section/wbmd_c_frnd_nm"/>
			<xsl:with-param name="replace" select="'-'"/>
			<xsl:with-param name="by" select="' '"/>
		</xsl:call-template>
	</xsl:variable>
	<xsl:variable name="moveTitle">
		<xsl:text>true</xsl:text>
	</xsl:variable>
	<xsl:variable name="title">
		<xsl:choose>
			<xsl:when
				test="/webmd_rendition/content/wbmd_asset/content_section/cons_slideshow/title != ''">
				<xsl:value-of
					select="/webmd_rendition/content/wbmd_asset/content_section/cons_slideshow/title"
					disable-output-escaping="yes"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of
					select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_wdw_ttl"
					disable-output-escaping="yes"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	<xsl:variable name="caption"/>
	<xsl:variable name="description">
		<xsl:call-template name="ReplaceParams">
			<xsl:with-param name="orig_text">
				<xsl:value-of
					select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_desc_user"/>
			</xsl:with-param>
			<xsl:with-param name="param_to_replace">
				<xsl:text>&quot;</xsl:text>
			</xsl:with-param>
			<xsl:with-param name="param_value">
				<xsl:text>\&quot;</xsl:text>
			</xsl:with-param>
		</xsl:call-template>
	</xsl:variable>
	<xsl:variable name="options">
		<xsl:text>{</xsl:text>
			<xsl:if	test="/webmd_rendition/content/wbmd_asset/webmd_module/module_data/slide_redirect/slide_has_redirect_link = 'true'">
				<xsl:text>seamless: {
					link: "</xsl:text><xsl:call-template name="GetURLRef">
						<xsl:with-param name="ObjectID">
							<xsl:value-of select="/webmd_rendition/content/wbmd_asset/webmd_module/module_data/slide_redirect/slide_redirect_link/@chronic_id"/>
						</xsl:with-param>
					</xsl:call-template>
				<xsl:text>",
					title: "</xsl:text>
					<xsl:value-of select="/webmd_rendition/content/wbmd_asset/webmd_module/module_data/slide_redirect/interstitial_title"/>
				<xsl:text>"
					}</xsl:text>
			</xsl:if>
		<xsl:text>}</xsl:text>
	</xsl:variable>

	<!-- Start SS Template -->
	<xsl:template match="/">
		<xsl:apply-templates select="/webmd_rendition/content/wbmd_asset/content_section"> </xsl:apply-templates>
	</xsl:template>
	<xsl:template match="content_section">
		<xsl:element name="div">
			<xsl:attribute name="id">
				<xsl:value-of select="$moduletitle"/>
			</xsl:attribute>
			<xsl:attribute name="class">slideshow</xsl:attribute>
			<xsl:call-template name="CreateSSTitle"/>
			<xsl:call-template name="CreateSlides"/>

			<div class="touch-instructions">Swipe the photo for the next slide</div>

			<!-- Slide Count -->
			<xsl:element name="div">
				<xsl:attribute name="class">slide-count</xsl:attribute>
				<xsl:element name="span">
					<xsl:attribute name="class">current</xsl:attribute>
					<xsl:text>1</xsl:text>
				</xsl:element><xsl:text>/</xsl:text><xsl:element name="span">
					<xsl:attribute name="class">total</xsl:attribute>
				</xsl:element>
			</xsl:element>

			<!-- Last Slide -->
			<xsl:element name="div">
				<xsl:attribute name="class">slide-end</xsl:attribute>
				<xsl:element name="div">
					<xsl:attribute name="class">loading_medium_png</xsl:attribute>
					<xsl:element name="span">
						<xsl:text>Loading...</xsl:text>
					</xsl:element>
				</xsl:element>
				<xsl:element name="div">
					<xsl:attribute name="class">next-art-container</xsl:attribute>
					<xsl:element name="h4">Next <br />
						<xsl:element name="span">
							<xsl:attribute name="class">next-art</xsl:attribute>
						</xsl:element>
					</xsl:element>
				</xsl:element>
			</xsl:element>

		</xsl:element>
		<xsl:call-template name="CreateAttrib"/>
		<xsl:call-template name="CreateRequireScript"/>
	</xsl:template>
	<xsl:template name="CreateSSTitle">
		<xsl:element name="header">
			<xsl:attribute name="class">
				<xsl:text>page-header</xsl:text>
			</xsl:attribute>
			<xsl:element name="h1">
				<xsl:value-of select="$title"/>
			</xsl:element>
		</xsl:element>
		<!--xsl:element name="section">
			<xsl:attribute name="class">
				<xsl:text>page-meta</xsl:text>
			</xsl:attribute>
			<xsl:if
				test="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_first_nm != '' or /webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_revw_dt != 'nulldate'">
				<xsl:element name="p">
					<xsl:attribute name="class">
						<xsl:text>byline</xsl:text>
					</xsl:attribute>
					<xsl:attribute name="data-metrics-module">
						<xsl:value-of select="''"/>
					</xsl:attribute>
					<xsl:text>Reviewed</xsl:text>
					<xsl:if
						test="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_first_nm != ''">
						<xsl:text> by </xsl:text>
						<xsl:for-each
							select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr">
							<xsl:variable name="rev_link">
								<xsl:call-template name="GetURLRef">
									<xsl:with-param name="ObjectID">
										<xsl:value-of select="wbmd_bio_obj_id/@chronic_id"/>
									</xsl:with-param>
								</xsl:call-template>
							</xsl:variable>
							<xsl:choose>
								<xsl:when test="$rev_link != ''">
									<xsl:element name="a">
										<xsl:attribute name="data-metrics-link">
											<xsl:text>review-lnk</xsl:text>
										</xsl:attribute>
										<xsl:attribute name="href">
											<xsl:value-of select="$rev_link"/>
										</xsl:attribute>
										<xsl:call-template name="GetFullName"/>
									</xsl:element>
								</xsl:when>
								<xsl:otherwise>
									<xsl:call-template name="GetFullName"/>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:for-each>
					</xsl:if>
					<xsl:if
						test="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_revw_dt != 'nulldate'">
						<xsl:text> on </xsl:text>
						<xsl:call-template name="Convert_Date">
							<xsl:with-param name="date">
								<xsl:value-of
									select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_revw_dt"
								/>
							</xsl:with-param>
						</xsl:call-template>
					</xsl:if>
				</xsl:element>
			</xsl:if>
		</xsl:element-->
	</xsl:template>
	<xsl:template name="CreateSlides">
		<xsl:element name="div">
			<xsl:attribute name="class">slides</xsl:attribute>
			<xsl:variable name="totalSlides"><xsl:value-of select="count(/webmd_rendition/content/wbmd_asset/content_section/cons_slideshow/slide_group)"/></xsl:variable>
			<xsl:for-each
				select="/webmd_rendition/content/wbmd_asset/content_section/cons_slideshow/slide_group">
				<xsl:call-template name="CreateSlide">
					<xsl:with-param name="index"><xsl:value-of select="position()"/></xsl:with-param>
					<xsl:with-param name="total"><xsl:value-of select="$totalSlides"/></xsl:with-param>
				</xsl:call-template>
			</xsl:for-each>
		</xsl:element>
	</xsl:template>
	<xsl:template name="CreateSlide">
		<xsl:param name="index"/>
		<xsl:param name="total"/>
		<xsl:element name="div">
			<xsl:choose>
				<xsl:when test="slide_caption_title='interstitial'">
					<xsl:attribute name="class">slide sponsored</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="class">slide</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:element name="div">
				<xsl:attribute name="class">image</xsl:attribute>
				<xsl:element name="img">
					<xsl:attribute name="src">
						<xsl:value-of select="$image_server_url"/>
						<xsl:value-of select="slide_img/@path"/>
					</xsl:attribute>
				</xsl:element>
			</xsl:element>
			<div class="caption">
				<p class="touch-slide-count">Slide <xsl:value-of select="$index"/>/<xsl:value-of select="$total"/></p>
				<h3>
					<xsl:value-of select="slide_caption_title" disable-output-escaping="yes"/>
				</h3>
				<xsl:copy-of select="slide_caption_text/*"/>
			</div>
		</xsl:element>
	</xsl:template>
	<xsl:template name="CreateAttrib">
		<div class="sources">
			<xsl:if
				test="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_first_nm != '' or /webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_revw_dt != 'nulldate'">
				<xsl:element name="p">
					<xsl:attribute name="class">
						<xsl:text>reviewer</xsl:text>
					</xsl:attribute>
					<xsl:attribute name="data-metrics-module">
						<xsl:value-of select="''"/>
					</xsl:attribute>
					<xsl:text>Reviewed</xsl:text>
					<xsl:if
						test="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_first_nm != ''">
						<xsl:text> by </xsl:text>
						<xsl:for-each
							select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr">
							<xsl:variable name="rev_link">
								<xsl:call-template name="GetURLRef">
									<xsl:with-param name="ObjectID">
										<xsl:value-of select="wbmd_bio_obj_id/@chronic_id"/>
									</xsl:with-param>
								</xsl:call-template>
							</xsl:variable>
							<xsl:choose>
								<xsl:when test="$rev_link != ''">
									<xsl:element name="a">
										<xsl:attribute name="data-metrics-link">
											<xsl:text>art_medrev</xsl:text>
										</xsl:attribute>
										<xsl:attribute name="href">
											<xsl:value-of select="$rev_link"/>
										</xsl:attribute>
										<xsl:call-template name="GetFullName"/>
									</xsl:element>
								</xsl:when>
								<xsl:otherwise>
									<xsl:call-template name="GetFullName"/>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:for-each>
					</xsl:if>
					<xsl:if
						test="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_revw_dt != 'nulldate'">
						<xsl:text> on </xsl:text>
						<xsl:call-template name="Convert_Date">
							<xsl:with-param name="date">
								<xsl:value-of
									select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_revw_dt"
								/>
							</xsl:with-param>
						</xsl:call-template>
					</xsl:if>
				</xsl:element>
			</xsl:if>

			<p class="sLink">
				<a
					onclick="$(this).toggleClass('expanded'); $('.source.sContent').toggleClass('hidden'); return false;"
					href="#">Sources</a>
			</p>

			<div class="source sContent hidden">
				<xsl:if
					test="/webmd_rendition/content/wbmd_asset/content_section/cons_slideshow/citations != ''">
					<xsl:copy-of
						select="/webmd_rendition/content/wbmd_asset/content_section/cons_slideshow/citations/*"
					/>
				</xsl:if>
			</div>


			<p class="disclaimer dLink">This tool does not provide medical advice. <a
					onclick="$(this).toggleClass('expanded'); $('.disc.dContent').toggleClass('hidden'); return false;"
					href="#">See additional information</a></p>

			<div class="disc dContent hidden">
				<xsl:for-each
					select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_disclmr/wbmd_disclaimer/disclaimer_statement">
					<p class="disclaimer dContent">
						<xsl:value-of select="normalize-space()"/>
					</p>
				</xsl:for-each>
			</div>

			<p class="copyright">
				<xsl:value-of
					select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_cpyrt/wbmd_copyright/wbmd_copyright_statement"
				/>
			</p>
		</div>
	</xsl:template>
	<xsl:template name="GetURLRef">
		<xsl:param name="ObjectID"/>
		<xsl:if
			test="(//referenced_objects/object[@chronic_id=$ObjectID and @pointer='0']/target[@siteid=$site_id]/@friendlyurl) or (//referenced_objects/object[@chronic_id=$ObjectID and @pointer='1']/target/@friendlyurl)">
			<xsl:choose>
				<xsl:when test="//referenced_objects/object[@chronic_id=$ObjectID]//@pointer = '1'">
					<xsl:value-of
						select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target/@friendlyurl"
					/>
				</xsl:when>
				<xsl:otherwise> http://<xsl:value-of
						select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target[@siteid=$site_id]/@prefix[1]"
						/>.<xsl:value-of select="$domain"/><xsl:value-of
						select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target[@siteid=$site_id]/@friendlyurl[1]"
					/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:if>
	</xsl:template>
	<xsl:template name="GetLinkType">
		<xsl:param name="Value"/>
		<xsl:choose>
			<xsl:when test="$Value = 'Window' or $Value = 'New Window – 1000x600'"> nw </xsl:when>
			<xsl:when test="$Value = 'Pop Up' or $Value = 'Small Pop Up - 380x210'"> sp </xsl:when>
			<xsl:when test="$Value = 'SDC Pop Up – 600x700'"> sdp </xsl:when>
			<xsl:when test="$Value = 'Scrollable Pop Up – 530x490'"> scp </xsl:when>
			<xsl:otherwise/>
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
								<xsl:value-of
									select="substring-after($orig_text, $param_to_replace)"
									disable-output-escaping="yes"/>
							</xsl:with-param>
							<xsl:with-param name="parsed_text">
								<xsl:value-of select="$parsed_text" disable-output-escaping="yes"/>
								<xsl:value-of
									select="substring-before($orig_text, $param_to_replace)"
									disable-output-escaping="yes"/>
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
								<xsl:value-of select="concat($parsed_text, $orig_text)"
									disable-output-escaping="yes"/>
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
	<xsl:template name="GetFullName">
		<xsl:value-of select="wbmd_first_nm" disable-output-escaping="yes"/>
		<xsl:text>
		<![CDATA[]]>
		</xsl:text>
		<xsl:value-of select="wbmd_middle_name"/>
		<xsl:if test="wbmd_middle_name != ''">
			<xsl:text>
			<![CDATA[]]>
			</xsl:text>
		</xsl:if>
		<xsl:value-of select="wbmd_lst_nm"/>
		<xsl:for-each select="wbmd_person_suffix_group/wbmd_person_suffix">
			<xsl:value-of select="concat(', ', @wbmd_disp_nm)"/>
		</xsl:for-each>
	</xsl:template>
	<xsl:template name="Convert_Date">
		<xsl:param name="date"/>
		<xsl:if test="$date != 'nulldate'">
			<xsl:choose>
				<xsl:when test="string-length($date) &lt; 19">
					<xsl:variable name="monthpart">
						<xsl:variable name="buffmonth">
							<xsl:value-of select="substring-before($date,'/')"/>
						</xsl:variable>
						<xsl:choose>
							<xsl:when test="string-length($buffmonth) = 1">
								<xsl:value-of select="concat('0',$buffmonth)"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="$buffmonth"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:variable>
					<xsl:variable name="daypart">
						<xsl:variable name="buffday">
							<xsl:value-of select="substring-before(substring-after($date,'/'),'/')"
							/>
						</xsl:variable>
						<xsl:choose>
							<xsl:when test="string-length($buffday) = 1">
								<xsl:value-of select="concat('0',$buffday)"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="$buffday"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:variable>
					<xsl:variable name="yearpart">
						<xsl:value-of
							select="substring(substring-after(substring-after($date,'/'),'/'),1,4)"
						/>
					</xsl:variable>
					<xsl:variable name="month">
						<xsl:call-template name="GetMonthString">
							<xsl:with-param name="monthno">
								<xsl:value-of select="$monthpart"/>
							</xsl:with-param>
						</xsl:call-template>
					</xsl:variable>
					<xsl:value-of select="concat($month,concat($daypart, concat(', ',$yearpart)))"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:variable name="monthpart">
						<xsl:value-of select="substring($date,1,2)"/>
					</xsl:variable>
					<xsl:variable name="daypart">
						<xsl:value-of select="substring($date,4,2)"/>
					</xsl:variable>
					<xsl:variable name="yearpart">
						<xsl:value-of select="substring($date,7,4)"/>
					</xsl:variable>
					<xsl:variable name="month">
						<xsl:call-template name="GetMonthString">
							<xsl:with-param name="monthno">
								<xsl:value-of select="$monthpart"/>
							</xsl:with-param>
						</xsl:call-template>
					</xsl:variable>
					<xsl:value-of select="concat($month,concat($daypart, concat(', ',$yearpart)))"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:if>
	</xsl:template>
	<xsl:template name="GetMonthString">
		<xsl:param name="monthno"/>
		<xsl:choose>
			<xsl:when test="$monthno = '01'">
				<xsl:value-of select="' January '"/>
			</xsl:when>
			<xsl:when test="$monthno = '02'">
				<xsl:value-of select="' February '"/>
			</xsl:when>
			<xsl:when test="$monthno = '03'">
				<xsl:value-of select="' March '"/>
			</xsl:when>
			<xsl:when test="$monthno = '04'">
				<xsl:value-of select="' April '"/>
			</xsl:when>
			<xsl:when test="$monthno = '05'">
				<xsl:value-of select="' May '"/>
			</xsl:when>
			<xsl:when test="$monthno = '06'">
				<xsl:value-of select="' June '"/>
			</xsl:when>
			<xsl:when test="$monthno = '07'">
				<xsl:value-of select="' July '"/>
			</xsl:when>
			<xsl:when test="$monthno = '08'">
				<xsl:value-of select="' August '"/>
			</xsl:when>
			<xsl:when test="$monthno = '09'">
				<xsl:value-of select="' September '"/>
			</xsl:when>
			<xsl:when test="$monthno = '10'">
				<xsl:value-of select="' October '"/>
			</xsl:when>
			<xsl:when test="$monthno = '11'">
				<xsl:value-of select="' November '"/>
			</xsl:when>
			<xsl:when test="$monthno = '12'">
				<xsl:value-of select="' December '"/>
			</xsl:when>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="string-replace-all">
		<xsl:param name="text"/>
		<xsl:param name="replace"/>
		<xsl:param name="by"/>
		<xsl:choose>
			<xsl:when test="contains($text, $replace)">
				<xsl:value-of select="substring-before($text,$replace)"/>
				<xsl:value-of select="$by"/>
				<xsl:call-template name="string-replace-all">
					<xsl:with-param name="text" select="substring-after($text,$replace)"/>
					<xsl:with-param name="replace" select="$replace"/>
					<xsl:with-param name="by" select="$by"/>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$text"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="CreateRequireScript">
		<xsl:element name="script">
			<xsl:text disable-output-escaping="yes">
	s_not_pageview = "y";
	requirejs(['funded-editorial/1/funded-slideshow'], function(ss){
		$(function() {
			ss.init('#</xsl:text>
		<xsl:value-of select="$moduletitle"/>
		<xsl:text>', </xsl:text>
			<xsl:value-of select="$options"/>
		<xsl:text>);
		});
	});</xsl:text>
		</xsl:element>
	</xsl:template>
</xsl:stylesheet>



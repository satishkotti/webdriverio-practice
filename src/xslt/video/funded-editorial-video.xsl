<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:a="http://www.w3.org/2006/04/ttaf1" exclude-result-prefixes="a">
	<xsl:output method="html" omit-xml-declaration="yes" indent="yes"/>
	<xsl:param name="class_id"/>
	<xsl:param name="domain">webmd.com</xsl:param>
	<xsl:param name="identity"></xsl:param>
	<xsl:param name="image_server_url">http://img.preview.webmd.com/dtmcms/preview</xsl:param>
	<xsl:param name="moduletitle"/>
	<xsl:param name="pg_furl"/>
	<xsl:param name="prefix"/>
	<xsl:param name="site_id">3</xsl:param>
	<xsl:param name="spon"/>

	<xsl:variable name="content" select="/webmd_rendition/content/wbmd_asset/content_section"/>
	<xsl:variable name="metadata" select="/webmd_rendition/content/wbmd_asset/metadata_section"/>
	<xsl:variable name="chronic_id" select="/webmd_rendition/content/wbmd_asset/metadata_section/i_chronicle_id"/>
	<xsl:variable name="poster" select="/webmd_rendition/content/wbmd_asset/metadata_section/i_chronicle_id"/>

	<xsl:variable name="chars_to_remove">"'</xsl:variable>
	<xsl:variable name="video_title">
		<xsl:value-of select="translate(webmd_rendition/content/wbmd_asset/metadata_section/title, $chars_to_remove, '')"></xsl:value-of>
	</xsl:variable>

	<xsl:variable name="container_id">
		<xsl:value-of select="concat('v_', translate($moduletitle, ' ', ''), '_', $chronic_id)"/>
	</xsl:variable>

	<xsl:variable name="video_src">
		<xsl:value-of disable-output-escaping="yes" select="webmd_rendition/content/wbmd_asset/metadata_section/wbmd_c_loc_url"/>
	</xsl:variable>

	<xsl:variable name="is_sponsored">
		<xsl:value-of select="webmd_rendition/content/wbmd_asset/metadata_section/wbmd_c_vid_sp"/>
	</xsl:variable>

	<xsl:variable name="thumb_img">
		<xsl:value-of select="webmd_rendition/content/wbmd_asset/metadata_section/wbmd_c_lg_vid_thmbnl/image_path"/>
	</xsl:variable>

	<xsl:variable name="webmd_logo_overlay">
		<xsl:value-of select="webmd_rendition/content/wbmd_asset/metadata_section/wbmd_c_watm_img/image_path"/>
	</xsl:variable>

	<xsl:variable name="ccaptions_info">
		<xsl:value-of disable-output-escaping="yes" select="webmd_rendition/content/wbmd_asset/metadata_section/wbmd_c_vid_trns/@path"/>
	</xsl:variable>

	<xsl:variable name="is_new_transcript_format">
		<xsl:choose>
			<xsl:when test="webmd_rendition/content/wbmd_asset/content_section/a:tt/a:body/a:div/a:p">
				<xsl:text>true</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>false</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>

	<xsl:variable name="narrator">
		<xsl:choose>
			<xsl:when test="$is_new_transcript_format = 'true'">
				<xsl:value-of select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_c_vid_citations"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="/webmd_rendition/content/wbmd_asset/content_section/cons_feature/pages/page/section_group/section_header"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>

	<xsl:template match="/">
		<script type="text/javascript">
			<![CDATA[webmd.m.video={};webmd.m.video.v]]><xsl:value-of select="$chronic_id"/><![CDATA[ ={ratevideo: true,vidWindowLogo: "",archive: "]]><xsl:value-of select="webmd_rendition/content/wbmd_asset/metadata_section/wbmd_archive_bool"/><![CDATA[",thumbImg: "]]><xsl:value-of select="$thumb_img"/><![CDATA[",cCaptionsInfo: "]]><xsl:value-of select="$ccaptions_info"/><![CDATA[",videoTitle: "]]><xsl:value-of select="$video_title"/><![CDATA[",logoOverlay: "]]><xsl:value-of select="$webmd_logo_overlay"/><![CDATA[",reviewDate: "]]><xsl:value-of select="webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_revw_dt"/><![CDATA[",sponsored: "]]><xsl:value-of select="$is_sponsored"/><![CDATA[",file: {url:"]]><xsl:value-of select="webmd_rendition/content/wbmd_asset/metadata_section/wbmd_c_loc_url"/><![CDATA[",duration:]]><xsl:value-of select="webmd_rendition/content/wbmd_asset/metadata_section/wbmd_c_duration"/><![CDATA[,height:360,width:640,autoplay:true},bumperin: {vloc:"",duration:0},bumperout: {vloc:"",duration:0},preroll: {enable:true,xpg:"]]><xsl:value-of select="webmd_rendition/content/wbmd_asset/metadata_section/wbmd_c_prim_top_id/@wbmd_storage_val"/><![CDATA[",site:"2",affiliate:"20",leaf:"]]><xsl:value-of select="webmd_rendition/friendlyurls/target[@siteid=$site_id][1]/centers/Package/@id"/><![CDATA[",sec:"]]><xsl:value-of select="webmd_rendition/content/wbmd_asset/metadata_section/wbmd_c_sec_top_id_group/wbmd_c_sec_top_id/@wbmd_storage_val"/><![CDATA[",au1:"]]><xsl:value-of select="webmd_rendition/content/wbmd_asset/metadata_section/wbmd_c_audnc_gndr_group/wbmd_c_audnc_gndr/@wbmd_storage_val"/><![CDATA[",au2:"]]><xsl:value-of select="webmd_rendition/content/wbmd_asset/metadata_section/wbmd_c_audnc_age_group/wbmd_c_audnc_age/@wbmd_storage_val"/><![CDATA[",cc:"]]><xsl:value-of select="webmd_rendition/content/wbmd_asset/metadata_section/wbmd_bus_ref/@wbmd_storage_val"/><![CDATA[",scent:"]]><xsl:value-of select="webmd_rendition/friendlyurls/target[@siteid=$site_id][1]/centers/Super/@id"/><![CDATA[",hcent:"]]><xsl:value-of select="webmd_rendition/friendlyurls/target[@siteid=$site_id][1]/centers/Health/@id"/><![CDATA["},caption: {cc:false}}]]>
		</script>
		<xsl:if test="$identity = 1">
			<xsl:call-template name="CreateIdentity"/>
		</xsl:if>

		<xsl:element name="header">
			<xsl:attribute name="class">
				<xsl:text>page-header</xsl:text>
			</xsl:attribute>
			<xsl:element name="h1">
				<xsl:value-of select="/webmd_rendition/content/wbmd_asset/metadata_section/title"/>
			</xsl:element>
		</xsl:element>

		<xsl:element name="div">
			<xsl:attribute name="class">premium-video-container fed-video</xsl:attribute>
			<xsl:attribute name="data-metrics-module">video</xsl:attribute>

			<xsl:element name="div">
				<xsl:attribute name="id">
					<xsl:value-of select="$container_id"/>
				</xsl:attribute>
				<xsl:attribute name="class">player</xsl:attribute>
			</xsl:element>

			<xsl:element name="div">
				<xsl:attribute name="class">about-video</xsl:attribute>
				<xsl:attribute name="style">display:none;</xsl:attribute>

				<!-- per Art Nikaj, we need the reviewed-by block inside 'about' section so to unify the content for all the video modules -->
				<xsl:call-template name="build-reviewedby-output">
					<xsl:with-param name="site_id" select="$site_id"></xsl:with-param>
					<xsl:with-param name="domain" select="$domain"></xsl:with-param>
				</xsl:call-template>

				<xsl:element name="p">Sources</xsl:element>
				<xsl:element name="p">
					<xsl:value-of select="//metadata_section/wbmd_c_vid_citations"/>
				</xsl:element>
				<xsl:element name="p">
					<xsl:value-of select="//metadata_section/*/*/wbmd_copyright_statement"/>
				</xsl:element>
			</xsl:element>

			<xsl:element name="div">
				<xsl:attribute name="class">share-video</xsl:attribute>
			</xsl:element>

			<xsl:element name="div">
				<xsl:attribute name="class">desc</xsl:attribute>
				<xsl:element name="p">
					<xsl:call-template name="insertBreaks">
						<xsl:with-param name="pText">
							<xsl:value-of select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_desc_user"/>
						</xsl:with-param>
					</xsl:call-template>
				</xsl:element>
			</xsl:element>

			<!-- <xsl:if test="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_lst_nm">
				<xsl:element name="div">
					<xsl:attribute name="class">vid-byline page-meta</xsl:attribute>

					<xsl:call-template name="build-reviewedby-output">
						<xsl:with-param name="site_id" select="$site_id"></xsl:with-param>
						<xsl:with-param name="domain" select="$domain"></xsl:with-param>
					</xsl:call-template>
				</xsl:element>
			</xsl:if> -->

			<!--xsl:element name="div">
				<xsl:attribute name="class">playlists expanded</xsl:attribute>

				<xsl:element name="div">
					<xsl:attribute name="class">view-controls</xsl:attribute>
					<xsl:text>View: </xsl:text>
					<xsl:element name="a">
						<xsl:attribute name="class">view-list</xsl:attribute>
						<xsl:attribute name="title">List View</xsl:attribute>
						<xsl:text>List View</xsl:text>
					</xsl:element>
					<xsl:element name="a">
						<xsl:attribute name="class">view-grid</xsl:attribute>
						<xsl:attribute name="title">Grid View</xsl:attribute>
						<xsl:text>Grid View</xsl:text>
					</xsl:element>
				</xsl:element>

				<xsl:element name="div">
					<xsl:attribute name="class">current</xsl:attribute>
				</xsl:element>

				<xsl:element name="div">
					<xsl:attribute name="class">more-videos</xsl:attribute>
				</xsl:element>

				<xsl:element name="a">
					<xsl:attribute name="class">show-more</xsl:attribute>
					<xsl:text>Show More Videos</xsl:text>
				</xsl:element>
				<xsl:element name="a">
					<xsl:attribute name="class">show-less</xsl:attribute>
					<xsl:text>Show Less Videos</xsl:text>
				</xsl:element>

			</xsl:element-->

			<xsl:element name="div">
				<xsl:attribute name="class">video-end</xsl:attribute>
				<h4>Next Up</h4>
				<img src="" /> <p class="next-art"></p>
				<xsl:element name="div">
					<xsl:attribute name="class">loading_medium_png</xsl:attribute>
					<span>Loading...</span>
				</xsl:element>
			</xsl:element>

		</xsl:element>

		<xsl:element name="script">
			<![CDATA[
			var s_video_module_id = "vidrprem",
				s_video_module_name = "video - rprem", //prop33
				netstoragePath = "live";

			if (!webmd.m.premiumVideoOptions) {
				webmd.m.premiumVideoOptions = {};
			}
			//webmd.ads2.disableInitialLoad();

			s_not_pageview='y';

			if(window.location.hostname.match(/perf/i)) {
				netstoragePath = "perf";
			} else if (window.location.hostname.match(/qa00\.staging/i)) {
				netstoragePath = "qa00_staging";
			} else if (window.location.hostname.match(/qa00\.preview/i)) {
				netstoragePath = "qa00_staging";
			} else if (window.location.hostname.match(/qa00/i)) {
				netstoragePath = "qa00_live";
			} else if(window.location.hostname.match(/staging/i)) {
				netstoragePath = "staging";
			} else if (window.location.hostname.match(/preview/i)) {
				netstoragePath = "staging";
			}

			window.getDynamicVideoComponents = function() {
				return [
					'video2/1/api/video-api',
					'video2/1/premium-video2/dynamic-control-bar',
					'video2/1/api/video-metrics',
					'video2/1/api/video-ad',
					'//webmdplayer-a.akamaihd.net/consumer/' + netstoragePath + '/resources/hls.min.js'
				];
			};

			require(['video2/1/premium-video2/premium-video2'], function (Player) {
				//we removed the custom module loading list as soon as we loaded our stuffs...
				window.getDynamicVideoComponents = undefined;

				var idPack = {},
					player = new Player(),
					timer = 100,
					totalTime = 0,
					cutOff = 2000,
					nextArt = webmd.fundedEditorial.articleData.articles[webmd.fundedEditorial.articleData.nextArticle],
					url = nextArt.link,
					title = nextArt.title,
					img = nextArt.images.image110x70,
					$wrap = $('.fed-video .video-end');

				idPack.vidSelector = '#]]><xsl:value-of select="$container_id"/><![CDATA[';
				idPack.chronicId = ']]><xsl:value-of select="$chronic_id"/><![CDATA[';
				idPack.videoSourceId = ']]><xsl:value-of select="$video_src"/><![CDATA[';

				webmd.m.premiumVideo2 = webmd.object(player);

				$wrap.find('.next-art').html(title);
				$wrap.find('img').attr('src',image_server_url + img);

				webmd.m.premiumVideo2.addEventListener('ready', function(e) {
					webmd.m.premiumVideo2.playerObj.addEventListener('ended', function(event) {
						$wrap.show();
						setTimeout(function(){
							window.location = url;
						}, 1000);
					});
				});

				function beginDailyPlayer() {
					if(typeof googletag === "undefined" || typeof googletag.pubads === "undefined") {
						if( totalTime !== cutOff) {
							totalTime += timer;
							setTimeout(beginDailyPlayer, timer);
							return;
						}
					}

					$(function(){
						webmd.m.premiumVideo2.init(idPack, webmd.m.premiumVideoOptions);
					});
				}

				beginDailyPlayer();
			});
		]]>
		</xsl:element>
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

	<!-- XSL INCLUDES -->



	<xsl:template name="build-reviewedby-output">
		<xsl:param name="site_id"/>
		<xsl:param name="domain"/>

		<xsl:if test="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_lst_nm">
			<xsl:element name="p">
				<xsl:text><![CDATA[Reviewed by ]]></xsl:text>
				<xsl:element name="a">
					<xsl:attribute name="href">
						<xsl:call-template name="GetURLRefShared">
							<xsl:with-param name="ObjectID">
								<xsl:value-of select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_bio_obj_id/@chronic_id"/>
							</xsl:with-param>
							<xsl:with-param name="site_id">
								<xsl:value-of select="$site_id"/>
							</xsl:with-param>
							<xsl:with-param name="domain">
								<xsl:value-of select="$domain"/>
							</xsl:with-param>
						</xsl:call-template>
					</xsl:attribute>
					<xsl:value-of select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_first_nm"/>
					<xsl:text> </xsl:text>
					<xsl:value-of select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_lst_nm"/>
				</xsl:element>
				<xsl:text><![CDATA[ on]]></xsl:text>
				<xsl:call-template name="Convert_Date">
					<xsl:with-param name="date">
						<xsl:value-of select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_revw_dt"/>
					</xsl:with-param>
				</xsl:call-template>
			</xsl:element>
		</xsl:if>
	</xsl:template>

	<xsl:template name="process-ttml-pnodes">
		<!-- this assuming the caller's current context, which will be the p node of the ttml -->
		<xsl:element name="span">
			<xsl:attribute name="begin">
				<xsl:value-of select="./@begin"/>
			</xsl:attribute>
			<xsl:attribute name="class">vjs-ttml</xsl:attribute>

			<xsl:if test="./@end">
				<xsl:attribute name="end">
					<xsl:value-of select="./@end"/>
				</xsl:attribute>
			</xsl:if>

			<!-- the next line bacically carry any embedded node over as is - such as <br> tags, etc. -->
			<xsl:apply-templates mode="copy-without-ns" select="node()"/>

		</xsl:element>
	</xsl:template>

	<xsl:template match="*" mode="copy-without-ns">
		<xsl:element name="{name()}">
			<xsl:apply-templates select="@*|node()" mode="copy-without-ns" />
		</xsl:element>
	</xsl:template>

	<xsl:template match="@*|text()|comment()" mode="copy-without-ns">
		<xsl:copy/>
	</xsl:template>

	<xsl:template name="GetURLRefShared">
		<xsl:param name="ObjectID"/>
		<xsl:param name="site_id"/>
		<xsl:param name="domain"/>
		<xsl:if test="(//referenced_objects/object[@chronic_id = $ObjectID and @pointer = '0']/target[@siteid = $site_id]/@friendlyurl) or (//referenced_objects/object[@chronic_id = $ObjectID and @pointer = '1']/target/@friendlyurl)">
			<xsl:choose>
				<xsl:when test="//referenced_objects/object[@chronic_id = $ObjectID]//@pointer = '1'">
					<xsl:value-of select="//referenced_objects/object[@chronic_id = $ObjectID][1]/target/@friendlyurl"/>
				</xsl:when>
				<xsl:otherwise>
					http://<xsl:value-of select="//referenced_objects/object[@chronic_id = $ObjectID][1]/target[@siteid = $site_id]/@prefix[1]"/>.<xsl:value-of select="$domain"/><xsl:value-of
					select="//referenced_objects/object[@chronic_id = $ObjectID][1]/target[@siteid = $site_id]/@friendlyurl[1]"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:if>
	</xsl:template>

	<xsl:template name="Convert_Date">
		<xsl:param name="date"/>
		<xsl:if test="$date != 'nulldate'">
			<xsl:choose>
				<xsl:when test="string-length($date) &lt; 23">
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
							<xsl:value-of select="substring-before(substring-after($date,'/'),'/')"/>
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
						<xsl:value-of select="substring(substring-after(substring-after($date,'/'),'/'),1,4)"/>
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
	<xsl:template name="GetStyleNoFloat">
		<xsl:param name="style_val"/>
		<xsl:value-of select="translate(substring-before($style_val, 'float:'), ' ', '')"/>
		<xsl:value-of select="translate(substring-after(substring-after($style_val, 'float:'), ';'), ' ', '')"/>
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
	<xsl:template name="sPagenameVideoFix">
		<script type="text/javascript">
			<![CDATA[setTimeout(function() { s_pagename = s_pagename.replace('/video/', '/video/vidsite/'); } , 100);]]>
		</script>
	</xsl:template>



</xsl:stylesheet>

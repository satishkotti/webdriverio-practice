<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<!-- Force the output to be strict XHTML -->
	<xsl:output method="xml" omit-xml-declaration="yes" indent="yes" encoding="utf-8"/>
	<xsl:param name="class_id"/>
	<xsl:param name="image_server_url">
		<xsl:text>http://img.preview.webmd.com/dtmcms/preview</xsl:text>
	</xsl:param>
	<xsl:param name="moduletitle"/>
	<xsl:param name="site_id">3</xsl:param>
	<xsl:param name="domain">webmd.com</xsl:param>
	<xsl:param name="vid_icon_tag">
		<xsl:text>[vid_icon]</xsl:text>
	</xsl:param>
	<xsl:param name="comm_icon_tag">
		<xsl:text>[comm_icon]</xsl:text>
	</xsl:param>
	<xsl:param name="ss_icon_tag">
		<xsl:text>[ss_icon]</xsl:text>
	</xsl:param>
	<xsl:param name="img_src">
		<xsl:for-each select="/webmd_rendition/content/wbmd_asset/content_section/quiz/questions/question[1]">
			<xsl:value-of select="$image_server_url"/>
			<xsl:value-of select="qmedia/loc"/>
		</xsl:for-each>
	</xsl:param>
	<!--set this to 1 if you want the xml source to be inserted into a comment before the normal output of the xsl-->
	<xsl:param name="identity">1</xsl:param>
	<xsl:template match="/">
		<xsl:apply-templates select="/webmd_rendition/content/wbmd_asset/content_section/quiz"/>
	</xsl:template>
	<xsl:template match="quiz">
		<!--identity logic-->
		<xsl:if test="$identity=1">
			<xsl:call-template name="CreateIdentity"/>
		</xsl:if>
		<!--quiz quiz text-->
		<xsl:call-template name="CreateRMQScript"/>
		<!--quiz header-->
		<xsl:element name="div">
			<xsl:attribute name="id">
				<xsl:text>rmq_header</xsl:text>
			</xsl:attribute>
			<xsl:element name="h2">
				<xsl:value-of select="quiztitle" disable-output-escaping="yes"/>
			</xsl:element>
		</xsl:element>
		<!--quiz body-->
		<xsl:element name="div">
			<xsl:attribute name="class">
				<xsl:text>rich_media_quiz module</xsl:text>
			</xsl:attribute>
			<!--quiz scorebox-->
			<xsl:element name="div">
				<xsl:attribute name="id">
					<xsl:text>rmq_scorebox</xsl:text>
				</xsl:attribute>
				<xsl:element name="div">
					<xsl:attribute name="class">
						<xsl:text>score_text</xsl:text>
					</xsl:attribute>
					<xsl:element name="span">
						<xsl:attribute name="class">
							<xsl:text>score_num_correct icon-check</xsl:text>
						</xsl:attribute>
						<xsl:text>0</xsl:text>
					</xsl:element>
					<xsl:element name="span">
						<xsl:attribute name="class">
							<xsl:text>score_num_incorrect icon-close</xsl:text>
						</xsl:attribute>
						<xsl:text>0</xsl:text>
					</xsl:element>
				</xsl:element>
			</xsl:element>
			<!--call template that creates main form-->
			<xsl:call-template name="CreateRMQForm"/>
			<!--quiz footer-->
			<!--media div for video players / objects-->
			<xsl:call-template name="CreateMediaDiv"/>
			<!--sources section-->
			<xsl:call-template name="CreateSources"/>
			</xsl:element>
		<!--sdc iframes-->
		<xsl:element name="iframe">
			<xsl:attribute name="id">
				<xsl:text>sdc_iframe</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="name">
				<xsl:text>sdc_iframe</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="title">
				<xsl:text>sdc_iframe</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="width">
				<xsl:text>1</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="height">
				<xsl:text>1</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="marginwidth">
				<xsl:text>0</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="marginheight">
				<xsl:text>0</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="style">
				<xsl:text>margin:0; display: none;</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="frameborder">
				<xsl:text>0</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="scrolling">
				<xsl:text>no</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="src">
				<xsl:text>about:blank</xsl:text>
			</xsl:attribute>
			<xsl:text> </xsl:text>
		</xsl:element>
		<xsl:element name="iframe">
			<xsl:attribute name="id">
				<xsl:text>sdc_submit</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="name">
				<xsl:text>sdc_submit</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="title">
				<xsl:text>sdc_submit</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="width">
				<xsl:text>1</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="height">
				<xsl:text>1</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="marginwidth">
				<xsl:text>0</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="marginheight">
				<xsl:text>0</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="style">
				<xsl:text>margin:0; display: none;</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="frameborder">
				<xsl:text>0</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="scrolling">
				<xsl:text>0</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="src">
				<xsl:text>about:blank</xsl:text>
			</xsl:attribute>
			<xsl:text> </xsl:text>
		</xsl:element>
	</xsl:template>
	<xsl:template name="CreateRMQScript">
		<xsl:element name="script">
			<xsl:text disable-output-escaping="yes"><![CDATA[
	$(window).load(function() {
		require(['funded-editorial/1/funded-rmq'], function(rmq) {
			rmq.init({
				slideData: [
]]></xsl:text>
			<xsl:for-each
				select="questions/question[not(contains(normalize-space(answers/answer/atext), 'interstitial'))]">
				<xsl:text disable-output-escaping="yes"><![CDATA[					{type: "]]></xsl:text>
				<xsl:text>question</xsl:text>
				<xsl:text disable-output-escaping="yes"><![CDATA["]]></xsl:text>
				<xsl:text disable-output-escaping="yes"><![CDATA[, scored: true, correct: "]]></xsl:text>
				<xsl:for-each select="answers/answer[aweight = '1']">
					<xsl:call-template name="NumberToLetter">
						<xsl:with-param name="number">
							<xsl:value-of select="count(preceding-sibling::answer) + 1"/>
						</xsl:with-param>
					</xsl:call-template>
				</xsl:for-each>
				<xsl:text disable-output-escaping="yes"><![CDATA["]]></xsl:text>
				<xsl:if test="qtype = 'ImageGrid' or qmedia/type = 'wbmd_cons_video'">
					<xsl:text disable-output-escaping="yes"><![CDATA[,  mediaType: "]]></xsl:text>
					<xsl:choose>
						<xsl:when test="qtype = 'ImageGrid'">
							<xsl:text>imageGrid</xsl:text>
						</xsl:when>
						<xsl:otherwise>
							<xsl:text>video</xsl:text>
						</xsl:otherwise>
					</xsl:choose>
					<xsl:text disable-output-escaping="yes"><![CDATA["]]></xsl:text>
				</xsl:if>
				<xsl:if test="qmedia/type = 'wbmd_cons_video'">
					<xsl:text disable-output-escaping="yes"><![CDATA[,  mediaId: "rmqvideo]]></xsl:text>
					<xsl:value-of
						select="count(preceding-sibling::question[qmedia/type = 'wbmd_cons_video']) + 1"/>
					<xsl:text disable-output-escaping="yes"><![CDATA["]]></xsl:text>
				</xsl:if>
				<xsl:text disable-output-escaping="yes"><![CDATA[},
]]></xsl:text>
				<xsl:if
					test="(normalize-space(defexp) != '' or normalize-space(answers/answer/aexpl) != '')">
					<xsl:text disable-output-escaping="yes"><![CDATA[					{type: "answer"},
]]></xsl:text>
				</xsl:if>
			</xsl:for-each>
			<xsl:for-each
				select="questions/question[contains(normalize-space(answers/answer/atext), 'interstitial')]">
				<xsl:if
					test="$site_id = 8">
					<xsl:choose>
						<xsl:when
							test="(contains(normalize-space(answers/answer/atext), 'mobile') or contains(normalize-space(answers/answer/atext), 'both')) and normalize-space(answers/answer/aexpl) != ''">
							<!-- mediaId to be left blank; prerolls not supported in present scope -->
							<!-- <xsl:text><![CDATA[					{type: "interstitial", adType: "preroll", mediaId: "]]></xsl:text>
							<xsl:value-of
								select="normalize-space(answers/answer/aexpl)"/>
							<xsl:text><![CDATA["},
]]></xsl:text> -->
						</xsl:when>
						<xsl:when
							test="(contains(normalize-space(answers/answer/atext), 'mobile') or contains(normalize-space(answers/answer/atext), 'both')) and normalize-space(answers/answer/aexpl) = ''">
							<xsl:text><![CDATA[					{type: "interstitial", adType: "static", delay: 5},
]]></xsl:text>
						</xsl:when>
					</xsl:choose>
				</xsl:if>
				<xsl:if
					test="$site_id = 3">
					<xsl:choose>
						<xsl:when
							test="not(contains(normalize-space(answers/answer/atext), 'mobile')) and normalize-space(answers/answer/aexpl) != ''">
							<xsl:text><![CDATA[					{type: "interstitial", adType: "preroll", mediaId: "]]></xsl:text>
							<xsl:value-of
								select="normalize-space(answers/answer/aexpl)"/>
							<xsl:text><![CDATA["},
]]></xsl:text>
						</xsl:when>
						<xsl:when
							test="not(contains(normalize-space(answers/answer/atext), 'mobile')) and normalize-space(answers/answer/aexpl) = ''">
							<xsl:text><![CDATA[					{type: "interstitial", adType: "static", delay: 5},
]]></xsl:text>
						</xsl:when>
					</xsl:choose>
				</xsl:if>
			</xsl:for-each>
			<xsl:text disable-output-escaping="yes"><![CDATA[					{type: "results"}
				],]]></xsl:text>
			<xsl:if test="normalize-space(results/result/restext) != ''">
				<xsl:text disable-output-escaping="yes"><![CDATA[
				scoreRanks: [
		]]></xsl:text>
				<xsl:for-each select="results/result/restext">
					<xsl:text disable-output-escaping="yes"><![CDATA[			{ pct: ]]></xsl:text>
					<xsl:value-of select="number(round(100 * (position() div last())))"/>
					<xsl:text disable-output-escaping="yes"><![CDATA[, resultMsgId : ]]></xsl:text>
					<xsl:value-of select="number(last() - position() + 1)"/>
					<xsl:text disable-output-escaping="yes"><![CDATA[ }]]></xsl:text>
					<xsl:if test="position() &lt; last()">
						<xsl:text disable-output-escaping="yes"><![CDATA[,
		]]></xsl:text>
					</xsl:if>
				</xsl:for-each>
				<xsl:text disable-output-escaping="yes"><![CDATA[
				]]]></xsl:text>
			</xsl:if>
			<xsl:text disable-output-escaping="yes"><![CDATA[
			});
		});
	});
]]></xsl:text>
		</xsl:element>
	</xsl:template>
	<xsl:template name="CreateRMQForm">
		<xsl:element name="form">
			<xsl:attribute name="name">
				<xsl:text>rmq</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="action">
				<xsl:text>http://sdcstaging.webmd.com/sdclive/processor.aspx</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="method">
				<xsl:text>post</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="target">
				<xsl:text>sdc_submit</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="onsubmit">
				<xsl:text>return false;</xsl:text>
			</xsl:attribute>
			<xsl:call-template name="GetInput">
				<xsl:with-param name="type">
					<xsl:text>hidden</xsl:text>
				</xsl:with-param>
				<xsl:with-param name="name">
					<xsl:text>redirectUrl</xsl:text>
				</xsl:with-param>
				<xsl:with-param name="value">
					<xsl:text>about:blank</xsl:text>
				</xsl:with-param>
				<xsl:with-param name="id">
					<xsl:text>redirectUrl</xsl:text>
				</xsl:with-param>
			</xsl:call-template>
			<xsl:call-template name="GetInput">
				<xsl:with-param name="type">
					<xsl:text>hidden</xsl:text>
				</xsl:with-param>
				<xsl:with-param name="name">
					<xsl:text>system_formId</xsl:text>
				</xsl:with-param>
			</xsl:call-template>
			<xsl:call-template name="GetInput">
				<xsl:with-param name="type">
					<xsl:text>hidden</xsl:text>
				</xsl:with-param>
				<xsl:with-param name="name">
					<xsl:text>system_firstLandingPage</xsl:text>
				</xsl:with-param>
			</xsl:call-template>
			<xsl:call-template name="GetInput">
				<xsl:with-param name="type">
					<xsl:text>hidden</xsl:text>
				</xsl:with-param>
				<xsl:with-param name="name">
					<xsl:text>env</xsl:text>
				</xsl:with-param>
				<xsl:with-param name="value">
					<xsl:text>desktop</xsl:text>
				</xsl:with-param>
			</xsl:call-template>
			<!--quiz slides div-->
			<xsl:element name="ul">
				<xsl:attribute name="id">
					<xsl:text>rmq_slides</xsl:text>
				</xsl:attribute>

				<!--disable preload animation-->
				<!--<xsl:element name="div">
					<xsl:attribute name="id">
						<xsl:text>preload_animation</xsl:text>
					</xsl:attribute>
					<xsl:call-template name="GetImg">
						<xsl:with-param name="src">
							<xsl:value-of select="$image_server_url"/>
							<xsl:text>/webmd/consumer_assets/site_images/modules/videoloading_noscroll.gif</xsl:text>
						</xsl:with-param>
						<xsl:with-param name="alt">
							<xsl:text>Loading..Please Wait</xsl:text>
						</xsl:with-param>
						<xsl:with-param name="border">
							<xsl:text>0</xsl:text>
						</xsl:with-param>
					</xsl:call-template>
				</xsl:element>-->

				<xsl:call-template name="CreateSlides"/>
				<xsl:call-template name="CreateInterstitialSlide"/>
				<xsl:call-template name="CreateResultsSlide"/>
			</xsl:element>
		</xsl:element>
	</xsl:template>
	<xsl:template name="CreateSlides">
		<xsl:for-each select="questions/question[not(contains(normalize-space(answers/answer/atext), 'interstitial'))]">
			<xsl:call-template name="CreateQuestionSlide">
				<xsl:with-param name="slideNumber">
					<xsl:value-of select="position()"/>
				</xsl:with-param>
				<xsl:with-param name="numSlides">
					<xsl:value-of select="last()"/>
				</xsl:with-param>
			</xsl:call-template>
			<xsl:if
				test="normalize-space(defexp) != '' or normalize-space(answers/answer/aexpl) != ''">
				<xsl:call-template name="CreateAnsSlide">
					<xsl:with-param name="slideNumber">
						<xsl:value-of select="position()"/>
					</xsl:with-param>
					<xsl:with-param name="numSlides">
					<xsl:value-of select="last()"/>
				</xsl:with-param>
				</xsl:call-template>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>
	<xsl:template name="CreateQuestionSlide">
		<xsl:param name="slideNumber"/>
		<xsl:param name="numSlides"/>
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
					<!--quiz controls-->
					<xsl:element name="div">
						<xsl:attribute name="class">
							<xsl:text>slide_controls</xsl:text>
						</xsl:attribute>
						<xsl:element name="ul">
							<xsl:element name="li">
								<xsl:element name="a">
									<xsl:attribute name="href">
										<xsl:text>#</xsl:text>
									</xsl:attribute>
									<xsl:attribute name="class">
										<xsl:text>rmq_prev</xsl:text>
									</xsl:attribute>
									<xsl:attribute name="title">
										<xsl:text>Previous</xsl:text>
									</xsl:attribute>
									<xsl:element name="span">
										<xsl:attribute name="class">
											<xsl:text>icon-arrow-left</xsl:text>
										</xsl:attribute>
										<xsl:text> </xsl:text>
									</xsl:element>
								</xsl:element>
							</xsl:element>
							<xsl:element name="li">
								<xsl:element name="a">
									<xsl:attribute name="href">
										<xsl:text>#</xsl:text>
									</xsl:attribute>
									<xsl:attribute name="class">
										<xsl:text>rmq_next</xsl:text>
									</xsl:attribute>
									<xsl:attribute name="title">
										<xsl:text>Continue</xsl:text>
									</xsl:attribute>
									<xsl:element name="span">
										<xsl:attribute name="class">
											<xsl:text>icon-arrow-right</xsl:text>
										</xsl:attribute>
										<xsl:text> </xsl:text>
									</xsl:element>
								</xsl:element>
							</xsl:element>
						</xsl:element>
					</xsl:element>
					<xsl:call-template name="GetImg">
						<xsl:with-param name="img_src">
							<xsl:value-of select="$img_src"/>
						</xsl:with-param>
					</xsl:call-template>
					<xsl:element name="div">
						<xsl:attribute name="class">
							<xsl:text>slide_question</xsl:text>
						</xsl:attribute>

						<!--move progress to each slide-->
						<xsl:element name="div">
							<xsl:attribute name="class">
								<xsl:text>rmq_progress</xsl:text>
							</xsl:attribute>
							<xsl:element name="span">
								<xsl:attribute name="class">
									<xsl:text>cur_prog_title</xsl:text>
								</xsl:attribute>
								<xsl:text>Question </xsl:text>
							</xsl:element>
							<xsl:element name="span">
								<xsl:attribute name="class">
									<xsl:text>cur_prog_num</xsl:text>
								</xsl:attribute>
								<xsl:value-of select="$slideNumber"/>
							</xsl:element>
							<xsl:text>/</xsl:text>
							<xsl:element name="span">
								<xsl:attribute name="class">
									<xsl:text>tot_prog_num</xsl:text>
								</xsl:attribute>
								<xsl:value-of select="$numSlides"/>
							</xsl:element>
						</xsl:element>

						<xsl:element name="h3">
							<xsl:value-of select='normalize-space(qtext/*)'/>
						</xsl:element>
					</xsl:element>
				</xsl:element>
				<xsl:element name="div">
					<xsl:attribute name="class">
						<xsl:text>slide_text</xsl:text>
					</xsl:attribute>
					<xsl:call-template name="CreateRadioList">
						<xsl:with-param name="slideNumber">
							<xsl:value-of select="$slideNumber"/>
						</xsl:with-param>
					</xsl:call-template>
				</xsl:element>
			</xsl:element>
		</xsl:element>
	</xsl:template>
	<xsl:template name="CreateAnsSlide">
		<xsl:param name="slideNumber"/>
		<xsl:param name="numSlides"/>
		<xsl:variable name="answerMedia">
			<xsl:choose>
				<xsl:when test="answers/answer[position() = 1]/amedia/loc != ''">
					<xsl:value-of select="answers/answer[position() = 1]/amedia/loc"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:if test="qmedia/type = 'wbmd_cons_img'">
						<xsl:value-of select="qmedia/loc"/>
					</xsl:if>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
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
					<!--quiz controls-->
					<xsl:element name="div">
						<xsl:attribute name="class">
							<xsl:text>slide_controls</xsl:text>
						</xsl:attribute>
						<xsl:element name="ul">
							<xsl:element name="li">
								<xsl:element name="a">
									<xsl:attribute name="href">
										<xsl:text>#</xsl:text>
									</xsl:attribute>
									<xsl:attribute name="class">
										<xsl:text>rmq_prev</xsl:text>
									</xsl:attribute>
									<xsl:attribute name="title">
										<xsl:text>Previous</xsl:text>
									</xsl:attribute>
									<xsl:element name="span">
										<xsl:attribute name="class">
											<xsl:text>icon-arrow-left</xsl:text>
										</xsl:attribute>
										<xsl:text> </xsl:text>
									</xsl:element>
								</xsl:element>
							</xsl:element>
							<xsl:element name="li">
								<xsl:element name="a">
									<xsl:attribute name="href">
										<xsl:text>#</xsl:text>
									</xsl:attribute>
									<xsl:attribute name="class">
										<xsl:text>rmq_next</xsl:text>
									</xsl:attribute>
									<xsl:attribute name="title">
										<xsl:text>Continue</xsl:text>
									</xsl:attribute>
									<xsl:element name="span">
										<xsl:attribute name="class">
											<xsl:text>icon-arrow-right</xsl:text>
										</xsl:attribute>
										<xsl:text> </xsl:text>
									</xsl:element>
								</xsl:element>
							</xsl:element>
						</xsl:element>
					</xsl:element>
					<xsl:call-template name="GetImg">
						<xsl:with-param name="img_src">
							<xsl:value-of select="$img_src"/>
						</xsl:with-param>
					</xsl:call-template>
					<xsl:element name="div">
						<xsl:attribute name="class">
							<xsl:text>slide_question</xsl:text>
						</xsl:attribute>

						<!--move progress to each slide-->
						<xsl:element name="div">
							<xsl:attribute name="class">
								<xsl:text>rmq_progress</xsl:text>
							</xsl:attribute>
							<xsl:element name="span">
								<xsl:attribute name="class">
									<xsl:text>cur_prog_title</xsl:text>
								</xsl:attribute>
								<xsl:text>Answer </xsl:text>
							</xsl:element>
							<xsl:element name="span">
								<xsl:attribute name="class">
									<xsl:text>cur_prog_num</xsl:text>
								</xsl:attribute>
								<xsl:value-of select="$slideNumber"/>
							</xsl:element>
							<xsl:text>/</xsl:text>
							<xsl:element name="span">
								<xsl:attribute name="class">
									<xsl:text>tot_prog_num</xsl:text>
								</xsl:attribute>
								<xsl:value-of select="$numSlides"/>
							</xsl:element>
						</xsl:element>

						<xsl:element name="h3">
							<xsl:value-of select='normalize-space(qtext/*)'/>
						</xsl:element>
					</xsl:element>
				</xsl:element>
				<xsl:element name="div">
					<xsl:attribute name="class">
						<xsl:text>slide_text</xsl:text>
					</xsl:attribute>
					<xsl:element name="ul">
						<xsl:attribute name="class">
							<xsl:text>rmq_answers</xsl:text>
						</xsl:attribute>
						<xsl:element name="li">
							<xsl:attribute name="class">
								<xsl:text>user_answer</xsl:text>
								<xsl:if test="parent::questions/parent::quiz/scoretype = 'None'">
									<xsl:text><![CDATA[ noscore]]></xsl:text>
								</xsl:if>
							</xsl:attribute>
							<xsl:text><![CDATA[You answered: ]]></xsl:text>
							<xsl:element name="span">
								<xsl:attribute name="class">
									<xsl:text>answer_text</xsl:text>
								</xsl:attribute>
								<xsl:text> </xsl:text>
							</xsl:element>
						</xsl:element>
						<xsl:if test="parent::questions/parent::quiz/scoretype != 'None'">
							<xsl:element name="li">
								<xsl:attribute name="class">
									<xsl:text>correct_answer</xsl:text>
								</xsl:attribute>
								<xsl:text><![CDATA[The Correct Answer: ]]></xsl:text>
								<xsl:element name="span">
									<xsl:attribute name="class">
										<xsl:text>answer_text</xsl:text>
									</xsl:attribute>
									<xsl:text> </xsl:text>
								</xsl:element>
							</xsl:element>
						</xsl:if>
					</xsl:element>
					<xsl:if test="normalize-space(defexp) != ''">
						<xsl:element name="div">
							<xsl:attribute name="class">
								<xsl:text>answer_expl</xsl:text>
							</xsl:attribute>
							<xsl:element name="div">
								<xsl:attribute name="class">
									<xsl:text>expl_content</xsl:text>
								</xsl:attribute>
								<xsl:apply-templates select="defexp/*"/>
							</xsl:element>
						</xsl:element>
					</xsl:if>
					<xsl:for-each select="answers/answer">
						<xsl:if test="normalize-space(aexpl) != ''">
							<xsl:element name="div">
								<xsl:attribute name="class">
									<xsl:text>answer_expl</xsl:text>
								</xsl:attribute>
								<xsl:attribute name="id">
									<xsl:text>answer_q</xsl:text>
									<xsl:value-of
										select="count(parent::answers/parent::question/preceding-sibling::question) + 1"/>
									<xsl:call-template name="NumberToLetter">
										<xsl:with-param name="number">
											<xsl:value-of select="position()"/>
										</xsl:with-param>
									</xsl:call-template>
								</xsl:attribute>
								<xsl:element name="div">
									<xsl:attribute name="class">
										<xsl:text>expl_content</xsl:text>
									</xsl:attribute>
									<xsl:apply-templates select="aexpl/*"/>
								</xsl:element>
							</xsl:element>
						</xsl:if>
					</xsl:for-each>
				</xsl:element>
			</xsl:element>
		</xsl:element>
	</xsl:template>
	<xsl:template name="CreateRadioList">
		<xsl:param name="slideNumber"/>
		<xsl:call-template name="GetInput">
			<xsl:with-param name="type">
				<xsl:text>hidden</xsl:text>
			</xsl:with-param>
			<xsl:with-param name="name">
				<xsl:text>q</xsl:text>
				<xsl:value-of select="$slideNumber"/>
			</xsl:with-param>
			<xsl:with-param name="id">
				<xsl:text>q</xsl:text>
				<xsl:value-of select="$slideNumber"/>
			</xsl:with-param>
		</xsl:call-template>
		<xsl:element name="ul">
			<xsl:attribute name="class">
				<xsl:text>radio_inputs</xsl:text>
			</xsl:attribute>
			<xsl:for-each select="answers/answer">
				<xsl:element name="li">
					<xsl:element name="a">
						
						<xsl:attribute name="href">
							<xsl:text>#</xsl:text>
						</xsl:attribute>
						<xsl:attribute name="data-selected-answer">
							<xsl:call-template name="NumberToLetter">
								<xsl:with-param name="number">
									<xsl:value-of select="position()"/>
								</xsl:with-param>
							</xsl:call-template>
						</xsl:attribute>
						
						<xsl:element name="div">
							<xsl:attribute name="class">
								<xsl:text>input</xsl:text>
							</xsl:attribute>
							<xsl:call-template name="NumberToLetter">
								<xsl:with-param name="number">
									<xsl:value-of select="position()"/>
								</xsl:with-param>
							</xsl:call-template>
						</xsl:element>
						<xsl:element name="p">
							<xsl:value-of select='normalize-space(atext/*)'/>
						</xsl:element>
						
					</xsl:element>
				</xsl:element>
			</xsl:for-each>
		</xsl:element>
	</xsl:template>
	<xsl:template name="CreateInterstitialSlide">
		<xsl:for-each
			select="questions/question[contains(normalize-space(answers/answer/atext), 'interstitial')]">
			<xsl:if
				test="($site_id = 8 and (contains(normalize-space(answers/answer/atext), 'mobile') or contains(normalize-space(answers/answer/atext), 'both'))) or ($site_id = 3 and not(contains(normalize-space(answers/answer/atext), 'mobile')))">
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
								<xsl:text>slide_text</xsl:text>
							</xsl:attribute>
							<xsl:element name="h3">
								<xsl:choose>
									<xsl:when
										test="normalize-space(questions/question[contains(normalize-space(answers/answer/atext), 'interstitial')]/qtext) = ''">
										<xsl:text disable-output-escaping="yes">Calculating results&amp;hellip;</xsl:text>
									</xsl:when>
									<xsl:otherwise>
										<xsl:for-each
											select="questions/question[contains(normalize-space(answers/answer/atext), 'interstitial')]/qtext/*">
											<xsl:value-of select="normalize-space(.)"/>
										</xsl:for-each>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:element>
							<xsl:element name="div">
								<xsl:attribute name="id">
									<xsl:text>rmq_ad_placeholder</xsl:text>
								</xsl:attribute>
								<xsl:text> </xsl:text>
							</xsl:element>
							<xsl:element name="a">
								<xsl:attribute name="href">
									<xsl:text>#</xsl:text>
								</xsl:attribute>
								<xsl:attribute name="class">
									<xsl:text>goto_results</xsl:text>
								</xsl:attribute>
								<xsl:text>Continue to Results &gt;</xsl:text>
							</xsl:element>
						</xsl:element>
					</xsl:element>
				</xsl:element>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>
	<xsl:template name="CreateResultsSlide">
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
					<xsl:text> </xsl:text>
					<xsl:call-template name="GetImg">
						<xsl:with-param name="img_src">
							<xsl:value-of select="$img_src"/>
						</xsl:with-param>
					</xsl:call-template>
				</xsl:element>
				<xsl:element name="div">
					<xsl:attribute name="class">
						<xsl:text>slide_text</xsl:text>
					</xsl:attribute>
					<xsl:if test="scoretype != 'None'">
						<xsl:element name="div">
							<xsl:attribute name="id">
								<xsl:text>rmq_total_pct</xsl:text>
							</xsl:attribute>
							<xsl:text>Your Score: </xsl:text>
							<xsl:element name="span">
								<xsl:attribute name="class">
									<xsl:text>score_pct</xsl:text>
								</xsl:attribute>
								<xsl:text> </xsl:text>
							</xsl:element>
							<xsl:element name="p">
								<xsl:attribute name="class">
									<xsl:text>score_text</xsl:text>
								</xsl:attribute>
								<xsl:text>You correctly answered </xsl:text>
								<xsl:element name="span">
									<xsl:attribute name="class">
										<xsl:text>score_num_correct</xsl:text>
									</xsl:attribute>
									<xsl:text> </xsl:text>
								</xsl:element>
								<xsl:text> out of </xsl:text>
								<xsl:element name="span">
									<xsl:attribute name="class">
										<xsl:text>score_num_total</xsl:text>
									</xsl:attribute>
									<xsl:text> </xsl:text>
								</xsl:element>
								<xsl:text> questions.</xsl:text>
							</xsl:element>
						</xsl:element>
						<xsl:element name="div">
							<xsl:attribute name="id">
								<xsl:text>rmq_total_rank</xsl:text>
							</xsl:attribute>
							<xsl:text>Your Score: </xsl:text>
							<xsl:element name="span">
								<xsl:attribute name="class">
									<xsl:text>score_rank</xsl:text>
								</xsl:attribute>
								<xsl:text> </xsl:text>
							</xsl:element>
							<xsl:element name="p">
								<xsl:attribute name="class">
									<xsl:text>score_text</xsl:text>
								</xsl:attribute>
								<xsl:text>You correctly answered </xsl:text>
								<xsl:element name="span">
									<xsl:attribute name="class">
										<xsl:text>score_num_correct</xsl:text>
									</xsl:attribute>
									<xsl:text> </xsl:text>
								</xsl:element>
								<xsl:text> out of </xsl:text>
								<xsl:element name="span">
									<xsl:attribute name="class">
										<xsl:text>score_num_total</xsl:text>
									</xsl:attribute>
									<xsl:text> </xsl:text>
								</xsl:element>
								<xsl:text> questions.</xsl:text>
							</xsl:element>
						</xsl:element>
					</xsl:if>
					<xsl:for-each select="results/result">
						<xsl:element name="div">
							<xsl:attribute name="class">
								<xsl:text>rmq_results</xsl:text>
							</xsl:attribute>
							<xsl:attribute name="id">
								<xsl:text>results_</xsl:text>
								<xsl:value-of select="position()"/>
							</xsl:attribute>
							<xsl:apply-templates select="restext/*"/>
						</xsl:element>
					</xsl:for-each>
					<xsl:element name="div">
						<xsl:attribute name="id">
							<xsl:text>results_controls</xsl:text>
						</xsl:attribute>
						<xsl:element name="a">
							<xsl:attribute name="href">
								<xsl:text>#</xsl:text>
							</xsl:attribute>
							<xsl:attribute name="class">
								<xsl:text>rmq_retake</xsl:text>
							</xsl:attribute>
							<xsl:text>Retake Quiz</xsl:text>
						</xsl:element>
						<xsl:element name="a">
							<xsl:attribute name="href">
								<xsl:text>#</xsl:text>
							</xsl:attribute>
							<xsl:attribute name="class">
								<xsl:text>rmq_next_article</xsl:text>
							</xsl:attribute>
							<xsl:element name="span">
								<xsl:attribute name="class">
									<xsl:text>text</xsl:text>
								</xsl:attribute>
								<xsl:element name="span">
									<xsl:attribute name="class">
										<xsl:text>wbmd-subhead</xsl:text>
									</xsl:attribute>
								</xsl:element>
								<xsl:element name="span">
									<xsl:attribute name="class">
										<xsl:text>wbmd-title</xsl:text>
									</xsl:attribute>
								</xsl:element>
							</xsl:element>
						</xsl:element>

						<!--disable social sharing icons temporarily-->
						<!--<xsl:if test="scoretype != 'None'">
							<xsl:element name="a">
								<xsl:attribute name="href">
									<xsl:text>http://www.facebook.com/</xsl:text>
								</xsl:attribute>
								<xsl:attribute name="class">
									<xsl:text>rmq_social_ico rmq_results_fb</xsl:text>
								</xsl:attribute>
								<xsl:attribute name="title">
									<xsl:text>Facebook</xsl:text>
								</xsl:attribute>
							</xsl:element>
							<xsl:element name="a">
								<xsl:attribute name="href">
									<xsl:text>http://www.twitter.com/</xsl:text>
								</xsl:attribute>
								<xsl:attribute name="class">
									<xsl:text>rmq_social_ico rmq_results_tw</xsl:text>
								</xsl:attribute>
								<xsl:attribute name="title">
									<xsl:text>Facebook</xsl:text>
								</xsl:attribute>
							</xsl:element>
						</xsl:if>-->

					</xsl:element>

					<!--disable related articles/links-->
					<!--<xsl:if test="rellink/related_links_header != ''">
						<xsl:element name="div">
							<xsl:attribute name="class">
								<xsl:text>more_reading_rdr</xsl:text>
							</xsl:attribute>
							<xsl:element name="h3">
								<xsl:value-of disable-output-escaping="no"
									select="rellink/related_links_header"/>
							</xsl:element>
							<xsl:apply-templates select="rellink/related_links_text/*"/>
						</xsl:element>
					</xsl:if>-->

				</xsl:element>
			</xsl:element>
		</xsl:element>
	</xsl:template>
	<xsl:template match="li[boolean(parent::ul/parent::related_links_text)]">
		<xsl:choose>
			<xsl:when test="a/@chronic_id != ''">
				<xsl:element name="li">
					<xsl:element name="a">
						<xsl:attribute name="href">
							<xsl:call-template name="GetURLRef">
								<xsl:with-param name="ObjectID">
									<xsl:value-of select="a/@chronic_id"/>
								</xsl:with-param>
							</xsl:call-template>
						</xsl:attribute>
						<xsl:attribute name="onclick">
							<xsl:call-template name="GetOnclickVal">
								<xsl:with-param name="tracking_val">
									<xsl:text>rmq-rltd_</xsl:text>
									<xsl:value-of select="count(preceding-sibling::li) + 1"/>
								</xsl:with-param>
							</xsl:call-template>
						</xsl:attribute>
						<xsl:value-of select="a"/>
					</xsl:element>
				</xsl:element>
			</xsl:when>
			<xsl:otherwise>
				<xsl:element name="li">
					<xsl:apply-templates/>
				</xsl:element>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="CreateMediaDiv">
		<xsl:if test="questions/question/qmedia/type = 'wbmd_cons_video'">
			<xsl:element name="div">
				<xsl:attribute name="id">
					<xsl:text>rmq_media</xsl:text>
				</xsl:attribute>
				<!--swf-object.js-->
				<xsl:element name="script">
					<xsl:attribute name="language">
						<xsl:text>javascript</xsl:text>
					</xsl:attribute>
					<xsl:attribute name="type">
						<xsl:text>text/javascript</xsl:text>
					</xsl:attribute>
					<xsl:attribute name="src">
						<xsl:value-of select="$image_server_url"/>
						<xsl:text>/webmd/consumer_assets/site_images/javascript/swf-object.js</xsl:text>
					</xsl:attribute>
				</xsl:element>
				<!--configurableVideoPlayer.js-->
				<xsl:element name="script">
					<xsl:attribute name="language">
						<xsl:text>javascript</xsl:text>
					</xsl:attribute>
					<xsl:attribute name="type">
						<xsl:text>text/javascript</xsl:text>
					</xsl:attribute>
					<xsl:attribute name="src">
						<xsl:value-of select="$image_server_url"/>
						<xsl:text>/webmd/consumer_assets/site_images/javascript/configurableVideoPlayer.js?cache=4</xsl:text>
					</xsl:attribute>
				</xsl:element>
				<xsl:element name="script">
					<xsl:attribute name="language">
						<xsl:text>javascript</xsl:text>
					</xsl:attribute>
					<xsl:attribute name="type">
						<xsl:text>text/javascript</xsl:text>
					</xsl:attribute>
					<xsl:text disable-output-escaping="yes"><![CDATA[function staticCustomLink(x, y) {
	if (y == 'moduleClick') {
		//clicking on link stays within the flash app
		wmdPageLink(x);
	}
	if (y == 'pageClick') {
		//clicking on the link takes user to another WebMD page outside of the Flash app
		ctrs(x);
	}
	if (y == 'pageView') {
		var z = location.href.split("?")[0];
		var zz = z.split("#")[0];
		zz = zz.replace(/http:\/\/www.webmd.com/, "webmd.com");
		zz = zz.replace("default.htm", "")
		x = zz.replace(/http:\/\//, "") + x;
		//alert(x);
		wmdPageview(x);
	}
}

function wmdTrackSponsorVideo(videoname, status) {
	var s_md, _page;
	s_md = s_gi(s_account);
	s_md.linkTrackVars = "prop9,prop17,prop18,prop20,prop34,prop50";
	s_md.prop17 = "sponsorvideo";
	s_md.prop18 = "sponsorvideo_" + status;
	s_md.prop20 = videoname + "_sponsorvideo_" + status;
	s_md.prop34 = videoname + "_sponsorvideo";
	s_md.prop9 = "";
	if (status == "start") {
		s_md.prop9 = "allvideo_start";
	}
	if (status == "100pct") {
		s_md.prop9 = "allvideo_100pct";
	}
	void(s_md.tl(true, 'o', s_md.prop20));
}

function openNewFixedSizeWindow(url, name, features) {
	//alert("open windows");
	win = window.open(url, name, features);
	win.focus();
}

webmd.vp = {};
webmd.vp.play = function () {
	var t = false;
	try {
		window.document.vidplyr.playVideoById(webmd.url.getParam("vid"));
		t = true;
	} catch (e) {}
	if (t) {
		webmd.vp.c = window.clearInterval(webmd.vp.c);
	}
}]]></xsl:text>
				</xsl:element>
				<xsl:for-each select="questions/question[qmedia/type = 'wbmd_cons_video']">
					<xsl:element name="div">
						<xsl:attribute name="class">
							<xsl:text>clearingDiv</xsl:text>
						</xsl:attribute>
						<xsl:text> </xsl:text>
					</xsl:element>
					<xsl:element name="div">
						<xsl:attribute name="class">
							<xsl:text>vidplayer_box_rdr</xsl:text>
						</xsl:attribute>
						<xsl:element name="div">
							<xsl:attribute name="class">
								<xsl:text>vp_top_fmt</xsl:text>
							</xsl:attribute>
							<xsl:element name="div">
								<xsl:attribute name="class">
									<xsl:text>vp_tpl_fmt</xsl:text>
								</xsl:attribute>
								<xsl:element name="div">
									<xsl:attribute name="class">
										<xsl:text>vp_tpr_fmt</xsl:text>
									</xsl:attribute>
									<xsl:text> </xsl:text>
								</xsl:element>
							</xsl:element>
						</xsl:element>
						<xsl:element name="div">
							<xsl:attribute name="class">
								<xsl:text>vp_rght_fmt</xsl:text>
							</xsl:attribute>
							<xsl:element name="div">
								<xsl:attribute name="id">
									<xsl:text>rmqvideo</xsl:text>
									<xsl:value-of select="position()"/>
								</xsl:attribute>
								<xsl:attribute name="class">
									<xsl:text>flashcontent</xsl:text>
								</xsl:attribute>
								<xsl:element name="script">
									<xsl:attribute name="type">
										<xsl:text>text/javascript</xsl:text>
									</xsl:attribute>
									<xsl:attribute name="language">
										<xsl:text>javascript1.2</xsl:text>
									</xsl:attribute>
									<xsl:text disable-output-escaping="yes"><![CDATA[
webmd.m.vpVars = {};

/* Set Defaults */
webmd.m.vpVars.columns = '';
webmd.m.vpVars.type = 'base_layout_fmt';
webmd.m.vpVars.imgsrvr = ']]></xsl:text>
									<xsl:value-of select="$image_server_url"/>
									<xsl:text disable-output-escaping="yes"><![CDATA[';
webmd.m.noHTML5 = false;
/* END Defaults */

webmd.m.vpVars.config = ']]></xsl:text>
									<xsl:value-of select="normalize-space(qmedia/loc)"/>
									<xsl:text disable-output-escaping="yes"><![CDATA[';
webmd.m.vpVars.type = 'rmq_video_box';

webmd.m.checkVideoType("rmqvideo]]></xsl:text>
									<xsl:value-of select="position()"/>
									<xsl:text><![CDATA[",webmd.m.vpVars.type,webmd.m.vpVars.columns,webmd.m.vpVars.imgsrvr,webmd.m.vpVars.config,"]]></xsl:text>
									<xsl:value-of select="$image_server_url"/>
									<xsl:text><![CDATA[",webmd.m.noHTML5);
]]></xsl:text>
								</xsl:element>
							</xsl:element>
						</xsl:element>
					</xsl:element>
				</xsl:for-each>
			</xsl:element>
		</xsl:if>
	</xsl:template>
	<!--sources templates-->
	<xsl:template name="CreateSources">
		<div class="rmq_footer">
			<!-- Reviewer Section -->
			<xsl:call-template name="ReviewedByOnText"/>
			<!-- Citations Section -->
			<xsl:if test="normalize-space(citations) != ''">
				<xsl:element name="div">
					<xsl:element name="p">
						<xsl:element name="a">
							<xsl:attribute name="href">
								<xsl:text>#sources_fmt</xsl:text>
							</xsl:attribute>
							<xsl:attribute name="class">
								<xsl:text>toggle</xsl:text>
							</xsl:attribute>
							<xsl:text>Sources</xsl:text>
						</xsl:element>
						<xsl:element name="div">
							<xsl:attribute name="id">
								<xsl:text>sources_fmt</xsl:text>
							</xsl:attribute>
							<xsl:apply-templates
								select="/webmd_rendition/content/wbmd_asset/content_section/quiz/citations"
							/>
						</xsl:element>
					</xsl:element>
				</xsl:element>
			</xsl:if>
			<!-- Disclaimer Section -->
			<xsl:element name="div">
				<xsl:element name="p">
					<xsl:text>This tool does not provide medical advice. </xsl:text>
					<xsl:element name="a">
						<xsl:attribute name="href">
							<xsl:text>#disclaimer_fmt</xsl:text>
						</xsl:attribute>
						<xsl:attribute name="class">
							<xsl:text>toggle</xsl:text>
						</xsl:attribute>
						<xsl:text>See additional information</xsl:text>
					</xsl:element>
					<xsl:element name="div">
						<xsl:attribute name="id">
							<xsl:text>disclaimer_fmt</xsl:text>
						</xsl:attribute>
						<xsl:element name="p">
							<xsl:choose>
								<xsl:when
									test="normalize-space(/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_disclmr/wbmd_disclaimer/disclaimer_statement) = ''">
									<xsl:text disable-output-escaping="yes"><![CDATA[THIS TOOL DOES NOT PROVIDE MEDICAL ADVICE. &nbsp;It is intended for general informational purposes only and does not address individual circumstances. It is not a substitute for professional medical advice, diagnosis or treatment and should not be relied on to make decisions about your health. Never ignore professional medical advice in seeking treatment because of something you have read on the WebMD Site. If you think you may have a medical emergency, immediately call your doctor or dial 911.]]></xsl:text>
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of
										select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_disclmr/wbmd_disclaimer/disclaimer_statement"
										disable-output-escaping="yes"/>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:element>
					</xsl:element>
				</xsl:element>
			</xsl:element>
			<!-- Copyright -->
			<xsl:element name="p">
				<xsl:attribute name="class">
					<xsl:text>tool_copyright</xsl:text>
				</xsl:attribute>
				<xsl:choose>
					<xsl:when
						test="normalize-space(/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_copyrt/wbmd_copyright_statement) = ''">
						<xsl:text disable-output-escaping="yes"><![CDATA[&copy; 2014 WebMD, LLC. All rights reserved.]]></xsl:text>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of
							select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_copyrt/wbmd_copyright_statement"
						/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:element>
		</div>
	</xsl:template>
	<xsl:template name="ReviewedByOnText">
		<xsl:if
			test="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_person/wbmd_first_nm or (/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_revw_dt !='nulldate')">
			<xsl:element name="p">
				<xsl:choose>
					<xsl:when
						test="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_person/wbmd_first_nm">
						<xsl:call-template name="ReviewerText"/>
						<xsl:if
							test="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_revw_dt !='nulldate'">
							<xsl:text> on </xsl:text>
							<xsl:call-template name="Convert_Date">
								<xsl:with-param name="date">
									<xsl:value-of
										select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_revw_dt"
									/>
								</xsl:with-param>
							</xsl:call-template>
						</xsl:if>
					</xsl:when>
					<xsl:otherwise>
						<xsl:text>Reviewed on </xsl:text>
						<xsl:call-template name="Convert_Date">
							<xsl:with-param name="date">
								<xsl:value-of
									select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_revw_dt"
								/>
							</xsl:with-param>
						</xsl:call-template>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:element>
		</xsl:if>
	</xsl:template>
	<!--  *******   -->
	<xsl:template name="ReviewerText">
		<xsl:if
			test="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_person/wbmd_first_nm">
			<xsl:text>Reviewed by </xsl:text>
			<xsl:variable name="furl2">
				<xsl:call-template name="GetURLRef">
					<xsl:with-param name="ObjectID">
						<xsl:value-of
							select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_person/wbmd_bio_obj_id/@chronic_id"
						/>
					</xsl:with-param>
				</xsl:call-template>
			</xsl:variable>
			<xsl:choose>
				<xsl:when test="$furl2!=''">
					<xsl:element name="a">
						<xsl:attribute name="onclick">
							<xsl:call-template name="GetOnclickVal">
								<xsl:with-param name="link_type">
									<xsl:text>nw</xsl:text>
								</xsl:with-param>
								<xsl:with-param name="tracking_val">
									<xsl:text>art_medrev</xsl:text>
								</xsl:with-param>
							</xsl:call-template>
						</xsl:attribute>
						<xsl:attribute name="href">
							<xsl:value-of select="$furl2"/>
						</xsl:attribute>
						<xsl:value-of
							select="concat(/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_person/wbmd_first_nm, ' ')"/>
						<xsl:if
							test="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_person/wbmd_middle_name">
							<xsl:value-of
								select="concat(/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_person/wbmd_middle_name, ' ')"
							/>
						</xsl:if>
						<xsl:value-of
							select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_person/wbmd_lst_nm"/>
						<xsl:for-each
							select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_person/wbmd_person_suffix_group/wbmd_person_suffix">
							<xsl:value-of select="concat(', ', @wbmd_disp_nm)"/>
						</xsl:for-each>
					</xsl:element>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of
						select="concat(/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_person/wbmd_first_nm, ' ')"/>
					<xsl:if
						test="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_person/wbmd_middle_name">
						<xsl:value-of
							select="concat(/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_person/wbmd_middle_name, ' ')"
						/>
					</xsl:if>
					<xsl:value-of
						select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_person/wbmd_lst_nm"/>
					<xsl:for-each
						select="/webmd_rendition/content/wbmd_asset/metadata_section/wbmd_prim_med_revr/wbmd_person/wbmd_person_suffix_group/wbmd_person_suffix">
						<xsl:value-of select="concat(', ', @wbmd_disp_nm)"/>
					</xsl:for-each>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:if>
	</xsl:template>
	<!--  *******   -->
	<!--   DATE CONVERSION TEMPLATES -->
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
	<!-- END DATE CONVERSION TEMPLATES -->
	<!--  *******   -->
	<!-- Match any citations -->
	<!-- Dont write citations element -->
	<xsl:template match="citations">
		<!-- Write anything below citations -->
		<xsl:apply-templates/>
	</xsl:template>
	<xsl:template match="*">
		<xsl:variable name="link_icon_type">
			<xsl:call-template name="GetLinkIconType">
				<xsl:with-param name="link_href">
					<xsl:value-of select="@href"/>
				</xsl:with-param>
				<xsl:with-param name="tag_value">
					<xsl:choose>
						<xsl:when test="starts-with(., $vid_icon_tag)">
							<xsl:value-of select="$vid_icon_tag"/>
						</xsl:when>
						<xsl:when test="starts-with(., $comm_icon_tag)">
							<xsl:value-of select="$comm_icon_tag"/>
						</xsl:when>
						<xsl:when test="starts-with(., $ss_icon_tag)">
							<xsl:value-of select="$ss_icon_tag"/>
						</xsl:when>
					</xsl:choose>
				</xsl:with-param>
			</xsl:call-template>
		</xsl:variable>
		<xsl:element name="{local-name(.)}">
			<xsl:for-each select="@*">
				<xsl:copy-of select="."/>
			</xsl:for-each>
			<xsl:if test="$link_icon_type != ''">
				<xsl:attribute name="class">
					<xsl:value-of select="$link_icon_type"/>
				</xsl:attribute>
			</xsl:if>
			<!--metrics for related links-->
			<xsl:if test="parent::li/parent::ul/parent::related_links_text">
				<xsl:attribute name="onclick">
					<xsl:call-template name="GetOnclickVal">
						<xsl:with-param name="tracking_val">
							<xsl:text>rmq-rltd_</xsl:text>
							<xsl:value-of select="count(parent::li/preceding-sibling::li) + 1"/>
						</xsl:with-param>
						<xsl:with-param name="link_type">
							<xsl:if test="@target='_blank'">
								<xsl:text>nw</xsl:text>
							</xsl:if>
						</xsl:with-param>
					</xsl:call-template>
				</xsl:attribute>
			</xsl:if>
			<xsl:apply-templates/>
			<xsl:if test="$link_icon_type != ''">
				<xsl:element name="i">
					<xsl:text> </xsl:text>
				</xsl:element>
			</xsl:if>
		</xsl:element>
	</xsl:template>
	<xsl:template match="text()">
		<!--<xsl:value-of select="." disable-output-escaping="yes"/>-->
		<xsl:value-of select="normalize-space(.)"/>
		<xsl:if test="substring(., string-length(.)) = ' ' and substring(., string-length(.) - 1, string-length(.)) != '  '">
			<xsl:text> </xsl:text>
		</xsl:if>
	</xsl:template>
	<!--identity templates-->
	<xsl:template name="CreateIdentity">
		<xsl:text disable-output-escaping="yes"><![CDATA[<!--
		updated 10-05-11 at 11:51am EWS
]]></xsl:text>
		<xsl:for-each select="/*">
			<xsl:apply-templates mode="identity" select="."/>
		</xsl:for-each>
		<xsl:text disable-output-escaping="yes"><![CDATA[
-->
]]></xsl:text>
	</xsl:template>
	<xsl:template match="@*|*|processing-instruction()|comment()" mode="identity">
		<xsl:copy>
			<xsl:apply-templates select="*|@*|text()|processing-instruction()|comment()"
				mode="identity"/>
		</xsl:copy>
	</xsl:template>
	<xsl:template match="text()" mode="identity">
		<xsl:choose>
			<!--replaces any double dash in the content with the html code, -->
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
	<xsl:template name="GetLinkIconType">
		<xsl:param name="link_href"/>
		<xsl:param name="tag_value"/>
		<xsl:choose>
			<xsl:when test="$tag_value = $comm_icon_tag">
				<xsl:text>type_com</xsl:text>
			</xsl:when>
			<xsl:when test="$tag_value = $vid_icon_tag">
				<xsl:text>type_vid</xsl:text>
			</xsl:when>
			<xsl:when test="$tag_value = $ss_icon_tag">
				<xsl:text>type_ss</xsl:text>
			</xsl:when>
			<xsl:when
				test="contains(string($link_href),'blogs.') or contains(string($link_href),'boards.')">
				<xsl:text>type_com</xsl:text>
			</xsl:when>
			<xsl:when
				test="contains(string($link_href),'/video/') or contains(string($link_href),'-tv')">
				<xsl:text>type_vid</xsl:text>
			</xsl:when>
			<xsl:when test="contains(string($link_href),'slideshow')">
				<xsl:text>type_ss</xsl:text>
			</xsl:when>
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
	<xsl:template name="GetLinkType">
		<xsl:param name="Value"/>
		<xsl:choose>
			<xsl:when test="$Value = 'Window' or $Value = 'New Window – 1000x600'">nw</xsl:when>
			<xsl:when test="$Value = 'Pop Up' or $Value = 'Small Pop Up - 380x210'">sp</xsl:when>
			<xsl:when test="$Value = 'SDC Pop Up – 600x700'">sdp</xsl:when>
			<xsl:when test="$Value = 'Scrollable Pop Up – 530x490'">scp</xsl:when>
			<xsl:otherwise/>
		</xsl:choose>
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
				<xsl:otherwise>http://<xsl:value-of
						select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target[@siteid=$site_id]/@prefix[1]"
						/>.<xsl:value-of select="$domain"/>
					<xsl:value-of
						select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target[@siteid=$site_id]/@friendlyurl[1]"
					/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:if>
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
	<xsl:template name="GetBr">
		<br/>
	</xsl:template>
	<xsl:template name="GetImg">
		<xsl:param name="img_src"/>
		<xsl:choose>
			<xsl:when test="normalize-space($img_src) != normalize-space($image_server_url)">
				<img class="rsImg" src="{$img_src}" alt="slide image"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text> </xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="GetInput">
		<xsl:param name="type"/>
		<xsl:param name="name"/>
		<xsl:param name="value"/>
		<xsl:param name="id"/>
		<xsl:choose>
			<xsl:when test="$type != '' and $name != '' and $id = ''">
				<xsl:choose>
					<xsl:when test="$value = ''">
						<input type="{$type}" name="{$name}" value=""/>
					</xsl:when>
					<xsl:otherwise>
						<input type="{$type}" name="{$name}" value="{$value}"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:when test="$type != '' and $name != '' and $id != ''">
				<xsl:choose>
					<xsl:when test="$value = ''">
						<input type="{$type}" name="{$name}" value="" id="{$id}"/>
					</xsl:when>
					<xsl:otherwise>
						<input type="{$type}" name="{$name}" value="{$value}" id="{$id}"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="NumberToLetter">
		<xsl:param name="number"/>
		<xsl:choose>
			<xsl:when test="$number &lt; 10">
				<xsl:value-of select="translate($number, '123456789','abcdefghi')"/>
			</xsl:when>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>

<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<!-- Force the output to be strict XHTML -->
	<xsl:output method="xml" omit-xml-declaration="yes" indent="yes"></xsl:output>
	<xsl:param name="class_id"></xsl:param>
	<xsl:param name="image_server_url">
		<xsl:text>http://img.preview.webmd.com/dtmcms/preview</xsl:text>
	</xsl:param>
	<xsl:param name="moduletitle">prm-rspsvhero</xsl:param>
	<xsl:param name="site_id">3</xsl:param>
	<xsl:param name="domain">webmd.com</xsl:param>
	<!-- <xsl:param name="module_label_1">
		<xsl:value-of select="webmd_rendition/content/wbmd_asset/webmd_module/module_settings/md_pb_module_label1_group/wbmd_pb_module_label1/@wbmd_disp_nm" />
	</xsl:param> -->
	<xsl:param name="module_label_2">
		<xsl:value-of select="webmd_rendition/content/wbmd_asset/webmd_module/module_settings/md_pb_module_label2_group/wbmd_pb_module_label2/@wbmd_disp_nm" />
	</xsl:param>
	<xsl:param name="hero_number">
		<!-- <xsl:if test="$module_label_1 = 'TOC'"> -->
			<xsl:choose>
				<xsl:when test="$module_label_2 = 'Hero Single Unit'">
					<xsl:text>1</xsl:text>
				</xsl:when>
				<xsl:when test="$module_label_2 = 'Hero Double Unit'">
					<xsl:text>2</xsl:text>
				</xsl:when>
				<xsl:when test="$module_label_2 = 'Hero Triple Unit'">
					<xsl:text>3</xsl:text>
				</xsl:when>
			</xsl:choose>
		<!-- </xsl:if> -->
	</xsl:param>

	<xsl:template match="/">
		<xsl:apply-templates select="webmd_rendition/content/wbmd_asset/webmd_module/module_data"></xsl:apply-templates>
	</xsl:template>
	<xsl:template match="module_data">
		<xsl:call-template name="getHeroTemplate"></xsl:call-template>
	</xsl:template>

	<!-- Get Hero Template -->
	<xsl:template name="getHeroTemplate">
		<!-- <xsl:if test="$module_label_1 = 'TOC'"> -->
			<xsl:choose>
				<xsl:when test="$module_label_2 = 'Hero Single Unit'">
					<xsl:call-template name="heroSingleUnitTemp"></xsl:call-template>
				</xsl:when>
				<xsl:when test="$module_label_2 = 'Hero Double Unit'">
					<xsl:call-template name="heroDoubleUnitTemp"></xsl:call-template>
				</xsl:when>
				<xsl:when test="$module_label_2 = 'Hero Triple Unit'">
					<xsl:call-template name="heroTripleUnitTemp"></xsl:call-template>
				</xsl:when>
			</xsl:choose>
		<!-- </xsl:if> -->
	</xsl:template>

	<!-- Hero Single Unit Template - Start -->
	<xsl:template name="heroSingleUnitTemp">
		<xsl:variable name="itm-1">
			<xsl:value-of select="links/link[1]/link_text - 1"/>
		</xsl:variable>
		<xsl:variable name="bgc">
			<xsl:value-of select="links/link[1]/action_text"/>
		</xsl:variable>
		<xsl:comment><xsl:text>Hero Single Unit</xsl:text></xsl:comment>
		<xsl:element name="div">
			<xsl:attribute name="class"><xsl:text>toc-hero-single-unit-shell toc-hero-shell</xsl:text></xsl:attribute>
			<xsl:attribute name="id"><xsl:value-of select="$moduletitle"/></xsl:attribute>
			<xsl:attribute name="data-metrics-module"><xsl:value-of select="$moduletitle"/></xsl:attribute>
			<!-- <xsl:attribute name="data-bg-color"><xsl:value-of select="$bgc"/></xsl:attribute> -->
		</xsl:element>
		<xsl:element name="script">
			<xsl:attribute name="id"><xsl:value-of select="$moduletitle"/><xsl:text>-template</xsl:text></xsl:attribute>
			<xsl:attribute name="type"><xsl:text>text/x-handlebars-template</xsl:text></xsl:attribute>
			<xsl:element name="div">
				<xsl:attribute name="class"><xsl:text>toc-hero toc-hero-1-col</xsl:text></xsl:attribute>
				<xsl:element name="div">
					<xsl:attribute name="class"><xsl:text>toc-hero-item</xsl:text></xsl:attribute>
					<xsl:element name="div">
						<xsl:attribute name="class"><xsl:text>toc-hero-img</xsl:text></xsl:attribute>
						<xsl:element name="a">
							<xsl:attribute name="class"><xsl:text>toc-img-link {{articles.</xsl:text><xsl:value-of select="$itm-1"/><xsl:text>.type}}</xsl:text></xsl:attribute>
							<xsl:attribute name="href"><xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-1"/><xsl:text>.link}}</xsl:text></xsl:attribute>
							<xsl:attribute name="data-metrics-link"><xsl:text>1</xsl:text></xsl:attribute>
							<xsl:element name="img">
								<xsl:attribute name="src"><xsl:value-of select="$image_server_url"/><xsl:text>/{{articles.</xsl:text><xsl:value-of select="$itm-1"/><xsl:text>.images.image650x350}}</xsl:text></xsl:attribute>
								<xsl:attribute name="alt"><xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-1"/><xsl:text>.imageAlt}}</xsl:text></xsl:attribute>
							</xsl:element>
						</xsl:element>
					</xsl:element>
					<xsl:element name="div">
						<xsl:attribute name="class"><xsl:text>toc-hero-desc</xsl:text></xsl:attribute>
						<xsl:attribute name="style"><xsl:text>background-color:</xsl:text><xsl:value-of select="$bgc"/></xsl:attribute>
						<xsl:element name="a">
							<xsl:attribute name="class"><xsl:text>toc-desc-link</xsl:text></xsl:attribute>
							<xsl:attribute name="href"><xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-1"/><xsl:text>.link}}</xsl:text></xsl:attribute>
							<xsl:attribute name="data-metrics-link"><xsl:text>1</xsl:text></xsl:attribute>
							<xsl:element name="h3">
								<xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-1"/><xsl:text>.title}}</xsl:text>
							</xsl:element>
						</xsl:element>
					</xsl:element>
				</xsl:element>
			</xsl:element>
		</xsl:element>
		<xsl:element name="script">
		<![CDATA[
			require(["handlebars/1/handlebars"], function(Handlebars) {
				if (typeof webmd.fundedEditorial.articleData !== "undefined") {
					var template = $("#]]><xsl:value-of select="$moduletitle"/><xsl:text>-template</xsl:text><![CDATA["),
						container = $("#]]><xsl:value-of select="$moduletitle"/><![CDATA["),
						source = template.html(),
						template = Handlebars.compile(source),
						context = webmd.fundedEditorial.articleData || {},
						html = template(context);

					container.prepend(html);
					$(function(){
						var shell = $('.toc-hero-shell').first(),
							desc = shell.find('.toc-hero').first().find('.toc-hero-item').first().find('.toc-hero-desc'),
							bgColor = shell.data('bgColor');

						shell.addClass('toc-hero-first');
						desc.css('background-color', bgColor);
					});
				}
			});
		]]>
		</xsl:element>
	</xsl:template>
	<!-- Hero Single Unit Template - End -->

	<!-- Hero Double Unit Template - Start -->
	<xsl:template name="heroDoubleUnitTemp">
		<xsl:comment><xsl:text>Hero Double Unit</xsl:text></xsl:comment>
		<xsl:variable name="itm-1">
			<xsl:value-of select="links/link[1]/link_text - 1"/>
		</xsl:variable>
		<xsl:variable name="itm-2">
			<xsl:value-of select="links/link[2]/link_text - 1"/>
		</xsl:variable>
		<xsl:variable name="bgc">
			<xsl:value-of select="links/link[1]/action_text"/>
		</xsl:variable>
		<xsl:element name="div">
			<xsl:attribute name="class"><xsl:text>toc-hero-double-unit-shell toc-hero-shell</xsl:text></xsl:attribute>
			<xsl:attribute name="id"><xsl:value-of select="$moduletitle"/></xsl:attribute>
			<xsl:attribute name="data-metrics-module"><xsl:value-of select="$moduletitle"/></xsl:attribute>
			<xsl:attribute name="data-bg-color"><xsl:value-of select="$bgc"/></xsl:attribute>
		</xsl:element>
		<xsl:element name="script">
			<xsl:attribute name="id"><xsl:value-of select="$moduletitle"/><xsl:text>-template</xsl:text></xsl:attribute>
			<xsl:attribute name="type"><xsl:text>text/x-handlebars-template</xsl:text></xsl:attribute>

			<xsl:element name="div">
				<xsl:attribute name="class"><xsl:text>toc-hero toc-hero-2-col</xsl:text></xsl:attribute>
				<xsl:element name="div">
					<xsl:attribute name="class"><xsl:text>toc-hero-item</xsl:text></xsl:attribute>
					<xsl:element name="div">
						<xsl:attribute name="class"><xsl:text>toc-hero-img</xsl:text></xsl:attribute>
						<xsl:element name="a">
							<xsl:attribute name="class"><xsl:text>toc-img-link {{articles.</xsl:text><xsl:value-of select="$itm-1"/><xsl:text>.type}}</xsl:text></xsl:attribute>
							<xsl:attribute name="href"><xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-1"/><xsl:text>.link}}</xsl:text></xsl:attribute>
							<xsl:attribute name="data-metrics-link"><xsl:text>1</xsl:text></xsl:attribute>
							<xsl:element name="img">
								<xsl:attribute name="src"><xsl:value-of select="$image_server_url"/><xsl:text>/{{articles.</xsl:text><xsl:value-of select="$itm-1"/><xsl:text>.images.image493x335}}</xsl:text></xsl:attribute>
								<xsl:attribute name="alt"><xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-1"/><xsl:text>.imageAlt}}</xsl:text></xsl:attribute>
							</xsl:element>
						</xsl:element>
					</xsl:element>
					<xsl:element name="div">
						<xsl:attribute name="class"><xsl:text>toc-hero-desc</xsl:text></xsl:attribute>
						<xsl:element name="a">
							<xsl:attribute name="class"><xsl:text>toc-desc-link</xsl:text></xsl:attribute>
							<xsl:attribute name="href"><xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-1"/><xsl:text>.link}}</xsl:text></xsl:attribute>
							<xsl:attribute name="data-metrics-link"><xsl:text>1</xsl:text></xsl:attribute>
							<xsl:element name="h3">
								<xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-1"/><xsl:text>.title}}</xsl:text>
							</xsl:element>
						</xsl:element>
					</xsl:element>
				</xsl:element>
				<xsl:element name="div">
					<xsl:attribute name="class"><xsl:text>toc-hero-item</xsl:text></xsl:attribute>
					<xsl:element name="div">
						<xsl:attribute name="class"><xsl:text>toc-hero-img</xsl:text></xsl:attribute>
						<xsl:element name="a">
							<xsl:attribute name="class"><xsl:text>toc-img-link {{articles.</xsl:text><xsl:value-of select="$itm-2"/><xsl:text>.type}}</xsl:text></xsl:attribute>
							<xsl:attribute name="href"><xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-2"/><xsl:text>.link}}</xsl:text></xsl:attribute>
							<xsl:attribute name="data-metrics-link"><xsl:text>2</xsl:text></xsl:attribute>
							<xsl:element name="img">
								<xsl:attribute name="src"><xsl:value-of select="$image_server_url"/><xsl:text>/{{articles.</xsl:text><xsl:value-of select="$itm-2"/><xsl:text>.images.image493x335}}</xsl:text></xsl:attribute>
								<xsl:attribute name="alt"><xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-1"/><xsl:text>.imageAlt}}</xsl:text></xsl:attribute>
							</xsl:element>
						</xsl:element>
					</xsl:element>
					<xsl:element name="div">
						<xsl:attribute name="class"><xsl:text>toc-hero-desc</xsl:text></xsl:attribute>
						<xsl:element name="a">
							<xsl:attribute name="class"><xsl:text>toc-desc-link</xsl:text></xsl:attribute>
							<xsl:attribute name="href"><xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-2"/><xsl:text>.link}}</xsl:text></xsl:attribute>
							<xsl:attribute name="data-metrics-link"><xsl:text>2</xsl:text></xsl:attribute>
							<xsl:element name="h3">
								<xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-2"/><xsl:text>.title}}</xsl:text>
							</xsl:element>
						</xsl:element>
					</xsl:element>
				</xsl:element>
			</xsl:element>

		</xsl:element>
		<xsl:element name="script">
		<![CDATA[
			require(["handlebars/1/handlebars"], function(Handlebars) {
				if (typeof webmd.fundedEditorial.articleData !== "undefined") {
					var template = $("#]]><xsl:value-of select="$moduletitle"/><xsl:text>-template</xsl:text><![CDATA["),
						container = $("#]]><xsl:value-of select="$moduletitle"/><![CDATA["),
						source = template.html(),
						template = Handlebars.compile(source),
						context = webmd.fundedEditorial.articleData || {},
						html = template(context);

					container.prepend(html);
					$(function(){
						var shell = $('.toc-hero-shell').first(),
							desc = shell.find('.toc-hero').first().find('.toc-hero-item').first().find('.toc-hero-desc'),
							bgColor = shell.data('bgColor');

						shell.addClass('toc-hero-first');
						desc.css('background-color', bgColor);
					});
				}
			});
		]]>
		</xsl:element>
	</xsl:template>
	<!-- Hero Double Unit Template - End -->

	<!-- Hero Triple Unit Template - Start -->
	<xsl:template name="heroTripleUnitTemp">
		<xsl:comment><xsl:text>Hero Triple Unit</xsl:text></xsl:comment>
		<xsl:variable name="itm-1">
			<xsl:value-of select="links/link[1]/link_text - 1"/>
		</xsl:variable>
		<xsl:variable name="itm-2">
			<xsl:value-of select="links/link[2]/link_text - 1"/>
		</xsl:variable>
		<xsl:variable name="itm-3">
			<xsl:value-of select="links/link[3]/link_text - 1"/>
		</xsl:variable>
		<xsl:variable name="bgc">
			<xsl:value-of select="links/link[1]/action_text"/>
		</xsl:variable>
		<xsl:element name="div">
			<xsl:attribute name="class"><xsl:text>toc-hero-triple-unit-shell toc-hero-shell</xsl:text></xsl:attribute>
			<xsl:attribute name="id"><xsl:value-of select="$moduletitle"/></xsl:attribute>
			<xsl:attribute name="data-metrics-module"><xsl:value-of select="$moduletitle"/></xsl:attribute>
			<xsl:attribute name="data-bg-color"><xsl:value-of select="$bgc"/></xsl:attribute>
		</xsl:element>
		<xsl:element name="script">
			<xsl:attribute name="id"><xsl:value-of select="$moduletitle"/><xsl:text>-template</xsl:text></xsl:attribute>
			<xsl:attribute name="type"><xsl:text>text/x-handlebars-template</xsl:text></xsl:attribute>

			<xsl:element name="div">
				<xsl:attribute name="class"><xsl:text>toc-hero toc-hero-2-col-3-item</xsl:text></xsl:attribute>
				<xsl:element name="div">
					<xsl:attribute name="class"><xsl:text>toc-hero-left-col</xsl:text></xsl:attribute>
					<xsl:element name="div">
						<xsl:attribute name="class"><xsl:text>toc-hero-item</xsl:text></xsl:attribute>
						<xsl:element name="div">
							<xsl:attribute name="class"><xsl:text>toc-hero-img</xsl:text></xsl:attribute>
							<xsl:element name="a">
								<xsl:attribute name="class"><xsl:text>toc-img-link {{articles.</xsl:text><xsl:value-of select="$itm-1"/><xsl:text>.type}}</xsl:text></xsl:attribute>
								<xsl:attribute name="href"><xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-1"/><xsl:text>.link}}</xsl:text></xsl:attribute>
								<xsl:attribute name="data-metrics-link"><xsl:text>1</xsl:text></xsl:attribute>
								<xsl:element name="img">
									<xsl:attribute name="src"><xsl:value-of select="$image_server_url"/><xsl:text>/{{articles.</xsl:text><xsl:value-of select="$itm-1"/><xsl:text>.images.image650x350}}</xsl:text></xsl:attribute>
									<xsl:attribute name="alt"><xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-1"/><xsl:text>.imageAlt}}</xsl:text></xsl:attribute>
								</xsl:element>
							</xsl:element>
						</xsl:element>
						<xsl:element name="div">
							<xsl:attribute name="class"><xsl:text>toc-hero-desc</xsl:text></xsl:attribute>
							<xsl:element name="a">
								<xsl:attribute name="class"><xsl:text>toc-desc-link</xsl:text></xsl:attribute>
								<xsl:attribute name="href"><xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-1"/><xsl:text>.link}}</xsl:text></xsl:attribute>
								<xsl:attribute name="data-metrics-link"><xsl:text>1</xsl:text></xsl:attribute>
								<xsl:element name="h3">
									<xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-1"/><xsl:text>.title}}</xsl:text>
								</xsl:element>
							</xsl:element>
						</xsl:element>
					</xsl:element>
				</xsl:element>
				<xsl:element name="div">
					<xsl:attribute name="class"><xsl:text>toc-hero-right-col</xsl:text></xsl:attribute>
					<xsl:element name="div">
						<xsl:attribute name="class"><xsl:text>toc-hero-item</xsl:text></xsl:attribute>
						<xsl:element name="div">
							<xsl:attribute name="class"><xsl:text>toc-hero-img</xsl:text></xsl:attribute>
							<xsl:element name="a">
								<xsl:attribute name="class"><xsl:text>toc-img-link {{articles.</xsl:text><xsl:value-of select="$itm-2"/><xsl:text>.type}}</xsl:text></xsl:attribute>
								<xsl:attribute name="href"><xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-2"/><xsl:text>.link}}</xsl:text></xsl:attribute>
								<xsl:attribute name="data-metrics-link"><xsl:text>2</xsl:text></xsl:attribute>
								<xsl:element name="img">
									<xsl:attribute name="src"><xsl:value-of select="$image_server_url"/><xsl:text>/{{articles.</xsl:text><xsl:value-of select="$itm-2"/><xsl:text>.images.image650x350}}</xsl:text></xsl:attribute>
									<xsl:attribute name="alt"><xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-1"/><xsl:text>.imageAlt}}</xsl:text></xsl:attribute>
								</xsl:element>
							</xsl:element>
						</xsl:element>
						<xsl:element name="div">
							<xsl:attribute name="class"><xsl:text>toc-hero-desc</xsl:text></xsl:attribute>
							<xsl:element name="a">
								<xsl:attribute name="class"><xsl:text>toc-desc-link</xsl:text></xsl:attribute>
								<xsl:attribute name="href"><xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-2"/><xsl:text>.link}}</xsl:text></xsl:attribute>
								<xsl:attribute name="data-metrics-link"><xsl:text>2</xsl:text></xsl:attribute>
								<xsl:element name="h3">
									<xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-2"/><xsl:text>.title}}</xsl:text>
								</xsl:element>
							</xsl:element>
						</xsl:element>
					</xsl:element>
					<xsl:element name="div">
						<xsl:attribute name="class"><xsl:text>toc-hero-item</xsl:text></xsl:attribute>
						<xsl:element name="div">
							<xsl:attribute name="class"><xsl:text>toc-hero-img</xsl:text></xsl:attribute>
							<xsl:element name="a">
								<xsl:attribute name="class"><xsl:text>toc-img-link {{articles.</xsl:text><xsl:value-of select="$itm-3"/><xsl:text>.type}}</xsl:text></xsl:attribute>
								<xsl:attribute name="href"><xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-3"/><xsl:text>.link}}</xsl:text></xsl:attribute>
								<xsl:attribute name="data-metrics-link"><xsl:text>3</xsl:text></xsl:attribute>
								<xsl:element name="img">
									<xsl:attribute name="src"><xsl:value-of select="$image_server_url"/><xsl:text>/{{articles.</xsl:text><xsl:value-of select="$itm-3"/><xsl:text>.images.image650x350}}</xsl:text></xsl:attribute>
									<xsl:attribute name="alt"><xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-1"/><xsl:text>.imageAlt}}</xsl:text></xsl:attribute>
								</xsl:element>
							</xsl:element>
						</xsl:element>
						<xsl:element name="div">
							<xsl:attribute name="class"><xsl:text>toc-hero-desc</xsl:text></xsl:attribute>
							<xsl:element name="a">
								<xsl:attribute name="class"><xsl:text>toc-desc-link</xsl:text></xsl:attribute>
								<xsl:attribute name="href"><xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-3"/><xsl:text>.link}}</xsl:text></xsl:attribute>
								<xsl:attribute name="data-metrics-link"><xsl:text>3</xsl:text></xsl:attribute>
								<xsl:element name="h3">
									<xsl:text>{{articles.</xsl:text><xsl:value-of select="$itm-3"/><xsl:text>.title}}</xsl:text>
								</xsl:element>
							</xsl:element>
						</xsl:element>
					</xsl:element>
				</xsl:element>
			</xsl:element>

		</xsl:element>
		<xsl:element name="script">
		<![CDATA[
			require(["handlebars/1/handlebars"], function(Handlebars) {
				if (typeof webmd.fundedEditorial.articleData !== "undefined") {
					var template = $("#]]><xsl:value-of select="$moduletitle"/><xsl:text>-template</xsl:text><![CDATA["),
						container = $("#]]><xsl:value-of select="$moduletitle"/><![CDATA["),
						source = template.html(),
						template = Handlebars.compile(source),
						context = webmd.fundedEditorial.articleData || {},
						html = template(context);

					container.prepend(html);
					$(function(){
						var shell = $('.toc-hero-shell').first(),
							desc = shell.find('.toc-hero').first().find('.toc-hero-item').first().find('.toc-hero-desc'),
							bgColor = shell.data('bgColor');

						shell.addClass('toc-hero-first');
						desc.css('background-color', bgColor);
					});
				}
			});
		]]>
		</xsl:element>
	</xsl:template>
	<!-- Hero Triple Unit Template - End -->

</xsl:stylesheet>
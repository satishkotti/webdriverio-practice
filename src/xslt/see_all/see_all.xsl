<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<!-- Force the output to be strict XHTML -->
	<xsl:output method="xml" omit-xml-declaration="yes" indent="yes"></xsl:output>
	<xsl:param name="class_id"></xsl:param>
	<xsl:param name="image_server_url">
		<xsl:text>http://img.preview.webmd.com/dtmcms/preview</xsl:text>
	</xsl:param>
	<xsl:param name="moduletitle">test</xsl:param>
	<xsl:param name="site_id">3</xsl:param>
	<xsl:param name="domain">webmd.com</xsl:param>

	<xsl:template match="/">
		<xsl:element name="div">
			<xsl:attribute name="class"><xsl:text>see-all-shell</xsl:text></xsl:attribute>
		</xsl:element>
		<xsl:element name="script">
			<xsl:attribute name="id"><xsl:text>see-all-template</xsl:text></xsl:attribute>
			<xsl:attribute name="type"><xsl:text>text/x-handlebars-template</xsl:text></xsl:attribute>

			<xsl:text disable-output-escaping="yes">
			<![CDATA[<header class="page-header">
				<h1>All {{program.title}}</h1>
			</header>

			<article id="art" class="article see-all">
				<div class="article-content">
					<div class="see-all-items non-spon" data-metrics-module="ed-rspsvalledcon">
						<ul>
							{{#each_when articles "sponsored" false}}
							<li class="see-all-item spon-{{sponsored}}">
								<a href="{{link}}" data-metrics-link="{{nonSponPos}}">
									<div class="see-all-img {{type}}">
										<img src="{{image_server_url}}/{{images.image110x70}}" alt="{{title}}">
									</div>
									<p>{{title}}</p>
								</a>
							</li>
							{{/each_when}}
						</ul>
					</div>
					<div id="see-all-spon" class="see-all-items spon" data-metrics-module="ed-rspsvallspcon">
						<h3>From Our Sponsor</h3>
						<ul>
							{{#each_when articles "sponsored" true}}
							<li class="see-all-item spon-{{sponsored}}">
								<a href="{{link}}" data-metrics-link="{{sponPos}}">
									<div class="see-all-img {{type}}">
										<img src="{{image_server_url}}/{{images.image110x70}}" alt="{{title}}">
									</div>
									<p class="fos">From Our Sponsor</p>
									<p>{{title}}</p>
								</a>
							</li>
							{{/each_when}}
						</ul>
					</div>
				</div>
			</article>]]>
			</xsl:text>

		</xsl:element>

		<xsl:element name="script">
			<xsl:text disable-output-escaping="yes">
			<![CDATA[
			$('html').addClass('funded-editorial-see-all');
			$(function(){
				require(["handlebars/1/handlebars"], function(Handlebars) {
					if (typeof webmd.fundedEditorial.articleData !== "undefined") {
						var nonSponCounter = 1,
							sponCounter = 1;
						Handlebars.registerHelper('each_when', function(list, k, v, opts) {
							var i, result = '';
							for(i = 0; i < list.length; ++i)
								if(list[i][k] == v)
									result = result + opts.fn(list[i]);
							return result;

						});
						Handlebars.registerHelper('image_server_url', function() {
							return image_server_url; //just return global variable value
						});
						Handlebars.registerHelper('nonSponPos', function() {
							return nonSponCounter++;
						});
						Handlebars.registerHelper('sponPos', function() {
							return sponCounter++;
						});
						var template = $("#see-all-template"),
							container = $(".see-all-shell"),
							source = template.html(),
							template = Handlebars.compile(source),
							context = webmd.fundedEditorial.articleData || {},
							html = template(context);

						container.prepend(html);

						var paneForTitle = $('#ContentPane12'),
							pageTitle = $('header.page-header'),
							cleanUp = $('.see-all-items.non-spon .spon-true, .see-all-items.spon .spon-false');

						if (pageTitle) {
							$(paneForTitle).append(pageTitle);
						}

						cleanUp.remove();

						if($('.see-all-items.spon ul li').length == 0){
							$('.see-all-items.spon').remove();
						}
					}
				});
			});
			]]>
			</xsl:text>
		</xsl:element>
	</xsl:template>

</xsl:stylesheet>
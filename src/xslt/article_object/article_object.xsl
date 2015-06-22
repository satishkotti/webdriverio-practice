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

        <xsl:element name="header">
            <xsl:attribute name="class">
                <xsl:text>page-header</xsl:text>
            </xsl:attribute>
            <h1>Article Object: </h1>
        </xsl:element>
        <xsl:element name="div">
            <xsl:attribute name="class">
                <xsl:text>article-sequence-shell</xsl:text>
            </xsl:attribute>
        </xsl:element>
        <xsl:text disable-output-escaping="yes"><![CDATA[
        <script id="article-sequence" type="text/x-handlebars-template">
            <table class="art-seq">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>URL</th>
                        <th>Image</th>
                        <th>Funded</th>
                        <th>Sponsored</th>
                    </tr>
                </thead>
                <tbody>
                    {{#each articles}}
                    <tr>
                        <td class="id cnt-mid">{{id}}</td>
                        <td class="title mid">{{article.title}}</td>
                        <td class="desc mid">{{article.description}}</td>
                        <td class="link mid"><a href="{{article.link}}" target="_blank">{{article.link}}</a></td>
                        <td class="img cnt-mid"><img src="{{article.images.image79x79}}" alt=""></td>
                        <td class="fund cnt-mid">
                            {{#unless sponsored}}
                            <span class="icon-check"></span>
                            {{/unless}}
                        </td>
                        <td class="spon cnt-mid">
                            {{#if sponsored}}
                            <span class="icon-check"></span>
                            {{/if}}
                        </td>
                    </tr>
                    {{/each}}
                </tbody>
            </table>
        </script>
        <script>
        $(function(){
            require(["handlebars/1/handlebars"], function(Handlebars) {
                !function(e,i){"use strict";function t(t,s){var a=this;a.$el=e(t),a.el=t,a.id=n++,a.$window=e(i),a.$document=e(document),a.$el.bind("destroyed",e.proxy(a.teardown,a)),a.$clonedHeader=null,a.$originalHeader=null,a.isSticky=!1,a.hasBeenSticky=!1,a.leftOffset=null,a.topOffset=null,a.init=function(){a.$el.each(function(){var i=e(this);i.css("padding",0),a.$originalHeader=e("thead:first",this),a.$clonedHeader=a.$originalHeader.clone(),i.trigger("clonedHeader."+o,[a.$clonedHeader]),a.$clonedHeader.addClass("tableFloatingHeader"),a.$clonedHeader.css("display","none"),a.$originalHeader.addClass("tableFloatingHeaderOriginal"),a.$originalHeader.after(a.$clonedHeader),a.$printStyle=e('<style type="text/css" media="print">.tableFloatingHeader{display:none !important;}.tableFloatingHeaderOriginal{position:static !important;}</style>'),e("head").append(a.$printStyle)}),a.setOptions(s),a.updateWidth(),a.toggleHeaders(),a.bind()},a.destroy=function(){a.$el.unbind("destroyed",a.teardown),a.teardown()},a.teardown=function(){a.isSticky&&a.$originalHeader.css("position","static"),e.removeData(a.el,"plugin_"+o),a.unbind(),a.$clonedHeader.remove(),a.$originalHeader.removeClass("tableFloatingHeaderOriginal"),a.$originalHeader.css("visibility","visible"),a.$printStyle.remove(),a.el=null,a.$el=null},a.bind=function(){a.$scrollableArea.on("scroll."+o,a.toggleHeaders),a.isWindowScrolling||(a.$window.on("scroll."+o+a.id,a.setPositionValues),a.$window.on("resize."+o+a.id,a.toggleHeaders)),a.$scrollableArea.on("resize."+o,a.toggleHeaders),a.$scrollableArea.on("resize."+o,a.updateWidth)},a.unbind=function(){a.$scrollableArea.off("."+o,a.toggleHeaders),a.isWindowScrolling||(a.$window.off("."+o+a.id,a.setPositionValues),a.$window.off("."+o+a.id,a.toggleHeaders)),a.$scrollableArea.off("."+o,a.updateWidth)},a.toggleHeaders=function(){a.$el&&a.$el.each(function(){var i,t=e(this),o=a.isWindowScrolling?isNaN(a.options.fixedOffset)?a.options.fixedOffset.outerHeight():a.options.fixedOffset:a.$scrollableArea.offset().top+(isNaN(a.options.fixedOffset)?0:a.options.fixedOffset),n=t.offset(),l=a.$scrollableArea.scrollTop()+o,s=a.$scrollableArea.scrollLeft(),d=a.isWindowScrolling?l>n.top:o>n.top,r=(a.isWindowScrolling?l:0)<n.top+t.height()-a.$clonedHeader.height()-(a.isWindowScrolling?0:o);d&&r?(i=n.left-s+a.options.leftOffset,a.$originalHeader.css({position:"fixed","margin-top":a.options.marginTop,left:i,"z-index":3}),a.leftOffset=i,a.topOffset=o,a.$clonedHeader.css("display",""),a.isSticky||(a.isSticky=!0,a.updateWidth()),a.setPositionValues()):a.isSticky&&(a.$originalHeader.css("position","static"),a.$clonedHeader.css("display","none"),a.isSticky=!1,a.resetWidth(e("td,th",a.$clonedHeader),e("td,th",a.$originalHeader)))})},a.setPositionValues=function(){var e=a.$window.scrollTop(),i=a.$window.scrollLeft();!a.isSticky||0>e||e+a.$window.height()>a.$document.height()||0>i||i+a.$window.width()>a.$document.width()||a.$originalHeader.css({top:a.topOffset-(a.isWindowScrolling?0:e),left:a.leftOffset-(a.isWindowScrolling?0:i)})},a.updateWidth=function(){if(a.isSticky){a.$originalHeaderCells||(a.$originalHeaderCells=e("th,td",a.$originalHeader)),a.$clonedHeaderCells||(a.$clonedHeaderCells=e("th,td",a.$clonedHeader));var i=a.getWidth(a.$clonedHeaderCells);a.setWidth(i,a.$clonedHeaderCells,a.$originalHeaderCells),a.$originalHeader.css("width",a.$clonedHeader.width())}},a.getWidth=function(t){var o=[];return t.each(function(t){var n,l=e(this);if("border-box"===l.css("box-sizing"))n=l[0].getBoundingClientRect().width;else{var s=e("th",a.$originalHeader);if("collapse"===s.css("border-collapse"))if(i.getComputedStyle)n=parseFloat(i.getComputedStyle(this,null).width);else{var d=parseFloat(l.css("padding-left")),r=parseFloat(l.css("padding-right")),c=parseFloat(l.css("border-width"));n=l.outerWidth()-d-r-c}else n=l.width()}o[t]=n}),o},a.setWidth=function(e,i,t){i.each(function(i){var o=e[i];t.eq(i).css({"min-width":o,"max-width":o})})},a.resetWidth=function(i,t){i.each(function(i){var o=e(this);t.eq(i).css({"min-width":o.css("min-width"),"max-width":o.css("max-width")})})},a.setOptions=function(t){a.options=e.extend({},l,t),a.$scrollableArea=e(a.options.scrollableArea),a.isWindowScrolling=a.$scrollableArea[0]===i},a.updateOptions=function(e){a.setOptions(e),a.unbind(),a.bind(),a.updateWidth(),a.toggleHeaders()},a.init()}var o="stickyTableHeaders",n=0,l={fixedOffset:0,leftOffset:0,marginTop:0,scrollableArea:i};e.fn[o]=function(i){return this.each(function(){var n=e.data(this,"plugin_"+o);n?"string"==typeof i?n[i].apply(n):n.updateOptions(i):"destroy"!==i&&e.data(this,"plugin_"+o,new t(this,i))})}}(jQuery,window);
                if (typeof article_data !== "undefined") {
                    var template = $("#article-sequence"),
                        container = $(".article-sequence-shell"),
                        source = template.html(),
                        template = Handlebars.compile(source),
                        context = article_data || {},
                        html = template(context);

                    container.prepend(html);

                    $('table.art-seq').stickyTableHeaders();
                }
            });
        });
        </script>
        ]]></xsl:text>

    </xsl:template>
</xsl:stylesheet>
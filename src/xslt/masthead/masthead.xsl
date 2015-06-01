<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    <xsl:strip-space elements="*"/>
    <xsl:param name="site_id">3</xsl:param>
    <xsl:param name="domain">webmd.com</xsl:param>
    <xsl:param name="image_server_url">
        <xsl:text>http://img.preview.webmd.com/dtmcms/preview</xsl:text>
    </xsl:param>
    <xsl:param name="moduletitle"/>
    <xsl:param name="s_topic"></xsl:param>
    <xsl:param name="s_channel_micro"></xsl:param>

    <xsl:template match="/">

        <header class="masthead">
            <div class="masthead-container clearfix">
                <div class="masthead-left clearfix">
                    <div id="logo">
                        <a onclick="sl(this,'','logo')" href="http://www.webmd.com/www/default.htm">
                            <img src="http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/usability/2012/LBi_Masthead/logo_trans.png" class="logo_rdr" alt="WebMD: Better information. Better health."/>
                        </a>
                    </div>

                    <div id="search_container" role="search">
                        <form action="http://www.webmd.com/search/search_results/default.aspx" method="get" name="searchForm">
                            <label class="jawsonly" for="searchQuery_fmt">Enter Search Keywords. Use the arrow keys to navigate suggestions.</label>
                            <input type="text" id="searchQuery_fmt" name="query" maxlength="200" value="" autocomplete="off" title="Enter Search Keywords"/>
                            <button type="submit" class="searchButton_fmt icon-search" name="searchButton_fmt" value="" title="Search" onclick="return sl(this,'','srch-bar_submit')"></button>
                        </form>
                        <ul id="searchTypeahead_fmt" aria-live="assertive"></ul>
                    </div>
                </div>
                <div class="masthead-right">
                </div>
            </div>
        </header>

    </xsl:template>
</xsl:stylesheet>






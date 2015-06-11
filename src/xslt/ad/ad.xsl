<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!--
    ==================================================
    WARNING: DO NOT UPDATE THIS XSL DIRECTLY!
    Refer to the GIT repository to make updates.
    /webmd/module-admodule
    ==================================================
-->

<!-- AD MODULE PARAMETERS -->

<!--
mobile

This parameter is set by the runtime system to indicate which ad to use Desktop or Mobile.

-->
<xsl:param name="mobile">false</xsl:param>


<!--
pos

The POS value selected for this ad. For example, "101" respresents a banner ad.
Using "[pos]" as the default value here because the pos parameter is not currently
being set by the back-end.
-->
<xsl:param name="pos">106</xsl:param>


<!--
print

This parameter is "true" if the page url contains "?print=true", which is used
for print-preview pages.
-->
<xsl:param name="print">false</xsl:param>

<!--
module title

These params are so that we can create unique ids for the divs
-->
<xsl:param name="moduletitle">ad_top</xsl:param>

<!--
pos

This parameter is set by the runtime system to indicate which POS value to use.

-->
<xsl:param name="adPos">
    <xsl:choose>
        <xsl:when test="$pos = '106'">
            <xsl:text>101</xsl:text>
        </xsl:when>
        <xsl:when test="$pos = '131' or $pos = '138'">
            <xsl:text>121</xsl:text>
        </xsl:when>
        <xsl:when test="$pos = '404'">
            <xsl:text>409</xsl:text>
        </xsl:when>
        <xsl:when test="$pos = '2050'">
            <xsl:text>2026</xsl:text>
        </xsl:when>
        <xsl:when test="$pos = '2051'">
            <xsl:text>2025</xsl:text>
        </xsl:when>
        <xsl:otherwise>
            <xsl:value-of select="$pos"/>
        </xsl:otherwise>
    </xsl:choose>
</xsl:param>

<!--
ad id

This parameter builds the dynamic ad id name.

-->
<xsl:param name="adID">
    <xsl:text>ads2-pos-</xsl:text>
    <xsl:value-of select="$adPos"/>
    <xsl:text>-</xsl:text>
    <xsl:value-of select="$vModuleTitle"/>
</xsl:param>

<!--
    Array of sizes to use for the ad.

    NOTE: currently we don't have ability for publisher to select multiple sizes in the pagebuilder
    interface. But when we do we need to modify this to use the selected sizes.
-->
<xsl:param name="sizes">
    <xsl:choose>
        <xsl:when test="$adPos = '101'">
            <xsl:text>[[728,90],[970, 90],[970,250]]</xsl:text>
        </xsl:when>
        <xsl:when test="$adPos = '103'">
            <xsl:text>[728,90]</xsl:text>
        </xsl:when>
        <xsl:when test="$adPos = '113' or $adPos = '115'">
            <xsl:text>[160,600]</xsl:text>
        </xsl:when>
        <xsl:when test="$adPos = '121'">
            <xsl:text>[[300,250],[300, 600],[300,1050]]</xsl:text>
        </xsl:when>
        <xsl:when test="$adPos = '137'">
            <xsl:text>[[300,250],[300, 251]]</xsl:text>
        </xsl:when>
        <xsl:when test="$adPos = '409'">
            <xsl:text>[[300,250],[300, 252]]</xsl:text>
        </xsl:when>
        <xsl:when test="$adPos = '700'">
            <xsl:text>[300,198]</xsl:text>
        </xsl:when>
        <xsl:when test="$adPos = '701'">
            <xsl:text>[145,199]</xsl:text>
        </xsl:when>
        <xsl:when test="$adPos = '901' or $adPos = '902' or $adPos = '1901'">
            <xsl:text>[1,1]</xsl:text>
        </xsl:when>
        <xsl:when test="$adPos = '2025'">
            <xsl:text>[[300,50], [320, 50]]</xsl:text>
        </xsl:when>
        <xsl:when test="$adPos = '2026'">
            <xsl:text>[[300,50], [300, 51], [300,250], [300,253], [320, 50], [320, 51]]</xsl:text>
        </xsl:when>
        <xsl:when test="$adPos = '5000' or $adPos = '5001' or $adPos = '5002' or $adPos = '5003'">
            <xsl:text>[1,2]</xsl:text>
        </xsl:when>
        <xsl:when test="$adPos = '5100'">
            <xsl:text>[1,3]</xsl:text>
        </xsl:when>
        <xsl:otherwise>
            <xsl:text>[</xsl:text>
            <xsl:value-of select="/ad_widget/IFrameWidth"/>
            <xsl:text>,</xsl:text>
            <xsl:value-of select="/ad_widget/IFrameHeight"/>
            <xsl:text>]</xsl:text>
        </xsl:otherwise>
    </xsl:choose>
</xsl:param>

<!-- replace hyphen with underscore. hyphen is an illegal JS variable name -->
<xsl:variable name="vModuleTitle">
    <xsl:call-template name="ReplaceString">
        <xsl:with-param name="text" select="$moduletitle"/>
        <xsl:with-param name="replace" select="'-'" />
        <xsl:with-param name="with" select="'_'"/>
    </xsl:call-template>
</xsl:variable>

<!--START STRING REPLACEMENT 1.0-->
<xsl:template name="ReplaceString">
    <xsl:param name="text"/>
    <xsl:param name="replace"/>
    <xsl:param name="with"/>
    <xsl:param name="appendValue"/>
    <xsl:choose>
        <xsl:when test="contains($text,$replace)">
            <xsl:value-of select="substring-before($text,$replace)"/>
            <xsl:value-of select="$with"/>
            <xsl:call-template name="ReplaceString">
                <xsl:with-param name="text" select="substring-after($text,$replace)"/>
                <xsl:with-param name="replace" select="$replace"/>
                <xsl:with-param name="with" select="$with"/>
            </xsl:call-template>
        </xsl:when>
        <xsl:otherwise>
            <xsl:choose>
                <xsl:when test="$appendValue = 'true'">
                    <xsl:value-of select="concat($text,'&amp;=',$with)"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="$text"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>
<!--END STRING REPLACEMENT 1.0-->
<!--
    TEMPLATE: DFP_debug
    Output everything we know.
-->

<xsl:template name="DFP_debug">
    <!--
        Set this parameter to 1 if you want the debug info in an HTML comment.
        Set to 0 if you want the debug directly displayed in the page HTML.
    -->
    <xsl:param name="comment">1</xsl:param>

    <xsl:if test="$comment = '1'">
        <xsl:text disable-output-escaping="yes"><![CDATA[<!--]]></xsl:text>
    </xsl:if>

    <ul>
        <!-- <li>$adsystem = <xsl:value-of select="$adsystem"/></li> -->
        <li>$pos = <xsl:value-of select="$pos"/></li>
        <li>$mobile = <xsl:value-of select="$mobile"/></li>
        <li>$print = <xsl:value-of select="$print"/></li>
    </ul>
    <ul>
        <li>adtype = <xsl:value-of select="ad_widget/AdType"/></li>
        <li>iframeheight = <xsl:value-of select="ad_widget/IFrameHeight"/></li>
        <li>iframewidth = <xsl:value-of select="ad_widget/IFrameWidth"/></li>
        <li>adserver = <xsl:value-of select="ad_widget/AdServer"/></li>
    </ul>
    <ul>
        <li>affiliate = [affiliate]</li>
        <li>apg = [apg]</li>
        <li>artid = [artid]</li>
        <li>au1 = [au1]</li>
        <li>au2 = [au2]</li>
        <li>bc = [bc]</li>
        <li>brand = [brand]</li>
        <li>cc = [cc]</li>
        <li>env = [env]</li>
        <li>hcent = [hcent]</li>
        <li>mcent = [mcent]</li>
        <li>micro = [micro]</li>
        <li>pkg = [pkg]</li>
        <li>pos = [pos]</li>
        <li>pug = [pug]</li>
        <li>scent = [scent]</li>
        <li>sec = [sec]</li>
        <li>segval = [segval]</li>
        <li>site = [site]</li>
        <li>tile = [tile]</li>
        <li>tmg = [tmg]</li>
        <li>transactionID = [transactionID]</li>
        <li>tug = [tug]</li>
        <li>uri = [uri]</li>
    </ul>

    <xsl:if test="$comment = '1'">
        <xsl:text disable-output-escaping="yes"><![CDATA[-->]]></xsl:text>
    </xsl:if>
</xsl:template>

<!-- Force the output to be strict XHTML -->
<xsl:output method="html" omit-xml-declaration="yes"/>

<!-- Start the output -->
<xsl:template match="/">

    <!-- Display debug info in an HTML comment. -->
    <!-- Comment this out for production -->
    <xsl:call-template name="DFP_debug"/>

    <!-- This appears to be used by DSP / Lotame -->
    <script>var priTopId='[apg]', secTopId='[sec]';</script>

    <!--
    Determine if we want a mobile or desktop ad.
    This lets us deploy the XSL, and use a runtime switch.
    -->
    <xsl:choose>
        <xsl:when test="$mobile = 'true'">
            <xsl:call-template name="mobileAd_start"/>
        </xsl:when>
        <xsl:otherwise>
            <xsl:call-template name="desktopAd_start"/>
        </xsl:otherwise>
    </xsl:choose>

</xsl:template>

<!--
  ==================================================
  DESKTOP AD SYSTEM
  ==================================================
-->
<xsl:template name="desktopAd_start">

    <xsl:param name="adType">
        <xsl:choose>
            <xsl:when test="$adPos = '101'">
                <xsl:text>banner</xsl:text>
            </xsl:when>
            <xsl:when test="$adPos = '121'">
                <xsl:text>right</xsl:text>
            </xsl:when>
            <xsl:when test="$adPos = '901' or $adPos = '902' or $adPos = '1901'">
                <xsl:text>1x1</xsl:text>
            </xsl:when>
            <xsl:otherwise>
                <xsl:text>left</xsl:text>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:param>

    <!--
        Targets object

        targets: { $targets }

        Special cases:

        "pt" parameter (primary topic) uses [apg] token.
        This used to be sent as the "xpg" parameter in the old ad system.

        "env" parameter has some extra characters we don't need so we strip '&amp;enf='

        "uri" contains a url encoded string, but we decode it before passing to google, because
        google handles all necessary encoding

        "leaf" parameter uses token [pkg] but as set by runtime it has some extra characters we don't need,
        so those are stripped out using javascript.

        "app" parameter is an app id used for ads. Note this is not the same as webmd.appid which is used by registration.
        Apps can set the webmd.adappid variable at the top of the page to set this, or (preferred) can directly call webmd.ads2.setPageTarget()
        to set the parameter directly.
    -->
    <xsl:param name="targets">
        <xsl:text>art:'[artid]',</xsl:text>
        <xsl:text>cc:'[cc]',</xsl:text>
        <xsl:text>env:'[env]',</xsl:text>
        <xsl:text>hcent:'[hcent]',</xsl:text>
        <xsl:text>leaf:'[pkg]',</xsl:text>
        <xsl:text>mcent:'[mcent]',</xsl:text>
        <xsl:text>mic:'[micro]',</xsl:text>
        <xsl:text>pt:'[apg]',</xsl:text>
        <xsl:text>sec:'[sec]',</xsl:text>
        <xsl:text>pug:'[pug]',</xsl:text>
        <xsl:text>scent:'[scent]',</xsl:text>
        <xsl:text>tmg:'[tmg]',</xsl:text>
        <xsl:text>tug:'[tug]',</xsl:text>
        <xsl:text>uri:'[uri]'</xsl:text>
    </xsl:param>

    <!--
        Block codes

        This is to allow for overwriting for exchanges
    -->
    <xsl:param name="blockCodes">
        <xsl:text>[bc]</xsl:text>
    </xsl:param>

    <!--
        Wrapping divs for the ad to allow various styles to be applied.
        Most of this code is legacy and should probably be updated later.
    -->
    <xsl:choose>
        <xsl:when test="$print != 'false'">
            <!-- Don't display anything on print page -->
        </xsl:when>
        <xsl:when test="$adType = '1x1'">
            <div id="{$adID}" class="ad_placeholder"></div>
        </xsl:when>
        <xsl:when test="$adType = 'bottom' or $adType = 'top'">
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:text>ad_rdr </xsl:text>
                    <xsl:value-of select="$adType" />
                    <xsl:text>_ad_rdr</xsl:text>
                </xsl:attribute>
                <xsl:element name="div">
                    <xsl:attribute name="class">
                        <xsl:text>ad_label</xsl:text>
                    </xsl:attribute>
                    <xsl:text>Advertisement</xsl:text>
                </xsl:element>
                <xsl:element name="div">
                    <xsl:attribute name="id">
                        <xsl:value-of select="$adType" />
                        <xsl:text>_ad</xsl:text>
                    </xsl:attribute>
                    <div id="{$adID}" class="ad_placeholder"></div>
                </xsl:element>
            </xsl:element>
        </xsl:when>
        <xsl:when test="$adType = 'ss' or $adType = 'ssh'">
            <xsl:element name="div">
                <xsl:attribute name="id">
                    <xsl:text>slideshow_ad_300x250</xsl:text>
                </xsl:attribute>
                <xsl:if test="$adType = 'ssh'">
                    <xsl:attribute name="style">
                        <xsl:text>display:none;</xsl:text>
                    </xsl:attribute>
                </xsl:if>
                <xsl:element name="h3">
                    <xsl:text>Advertisement</xsl:text>
                </xsl:element>
                <div id="{$adID}" class="ad_placeholder"></div>
            </xsl:element>
        </xsl:when>
        <xsl:when test="$adType = 'ssi'">
            <script>
                <![CDATA[
                $('.ss_middle .ad_placeholder').attr('id', ']]><xsl:value-of select="$adID"/><![CDATA[');
                ]]>
            </script>
        </xsl:when>
        <xsl:when test="$adType = 'cw'">
            <div id="ad-cw" class="cw_btm_300x250_rdr">
                <div class="cw_btm_ad_top_fmt"></div>
                <div id="cw_btm_ad_300x250" class="cw_btm_ad_BG_fmt loaded">
                    <div id="{$adID}" class="ad_placeholder"></div>
                </div>
                <div class="cw_btm_ad_bottom_fmt"></div>
            </div>
        </xsl:when>
        <xsl:otherwise>
            <div id="{$adType}Ad_rdr">
                <div class="{$adType}Ad_top_fmt"> </div>
                <div id="{$adType}Ad_fmt" class="{$adType}Ad_BG_fmt loaded">
                    <!--
                        Placeholder for the ad.

                        NOTE: not sure if we need ad_placeholder class, but including that
                        because it was in legacy system and might have been used for styling.
                    -->
                    <div id="{$adID}" class="ad_placeholder"></div>
                </div>
                <xsl:if test="$adType != 'banner'">
                    <div class="{$adType}Ad_bottom_fmt"> </div>
                </xsl:if>
            </div>
            <xsl:if test="$adType != 'banner'">
                <div class="moduleSpacer_rdr"> </div>
            </xsl:if>
        </xsl:otherwise>
    </xsl:choose>

    <!--
        Script to set global targets for all ads on the page,
        then define the ad div and the pos value for that ad.
    -->
    <xsl:choose>
        <xsl:when test="$print != 'false'">
            <script><![CDATA[
                webmd.ads2Consumer.printAdTargets = {targets:{]]><xsl:value-of select="$targets"/><![CDATA[},blockCodes:']]><xsl:value-of select="$blockCodes"/><![CDATA['};
            ]]></script>
        </xsl:when>
        <xsl:otherwise>
            <script><![CDATA[
                webmd.ads2Consumer.defineAd({targets:{]]><xsl:value-of select="$targets"/><![CDATA[},blockCodes:']]><xsl:value-of select="$blockCodes"/><![CDATA[',id:']]><xsl:value-of select="$adID"/><![CDATA[',pos:']]><xsl:value-of select="$adPos"/><![CDATA[',sizes:]]><xsl:value-of select="$sizes"/><![CDATA[});
            ]]></script>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>



<!--
  ==================================================
  MOBILE AD SYSTEM
  ==================================================
-->
<xsl:template name="mobileAd_start">

    <xsl:param name="adType">
        <xsl:choose>
            <xsl:when test="$adPos = '2025'">
                <xsl:text>top</xsl:text>
            </xsl:when>
            <xsl:when test="$adPos = '2026'">
                <xsl:text>bottom</xsl:text>
            </xsl:when>
            <xsl:when test="$adPos = '901' or $adPos = '902' or $adPos = '1901'">
                <xsl:text>1x1</xsl:text>
            </xsl:when>
            <xsl:otherwise>
                <xsl:text>left</xsl:text>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:param>

    <!--
        Targets object

        targets: { $targets }

        Special cases:

        "pt" parameter (primary topic) uses [apg] token.
        This used to be sent as the "xpg" parameter in the old ad system.

        "env" parameter has some extra characters we don't need so we strip '&amp;enf='

        "uri" contains a url encoded string, but we decode it before passing to google, because
        google handles all necessary encoding

        "leaf" parameter uses token [pkg] but as set by runtime it has some extra characters we don't need,
        so those are stripped out using javascript.

        "app" parameter is an app id used for ads. Note this is not the same as webmd.appid which is used by registration.
        Apps can set the webmd.adappid variable at the top of the page to set this, or (preferred) can directly call webmd.ads2.setPageTarget()
        to set the parameter directly.
    -->
    <xsl:param name="targets">
        <xsl:text>art:'[artid]',</xsl:text>
        <xsl:text>cc:'[cc]',</xsl:text>
        <xsl:text>env:'[env]',</xsl:text>
        <xsl:text>hcent:'[hcent]',</xsl:text>
        <xsl:text>leaf:'[pkg]',</xsl:text>
        <xsl:text>mcent:'[mcent]',</xsl:text>
        <xsl:text>mic:'[micro]',</xsl:text>
        <xsl:text>pt:'[apg]',</xsl:text>
        <xsl:text>sec:'[sec]',</xsl:text>
        <xsl:text>pug:'[pug]',</xsl:text>
        <xsl:text>scent:'[scent]',</xsl:text>
        <xsl:text>tmg:'[tmg]',</xsl:text>
        <xsl:text>tug:'[tug]',</xsl:text>
        <xsl:text>uri:'[uri]'</xsl:text>
    </xsl:param>

    <!--
        Block codes

        This is to allow for overwriting for exchanges
    -->
    <xsl:param name="blockCodes">
        <xsl:text>[bc]</xsl:text>
    </xsl:param>

    <xsl:text>Mobile Ad</xsl:text>


    <!--
        Wrapping divs for the ad to allow various styles to be applied.
        Most of this code is legacy and should probably be updated later.
    -->
    <xsl:choose>
        <xsl:when test="$print != 'false'">
            <!-- Don't display anything on print page -->
        </xsl:when>
        <xsl:when test="$adType = '1x1'">
            <div id="{$adID}" class="ad_placeholder"></div>
        </xsl:when>
        <xsl:when test="$adType = 'bottom' or $adType = 'top'">
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:text>ad_rdr </xsl:text>
                    <xsl:value-of select="$adType" />
                    <xsl:text>_ad_rdr</xsl:text>
                </xsl:attribute>
                <xsl:element name="div">
                    <xsl:attribute name="class">
                        <xsl:text>ad_label</xsl:text>
                    </xsl:attribute>
                    <xsl:text>Advertisement</xsl:text>
                </xsl:element>
                <xsl:element name="div">
                    <xsl:attribute name="id">
                        <xsl:value-of select="$adType" />
                        <xsl:text>_ad</xsl:text>
                    </xsl:attribute>
                    <div id="{$adID}" class="ad_placeholder"></div>
                </xsl:element>
            </xsl:element>
        </xsl:when>
        <xsl:when test="$adType = 'ss' or $adType = 'ssh'">
            <xsl:element name="div">
                <xsl:attribute name="id">
                    <xsl:text>slideshow_ad_300x250</xsl:text>
                </xsl:attribute>
                <xsl:if test="$adType = 'ssh'">
                    <xsl:attribute name="style">
                        <xsl:text>display:none;</xsl:text>
                    </xsl:attribute>
                </xsl:if>
                <xsl:element name="h3">
                    <xsl:text>Advertisement</xsl:text>
                </xsl:element>
                <div id="{$adID}" class="ad_placeholder"></div>
            </xsl:element>
        </xsl:when>
        <xsl:when test="$adType = 'ssi'">
            <script>
                <![CDATA[
                $('.ss_middle .ad_placeholder').attr('id', ']]><xsl:value-of select="$adID"/><![CDATA[');
                ]]>
            </script>
        </xsl:when>
        <xsl:when test="$adType = 'cw'">
            <div id="ad-cw" class="cw_btm_300x250_rdr">
                <div class="cw_btm_ad_top_fmt"></div>
                <div id="cw_btm_ad_300x250" class="cw_btm_ad_BG_fmt loaded">
                    <div id="{$adID}" class="ad_placeholder"></div>
                </div>
                <div class="cw_btm_ad_bottom_fmt"></div>
            </div>
        </xsl:when>
        <xsl:otherwise>
            <div id="{$adType}Ad_rdr">
                <div class="{$adType}Ad_top_fmt"> </div>
                <div id="{$adType}Ad_fmt" class="{$adType}Ad_BG_fmt loaded">
                    <!--
                        Placeholder for the ad.

                        NOTE: not sure if we need ad_placeholder class, but including that
                        because it was in legacy system and might have been used for styling.
                    -->
                    <div id="{$adID}" class="ad_placeholder"></div>
                </div>
                <xsl:if test="$adType != 'banner'">
                    <div class="{$adType}Ad_bottom_fmt"> </div>
                </xsl:if>
            </div>
            <xsl:if test="$adType != 'banner'">
                <div class="moduleSpacer_rdr"> </div>
            </xsl:if>
        </xsl:otherwise>
    </xsl:choose>

    <!--
        Script to set global targets for all ads on the page,
        then define the ad div and the pos value for that ad.
    -->
    <xsl:choose>
        <xsl:when test="$print != 'false'">
            <script><![CDATA[
                webmd.ads2Consumer.printAdTargets = {targets:{]]><xsl:value-of select="$targets"/><![CDATA[},blockCodes:']]><xsl:value-of select="$blockCodes"/><![CDATA['};
            ]]></script>
        </xsl:when>
        <xsl:otherwise>
            <script><![CDATA[
                webmd.ads2Consumer.defineAd({targets:{]]><xsl:value-of select="$targets"/><![CDATA[},blockCodes:']]><xsl:value-of select="$blockCodes"/><![CDATA[',id:']]><xsl:value-of select="$adID"/><![CDATA[',pos:']]><xsl:value-of select="$adPos"/><![CDATA[',sizes:]]><xsl:value-of select="$sizes"/><![CDATA[});
            ]]></script>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>


</xsl:stylesheet>












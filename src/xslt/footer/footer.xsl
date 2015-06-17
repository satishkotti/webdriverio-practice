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

        <div class="footer">
            <div class="footer-container">
                <div class="footer-social" data-metrics-module="ftr">
                    <p>Find WebMD on:</p>
                    <ul class="clearfix">
                        <li><a href="http://www.webmd.com/click?url=http%3A//www.facebook.com/%23!/WebMD%3Fref=ts" class="footer-social-icon fb" data-metrics-link="fb">Facebook</a></li>
                        <li><a href="http://www.webmd.com/click?url=http%3A//twitter.com/WebMD" class="footer-social-icon tw" data-metrics-link="tw">Twitter</a></li>
                        <li><a href="http://www.webmd.com/click?url=http%3A//pinterest.com/webmd/" class="footer-social-icon pt" data-metrics-link="pt">Pintrest</a></li>
                    </ul>
                </div>
                <div class="disclaimers" data-metrics-module="ftr">
                    <a onclick="TRUSTeWidget.Tab.link();" class="logo_AdChoices adChoice-dsk" data-metrics-link="ad-choice">AdChoices</a>
                    <a href="//preferences-mgr.truste.com/?pid=webmd01&amp;aid=webmdsafari_mobile01&amp;type=webmd_mobile" class="logo_AdChoices adChoice-mbl" data-metrics-link="ad-choice">AdChoices</a>
                </div>
                <div class="links" data-metrics-module="ftr">
                    <ul>
                        <li><a href="http://www.webmd.com/about-webmd-policies/default.htm?ss=ftr" data-metrics-link="abt">About WebMD</a></li>
                        <li><a href="http://www.webmd.com/about-webmd-policies/media/default.htm" data-metrics-link="adv">Advertise With Us</a></li>
                        <li><a href="http://www.webmd.com/about-webmd-policies/about-terms-and-conditions-of-use?ss=ftr" data-metrics-link="trms">Terms of Use</a></li>
                        <li><a href="http://www.webmd.com/about-webmd-policies/about-privacy-policy?ss=ftr" data-metrics-link="prvy">Privacy Policy</a></li>
                        <li><a href="https://customercare.webmd.com/ics/support/default.asp?deptID=18003&amp;task=ticket" data-metrics-link="cnt">Contact Us</a></li>
                    </ul>
                </div>
                <div class="copyright">
                    <p>&#169; 2005-2015 WebMD, LLC. All rights reserved.</p>
                    <p data-metrics-module="disclaimer">WebMD does not provide medical advice, diagnosis or treatment.<br/> <a data-metrics-link="info" href="http://www.webmd.com/www/policies/additional-info?ss=ftr" rel="nofollow">See additional information.</a></p>
                </div>
            </div>
        </div>
        <xsl:text disable-output-escaping="yes"><![CDATA[
        <script type="text/javascript">
            $(function(){
                if(webmd.useragent.ua.type == 'mobile'){
                    $('.adChoice-dsk').remove();
                } else {
                    $('.adChoice-mbl').remove();
                    var fileNameToLoad = '//preferences.truste.com/webservices/js?type=webmd&domain=webmd';

                    webmd.load({js:[fileNameToLoad, '//privacy-policy.truste.com/privacy-seal/WebMD,-LLC/asc?rid=f733a173-6d11-4e17-ba9f-f1454ef8b32f']});
                }
            });
        </script>
        ]]></xsl:text>

    </xsl:template>
</xsl:stylesheet>








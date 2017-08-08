var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../page');
var rootPath = path.normalize(__dirname)
var input = require('./../../config/Webmd-tv')[argv.env];
//var url = input.marqueeheader;
var webmdtvpage = Object.create(Page, {
    /**
     * define elements
     */
    //Film strip locators
    video: { get: function () { return browser.element("//video[@class='akamai-html5 akamai-media-element']"); } },
    category: { get: function () { return browser.element("//h6[@class='category']"); } },
    about: { get: function () { return browser.element("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']"); } },
    abouttext: { get: function () { return browser.element("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']/span"); } },
    //ad: { get: function () { return browser.element("//div[@id='otherAd_fmt']//div[@id='ads2-pos-131-rr_ad']"); } },
    title: { get: function () { return browser.element("//div[@class='info-container-wrap']/div/div/div[@class='title-section']/div[@class='title2']"); } },
    transcript: { get: function () { return browser.element("//div[@class='cmd-section']/div[@class='cmd-transcripts btn btn-default']"); } },
    transcripttext: { get: function () { return browser.element("//div[@class='cmd-section']/div[@class='cmd-transcripts btn btn-default']/span"); } },
    episodetitleN: { value: function (n) { return browser.element("(//div[@class='more-videos']//div[@class='owl-item'] | //div[@class='more-videos']//div[@class='owl-item active'])[" + n + "]//div[@class='default']"); } },
    facebook: { get: function () { return browser.element("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']/following-sibling::div[1]"); } },
    facebooktext: { get: function () { return browser.element("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']/following-sibling::div[1]/span"); } },
    twitter: { get: function () { return browser.element("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']/following-sibling::div[2]"); } },
    twittertext: { get: function () { return browser.element("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']/following-sibling::div[2]/span"); } },
    //videoN: { value:function(n){ return browser.element("(//div[@class='more-videos']//div[@class='owl-item'] | //div[@class='more-videos']//div[@class='owl-item active'])["+n+"]");}},
    filmstripN: { value: function (n) { return browser.element("(//div[@class='more-videos']//div[@class='owl-item'] | //div[@class='more-videos']//div[@class='owl-item active'])[" + n + "]//h4"); } },
    imagethumnailN: { value: function (n) { return browser.element("(//div[@class='more-videos']//div[@class='owl-item'] | //div[@class='more-videos']//div[@class='owl-item active'])[" + n + "]//img"); } },
    playiconN: { value: function (n) { return browser.element("(//div[@class='more-videos']/div[@class='thumb-header']//div[@class='owl-item'] | //div[@class='more-videos']//div[@class='owl-item active'])[" + n + "]//div[@class='thumb-header']//div[@class='play-iconbox']"); } },
    playshapeN: { value: function (n) { return browser.element("(//div[@class='more-videos']/div[@class='thumb-header']//div[@class='owl-item'] | //div[@class='more-videos']//div[@class='owl-item active'])[" + n + "]//div[@class='thumb-header']//div[@class='play-iconbox']//div[@class='playshape']"); } },
	playicons: { value: function (n) { return browser.element("(//div[@class='more-videos']/div[@class='thumb-header']//div[@class='owl-item'] | //div[@class='more-videos']//div[@class='owl-item active'])[" + n + "]//img/following-sibling::div[@class='play-iconbox']"); } },
    aboutheader: { get: function () { return browser.element("//div[@class='module premium-video-container main-content about-open']//div[@class='about-video premium open']//div[@class='header-row clearfix']//span[@class='header']"); } },
    titletext: { get: function () { return browser.element("//div[@class='title-section']/div[@class='title2']"); } },

    //About and Trandcript locators
    //abouttitletext:{ get: function () { return browser.element("//div[@class='about-video premium open']/h4"); } },--old //div[@class='about-video premium open']//div[@class='inner-about']//h4
    abouttitletext: { get: function () { return browser.element("//div[@class='about-video premium open']//div[@class='inner-about']//h4[@class='title']"); } },
    //abouttime:{ get: function () { return browser.element("//div[@class='about-video premium open']//span[@class='time']"); } },-old //div[@class='about-video premium open']//div[@class='inner-about']//span[@class='time']
    abouttime: { get: function () { return browser.element("//div[@class='about-video premium open']//div[@class='inner-about']//span[@class='time']"); } },
    sourcestext: { get: function () { return browser.element("//span[@class='sources-toggle']"); } },
    copyright: { get: function () { return browser.element("//div[@class='sources']"); } },
    //aboutclose:{ get: function () { return browser.element("//div[@class='about-video premium open']/div[@class='header-row clearfix']//span[@class='close-icon']"); } },//old --//div[@class='about-video premium open']//div[@class='inner-about']//span[@class='close-icon']
    //aboutclose: { get: function () { return browser.element("//div[@class='about-video premium open']//div[@class='inner-about']//span[@class='close-icon']"); } },
    aboutclose: { get: function () { return browser.element("//div[@class='about-video premium open']//div[@class='header-row clearfix']//span[@class='close-icon']"); } },
    //aboutsynopsistext:{ get: function () { return browser.element("//div[@class='about-video premium open']/p"); } },//-old //div[@class='about-video premium open']//div[@class='inner-about']/p
    aboutsynopsistext: { get: function () { return browser.element("//div[@class='about-video premium open']//div[@class='inner-about']/p"); } },
    transcriptheader: { get: function () { return browser.element("//div[@class='transcript-video premium open']//div[@class='header-row clearfix']//span[@class='header']"); } },
    transcripttimeN: { value: function (n) { return browser.element("//div[@class='transcript-video premium open']//div[@class='transcript-container clearfix ttml']//div[@class='trans-row clearfix'][" + n + "]//div[@class='col1 time']/../div"); } },
    transcriptauthorN: { value: function (n) { return browser.element("//div[@class='transcript-video premium open']//div[@class='transcript-container clearfix ttml']//div[@class='trans-row clearfix'][" + n + "]//div[@class='col2']//div[@class='name']"); } },
    transcripttextN: { value: function (n) { return browser.element("//div[@class='transcript-video premium open']//div[@class='transcript-container clearfix ttml']//div[@class='trans-row clearfix'][" + n + "]//div[@class='col2']//div[@class='text']"); } },
    transcriptclose: { get: function () { return browser.element("//div[@class='transcript-video premium open']/div[@class='header-row clearfix']//span[@class='close-icon']"); } },

    //Video Locators
    play: { get: function () { return browser.element("//div[@class='vjs-play-control vjs-control vjs-playing']"); } },
    pause: { get: function () { return browser.element("//div[@class='vjs-play-control vjs-control vjs-paused']"); } },
    smallvideoplay: { get: function () { return browser.element("//div[@class='vjs-progress-control vjs-control']//div[@role='slider']//div[@class='vjs-play-progress']"); } },
    nowplaying: { get: function () { return browser.element("//div[@class='info-container-wrap']//div[@class='title1']/span"); } },
    smallvideonowplaying: { get: function () { return browser.element("//div[@class='akamai-video akamai-layer']//video[@class='akamai-html5 akamai-media-element']"); } },
    videonowplaying: { get: function () { return browser.element("//div[@class='akamai-overlays akamai-layer']//div[@class='akamai-play akamai-overlay']"); } },

    //Grid Locators

     gridtitle: { get: function () { return browser.element("//div[@class='list-header']"); } },
    grid1articletitle1: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[1]//h4'); } },
    grid1articletitle2: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[1]//h5'); } },
    grid2articletitle1: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[2]//h4'); } },
    grid2articletitle2: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[2]//h5'); } },
    grid3articletitle1: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[3]//h4'); } },
    grid3articletitle2: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[3]//h5'); } },
    grid1image: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[1]//img'); } },
    grid2image: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[2]//img'); } },
    grid3image: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[3]//img'); } },
    breadcrum: { get: function () { return browser.element("//section[@class='breadcrumb']/h6"); } },

    //Grid Articles
    grid4articletitle1: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[4]//h4'); } },
    grid4articletitle2: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[4]//h5'); } },
    grid5articletitle1: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[5]//h4'); } },
    grid5articletitle2: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[5]//h5'); } },
    grid6articletitle1: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[6]//h4'); } },
    grid6articletitle2: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[6]//h5'); } },
    inforbartitle: { get: function () { return browser.element("//div[@class='info-container clearfix']/div[@class='title-section']/div[@class='title2']"); } },
    leftarrow: { get: function () { return browser.element("//a[@class='video-nav-left']"); } },
    rightarrow: { get: function () { return browser.element("//a[@class='video-nav-right']"); } },
    leftnavigationarrow: { get: function () { return browser.element("//div[@class='nav-arrow-left']"); } },
    rightnavigationarrow: { get: function () { return browser.element("//div[@class='nav-arrow-right']"); } },
    filmstripelements: { get: function () { return browser.element("//div[@class='more-videos']//div[@class='owl-item'] | //div[@class='more-videos']//div[@class='owl-item active']"); } },

    //PPE-99104 DATA Entry locators
    maintext: { get: function () { return browser.element("//div[@id='ugc-wrapper']//div[@id='ugc-form']//div[@class='form-wrap']//form[@id='WMDTVShareYourStory']//div[@class='field']"); } },
    maintextarea: { get: function () { return browser.element("//form[@id='WMDTVShareYourStory']//div[@class='field focused']//textarea"); } },
    gender: { get: function () { return browser.element("//div[@class='radio-btn']//label[@for='ugc-male']"); } },

    //adlayout

    videoadlayout: { get: function () { return browser.element("//video[@class='akamai-html5 akamai-media-element']"); } },
  //ad: { get: function () { return browser.element("//div[@id='google_ads_iframe_/8668145/consumer/webmd_0__container__']"); } },
  //adlayouts: { get: function () { return browser.element("//div[@id='otherAd_fmt']//div[@id='ads2-pos-131-rr_ad']"); } },
  adlayouts: { get: function () { return browser.element("//div[@class='aside-content']//div[@id='rightAd_rdr']//div[@id='rightAd_fmt']"); } },
  gridad:{get:function(){return browser.element("//div[@id='rightAd_rdr']//div[@id='rightAd_fmt']//div[@class='ad_placeholder']");}},
  

//email
    email: { get: function () { return browser.element("//div[@class='field text email']//input[@id='ugc-email']"); } },
    clearemail: { get: function () { return browser.element("//div[@class='field text email focused']//input[@id='ugc-email']"); } },
    emailtext: { get: function () { return browser.element("//div[@class='field text email']//span"); } },
    youtube: { get: function () { return browser.element("//div[@class='field text website']//input[@id='ugc-website']"); } },
    clearyoutube: { get: function () { return browser.element("//div[@class='field text website focused']//input[@id='ugc-website']"); } },
//phone Entry
    phone: { get: function () { return browser.element("//div[@class='field text phone']//input[@id='ugc-phone']"); } },
    clearphone: { get: function () { return browser.element("//div[@class='field text phone focused']//input[@id='ugc-phone']"); } },
    name: { get: function () { return browser.element("//div[@class='field text name']//input[@id='ugc-name']"); } },
    clearage: { get: function () { return browser.element("//div[@class='field-group']//div[@class='field col age']//input"); } },
    nametext: { get: function () { return browser.element("//div[@class='field text name']//span"); } },
    clearname: { get: function () { return browser.element("//div[@class='field text name focused']//input[@id='ugc-name']"); } },
//Age
    age: { get: function () { return browser.element("//div[@class='field col age']//input[@id='ugc-age']"); } },
    checkbox: { get: function () { return browser.element("//div[@class='field terms']//span[@class='checkbox']"); } },
    share: { get: function () { return browser.element(".submit"); } },
    thankyou: { get: function () { return browser.element("//div[@class='form-wrap']//span[@class='close-form']/following-sibling::h3"); } },
    shareclosebutton: { get: function () { return browser.element("//div[@class='form-wrap']//span[@class='close-form']"); } },
    namerequired: { get: function () { return browser.element("//div[@class='form-bottom']//div[@class='field text name']//span//em"); } },
    emailrequired: { get: function () { return browser.element("//div[@class='form-bottom']//div[@class='field text email']//span//em"); } },
    checkboxrequired: { get: function () { return browser.element("//div[@class='show']//div[@class='field terms']//span//em"); } },

	videoTitle: { value: function (n) { return browser.element('//div [@class="owl-stage"]/div["+i+"]/div/a/div[2]/h4'); } },
	episode:{ value: function (n) { return browser.element('//div [@class="owl-stage"]/div["+i+"]/div/a/div[2]/div[1]'); } },

//Grid Titles

    gridtitle: { get: function () { return browser.element("//div[@class='list-header']"); } },
    gridtypeN: { value: function (n) { return browser.element("div:nth-child("+n+") > a > div.inner-2.art-title1 > h4"); } },
    gridtitleN: { value: function (n) { return browser.element("div:nth-child("+n+") > a > div.inner-2.art-title1 > h5 > span"); } },
    gridImageN: { value: function (n) { return browser.element("div:nth-child("+n+") > a > div.inner-1 > img"); } },
    gridcount:{ get: function (n) { return browser.element("div.inner-2.art-title1 > h5 > span"); } },
	
	//Splash Header locators
	
	    sponsortext: { get: function () { return browser.element("//section[@id='s1']//span[@class='sponsored']"); } },
    Videolabel: { get: function () { return browser.element("//div[@class='multimedia-grid']/div[@class='item-duo-wrapper']/div[1]/a/div[@class='overlay']/p/span[1]"); } },    
    Webmdlogo: { get: function () { return browser.element("//section[@id='s1']//img[@class='wmd-white-logo']"); } }, 
    Migranelogo: { get: function () { return browser.element("//section[@id='s1']//span[@class='emp']"); } }, 
     Webmdhome: { get: function () { return browser.element("//*[@id='ContentPane1']//img[@class='global-nav-logo']"); } }, 
    Standuplogo: { get: function () { return browser.element("//section[@id='s1']//span[contains(.,'Stand up to')]"); } }, 
Migranevideologo: { get: function () { return browser.element("//div[@class='masthead-stretch']//span[@class='emp']"); } },   
Standupvideologo: { get: function () { return browser.element("//div[@class='masthead-stretch']//span[contains(.,'Stand up to')]"); } }, 

//Splash page elements

  Videoplayer: { get: function () { return browser.element("//video[@class='akamai-html5 akamai-media-element']"); } },
   Videosponsor: { get: function () { return browser.element("//div[@class='masthead-right clearfix sponsor-info']/div[@class='sponsor-logo']/div[@class='marquee_ed_disclaimer']"); } },
   Videomasterhead: { get: function () { return browser.element("//div[@class='masthead-stretch']//div[@class='masthead-wrapper clearfix']"); } },
  
   Filmstrip: { get: function () { return browser.element("//div[@id='webmd-tv-playlists']"); } },   
    Ugcmodule: { get: function () { return browser.element("//*[@id='ugc-widget']/div[1]/div"); } },    
    Assetgrid: { get: function () { return browser.element("//div[@class='list-container']"); } },
    Surveyclose: { get: function () { return browser.element("//div[contains(@onclick,'sw(1);')]"); } },
     Videotime: { get: function () { return browser.element("//div[@class='vjs-current-time-display']"); } },
     Videoplaying: { get: function () { return browser.element("//div [@class='dyn-controlbar']/div[@class='vjs-play-control vjs-control vjs-playing']"); } },
     Videopause: { get: function () { return browser.element("//div [@class='dyn-controlbar']/div[@class='vjs-play-control vjs-control vjs-paused']"); } },
     Videocard: { get: function () { return browser.element("//div[@class='multimedia-grid']/div[@class='item-duo-wrapper']/div[1]/a/div[@class='overlay']"); } },
     Videocardimg: { get: function () { return browser.element("//div[@class='multimedia-grid']/div[@class='item-duo-wrapper']/div[1]/a/img"); } },
     Videocardplaybtn: { get: function () { return browser.element("//div[@class='multimedia-grid']/div[@class='item-duo-wrapper']/div[1]/a/div[@class='overlay']/div[@class='button']/span[@class='icon']"); } },
     Videocardvideolabel: { get: function () { return browser.element("//div[@class='multimedia-grid']/div[@class='item-duo-wrapper']/div[1]/a/div[@class='overlay']/p/span"); } },
     Videocardsponsorcontentlabel: { get: function () { return browser.element("//div[@class='multimedia-grid']//div[@class='overlay']//span[contains(text(),'Sponsor Content')]"); } },
  Videocardsponsorcontentplaybtn: { get: function () { return browser.element("//div[@class='multimedia-grid']/div[@class='item-duo-wrapper']/div[4]/a/div[@class='overlay']/div[@class='button']/span[@class='icon']"); } },
  Videocardsponsorcontentimg: { get: function () { return browser.element("//div[@class='multimedia-grid']/div[@class='item-duo-wrapper']/div[4]/a/img"); } },
	
     Videocardquotead: { get: function () { return browser.element("//div[@class='multimedia-grid']/div/div[@class='grid-item type-ad type-quote']"); } },
     Videocardquoteadcntname: { get: function () { return browser.element("//div[@class='multimedia-grid']/div/div[@class='grid-item type-ad type-quote']/div/div[@class='quote-next-to-ad']/div/p[@class='quote-attr']/span[@class='name']"); } },
     Videocardquoteadcntlocation: { get: function () { return browser.element("//div[@class='multimedia-grid']/div/div[@class='grid-item type-ad type-quote']/div/div[@class='quote-next-to-ad']/div/p[@class='quote-attr']/span[@class='city']"); } },
     
     Videocardquotewithoutad: { get: function () { return browser.element("//div[@class='multimedia-grid']/div/div[@class='grid-item type-quote']"); } },
     Videocardquotewithoutadcntname: { get: function () { return browser.element("//div[@class='multimedia-grid']/div/div[@class='grid-item type-quote']/div/div/p[@class='quote-attr']/span[@class='name']"); } },
     Videocardquotewithoutadcntocation: { get: function () { return browser.element("//div[@class='multimedia-grid']/div/div[@class='grid-item type-quote']/div/div/p[@class='quote-attr']/span[@class='city']"); } },
     Filmstripplaybtn: { get: function () { return browser.element("//div[@id='webmd-tv-playlists']/div[@class='more-videos']/div[@class='playlist filmstrip visually-hidden owl-carousel owl-loaded owl-drag']/div[@class='owl-stage-outer']/div/div[5]/div/a/div[@class='thumb']/div"); } },
     Filmstripplaybtnimg: { get: function () { return browser.element("//div[@id='webmd-tv-playlists']/div[@class='more-videos']/div[@class='playlist filmstrip visually-hidden owl-carousel owl-loaded owl-drag']/div[@class='owl-stage-outer']/div/div[5]/div/a/div[@class='thumb']/img"); } },
     Assetgridelements: { get: function () { return browser.element("//div[@class='pane art-list-grid']/div[@class='list-container']"); } },
     Assetgridad: { get: function () { return browser.element("//*[@id='rightAd_rdr_webmdtv']"); } },
     Assetgridlabel: { get: function () { return browser.element("//div[@class='list-item Video']//h4"); } },
     Assetgridheader: { get: function () { return browser.element("//div[@class='list-container']//div[@class='list-header']"); } },
     Assetgridvideolabel: { get: function () { return browser.element("//div[@class='list-item Video']//h4[contains(.,'Video')]"); } },
    Assetgridsponsorlabel: { get: function () { return browser.element("//div[@class='list-item Video']//h4[contains(.,'from our sponsor')]"); } },
    Assetgridepisodelabel: { get: function () { return browser.element("//div[@class='list-item Video']//h4[contains(.,'Episode')]"); } },

    Assetgridslideshowlabel: { get: function () { return browser.element("//div[@class='pane art-list-grid']/div[@class='list-container']/div[@class='list-header']"); } },
    Splashpollpresence: { get: function () { return browser.element("//div[@id='poll-module-placeholder']/div"); } },
    Splashpollallelm: { get: function () { return browser.element("//div[@id='poll-module-placeholder']/div//div[@class='content']/div[@class='options-wrapper']/div[@class='option answer']/p"); } },
    Splashpolltotvote: { get: function () { return browser.element("//div[@id='totalVote']/span"); } },
     Splashpollvoteinc: { get: function () { return browser.element("//div[@class='option answer selected']/p/em"); } }, 
    Splashpollvotebef: { value: function (i) { return browser.element("//div[@class='options-wrapper']["+i+"]/div/p"); } },

	
	//Jagan 
	
	heading: { get: function () { return browser.element('//h6[contains(text(),"Lorem Ipsum Identifier")]'); } },
    elem : { get: function () { return browser.element('//div[@id="ugc-widget"]/div[1]/div/div[4]/div/div/section[1]/div[2]'); } },
    title: { get: function () { return browser.element('//header[@class="page-header"]//h1[contains(text(),"Signs and Symptoms of Cancer")]'); } },
    twitter: { get: function () { return browser.element('//div[@id="fed-sharebar"]/div[1]/a[1]'); } },
    pinterest: { get: function () { return browser.element('//div[@id="fed-sharebar"]/div[1]/a[2]'); } },
    facebook1: { get: function () { return browser.element('//div[@id="fed-sharebar"]/div[1]/a[3]'); } },
    logo: { get: function () { return browser.element('//div[@id="logo"]'); } },
    presentstxt: { get: function () { return browser.element('//div[@id="ContentPane2"]/header[1]/div[1]/div/div[1]/div[1]/small'); } },
    heading1: { get: function () { return browser.element('//span[text()="Stand up for"]'); } },
    heading2: { get: function () { return browser.element('//span[text()="Migraines"]'); } },
    transcriptimage: { get: function () { return browser.element('//div[@id="marquee-video-instance"]/div[2]/div/div/div[2]/div[1]/img'); } },
    transcripttext: { get: function () { return browser.element("//div[@class='cmd-section']/div[@class='cmd-transcripts btn btn-default']/span"); } },
    transcriptoverlayheading: { get: function () { return browser.element('//div[@id="marquee-video"]/div/div[3]/div[1]/span[1]'); } },
    transcriptoverlayclose: { get: function () { return browser.element('//span[@class="close-icon"]'); } },
    video : {get: function() { return browser.element('//div[@class="akamai-video akamai-layer"]');}},
    ugcmoduleTitle: {get: function(){return browser.element('//div[@id="ugc-wrapper"]/h3');}},
    previcon      : {get :function(){return browser.element('//div[@id="ugc-widget"]/div[2]/a[1]/div/span[@class="icon"]');}},
    nexticon      : {get :function(){return browser.element('//div[@class="owl-next"]//span[@class="icon"]');}},
    quotetitle    : {get :function(){return browser.element('//*[@id="ContentPane2"]/header[2]');}},
    quoteauthor   : {get :function(){return browser.element('//div[@class="owl-item active"][1]//div[@class="user-info"]/span[1]');}},
    ugcmodule     : {get :function(){return browser.element('//div[@id="ugc-widget"]//div[@class="owl-stage"]');}},
    image         : {get :function(){return browser.element('//*[@id="ugc-widget"]/div[1]/div/div[3]/div/div/section[2]/div/img');}},
    user_info     : {get :function(){return browser.element('//div[@class="owl-item active"]//div[@class="user-info"]/span[2]');}},
	
	videoTitleflim : { get: function () { return browser.element("//div[@class='title2']"); } },
    /**
* define or overwrite page methods
*/
    open: {
        value: function () {
            Page.open.call(this, url);
        }
    },

});
module.exports = webmdtvpage

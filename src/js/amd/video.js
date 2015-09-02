/*! funded editorial video  */

define(['video2/1/video'], function() {
	
	/**
	 *
	 */
	fundedEditorialVideo = (function() {

		var videoManager,
			videoPlayer,
			videoUi,
			$videoWrapper,
			config = {
				playeroverlay : {enabled : false},
				media: {
					source:[],
					track : [
						{
							kind : "captions",
							type : "application/ttml+xml",
							srclang : "en",
							src : "/captioning.xml"
						}
					]
				}/*,
				ima: {
					enabled: true,
					resources: [
						{
							src: "http://imasdk.googleapis.com/js/sdkloader/ima3.js",
							type: "text/javascript"
						}
					],
					version: 3,
					adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x360&iu=/8668145/consumer/webmd/vd2-conwebmd&ciu_szs=1x1,160x600,300x60,300x250&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=' + window.location.host + '&description_url= ' + window.location.host + '&correlator=' + new Date().toString(),
					disableCompanionAds: "true"
				}*/
			};


		function init(wrapperId, videoSrc) {
			$videoWrapper = $('.' + wrapperId);

			require(['video2/1/video', 'video2/1/daily-player-shared/player-shared'], function(video, playerShared) {

				config.media.source = playerShared.createVideoSource(videoSrc);

				videoManager = video.init(wrapperId, config);
				videoPlayer = videoManager.getVideo();
				videoUi = videoManager.getUi();
			});

		}

		// only expose init
		return {
			init : init
		};

	})();

	return fundedEditorialVideo;
});

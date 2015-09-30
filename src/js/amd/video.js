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
				autoplay: true,
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
				}
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

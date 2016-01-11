/*! webmd email_asset_overlay AMD module */

define(

	// Dependencies
	[
		'repository_service/1/service', // repository service
		'email_api/1/email_api', // emailService wrapper
	],

	// Module definition
	function(dctmService, emailService) {

		var module;

		/**
		 * @name emailAssetOverlay
		 * @namespace Overlay to display "email a friend" form to email a documentum  asset
		 */

		module = /** @lends emailAssetOverlay */ {


			/**
			 * Timeout to use for the email api service call.
			 * @type Number
			 */
			timeout: 15000,


			/**
			 * Maximum number of recipients allowed
			 * @type Number
			 */
			maxRecipients: 10,


			/**
			 * Module name for all metrics calls.
			 * @type String
			 */
			metricsModule: 'funded-email',


			/**
			 * Various messages used by the overlay.
			 * @type Object
			 */
			msg: {
				errorHeading: '',
				fromAddressEmpty: 'Enter your email address.',
				fromAddressInvalid: 'Your email address is not a valid email format.',
				fromNameEmpty: 'Enter your name.',
				toAddressEmpty: 'Enter a valid email address',
				toAddressInvalid: 'Enter a valid email address',
				servicePartial: 'Email was successfully sent to some addresses, but one or more addresses had errors.',
				serviceError: 'An error occurred sending the email.',
				maxRecipients: 'You can send to a maximum of {max} recipients.',
				errorTitle: 'ERROR: could not retrieve title ({id})'
			},


			//--------------------------------------------------
			// PUBLIC FUNCTIONS
			//--------------------------------------------------

			/**
			 * Show the email a friend overlay.
			 *
			 * <p>Note: there are currently no callbacks so you can't tell if the email
			 * was successful or if the overlay was closed. All of the functionality
			 * is handled by this module.</p>
			 *
			 * @param {Object} options A set of key/value pairs that configure the overlay.
			 *
			 * @param {String} [options.assetTitle] The title for the documentum asset. If you don't
			 * have the title available (such as by grabbing the title of the current page), you
			 * can omit the title, then we will use the repository service to look up the title.
			 * If you do not specify a title or an id, then the title will be hidden on the overlay.
			 *
			 * @param {String:HTML} [options.description] Override the descriptive paragraph after the heading.
			 *
			 * @param {String:HTML} [options.heading] Override the heading of the overlay.
			 *
			 * @param {String} [options.id] Chronicle id of the documentum asset to display.
			 *
			 * @param {String} [options.type=emailafriend] Override the email type for the email api. You can use this
			 * to specify an alternate email config and template.

			 * @param {Object} [options.params] Send additional key/value parameters to the email api.
			 *
			 * @example
			 *
			 * emailAssetOverlay.show({id:'091e9c5e803404c5'});
			 *
			 * @example
			 *
			 * emailAssetOverlay.show({type:'mytype', params:{'mykey1':'myvalue'}});
			 *
			 */
			init: function(options) {

				var self = this,
					dctmId = webmd.url.getParam('dctmId');

				// Save the options for later use.
				// Set a default for the "type" option.

				self.options = $.extend({
					type: 'emailafriend',
					id: dctmId,
					params : {
						id : dctmId
					}
				}, options);

				// Display the HTML in the overlay
				self._init2();
			},


			//==================================================
			// PRIVATE FUNCTIONS
			//==================================================

			/**
			 * When the page is ready, set up submit event.
			 * @private
			 */
			_init2: function() {

				var self = this,
					dom,
					el,
					options;

				// Shortcut variable so I have to type less, plus it makes the code minify munch better
				options = self.options;

				// Get pointers to all the elements within the HTML and save them in the object for later use.
				// "el" is a shortcut variable so I have to type less, plus it makes the code minify munch better.
				self.el = el = $('.wbmd-restricted-email');

				self.dom = dom = {
					modals: el.find('.modal'),
					modalForm: el.find('.modalForm'),
					modalBusy: el.find('.modalBusy'),
					modalDone: el.find('.modalDone'),
					heading: el.find('.heading'),
					description: el.find('.description'),
					info: el.find('.info'),
					assetContainer: el.find('.assetContainer'),
					assetTitle: el.find('.assetTitle'),
					form: el.find('form'),
					inputFromAddress: el.find('input[name=fromAddress]'),
					inputFromName: el.find('input[name=fromName]'),
					inputToAddress: el.find('input[name=toAddress]'),
					submit: el.find('button[type=submit]'),
					errors: el.find('.errors'),
					doneAddresses: el.find('.doneAddresses')
				};

				//
				// Set up event handlers for various things
				//

				dom.form.on('submit', function(e) {
					e.preventDefault();
					self._handleSubmit();
					return false;
				});

				dom.inputToAddress.bind('focus blur', function() {
					self.dom.errors.empty().hide();
					$(this).css('color', '#808080');
				});

				if (options.id) {
					self._getAssetTitle(options.id);
				} else {
					// We don't have an asset id or a title, so kill the whole asset container
					dom.assetContainer.hide();
				}
			},


			/**
			 * Perform a metrics call for this module id.
			 *
			 * @private
			 *
			 * @param {String} linkId The link id to append to the module name.
			 *
			 * @param {Boolean} pageViewFollows If a page view will occur immediately after the metrics
			 * call, set this to true, then we will use wmdTrack to set a cookie and record the metrics module
			 * along with the page view.
			 *
			 * @see emailAssetOverlay.metricsModule
			 */
			_metrics: function(linkId, pageViewFollows) {
				var metricsFunction;

				if (pageViewFollows) {
					metricsFunction = window.wmdTrack;
				} else {
					metricsFunction = window.wmdPageLink;
				}

				if (metricsFunction) {
					metricsFunction(this.metricsModule + '_' + linkId);
				}
			},


			/**
			 * Show a single pane of the UI (paneForm, paneBusy, paneDone).
			 * Also call resize on the overlay so it will adjust.
			 * @private
			 */
			_showModal: function(name) {

				var modal;

				modal = this.dom['modal' + name];
				if (modal) {
					this.dom.modals.hide();
					modal.show();
				}
			},


			/**
			 * Handler for form submittal: validate the form, then call the email service.
			 * @private
			 */
			_handleSubmit: function() {

				var self, serviceOptions, toArray;

				self = this;

				if (!self._validateForm()) {
					return;
				}

				// Get all the recipient addresses.
				// Set the argument to true so we also get the "from" address if the user checked CC
				toArray = self._getToAddressArray(true);

				// Put the to addresses into the thank you pane for later.
				// Do it here so we can avoid re-fetching those addresses later.
				// We use .text() instead of .html() because we don't trust the user-supplied text.
				self.dom.doneAddresses.text(toArray.join(', '));

				// Change the toArray into the format needed for the email API (an array of objects)
				toArray = $.map(toArray, function(value, i) {
					return {
						DisplayName: '', // Use a blank DisplayName because it is a required parameter
						Address: value
					};
				});

				// Set up the object that we'll pass to emailService
				serviceOptions = {

					type: self.options.type,

					params: self.options.params,

					timeout: self.timeout,

					sender: {
						DisplayName: self.dom.inputFromName.val(),
						Address: self.dom.inputFromAddress.val()
					},

					to: toArray,

					// Success handler
					success: function(data) {

						// Call metrics to indicate a successful send
						self._metrics('sub');

						self._showModal('Done');
					},

					// Error handler
					error: function(jqXHR, textStatus, errorThrown, data) {

						var code;

						// We got an error - so check the error code returend by the emailService

						code = (data.code || '').toString();

						switch (emailService.errorCodes[code]) {

							case 'toInvalid':

								// Metrics code to indicate invalid format for email
								// Note: you can test this by using an email like name@example.com,
								// because the service will not accept example.com emails
								self._metrics('e2');

								self._error(self.msg.toAddressInvalid);
								break;

							case 'fromInvalid':

								// Metrics code to indicate invalid format for email
								// Note: you can test this by using an email like name@example.com,
								// because the service will not accept example.com emails
								self._metrics('e2');

								self._error(self.msg.fromAddressInvalid);
								break;

							case 'partialSuccess':

								// Metrics code to indicate invalid format for email
								// Note: you can test this by using a valid address,
								// plus an address like name@example.com,
								// because the service will not accept example.com emails
								self._metrics('e101');

								self._error(self.msg.servicePartial);
								break;

							default:
								// Metrics code to indicate a service error
								self._metrics('e22');

								self._error(self.msg.serviceError);
						}
					}
				};

				// Set the chronicle id if it was supplied
				if (self.options.id) {
					serviceOptions.id = self.options.id;
				}

				// Before we call the service, hide the form and display the busy pane
				//self._showModal('Busy');

				// Call the service (asynchronously)
				emailService.send(serviceOptions);
			},


			/**
			 * Validate the form before submitting, and display error messages if anything is wrong.
			 *
			 * <p>Performs metrics calls for certain types of validation errors.</p>
			 *
			 * @returns {Boolean} Returns true if the form is ready to submit.
			 * Returns false if there is a problem and the form should not be submitted.
			 *
			 * @private
			 */
			_validateForm: function() {

				var dom, el, errorHtml, errors, focusFlag, self, toAddressArray;

				self = this;

				// Shortcut function to only call the error metric once per form submission.
				// If called more than once, only the first one will perform a metrics call,
				// others will be discarded.

				function errorMetrics(code) {

					// Make sure we don't call this function more than once per form submission
					if (errorMetrics.called) {
						return;
					}

					// Set flag so we can't call this again
					errorMetrics.called = true;

					self._metrics(code);
				}

				// Shortcut variable because I don't like to type self.dom a million times,
				// plus this will make the code minify better, cause that's how I roll
				dom = self.dom;

				// Array to hold all the errors messages, so we can display them all.
				// Also used at the end to determine if any errors occurred.
				errors = [];

				//
				// Check the fromAddress
				//

				el = dom.inputFromAddress;
				if (self._isEmpty(el)) {

					// Error code e1 = email field left blank
					errorMetrics('e1');

					errors.push(self.msg.fromAddressEmpty);

				} else if (!self._isEmail(el.val())) {

					// Error code e2 = email invalid format
					errorMetrics('e2');

					errors.push(self.msg.fromAddressInvalid);
				}

				//
				// Check the fromName
				//

				el = dom.inputFromName;
				if (self._isEmpty(el)) {

					// Error code e21 = email display name left blank
					errorMetrics('e21');

					errors.push(self.msg.fromNameEmpty);
				}


				// Get an array of all the to addresses that were entered,
				// but don't include the user's "from" address if they are getting a CC,
				// because we already checked the from address above, ya know?
				toAddressArray = self._getToAddressArray(false);

				// Check that we got at least one address,
				// (if user did not check the CC checkbox)
				//if (toAddressArray.length === 0 && !dom.inputCC.is(':checked')) {

					// Zero recipients and no CC!!! We can't be havin' that!

					// Error code e1 = email field left blank
				//    errorMetrics('e1');

				//    errors.push(self.msg.toAddressEmpty);

				//} else {

					// We got recipients!
					// Or maybe user checked the CC checkbox in which case toAddressArray will be zero,
					// but that's okay wit me.

					// Make sure user has not exceded the maximum number of recipients
					// Note we do not count the CC address
					if (toAddressArray.length >= self.maxRecipients) {

						// Metrics error code e100 = too many recipients
						errorMetrics('e100');

						// Format the error message so it include the max number of recipients
						errors.push(webmd.substitute(self.msg.maxRecipients, {
							max: self.maxRecipients
						}));
					}

					// Loop through each address to verify is is email format
					$.each(toAddressArray, function(i, value) {

						// Check if email is not in email format
						if (!self._isEmail(value)) {

							// Error code e2 = email invalid format
							errorMetrics('e2');

							errors.push(self.msg.toAddressInvalid);

							// Return false to stop the .each() looping (for all is lost...)
							return false;
						}
					});
				//}

				// Display errors (if any) {yeah right, like there's not going to be errors}
				if (errors.length) {
					// Wrap each error in <li></li>
					errors = $.map(errors, function(val, i) {
						return '<li>' + val + '</li>';
					});

					// Put the list items inside a UL
					errorHtml = '<ul>' + errors.join('') + '</ul>';

					// Display the errors on the page
					self._error(errorHtml);

					// Return false so the validation fails
					return false;

				} else {

					// No errors so hide any previous errors that were displayed
					self._error();

					// Return true so the validation passes
					return true;
				}
			},


			/**
			 * Check if an input field is empty, contains all spaces, or contains label text.
			 *
			 * @param {element|jQuery object} el The input element.
			 *
			 * @returns {Boolean} Returns true if the field is considered to be empty.
			 * Returns false if the field contains user-entered content.
			 *
			 * @private
			 */
			_isEmpty: function(el) {

				// Convert to a jQuery object so we can do jQuery hoodoo
				el = $(el);

				return $.trim(el.val()) === '';
			},



			/**
			 * Check if an input field contains something that looks like an email address.
			 *
			 * @returns {Boolean} Returns true if the field is considered to be empty.
			 * Returns false if the field contains user-entered content.
			 *
			 * @private
			 */
			_isEmail: function(email) {

				// Remove leading and trailing whitespace
				email = $.trim(email);

				// Check against a regular expression to match email address format,
				// and return boolean result
				return (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i).test(email);
			},


			/**
			 * Display an error message, or hide the error message.
			 *
			 * <p>The error heading is always displayed before any error message you provide.</p>
			 *
			 * @param {String} [msg=''] If specified, display the error message.
			 * If not specified (or an empty string) hide the error message.
			 *
			 * @private
			 */
			_error: function(msg) {
				if (msg) {
					this.dom.errors.html(this.msg.errorHeading + msg).show();
					this.dom.inputToAddress.css('color','#ff0000');
				} else {
					this.dom.errors.empty().hide();
				}
				this._showModal('Form'); // will also do an overlay resize
			},


			/**
			 * Get an array of all the recipient addresses.
			 *
			 * <p>Strips out any blank addresses, and removes any duplicates.</p>
			 *
			 * @param {Boolean} includeCC Set this to true if you want to include the user's "from" address
			 * (assuming the user checked the CC checkbox and entered a from address).
			 *
			 * @returns {Array} An array of strings containing the email addresses that were entered.
			 *
			 * @private
			 */
			_getToAddressArray: function() {

				var el, toAddresses, toAddressArray, duplicate;

				// Create an array to hold all the addresses
				toAddressArray = [];

				// Create an object to hold addresses so we can check for duplicates
				duplicate = {};

				// Shortcut convenience variable (also makes this code minify smaller)
				el = this.dom.inputToAddress;

				// Get the toAddresses unless the input is empty (or has the label)
				if (!this._isEmpty(el)) {

					toAddresses = el.val();

					// Split the string into an array
					toAddressArray = toAddresses.split(',');
				}


				// If requested, add the from address if the user checked the cc checkbox, and entered a from address
				el = this.dom.inputFromAddress;
				//if (includeCC && this.dom.inputCC.is(':checked') && !this._isEmpty(el)) {
				//    toAddressArray.push(el.val());
				//}


				// Remove any blank values or duplicate values
				toAddressArray = $.map(toAddressArray, function(value, i) {

					// Trim the leading and trailing whitespace
					value = $.trim(value);

					// Remove from array if it is blank
					if (!value) {

						// For the $.map() function if you return undefined,
						// it will remove the item from the array
						return undefined;

					}

					// Remove from array if it is a duplicate
					if (duplicate[value]) {

						// For the $.map() function if you return undefined,
						// it will remove the item from the array
						return undefined;

					}

					// Save this email so we can check later emails for duplicates
					duplicate[value] = true;

					// Keep this cleaned-up value in the array
					return value;
				});

				return toAddressArray;
			},


			/**
			 * Fetch the title of the asset from the repository service asynchronously,
			 * then add it to the form. If a problem occurs display an error message.
			 *
			 * @param {String} id Chronicle id of the asset.
			 *
			 * @private
			 */
			_getAssetTitle: function(id) {
				var self;

				self = this;

				// Hide the asset title until we can load it asynchronously
				// (passing in no title will make the title invisible)
				self._displayAssetTitle();

				dctmService.get({
					id: id,
					success: function(data) {

						var meta, title;

						// Look for the title starting at this part of the json data
						meta = 'webmd_rendition.content.wbmd_asset.metadata_section';

						// Get the link title if available, or fall back to the title
						title =
							webmd.object.get(meta + '.wbmd_wdw_ttl', data) ||
							webmd.object.get(meta + '.title', data);

						self._displayAssetTitle(title);
					},
					error: function() {

						// Error metric: 102 = error getting the title
						self._metrics('e102');

						// Display an error message that says we couldn't retrieve the title
						self._displayAssetTitle(webmd.substitute(self.msg.errorTitle, {
							id: id
						}));
					}
				});

			},


			/**
			 * Display the asset title.
			 * If an empty title is specified, then make the title invisible instead of hiding it
			 * (to prevent the overlay from changing size and jumping around)
			 *
			 * @param {String} title
			 *
			 * @private
			 */
			_displayAssetTitle: function(title) {

				if (title) {
					this.dom.assetTitle.text(title).css('visibility', 'visible').fadeIn();
				} else {
					this.dom.assetTitle.css('visibility', 'hidden');
				}

			}
		};

		// Return the AMD module
		return module;

	} // function()

); // define()

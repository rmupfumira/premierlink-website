/* global define */
/**
 * Sticky navbar
 */

define( ['jquery', 'underscore'], function ( $, _ ) {
	'use strict';

	if( $( '.js-sticky-offset' ).size() > 0 ) {

		// flag var, null for the start before we test
		var adminBarHeight = $( 'body' ).hasClass( 'admin-bar' ) ? 32 : 0,
			additionalOffset = 35,
			stickyOffset = $( '.js-sticky-offset' ).offset().top + additionalOffset,
			bodyClass    = 'sticky-navigation';

		// events listeners, everything goes trough here
		$( 'body' ).on( 'update_sticky_state.pt', function () {
			if ( $( 'body' ).hasClass( bodyClass ) ) {
				addStickyNavbar();
				$( window).trigger( 'scroll.stickyNavbar' );
			}
			else {
				removeStickyNavbar();
			}
		} );

		// add sticky navbar events and classes
		var addStickyNavbar = function () {
			$( window).on( 'scroll.stickyNavbar', _.throttle( function() {
				$( 'body' ).toggleClass( 'is-sticky-nav', $( window ).scrollTop() > ( stickyOffset - adminBarHeight ) );
			}, 20 ) ); // only trigered once every 20ms = 50 fps = very cool for performance
		};

		// cleanup for events and classes
		var removeStickyNavbar = function () {
			$( window ).off( 'scroll.stickyNavbar' );
			$( 'body' ).removeClass( 'is-sticky-nav' );
		};

		// event listener on the window resizing
		$( window ).on( 'resize.stickyNavbar', _.debounce( function() {
			// update sticky offset
			stickyOffset = $( '.js-sticky-offset' ).offset().top + additionalOffset;

			// turn on or off the sticky behaviour, depending if the <body> has class "sticky-navigation"
			$( 'body' ).trigger( 'update_sticky_state.pt' );
		}, 40 ) );

		// trigger for the initialization
		$( window ).trigger( 'resize.stickyNavbar' );

	}
} );
/* global*/

// config
require.config( {
	paths: {
		jquery:     'assets/js/fix.jquery',
		underscore: 'assets/js/fix.underscore',
		util:       'assets/js/bower_components/bootstrap/dist/js/umd/util',
		alert:      'assets/js/bower_components/bootstrap/dist/js/umd/alert',
		button:     'assets/js/bower_components/bootstrap/dist/js/umd/button',
		carousel:   'assets/js/bower_components/bootstrap/dist/js/umd/carousel',
		collapse:   'assets/js/bower_components/bootstrap/dist/js/umd/collapse',
		dropdown:   'assets/js/bower_components/bootstrap/dist/js/umd/dropdown',
		modal:      'assets/js/bower_components/bootstrap/dist/js/umd/modal',
		scrollspy:  'assets/js/bower_components/bootstrap/dist/js/umd/scrollspy',
		tab:        'assets/js/bower_components/bootstrap/dist/js/umd/tab',
		tooltip:    'assets/js/bower_components/bootstrap/dist/js/umd/tooltip',
		popover:    'assets/js/bower_components/bootstrap/dist/js/umd/popover',
		stampit:    'assets/js/bower_components/stampit/stampit',
	},
} );

require.config( {
	baseUrl: ''
} );

require( [
		'jquery',
		'underscore',
		'assets/js/portfolio-grid-filter/gridFilter',
		'assets/js/portfolio-grid-filter/sliderFilter',
		'assets/js/utils/isElementInView',
		'assets/js/utils/easeInOutQuad',
		'assets/js/NumberCounter',
		'assets/js/StickyNavbar',
		'carousel',
		'collapse',
], function ( $, _, gridFilter, sliderFilter, isElementInView, easeInOutQuad, NumberCounter ) {
	'use strict';


	/**
	 * Footer widgets fix
	 */
	$( '.col-md-__col-num__' ).removeClass( 'col-md-__col-num__' ).addClass( 'col-md-3' );


	/**
	 * Number Counter Widget JS code
	 */
	// Get all number counter widgets
	var $counterWidgets = $( '.number-counters' );

	if ( $counterWidgets.length ) {

		// jQuery easing function: easeInOutQuad, for use in NumberCounter
		easeInOutQuad();

		$counterWidgets.each( function () {
			new NumberCounter( $( this ) );
		} );
	}

	/**
	 * Portfolio grid filtering
	 */
	$('.portfolio-grid').each(function () {
		var hash = window.location.hash,
			portfolioGrid;

		if ('slider' === $(this).data('type')) {
			portfolioGrid = sliderFilter({
				$container: $(this),
			});
		}
		else {
			portfolioGrid = gridFilter({
				$container: $(this),
			});
		}

		// getting on visit
		if ( new RegExp('^#' + portfolioGrid.hashPrefix).test(hash) ) {
			$(this).find('a[href="' + hash.replace(portfolioGrid.hashPrefix, '') + '"]').trigger('click');
		}
	});

	/**
	 * Pause the carousel if it's not visible
	 */
	(function () {
		var $slider = $('.js-jumbotron-slider');

		if ($slider.length) {
			$(document).on('scroll', _.throttle(function () {
				if (isElementInView($slider)) {
					$slider.carousel('cycle');
				}
				else {
					$slider.carousel('pause');
				}
			}, 1000, {leading: false}));
		}
	}());

} );
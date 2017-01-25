jQuery(function(){
	
	'use strict';
			
	jQuery( '.map' ).each( function () {
		new SimpleMap( jQuery( this ), {
			markers: mapMarkers,
			zoom:    jQuery( this ).data( 'zoom' ),
			styles:  [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}],
		}).renderMap();
	});

	var theForm

	jQuery('form.aSubmit').validator().on('submit', function (e) {

		theForm = jQuery(this);

		if (e.isDefaultPrevented()) {

			alert('Please fill out the contact form');

		} else {

			jQuery('#loader').fadeIn();

			jQuery.ajax({
				url: jQuery(this).attr('action'),
				method: 'post',
				data: jQuery(this).serialize()
			}).done(function(ret){

				jQuery('#loader').fadeOut();

				if( ret == "Message sent!" ) {

					theForm.find('.response.success').fadeIn();

				} else {

					theForm.find('.response.error').fadeIn();

				}

				setTimeout(function(){ theForm.find('.response').fadeOut() }, 7000)

			})

		}

		return false;

	});
	
})
ymaps.ready(function () {

	var myMap = new ymaps.Map('map', {center: [52.858248, 27.701393],zoom: 6,behaviors: ['default', 'scrollZoom'],controls: []}),
    clusterer = new ymaps.Clusterer({preset: 'islands#invertedRedClusterIcons',groupByCoordinates: false,clusterDisableClickZoom: true,clusterHideIconOnBalloonOpen: false, geoObjectHideIconOnBalloonOpen: false });
	clusterer.options.set({gridSize: 90,clusterDisableClickZoom: false});
	var placemark = [];
	

	function generateMap(e) {
		$('.maps-row').each(function () {
			var $ticket = $(this);
			var id = $ticket.data('id');
			var coords = $ticket.data('coords').split(',');
			var title = $ticket.data('title');
			var name = $ticket.data('name');
			var adress = $ticket.data('adress');
			placemark[id] = new ymaps.Placemark(coords, {balloonContentHeader: title,balloonContent: name,balloonContentFooter: adress}, {preset: 'islands#redIcon'});
			clusterer.add(placemark[id]);
		});
 		
		$('.maps-row').click(function(){
			var coords = $(this).data('coords').split(',');

			myMap.setCenter(coords, 18, {
				checkZoomRange: true
			});
		});
	}
	
	generateMap();
	
	$('#mse2_results').bind("DOMSubtreeModified",function(){
		clusterer.removeAll();
		generateMap();
		myMap.setBounds(clusterer.getBounds(), {
			checkZoomRange: true
		});
        $(document).ready(function() {
            $('.js-example-basic-single').select2();
        });
	});
	
	myMap.geoObjects.add(clusterer);

	clusterer.events;
	
		myMap.setBounds(clusterer.getBounds(), {
			checkZoomRange: true
		});
		
	});
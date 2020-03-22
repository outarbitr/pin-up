if (0) {
    // $(document).on('msoptionsprice_product_action', function (e, action, form, r) {
    //     if (action == 'modification/get' && r.success && r.data) {
    //         var m = r.data.modification || {};
    
    //         var thumbs = m.thumbs || {medium:['default.png']};
    //         var $wrapper = $(form).closest(msOptionsPrice.Product.parent).find('.fotorama');
    //         var fotorama = $(form).closest(msOptionsPrice.Product.parent).find('.fotorama').data('fotorama');
    
    //         if (fotorama) {
    //             var images = [];
    //             (thumbs.medium || []).filter(function (href) {
    //                 images.push({img: href, caption: ''})
    //             });
                
    //             fotorama.load(images);
    //         }
    //     }
    // });
} else {
    window['productSliderIndex'] = 0;
    window['productSlider'] = undefined;
    window['productSliderReload'] = function ($el, thumbs) {
        var html = '';
        $el.html('');
        (thumbs || []).filter(function (url) {
            html += '<div data-thumb="'+url+'" class="item"><a href="'+url+'" data-fancybox="gallery"><img src="'+url+'" title="" alt=""></a></div>';
        });
        $el.append(html);
        
        if (typeof(window['productSlider']) != 'undefined' && typeof(window['productSlider']['owlCarousel']) != 'undefined') {
            // window['productSlider'].trigger('change.owl.carousel', {
            //     startPosition: window['productSliderIndex'],
            // });
            window['productSlider'].trigger('destroy.owl.carousel');
        }
        
        window['productSlider'] = $el.addClass('owl-carousel').owlCarousel({
            startPosition: window['productSliderIndex'],
            items: 1,
            margin: 0,
            
            loop: false,
            nav: false,
            dots: true,
            
            thumbs: true,
            thumbImage: true,
            thumbContainerClass: 'owl-thumbs',
            thumbItemClass: 'owl-thumb-item',
            
            onTranslate: function (e) {
                var index = parseInt(e.page['index']);
                index = (index < 0) ? 0 : index;
                window['productSliderIndex'] = index;
            },
        });
    };
    
    $(document).on('msoptionsprice_product_action', function (e, action, form, r) {
        if (action == 'modification/get' && r['success'] && r['data']) {
            var m = r.data['modification'] || {};
            var thumbs = m['thumbs'] || {
                main: ['default.png'],
            };
            var $wrapper = $(form).closest(msOptionsPrice.Product['parent']).find('.js-gallery-wrap');
            var $gallery = $wrapper.find('.js-gallery');
            // console.log('$gallery', $gallery);
            
            // window.productSliderReload($gallery, thumbs['medium']);
            
            //
            $(document).ready(function() {
                window.productSliderReload($gallery, thumbs['main']);
            });
        }
    });
}
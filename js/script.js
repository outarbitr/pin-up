$('.main__slider').owlCarousel({
    thumbs:false,
    loop:true,
    margin:0,
    nav:true,
	items:1,
	autoplay:true,
    autoplayTimeout:4000,
    autoplayHoverPause:true
})

jQuery(document).ready(function() {
	/*прячем дубли хлебных крошек*/
	
	$( ".breadcrumb li" ).each(function() {if ($(this).text()==$(this).next().text()) $(this).remove();});
	/*делаем не активной 4-ую ссылку хлебных крошек в каталоге
	
	if (location.href.split('/')[3]=='catalog') { 
	
		$('.breadcrumb li:nth-child(4) a').addClass('disabled');
		$('.megacat').addClass('active'); 
	}; */
	
	
	/*сортировка продукта на первое место, если отмечено в опции "показывать на первой позиции"*/
	$(".sort-first").each(function(){
    $(this).prependTo($(this).parent());
	});
	
	/*Селектор в меню "Контакты" - "Интернет магазины"  */
	function changeCountry() {
		$('#menu1 div.purchase-internet').hide(); 
		var ide=$( "#menu1 select option:selected" ).val(); 
		$( "#"+ide+".purchase-internet" ).each(function() { $( this ).show(); });
	}
		
	changeCountry();

	
	$('#country').on('change', function() {
		changeCountry();
	});
	
	/*конец changeCountry*/
	
	/*Селектор в меню "Контакты" - "Торговые точки"  */	
	function filterCity(){
      var province = $("#outlets-country").find('option:selected').val(); // stores outlets-country
      $("#option-container").children().appendTo("#city"); // moves <option> contained in #option-container back to their <select>
      
	  var toMove = $("#city").children("[data-province!='"+province+"']"); // selects city elements to move out
      toMove.appendTo("#option-container"); // moves city elements in #option-container
	  var all = $("#option-container").find("[data-province=all]");
	  all.prependTo("#city"); //move option select all to the first position
	  $("#city").find("[data-province=all]").attr("selected",true);
	  $("#city").val('all');
	};

	filterCity();

	$('#outlets-country').on('change', function() {
		filterCity();
		changeShop();
	});
	
	$('.store').each(function(){
	var datacity = $(this).attr('data-city'); 
	$(this).prependTo($('div.cities [data-group="'+datacity+'"]'))
	});


	//двойной селектор страна/город
	
	function changeShop() {
	//проверяем выбраны все города или один конкретный
		if ($("#city option:selected").val()=='all'){
	//прячем все
			$('#home div.store').hide(); 
			$('#home h3.cities-header').hide();
			$('.cities-scroll').hide(); 
	//показываем выбранную опцию ids страны (все города)
			var ids=$( "#home #outlets-country option:selected" ).val(); 
			$( "#"+ids+".store" ).each(function() { $( this ).show();});
			$('.cities [data-province='+ids+']').each(function() { $( this ).show(); });
			$('.cities [data-group-province='+ids+']').each(function() { $( this ).show(); });
		} else {
	//прячем все
			$('#home div.store').hide();
			$('#home h3.cities-header').hide();	
			$('.cities-scroll').hide();
	// показываем конкретную страну в опции ids
			var ids=$( "#home #city option:selected" ).val();
			$('[data-city="'+ids+'"].store').each(function() { $( this ).show(); });
			$('[data-city="'+ids+'"].cities-header').show();
			$('[data-group="'+ids+'"]').show();
		}

	}
	
	changeShop();
	
	$('#city').on('change', function() {
		changeShop();
	});	
	/*конец filterCity*/
	
	
	
	if ($(window).width() > '992'){
		$('.bxslider-index').bxSlider({      
			captions: true,
			autoControls: true,
			auto: true
		  });
	}
	if ($(window).width() < '992'){
		$('.bxslider-index').bxSlider({      
			captions: true,
			autoControls: true,
			auto: true,
			controls: false
		  });
	}
   

    if ($(".card-slider li").length > 1){
    	$('.card-slider').bxSlider({
	    	captions: true,
	    	autoControls: true,
	     	auto: true
	    });
    }

    setTimeout(function() {
	   if ($('.insta-item').length > 3) {
	    	$('.owl-carousel').owlCarousel({
			    thumbs:false,
			    nav: true,
			    loop: true,
			    responsive:{
			        0:{
						items:1,
						margin:10,
						stagePadding: 50
			        },
			        767:{
						margin:20,
			            items:4
			        },
			        992: {
						margin:20,
			        	items:4	
			        }
			    }
			});
    	} else {
    	$('.owl-carousel').owlCarousel({
			    thumbs:false,
			    nav: false,
			    loop: false,
			    responsive:{
			        0:{
						margin:10,
						items:1,
						stagePadding: 50
			        },
			        767:{
						margin:10,
			            items:4
			        },
			        992: {
						margin:10,
			        	items:4	
			        }
			    }
			});
    	}

	 //    if ($('.owl-item').length > 3) {
		// 	$('.owl-nav').css('display', 'block');
		// }	else{
		// 	$('.owl-nav').css('display', 'none');
		// }
	}, 100);

 
	$( 'a.video' ).fancybox({
	  type: 'iframe'
	});

	 $("a.inst").fancybox({
	   showNavArrows: true
	});

	$('.cooperation-block__header').click(function() {
		$(this).parent('.cooperation-block').toggleClass('open');
	});

	$('.nav-mobile__icon').click(function() {
		$(this).siblings('.nav-mobile-list').toggleClass('open');
		$('.overlay-dark').toggleClass('show');
	});

	$('.overlay-dark').click(function() {
		$('.nav-mobile__icon').siblings('.nav-mobile-list').removeClass('open');
		$(this).removeClass('show');

	});



	if ($(window).width() < '768'){
		$('.catalog-item').matchHeight(true);
	} else {
		$('.catalog-item').matchHeight(false);
	}

	$('.popup-gallery a img').matchHeight('500');

	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'			
		}
	});

function fixed() {
	var $window = $(window),  
    	$target = $("nav.menu.menu_fixed"), 
    	$h = $target.offset().top,
    	$menu = $('nav.menu.menu_fixed');

  $window.on('scroll', function() {
    if (($(this).scrollTop()) > $h) {
       $menu.addClass("fixed");
    } else {     
    $menu.removeClass("fixed");
    }
  });
}

function scrollFixed() {
	var top = $(".menu_fixed").offset().top;
	setTimeout(function() {
		if (top > 440) {
			$(".menu_fixed").addClass('fixed')
		}
	}, 100);
}
 // Following cart button

$('.menu-block>li>a').click(function(event) {
	$('.dropdown').addClass('hide');

	setTimeout(function() {
		$('.dropdown.hide').removeClass('hide')
	}, 100);
});

if ($('.menu_fixed').length) {
	fixed();
	scrollFixed();
}
$('.card-select select').wSelect();

function listing() {
	$('.goods-items').each(function() {
		if(($(this).children('.goods-item').length)<4){
			$(this).css('justify-content', 'start');
		}
	});
}
listing();

/*var s = $('.submenu .dropdown').css('display', 'block');
if(s) {
    $('main').addClass('hover');
}
*/

if ($("#goods-pager .item").length > 3) {
	$('#goods-pager').owlCarousel({
	    thumbs:false,
	    loop:false,
	    margin:10,
	    nav:true,
	    mouseDrag: false,
	    responsive:{
	        0:{
	            items:4,
	        },
	        767:{
	            items:3
	        },
	        992:{
	            items:4
	        }
	    }
	})
} else {
	$('#goods-pager').owlCarousel({
	    thumbs:false,
	    loop:false,
	    margin:10,
	    nav:true,
	    mouseDrag: false,
	    responsive:{
	        0:{
	            items:4,
	        },
	        767:{
	            items:3
	        },
	        992:{
	            items:4
	        }
	    }
	})
}





$("	.wSelect-img").empty()
	$('.goods').each(function() {
		var child = $(this).children('.goods-items').children('.goods-item').length;
		if(child > 5) {
			var reverse = $(this).children('.goods-items').children('.goods-item').get().reverse();
			$(reverse).each(function(index, el) {
				if(index > 4) {
					$(el).css('border-bottom', '1px solid #e1e1e1');
				}
			});
		}
			

	});
		

	var goodsSlider = $('.goods-slider').bxSlider({
		pagerCustom: '#goods-pager',
		useCSS:false,
		adaptiveHeight: true,
		mode: 'fade',
		speed: 1,
		touchEnabled: false,
		oneToOneTouch: false,
		preventDefaultSwipeX: false,
	});

	
	$( ".block-descript" ).accordion({
		collapsible: true,
		animate: 0
 	});



	$('.menu__item:first-child a').click(function(event) {
		$(this).parents('ul').toggleClass('open');
		return false;
	});


	if($('section').hasClass('caption')){	
		$('div').removeClass('margin');
	}
	

	// $('.cities-scroll').mCustomScrollbar();
	// data-city
    (function($){
        $(window).on("load",function(){
			function changeCountry(){
				var selectCountry = $('#outlets-country').val();
					selectCity = $('#city').val();
					$('.cities .store').hide();
					$('.cities .store[data-country='+ selectCountry +']:lt(10)').show();
			}

			function changeCity(){
				var selectCity = $('#city').val();
					
				if(selectCity !== 'all') {
					$('.cities .store').hide();
					$('.cities .store[data-city='+ selectCity +']:lt(10)').show();
				} else {
					var selectCountry = $('#outlets-country').val();
					$('.cities .store').hide();
					$('.cities .store[data-country='+ selectCountry +']:lt(10)').show();
				}
			}

			changeCountry();

			$('#outlets-country').change(function(){
				changeCountry();
			})

			$('#city').change(function(){
				changeCity();
			})

			$(".cities").mCustomScrollbar({
				scrollInertia: 100,
				callbacks:{
					onTotalScroll:function(){
						var selectCountry = $('#outlets-country').val();
							selectCity = $('#city').val();

						if(selectCity !== 'all'){
							var visibleStore = $('.cities .store:visible').length;
								openStore = $('.cities .store[data-country='+ selectCountry +'][data-city='+ selectCity +']:gt('+ visibleStore +'):lt(10)');
							$(openStore).show();
						} else {
							var visibleStore = $('.cities .store:visible').length;
								openStore = $('.cities .store[data-country='+ selectCountry +']:gt('+ visibleStore +'):lt(10)');
							$(openStore).show();
						}
					}
				}
			});
			
        });
    })(jQuery);


		
	$('.masory__grid').masonry({
  // options...
  itemSelector: '.news_item',
  columnWidth: 200
});

Share = {
	vkontakte: function(purl, ptitle, pimg, text) {
		url  = 'http://vk.com/share.php?';
		url += 'url='          + encodeURIComponent(purl);
		url += '&title='       + encodeURIComponent(ptitle);
		url += '&description=' + encodeURIComponent(text);
		url += '&image='       + encodeURIComponent(pimg);
		url += '&noparse=true';
		Share.popup(url);
	},
	facebook: function(purl, ptitle, pimg, text) {
		url  = 'http://www.facebook.com/sharer.php?s=100';
		url += '&p[title]='     + encodeURIComponent(ptitle);
		url += '&p[summary]='   + encodeURIComponent(text);
		url += '&p[url]='       + encodeURIComponent(purl);
		url += '&p[images][0]=' + encodeURIComponent(pimg);
		Share.popup(url);
	},
	twitter: function(purl, ptitle) {
		url  = 'http://twitter.com/share?';
		url += 'text='      + encodeURIComponent(ptitle);
		url += '&url='      + encodeURIComponent(purl);
		url += '&counturl=' + encodeURIComponent(purl);
		Share.popup(url);
	},

	popup: function(url) {
		window.open(url,'','toolbar=0,status=0,width=626,height=436');
	}
};

$(".article-content__text").each(function(){
    var contentSel = $(this).children('p');
    var contentBlock  = $(contentSel).html();
    var content = contentBlock;

    content = content.substring(0, 90);
    $(contentSel).html( content + '...' );
});
/*экшен галереи карточки*/

/*перенумеровка slide-индексов в галерее карточки*/
$('#goods-pager a').each(function(index){$(this).attr('data-slide-index',index);} );

$('#goods-pager .goods-minislider li').hide();
	
$('.card-icons li:first-child a span').addClass('checked');
$('.card-result div:first-child').show();
$('.card-result div:nth-child(2)').show();
$('.card-select option:first-child').attr('selected', true);

var data = $('.card-icons li:first-child a span').attr('data-slide-checked');
var mazok = false;
$('#goods-pager .goods-minislider').find("[data-slide-name='"+data+"']").show();
if ($('.owl-item:nth-child(2)').find("[data-slide-name='"+data+"']").length >=1) {
			$('.owl-item:nth-child(2)').show();
			//console.log("show2:"+data);
			} else {
			$('.owl-item:nth-child(2) .goods-minislider').parent().hide();
			//console.log(data);
			}

	function checkLogoColor(data) {
		$('.card-icons li a span').each(function(){
			$(this).removeClass('checked');
			}); 

		$('.card-icons').find('[data-slide-checked="'+data+'"]').addClass('checked'); 

	}
	function changeSelector(data) {
		if (data != null) {

		$('.card-select option').removeAttr('selected').filter('[value="'+data+'"]').attr('selected', true);
		$('.wSelect-el').val(data).wSelect('change');
		$(".card-select option:selected").change();	
		} else {
			checkLogoColor(data);
		};
	}
	function changeSlide(data) {
	if (data != null) {
	if (mazok) { 
			var slideNum=$("#goods-pager .mazoks").find("[data-slide-name='"+data+"']").attr("data-slide-index");
		} else {
			var slideNum=$("#goods-pager .items").find("[data-slide-name='"+data+"']").attr("data-slide-index");
	}

// смена мазка на мобильной
		$('.card-result').children('div').each(function(){
			$(this).hide();
			}); 
		$('.card-result ').find("[data-mazok-img='"+data+"']").show();
		$('.card-result ').find("[data-mazok-name='"+data+"']").show();		
//		
		$('#goods-pager .goods-minislider li').hide();
		$('#goods-pager .goods-minislider').find("[data-slide-name='"+data+"']").show();
		if ($('#goods-pager .owl-item:nth-child(2)').find("[data-slide-name='"+data+"']").length >=1) {
			$('#goods-pager .owl-item:nth-child(2)').show();
			
			} else {
			$('#goods-pager .owl-item:nth-child(2)').hide();

			}		
	};
	}
	
/*смена слайда и селектора при нажатии на лого цвета*/

$('.card-icons li a').click(function($e) {
	$e.preventDefault();
	data=$(this).attr('data-slide-destination'); 
	if (!($("#goods-pager .mazoks").find("[data-slide-name='"+data+"']").attr("data-slide-index"))) {	mazok=false;}
	changeSelector(data);
	}); 
/*смена отметки на логотипе с цветом и селектора при нажатии на номер слайда в галерее*/
$('#goods-pager a').on('click', function($e) {
	$e.preventDefault();
	data=$(this).attr('data-slide-name'); 
	changeSelector(data);
});
$('.wSelect-option').on('click', function($e) {
	$e.preventDefault();
	data=$(this).text();
	if (!($("#goods-pager .mazoks").find("[data-slide-name='"+data+"']").attr("data-slide-index"))) {	mazok=false;}
	changeSelector(data);
	});
//экшен на клик по первой мини-картинке слайдера
$('#goods-pager .goods-minislider li').on('click', function($e) {
	$e.preventDefault();
	data=$(this).attr('data-slide-name');
	mazok=$(this).attr('data-slide-mazok');
//	console.log("mazok1: "+data);
	changeSelector(data);
	});
/*смена слайда и отметки на логотипе с цветом при выборе селектора*/
$('.card-select select').on('change', function($data) {
	data=$(this).val();
	checkLogoColor(data);
	changeSlide(data);
	$('.card-select option').removeAttr('selected').filter('[value="'+data+'"]').attr('selected', true);
	$('.wSelect-options-holder').hide();
	$('.wSelect').removeClass('wSelect-active');
	$('.wSelect').removeClass('wSelect-hover');
//	mazok=false;
	});	
	
/*сортировка разводящей*/
$sortobj = $('.catalog div.row');
$sortobj.find('.catalog__item').sort(function(a, b) {
	return +a.dataset.sortindex - +b.dataset.sortindex;
	}).appendTo($sortobj);
});

$('.bx-wrapper .bx-prev').click(function() {
	$(this).css(' background-color', '#333');
});
$('.wSelect-option.wSelect-option-selected').click(function() {
	$(".wSelect-img").empty()
});

$('.submenu').hover(function() {
	$('.overlay-dark').css('z-index', '50');
	$('.overlay-dark').css('opacity', '1');
}, function() {
	$('.overlay-dark').css('z-index', '-1000');
	$('.overlay-dark').css('opacity', '0');
});

if ($('.seo-text p').length > 0) {
	$('.seo-wrapper').css('display', 'block');
} else {
	$('.seo-wrapper').css('display', 'none');
}

$('.insta-item a, a.inst, .fancybox-arrow').click(function() {
	setTimeout(function() {
		if ($('.fancybox-stage .l-item .w-item').length < 2) {
			$('.fancybox-stage .l-item .w-item').addClass('one_item');
		}
	}, 100);
});
	
$(document).ready(function(){
		$('a[href^="#"]:not([data-toggle="tab"])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			  var target = $(this.hash);
			  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			  headerHeight = $('.header').height() + 10;  
			  if (target.length) {
				$('html,body').animate({
				  scrollTop: target.offset().top - headerHeight
				}, 500, function() {
				  target.focus();
				});
				return false;
			  }
			 }
		   });
});


$(document).ready(function() {
	$('body').css('opacity', '1');
});

if ($('.goods-minislider li').length < 1) {
	$('.goods-minislider').remove();
}


// выбор цвета СКУ, если установлен по умолчанию
$(document).ready(function() {

    if ($('.card-icons').length) {
        $( ".card-icons a" ).each(function() {
            if ($(this).attr('data-show-by-default')) {
                $(this).trigger('click');
            }
        });
    }

});

if ($(window).width() < '768'){
    $('.header_pc').remove();
} else {
	$('.header_mobil').remove();
}


$(document).ready(function(){
	$("#skrollp").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).offset().top - 0;
		$('body,html').animate({scrollTop: top}, 1000);
	});
});

$(document).ready(function(){
	$("#skrollplink").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).offset().top - 200;
		$('body,html').animate({scrollTop: top}, 1000);
	});
});
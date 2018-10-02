$(window).on('load', function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('body').addClass('ios');
	};
	$('body').removeClass('loaded'); 
});

$(function(){

	/* ---------------------------------------------- /*
	 * Fixed footer
	/* ---------------------------------------------- */

	// var hf = function(){
	// 	var h_footer = $('footer').height();
	// 	$('.content').css({
	// 		'paddingBottom': h_footer
	// 	});

	// }

	// $(window).on('load resize', hf);

	/* ---------------------------------------------- /*
	 * Fixed header
	/* ---------------------------------------------- */

	var bindHeaderScrollTrigger = function() {
		var headerScrollPoint = $('.header-scroll-marker').offset().top;
		var header = $(".header");

		header.removeClass("fixed");

		$(window).on('scroll load', function(){
			if ($(this).scrollTop() > headerScrollPoint) {
				header.addClass("fixed");
			} else {
				header.removeClass("fixed");
			};
		});
	}

	bindHeaderScrollTrigger();
	

	/* ---------------------------------------------- /*
	 * Multiselect
	/* ---------------------------------------------- */
	if($('#m-sex').length){
		$('#m-sex').multiselect({
			columns: 1,
			minHeight: null,
			placeholder: 'Для всех',
			minSelect: 2, 
			maxSelect: 10,

		});
	};

	if($('#m-category').length){
		$('#m-category').multiselect({
			columns: 1,
			minHeight: null,
			placeholder: 'Все категории',
			minSelect: 2, 
			maxSelect: 10,
		});
	};

	if($('#m-designer').length){
		$('#m-designer').multiselect({
			columns: 1,
			minHeight: null,
			placeholder: 'Все бренды',
			search: true,
			searchValue: true,
			minSelect: 2, 
			
			optionAttributes: ['data-count'],
			searchOptions: {
			    'default': 'Напечатайте имя дизайнера'
			},
			onLoad: function( element, option ){

				$('.ms-options').append('<button type="button" class="acept">Применить</button>');
				
			},

		});
	};


	/* ---------------------------------------------- /*
	 * Play video
	/* ---------------------------------------------- */
	
	// $('.inread-video__play').on('click', function(){
	// 	var dataYoutubeLink = $(this).parents('.js-video').attr('data-youtube-link');
	// 	$(this).parents('.js-video').html('<iframe class="video-frame" src="https://www.youtube.com/embed/'+ dataYoutubeLink +'?autoplay=1" allowfullscreen></iframe>');
	// 	$('.js-video').addClass('active');
	// });

	var headerBottom = $('.header-bottom'),
		searchModal = $('.search-modal'),
		overlay = $('.overlay'),
		navS = $('.nav-s'),
		html = $('html'),
		body = $('body'),
		burger = $('.burger');

	function showSlideMenu (trigger) {
		hideSearch()

		trigger.addClass('active')
		navS.addClass('open');
		html.addClass('html-lock html-margin');
		body.addClass('b-overlay');
	}

	function hideSlideMenu(trigger) {
		trigger.removeClass('active')
		navS.removeClass('open');
		html.removeClass('html-lock html-margin');
		body.removeClass('b-overlay');
	}

	function showSearch() {
		hideSlideMenu(burger);

		headerBottom.addClass('is-active');
		searchModal.addClass('_open');
		overlay.addClass('active');
		overlay.addClass('is-search');
		body.addClass('b-overlay');		
	}

	function hideSearch() {
		headerBottom.removeClass('is-active');
		searchModal.removeClass('_open');
		overlay.removeClass('active');
		overlay.removeClass('is-search');
		body.removeClass('b-overlay');
	}

	/* ---------------------------------------------- /*
	 * Open Filter
	/* ---------------------------------------------- */
	$('.js-open-filter-full').on('click', function(){
		$(this).toggleClass('active')
		$('.box-filter-body').slideToggle();
		return false;
	});

	/* ---------------------------------------------- /*
	 * Open Search
	/* ---------------------------------------------- */
	$('.js-open-search').on('click', function() {
		var searchModal = $('.search-modal');

		if (searchModal.hasClass('_open')) {
			hideSearch();
		} else {
			showSearch();
		}
	});

	$('.search-close').on('click', function() {
		hideSearch();
	});

	/* ---------------------------------------------- /*
	 * Open and close Sidebar
	/* ---------------------------------------------- */
	burger.on('click', function() {
		if (burger.hasClass('active')) {
			hideSlideMenu(burger);
		} else {
			showSlideMenu(burger);
		}
	});

	$('.nav-s-close').on('click', function(){
		hideSlideMenu(burger);
	});

	overlay.on('click', function(){
		hideSlideMenu(burger);
		hideSearch();
	});

	/* ---------------------------------------------- /*
	 * jScrollPane
	/* ---------------------------------------------- */
	
	// if($('.scroll-pane').length){
	// 	$(".scroll-pane").niceScroll({
	// 		cursorcolor: '#000',
	// 		cursorborder: '1px solid #000',
	// 		horizrailenabled: false,
	// 		enableobserver: true,
	// 	}); 
	// };

	/* ---------------------------------------------- /*
	 * Styler
	/* ---------------------------------------------- */
    if($('.styler').length){
        $('.styler').styler();
	};
	
	/* ---------------------------------------------- /*
	 * Article Slider
	/* ---------------------------------------------- */

	var articleCarouselCounterHandler = function(slick, counter) {
		var current = counter.find('.current');
		var total = counter.find('.total');

		current.html(slick.currentSlide + 1);
		total.html(slick.slideCount);
	}

	var articleCarouselInit = function() {
		var carouselContainer = $('.article-carousel__items');

		carouselContainer.each(function(index, carousel) {
			var $carousel = $(carousel);
			var counter = $carousel.parents('.article-carousel').find('.article-carousel__counter');
			var settings = {
				slidesToScroll: 1,
				slidesToShow: 1,
				arrows: true,
				dots: false,
				prevArrow: '<button class="article-carousel__nav article-carousel__nav--left"></button>',
				nextArrow: '<button class="article-carousel__nav article-carousel__nav--right"></button>',
			};

			$carousel.on('init', function(event, slick) {
				articleCarouselCounterHandler(slick, counter);
			});

			$carousel.on('afterChange', function(event, slick, currentSlide) {
				articleCarouselCounterHandler(slick, counter);
			});

			$carousel.slick(settings);
		})
	}

	articleCarouselInit();

	/* ---------------------------------------------- /*
	 * Subcategory expand handler
	/* ---------------------------------------------- */

	var subcatExpnadHandler = function(trigger) {
		var expandTrigger = $(trigger);

		if (expandTrigger.length) {
			expandTrigger.on('click', function(event) {
				event.preventDefault();
				var $this = $(this);
				var subcategory = $this.siblings('ul');

				if (subcategory.length) {
					subcategory.slideToggle(300, function() {
						$this.toggleClass('_opened');
						subcategory.toggleClass('_opened');
					});
				}
			})
		}
	}

	subcatExpnadHandler('._has-children');

    /* ---------------------------------------------- /*
	 * Best Slider
	/* ---------------------------------------------- */
    if($('.best-slider').length){
        $('.best-slider').slick({
        	slidesToShow: 4,
        	slidesToScroll: 1,
        	infinite: false,
        	prevArrow: '<button class="slick-arrow slick-prev"><span class="icon-left-arrow"></span></button>',
        	nextArrow: '<button class="slick-arrow slick-next"><span class="icon-right-arrow"></span></button>',
       		responsive: [
       			{
       				breakpoint: 1024,
       				settings: {
       					slidesToShow: 3,
       				}
       			},
       			{
       				breakpoint: 767,
       				settings: {
       					slidesToShow: 2,
       				}
       			},
       			{
       				breakpoint: 560,
       				settings: {
       					slidesToShow: 1,
       				}
       			},
       		]
        });
    };

    /* ---------------------------------------------- /*
	 * Popular Slider
	/* ---------------------------------------------- */
    if($('.popular-slider').length){


	    $slick_slider = $('.popular-slider');
		settings = {
			slidesToScroll: 1,
			variableWidth: true,
			arrows: false,
			dots: true,
			slidesToShow: 3,
			responsive: [
	        	{
		            breakpoint: 9999,
		            settings: "unslick"
		        },
		        {
		            breakpoint: 1025,
		            settings: "slick",

		        },
	        ]
			
		}
		$slick_slider.slick(settings);

		
	};
  



	/* ---------------------------------------------- /*
	 * Popup Slider
	/* ---------------------------------------------- */
    if($('.popup-slider').length){
        $('.popup-slider').slick({
        	slidesToShow: 1,
        	slidesToScroll: 1,
        	infinite: false,
        	adaptiveHeight: true,
        	prevArrow: '<button class="slick-arrow slick-prev"><span class="icon-left-arrow"></span></button>',
        	nextArrow: '<button class="slick-arrow slick-next"><span class="icon-right-arrow"></span></button>',
       		responsive: [
       			{
       				breakpoint: 1024,
       				settings: {
       					arrows: false,
       					dots: true
       				}
       			}
       		]
        });
    };

    /* ---------------------------------------------- /*
	 * Popup open and close
	/* ---------------------------------------------- */
    $('.popup-open').on('click', function(){
		$('.product-popup').show();
		$('html').addClass('html-lock html-margin');
		$('.popup-slider').slick('setPosition');
		return false;
	});

	 $('.popup-close').on('click', function(){
		$('.product-popup').hide();
		$('html').removeClass('html-lock html-margin');
		return false;
		
	});

	/* ---------------------------------------------- /*
	 * Open full block
	/* ---------------------------------------------- */

	 $('.js-all').on('click', function(event){
	 	event.preventDefault();
	 	namebl = $(this).html();

	 	$(this).parents('.box-all').find('.js-short').toggleClass('hide');
	 	$(this).parents('.box-all').find('.js-full').toggleClass('hide');
		if(namebl == 'Показать'){
			$(this).html('Скрыть');
		} else {
			$(this).html('Показать');
		}
	});

	/* ---------------------------------------------- /*
	 * Anchor
	/* ---------------------------------------------- */

	$('a[data-target^="anchor"]').bind('click.smoothscroll',function () {
		var target = $(this).attr('href'),
            bl_top = $(target).offset().top - 100;
		$('body,html').animate({scrollTop: bl_top}, 900);
		return false;
	});

	/* ---------------------------------------------- /*
	 * Плавающий блок, замирающий над футером 
	 * или другим элементом
	/* ---------------------------------------------- */

	if($('.fixed-bl').length ){
		(function(){
			var a = document.querySelector('.fixed-bl'), b = null, P = 40;  // если ноль заменить на число, то блок будет прилипать до того, как верхний край окна браузера дойдёт до верхнего края элемента. Может быть отрицательным числом
			window.addEventListener('scroll', Ascroll, false);
			document.body.addEventListener('scroll', Ascroll, false);
			function Ascroll() {
			  if (b == null ) {
			    var Sa = getComputedStyle(a, ''), s = '';
			    for (var i = 0; i < Sa.length; i++) {
			      if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
			        s += Sa[i] + ': ' +Sa.getPropertyValue(Sa[i]) + '; '
			      }
			    }
			    b = document.createElement('div');
			    b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
			    a.insertBefore(b, a.firstChild);
			    var l = a.childNodes.length;
			    for (var i = 1; i < l; i++) {
			      b.appendChild(a.childNodes[1]);
			    }
			    a.style.height = b.getBoundingClientRect().height + 'px';
			    a.style.padding = '0';
			    a.style.border = '0';
			  }
			  var Ra = a.getBoundingClientRect(),
			      R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('.fixed-end').getBoundingClientRect().top + 0);  // селектор блока, при достижении верхнего края которого нужно открепить прилипающий элемент;  Math.round() только для IE; если ноль заменить на число, то блок будет прилипать до того, как нижний край элемента дойдёт до футера
			  if ((Ra.top - P) <= 0) {
			    if ((Ra.top - P) <= R) {
			      b.className = 'stop';
			      b.style.top = - R +'px';
			    } else {
			      b.className = 'sticky';
			      b.style.top = P + 'px';
			    }
			  } else {
			    b.className = '';
			    b.style.top = '';
			  }
			  window.addEventListener('resize', function() {
			    a.children[0].style.width = getComputedStyle(a, '').width
			  }, false);
			}
		})()
	}

	Array.prototype.slice.call(document.querySelectorAll('.wrap-sidebar .adv-banner')).forEach(function(a) {  // селекторы блоков, которые будут фиксироваться. Может быть как один блок, так два и более
	var b = null, P = 90;

window.addEventListener('scroll', Ascroll, false);
document.body.addEventListener('scroll', Ascroll, false);
function Ascroll() {
  if (b == null) {
    var Sa = getComputedStyle(a, ''), s = '';
    for (var i = 0; i < Sa.length; i++) {
      if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
        s += Sa[i] + ': ' +Sa.getPropertyValue(Sa[i]) + '; '
      }
    }
    b = document.createElement('div');
    b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
    a.insertBefore(b, a.firstChild);
    var l = a.childNodes.length;
    for (var i = 1; i < l; i++) {
      b.appendChild(a.childNodes[1]);
    }
    a.style.height = b.getBoundingClientRect().height + 'px';
    a.style.padding = '0';
    a.style.border = '0';
  }
  var Ra = a.getBoundingClientRect(),
      R = Math.round(Ra.top + b.getBoundingClientRect().height - a.parentNode.getBoundingClientRect().bottom + parseFloat(getComputedStyle(a.parentNode, '').paddingBottom.slice(0, -2)));
  if ((Ra.top - P) <= 0) {
    if ((Ra.top - P) <= R) {
      b.className = 'stop';
      b.style.top = - R +'px';
    } else {
      b.className = 'sticky';
      b.style.top = P + 'px';
    }
  } else {
    b.className = '';
    b.style.top = '';
  }
  window.addEventListener('resize', function() {
    a.children[0].style.width = getComputedStyle(a, '').width
  }, false);
}
})

});

/* ---------------------------------------------- /*
 * Play video on Scroll
/* ---------------------------------------------- */ 

var playingVideo = false;
var done = false;
var iterator = 0;
var pausedVideo = "";

function fnIsAppleMobile()
{
    if (navigator && navigator.userAgent && navigator.userAgent != null)
    {
        var strUserAgent = navigator.userAgent.toLowerCase();
        var arrMatches = strUserAgent.match(/(iphone|ipod|ipad|android)/);
        if (arrMatches != null)
             return true;
    } // End if (navigator && navigator.userAgent)

    return false;
} // End Function fnIsAppleMobile


window.onYouTubeIframeAPIReady = function() {
    $('.youtube-video').each(function(){
        var getYtID = $(this).data('video-id');
        var getHeight = $(this).data('video-height');
        var getAutoPlay = $(this).data('video-autoplay');
        if(!getHeight || getHeight % 1 !== 0 || getHeight < 200 ){
            getHeight =  "390";
        }

        iterator++;
        $(this).attr('id', 'player'+iterator);
        players.push(createPlayer({
            id: 'player'+iterator,
            height: getHeight,
            width: '100%',
            videoId: getYtID,

            events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
            }
        }));

    });
    if(players.length === $('.youtube-video').length){
        // if(!fnIsAppleMobile()){
            $('.youtube-video').each(function(){
	            var that = $(this);
	            $(window).on('load scroll', function() {
	                if(isElementInViewport(that)){
	                    $('.youtube-video').each(function (i) {
	                        var getAutoPlay = $(this).data('autoplay');
	                        if($(this).attr('id') === $(that).attr('id') && $(this).attr('id') !== pausedVideo && getAutoPlay == "1"){
	                            players[i].playVideo();
	                            players[i].mute();
	                        }else{
	                            //players[i].stopVideo();
	                            // players[i].pauseVideo();
	                        }
	                    });
	                }
	            });
	        });
        // }
    }else{
        console.log("videos not loaded");
    }

}
var players = new Array();
function createPlayer(playerInfo) {
    // Uncomment to play the first video if it is already in the viewport. This is different from data-autoplay!
    
    // if(playerInfo.id.slice(-1)=='1')
    //     playerVars = { 'autoplay': 1, 'controls': 0, 'rel': 0, 'showinfo': 0, 'loop': 1, 'modestbranding': 1 };
    // else
    //     playerVars = { 'autoplay': 0, 'controls': 0, 'rel': 0, 'showinfo': 0, 'loop': 1, 'modestbranding': 1 };
    



    	playerVars = { 'autoplay': 1, 'controls': 0, 'rel': 0, 'showinfo': 0, 'loop': 1, 'modestbranding': 1, 'iv_load_policy': 3, 'playlist': playerInfo.videoId};

	    return new YT.Player(playerInfo.id, {
	        height: playerInfo.height,
	        width: playerInfo.width,
	        videoId: playerInfo.videoId,
	        playerVars,

	        events: {
	            'onReady': onPlayerReady,
	            'onStateChange': onPlayerStateChange
	            }
	    });
     
}

function onPlayerReady(event) {
    // Play/pause video's which do not auto play for seamless playback
    if(event.target.a.src.search('autoplay=0')) {
        event.target.playVideo();
        event.target.pauseVideo();
    }
}

function onPlayerStateChange(event) {
    if(event.data === 2){
        pausedVideo = event.target.a.id;
    }
    if(event.data === 1){
        pausedVideo =  "";
    }
    if (event.data == YT.PlayerState.PLAYING && !done) {
        done = true;
    }
}

function isElementInViewport(el) {
    if (typeof jQuery === "function" && el instanceof jQuery) {
    // since im using jquery
        el = el[0];
    }
    var rect = el.getBoundingClientRect();
 return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight);
}


/* ---------------------------------------------- /*
 * Map
/* ---------------------------------------------- */  
if($('#map').length){
	var marker;
	var image = 'img/icon_place.svg';

	function initGoogleMap(){
		var myLatlng = new google.maps.LatLng(55.733810, 37.664200);
		var myLatlngMarker = new google.maps.LatLng(55.733810, 37.664200);
		var map = new google.maps.Map(document.getElementById('map'), {
		    zoom: 17,
		    
		    
		   
		    
		    gestureHandling: 'cooperative',
		    center: myLatlng, 
		    styles: [
            {
	          stylers: [
	            {hue: '#ff1a00'},
	            {invert_lightness: true},
	            {saturation: -100},
	            {lightness: 33},
	            {gamma: 0.5}
	          ]
	        },
	        {
	          featureType: 'water',
	          elementType: 'geometry',
	          stylers: [
	            {color: '#2D333C'}
	          ]
	        }
            
        ]
		});
		

		google.maps.event.addDomListener(window, "resize", function() {
		    var center = map.getCenter();
		    google.maps.event.trigger(map, "resize");
		    map.setCenter(center);

		});
		google.maps.event.addDomListener(window, "resize", function() {
		    var center = map.getCenter();
		    google.maps.event.trigger(map, "resize");
		    map.setCenter(center);
		});

		
		var marker = new google.maps.Marker({
			position: myLatlngMarker,
			map: map,
			icon: image,
			animation: google.maps.Animation.DROP,
		});

	}

	google.maps.event.addDomListener(window, 'load', initGoogleMap);
}


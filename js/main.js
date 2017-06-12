"use strict";



// Variables
// ===================

var $html = $('html'),
    $document = $(document),
    $window = $(window),
    i = 0;



// Scripts initialize
// ===================

document.write('<script async defer src="//maps.googleapis.com/maps/api/js?key=AIzaSyAYjhWq7DvCwCiRKotPu9_IXQxupSQbhuo" type="text/javascript"></script>');

$(window).on('load', function () {

  // =======
  // Preloader
  // =======

  var $preloader = $('#page-preloader'),
      $spinner   = $preloader.find('.spinner');

  $spinner.fadeOut();
  $preloader.delay(500).fadeOut('slow');


  // =======
  // Google Map
  // =======
  var mapWrapper = $('#google-map'),
      latlng = new google.maps.LatLng(mapWrapper.data("x-coord"), mapWrapper.data("y-coord")),
      styles = [
        {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            { "color": "#e9e9e9" },
            { "lightness": 17 }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            { "color": "#f5f5f5" },
            { "lightness": 20 }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            { "color": "#ffffff" },
            { "lightness": 17 }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            { "color": "#ffffff" },
            { "lightness": 29 },
            { "weight": 0.2 }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            { "color": "#ffffff" },
            { "lightness": 18 }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            { "color": "#ffffff" },
            { "lightness": 16 }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            { "color": "#f5f5f5" },
            { "lightness": 21 }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            { "color": "#dedede" },
            { "lightness": 21 }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            { "visibility": "on" },
            { "color": "#ffffff" },
            { "lightness": 16 }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            { "saturation": 36 },
            { "color": "#333333" },
            { "lightness": 40 }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            { "visibility": "off" }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            { "color": "#f2f2f2" },
            { "lightness": 19 }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            { "color": "#fefefe" },
            { "lightness": 20 }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            { "color": "#fefefe" },
            { "lightness": 17 },
            { "weight": 1.2 }
        ]
    }
      ],
      myOptions = {
        scrollwheel: false,
        zoom: 14,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        styles: styles
      },
      map = new google.maps.Map(mapWrapper[0], myOptions),
      marker = new google.maps.Marker({
        position: {lat: mapWrapper.data("x-coord"), lng: mapWrapper.data("y-coord")},
        draggable: false,
        animation: false,
        map: map,
        icon: 'img/marker.png'
      }),
      infowindow = new google.maps.InfoWindow({
        content: "<div class='marker-popup'> Mr John Smith 132, My Street, Bigtown BG23 4YZ England </div>"
      });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
});


$document.ready(function () {

  function detectElement(dom) {
    return $window.height() + $window.scrollTop() >= dom.offset().top && $window.scrollTop() <= dom.outerHeight() + dom.offset().top;
  }

  // ==========
  // AJAX form
  // ==========
  var ajaxForm = $('.js-form');
  var jsForm = $('.contact-form');
  var resultPanel = $("body").append("<div class='js-result'></div>").find(".js-result");

  if (jsForm.length) {

    jsForm.each(function(){
      var $form = $(this);

      $form.ajaxForm({
        success: function(json) {
          var jsJSON = JSON.parse(json);
          resultPanel.text(jsJSON.message);

          if (jsJSON.valid) {

            resultPanel[0].classList.add("success");

            setTimeout(function () {
              resultPanel[0].classList.remove("success");
              $form.clearForm();
            }, 3000);

          } else {

            resultPanel[0].classList.add("error");

            setTimeout(function () {
              resultPanel[0].classList.remove("error");
            }, 4500);
          }
        }
      });

    });
  }


  // ==========
  // jQuery ajaxChimp
  // ==========
  var chimpForm = $('.subscription-form form');

  chimpForm.ajaxChimp({
    callback: function(){
      var panel = $('.js-result');
      setTimeout(function () {
        panel.removeClass("error").removeClass("success");
      }, 4500);
    },
    language: 'cm',
    url: '//cear-studio.us13.list-manage.com/subscribe/post?u=5c10401fe692f6eddbd86220f&amp;id=b974661486'
    //http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
  });


  $.ajaxChimp.translations.cm = {
    'submit': 'Submitting...',
    0: 'We have sent you a confirmation email',
    1: 'Please enter a value',
    2: 'An email address must contain a single @',
    3: 'The domain portion of the email address is invalid (the portion after the @: )',
    4: 'The username portion of the email address is invalid (the portion before the @: )',
    5: 'This email address looks fake or invalid. Please enter a real email address'
  };

  // ==========
  // Responsive Nav
  // ==========
  var responsiveNav = new Navigation({
    initClass: "nav",
    mobileClass: "nav-mobile",
    desktopClass: "nav-desktop",
    checkHeight: false,
    stuck: true,
    stuckOffset: 1,
    onePage: true,
    onePageOffset: 100
  });

  // =======
  // Burger Menu
  // =======

  var burger = document.getElementById("burger-button");

  burger.addEventListener("click", function(e) {
    e.preventDefault();
    document.body.classList.toggle("open");
    burger.classList.toggle("open");
  });

  // ==========
  // Magnific Popup
  // ==========
  var lightbox = $('[data-lightbox]').not('[data-lightbox="gallery"] [data-lightbox]');
  var lightboxGallery = $('[data-lightbox^="gallery"]');

  if (lightbox.length) {
    lightbox.each(function(){
      var item = $(this);
      item.magnificPopup({
        type: item.data("lightbox")
      });
    });
  }
  if (lightboxGallery.length) {
    lightboxGallery.each(function(){
      $(this).magnificPopup({
        delegate: '[data-lightbox]',
        type: "image",
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        gallery: {
          enabled: true
        },
        zoom: {
          enabled: true,
          duration: 300, // don't foget to change the duration also in CSS
          opener: function(element) {
            return element.find('img');
          }
        }
      });
    });
  }

  /* Magnific Popup modal window */
  $('.popup-with-zoom-anim').magnificPopup({
    type: 'inline',

    fixedContentPos: false,
    fixedBgPos: true,

    overflowY: 'auto',

    closeBtnInside: true,
    preloader: false,

    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in'
  });

  $('.popup-with-move-anim').magnificPopup({
    type: 'inline',

    fixedContentPos: false,
    fixedBgPos: true,

    overflowY: 'auto',

    closeBtnInside: true,
    preloader: false,

    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-slide-bottom'
  });

  // =======
  // Parallalx.js
  // =======
  var parallax = $('.parallax-bg');

  if (parallax.length > 0) {
    parallax.parallax();
  }

  // ==========
  // Typed effect
  // ==========

  $(".element").typed({
    strings: ["BEAUTIFUL", "FRESH", "WONDERFUL"],
    typeSpeed: 20,
    backDelay: 1200,
    cursorChar: ""
  });

  // =======
  // Responsive Tabs
  // =======
  var tabs = $('.responsive-tabs');

  if (tabs.length > 0) {
    var i = 0;
    for (i = 0; i < tabs.length; i++) {
      var $this = $(tabs[i]);
      $this.easyResponsiveTabs({
        type: $this.attr("data-type"),
        tabidentify: $this.find(".resp-tabs-list").attr("data-group") || "tab"
      });
    };
    $(".resp-tabs-list li").on("click", function(){
      $window.trigger("resize");
    });
  }

  // =======
  // UIToTop
  // =======
  $().UItoTop();
 
  // =======
  // Owl carousel
  // =======
  var carousel = $('.owl-carousel');

  var owl2 = $('.owl-2');
  if (owl2.length) {
    owl2.owlCarousel({
      items: 7,
      mouseDrag: true,
      nav: carousel.attr("data-nav") === "true",
      loop: true,
      autoplay: false,
      dots: false,
      responsiveClass:true,
      responsive:{
        0:{ items:1, },
        480:{ items:1, },
        768:{ items:2, },
        992:{ items:3, },
        1200: { items:4, },
        1800: { items:5, }
      }
    });
  }

  var owl3 = $('.owl-3');
  if (owl3.length) {
    owl3.owlCarousel({
      mouseDrag: false,
      nav: false,
      loop: true,
      center: true,
      autoplay: true,
      dots: false,
      items: 5,
      responsiveClass:true,
      responsive:{
        0:{ items:1, },
        480:{ items:1, },
        768:{ items:3, },
        992:{ items:4, },
        1200: { items:5, },
      }
    });
  }

  var owl4 = $('.owl-4');
  if (owl4.length) {
    owl4.owlCarousel({
      mouseDrag: true,
      nav: false,
      loop: true,
      autoplay: false,
      dots: true,
      items: 1,
    });
  }

  var owl5 = $('.owl-5');
  if (owl5.length) {
    owl5.owlCarousel({
      mouseDrag: false,
      nav: true,
      loop: false,
      animateIn: 'fadeIn',
      animateOut: 'fadeOut',
      autoplay: false,
      dots: false,
      items: 1,
    });
  }

  var owl1 = $('.owl-big');
  if (owl1.length) {
    owl1.owlCarousel({
      mouseDrag: true,
      nav: true,
      loop: false,
      autoplay: false,
      animateOut: 'OUT',
      dots: false,
      items: 1,
    });
  }
  
var mq = window.matchMedia( "(min-width: 992px)" );

if (mq.matches) {
  $(".owl-big .owl-prev, .owl-big .owl-next").on("click", function(){
    if($(".owl-big .owl-item:nth-child(1)").hasClass("active")){
      $(".owl-big .owl-item.active").css("position", "relative");
      $(".owl-big .owl-item.active").css("transform", "scale(1) translateX(0px)");
      $(".owl-big .owl-item.active").css("z-index", "66");    

      $(".owl-big .owl-item:nth-child(3)").css("position", "absolute");
      $(".owl-big .owl-item:nth-child(3)").css("transform", "scale(0.9) translateX(-100px)");
      $(".owl-big .owl-item:nth-child(3)").css("transition", "all .5s ease");
      $(".owl-big .owl-item:nth-child(3)").css("z-index", "3"); 

      $(".owl-big .owl-item:nth-child(2)").css("position", "absolute");
      $(".owl-big .owl-item:nth-child(2)").css("transform", "scale(0.8) translateX(-220px)");
      $(".owl-big .owl-item:nth-child(2)").css("transition", "all .5s ease");
      $(".owl-big .owl-item:nth-child(2)").css("z-index", "2"); 
    };

    if($(".owl-big .owl-item:nth-child(2)").hasClass("active")){
      $(".owl-big .owl-item:nth-child(1)").css("position", "absolute");
      $(".owl-big .owl-item:nth-child(1)").css("transform", "scale(0.9) translateX(-100px)");
      $(".owl-big .owl-item:nth-child(1)").css("transition", "all .5s ease");
      $(".owl-big .owl-item:nth-child(1)").css("z-index", "3"); 

      $(".owl-big .owl-item.active").css("position", "relative");
      $(".owl-big .owl-item.active").css("transform", "scale(1) translateX(0px)");
      $(".owl-big .owl-item.active").css("z-index", "66");  

      $(".owl-big .owl-item:nth-child(3)").css("position", "absolute");
      $(".owl-big .owl-item:nth-child(3)").css("transform", "scale(0.8) translateX(-220px)");
      $(".owl-big .owl-item:nth-child(3)").css("transition", "all .5s ease");
      $(".owl-big .owl-item:nth-child(3)").css("z-index", "2"); 
    };

    if($(".owl-big .owl-item:nth-child(3)").hasClass("active")){
      $(".owl-big .owl-item:nth-child(1)").css("position", "absolute");
      $(".owl-big .owl-item:nth-child(1)").css("transform", "scale(0.8) translateX(-220px)");
      $(".owl-big .owl-item:nth-child(1)").css("transition", "all .5s ease");
      $(".owl-big .owl-item:nth-child(1)").css("z-index", "2"); 

      $(".owl-big .owl-item:nth-child(2)").css("position", "absolute");
      $(".owl-big .owl-item:nth-child(2)").css("transform", "scale(0.9) translateX(-100px)");
      $(".owl-big .owl-item:nth-child(2)").css("transition", "all .5s ease");
      $(".owl-big .owl-item:nth-child(2)").css("z-index", "3"); 

      $(".owl-big .owl-item.active").css("position", "relative");
      $(".owl-big .owl-item.active").css("transform", "scale(1) translateX(0px)");
      $(".owl-big .owl-item.active").css("z-index", "66");  
    };
  });
}



  // =======
  // jQuery Count To
  // =======
  var counter = $('.counter');

  if (counter.length) {
    var counterToInit = counter.not(".init");
    $document.on("scroll", function () {
      counterToInit.each(function(){
        var item = $(this);

        if ((!item.hasClass("init")) && (detectElement(item))) {
          item.countTo({
            refreshInterval: 20,
            speed: item.attr("data-speed") || 1000
          });
          item.addClass('init');
        }
      });
      $document.trigger("resize");
    });
    $document.trigger("scroll");
  }

  // =======
  // WOW
  // =======
  if ($html.hasClass('desktop')) { new WOW().init(); }

});




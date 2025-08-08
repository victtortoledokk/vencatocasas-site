$ = jQuery.noConflict();

new WOW().init();

$(document).ready(function() {
    "use-strict";

  // scroll to up
  $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
          $('.scrollup').fadeIn();
      } else {
          $('.scrollup').fadeOut();
      }
  });
  $('.scrollup').click(function () {
      $("html, body").animate({
          scrollTop: 0
      }, 800);
      return false;
  });

  // BOTÃO MENU REPONSIVO FECHAR X
  $('.navbar-toggler').on('click', function () {
      $(this).toggleClass('active');
  });  

});


// SLIDERS
$('.slider-main').slick({ 
  slidesToShow: 1, slidesToScroll: 1, autoplay: true, autoplaySpeed: 6000, speed: 1000, dots: true, arrows: true, prevArrow: '<button class="slick-prev" type="button"><i class="fas fa-chevron-left"></i></button>', nextArrow: '<button class="slick-next" type="button"><i class="fas fa-chevron-right"></i></button>' 
});

$('.slider-blog-full').slick({ 
  slidesToShow: 1, slidesToScroll: 1, autoplay: true, autoplaySpeed: 6000, speed: 1000, dots: false, arrows: true, prevArrow: '<button class="slick-prev" type="button"><i class="fas fa-chevron-left"></i></button>', nextArrow: '<button class="slick-next" type="button"><i class="fas fa-chevron-right"></i></button>' 
});

$('.slider-service').slick({
  slidesToShow: 5, slidesToScroll: 5, autoplay: true, dots: false, arrows: true, prevArrow: '<button class="slick-prev" type="button"><i class="fas fa-chevron-left"></i></button>', nextArrow: '<button class="slick-next" type="button"><i class="fas fa-chevron-right"></i></button>',
  responsive: [
    {breakpoint: 767, settings: { slidesToShow: 2, slidesToScroll: 2 }}
  ]
});
$( ".slider-service .slider-item" ).addClass( "px-0 px-md-1" );

$('.slider-full').slick({
  slidesToShow: 1, slidesToScroll: 1, autoplay: false, dots: false, arrows: true, prevArrow: '<button class="slick-prev" type="button"><i class="fas fa-chevron-left"></i></button>', nextArrow: '<button class="slick-next" type="button"><i class="fas fa-chevron-right"></i></button>',
  responsive: [
    {breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 }}
  ]
});

$('.slider-blog').slick({
  slidesToShow: 3, slidesToScroll: 3, autoplay: true, dots: false, arrows: false, prevArrow: '<button class="slick-prev" type="button"><i class="fas fa-chevron-left"></i></button>', nextArrow: '<button class="slick-next" type="button"><i class="fas fa-chevron-right"></i></button>',
  responsive: [
    {breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true }}
  ]
});

$('.slider-client').slick({
  slidesToShow: 6, slidesToScroll: 6, autoplay: true, autoplaySpeed: 6000, dots: true, arrows: false, prevArrow: '<button class="slick-prev" type="button"><i class="fas fa-chevron-left"></i></button>', nextArrow: '<button class="slick-next" type="button"><i class="fas fa-chevron-right"></i></button>',
  responsive: [
    {breakpoint: 767, settings: { slidesToShow: 3, slidesToScroll: 3 }}
  ]
});
$( ".slider-client .slider-item" ).addClass( "px-0 px-lg-3" );


/* ----------------------------------
GALLERY PhotoSwipe
-------------------------------------*/
$(function() {
  var initPhotoSwipeFromDOM = function(gallerySelector) {
    var parseThumbnailElements = function(el) {
      var thumbElements = el.childNodes,
        numNodes = thumbElements.length,
        items = [],
        figureEl,
        linkEl,
        size,
        item;
      for (var i = 0; i < numNodes; i++) {
        figureEl = thumbElements[i]; // <figure> element
        if (figureEl.nodeType !== 1) {
          continue;
        }
        linkEl = figureEl.children[0]; // <a> element
        size = linkEl.getAttribute('data-size').split('x');
        item = {
          src: linkEl.getAttribute('href'),
          w: parseInt(size[0], 10),
          h: parseInt(size[1], 10)
        };
        if (figureEl.children.length > 1) {
          item.title = figureEl.children[1].innerHTML;
        }
        if (linkEl.children.length > 0) {
          item.msrc = linkEl.children[0].getAttribute('src');
        }
        item.el = figureEl; // save link to element for getThumbBoundsFn
        items.push(item);
      }
      return items;
    };
    var closest = function closest(el, fn) {
      return el && (fn(el) ? el : closest(el.parentNode, fn));
    };
    var onThumbnailsClick = function(e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
      var eTarget = e.target || e.srcElement;
      var clickedListItem = closest(eTarget, function(el) {
        return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
      });
      if (!clickedListItem) {
        return;
      }
      var clickedGallery = clickedListItem.parentNode,
        childNodes = clickedListItem.parentNode.childNodes,
        numChildNodes = childNodes.length,
        nodeIndex = 0,
        index;
      for (var i = 0; i < numChildNodes; i++) {
        if (childNodes[i].nodeType !== 1) {
          continue;
        }
        if (childNodes[i] === clickedListItem) {
          index = nodeIndex;
          break;
        }
        nodeIndex++;
      }
      if (index >= 0) {
        openPhotoSwipe(index, clickedGallery);
      }
      return false;
    };
    var photoswipeParseHash = function() {
      var hash = window.location.hash.substring(1),
        params = {};

      if (hash.length < 5) {
        return params;
      }
      var vars = hash.split('&');
      for (var i = 0; i < vars.length; i++) {
        if (!vars[i]) {
          continue;
        }
        var pair = vars[i].split('=');
        if (pair.length < 2) {
          continue;
        }
        params[pair[0]] = pair[1];
      }
      if (params.gid) {
        params.gid = parseInt(params.gid, 10);
      }
      return params;
    };
    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
      var pswpElement = document.querySelectorAll('.pswp')[0],
        gallery,
        options,
        items;
      items = parseThumbnailElements(galleryElement);
      options = {
        galleryUID: galleryElement.getAttribute('data-pswp-uid'),
        getThumbBoundsFn: function(index) {
          var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
            rect = thumbnail.getBoundingClientRect();
          return {
            x: rect.left,
            y: rect.top + pageYScroll,
            w: rect.width
          };
        }
      };
      if (fromURL) {
        if (options.galleryPIDs) {
          for (var j = 0; j < items.length; j++) {
            if (items[j].pid == index) {
              options.index = j;
              break;
            }
          }
        } else {
          options.index = parseInt(index, 10) - 1;
        }
      } else {
        options.index = parseInt(index, 10);
      }
      if (isNaN(options.index)) {
        return;
      }
      if (disableAnimation) {
        options.showAnimationDuration = 0;
      }
      gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();
    };
    var galleryElements = document.querySelectorAll(gallerySelector);
    for (var i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute('data-pswp-uid', i + 1);
      galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
      openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
  };
  initPhotoSwipeFromDOM('.photo-gallery');

});
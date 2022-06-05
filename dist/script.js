// variables
var $header_top = $('.header-top');
var $nav = $('nav');



// toggle menu 
$header_top.find('a').on('click', function () {
  $(this).parent().toggleClass('open-menu');
});

function closeMenu() {
  $header_top.find('a').parent().removeClass('open-menu').addClass('close-menu');
}



// fullpage customization
// var fullpageSlide = $('#fullpage').;
var fullpageSlide;
const loadFullpageJs = () => {

  fullpageSlide = new fullpage("#fullpage", {
    sectionsColor: ['#caaa8d', '#B8B89F', '#caaa8d', '#B8B89F', '#caaa8d', '#B8B89F'],
    sectionSelector: '.vertical-scrolling',
    slideSelector: '.horizontal-scrolling',
    navigation: true,
    slidesNavigation: true,
    controlArrows: false,
    anchors: ['romikMakavana', 'aboutSection', 'experienceSection', 'projectsSection', 'blogsSection', 'contactUsSection'],
    menu: '#menu',

    afterLoad: function (anchorLink, index) {
      $header_top.css('background', 'rgba(0, 47, 77, .3)');
      $nav.css('background', 'rgba(0, 47, 77, .25)');
      if (index == 5) {
        $('#fp-nav').hide();
      }
    },

    onLeave: function (index, nextIndex, direction) {
      if (index == 5) {
        $('#fp-nav').show();
      }
    },

    afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
      if (anchorLink == 'fifthSection' && slideIndex == 1) {
        $.fn.fullpage.setAllowScrolling(false, 'up');
        $header_top.css('background', 'transparent');
        $nav.css('background', 'transparent');
        $(this).css('background', '#374140');
        $(this).find('h2').css('color', 'white');
        $(this).find('h3').css('color', 'white');
        $(this).find('p').css(
          {
            'color': '#DC3522',
            'opacity': 1,
            'transform': 'translateY(0)'
          }
        );
      }
    },

    onSlideLeave: function (anchorLink, index, slideIndex, direction) {
      if (anchorLink == 'fifthSection' && slideIndex == 1) {
        $.fn.fullpage.setAllowScrolling(true, 'up');
        $header_top.css('background', 'rgba(0, 47, 77, .3)');
        $nav.css('background', 'rgba(0, 47, 77, .25)');
      }
    }
  });
}


function setHttpData(apiUrl, method, data) {
  let req = {
    url: apiUrl,
    method: method,
    data: data
  };
  return req;
}

function extractContent(s) {
  var div = document.createElement('div');
  div.innerHTML = s;
  return div.textContent || div.innerText;
};

var app = angular.module('app', ['ngSanitize']);
app.controller('blogCtrl', function ($scope, $http) {
  $scope.blogs = [];
  $scope.background = (image) => {
    return { background: `url(${image})` };
  }
  $http(setHttpData('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fromik-mk.medium.com%2Ffeed', 'GET', {}))
    .then(function (response) {

      if (response && response.data && response.data.status == 'ok') {
        if (Array.isArray(response.data.items)) {
          let items = response.data.items;
          items = items.map(item => {
            item.details = extractContent(item.description).substr(0, 330) + "...";
            return item;
          })
          $scope.blogs = items;
        }
      }
      loadFullpageJs()

    }, er => { });
});

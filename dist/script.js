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


function getContentOfDetails(content) {
  let div = document.createElement('div');
  div.innerHTML = content;
  return div.textContent.replace(/<[^>]+>/g, '');
}

$(document).ready(() => {
  $.ajax({
    url: "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fromik-mk.medium.com%2Ffeed", success: function (result) {

      if (result && result.status && result.items && Array.isArray(result.items) && result.items.length) {
        let content = [];
        content = result.items.map(blog => {
          blog.details = getContentOfDetails(extractContent(blog.description).substr(0, 330)) + "...";
          return `<div class="blog-block col-12 me-5 w-100 row">
                    <div class="blog-content col-md-9 col-12">
                      <a href="${blog.link}" target="_blank">
                        <h4>${blog.title}</h4>
                      </a>
                      <p>${blog.details}</p>
                    </div>
                    <div class="blog-image col-md-3 col-12">
                      <div style="background: url(${blog.thumbnail})"></div>
                    </div>
                  </div>`;
        })
        $("section.blog-container div.blog-list").html(content.join(" "));
      }
    }
  })

});

// var app = angular.module('app', ['ngSanitize']);
// app.controller('blogCtrl', function ($scope, $http) {
//   $scope.blogs = [];
//   $scope.background = (image) => {
//     return { background: `url(${image})` };
//   }
//   $http(setHttpData('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fromik-mk.medium.com%2Ffeed', 'GET', {}))
//     .then(function (response) {

//       if (response && response.data && response.data.status == 'ok') {
//         if (Array.isArray(response.data.items)) {
//           let items = response.data.items;
//           items = items.map(item => {
//             item.details = extractContent(item.description).substr(0, 330) + "...";
//             return item;
//           })
//           $scope.blogs = items;
//         }
//       }
//       let blogInterval = setInterval(() => {
//         if(document.querySelectorAll("section.blog-container .blog-block").length > 1){
//           document.querySelector("#fullpage").classList.remove("home-page-container");
//           document.querySelector("#fullpage section:first-child").classList.remove("home-page-banner");
//           loadFullpageJs("#fullpage")
//           clearInterval(blogInterval)
//         }
//       }, 1000);
//     }, er => { });
// });

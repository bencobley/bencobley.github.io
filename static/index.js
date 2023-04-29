document.addEventListener("DOMContentLoaded", function () {
  // Resize sections on window resize
  // $(window).resize(resizeSections);
  // Run all functions once page is loaded
  $(window).on("load", function () {
    splides();
    resizeSections();
    addNavigation();
  });

  function splides() {
    // Initialize splide for each splide class
    var elms = document.getElementsByClassName("splide");
    for (var i = 0; i < elms.length; i++) {
      var splide = new Splide(elms[i], {
        arrows: true,
        perPage: 1,
        // lazyLoad: "sequential",
        interval: 5000,
        autoplay: "pause",
        intersection: {
          inView: {
            autoplay: true,
          },
          outView: {
            autoplay: false,
          },
        },
        video: {
          playerOptions: {
            youtube: {
              loop: false,
              mute: false,
            },
            vimeo: {
              loop: false,
              mute: false,
            },
            htmlVideo: {
              loop: true,
              mute: true,
            },
          },
        },
      });
      splide.mount(window.splide.Extensions);
      // splide.on("lazyload:loaded", function () {
      //   resizeSections();
      // });
    }
  }

  function addNavigation() {
    // Add hrefs to each navigation arrow

    // Get array of themes
    let themes = $(".theme-row")
      .map(function (_, x) {
        return x.id;
      })
      .get();
    themes.unshift("Home");
    themes.push("End");

    // Map elements with class 'up' to themes in array themes. Set href to each theme.
    $(".up").each(function (index) {
      $(this).attr("href", "#" + themes[index]);
    });

    // Map elements with class 'down' to themes in array themes. Set href to each theme.
    $(".down").each(function (index) {
      $(this).attr("href", "#" + themes[index + 2]);
    });

    // Get array of articles
    let articles = $(".article-row")
      .map(function (_, x) {
        return x.id;
      })
      .get();
    articles.unshift("Home");
    articles.push("End");

    // Map elements with class 'left' to articles in array articles. Set href to each article.
    $(".left").each(function (index) {
      $(this).attr("href", "#" + articles[index]);
    });

    // Map elements with class 'right' to articles in array articles. Set href to each article.
    $(".right").each(function (index) {
      $(this).attr("href", "#" + articles[index + 2]);
    });
  }

  // Check if element is in viewport
  $.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  function resizeSections() {
    // Calculate total height for each theme-row once page is loaded
    $(".theme-row").each(function () {
      let totalHeight = 0;

      // For each article row in column:
      $(this)
        .find(".article-row")
        .each(function () {
          // Get the height of body
          let bodyHeight = $(this).children(".article-body").eq(0).outerHeight(true);
          // Get the height of article-sticky
          let stickyHeight = $(this).children(".article-sticky").eq(0).outerHeight(true);
          // Set timeline row height depending on mobile or desktop
          if ($(window).width() > 1000) {
            $(this).height(bodyHeight);
            totalHeight += bodyHeight;
            $(".article-row").each(function () {
              let stickyHeight = $(this).children(".article-sticky").eq(0).outerHeight(true);
              $(this)
                .children(".article-body")
                .eq(0)
                .css("margin-top", -stickyHeight + "px");
            });
          } else {
            $(this).height(bodyHeight + stickyHeight);
            totalHeight += bodyHeight + stickyHeight;
          }
        });
      // Set the height of the theme-row to the total height
      $(this).height(totalHeight);
    });
  }
});

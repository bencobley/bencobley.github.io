document.addEventListener("DOMContentLoaded", function () {
  // Resize sections on window resize
  $(window).resize(resizeSections);
  // Run all functions once page is loaded
  $(window).on("load", function () {
    splides();
    resizeSections();
    addNavigation();
    addKeyNavigation();
  });

  function splides() {
    // Initialize splide for each splide class
    var elms = document.getElementsByClassName("splide");
    for (var i = 0; i < elms.length; i++) {
      new Splide(elms[i], { arrows: false }).mount();
    }
  }

  function nextTheme(element) {
    // Return next theme ID given current theme ID
    return (nextThemeId = $(element).parent().next().attr("id"));
  }

  function prevTheme(element) {
    // Return previous theme ID given current theme ID
    return (prevThemeId = $(element).parent().prev().attr("id"));
  }

  function nextItem(element) {
    // Return next item ID given current item ID
    let nextItemId = $(element).next().attr("id");
    if (nextItemId) {
      return nextItemId;
    } else {
      nextItemId = $(element).parent().parent().parent().next().find(".timeline-item-row").first().attr("id");
    }
  }

  function prevItem(element) {
    // Return previous item ID given current item ID
    let prevItemId = $(element).prev().attr("id");
    if (prevItemId) {
      return prevItemId;
    } else {
      prevItemId = $(element).parent().parent().parent().prev().find(".timeline-item-row").last().attr("id");
    }
  }

  function addNavigation() {
    $(".timeline-theme-row").each(function () {
      // Get id of next timeline-theme-row
      let nextThemeId = $(this).parent().next().attr("id");
      let prevThemeId = $(this).parent().prev().attr("id");

      // Add theme navigation arrows
      if (prevThemeId) {
        $(this)
          .find(".timeline-theme-sticky")
          .first()
          .prepend("<a class='timeline-arrow timeline-up' href='#" + prevThemeId + "'><</a>");
      }
      if (nextThemeId) {
        $(this)
          .find(".timeline-theme-sticky")
          .first()
          .append("<a class='timeline-arrow timeline-down' href='#" + nextThemeId + "'>></a>");
      }
      // Add item navigation arrows
      $(this)
        .find(".timeline-item-row")
        .each(function () {
          // Get id of next timeline-item-row
          let nextItemId = $(this).next().attr("id");
          if (!nextItemId) {
            nextItemId = $(this).parent().parent().parent().next().find(".timeline-item-row").first().attr("id");
          }
          // Get id of previous timeline-item-row
          let prevItemId = $(this).prev().attr("id");
          if (!prevItemId) {
            prevItemId = $(this).parent().parent().parent().prev().find(".timeline-item-row").last().attr("id");
          }
          // Add navigation to timeline-theme-sticky
          if (prevItemId) {
            $(this)
              .find("timeline-date")
              .first()
              .prepend("<a class='timeline-arrow timeline-left' href='#" + prevItemId + "'><</a>");
          }
          if (nextItemId) {
            $(this)
              .find("timeline-date")
              .first()
              .append("<a class='timeline-arrow timeline-right' href='#" + nextItemId + "'>></a>");
          }
        });
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
    // Calculate total height for each timeline-theme-row once page is loaded
    $(".timeline-theme-row").each(function () {
      let totalHeight = 0;

      // For each item row in column:
      $(this)
        .find(".timeline-item-column .timeline-item-row")
        .each(function () {
          // Get the height of timeline-body
          let bodyHeight = $(this).children("timeline-body").eq(0).outerHeight(true);
          // Get the height of timeline-item-sticky
          let stickyHeight = $(this).children(".timeline-item-sticky").eq(0).outerHeight(true);
          // Set timeline row height depending on mobile or desktop
          if (($(window).width() > 1000) & ($(window).height() > 600)) {
            $(this).height(bodyHeight);
            totalHeight += bodyHeight;
          } else {
            $(this).height(bodyHeight + stickyHeight);
            totalHeight += bodyHeight + stickyHeight;
          }
        });
      // Set the height of the timeline-theme-row to the total height
      $(this).height(totalHeight);
    });
  }
});

function addKeyNavigation() {
  console.log("document ready");
  $(document).on("keydown", function (event) {
    if (event.key === "ArrowDown") {
      $(".timeline-down").each(function () {
        console.log($(this).isInViewport());
        if ($(this).isInViewport()) {
          $(this).click();
        }
      });
    }
  });
}

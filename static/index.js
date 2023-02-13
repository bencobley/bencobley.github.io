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
    let nextThemeId = $("#" + element)
      .next()
      .attr("id");
    if (nextThemeId) {
      return nextThemeId;
    } else {
      return "#";
    }
  }

  function prevTheme(element) {
    // Return previous theme ID given current theme ID
    let prevThemeId = $("#" + element)
      .prev()
      .attr("id");
    if (prevThemeId) {
      return prevThemeId;
    } else {
      return "#Home";
    }
  }

  function nextItem(element) {
    // Return next item ID given current item ID

    let nextItemID = $("#" + element)
      .next()
      .attr("id");
    let nextThemeItemID = $("#" + element)
      .parent()
      .parent()
      .parent()
      .next()
      .find(".timeline-item-row")
      .first()
      .attr("id");
    if (nextItemID) {
      return nextItemID;
    } else if (nextThemeItemID) {
      return nextThemeItemID;
    } else {
      return "Footer";
    }
  }

  function prevItem(element) {
    // Return previous item ID given current item ID
    let prevItemID = $("#" + element)
      .prev()
      .attr("id");
    let prevThemeItemID = $("#" + element)
      .parent()
      .parent()
      .parent()
      .prev()
      .find(".timeline-item-row")
      .last()
      .attr("id");
    if (prevItemID) {
      return prevItemID;
    } else if (prevThemeItemID) {
      return prevThemeItemID;
    } else {
      return "Home";
    }
  }

  function addNavigation() {
    $(".timeline-theme-row").each(function () {
      currentThemeID = $(this).parent().attr("id");
      // For each timeline-theme-arrow
      $(this)
        .find(".timeline-theme-arrow")
        .first()
        .attr({ href: "#" + prevTheme(currentThemeID), class: "timeline-theme-arrow timeline-up" });
      $(this)
        .find(".timeline-theme-arrow")
        .last()
        .attr({ href: "#" + nextTheme(currentThemeID), class: "timeline-theme-arrow timeline-down" });
    });
    $(".timeline-item-row").each(function () {
      currentItemID = $(this).attr("id");
      // For each timeline-item-arrow
      $(this)
        .find(".timeline-item-arrow")
        .first()
        .attr({ href: "#" + prevItem(currentItemID), class: "timeline-theme-arrow timeline-left" });
      $(this)
        .find(".timeline-item-arrow")
        .last()
        .attr({ href: "#" + nextItem(currentItemID), class: "timeline-theme-arrow timeline-right" });
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
  $(document).on("keydown", function (event) {
    if (event.key === "ArrowDown") {
      $(".timeline-down").each(function () {
        if ($(this).isInViewport()) {
          // Scroll to the target anchor
          $("html, body").animate(
            {
              scrollTop: $($(this).attr("href")).offset().top,
            },
            500
          );
          // Update the URL hash without reloading the page
          history.pushState(null, null, $(this).attr("href"));
        }
      });
    }
    if (event.key === "ArrowUp") {
      $(".timeline-up").each(function () {
        if ($(this).isInViewport()) {
          // Scroll to the target anchor
          $("html, body").animate(
            {
              scrollTop: $($(this).attr("href")).offset().top,
            },
            500
          );
          // Update the URL hash without reloading the page
          history.pushState(null, null, $(this).attr("href"));
        }
      });
    }
    if (event.key === "ArrowRight") {
      $(".timeline-right").each(function () {
        if ($(this).isInViewport()) {
          // Scroll to the target anchor
          $("html, body").animate(
            {
              scrollTop: $($(this).attr("href")).offset().top,
            },
            100
          );
          // Update the URL hash without reloading the page
          history.pushState(null, null, $(this).attr("href"));
        }
      });
    }
    if (event.key === "ArrowLeft") {
      $(".timeline-left").each(function () {
        if ($(this).isInViewport()) {
          // Scroll to the target anchor
          $("html, body").animate(
            {
              scrollTop: $($(this).attr("href")).offset().top,
            },
            100
          );
          // Update the URL hash without reloading the page
          history.pushState(null, null, $(this).attr("href"));
        }
      });
    }
  });
}

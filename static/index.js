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
      .find(".item-row")
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
      .find(".item-row")
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
    $(".theme-row").each(function () {
      currentThemeID = $(this).parent().attr("id");
      // For each theme-arrow
      $(this)
        .find(".theme-arrow")
        .first()
        .attr({ href: "#" + prevTheme(currentThemeID), class: "theme-arrow up" });
      $(this)
        .find(".theme-arrow")
        .last()
        .attr({ href: "#" + nextTheme(currentThemeID), class: "theme-arrow down" });
    });
    $(".item-row").each(function () {
      currentItemID = $(this).attr("id");
      // For each item-arrow
      $(this)
        .find(".item-arrow")
        .first()
        .attr({ href: "#" + prevItem(currentItemID), class: "theme-arrow left" });
      $(this)
        .find(".item-arrow")
        .last()
        .attr({ href: "#" + nextItem(currentItemID), class: "theme-arrow right" });
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

      // For each item row in column:
      $(this)
        .find(".item-column .item-row")
        .each(function () {
          // Get the height of body
          let bodyHeight = $(this).children("body").eq(0).outerHeight(true);
          // Get the height of item-sticky
          let stickyHeight = $(this).children(".item-sticky").eq(0).outerHeight(true);
          // Set timeline row height depending on mobile or desktop
          if (($(window).width() > 1000) & ($(window).height() > 600)) {
            $(this).height(bodyHeight);
            totalHeight += bodyHeight;
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

function addKeyNavigation() {
  $(document).on("keydown", function (event) {
    if (event.key === "ArrowDown") {
      $(".down").each(function () {
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
      $(".up").each(function () {
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
      $(".right").each(function () {
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
      $(".left").each(function () {
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

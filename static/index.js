document.addEventListener("DOMContentLoaded", function () {
  $(window).resize(resizeSections);
  $(window).on("load", function () {
    splides();
    resizeSections();
  });

  function splides() {
    var elms = document.getElementsByClassName("splide");
    for (var i = 0; i < elms.length; i++) {
      new Splide(elms[i], { arrows: false }).mount();
    }
  }

  function resizeSections() {
    // if ($(window).width() > 1000) {

    // Calculate total height for each timeline-theme-row once page is loaded
    $(".timeline-theme-row").each(function () {
      let totalHeight = 0;

      // For each item row:
      $(this)
        .children(".timeline-item-column")
        .children(".timeline-item-row")
        .each(function () {
          // Get the height of timeline-body
          let bodyHeight = $(this).children("timeline-body").eq(0).outerHeight(true);
          // Get the height of timeline-item-sticky
          let stickyHeight = $(this).children(".timeline-item-sticky").eq(0).outerHeight(true);
          // Set timeline row height depending on mobile or desktop
          if ($(window).width() > 1000) {
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
    // }
  }
});

// Set timeline-theme-column height to the total height minus the text height
// let textHeight = $(this).children(".timeline-theme-column").children(".timeline-theme-sticky").eq(0).outerHeight(true);
// $(this)
//   .children(".timeline-theme-column")
//   .eq(0)
//   .height(totalHeight - textHeight);

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

      // Get id of next timeline-theme-row
      let nextRowId = $(this).parent().next().attr("id");
      let prevRowId = $(this).parent().prev().attr("id");
      console.log(nextRowId);
      // If prev/nextRowID then add a button to timeline-theme-sticky
      if (prevRowId) {
        $(this)
          .find(".timeline-theme-sticky")
          .first()
          .prepend("<a style='color: black; text-decoration: none;' href='#" + prevRowId + "'><</a>&nbsp;");
      }
      if (nextRowId) {
        $(this)
          .find(".timeline-theme-sticky")
          .first()
          .append("&nbsp;<a style='color: black; text-decoration: none;' href='#" + nextRowId + "'>></a>");
      }
    });
  }
});

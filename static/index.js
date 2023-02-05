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
    if ($(window).width() > 768) {
      let totalHeight = 0;
      $("timeline-row").each(function (index) {
        let rowHeight = $(this)
          .children("timeline-body")
          .eq(0)
          .outerHeight(true);
        if (typeof rowHeight !== "undefined") {
          $(this).height(rowHeight);
          totalHeight += rowHeight;
          console.log(rowHeight);
        }
      });
      $("#theme").height(totalHeight);
      console.log(totalHeight);
    }
  }
});

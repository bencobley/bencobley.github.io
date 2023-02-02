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
      $("timeline-section").each(function (index) {
        let columnHeight = $(this)
          .children("timeline-right-column")
          .eq(0)
          .outerHeight(true);
        $(this).height(columnHeight);
      });
    }
  }
});

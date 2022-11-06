document.addEventListener("DOMContentLoaded", function () {
  var elms = document.getElementsByClassName("splide");

  for (var i = 0; i < elms.length; i++) {
    new Splide(elms[i]).mount();
  }

  document.getElementById("timeline-section0").style.height = String(
    Math.max(
      document.getElementById("timeline-column0").offsetHeight,
      window.innerHeight
    ) + "px"
  );

  if (window.matchMedia("(min-width: 500px)").matches) {
    document.getElementById("timeline-section1").style.height =
      String(document.getElementById("timeline-column1").offsetHeight) + "px";

    document.getElementById("timeline-section2").style.height =
      String(document.getElementById("timeline-column2").offsetHeight) + "px";

    document.getElementById("timeline-section3").style.height =
      String(document.getElementById("timeline-column3").offsetHeight) + "px";
  } else {
    // console.log("Screen less than 500px");
  }
});

$("section").each(function (index) {
  $("section").each(function (index) {
    console.log(index + ": " + $(this).class());
  });
});

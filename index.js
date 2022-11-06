document.addEventListener("DOMContentLoaded", function () {
  var elms = document.getElementsByClassName("splide");

  for (var i = 0; i < elms.length; i++) {
    new Splide(elms[i]).mount();
  }

  document.getElementById("dummy-section0").style.height = String(
    Math.max(
      document.getElementById("dummy-column0").offsetHeight,
      window.innerHeight
    ) + "px"
  );

  if (window.matchMedia("(min-width: 500px)").matches) {
    document.getElementById("dummy-section1").style.height =
      String(document.getElementById("dummy-column1").offsetHeight) + "px";

    document.getElementById("dummy-section2").style.height =
      String(document.getElementById("dummy-column2").offsetHeight) + "px";

    document.getElementById("dummy-section3").style.height =
      String(document.getElementById("dummy-column3").offsetHeight) + "px";
  } else {
    // console.log("Screen less than 500px");
  }
});

$("section").each(function (index) {
  $("section").each(function (index) {
    console.log(index + ": " + $(this).class());
  });
});

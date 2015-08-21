$(".styled-select").click(function () {
    var element = $(this).children("select")[0],
        worked = false;
    if(document.createEvent) { // all browsers
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false,false, false, false, 0, null);
        worked = element.dispatchEvent(e);
    } else if (element.fireEvent) { // ie
        worked = element.fireEvent("onmousedown");
    }
    if (!worked) { // unknown browser / error
        alert("It didn't worked in your browser.");
    }
});

d3.selectAll(".styled-select select")
  .on("change", function(){
    doStuff(d3.select(".styled-select.foo select").node().value);
    var m = d3.select(this);
    if(m.node().value == ""){
      m.style("color", "#818385");
    }else{ m.style("color", "#333")}
  })

var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
if (isFirefox){
  d3.selectAll(".styled-select select").style("pointer-events","visible");
}

function doStuff(value){
    console.log(value);
}
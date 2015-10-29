//Incomplete snippet that shows to to rotate y axis text and center it, in d3

var label = svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
    .attr("class", "label")
    .text(someText)

var offset = label.node().getComputedTextLength()/2.0
var middle = (y.domain()[0] + y.domain()[1])/2.0

//for margin.left of 50
label
  .attr("transform","rotate(-90,-41," + (y(middle)+offset) + ")")
  .attr("x",-41)
  .attr("y",y(middle)+offset)

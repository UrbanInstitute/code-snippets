//draw a value scrubber in a div with the id #valueScrubber
//see ../css/urban-scrubber.css for styles
function drawScrubber(){
	var width = 240,
	    height = 45,
	    radius = 10,
		lowerBound = 1900,
		upperBound = 2015;

	var scale = d3.scale.linear()
		.domain([radius, width-radius])
		.range([lowerBound, upperBound]);

	var drag = d3.behavior.drag()
	    .origin(function(d) { return d; })
	    .on("drag", dragmove);

	var leftValue = d3.select("#valueScrubber")
		.append("div")
		.attr("id", "leftValue")
		.text("1937")

	var svg = d3.select("#valueScrubber").append("div")
	  	.append("svg")
	    .attr("width", width)
	    .attr("height", height);
	    
	var rightValue = d3.select("#valueScrubber")
		.append("div")
		.attr("id", "rightValue")
		.text("2014")

	svg.append("rect")
		.attr("id", "sliderTrack")
		.attr("x", 0)
		.attr("y", height/2 - 3)
		.attr("height", 6)
		.attr("width", width)
		.attr("rx", 2)
		.attr("ry", 2)

	svg.append("rect")
		.attr("id", "sliderHighlight")
		.attr("x", 0)
		.attr("y", height/2 - 3)
		.attr("height", 6)
		.attr("width", width)
		.attr("rx", 2)
		.attr("ry", 2)

	svg.selectAll(".left")
		.data(d3.range(1).map(function() { return {x: radius, y: height / 2}; }))
		.enter()
		.append("circle")
		.attr("class","thumb left")
	    .attr("r", radius)
	    .attr("cx", function(d) {console.log(d); return d.x; })
	    .attr("cy", function(d) { return d.y; })
	    .call(drag);

	svg.selectAll(".right")
		.data(d3.range(1).map(function() { return {x: width - radius, y: height / 2}; }))
		.enter()
		.append("circle")
		.attr("class","thumb right")
	    .attr("r", radius)
	    .attr("cx", function(d) {console.log(d); return d.x; })
	    .attr("cy", function(d) { return d.y; })
	    .call(drag);

	function dragmove(d) {
	  var dragged = d3.select(this)
	  var isLeft = dragged.classed("left")
	  var other = (isLeft) ? d3.select("circle.right") : d3.select("circle.left")
	  if(!isLeft){
	  	var pos = Math.min(width-radius, Math.max(other.data()[0].x, d3.event.x));
		var value = Math.round(scale(pos));
		rightValue.text(value);
		doStuff(leftValue.text(), value);
		d3.select("#sliderHighlight")
			.attr("width", function(){
				return pos - d3.select(this).attr("x")
			})
	  	dragged
	    	.attr("cx", d.x = pos);
	  } else{
	  	var pos = Math.min(other.data()[0].x, Math.max(radius, d3.event.x));
		var value = Math.round(scale(pos));
		leftValue.text(value);
		doStuff(value, rightValue.text());
		d3.select("#sliderHighlight")
			.attr("x", function(){
				return pos;
			})
			.attr("width", function(){
				return d3.select("circle.right").attr("cx") - pos
			})
	  	dragged
	  		.attr("cx", d.x = pos);
	  }
	}

}
drawScrubber();


//RENAME THIS FUNCTION
//Do things with the scrubber values whenever they change
function doStuff(leftValue, rightValue){
	//Note that leftValue and rightValue are currently text
	//pass them into parseInt() or parseFloat() to convert to numeric
}



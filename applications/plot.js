var dataset;

var w = 800,
	h = 800,
	padding = 20;

// set up scales
var rScale = d3.scale.linear()
	.range([0, (w-padding*2)/2]);

var degrees = d3.scale.linear()
	.range([0, 180]);  //map each block to a different sector of the circle

// function to convert degrees to radians
// also flip the angle to be in the bottom half of the circle for blocks where
// the poverty rate is greater than DC's avg poverty rate
var theta = function(x, high_pov) {
	return (high_pov ? -(x/180) * Math.PI : (x/180) * Math.PI);
}

// set up plot
var plot = d3.select("#plot")
	.append("svg")
		.attr("width", w)
		.attr("height", h)
	.append("g")
		.attr("transform", "translate(" + w/2 + "," + h/2 + ")");

d3.csv("data_for_plot.csv", function(d) {
	return {
		id: d.id,
		geography: d.geography,
		dis_rating_above_6: +d.dis_rating_above_6,
		school_name: d.school_name,
		pct_families_belowpov: +d.pct_families_belowpov,
		total_grade_1_5: +d.total_grade_1_5,
		pct_white: +d.pct_white,
		pct_black: +d.pct_black,
		pct_hisp: +d.pct_hisp,
		pct_other: +d.pct_other,
		high_poverty: +d.high_poverty
	};
}, function(error, data) {

	rScale.domain([0, d3.max(data, function(d) { return d.dis_rating_above_6; })]);
	degrees.domain([0, data.length]);
	
	dataset = data;

	// draw and label school
	var school = plot.append("g")
		.attr("class", "school");

	school.append("circle")
		.attr("cx", 0)
		.attr("cy", 0)
		.attr("r", 10)
		.style("fill", "#b3b3b3");

	school.append("text")
		.attr("x", 0)
		.attr("y", -14)
		.text("School")
		.style("text-anchor", "middle");

	// draw rings
	var rings = plot.selectAll(".ring")
		.data([0.5, 1, 1.5, 2])
	  .enter().append("g")
	  	  .attr("class", "ring");
	
	rings.append("circle")
	  	.attr("cx", 0)
	  	.attr("cy", 0)
	  	.attr("r", function(d) { return rScale(d); })
	  	.style("stroke", "#ccc")
	  	.style("fill-opacity", 0);

	rings.append("text")
		.attr("x", 0)
		.attr("y", function(d) { return -rScale(d) + 15; })
		.text(function(d) { return "< " + d + " miles"; })
		.style("text-anchor", "middle");

	// add line for separation of low and high poverty blocks
	var pov_line = plot.append("g")
		.attr("class", "pov_line");

	pov_line.append("line")
		.attr("x1", -w/2)
		.attr("y1", 0)
		.attr("x2", w/2 + 40)
		.attr("y2", 0)
		.style("stroke", "#b3b3b3")
		.style("stroke-dasharray", "3, 3");

	pov_line.append("text")
		.attr("x", 70)
		.attr("y", 12)
		.text("Blocks below this line have a higher-than-average poverty rate");

	// draw blocks
	var blocks = plot.selectAll(".block")
		.data(dataset)
	  .enter().append("circle")
	  	.attr("class", "block")
	  	.attr("cx", function(d, i) { return rScale(d.dis_rating_above_6) * Math.cos(-theta(degrees(i), d.high_poverty)); })
	  	.attr("cy", function(d, i) { return rScale(d.dis_rating_above_6) * Math.sin(-theta(degrees(i), d.high_poverty)); })
	  	.attr("r", 5)
	  	.style("fill", "#984ea3")
	  	.style("fill-opacity", function(d) { return d.pct_white; });

	// update plot based on race dropdown
	var selectRace = d3.select("#race-selector")
		.on("change", onchange);
});

function onchange() {
	selected = d3.select("#race-selector").property("value");
	
	if(selected === "white") {
		plot.selectAll(".block")
			.data(dataset)
			.transition(2000)
			.style("fill", "#984ea3")
			.style("fill-opacity", function(d) { return d.pct_white; });
	}
	else if(selected === "black") {
		plot.selectAll(".block")
			.data(dataset)
			.transition(2000)
			.style("fill", "#377eb8")
			.style("fill-opacity", function(d) { return d.pct_black; });
	}
	else if (selected === "hisp") {
		plot.selectAll(".block")
			.data(dataset)
			.transition(2000)
			.style("fill", "#4daf4a")
			.style("fill-opacity", function(d) { return d.pct_hisp; });
	}
	else {
		plot.selectAll(".block")
			.data(dataset)
			.transition(2000)
			.style("fill", "#e41a1c")
			.style("fill-opacity", function(d) { return d.pct_other; });
	}
}
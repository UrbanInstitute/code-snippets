//change chart behavior at this size
var MOBILE_THRESHOLD = 600;
//configure in each graph call
var FORMATTER,
    $LINEDIV,
    YEARVAL,
    GROUPS,
    NUMTICKS,
    COLORS,
    MOBILE_TICKS,
    linechart_aspect_height,
    linechart_aspect_height_mobile;

//globals
var linechart_data_url = "data/linerates_wide.csv";
var linechart_aspect_width = 1;

var isMobile = false;
var data_wide;

//format years as 'XX
var yearf = d3.format("02d");

function formatYear(d) {
    if (d >= 2000) {
        return "'" + yearf(Math.abs(2000 - d));
    } else if (d < 2000) {
        return "'" + yearf(Math.abs(1900 - d));
    }
}

function linechart(div, id) {

    data = data_wide;

    var margin = {
        top: 25,
        right: 15,
        bottom: 25,
        left: 40
    };

    if ($LINEDIV.width() <= MOBILE_THRESHOLD) {
        isMobile = true;
    } else {
        isMobile = false;
    }

    //change number of ticks and aspect ratio for small width graphs. add to this as needed.
    if (isMobile) {
        NUMTICKS = MOBILE_TICKS;
        linechart_aspect_height = linechart_aspect_height_mobile;
    }

    var width = $LINEDIV.width() - margin.left - margin.right,
        height = Math.ceil((width * linechart_aspect_height) / linechart_aspect_width) - margin.top - margin.bottom,
        padding = 30;

    $LINEDIV.empty();

    var formatAxis = d3.format(',0f');

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.ordinal()
        .domain(GROUPS)
        .range(COLORS);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(formatYear)
        .ticks(NUMTICKS);

    var svg = d3.select(div).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //use this instead if you don't care which color = which group (rare). Remove the color.domain line above if using this
    //color.domain(d3.keys(data[0]).filter(function (key) {
    //    return key != YEARVAL;
    //}));

    var linegroups = color.domain().map(function (name) {
        return {
            name: name,
            values: data.map(function (d) {
                return {
                    year: d[YEARVAL],
                    val: +d[name]
                };
            })
        };
    });
    x.domain(d3.extent(data, function (d) {
        return d.year;
    }));

    //if positive/negative values, use full extent for y domain. if all positive, use 0 to max
    var ymin = d3.min(linegroups, function (c) {
        return d3.min(c.values, function (v) {
            return v.val;
        });
    });
    if (ymin >= 0) {
        y.domain([0, d3.max(linegroups, function (c) {
            return d3.max(c.values, function (v) {
                return v.val;
            });
        })]);
    } else {
        y.domain([ymin, d3.max(linegroups, function (c) {
            return d3.max(c.values, function (v) {
                return v.val;
            });
        })]);
    }

    //make your axes
    var gx = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "x axis")
        .call(xAxis);

    var yAxis = d3.svg.axis()
        .scale(y)
        .tickSize(-width)
        .tickFormat(FORMATTER)
        .orient("left");

    var gy = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    gy.selectAll("g").filter(function (d) {
            return d;
        })
        .classed("minor", true);

    gy.selectAll("text")
        .attr("x", -4)
        .attr("dy", 4);

    //nest data by GROUP variable
    data_nest = d3.nest().key(function (d) {
        return d.name;
    }).entries(data);

    //draw lines! If desired, uncomment the interpolate line. Shouldn't use unless appropriate.
    var line = d3.svg.line()
        //.interpolate("basis")
        .x(function (d) {
            return x(d.year);
        })
        .y(function (d) {
            return y(d.val);
        });

    //draw one line for each GROUP key
    var lines = svg.selectAll(".group")
        .data(linegroups)
        .enter().append("g")
        .attr("class", "group");

    lines.append("path")
        .attr("class", "chartline")
        .attr("d", function (d) {
            return line(d.values);
        })
        .attr("id", function (d) {
            return d.name;
        })
        .attr("stroke", function (d) {
            return color(d.name);
        });

}

//configure chart. want a bunch of charts? make a bunch of these.
function achart() {
    //id of div
    $LINEDIV = $("#assaultchart");
    COLORS = ["#1696d2", "#fdbf11"];
    //names of the column groups in the same order as the colors you want to draw them with
    GROUPS = ["assaultrate_cl27", "assaultrate_cl29"];
    //column name of X variable
    YEARVAL = "year";
    //how to format Y axis ticks
    FORMATTER = d3.format(',0f');
    //number of ticks on big and small screens. can be the same.
    NUMTICKS = 14;
    MOBILE_TICKS = 7;
    //leave this.
    isMobile = false;
    //change the height ratio depending on the shape of your graph
    linechart_aspect_height = 0.6;
    linechart_aspect_height_mobile = 1;

    //draw the chart to the div
    linechart("#assaultchart");
}

function rchart() {
    //id of div
    $LINEDIV = $("#robchart");
    COLORS = ["#1696d2", "#fdbf11"];
    //names of the column groups in the same order as the colors you want to draw them with
    GROUPS = ["robrate_cl27", "robrate_cl29"];
    //column name of X variable
    YEARVAL = "year";
    //how to format Y axis ticks
    FORMATTER = d3.format(',0f');
    //number of ticks on big and small screens. can be the same.
    NUMTICKS = 14;
    MOBILE_TICKS = 7;
    //leave this.
    isMobile = false;
    //change the height ratio depending on the shape of your graph
    linechart_aspect_height = 0.6;
    linechart_aspect_height_mobile = 1;

    //draw the chart to the div
    linechart("#robchart");
}

//draw your responsive chart. if making multiple charts, make an external function that calls them all, and then call that drawgraphics function on window load
function linecharts() {
    achart();
    rchart();
}

$(window).load(function () {
    if (Modernizr.svg) { // if svg is supported, draw dynamic chart
        d3.csv(linechart_data_url, function (annualrates) {
            data_wide = annualrates;

            linecharts();
            window.onresize = linecharts;
        });
    }
});
var barchart_aspect_width = 1;
var barchart_aspect_height = 0.5;

function simplebar(div, id) {

    var margin = {
        top: 25,
        right: 5,
        bottom: 20,
        left: 5
    };
    data.forEach(function (d) {
        d[VAL] = +d[VAL];
    });

    var width = $GRAPHDIV.width() - margin.left - margin.right,
        height = Math.ceil((width * barchart_aspect_height) / barchart_aspect_width) - margin.top - margin.bottom;

    $GRAPHDIV.empty();

    var svg = d3.select(div).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1)
        .domain(data.map(function (d) {
            return d[XVAL];
        }));

    var xAxis = d3.svg.axis()
        .scale(x)
        .tickSize(0)
        .orient("bottom");

    var gx = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "x axis-show")
        .call(xAxis);

    var y = d3.scale.linear()
        .range([height, 0]);

    var ymin = d3.min(data, function (d) {
        return d[VAL];
    });

    if (ymin >= 0) {
        y.domain([0, d3.max(data, function (d) {
            return d[VAL];
        })]);
    } else {
        y.domain(d3.extent(data, function (d) {
            return d[VAL];
        }));
    }

    var bars = svg.selectAll("g.bar")
        .data(data)
        .enter()
        .append("g");

    bars.append("rect")
        .attr("fill", COLORS)
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d[XVAL]);
        })
        .attr("width", x.rangeBand())
        .attr("y", function (d) {
            return Math.min(y(d[VAL]), y(0));
        })
        .attr("height", function (d) {
            return Math.abs(y(0) - (y(d[VAL])));
        });

    bars.append("text")
        .attr("class", "valuetext")
            .attr("x", function (d) {
            return x(d[XVAL]) + 0.5 * x.rangeBand();
        })
        .attr("text-anchor", "middle")
        .attr("y", function (d) {
            return y(d[VAL]) - 6;
        })
        .text(function (d, i) {
            return FORMATTER(d[VAL]);
        });

}
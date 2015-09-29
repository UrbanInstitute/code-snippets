//linear legend
function legend(div) {

    var margin = {
        top: 3,
        right: 1,
        bottom: 2,
        left: 1
    };

    var width = $LEGENDDIV.width() - margin.left - margin.right,
        height = 50 - margin.top - margin.bottom;

    $LEGENDDIV.empty();

    var svg = d3.select(div).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    if ($LEGENDDIV.width() < MOBILE_THRESHOLD) {
        var lp_w = 0,
            ls_w = (width / COLORS.length),
            ls_h = 15;
    } else {
        var lp_w = 0,
            ls_w = 60,
            ls_h = 15;
    }

    //labelling min and max
    if (BREAKS.length > COLORS.length) {
        var legend = lsvg.selectAll("g.legend")
            .data(BREAKS)
            .enter().append("g")
            .attr("class", "legend");

        legend.append("text")
            .data(BREAKS)
            .attr("x", function (d, i) {
                return (i * ls_w) + lp_w - 15;
            })
            .attr("y", 15)
            .text(function (d, i) {
                return FORMATTER(d);
            });
    } else {
        //not labelling min and max
        var legend = svg.selectAll("g.legend")
            .data(COLORS)
            .enter().append("g")
            .attr("class", "legend");

        legend.append("text")
            .data(BREAKS)
            .attr("x", function (d, i) {
                return (i * ls_w) + lp_w + ls_w - 2;
            })
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .text(function (d, i) {
                return FORMATTER(d);
            });
    }
    legend.append("rect")
        .data(COLORS)
        .attr("x", function (d, i) {
            return (i * ls_w) + lp_w;
        })
        .attr("y", 20)
        .attr("width", ls_w - 3)
        .attr("height", ls_h)
        .attr("z-index", 10)
        .style("fill", function (d, i) {
            return COLORS[i];
        })
}

//categorical legend - will likely need customizing for large #s of categories. This is just a start

function catlegend(div) {

    if ($LEGENDDIV.width() < MOBILE_THRESHOLD) {
        var margin = {
            top: 8,
            right: 1,
            bottom: 2,
            left: 5
        };

        var width = $LEGENDDIV.width() - margin.left - margin.right,
            height = 50 - margin.top - margin.bottom;

        $LEGENDDIV.empty();

        var svg = d3.select(div).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var lp_w = 0,
            ls_w = 30,
            ls_h = 18;

        var legend = svg.selectAll("g.legend")
            .data(COLORS)
            .enter().append("g")
            .attr("class", "legend");

        legend.append("text")
            .data(LABELS)
            .attr("x", lp_w + ls_w + 8)
            .attr("y", function (d, i) {
                return i * (ls_h + 5) + 15;
            })
            .text(function (d, i) {
                return d;
            });

        legend.append("rect")
            .data(COLORS)
            .attr("x", 0)
            .attr("y", function (d, i) {
                return i * (ls_h + 5);
            })
            .attr("width", ls_w)
            .attr("height", ls_h)
            .attr("z-index", 10)
            .style("fill", function (d, i) {
                return COLORS[i];
            })
    } else {
        var margin = {
            top: 3,
            right: 1,
            bottom: 5,
            left: 1
        };

        var width = $LEGENDDIV.width() - margin.left - margin.right,
            height = 30 - margin.top - margin.bottom;

        $LEGENDDIV.empty();

        var svg = d3.select(div).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //adjust spacing as needed for your label lengths
        var lp_w = 130,
            ls_w = 30,
            ls_h = 15;

        var legend = svg.selectAll("g.legend")
            .data(LABELS)
            .enter().append("g")
            .attr("class", "legend");

        legend.append("text")
            .data(LABELS)
            .attr("x", function (d, i) {
                return (i * (ls_w + lp_w)) + ls_w + 5;
            })
            .attr("y", 22)
            .text(function (d, i) {
                return d;
            });

        legend.append("rect")
            .data(COLORS)
            .attr("x", function (d, i) {
                return (i * (ls_w + lp_w));
            })
            .attr("y", 10)
            .attr("width", ls_w)
            .attr("height", ls_h)
            .style("fill", function (d, i) {
                return COLORS[i];
            })
    }
}
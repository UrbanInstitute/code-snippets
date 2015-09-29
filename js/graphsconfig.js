var data_long;
var data_wide;

var wide_data_url = "data/linerates_wide.csv";
var long_data_url = "data/linerates_long.csv";

//change chart behavior at this size
var MOBILE_THRESHOLD = 600;
//configure in each graph call
var FORMATTER,
    XFORMATTER,
    $GRAPHDIV,
    GROUP,
    GROUPS,
    LINEVAL,
    YEARVAL,
    NUMTICKS,
    COLORS,
    MOBILE_TICKS,
    LABELS,
    linechart_aspect_height,
    linechart_aspect_height_mobile;
var isMobile = false;

//format years as 'XX - useful for some axes, especially on mobile
var yearf = d3.format("02d");

function formatYear(d) {
    if (d >= 2000) {
        return "'" + yearf(Math.abs(2000 - d));
    } else if (d < 2000) {
        return "'" + yearf(Math.abs(1900 - d));
    }
}

/*LINE CHARTS*/
//line chart using wide-format data
function lchart_wide() {
    //id of div
    $GRAPHDIV = $("#linechart_wide");
    COLORS = ["#1696d2", "#fdbf11"];
    //names of the column groups in the same order as the colors you want to draw them with
    GROUPS = ["assaultrate_cl27", "assaultrate_cl29"];
    //column name of X variable
    YEARVAL = "year";
    //how to format axis ticks
    FORMATTER = d3.format(',0f');
    XFORMATTER = formatYear;
    //number of ticks on big and small screens. can be the same.
    NUMTICKS = 14;
    MOBILE_TICKS = 7;
    //leave this.
    isMobile = false;
    //change the height ratio depending on the shape of your graph
    linechart_aspect_height = 0.6;
    linechart_aspect_height_mobile = 1;
    //labels for legend
    LABELS = ["Cluster 27", "Cluster 29"];

    //draw the chart to the div
    linechart_widedata("#linechart_wide");
}
//line chart using long-format data
function lchart_long() {
    //id of div
    $GRAPHDIV = $("#linechart_long");
    COLORS = ["#1696d2", "#fdbf11"];
    //column name of Y variable
    LINEVAL = "assaultrate";
    //column name of grouping variable
    GROUP = "cluster";
    //names of the groups in the same order as the colors you want to draw them with
    GROUPS = [27, 29];
    //column name of X variable
    YEARVAL = "year";
    //how to format Y axis ticks
    FORMATTER = d3.format(',0f');
    XFORMATTER = formatYear;
    //number of ticks on big and small screens. can be the same.
    NUMTICKS = 14;
    MOBILE_TICKS = 7;
    //leave this.
    isMobile = false;
    //change the height ratio depending on the shape of your graph
    linechart_aspect_height = 0.6;
    linechart_aspect_height_mobile = 1;

    //draw the chart to the div
    linechart_longdata("#linechart_long");
}

//call your charts. if just making one chart, you can skip this step
function drawgraphs() {
    lchart_wide();
    lchart_long();
}

//on window load, read your data and draw your charts(s)
$(window).load(function () {
    if (Modernizr.svg) { // if svg is supported, draw dynamic chart
        d3.csv(long_data_url, function (longrates) {
            d3.csv(wide_data_url, function (widerates) {
                data_long = longrates;
                data_wide = widerates;

                drawgraphs();
                window.onresize = drawgraphs;
            });
        });
    }
});
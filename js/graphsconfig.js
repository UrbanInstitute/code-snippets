//depending on the project/data, you'll need to adjust/add some chart elements. these are just a starting place for some standard chart types.

var data_long;
var data_wide;

var wide_data_url = "data/linerates_wide.csv";
var long_data_url = "data/linerates_long.csv";

//change chart behavior at this size
var MOBILE_THRESHOLD = 600;

/*configure these as needed in each graph definition function*/
//where to draw the graph
var $GRAPHDIV,
    $LEGENDDIV,
    /*general*/
    COLORS,
    BREAKS,
    LABELS,
    NUMTICKS,
    MOBILE_TICKS,
    FORMATTER,
    XFORMATTER,
    VAL,
    XVAL,

    /*linechart-specific*/
    GROUP,
    GROUPS,
    LINEVAL,
    YEARVAL,
    linechart_aspect_height,
    linechart_aspect_height_mobile;
var isMobile = false;

var palette = {
    blue5: ["#b0d5f1", "#82c4e9", "#1696d2", "#00578b", "#00152A"],
    yellow5: ["#fff2cf", "#fdd870", "#fdbf11", "#e88e2d", "#ca5800"],
    yellowblue: ["#ca5800", "#fcb918", "#ffedcd", "#d7e8f6", "#1696d2", "#00578b"],
    gray5: ["#ECECEC", "#DCDBDB", "#ccc", "#777", "#000"]
};

//format years as 'XX - useful for some axes, especially on mobile
var yearf = d3.format("02d");

function formatYear(d) {
    if (d >= 2000) {
        return "'" + yearf(Math.abs(2000 - d));
    } else if (d < 2000) {
        return "'" + yearf(Math.abs(1900 - d));
    }
}

/*LEGENDS*/
//linear - no max/min shown
function legend1() {
    $LEGENDDIV = $("#legend1");
    COLORS = palette.blue5;
    BREAKS = [0.2, 0.4, 0.6, 0.8];
    FORMATTER = d3.format("%");
    legend("#legend1")
}

//linear - max/min shown
function legend1_breaks() {
    $LEGENDDIV = $("#legend1_breaks");
    COLORS = palette.yellow5;
    BREAKS = [0, 0.2, 0.4, 0.6, 0.8, 1];
    FORMATTER = d3.format("%");
    legend("#legend1_breaks")
}

//categorical
function legend2() {
    $LEGENDDIV = $("#legend2");
    COLORS = ["#1696d2", "#fdbf11"];
    //labels for legend
    LABELS = ["Cluster 27", "Cluster 29"];
    catlegend("#legend2")
}

/*LINE CHARTS*/
//line chart using wide-format data
function lchart_wide() {
    $GRAPHDIV = $("#linechart_wide");
    COLORS = [palette.blue5[2], palette.yellow5[2]];
    //names of the column groups in the same order as the colors you want to draw them with
    GROUPS = ["assaultrate_cl27", "assaultrate_cl29"];
    //column name of X variable
    YEARVAL = "year";
    //how to format axis ticks
    FORMATTER = d3.format(',0f');
    XFORMATTER = formatYear;
    //number of ticks for big and small divs. can be the same.
    NUMTICKS = 14;
    MOBILE_TICKS = 7;
    //change the height ratio depending on the shape of your graph
    linechart_aspect_height = 0.6;
    linechart_aspect_height_mobile = 1;
    linechart_widedata("#linechart_wide");
}

//line chart using long-format data
function lchart_long() {
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
    //number of ticks for big and divs. can be the same.
    NUMTICKS = 14;
    MOBILE_TICKS = 7;
    //change the height ratio depending on the shape of your graph
    linechart_aspect_height = 0.6;
    linechart_aspect_height_mobile = 1;
    linechart_longdata("#linechart_long");
}

//simple bar chart
function sbar1() {
    $GRAPHDIV = $("#simplebar");
    data = data_wide;
    COLORS = palette.blue5[2];
    VAL = "assaultrate_cl27";
    XVAL = "year";
    FORMATTER = d3.format(",.1f");
    simplebar("#simplebar");
}

//recreating simple bar chart from http://www.urban.org/urban-wire/unintended-consequences-delaying-medicare-and-social-security
function sbar2() {
    $GRAPHDIV = $("#simplebar2");
    //if your data is simple and fixed no need to read from an external file
    data = [{"name":"Medicare Eligibility Age Raised to 67","cost": 369000},{"name":"Medicare Eligibility Age Raised to 70", "cost":1897000}];
    COLORS = palette.blue5[2];
    VAL = "cost";
    XVAL = "name";
    FORMATTER = d3.format("$.3s");
    simplebar("#simplebar2");
}

    //call your charts. if just making one chart, you can skip this step
function drawgraphs() {
    legend1();
    legend1_breaks();
    legend2();
    lchart_wide();
    lchart_long();
    sbar1();
    sbar2();
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
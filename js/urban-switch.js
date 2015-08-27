//for usage with d3 graphics: on clicking the switch, something happens in the graphics (example here - change the text's color)
var show1 = 1;

d3.select("#s1").on("click", function () {
    if (show1 == 1) {
        d3.select("#s1.switch")
            .attr("class", "switch off");
        d3.select("#onoff")
            .style("color", "#F0F0F0");
        show1 = 0;
    } else {
        d3.select("#s1.switch")
            .attr("class", "switch on");
        d3.select("#onoff")
            .style("color", "#666");
        show1 = 1;
    }
});
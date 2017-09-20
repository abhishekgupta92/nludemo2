// drawSteamGraph();

var selectedDate;
var lx;
var ly;
var vertical2;
var inflationValue;

var tooltip = d3v3.select("body")
.append("div")
.style("position", "absolute")
.style("z-index", "10")
.style("visibility", "hidden")
.style("background", "rgba(255,255,255,0)")
.text("a simple tooltip")
.attr("class", "hoverTooltip");

function drawSteamGraph(sdata, target) {
    target = 'fake';
    $('body #commentsIndex').html("");
    // addSearchCard();
    //   $('#sidenav').append(trending2)
      $('#sidenavModified').html('');
      $('#sidenav').prepend(`
                <div class="sidenavModified" id="sidenavModified"></div>
                <div class="box" style="margin: 25px auto;
                    width: 320px;
                    padding: 0px;
                    box-shadow: 0 2px 51px 0 rgba(60, 98, 159, 0.15);" id="savecard">
                    <div style='position: relative; padding: 10px;'><img id="pinmodified" style='position: absolute; top: 24px; right: 22px;' src='../images/ic-pin-red.png'></div>
				<div class="modifiedfirstText" style='font-size: 30px;
    font-weight: 500;
    line-height: 1.17;
    text-align: left;
    padding: 40px;
    color: #3d4351;'>
					What have been the product trends for ABFL in the last 12 months?</div><hr id="modifiedHR" style='margin: 0;'>
                    <div class="save-cancel" style='display: flex; justify-content: space-around; margin-bottom: -14px;'>
                    <button class="modified-cancel" id="modifiedSave" style='outline: none; width: 40%; padding-right: 42px; border: 0px; background: #ffffff; color: orange; height: 48px; border-right: 1px solid #ccc;'>Cancel</button>
                    <button class="modified-save" onclick=ModifiedSave2() id="modifiedSave" style='height:46;'  >Save</button></div></div>`);
     $('#sidenavModified').html(trending2);

    d3v3.select('.selected').html(daily_digest_extended);
    d3v3.select('.notselected1').html(treasury);
    d3v3.select('.notselected2').html(sales_efficiency);
    d3v3.select('.notselected3').html(cross_sell);
    d3v3.select('.notselected4').html(credit_policy2);
    d3v3.select('.notselected5').html(kycauthentication);
    d3v3.select('.notselected6').html(credit_policy1);
    var datearray = [];
    var colorrange = [];

    colorrange = [
        ["238", "#f7edf6", "#ffc900"],
        ["238", "#e1b7dd", "#ffc900"],
        ["247", "#d392cc", "#b01a33"],
        ["244", "#b149a7", "#b149a7"],
        ["250", "#d392cc", "#b01a33"],
        ["251", "#e1b7dd", "#ff9200"],
        ["242", "#f7edf6", "#ffc900"]
    ];

    strokecolor = colorrange[0];

    var format = d3v3.time.format("%m/%d/%y");
    var docWidth = document.body.clientWidth;

    var margin = {
        top: 40,
        right: 0,
        bottom: 30,
        left: 0
    };
    var width = document.body.clientWidth - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    var x = d3v3.time.scale()
    .range([0, width]);

    var y = d3v3.scale.linear()
    .range([height - 10, 0]);

    var z = d3v3.scale.ordinal()
    .range(colorrange);

    var xAxis = d3v3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(5)
    .tickFormat(d3v3.time.format("%b '%y"));

    var yAxis = d3v3.svg.axis()
    .scale(y);
    // .tickFormat(d3v3.formatPrefix(".1", 1e6));
    // .tickFormat(d3v3.format(".0s"));

    var stack = d3v3.layout.stack()
    .offset("silhouette")
    .values(function(d) {
        return d.values;
    })
    .x(function(d) {
        return d.date;
    })
    .y(function(d) {
        return d.metric;
    });

    var nest = d3v3.nest()
    .key(function(d) {
        return d.product;
    });

    var area = d3v3.svg.area()
    .interpolate("cardinal")
    .x(function(d) {
        return x(d.date);
    })
    .y0(function(d) {
        return y(d.y0);
    })
    .y1(function(d) {
        return y(d.y0 + d.y);
    });

    $('#page-wrapper').html("")
    $("#page-wrapper").append('<div class="row"> \
<div id="productName">All Products</div> \
<div class="chart steamgraph"> \
</div> \
</div> \
');

    var svg = d3v3.select(".chart").append("svg");
    var svgDefs = svg.append('defs');

    svg.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    for (var i = 0; i < colorrange.length; i++) {
        var mainGradient = svgDefs.append('linearGradient')
        .attr('id', 'mainGradient' + (i + 1))
        .attr('gradientTransform', "rotate(" + colorrange[i][0] + ")");
        // Create the stops of the main gradient. Each stop will be assigned a class to style the stop using CSS.
        mainGradient.append('stop')
            .attr('stop-color', colorrange[i][1])
            .attr('offset', '5%')
            .attr('stop-opacity', colorrange[i][0]);

        mainGradient.append('stop')
            .attr('stop-color', colorrange[i][2])
            .attr('offset', '95%')
            .attr('stop-opacity', colorrange[i][0]);
    }

    var plotGraph = function(response) {
        var data = response;
        //        var data = JSON.parse("../data/steam-data.json");

        //        function test(){
        //            }
        //                //            console.log(data);}
        console.log(data);
        //        if(target='fake'){
        //            console.log('ok')
        //            data = d3v3.csv("../data/inflation.csv", function(data1){
        //                data1 = data;
        //            });
        //            console.log(data);
        //        }
        //        else{
        //             data = response.rows;
        //        }
        console.log(data);

        data.forEach(function(d) {
            d.date = format.parse(d.date);
            d.metric = +d.metric;
            console.log(d);
        });     

        var layers = stack(nest.entries(data));
        console.log(layers)
        x.domain(d3v3.extent(data, function(d) {
            return d.date;
        }));
        y.domain([0, d3v3.max(data, function(d) {
            return d.y0 + d.y;
        })]);

        var vertical = d3v3.select(".chart")
        .append("div")
        .attr("class", "vertical1")
        .style("position", "absolute")
        .style("z-index", "0")
        .style("opacity", "0.2")
        .style("width", "1px")
        .style("height", parseInt(0.33 * docWidth) + "px")
        .style("top", "280px")
        .style("left", "0px")
        .style("background", "#383f49");

        svg.selectAll(".layer")
            .data(layers)
            .enter().append("path")
            .attr("class", "layer")
            .attr("d", function(d) {
            return area(d.values);
        })
            .style("fill", function(d, i) {
            return "url(#mainGradient" + (i + 1) + ")";
        });
        //      .classed(function(d, i) { return "url(#mainGradient"+i+")"; }, true);
        //      .style("fill", "url(#mainGradient)");
        //      .style("fill", function(d, i) { return z(i); });


        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + 0 + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", "translate(" + docWidth * 0.06 + ", 0)")
            .call(yAxis.orient("left").tickFormat(d3v3.format("s")));
        // .call(yAxis.orient("left").tickFormat(function(d){ return console.log(d); d["text"]; }));
        // .tickFormat(function(d){return d["text"]}));

        //  svg.append("g")
        //      .attr("class", "y axis")
        //      .call(yAxis.orient("left"));

        svg.selectAll(".layer")
            .attr("opacity", 1)
            .on("mouseover", function(d, i) {
            svg.selectAll(".layer").transition()
                .duration(250)
                .attr("opacity", function(d, j) {
                return j != i ? 0.4 : 1;
            })
        })

            .on("mousemove", function(d, i) {
            // mousex = d3v3.mouse(this);
            // mousex = mousex[0];
            // selectedDate = x.invert(mousex);
            // var invertedx = x.invert(mousex);
            // console.log("invertedx", invertedx);
            // invertedx = invertedx.getMonth() + invertedx.getDate();

            // console.log("invertedx", invertedx);
            // var selected = (d.values);

            // console.log("selected", selected);

            // for (var k = 0; k < selected.length; k++) {
            //     console.log
            //     datearray[k] = selected[k].date
            //     datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
            //     console.log("date aarray k", datearray[k]);
            // }

            // mousedate = datearray.indexOf(invertedx);
            // console.log("sab", d, d.values, mousedate);
            // pro = d.values[mousedate].metric;

            d3v3.select(this)
                .classed("hover", true)
                .attr("stroke", strokecolor)
                .attr("stroke-width", "0.5px"),

                $('#productName').html(d.key);

        })
            .on("mouseout", function(d, i) {
            svg.selectAll(".layer")
                .transition()
                .duration(250)
                .attr("opacity", "1");

            $('#productName').html("All Products");

            d3v3.select(this)
                .classed("hover", false)
                .attr("stroke-width", "0px");
        })

        function getMod(a) {
            if (a > 0)
                return a;
            else
                return -1 * a;
        }

        var divs = d3v3.selectAll('.x-axis .tick')[0];
        var xPos = divs.map(function(a) {
            return a.getBoundingClientRect().left;
        });

        var numHeadings = divs.length;
        var selectedIndex = numHeadings / 2;
        updateHeadings(docWidth / 2);

        function updateHeadings(mousex) {
            var disX = xPos.map(function(a) {
                return getMod(a - mousex)
            });
            var newX = disX.indexOf(Math.min.apply(Math, disX));

            if (newX !== selectedIndex) {
                $(".x-axis text").eq(selectedIndex).removeClass("selectedTime");
                selectedIndex = newX;
                $(".x-axis text").eq(selectedIndex).addClass("selectedTime");
            }
        }
        function updateVerticals(mousex) {
            var mousex_1 = mousex[0] + 5;
            vertical.style("left", mousex_1 + "px");
            var mousex_2 = mousex[0];
            selectedDate = x.invert(mousex_2);
            updateHeadings(mousex_2);
            var leftx = -100;

            if(lx) {
                leftx = (299 + (lx(selectedDate) - 244) * (715 - 299) / (601 - 244) );
                vertical2.style("left", leftx + "px");

                // console.log(inflationValue);

                // function findYatX(x, linePath) {
                //      function getXY(len) {
                //           console.log(len);
                //           var point = linePath.getPointAtLength(len);
                //           return [point.x, point.y];
                //      }
                //      var curlen = 0;
                //      console.log(getXY(curlen), x);
                //      while (getXY(curlen)[0] < x) { 
                //         console.log(getXY(curlen), x);
                //         curlen += 0.01;
                //      }
                //      return getXY(curlen);
                // }

                // var findYatXbyBisection = function(x, path, error){
                //   var length_end = path.getTotalLength()
                //     , length_start = 0
                //     , point = path.getPointAtLength((length_end + length_start) / 2) // get the middle point
                //     , bisection_iterations_max = 50
                //     , bisection_iterations = 0

                //   error = error || 0.01

                //   while (x < point.x - error || x > point.x + error) {
                //     // get the middle point
                //     point = path.getPointAtLength((length_end + length_start) / 2)
                //     console.log(point);

                //     if (x < point.x) {
                //       length_end = (length_start + length_end)/2
                //     } else {
                //       length_start = (length_start + length_end)/2
                //     }

                //     // Increase iteration
                //     if(bisection_iterations_max < ++ bisection_iterations)
                //       break;
                //   }
                //   return point.y
                // }

                // console.log(lx(selectedDate), findYatXbyBisection(lx(selectedDate), document.getElementById("myline"), 10)); //, findYatX(lx(selectedDate), document.getElementById("myline")));

                // tooltip.text(inflationValue)
                //     .style("top", 830 + "px")
                //     .style("left", leftx + 3 + "px")
                //     .style("visibility", "visible");
            }
        }

        d3v3.select(".chart")
            .on("mousemove", function() {
            mousex = d3v3.mouse(this);
            updateVerticals(mousex);
        })
            .on("mouseover", function() {
            mousex = d3v3.mouse(this);
            updateVerticals(mousex);
            updateHeadings(mousex);
        });
    };

    if (!sdata) {
        if(target==='fake'){
            d3v3.csv("../data/steam-data.csv", function(response){
                plotGraph(response);
            });
        } else {
            $.ajax({
                type: "POST",
                url: baseApiUrl + 'search',
                data: { "search" : "What have been the product trends for ABFL in the last 12 months?" },
                success: plotGraph
            })
        }
    }
    else {
        console.log('let`s plot');
        plotGraph(sdata);
    }
}

function plotLineGraph() {
    vertical2 = d3v3.select(".chart")
        .append("div")
        .attr("class", "vertical2")
        .style("position", "absolute")
        .style("z-index", "1")
        .style("opacity", "1")
        .style("width", "1px")
        .style("height", "45px")
        .style("top", "840px")
        .style("left", "300px")
        .style("background", "#383f49");

    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 780 + 70 - margin.left - margin.right,
        height = 100 - margin.top - margin.bottom;

    var parseDate = d3v3.time.format("%d-%b-%y").parse;

    lx = d3v3.time.scale()
        .range([0, width]);

    ly = d3v3.scale.linear()
        .range([height, 0]);

    var xAxis = d3v3.svg.axis()
    .scale(lx)
    .orient("bottom")
    .ticks(5)
    .tickFormat(d3v3.time.format("%b"));

    var yAxis = d3v3.svg.axis()
    .scale(ly)
    .orient("left");
    // .ticks(5);

    var valueline = d3v3.svg.line()
    .x(function(d) { return lx(d.date); })
    .y(function(d) { return ly(d.inflation); })
    .interpolate("basis");

    var bisectDate = d3.bisector(function(d) { return d.date; }).left;

    var svg = d3v3.select(".chart")
    .append("svg")
    .attr("class", "lineGraph")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    d3v3.csv("../data/inflation.csv", function(error, data) {

        data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.inflation = +d.inflation;
        });

        data.reverse();

        // Scale the range of the data
        lx.domain(d3v3.extent(data, function(d) { return d.date; }));
        ly.domain([0, d3v3.max(data, function(d) { return d.inflation; })]);


        svg.append("linearGradient")                
            .attr("id", "line-gradient")            
            .attr("gradientUnits", "userSpaceOnUse")    

            .selectAll("stop")                      
            .data([                             
            {offset: "0%", color: "#f5f5fa"},       
            {offset: "28.5%", color: "#f5f5fa"},  
            {offset: "28.5%", color: "#b149a7"},        
            {offset: "78.5%", color: "#b149a7"},        
            {offset: "78.5%", color: "#f5f5fa"},    
            {offset: "100%", color: "#f5f5fa"} 
        ])

            .enter().append("stop")         
            .attr("offset", function(d) { return d.offset; })   
            .attr("stop-color", function(d) { return d.color; });

        // Add the valueline path.
        var maxX = lx(d3v3.extent(data, function(d) { return d.date; })[1]);
        svg.append("path")
            .attr("class", "line").attr("fill","url(#")
            .attr("id", "myline")
            .attr("d", ''+valueline(data)+"L0,"+ly(0)+'L'+maxX+","+ly(0))
            .on("mousemove", function() {
            // var x0 = lx.invert(d3v3.mouse(this)[0]),
            // i = bisectDate(data, x0, 1),
            // d0 = data[i - 1],
            // d1 = data[i],
            // d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            // console.log(d);
            // focus.attr("transform", "translate(" + lx(d.date) + "," + ly(d.inflation) + ")");
            // focus.select("text").text(d.inflation);
        })

        // Add the X Axis
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (margin.left/2) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .attr("class", "inflationHeading")
            .attr("y", -40)
            .text("Inflation");

        // Add the Y Axis
        // svg.append("g")
        //     .attr("class", "y axis")
        //     .call(yAxis);

    });
}
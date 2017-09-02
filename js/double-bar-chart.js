var singleBarChart = barChart("single", undefined, "fake");
var doubleBarChart = barChart("double", undefined, "fake");

// singleBarChart();
// doubleBarChart();

var singleBarChartNBFC = barChart("single");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function barChart(type, sdata, target) {
    return function () {

        $('body #commentsIndex').html("");
        $('#trending2').removeClass("isCalled");
        // $('#sidenavModified').html(trending);
        d3v3.select("#page-wrapper").html("");

        if (type === "double") {
            $("#page-wrapper").append(`<div style="margin-top: 60px; magin-bottom: 40px;"><div class="chartHead" style="width:370px; margin-right: 100px;">
<div class="title">Risk</div>
<div class="description">GNPA%</div>
</div>
<div class="chartHead" style="width:150px; margin-top: -20px">
<div class="vsTitle">vs</div>
</div>
<div class="chartHead">
<div class="title">Return</div>
<div class="description">Good Outstanding INR CR</div>
</div>
</div>
`);
        }

        else {
            $("#page-wrapper").append(`<div style="margin-top: 60px; magin-bottom: 40px;"><div class="chartHead" style="width:370px; margin-right: 100px; margin-left: 35px;">
<div class="title">Return</div>
<div class="description">Good Outstanding INR CR</div>
</div>
</div>
`);
        }

        var labelArea = 200;
        var chart,
            width = 300,
            bar_height = 30,
            height = bar_height * 14;

        var startX = (type === "double") ? width : 0;
        var rightOffset = startX + labelArea + 20;

        var rCol = "return";
        var xTo = d3v3.scale.linear()
            .range([20, width]);
        var y = d3v3.scale.ordinal()
            .rangeBands([20, height]);
        var rCol2 = "return2";
        var xTo2 = d3v3.scale.linear()
            .range([20, width]);

        if (type === "double") {
            var lCol = "risk";
            var lCol2 = "risk2";
            var xFrom = d3v3.scale.linear()
                .range([50, width]);
            var xFrom2 = d3v3.scale.linear()
                .range([50, width]);
        }

        var tooltip = d3v3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("background", "#fff")
            .text("a simple tooltip")
            .attr("class", "hoverTooltip");

        function render(data) {
            console.log(data);
            if (target !== 'fake') {
                data = data['rows'];
            }
            data.forEach(getTypes);

            var chart = d3v3.select("#page-wrapper")
                .append('svg')
                .attr('class', 'biChart ' + type)
                // .attr('class', type)
                .attr('width', labelArea + width + startX + 200)
                .attr('height', height)

            var svg = d3v3.select(".biChart").append("svg");
            var svgDefs = svg.append('defs');

            var margin = {
                top: 40,
                right: 0,
                bottom: 30,
                left: 150
            };

            svg.attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var colorrange = [[["#eb4783"], ["#824bc4"]], [["#fbda61"], ["#eb4783"]]];

            for (var i = 0; i < colorrange.length; i++) {
                var mainGradient = svgDefs.append('linearGradient')
                    .attr('id', 'barGradient' + (i + 1))
                mainGradient.append('stop')
                    .attr('stop-color', colorrange[i][0])
                    .attr('offset', '5%');
                mainGradient.append('stop')
                    .attr('stop-color', colorrange[i][1])
                    .attr('offset', '95%');
            }

            if (type === "double") {
                xFrom.domain(d3v3.extent(data, function (d) {
                    return d[lCol];
                }));

                xFrom2.domain(d3v3.extent(data, function (d) {
                    return d[lCol2];
                }));
            }
            console.log(data);
            y.domain(data.map(function (d) {
                return d.products;
            }));


            xTo.domain(d3v3.extent(data, function (d) {
                return d[rCol];
            }));

            xTo2.domain(d3v3.extent(data, function (d) {
                return d[rCol2];
            }));

            var yPosByIndex = function (d) {
                return y(d.products) + 8;
            };

            var yPosByIndexText = function (d) {
                return y(d.products) + 8 + 5;
                // return y(d.products) + y.rangeBand() / 2;
            };

            var yPosByIndex2 = function (d) {
                return y(d.products) + 28;
            };

            var yPosByIndex2Text = function (d) {
                return y(d.products) + 28 + 5;
                // return y(d.products) + y.rangeBand() / 2;
            };

            if (type === "double") {
                chart.selectAll("rect.left")
                    .data(data)
                    .enter().append("rect")
                    .attr("x", function (d) {
                        return width + 30 - xFrom(d[lCol]);
                    })
                    .attr("y", yPosByIndex)
                    .attr("rx", 5)
                    .attr("ry", 5)
                    .attr("class", "left")
                    .attr("score", function (d) { return d[lCol]; })
                    .attr("width", function (d) {
                        return Math.max(xFrom(d[lCol]) - 30, 0);
                    })
                    .attr("height", 10)
                    .on("mouseover", function (d) {
                        tooltip.text(d[lCol + "Readable"]);
                        return tooltip
                            .style("top", ((yPosByIndexText(d) + 408) + "px"))
                            .style("left", (width - xFrom(d[lCol]) + 65 + 44) + "px")
                            .style("visibility", "visible");
                    })
                    .on("mouseout", function () {
                        return tooltip
                            .style("visibility", "hidden");
                    });

                chart.selectAll("rect.left2")
                    .data(data)
                    .enter().append("rect")
                    .attr("x", function (d) {
                        return width + 30 - xFrom2(d[lCol2]);
                    })
                    .attr("y", yPosByIndex2)
                    .attr("rx", 5)
                    .attr("ry", 5)
                    .attr("class", "left2")
                    .attr("width", function (d) {
                        return Math.max(xFrom2(d[lCol2]) - 30, 0);
                    })
                    .attr("height", 10)
                    .on("mouseover", function (d) {
                        tooltip.text(d[lCol2 + "Readable"]);
                        return tooltip
                            .style("top", ((yPosByIndexText(d) + 428) + "px"))
                            .style("left", (width - xFrom2(d[lCol2]) + 60 + 47) + "px")
                            .style("visibility", "visible");
                    })
                    .on("mouseout", function () {
                        return tooltip
                            .style("visibility", "hidden");
                    });
            }

            chart.selectAll("text.name")
                .data(data)
                .enter().append("text")
                .attr("x", (labelArea / 2) + startX - (type === "double" ? -10 : 30))
                .attr("y", yPosByIndex2)
                .attr("dy", ".20em")
                .attr("text-anchor", type === "double" ? "middle" : "left")
                .attr('class', 'wrap')
                .attr('randomInfo', function (d) { return d.products; })
                .call(wrap, 110);
            // .text(function(d){return d.products;});

            chart.selectAll("rect.right")
                .data(data)
                .enter().append("rect")
                .attr("x", rightOffset)
                .attr("y", yPosByIndex)
                .attr("rx", 5)
                .attr("ry", 5)
                .attr("class", "right")
                .attr("width", function (d) {
                    return xTo(d[rCol]);
                })
                .attr("height", 10)
                .on("mouseover", function (d) {
                    tooltip.text(d[rCol + "Readable"]);
                    return tooltip
                        .style("top", ((yPosByIndexText(d) + 408) + "px"))
                        .style("left", (xTo(d[rCol]) + rightOffset + 72 + (type === "double" ? 30 : 0)) + "px")
                        .style("visibility", "visible");
                })
                .on("mouseout", function () {
                    return tooltip
                        .style("visibility", "hidden");
                })

            chart.selectAll("rect.right2")
                .data(data)
                .enter().append("rect")
                .attr("x", rightOffset)
                .attr("y", yPosByIndex2)
                .attr("rx", 5)
                .attr("ry", 5)
                .attr("class", "right2")
                .attr("width", function (d) {
                    return xTo2(d[rCol2]);
                })
                .attr("height", 10)
                .on("mouseover", function (d) {
                    tooltip.text(d[rCol2 + "Readable"]);
                    return tooltip
                        .style("top", ((yPosByIndexText(d) + 428) + "px"))
                        .style("left", (xTo2(d[rCol2]) + rightOffset + 72 + (type === "double" ? 30 : 0)) + "px")
                        .style("visibility", "visible");
                })
                .on("mouseout", function () {
                    return tooltip
                        .style("visibility", "hidden");
                });

            chart.selectAll("text.score2")
                .data(data)
                .enter().append("text")
                .attr("x", function (d) {
                    return xTo2(d[rCol2]) + rightOffset + 40;
                })
                .attr("y", yPosByIndex2Text)
                .attr("dx", -5)
                .attr("dy", "0.36em")
                .attr("text-anchor", "end")
                .attr('class', 'score')
                .text(function (d) { return d[rCol2]; });

        }

        function wrap(text, width) {
            text.each(function () {
                var text = d3.select(this);
                var sentence = text.attr('randomInfo');
                var words = sentence.split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    x = text.attr("x");
                var y = (sentence.length > 9) ? text.attr("y") - 10 : text.attr("y");
                var dy = 0, //parseFloat(text.attr("dy")),
                    tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");
                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
                    }
                }
            });
        }


        function getTypes(d) {
            if (type === "double") {
                d[lCol] = +d[lCol];
                d[lCol2] = +d[lCol2];
                // d[lCol+"Readable"] = d[lCol+"Readable"];
                // d[lCol2+"Readable"] = d[lCol2+"Readable"];
            }

            d[rCol] = +d[rCol];
            d[rCol2] = +d[rCol2];
            // d[rCol+"Readable"] = d[rCol+"Readable"];
            // d[rCol2+"Readable"] = d[rCol2+"Readable"];
            return d;
        }

        if (!sdata) {
            if (target === "fake") {
                console.log('ok')
                d3v3.csv("../assets/un.csv", function (response) {
                    render(response);
                });
            } else {
                $.ajax({
                    type: "POST",
                    url: baseApiUrl + 'search',
                    data: { "search": "The returns of unsecured lending" },
                    success: render
                });
            }
        }
        else {
            render(sdata);
        }
    }
}
drawSteamGraph("../data/steam-data.csv");

function drawSteamGraph(csvpath) {
    console.log('okk',csvpath);
    var datearray = [];
    var colorrange = [
        ["242deg", "#f4760a", "#f4760a"],
        ["251deg", "#dd8819", "#ff9200"],
        ["250deg", "#d36e1f", "#b01a33"],
        ["244deg", "#c50052", "#920029"],
        ["238deg", "#f4760a", "#ffc900"],
        ["247deg", "#d36e1f", "#b01a33"],
        ["238deg", "#f4760a", "#ffc900"]
    ];

    strokecolor = colorrange[0];

    var format = d3.timeFormat("%m/%d/%y");
    var docWidth = document.body.clientWidth;

    var margin = {
        top: 40,
        right: 0,
        bottom: 30,
        left: 0
    };

	var width = document.body.clientWidth - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "remove")
        .style("opacity", "0.2")
        .style("background-color", "#383f49")
        .style("position", "absolute")
        .style("z-index", "1")
        .style("visibility", "hidden")
        .style("top", "30px")
        .style("left", "55px");

    var x = d3.scaleTime()
        .range([100, width-100]);

    var y = d3.scaleLinear()
        .range([height - 10, 0]);

    var xAxis = d3.axisBottom()
        .scale(x)
        .ticks(5); //kya hi hai yeh
	
    var yAxis = d3.axisLeft()
        .scale(y);

    var svg = d3.select(".chart").append("svg");
    var svgDefs = svg.append('defs');

    svg.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    for (var i = 0; i < colorrange.length; i++) {
        var mainGradient = svgDefs.append('linearGradient').attr('id', 'mainGradient' + (i + 1));
        // Create the stops of the main gradient. Each stop will be assigned a class to style the stop using CSS.
        mainGradient.append('stop')
            .attr('stop-color', colorrange[i][1])
            .attr('offset', '5%');
        mainGradient.append('stop')
            .attr('stop-color', colorrange[i][2])
            .attr('offset', '95%');
    }

    var data = [{"date":"2013-01-07T18:30:00.000Z","AR":0.1,"DJ":0.35,"MS":0.21,"RC":0.1,"CG":0.1,"RI":0.1},{"date":"2013-01-08T18:30:00.000Z", 		"AR":0.15,"DJ":0.36,"MS":0.25,"RC":0.15,"CG":0.15,"RI":0.15},{"date":"2013-01-09T18:30:00.000Z", 		"AR":0.35,"DJ":0.37,"MS":0.27,"RC":0.35,"CG":0.35,"RI":0.35},{"date":"2013-01-10T18:30:00.000Z", 		"AR":0.38,"DJ":0.22,"MS":0.23,"RC":0.38,"CG":0.38,"RI":0.38},{"date":"2013-01-11T18:30:00.000Z", 		"AR":0.22,"DJ":0.24,"MS":0.24,"RC":0.22,"CG":0.22,"RI":0.22},{"date":"2013-01-12T18:30:00.000Z", 		"AR":0.16,"DJ":0.26,"MS":0.21,"RC":0.16,"CG":0.16,"RI":0.16},{"date":"2013-01-13T18:30:00.000Z", 		"AR":0.07,"DJ":0.34,"MS":0.35,"RC":0.07,"CG":0.07,"RI":0.07},{"date":"2013-01-14T18:30:00.000Z", 		"AR":0.02,"DJ":0.21,"MS":0.39,"RC":0.02,"CG":0.02,"RI":0.02},{"date":"2013-01-15T18:30:00.000Z", 		"AR":0.17,"DJ":0.18,"MS":0.4,"RC":0.17,"CG":0.17,"RI":0.17},{"date":"2013-01-16T18:30:00.000Z", 		"AR":0.33,"DJ":0.45,"MS":0.36,"RC":0.33,"CG":0.33,"RI":0.33},{"date":"2013-01-17T18:30:00.000Z", 		"AR":0.4,"DJ":0.32,"MS":0.33,"RC":0.4,"CG":0.4,"RI":0.4},{"date":"2013-01-18T18:30:00.000Z", 		"AR":0.32,"DJ":0.35,"MS":0.43,"RC":0.32,"CG":0.32,"RI":0.32},{"date":"2013-01-19T18:30:00.000Z", 		"AR":0.26,"DJ":0.3,"MS":0.4,"RC":0.26,"CG":0.26,"RI":0.26},{"date":"2013-01-20T18:30:00.000Z", 		"AR":0.35,"DJ":0.28,"MS":0.34,"RC":0.35,"CG":0.35,"RI":0.35},{"date":"2013-01-21T18:30:00.000Z", 		"AR":0.4,"DJ":0.27,"MS":0.28,"RC":0.4,"CG":0.4,"RI":0.4},{"date":"2013-01-22T18:30:00.000Z", 		"AR":0.32,"DJ":0.26,"MS":0.26,"RC":0.32,"CG":0.32,"RI":0.32},{"date":"2013-02-23T18:30:00.000Z", 		"AR":0.26,"DJ":0.15,"MS":0.37,"RC":0.26,"CG":0.26,"RI":0.26},{"date":"2013-02-24T18:30:00.000Z", 		"AR":0.22,"DJ":0.3,"MS":0.41,"RC":0.22,"CG":0.22,"RI":0.22},{"date":"2013-02-25T18:30:00.000Z", 		"AR":0.16,"DJ":0.35,"MS":0.46,"RC":0.16,"CG":0.16,"RI":0.16},{"date":"2013-02-26T18:30:00.000Z", 		"AR":0.22,"DJ":0.42,"MS":0.47,"RC":0.22,"CG":0.22,"RI":0.22},{"date":"2013-02-27T18:30:00.000Z", 		"AR":0.1,"DJ":0.42,"MS":0.41,"RC":0.1,"CG":0.1,"RI":0.1}]
		
	baseKey = "date";
	keys = Object.keys(data[0]).filter(function(a) { return a!==baseKey; });
//		var parseTime = d3.timeParse("%m/%d/%y");
//		
//        data.forEach(function(d) {
//            d[baseKey] = parseTime(d.date);
//			console.log(d[baseKey]);
//            for (var a=0; a<keys.length; a++) {
//				var key = keys[a];
//				d[key] = +d[key];
//			}
//        });
		
	var n = keys.length; //number of layers
	var m = data.length;

	var stack = d3.stack()
		.keys(keys)
		.order(d3.stackOrderNone)
		.offset(d3.stackOffsetSilhouette);

	var layers = stack(data);

	var x = d3.scaleLinear()
		.domain([0, m - 1])
		.range([0, width]);

	function stackMax(layer) {
		return d3.max(layer, function(d) { return d[1]; });
	}

	function stackMin(layer) {
		return d3.min(layer, function(d) { return d[0]; });
	}

	var y = d3.scaleLinear()
		.domain([d3.min(layers, stackMin), d3.max(layers, stackMax)])
		.range([height, 0]);

//	var z = d3.interpolateCool;

	var area = d3.area()
		.x(function(d, i) { return x(i); })
		.y0(function(d) { return y(d[0]); })
		.y1(function(d) { return y(d[1]); });

	svg.selectAll("path")
		.data(layers)
		.enter().append("path")
		.attr("d", area)
		.attr("fill", function(d, i) {
			return "url(#mainGradient" + (i + 1) + ")";
		});

//	d3.selectAll("path")
//		.data(layers)
//		.transition()
//		.duration(2500)
//		.attr("d", area);
		
//	x.domain(d3.extent(data, function(d) {
//		return d.date;
//	}));
//	
//	y.domain([0, d3.max(data, function(d) {
//		return d.y0 + d.y;
//	})]);

	var vertical = d3.select(".chart")
		.append("div")
		.attr("class", "remove")
		.style("position", "absolute")
		.style("z-index", "0")
		.style("opacity", "0.2")
		.style("width", "1px")
		.style("height", parseInt(0.36 * docWidth) + "px")
		.style("top", "280px")
		.style("left", "0px")
		.style("background", "#383f49");

	
//	svg.selectAll(".layer")
//		.data(layers)
//		.enter().append("path")
//		.attr("class", "layer")
//		.attr("d", area)

	svg.append("g")
		.attr("class", "x-axis")
		.attr("transform", "translate(0," + 0 + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "y-axis")
		.attr("transform", "translate(" + docWidth * 0.06 + ", 0)")

	svg.selectAll(".layer")
		.attr("opacity", 1)
		.on("mouseover", function(d, i) {
			svg.selectAll(".layer").transition()
				.duration(250)
				.attr("opacity", function(d, j) {
					return j != i ? 0.9 : 1;
				})
		})
		.on("mousemove", function(d, i) {
			mousex = d3.mouse(this);
			mousex = mousex[0];
			var invertedx = x.invert(mousex);
			invertedx = invertedx.getMonth() + invertedx.getDate();
			var selected = (d.values);
			
			console.log('mo');
		
			for (var k = 0; k < selected.length; k++) {
				datearray[k] = selected[k].date
				datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
			}

			mousedate = datearray.indexOf(invertedx);
			pro = d.values[mousedate].value;

			d3.select(this)
				.classed("hover", true)
				.attr("stroke", strokecolor)
				.attr("stroke-width", "0.5px"),
				tooltip.html("<p>" + d.key + "<br>" + pro + "</p>").style("visibility", "visible");

			$('#productName').text(d.key);

		})
		.on("mouseout", function(d, i) {
			svg.selectAll(".layer")
				.transition()
				.duration(250)
				.attr("opacity", "1");

			$('#productName').text("All Products");

			d3.select(this)
				.classed("hover", false)
				.attr("stroke-width", "0px"), tooltip.html("<p>" + d.key + "<br>" + pro + "</p>").style("visibility", "hidden");
		})

		function getMod(a) {
            if (a > 0)
                return a;
            else
                return -1 * a;
        }

//        var divs = d3.selectAll('.x-axis .tick')[0];
//        var xPos = divs.map(function(a) {
//            return a.getBoundingClientRect().left;
//        })
//        var numHeadings = divs.length;
//        var selectedIndex = numHeadings / 2;
//        updateHeadings(docWidth / 2);

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
	
        d3.select(".chart")
            .on("mousemove", function() {
                mousex = d3.mouse(this);
                mousex = mousex[0] + 5;
                vertical.style("left", mousex + "px");
//                updateHeadings(mousex);
            })
            .on("mouseover", function() {
                mousex = d3.mouse(this);
                mousex = mousex[0] + 5;
                vertical.style("left", mousex + "px");
//                updateHeadings(mousex);
            });
}
// Grab the width of the containing box
var width = parseInt(d3.select("#scatter").style("width"));

// Designate the height of the graph
var height = width - width / 3.9;

// Margin spacing for graph
var margin = 20;

//space for placing words
var labelArea = 110;

// padding for the text at the bottom and left axes
var tPadBot = 40;
var tPadLeft = 40;

//Create the actual canvas for the graph
var svg = d3
	.select("#scatter")
	.append("svg")
	.attr("width", width)
	.attr("height", height)
	.attr("class", "chart");

// Set the radius for each dot that will appear in the graph
// Note: Making this a function allows us to easily call
// it in the mobility section of our code.
var circRadius;
function crGet() {
	if (width <= 530) {
		circRadius = 5;
	}
	else {
		circRadius = 10;
	}
}
crGet();

// The Labels for our Axes

// A) Bottom Axis
// ==============

// We create a group element to nest our bottom axes labels.
svg.append("g").attr("class","xText");
// xText will allow us to select the group without excess code
var xText = d3.select(".xText");

// We give xText a transform property that places it at the bottom of the chart.
// By nesting this attribute in a function, we can easily change the location of the label group
// whenever the width of the window changes.
function xTextRefresh() {
	xText.attr(
		"transform",
		"translate(" +
		((width - labelArea) / 2 + labelArea) +
		", " +
		(height - margin - tPadBot) +
		")"
	);
}
xTextRefresh();

// Now we use XText to append three text SVGs, with y coordinates sp
// 1. Poverty
xText
	.append("text")
	.attr("y", -26)
	.attr("data-name", "poverty")
	.attr("data-axis", "x")
	.attr("class", "aText active x")
	.text("In Poverty (%)");

// 2. Age
xText
	.append("text")
	.attr("y", 0)
	.attr("data-name", "age")
	.attr("class", "aText inactive x")
	.text("Age (Median)");

// 3. Income
xText
	.append("text")
	.attr("y", 26)
	.attr("data-name", "income")
	.attr("data-axis", "x")
	.attr("class", "aText inactive x")
	.text("Household Income (Median)");

// B) Left Axis
// ============

// Specifying the variables like this allows us to make our transform 
var leftTextX = margin + tPadLeft;
var leftTextY = (height + labelArea) / 2 - labelArea;

// We add a second label group, this time for the axis left of the chart.
svg.append("g").attr("class","yText");

// yText will allows us to select group without excess code.
var yText = d3.select(".yText");

// Like before, we nest the group's transform attr in a function
// to make changing it on window change an easy operation
function yTextRefresh() {
	yText.attr(
	"transform",
	"translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
	);
}
yTextRefresh();

// Now we append the text.
// 1. Obesity
yText
	.append("text")
	.attr("y", -26)
	.attr("data-name","obesity")
	.attr("data-axis","y")
	.attr("class", "aText active y")
	.text("Obese (%)");

// 2. Smokes
yText
	.append("text")
	.attr()

// 3. Lacks Healthcare
yText
	.append

// 2. Import our .csv files
// ========================
// This data file includes 
//	and measurements from health
// by

// Import our CSV data with d3's .csv import method.
d3.csv("assets/data/data.csv", function(data){
	// Visualize the data
	visualize(data);
});

// 3. Create our visualization 
// ===========================
// We called a "visualize" function on the data obtained with d3's .csv method.
// This function handles the visualization
function visualize(theData){
	// Part 1: Essential Local Variables and Functions
	// ===============================================
	// curX and curY will determine what data get's represented in each axis

}

// 4. Dynamize the Graph
// ============================================
// This section will allow the user to click on any label
// and display the data it references.

// Select all axis text and addthi d3 click event
d3.selectAll(".aText").on("click")
	// Make sure we save a selection of the clicked text,
	// so we can reference it without typing outthe invoker each time.
	var self = d3.select(this);

	// We only want to run this on inactive labels.
	// It's a wast of the processor to execute the function
	// if the data is already displayed on the graph.
	if (self.classed("inactive")) {
		// Grab the name and axis saved in label.
		var axis = self.attr("data-axis");
		var name = self.attr("data-name");

		// When x is the saved axis, execute this:
		if (axis === "x") {
			// Make curX the same as the data name.
			curX = name;

			// Change the min and max of the x-axis
			xMinMax();

			//Update the domain of x.
			xScale.domain([xMin, xMax]);

			// Now use a transition when we update the xAxis.
			svg.select(".xAxis").transition().duration(300).call(xAxis);

			// With the axis changed, 
			d3.selectAll("circle").each
				// Each state circle
				// This will lend
				// from it's original
				d3
				  .select(this)
				  .transition()
				  .attr("cx", function(d) {
				  	return xScale(d[curX]);
				  })
				  .duration(300);
			});
			
			// We need change the location 
			d3.selectAll(".stateText").each
				// We give each state text
				d3
					.select(this)
					.transition()
					.attr("dx", function(d){
						return xScale(d[curX]);
					})
					.duration(300);
			});

			// Finally, change the classes of the last active label and the clicked label.
			labelChange(axis, self);
			}
			else {
				// When y is the saved 
				// Make curY the same
				curY = name;

				// Change the min and max of the y-axis.
				yMinMax();

				// Update the domain of y.
				yScale.domain([yMin, yMax]);

				// Update Y Axis
				svg.select(".yAxis").transition().duration(300).call(yAxis);

				// With the axis changed, let's update the location of the state circles.
				d3.selectAll("circle").each(function() {
					// Each state circle gets a transition for it's new attribute.
					// This will lend the circle a motion tween
					// from it's original spot
					d3
						.select(this)
						.transition()
						.attr("dy", function)
				});
			}

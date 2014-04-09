/*
<div class="level level-default level-lg" data-value="205" data-post=".26" data-pre="$"><div>

	The javascript inserts two two elements... 
	
	<div class="level-value">		// div for the dark-colored level.
		<label>...</label>			// text
	</div>

	The height of level-value is set to the percentage.
	The label is offset (negative) to compensate for the height of the level-value

	classes
	-------
	level			The main hook
	level-default	Color scheme (level-warning, -danger, -info, etc.)
	level-lg		Size (xs, sm, lg, xl). No size specified is default (medium)

	
	attributes
	----------
	data-value		The value for the pie chart, base 100.
					This also becomes the label if none is specified.
	data-pre		Text to append to the front of the main label
	data-post		Text to append to the end of the main label
	data-no-border	A flag for eliminating the border of the circle
*/
$(document).ready(function() {
	$(".level").each(function() {
		
	// Get attributes
		var height = $(this).height();
		var val = $(this).attr("data-value");
		var noBorder = $(this).attr("data-no-border");
		
	// Calculate the height of the level
		var levelHeight = height - (val/100 * height);
		var labelHeight = levelHeight;
		
	// <label>
		var label = $(this).attr("data-label");
		if (label == undefined) label = val;
		
		var pre = $(this).attr("data-pre");
		if (pre == undefined) pre = "";
		
		var post = $(this).attr("data-post");
		if (post == undefined && $(this).attr("data-label") == undefined) post = "%";
		else if (post == undefined) post = "";
		
		var label = pre + "<em>" + label + "</em>" + post;
		var labelhtml = "<label style='position: relative; top:-" + labelHeight + "px; left: 0;'>" + label + "</label>";
	
	// span.level-value
		var spanhtml = "<span class='level-value'>" + labelhtml + "</span>";
		
	// No border?
		var noBorderAdjust = 0;
		if (noBorder != undefined && noBorder != "false") {
			noBorderAdjust = parseInt($(this).css('border-width')) * 2;
			$(this).css('border-width', 0);
		}
		var borderWidth = $(this).css('border-width');
		
	// Append HTML
		$(this).append(spanhtml);
		
	// Find new div and set height
		var valuediv = $(this).children('.level-value');
		valuediv.width(height + noBorderAdjust)
		
	// change offset (animate)
		var offset = valuediv.offset();
		offset.top += levelHeight;
		valuediv.offset(offset);
	});
});
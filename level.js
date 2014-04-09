/*
	We start with the main div:

	<div class="level level-default level-lg" data-value="205" data-post=".26" data-pre="$"><div>
	
	This div is styled by css to create the 'outer' circle.
	
	The javascript inserts two two elements within this div... 
	
	<div class="level-value">		// div for the dark-colored level.
		<label>...</label>			// text
	</div>

	The height of div.level-value is set to the percentage.
	The top of label is offset (negative) to compensate for the height of the level-value

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
		var label = $(this).attr("data-label");
		var post = $(this).attr("data-post");
		var pre = $(this).attr("data-pre");
	
	// Calculate the height of the level
		var levelHeight = height - (val/100 * height);
		var labelHeight = levelHeight;
	
	// Compose html
		// fn - creates <label>
		var labelHtml = createLabelHtml(val, label, pre, post, labelHeight)
		console.log(labelHtml)
		// span.level-value
		var spanhtml = "<span class='level-value'>" + labelHtml + "</span>";
		
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
	
	/*
		<label> is composed of three parts:
		the main 'label' part is styled differently:
		
		pre<em>label</em>post
		
		pre		label	post
		$     	56    	.90		= $56.90
	*/
	function createLabelHtml(val, label, pre, post, height) {
		
		// Default post is a '%',
		// 	but only if label is blank too
		if (post == undefined && label == undefined) post = "%";
		else if (post == undefined) post = "";
		
		// Default label is the value
		if (label == undefined) label = val;
		
		// No default for pre
		if (pre == undefined) pre = "";
		
		// compose the html
		var label = pre + "<em>" + label + "</em>" + post;
		var labelhtml = "<label style='position: relative; top:-" + height + "px; left: 0;'>" + label + "</label>";
		
		return labelhtml;
	}
$(document).ready(function() {
	$(".level").each(function() {
		
	// Get attributes
		var height = $(this).height();
		var val = $(this).attr("data-value");
		var noBorder = $(this).attr("data-no-border");
		
	// Calculations...
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
	
	// <span>.level-value
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
		
		var valuediv = $(this).children('.level-value');
		// set height
		//valuediv.height(height)
		console.log(height, noBorderAdjust)
		valuediv.width(height + noBorderAdjust)
		
	// change offset (animate)
		var offset = valuediv.offset();
		//offset.left += borderWidth;
		offset.top += levelHeight;
		valuediv.offset(offset);
		
	});
});
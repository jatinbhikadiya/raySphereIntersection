
/* Since multiple examples use the same drawing board, I am consolidating the 
 * common code for drawing and labeling the axes.  Note this is not general 
 * purpose code, and is instead highly depedent upon assumptions about the context
 * object associated with the drawing board - which is assumed to be 600 by 400 pixels
 * with a 10 pixels per one drawing board unit and an origin at the center. And one
 * more thing, with the vertical axis going up with positive values.
 * 
 * The next code is for drawing the axes on the drawingboard.
 * 
 * The number axes function is a bit awkward. The drawing canvas has been
 * configured to make drawing clear in the sense that the origin is at the
 * center and the vertical axis goes up with positive. Unfortunately, that is
 * not the default. So, here, when placing text, we undo our careful
 * configuration relative to scaling and sense of vertical in order to get
 * better precision over our text.
 * 
 */

function drawAxes(ctx) {
	ctx.save();
	ctx.lineWidth = "0.5";
	ctx.fillStyle = "white";
	ctx.strokeStyle = "white";
	ctx.beginPath();
	ctx.moveTo(-30, 0);
	ctx.lineTo(30, 0);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(0, -20);
	ctx.lineTo(0, 20);
	ctx.stroke();
	numberAxes(ctx);
	ctx.restore();
}

function numberAxes(ctx) {
	ctx.font = "12px Arial";
	ctx.scale(0.1, -0.1);
	var indxs = [ -25, -20, -15, -10, -5, 5, 10, 15, 20, 25 ];
	for ( var i = 0; i < indxs.length; ++i) {
		var s = indxs[i];
		ctx.fillText(s, s * 10, 2 * 10);
	}
	var indxs = [ -15, -10, -5, 5, 10, 15 ];
	for ( var i = 0; i < indxs.length; ++i) {
		var s = indxs[i];
		ctx.fillText(s, 1 * 10, -s * 10 + 1);
	}
}

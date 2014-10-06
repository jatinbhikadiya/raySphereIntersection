function drawIt() {
	var cx = document.enter.cx.value;
	var cy = document.enter.cy.value;
	var radius = document.enter.radius.value;
	var startx = document.enter.startx.value;
	var starty = document.enter.starty.value;
	var stopx = document.enter.stopx.value;
	var stopy = document.enter.stopy.value;

	//drawCanvas(0.75, 0.5);
	drawSphere(cx, cy, radius);
	drawRay(startx, starty, stopx, stopy);
}

function drawSphere(cx, cy, radius) {
	cntxt.save();
	//cntxt.transform(1.0, 0.0, 0.0, 1.0, cx, cy)
	cntxt.beginPath();
	//cntxt.fillStyle = "Green";
	//cntxt.arc(0.125, 0.125, 0.025, 0.00 * Math.PI, 2.00 * Math.PI, false);
	cntxt.arc(cx, cy, radius, 0.00 * Math.PI, 2.00 * Math.PI, false);
	cntxt.stroke();
	cntxt.fillStyle = "Blue";
	cntxt.font = "10px Arial";
	//cntxt.fillText("Drawing a circle at (" + cx + ", " + cy + ") with radius: "
		//	+ radius, 20, 10);
	cntxt.restore();

	//htmletxt = document.getElementById("contents");
	//htmletxt.innerHTML += "Drawing a circle at (" + cx + ", " + cy + ") with radius: " + radius;

}

function drawCircle(cx, cy, radius) {
	cntxt.save();
	htmletxt = document.getElementById("contents");
	htmletxt.innerHTML += "Drawing a circle at (" + cx + ", " + cy
			+ ") with radius: " + radius;
	cntxt.restore();

}

function reDraw() {
	ox = document.enter.ox.value;
	oy = document.enter.oy.value;
	oz = document.enter.oz.value;
	radius = document.enter.radius.value;

	ex = document.enter.ex.value;
	ey = document.enter.ey.value;
	ez = document.enter.ez.value;

	px = document.enter.px.value;
	py = document.enter.py.value;
	pz = document.enter.pz.value;

	var redraw_msg = " Redraw " + w + " " + h;

	translateTo2D()
	
	
	//alert(redraw_msg);
	cntxt.setTransform(1, 0, 0, -1, 0, h);
	cntxt.clearRect(0, 0, w, h);
	drawSphere(ox, oy, radius);
	drawRay(ex, ey, px, py);
}

function drawRay(startx, starty, stopx, stopy) {
	cntxt.save()
	cntxt.moveTo(startx, starty);
	//cntxt.lineTo(stopx*100, stopy*100);
	var line = new Line(startx, starty, stopx, stopy);
	// draw the line
	line.drawWithArrowheads(cntxt);
	var line2 = new Line(stopx, stopy, stopx * 1000, stopy * 1000);
	// draw the line
	line.drawWithArrowheads(cntxt);
	line2.drawWithArrowheads(cntxt);
	//cntxt.stroke();
	cntxt.restore()
}

function translateTo2D(){
	axisX =$V([ox-ex, oy-ey, oz-ez]);

	axisX = axisX.toUnitVector();

	vecR = $V([px-ex,py-ey,pz-ez]);
	

	vecR = vecR.toUnitVector();

	var axisZ = axisX.cross(vecR);

	axisZ = axisZ.toUnitVector();

	var axisY = axisZ.cross(axisX);

	alert("axisX.axisY ="+ axisX.dot(axisY) +" axisY.axisZ ="+ axisY.dot(axisZ) +" axisX.axisZ ="+ axisX.dot(axisZ) )
	alert("X :[ "+axisX.e(1)+" "+axisX.e(2)+" "+ axisX.e(3) +"] \n Y :[ "+axisY.e(1)+" "+axisY.e(2)+" "+ axisY.e(3) +"] \n Z :[ "+axisZ.e(1)+" "+axisZ.e(2)+" "+ axisZ.e(3)+"]" )
	cntxt.restore();

	
}


function Line(x1, y1, x2, y2) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
}
Line.prototype.drawWithArrowheads = function(ctx) {

	// arbitrary styling
	ctx.strokeStyle = "blue";
	ctx.fillStyle = "blue";
	ctx.lineWidth = 1;

	// draw the line
	ctx.beginPath();
	ctx.moveTo(this.x1, this.y1);
	ctx.lineTo(this.x2, this.y2);
	ctx.stroke();

	// draw the starting arrowhead
	var startRadians = Math.atan((this.y2 - this.y1) / (this.x2 - this.x1));
	startRadians += ((this.x2 > this.x1) ? -90 : 90) * Math.PI / 180;
	//this.drawArrowhead(ctx,this.x1,this.y1,startRadians);
	// draw the ending arrowhead
	var endRadians = Math.atan((this.y2 - this.y1) / (this.x2 - this.x1));
	endRadians += ((this.x2 > this.x1) ? 90 : -90) * Math.PI / 180;
	this.drawArrowhead(ctx, this.x2, this.y2, endRadians);
}
Line.prototype.drawArrowhead = function(ctx, x, y, radians) {
	ctx.save();
	ctx.beginPath();
	ctx.translate(x, y);
	ctx.rotate(radians);
	ctx.moveTo(0, 0);
	ctx.lineTo(5, 20);
	ctx.lineTo(-5, 20);
	ctx.closePath();
	ctx.restore();
	ctx.fill();
}

function init() {
	br = "<br>"
	dboard = document.getElementById("dboard");
	cntxt = dboard.getContext('2d');
	w = dboard.width;
	h = dboard.height;
	//cntxt.setTransform(h, 0.0, 0.0, -h, 0.0, h);
	//cntxt.lineWidth=0.01;
	reDraw();
}

/***********************************************************/

/* Building on previous examples, here is rotation about the origin.
 * 
 * Ross    9/5/2013
 */

var vtsrm = $M([ [ 6, 16, 1 ], [ 4, 16, 1 ], [ 4, 4, 1 ], [ 12, 4, 1 ] ]);
var vts = vtsrm.transpose();
var mtrot; /* this will become the rotation matrix */
var mttfw; /* this will become the translation forward */
var mttbk; /* this will become the translation backward */
var mt; /* this will become the composition of the three above */
var vtsa; /* this will become the vertices after translation */

function drawFigure(color, vm) {
	contxt.save();
	contxt.strokeStyle = color;
	contxt.beginPath();
	contxt.moveTo(vm.e(1, 1), vm.e(2, 1));
	contxt.lineTo(vm.e(1, 2), vm.e(2, 2));
	contxt.lineTo(vm.e(1, 3), vm.e(2, 3));
	contxt.lineTo(vm.e(1, 4), vm.e(2, 4));
	contxt.stroke();
	contxt.restore();
}

/*
 * Start here to embelish the use of the sylvester matrix library. In
 * particular, construct a 2D homogeneous translation matrix
 */

function matRotate2D(theta) {
	var c = Math.cos(theta * Math.PI / 180);
	var s = Math.sin(theta * Math.PI / 180);
	return $M([ [ c, -s, 0 ], [ s, c, 0 ], [ 0, 0, 1 ] ]);
}

function matTranslate2D(dx, dy) {
	return $M([ [ 1, 0, dx ], [ 0, 1, dy ], [ 0, 0, 1 ] ]);
}

/*
 * Build up the equation in close to natural linear algebraic form using
 * matrices
 * 
 */

function formatEquation() {
	eq1 = document.getElementById('eq1');
	eq1.innerHTML = mat2html(vtsa) + "<span> = </span>" + mat2html(mttbk)
			+ mat2html(mtrot) + mat2html(mttfw) + mat2html(vts);
	eq2 = document.getElementById('eq2');
	eq2.innerHTML = mat2html(vtsa) + "<span> = </span>" + mat2html(tm)
			+ mat2html(vts);
}

function moveit() {
	contxt.clearRect(-30, -20, 60, 40);
	drawAxes(contxt);
	drawFigure("yellow", vts);
	theta = parseInt(document.enter.theta.value);
	cx = parseInt(document.enter.cx.value);
	cy = parseInt(document.enter.cy.value);
	mtrot = matRotate2D(theta);
	mttfw = matTranslate2D(-cx, -cy);
	mttbk = matTranslate2D(cx, cy);
	tm = mttbk.x(mtrot.x(mttfw));
	vtsa = tm.x(vts);
	drawFigure("green", vtsa);
	formatEquation();
}

/*
 function init() {
 drawingboard = document.getElementById("drawingboard");
 contxt = drawingboard.getContext('2d');
 // Move the origin to center of 600 by 400 drawingboard
 contxt.translate(300, 200);
 // Ten pixels on screen equals on unit in canvas coordinates
 contxt.scale(10, -10);
 moveit();
 }
 */

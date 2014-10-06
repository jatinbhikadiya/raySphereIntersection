var ox // X coordinate of Sphere Center
var oy // Y coordinate of Sphere Center
var oz // Z coordinate of Sphere Center
var radius// radius of Sphere

var ex // X coordinate of Ray Origin
var ex // Y coordinate of Ray Origin
var ex // Z coordinate of Ray Origin

var px // X coordinate of Point on Ray
var px // Y coordinate of Point on Ray
var px // Z coordinate of Point on Ray

var vecR // Ray direction




/*function drawIt() {
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
*/

//This function draws sphere

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



// This function is main Draw function which will be called everytime any value is updated.
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
	drawLine(ex,ey,ox,oy);
}


//This function draws ray 

function drawRay(startx, starty) {
	cntxt.save()
	cntxt.moveTo(startx, starty);
	//cntxt.lineTo(stopx*100, stopy*100);
	var line = new Line(startx, starty, vecR.e(1) * 100, vecR.e(2) * 100);
	// draw the line
	line.drawWithArrowheads(cntxt);
	var line2 = new Line(vecR.e(1) * 100, vecR.e(2) * 100, vecR.e(1) * 10000, vecR.e(2) * 10000);
	// draw the line
	line.drawWithArrowheads(cntxt);
	line2.drawWithArrowheads(cntxt);
	//cntxt.stroke();
	cntxt.restore()
}

function drawLine(startx,starty,stopx,stopy){
	cntxt.save()
	cntxt.beginPath();
	cntxt.moveTo(startx, starty);
	cntxt.lineTo(stopx, stopy);
	cntxt.stroke();
	cntxt.restore();	
}

//This function finds new projecting matrix which will translate over 3D points to 2D points. The vector from ray origin to sphere center is X axis in new coordinate system. 
//Vector perpendicular to X axis and Ray direction is Z axis for new coordinate system. Y axis cross product of X axis and Z axis.
function translateTo2D(){
	axisX =$V([ox-ex, oy-ey, oz-ez]);

	axisX = axisX.toUnitVector();

	vecR = $V([px-ex,py-ey,pz-ez]);
	

	vecR = vecR.toUnitVector();

	var axisZ = axisX.cross(vecR);

	axisZ = axisZ.toUnitVector();

	var axisY = axisZ.cross(axisX);

	//alert("axisX.axisY ="+ axisX.dot(axisY) +" axisY.axisZ ="+ axisY.dot(axisZ) +" axisX.axisZ ="+ axisX.dot(axisZ) )
	alert("X :[ "+axisX.e(1)+" "+axisX.e(2)+" "+ axisX.e(3) +"] \n Y :[ "+axisY.e(1)+" "+axisY.e(2)+" "+ axisY.e(3) +"] \n Z :[ "+axisZ.e(1)+" "+axisZ.e(2)+" "+ axisZ.e(3)+"]" )
	
	ox = axisX.dot($V([ox,oy,oz]))
	oy = axisY.dot($V([ox,oy,oz]))
	oz = axisZ.dot($V([ox,oy,oz]))
	
	
	alert("O :"+ox+" "+ oy+ " "+ oz)
}


//Below three function draws line with the arrowhead. This is useful to show the ray direction.

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


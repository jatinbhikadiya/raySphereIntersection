/* Here are functions to make working with the Sylvester Matrix package go more smoothly.
 * 
 * In particular, a function that takes a Sylvester Matrix or vector as an argument and
 * returns a div in HTML that is suitable for inclusion in an equation.
 */

function mat2html (m) {
	str  = "<div class=\"sylvesterMatrix\">";
	str += "<table style=\"display:inline-table\">";
	for (ri = 0; ri < m.rows(); ri++) {
		str += "<tr>";
		for (ci = 0; ci < m.cols(); ci++) {
			str += "<td style=\"text-align: right; width:2em\"> " + m.e(ri+1,ci+1).toFixed(2) + " </td>";
		}
		str += "</tr>";
	}
	str += "</table> </div>"
	return str;
}

const PDFDocument = require("pdfkit");
const fs = require("fs");

// Create a document
const doc = new PDFDocument();

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream("output.pdf"));

// Embed a font, set the font size, and render some text
doc
  //   .font("fonts/PalatinoBold.ttf")
  .fontSize(25)
  .text("Some text with an embedded font!", 100, 100);
doc.moveDown();
doc.moveDown();
doc.moveDown();
doc.moveDown();
doc.moveDown();
doc.moveDown();
doc.moveDown();
doc.moveDown();
doc.moveDown();
doc.moveDown();
doc.moveDown();

doc.text(".", [200, 200]);
doc.polygon([100, 0], [50, 100], [150, 100]);
doc.moveTo(10, 200).lineTo(10, 10);
doc.stroke();

doc
  .underline(20, 0, 199, 19, { color: "blue" })
  .link(20, 0, 199, 19, "http://google.com/");

doc.text(
  "hello                                                                  ",
  0,
  200,
  { underline: true }
);

// Add an image, constrain it to a given size, and center it vertically and horizontally
// doc.image("path/to/image.png", {
//   fit: [250, 300],
//   align: "center",
//   valign: "center",
// });

// Add another page
doc.addPage().fontSize(25).text("Here is some vector graphics...", 100, 100);

// Draw a triangle
doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill("#FF3300");

// Apply some transforms and render an SVG path with the 'even-odd' fill rule
doc
  .scale(0.6)
  .translate(470, -380)
  .path("M 250,75 L 323,301 131,161 369,161 177,301 z")
  .fill("red", "even-odd")
  .restore();

doc
  .moveTo(0, 20)
  // set the current point
  .lineTo(100, 160)
  // draw a line
  .quadraticCurveTo(130, 200, 150, 120)
  // draw a quadratic curve
  .bezierCurveTo(190, -40, 200, 200, 300, 150) // draw a bezier curve
  .lineTo(400, 90)
  // draw another line
  .stroke();

// Add some text with annotations
doc
  .addPage()
  .fillColor("blue")
  .text("Here is a link!", 100, 100)
  .underline(100, 100, 160, 27, { color: "#0000FF" })
  .link(100, 100, 160, 27, "http://google.com/");

doc
  .addPage()
  .moveDown()
  .moveDown()
  .moveDown()
  .moveDown()
  .text("this is a pagee of shapes geometric shapes")
  .lineWidth(25);
// line cap settings

doc.lineCap("butt").moveTo(50, 20).lineTo(100, 20).stroke();
doc.lineCap("round").moveTo(150, 20).lineTo(200, 20).stroke();
// square line cap shown with a circle instead of a line so you can see it
doc.lineCap("square").moveTo(250, 20).circle(275, 30, 15).stroke();
// line join settings
doc.lineJoin("miter").rect(50, 100, 50, 50).stroke();
doc.lineJoin("round").rect(150, 100, 50, 50).stroke();
doc.lineJoin("bevel").rect(250, 100, 50, 50).stroke();

doc.addPage();
const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in
suscipit purus. `;
doc.fontSize(8);
doc.text(`This text is left aligned. ${lorem}`, {
  width: 410,
  align: "left",
});
doc.moveDown();
doc.text(`This text is centered. ${lorem}`, {
  width: 410,
  align: "center",
});
doc.moveDown();
doc.text(`This text is right aligned. ${lorem}`, {
  width: 410,
  align: "right",
});
doc.moveDown();
doc.text(`This text is justified. ${lorem}`, {
  width: 410,
  align: "justify",
});
// Finalize PDF file
doc.end();

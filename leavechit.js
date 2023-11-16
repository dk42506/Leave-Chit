const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib

async function modifyPdf() {
    //Get data from leavechit.html forms
    let firstName = document.getElementById('First Name').value;
    let middleName = document.getElementById('Middle Name').value;
    let lastName = document.getElementById('Last Name').value;
    let employeeID = document.getElementById('Employee ID').value;
    let firstChoice = document.getElementById('Leave First').value;
    let secondChoice = document.getElementById('Leave Second').value;
    let thirdChoice = document.getElementById('Leave Third').value;
    let fourthChoice = document.getElementById('Leave Fourth').value;
    let dateStartString = document.getElementById('Date Start').value;
    let dateEndString = document.getElementById('Date End').value;
    
    //Convert date strings to unix timestamps
    let dateStartUnix = Date.parse(dateStartString);
    let dateEndUnix = Date.parse(dateEndString);
    
    
    // Fetch an existing PDF document
    const url = 'opm71.pdf'
  	const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    // Get the first page of the document
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]

    // Get the width and height of the first page
    const { width, height } = firstPage.getSize()

    // Draw a string of text diagonally across the first page
    firstPage.drawText(lastName + ', ' + firstName + ', ' + middleName, {
        x: 35,
        y: height - 72,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
        rotate: degrees(0),
    })
    firstPage.drawText(employeeID, {
        x: 325,
        y: height - 72,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
        rotate: degrees(0),
    })

    // Serialize the PDFDocument to bytes (a Uint8Array)
    // const pdfBytes = await pdfDoc.save({dataUri: true})
      
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    document.getElementById('pdf').src = pdfDataUri
	// Trigger the browser to download the PDF document
    //download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
}
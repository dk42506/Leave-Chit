const pdfDoc = await PDFDocument.load(...)
const pages = pdfDoc.getPages()
pages[0].drawText('You can modify PDFs too!')
const pdfBytes = await pdfDoc.save()
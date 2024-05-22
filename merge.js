const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function mergePDFs(pdfFile1, pdfFile2, outputFile) {
  // 두 개의 PDF 파일을 읽어들임
  const pdf1Bytes = fs.readFileSync(pdfFile1);
  const pdf2Bytes = fs.readFileSync(pdfFile2);

  const pdf1Doc = await PDFDocument.load(pdf1Bytes);
  const pdf2Doc = await PDFDocument.load(pdf2Bytes);

  const mergedPdf = await PDFDocument.create();

  const pdf1PageCount = pdf1Doc.getPageCount();
  const pdf2PageCount = pdf2Doc.getPageCount();
  const maxPageCount = Math.max(pdf1PageCount, pdf2PageCount);

  for (let i = 0; i < maxPageCount; i++) {
    if (i < pdf1PageCount) {
      const [pdf1Page] = await mergedPdf.copyPages(pdf1Doc, [i]);
      mergedPdf.addPage(pdf1Page);
    }
    if (i < pdf2PageCount) {
      const [pdf2Page] = await mergedPdf.copyPages(pdf2Doc, [i]);
      mergedPdf.addPage(pdf2Page);
    }
  }

  // 합쳐진 PDF를 파일로 저장
  const mergedPdfBytes = await mergedPdf.save();
  fs.writeFileSync(outputFile, mergedPdfBytes);
}


// 사용 예
mergePDFs('./target/kor.pdf', './target/eng.pdf', './output/total.pdf')
  .then(() => console.log('PDFs merged successfully'))
  .catch(err => console.error('Error merging PDFs:', err));


  const { exec } = require('child_process');


function printPDF(pdfPath) {
    exec(`lp ${pdfPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error printing PDF: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
      }
      console.log(`Print job sent: ${stdout}`);
    });
  }
  
  // 사용 예
  mergePDFs('file1.pdf', 'file2.pdf', 'output.pdf')
    .then(() => {
      console.log('PDFs merged successfully');
      printPDF('output.pdf');
    })
    .catch(err => console.error('Error merging PDFs:', err));
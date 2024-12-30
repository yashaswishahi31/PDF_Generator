const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

router.post('/generate-invoice', async (req, res) => {
  try {
    const { personName, email, date, products } = req.body;

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    
   
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Invoice</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="p-8">
          <div class="max-w-3xl mx-auto">
          <!-- Header -->
          <div class="flex justify-between items-center mb-8">
            <div class="flex items-center gap-2">
              <div class="h-8 w-8 bg-gray-900 rounded-lg"></div>
              <span class="text-xl font-semibold">Levitation</span>
            </div>
            <div class="text-right">
              <h2 class="text-xl font-bold">INVOICE GENERATOR</h2>
              <p class="text-gray-500 text-sm">Sample Output should be this</p>
            </div>
          </div>

          <!-- Customer Info -->
          <div class="bg-gray-900 text-white rounded-lg p-6 mb-8">
            <div class="flex justify-between items-center">
              <div>
                <p class="text-gray-400 mb-2">Name</p>
                <p class="text-green-400">${personName}</p>
              </div>
              <div class="text-right">
                <p class="text-gray-400 mb-2">Date : ${date}</p>
                <p class="bg-white text-black px-3 py-1 rounded">${email}</p>
              </div>
            </div>
          </div>

          <!-- Products Table -->
          <table class="w-full mb-8">
            <thead class="bg-gradient-to-r from-gray-900 to-green-900 text-white">
              <tr>
                <th class="text-left p-3">Product</th>
                <th class="text-center p-3">Qty</th>
                <th class="text-center p-3">Rate</th>
                <th class="text-right p-3">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              ${
                products.map(product => `
                  <tr class="border-b">
                    <td class="p-3">${product.name}</td>
                    <td class="text-center p-3">${product.quantity}</td>
                    <td class="text-center p-3">${product.rate}</td>
                    <td class="text-right p-3">USD ${product.totalAmount}</td>
                  </tr>
                `).join('')
              }
            </tbody>
          </table>

          <!-- Totals -->
          <div class="flex justify-end mb-8">
            <div class="w-64 border rounded-lg p-4">
              <div class="flex justify-between mb-2">
                <span>Total Charges</span>
                <span>$${products.reduce((sum, p) => sum + p.totalAmount, 0)}</span>
              </div>
              <div class="flex justify-between mb-2 text-gray-600">
                <span>GST (18%)</span>
                <span>$${(products.reduce((sum, p) => sum + p.totalAmount, 0) * 0.18).toFixed(2)}</span>
              </div>
              <div class="flex justify-between font-bold">
                <span>Total Amount</span>
                <span class="text-blue-600">₹ ${(products.reduce((sum, p) => sum + p.totalAmount, 0) * 1.18).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="text-center text-gray-600 text-sm mt-16">
            <p>Date: ${date}</p>
            <p class="mt-8 max-w-2xl mx-auto">
              We are pleased to provide any further information you may require 
              and look forward to assisting with your next order. Rest assured, 
              it will receive our prompt and dedicated attention.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Set content for Puppeteer
    await page.setContent(htmlContent);

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
    });

    // Save PDF locally

    const outputDir = path.join(__dirname, '../invoices');
if (!fs.existsSync(outputDir)) {
  console.log('Creating invoices directory...');
  fs.mkdirSync(outputDir);
}
console.log('Directory ready.');

    
    const filePath = path.join(outputDir, `invoice_${Date.now()}.pdf`);
    fs.writeFileSync(filePath, pdfBuffer);

    // Close the browser
    await browser.close();

    // Send the PDF
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="invoice.pdf"',
    });
    return res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF generation error:', error);
    return res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

module.exports = router;

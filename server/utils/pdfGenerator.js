const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.generateInvoicePDF = async (order) => {
  return new Promise((resolve, reject) => {
    try {
      // สร้างโฟลเดอร์ temp ถ้ายังไม่มี
      const tempDir = path.join(__dirname, '../temp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }

      const fileName = `invoice_${order._id}_${Date.now()}.pdf`;
      const filePath = path.join(tempDir, fileName);
      const doc = new PDFDocument({ margin: 50 });

      // สร้างไฟล์ PDF
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // เพิ่มหัวกระดาษ
      generateHeader(doc, order);
      // เพิ่มข้อมูลลูกค้า
      generateCustomerInformation(doc, order);
      // เพิ่มรายการสินค้า
      generateInvoiceTable(doc, order);
      // เพิ่ม footer
      generateFooter(doc);

      doc.end();

      stream.on('finish', () => resolve({ filePath, fileName }));
      stream.on('error', reject);
    } catch (error) {
      reject(error);
    }
  });
};

function generateHeader(doc, order) {
  doc
    .image('public/images/logo.png', 50, 45, { width: 50 })
    .fillColor('#444444')
    .fontSize(20)
    .text('INVOICE', 200, 50, { align: 'right' })
    .fontSize(10)
    .text(`Order #: ${order._id}`, 200, 65, { align: 'right' })
    .text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 200, 80, { align: 'right' })
    .moveDown();
}

function generateCustomerInformation(doc, order) {
  doc
    .fillColor('#444444')
    .fontSize(14)
    .text('BILLING INFORMATION', 50, 120)
    .fontSize(10)
    .text(`Name: ${order.address.fullName}`, 50, 140)
    .text(`Phone: ${order.address.phoneNumber}`, 50, 155)
    .text(`Address: ${order.address.area}`, 50, 170)
    .text(`${order.address.city}, ${order.address.state} ${order.address.pincode}`, 50, 185)
    .moveDown();
}

function generateInvoiceTable(doc, order) {
  let i;
  const invoiceTableTop = 220;

  // หัวตาราง
  doc
    .fontSize(12)
    .text('Description', 50, invoiceTableTop)
    .text('Unit Price', 300, invoiceTableTop, { width: 90, align: 'right' })
    .text('Quantity', 400, invoiceTableTop, { width: 90, align: 'right' })
    .text('Amount', 490, invoiceTableTop, { width: 90, align: 'right' });

  // เส้นใต้หัวตาราง
  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(50, invoiceTableTop + 20)
    .lineTo(580, invoiceTableTop + 20)
    .stroke();

  // รายการสินค้า
  let position = invoiceTableTop + 30;
  for (i = 0; i < order.products.length; i++) {
    const item = order.products[i];
    const itemTotal = item.price * item.count;

    doc
      .fontSize(10)
      .text(item.product.title, 50, position)
      .text(`$${item.price.toFixed(2)}`, 300, position, { width: 90, align: 'right' })
      .text(item.count.toString(), 400, position, { width: 90, align: 'right' })
      .text(`$${itemTotal.toFixed(2)}`, 490, position, { width: 90, align: 'right' });

    position += 25;
  }

  // รวมเงิน
  const totalPosition = position + 20;
  doc
    .fontSize(12)
    .text('Total', 400, totalPosition, { width: 90, align: 'right' })
    .text(`$${order.paymentIntent.amount.toFixed(2)}`, 490, totalPosition, { width: 90, align: 'right' });
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text('Thank you for your business.', 50, 700, {
      align: 'center',
      width: 500
    });
}
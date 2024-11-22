<template>
  <div class="app-container">
    <h1>PDFkit</h1>
    <div id="pdfContent">
      <a href="https://pdfkit.org/index.html" target="_blank">PDFkit套件網址</a>
      <p>
        PDFkit 只能簡易輸入文字和繪製圖形，無法做複雜的排版結構，無法中文輸入。
      </p>
    </div>
    <div class="pdf-container">
      <div>
        <el-button type="success" @click="download()">下載PDF</el-button>
      </div>
      <iframe width="100%" height="800px" ref="pdfIframe"></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const doc = new PDFDocument();
const stream = doc.pipe(blobStream());
const pdfIframe = ref(null);
// console.log(doc);

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus.  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.';

doc.fontSize(12).text(lorem, { align: 'left' });

// Add another page
doc.addPage().fontSize(25).text('Here is some vector graphics...', 100, 100);

// Draw a triangle
doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill('#FF3300');

// Apply some transforms and render an SVG path with the 'even-odd' fill rule
doc
  .scale(0.6)
  .translate(470, -380)
  .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
  .fill('red', 'even-odd')
  .restore();

// Add some text with annotations
doc
  .addPage()
  .fillColor('blue')
  .text('Here is a link!', 100, 100)
  .underline(100, 100, 160, 27, { color: '#0000FF' })
  .link(100, 100, 160, 27, 'http://google.com/');

// get a blob when you're done
doc.end();

const a = document.createElement('a');
document.body.appendChild(a);
a.style = 'display: none';

let blob;

const download = () => {
  if (!blob) return;
  var url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = 'test.pdf';
  a.click();
  window.URL.revokeObjectURL(url);
};

stream.on('finish', function () {
  // get a blob you can do whatever you like with
  blob = stream.toBlob('application/pdf');

  // or get a blob URL for display in the browser
  const url = stream.toBlobURL('application/pdf');
  const iframe = document.querySelector('iframe');
  iframe.src = url;
});
</script>

<style></style>

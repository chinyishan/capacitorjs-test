<template>
  <div class="app-container">
    <h1>電子簽名</h1>
    <div class="img-section">
      <h2>授權同意書簽名</h2>
      <el-button @click="dialogVisible = true" type="primary"
        >手寫簽名</el-button
      >
      <el-button @click="download" type="success">下載完整同意書</el-button>
    </div>
    <div class="agreement-section">
      <div id="print" class="agreement-print">
        <div class="sign-document">
          <img src="@/assets/image/consent-document.jpg" alt="doc" />
        </div>
        <div class="img-wrap">
          <img class="sign-img" :src="imgSrc" alt="sign" v-if="imgSrc" />
        </div>
      </div>
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="請簽正楷全名"
      width="600"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      @open="dialogOpen"
      @close="dialogClose"
    >
      <div class="signature-row">
        <VueSignaturePad
          id="signature"
          width="100%"
          height="300px"
          ref="signaturePad"
          :options="options"
        />
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" plain @click="undo">上一步</el-button>
          <!-- <el-button type="warning" plain @click="change">換色</el-button> -->
          <el-button type="danger" plain @click="resume">重置</el-button>
          <el-button type="success" plain @click="saveSign">送出</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import html2canvas from 'html2canvas';
import JsPDf from 'jspdf';

const dialogVisible = ref(false);
const signaturePad = ref(null);
const imgSrc = ref('');
const options = reactive({
  penColor: '#000',
  backgroundColor: '#ffff', // 設jpeg需加背景
  minWidth: 1, // 畫筆最小寬度
  maxWidth: 3, // 畫筆最大寬度
});

/**燈箱 */
const dialogOpen = () => {
  signaturePad.value.resizeCanvas();
};
const dialogClose = () => {
  resume();
};

/**撤銷 */
const undo = () => {
  signaturePad.value.undoSignature();
};

/**保存 */
const saveSign = () => {
  const { isEmpty, data } = signaturePad.value.saveSignature('image/jpeg');
  if (isEmpty) {
    alert('請先簽名');
    return;
  }
  imgSrc.value = data;
  resume();
  dialogVisible.value = false;
};

/**換色 */
const change = () => {
  if (options.penColor === '#00f') {
    options.penColor = '#c0f';
  } else {
    options.penColor = '#00f';
  }
};

/**重置 */
const resume = () => {
  signaturePad.value.clearSignature();
};

const download = async () => {
  const element = document.getElementById('print');
  if (!element) {
    alert('找不到要下載的內容');
    return;
  }

  // 使用 html2canvas 將 HTML 元素轉換為畫布
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');

  // 使用 jsPDF 將畫布轉換為 PDF
  const pdf = new JsPDf();
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('agreement.pdf');

  alert('PDF 已儲存並下載');
};
</script>
<style lang="scss" scoped>
.app-container {
  margin-bottom: 40px;
}
.sign-section {
  margin-bottom: 20px;
}
.signature-row {
  width: 100%;
  height: 300px;
}

#signature {
  box-sizing: border-box;
  width: 100%;
  height: 300px;
  border-radius: 5px;
  outline: 1px solid #4bc5e8;
  background-origin: border-box;
  background-clip: content-box, border-box;
  margin: 0 auto;
}

.img-section {
  margin-bottom: 40px;

  h2 {
    margin-bottom: 10px;
  }
}

.agreement-print {
  position: relative;
  box-sizing: border-box;
  width: 794px;
  height: 1122px;
  outline: 1px solid #9f6274;
  background: #ffff;

  .img-wrap {
    position: absolute;
    outline: 1px solid #4bc5e8;
    width: 280px;
    height: 140px;
    bottom: 340px;
    right: 40px;

    .sign-img {
      display: block;
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }
}
.img-wrap {
  background: #ffff;
  outline: 1px solid #4bc5e8;
  width: 280px;
  height: 140px;

  .sign-img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}
</style>

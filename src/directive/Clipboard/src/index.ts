import ClipboardJS from 'clipboard'
import { ElMessage } from 'element-plus'
export default {
  mounted(el: HTMLElement) {
    const clipboard = new ClipboardJS(el);
    clipboard.on('success', function (e) {
      ElMessage.success('复制成功')
    });

    clipboard.on('error', function (e) {
      ElMessage.error('复制失败')
    });
  }
}
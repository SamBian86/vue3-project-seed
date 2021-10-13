<template>
  <div class="component-tinymce">
    <textarea id="tinymce"></textarea>
    <div class="component-tinymce-action">
      <el-button type="primary" @click="addVideoHandle" :size="StyleEnum.BUTTON_SIZE">
        {{ $t('components.tinymce.addVideo') }}
      </el-button>
      <el-button type="primary" @click="addImageHandle" :size="StyleEnum.BUTTON_SIZE">
        {{ $t('components.tinymce.addImage') }}
      </el-button>
      <el-button type="primary" @click="addTelHandle" :size="StyleEnum.BUTTON_SIZE">
        {{ $t('components.tinymce.addTel') }}
      </el-button>
    </div>
  </div>
  <DialogPage ref="dialogPage">
    <template #body>
      <SysVodTable @hide-dialog="hideDialog" @insert-video-handle="insertVideoHandle"></SysVodTable>
    </template>
    <template #title>
      {{ $t('components.tinymce.addVideoTitle') }}
    </template>
  </DialogPage>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, watch } from 'vue'
import { StyleEnum } from '/@/enums/styleEnum'
import { uploadOssFile } from '/@/api/oss/file'
import { ElNotification, ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import props from './props'
// components
import { DialogPage } from '/@/components/DialogPage'
// hooks
import useDialogPageComponent from '/@/hooks/component/dialogPage'
// 页面
import SysVodTable from './table.vue'
export default defineComponent({
  name: 'Tinymce',
  components: { DialogPage, SysVodTable },
  props: { ...props },
  setup(props, { emit }) {
    const { t } = useI18n()
    const dialogPage = ref(null)
    const { showDialog, hideDialog } = useDialogPageComponent(dialogPage)
    const data = ref(props.data)
    let timer = null
    // 初始化
    onMounted(() => {
      window.tinymce &&
        window.tinymce.init({
          selector: '#tinymce',
          // skin: 'oxide-dark',
          height: props.height,
          language: 'zh_CN',
          object_resizing: false,
          placeholder: props.placeholder,
          menubar: 'file edit insert view format table',
          toolbar: [
            'bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample',
            'hr bullist numlist link image charmap	 preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'
          ],
          plugins:
            'advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount',
          end_container_on_empty_block: true,
          powerpaste_word_import: 'clean',
          code_dialog_height: 450,
          code_dialog_width: 1000,
          advlist_bullet_styles: 'square',
          advlist_number_styles: 'default',
          imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
          default_link_target: '_blank',
          link_title: false,
          init_instance_callback: (editor: { on: (arg0: string, arg1: () => void) => void }) => {
            editor.on('NodeChange Change KeyUp SetContent', () => {
              // console.log(editor.getContent())
              emit('content-change-handle', editor.getContent())
              // console.log('NodeChange Change KeyUp SetContent')
            })
          },
          setup: (editor: { on: (arg0: string, arg1: (e: any) => void) => void }) => {
            // console.log('setup')
            // insertContent(data.value)
            editor.on('FullscreenStateChanged', (e) => {
              // console.log('FullscreenStateChanged')
            })
            // console.log('ID为: ' + editor.id + ' 的编辑器即将初始化.')
          }
        })

      watch(
        () => props.data,
        (val) => {
          setContent(val)
          // data.value = val
        }
      )
    })

    onUnmounted(() => {
      destroyTinymce()
    })

    // 获取内容
    function getContent() {
      window.tinymce && window.tinymce.get('tinymce').getContent()
    }

    // 初始化设置内容
    function setContent(value: any) {
      if (window.tinymce && window.tinymce.get('tinymce') && value) {
        if (timer) {
          clearTimeout(timer)
        } else {
          timer = setTimeout(() => {
            window.tinymce && window.tinymce.get('tinymce').setContent(value)
            clearTimeout(timer)
          }, 100)
        }
      }
    }

    // 追加插入
    function insertContent(value: any) {
      if (window.tinymce && window.tinymce.get('tinymce') && value) {
        window.tinymce && window.tinymce.get('tinymce').insertContent(value)
      }
    }

    // 添加视频
    function addVideoHandle() {
      showDialog()
    }

    // 添加图片
    function addImageHandle() {
      //模拟出一个input用于添加本地文件
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.click()
      input.onchange = function () {
        let file = this.files[0]
        if (file) {
          uploadOssFile({
            file
          })
            .then((response: any) => {
              const { url } = response.data.results
              if (url) {
                insertContent(`<img class="wscnph" src="${url}" />`)
              }
            })
            .catch((message: any) => {
              ElNotification({
                message,
                type: 'warning',
                dangerouslyUseHTMLString: true,
                duration: 0
              })
            })
        }
      }
    }

    // 添加联系方式
    function addTelHandle() {
      ElMessageBox.prompt(t('components.tinymce.addTelTitle'), t('global.tips'), {
        confirmButtonText: t('global.confirm'),
        cancelButtonText: t('global.cancel')
      }).then(({ value }) => {
        if (value.length !== 11) {
          ElMessage({
            type: 'error',
            message: t('components.tinymce.addTelErrorMessage')
          })
        } else {
          insertContent(`<span class="rich_mobile" style="color: blue;" data-tel="${value}">${value}</span>`)
        }
      })
    }

    // 删除组件
    function destroyTinymce() {
      if (window.tinymce && window.tinymce.get('tinymce')) {
        window.tinymce && window.tinymce.get('tinymce').destroy()
        // console.log('删除成功')
      }
    }

    // 添加视频
    function insertVideoHandle(items: any) {
      items.forEach((item: any) => {
        insertContent(
          `
            <div class="video-box" style="position: relative; overflow: hidden;">
              <video id="video_${item.videoId}" style="width: 100%; height: auto; object-fit: cover; position: relative;" src="${item.url}" class="video-h5" type="video/mp4" controls></video>
              <div class="img-box" style="width: 100%; height: 100%; position: absolute; top: 0; overflow: hidden;">
                <img id="video_img_${item.videoId}" src="${item.imgUrl}" class="video-img-style" style="width: 100%; position: absolute; top: 0; left: 50%; transform: translateX(-50%);" />
                <div class="autoplay" style="border-radius: 32px; height: 64px; width: 64px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0, 0, 0, 0.8);">
                  <div style="width: 0; height: 0; border-top: 16px solid transparent; border-left: 28px solid #4e4e4e; border-bottom: 16px solid transparent; position: absolute; transform: translate(-40%, -50%); top: 50%; left: 50%;"></div>
                </div>
              </div>
            </div>
          `
        )
      })
    }

    return {
      StyleEnum,
      data,
      dialogPage,
      hideDialog,
      addVideoHandle,
      addImageHandle,
      addTelHandle,
      insertVideoHandle
    }
  }
})
</script>
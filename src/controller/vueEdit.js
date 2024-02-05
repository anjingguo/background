import { quillEditor } from 'vue-quill-editor'

export default {
  data() {
    return {
      content: '<h3>文本编辑</h3>',
      editorOption: {}
    }
  },
  components: {
    quillEditor
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    submit() {
      console.log(this.content)
      this.$message.success('提交成功！')
    }
  }
}

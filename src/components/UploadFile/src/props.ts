const props = {
  refName: {
    type: String,
    default: "uploadFile"
  },
  type: {
    type: String,
    default: "one" // 多个是many
  },
  disabled: {
    type: Boolean,
    default: false
  },
  items: {
    type: Array,
    default: () => {
      return []
    }
  },
  autoUpload: {
    type: Boolean,
    default: false
  },
  uploadApi: {
    type: Function,
    default: null
  },
  styleText: {
    type: String,
    default: ""
  }
}

export default props
const props = {
  refName: {
    type: String,
    default: "uploadFileButton"
  },
  autoUpload: {
    type: Boolean,
    default: false
  },
  uploadApi: {
    type: Function,
    default: null
  },
}

export default props
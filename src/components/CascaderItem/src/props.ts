const props = {
  refName: {
    type: String,
    default: "cascaderItem"
  },
  placeholder: {
    type: String,
    default: ""
  },
  showText: {
    type: String,
    default: ""
  },
  options: {
    type: Array,
    default: () => {
      return []
    }
  },
  props: {
    type: Object,
    default: () => {
      return {}
    }
  },
  lazy: {
    type: Boolean,
    default: false
  },
  dataMethod: {
    type: Function,
    default: () => {
    }
  },
  disabled: {
    type: Boolean,
    default: false
  },
}

export default props
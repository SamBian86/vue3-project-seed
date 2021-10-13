const props = {
  pageDrawer: {
    type: Boolean,
    default: false
  },
  refName: {
    type: String,
    default: "drawerPage"
  },
  withHeader: {
    type: Boolean,
    default: true
  },
  direction: {
    type: String,
    default: "rtl"
  },
  title: {
    type: String,
    default: ""
  },
  destroyOnClose: {
    type: Boolean,
    default: true
  },
  appendToBody: {
    type: Boolean,
    default: true
  }
}

export default props
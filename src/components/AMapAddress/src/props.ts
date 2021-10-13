const props = {
  refName: {
    type: String,
    default: "aMap"
  },
  lng: {
    type: Number,
    default: 120.305176
  },
  lat: {
    type: Number,
    default: 31.550934
  },
  zoom: {
    type: Number,
    default: 11
  },
  resizeEnable: {
    type: Boolean,
    default: true
  },
  autoCompleteOpen: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ""
  },
  showText: {
    type: String,
    default: ''
  },
  styleText: {
    type: String,
    default: ''
  },
  pageType: {
    type: String,
    default: ''
  },
}

export default props
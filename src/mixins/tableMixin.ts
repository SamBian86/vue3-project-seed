export default {
  props: {
    pageParams: {
      type: Object,
      default: () => {
        return {};
      },
    },
    pageType: {
      type: String,
      default: ''
    },
  }
}
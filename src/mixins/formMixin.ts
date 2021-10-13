export default {
  props: {
    pageType: {
      type: String,
      default: '',
    },
    pageParams: {
      type: Object,
      default: () => {
        return {};
      },
    },
  }
}
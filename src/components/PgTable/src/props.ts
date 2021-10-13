const props = {
  tableMethod: {
    type: Function,
    default: () => { },
  },
  selection: {
    type: Boolean,
    default: false,
  },
  tableParams: {
    type: Object,
    default: () => {
      return {};
    },
  },
  rowKey: {
    type: String,
    default: "id"
  },
  treeProps: {
    type: Object,
    default: () => {
      return { hasChildren: 'hasChildren', children: 'children' };
    },
  },
  refName: {
    type: String,
    default: "pgTable"
  },
  pageSize: {
    type: Number,
    default: 10,
  }
}

export default props
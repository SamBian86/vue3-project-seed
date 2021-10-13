const props = {
  data: {
    type: Array,
    default: () => {
      return [];
    },
  },
  tableMethod: {
    type: Function,
    default: () => { },
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
    default: "treeTable"
  },
}

export default props
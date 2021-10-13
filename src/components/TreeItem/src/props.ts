const props = {
  refName: {
    type: String,
    default: "treeItem"
  },
  treeMethod: {
    type: Function,
    default: () => { },
  },
  treeParams: {
    type: Object,
    default: () => {
      return {};
    },
  },
  defaultCheckedKeys: {
    type: Array,
    default: () => {
      return [];
    },
  },
  expandOnClickNode: {
    type: Boolean,
    default: true,
  },
  props: {
    type: Object,
    default: () => {
      return {
        children: 'children',
        label: 'name',
        id: 'id'
      };
    },
  },
  checkStrictly: {
    type: Boolean,
    default: false,
  },
  showCheckbox: {
    type: Boolean,
    default: false,
  },
  highlightCurrent: {
    type: Boolean,
    default: false,
  },
  nodeKey: {
    type: String,
    default: "id"
  },
  responseName: {
    type: String,
    default: ""
  },
}

export default props
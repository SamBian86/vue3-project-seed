export default {
  data() {
    return {
      menuTreeConfig: {
        data: [],
        refName: 'menuTree',
        dataMethod: () => { },
        dataMethodParams: {},
        defaultProps: {},
        openFilter: false,
        openHandle: false,
        showCheckbox: false,
        defaultExpandAll: false,
        highlightCurrentRow: false,
      }
    }
  },
  methods: {
    // 组件事件方法监听
    componentMenuTreeListen(type: any, data: any) {
      const componentMenuTreeMethods = this.componentMenuTreeMethods()
      componentMenuTreeMethods[type] && componentMenuTreeMethods[type](data);
    },
    // 组件方法集合
    componentMenuTreeMethods() {
      const componentMenuTreeMethods = {
        "current-change": (result: any) => { },
      };
      return componentMenuTreeMethods
    }
  },
}
// components/c-tab-control/c-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取当前点击的tab的索引，并发射到页面上
    handleTabClick(event) {
      // 获取当前索引
      const currentIndex = event.currentTarget.dataset.index
      this.setData({
        currentIndex: currentIndex
      })

      // 发射参数
      this.triggerEvent('getCurrentTab', {currentIndex}, {})
    }
  }
})

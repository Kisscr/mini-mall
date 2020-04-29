// pages/index/childCpns/c-recommend/c-recommend.js
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
    isLoad: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 监听图片有无加载完成
    handleLoad() {
      // 这里有四张图片，所以会执行四次，可以做一个优化，这样就只会执行一次了
      if (!this.data.isLoad) {
        this.triggerEvent('imageLoaded')
        this.data.isLoad = true
      }
    }
  }
})
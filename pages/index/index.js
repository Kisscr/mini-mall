// 引入网络请求方法
import {
  getMultiData,
  getGoodsData
} from '../../service/home'

const tab = ['pop', 'new', 'sell']
const TOP_DISTANCE = 1000

Page({
  data: {
    banner: [],
    dKeyword: [],
    keywords: [],
    recommend: [],
    tabList: ['流行', '新款', "精选"],
    goods: {
      pop: {
        page: 0,
        list: []
      },
      new: {
        page: 0,
        list: []
      },
      sell: {
        page: 0,
        list: []
      }
    },
    currentTab: 'pop',
    showBackTop: false,
    isFixed: false,
    tabTop: 0
  },


  onLoad: function () {
    // 调用请求数据方法
    this._getHomeData()
    // 调用请求首页商品数据的方法
    this._getHomeGoods('pop')
    this._getHomeGoods('new')
    this._getHomeGoods('sell')
  },

  // ---------------------网络请求方法------------------------
  // 请求轮播图等数据
  _getHomeData() {
    getMultiData().then(res => {
      // console.log(res)
      this.setData({
        banner: res.data.data.banner.list,
        dKeyword: res.data.data.dKeyword.list,
        keywords: res.data.data.keywords.list,
        recommend: res.data.data.recommend.list
      })
    })
  },

  // 请求首页商品数据
  _getHomeGoods(type) {
    // 获取页码
    const page = this.data.goods[type].page + 1

    getGoodsData(type, page)
      .then(res => {
        // console.log(res.data.data.list)
        // 获取当前种类的数据
        const list = res.data.data.list
        const oldList = this.data.goods[type].list
        oldList.push(...list)

        const listKey = `goods.${type}.list`
        const pageKey = `goods.${type}.page`
        this.setData({
          [listKey]: oldList,
          [pageKey]: page
        })

      })
  },

  // ---------------------事件处理方法------------------------

  // 接收tab-control页面发射过来的参数
  getTabInfo(event) {
    // 获取点击的tab的索引
    const index = event.detail.currentIndex

    this.setData({
      currentTab: tab[index]
    })

    // 请求数据
    this._getHomeGoods(currentTab)
  },

  // 监听页面滚动到底部的事件函数
  onReachBottom() {
    // 直接调用方法，将当前tab的种类传递进去就可以了
    this._getHomeGoods(this.data.currentTab)
  },

  // 监听页面的滚动距离
  onPageScroll(options) {
    // 获取页面滚动距离
    const scrollTop = options.scrollTop
    // 官方： 不要在滚动的函数中调用this.setData
    const flag1 = scrollTop >= TOP_DISTANCE
    if (flag1 != this.data.showBackTop) {
      this.setData({
        showBackTop: flag1
      })
    }

    // 判断页面滚动高度是否大于tab的top值
    const flag2 = scrollTop >= this.data.tabTop
    if (flag2 != this.data.isFixed) {
      this.setData({
        isFixed: flag2
      })
    }
  },

  // 图片加载完成后
  handleTabFixed() {
    // 获取tab栏的top值
    wx.createSelectorQuery().select("#tab-control").boundingClientRect(rect => {
      this.setData({
        tabTop: rect.top
      })
    }).exec()
  },

  // 分享转发回调函数
  onShareAppMessage: function () {
    return {
      title: '购物街'
    }
  }
})
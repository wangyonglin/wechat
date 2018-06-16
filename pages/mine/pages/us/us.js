

Page({
  /** 
   * 页面的初始数据 
   */
  data: {

    
    toView: 'inView03',
  },
  scrollToViewFn: function (e) {
    var _id = e.target.dataset.id;
    this.setData({
      toView:  _id
    })
    console.log(this.data.toView)
  },
  onLoad: function (options) {
    let that = this;
    that.setData({
      toView: options.toView
    })
  }
}) 
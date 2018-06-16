var wc = require("../../template/comment/wxComment.js");

Page({
  data: {
    media:{
      uuid:'',
      hidden: false,
      poster: 'https://img.alicdn.com/imgextra/i3/173275708/TB1kvaMantYBeNjy1XdXXXXyVXa_!!0-item_pic.jpg_430x430q90.jpg',
      src: 'https://wangyonglin.oss-cn-shanghai.aliyuncs.com/videos/2018/_%E5%88%98%E4%BA%A6%E8%8F%B2_%E7%A5%9E%E4%BB%99%E5%A7%90%E5%A7%90%E7%9A%84%E7%BE%8E%E4%B8%BD%E6%97%A0%E4%BA%BA%E8%83%BD%E6%AF%94%EF%BC%81_mda-ibqpu4e960b9cgxs.mp4'
    },
    
    uuid:null,
    isLike: true,
    // 页面配置 
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    // banner
    imgUrls: [
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057921620_middle.jpg",
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057922659_middle.jpg",
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057923813_middle.jpg",
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057924965_middle.jpg",
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057925958_middle.jpg"
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
    value: '',
    formatted_address: '',
    comment_list: [],
    // 商品详情介绍
    detailImg: [
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_1.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_2.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_3.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_4.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_5.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_6.jpg",
    ],
  },
  onLoad: function (option){
    let that = this;

    var uuid = "media.uuid";
    that.setData({
      [uuid]: option.uuid,
     
    });
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log("openId__" + res.data.userInfo.openId);
      },
    })
    try {
      var value = wx.getStorageSync('GPS')
      if (value) {
        // Do something with return value
        that.setData({
          formatted_address: value.formatted_address
        })
      }
    } catch (e) {
      // Do something when catch error
    }
 
    console.count("UUID:"+that.data.uuid);
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
        console.count("winWidth " + that.data.winWidth);
        console.count("winHeight " + that.data.winHeight);
      }
    });
    /* 设置怎么加载评论 */
    that.wxCommentResult()
  },
  onReady: function () {
    let that = this;
    that.videoContext = wx.createVideoContext('myVideo')
  },
  // 点击tab切换
  swichNav: function (e) {
    let that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
      console.count("that.data.currentTab:" + that.data.currentTab)
    }
  },
  
  bindKeyInput: function (e) {
    let that = this;
    console.log("加载 inputValues 方法 中 。。。:" + e.detail.value)
    that.setData({
      value: e.detail.value//将input至与data中的inputValue绑定
    })
  },
  wxSend: function () {
    console.log('reset------------------');
    let that = this;

    if (that.data.value) {

      wc.sendComment(that.data.uuid, that.data.value, function (e) {

        that.setData({
          value: ''//将data的inputValue清空
        });
        that.wxCommentResult();
      });
    } else {
      //Catch Error
      console.log('error:inputValue=null');
    }

    return;
  },
  wxCommentResult: function () {
    let that = this;
    wc.wxCommentResult(that.data.uuid, function (e) {
      that.setData({
        comment_list: e.result
      });
    });
    console.log("加载 Lower 方法 中 。。。:")
  },

  
  videoPlay(e) {
    let that = this;
    console.count("DDDDDDDDDDDDDDDDDDDD:" + e.currentTarget.dataset.uuid);
    var hidden = "media.hidden";
    that.setData({
      [hidden]: true
    })
    that.videoContext.play()
  },
  bindendedVideo: function () {
    var hidden = "media.hidden";
    this.setData({
      [hidden]: false
    });
  },
  showToast: function () {
    this.service.showToast('我是传过来的toast内容', 2000)
  }  
})
//index.js
var wc = require("../../template/comment/wxComment.js");

var app = getApp();


function jsonRequery(that, src) {
  wx.request({
    url: src,
    success: function (res) {
      res.data.datetime = app.FormatTime(res.data.datetime)
      that.setData({
        items: res.data,
      })

    },
    fail: function (err) {
      console.log("Fail videoLoad api");

    },//请求失败
  })
}
Page({
  data: {
    curr_id: '',
    items: [],
    winWidth: 0,
    winHeight: 0,
    uuid:"",
    comment_list:[],
    value: '',


  },
  videoErrorCallback: function (e) {
    console.log('视频错误信息:');
    console.log(e.detail.errMsg);
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

      wc.sendComment(that.data.uuid, that.data.value,function(e){
        
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
  wxCommentResult:function(){
    let that = this;
    wc.wxCommentResult( that.data.uuid,function(res){
      that.setData({
        comment_list: res.result
      });
    });
    console.log("加载 Lower 方法 中 。。。:")
  },

  onClickEventListener: function (event) {
    console.log('视频事件信息:onClickEventListener');
    this.setData({
      curr_id: event.currentTarget.dataset.id,
    });
    console.log('视频事件信息:onClickEventListener---' + event.currentTarget.dataset.id);
    console.log('视频事件信息: this.data.curr_id' + this.data.curr_id);
    var v = this.data.curr_id;
    setTimeout(function startPlay() {
      var cvc = wx.createVideoContext('myVideo', v);
      cvc.play();
    }, 10);

  },


  onLoad: function (option) {
    let that = this;
    that.setData({
      uuid: option.uuid,
    });
    jsonRequery(this, 'https://data.redname.com/video/uuid?uuid='+option.uuid);
    console.log("DDDD"+option.uuid);

  

    /**
     * 获取系统信息
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

    /* 设置怎么加载评论 */
    that.wxCommentResult()
  },
  
  
})

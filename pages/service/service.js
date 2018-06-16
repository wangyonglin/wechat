
Page({
  data: {
    imgs:"https://wangyonglin.oss-cn-shanghai.aliyuncs.com/videos/2018/%E9%99%88%E4%B8%80%E5%8F%91%E5%84%BF%20-%20%E7%AB%A5%E8%AF%9D%E9%95%87%5B00_01_07%5D%5B20180421-175537-0%5D.JPG",
    winWidth:0,
    winHeight:0,

  },
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  onReady: function (e) {
    //使用wx.createContext获取绘图上下文context
    var ctx = wx.createCanvasContext('firstCanvas')
    ctx.setGlobalAlpha(0.1)
    ctx.setFillStyle("#888888")
    ctx.fillRect(10, 10, 150, 75)
    ctx.setFillStyle("red")
    ctx.setGlobalAlpha(1)
    ctx.setFontSize(20)
    ctx.fillText('20', 20, 20)

    ctx.draw()

   
    /*
    context.setStrokeStyle("#00ff00")
    context.setLineWidth(5)
    context.rect(0, 0, 200, 200)
    context.stroke()
    context.setStrokeStyle("#ff0000")
    context.setLineWidth(2)
    context.moveTo(160, 100)
    context.arc(100, 100, 60, 0, 2 * Math.PI, true)
    context.moveTo(140, 100)
    context.arc(100, 100, 40, 0, Math.PI, false)
    context.moveTo(85, 80)
    context.arc(80, 80, 5, 0, 2 * Math.PI, true)
    context.moveTo(125, 80)
    context.arc(120, 80, 5, 0, 2 * Math.PI, true)
    context.stroke()
    context.draw()
    */
  },
  onLoad:function(){
    var that = this;
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
  },
  
})
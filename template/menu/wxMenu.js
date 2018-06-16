var audio_data = [{
  poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
  name: '语音通知',
  author: '王永林',
  src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
}];

function MusicStart(that, e) {
  var progress = parseInt((e.detail.currentTime / e.detail.duration) * 100)
  that.setData({
    progress: progress,
  });

  console.log('音乐播放进度为' + progress + '%')

}


function MusicPlayer() {
  this.audioCtx = wx.createAudioContext('myAudio')
  this.audioCtx.setSrc('https://wangyonglin.oss-cn-shanghai.aliyuncs.com/videos/REC20180427192120.mp3')
  this.audioCtx.play()
}
function location() {
  wx.getLocation({
    //定位类型 wgs84, gcj02
    type: 'gcj02',
    success: function (res) {
      console.log(res)
      wx.openLocation({
        //当前经纬度
        latitude: res.latitude,
        longitude: res.longitude,
        //缩放级别默认28
        scale: 28,
        //位置名
        name: '常熟招商城4区118号转角',
        //详细地址
        address: '王永林',
        //成功打印信息
        success: function (res) {
          console.log(res)
        },
        //失败打印信息
        fail: function (err) {
          console.log(err)
        },
        //完成打印信息
        complete: function (info) {
          console.log(info)
        },
      })

    },
    fail: function (err) {
      console.log(err)
    },
    complete: function (info) {
      console.log(info)
    },
  })
}
module.exports = {

  audio_data: audio_data,
  MusicPlayer: MusicPlayer,
  MusicStart: MusicStart,
  location: location,
}
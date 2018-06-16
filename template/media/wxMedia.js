var Data={
  poster:'https://img.alicdn.com/imgextra/i3/173275708/TB1kvaMantYBeNjy1XdXXXXyVXa_!!0-item_pic.jpg_430x430q90.jpg',
  src:'https://wangyonglin.oss-cn-shanghai.aliyuncs.com/videos/2018/_%E5%88%98%E4%BA%A6%E8%8F%B2_%E7%A5%9E%E4%BB%99%E5%A7%90%E5%A7%90%E7%9A%84%E7%BE%8E%E4%B8%BD%E6%97%A0%E4%BA%BA%E8%83%BD%E6%AF%94%EF%BC%81_mda-ibqpu4e960b9cgxs.mp4'
}
function wxMedia(that){
  that.videoContext = wx.createVideoContext('myVideo');
}
module.exports = {
  Data: Data,
  wxMedia: wxMedia,
}

function FormatTime(number) {
  var date = new Date(number);
  var Y = date.getFullYear() + '年';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + '日 ';
  var h = date.getHours < 10 ? '0' + date.getHours() : date.getHours() + ':';
  var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

  return (Y + M + D + h + m)
}
function wxCommentResult( result, callback) {
  console.count("已进入autoloadCommentResult 方法中");
  var src = "https://data.redname.com/commet/uuid?uuid=" + result + "&page=0&size=20";
  console.count("已进入autoloadCommentResult 方法中 URL 为" + src);
  wx.request({
    url: src,
    success: function (res) {
      for (var i = 0; i < res.data.result.length; i++) {

        res.data.result[i].datetime = FormatTime(res.data.result[i].datetime)

      }
      console.count("已进入autoloadCommentResult 方法中 request 登陆成功");
      typeof callback == "function" && callback(res.data)
    },
    fail: function () {
      console.count("已进入autoloadCommentResult 方法中 request 加载失败");

    }

  })
}
function sendComment(uuid, str, callback) {
  try {
    var gps = wx.getStorageSync('GPS');
    if (gps) {
      // Do something with return value
      console.log('GPS:' + gps.formatted_address);
    }
  } catch (e) {
    // Do something when catch error
  }
  try {
    var ui = wx.getStorageSync('userInfo');
    console.log('userInfo:' + ui.userInfo.openId);
    if (ui) {
      // Do something with return value
      wx.showLoading({
        title: '发表评论...',
        mask: false,
      });
      wx.request({
        url: 'https://data.redname.com/commet/add',
        method: 'POST',
        data: {
          uuid: uuid,
          openId: ui.userInfo.openId,
          avatarUrl: ui.userInfo.avatarUrl,
          nickName: ui.userInfo.nickName,
          formatted_address: gps.formatted_address,
          content: str,
          enabled: 1
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          if (res.statusCode == 200) {

            setTimeout(function () {
              wx.hideLoading();
              typeof callback == "function" && callback(res.data)
            }, 1000);

          }

        },
        fail: function () {

          console.log('获取用户信息失败')
        }
      });
    }
  } catch (e) {
    // Do something when catch error
    console.log('读取缓存 userInfo 失败')

  }

}
module.exports = {

  wxCommentResult: wxCommentResult,
  sendComment: sendComment,
}
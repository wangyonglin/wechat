 function FormatTime (number) {
  var date = new Date(number);
  var Y = date.getFullYear() + '/';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return (Y + M + D)
}

function RequestClassify(str, page, size, callback){
  
  wx.request({
    url: 'https://data.redname.com/clothing/search',
    data: {
      search: str,
      page: 0,
      size: 15
    },
    method: "GET",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      for (var i = 0; i < res.data.totalElements; i++) {
        res.data.content[i].datetime = FormatTime(res.data.content[i].datetime)
      }
      console.log("request:" + res.data.content);
      typeof callback == "function" && callback(res.data)
    },
  });
}

module.exports = {
  RequestClassify: RequestClassify
}
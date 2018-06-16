function wxSearch(that, result){
 
  wx.showToast({
    title: "加载中",
    icon: 'loading',
    duration: 10000,
    mask: true
  })
  wx.request({
    
    url: 'https://data.redname.com/clothing/search',
    data:{
      search:searchValues,
      page:0,
      size:15
    },
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      console.count('success:' + res.data.totalElements);
      typeof result == "function" && result(res.data)
      setTimeout(function () {
        wx.hideToast()
      }, 100);
    },
    fail:function(){
      console.count('fail:加载搜索数据失败！' );
    }
    
  })

 
}
function inputValues(that, result) {
  searchValues=result;
  
}
var searchValues = "";
module.exports = {
  wxSearch: wxSearch,
  inputValues, inputValues,
  searchValues, searchValues

}
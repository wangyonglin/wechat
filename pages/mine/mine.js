// pages/mine/mine.js
var app = getApp()
Page({
  data: {
    userInfo: {},
    motto: 'Hello World',
    listEvent:[
      {
        id: 'address',
        name: '地址管理',  
      },
    ],
    list: [
  
      {
        id: 'about_us',
        name: '关于我们',
        html:'me',
        pages: [
          {
            name: '常熟服装批发市场',
            pages: 'Market'
          },
          {
            name: '关于我们',
            pages: 'AboutUs'
          },
          {
            name: '开发者',
            pages: 'Developer'
          }
        ]
      }

    ]
  },
  onLoad: function () {
    console.log('onLoad')
    let that = this;

    try {
      var value = wx.getStorageSync('userInfo')
      if (value) {
        // Do something with return value
        that.setData({
          userInfo: value.userInfo
        });
      }
    } catch (e) {
      // Do something when catch error
      console.log('读取缓存 userInfo 失败')
      relogin()
    }



  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
  listEvent: function (e) {
    let that = this;
    var id = e.currentTarget.id;
    if(id=='address'){
  
      
        app.chooseAddress(function (res) {
          that.setData({
            address: res
          })
        });
    }
  
  }
})
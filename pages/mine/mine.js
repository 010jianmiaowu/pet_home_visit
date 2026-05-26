const { users, pets } = require('../../data/mockData.js')

Page({
  data: {
    user: {},
    pets: []
  },

  onLoad() {
    this.loadUser()
    this.loadPets()
  },

  loadUser() {
    const user = users[0]
    this.setData({ user })
  },

  loadPets() {
    this.setData({ pets })
  },

  goToProfile() {
    wx.navigateTo({
      url: '/pages/profile/profile'
    })
  },

  addPet() {
    wx.showToast({
      title: '添加宠物功能',
      icon: 'none'
    })
  }
})
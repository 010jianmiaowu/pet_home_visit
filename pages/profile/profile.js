const { users, posts } = require('../../data/mockData.js')

Page({
  data: {
    user: {},
    userPosts: [],
    currentTab: 'publish'
  },

  onLoad() {
    this.loadUser()
    this.loadUserPosts()
  },

  loadUser() {
    const user = users[0]
    this.setData({ user })
  },

  loadUserPosts() {
    const userPosts = posts.slice(0, 6)
    this.setData({ userPosts })
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ currentTab: tab })
  }
})
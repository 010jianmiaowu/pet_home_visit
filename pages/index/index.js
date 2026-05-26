const { posts: mockPosts } = require('../../data/mockData.js')

Page({
  data: {
    currentTab: 'recommend',
    posts: []
  },

  onLoad() {
    this.loadPosts()
  },

  loadPosts() {
    const posts = mockPosts.map(post => ({
      ...post,
      isLiked: false,
      isFavorited: false
    }))
    this.setData({ posts })
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ currentTab: tab })
  },

  handleLike(e) {
    const postId = e.currentTarget.dataset.postid
    const posts = this.data.posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        }
      }
      return post
    })
    this.setData({ posts })
  },

  handleFavorite(e) {
    const postId = e.currentTarget.dataset.postid
    const posts = this.data.posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isFavorited: !post.isFavorited,
          favorites: post.isFavorited ? post.favorites - 1 : post.favorites + 1
        }
      }
      return post
    })
    this.setData({ posts })
  },

  goToDetail(e) {
    const postId = e.currentTarget.dataset.postid
    wx.navigateTo({
      url: `/pages/detail/detail?postId=${postId}`
    })
  }
})
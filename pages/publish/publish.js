Page({
  data: {
    content: '',
    images: [],
    allowComment: true,
    syncFriendCircle: false
  },

  goBack() {
    wx.navigateBack()
  },

  goNext() {
    if (!this.data.content.trim() && this.data.images.length === 0) {
      wx.showToast({
        title: '请添加内容',
        icon: 'none'
      })
      return
    }
    wx.showToast({
      title: '发布成功',
      icon: 'success'
    })
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }, 1500)
  },

  chooseImage() {
    if (this.data.images.length >= 9) {
      wx.showToast({
        title: '最多添加9张图片',
        icon: 'none'
      })
      return
    }
    
    wx.chooseImage({
      count: 9 - this.data.images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          images: [...this.data.images, ...res.tempFilePaths]
        })
      }
    })
  },

  onContentInput(e) {
    this.setData({ content: e.detail.value })
  },

  onAllowCommentChange(e) {
    this.setData({ allowComment: e.detail.value })
  },

  onSyncFriendCircleChange(e) {
    this.setData({ syncFriendCircle: e.detail.value })
  }
})
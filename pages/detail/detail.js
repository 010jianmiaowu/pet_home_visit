const { posts, comments: mockComments } = require('../../data/mockData.js')

Page({
  data: {
    post: {},
    comments: [],
    isLiked: false,
    isFavorited: false,
    isFollowing: false,
    commentInput: ''
  },

  onLoad(options) {
    const postId = options.postId
    this.loadPost(postId)
    this.loadComments(postId)
  },

  loadPost(postId) {
    const post = posts.find(p => p.id === postId)
    if (post) {
      this.setData({ post })
    }
  },

  loadComments(postId) {
    const comments = mockComments
      .filter(c => c.postId === postId)
      .map(c => ({ ...c, isLiked: false }))
    this.setData({ comments })
  },

  handleLike() {
    this.setData({
      isLiked: !this.data.isLiked,
      post: {
        ...this.data.post,
        likes: this.data.isLiked 
          ? this.data.post.likes - 1 
          : this.data.post.likes + 1
      }
    })
  },

  handleFavorite() {
    this.setData({
      isFavorited: !this.data.isFavorited,
      post: {
        ...this.data.post,
        favorites: this.data.isFavorited 
          ? this.data.post.favorites - 1 
          : this.data.post.favorites + 1
      }
    })
  },

  handleFollow() {
    this.setData({
      isFollowing: !this.data.isFollowing
    })
  },

  handleCommentLike(e) {
    const commentId = e.currentTarget.dataset.commentid
    const comments = this.data.comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          isLiked: !c.isLiked,
          likes: c.isLiked ? c.likes - 1 : c.likes + 1
        }
      }
      return c
    })
    this.setData({ comments })
  },

  onCommentInput(e) {
    this.setData({ commentInput: e.detail.value })
  },

  sendComment() {
    if (!this.data.commentInput.trim()) return
    
    const newComment = {
      id: `c${Date.now()}`,
      postId: this.data.post.id,
      userId: 'current',
      username: '我',
      avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20avatar%20portrait%20warm%20style&image_size=square',
      content: this.data.commentInput,
      likes: 0,
      createdAt: '刚刚',
      isLiked: false
    }
    
    this.setData({
      comments: [...this.data.comments, newComment],
      commentInput: '',
      post: {
        ...this.data.post,
        comments: this.data.post.comments + 1
      }
    })
  }
})
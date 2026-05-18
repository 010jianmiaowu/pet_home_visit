<template>
  <view class="page-container">
    <view class="chat-header">
      <view class="header-left" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <view class="header-center">
        <text class="chat-title">在线客服</text>
        <view class="online-status">
          <view class="status-dot"></view>
          <text class="status-text">在线</text>
        </view>
      </view>
      <view class="header-right">
        <text class="header-icon">⋮</text>
      </view>
    </view>

    <view class="chat-content-wrapper">
      <scroll-view 
        class="chat-content" 
        scroll-y 
        :scroll-into-view="scrollToId"
        :scroll-with-animation="true"
      >
      <view 
        v-for="(msg, index) in messages" 
        :key="index"
        :id="'msg-' + index"
        class="message-item"
        :class="{ 'is-self': msg.isSelf }"
      >
        <view class="avatar">
          <text>{{ msg.avatar }}</text>
        </view>
        <view class="message-content">
          <text class="message-text">{{ msg.content }}</text>
          <text class="message-time">{{ msg.time }}</text>
        </view>
      </view>
    </scroll-view>
    </view>

    <view class="input-area">
      <view class="input-left">
        <text class="input-icon">😀</text>
      </view>
      <input 
        class="chat-input" 
        v-model="inputText" 
        placeholder="请输入消息..."
        @confirm="sendMessage"
      />
      <view class="input-right">
        <view class="send-btn" :class="{ active: inputText.trim() }" @click="sendMessage">
          <text class="send-text">发送</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

interface Message {
  id: number
  avatar: string
  content: string
  time: string
  isSelf: boolean
}

const inputText = ref('')
const scrollToId = ref('')
const messages = ref<Message[]>([
  {
    id: 1,
    avatar: '🤖',
    content: '您好！欢迎来到丰速行宠物洗护客服中心，请问有什么可以帮您的？',
    time: '10:00',
    isSelf: false
  },
  {
    id: 2,
    avatar: '🐾',
    content: '您好，我想咨询一下上门服务的范围。',
    time: '10:01',
    isSelf: true
  },
  {
    id: 3,
    avatar: '🤖',
    content: '您好！目前我们的上门服务覆盖北京市五环以内区域。对于五环以外的订单，可能会产生额外的远程服务费，具体费用会在下单时显示。我们正在逐步扩展服务范围，请关注后续更新。',
    time: '10:02',
    isSelf: false
  }
])

function goBack() {
  uni.navigateBack()
}

function sendMessage() {
  if (!inputText.value.trim()) return
  
  const now = new Date()
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  
  messages.value.push({
    id: Date.now(),
    avatar: '🐾',
    content: inputText.value,
    time: timeStr,
    isSelf: true
  })
  
  inputText.value = ''
  
  nextTick(() => {
    scrollToId.value = 'msg-' + (messages.value.length - 1)
    
    setTimeout(() => {
      const replies = [
        '好的，我了解了您的问题，请稍等片刻...',
        '感谢您的反馈，我们会尽快处理！',
        '请问还有其他问题需要帮助吗？',
        '很高兴能为您服务！',
        '请放心，我们会妥善处理您的需求。'
      ]
      const reply = replies[Math.floor(Math.random() * replies.length)]
      const replyTime = new Date()
      const replyTimeStr = `${replyTime.getHours().toString().padStart(2, '0')}:${replyTime.getMinutes().toString().padStart(2, '0')}`
      
      messages.value.push({
        id: Date.now(),
        avatar: '🤖',
        content: reply,
        time: replyTimeStr,
        isSelf: false
      })
      
      nextTick(() => {
        scrollToId.value = 'msg-' + (messages.value.length - 1)
      })
    }, 1000)
  })
}
</script>

<style lang="scss" scoped>
.page-container {
  height: 100vh;
  background: #F5F7FA;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 32rpx;
  padding-top: 60rpx;
  height: 140rpx;
  background: #1a3a52;
  box-sizing: border-box;
}

.header-left {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 40rpx;
  color: #fff;
}

.header-center {
  flex: 1;
  text-align: center;
}

.chat-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #fff;
  display: block;
}

.online-status {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8rpx;
}

.status-dot {
  width: 16rpx;
  height: 16rpx;
  background: #4CAF50;
  border-radius: 50%;
  margin-right: 8rpx;
}

.status-text {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.7);
}

.header-right {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-icon {
  font-size: 36rpx;
  color: #fff;
}

.chat-content-wrapper {
  flex: 1;
  padding-top: 140rpx;
  padding-bottom: 140rpx;
  overflow: hidden;
}

.chat-content {
  height: 100%;
  padding: 24rpx;
}

.message-item {
  display: flex;
  margin-bottom: 32rpx;
}

.message-item.is-self {
  flex-direction: row-reverse;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: #E8F5E9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  flex-shrink: 0;
}

.message-item.is-self .avatar {
  background: #1a3a52;
}

.message-content {
  max-width: 70%;
  margin: 0 20rpx;
}

.message-text {
  display: block;
  padding: 20rpx 28rpx;
  background: #fff;
  border-radius: 24rpx;
  font-size: 28rpx;
  color: #333;
  line-height: 1.5;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
}

.message-item.is-self .message-text {
  background: #1a3a52;
  color: #fff;
  border-radius: 24rpx;
}

.message-time {
  display: block;
  font-size: 22rpx;
  color: #999;
  margin-top: 12rpx;
}

.message-item.is-self .message-time {
  text-align: right;
}

.input-area {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 20rpx 24rpx;
  padding-bottom: 60rpx;
  background: #fff;
  border-top: 2rpx solid #F0F0F0;
}

.input-left {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-icon {
  font-size: 40rpx;
}

.chat-input {
  flex: 1;
  height: 80rpx;
  background: #F5F5F5;
  border-radius: 40rpx;
  padding: 0 32rpx;
  font-size: 28rpx;
}

.input-right {
  width: 120rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-btn {
  padding: 16rpx 32rpx;
  background: #E8E8E8;
  border-radius: 40rpx;
}

.send-btn.active {
  background: #1a3a52;
}

.send-text {
  font-size: 28rpx;
  color: #999;
}

.send-btn.active .send-text {
  color: #fff;
}
</style>
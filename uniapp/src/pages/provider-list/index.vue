<template>
  <view class="container">
    <view class="header">
      <view class="header-left" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="header-title">选择服务者</text>
      <view class="header-right"></view>
    </view>

    <view class="filter-bar">
      <view 
        class="filter-item"
        :class="{ active: sortType === 'score' }"
        @click="sortType = 'score'"
      >
        <text>⭐ 好评优先</text>
      </view>
      <view 
        class="filter-item"
        :class="{ active: sortType === 'distance' }"
        @click="sortType = 'distance'"
      >
        <text>📍 距离最近</text>
      </view>
      <view 
        class="filter-item"
        :class="{ active: sortType === 'price' }"
        @click="sortType = 'price'"
      >
        <text>💰 价格最低</text>
      </view>
    </view>

    <view class="provider-list">
      <view 
        v-for="provider in providers" 
        :key="provider.id"
        class="provider-card"
        :class="{ selected: selectedProvider === provider.id }"
        @click="selectProvider(provider.id)"
      >
        <view class="provider-avatar">
          <text class="avatar-icon">{{ provider.avatar }}</text>
        </view>
        <view class="provider-info">
          <view class="provider-header">
            <text class="provider-name">{{ provider.name }}</text>
            <view class="provider-tags">
              <text v-if="provider.isVerified" class="tag verified">已认证</text>
              <text v-if="provider.isTop" class="tag top">优选</text>
            </view>
          </view>
          <view class="provider-stats">
            <text class="stat-item">⭐ {{ provider.score }}</text>
            <text class="stat-item">📦 {{ provider.completed }}单</text>
            <text class="stat-item">📍 {{ provider.distance }}km</text>
          </view>
          <view class="provider-skills">
            <text v-for="skill in provider.skills" :key="skill" class="skill-tag">{{ skill }}</text>
          </view>
        </view>
        <view class="provider-action">
          <view class="check-circle" :class="{ checked: selectedProvider === provider.id }">
            <text v-if="selectedProvider === provider.id">✓</text>
          </view>
        </view>
      </view>
    </view>

    <view class="footer">
      <view class="footer-info">
        <text class="info-text">已选服务者</text>
        <text class="provider-name">{{ getSelectedProvider?.name || '请选择' }}</text>
      </view>
      <view class="confirm-btn" :class="{ active: selectedProvider }" @click="confirmSelect">
        <text>确认选择</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Provider {
  id: number
  name: string
  avatar: string
  score: number
  completed: number
  distance: number
  skills: string[]
  isVerified: boolean
  isTop: boolean
}

const sortType = ref('score')
const selectedProvider = ref<number | null>(null)

const providers = ref<Provider[]>([
  {
    id: 1,
    name: '张师傅',
    avatar: '👨‍🔧',
    score: 4.9,
    completed: 328,
    distance: 1.2,
    skills: ['洗澡', 'SPA', '剪毛'],
    isVerified: true,
    isTop: true
  },
  {
    id: 2,
    name: '李阿姨',
    avatar: '👩‍🦰',
    score: 4.8,
    completed: 256,
    distance: 2.1,
    skills: ['洗澡', '美容', '护理'],
    isVerified: true,
    isTop: false
  },
  {
    id: 3,
    name: '王师傅',
    avatar: '👨‍🦱',
    score: 4.7,
    completed: 189,
    distance: 3.5,
    skills: ['洗澡', '修甲', '按摩'],
    isVerified: true,
    isTop: false
  },
  {
    id: 4,
    name: '陈姐',
    avatar: '👩‍⚕️',
    score: 4.9,
    completed: 412,
    distance: 1.8,
    skills: ['洗澡', 'SPA', '护理', '美容'],
    isVerified: true,
    isTop: true
  }
])

const getSelectedProvider = computed(() => {
  return providers.value.find(p => p.id === selectedProvider.value)
})

function goBack() {
  uni.navigateBack()
}

function selectProvider(id: number) {
  selectedProvider.value = id
}

function confirmSelect() {
  if (!selectedProvider.value) {
    uni.showToast({ title: '请选择服务者', icon: 'none' })
    return
  }
  
  uni.navigateTo({ url: '/pages/order-confirm/index' })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #f5f7fa;
  padding-bottom: 140rpx;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60rpx 32rpx 24rpx;
  background: #fff;
}

.header-left {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 56rpx;
  color: #1a3a52;
}

.header-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #1a3a52;
}

.header-right {
  width: 80rpx;
}

.filter-bar {
  display: flex;
  background: #fff;
  padding: 20rpx 32rpx;
  gap: 20rpx;
  border-top: 2rpx solid #f0f0f0;
}

.filter-item {
  padding: 16rpx 28rpx;
  background: #f5f7fa;
  border-radius: 32rpx;
}

.filter-item.active {
  background: #4facfe;
}

.filter-item text {
  font-size: 24rpx;
  color: #5a6b7d;
}

.filter-item.active text {
  color: #fff;
}

.provider-list {
  padding: 24rpx;
}

.provider-card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  border: 3rpx solid transparent;
}

.provider-card.selected {
  border-color: #4facfe;
  background: #f0f8ff;
}

.provider-avatar {
  width: 100rpx;
  height: 100rpx;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
}

.avatar-icon {
  font-size: 48rpx;
}

.provider-info {
  flex: 1;
}

.provider-header {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;
}

.provider-name {
  font-size: 30rpx;
  font-weight: 600;
  color: #1a3a52;
  margin-right: 12rpx;
}

.provider-tags {
  display: flex;
  gap: 8rpx;
}

.tag {
  font-size: 20rpx;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
}

.tag.verified {
  background: #e8f5e9;
  color: #4caf50;
}

.tag.top {
  background: #fff3e0;
  color: #ff9800;
}

.provider-stats {
  display: flex;
  gap: 20rpx;
  margin-bottom: 12rpx;
}

.stat-item {
  font-size: 22rpx;
  color: #90a4ae;
}

.provider-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
}

.skill-tag {
  font-size: 20rpx;
  padding: 6rpx 14rpx;
  background: #f0f4f8;
  color: #5a6b7d;
  border-radius: 16rpx;
}

.provider-action {
  width: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-circle {
  width: 44rpx;
  height: 44rpx;
  border: 3rpx solid #d0d0d0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: transparent;
}

.check-circle.checked {
  background: #4facfe;
  border-color: #4facfe;
  color: #fff;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 32rpx;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  background: #fff;
  border-top: 2rpx solid #f0f0f0;
}

.footer-info {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.info-text {
  font-size: 26rpx;
  color: #90a4ae;
}

.footer-info .provider-name {
  font-size: 28rpx;
  font-weight: 600;
  color: #1a3a52;
}

.confirm-btn {
  background: #e0e0e0;
  padding: 24rpx 64rpx;
  border-radius: 44rpx;
}

.confirm-btn.active {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.confirm-btn text {
  font-size: 30rpx;
  color: #90a4ae;
}

.confirm-btn.active text {
  color: #fff;
  font-weight: 600;
}
</style>
<template>
  <view class="container">
    <view class="profile-section">
      <view class="profile-bg"></view>
      <view class="profile-content">
        <view class="profile-avatar">👤</view>
        <view class="profile-detail">
          <text class="profile-name">用户昵称</text>
          <text class="profile-phone">138****8888</text>
        </view>
      </view>
    </view>

    <view class="menu-list">
      <view class="menu-item" @click="goToPets">
        <view class="icon-list">
          <text class="menu-icon">🐾</text>
        </view>
        <text class="menu-text">宠物信息</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="menu-item" @click="goToOrderList">
        <view class="icon-list">
          <text class="menu-icon">📋</text>
        </view>
        <text class="menu-text">订单信息</text>
        <view class="menu-badge">3</view>
        <text class="menu-arrow">›</text>
      </view>
      <view class="menu-item" @click="goToAddress">
        <view class="icon-list">
          <text class="menu-icon">📍</text>
        </view>
        <text class="menu-text">地址管理</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="menu-item" @click="goToInvoice">
        <view class="icon-list">
          <text class="menu-icon">🧾</text>
        </view>
        <text class="menu-text">开票</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="menu-item" @click="goToSupport">
        <view class="icon-list">
          <text class="menu-icon">💬</text>
        </view>
        <text class="menu-text">客服中心</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="menu-item" @click="goToAbout">
        <view class="icon-list">
          <text class="menu-icon">ℹ️</text>
        </view>
        <text class="menu-text">关于我们</text>
        <text class="menu-arrow">›</text>
      </view>
    </view>

    <view class="footer-space"></view>
  </view>
</template>

<script setup lang="ts">
function goToPets() {
  uni.navigateTo({ url: '/pages/pets/index' })
}

function goToOrderList() {
  uni.navigateTo({ url: '/pages/order-list/index' })
}

function goToAddress() {
  uni.navigateTo({ url: '/pages/address/index' })
}

function goToInvoice() {
  uni.navigateTo({ url: '/pages/invoice/index' })
}

function goToSupport() {
  uni.navigateTo({ url: '/pages/support/index' })
}

function goToAbout() {
  uni.navigateTo({ url: '/pages/about/index' })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #ffffff;
}

.profile-section {
  position: relative;
  padding: 32rpx;
  padding-top: 60rpx;
  overflow: hidden;
}

.profile-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #1a3a52 0%, #2d5a7b 100%);
}

.profile-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
}

.profile-avatar {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48rpx;
  margin-right: 24rpx;
}

.profile-detail {
  flex: 1;
}

.profile-name {
  font-size: 28rpx;
  font-weight: 600;
  display: block;
  color: #fff;
}

.profile-phone {
  font-size: 22rpx;
  opacity: 0.9;
  margin-top: 8rpx;
  display: block;
  color: #fff;
}

.menu-list {
  background: #fff;
  margin: 24rpx;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 16rpx rgba(26, 58, 82, 0.08);
}

.menu-item {
  display: flex;
  align-items: center;
  height: 128rpx;
  padding-left: 32rpx;
  border-bottom: 2rpx solid #e8e8e8;
}

.menu-item:last-child {
  border-bottom: none;
}

.icon-list {
  width: 64rpx;
  height: 64rpx;
  background: #f5f5f5;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
}

.menu-icon {
  font-size: 32rpx;
}

.menu-text {
  flex: 1;
  font-size: 28rpx;
  color: #1a3a52;
}

.menu-arrow {
  color: #b0bec5;
  font-size: 32rpx;
  margin-right: 32rpx;
}

.menu-badge {
  background: #1a3a52;
  color: #fff;
  font-size: 20rpx;
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
  margin-right: 12rpx;
}

.footer-space {
  height: 120rpx;
}
</style>
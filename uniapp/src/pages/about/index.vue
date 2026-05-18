<template>
  <view class="container">
    <view class="about-header">
      <view class="header-bg"></view>
      <view class="header-content">
        <view class="logo-wrapper">
          <text class="logo">🐾</text>
        </view>
        <text class="title">丰速行宠物洗护</text>
        <text class="subtitle">专业上门宠物护理服务平台</text>
      </view>
    </view>

    <view class="about-section">
      <view class="section-title">
        <text class="icon">📖</text>
        <text class="text">关于我们</text>
      </view>
      <view class="about-content">
        <text class="about-text">
          丰速行宠物洗护是一家专注于宠物上门护理服务的专业平台。我们致力于为宠物主人提供便捷、专业、安全的宠物护理体验。
        </text>
        <text class="about-text">
          我们拥有专业的移动洗护车队和经过严格培训的美容师团队，采用先进的洗护设备和天然环保的洗护产品，确保每一位宠物都能享受到高品质的护理服务。
        </text>
        <text class="about-text">
          秉承"让爱宠更健康、更美丽"的理念，我们不断提升服务品质，为宠物和宠物主人创造更美好的生活体验。
        </text>
      </view>
    </view>

    <view class="about-section">
      <view class="section-title">
        <text class="icon">🎯</text>
        <text class="text">服务理念</text>
      </view>
      <view class="concept-list">
        <view class="concept-item" v-for="(item, index) in concepts" :key="index">
          <view class="concept-icon">{{ item.icon }}</view>
          <view class="concept-content">
            <text class="concept-title">{{ item.title }}</text>
            <text class="concept-desc">{{ item.desc }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="about-section">
      <view class="section-title">
        <text class="icon">📊</text>
        <text class="text">平台数据</text>
      </view>
      <view class="stats-grid">
        <view class="stat-item" v-for="(stat, index) in stats" :key="index">
          <text class="stat-value">{{ stat.value }}</text>
          <text class="stat-label">{{ stat.label }}</text>
        </view>
      </view>
    </view>

    <view class="about-section">
      <view class="section-title">
        <text class="icon">📞</text>
        <text class="text">联系我们</text>
      </view>
      <view class="contact-info">
        <view class="contact-row">
          <text class="contact-icon">☎️</text>
          <view class="contact-detail">
            <text class="contact-label">客服热线</text>
            <text class="contact-value">400-888-8888</text>
          </view>
        </view>
        <view class="contact-row">
          <text class="contact-icon">📧</text>
          <view class="contact-detail">
            <text class="contact-label">商务邮箱</text>
            <text class="contact-value">business@fengsuxing.com</text>
          </view>
        </view>
        <view class="contact-row">
          <text class="contact-icon">📍</text>
          <view class="contact-detail">
            <text class="contact-label">公司地址</text>
            <text class="contact-value">北京市朝阳区望京SOHO T1</text>
          </view>
        </view>
      </view>
    </view>

    <view class="about-section">
      <view class="section-title">
        <text class="icon">📝</text>
        <text class="text">版本信息</text>
      </view>
      <view class="version-info">
        <text class="version-label">版本号</text>
        <text class="version-value">v1.0.0</text>
      </view>
      <view class="version-info">
        <text class="version-label">更新时间</text>
        <text class="version-value">2024年1月</text>
      </view>
    </view>

    <view class="bottom-space"></view>
  </view>
</template>

<script setup lang="ts">
const concepts = [
  { icon: '❤️', title: '爱心呵护', desc: '用爱心对待每一只宠物' },
  { icon: '✨', title: '专业服务', desc: '专业团队提供优质服务' },
  { icon: '🛡️', title: '安全保障', desc: '全程安全可追溯' },
  { icon: '⏰', title: '准时高效', desc: '准时到达，高效服务' }
]

const stats = [
  { value: '50+', label: '服务车队' },
  { value: '200+', label: '专业美容师' },
  { value: '10万+', label: '服务宠物' },
  { value: '98%', label: '满意度' }
]
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #F5F7FA;
}

.about-header {
  position: relative;
  padding: 120rpx 40rpx 60rpx;
  overflow: hidden;
  text-align: center;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #00D4AA 0%, #00B894 100%);
}

.header-content {
  position: relative;
  z-index: 1;
}

.logo-wrapper {
  width: 160rpx;
  height: 160rpx;
  margin: 0 auto 32rpx;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  font-size: 80rpx;
}

.title {
  font-size: 48rpx;
  font-weight: 700;
  color: #fff;
  display: block;
  margin-bottom: 16rpx;
}

.subtitle {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.85);
}

.about-section {
  background: #fff;
  margin: 24rpx;
  border-radius: 24rpx;
  padding: 32rpx;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
}

.section-title {
  display: flex;
  align-items: center;
  margin-bottom: 28rpx;
}

.section-title .icon {
  font-size: 36rpx;
  margin-right: 16rpx;
}

.section-title .text {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.about-text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.8;
}

.concept-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
}

.concept-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28rpx 20rpx;
  background: #F8F9FA;
  border-radius: 20rpx;
}

.concept-icon {
  font-size: 56rpx;
  margin-bottom: 16rpx;
}

.concept-content {
  text-align: center;
}

.concept-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 8rpx;
}

.concept-desc {
  font-size: 22rpx;
  color: #999;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16rpx;
}

.stat-item {
  text-align: center;
  padding: 24rpx 16rpx;
  background: linear-gradient(135deg, #F8FFFE 0%, #F0FFF8 100%);
  border-radius: 16rpx;
}

.stat-value {
  font-size: 40rpx;
  font-weight: 700;
  color: #00D4AA;
  display: block;
  margin-bottom: 8rpx;
}

.stat-label {
  font-size: 20rpx;
  color: #999;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.contact-row {
  display: flex;
  align-items: center;
}

.contact-icon {
  font-size: 36rpx;
  margin-right: 20rpx;
}

.contact-detail {
  flex: 1;
}

.contact-label {
  font-size: 24rpx;
  color: #999;
  display: block;
  margin-bottom: 6rpx;
}

.contact-value {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.version-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 2rpx solid #F0F0F0;
}

.version-info:last-child {
  border-bottom: none;
}

.version-label {
  font-size: 28rpx;
  color: #666;
}

.version-value {
  font-size: 28rpx;
  color: #333;
}

.bottom-space {
  height: 40rpx;
}
</style>
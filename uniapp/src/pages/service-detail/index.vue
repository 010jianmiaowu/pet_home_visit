<template>
  <view class="container" v-if="serviceData">
    <view class="service-detail-header">
      <image :src="serviceData.image" mode="aspectFill" class="header-image" />
      <view class="overlay">
        <text class="title">{{ serviceData.title }}</text>
        <text class="price">¥{{ serviceData.price }}起</text>
      </view>
    </view>

    <view class="service-detail-desc">
      <text class="section-title">服务介绍</text>
      <text class="description">{{ serviceData.description }}</text>
    </view>

    <view class="service-detail-features">
      <text class="section-title">服务特色</text>
      <view class="features-list">
        <view v-for="(feature, index) in serviceData.features" :key="index" class="feature-item">
          <text class="feature-icon">✓</text>
          <text class="feature-text">{{ feature }}</text>
        </view>
      </view>
    </view>

    <view class="action-area">
      <button class="btn-primary" @click="goToOrder">立即预约</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { serviceDetailData } from '@/data'
import type { ServiceDetail } from '@/data'

const serviceData = ref<ServiceDetail | null>(null)

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = (currentPage as any).$page?.options || {}
  const serviceKey = options.service || 'mobile'
  
  serviceData.value = serviceDetailData[serviceKey] || serviceDetailData['mobile']
})

function goToOrder() {
  uni.navigateTo({ url: '/pages/order/index' })
}
</script>

<style lang="scss" scoped>
.service-detail-header {
  position: relative;
  height: 320rpx;
}

.header-image {
  width: 100%;
  height: 100%;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  padding: 50rpx 32rpx 32rpx;
  color: #fff;
}

.title {
  font-size: 32rpx;
  font-weight: 600;
  display: block;
}

.price {
  font-size: 22rpx;
  opacity: 0.9;
}

.service-detail-desc {
  padding: 32rpx;
  background: #fff;
  margin-top: 20rpx;
}

.section-title {
  font-size: 26rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 18rpx;
  display: block;
}

.description {
  font-size: 22rpx;
  color: #666;
  line-height: 1.8;
}

.service-detail-features {
  padding: 32rpx;
  background: #fff;
  margin-top: 20rpx;
}

.features-list {
  padding-left: 10rpx;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 18rpx 0;
  border-bottom: 2rpx solid #f0f0f0;
}

.feature-item:last-child {
  border-bottom: none;
}

.feature-icon {
  font-size: 24rpx;
  color: #00D4AA;
  margin-right: 16rpx;
}

.feature-text {
  font-size: 22rpx;
  color: #666;
}

.action-area {
  padding: 32rpx;
  padding-bottom: 120rpx;
}
</style>

<template>
  <view class="container">
    <view class="header">
      <view class="header-left" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="header-title">确认支付</text>
      <view class="header-right"></view>
    </view>

    <view class="order-card">
      <view class="card-title">订单信息</view>
      <view class="order-info">
        <view class="info-row">
          <text class="info-label">订单编号</text>
          <text class="info-value">{{ orderId }}</text>
        </view>
        <view class="info-row">
          <text class="info-label">服务项目</text>
          <text class="info-value">{{ serviceNames }}</text>
        </view>
        <view class="info-row">
          <text class="info-label">服务时间</text>
          <text class="info-value">{{ serviceTime }}</text>
        </view>
        <view class="info-row">
          <text class="info-label">服务地址</text>
          <text class="info-value">{{ address }}</text>
        </view>
        <view class="info-row">
          <text class="info-label">宠物信息</text>
          <text class="info-value">{{ petInfo }}</text>
        </view>
      </view>
    </view>

    <view class="payment-card">
      <view class="card-title">支付方式</view>
      <view class="payment-options">
        <view 
          class="payment-item"
          :class="{ active: selectedPayment === 'wechat' }"
          @click="selectedPayment = 'wechat'"
        >
          <view class="payment-icon">💳</view>
          <view class="payment-info">
            <text class="payment-name">微信支付</text>
            <text class="payment-desc">推荐使用</text>
          </view>
          <view class="payment-check" :class="{ checked: selectedPayment === 'wechat' }">✓</view>
        </view>
        <view 
          class="payment-item"
          :class="{ active: selectedPayment === 'alipay' }"
          @click="selectedPayment = 'alipay'"
        >
          <view class="payment-icon">🔷</view>
          <view class="payment-info">
            <text class="payment-name">支付宝</text>
            <text class="payment-desc">支持花呗</text>
          </view>
          <view class="payment-check" :class="{ checked: selectedPayment === 'alipay' }">✓</view>
        </view>
      </view>
    </view>

    <view class="amount-card">
      <view class="amount-row">
        <text class="amount-label">应付金额</text>
        <view class="amount-value-wrap">
          <text class="amount-symbol">¥</text>
          <text class="amount-value">{{ totalAmount }}</text>
        </view>
      </view>
    </view>
  </view>

  <view class="footer">
    <view class="footer-left">
      <text class="footer-label">合计</text>
      <view class="footer-amount">
        <text class="footer-symbol">¥</text>
        <text class="footer-value">{{ totalAmount }}</text>
      </view>
    </view>
    <view class="pay-btn" @click="handlePay">
      <text class="pay-text">确认支付</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const orderId = ref('FSX' + Date.now())
const serviceNames = ref('宠物洗澡, SPA护理')
const serviceTime = ref('2024-01-15 14:00')
const address = ref('北京市朝阳区望京SOHO T1')
const petInfo = ref('旺财 · 狗狗 · 中小型')
const totalAmount = ref(200)
const selectedPayment = ref('wechat')

function goBack() {
  uni.navigateBack()
}

function handlePay() {
  uni.showLoading({ title: '支付中...' })
  
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({ 
      title: '支付成功', 
      icon: 'success',
      success: () => {
        setTimeout(() => {
          uni.navigateTo({ url: '/pages/payment-success/index' })
        }, 1500)
      }
    })
  }, 2000)
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #f5f7fa;
  padding-bottom: 180rpx;
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

.order-card, .payment-card, .amount-card {
  background: #fff;
  margin: 24rpx;
  border-radius: 16rpx;
  padding: 24rpx;
}

.card-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #1a3a52;
  margin-bottom: 20rpx;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 16rpx 0;
  border-bottom: 2rpx solid #f0f0f0;
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 26rpx;
  color: #90a4ae;
}

.info-value {
  font-size: 26rpx;
  color: #1a3a52;
  text-align: right;
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.payment-options {
  display: flex;
  flex-direction: column;
}

.payment-item {
  display: flex;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 2rpx solid #f0f0f0;
}

.payment-item:last-child {
  border-bottom: none;
}

.payment-item.active {
  background: #f8f9fa;
  margin: 0 -24rpx;
  padding: 24rpx;
  border-radius: 12rpx;
}

.payment-icon {
  font-size: 48rpx;
  margin-right: 20rpx;
}

.payment-info {
  flex: 1;
}

.payment-name {
  display: block;
  font-size: 28rpx;
  color: #1a3a52;
  margin-bottom: 6rpx;
}

.payment-desc {
  font-size: 22rpx;
  color: #90a4ae;
}

.payment-check {
  width: 40rpx;
  height: 40rpx;
  border: 3rpx solid #d0d0d0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: transparent;
}

.payment-check.checked {
  background: #4facfe;
  border-color: #4facfe;
  color: #fff;
}

.amount-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.amount-label {
  font-size: 28rpx;
  color: #5a6b7d;
}

.amount-value-wrap {
  display: flex;
  align-items: baseline;
}

.amount-symbol {
  font-size: 28rpx;
  color: #ff6b6b;
  font-weight: 600;
}

.amount-value {
  font-size: 48rpx;
  color: #ff6b6b;
  font-weight: 700;
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

.footer-left {
  display: flex;
  align-items: baseline;
}

.footer-label {
  font-size: 26rpx;
  color: #5a6b7d;
  margin-right: 12rpx;
}

.footer-amount {
  display: flex;
  align-items: baseline;
}

.footer-symbol {
  font-size: 26rpx;
  color: #ff6b6b;
}

.footer-value {
  font-size: 40rpx;
  color: #ff6b6b;
  font-weight: 700;
}

.pay-btn {
  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
  padding: 24rpx 64rpx;
  border-radius: 44rpx;
}

.pay-text {
  font-size: 32rpx;
  font-weight: 600;
  color: #fff;
}
</style>
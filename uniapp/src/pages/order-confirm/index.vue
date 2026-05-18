<template>
  <view class="container">
    <view class="header">
      <view class="header-left" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="header-title">确认订单</text>
      <view class="header-right"></view>
    </view>

    <view class="address-card">
      <view class="card-icon">📍</view>
      <view class="address-info">
        <view class="address-header">
          <text class="contact-name">{{ contactName }}</text>
          <text class="contact-phone">{{ contactPhone }}</text>
        </view>
        <text class="address-detail">{{ address }}</text>
      </view>
    </view>

    <view class="service-card">
      <view class="card-title">服务信息</view>
      <view class="service-content">
        <view class="service-item">
          <text class="item-label">服务项目</text>
          <text class="item-value">{{ services }}</text>
        </view>
        <view class="service-item">
          <text class="item-label">服务时间</text>
          <text class="item-value">{{ serviceTime }}</text>
        </view>
        <view class="service-item">
          <text class="item-label">宠物信息</text>
          <text class="item-value">{{ petInfo }}</text>
        </view>
        <view class="service-item">
          <text class="item-label">服务者</text>
          <view class="provider-info">
            <text class="provider-avatar">👨‍🔧</text>
            <text class="provider-name">张师傅</text>
          </view>
        </view>
      </view>
    </view>

    <view class="fee-card">
      <view class="card-title">费用明细</view>
      <view class="fee-content">
        <view class="fee-item">
          <text class="fee-label">服务费用</text>
          <text class="fee-value">¥{{ serviceFee }}</text>
        </view>
        <view class="fee-item">
          <text class="fee-label">上门服务费</text>
          <text class="fee-value">¥{{ serviceFee }}</text>
        </view>
        <view class="fee-item">
          <text class="fee-label">优惠券</text>
          <text class="fee-value discount">-¥{{ discount }}</text>
        </view>
        <view class="fee-item total">
          <text class="fee-label">应付金额</text>
          <text class="fee-value highlight">¥{{ totalAmount }}</text>
        </view>
      </view>
    </view>

    <view class="remark-card">
      <text class="remark-label">备注（选填）</text>
      <input 
        class="remark-input" 
        v-model="remark" 
        placeholder="如有特殊需求，请在此备注"
      />
    </view>

    <view class="footer">
      <view class="footer-left">
        <text class="footer-label">合计</text>
        <view class="footer-amount">
          <text class="footer-symbol">¥</text>
          <text class="footer-value">{{ totalAmount }}</text>
        </view>
      </view>
      <view class="submit-btn" @click="submitOrder">
        <text>提交订单</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const contactName = ref('张先生')
const contactPhone = ref('138****8888')
const address = ref('北京市朝阳区望京SOHO T1 1503室')
const services = ref('宠物洗澡 + SPA护理')
const serviceTime = ref('2024-01-15 14:00')
const petInfo = ref('旺财 · 狗狗 · 中小型')
const serviceFee = ref(180)
const discount = ref(30)
const remark = ref('')

const totalAmount = ref(200)

function goBack() {
  uni.navigateBack()
}

function submitOrder() {
  uni.navigateTo({ url: '/pages/payment/index' })
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

.address-card {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  margin: 24rpx;
  padding: 32rpx;
  border-radius: 20rpx;
}

.card-icon {
  font-size: 48rpx;
  margin-right: 20rpx;
}

.address-info {
  flex: 1;
}

.address-header {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 8rpx;
}

.contact-name {
  font-size: 30rpx;
  font-weight: 600;
  color: #fff;
}

.contact-phone {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.8);
}

.address-detail {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
}

.service-card, .fee-card {
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

.service-content, .fee-content {
  display: flex;
  flex-direction: column;
}

.service-item, .fee-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16rpx 0;
  border-bottom: 2rpx solid #f0f0f0;
}

.service-item:last-child, .fee-item:last-child {
  border-bottom: none;
}

.service-item.total, .fee-item.total {
  padding-top: 24rpx;
  margin-top: 16rpx;
  border-top: 2rpx dashed #eee;
  border-bottom: none;
}

.item-label, .fee-label {
  font-size: 26rpx;
  color: #90a4ae;
}

.item-value, .fee-value {
  font-size: 26rpx;
  color: #1a3a52;
}

.fee-value.discount {
  color: #ff6b6b;
}

.fee-value.highlight {
  font-size: 36rpx;
  color: #ff6b6b;
  font-weight: 700;
}

.provider-info {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.provider-avatar {
  font-size: 36rpx;
}

.provider-name {
  font-size: 26rpx;
  color: #1a3a52;
}

.remark-card {
  background: #fff;
  margin: 24rpx;
  border-radius: 16rpx;
  padding: 24rpx;
}

.remark-label {
  font-size: 26rpx;
  color: #90a4ae;
  margin-bottom: 16rpx;
  display: block;
}

.remark-input {
  width: 100%;
  height: 120rpx;
  background: #f5f7fa;
  border-radius: 12rpx;
  padding: 20rpx;
  font-size: 26rpx;
  color: #1a3a52;
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

.submit-btn {
  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
  padding: 28rpx 80rpx;
  border-radius: 44rpx;
}

.submit-btn text {
  font-size: 32rpx;
  font-weight: 600;
  color: #fff;
}
</style>
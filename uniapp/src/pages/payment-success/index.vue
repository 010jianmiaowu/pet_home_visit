<template>
  <view class="container">
    <view class="success-icon">✓</view>
    <text class="success-title">支付成功</text>
    <text class="success-desc">您的订单已提交，等待服务者接单</text>
    
    <view class="order-card">
      <view class="order-header">
        <text class="order-id">订单编号：{{ orderId }}</text>
        <text class="order-status">待接单</text>
      </view>
      <view class="order-content">
        <view class="order-item">
          <text class="item-label">服务项目</text>
          <text class="item-value">宠物洗澡 + SPA护理</text>
        </view>
        <view class="order-item">
          <text class="item-label">服务时间</text>
          <text class="item-value">{{ serviceTime }}</text>
        </view>
        <view class="order-item">
          <text class="item-label">服务地址</text>
          <text class="item-value">{{ address }}</text>
        </view>
        <view class="order-item">
          <text class="item-label">宠物信息</text>
          <text class="item-value">{{ petInfo }}</text>
        </view>
        <view class="order-item total">
          <text class="item-label">订单金额</text>
          <text class="item-value highlight">¥{{ totalAmount }}</text>
        </view>
      </view>
    </view>

    <view class="tips-card">
      <view class="tips-title">温馨提示</view>
      <view class="tips-content">
        <text>• 服务者接单后将通过短信通知您</text>
        <text>• 如需取消订单，请在服务开始前操作</text>
        <text>• 服务过程中如有问题，请联系客服</text>
      </view>
    </view>

    <view class="action-area">
      <view class="btn-secondary" @click="viewOrder">
        <text>查看订单详情</text>
      </view>
      <view class="btn-primary" @click="goHome">
        <text>返回首页</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { orders } from '@/data'

const orderId = ref('FSX' + Date.now())
const serviceTime = ref('2024-01-15 14:00')
const address = ref('北京市朝阳区望京SOHO T1')
const petInfo = ref('旺财 · 狗狗 · 中小型')
const totalAmount = ref(200)

orders.unshift({
  id: orderId.value,
  status: 'pending',
  payStatus: 'paid',
  date: serviceTime.value.split(' ')[0],
  time: serviceTime.value.split(' ')[1],
  address: address.value,
  petId: 1,
  petName: petInfo.value.split(' · ')[2],
  service: '宠物洗澡 + SPA护理',
  totalPrice: totalAmount.value,
  canInvoice: true,
  provider: null
})

function viewOrder() {
  uni.navigateTo({ url: `/pages/order-detail/index?id=${orderId.value}` })
}

function goHome() {
  uni.switchTab({ url: '/pages/home/index' })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #4facfe 0%, #00f2fe 100%);
  padding: 120rpx 32rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.success-icon {
  width: 160rpx;
  height: 160rpx;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80rpx;
  color: #4facfe;
  margin-bottom: 32rpx;
  box-shadow: 0 10rpx 40rpx rgba(79, 172, 254, 0.3);
}

.success-title {
  font-size: 40rpx;
  font-weight: 600;
  color: #fff;
  margin-bottom: 16rpx;
}

.success-desc {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 48rpx;
}

.order-card {
  width: 100%;
  background: #fff;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
  padding-bottom: 20rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.order-id {
  font-size: 26rpx;
  color: #90a4ae;
}

.order-status {
  font-size: 26rpx;
  color: #ff6b6b;
  background: #fff5f5;
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
}

.order-content {
  display: flex;
  flex-direction: column;
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 16rpx 0;
}

.order-item.total {
  padding-top: 24rpx;
  margin-top: 16rpx;
  border-top: 2rpx dashed #eee;
}

.item-label {
  font-size: 26rpx;
  color: #90a4ae;
}

.item-value {
  font-size: 26rpx;
  color: #1a3a52;
}

.item-value.highlight {
  font-size: 32rpx;
  color: #ff6b6b;
  font-weight: 600;
}

.tips-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24rpx;
  padding: 24rpx;
  margin-bottom: 48rpx;
}

.tips-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #1a3a52;
  margin-bottom: 16rpx;
}

.tips-content {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.tips-content text {
  font-size: 24rpx;
  color: #78909c;
  line-height: 1.6;
}

.action-area {
  width: 100%;
  display: flex;
  gap: 24rpx;
}

.btn-secondary {
  flex: 1;
  padding: 28rpx;
  border-radius: 12rpx;
  border: 3rpx solid #fff;
  text-align: center;
}

.btn-secondary text {
  font-size: 30rpx;
  color: #fff;
  font-weight: 500;
}

.btn-primary {
  flex: 1;
  padding: 28rpx;
  border-radius: 12rpx;
  background: #fff;
  text-align: center;
}

.btn-primary text {
  font-size: 30rpx;
  color: #4facfe;
  font-weight: 600;
}
</style>
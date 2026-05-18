<template>
  <view class="container" v-if="order">
    <view class="order-detail-card">
      <view class="map-section">
        <view class="map-placeholder">
          <text class="map-icon">📍</text>
          <text class="map-address">{{ order.address }}</text>
        </view>
      </view>

      <view class="order-info">
        <view class="order-header">
          <text class="order-id">订单号: {{ order.id }}</text>
          <view class="status-group">
            <view :class="['status-badge', `status-${order.status}`]">
              {{ getStatusText(order.status) }}
            </view>
            <view :class="['status-badge', `pay-${order.payStatus}`]">
              {{ getPayStatusText(order.payStatus) }}
            </view>
          </view>
        </view>

        <view class="order-detail-content">
          <view class="order-row">
            <text class="label">预约时间</text>
            <text class="value">{{ order.date }} {{ order.time }}</text>
          </view>
          <view class="order-row">
            <text class="label">服务内容</text>
            <text class="value">{{ order.service }}</text>
          </view>
          <view class="order-row">
            <text class="label">服务对象</text>
            <text class="value">{{ order.petName }}</text>
          </view>
        </view>

        <view class="fee-detail">
          <view class="fee-row">
            <text class="fee-label">服务费用</text>
            <text class="fee-value">¥{{ order.totalPrice }}</text>
          </view>
          <view class="fee-row">
            <text class="fee-label">上门服务费</text>
            <text class="fee-value">¥0</text>
          </view>
          <view class="fee-row total">
            <text class="fee-label">合计</text>
            <text class="fee-value">¥{{ order.totalPrice }}</text>
          </view>
        </view>

        <view v-if="order.provider" class="provider-section">
          <view class="section-title">
            <text class="icon">👤</text>
            <text class="text">服务者信息</text>
          </view>
          <view class="provider-card">
            <view class="provider-avatar">👨‍🔧</view>
            <view class="provider-info">
              <text class="provider-name">{{ order.provider.name }}</text>
              <text class="provider-phone">{{ order.provider.phone }}</text>
              <text class="provider-rating">⭐ {{ order.provider.rating }}分</text>
            </view>
            <view class="provider-action">
              <button class="btn-call" @click="callProvider">📞 联系</button>
            </view>
          </view>
        </view>

        <view v-if="order.status === 'completed'" class="rating-section">
          <view class="section-title">
            <text class="icon">⭐</text>
            <text class="text">评价服务</text>
          </view>
          <view v-if="order.rated" class="rated-content">
            <text class="rated-icon">✅</text>
            <text class="rated-text">已完成评价</text>
          </view>
          <view v-else>
            <view class="rating-stars">
              <text 
                v-for="star in 5" 
                :key="star" 
                class="star"
                :class="{ active: rating >= star }"
                @click="rating = star"
              >☆</text>
            </view>
            <textarea 
              class="rating-input" 
              v-model="ratingText" 
              placeholder="请输入评价内容"
            />
            <button class="btn-primary" @click="submitRating">提交评价</button>
          </view>
        </view>

        <view v-if="order.status === 'canceled'" class="cancel-reason">
          <view class="section-title">
            <text class="icon">⚠️</text>
            <text class="text">订单取消</text>
          </view>
          <text class="reason-text">取消原因: {{ order.cancelReason || '用户取消' }}</text>
          <view v-if="order.payStatus === 'refunded'" class="refund-info">
            <text class="refund-text">💰 退款已到账</text>
          </view>
          <view v-if="order.payStatus === 'refunding'" class="refund-info">
            <text class="refund-text">⏳ 退款处理中...</text>
          </view>
        </view>

        <view class="action-section">
          <button 
            v-if="order.status === 'pending' && order.payStatus === 'unpaid'" 
            class="btn-pay btn-primary" 
            @click="handlePay"
          >立即支付 ¥{{ order.totalPrice }}</button>
          <button 
            v-if="order.status === 'pending'" 
            class="btn-cancel" 
            @click="cancelOrder"
          >取消订单</button>
          <button 
            v-if="order.status === 'completed' && !order.rated" 
            class="btn-rate btn-primary" 
            @click="submitRating"
          >去评价</button>
          <button 
            v-if="order.canInvoice && order.status === 'completed'" 
            class="btn-invoice" 
            @click="goToInvoice"
          >申请开票</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { orders, getStatusText, getPayStatusText } from '@/data'
import type { Order } from '@/data'

const order = ref<Order | null>(null)
const rating = ref(0)
const ratingText = ref('')

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = (currentPage as any).$page?.options || {}
  const orderId = options.id || ''
  
  order.value = orders.find(o => o.id === orderId) || null
})

function submitRating() {
  if (rating.value === 0) {
    uni.showToast({ title: '请选择评分', icon: 'none' })
    return
  }

  if (order.value) {
    order.value.rated = true
    uni.showToast({ title: '评价成功', icon: 'success' })
  }
}

function cancelOrder() {
  uni.showModal({
    title: '提示',
    content: '确定要取消订单吗？',
    success: (res) => {
      if (res.confirm && order.value) {
        order.value.status = 'canceled'
        order.value.cancelReason = '用户取消'
        if (order.value.payStatus === 'paid') {
          order.value.payStatus = 'refunding'
          setTimeout(() => {
            if (order.value) {
              order.value.payStatus = 'refunded'
            }
          }, 1500)
        }
        uni.showToast({ title: '订单已取消', icon: 'success' })
      }
    }
  })
}

function handlePay() {
  if (!order.value) return
  
  uni.showModal({
    title: '支付提示',
    content: `确认支付 ¥${order.value.totalPrice} 吗？`,
    success: (res) => {
      if (res.confirm && order.value) {
        order.value.payStatus = 'paid'
        uni.showToast({ title: '支付成功', icon: 'success' })
      }
    }
  })
}

function callProvider() {
  if (!order.value?.provider) return
  
  uni.makePhoneCall({
    phoneNumber: order.value.provider.phone.replace(/\*/g, '0'),
    success: () => {},
    fail: () => {
      uni.showToast({ title: '呼叫失败', icon: 'none' })
    }
  })
}

function goToInvoice() {
  uni.navigateTo({ url: '/pages/invoice-form/index' })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #F5F7FA;
  padding: 20rpx;
}

.order-detail-card {
  background: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
}

.map-section {
  background: linear-gradient(135deg, #E8FFF5 0%, #D0FFE8 100%);
  padding: 40rpx 32rpx;
  text-align: center;
}

.map-icon {
  font-size: 64rpx;
  margin-bottom: 16rpx;
  display: block;
}

.map-address {
  font-size: 26rpx;
  color: #333;
  line-height: 1.6;
}

.order-info {
  padding: 28rpx;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28rpx;
}

.order-id {
  font-size: 20rpx;
  color: #999;
}

.status-group {
  display: flex;
  gap: 12rpx;
}

.status-badge {
  font-size: 20rpx;
  padding: 8rpx 16rpx;
  border-radius: 16rpx;
}

.status-pending {
  background: #FFF3E0;
  color: #FF9800;
}

.status-accepted {
  background: #E3F2FD;
  color: #2196F3;
}

.status-serving {
  background: #E8FFF5;
  color: #00D4AA;
}

.status-completed {
  background: #E8F5E9;
  color: #4CAF50;
}

.status-canceled {
  background: #FFEBEE;
  color: #F44336;
}

.pay-unpaid {
  background: #FFF3E0;
  color: #FF9800;
}

.pay-paid {
  background: #E8F5E9;
  color: #4CAF50;
}

.pay-refunding {
  background: #FFF8E1;
  color: #FFC107;
}

.pay-refunded {
  background: #F5F5F5;
  color: #9E9E9E;
}

.section-title {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.section-title .icon {
  font-size: 32rpx;
  margin-right: 12rpx;
}

.section-title .text {
  font-size: 26rpx;
  font-weight: 600;
  color: #333;
}

.order-detail-content {
  padding-bottom: 24rpx;
  margin-bottom: 24rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.order-row {
  display: flex;
  justify-content: space-between;
  padding: 16rpx 0;
}

.label {
  font-size: 24rpx;
  color: #999;
}

.value {
  font-size: 24rpx;
  font-weight: 500;
  color: #333;
}

.fee-detail {
  padding: 24rpx;
  background: #F8FAF9;
  border-radius: 18rpx;
  margin-bottom: 24rpx;
}

.fee-row {
  display: flex;
  justify-content: space-between;
  padding: 12rpx 0;
  font-size: 24rpx;
}

.fee-row.total {
  font-weight: 600;
  padding-top: 16rpx;
  margin-top: 12rpx;
  border-top: 2rpx dashed #ddd;
  font-size: 28rpx;
}

.fee-label {
  color: #999;
}

.fee-value {
  color: #333;
}

.provider-section {
  margin-bottom: 24rpx;
}

.provider-card {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 24rpx;
  background: #F8FAF9;
  border-radius: 18rpx;
}

.provider-avatar {
  width: 80rpx;
  height: 80rpx;
  background: linear-gradient(135deg, #00D4AA 0%, #00B894 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
}

.provider-info {
  flex: 1;
}

.provider-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 8rpx;
  font-size: 26rpx;
  display: block;
}

.provider-phone {
  font-size: 22rpx;
  color: #666;
  margin-bottom: 6rpx;
  display: block;
}

.provider-rating {
  font-size: 22rpx;
  color: #FFD700;
}

.btn-call {
  padding: 12rpx 24rpx;
  background: #fff;
  border: 2rpx solid #00D4AA;
  color: #00D4AA;
  border-radius: 24rpx;
  font-size: 22rpx;
}

.rating-section {
  padding: 24rpx;
  background: #FFF8F0;
  border-radius: 18rpx;
  margin-bottom: 24rpx;
}

.rating-stars {
  display: flex;
  gap: 16rpx;
  margin-bottom: 20rpx;
}

.star {
  font-size: 52rpx;
  color: #DDD;
}

.star.active {
  color: #FFD700;
}

.rating-input {
  width: 100%;
  height: 140rpx;
  padding: 22rpx;
  border: 2rpx solid #eee;
  border-radius: 14rpx;
  font-size: 24rpx;
  resize: none;
  box-sizing: border-box;
  margin-bottom: 20rpx;
}

.rated-content {
  text-align: center;
  padding: 30rpx;
}

.rated-icon {
  font-size: 48rpx;
  display: block;
  margin-bottom: 12rpx;
}

.rated-text {
  font-size: 24rpx;
  color: #666;
}

.cancel-reason {
  padding: 24rpx;
  background: #FFF0F0;
  border-radius: 18rpx;
  margin-bottom: 24rpx;
}

.reason-text {
  font-size: 24rpx;
  color: #E57373;
  display: block;
}

.refund-info {
  margin-top: 16rpx;
}

.refund-text {
  font-size: 24rpx;
  color: #666;
}

.action-section {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.btn-primary {
  padding: 24rpx;
  font-size: 28rpx;
  font-weight: 600;
  background: linear-gradient(135deg, #00D4AA 0%, #00B894 100%);
  color: #fff;
  border-radius: 18rpx;
  border: none;
}

.btn-pay {
  font-size: 30rpx;
}

.btn-cancel {
  padding: 24rpx;
  font-size: 28rpx;
  background: #F5F5F5;
  color: #666;
  border-radius: 18rpx;
  border: none;
}

.btn-rate {
  background: linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%);
}

.btn-invoice {
  padding: 24rpx;
  font-size: 28rpx;
  background: #fff;
  color: #00D4AA;
  border: 2rpx solid #00D4AA;
  border-radius: 18rpx;
}
</style>
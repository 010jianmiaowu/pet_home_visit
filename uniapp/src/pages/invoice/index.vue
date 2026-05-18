<template>
  <view class="container">
    <view class="invoice-header">
      <text class="invoice-tip">选择订单开票</text>
    </view>

    <view class="invoice-list">
      <view v-if="invoiceOrders.length === 0" class="empty-tip">
        <text>暂无可开票订单</text>
      </view>
      <view v-else>
        <view v-for="order in invoiceOrders" :key="order.id" class="invoice-card">
          <view class="invoice-info">
            <text class="invoice-id">订单号: {{ order.id }}</text>
            <text class="invoice-service">服务内容: {{ order.service }}</text>
            <text class="invoice-amount">¥{{ order.totalPrice }}</text>
          </view>
          <button class="invoice-btn" @click="goToInvoiceForm(order.id)">开票</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { orders } from '@/data'

const invoiceOrders = computed(() => {
  return orders.filter(o => o.status === 'completed' && o.canInvoice)
})

function goToInvoiceForm(orderId: string) {
  uni.navigateTo({ url: `/pages/invoice-form/index?id=${orderId}` })
}
</script>

<style lang="scss" scoped>
.invoice-header {
  padding: 15rpx 28rpx;
}

.invoice-tip {
  font-size: 22rpx;
  color: #666;
}

.invoice-list {
  padding: 0 28rpx;
}

.empty-tip {
  text-align: center;
  padding: 100rpx 50rpx;
  color: #999;
}

.invoice-card {
  background: #fff;
  margin-bottom: 28rpx;
  border-radius: 22rpx;
  padding: 28rpx;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.invoice-info {
  flex: 1;
}

.invoice-id {
  font-size: 22rpx;
  color: #999;
  margin-bottom: 8rpx;
  display: block;
}

.invoice-service {
  font-size: 22rpx;
  color: #666;
  margin-bottom: 12rpx;
  display: block;
}

.invoice-amount {
  font-size: 28rpx;
  color: #00D4AA;
  font-weight: 600;
}

.invoice-btn {
  padding: 20rpx 36rpx;
  background: linear-gradient(135deg, #00D4AA 0%, #00B894 100%);
  color: #fff;
  border: none;
  border-radius: 16rpx;
  font-size: 22rpx;
  font-weight: 500;
  height: 70rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

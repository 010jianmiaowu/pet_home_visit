<template>
  <view class="container">
    <view class="tabs">
      <view 
        v-for="tab in tabs" 
        :key="tab.key" 
        :class="['tab-item', { active: activeTab === tab.key }]"
        @click="activeTab = tab.key"
      >
        <text class="tab-text">{{ tab.name }}</text>
        <view v-if="getTabCount(tab.key) > 0" class="tab-badge">{{ getTabCount(tab.key) }}</view>
      </view>
    </view>

    <view class="order-list">
      <view v-if="filteredOrders.length === 0" class="empty-tip">
        <text>暂无{{ getTabName(activeTab) }}订单</text>
      </view>
      <view v-else>
        <view 
          v-for="order in filteredOrders" 
          :key="order.id" 
          class="order-item"
          @click="goToDetail(order.id)"
        >
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
          <view class="order-content">
            <view class="order-row">
              <text class="order-label">预约时间</text>
              <text class="order-value">{{ order.date }} {{ order.time }}</text>
            </view>
            <view class="order-row">
              <text class="order-label">服务内容</text>
              <text class="order-value">{{ order.service }}</text>
            </view>
            <view class="order-row">
              <text class="order-label">服务对象</text>
              <text class="order-value">{{ order.petName }}</text>
            </view>
          </view>
          <view class="order-footer">
            <text class="order-price">¥{{ order.totalPrice }}</text>
            <view class="order-actions">
              <button 
                v-if="order.status === 'pending' && order.payStatus === 'unpaid'" 
                class="btn-pay" 
                @click.stop="handlePay(order)"
              >去支付</button>
              <button 
                v-if="order.status === 'pending'" 
                class="btn-cancel" 
                @click.stop="handleCancel(order)"
              >取消订单</button>
              <button 
                v-if="order.status === 'completed' && !order.rated" 
                class="btn-rate" 
                @click.stop="goToDetail(order.id)"
              >去评价</button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { orders, getStatusText, getPayStatusText } from '@/data'
import type { Order } from '@/data'

const activeTab = ref('all')

const tabs = [
  { key: 'all', name: '全部' },
  { key: 'pending', name: '待接单' },
  { key: 'accepted', name: '待服务' },
  { key: 'serving', name: '服务中' },
  { key: 'completed', name: '已完成' },
  { key: 'canceled', name: '已取消' }
]

const filteredOrders = computed(() => {
  if (activeTab.value === 'all') {
    return orders
  }
  return orders.filter(order => order.status === activeTab.value)
})

function getTabCount(tabKey: string): number {
  if (tabKey === 'all') {
    return orders.length
  }
  return orders.filter(order => order.status === tabKey).length
}

function getTabName(tabKey: string): string {
  const tab = tabs.find(t => t.key === tabKey)
  return tab?.name || ''
}

function goToDetail(orderId: string) {
  uni.navigateTo({ url: `/pages/order-detail/index?id=${orderId}` })
}

function handlePay(order: Order) {
  uni.showModal({
    title: '支付提示',
    content: `确认支付 ¥${order.totalPrice} 吗？`,
    success: (res) => {
      if (res.confirm) {
        order.payStatus = 'paid'
        uni.showToast({ title: '支付成功', icon: 'success' })
      }
    }
  })
}

function handleCancel(order: Order) {
  uni.showModal({
    title: '取消订单',
    content: '确定要取消订单吗？',
    success: (res) => {
      if (res.confirm) {
        order.status = 'canceled'
        order.cancelReason = '用户取消'
        if (order.payStatus === 'paid') {
          order.payStatus = 'refunding'
          setTimeout(() => {
            order.payStatus = 'refunded'
          }, 1000)
        }
        uni.showToast({ title: '订单已取消', icon: 'success' })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #F5F7FA;
}

.tabs {
  display: flex;
  background: #fff;
  padding: 0 20rpx;
  border-bottom: 2rpx solid #f0f0f0;
  overflow-x: auto;
  white-space: nowrap;
}

.tab-item {
  position: relative;
  padding: 28rpx 32rpx;
  font-size: 26rpx;
  color: #666;
  flex-shrink: 0;
}

.tab-item.active {
  color: #00D4AA;
  font-weight: 600;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 48rpx;
  height: 6rpx;
  background: #00D4AA;
  border-radius: 6rpx;
}

.tab-badge {
  position: absolute;
  top: 16rpx;
  right: 16rpx;
  min-width: 32rpx;
  height: 32rpx;
  background: #FF6B6B;
  color: #fff;
  font-size: 20rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8rpx;
}

.order-list {
  padding: 20rpx;
}

.empty-tip {
  text-align: center;
  padding: 100rpx 50rpx;
  color: #999;
  font-size: 26rpx;
}

.order-item {
  background: #fff;
  margin-bottom: 24rpx;
  border-radius: 22rpx;
  padding: 28rpx;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 22rpx;
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

.order-content {
  margin-bottom: 22rpx;
}

.order-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15rpx;
}

.order-row:last-child {
  margin-bottom: 0;
}

.order-label {
  font-size: 24rpx;
  color: #999;
}

.order-value {
  font-size: 24rpx;
  font-weight: 500;
  color: #333;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 22rpx;
  border-top: 2rpx solid #f5f5f5;
}

.order-price {
  font-size: 30rpx;
  font-weight: 700;
  color: #00D4AA;
}

.order-actions {
  display: flex;
  gap: 16rpx;
}

.btn-pay {
  padding: 12rpx 28rpx;
  font-size: 22rpx;
  background: linear-gradient(135deg, #00D4AA 0%, #00B894 100%);
  color: #fff;
  border-radius: 24rpx;
  border: none;
}

.btn-cancel {
  padding: 12rpx 28rpx;
  font-size: 22rpx;
  background: #F5F5F5;
  color: #666;
  border-radius: 24rpx;
  border: none;
}

.btn-rate {
  padding: 12rpx 28rpx;
  font-size: 22rpx;
  background: linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%);
  color: #fff;
  border-radius: 24rpx;
  border: none;
}
</style>
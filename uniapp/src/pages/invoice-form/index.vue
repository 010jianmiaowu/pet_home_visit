<template>
  <view class="container" v-if="order">
    <view class="card">
      <text class="card-header">订单信息</text>
      <view class="card-body">
        <text class="order-info">订单号: {{ order.id }}</text>
        <text class="order-info">金额: ¥{{ order.totalPrice }}</text>
      </view>
    </view>

    <view class="card">
      <text class="card-header">发票类型</text>
      <view class="card-body">
        <view class="invoice-type">
          <view 
            :class="['type-item', { active: invoiceType === 'personal' }]"
            @click="invoiceType = 'personal'"
          >
            <view :class="['type-radio', { active: invoiceType === 'personal' }]"></view>
            <text>个人发票</text>
          </view>
          <view 
            :class="['type-item', { active: invoiceType === 'company' }]"
            @click="invoiceType = 'company'"
          >
            <view :class="['type-radio', { active: invoiceType === 'company' }]"></view>
            <text>企业发票</text>
          </view>
        </view>
      </view>
    </view>

    <view v-if="invoiceType === 'company'" class="card">
      <text class="card-header">企业信息</text>
      <view class="card-body">
        <view class="form-group">
          <text class="form-label">企业名称</text>
          <input class="form-input" v-model="companyInfo.name" placeholder="请输入企业名称" />
        </view>
        <view class="form-group">
          <text class="form-label">税号</text>
          <input class="form-input" v-model="companyInfo.tax" placeholder="请输入税号" />
        </view>
        <view class="form-group">
          <text class="form-label">地址</text>
          <input class="form-input" v-model="companyInfo.address" placeholder="请输入地址" />
        </view>
        <view class="form-group">
          <text class="form-label">电话</text>
          <input class="form-input" v-model="companyInfo.phone" placeholder="请输入电话" />
        </view>
      </view>
    </view>

    <view class="card">
      <text class="card-header">接收邮箱</text>
      <view class="card-body">
        <input class="form-input" v-model="email" placeholder="请输入接收发票的邮箱" />
      </view>
    </view>

    <view class="action-area">
      <button class="btn-primary" @click="submitInvoice">提交开票申请</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { orders } from '@/data'
import type { Order } from '@/data'

const order = ref<Order | null>(null)
const invoiceType = ref<'personal' | 'company'>('personal')
const email = ref('')

const companyInfo = reactive({
  name: '',
  tax: '',
  address: '',
  phone: ''
})

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = (currentPage as any).$page?.options || {}
  const orderId = options.id || ''
  
  order.value = orders.find(o => o.id === orderId) || null
})

function submitInvoice() {
  if (!email.value) {
    uni.showToast({ title: '请输入接收邮箱', icon: 'none' })
    return
  }

  if (invoiceType.value === 'company') {
    if (!companyInfo.name || !companyInfo.tax) {
      uni.showToast({ title: '请填写完整企业信息', icon: 'none' })
      return
    }
  }

  if (order.value) {
    order.value.canInvoice = false
  }

  uni.showToast({ title: '开票申请已提交，将发送至您的邮箱', icon: 'success' })

  setTimeout(() => {
    uni.navigateBack()
  }, 2000)
}
</script>

<style lang="scss" scoped>
.invoice-type {
  display: flex;
  gap: 40rpx;
}

.type-item {
  display: flex;
  align-items: center;
  gap: 18rpx;
  font-size: 24rpx;
}

.type-radio {
  width: 30rpx;
  height: 30rpx;
  border: 3rpx solid #ddd;
  border-radius: 50%;
}

.type-radio.active {
  border-color: #00D4AA;
  background: #00D4AA;
  position: relative;
}

.type-radio.active::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16rpx;
  height: 16rpx;
  background: #fff;
  border-radius: 50%;
}

.action-area {
  padding: 32rpx;
  padding-bottom: 120rpx;
}
</style>

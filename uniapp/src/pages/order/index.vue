<template>
  <view class="container">
    <view class="card">
      <view class="card-header">📅 预约时间</view>
      <view class="card-body">
        <picker mode="date" :value="selectedDate" @change="handleDateChange">
          <view class="picker-item">
            <text class="picker-label">选择日期</text>
            <text class="picker-value">{{ selectedDate || '请选择日期' }}</text>
            <text class="picker-arrow">→</text>
          </view>
        </picker>
        <picker mode="selector" :range="timeOptions" @change="handleTimeChange">
          <view class="picker-item">
            <text class="picker-label">选择时间</text>
            <text class="picker-value">{{ selectedTime || '请选择时间' }}</text>
            <text class="picker-arrow">→</text>
          </view>
        </picker>
      </view>
    </view>

    <view class="card">
      <view class="card-header">📍 服务地址</view>
      <view class="card-body">
        <view class="map-area" @click="openMapSelector">
          <view class="map-placeholder">
            <text class="map-icon">📍</text>
            <text class="map-text">{{ address || '点击选择地址' }}</text>
          </view>
        </view>
        <input class="form-input" v-model="address" placeholder="详细地址" />
        <input class="form-input" v-model="contact" placeholder="联系人" />
        <input class="form-input" v-model="phone" placeholder="联系电话" />
      </view>
    </view>

    <view class="card">
      <view class="card-header">🐾 选择宠物</view>
      <view class="card-body">
        <view v-if="pets.length === 0" class="empty-tip">
          <text>请先添加宠物</text>
        </view>
        <view v-else>
          <view 
            v-for="pet in pets" 
            :key="pet.id" 
            class="radio-item"
            :class="{ active: selectedPetId === pet.id }"
            @click="selectedPetId = pet.id"
          >
            <view class="radio-circle">
              <view class="radio-inner" v-if="selectedPetId === pet.id"></view>
            </view>
            <text class="pet-avatar">{{ pet.avatar }}</text>
            <text class="pet-name">{{ pet.name }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="card">
      <view class="card-header">💆 服务项目</view>
      <view class="card-body">
        <view 
          v-for="(service, key) in serviceDetailData" 
          :key="key" 
          class="checkbox-item"
          :class="{ active: selectedServices.includes(key) }"
          @click="toggleService(key)"
        >
          <view class="checkbox-box">
            <text v-if="selectedServices.includes(key)" class="checkbox-icon">✓</text>
          </view>
          <text class="service-name">{{ service.title }}</text>
          <text class="service-price">¥{{ service.price }}</text>
        </view>
      </view>
    </view>

    <view class="card">
      <view class="card-header">💰 订单金额</view>
      <view class="card-body">
        <view class="fee-box">
          <view class="fee-row">
            <text class="fee-label">服务费用</text>
            <text class="fee-value">¥{{ totalPrice }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="action-area">
      <button class="btn-primary" @click="submitOrder">提交订单</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { pets, serviceDetailData, orders } from '@/data'

const selectedPetId = ref<number | null>(null)
const selectedServices = ref<string[]>([])
const address = ref('')
const contact = ref('')
const phone = ref('')
const selectedDate = ref('')
const selectedTime = ref('')

const today = new Date()
const timeOptions = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']

onMounted(() => {
  const dateStr = today.toISOString().split('T')[0]
  selectedDate.value = dateStr
  uni.$on('mapAddressSelected', handleMapAddressSelected)
})

onUnmounted(() => {
  uni.$off('mapAddressSelected', handleMapAddressSelected)
})

function handleMapAddressSelected(data: { address: string }) {
  address.value = data.address
}

const totalPrice = computed(() => {
  return selectedServices.value.reduce((sum, key) => {
    return sum + (serviceDetailData[key]?.price || 0)
  }, 0)
})

function toggleService(key: string) {
  const index = selectedServices.value.indexOf(key)
  if (index > -1) {
    selectedServices.value.splice(index, 1)
  } else {
    selectedServices.value.push(key)
  }
}

function handleDateChange(e: any) {
  selectedDate.value = e.detail.value
}

function handleTimeChange(e: any) {
  selectedTime.value = timeOptions[e.detail.value]
}

function openMapSelector() {
  uni.navigateTo({ url: '/pages/map-selector/index' })
}

function submitOrder() {
  if (!selectedDate.value) {
    uni.showToast({ title: '请选择预约日期', icon: 'none' })
    return
  }

  if (!selectedTime.value) {
    uni.showToast({ title: '请选择预约时间', icon: 'none' })
    return
  }

  if (!address.value) {
    uni.showToast({ title: '请选择服务地址', icon: 'none' })
    return
  }

  if (!selectedPetId.value) {
    uni.showToast({ title: '请选择宠物', icon: 'none' })
    return
  }

  if (selectedServices.value.length === 0) {
    uni.showToast({ title: '请选择服务项目', icon: 'none' })
    return
  }

  const pet = pets.find(p => p.id === selectedPetId.value)
  
  orders.unshift({
    id: 'FSX' + Date.now(),
    status: 'pending',
    date: selectedDate.value,
    time: selectedTime.value,
    address: address.value,
    petId: selectedPetId.value,
    petName: pet?.name || '',
    service: selectedServices.value.map(k => serviceDetailData[k]?.title).join(', '),
    totalPrice: totalPrice.value,
    canInvoice: true,
    provider: null
  })

  uni.showToast({ title: '订单提交成功', icon: 'success' })
  
  setTimeout(() => {
    uni.navigateTo({ url: '/pages/order-list/index' })
  }, 1500)
}
</script>

<style lang="scss" scoped>
.picker-item {
  display: flex;
  align-items: center;
  padding: 28rpx 0;
  border-bottom: 2rpx solid #f0f0f0;
}

.picker-item:last-child {
  border-bottom: none;
}

.picker-label {
  font-size: 26rpx;
  color: #666;
  width: 160rpx;
}

.picker-value {
  flex: 1;
  font-size: 26rpx;
  color: #333;
}

.picker-arrow {
  font-size: 28rpx;
  color: #ccc;
}

.map-area {
  height: 280rpx;
  background: #f5f5f5;
  border-radius: 18rpx;
  position: relative;
  overflow: hidden;
}

.map-placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.map-icon {
  font-size: 52rpx;
  margin-bottom: 15rpx;
  display: block;
}

.map-text {
  font-size: 24rpx;
  color: #666;
}

.empty-tip {
  text-align: center;
  padding: 50rpx;
  color: #999;
}

.radio-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 2rpx solid #f0f0f0;
}

.radio-item:last-child {
  border-bottom: none;
}

.radio-item.active {
  background: #F8FAF9;
  margin: 0 -32rpx;
  padding: 20rpx 32rpx;
}

.radio-circle {
  width: 36rpx;
  height: 36rpx;
  border: 3rpx solid #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
}

.radio-item.active .radio-circle {
  border-color: #00D4AA;
}

.radio-inner {
  width: 20rpx;
  height: 20rpx;
  background: #00D4AA;
  border-radius: 50%;
}

.pet-avatar {
  font-size: 48rpx;
  margin-right: 16rpx;
}

.pet-name {
  font-size: 24rpx;
  color: #333;
}

.checkbox-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 2rpx solid #f0f0f0;
}

.checkbox-item:last-child {
  border-bottom: none;
}

.checkbox-item.active {
  background: #F8FAF9;
  margin: 0 -32rpx;
  padding: 20rpx 32rpx;
}

.checkbox-box {
  width: 36rpx;
  height: 36rpx;
  border: 3rpx solid #ddd;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
}

.checkbox-item.active .checkbox-box {
  background: #00D4AA;
  border-color: #00D4AA;
}

.checkbox-icon {
  color: #fff;
  font-size: 24rpx;
}

.service-name {
  flex: 1;
  font-size: 24rpx;
  color: #333;
}

.service-price {
  font-size: 24rpx;
  color: #00D4AA;
  font-weight: 600;
}

.fee-box {
  background: #FFF5F5;
  padding: 20rpx;
  border-radius: 12rpx;
}

.fee-row {
  display: flex;
  justify-content: space-between;
}

.fee-label {
  font-size: 22rpx;
  color: #666;
}

.fee-value {
  font-size: 28rpx;
  color: #00D4AA;
  font-weight: 600;
}

.action-area {
  padding: 32rpx;
  padding-bottom: 120rpx;
}
</style>

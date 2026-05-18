<template>
  <view class="container">
    <view class="header">
      <view class="header-bg"></view>
      <view class="header-content">
        <view class="banner-section">
          <view class="banner-bg"></view>
          <view class="banner-info">
            <text class="banner-tag">限时抢!</text>
            <text class="banner-title">宠物188元</text>
            <text class="banner-subtitle">超值套餐</text>
          </view>
        </view>
        <view class="pet-profile" @click="goToPetEdit">
          <view class="pet-icon">🐾</view>
          <view class="pet-info">
            <text class="pet-name">带「宝贝」出门</text>
            <text class="pet-action">补全档案 ></text>
          </view>
        </view>
      </view>
    </view>

    <view class="service-icons">
      <view class="service-item" v-for="item in serviceIcons" :key="item.name" @click="handleServiceClick(item.action)">
        <view class="service-icon" :class="{ 'highlight': item.action === 'wash' }">
          <text>{{ item.icon }}</text>
        </view>
        <text class="service-name">{{ item.name }}</text>
        <view v-if="item.badge" class="service-badge">{{ item.badge }}</view>
      </view>
    </view>

    <view class="main-content">
      <view class="booking-section">
        <view class="booking-card">
          <view class="booking-item" @click="goToAddress">
            <view class="booking-icon">📍</view>
            <view class="booking-info">
              <text class="booking-label">服务地址</text>
              <text class="booking-value">{{ currentAddress }}</text>
            </view>
            <text class="booking-arrow">›</text>
          </view>
          <view class="booking-divider"></view>
          <view class="booking-item" @click="goToPetEdit">
            <view class="booking-icon">🐶</view>
            <view class="booking-info">
              <text class="booking-label">宠物信息</text>
              <text class="booking-value">{{ currentPet }}</text>
            </view>
            <text class="booking-arrow">›</text>
          </view>
          <view class="booking-divider"></view>
          <view class="booking-item" @click="goToTimeSelect">
            <view class="booking-icon">⏰</view>
            <view class="booking-info">
              <text class="booking-label">上门时间</text>
              <text class="booking-value">{{ currentTime }}</text>
            </view>
            <text class="booking-arrow">›</text>
          </view>
        </view>

        <view class="booking-btn" @click="handleBooking">
          <text class="btn-text">立即预约</text>
        </view>
      </view>

      <view class="product-section">
        <view class="section-header">
          <text class="section-title">推荐服务</text>
        </view>
        <view class="product-list">
          <view 
            v-for="product in currentProducts" 
            :key="product.id" 
            class="product-card"
            @click="goToServiceDetail(product.key)"
          >
            <image :src="product.image" mode="aspectFill" class="product-image" />
            <view class="product-info">
              <text class="product-title">{{ product.title }}</text>
              <text class="product-desc">{{ product.desc }}</text>
              <view class="product-bottom">
                <text class="product-price">¥{{ product.price }}</text>
                <text class="product-tag">{{ product.tag }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'

const activeTab = ref('wash')

const tabs = [
  { key: 'wash', name: '预约洗护' },
  { key: 'feed', name: '喂宠' },
  { key: 'walk', name: '遛宠' },
  { key: 'train', name: '训犬' },
  { key: 'foster', name: '寄养' }
]

const serviceIcons = [
  { icon: '🚗', name: '宠物快送', action: 'delivery', badge: '无人陪' },
  { icon: '✈️', name: '宠物托运', action: 'shipping' },
  { icon: '🦮', name: '上门喂遛', action: 'walk' },
  { icon: '🛁', name: '上门洗护', action: 'wash' },
  { icon: '✂️', name: '上门美容', action: 'beauty' }
]

const currentAddress = ref('华熙国际中心D座-出入口')
const currentPet = ref('请选择宠物')
const currentTime = ref('请选择上门服务时间(支持单天)')

function loadSavedInfo() {
  const petInfo = uni.getStorageSync('petInfo')
  if (petInfo && petInfo.type) {
    const typeLabel = petInfo.type === 'dog' ? '狗狗' : petInfo.type === 'cat' ? '猫咪' : '其他宠物'
    const weightLabel = {
      small: '小型',
      'medium-small': '中小型',
      'medium-large': '中大型',
      large: '大型'
    }[petInfo.weight] || ''
    const name = petInfo.name || ''
    
    if (name) {
      currentPet.value = `${typeLabel} · ${weightLabel} · ${name}`
    } else {
      currentPet.value = `${typeLabel} · ${weightLabel}`
    }
  }
  
  const timeInfo = uni.getStorageSync('timeInfo')
  if (timeInfo && timeInfo.date && timeInfo.time) {
    currentTime.value = `${timeInfo.date} ${timeInfo.time}`
  }
  
  const addressInfo = uni.getStorageSync('addressInfo')
  if (addressInfo && addressInfo.address) {
    currentAddress.value = addressInfo.address.slice(0, 20) + (addressInfo.address.length > 20 ? '...' : '')
  }
}

onShow(() => {
  loadSavedInfo()
})

loadSavedInfo()

const products: Record<string, any[]> = {
  wash: [
    { id: 1, title: '【平台严选】上门喂猫', desc: '放心托付 | 滴滴平台保障', price: 40, tag: '好评率98%', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cat%20eating%20food%20at%20home%20happy&image_size=portrait_4_3', key: 'feed-cat' },
    { id: 2, title: '【平台严选】上门喂狗(+赠送遛狗)', desc: '放心托付 | 滴滴平台保障', price: 50, tag: '热门', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=golden%20retriever%20dog%20walking%20outdoor%20happy&image_size=portrait_4_3', key: 'walk-dog' },
    { id: 3, title: '【平台严选】宠物洗澡', desc: '专业洗护 | 安全放心', price: 80, tag: '新人专享', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20bath%20washing%20clean%20professional&image_size=portrait_4_3', key: 'bath' },
    { id: 4, title: '【平台严选】宠物美容', desc: '造型设计 | 个性定制', price: 150, tag: '推荐', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20pet%20grooming%20styling%20salon&image_size=portrait_4_3', key: 'beauty' }
  ],
  feed: [
    { id: 5, title: '上门喂猫', desc: '早晚各一次，含换水清理', price: 35, tag: '省心', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cat%20feeding%20bowl%20home&image_size=portrait_4_3', key: 'feed-cat' },
    { id: 6, title: '上门喂狗', desc: '早晚各一次，含遛狗15分钟', price: 45, tag: '超值', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dog%20eating%20food%20happy&image_size=portrait_4_3', key: 'feed-dog' },
    { id: 7, title: '多宠喂养', desc: '同时照顾多只宠物', price: 60, tag: '多宠优惠', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=multiple%20pets%20feeding%20together&image_size=portrait_4_3', key: 'multi-feed' }
  ],
  walk: [
    { id: 8, title: '30分钟遛狗', desc: '专业遛狗服务', price: 30, tag: '基础', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dog%20walking%20park%20exercise&image_size=portrait_4_3', key: 'walk-30' },
    { id: 9, title: '60分钟遛狗', desc: '深度运动，含玩耍互动', price: 50, tag: '推荐', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dog%20playing%20fetch%20park&image_size=portrait_4_3', key: 'walk-60' },
    { id: 10, title: '夜间遛狗', desc: '晚间专属服务', price: 40, tag: '夜间', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dog%20walking%20night%20city&image_size=portrait_4_3', key: 'walk-night' }
  ],
  train: [
    { id: 11, title: '基础服从训练', desc: '坐、卧、立、随行', price: 200, tag: '入门', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dog%20training%20obedience%20sit&image_size=portrait_4_3', key: 'train-basic' },
    { id: 12, title: '行为矫正', desc: '解决吠叫、咬人等问题', price: 300, tag: '专业', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dog%20behavior%20training%20professional&image_size=portrait_4_3', key: 'train-correct' },
    { id: 13, title: '社会化训练', desc: '适应外界环境', price: 250, tag: '推荐', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dog%20socialization%20training%20park&image_size=portrait_4_3', key: 'train-social' }
  ],
  foster: [
    { id: 14, title: '家庭寄养(小型犬)', desc: '温馨家庭环境', price: 60, tag: '日租', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=small%20dog%20foster%20home%20cozy&image_size=portrait_4_3', key: 'foster-small' },
    { id: 15, title: '家庭寄养(中型犬)', desc: '宽敞活动空间', price: 80, tag: '日租', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=medium%20dog%20foster%20home%20garden&image_size=portrait_4_3', key: 'foster-medium' },
    { id: 16, title: '家庭寄养(大型犬)', desc: '专业看护', price: 100, tag: '日租', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=large%20dog%20foster%20home%20yard&image_size=portrait_4_3', key: 'foster-large' },
    { id: 17, title: '笼养寄养', desc: '安全隔离环境', price: 40, tag: '经济', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20boarding%20kennel%20clean&image_size=portrait_4_3', key: 'foster-cage' }
  ]
}

const currentProducts = computed(() => products[activeTab.value] || [])

function switchTab(key: string) {
  activeTab.value = key
}

function handleServiceClick(action: string) {
  if (action === 'wash') {
    activeTab.value = 'wash'
  } else if (action === 'walk') {
    activeTab.value = 'walk'
  } else {
    uni.showToast({ title: `${action}功能开发中`, icon: 'none' })
  }
}

function goToPetEdit() {
  uni.navigateTo({ url: '/pages/pet-edit/index' })
}

function goToAddress() {
  uni.navigateTo({ url: '/pages/pickup-info/index' })
}

function goToTimeSelect() {
  uni.navigateTo({ url: '/pages/time-select/index' })
}

function goToServiceDetail(key: string) {
  uni.navigateTo({ url: `/pages/service-detail/index?service=${key}` })
}

function handleBooking() {
  if (currentPet.value === '请选择宠物') {
    uni.showToast({ title: '请先选择宠物', icon: 'none' })
    return
  }
  if (currentTime.value === '请选择上门服务时间(支持单天)') {
    uni.showToast({ title: '请选择上门时间', icon: 'none' })
    return
  }
  uni.navigateTo({ url: '/pages/provider-list/index' })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #f5f7fa;
  padding-bottom: 120rpx;
}

.header {
  position: relative;
  padding-top: 60rpx;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 400rpx;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%);
  border-radius: 0 0 60rpx 60rpx;
}

.header-content {
  position: relative;
  z-index: 1;
  padding: 0 32rpx;
}

.banner-section {
  position: relative;
  height: 160rpx;
  border-radius: 20rpx;
  overflow: hidden;
  margin-bottom: 24rpx;
}

.banner-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
}

.banner-info {
  position: relative;
  z-index: 1;
  padding: 20rpx 30rpx;
}

.banner-tag {
  display: inline-block;
  background: rgba(0,0,0,0.2);
  color: #fff;
  font-size: 20rpx;
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
  margin-bottom: 10rpx;
}

.banner-title {
  display: block;
  font-size: 44rpx;
  font-weight: 700;
  color: #fff;
}

.banner-subtitle {
  font-size: 28rpx;
  color: rgba(255,255,255,0.9);
}

.pet-profile {
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.95);
  border-radius: 16rpx;
  padding: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.08);
}

.pet-icon {
  width: 80rpx;
  height: 80rpx;
  background: #f5c518;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  margin-right: 20rpx;
}

.pet-info {
  flex: 1;
}

.pet-name {
  display: block;
  font-size: 30rpx;
  font-weight: 600;
  color: #1a3a52;
  margin-bottom: 6rpx;
}

.pet-action {
  font-size: 24rpx;
  color: #5a6b7d;
}

.service-icons {
  display: flex;
  justify-content: space-around;
  padding: 32rpx;
  background: #fff;
  margin: 24rpx;
  border-radius: 20rpx;
  box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.06);
}

.service-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.service-icon {
  width: 96rpx;
  height: 96rpx;
  background: #f5f7fa;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48rpx;
  margin-bottom: 12rpx;
  transition: all 0.3s ease;
}

.service-icon.highlight {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  box-shadow: 0 8rpx 24rpx rgba(79, 172, 254, 0.4);
}

.service-name {
  font-size: 24rpx;
  color: #5a6b7d;
}

.service-badge {
  position: absolute;
  top: -8rpx;
  right: -16rpx;
  background: #ef5350;
  color: #fff;
  font-size: 18rpx;
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
}

.main-content {
  padding: 0 24rpx;
}

.tab-bar {
  display: flex;
  background: #fff;
  border-radius: 16rpx;
  padding: 8rpx;
  box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.06);
  margin-bottom: 24rpx;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 0;
  position: relative;
}

.tab-text {
  font-size: 28rpx;
  color: #5a6b7d;
  transition: color 0.3s ease;
}

.tab-item.active .tab-text {
  color: #1a3a52;
  font-weight: 600;
}

.tab-indicator {
  position: absolute;
  bottom: 8rpx;
  width: 48rpx;
  height: 6rpx;
  background: #f5c518;
  border-radius: 3rpx;
}

.booking-section {
  background: #fff;
  border-radius: 20rpx;
  padding: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.06);
  margin-bottom: 32rpx;
}

.booking-card {
  background: #f8f9fa;
  border-radius: 16rpx;
  padding: 4rpx 0;
  margin-bottom: 24rpx;
}

.booking-item {
  display: flex;
  align-items: center;
  padding: 28rpx 24rpx;
}

.booking-icon {
  font-size: 40rpx;
  margin-right: 20rpx;
}

.booking-info {
  flex: 1;
}

.booking-label {
  display: block;
  font-size: 24rpx;
  color: #90a4ae;
  margin-bottom: 8rpx;
}

.booking-value {
  font-size: 30rpx;
  color: #1a3a52;
  font-weight: 500;
}

.booking-arrow {
  font-size: 40rpx;
  color: #b0bec5;
}

.booking-divider {
  height: 2rpx;
  background: #e8e8e8;
  margin: 0 24rpx;
}

.booking-btn {
  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
  border-radius: 12rpx;
  padding: 32rpx;
  text-align: center;
}

.btn-text {
  font-size: 34rpx;
  font-weight: 600;
  color: #fff;
}

.product-section {
  margin-bottom: 32rpx;
}

.section-header {
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1a3a52;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.product-card {
  display: flex;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.06);
}

.product-image {
  width: 200rpx;
  height: 200rpx;
  flex-shrink: 0;
}

.product-info {
  flex: 1;
  padding: 20rpx;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #1a3a52;
  margin-bottom: 10rpx;
}

.product-desc {
  font-size: 24rpx;
  color: #90a4ae;
  margin-bottom: 16rpx;
  flex: 1;
}

.product-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-price {
  font-size: 36rpx;
  font-weight: 700;
  color: #ff6b6b;
}

.product-tag {
  font-size: 20rpx;
  color: #fff;
  background: #4caf50;
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
}
</style>
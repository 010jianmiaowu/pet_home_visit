<template>
  <view class="container">
    <view class="map-section">
      <view class="map-container" @click="openMapSelector">
        <map 
          :latitude="latitude" 
          :longitude="longitude" 
          :markers="markers"
          :scale="15"
          class="map"
        ></map>
        <view class="map-tip">
          <text class="tip-icon">📍</text>
          <text class="tip-text">点击地图选择位置</text>
        </view>
      </view>
      <view class="location-info">
        <text class="location-icon">📍</text>
        <text class="location-text">{{ currentLocation }}</text>
        <view class="create-btn" @click="showCreateModal">
          <text class="btn-text">发起活动</text>
        </view>
      </view>
    </view>

    <view class="activity-section">
      <view class="section-header">
        <text class="section-title">附近活动</text>
        <text class="section-count">{{ activities.length }} 个活动</text>
      </view>
      <view class="activity-list">
        <view 
          v-for="activity in activities" 
          :key="activity.id" 
          class="activity-card"
          @click="showActivityDetail(activity)"
        >
          <view class="activity-header">
            <view class="dog-icon">{{ activity.dogIcon }}</view>
            <view class="activity-info">
              <text class="activity-title">{{ activity.title }}</text>
              <text class="activity-time">{{ activity.time }}</text>
            </view>
            <view class="distance-tag">{{ activity.distance }}</view>
          </view>
          <view class="activity-detail">
            <view class="detail-item">
              <text class="detail-label">狗狗类型</text>
              <text class="detail-value">{{ activity.dogType }}</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">参与人数</text>
              <text class="detail-value">{{ activity.participants }} 人</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">活动地点</text>
              <text class="detail-value">{{ activity.location }}</text>
            </view>
          </view>
          <view class="activity-footer">
            <text class="organizer">组织者: {{ activity.organizer }}</text>
            <view class="join-btn">
              <text class="join-text">参与活动</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view v-if="showModal" class="modal-overlay" @click="closeModal">
      <view class="modal-content" @click.stop>
        <view class="modal-header">
          <text class="modal-title">发起拼遛活动</text>
          <text class="modal-close" @click="closeModal">✕</text>
        </view>
        <view class="modal-body">
          <view class="form-group">
            <text class="form-label">活动标题</text>
            <input class="form-input" v-model="formData.title" placeholder="请输入活动标题" />
          </view>
          <view class="form-group">
            <text class="form-label">活动时间</text>
            <input class="form-input" v-model="formData.time" placeholder="选择活动时间" @click="showTimePicker" />
          </view>
          <view class="form-group">
            <text class="form-label">狗狗类型</text>
            <picker :value="dogTypeIndex" :range="dogTypes" @change="onDogTypeChange">
              <view class="form-input picker">
                {{ formData.dogType || '请选择狗狗类型' }}
                <text class="picker-arrow">›</text>
              </view>
            </picker>
          </view>
          <view class="form-group">
            <text class="form-label">活动地点</text>
            <input class="form-input" v-model="formData.location" placeholder="输入活动地点" />
          </view>
          <view class="form-group">
            <text class="form-label">活动说明</text>
            <textarea class="form-textarea" v-model="formData.description" placeholder="简单描述活动内容"></textarea>
          </view>
        </view>
        <view class="modal-footer">
          <view class="btn-cancel" @click="closeModal">
            <text class="btn-text">取消</text>
          </view>
          <view class="btn-submit" @click="submitForm">
            <text class="btn-text">发起活动</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const currentLocation = ref('北京市朝阳区望京SOHO')
const showModal = ref(false)
const dogTypeIndex = ref(0)
const dogTypes = ['金毛', '泰迪', '哈士奇', '贵宾', '柯基', '柴犬', '拉布拉多', '其他']

const latitude = ref(39.990464)
const longitude = ref(116.472185)

const markers = reactive([
  {
    id: 1,
    latitude: 39.990464,
    longitude: 116.472185,
    iconPath: '',
    width: 50,
    height: 50,
    callout: {
      content: '望京公园',
      fontSize: 20,
      borderRadius: 10,
      bgColor: '#1a3a52',
      color: '#fff',
      padding: 10
    }
  },
  {
    id: 2,
    latitude: 39.991500,
    longitude: 116.475000,
    iconPath: '',
    width: 50,
    height: 50,
    callout: {
      content: '奥林匹克公园',
      fontSize: 20,
      borderRadius: 10,
      bgColor: '#f5c518',
      color: '#1a3a52',
      padding: 10
    }
  },
  {
    id: 3,
    latitude: 39.992000,
    longitude: 116.478000,
    iconPath: '',
    width: 50,
    height: 50,
    callout: {
      content: '朝阳公园',
      fontSize: 20,
      borderRadius: 10,
      bgColor: '#1a3a52',
      color: '#fff',
      padding: 10
    }
  }
])

const formData = reactive({
  title: '',
  time: '',
  dogType: '',
  location: '',
  description: ''
})

const activities = [
  {
    id: 1,
    title: '周末遛狗聚会',
    time: '周六 09:00 - 11:00',
    dogType: '金毛、拉布拉多',
    participants: 8,
    location: '望京公园',
    distance: '500m',
    dogIcon: '🐕',
    organizer: '王先生'
  },
  {
    id: 2,
    title: '傍晚遛狗小分队',
    time: '今天 18:30 - 20:00',
    dogType: '泰迪、贵宾',
    participants: 5,
    location: '奥林匹克公园',
    distance: '1.2km',
    dogIcon: '🐩',
    organizer: '李女士'
  },
  {
    id: 3,
    title: '大型犬交友会',
    time: '周日 10:00 - 12:00',
    dogType: '哈士奇、阿拉斯加',
    participants: 6,
    location: '朝阳公园',
    distance: '2.5km',
    dogIcon: '🐕‍🦺',
    organizer: '张先生'
  },
  {
    id: 4,
    title: '萌宠下午茶',
    time: '周日 14:00 - 16:00',
    dogType: '柯基、柴犬',
    participants: 10,
    location: '三里屯SOHO',
    distance: '3.1km',
    dogIcon: '🐶',
    organizer: '陈女士'
  }
]

function openMapSelector() {
  uni.navigateTo({ url: '/pages/map-selector/index' })
}

function showCreateModal() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  formData.title = ''
  formData.time = ''
  formData.dogType = ''
  formData.location = ''
  formData.description = ''
}

function onDogTypeChange(e: any) {
  dogTypeIndex.value = e.detail.value
  formData.dogType = dogTypes[e.detail.value]
}

function showTimePicker() {
  uni.showToast({ title: '选择时间功能开发中', icon: 'none' })
}

function showActivityDetail(activity: any) {
  uni.showToast({ title: `查看活动: ${activity.title}`, icon: 'none' })
}

function submitForm() {
  if (!formData.title || !formData.time || !formData.dogType || !formData.location) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' })
    return
  }
  uni.showToast({ title: '活动发起成功', icon: 'success' })
  closeModal()
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #ffffff;
  padding-bottom: 120rpx;
}

.create-btn {
  background: #f5c518;
  padding: 12rpx 24rpx;
  border-radius: 12rpx;
}

.create-btn .btn-text {
  font-size: 24rpx;
  font-weight: 500;
  color: #fff;
}

.map-section {
  margin: 24rpx;
  background: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 16rpx rgba(26, 58, 82, 0.08);
}

.map-container {
  height: 360rpx;
  position: relative;
}

.map {
  width: 100%;
  height: 100%;
}

.map-tip {
  position: absolute;
  bottom: 20rpx;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  padding: 16rpx 32rpx;
  border-radius: 30rpx;
  display: flex;
  align-items: center;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.tip-icon {
  font-size: 28rpx;
  margin-right: 12rpx;
}

.tip-text {
  font-size: 24rpx;
  color: #5a6b7d;
}

.location-info {
  padding: 20rpx 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 2rpx solid #e8e8e8;
}

.location-icon {
  font-size: 28rpx;
  margin-right: 12rpx;
}

.location-text {
  font-size: 26rpx;
  color: #1a3a52;
}

.activity-section {
  padding: 0 24rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1a3a52;
}

.section-count {
  font-size: 24rpx;
  color: #5a6b7d;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.activity-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(26, 58, 82, 0.08);
}

.activity-header {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.dog-icon {
  font-size: 56rpx;
  margin-right: 20rpx;
}

.activity-info {
  flex: 1;
}

.activity-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #1a3a52;
  display: block;
  margin-bottom: 8rpx;
}

.activity-time {
  font-size: 24rpx;
  color: #5a6b7d;
}

.distance-tag {
  background: #f5c518;
  color: #fff;
  font-size: 20rpx;
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
}

.activity-detail {
  background: #f8f9fa;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 12rpx 0;
  border-bottom: 2rpx solid #e8e8e8;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  font-size: 24rpx;
  color: #5a6b7d;
}

.detail-value {
  font-size: 24rpx;
  color: #1a3a52;
  font-weight: 500;
}

.activity-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.organizer {
  font-size: 22rpx;
  color: #90a4ae;
}

.join-btn {
  background: #1a3a52;
  padding: 12rpx 24rpx;
  border-radius: 12rpx;
}

.join-text {
  font-size: 24rpx;
  color: #fff;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  z-index: 1000;
}

.modal-content {
  width: 100%;
  background: #fff;
  border-radius: 40rpx 40rpx 0 0;
  padding: 32rpx;
  padding-bottom: 60rpx;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
}

.modal-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1a3a52;
}

.modal-close {
  font-size: 40rpx;
  color: #b0bec5;
}

.form-group {
  margin-bottom: 24rpx;
}

.form-label {
  display: block;
  font-size: 26rpx;
  color: #5a6b7d;
  margin-bottom: 12rpx;
}

.form-input {
  width: 100%;
  height: 96rpx;
  padding: 0 24rpx;
  background: #f5f5f5;
  border-radius: 16rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.form-input.picker {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.picker-arrow {
  color: #b0bec5;
}

.form-textarea {
  width: 100%;
  height: 160rpx;
  padding: 20rpx 24rpx;
  background: #f5f5f5;
  border-radius: 16rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.modal-footer {
  display: flex;
  gap: 24rpx;
  margin-top: 32rpx;
}

.btn-cancel {
  flex: 1;
  height: 96rpx;
  border: 3rpx solid #1a3a52;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-cancel .btn-text {
  font-size: 30rpx;
  color: #1a3a52;
}

.btn-submit {
  flex: 2;
  height: 96rpx;
  background: #1a3a52;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-submit .btn-text {
  font-size: 30rpx;
  color: #fff;
}
</style>
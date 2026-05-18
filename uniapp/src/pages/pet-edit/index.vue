<template>
  <view class="container">
    <view class="modal-mask" @click="closeModal"></view>
    <view class="modal-content">
      <view class="modal-header">
        <text class="modal-title">修改宠物信息</text>
        <view class="modal-close" @click="closeModal">
          <text>✕</text>
        </view>
      </view>
      
      <view class="form-section">
        <view class="form-item">
          <text class="form-label">宠物类型</text>
          <text class="form-required">*</text>
          <view class="pet-type-options">
            <view 
              v-for="type in petTypes" 
              :key="type.value"
              class="type-option"
              :class="{ active: formData.type === type.value }"
              @click="selectPetType(type.value)"
            >
              <view class="type-icon">{{ type.icon }}</view>
              <text class="type-name">{{ type.label }}</text>
              <view v-if="formData.type === type.value" class="type-check">✓</view>
            </view>
          </view>
        </view>

        <view v-if="formData.type === 'other'" class="form-item">
          <view class="other-options">
            <view 
              v-for="opt in otherOptions" 
              :key="opt.value"
              class="other-option"
              :class="{ active: formData.otherType === opt.value }"
              @click="selectOtherType(opt.value)"
            >
              <view class="other-radio" :class="{ checked: formData.otherType === opt.value }"></view>
              <text class="other-label">{{ opt.label }}</text>
            </view>
          </view>
        </view>

        <view class="form-item">
          <text class="form-label">宠物体重</text>
          <text class="form-required">*</text>
          <view class="weight-options">
            <view 
              v-for="weight in weightOptions" 
              :key="weight.value"
              class="weight-option"
              :class="{ active: formData.weight === weight.value }"
              @click="selectWeight(weight.value)"
            >
              <text class="weight-label">{{ weight.label }}</text>
              <text class="weight-desc">{{ weight.desc }}</text>
              <view v-if="formData.weight === weight.value" class="weight-check">✓</view>
            </view>
          </view>
        </view>

        <view class="form-item">
          <text class="form-label">宠物昵称</text>
          <view class="input-wrapper">
            <input 
              class="form-input" 
              v-model="formData.name" 
              placeholder="请输入宠物昵称"
              :maxlength="8"
            />
            <text class="input-length">{{ formData.name.length }}/8</text>
          </view>
        </view>
      </view>

      <view class="modal-footer">
        <view class="confirm-btn" :class="{ disabled: !isValid }" @click="confirm">
          <text class="btn-text">确认</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const formData = ref({
  type: 'dog',
  otherType: '',
  weight: 'small',
  name: ''
})

const petTypes = [
  { value: 'dog', label: '狗狗', icon: '🐕' },
  { value: 'cat', label: '猫咪', icon: '🐱' },
  { value: 'other', label: '其他', icon: '🐹' }
]

const otherOptions = [
  { value: 'bird', label: '鸟类' },
  { value: 'fish', label: '鱼类' },
  { value: 'turtle', label: '龟类' },
  { value: 'other', label: '其他' }
]

const weightOptions = [
  { value: 'small', label: '小型', desc: '5公斤以内' },
  { value: 'medium-small', label: '中小型', desc: '6-15公斤' },
  { value: 'medium-large', label: '中大型', desc: '16-30公斤' },
  { value: 'large', label: '大型', desc: '31公斤以上' }
]

const isValid = computed(() => {
  if (!formData.value.type) return false
  if (formData.value.type === 'other' && !formData.value.otherType) return false
  if (!formData.value.weight) return false
  return true
})

function selectPetType(type: string) {
  formData.value.type = type
  if (type !== 'other') {
    formData.value.otherType = ''
  }
}

function selectOtherType(type: string) {
  formData.value.otherType = type
}

function selectWeight(weight: string) {
  formData.value.weight = weight
}

function confirm() {
  if (!isValid.value) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' })
    return
  }
  
  uni.setStorageSync('petInfo', formData.value)
  
  uni.showToast({ 
    title: '保存成功', 
    icon: 'success',
    success: () => {
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
    }
  })
}

function closeModal() {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}

.modal-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 32rpx 32rpx 0 0;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40rpx 32rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.modal-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #1a3a52;
}

.modal-close {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36rpx;
  color: #90a4ae;
}

.form-section {
  padding: 32rpx;
}

.form-item {
  margin-bottom: 40rpx;
}

.form-label {
  font-size: 30rpx;
  font-weight: 500;
  color: #1a3a52;
  margin-bottom: 20rpx;
  display: block;
}

.form-required {
  color: #ef5350;
}

.pet-type-options {
  display: flex;
  justify-content: space-between;
}

.type-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32rpx 16rpx;
  background: #f8f9fa;
  border-radius: 16rpx;
  margin-right: 16rpx;
  position: relative;
  transition: all 0.3s ease;
}

.type-option:last-child {
  margin-right: 0;
}

.type-option.active {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.type-icon {
  font-size: 64rpx;
  margin-bottom: 16rpx;
}

.type-name {
  font-size: 28rpx;
  color: #1a3a52;
}

.type-option.active .type-name {
  color: #fff;
}

.type-check {
  position: absolute;
  top: 16rpx;
  right: 16rpx;
  width: 40rpx;
  height: 40rpx;
  background: #f5c518;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: #fff;
}

.other-options {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.other-option {
  display: flex;
  align-items: center;
  padding: 20rpx 32rpx;
  background: #f8f9fa;
  border-radius: 24rpx;
}

.other-option.active {
  background: #e3f2fd;
}

.other-radio {
  width: 36rpx;
  height: 36rpx;
  border: 3rpx solid #d0d0d0;
  border-radius: 50%;
  margin-right: 16rpx;
  position: relative;
}

.other-radio.checked {
  border-color: #4facfe;
}

.other-radio.checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rpx;
  height: 20rpx;
  background: #4facfe;
  border-radius: 50%;
}

.other-label {
  font-size: 28rpx;
  color: #1a3a52;
}

.weight-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12rpx;
}

.weight-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24rpx 8rpx;
  background: #f8f9fa;
  border-radius: 12rpx;
  position: relative;
  transition: all 0.3s ease;
}

.weight-option.active {
  background: #1a3a52;
}

.weight-label {
  font-size: 26rpx;
  font-weight: 500;
  color: #1a3a52;
  margin-bottom: 6rpx;
}

.weight-option.active .weight-label {
  color: #fff;
}

.weight-desc {
  font-size: 20rpx;
  color: #90a4ae;
}

.weight-option.active .weight-desc {
  color: rgba(255, 255, 255, 0.8);
}

.weight-check {
  position: absolute;
  top: 8rpx;
  right: 8rpx;
  width: 32rpx;
  height: 32rpx;
  background: #f5c518;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20rpx;
  color: #fff;
}

.input-wrapper {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 12rpx;
  padding: 0 24rpx;
  height: 88rpx;
}

.form-input {
  flex: 1;
  font-size: 30rpx;
  color: #1a3a52;
}

.input-length {
  font-size: 24rpx;
  color: #b0bec5;
}

.modal-footer {
  padding: 32rpx;
  padding-bottom: calc(32rpx + env(safe-area-inset-bottom));
  border-top: 2rpx solid #f0f0f0;
}

.confirm-btn {
  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
  border-radius: 12rpx;
  padding: 32rpx;
  text-align: center;
}

.confirm-btn.disabled {
  opacity: 0.5;
}

.btn-text {
  font-size: 34rpx;
  font-weight: 600;
  color: #fff;
}
</style>
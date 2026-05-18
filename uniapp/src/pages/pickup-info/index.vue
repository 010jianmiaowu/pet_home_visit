<template>
  <view class="container">
    <view class="header">
      <view class="header-left" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="header-title">填写接宠信息</text>
      <view class="header-right"></view>
    </view>

    <view class="content">
      <view class="paste-section">
        <view class="paste-input-wrapper">
          <input 
            class="paste-input" 
            v-model="formData.pasteText"
            placeholder="支持粘贴文字，自动识别地址、联系人或电话"
          />
        </view>
        <view class="paste-btn" @click="pasteText">
          <text class="paste-text">粘贴识别</text>
        </view>
      </view>

      <view class="map-section">
        <view class="map-placeholder">
          <view class="map-icon">📍</view>
          <text class="map-address">{{ currentAddress }}</text>
          <view class="map-btn" @click="goToMap">
            <text class="map-btn-text">地图选址</text>
          </view>
        </view>
      </view>

      <view class="form-section">
        <view class="form-card">
          <view class="card-header">
            <text class="card-title">{{ currentAddress }}</text>
            <view class="edit-btn" @click="goToMap">
              <text class="edit-text">编辑</text>
            </view>
          </view>
          
          <view class="form-item">
            <text class="form-label">地址</text>
            <text class="form-required">*</text>
            <view class="input-row">
              <input 
                class="form-input" 
                v-model="formData.address"
                placeholder="北京市朝阳区恒惠东路与景恒街交叉口西北方向56米左右"
              />
            </view>
          </view>

          <view class="form-item">
            <text class="form-label">门牌号</text>
            <view class="input-row">
              <input 
                class="form-input" 
                v-model="formData.houseNumber"
                placeholder="如B区180号"
              />
            </view>
          </view>

          <view class="form-item">
            <text class="form-label">联系人</text>
            <text class="form-required">*</text>
            <view class="input-row">
              <input 
                class="form-input" 
                v-model="formData.contact"
                placeholder="姓名/店铺名"
              />
              <view class="contact-btn" @click="chooseContact">
                <text class="contact-btn-text">通讯录</text>
              </view>
            </view>
          </view>

          <view class="form-item">
            <text class="form-label">电话</text>
            <text class="form-required">*</text>
            <view class="input-row">
              <input 
                class="form-input" 
                v-model="formData.phone"
                placeholder="手机/座机"
              />
              <view class="extension-btn" @click="toggleExtension">
                <text class="extension-btn-text">分机号</text>
              </view>
            </view>
          </view>

          <view v-if="showExtension" class="form-item">
            <text class="form-label">分机号</text>
            <view class="input-row">
              <input 
                class="form-input" 
                v-model="formData.extension"
                placeholder="分机号码"
              />
            </view>
          </view>

          <view class="checkbox-item">
            <view class="checkbox" :class="{ checked: formData.saveAddress }" @click="toggleSaveAddress">
              <view v-if="formData.saveAddress" class="checkbox-icon">✓</view>
            </view>
            <text class="checkbox-text">存入地址簿</text>
          </view>

          <view class="clear-btn" @click="clearForm">
            <text class="clear-text">清空</text>
          </view>
        </view>
      </view>

      <view class="history-section">
        <view class="section-header">
          <text class="section-title">历史地址</text>
          <view class="address-book-btn" @click="goToAddressBook">
            <text class="address-book-text">地址簿 ›</text>
          </view>
        </view>
        <view v-if="historyAddresses.length > 0" class="history-list">
          <view 
            v-for="(addr, index) in historyAddresses" 
            :key="index"
            class="history-item"
            @click="selectHistory(addr)"
          >
            <text class="history-address">{{ addr.address }}</text>
            <text class="history-contact">{{ addr.contact }} {{ addr.phone }}</text>
          </view>
        </view>
        <view v-else class="empty-history">
          <text class="empty-text">暂无历史地址</text>
        </view>
      </view>
    </view>

    <view class="footer">
      <view class="confirm-btn" :class="{ disabled: !isValid }" @click="confirm">
        <text class="btn-text">确认</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const formData = ref({
  pasteText: '',
  address: '',
  houseNumber: '',
  contact: '',
  phone: '',
  extension: '',
  saveAddress: false
})

const showExtension = ref(false)
const currentAddress = ref('华熙国际中心D座-出入口')

const historyAddresses = ref([
  { address: '北京市朝阳区望京SOHO T1 1201室', contact: '张三', phone: '138****8888' },
  { address: '北京市海淀区中关村科技园A座', contact: '张三', phone: '138****8888' }
])

const isValid = computed(() => {
  return formData.value.address && formData.value.contact && formData.value.phone
})

function goBack() {
  uni.navigateBack()
}

function pasteText() {
  uni.showToast({ title: '粘贴功能开发中', icon: 'none' })
}

function goToMap() {
  uni.navigateTo({ url: '/pages/map-selector/index' })
}

function chooseContact() {
  uni.showToast({ title: '通讯录功能开发中', icon: 'none' })
}

function toggleExtension() {
  showExtension.value = !showExtension.value
}

function toggleSaveAddress() {
  formData.value.saveAddress = !formData.value.saveAddress
}

function clearForm() {
  formData.value.address = ''
  formData.value.houseNumber = ''
  formData.value.contact = ''
  formData.value.phone = ''
  formData.value.extension = ''
}

function selectHistory(addr: any) {
  formData.value.address = addr.address
  formData.value.contact = addr.contact
  formData.value.phone = addr.phone
}

function goToAddressBook() {
  uni.navigateTo({ url: '/pages/address/index' })
}

function confirm() {
  if (!isValid.value) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' })
    return
  }
  
  const addressInfo = {
    address: formData.value.address,
    houseNumber: formData.value.houseNumber,
    contact: formData.value.contact,
    phone: formData.value.phone,
    extension: formData.value.extension
  }
  
  uni.setStorageSync('addressInfo', addressInfo)
  
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
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #f5f7fa;
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

.content {
  padding: 24rpx;
  padding-bottom: 180rpx;
}

.paste-section {
  display: flex;
  background: #fff;
  border-radius: 12rpx;
  padding: 16rpx;
  margin-bottom: 24rpx;
}

.paste-input-wrapper {
  flex: 1;
}

.paste-input {
  width: 100%;
  height: 80rpx;
  font-size: 28rpx;
  color: #1a3a52;
}

.paste-btn {
  padding: 0 32rpx;
  display: flex;
  align-items: center;
}

.paste-text {
  font-size: 28rpx;
  color: #4facfe;
}

.map-section {
  background: #fff;
  border-radius: 12rpx;
  margin-bottom: 24rpx;
}

.map-placeholder {
  padding: 32rpx;
  display: flex;
  align-items: center;
}

.map-icon {
  font-size: 40rpx;
  margin-right: 16rpx;
}

.map-address {
  flex: 1;
  font-size: 30rpx;
  color: #1a3a52;
}

.map-btn {
  background: #f5f7fa;
  padding: 16rpx 24rpx;
  border-radius: 24rpx;
}

.map-btn-text {
  font-size: 26rpx;
  color: #4facfe;
}

.form-section {
  margin-bottom: 32rpx;
}

.form-card {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24rpx;
  border-bottom: 2rpx solid #f0f0f0;
  margin-bottom: 24rpx;
}

.card-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1a3a52;
}

.edit-btn {
  padding: 12rpx 24rpx;
  background: #f5f7fa;
  border-radius: 20rpx;
}

.edit-text {
  font-size: 26rpx;
  color: #5a6b7d;
}

.form-item {
  margin-bottom: 24rpx;
}

.form-label {
  font-size: 28rpx;
  font-weight: 500;
  color: #1a3a52;
  margin-bottom: 16rpx;
  display: block;
}

.form-required {
  color: #ef5350;
}

.input-row {
  display: flex;
  align-items: center;
}

.form-input {
  flex: 1;
  height: 88rpx;
  background: #f8f9fa;
  border-radius: 12rpx;
  padding: 0 24rpx;
  font-size: 30rpx;
  color: #1a3a52;
}

.contact-btn {
  margin-left: 16rpx;
  padding: 0 24rpx;
  height: 88rpx;
  display: flex;
  align-items: center;
  background: #f5f7fa;
  border-radius: 12rpx;
}

.contact-btn-text {
  font-size: 28rpx;
  color: #5a6b7d;
}

.extension-btn {
  margin-left: 16rpx;
  padding: 0 24rpx;
  height: 88rpx;
  display: flex;
  align-items: center;
  background: #f5f7fa;
  border-radius: 12rpx;
}

.extension-btn-text {
  font-size: 28rpx;
  color: #5a6b7d;
}

.checkbox-item {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
}

.checkbox {
  width: 40rpx;
  height: 40rpx;
  border: 3rpx solid #d0d0d0;
  border-radius: 8rpx;
  margin-right: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox.checked {
  background: #4facfe;
  border-color: #4facfe;
}

.checkbox-icon {
  font-size: 24rpx;
  color: #fff;
}

.checkbox-text {
  font-size: 28rpx;
  color: #5a6b7d;
}

.clear-btn {
  padding: 20rpx;
  text-align: center;
  border-top: 2rpx solid #f0f0f0;
}

.clear-text {
  font-size: 28rpx;
  color: #ef5350;
}

.history-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #1a3a52;
}

.address-book-btn {
  padding: 12rpx 24rpx;
}

.address-book-text {
  font-size: 26rpx;
  color: #5a6b7d;
}

.history-list {
  display: flex;
  flex-direction: column;
}

.history-item {
  padding: 20rpx 0;
  border-bottom: 2rpx solid #f0f0f0;
}

.history-item:last-child {
  border-bottom: none;
}

.history-address {
  display: block;
  font-size: 28rpx;
  color: #1a3a52;
  margin-bottom: 8rpx;
}

.history-contact {
  font-size: 24rpx;
  color: #90a4ae;
}

.empty-history {
  padding: 40rpx;
  text-align: center;
}

.empty-text {
  font-size: 28rpx;
  color: #b0bec5;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24rpx 32rpx;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  background: #fff;
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
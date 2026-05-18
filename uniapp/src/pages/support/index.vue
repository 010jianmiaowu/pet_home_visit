<template>
  <view class="container">
    <view class="support-header">
      <view class="header-bg"></view>
      <view class="header-content">
        <text class="title">客服中心</text>
        <text class="subtitle">有问题？我们来帮您</text>
      </view>
    </view>

    <view class="support-section">
      <view class="section-title">
        <text class="icon">💬</text>
        <text class="text">联系客服</text>
      </view>
      <view class="contact-list">
        <view class="contact-item" @click="callService">
          <view class="contact-icon bg-orange">📞</view>
          <view class="contact-info">
            <text class="contact-title">热线客服</text>
            <text class="contact-desc">7x24小时在线</text>
          </view>
          <text class="contact-arrow">→</text>
        </view>
        <view class="contact-item" @click="onlineService">
          <view class="contact-icon bg-green">💬</view>
          <view class="contact-info">
            <text class="contact-title">在线客服</text>
            <text class="contact-desc">工作日 9:00-21:00</text>
          </view>
          <view class="online-badge">在线</view>
          <text class="contact-arrow">→</text>
        </view>
      </view>
    </view>

    <view class="support-section">
      <view class="section-title">
        <text class="icon">❓</text>
        <text class="text">常见问题</text>
      </view>
      <view class="faq-list">
        <view 
          class="faq-item" 
          v-for="(faq, index) in faqs" 
          :key="index"
          @click="toggleFaq(index)"
        >
          <view class="faq-header">
            <text class="faq-question">{{ faq.question }}</text>
            <text class="faq-arrow" :class="{ expanded: expandedIndex === index }">▼</text>
          </view>
          <view class="faq-content" v-show="expandedIndex === index">
            <text class="faq-answer">{{ faq.answer }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="support-section">
      <view class="section-title">
        <text class="icon">📝</text>
        <text class="text">服务时间</text>
      </view>
      <view class="service-time">
        <view class="time-item">
          <text class="time-label">客服热线</text>
          <text class="time-value">7x24小时</text>
        </view>
        <view class="time-item">
          <text class="time-label">在线客服</text>
          <text class="time-value">9:00 - 21:00</text>
        </view>
        <view class="time-item">
          <text class="time-label">上门服务</text>
          <text class="time-value">8:00 - 20:00</text>
        </view>
      </view>
    </view>

    <view class="bottom-space"></view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const expandedIndex = ref<number | null>(null)

const faqs = [
  {
    question: '如何预约服务？',
    answer: '您可以在首页选择服务项目，进入服务详情页后点击"立即预约"，填写预约时间、地址和宠物信息，确认订单后即可完成预约。您也可以通过首页的"一键预约"快捷入口直接进入预约页面。'
  },
  {
    question: '服务价格如何计算？',
    answer: '服务价格根据宠物的品种、体重、毛发长度以及所选服务项目综合计算。系统会在您选择完宠物信息和服务项目后自动生成报价单，您可以在确认订单前查看详细费用明细。'
  },
  {
    question: '上门服务范围是哪里？',
    answer: '目前我们的上门服务覆盖北京市五环以内区域。对于五环以外的订单，可能会产生额外的远程服务费，具体费用会在下单时显示。我们正在逐步扩展服务范围，请关注后续更新。'
  },
  {
    question: '如何修改或取消订单？',
    answer: '订单在服务者接单前可以免费取消或修改。已接单的订单如需取消，请提前2小时联系客服。服务开始后取消订单将按照服务进度收取相应费用。您可以在"我的订单"中找到对应订单进行操作。'
  },
  {
    question: '服务过程中宠物出现不适怎么办？',
    answer: '我们的服务人员都经过专业培训，会全程关注宠物状态。如果宠物在服务过程中出现紧张或不适，服务人员会立即停止操作并与您沟通。您也可以随时通过订单详情页联系服务人员。'
  },
  {
    question: '如何申请发票？',
    answer: '订单完成后，您可以在"我的订单"中找到对应订单，点击"申请开票"按钮，选择个人或企业发票，填写相关信息后提交即可。发票会在3-5个工作日内发送到您填写的邮箱。'
  }
]

function toggleFaq(index: number) {
  expandedIndex.value = expandedIndex.value === index ? null : index
}

function callService() {
  uni.makePhoneCall({
    phoneNumber: '400-888-8888',
    success: () => {},
    fail: () => {
      uni.showToast({ title: '呼叫失败', icon: 'none' })
    }
  })
}

function onlineService() {
  uni.navigateTo({ url: '/pages/chat/index' })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #F5F7FA;
}

.support-header {
  position: relative;
  padding: 120rpx 40rpx 60rpx;
  overflow: hidden;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #00D4AA 0%, #00B894 100%);
}

.header-content {
  position: relative;
  z-index: 1;
}

.title {
  font-size: 48rpx;
  font-weight: 700;
  color: #fff;
  display: block;
  margin-bottom: 12rpx;
}

.subtitle {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.85);
}

.support-section {
  background: #fff;
  margin: 24rpx;
  border-radius: 24rpx;
  padding: 32rpx;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
}

.section-title {
  display: flex;
  align-items: center;
  margin-bottom: 28rpx;
}

.section-title .icon {
  font-size: 36rpx;
  margin-right: 16rpx;
}

.section-title .text {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 28rpx;
  background: #F8F9FA;
  border-radius: 20rpx;
}

.contact-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36rpx;
  margin-right: 24rpx;
}

.contact-icon.bg-orange {
  background: linear-gradient(135deg, #FF9F43 0%, #FF6B6B 100%);
}

.contact-icon.bg-green {
  background: linear-gradient(135deg, #00D4AA 0%, #00B894 100%);
}

.contact-info {
  flex: 1;
}

.contact-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 8rpx;
}

.contact-desc {
  font-size: 24rpx;
  color: #999;
}

.contact-arrow {
  font-size: 32rpx;
  color: #ccc;
  margin-left: 16rpx;
}

.online-badge {
  font-size: 20rpx;
  color: #00D4AA;
  background: #E8FFF5;
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  margin-right: 16rpx;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.faq-item {
  border-bottom: 2rpx solid #F0F0F0;
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-header {
  display: flex;
  align-items: center;
  padding: 28rpx 0;
}

.faq-question {
  flex: 1;
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.faq-arrow {
  font-size: 20rpx;
  color: #999;
  transition: transform 0.3s ease;
}

.faq-arrow.expanded {
  transform: rotate(180deg);
}

.faq-content {
  padding-bottom: 28rpx;
}

.faq-answer {
  font-size: 26rpx;
  color: #666;
  line-height: 1.8;
}

.service-time {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.time-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
}

.time-label {
  font-size: 28rpx;
  color: #666;
}

.time-value {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.bottom-space {
  height: 40rpx;
}
</style>
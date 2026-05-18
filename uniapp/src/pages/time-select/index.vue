<template>
  <view class="container">
    <view class="modal-mask" @click="closeModal"></view>
    <view class="modal-content">
      <view class="modal-header">
        <text class="modal-title">请选择上门时间(支持单天)</text>
        <view class="modal-close" @click="closeModal">
          <text>✕</text>
        </view>
      </view>

      <view class="calendar-section">
        <view class="week-header">
          <view class="week-item" v-for="(day, index) in weekDays" :key="index">
            <text class="week-name">{{ day }}</text>
          </view>
        </view>
        
        <scroll-view class="calendar-scroll" scroll-x>
          <view class="calendar-grid">
            <view 
              v-for="(day, index) in calendarDays" 
              :key="index"
              class="day-item"
              :class="{ 
                'today': day.isToday,
                'selected': day.date === selectedDate,
                'available': day.available,
                'disabled': !day.available && !day.isToday
              }"
              @click="selectDate(day)"
            >
              <text class="day-date">{{ day.day }}</text>
              <text v-if="day.isToday" class="day-today">今天</text>
              <text v-else-if="day.available" class="day-status">可预约</text>
              <text v-else-if="!day.available && !day.isToday" class="day-status">可查看</text>
              <view v-if="day.date === selectedDate" class="day-check">✓</view>
            </view>
          </view>
        </scroll-view>
      </view>

      <view class="time-section">
        <view class="section-title">选择上门时段</view>
        <view class="time-grid">
          <view 
            v-for="(time, index) in timeSlots" 
            :key="index"
            class="time-item"
            :class="{ active: selectedTime === time }"
            @click="selectTime(time)"
          >
            <text class="time-text">{{ time }}</text>
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

const weekDays = ['日', '一', '二', '三', '四', '五', '六']
const selectedDate = ref('')
const selectedTime = ref('')

const calendarDays = ref([])
const timeSlots = [
  '08:00-09:00',
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
  '17:00-18:00',
  '18:00-19:00',
  '19:00-20:00'
]

function generateCalendar() {
  const days = []
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  
  for (let i = 0; i < 35; i++) {
    const date = new Date(year, month, today.getDate() + i)
    const day = date.getDate()
    const weekDay = date.getDay()
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    
    days.push({
      date: dateStr,
      day,
      weekDay,
      isToday: i === 0,
      available: i <= 7
    })
  }
  
  calendarDays.value = days
  selectedDate.value = days[0].date
}

generateCalendar()

const isValid = computed(() => {
  return selectedDate.value && selectedTime.value
})

function selectDate(day: any) {
  if (!day.available && !day.isToday) return
  selectedDate.value = day.date
}

function selectTime(time: string) {
  selectedTime.value = time
}

function confirm() {
  if (!isValid.value) {
    uni.showToast({ title: '请选择上门时间', icon: 'none' })
    return
  }
  
  const timeInfo = {
    date: selectedDate.value,
    time: selectedTime.value
  }
  
  uni.setStorageSync('timeInfo', timeInfo)
  
  uni.showToast({ 
    title: '选择成功', 
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
  font-size: 34rpx;
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

.calendar-section {
  padding: 32rpx;
}

.week-header {
  display: flex;
  margin-bottom: 20rpx;
}

.week-item {
  flex: 1;
  text-align: center;
}

.week-name {
  font-size: 26rpx;
  color: #90a4ae;
}

.calendar-scroll {
  white-space: nowrap;
}

.calendar-grid {
  display: inline-flex;
  gap: 12rpx;
}

.day-item {
  width: 140rpx;
  padding: 20rpx 12rpx;
  background: #f8f9fa;
  border-radius: 16rpx;
  text-align: center;
  position: relative;
  flex-shrink: 0;
}

.day-item.today {
  background: #fff3e0;
}

.day-item.selected {
  background: #1a3a52;
}

.day-item.disabled {
  opacity: 0.5;
}

.day-date {
  display: block;
  font-size: 40rpx;
  font-weight: 600;
  color: #1a3a52;
}

.day-item.selected .day-date {
  color: #fff;
}

.day-today {
  display: block;
  font-size: 20rpx;
  color: #ff9800;
  margin-top: 8rpx;
}

.day-item.selected .day-today {
  color: rgba(255, 255, 255, 0.8);
}

.day-status {
  display: block;
  font-size: 20rpx;
  color: #4caf50;
  margin-top: 8rpx;
}

.day-item.selected .day-status {
  color: rgba(255, 255, 255, 0.8);
}

.day-item.disabled .day-status {
  color: #b0bec5;
}

.day-check {
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

.time-section {
  padding: 0 32rpx 32rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #1a3a52;
  margin-bottom: 20rpx;
  display: block;
}

.time-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.time-item {
  padding: 24rpx 32rpx;
  background: #f8f9fa;
  border-radius: 12rpx;
}

.time-item.active {
  background: #ff6b6b;
}

.time-text {
  font-size: 28rpx;
  color: #1a3a52;
}

.time-item.active .time-text {
  color: #fff;
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
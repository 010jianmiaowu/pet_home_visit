<template>
  <view class="container">
    <view class="address-list">
      <view v-if="addresses.length === 0" class="empty-tip">
        <text>暂无地址，点击下方按钮添加</text>
      </view>
      <view v-else>
        <view v-for="addr in addresses" :key="addr.id" class="address-card">
          <view class="address-header">
            <view :class="['address-tag', addr.tag]">{{ getTagText(addr.tag) }}</view>
            <view class="address-actions">
              <button class="address-action-btn" @click="editAddress(addr)">编辑</button>
              <button class="address-action-btn" @click="deleteAddress(addr.id)">删除</button>
            </view>
          </view>
          <text class="address-name">{{ addr.name }}</text>
          <text class="address-phone">{{ addr.phone }}</text>
          <text class="address-detail">{{ addr.detail }}</text>
        </view>
      </view>
    </view>

    <view class="action-area">
      <button class="btn-primary" @click="openAddModal">添加地址</button>
    </view>

    <view class="modal-overlay" v-if="showModal" @click="closeModal">
      <view class="modal-content" @click.stop>
        <text class="modal-title">{{ isEdit ? '编辑地址' : '添加地址' }}</text>
        <view class="modal-body">
          <view class="form-group">
            <text class="form-label">收货人</text>
            <input class="form-input" v-model="formData.name" placeholder="请输入收货人" />
          </view>
          <view class="form-group">
            <text class="form-label">联系电话</text>
            <input class="form-input" v-model="formData.phone" placeholder="请输入联系电话" />
          </view>
          <view class="form-group">
            <text class="form-label">详细地址</text>
            <textarea class="form-input textarea" v-model="formData.detail" placeholder="请输入详细地址" />
          </view>
          <view class="form-group">
            <text class="form-label">标签</text>
            <view class="tag-options">
              <view 
                v-for="tag in tagOptions" 
                :key="tag.value" 
                :class="['tag-option', { active: formData.tag === tag.value }]"
                @click="formData.tag = tag.value"
              >{{ tag.label }}</view>
            </view>
          </view>
        </view>
        <view class="modal-btn-group">
          <button class="modal-btn cancel" @click="closeModal">取消</button>
          <button class="modal-btn confirm" @click="saveAddress">保存</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { addresses } from '@/data'
import type { Address } from '@/data'

const showModal = ref(false)
const isEdit = ref(false)
const editingAddress = ref<Address | null>(null)

const tagOptions = [
  { label: '家', value: 'home' as const },
  { label: '公司', value: 'work' as const },
  { label: '其他', value: 'other' as const }
]

const formData = reactive({
  name: '',
  phone: '',
  detail: '',
  tag: 'home' as 'home' | 'work' | 'other'
})

function getTagText(tag: string): string {
  const map: Record<string, string> = {
    home: '家',
    work: '公司',
    other: '其他'
  }
  return map[tag] || '其他'
}

function openAddModal() {
  isEdit.value = false
  editingAddress.value = null
  formData.name = ''
  formData.phone = ''
  formData.detail = ''
  formData.tag = 'home'
  showModal.value = true
}

function editAddress(addr: Address) {
  isEdit.value = true
  editingAddress.value = addr
  formData.name = addr.name
  formData.phone = addr.phone.replace(/\*/g, '')
  formData.detail = addr.detail
  formData.tag = addr.tag
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function saveAddress() {
  if (!formData.name || !formData.phone || !formData.detail) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' })
    return
  }

  const newAddress: Address = {
    id: editingAddress.value?.id || Date.now(),
    name: formData.name,
    phone: formData.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
    detail: formData.detail,
    tag: formData.tag
  }

  if (isEdit.value && editingAddress.value) {
    const index = addresses.findIndex(a => a.id === editingAddress.value!.id)
    if (index > -1) {
      addresses[index] = newAddress
    }
  } else {
    addresses.push(newAddress)
  }

  closeModal()
  uni.showToast({ title: isEdit.value ? '修改成功' : '添加成功', icon: 'success' })
}

function deleteAddress(id: number) {
  uni.showModal({
    title: '提示',
    content: '确定要删除该地址吗？',
    success: (res) => {
      if (res.confirm) {
        const index = addresses.findIndex(a => a.id === id)
        if (index > -1) {
          addresses.splice(index, 1)
          uni.showToast({ title: '删除成功', icon: 'success' })
        }
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.address-list {
  padding: 0 28rpx;
}

.empty-tip {
  text-align: center;
  padding: 100rpx 50rpx;
  color: #999;
}

.address-card {
  background: #fff;
  margin-bottom: 28rpx;
  border-radius: 22rpx;
  padding: 28rpx;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.address-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22rpx;
}

.address-tag {
  display: inline-block;
  padding: 8rpx 18rpx;
  background: #E0FFF0;
  color: #00B894;
  font-size: 20rpx;
  border-radius: 10rpx;
}

.tag-options {
  display: flex;
  gap: 10rpx;
}

.tag-option {
  padding: 12rpx 24rpx;
  background: #E0FFF0;
  color: #00B894;
  font-size: 22rpx;
  border-radius: 14rpx;
}

.tag-option.active {
  background: #00D4AA;
  color: #fff;
}

.address-name {
  font-weight: 600;
  font-size: 25rpx;
  margin-bottom: 8rpx;
  display: block;
}

.address-phone {
  font-size: 21rpx;
  color: #666;
  margin-bottom: 12rpx;
  display: block;
}

.address-detail {
  font-size: 21rpx;
  color: #999;
  line-height: 1.6;
  display: block;
}

.address-actions {
  display: flex;
  gap: 20rpx;
}

.address-action-btn {
  flex: 1;
  padding: 16rpx;
  border: 2rpx solid #eee;
  border-radius: 16rpx;
  font-size: 21rpx;
  color: #666;
  background: #fff;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-area {
  padding: 32rpx;
  padding-bottom: 120rpx;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
}

.modal-content {
  background: #fff;
  margin: 32rpx;
  border-radius: 20rpx;
  padding: 32rpx;
  width: calc(100% - 64rpx);
  max-height: 80vh;
  overflow-y: auto;
}

.modal-title {
  font-size: 24rpx;
  font-weight: 600;
  margin-bottom: 25rpx;
  text-align: center;
  display: block;
}

.modal-body {
  margin-bottom: 25rpx;
}

.modal-btn-group {
  display: flex;
  gap: 15rpx;
}

.modal-btn {
  flex: 1;
  padding: 20rpx;
  border-radius: 14rpx;
  font-size: 22rpx;
  font-weight: 500;
  border: none;
  height: 70rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-btn.cancel {
  background: #f5f5f5;
  color: #666;
}

.modal-btn.confirm {
  background: #00D4AA;
  color: #fff;
}

.textarea {
  height: 120rpx;
}
</style>

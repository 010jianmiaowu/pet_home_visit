<template>
  <view class="container">
    <view class="pet-list">
      <view v-if="pets.length === 0" class="empty-tip">
        <text>暂无宠物，点击下方按钮添加</text>
      </view>
      <view v-else>
        <view v-for="pet in pets" :key="pet.id" class="pet-card">
          <view class="pet-header">
            <view class="pet-avatar">{{ pet.avatar }}</view>
            <view class="pet-info">
              <text class="pet-name">{{ pet.name }}</text>
              <text class="pet-spec">{{ getPetType(pet.type) }} · {{ getPetWeight(pet.weight) }} · {{ pet.hair === 'short' ? '短毛' : '长毛' }}</text>
            </view>
          </view>
          <view class="pet-actions">
            <button class="btn-outline" @click="editPet(pet)">编辑</button>
            <button class="btn-secondary" @click="deletePet(pet.id)">删除</button>
          </view>
        </view>
      </view>
    </view>

    <view class="action-area">
      <button class="btn-primary" @click="openAddModal">添加宠物</button>
    </view>

    <view class="modal-overlay" v-if="showModal" @click="closeModal">
      <view class="modal-content" @click.stop>
        <text class="modal-title">{{ isEdit ? '编辑宠物' : '添加宠物' }}</text>
        <view class="modal-body">
          <view class="pet-upload-area" @click="uploadImage">📷 点击上传宠物照片</view>
          <view class="form-group">
            <text class="form-label">宠物名称</text>
            <input class="form-input" v-model="formData.name" placeholder="请输入宠物名称" />
          </view>
          <view class="form-group">
            <text class="form-label">宠物类型</text>
            <picker :value="petTypeIndex" :range="petTypes" @change="onPetTypeChange">
              <view class="form-picker">
                {{ petTypes[petTypeIndex] }}
                <text class="picker-arrow">›</text>
              </view>
            </picker>
          </view>
          <view class="form-group">
            <text class="form-label">体重区间</text>
            <picker :value="weightIndex" :range="weightOptions" @change="onWeightChange">
              <view class="form-picker">
                {{ weightOptions[weightIndex] }}
                <text class="picker-arrow">›</text>
              </view>
            </picker>
          </view>
          <view class="form-group">
            <text class="form-label">毛发类型</text>
            <picker :value="hairIndex" :range="hairOptions" @change="onHairChange">
              <view class="form-picker">
                {{ hairOptions[hairIndex] }}
                <text class="picker-arrow">›</text>
              </view>
            </picker>
          </view>
        </view>
        <view class="modal-btn-group">
          <button class="modal-btn cancel" @click="closeModal">取消</button>
          <button class="modal-btn confirm" @click="savePet">保存</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { pets } from '@/data'
import type { Pet } from '@/data'

const showModal = ref(false)
const isEdit = ref(false)
const editingPet = ref<Pet | null>(null)

const petTypes = ['🐶 狗狗', '🐱 猫咪']
const weightOptions = ['<5kg', '5-10kg', '10-20kg', '>20kg']
const hairOptions = ['短毛', '长毛']

const petTypeIndex = ref(0)
const weightIndex = ref(0)
const hairIndex = ref(0)

const formData = reactive({
  name: ''
})

function getPetType(type: string): string {
  return type === 'dog' ? '🐶 狗狗' : '🐱 猫咪'
}

function getPetWeight(weight: string): string {
  const map: Record<string, string> = {
    small: '<5kg',
    medium: '5-10kg',
    large: '10-20kg',
    xlarge: '>20kg'
  }
  return map[weight] || weight
}

function openAddModal() {
  isEdit.value = false
  editingPet.value = null
  formData.name = ''
  petTypeIndex.value = 0
  weightIndex.value = 0
  hairIndex.value = 0
  showModal.value = true
}

function editPet(pet: Pet) {
  isEdit.value = true
  editingPet.value = pet
  formData.name = pet.name
  petTypeIndex.value = pet.type === 'dog' ? 0 : 1
  weightIndex.value = ['small', 'medium', 'large', 'xlarge'].indexOf(pet.weight) || 0
  hairIndex.value = pet.hair === 'short' ? 0 : 1
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function uploadImage() {
  uni.showToast({ title: '图片上传功能开发中', icon: 'none' })
}

function onPetTypeChange(e: any) {
  petTypeIndex.value = e.detail.value
}

function onWeightChange(e: any) {
  weightIndex.value = e.detail.value
}

function onHairChange(e: any) {
  hairIndex.value = e.detail.value
}

function savePet() {
  if (!formData.name) {
    uni.showToast({ title: '请输入宠物名称', icon: 'none' })
    return
  }

  const newPet: Pet = {
    id: editingPet.value?.id || Date.now(),
    name: formData.name,
    type: petTypeIndex.value === 0 ? 'dog' : 'cat',
    weight: ['small', 'medium', 'large', 'xlarge'][weightIndex.value],
    hair: hairIndex.value === 0 ? 'short' : 'long',
    avatar: petTypeIndex.value === 0 ? '🐶' : '🐱'
  }

  if (isEdit.value && editingPet.value) {
    const index = pets.findIndex(p => p.id === editingPet.value!.id)
    if (index > -1) {
      pets[index] = newPet
    }
  } else {
    pets.push(newPet)
  }

  closeModal()
  uni.showToast({ title: isEdit.value ? '修改成功' : '添加成功', icon: 'success' })
}

function deletePet(id: number) {
  uni.showModal({
    title: '提示',
    content: '确定要删除该宠物吗？',
    success: (res) => {
      if (res.confirm) {
        const index = pets.findIndex(p => p.id === id)
        if (index > -1) {
          pets.splice(index, 1)
          uni.showToast({ title: '删除成功', icon: 'success' })
        }
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.pet-list {
  padding: 0 28rpx;
}

.empty-tip {
  text-align: center;
  padding: 100rpx 50rpx;
  color: #999;
}

.pet-card {
  background: #fff;
  margin-bottom: 28rpx;
  border-radius: 22rpx;
  padding: 28rpx;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.pet-header {
  display: flex;
  align-items: center;
  margin-bottom: 22rpx;
}

.pet-avatar {
  width: 95rpx;
  height: 95rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #00D4AA 0%, #00B894 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 46rpx;
  margin-right: 28rpx;
}

.pet-info {
  flex: 1;
}

.pet-name {
  font-weight: 600;
  font-size: 28rpx;
  display: block;
}

.pet-spec {
  font-size: 21rpx;
  color: #999;
  margin-top: 6rpx;
  display: block;
}

.pet-actions {
  display: flex;
  gap: 15rpx;
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

.pet-upload-area {
  height: 200rpx;
  border: 3rpx dashed #ddd;
  border-radius: 18rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 22rpx;
  margin-bottom: 28rpx;
}

.form-picker {
  width: 100%;
  padding: 28rpx;
  border: 2rpx solid #eee;
  border-radius: 18rpx;
  font-size: 26rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.picker-arrow {
  color: #999;
}
</style>

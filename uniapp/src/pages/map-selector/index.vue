<template>
  <view class="container">
    <view class="map-container" id="mapContainer">
      <view class="map-tip">
        <text class="tip-icon">📍</text>
        <text class="tip-text">点击地图选择位置</text>
      </view>
    </view>
    
    <view class="address-section">
      <view class="section-title">
        <text class="title-icon">🏠</text>
        <text>常用地址</text>
      </view>
      <view class="address-list">
        <view 
          v-for="addr in addressList" 
          :key="addr.id"
          class="address-item"
          :class="{ active: selectedAddress === addr.id }"
          @click="selectAddress(addr)"
        >
          <view class="addr-radio">
            <view v-if="selectedAddress === addr.id" class="radio-dot"></view>
          </view>
          <view class="addr-info">
            <text class="addr-tag">{{ addr.tag }}</text>
            <text class="addr-detail">{{ addr.detail }}</text>
          </view>
          <view v-if="selectedAddress === addr.id" class="addr-check">✓</view>
        </view>
      </view>
    </view>
    
    <view class="input-area">
      <input 
        class="search-input" 
        v-model="searchAddr" 
        placeholder="搜索地址"
        @confirm="searchAddress"
      />
    </view>

    <view class="bottom-bar">
      <view class="btn-confirm" @click="confirmAddress">
        <text class="btn-text">确定</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Address {
  id: number
  tag: string
  detail: string
  latitude: number
  longitude: number
}

const selectedAddress = ref<number | null>(null)
const searchAddr = ref('')

const addressList = ref<Address[]>([
  { id: 1, tag: '家', detail: '北京市朝阳区望京SOHO T1', latitude: 39.990464, longitude: 116.472185 },
  { id: 2, tag: '公司', detail: '北京市海淀区中关村科技园
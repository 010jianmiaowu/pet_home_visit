# pet_home_visit

丰速行宠物洗护 - 宠物上门服务小程序

## 项目简介

本项目是一个基于 UniApp 框架开发的宠物上门洗护服务平台，为养宠用户提供便捷的预约服务体验。

## 功能特性

- 🏠 **首页**：服务入口、预约信息、推荐服务
- 🐾 **宠物管理**：宠物信息编辑与管理
- 📋 **订单管理**：订单列表、订单详情、订单状态跟踪
- 💳 **支付功能**：支持微信、支付宝支付
- 🗺️ **遛宠社区**：地图查看附近遛狗活动
- 📍 **地址管理**：服务地址的增删改查

## 技术栈

- **框架**：UniApp + Vue 3
- **语言**：TypeScript
- **样式**：SCSS
- **地图**：高德地图

## 项目结构

```
uniapp/
├── src/
│   ├── pages/          # 页面文件
│   ├── styles/         # 全局样式
│   ├── data/           # 数据文件
│   ├── App.vue         # 应用入口
│   └── main.ts         # 主入口文件
├── package.json        # 项目配置
└── vite.config.ts      # Vite 配置
```

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式运行
npm run dev:h5

# 构建 H5 版本
npm run build:h5

# 构建微信小程序
npm run build:mp-weixin
```

## 许可证

MIT License

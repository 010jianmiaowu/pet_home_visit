export interface Pet {
  id: number
  name: string
  type: 'dog' | 'cat'
  weight: 'small' | 'medium' | 'large' | 'xlarge'
  hair: 'short' | 'long'
  avatar: string
}

export interface Address {
  id: number
  name: string
  phone: string
  detail: string
  tag: 'home' | 'work' | 'other'
}

export interface Provider {
  name: string
  phone: string
  rating: number
  avatar?: string
}

export interface Order {
  id: string
  status: 'pending' | 'accepted' | 'serving' | 'completed' | 'canceled'
  payStatus: 'unpaid' | 'paid' | 'refunding' | 'refunded'
  date: string
  time: string
  address: string
  petId: number
  petName: string
  service: string
  totalPrice: number
  canInvoice: boolean
  provider: Provider | null
  rated?: boolean
  cancelReason?: string
  remark?: string
}

export interface ServiceDetail {
  title: string
  price: number
  image: string
  description: string
  features: string[]
}

export const pets: Pet[] = [
  { id: 1, name: '旺财', type: 'dog', weight: 'medium', hair: 'long', avatar: '🐶' },
  { id: 2, name: '咪咪', type: 'cat', weight: 'small', hair: 'short', avatar: '🐱' }
]

export const addresses: Address[] = [
  { id: 1, name: '张三', phone: '138****8888', detail: '北京市朝阳区望京SOHO T1 1201室', tag: 'home' },
  { id: 2, name: '张三', phone: '138****8888', detail: '北京市海淀区中关村科技园A座', tag: 'work' }
]

export const orders: Order[] = [
  { id: 'FSX20240115001', status: 'pending', payStatus: 'unpaid', date: '2024-01-15', time: '14:00', address: '北京市朝阳区望京SOHO T1', petId: 1, petName: '旺财', service: '移动洗护车服务', totalPrice: 150, canInvoice: true, provider: null },
  { id: 'FSX20240114002', status: 'completed', payStatus: 'paid', date: '2024-01-14', time: '10:00', address: '北京市海淀区中关村大街', petId: 2, petName: '咪咪', service: 'SPA级护理', totalPrice: 180, canInvoice: true, provider: { name: '李师傅', phone: '138****8888', rating: 4.8 }, rated: false },
  { id: 'FSX20240113003', status: 'serving', payStatus: 'paid', date: '2024-01-13', time: '16:00', address: '北京市西城区金融街', petId: 1, petName: '旺财', service: '造型美容', totalPrice: 150, canInvoice: false, provider: { name: '王师傅', phone: '139****9999', rating: 4.9 } },
  { id: 'FSX20240112004', status: 'accepted', payStatus: 'paid', date: '2024-01-12', time: '09:00', address: '北京市东城区王府井大街', petId: 2, petName: '咪咪', service: '基础洗澡', totalPrice: 120, canInvoice: true, provider: { name: '张师傅', phone: '137****7777', rating: 4.7 } },
  { id: 'FSX20240111005', status: 'canceled', payStatus: 'refunded', date: '2024-01-11', time: '15:00', address: '北京市丰台区方庄', petId: 1, petName: '旺财', service: 'SPA护理', totalPrice: 180, canInvoice: false, provider: null, cancelReason: '服务者临时有事' }
]

export const serviceDetailData: Record<string, ServiceDetail> = {
  mobile: { title: '移动洗护车服务', price: 120, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mobile%20pet%20grooming%20van%20professional&image_size=portrait_4_3', description: '专业移动洗护车上门服务，宠物无需外出，避免焦虑和应激。一宠一车，独立洗护空间，安全私密无交叉感染风险。', features: ['专车专用，独立空间', '恒温控制，舒适洗护', '专业美容师一对一服务', '紫外线消毒，安全卫生', '全程监控，透明可视'] },
  spa: { title: 'SPA级护理', price: 180, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20pet%20spa%20treatment%20bath&image_size=portrait_4_3', description: '深层清洁修复肌肤，营养护理滋养毛发，让宠物享受SPA级护理体验。', features: ['赛级高端洗护产品', '天然植物配方', '深层清洁修复', '营养护理滋养', '香薰舒缓放松'] },
  style: { title: '造型美容', price: 150, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20pet%20haircut%20styling&image_size=portrait_4_3', description: '个性化造型设计，专业修剪手法，让您的宠物焕发时尚魅力。', features: ['国际认证美容师', '个性化造型设计', '舒适温和修剪', '潮流风格推荐', '全方位美容体验'] },
  teeth: { title: '口腔护理', price: 100, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20dental%20care%20cleaning&image_size=portrait_4_3', description: '专业洁牙服务，预防牙结石，保持口腔健康。', features: ['专业洁牙设备', '温和护理', '预防牙结石', '清新口气', '口腔检查'] },
  nail: { title: '指甲护理', price: 50, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20nail%20trimming%20grooming&image_size=portrait_4_3', description: '专业剪甲打磨，安全舒适，避免抓伤。', features: ['专业修剪', '打磨抛光', '安全舒适', '防止抓伤', '足部检查'] },
  ear: { title: '耳道清洁', price: 60, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20ear%20cleaning%20care&image_size=portrait_4_3', description: '温和清洁耳道，预防耳螨和耳部感染。', features: ['温和清洁', '预防耳螨', '耳部检查', '专业护理', '舒适体验'] },
  bath: { title: '基础洗澡', price: 80, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20pet%20bath%20washing%20happy&image_size=portrait_4_3', description: '温和洗护，保持宠物干净清爽，去除异味。', features: ['温和配方', '彻底清洁', '去除异味', '毛发柔顺', '舒适体验'] },
  massage: { title: '精油按摩', price: 70, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20massage%20therapy%20relaxation&image_size=portrait_4_3', description: '舒缓按摩放松身心，促进血液循环，缓解肌肉紧张。', features: ['专业按摩手法', '天然精油', '放松身心', '促进循环', '缓解紧张'] }
}

export const categoryNav = [
  { icon: '🚗', name: '一键预约', action: 'order' },
  { icon: '🛁', name: '上门洗护', action: 'mobile' },
  { icon: '✨', name: 'SPA护理', action: 'spa' },
  { icon: '💇', name: '造型美容', action: 'style' },
  { icon: '🦷', name: '口腔护理', action: 'teeth' },
  { icon: '✂️', name: '指甲护理', action: 'nail' },
  { icon: '👂', name: '耳道清洁', action: 'ear' },
  { icon: '🐶', name: '我的宠物', action: 'pets' }
]

export const hotServices = [
  { rank: 1, name: '移动洗护车服务', count: '1,280+', key: 'mobile' },
  { rank: 2, name: 'SPA级护理', count: '890+', key: 'spa' },
  { rank: 3, name: '造型美容', count: '650+', key: 'style' }
]

export function getStatusText(status: string): string {
  const map: Record<string, string> = {
    pending: '待接单',
    accepted: '待服务',
    serving: '服务中',
    completed: '服务完成',
    canceled: '订单取消'
  }
  return map[status] || status
}

export function getPayStatusText(payStatus: string): string {
  const map: Record<string, string> = {
    unpaid: '待支付',
    paid: '已支付',
    refunding: '退款中',
    refunded: '已退款'
  }
  return map[payStatus] || payStatus
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    pending: '#FF9800',
    accepted: '#2196F3',
    serving: '#00D4AA',
    completed: '#4CAF50',
    canceled: '#F44336'
  }
  return map[status] || '#999'
}

export function getPayStatusColor(payStatus: string): string {
  const map: Record<string, string> = {
    unpaid: '#FF9800',
    paid: '#4CAF50',
    refunding: '#FFC107',
    refunded: '#9E9E9E'
  }
  return map[payStatus] || '#999'
}

export const posts = [
  {
    id: '1',
    userId: '1',
    username: '奶茶是只布偶猫',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20fluffy%20white%20cat%20avatar%20portrait%20warm%20style&image_size=square',
    content: '今天也要做一只快乐的小猫咪🐱\n晒晒我家奶茶的日常~阳光、零食、好心情！',
    image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=fluffy%20white%20ragdoll%20cat%20sitting%20in%20sunlight%20warm%20cozy%20illustration%20style&image_size=portrait_4_3',
    tags: ['#猫咪日常', '#布偶猫', '#萌宠出道计划'],
    likes: 128,
    comments: 32,
    favorites: 16,
    createdAt: '2小时前',
    detailContent: '今天天气超好，奶茶在阳台晒太☀\n毛茸茸的样子真的太治愈了~\n谁能拒绝一只可可爱爱的小猫咪呢！'
  },
  {
    id: '2',
    userId: '2',
    username: '多多的成长日记',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20shiba%20inu%20dog%20avatar%20portrait%20warm%20style&image_size=square',
    content: '和多多的周末时光\n一起去公园玩耍，奔跑，撒欢，太开心啦！',
    image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=happy%20shiba%20inu%20dog%20playing%20in%20park%20warm%20illustration%20style&image_size=portrait_4_3',
    tags: ['#狗狗日常', '#柴犬', '#周末快乐'],
    likes: 96,
    comments: 28,
    favorites: 12,
    createdAt: '5小时前',
    detailContent: '周末带多多去公园玩，它开心得不得了！\n跑了整整一下午，精力真的太旺盛了~\n看到它这么开心，我也觉得很幸福！'
  },
  {
    id: '3',
    userId: '3',
    username: '小橘的铲屎官',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20orange%20tabby%20cat%20avatar%20portrait%20warm%20style&image_size=square',
    content: '小橘今天又闯祸了😼\n把我的花盆打碎了，但看到它萌萌的眼神又不忍心骂它~',
    image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20orange%20tabby%20cat%20with%20broken%20flower%20pot%20guilty%20expression%20warm%20illustration&image_size=portrait_4_3',
    tags: ['#橘猫', '#调皮鬼', '#猫咪日常'],
    likes: 156,
    comments: 45,
    favorites: 23,
    createdAt: '昨天',
    detailContent: '早上起来发现客厅一片狼藉，我的多肉花盆碎了一地...\n小橘就坐在旁边，用那双大眼睛看着我，好像在说"不是我干的"\n算了算了，谁让它这么可爱呢~'
  },
  {
    id: '4',
    userId: '4',
    username: '球球的快乐生活',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20hamster%20avatar%20portrait%20warm%20style&image_size=square',
    content: '球球今天吃了超多瓜子~\n小仓鼠的快乐就是这么简单！',
    image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20fluffy%20hamster%20eating%20sunflower%20seeds%20warm%20illustration%20style&image_size=portrait_4_3',
    tags: ['#仓鼠', '#萌宠', '#治愈'],
    likes: 89,
    comments: 21,
    favorites: 15,
    createdAt: '昨天',
    detailContent: '今天给球球准备了它最爱的瓜子，吃得可开心了~\n小嘴巴一动一动的，太治愈了！\n看着它吃东西，我的心情也变好了~'
  }
]

export const comments = [
  {
    id: 'c1',
    postId: '1',
    userId: '5',
    username: '小熊软糖',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20bear%20avatar%20portrait%20warm%20style&image_size=square',
    content: '好可爱呀！奶茶的眼睛好漂亮~',
    likes: 5,
    createdAt: '2小时前'
  },
  {
    id: 'c2',
    postId: '1',
    userId: '6',
    username: '喵星人爱好者',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20cat%20face%20avatar%20portrait%20warm%20style&image_size=square',
    content: '我家也有一只布偶，简直一模一样！',
    likes: 3,
    createdAt: '1小时前'
  },
  {
    id: 'c3',
    postId: '1',
    userId: '7',
    username: '宠物达人',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20paw%20print%20avatar%20warm%20style&image_size=square',
    content: '阳光下的奶茶也太治愈了吧~',
    likes: 2,
    createdAt: '30分钟前'
  }
]

export const users = [
  {
    id: '1',
    username: '奶茶麻麻',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20fluffy%20white%20cat%20avatar%20portrait%20warm%20style&image_size=square',
    bio: '养猫生活记录者\n分享奶茶的日常点滴~\n期待和更多宠友成为朋友！',
    idNumber: '12345678',
    follows: 10,
    followers: 28,
    posts: 28,
    favorites: 56
  },
  {
    id: '2',
    username: '多多的成长日记',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20shiba%20inu%20dog%20avatar%20portrait%20warm%20style&image_size=square',
    bio: '记录柴犬多多的成长故事',
    idNumber: '87654321',
    follows: 15,
    followers: 45,
    posts: 56,
    favorites: 32
  }
]

export const pets = [
  {
    id: 'p1',
    name: '奶茶',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=fluffy%20white%20ragdoll%20cat%20portrait%20warm%20style&image_size=square',
    type: '布偶猫',
    age: '2岁3个月',
    gender: '母'
  },
  {
    id: 'p2',
    name: '多多',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=happy%20shiba%20inu%20dog%20portrait%20warm%20style&image_size=square',
    type: '柴犬',
    age: '1岁8个月',
    gender: '公'
  }
]
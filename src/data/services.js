// 服務項目（假資料）。duration 單位為分鐘，會影響佔用的時段數量。
export const SERVICES = [
  {
    id: 'bath',
    name: '基礎洗澡',
    icon: '🛁',
    desc: '清潔洗澡、吹乾、基礎清耳',
    duration: 60,
    price: 600,
  },
  {
    id: 'full',
    name: '全套美容',
    icon: '✂️',
    desc: '洗澡 + 剃毛造型 + 修剪指甲',
    duration: 120,
    price: 1200,
  },
  {
    id: 'nail',
    name: '指甲修剪',
    icon: '💅',
    desc: '快速指甲修剪、磨平',
    duration: 30,
    price: 200,
  },
];

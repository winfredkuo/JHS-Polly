export interface Unit {
  id: string;
  title: string;
}

export interface Book {
  id: string;
  title: string;
  units: Unit[];
}

export interface Subject {
  id: string;
  title: string;
  books: Book[];
}

export const curriculum: Subject[] = [
  {
    id: 'chinese',
    title: '國文',
    books: [
      { id: 'c1', title: '第一冊 (七上)', units: Array.from({ length: 10 }, (_, i) => ({ id: `c1-u${i+1}`, title: `第${i+1}課` })) },
      { id: 'c2', title: '第二冊 (七下)', units: Array.from({ length: 10 }, (_, i) => ({ id: `c2-u${i+1}`, title: `第${i+1}課` })) },
      { id: 'c3', title: '第三冊 (八上)', units: Array.from({ length: 10 }, (_, i) => ({ id: `c3-u${i+1}`, title: `第${i+1}課` })) },
      { id: 'c4', title: '第四冊 (八下)', units: Array.from({ length: 10 }, (_, i) => ({ id: `c4-u${i+1}`, title: `第${i+1}課` })) },
      { id: 'c5', title: '第五冊 (九上)', units: Array.from({ length: 10 }, (_, i) => ({ id: `c5-u${i+1}`, title: `第${i+1}課` })) },
      { id: 'c6', title: '第六冊 (九下)', units: Array.from({ length: 10 }, (_, i) => ({ id: `c6-u${i+1}`, title: `第${i+1}課` })) },
    ]
  },
  {
    id: 'english',
    title: '英文',
    books: [
      { id: 'e1', title: '第一冊 (七上)', units: Array.from({ length: 6 }, (_, i) => ({ id: `e1-u${i+1}`, title: `Unit ${i+1}` })).concat([{ id: 'e1-r1', title: 'Review 1' }, { id: 'e1-r2', title: 'Review 2' }, { id: 'e1-r3', title: 'Review 3' }]) },
      { id: 'e2', title: '第二冊 (七下)', units: Array.from({ length: 6 }, (_, i) => ({ id: `e2-u${i+1}`, title: `Unit ${i+1}` })).concat([{ id: 'e2-r1', title: 'Review 1' }, { id: 'e2-r2', title: 'Review 2' }, { id: 'e2-r3', title: 'Review 3' }]) },
      { id: 'e3', title: '第三冊 (八上)', units: Array.from({ length: 6 }, (_, i) => ({ id: `e3-u${i+1}`, title: `Unit ${i+1}` })).concat([{ id: 'e3-r1', title: 'Review 1' }, { id: 'e3-r2', title: 'Review 2' }, { id: 'e3-r3', title: 'Review 3' }]) },
      { id: 'e4', title: '第四冊 (八下)', units: Array.from({ length: 6 }, (_, i) => ({ id: `e4-u${i+1}`, title: `Unit ${i+1}` })).concat([{ id: 'e4-r1', title: 'Review 1' }, { id: 'e4-r2', title: 'Review 2' }, { id: 'e4-r3', title: 'Review 3' }]) },
      { id: 'e5', title: '第五冊 (九上)', units: Array.from({ length: 6 }, (_, i) => ({ id: `e5-u${i+1}`, title: `Unit ${i+1}` })).concat([{ id: 'e5-r1', title: 'Review 1' }, { id: 'e5-r2', title: 'Review 2' }, { id: 'e5-r3', title: 'Review 3' }]) },
      { id: 'e6', title: '第六冊 (九下)', units: Array.from({ length: 6 }, (_, i) => ({ id: `e6-u${i+1}`, title: `Unit ${i+1}` })).concat([{ id: 'e6-r1', title: 'Review 1' }, { id: 'e6-r2', title: 'Review 2' }, { id: 'e6-r3', title: 'Review 3' }]) },
    ]
  },
  {
    id: 'math',
    title: '數學',
    books: [
      { id: 'm1', title: '第一冊 (七上)', units: [
        { id: 'm1-u1', title: '1. 整數與數線' },
        { id: 'm1-u2', title: '2. 分數的運算' },
        { id: 'm1-u3', title: '3. 一元一次方程式' }
      ]},
      { id: 'm2', title: '第二冊 (七下)', units: [
        { id: 'm2-u1', title: '1. 二元一次聯立方程式' },
        { id: 'm2-u2', title: '2. 直角坐標與二元一次方程式的圖形' },
        { id: 'm2-u3', title: '3. 比例' },
        { id: 'm2-u4', title: '4. 一元一次不等式' },
        { id: 'm2-u5', title: '5. 統計圖表與資料分析' }
      ]},
      { id: 'm3', title: '第三冊 (八上)', units: [
        { id: 'm3-u1', title: '1. 乘法公式與多項式' },
        { id: 'm3-u2', title: '2. 平方根與畢氏定理' },
        { id: 'm3-u3', title: '3. 因式分解' },
        { id: 'm3-u4', title: '4. 一元二次方程式' }
      ]},
      { id: 'm4', title: '第四冊 (八下)', units: [
        { id: 'm4-u1', title: '1. 數列與等差級數' },
        { id: 'm4-u2', title: '2. 幾何圖形與尺規作圖' },
        { id: 'm4-u3', title: '3. 三角形的基本性質' },
        { id: 'm4-u4', title: '4. 平行與四邊形' }
      ]},
      { id: 'm5', title: '第五冊 (九上)', units: [
        { id: 'm5-u1', title: '1. 相似形' },
        { id: 'm5-u2', title: '2. 圓' },
        { id: 'm5-u3', title: '3. 外心、內心與重心' }
      ]},
      { id: 'm6', title: '第六冊 (九下)', units: [
        { id: 'm6-u1', title: '1. 二次函數' },
        { id: 'm6-u2', title: '2. 立體圖形' },
        { id: 'm6-u3', title: '3. 統計與機率' }
      ]}
    ]
  },
  {
    id: 'science',
    title: '自然 (生物/理化/地科)',
    books: [
      { id: 's1', title: '第一冊 (七上 生物)', units: [
        { id: 's1-u1', title: '1. 生命的特性' },
        { id: 's1-u2', title: '2. 生物體的構造' },
        { id: 's1-u3', title: '3. 生物體的營養' },
        { id: 's1-u4', title: '4. 生物體的運輸' },
        { id: 's1-u5', title: '5. 生物體的協調' },
        { id: 's1-u6', title: '6. 生物體的恆定' }
      ]},
      { id: 's2', title: '第二冊 (七下 生物)', units: [
        { id: 's2-u1', title: '1. 生殖' },
        { id: 's2-u2', title: '2. 遺傳' },
        { id: 's2-u3', title: '3. 演化' },
        { id: 's2-u4', title: '4. 形形色色的生物' },
        { id: 's2-u5', title: '5. 生物與環境' }
      ]},
      { id: 's3', title: '第三冊 (八上 理化)', units: [
        { id: 's3-u1', title: '1. 基本測量' },
        { id: 's3-u2', title: '2. 物質的世界' },
        { id: 's3-u3', title: '3. 波動與聲音' },
        { id: 's3-u4', title: '4. 光' },
        { id: 's3-u5', title: '5. 溫度與熱' },
        { id: 's3-u6', title: '6. 物質的結構與元素' }
      ]},
      { id: 's4', title: '第四冊 (八下 理化)', units: [
        { id: 's4-u1', title: '1. 化學反應' },
        { id: 's4-u2', title: '2. 氧化與還原' },
        { id: 's4-u3', title: '3. 酸鹼鹽' },
        { id: 's4-u4', title: '4. 反應速率與平衡' },
        { id: 's4-u5', title: '5. 有機化合物' },
        { id: 's4-u6', title: '6. 力與壓力' }
      ]},
      { id: 's5', title: '第五冊 (九上 理化+地科)', units: [
        { id: 's5-u1', title: '理化 1. 直線運動' },
        { id: 's5-u2', title: '理化 2. 力與運動' },
        { id: 's5-u3', title: '理化 3. 功與能' },
        { id: 's5-u4', title: '理化 4. 基本電學' },
        { id: 's5-u5', title: '地科 1. 探索地球' },
        { id: 's5-u6', title: '地科 2. 變動的地球' },
        { id: 's5-u7', title: '地科 3. 浩瀚的宇宙' }
      ]},
      { id: 's6', title: '第六冊 (九下 理化+地科)', units: [
        { id: 's6-u1', title: '理化 1. 電流的熱效應與化學效應' },
        { id: 's6-u2', title: '理化 2. 電與磁' },
        { id: 's6-u3', title: '地科 1. 多變的天氣' },
        { id: 's6-u4', title: '地科 2. 氣候變遷與永續發展' }
      ]}
    ]
  },
  {
    id: 'social',
    title: '社會 (歷史/地理/公民)',
    books: [
      { id: 'so1', title: '第一冊 (七上 台灣)', units: [
        { id: 'so1-h1', title: '歷史 1. 史前文化與原住民族' },
        { id: 'so1-h2', title: '歷史 2. 大航海時代與鄭氏時期' },
        { id: 'so1-h3', title: '歷史 3. 清帝國統治時期' },
        { id: 'so1-g1', title: '地理 1. 台灣的位置與地形' },
        { id: 'so1-g2', title: '地理 2. 台灣的氣候與水文' },
        { id: 'so1-c1', title: '公民 1. 個人與社會' },
        { id: 'so1-c2', title: '公民 2. 家庭與社會參與' }
      ]},
      { id: 'so2', title: '第二冊 (七下 台灣)', units: [
        { id: 'so2-h1', title: '歷史 1. 日本統治時期' },
        { id: 'so2-h2', title: '歷史 2. 戰後台灣' },
        { id: 'so2-g1', title: '地理 1. 台灣的人口與產業' },
        { id: 'so2-g2', title: '地理 2. 台灣的聚落與區域發展' },
        { id: 'so2-c1', title: '公民 1. 國家與政府' },
        { id: 'so2-c2', title: '公民 2. 民主政治' }
      ]},
      { id: 'so3', title: '第三冊 (八上 中國)', units: [
        { id: 'so3-h1', title: '歷史 1. 商周至隋唐' },
        { id: 'so3-h2', title: '歷史 2. 宋元至明清' },
        { id: 'so3-g1', title: '地理 1. 中國的自然環境' },
        { id: 'so3-g2', title: '地理 2. 中國的人文環境' },
        { id: 'so3-c1', title: '公民 1. 法律基本概念' },
        { id: 'so3-c2', title: '公民 2. 人民權利與義務' }
      ]},
      { id: 'so4', title: '第四冊 (八下 亞洲)', units: [
        { id: 'so4-h1', title: '歷史 1. 晚清變局' },
        { id: 'so4-h2', title: '歷史 2. 中華民國與現代中國' },
        { id: 'so4-g1', title: '地理 1. 東北亞與東南亞' },
        { id: 'so4-g2', title: '地理 2. 南亞與西亞' },
        { id: 'so4-c1', title: '公民 1. 民法與刑法' },
        { id: 'so4-c2', title: '公民 2. 行政法與權利救濟' }
      ]},
      { id: 'so5', title: '第五冊 (九上 世界)', units: [
        { id: 'so5-h1', title: '歷史 1. 古代文明' },
        { id: 'so5-h2', title: '歷史 2. 近代歐洲的興起' },
        { id: 'so5-g1', title: '地理 1. 歐洲與美洲' },
        { id: 'so5-g2', title: '地理 2. 非洲與大洋洲' },
        { id: 'so5-c1', title: '公民 1. 經濟學基本概念' },
        { id: 'so5-c2', title: '公民 2. 市場與貨幣' }
      ]},
      { id: 'so6', title: '第六冊 (九下 全球)', units: [
        { id: 'so6-h1', title: '歷史 1. 兩次世界大戰' },
        { id: 'so6-h2', title: '歷史 2. 冷戰與現代世界' },
        { id: 'so6-g1', title: '地理 1. 全球氣候與環境議題' },
        { id: 'so6-g2', title: '地理 2. 國際經貿與區域發展' },
        { id: 'so6-c1', title: '公民 1. 全球化與國際社會' },
        { id: 'so6-c2', title: '公民 2. 科技與媒體' }
      ]}
    ]
  }
];

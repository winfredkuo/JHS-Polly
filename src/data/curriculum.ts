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
      { id: 'c1', title: '第一冊 (七上)', units: [
        { id: 'c1-u1', title: '第一課 夏夜' },
        { id: 'c1-u2', title: '第二課 無心的錯誤' },
        { id: 'c1-u3', title: '第三課 母親的教誨' },
        { id: 'c1-u4', title: '語文常識(一) 標點符號使用法' },
        { id: 'c1-u5', title: '第四課 論語選' },
        { id: 'c1-u6', title: '第五課 背影' },
        { id: 'c1-u7', title: '第六課 心四' },
        { id: 'c1-u8', title: '語文常識(二) 閱讀導航 策略運用與資訊檢索' },
        { id: 'c1-u9', title: '第七課 兒時記趣' },
        { id: 'c1-u10', title: '第八課 朋友相交' },
        { id: 'c1-u11', title: '第九課 音樂家與職籃巨星' },
        { id: 'c1-u12', title: '閲讀樂園・第十課 玫瑰涙' },
        { id: 'c1-u13', title: '自學選文一 穿越時空讀故事，古代神話與寓言選' },
        { id: 'c1-u14', title: '自學選文二 貪睡的長頸鹿' },
        { id: 'c1-u15', title: '自學選文三 行動的水滴才能匯流大河' }
      ] },
      { id: 'c2', title: '第二冊 (七下)', units: [
        { id: 'c2-u1', title: '第一課 聲音鐘' },
        { id: 'c2-u2', title: '第二課 孩子的鐘塔' },
        { id: 'c2-u3', title: '第三課 紙船印象' },
        { id: 'c2-u4', title: '語文常識(一) 漢字的結構' },
        { id: 'c2-u5', title: '第四課 小詩選' },
        { id: 'c2-u6', title: '第五課 近體詩選' },
        { id: 'c2-u7', title: '第六課 石虎是我們的龍貓' },
        { id: 'c2-u8', title: '語文常識(二) 漢字的流變與書法欣賞' },
        { id: 'c2-u9', title: '第七課 五柳先生傳' },
        { id: 'c2-u10', title: '第八課 摩登土産鳳梨酥' },
        { id: 'c2-u11', title: '第九課 謝天' },
        { id: 'c2-u12', title: '閱讀樂園·第十課 貓的天堂' },
        { id: 'c2-u13', title: '自學選文一 搜神抓鬼趣——六朝志怪小說選' },
        { id: 'c2-u14', title: '自學選文二 放天燈是傳統,還是為山林製造更多垃圾?' },
        { id: 'c2-u15', title: '自學選文三 越南安妮:新移民的歌仔戲人生' }
      ] },
      { id: 'c3', title: '第三冊 (八上)', units: [
        { id: 'c3-u1', title: '第一課 田園之秋選' },
        { id: 'c3-u2', title: '第二課 古詩選' },
        { id: 'c3-u3', title: '第三課 下雨天,真好' },
        { id: 'c3-u4', title: '語文常識(一) 語法(上)詞類' },
        { id: 'c3-u5', title: '第四課 愛蓮説' },
        { id: 'c3-u6', title: '第五課 生命中的碎珠' },
        { id: 'c3-u7', title: '第六課 鳥' },
        { id: 'c3-u8', title: '語文常識(二) 語法(下)句子' },
        { id: 'c3-u9', title: '第七課 張釋之執法' },
        { id: 'c3-u10', title: '第八課 找尋失落的水源' },
        { id: 'c3-u11', title: '第九課 一棵開花的樹' },
        { id: 'c3-u12', title: '閱讀樂園·第十課 畫的哀傷' },
        { id: 'c3-u13', title: '自學選文一 六朝名士畫廊世説新語選' },
        { id: 'c3-u14', title: '自學選文二 一團人生' },
        { id: 'c3-u15', title: '自學選文三 安藤忠雄:孤獨,也要讓夢想開花' }
      ] },
      { id: 'c4', title: '第四冊 (八下)', units: Array.from({ length: 10 }, (_, i) => ({ id: `c4-u${i+1}`, title: `第${i+1}課` })) },
      { id: 'c5', title: '第五冊 (九上)', units: Array.from({ length: 10 }, (_, i) => ({ id: `c5-u${i+1}`, title: `第${i+1}課` })) },
      { id: 'c6', title: '第六冊 (九下)', units: Array.from({ length: 10 }, (_, i) => ({ id: `c6-u${i+1}`, title: `第${i+1}課` })) },
    ]
  },
  {
    id: 'english',
    title: '英文',
    books: [
      { id: 'e1', title: '第一冊 (七上)', units: [
        { id: 'e1-u1', title: "Lesson 1 What's This?" },
        { id: 'e1-u2', title: 'Lesson 2 Where Is Annie From?' },
        { id: 'e1-u3', title: 'Lesson 3 Please Bring Your Favorite Dish' },
        { id: 'e1-r1', title: 'Review 1' },
        { id: 'e1-u4', title: 'Lesson 4 There Are Some Animals in the Game' },
        { id: 'e1-u5', title: 'Lesson 5 My Friend Is Showing Me Around' },
        { id: 'e1-u6', title: 'Lesson 6 We Can Save the Earth' },
        { id: 'e1-r2', title: 'Review 2' },
        { id: 'e1-r3', title: 'Review 3' }
      ] },
      { id: 'e2', title: '第二冊 (七下)', units: [
        { id: 'e2-u1', title: 'Lesson 1 What Do We Have for Lunch Today?' },
        { id: 'e2-u2', title: 'Lesson 2 The Hotel Opens Only in Winter' },
        { id: 'e2-u3', title: 'Lesson 3 How Do You Celebrate the New Year?' },
        { id: 'e2-r1', title: 'Review 1' },
        { id: 'e2-u4', title: 'Lesson 4 How Much Paper Do We Need?' },
        { id: 'e2-u5', title: 'Lesson 5 Athletes Never Give Up' },
        { id: 'e2-u6', title: 'Lesson 6 How Do You Go to School?' },
        { id: 'e2-r2', title: 'Review 2' },
        { id: 'e2-r3', title: 'Review 3' }
      ] },
      { id: 'e3', title: '第三冊 (八上)', units: [
        { id: 'e3-u1', title: 'Lesson 1 We Visited Our Relatives Yesterday' },
        { id: 'e3-u2', title: 'Lesson 2 I Read a Special Book Last Week' },
        { id: 'e3-u3', title: 'Lesson 3 All Animals Were Going to the Party' },
        { id: 'e3-r1', title: 'Review 1' },
        { id: 'e3-u4', title: 'Lesson 4 I Want to Take a Working Holiday' },
        { id: 'e3-u5', title: 'Lesson 5 Spending Time in Taiwan Is a Wonderful Experience' },
        { id: 'e3-u6', title: 'Lesson 6 The Power Of Al Will Shape The Future' },
        { id: 'e3-r2', title: 'Review 2' },
        { id: 'e3-r3', title: 'Review 3' }
      ] },
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
        { id: 'm1-u1', title: '1-1 正數與負數' },
        { id: 'm1-u2', title: '1-2 正負數的加減' },
        { id: 'm1-u3', title: '1-3 正負數的乘除' },
        { id: 'm1-u4', title: '1-4 指數記法與科學記號' },
        { id: 'm1-u5', title: '2-1 質因數分解' },
        { id: 'm1-u6', title: '2-2 最大公因數與最小公倍數' },
        { id: 'm1-u7', title: '2-3 分數的四則運算' },
        { id: 'm1-u8', title: '2-4 指數律' },
        { id: 'm1-u9', title: '3-1 式子的運算' },
        { id: 'm1-u10', title: '3-2 解一元一次方程式' },
        { id: 'm1-u11', title: '3-3 應用問題' }
      ]},
      { id: 'm2', title: '第二冊 (七下)', units: [
        { id: 'm2-u1', title: '1-1 二元一次方程式' },
        { id: 'm2-u2', title: '1-2 解二元一次聯立方程式' },
        { id: 'm2-u3', title: '1-3 應用問題' },
        { id: 'm2-u4', title: '2-1 直角坐標平面' },
        { id: 'm2-u5', title: '2-2 二元一次方程式的圖形' },
        { id: 'm2-u6', title: '3-1 比例式' },
        { id: 'm2-u7', title: '3-2 正比與反比' },
        { id: 'm2-u8', title: '4-1 一元一次不等式的解及圖示' },
        { id: 'm2-u9', title: '4-2 解一元一次不等式及其應用' },
        { id: 'm2-u10', title: '5 統計圖表與統計數據' },
        { id: 'm2-u11', title: '6 線對稱與三視圖' }
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
    title: '自然科學',
    books: [
      {
        id: 's1',
        title: '第一冊 (七上 生物)',
        units: [
          { id: 's1-u0', title: '緒論' },
          { id: 's1-u1', title: '第1章 生命的特性' },
          { id: 's1-u2', title: '跨科主題 世界的各種大小樣貌' },
          { id: 's1-u3', title: '第2章 養分' },
          { id: 's1-u4', title: '第3章 生物的運輸與防禦' },
          { id: 's1-u5', title: '第4章 生物的協調作用' },
          { id: 's1-u6', title: '第5章 生物的恆定性' }
        ]
      },
      {
        id: 's2',
        title: '第二冊 (七下 生物)',
        units: [
          { id: 's2-u1', title: '第1章 生殖' },
          { id: 's2-u2', title: '第2章 遺傳' },
          { id: 's2-u3', title: '第3章 地球上的生物' },
          { id: 's2-u4', title: '第4章 生態系' },
          { id: 's2-u5', title: '第5章 人類與環境' },
          { id: 's2-u6', title: '跨科主題 人、植物與環境的共存關係' }
        ]
      },
      { id: 's3', title: '第三冊 (八上 理化)', units: [
        { id: 's3-u1', title: '第1章：基本測量' },
        { id: 's3-u2', title: '第2章：物質的世界' },
        { id: 's3-u3', title: '第3章：波動與聲音' },
        { id: 's3-u4', title: '第4章：光、影像與顏色' },
        { id: 's3-u5', title: '第5章：溫度與熱' },
        { id: 's3-u6', title: '第6章：物質的基本結構' },
        { id: 's3-u7', title: '跨科主題 太陽-地球的生命之光' },
        { id: 's3-u8', title: '聯合國17項永續發展目標' }
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
    id: 'history',
    title: '歷史',
    books: [
      { id: 'h1', title: '第一冊 七上', units: [
        { id: 'so1-h0', title: '導言 歷史的基礎' },
        { id: 'so1-h1', title: '第1章 史前台灣與原住民文化' },
        { id: 'so1-h2', title: '第2章 大航海時代' },
        { id: 'so1-h3', title: '第3章 大航海時代臺灣原住民與外來者' },
        { id: 'so1-h4', title: '第4章 清帝國統治政策的變遷' },
        { id: 'so1-h5', title: '第5章 清帝國時期農商業的發展' },
        { id: 'so1-h6', title: '第6章 清帝國時期社會文化的變遷' }
      ]},
      { id: 'h2', title: '第二冊 七下', units: [
        { id: 'so2-h1', title: '第1章 日治時期的政治' },
        { id: 'so2-h2', title: '第2章 日治時期的經濟' }
      ]},
      { id: 'h3', title: '第三冊 八上', units: [
        { id: 'so3-h1', title: '第1章 商周至隋唐：國家與社會的千年變革' },
        { id: 'so3-h2', title: '第2章 商周至隋唐：民族文化' },
        { id: 'so3-h3', title: '第3章 宋元多民族並立的時期' },
        { id: 'so3-h4', title: '第4章 明清時期東亞世界的變動' },
        { id: 'so3-h5', title: '第5章 西力衝擊下的東亞世界' },
        { id: 'so3-h6', title: '第6章 晚清社會文化的調適與變遷' }
      ]},
      { id: 'h4', title: '第四冊 八下', units: [
        { id: 'so4-h1', title: '第1章 中華民國的建立' },
        { id: 'so4-h2', title: '第2章 舊傳統與新思潮' }
      ]},
      { id: 'h5', title: '第五冊 九上', units: [
        { id: 'so5-h1', title: '第1章 古代文明的誕生' },
        { id: 'so5-h2', title: '第2章 古希臘羅馬文化' },
        { id: 'so5-h3', title: '第3章 普世宗教的發展' },
        { id: 'so5-h4', title: '第4章 近代歐洲的興起' },
        { id: 'so5-h5', title: '第5章 多元世界的互動' },
        { id: 'so5-h6', title: '第6章 近代歐洲的變革' }
      ]},
      { id: 'h6', title: '第六冊 九下', units: [
        { id: 'so6-h1', title: '歷史 1. 兩次世界大戰' },
        { id: 'so6-h2', title: '歷史 2. 冷戰與現代世界' }
      ]}
    ]
  },
  {
    id: 'geography',
    title: '地理',
    books: [
      { id: 'g1', title: '第一冊 七上', units: [
        { id: 'so1-g1', title: '第1章 認識位置與地圖' },
        { id: 'so1-g2', title: '第2章 世界中的臺灣' },
        { id: 'so1-g3', title: '第3章 台灣地形' },
        { id: 'so1-g4', title: '第4章 台灣海岸與島嶼' },
        { id: 'so1-g5', title: '第5章 台灣天氣與氣候' },
        { id: 'so1-g6', title: '第6章 台灣水文' }
      ]},
      { id: 'g2', title: '第二冊 七下', units: [
        { id: 'so2-g1', title: '第1章 人口成長與分布' },
        { id: 'so2-g2', title: '第2章 人口組成與族群文化' }
      ]},
      { id: 'g3', title: '第三冊 八上', units: [
        { id: 'so3-g1', title: '第1章 中國的自然環境' },
        { id: 'so3-g2', title: '第2章 中國的人口' },
        { id: 'so3-g3', title: '第3章 中國的產業轉型與區域差異' },
        { id: 'so3-g4', title: '第4章 全球化下的中國' },
        { id: 'so3-g5', title: '第5章 東北亞的自然環境與文化' },
        { id: 'so3-g6', title: '第6章 東北亞的經濟發展與挑戰' }
      ]},
      { id: 'g4', title: '第四冊 八下', units: [
        { id: 'so4-g0', title: '前導 翰林 全球氣候漫談' },
        { id: 'so4-g1', title: '第1章 翰林 東南亞' },
        { id: 'so4-g2', title: '第2章 翰林 南亞' },
        { id: 'so4-g3', title: '第3章 西亞與北非的自然環境與文化' },
        { id: 'so4-g4', title: '第4章 西亞與北非的衝突與經濟發展' },
        { id: 'so4-g5', title: '第5章 翰林 漠南非洲自然環境與文化' },
        { id: 'so4-g6', title: '第6章 翰林 漠南非洲的產業與經濟發展' }
      ]},
      { id: 'g5', title: '第五冊 九上', units: [
        { id: 'so5-g1', title: '第1章 歐洲與俄羅斯的自然環境' },
        { id: 'so5-g2', title: '第2章 歐洲與俄羅斯的產業與文化' },
        { id: 'so5-g3', title: '第3章 北美洲' },
        { id: 'so5-g4', title: '第4章 中南美洲' },
        { id: 'so5-g5', title: '第5章 大洋洲' },
        { id: 'so5-g6', title: '第6章 兩極地區與全球氣候變遷' }
      ]},
      { id: 'g6', title: '第六冊 九下', units: [
        { id: 'so6-g1', title: '地理 1. 全球氣候與環境議題' },
        { id: 'so6-g2', title: '地理 2. 國際經貿與區域發展' }
      ]}
    ]
  },
  {
    id: 'civics',
    title: '公民',
    books: [
      { id: 'v1', title: '第一冊 七上', units: [
        { id: 'so1-c1', title: '第1章 公民與公民德性' },
        { id: 'so1-c2', title: '第2章 人性尊嚴與人權保障' },
        { id: 'so1-c3', title: '第3章 家庭生活' },
        { id: 'so1-c4', title: '第4章 平權家庭' },
        { id: 'so1-c5', title: '第5章 學生權利與校園生活' },
        { id: 'so1-c6', title: '第6章 部落與公民參與' }
      ]},
      { id: 'v2', title: '第二冊 七下', units: [
        { id: 'so2-c1', title: '第1章 多元文化' },
        { id: 'so2-c2', title: '第2章 社會規範' }
      ]},
      { id: 'v3', title: '第三冊 八上', units: [
        { id: 'so3-c1', title: '第1章 國家與民主治理' },
        { id: 'so3-c2', title: '第2章 法治社會' },
        { id: 'so3-c3', title: '第3章 權利保障與權力分立' },
        { id: 'so3-c4', title: '第4章 中央政府' },
        { id: 'so3-c5', title: '第5章 地方政府' },
        { id: 'so3-c6', title: '第6章 政治參與' }
      ]},
      { id: 'v4', title: '第四冊 八下', units: [
        { id: 'so4-c1', title: '第1章 生活中的契約' },
        { id: 'so4-c2', title: '第2章 民事糾紛的解決' }
      ]},
      { id: 'v5', title: '第五冊 九上', units: [
        { id: 'so5-c1', title: '第1章 生活中的選擇' },
        { id: 'so5-c2', title: '第2章 價格與資源分配' },
        { id: 'so5-c3', title: '第3章 日常生活的交易' },
        { id: 'so5-c4', title: '第4章 市場競爭' },
        { id: 'so5-c5', title: '第5章 貨幣的使用' },
        { id: 'so5-c6', title: '第6章 社會中的勞動參與' }
      ]},
      { id: 'v6', title: '第六冊 九下', units: [
        { id: 'so6-c1', title: '公民 1. 全球化與國際社會' },
        { id: 'so6-c2', title: '公民 2. 科技與媒體' }
      ]}
    ]
  }

];

export interface Vocab {
  id: string;
  word: string;
  meaning: string;
  type: 'common' | 'hard';
  category: 'word' | 'phrase';
}

const cw = [
  ['account', '帳戶；說明；解釋'], ['balance', '平衡；餘額；結算'], ['capital', '首都；資本；大寫字母'], ['charge', '收費；充電；控告'], ['degree', '程度；度數；學位'],
  ['express', '表達；快遞；明確的'], ['figure', '數字；人物；身材'], ['general', '一般的；將軍；大體的'], ['handle', '處理；把手；操縱'], ['issue', '議題；發行；期號'],
  ['match', '比賽；火柴；相配'], ['object', '物體；目標；反對'], ['plant', '植物；工廠；種植'], ['present', '目前的；禮物；呈現'], ['raise', '舉起；提高；撫養'],
  ['sense', '感覺；理智；意義'], ['state', '狀態；國家；陳述'], ['term', '術語；學期；條件'], ['train', '火車；訓練；行列'], ['volume', '音量；體積；冊'],
  ['board', '木板；董事會；登機'], ['character', '性格；角色；字元'], ['custom', '習俗；海關；光顧'], ['duty', '責任；職務；關稅'], ['firm', '堅固的；公司；堅定'],
  ['interest', '興趣；利息；利益'], ['mine', '我的；礦坑；地雷'], ['patient', '有耐心的；病人；受詞'], ['project', '計畫；投影；投射'], ['subject', '主題；科目；受試者'],
  ['apply', '申請；應用；塗抹'], ['assume', '假設；承擔；假裝'], ['attach', '附加；繫上；依戀'], ['available', '可用的；有空的；可取得的'], ['average', '平均；普通的；海損'],
  ['benefit', '利益；好處；受惠'], ['border', '邊界；鑲邊；接壤'], ['branch', '樹枝；分公司；分支'], ['burst', '爆裂；爆發；突發'], ['calculate', '計算；估計；打算'],
  ['cancel', '取消；刪除；抵銷'], ['capture', '捕捉；俘虜；引起'], ['cause', '原因；造成；事業'], ['central', '中央的；主要的；核心的'], ['challenge', '挑戰；質疑；盤問'],
  ['claim', '要求；聲稱；索賠'], ['classic', '經典的；古典的；名著'], ['coast', '海岸；滑行；沿岸航行'], ['command', '命令；指揮；掌握'], ['comment', '評論；意見；註釋'],
  ['commercial', '商業的；廣告；營利的'], ['commit', '犯罪；承諾；委託'], ['common', '共同的；普通的；常見的'], ['compare', '比較；匹敵；比喻'], ['compete', '競爭；比賽；對抗'],
  ['complain', '抱怨；控訴；發牢騷'], ['complete', '完成；完整的；徹底的'], ['complex', '複雜的；綜合體；情結'], ['concern', '關心；涉及；企業'], ['conclude', '得出結論；結束；締結'],
  ['condition', '條件；狀況；疾病'], ['conduct', '行為；引導；傳導'], ['confirm', '確認；證實；批准'], ['conflict', '衝突；抵觸；戰鬥'], ['connect', '連接；聯想；接通'],
  ['consider', '考慮；認為；體諒'], ['consist', '組成；在於；一致'], ['contact', '接觸；聯繫；熟人'], ['contain', '包含；容納；控制'], ['contract', '合約；收縮；感染'],
  ['contrast', '對比；差異；對照'], ['control', '控制；管理；對照組'], ['count', '計算；重要；伯爵'], ['course', '課程；路線；一道菜'], ['court', '法院；球場；追求'],
  ['cover', '覆蓋；掩護；報導'], ['create', '創造；引起；造成'], ['credit', '信用；學分；功勞'], ['cross', '交叉；越過；十字架'], ['crowd', '人群；擁擠；群眾'],
  ['current', '目前的；水流；電流'], ['damage', '損害；賠償金；破壞'], ['deal', '交易；處理；發牌'], ['debate', '辯論；討論；爭論'], ['decide', '決定；判決；解決'],
  ['declare', '宣佈；申報；聲明'], ['decline', '下降；婉拒；衰退'], ['deep', '深的；深奧的；強烈的'], ['defeat', '擊敗；失敗；挫折'], ['defend', '防禦；辯護；保衛'],
  ['delay', '延遲；耽擱；延誤'], ['deliver', '遞送；發表；接生'], ['demand', '要求；需求；查問'], ['deny', '否認；拒絕給予；剝奪'], ['depend', '依賴；取決於；相信'],
  ['describe', '描述；形容；畫出'], ['design', '設計；計畫；圖案'], ['desire', '渴望；慾望；要求'], ['detail', '細節；詳述；派遣'], ['detect', '偵測；察覺；發現'],
  ['develop', '發展；沖洗(底片)；患病'], ['difference', '差別；分歧；差額'], ['direct', '直接的；導演；指引'], ['discover', '發現；發覺；找到'], ['discuss', '討論；商量；論述'],
  ['disease', '疾病；弊病；病害'], ['display', '展示；顯示；炫耀'], ['distance', '距離；疏遠；遠處'], ['divide', '劃分；除以；分歧'], ['doubt', '懷疑；疑問；不確定'],
  ['draw', '畫；拉；吸引'], ['drive', '駕駛；驅使；磁碟機'], ['drop', '掉落；滴；放棄'], ['edge', '邊緣；優勢；刀口'], ['effect', '效果；影響；實現'],
  ['effort', '努力；成就；精力'], ['either', '兩者之一；也(不)；任一'], ['empty', '空的；倒空；無意義的'], ['encourage', '鼓勵；促進；支持'], ['energy', '能量；精力；活力'],
  ['engine', '引擎；動機；火車頭'], ['enjoy', '享受；喜愛；享有'], ['enough', '足夠的；充分地；受夠了'], ['enter', '進入；參加；輸入'], ['entire', '整個的；完全的；全部的'],
  ['equal', '平等的；等於；匹敵'], ['escape', '逃跑；漏出；被忘記'], ['especially', '特別地；尤其；格外'], ['establish', '建立；證實；制定'], ['even', '甚至；平的；偶數的'],
];

const cp = [
  ['bring up', '撫養長大；提出(話題)；嘔吐'], ['call off', '取消；叫走；轉移(注意力)'], ['come up with', '想出(點子)；提供；準備好'], ['get over', '克服；從...中恢復；熬過'], ['look forward to', '期待；盼望；預期'],
  ['make up', '組成；化妝；捏造(藉口)'], ['put off', '延期；拖延；讓人反感'], ['set up', '建立；安排；陷害'], ['take off', '起飛；脫下；大受歡迎'], ['turn out', '結果是；出席；生產'],
  ['break down', '故障；崩潰；分解'], ['carry out', '執行；完成；實現'], ['give up', '放棄；戒除；投降'], ['hold on', '等一下；堅持；緊握'], ['work out', '解決；健身；結果是'],
  ['account for', '說明；佔(比例)；對...負責'], ['back up', '支持；倒車；備份'], ['break out', '爆發；逃脫；長出(疹子)'], ['bring about', '導致；引起；造成'], ['call for', '需要；呼籲；去接(人)'],
  ['catch up', '趕上；敘舊；了解近況'], ['come across', '偶然遇見；被理解；給人...印象'], ['cut down', '減少；砍倒；殺死'], ['drop by', '順道拜訪；短暫停留；探望'], ['fall behind', '落後；拖欠；跟不上'],
  ['figure out', '想出；理解；計算出'], ['fill in', '填寫；代替；提供詳情'], ['get along', '相處融洽；進展；離開'], ['give in', '屈服；讓步；交出'], ['go over', '複習；仔細檢查；受歡迎'],
  ['hand in', '繳交；提出；遞交'], ['keep up', '保持；繼續；熬夜'], ['lay off', '解僱；停止；放棄'], ['leave out', '遺漏；省略；排除'], ['look into', '調查；研究；觀察'],
  ['make out', '辨認出；理解；進展'], ['pass away', '過世；消失；度過'], ['pick up', '撿起；接送；學會'], ['point out', '指出；提出；指明'], ['put up with', '忍受；容忍；包容'],
  ['run into', '偶遇；撞上；遭遇(困難)'], ['show off', '炫耀；賣弄；使顯眼'], ['stand for', '代表；象徵；容忍'], ['take over', '接管；接替；佔領'], ['turn down', '拒絕；調低；向下折'],
  ['wear out', '穿破；使疲憊；耗盡'], ['wipe out', '徹底摧毀；擦去；使疲憊'], ['wrap up', '包裝；結束；穿暖和'], ['yield to', '屈服於；讓路給；被...取代'], ['zoom in', '放大；拉近鏡頭；聚焦'],
  ['act on', '對...起作用；奉行；根據...行動'], ['add up', '加起來；合理；說得通'], ['back down', '退讓；認輸；放棄要求'], ['blow up', '爆炸；發脾氣；放大(照片)'], ['break in', '闖入；打斷；馴服'],
  ['bring down', '擊敗；降低；使倒下'], ['call on', '拜訪；呼籲；點名'], ['catch on', '流行起來；理解；明白'], ['check out', '結帳離開；檢查；借出'], ['come down with', '染上(疾病)；病倒；患病'],
];

const hw = [
  ['abstract', '抽象的；摘要；提取'], ['commit', '承諾；犯(罪)；委託'], ['draft', '草稿；徵兵；匯票'], ['engage', '訂婚；從事；吸引'], ['facility', '設施；才能；便利'],
  ['grant', '同意；給予；補助金'], ['host', '主人；主辦；主機'], ['incorporate', '包含；合併；組成公司'], ['justify', '證明...有理；為...辯護；對齊'], ['launch', '發射；發起；產品上市'],
  ['maintain', '維持；保養；堅稱'], ['novel', '小說；新奇的；異常的'], ['observe', '觀察；遵守；慶祝'], ['panel', '儀表板；專家小組；鑲板'], ['quote', '引用；報價；引號'],
  ['reserve', '保留；預訂；保護區'], ['scale', '規模；刻度；鱗片'], ['trace', '追蹤；痕跡；微量'], ['uniform', '制服；統一的；相同的'], ['yield', '產量；屈服；讓路'],
  ['abandon', '放棄；拋棄；放縱'], ['absolute', '絕對的；完全的；專制的'], ['absorb', '吸收；理解；使全神貫注'], ['abuse', '濫用；虐待；辱罵'], ['academic', '學術的；學院的；不切實際的'],
  ['acceptable', '可接受的；令人滿意的；合適的'], ['accompany', '陪伴；伴隨；伴奏'], ['accomplish', '完成；實現；達到'], ['accurate', '準確的；精確的；正確無誤的'], ['accuse', '指控；控告；譴責'],
  ['achieve', '達成；實現；獲得'], ['acknowledge', '承認；答謝；確認收悉'], ['acquire', '取得；獲得；學到'], ['adapt', '適應；改編；改造'], ['adequate', '足夠的；適當的；勝任的'],
  ['adjust', '調整；適應；校準'], ['administer', '管理；執行；給予(藥物)'], ['adopt', '採用；收養；正式通過'], ['advance', '前進；進步；預付'], ['advantage', '優勢；利益；有利條件'],
  ['advocate', '提倡；擁護者；辯護律師'], ['affect', '影響；感動；假裝'], ['agency', '代理機構；仲介；作用'], ['aggressive', '具攻擊性的；積極的；侵略的'], ['allocate', '分配；分派；撥出'],
  ['alter', '改變；修改；閹割'], ['alternative', '替代的；二選一；非主流的'], ['ambiguous', '模稜兩可的；含糊不清的；引起歧義的'], ['analyze', '分析；解析；化驗'], ['anticipate', '預期；期待；先發制人'],
  ['apparent', '明顯的；表面的；顯而易見的'], ['appeal', '呼籲；吸引力；上訴'], ['apply', '申請；應用；塗抹'], ['approach', '接近；方法；途徑'], ['appropriate', '適當的；撥款；盜用'],
  ['approve', '批准；贊成；同意'], ['arise', '發生；出現；產生'], ['artificial', '人造的；虛偽的；武斷的'], ['aspect', '方面；外觀；方位'], ['assess', '評估；估價；徵收'],
  ['assign', '分配；指派；指定'], ['assist', '協助；幫助；助攻'], ['associate', '聯想；結交；副的'], ['assume', '假設；承擔；假裝'], ['assure', '保證；確信；弄清楚'],
  ['attach', '附加；繫上；依戀'], ['attain', '達到；獲得；實現'], ['attempt', '嘗試；企圖；攻擊'], ['attend', '出席；照顧；專心'], ['attitude', '態度；姿勢；看法'],
  ['attract', '吸引；引起；誘惑'], ['attribute', '歸因於；屬性；特質'], ['author', '作者；創始人；寫作'], ['authority', '權威；當局；授權'], ['available', '可用的；有空的；可取得的'],
  ['average', '平均；普通的；海損'], ['avoid', '避免；躲開；撤銷'], ['award', '獎品；授予；裁決'], ['aware', '意識到的；知道的；發覺的'], ['balance', '平衡；餘額；結算'],
  ['bare', '裸露的；勉強的；揭露'], ['barrier', '障礙；柵欄；屏障'], ['base', '基礎；基地；卑鄙的'], ['bear', '忍受；生育；熊'], ['beat', '擊敗；敲打；節拍'],
];

const hp = [
  ['boil down to', '歸結為；主要原因是；濃縮成'], ['fall short of', '達不到；缺乏；不符合(期望)'], ['make up for', '補償；彌補；挽回'], ['take for granted', '視為理所當然；認為...是必然的；不把...當回事'], ['come to terms with', '妥協；接受(殘酷現實)；達成協議'],
  ['give rise to', '引起；導致；使發生'], ['lose track of', '失去聯繫；忘記(時間/進度)；跟不上'], ['pay off', '還清(債務)；取得成功；賄賂'], ['rule out', '排除；取消...的可能性；拒絕考慮'], ['stand in for', '代理；代替；替補'],
  ['abide by', '遵守；信守；承擔後果'], ['account for', '說明；佔(比例)；對...負責'], ['act up', '調皮搗蛋；(機器)運轉不正常；發作'], ['add up to', '總計達；意味著；結果是'], ['allow for', '考慮到；顧及；為...留出餘地'],
  ['answer for', '對...負責；保證；因...受罰'], ['back out', '食言；退出；打退堂鼓'], ['bear out', '證實；支持；證明'], ['blow over', '平息；被遺忘；消散'], ['break away', '脫離；逃脫；決裂'],
  ['bring forward', '提出；提前；結轉'], ['brush up on', '溫習；複習；改進'], ['build up', '建立；增強；逐漸積累'], ['burn out', '燒毀；精疲力竭；燃盡'], ['call off', '取消；叫走；轉移(注意力)'],
  ['carry away', '使激動；帶走；沖走'], ['catch on', '流行起來；理解；明白'], ['clear up', '放晴；澄清；整理'], ['come about', '發生；產生；改變方向'], ['come down to', '歸結為；實質上是；傳下來'],
];

export const commonVocab: Vocab[] = [
  ...cw.map((item, i) => ({ id: `cw${i}`, word: item[0], meaning: item[1], type: 'common' as const, category: 'word' as const })),
  ...cp.map((item, i) => ({ id: `cp${i}`, word: item[0], meaning: item[1], type: 'common' as const, category: 'phrase' as const })),
];

export const hardVocab: Vocab[] = [
  ...hw.map((item, i) => ({ id: `hw${i}`, word: item[0], meaning: item[1], type: 'hard' as const, category: 'word' as const })),
  ...hp.map((item, i) => ({ id: `hp${i}`, word: item[0], meaning: item[1], type: 'hard' as const, category: 'phrase' as const })),
];

export function getDailyVocab(dateStr: string): Vocab[] {
  // Use a fixed epoch to calculate days passed, ensuring sequential progression
  const epoch = new Date('2026-03-01').getTime();
  const current = new Date(dateStr).getTime();
  const daysSince = Math.floor((current - epoch) / (1000 * 60 * 60 * 24));
  const index = Math.abs(daysSince);

  const commonWords = commonVocab.filter(v => v.category === 'word');
  const commonPhrases = commonVocab.filter(v => v.category === 'phrase');
  const hardWords = hardVocab.filter(v => v.category === 'word');
  const hardPhrases = hardVocab.filter(v => v.category === 'phrase');

  const daily: Vocab[] = [];

  // 3 common words
  for (let i = 0; i < 3; i++) {
    if (commonWords.length > 0) daily.push(commonWords[(index * 3 + i) % commonWords.length]);
  }
  // 2 common phrases
  for (let i = 0; i < 2; i++) {
    if (commonPhrases.length > 0) daily.push(commonPhrases[(index * 2 + i) % commonPhrases.length]);
  }
  // 2 hard words
  for (let i = 0; i < 2; i++) {
    if (hardWords.length > 0) daily.push(hardWords[(index * 2 + i) % hardWords.length]);
  }
  // 1 hard phrase
  for (let i = 0; i < 1; i++) {
    if (hardPhrases.length > 0) daily.push(hardPhrases[(index * 1 + i) % hardPhrases.length]);
  }

  return daily;
}

export function getAllVocabMap(): Record<string, Vocab> {
  const map: Record<string, Vocab> = {};
  commonVocab.forEach(v => map[v.id] = v);
  hardVocab.forEach(v => map[v.id] = v);
  return map;
}

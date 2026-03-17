export interface Vocab {
  id: string;
  word: string;
  phonetic?: string;
  meaning: string;
  type: 'common' | 'hard';
  category: 'word' | 'phrase';
}

const cw = [
  ['account', '/əˈkaʊnt/', '帳戶；說明；解釋'], ['balance', '/ˈbæləns/', '平衡；餘額；結算'], ['capital', '/ˈkæpɪtl/', '首都；資本；大寫字母'], ['charge', '/tʃɑːrdʒ/', '收費；充電；控告'], ['degree', '/dɪˈɡriː/', '程度；度數；學位'],
  ['express', '/ɪkˈspres/', '表達；快遞；明確的'], ['figure', '/ˈfɪɡjər/', '數字；人物；身材'], ['general', '/ˈdʒenrəl/', '一般的；將軍；大體的'], ['handle', '/ˈhændl/', '處理；把手；操縱'], ['issue', '/ˈɪʃuː/', '議題；發行；期號'],
  ['match', '/mætʃ/', '比賽；火柴；相配'], ['object', '/ˈɑːbdʒekt/', '物體；目標；反對'], ['plant', '/plænt/', '植物；工廠；種植'], ['present', '/ˈpreznt/', '目前的；禮物；呈現'], ['raise', '/reɪz/', '舉起；提高；撫養'],
  ['sense', '/sens/', '感覺；理智；意義'], ['state', '/steɪt/', '狀態；國家；陳述'], ['term', '/tɜːrm/', '術語；學期；條件'], ['train', '/treɪn/', '火車；訓練；行列'], ['volume', '/ˈvɑːljuːm/', '音量；體積；冊'],
  ['board', '/bɔːrd/', '木板；董事會；登機'], ['character', '/ˈkærəktər/', '性格；角色；字元'], ['custom', '/ˈkʌstəm/', '習俗；海關；光顧'], ['duty', '/ˈduːti/', '責任；職務；關稅'], ['firm', '/fɜːrm/', '堅固的；公司；堅定'],
  ['interest', '/ˈɪntrest/', '興趣；利息；利益'], ['mine', '/maɪn/', '我的；礦坑；地雷'], ['patient', '/ˈpeɪʃnt/', '有耐心的；病人；受詞'], ['project', '/ˈprɑːdʒekt/', '計畫；投影；投射'], ['subject', '/ˈsʌbdʒɪkt/', '主題；科目；受試者'],
  ['apply', '/əˈplaɪ/', '申請；應用；塗抹'], ['assume', '/əˈsuːm/', '假設；承擔；假裝'], ['attach', '/əˈtætʃ/', '附加；繫上；依戀'], ['available', '/əˈveɪləbl/', '可用的；有空的；可取得的'], ['average', '/ˈævərɪdʒ/', '平均；普通的；海損'],
  ['benefit', '/ˈbenɪfɪt/', '利益；好處；受惠'], ['border', '/ˈbɔːrdər/', '邊界；鑲邊；接壤'], ['branch', '/bræntʃ/', '樹枝；分公司；分支'], ['burst', '/bɜːrst/', '爆裂；爆發；突發'], ['calculate', '/ˈkælkjuleɪt/', '計算；估計；打算'],
  ['cancel', '/ˈkænsl/', '取消；刪除；抵銷'], ['capture', '/ˈkæptʃər/', '捕捉；俘虜；引起'], ['cause', '/kɔːz/', '原因；造成；事業'], ['central', '/ˈsentrəl/', '中央的；主要的；核心的'], ['challenge', '/ˈtʃælɪndʒ/', '挑戰；質疑；盤問'],
  ['claim', '/kleɪm/', '要求；聲稱；索賠'], ['classic', '/ˈklæsɪk/', '經典的；古典的；名著'], ['coast', '/koʊst/', '海岸；滑行；沿岸航行'], ['command', '/kəˈmænd/', '命令；指揮；掌握'], ['comment', '/ˈkɑːment/', '評論；意見；註釋'],
  ['commercial', '/kəˈmɜːrʃl/', '商業的；廣告；營利的'], ['commit', '/kəˈmɪt/', '犯罪；承諾；委託'], ['common', '/ˈkɑːmən/', '共同的；普通的；常見的'], ['compare', '/kəmˈper/', '比較；匹敵；比喻'], ['compete', '/kəmˈpiːt/', '競爭；比賽；對抗'],
  ['complain', '/kəmˈpleɪn/', '抱怨；控訴；發牢騷'], ['complete', '/kəmˈpliːt/', '完成；完整的；徹底的'], ['complex', '/kəmˈpleks/', '複雜的；綜合體；情結'], ['concern', '/kənˈsɜːrn/', '關心；涉及；企業'], ['conclude', '/kənˈkluːd/', '得出結論；結束；締結'],
  ['condition', '/kənˈdɪʃn/', '條件；狀況；疾病'], ['conduct', '/kənˈdʌkt/', '行為；引導；傳導'], ['confirm', '/kənˈfɜːrm/', '確認；證實；批准'], ['conflict', '/ˈkɑːnflɪkt/', '衝突；抵觸；戰鬥'], ['connect', '/kəˈnekt/', '連接；聯想；接通'],
  ['consider', '/kənˈsɪdər/', '考慮；認為；體諒'], ['consist', '/kənˈsɪst/', '組成；在於；一致'], ['contact', '/ˈkɑːntækt/', '接觸；聯繫；熟人'], ['contain', '/kənˈteɪn/', '包含；容納；控制'], ['contract', '/ˈkɑːntrækt/', '合約；收縮；感染'],
  ['contrast', '/ˈkɑːntræst/', '對比；差異；對照'], ['control', '/kənˈtroʊl/', '控制；管理；對照組'], ['count', '/kaʊnt/', '計算；重要；伯爵'], ['course', '/kɔːrs/', '課程；路線；一道菜'], ['court', '/kɔːrt/', '法院；球場；追求'],
  ['cover', '/ˈkʌvər/', '覆蓋；掩護；報導'], ['create', '/kriˈeɪt/', '創造；引起；造成'], ['credit', '/ˈkredɪt/', '信用；學分；功勞'], ['cross', '/krɔːs/', '交叉；越過；十字架'], ['crowd', '/kraʊd/', '人群；擁擠；群眾'],
  ['current', '/ˈkɜːrənt/', '目前的；水流；電流'], ['damage', '/ˈdæmɪdʒ/', '損害；賠償金；破壞'], ['deal', '/diːl/', '交易；處理；發牌'], ['debate', '/dɪˈbeɪt/', '辯論；討論；爭論'], ['decide', '/dɪˈsaɪd/', '決定；判決；解決'],
  ['declare', '/dɪˈkler/', '宣佈；申報；聲明'], ['decline', '/dɪˈklaɪn/', '下降；婉拒；衰退'], ['deep', '/diːp/', '深的；深奧的；強烈的'], ['defeat', '/dɪˈfiːt/', '擊敗；失敗；挫折'], ['defend', '/dɪˈfend/', '防禦；辯護；保衛'],
  ['delay', '/dɪˈleɪ/', '延遲；耽擱；延誤'], ['deliver', '/dɪˈlɪvər/', '遞送；發表；接生'], ['demand', '/dɪˈmænd/', '要求；需求；查問'], ['deny', '/dɪˈnaɪ/', '否認；拒絕給予；剝奪'], ['depend', '/dɪˈpend/', '依賴；取決於；相信'],
  ['describe', '/dɪˈskraɪb/', '描述；形容；畫出'], ['design', '/dɪˈzaɪn/', '設計；計畫；圖案'], ['desire', '/dɪˈzaɪər/', '渴望；慾望；要求'], ['detail', '/ˈdiːteɪl/', '細節；詳述；派遣'], ['detect', '/dɪˈtekt/', '偵測；察覺；發現'],
  ['develop', '/dɪˈveləp/', '發展；沖洗(底片)；患病'], ['difference', '/ˈdɪfrəns/', '差別；分歧；差額'], ['direct', '/dəˈrekt/', '直接的；導演；指引'], ['discover', '/dɪˈskʌvər/', '發現；發覺；找到'], ['discuss', '/dɪˈskʌs/', '討論；商量；論述'],
  ['disease', '/dɪˈziːz/', '疾病；弊病；病害'], ['display', '/dɪˈspleɪ/', '展示；顯示；炫耀'], ['distance', '/ˈdɪstəns/', '距離；疏遠；遠處'], ['divide', '/dɪˈvaɪd/', '劃分；除以；分歧'], ['doubt', '/daʊt/', '懷疑；疑問；不確定'],
  ['draw', '/drɔː/', '畫；拉；吸引'], ['drive', '/draɪv/', '駕駛；驅使；磁碟機'], ['drop', '/drɑːp/', '掉落；滴；放棄'], ['edge', '/edʒ/', '邊緣；優勢；刀口'], ['effect', '/ɪˈfekt/', '效果；影響；實現'],
  ['effort', '/ˈefərt/', '努力；成就；精力'], ['either', '/ˈiːðər/', '兩者之一；也(不)；任一'], ['empty', '/ˈempti/', '空的；倒空；無意義的'], ['encourage', '/ɪnˈkɜːrɪdʒ/', '鼓勵；促進；支持'], ['energy', '/ˈenərdʒ/', '能量；精力；活力'],
  ['engine', '/ˈendʒɪn/', '引擎；動機；火車頭'], ['enjoy', '/ɪnˈdʒɔɪ/', '享受；喜愛；享有'], ['enough', '/ɪˈnʌf/', '足夠的；充分地；受夠了'], ['enter', '/ˈentər/', '進入；參加；輸入'], ['entire', '/ɪnˈtaɪər/', '整個的；完全的；全部的'],
  ['equal', '/ˈiːkwəl/', '平等的；等於；匹敵'], ['escape', '/ɪˈskeɪp/', '逃跑；漏出；被忘記'], ['especially', '/ɪˈspeʃəli/', '特別地；尤其；格外'], ['establish', '/ɪˈstæblɪʃ/', '建立；證實；制定'], ['even', '/ˈiːvn/', '甚至；平的；偶數的'],
];

const cp = [
  ['bring up', '', '撫養長大；提出(話題)；嘔吐'], ['call off', '', '取消；叫走；轉移(注意力)'], ['come up with', '', '想出(點子)；提供；準備好'], ['get over', '', '克服；從...中恢復；熬過'], ['look forward to', '', '期待；盼望；預期'],
  ['make up', '', '組成；化妝；捏造(藉口)'], ['put off', '', '延期；拖延；讓人反感'], ['set up', '', '建立；安排；陷害'], ['take off', '', '起飛；脫下；大受歡迎'], ['turn out', '', '結果是；出席；生產'],
  ['break down', '', '故障；崩潰；分解'], ['carry out', '', '執行；完成；實現'], ['give up', '', '放棄；戒除；投降'], ['hold on', '', '等一下；堅持；緊握'], ['work out', '', '解決；健身；結果是'],
  ['account for', '', '說明；佔(比例)；對...負責'], ['back up', '', '支持；倒車；備份'], ['break out', '', '爆發；逃脫；長出(疹子)'], ['bring about', '', '導致；引起；造成'], ['call for', '', '需要；呼籲；去接(人)'],
  ['catch up', '', '趕上；敘舊；了解近況'], ['come across', '', '偶然遇見；被理解；給人...印象'], ['cut down', '', '減少；砍倒；殺死'], ['drop by', '', '順道拜訪；短暫停留；探望'], ['fall behind', '', '落後；拖欠；跟不上'],
  ['figure out', '', '想出；理解；計算出'], ['fill in', '', '填寫；代替；提供詳情'], ['get along', '', '相處融洽；進展；離開'], ['give in', '', '屈服；讓步；交出'], ['go over', '', '複習；仔細檢查；受歡迎'],
  ['hand in', '', '繳交；提出；遞交'], ['keep up', '', '保持；繼續；熬夜'], ['lay off', '', '解僱；停止；放棄'], ['leave out', '', '遺漏；省略；排除'], ['look into', '', '調查；研究；觀察'],
  ['make out', '', '辨認出；理解；進展'], ['pass away', '', '過世；消失；度過'], ['pick up', '', '撿起；接送；學會'], ['point out', '', '指出；提出；指明'], ['put up with', '', '忍受；容忍；包容'],
  ['run into', '', '偶遇；撞上；遭遇(困難)'], ['show off', '', '炫耀；賣弄；使顯眼'], ['stand for', '', '代表；象徵；容忍'], ['take over', '', '接管；接替；佔領'], ['turn down', '', '拒絕；調低；向下折'],
  ['wear out', '', '穿破；使疲憊；耗盡'], ['wipe out', '', '徹底摧毀；擦去；使疲憊'], ['wrap up', '', '包裝；結束；穿暖和'], ['yield to', '', '屈服於；讓路給；被...取代'], ['zoom in', '', '放大；拉近鏡頭；聚焦'],
  ['act on', '', '對...起作用；奉行；根據...行動'], ['add up', '', '加起來；合理；說得通'], ['back down', '', '退讓；認輸；放棄要求'], ['blow up', '', '爆炸；發脾氣；放大(照片)'], ['break in', '', '闖入；打斷；預演'],
  ['bring down', '', '擊敗；降低；使倒下'], ['call on', '', '拜訪；呼籲；點名'], ['catch on', '', '流行起來；理解；明白'], ['check out', '', '結帳離開；檢查；借出'], ['come down with', '', '染上(疾病)；病倒；患病'],
];

const hw = [
  ['abstract', '/ˈæbstrækt/', '抽象的；摘要；提取'], ['commit', '/kəˈmɪt/', '承諾；犯(罪)；委託'], ['draft', '/dræft/', '草稿；徵兵；匯票'], ['engage', '/ɪnˈɡeɪdʒ/', '訂婚；從事；吸引'], ['facility', '/fəˈsɪləti/', '設施；才能；便利'],
  ['grant', '/ɡrænt/', '同意；給予；補助金'], ['host', '/hoʊst/', '主人；主辦；主機'], ['incorporate', '/ɪnˈkɔːrpəreɪt/', '包含；合併；組成公司'], ['justify', '/ˈdʒʌstɪfaɪ/', '證明...有理；為...辯護；對齊'], ['launch', '/lɔːntʃ/', '發射；發起；產品上市'],
  ['maintain', '/meɪnˈteɪn/', '維持；保養；堅稱'], ['novel', '/ˈnɑːvl/', '小說；新奇的；異常的'], ['observe', '/əbˈzɜːrv/', '觀察；遵守；慶祝'], ['panel', '/ˈpænl/', '儀表板；專家小組；鑲板'], ['quote', '/kwoʊt/', '引用；報價；引號'],
  ['reserve', '/rɪˈzɜːrv/', '保留；預訂；保護區'], ['scale', '/skeɪl/', '規模；刻度；鱗片'], ['trace', '/treɪs/', '追蹤；痕跡；微量'], ['uniform', '/ˈjuːnɪfɔːrm/', '制服；統一的；相同的'], ['yield', '/jiːld/', '產量；屈服；讓路'],
  ['abandon', '/əˈbændən/', '放棄；拋棄；放縱'], ['absolute', '/ˈæbsəluːt/', '絕對的；完全的；專制的'], ['absorb', '/əbˈsɔːrb/', '吸收；理解；使全神貫注'], ['abuse', '/əˈbjuːs/', '濫用；虐待；辱罵'], ['academic', '/ˌækəˈdemɪk/', '學術的；學院的；不切實際的'],
  ['acceptable', '/əkˈseptəbl/', '可接受的；令人滿意的；合適的'], ['accompany', '/əˈkʌmpəni/', '陪伴；伴隨；伴奏'], ['accomplish', '/əˈkɑːmplɪʃ/', '完成；實現；達到'], ['accurate', '/ˈækjərət/', '準確的；精確的；正確無誤的'], ['accuse', '/əˈkjuːz/', '指控；控告；譴責'],
  ['achieve', '/əˈtʃiːv/', '達成；實現；獲得'], ['acknowledge', '/əkˈnɑːlɪdʒ/', '承認；答謝；確認收悉'], ['acquire', '/əˈkwaɪər/', '取得；獲得；學到'], ['adapt', '/əˈdæpt/', '適應；改編；改造'], ['adequate', '/ˈædɪkwət/', '足夠的；適當的；勝任的'],
  ['adjust', '/əˈdʒʌst/', '調整；適應；校準'], ['administer', '/ədˈmɪnɪstər/', '管理；執行；給予(藥物)'], ['adopt', '/əˈdɑːpt/', '採用；收養；正式通過'], ['advance', '/ədˈvæns/', '前進；進步；預付'], ['advantage', '/ədˈvæntɪdʒ/', '優勢；利益；有利條件'],
  ['advocate', '/ˈædvəkət/', '提倡；擁護者；辯護律師'], ['affect', '/əˈfekt/', '影響；感動；假裝'], ['agency', '/ˈeɪdʒənsi/', '代理機構；仲介；作用'], ['aggressive', '/əˈɡresɪv/', '具攻擊性的；積極的；侵略的'], ['allocate', '/ˈæləkeɪt/', '分配；分派；撥出'],
  ['alter', '/ˈɔːltər/', '改變；修改；閹割'], ['alternative', '/ɔːlˈtɜːrnətɪv/', '替代的；二選一；非主流的'], ['ambiguous', '/æmˈbɪɡjuəs/', '模稜兩可的；含糊不清的；引起歧義的'], ['analyze', '/ˈænəlaɪz/', '分析；解析；化驗'], ['anticipate', '/ænˈtɪsɪpeɪt/', '預期；期待；先發制人'],
  ['apparent', '/əˈpærənt/', '明顯的；表面的；顯而易見的'], ['appeal', '/əˈpiːl/', '呼籲；吸引力；上訴'], ['apply', '/əˈplaɪ/', '申請；應用；塗抹'], ['approach', '/əˈproʊtʃ/', '接近；方法；途徑'], ['appropriate', '/əˈproʊpriət/', '適當的；撥款；盜用'],
  ['approve', '/əˈpruːv/', '批准；贊成；同意'], ['arise', '/əˈraɪz/', '發生；出現；產生'], ['artificial', '/ˌɑːrtɪˈfɪʃl/', '人造的；虛偽的；武斷的'], ['aspect', '/ˈæspekt/', '方面；外觀；方位'], ['assess', '/əˈses/', '評估；估價；徵收'],
  ['assign', '/əˈsaɪn/', '分配；指派；指定'], ['assist', '/əˈsɪst/', '協助；幫助；助攻'], ['associate', '/əˈsoʊʃieɪt/', '聯想；結交；副的'], ['assume', '/əˈsuːm/', '假設；承擔；假裝'], ['assure', '/əˈʃʊr/', '保證；確信；弄清楚'],
  ['attach', '/əˈtætʃ/', '附加；繫上；依戀'], ['attain', '/əˈteɪn/', '達到；獲得；實現'], ['attempt', '/əˈtempt/', '嘗試；企圖；攻擊'], ['attend', '/əˈtend/', '出席；照顧；專心'], ['attitude', '/ˈætɪtuːd/', '態度；姿勢；看法'],
  ['attract', '/əˈtrækt/', '吸引；引起；誘惑'], ['attribute', '/ˈætrɪbjuːt/', '歸因於；屬性；特質'], ['author', '/ˈɔːθər/', '作者；創始人；寫作'], ['authority', '/əˈθɔːrəti/', '權威；當局；授權'], ['available', '/əˈveɪləbl/', '可用的；有空的；可取得的'],
  ['average', '/ˈævərɪdʒ/', '平均；普通的；海損'], ['avoid', '/əˈvɔɪd/', '避免；躲開；撤銷'], ['award', '/əˈwɔːrd/', '獎品；授予；裁決'], ['aware', '/əˈwer/', '意識到的；知道的；發覺的'], ['balance', '/ˈbæləns/', '平衡；餘額；結算'],
  ['bare', '/ber/', '裸露的；勉強的；揭露'], ['barrier', '/ˈbæriər/', '障礙；柵欄；屏障'], ['base', '/beɪs/', '基礎；基地；卑鄙的'], ['bear', '/ber/', '忍受；生育；熊'], ['beat', '/biːt/', '擊敗；敲打；節拍'],
];

const hp = [
  ['boil down to', '', '歸結為；主要原因是；濃縮成'], ['fall short of', '', '達不到；缺乏；不符合(期望)'], ['make up for', '', '補償；彌補；挽回'], ['take for granted', '', '視為理所當然；認為...是必然的；不把...當回事'], ['come to terms with', '', '妥協；接受(殘酷現實)；達成協議'],
  ['give rise to', '', '引起；導致；使發生'], ['lose track of', '', '失去聯繫；忘記(時間/進度)；跟不上'], ['pay off', '', '還清(債務)；取得成功；賄賂'], ['rule out', '', '排除；取消...的可能性；拒絕考慮'], ['stand in for', '', '代理；代替；替補'],
  ['abide by', '', '遵守；信守；承擔後果'], ['account for', '', '說明；佔(比例)；對...負責'], ['act up', '', '調皮搗蛋；(機器)運轉不正常；發作'], ['add up to', '', '總計達；意味著；結果是'], ['allow for', '', '考慮到；顧及；為...留出餘地'],
  ['answer for', '', '對...負責；保證；因...受罰'], ['back out', '', '食言；退出；打退堂鼓'], ['bear out', '', '證實；支持；證明'], ['blow over', '', '平息；被遺忘；消散'], ['break away', '', '脫離；逃脫；決裂'],
  ['bring forward', '', '提出；提前；結轉'], ['brush up on', '', '溫習；複習；改進'], ['build up', '', '建立；增強；逐漸積累'], ['burn out', '', '燒毀；精疲力竭；燃盡'], ['call off', '', '取消；叫走；轉移(注意力)'],
  ['carry away', '', '使激動；帶走；沖走'], ['catch on', '', '流行起來；理解；明白'], ['clear up', '', '放晴；澄清；整理'], ['come about', '', '發生；產生；改變方向'], ['come down to', '', '歸結為；實質上是；傳下來'],
];

export const commonVocab: Vocab[] = [
  ...cw.map((item, i) => ({ id: `cw${i}`, word: item[0], phonetic: item[1], meaning: item[2], type: 'common' as const, category: 'word' as const })),
  ...cp.map((item, i) => ({ id: `cp${i}`, word: item[0], phonetic: item[1], meaning: item[2], type: 'common' as const, category: 'phrase' as const })),
];

export const hardVocab: Vocab[] = [
  ...hw.map((item, i) => ({ id: `hw${i}`, word: item[0], phonetic: item[1], meaning: item[2], type: 'hard' as const, category: 'word' as const })),
  ...hp.map((item, i) => ({ id: `hp${i}`, word: item[0], phonetic: item[1], meaning: item[2], type: 'hard' as const, category: 'phrase' as const })),
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

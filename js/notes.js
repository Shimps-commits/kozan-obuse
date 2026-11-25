/* 語り台本（発表者画面にだけ出す）。id は index.html の各 .slide の data-id と対応。
   出典：第2回ファム「再設計方針」「追加素材と視覚設計」メモ（2026-11-25） */
window.KOZAN_NOTES = {
  ryo: {
    cue: { ja: '→ 数字がカウントアップ', en: '→ count up' },
    ja: '今のお金で数億円。ひとりの男が、一度に差し出すと約束した額です。\n彼が遺したものは、200年たった今も、この町に残っています。この2日間は、その男の目で小布施を歩きます。',
    en: 'Several hundred million yen today. One man promised to hand it over, all at once.\nWhat he left behind is still in this town, 200 years on. For the next two days, we walk Obuse through his eyes.'
  },
  village: {
    ja: '彼をひとことで言うと、村に世界を連れてきた男です。',
    en: 'In a sentence: he brought the world to a village.'
  },
  kozan: {
    cue: { ja: '→ 性格の一言に切り替わる', en: '→ switches to his character' },
    ja: '高井鴻山。1806年にこの小布施で生まれ、1883年に亡くなりました。\n「我は吾が様に依る」。自分は自分のやり方でいく、という意味の印章の言葉です。\n遊び人で、探求心のかたまり。江戸と京都で学び、とくに芸術と絵にのめり込みました。家業の農と商とは、あまり関係のない学問です。',
    en: 'Takai Kōzan. Born here in Obuse in 1806, died in 1883.\nOne of his seals reads “I go by my own way.”\nA man who loved to play and could not stop asking questions. He studied in Edo and Kyoto, above all art and painting — little of it useful to a farming and trading family.'
  },
  waves: {
    cue: { ja: '→ 凱風快晴へ', en: '→ Red Fuji' },
    ja: 'この絵はご存じだと思います。葛飾北斎の『神奈川沖浪裏』。1831年ごろ、北斎72歳の仕事です。\n同じ冨嶽三十六景の『凱風快晴』。世界でいちばん知られた日本の絵師が、晩年、この町に通いました。',
    en: 'You probably know this one: Hokusai’s Great Wave, around 1831. He was 72.\nAnd from the same series, Red Fuji. The best-known Japanese artist in the world came to this town again and again in his last years.'
  },
  'obuse-hokusai': {
    ja: '小布施には、北斎がここで描いた絵が残っています。\n上町祭屋台の天井絵「男浪・女浪」は1845年、北斎86歳。岩松院の天井絵「鳳凰図」は1848年ごろ、89歳とされます。\nなぜ、80代半ばの画家がこの町で描いたのか。その答えが、高井鴻山です。',
    en: 'Obuse still has paintings Hokusai made here.\nThe “Male and Female Waves” on the Kanmachi festival float, 1845, when he was 86. The Phoenix on the ceiling of Ganshō-in, around 1848, at 89.\nWhy would a painter in his late eighties work in a small town? The answer is Takai Kōzan.'
  },
  map: {
    cue: { ja: '→ 三都と街道 → 千曲川の舟運', en: '→ three cities and roads → river boats' },
    ja: '小布施は、千曲川と松川がつくった扇状地の町です。今の人口は約1万人。\n江戸時代は街道が交わる市場町で、商いは江戸・京都・大坂につながっていました。\n千曲川の舟運もあり、人と物と知恵が行き交いました。',
    en: 'Obuse sits on an alluvial fan made by the Chikuma and Matsukawa rivers. About 10,000 people live here today.\nIn the Edo period, roads crossed here. It was a market town, and its trade reached Edo, Kyoto and Osaka.\nBoats ran on the Chikuma River. People, goods and ideas passed through.'
  },
  market: {
    cue: { ja: '→ 3と8の日が灯る', en: '→ the 3s and 8s light up' },
    ja: '3と8の付く日に市が立ちました。六斎市といいます。米の相場を決めるほど栄えました。\nこれから歩く道は、200年前に人と物と知恵が行き交った道です。',
    en: 'On every day ending in 3 or 8 there was a market — six a month. It was big enough to set the price of rice.\nThe streets you will walk were busy with people, goods and ideas 200 years ago.'
  },
  house: {
    ja: '高井家は上町の豪農商です。300石の田畑を持ち、酒造・穀物・塩・茶を商いました。\n公家の九條家の御用達をつとめ、近くの藩にお金も貸していました。',
    en: 'The Takai family were wealthy farmer-merchants in Kanmachi: 300 koku of fields, and trade in sake, grain, salt and tea.\nThey supplied the Kujō court family and lent money to nearby domains.'
  },
  grandpa: {
    cue: { ja: '→ 404両 → 600両 → 300俵 → 「高井」の姓', en: '→ 404 → 600 → 300 bales → the name' },
    ja: '1783年、天明の飢饉。鴻山の祖父・長救は、404両あまりを無償で差し出し、600両を利子なしで貸し、籾300俵を安く売りました。\n幕府はこれに「高井」の姓と一代の帯刀を許しました。\nこの家には、困ったときに蔵を開く前例がありました。',
    en: '1783, the Tenmei famine. Kōzan’s grandfather gave away over 404 ryō, lent 600 ryō without interest, and sold 300 bales of rice cheaply.\nThe shogunate let the family take the name “Takai.”\nThis house already knew how to open its storehouses in hard times.'
  },
  timeline: {
    cue: { ja: '→ 鴻山の出来事 → 北斎の段。点にカーソルで内容が出る', en: '→ Kōzan’s events → Hokusai’s line. Hover a dot for details' },
    ja: '鴻山の78年を、北斎と並べてみます。上が鴻山、下が北斎です。\n色は、学ぶ・救う・迎える・差し出す・教える。\n鴻山が生まれたとき、北斎はもう47歳でした。二人の線が重なるのは1842年からの7年あまりです。',
    en: 'Here are Kōzan’s 78 years, set against Hokusai’s. Kōzan on top, Hokusai below.\nThe colours: learn, rescue, host, give, teach.\nWhen Kōzan was born, Hokusai was already 47. Their lines overlap for about seven years from 1842.'
  },
  study: {
    cue: { ja: '→ 1820 京都 → 1827 京都 → 1833 江戸 → 1836 帰郷', en: '→ 1820 Kyoto → 1827 Kyoto → 1833 Edo → 1836 home' },
    ja: '15歳で家を出て、京都に2回、江戸に1回。31歳まで、およそ16年学びました。\n書は貫名海屋、漢詩は梁川星巌、陽明学は佐藤一斎。同じ門に佐久間象山がいます。\n学んだら行動する「知行合一」が、彼の軸になります。15歳は、今なら高校1年生です。',
    en: 'He left home at 15: twice to Kyoto, once to Edo. About 16 years of study, until 31.\nCalligraphy with Nukina Kaioku, poetry with Yanagawa Seigan, Wang Yangming thought with Satō Issai. Sakuma Shōzan studied alongside him.\n“To know is to act” became his rule. Fifteen is a first-year high-school student today.'
  },
  kura: {
    ja: '1836年、31歳。江戸から帰った年に、天保の大飢饉が来ました。\n鴻山は父と倉を開き、困った人たちを救いました。家業より先に、人を救った。祖父と同じことをしたわけです。',
    en: '1836. He was 31, just home from Edo, when the Great Tenpō Famine hit.\nWith his father he opened the storehouses and fed people. People before business — just as his grandfather had done.'
  },
  age: {
    cue: { ja: '→ 数字が離れて＋46 → 入力欄。観客に年齢を聞いて入力（Enterで確定）', en: '→ numbers part, +46 → input. Ask someone’s age and type it (Enter)' },
    ja: '1842年の秋、37歳の鴻山の家に、83歳の北斎が来ました。46歳上です。\n天保の改革で、江戸では派手な絵が描きにくくなっていました。鴻山は、北斎が自由に描ける場所を用意した、と記念館は説明しています。\n1845年には、3月から9月まで半年あまり滞在したとみられています。高井家では「気の向く儘の画描きさん」と呼ばれていたと伝わります。',
    en: 'In autumn 1842, the 83-year-old Hokusai came to the house of the 37-year-old Kōzan. Forty-six years apart.\nThe Tenpō Reforms had made lavish art hard to make in Edo. The museum here says Kōzan gave Hokusai a place to paint freely.\nIn 1845 he seems to have stayed about six months, March to September. The household reportedly called him “the painter who goes wherever his mood takes him.”'
  },
  shizai: {
    ja: '1845年、鴻山は上町の祭屋台を私財で建て、天井を北斎に描かせました。86歳の北斎の「男浪・女浪」です。\n縁の花鳥は、北斎の下絵に鴻山が色を塗ったと考えられています。支えるだけでなく、一緒に描いた。\n実物は北斎館で見られます。',
    en: 'In 1845 Kōzan paid for the Kanmachi festival float himself, and had Hokusai paint its ceiling: the “Male and Female Waves,” by Hokusai at 86.\nThe flowers and birds on the border are thought to be Kōzan’s colouring over Hokusai’s drawing. He did not only support the work; he painted with him.\nYou can see the real thing at the Hokusai Museum.'
  },
  'fuji-ryu': {
    ja: '1849年、北斎は90歳で亡くなります。絶筆は『富士越龍』。富士山を越えて龍が昇っていく絵です。\n鴻山と過ごした小布施の日々は、北斎の最後の時間でもありました。',
    en: 'Hokusai died in 1849, at 90. His last painting is “Dragon over Mount Fuji” — a dragon rising past the mountain.\nHis days in Obuse with Kōzan were among the last of his life.'
  },
  gave: {
    cue: { ja: '→ 500両 → 籾 → 献金 → 1万両 → 質に出す', en: '→ 500 ryō → rice → gift → 10,000 → pawned' },
    ja: '鴻山が差し出したものを、順に並べます。\n1847年、善光寺大地震で500両。1853年、ペリー来航のあと、品川台場の築造に籾。1860年、和宮の降嫁に献金。\n1866年、61歳で幕府に1万両を約束します。「献金の額に限りはいらない。全財産でも差し出す」と言ったそうです。\nそのために、農地や蔵を質屋に出しました。',
    en: 'Here is what Kōzan gave, in order.\n1847: 500 ryō after the Zenkōji earthquake. 1853, after Perry: rice for the Shinagawa forts. 1860: money for Princess Kazu’s wedding.\n1866, at 61: he promised the shogunate 10,000 ryō. “No need to set a limit. I’ll give everything I have,” he is said to have told them.\nTo raise it, he pawned farmland and storehouses.'
  },
  cost: {
    cue: { ja: '→ 換算（クリックか T で切替）→ 約束した額', en: '→ conversion (click or T) → a promise' },
    ja: '1万両は、今のお金でいくらか。換算のしかたで大きく変わります。\n幕末の米の値段なら1両が約1万円、江戸中〜後期の米なら約4万円、そば代なら12〜13万円。1億円から13億円の幅です。\nそして、これは約束した額です。実際に払った額は、記録に残っていません。1869年、新政府は「献金はいらない。税を納めよ」と告げました。',
    en: 'What is 10,000 ryō today? It depends on how you count.\nBy late-Edo rice prices, about ¥10,000 a ryō. By mid-to-late Edo rice, about ¥40,000. By the price of soba, ¥120,000–130,000. So: ¥100 million to ¥1.3 billion.\nAnd it was a promise. How much he actually paid is not on record. In 1869 the new government told him: no gift needed — pay your taxes.'
  },
  depleted: {
    ja: '翌1867年、幕府は政権を返します。約束は意味を失い、残ったのは借金でした。\n資産が底をつきました。\n66歳で、家族を養うために役所勤め。東京で開いた塾も閉じ、73歳の年には火事で蔵書と家宝の大半を失います。',
    en: 'In 1867 the shogunate handed back power. The promise meant nothing now; the debts remained.\nHis fortune ran out.\nAt 66 he took a government job to feed his family. A school he opened in Tokyo had to close. At 73 a fire took most of his books and heirlooms.'
  },
  teach: {
    ja: '74歳。長野に私塾「高矣義塾」を開きます。授業料はぎりぎりまで下げ、学ぶ気のある人は誰も断りませんでした。\n卒業生の多くは、小学校の校長になりました。唱歌「ふるさと」を作詞した高野辰之の父も、ここで学んでいます。\n1883年、78歳で亡くなります。葬儀には236人が集まりました。',
    en: 'At 74 he opened a private school in Nagano, Kōi Gijuku. He kept the fees as low as he could and turned no willing student away.\nMany graduates became primary-school principals. The father of Takano Tatsuyuki, who wrote the song “Furusato,” studied here.\nHe died in 1883 at 78. 236 people came to his funeral.'
  },
  days: {
    cue: { ja: '→ で1か所ずつ問いを出す（6か所）。答えは言わない', en: '→ one place and one question at a time (6). Give no answers' },
    ja: 'この2日間で行く6か所に、問いを1つずつ置いておきます。答えは言いません。歩きながら考えてみてください。',
    en: 'Six places over two days, one question each. I won’t give the answers. Think about them as you walk.'
  },
  why: {
    ja: 'そこまでして、彼はなぜ差し出したのか。',
    en: 'Why did he give so much?'
  },
  journey: {
    ja: 'そして、サロン文化という支援とつながりは、小布施に何を残したのか。\n答えは、この町のあちこちにあります。歩きながら、探してみてください。',
    en: 'And what did that culture of support and connection — the salon — leave in Obuse?\nThe answers are all around this town. Look for them as you walk.'
  }
};

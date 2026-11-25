/* 語り台本（発表者画面にだけ出す）。id は index.html の各 .slide の data-id と対応。
   出典：第2回ファム「再設計方針」「追加素材と視覚設計」メモ（2026-11-25） */
window.KOZAN_NOTES = {
  ryo: {
    cue: { ja: '→ 数字がカウントアップ', en: '→ count up' },
    ja: '1万両。今のお金で数億円です。ひとりの男が、一度に差し出すと約束した額です。',
    en: '10,000 ryō. Several hundred million yen today. One man promised to hand it over, all at once.'
  },
  young: {
    ja: 'この絵はご存じだと思います。葛飾北斎の『神奈川沖浪裏』。北斎は自分を「画狂老人」、絵に狂った老人と名乗りました。\nその北斎を、晩年の小布施に招いた若者がいました。彼が遺したものは、今もこの町に残っています。この2日間は、その若者の目で小布施を歩きます。',
    en: 'You probably know this picture: Hokusai’s Great Wave. Hokusai called himself “the old man mad about painting.”\nIn his last years, a young man brought him to Obuse. What that young man left behind is still in this town. For the next two days, we walk Obuse through his eyes.'
  },
  kozan: {
    cue: { ja: '→ 性格の一言に切り替わる。肖像はクリックで拡大', en: '→ switches to his character. Click the portrait to enlarge' },
    ja: '高井鴻山。1806年にこの小布施で生まれ、1883年に亡くなりました。肖像は横山上龍の筆です。\n「我は吾が様に依る」。自分は自分のやり方でいく、という印章の言葉です。\n遊び人で、探求心のかたまりでした。',
    en: 'Takai Kōzan. Born here in Obuse in 1806, died in 1883. The portrait is by Yokoyama Jōryū.\nOne of his seals reads “I go by my own way.”\nHe loved to play, and he could not stop asking questions.'
  },
  map: {
    cue: { ja: '→ 三都と街道 → 千曲川の舟運', en: '→ three cities and roads → river boats' },
    ja: '小布施は、千曲川と松川がつくった扇状地の町です。今の人口は約1万人。\n江戸時代は街道が交わる市場町でした。3と8の付く日に市が立ち、米の相場を決めるほど栄えました。商いは江戸・京都・大坂につながり、千曲川には舟が通いました。\n高井家はその上町の豪農商です。酒・穀物・塩・茶を商い、近くの藩にお金も貸していました。',
    en: 'Obuse sits on an alluvial fan made by the Chikuma and Matsukawa rivers. About 10,000 people live here today.\nIn the Edo period, roads crossed here. On days ending in 3 or 8 there was a market big enough to set the price of rice. Trade reached Edo, Kyoto and Osaka, and boats ran on the river.\nThe Takai family were wealthy farmer-merchants here, trading sake, grain, salt and tea, and lending money to nearby domains.'
  },
  study: {
    cue: { ja: '→ 1820 京都 → 1827 京都 → 1833 江戸 → 1836 帰郷', en: '→ 1820 Kyoto → 1827 Kyoto → 1833 Edo → 1836 home' },
    ja: '15歳で家を出て、京都に2回、江戸に1回。31歳まで、およそ16年学びました。15歳は、今なら高校1年生です。\n書は貫名海屋、漢詩は梁川星巌、陽明学は佐藤一斎。学んだら行動する「知行合一」が、彼の軸になります。',
    en: 'He left home at 15 — a first-year high-school student today — and studied for about 16 years: twice in Kyoto, once in Edo.\nCalligraphy with Nukina Kaioku, poetry with Yanagawa Seigan, Wang Yangming thought with Satō Issai. “To know is to act” became his rule.'
  },
  art: {
    cue: { ja: '→ 絵が1枚ずつ出る。クリックで拡大', en: '→ one painting at a time. Click to enlarge' },
    ja: 'とくにのめり込んだのが、芸術と絵でした。家業の農と商には、あまり関係のない学問です。\n鴻山自身が描いた絵です。花の絵、そして妖怪。妖怪画は北斎の影響を受けて、たくさん描いています。',
    en: 'Above all he threw himself into art and painting — not much use to a farming and trading family.\nThese are his own: flowers, and yōkai. He painted many yōkai, under Hokusai’s influence.'
  },
  kura: {
    ja: '1836年、31歳。江戸から帰った年に、天保の大飢饉が来ました。鴻山は父と倉を開き、困った人たちを救いました。\n祖父も1783年の天明の飢饉で私財を出して人を救い、幕府から「高井」の姓を許されています。この家には、困ったときに蔵を開く前例がありました。',
    en: '1836. He was 31, just home from Edo, when the Great Tenpō Famine hit. With his father he opened the storehouses and fed people.\nHis grandfather had done the same in the famine of 1783, and the shogunate gave the family the name “Takai” for it. This house knew how to open its storehouses.'
  },
  age: {
    cue: { ja: '→ 数字が離れて＋46 → 入力欄。観客に年齢を聞いて入力（Enterで確定）', en: '→ numbers part, +46 → input. Ask someone’s age and type it (Enter)' },
    ja: '1842年の秋、37歳の鴻山の家に、83歳の北斎が来ました。46歳上です。\n天保の改革で、江戸では派手な絵が描きにくくなっていました。鴻山は、北斎が自由に描ける場所を用意した、と記念館は説明しています。高井家では「気の向く儘の画描きさん」と呼ばれていたと伝わります。',
    en: 'In autumn 1842, the 83-year-old Hokusai came to the house of the 37-year-old Kōzan. Forty-six years apart.\nThe Tenpō Reforms had made lavish art hard to make in Edo. The museum here says Kōzan gave Hokusai a place to paint freely. The household reportedly called him “the painter who goes wherever his mood takes him.”'
  },
  together: {
    cue: { ja: '→ 私財で。→ 鳳凰 → 象と唐人図', en: '→ “Out of his own pocket” → Phoenix → Elephant' },
    ja: '1845年、鴻山は上町の祭屋台を私財で建て、天井を86歳の北斎に描かせました。「男浪・女浪」です。縁の花鳥は、北斎の下絵に鴻山が色を塗ったと考えられています。実物は北斎館にあります。\n北斎の『鳳凰』。\nそして『象と唐人図』。北斎の原画をもとに、鴻山と二人で描いたと伝わる絵です。支えるだけでなく、一緒に描いた。',
    en: 'In 1845 Kōzan paid for the Kanmachi festival float himself, and had Hokusai, then 86, paint its ceiling: the “Male and Female Waves.” The flowers and birds on the border are thought to be Kōzan’s colouring over Hokusai’s drawing. The originals are at the Hokusai Museum.\nHokusai’s Phoenix.\nAnd “Elephant and Chinese Men,” said to be painted by the two of them from Hokusai’s design. He did not only support the work; he painted with him.'
  },
  timeline: {
    cue: { ja: '→ 鴻山の出来事 → 北斎の段。点にカーソルで内容が出る', en: '→ Kōzan’s events → Hokusai’s line. Hover a dot for details' },
    ja: '鴻山の78年です。上が鴻山、下が北斎。\n色は、学ぶ・救う・迎える・差し出す・教える。前半は学んで救い、半ばで北斎を迎え、後半は差し出していきます。',
    en: 'Kōzan’s 78 years. Kōzan on top, Hokusai below.\nThe colours: learn, rescue, host, give, teach. First he learns and rescues, then he hosts Hokusai, and then he gives.'
  },
  gave: {
    cue: { ja: '→ 500両 → 籾 → 献金 → 1万両', en: '→ 500 ryō → rice → gift → 10,000' },
    ja: '鴻山が差し出したものを、順に並べます。\n1847年、善光寺大地震で500両。1853年、ペリー来航のあと、品川台場の築造に籾。1860年、和宮の降嫁に献金。\n1866年、61歳で幕府に1万両を約束します。「献金の額に限りはいらない。全財産でも差し出す」と言ったそうです。そのために、農地や蔵を質屋に出しました。\n1万両は、換算のしかたで約1億円から13億円。そしてこれは約束した額で、実際に払った額は記録に残っていません。',
    en: 'Here is what Kōzan gave, in order.\n1847: 500 ryō after the Zenkōji earthquake. 1853, after Perry: rice for the Shinagawa forts. 1860: money for Princess Kazu’s wedding.\n1866, at 61: he promised the shogunate 10,000 ryō. “No need to set a limit. I’ll give everything I have,” he is said to have told them. To raise it, he pawned farmland and storehouses.\nDepending on how you count, that is ¥100 million to ¥1.3 billion. And it was a promise. How much he actually paid is not on record.'
  },
  teach: {
    cue: { ja: '→ それでも、教えた。', en: '→ Still, he taught.' },
    ja: '翌1867年、幕府は政権を返し、約束は意味を失います。残ったのは借金でした。資産が底をつきました。\n74歳。長野に私塾「高矣義塾」を開きます。授業料はぎりぎりまで下げ、学ぶ気のある人は誰も断りませんでした。卒業生の多くは小学校の校長になり、唱歌「ふるさと」を作詞した高野辰之の父もここで学んでいます。\n1883年、78歳で亡くなります。葬儀には236人が集まりました。',
    en: 'In 1867 the shogunate handed back power, and the promise meant nothing. The debts remained. His fortune ran out.\nAt 74 he opened a private school in Nagano, Kōi Gijuku. He kept the fees as low as he could and turned no willing student away. Many graduates became primary-school principals; the father of Takano Tatsuyuki, who wrote the song “Furusato,” studied here.\nHe died in 1883 at 78. 236 people came to his funeral.'
  },
  days: {
    cue: { ja: '→ で1か所ずつ問いを出す（6か所）。答えは言わない', en: '→ one place and one question at a time (6). Give no answers' },
    ja: 'この2日間で行く6か所に、問いを1つずつ置いておきます。答えは言いません。歩きながら考えてみてください。',
    en: 'Six places over two days, one question each. I won’t give the answers. Think about them as you walk.'
  },
  why: {
    cue: { ja: '→ 旅の問い', en: '→ the question to carry' },
    ja: 'そこまでして、彼はなぜ差し出したのか。\nそして、サロン文化という支援とつながりは、小布施に何を残したのか。\n答えは、この町のあちこちにあります。歩きながら、探してみてください。',
    en: 'Why did he give so much?\nAnd what did that culture of support and connection — the salon — leave in Obuse?\nThe answers are all around this town. Look for them as you walk.'
  }
};

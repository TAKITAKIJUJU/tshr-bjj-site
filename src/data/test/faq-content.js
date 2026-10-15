// Japanese copy is verbatim from the production FAQ at this commit.
export const faqSourceCommit = 'd0647159014f44910b0917f2a478df07d2ab49b0';
const rows = [
  [
    'ブラジリアン柔術や格闘技が全くの未経験の初心者でも大丈夫ですか？',
    'はい、もちろんです。当道場に通う方の多くが未経験からスタートされています。柔術は打撃が一切ないため安全性が高く、基礎から楽しく学べます。',
    'Is it OK to join if I am a complete beginner with no experience in Brazilian Jiu-Jitsu or martial arts?',
    'Yes, of course. Many people at our dojo started with no experience. Jiu-jitsu involves no strikes, giving it a high level of safety, and you can enjoy learning from the basics.',
    'Posso participar mesmo sendo iniciante, sem nenhuma experiência em Jiu-Jitsu Brasileiro ou artes marciais?',
    'Sim, claro. Muitas pessoas que frequentam nosso dojo começaram sem experiência. Como o jiu-jitsu não utiliza golpes de impacto, oferece um alto nível de segurança, e você pode aprender desde os fundamentos de forma divertida.',
    'ブラジリアン柔術も格闘技も全くやったことがねぇ初心者でも大丈夫かい？',
    'うん、もちろんだいね。道場に通ってる人の多くが未経験から始めてるんさ。柔術は打撃が一切ねぇから安全性が高くて、基礎から楽しく学べるよ。'
  ],
  [
    '30代・40代の運動不足解消やダイエット目的で始めても遅くないでしょうか？',
    '全く遅くありません。当道場では20代〜50代の大人の習い事として通われる方も多くいらっしゃいます。全身運動なので、ダイエットやストレス発散にもおすすめです。',
    'Is it too late to start in my 30s or 40s to get more exercise or lose weight?',
    'Not at all. Many adults in their 20s through 50s attend our dojo as a regular hobby. It is a full-body activity, so we also recommend it for weight management and stress relief.',
    'É tarde para começar aos 30 ou 40 anos para sair do sedentarismo ou emagrecer?',
    'Não é tarde de forma alguma. Muitas pessoas dos 20 aos 50 anos frequentam nosso dojo como atividade regular. Por trabalhar o corpo inteiro, o jiu-jitsu também é recomendado para emagrecer e aliviar o estresse.',
    '30代・40代で、運動不足解消やダイエットのために始めても遅くねぇかい？',
    '全く遅くねぇよ。うちの道場には20代から50代まで、大人の習い事として通ってる人も多いんさ。全身を動かすから、ダイエットやストレス発散にもおすすめだいね。'
  ],
  [
    '子供・小学生の習い事として、礼儀作法や運動神経を身につけられますか？',
    'はい、キッズクラスでは柔術の技術だけでなく、挨拶や礼儀作法も大切に指導しています。マット運動を通じて、あらゆるスポーツの土台となる基礎体力も自然と身につきます。',
    'Can children and elementary school students learn manners and develop coordination through these classes?',
    'Yes. In our kids classes, we teach not only jiu-jitsu techniques but also the importance of greetings and good manners. Mat exercises naturally help children develop the basic fitness that supports all kinds of sports.',
    'As aulas ajudam crianças e alunos do ensino fundamental a aprender boas maneiras e desenvolver a coordenação motora?',
    'Sim. Nas aulas infantis, ensinamos não apenas técnicas de jiu-jitsu, mas também valorizamos os cumprimentos e as boas maneiras. Os exercícios no tatame ajudam a desenvolver naturalmente a preparação física básica que serve de base para todos os esportes.',
    '子どもや小学生の習い事として、礼儀や運動神経も身につくかい？',
    'うん。キッズクラスでは柔術の技だけじゃなくて、あいさつや礼儀も大切に教えてるんさ。マット運動を通じて、いろんなスポーツの土台になる基礎体力も自然と身につくよ。'
  ],
  [
    '柔術を始めるには、最初に道着代など結構なお金がかかりますか？',
    '通常は道着が必要になりますが、体験時は動きやすい服装でご参加いただけます。道着の購入タイミングや選び方についても、入会時にわかりやすくご案内します。',
    'Does starting jiu-jitsu involve a large initial expense, such as buying a gi?',
    'A gi is normally required, but you can attend a trial in comfortable clothing that is easy to move in. When you join, we will clearly explain when to buy a gi and how to choose one.',
    'Para começar no jiu-jitsu, é preciso gastar bastante logo no início, por exemplo com um kimono?',
    'Normalmente é necessário um kimono, mas você pode participar da aula experimental com roupas confortáveis que permitam se movimentar. Ao se matricular, explicaremos de forma clara quando comprar o kimono e como escolhê-lo.',
    '柔術を始めるのに、最初から道着代なんかで結構お金がかかるんかい？',
    '普段は道着が必要だけど、体験のときは動きやすい服装で参加できるよ。道着を買う時期や選び方も、入会のときにわかりやすく案内するんさ。'
  ],
  [
    '女性でも安全に参加できますか？護身術としての効果はありますか？',
    'はい、女性の方も安心してご参加いただけます。柔術は力だけに頼らず、テコの原理や体の使い方で相手をコントロールする技術が中心のため、護身術としてもおすすめです。',
    'Can women participate safely? Is jiu-jitsu useful for self-defense?',
    'Yes, women can also participate with confidence. Jiu-jitsu focuses on controlling an opponent through leverage and body mechanics rather than strength alone, so we recommend it for self-defense as well.',
    'Mulheres podem participar com segurança? O jiu-jitsu é útil para defesa pessoal?',
    'Sim, as mulheres também podem participar com tranquilidade. O jiu-jitsu se concentra em controlar o adversário por meio de alavancas e do uso do corpo, sem depender apenas da força, por isso também é recomendado para defesa pessoal.',
    '女性でも安全に参加できるかい？護身術としても役に立つんかね？',
    'うん、女性も安心して参加できるよ。柔術は力だけに頼らず、テコの原理や体の使い方で相手をコントロールする技が中心だから、護身術としてもおすすめなんさ。'
  ],
  [
    '本庄市外から車で通えますか？駐車場はありますか？',
    'はい、無料駐車場を完備しております。本庄市内はもちろん、上里町、児玉町、神川町、美里町、深谷市、群馬県伊勢崎市などの近隣エリアからも通いやすい立地です。',
    'Can I drive to the dojo from outside Honjo? Is parking available?',
    'Yes, we provide free parking. Our location is convenient for people in Honjo and nearby areas such as Kamisato, Kodama, Kamikawa, Misato, Fukaya, and Isesaki in Gunma Prefecture.',
    'Posso ir de carro de fora de Honjo? Há estacionamento?',
    'Sim, contamos com estacionamento gratuito. A localização é conveniente tanto para quem mora em Honjo quanto em áreas próximas, como Kamisato, Kodama, Kamikawa, Misato, Fukaya e Isesaki, na província de Gunma.',
    '本庄市外から車で通えるかい？駐車場はあるんかね？',
    'うん、無料駐車場を用意してるよ。本庄市内はもちろん、上里町、児玉町、神川町、美里町、深谷市、群馬県伊勢崎市なんかの近くの地域からも通いやすい場所なんさ。'
  ],
  [
    '見学や無料体験は、本当に手ぶらで行っても平気ですか？',
    'はい、見学・無料体験ともにお気軽にお越しください。無料体験の方は、動きやすいTシャツや短パン、タオル、飲み物をお持ちいただければ安心です。',
    'Can I really come empty-handed for a visit or free trial?',
    'Yes, please feel free to come for a visit or free trial. For a free trial, bringing a comfortable T-shirt and shorts, a towel, and a drink will help you be prepared.',
    'Posso mesmo ir de mãos vazias para uma visita ou aula experimental gratuita?',
    'Sim, fique à vontade para vir conhecer o dojo ou fazer uma aula experimental gratuita. Para a aula experimental, é bom trazer camiseta e shorts confortáveis, uma toalha e uma bebida.',
    '見学や無料体験は、本当に手ぶらで行っても平気かい？',
    'うん、見学も無料体験も気軽に来てくんない。無料体験の人は、動きやすいTシャツや短パン、タオル、飲み物を持ってくれば安心だいね。'
  ]
];
export const faqByLocale = Object.fromEntries(['ja','en','pt','gunma'].map((locale,index)=>[
  locale, rows.map(row=>({question:row[index*2],answer:row[index*2+1]}))
]));

// Test-site copy. Each entry is [Japanese source, English, Brazilian Portuguese, Gunma dialect].
// Keep practical details (times, prices, safety, and the mock-form notice) identical across languages.
import { faqByLocale } from './faq-content.js';
export const localePaths = { ja: '', en: 'english', pt: 'portugues', gunma: 'gunma' };
export const localeNames = { ja: '日本語', en: 'English', pt: 'Português', gunma: '群馬弁' };
export const htmlLang = { ja: 'ja', en: 'en', pt: 'pt-BR', gunma: 'ja' };

const rows = [
  [
    "Over Limit 本庄 テスト版",
    "Over Limit Honjo (Test Site)",
    "Site de Demonstração Over Limit Honjo",
    "Over Limit 本庄 テスト版"
  ],
  [
    "Over Limit 本庄 ロゴ",
    "Over Limit Honjo Logo",
    "Logo Over Limit Honjo",
    "Over Limit 本庄 ロゴ"
  ],
  [
    "OVER LIMIT ロゴ1",
    "OVER LIMIT Logo 1",
    "Logo OVER LIMIT 1",
    "OVER LIMIT ロゴ1"
  ],
  [
    "OVER LIMIT ロゴ2",
    "OVER LIMIT Logo 2",
    "Logo OVER LIMIT 2",
    "OVER LIMIT ロゴ2"
  ],
  [
    "本文へ移動",
    "Skip to main content",
    "Ir para o conteúdo principal",
    "本文へ行くんさ"
  ],
  [
    "クラススケジュール",
    "Class Schedule",
    "Grade de Horários",
    "クラスの予定"
  ],
  [
    "料金",
    "Pricing",
    "Planos e Mensalidades",
    "料金システム"
  ],
  [
    "アクセス",
    "Access & Location",
    "Como Chegar",
    "アクセス"
  ],
  [
    "道場・施設",
    "Academy & Facilities",
    "Estrutura e Tatame",
    "道場・施設"
  ],
  [
    "インストラクター",
    "Instructors",
    "Professores",
    "先生の紹介"
  ],
  [
    "道場について",
    "About the Academy",
    "Sobre o Dojo",
    "道場のこと"
  ],
  [
    "お問い合わせ",
    "Contact Us",
    "Fale Conosco",
    "お問い合わせ"
  ],
  [
    "見学・体験予約",
    "Free Trial & Visit Booking",
    "Agende Aula Experimental / Visita",
    "見学・体験予約"
  ],
  [
    "クラスの流れ",
    "Class Structure",
    "Como Funciona a Aula",
    "クラスの流れ"
  ],
  [
    "よくある質問",
    "FAQ",
    "Dúvidas Frequentes",
    "よくある質問"
  ],
  [
    "柔術とは？",
    "What is Jiu-Jitsu?",
    "O que é Jiu-Jitsu?",
    "柔術って何なん？"
  ],
  [
    "無料 見学・体験予約",
    "Book a Free Trial or Visit",
    "Agende Visita ou Aula Experimental Gratuita",
    "無料 見学・体験予約"
  ],
  [
    "© Over Limit 本庄",
    "© Over Limit Honjo",
    "© Over Limit Honjo",
    "© Over Limit 本庄"
  ],
  [
    "本庄駅徒歩6分｜ブラジリアン柔術ジム Over Limit 本庄",
    "6-min walk from Honjo Station | Brazilian Jiu-Jitsu Gym Over Limit Honjo",
    "A 6 min a pé da estação de Honjo | Academia de Jiu-Jitsu Over Limit Honjo",
    "本庄駅徒歩6分｜ブラジリアン柔術ジム Over Limit 本庄"
  ],
  [
    "無料体験を予約する",
    "Book a Free Trial",
    "Agendar Aula Experimental Gratuita",
    "無料体験を予約する"
  ],
  [
    "本庄の柔術で、人生を豊かに。",
    "Enrich your life through Jiu-Jitsu in Honjo.",
    "Transforme sua vida com o Jiu-Jitsu em Honjo.",
    "本庄の柔術で、人生を豊かに。"
  ],
  [
    "本庄駅より徒歩6分",
    "6-minute walk from Honjo Station",
    "Apenas 6 minutos a pé da estação JR Honjo",
    "本庄駅から歩いて6分なんさ"
  ],
  [
    "見学・無料体験受付中",
    "Free Visits & Trials Welcome",
    "Visitas e Aulas Experimentais Gratuitas",
    "見学も無料体験も大歓迎だいね"
  ],
  [
    "無料駐車場あり",
    "Free Parking Available",
    "Estacionamento Gratuito no Local",
    "無料駐車場あるんさ"
  ],
  [
    "ブラジリアン柔術とは",
    "What is Brazilian Jiu-Jitsu?",
    "O que é o Jiu-Jitsu Brasileiro?",
    "ブラジリアン柔術って何なん？"
  ],
  [
    "ブラジリアン柔術は、パンチやキックなどの打撃を使わず、組み技を学ぶスポーツです。年齢や運動経験に合わせて、自分のペースで取り組めます。",
    "Brazilian Jiu-Jitsu is a sport in which you learn grappling without strikes such as punches or kicks. You can train at your own pace according to your age and exercise experience.",
    "O Jiu-Jitsu Brasileiro é uma arte marcial focada em técnicas de alavanca e luta de chão, sem socos nem chutes. Qualquer pessoa pode treinar no seu próprio ritmo, independentemente da idade ou experiência prévia.",
    "ブラジリアン柔術は、パンチやキックを使わねぇで組み技を学ぶスポーツなんさ。年齢や運動経験に合わせて、自分のペースで少しずつ取り組めるよ。"
  ],
  [
    "打撃のない組み技",
    "Ground Grappling (No Strikes)",
    "Luta Agarrada (Sem Golpes de Impacto)",
    "打撃のない組み技"
  ],
  [
    "パンチやキックなどの打撃はありませんが、接触を伴うため怪我の可能性はあります。体調に合わせて無理のないペースで取り組みましょう。",
    "There are no strikes such as punches or kicks, but physical contact still carries a risk of injury. Train at a pace that suits your condition.",
    "Não há golpes de impacto, como socos ou chutes, mas o contato físico ainda envolve risco de lesão. Treine em um ritmo adequado à sua condição.",
    "パンチやキックみてぇな打撃はねぇけど、体が触れ合うから怪我の可能性はあるんさ。体調に合わせて、無理のねぇペースで取り組んでくんない。"
  ],
  [
    "生涯スポーツ",
    "A Lifelong Sport for All Ages",
    "Esporte para Toda a Vida",
    "何歳でも続けられる生涯スポーツ"
  ],
  [
    "年齢や体格に関係なく、力加減を調整しながら練習可能。20代〜50代以降の大人の習い事として長く続けられます。",
    "You can adjust your effort as you train, regardless of age or build. Adults in their 20s through 50s and beyond can continue jiu-jitsu as a long-term hobby.",
    "A intensidade do treino é adaptada à sua idade e condicionamento físico. Homens e mulheres dos 20 aos 50 anos ou mais treinam e evoluem de forma prazerosa e contínua.",
    "年齢や体格に合わせて力加減ができるから、20代から50代、60代の大人の習い事としてなっから長く楽しめるんさね。"
  ],
  [
    "体を使ったチェス",
    "Human Chess (Intellectual Martial Art)",
    "Xadrez Humano (Arte Suave Inteligente)",
    "体を使うチェスみてぇなもんさ"
  ],
  [
    "戦略的で知的な格闘技。力任せではなく技のロジックで競うため、世界中のビジネスパーソンにも愛好者が広がっています。",
    "A cerebral martial art often called human chess. Because leverage and technical logic triumph over brute force, it has become deeply popular among professionals and entrepreneurs worldwide.",
    "Mais técnica que força bruta. Conhecido como o xadrez humano, vence quem usa a inteligência e a mecânica das alavancas, atraindo executivos e profissionais no mundo inteiro.",
    "力任せじゃなくて技の理屈で勝負するんさ。頭脳戦が面白いから、世界中のビジネスマンにもなっから人気があるんだいね。"
  ],
  [
    "女性も安心して始めやすい",
    "A Welcoming Start for Women",
    "Um Começo Acolhedor para Mulheres",
    "女性も安心して始められるんさ"
  ],
  [
    "力だけに頼らず、体の使い方を学びます。運動不足解消を目的に始めたい方も、参加するクラスや練習についてフォームやLINEでご相談ください。",
    "Learn how to use your body without relying on strength alone. If you want to start exercising more, ask us about classes and training via the form or LINE.",
    "Aprenda a usar o corpo sem depender apenas da força. Se você quer sair do sedentarismo, tire suas dúvidas sobre as aulas e os treinos pelo formulário ou LINE.",
    "力だけに頼らず、体の使い方を学ぶんさ。運動不足を解消したくて始める人も、参加するクラスや練習のことをフォームかLINEで相談してくんない。"
  ],
  [
    "子供の習い事に最適",
    "Ideal for Kids’ Growth",
    "Excelente para o Desenvolvimento Infantil",
    "子どもの習い事にもぴったりなんさ"
  ],
  [
    "礼儀作法や挨拶を身につけながら、基礎体力と運動神経を自然に養います。本庄市で子供の習い事をお探しの方にもおすすめです。",
    "Children learn proper etiquette and respect while naturally developing motor skills and confidence. Highly recommended for parents seeking quality youth activities in Honjo.",
    "Desenvolve respeito, disciplina e postura enquanto aprimora a coordenação motora e a saúde. Uma das melhores atividades extracurriculares infantis em Honjo.",
    "あいさつや礼儀作法も身につくし、基礎体力や運動神経も自然と育つんさ。本庄や近所で子どもの習い事を探してるなら、ぜひ見に来てくんない。"
  ],
  [
    "インストラクター紹介",
    "Meet Our Head Instructor",
    "Conheça o Nosso Professor",
    "先生を紹介するんさ"
  ],
  [
    "黒帯3段/3rd Degree Black Belt",
    "3rd Degree Black Belt",
    "Faixa-Preta 3º Grau",
    "黒帯3段 / 3rd Degree Black Belt"
  ],
  [
    "田代 セイイチ",
    "Seiichi Tashiro",
    "Seiichi Tashiro",
    "田代 セイイチ"
  ],
  [
    "主な経歴・実績",
    "Major Achievements & Titles",
    "Principais Títulos e Conquistas",
    "主な経歴・実績"
  ],
  [
    "2026, 2025 SJJF WORLD Championship 優勝",
    "SJJF World Champion (2025, 2026)",
    "Campeão Mundial SJJF (2025, 2026)",
    "2026・2025 SJJF世界大会 優勝"
  ],
  [
    "JBJJF ALL Japan Master 2回優勝",
    "Two-Time JBJJF All Japan Master Champion",
    "Bicampeão do JBJJF All Japan Master",
    "JBJJF全日本マスター 2回優勝"
  ],
  [
    "IBJJF Asian Championship 3回優勝",
    "Three-Time IBJJF Asian Champion",
    "Tricampeão do Campeonato Asiático da IBJJF",
    "IBJJFアジア選手権 3回優勝"
  ],
  [
    "2015 IBJJF WORLD MASTER 3位",
    "3rd Place, 2015 IBJJF World Master",
    "3º Lugar no IBJJF World Master de 2015",
    "2015 IBJJFワールドマスター 3位"
  ],
  [
    "代表メッセージ",
    "Message from Head Instructor",
    "Mensagem do Professor",
    "代表からのメッセージなんさ"
  ],
  [
    "私はブラジリアン柔術を始める前までは特に目標や趣味もなく、仕事を終えた後は毎日だらだらと過ごしていました。しかし柔術と出会ってから人生が大きく変わりました。今では立派な生徒たちに囲まれながら柔術を指導しています。",
    "Before I began Brazilian Jiu-Jitsu, I had no particular goals or hobbies and spent my evenings idly after work. Meeting jiu-jitsu changed my life greatly. Today, I teach jiu-jitsu surrounded by wonderful students.",
    "Antes de começar no Jiu-Jitsu Brasileiro, eu não tinha objetivos ou hobbies em particular e passava o tempo sem fazer muita coisa depois do trabalho. Conhecer o jiu-jitsu mudou muito a minha vida. Hoje ensino jiu-jitsu cercado por ótimos alunos.",
    "私はブラジリアン柔術を始める前は特に目標も趣味もなくて、仕事が終わったら毎日だらだら過ごしてたんさ。でも柔術に出会ってから人生が大きく変わったんさね。いまは立派な生徒たちに囲まれながら柔術を教えてるんさ。"
  ],
  [
    "柔術を始めてダイエットに成功したり、自信がついて日々の生活が前向きになったりします。格闘技は人生を豊かにすることができます。この素晴らしい体験を地域の皆さんにも共有したいです。",
    "Some people lose weight through jiu-jitsu, gain confidence and become more positive about everyday life. Martial arts can enrich our lives. I want to share this wonderful experience with everyone in our community.",
    "Com o jiu-jitsu, há quem consiga emagrecer, ganhar confiança e encarar o dia a dia de forma mais positiva. As artes marciais podem enriquecer a vida. Quero compartilhar essa experiência maravilhosa com as pessoas da nossa comunidade.",
    "柔術を始めてダイエットに成功したり、自信がついて毎日の暮らしに前向きになったりするんさ。格闘技は人生を豊かにできるんだいね。この素晴らしい体験を、地域のみなさんにも伝えたいんさ。"
  ],
  [
    "準備・マット運動",
    "Warm-up & Mat Drills",
    "Aquecimento e Fundamentos de Tatame",
    "準備体操とマット運動"
  ],
  [
    "「受け身」「エビ」など怪我を予防し、寝技に直結する基本動作を練習。未経験でも無理なく身体のバランス感覚を養えます。",
    "Practice essential movements like breakfalls (Ukemi) and hip escapes (Shrimping) to prevent injuries. Even complete beginners easily develop balance and body awareness.",
    "Pratique movimentos básicos, como quedas (ukemi) e fuga de quadril, que ajudam a prevenir lesões e são usados na luta de chão. Mesmo iniciantes podem desenvolver o equilíbrio corporal sem forçar o próprio ritmo.",
    "「受け身」や「エビ」みてぇな、怪我を防いで寝技に直結する基本の動きをやるんさ。初めての人でも無理なく体のバランス感覚が身につくよ。"
  ],
  [
    "テクニック練習",
    "Technique Practice",
    "Treino Técnico e Posições",
    "技の練習"
  ],
  [
    "インストラクターの解説を見た後、2人1組で反復。先輩メンバーも優しくフォローするので初心者も安心して学べます。",
    "Watch detailed technique demonstrations by the instructor, then drill repeatedly in pairs. Senior members are always ready to guide you kindly.",
    "Aprenda cada detalhe demonstrado pelo professor e pratique em duplas. Os alunos mais graduados auxiliam com paciência para que você aprenda com tranquilidade.",
    "先生のお手本をよく見たら、二人一組で繰り返し練習するんさ。先輩たちも優しくフォローしてくれるから心配いらねぇ、世話ねぇよ。"
  ],
  [
    "実践スパーリング",
    "Controlled Sparring (Rolling)",
    "Rola (Treino Prático Guiado)",
    "実践スパーリング"
  ],
  [
    "学んだ技を試す実践練習。力任せではなく技の駆け引きが楽しく、初心者のうちは相手が手加減して動きを合わせてくれます。",
    "Put your techniques to the test in live practice (rolling). The joy comes from strategy and timing rather than brute force. Partners carefully match your level.",
    "Coloque em prática o que aprendeu. A graça do rola está no raciocínio e no tempo das posições, não na força. Para iniciantes, o ritmo é suave e controlado.",
    "覚えた技を相手と試してみる練習さ。力比べじゃなくて技の駆け引きがなっから面白いんさね。初めのうちは相手がペースを合わせてくれるから安心しな。"
  ],
  [
    "料金システム",
    "Membership Plans",
    "Planos e Mensalidades",
    "料金システム"
  ],
  [
    "柔術を始めたい方へ通いやすいプランをご用意しています。",
    "We offer flexible and transparent membership options to suit your lifestyle.",
    "Oferecemos planos acessíveis e transparentes para a sua rotina de treinos.",
    "通い方に合わせて選べるプランを用意してるんさ。"
  ],
  [
    "男性会員",
    "Men’s Full Membership",
    "Plano Masculino (Adulto)",
    "男性会員"
  ],
  [
    "/月 (税込)",
    "/ mo (tax incl.)",
    "/ mês (impostos inclusos)",
    "/月 (税込)"
  ],
  [
    "通い放題（全クラス参加可能）",
    "Unlimited access to all scheduled classes",
    "Acesso ilimitado a todas as aulas da grade",
    "通い放題（全クラス出られるんさ）"
  ],
  [
    "スパーリング・フリースパー参加可",
    "Sparring and Open Mat included",
    "Acesso livre aos rolas e treinos livres",
    "スパーリングもフリースパーも参加できるんさ"
  ],
  [
    "すべての設備が使い放題",
    "Full access to all academy facilities",
    "Uso livre de toda a infraestrutura da academia",
    "すべての設備が使い放題だいね"
  ],
  [
    "女性・中高生会員",
    "Women / Junior & Senior High School Students",
    "Mulheres / Alunos do Ensino Ginasial e Médio (chūgakkō e kōkō)",
    "女性・中高生会員"
  ],
  [
    "女性や学生も安心して通える環境",
    "A welcoming, clean, and safe environment for women & students",
    "Ambiente respeitoso, limpo e acolhedor para mulheres e estudantes",
    "女性や学生さんも安心して通える環境だいね"
  ],
  [
    "キッズ会員",
    "Kids Membership",
    "Plano Infantil (Kids)",
    "キッズ会員"
  ],
  [
    "(小学1〜6年生)",
    "(Grades 1–6)",
    "(1º ao 6º ano do fundamental)",
    "(小学1〜6年生)"
  ],
  [
    "キッズクラス参加可能",
    "Access to all dedicated Kids Jiu-Jitsu classes",
    "Acesso a todas as aulas da turma infantil",
    "キッズクラスに参加できるんさ"
  ],
  [
    "礼儀作法や基礎体力の向上",
    "Build polite manners, focus, and fundamental fitness",
    "Desenvolve respeito, disciplina, equilíbrio e vigor físico",
    "あいさつ・礼儀作法と基礎体力の向上"
  ],
  [
    "楽しく安全に柔術を学べます",
    "Learn martial arts safely with engaging, supportive instruction",
    "Metodologia lúdica, segura e motivadora para crianças",
    "楽しく安全に柔術を学べるよ"
  ],
  [
    "ビジター",
    "Drop-in Visitor",
    "Visitante (Aula Avulsa)",
    "ビジター"
  ],
  [
    "(1回利用)",
    "(Single Session)",
    "(Por aula)",
    "(1回利用)"
  ],
  [
    "/回 (税込)",
    "/ session (tax incl.)",
    "/ aula (impostos inclusos)",
    "/回 (税込)"
  ],
  [
    "1回のみのスポット利用",
    "Single-class drop-in training",
    "Acesso pontual para uma sessão de treino",
    "1回のみのスポット利用"
  ],
  [
    "出張や旅行中の練習に",
    "Perfect for travelers & martial artists visiting Honjo",
    "Ideal para quem está a negócios ou viajando por Honjo",
    "出張や旅行の途中の練習にもってこいなんさ"
  ],
  [
    "当日お支払い",
    "Pay conveniently on the day",
    "Pagamento simplificado no dia do treino",
    "当日その場で支払えるんさ"
  ],
  [
    "入会金無料",
    "No Enrollment Fee (¥0)",
    "Matrícula 100% Grátis",
    "入会金は無料だいね！"
  ],
  [
    "スケジュール",
    "Weekly Timetable",
    "Grade Semanal de Aulas",
    "週間スケジュール"
  ],
  [
    "オールレベル",
    "All Levels",
    "Todos os Níveis",
    "全レベル"
  ],
  [
    "ビギナー",
    "Beginner",
    "Iniciantes",
    "ビギナー (初心者)"
  ],
  [
    "キッズ",
    "Kids",
    "Kids (Infantil)",
    "キッズ"
  ],
  [
    "NOGI (道着なし)",
    "No-Gi (Without Gi)",
    "No-Gi (Sem Kimono)",
    "NOGI (道着なし)"
  ],
  [
    "← 横にスクロールしてご覧いただけます →",
    "← Scroll horizontally to see full week →",
    "← Deslize lateralmente para ver todos os dias →",
    "← 横にスクロールして見てくんない →"
  ],
  [
    "月 (MON)",
    "Mon",
    "Seg",
    "月曜 (MON)"
  ],
  [
    "火 (TUE)",
    "Tue",
    "Ter",
    "火曜 (TUE)"
  ],
  [
    "水 (WED)",
    "Wed",
    "Qua",
    "水曜 (WED)"
  ],
  [
    "木 (THU)",
    "Thu",
    "Qui",
    "木曜 (THU)"
  ],
  [
    "金 (FRI)",
    "Fri",
    "Sex",
    "金曜 (FRI)"
  ],
  [
    "土 (SAT)",
    "Sat",
    "Sáb",
    "土曜 (SAT)"
  ],
  [
    "日 (SUN)",
    "Sun",
    "Dom",
    "日曜 (SUN)"
  ],
  [
    "休館日",
    "Closed",
    "Fechado",
    "お休み"
  ],
  [
    "ビギナー柔術",
    "Beginner Jiu-Jitsu",
    "Jiu-Jitsu Iniciantes",
    "ビギナー柔術"
  ],
  [
    "キッズ柔術",
    "Kids Jiu-Jitsu",
    "Jiu-Jitsu Infantil",
    "キッズ柔術"
  ],
  [
    "※ 祝日や試合等により変更となる場合がございます。最新の休館情報は",
    "Note: Schedule may change on public holidays or tournament days. Check our",
    "Avisos: Horários sujeitos a alterações em feriados ou competições. Confira nosso",
    "※ 祝日や試合などで変更になる場合があるんさ。最新のお休み情報は"
  ],
  [
    "をご確認ください。",
    "for latest updates.",
    "para conferir as informações mais recentes.",
    "を見てくんないね。"
  ],
  [
    "施設案内",
    "Academy Tour",
    "Nossa Academia",
    "施設案内"
  ],
  [
    "閉じる ×",
    "Close ×",
    "Fechar ×",
    "閉じる ×"
  ],
  [
    "埼玉県本庄市けや木1丁目1-16",
    "1-1-16 Keyaki, Honjo, Saitama, Japan",
    "1-1-16 Keyaki, Honjo, Saitama, Japão",
    "埼玉県本庄市けや木1丁目1-16"
  ],
  [
    "JR高崎線「本庄」駅北口より徒歩6分",
    "6-min walk from North Exit of JR Honjo Station",
    "A 6 minutos a pé da saída norte da estação JR Honjo",
    "JR高崎線「本庄駅」北口からあるって6分なんさ"
  ],
  [
    "Google Mapsで開く",
    "Open in Google Maps",
    "Abrir no Google Maps",
    "Googleマップで開く"
  ],
  [
    "まずは無料体験から",
    "Start with a Free Trial",
    "Comece com uma Aula Experimental Gratuita",
    "まずは無料体験から"
  ],
  [
    "始めてみませんか？",
    "Ready to get started?",
    "Que tal dar o primeiro passo?",
    "始めてみねぇかい？"
  ],
  [
    "見学・体験ともに無料です。お気軽にお問い合わせください。",
    "Both visits and trial classes are completely free. Feel free to contact us anytime.",
    "Tanto a visita quanto a aula experimental são gratuitas. Fale conosco a qualquer momento.",
    "見学も体験も全部無料なんさ。気軽に連絡してくんないね。"
  ],
  [
    "体験には動きやすい服装・タオル・飲み物をご用意ください。日程未定でもご相談いただけます。",
    "For your trial, just bring workout clothes, a towel, and water. You are welcome to consult with us even before deciding on a date.",
    "Para a aula, traga roupa de treino confortável, toalha e água. Você pode tirar dúvidas mesmo sem definir a data exata.",
    "体験には動きやすいジャージ、タオル、飲み物を持ってきてくんない。日にちが決まってなくても相談できるよ。"
  ],
  [
    "LINEで相談する",
    "Chat with Us on LINE",
    "Fale Conosco pelo LINE",
    "LINEで相談する"
  ],
  [
    "© Over Limit 本庄. All rights reserved.",
    "© Over Limit Honjo. All rights reserved.",
    "© Over Limit Honjo. Todos os direitos reservados.",
    "© Over Limit 本庄. All rights reserved."
  ],
  [
    "LINE相談はこちら",
    "Chat on LINE",
    "Fale pelo LINE",
    "LINE相談はこちら"
  ],
  [
    "無料体験はこちら",
    "Free Trial",
    "Aula Grátis",
    "無料体験はこちら"
  ],
  [
    "無料体験・見学の相談",
    "Trial & Visit Consultation",
    "Consulta para Visita ou Aula Experimental",
    "無料体験・見学の相談"
  ],
  [
    "見学・無料体験のご予約、入会に関するご質問など、",
    "For free trial reservations, visits, or membership questions,",
    "Para agendamentos de visita, aulas experimentais ou dúvidas sobre matrícula,",
    "見学や無料体験、入会の質問など、"
  ],
  [
    "お気軽にお問い合わせください。",
    "feel free to get in touch with us anytime.",
    "fale conosco com toda a tranquilidade.",
    "気軽に何でも聞いてみてくんない。"
  ],
  [
    "テストフォーム",
    "Demo Form",
    "Formulário de Demonstração",
    "お試しフォーム"
  ],
  [
    "この画面では実際の送信・予約は行いません。個人情報ではなく、架空の情報でお試しください。",
    "This is a preview demo form. No real submission will occur. Please test with dummy data rather than personal information.",
    "Este é um formulário de demonstração. Nenhuma mensagem real será enviada. Use dados fictícios para testar a interface.",
    "これはお試し用のフォームなんさ。実際には送信されないから、架空の情報で試してみてくんない。"
  ],
  [
    "お名前",
    "Full Name",
    "Nome Completo",
    "お名前"
  ],
  [
    "必須",
    "Required",
    "Obrigatório",
    "必須"
  ],
  [
    "メールアドレス",
    "Email Address",
    "E-mail",
    "メールアドレス"
  ],
  [
    "電話番号（任意）",
    "Phone Number (Optional)",
    "Telefone / Celular (Opcional)",
    "電話番号（任意）"
  ],
  [
    "お問い合わせ項目",
    "Inquiry Topic",
    "Assunto",
    "お問い合わせ内容"
  ],
  [
    "無料体験の相談",
    "Free Trial Inquiry",
    "Aula Experimental Gratuita",
    "無料体験の相談"
  ],
  [
    "見学の相談",
    "Academy Visit Inquiry",
    "Visita à Academia",
    "見学の相談"
  ],
  [
    "入会に関する相談",
    "Membership & Fees Inquiry",
    "Dúvidas sobre Matrícula",
    "入会の相談"
  ],
  [
    "その他",
    "Other Inquiries",
    "Outro Assunto",
    "その他"
  ],
  [
    "体験・見学のご希望（任意）",
    "Preferences for Trial or Visit (Optional)",
    "Preferências da Aula ou Visita (Opcional)",
    "体験・見学の希望（任意）"
  ],
  [
    "日程未定のままでもご相談いただけます。希望日の入力だけでは予約は確定しません。",
    "Feel free to consult without a fixed date. Submitting a preferred date does not finalize a booking.",
    "Você pode tirar dúvidas sem definir a data. Preencher a data aqui não confirma automaticamente o horário.",
    "日にちが決まってなくても大丈夫だいね。希望日を入れただけじゃまだ予約にはならないんさ。"
  ],
  [
    "希望日（任意）",
    "Preferred Date (Optional)",
    "Data Preferida (Opcional)",
    "希望日（任意）"
  ],
  [
    "参加区分（任意）",
    "Participant Category (Optional)",
    "Categoria do Participante (Opcional)",
    "参加区分（任意）"
  ],
  [
    "未定・相談したい",
    "Undecided / Ask us",
    "A definir / Consultar",
    "まだ未定・相談したい"
  ],
  [
    "大人",
    "Adult",
    "Adulto",
    "大人"
  ],
  [
    "中高生",
    "Junior / Senior High",
    "Ginasial / Médio (Japão)",
    "中高生"
  ],
  [
    "キッズ（小学1〜6年生）",
    "Kids (Grades 1–6)",
    "Crianças (1º–6º ano)",
    "キッズ（小学1〜6年生）"
  ],
  [
    "ご質問・補足（任意）",
    "Questions / Comments (Optional)",
    "Mensagem ou Dúvidas (Opcional)",
    "質問や伝えておきたいこと（任意）"
  ],
  [
    "テスト結果",
    "Demo Action",
    "Ação do Teste",
    "お試し動作"
  ],
  [
    "成功表示を試す",
    "Simulate success",
    "Simular sucesso",
    "成功表示を試す"
  ],
  [
    "失敗表示を試す",
    "Simulate failure",
    "Simular falha",
    "失敗表示を試す"
  ],
  [
    "入力を確認してテストする",
    "Validate and Test Form",
    "Conferir Dados e Testar",
    "入力を確認して試す"
  ],
  [
    "入力内容は送信・保存しません。実際のお申し込みではありません。",
    "Entered data is not stored or transmitted. This is solely for demonstration purposes.",
    "Os dados digitados não são salvos nem transmitidos. Trata-se de uma tela de teste.",
    "入力した内容はどこにも送られないから安心しな。実際の申し込みにはならないよ。"
  ],
  [
    "LINEでのお問い合わせ",
    "Inquiries via LINE",
    "Contato via LINE",
    "LINEでのお問い合わせ"
  ],
  [
    "LINEでも見学・体験のご予約を受け付けております。",
    "We also happily accept visit and trial reservations through our official LINE.",
    "Também atendemos e agendamos aulas experimentais diretamente pelo LINE.",
    "LINEでも見学や体験の予約を受け付けてるんさ。"
  ],
  [
    "LINEリンクは実際の相談先につながります。テスト確認中はメッセージを送らないでください。",
    "The LINE button connects to our official live account. Please refrain from sending test messages during preview.",
    "O botão do LINE direciona para a conta oficial do dojo. Evite enviar mensagens de teste por lá.",
    "LINEのボタンを押すと本物の道場アカウントにつながるから、テスト中は送らないでくんないね。"
  ],
  [
    "希望する時間帯、運動経験、気になることなど。体験・見学は空欄でも進めます。",
    "Tell us your preferred hours, fitness background, or questions. You may leave this blank.",
    "Conte seu horário preferido, histórico esportivo ou dúvidas. Pode deixar em branco se preferir.",
    "希望の時間帯や運動経験、不安なことなど。空欄のままでも全然世話ねぇよ。"
  ],
  [
    "メールアドレスを正しい形式で入力してください。",
    "Please enter a valid email address.",
    "Por favor, insira um endereço de e-mail válido.",
    "メールアドレスを正しい形で入れてくんない。"
  ],
  [
    "この項目を入力してください。",
    "Please complete this required field.",
    "Por favor, preencha este campo obrigatório.",
    "この項目を入れてくんないね。"
  ],
  [
    "入力に誤りがあります。表示された項目をご確認ください。送信は行っていません。",
    "There are errors in the form. Please check highlighted fields. Nothing has been sent.",
    "Existem campos incompletos ou incorretos. Confira os destaques. Nada foi enviado.",
    "入力に直すとこがあるみたいさ。印がついた項目を確かめてくんない。送信はしてねぇよ。"
  ],
  [
    "テスト：送信失敗時の表示です。入力はこの画面に残っています。実際の送信・予約は行っていません。",
    "Demo: This simulates a failed submission. Your input remains on this screen. No message was sent and no reservation was made.",
    "Teste: exibição de uma falha de envio. Os dados permanecem nesta tela. Nenhuma mensagem foi enviada e nenhuma reserva foi feita.",
    "お試し：送信失敗のときの表示なんさ。入力はこの画面に残ってるよ。送信や予約はしてねぇよ。"
  ],
  [
    "テスト：成功時の表示です。入力確認が完了しました。実際の送信・受信・予約は行っていません。",
    "Demo: This simulates success after checking input. No message was sent or received and no reservation was made.",
    "Teste: exibição de sucesso após conferir os dados. Nenhuma mensagem foi enviada ou recebida e nenhuma reserva foi feita.",
    "お試し：送信成功のときの表示なんさ！入力確認できたよ。実際の送信や予約はしてねぇよ。"
  ],
  [
    "JavaScriptが無効のためモック動作は利用できません。入力内容は送信されません。",
    "JavaScript is disabled. Interactive mock features are unavailable. No data is sent.",
    "JavaScript desativado. As funções de teste interativo não estão disponíveis. Nada será enviado.",
    "JavaScriptが無効だからお試しは動かねぇよ。入力内容は送られないんさ。"
  ],
  [
    "本庄市のブラジリアン柔術ジム｜Over Limit 本庄【テスト版】",
    "Brazilian Jiu-Jitsu in Honjo | Over Limit Honjo (Test Edition)",
    "Jiu-Jitsu Brasileiro em Honjo | Over Limit Honjo (Versão Demonstração)",
    "本庄の柔術道場｜Over Limit 本庄【テスト版】"
  ],
  [
    "無料体験・見学の相談｜Over Limit 本庄【テスト版】",
    "Free Trial & Visit Enquiries | Over Limit Honjo (Test Edition)",
    "Consulta sobre Aula Experimental / Contato | Over Limit Honjo (Versão de Teste)",
    "無料体験・見学の相談｜Over Limit 本庄【テスト版】"
  ],
  [
    "Over Limit 本庄 トップへ",
    "Over Limit Honjo Home",
    "Página Inicial Over Limit Honjo",
    "Over Limit 本庄 トップへ"
  ],
  [
    "メインメニュー",
    "Main Menu",
    "Menu Principal",
    "メインメニュー"
  ],
  [
    "メニューを開く",
    "Open Menu",
    "Abrir Menu",
    "メニューを開く"
  ],
  [
    "サイトメニュー",
    "Site Menu",
    "Menu do Site",
    "サイトメニュー"
  ],
  [
    "メニューを閉じる",
    "Close Menu",
    "Fechar Menu",
    "メニューを閉じる"
  ],
  [
    "サイト内案内",
    "Site Navigation",
    "Navegação do Site",
    "サイト内案内"
  ],
  [
    "その他の案内",
    "Additional Links",
    "Outros Links",
    "その他の案内"
  ],
  [
    "言語を選択",
    "Choose Language",
    "Escolher Idioma",
    "言葉を選ぶ"
  ],
  [
    "言語",
    "Language",
    "Idioma",
    "言葉"
  ],
  [
    "道場での練習映像",
    "Academy Training Video",
    "Vídeo de Treino no Tatame",
    "道場での練習動画"
  ],
  [
    "映像を再生",
    "Play Video",
    "Reproduzir Vídeo",
    "動画を再生"
  ],
  [
    "映像を停止",
    "Pause Video",
    "Pausar Vídeo",
    "動画を停止"
  ],
  [
    "本庄市のブラジリアン柔術 組み技を学ぶ練習風景",
    "Brazilian Jiu-Jitsu ground technique practice in Honjo",
    "Treino de técnicas de chão do Jiu-Jitsu Brasileiro em Honjo",
    "本庄での柔術練習風景"
  ],
  [
    "20代から50代まで何歳からでも始められる生涯スポーツ",
    "A lifelong sport enjoyable from 20s to 50s and beyond",
    "Esporte para todas as idades, dos 20 aos 50 anos ou mais",
    "何歳からでも始められる生涯スポーツなんさ"
  ],
  [
    "体を使ったチェスと呼ばれる知的な格闘技ブラジリアン柔術",
    "Brazilian Jiu-Jitsu, the intellectual martial art known as human chess",
    "Jiu-Jitsu Brasileiro, a arte suave estratégica conhecida como xadrez humano",
    "体を使ったチェスみてぇな知的な格闘技なんさ"
  ],
  [
    "女性の護身術・ダイエット・運動不足解消に最適な柔術",
    "Jiu-Jitsu for women: self-defense, fitness, and lifestyle wellness",
    "Jiu-Jitsu feminino: defesa pessoal, saúde e boa forma",
    "女性も安心して楽しめる柔術なんさ"
  ],
  [
    "礼儀作法と運動神経を養う本庄市のキッズ柔術クラス",
    "Kids Jiu-Jitsu class building courtesy, motor skills, and confidence",
    "Turma infantil de Jiu-Jitsu: disciplina, coordenação motora e respeito",
    "本庄のキッズ柔術クラス"
  ],
  [
    "Over Limit 本庄 代表インストラクター 田代セイイチ（ブラジリアン柔術黒帯3段・世界大会王者）",
    "Head Instructor Seiichi Tashiro, 3rd Degree Black Belt & World Champion",
    "Professor Seiichi Tashiro, Faixa-Preta 3º Grau e Campeão Mundial",
    "代表インストラクター 田代セイイチ（黒帯3段・世界大会王者）"
  ],
  [
    "3段黒帯 (3本のストライプ)",
    "3rd Degree Black Belt (Three Stripes)",
    "Faixa-Preta 3º Grau (Três Listras)",
    "3段黒帯 (3本のストライプ)"
  ],
  [
    "柔術クラスの流れ STEP1 準備体操・受身・マット運動",
    "Class Step 1: Warm-up, Breakfalls & Ground Drills",
    "Etapa 1: Aquecimento, Rolamentos e Fundamentos",
    "クラスSTEP1：準備体操・受身・マット運動"
  ],
  [
    "柔術クラスの流れ STEP2 テクニック解説とペアでの反復練習",
    "Class Step 2: Technique Breakdown & Partner Drilling",
    "Etapa 2: Demonstração Técnica e Repetições em Dupla",
    "クラスSTEP2：技の解説と二人組での練習"
  ],
  [
    "柔術クラスの流れ STEP3 初心者も安心の実践スパーリング練習",
    "Class Step 3: Beginner-Friendly Controlled Rolling",
    "Etapa 3: Rola Guiado e Seguro para Iniciantes",
    "クラスSTEP3：安心の実践スパーリング"
  ],
  [
    "週間スケジュール。横スクロールできます",
    "Weekly schedule. Scroll horizontally.",
    "Grade semanal. Deslize para os lados.",
    "週間スケジュール。横にスクロールできるんさ。"
  ],
  [
    "週間クラススケジュール",
    "Weekly Class Schedule",
    "Grade Semanal de Aulas",
    "週間クラススケジュール"
  ],
  [
    "道場マットスペースの写真を拡大",
    "Enlarge mat space photo",
    "Ampliar foto do tatame",
    "マットスペースの写真を拡大"
  ],
  [
    "Over Limit 本庄の清潔で広々とした柔術専用マットスペース",
    "Clean, spacious professional Jiu-Jitsu mats at Over Limit Honjo",
    "Tatame amplo, higienizado e profissional da Over Limit Honjo",
    "Over Limit 本庄の広々とした柔術専用マット"
  ],
  [
    "道場練習環境の写真を拡大",
    "Enlarge training area photo",
    "Ampliar foto da área de treino",
    "練習場所の写真を拡大"
  ],
  [
    "本庄市の道場内 衝撃吸収に優れた安全な練習用フロアマット",
    "Shock-absorbing safety mats inside the Honjo academy",
    "Tatames de alta absorção de impacto para treinos seguros",
    "衝撃吸収に優れた安全な練習用マット"
  ],
  [
    "施設設備の写真を拡大",
    "Enlarge facilities photo",
    "Ampliar foto das instalações",
    "施設設備の写真を拡大"
  ],
  [
    "更衣室・待機スペースを備えた本庄市の柔術ジム設備",
    "Changing rooms and viewing space at the Honjo academy",
    "Vestiários e área de descanso da academia em Honjo",
    "更衣室と待機スペース"
  ],
  [
    "道場内観の写真を拡大",
    "Enlarge interior photo",
    "Ampliar foto do interior da academia",
    "道場内の写真を拡大"
  ],
  [
    "明るく快適に通いやすい道場内の練習環境",
    "Bright, comfortable, and welcoming academy interior",
    "Ambiente iluminado, agradável e acolhedor",
    "明るくて通いやすい道場内の環境"
  ],
  [
    "マットフロアの写真を拡大",
    "Enlarge mat floor photo",
    "Ampliar foto do tatame",
    "マットの写真を拡大"
  ],
  [
    "初心者やキッズも安心して運動できる柔術マット",
    "Jiu-jitsu mats for beginners and children",
    "Tatames de jiu-jitsu para iniciantes e crianças",
    "初心者や子どもも安心して動けるマット"
  ],
  [
    "道場内設備の写真を拡大",
    "Enlarge equipment photo",
    "Ampliar foto dos equipamentos",
    "道場設備の写真を拡大"
  ],
  [
    "道場内の充実したトレーニング設備と清潔な空間",
    "Well-equipped training facilities in a spotless space",
    "Estrutura completa e ambiente limpo para o seu treino",
    "清潔な空間と充実したトレーニング設備"
  ],
  [
    "壁面安全マットの写真を拡大",
    "Enlarge wall padding photo",
    "Ampliar foto das proteções de parede",
    "壁の安全マットを拡大"
  ],
  [
    "怪我予防に配慮された壁面クッション・セーフティガード",
    "Protective wall padding designed to help prevent injuries",
    "Proteções acolchoadas nas paredes para ajudar a prevenir lesões",
    "怪我を防ぐための壁面クッションガード"
  ],
  [
    "道場全体風景の写真を拡大",
    "Enlarge full view photo",
    "Ampliar foto geral da academia",
    "道場全体の写真を拡大"
  ],
  [
    "本庄駅徒歩6分 Over Limit 本庄 道場内の全体風景",
    "Full panoramic view inside Over Limit Honjo, 6 min from Honjo Station",
    "Visão panorâmica da Over Limit Honjo, a 6 min da estação",
    "本庄駅から歩いて6分の道場全体の風景"
  ],
  [
    "施設写真の拡大表示",
    "Enlarged facility photo preview",
    "Visualização ampliada da foto da academia",
    "施設写真の拡大表示"
  ],
  [
    "拡大写真を閉じる",
    "Close photo preview",
    "Fechar visualização ampliada",
    "拡大写真を閉じる"
  ],
  [
    "拡大写真",
    "Enlarged Photo",
    "Foto Ampliada",
    "拡大写真"
  ],
  [
    "Over Limit 本庄の所在地",
    "Location of Over Limit Honjo",
    "Localização da Over Limit Honjo",
    "Over Limit 本庄の所在地"
  ],
  [
    "予約・お問い合わせ固定バー",
    "Fixed Booking & Contact Bar",
    "Barra Fixa de Contato e Agendamento",
    "予約・お問い合わせの固定バー"
  ],
  [
    "本庄市の柔術道場 Over Limit 本庄。クラス・料金・週間スケジュールをご案内。体験には動きやすい服装・タオル・飲み物をご用意ください。日程未定でも相談できます。",
    "Brazilian Jiu-Jitsu academy Over Limit Honjo. Explore our classes, pricing, and timetable. Bring workout clothes, a towel, and water to try. Consultations welcome anytime.",
    "Academia de Jiu-Jitsu Over Limit Honjo. Conheça as turmas, mensalidades e grade horária. Para a aula teste, traga roupa de treino, toalha e água. Tire dúvidas quando quiser.",
    "本庄市の柔術道場 Over Limit 本庄。クラスや料金、予定をご案内するんさ。体験には動きやすいジャージ、タオル、飲み物を用意してくんない。日にちが決まってなくても相談できるよ。"
  ],
  [
    "埼玉県本庄市のブラジリアン柔術道場「Over Limit 本庄」の見学・無料体験予約およびお問い合わせフォームです。初心者・女性・キッズ大歓迎。体験には動きやすい服装・タオル・飲み物をご用意ください。日程未定でも相談できます。このページでは実際の送信・予約は行いません。",
    "Test enquiry form for visits and free trials at Over Limit Honjo in Saitama. Beginners, women and kids are welcome. Bring comfortable clothing, a towel and a drink for a trial. You can enquire without a fixed date. No message or reservation is sent from this page.",
    "Formulário de teste para consultas sobre visitas e aulas experimentais gratuitas na Over Limit Honjo, em Saitama. Iniciantes, mulheres e crianças são bem-vindos. Traga roupa confortável, toalha e uma bebida. Consulte mesmo sem data definida. Esta página não envia mensagens nem faz reservas.",
    "埼玉県本庄市の柔術道場「Over Limit 本庄」の見学・無料体験とお問い合わせ用のテストフォームなんさ。初心者も女性もキッズも歓迎してるよ。体験には動きやすい服、タオル、飲み物を用意してくんない。日にちが未定でも相談できるけど、この画面から送信や予約はされねぇよ。"
  ],
  [
    "01 / Concept",
    "01 / Concept",
    "01 / Conceito",
    "01 / コンセプト"
  ],
  [
    "02 / Instructor",
    "02 / Instructor",
    "02 / Professor",
    "02 / 先生紹介"
  ],
  [
    "03 / Step Flow",
    "03 / Class Flow",
    "03 / Etapas do Treino",
    "03 / クラスの流れ"
  ],
  [
    "04 / Price",
    "04 / Pricing",
    "04 / Mensalidades",
    "04 / 料金システム"
  ],
  [
    "05 / Timetable",
    "05 / Timetable",
    "05 / Horários",
    "05 / スケジュール"
  ],
  [
    "06 / Facility",
    "06 / Facilities",
    "06 / Instalações",
    "06 / 施設案内"
  ],
  [
    "07 / Access",
    "07 / Location",
    "07 / Como Chegar",
    "07 / アクセス"
  ],
  [
    "08 / FAQ",
    "08 / FAQ",
    "08 / Dúvidas",
    "08 / よくある質問"
  ],
  [
    "HEAD INSTRUCTOR / BLACK BELT",
    "HEAD INSTRUCTOR / BLACK BELT",
    "PROFESSOR RESPONSÁVEL / FAIXA-PRETA",
    "代表インストラクター / 黒帯3段"
  ],
  [
    "WOMEN / STUDENTS",
    "WOMEN / JUNIOR & SENIOR HIGH SCHOOL",
    "MULHERES / GINASIAL E MÉDIO",
    "女性 / 中高生"
  ],
  [
    "PARKING",
    "PARKING",
    "ESTACIONAMENTO",
    "駐車場"
  ],
  [
    "Contact",
    "Contact",
    "Contato",
    "お問い合わせ"
  ],
  [
    "MEN",
    "MEN",
    "HOMENS",
    "男性"
  ],
  [
    "KIDS",
    "KIDS",
    "CRIANÇAS",
    "キッズ"
  ],
  [
    "VISITOR",
    "VISITOR",
    "VISITANTE",
    "ビジター"
  ],
  [
    "FREE",
    "FREE",
    "GRÁTIS",
    "無料"
  ],
  [
    "06 MIN",
    "06 MIN",
    "06 MIN",
    "徒歩6分"
  ],
  [
    "STEP 01",
    "STEP 01",
    "ETAPA 01",
    "STEP 01"
  ],
  [
    "STEP 02",
    "STEP 02",
    "ETAPA 02",
    "STEP 02"
  ],
  [
    "STEP 03",
    "STEP 03",
    "ETAPA 03",
    "STEP 03"
  ],
  [
    "Googleマップで見る ↗",
    "View on Google Maps ↗",
    "Ver no Google Maps ↗",
    "Googleマップで見る ↗"
  ],
  [
    "道場代表からの返信",
    "Reply from the head instructor",
    "Resposta do professor",
    "道場代表からの返信"
  ],
  [
    "※ポルトガル語からの翻訳",
    "*Translated from Portuguese",
    "*Texto original em português",
    "※ポルトガル語からの翻訳"
  ],
  [
    "とても広いマットスペースがあり、更衣スペースも保護者や見学の方が座って過ごせるスペースも十分にある素敵なジムです。\n\n代表のタシロ先生はとても気さくでフレンドリーな性格で、初めての方も緊張せず話すことができて、楽しく柔術を始めることができると思います。\n会員さんは日系ブラジリアンの方が多い印象ですが、どなたでも障壁なく柔術が楽しめるいいジムだと思います。",
    "A wonderful gym with a very spacious mat area, and the changing area has plenty of room for parents and visitors to sit and wait.\n\nHead instructor Tashiro is very easygoing and friendly, so even first-timers can talk to him without feeling nervous and get started with jiu-jitsu in a fun way.\nMy impression is that many members are Japanese-Brazilian, but it is a great gym where anyone can enjoy jiu-jitsu without barriers.",
    "Uma academia maravilhosa, com um tatame muito amplo e vestiário com espaço de sobra para pais e visitantes sentarem e aguardarem.\n\nO professor Tashiro é muito tranquilo e simpático, então até quem vem pela primeira vez consegue conversar sem ficar nervoso e começar o jiu-jitsu de forma divertida.\nTenho a impressão de que muitos alunos são nipo-brasileiros, mas é uma ótima academia onde qualquer pessoa pode curtir o jiu-jitsu sem barreiras.",
    "とても広いマットスペースがあり、更衣スペースも保護者や見学の方が座って過ごせるスペースも十分にある素敵なジムです。\n\n代表のタシロ先生はとても気さくでフレンドリーな性格で、初めての方も緊張せず話すことができて、楽しく柔術を始めることができると思います。\n会員さんは日系ブラジリアンの方が多い印象ですが、どなたでも障壁なく柔術が楽しめるいいジムだと思います。"
  ],
  [
    "松本先生、ありがとうございます‼️ また一緒に練習やりましょう‼️",
    "Professor Matsumoto, thank you very much!! Let’s train together again!!",
    "Professor Matsumoto, muito obrigado!! Vamos treinar juntos de novo!!",
    "松本先生、ありがとうございます‼️ また一緒に練習やりましょう‼️"
  ],
  [
    "上里町から本庄駅前に引っ越したばかりで白を基調にしたとてもキレイな柔術道場。先生はとても細かく丁寧に教えてくれます。\nスパーリングも自由参加、筋トレとか辛い指導はありません。",
    "A very clean jiu-jitsu dojo with a white-based interior that had just moved from Kamisato to near Honjo Station. The instructor teaches in great detail and very carefully.\nSparring is optional, and there is no grueling strength training or harsh coaching.",
    "Um dojo de jiu-jitsu muito limpo, com decoração em tons de branco, que tinha acabado de se mudar de Kamisato para perto da estação de Honjo. O professor ensina com muitos detalhes e muito cuidado.\nO sparring é opcional, e não há treinos de musculação puxados nem cobranças duras.",
    "上里町から本庄駅前に引っ越したばかりで白を基調にしたとてもキレイな柔術道場。先生はとても細かく丁寧に教えてくれます。\nスパーリングも自由参加、筋トレとか辛い指導はありません。"
  ],
  [
    "最高です、本当におすすめです！柔術について素晴らしい指導が受けられますし、クラスの構成も非常にしっかりしていて、先生から直接指導を受けられます。",
    "Top, I recommend it! You get excellent guidance in jiu-jitsu, and the classes are very well structured, with direct instruction from the professor.",
    "Top, recomendo vc vai ter uma super orientação sobre o jiu-jítsu e as aulas são muito bem elaboradas com a orientação direta do professor",
    "最高です、本当におすすめです！柔術について素晴らしい指導が受けられますし、クラスの構成も非常にしっかりしていて、先生から直接指導を受けられます。"
  ],
  [
    "フィードバックありがとう、ペレイラ。ビッグハグ、ブラザー！",
    "Thanks for the feedback, Pereira. Big hug, brother!",
    "Arigato pelo feedback Pereira. Abração irmão",
    "フィードバックありがとう、ペレイラ。ビッグハグ、ブラザー！"
  ],
  [
    "Googleマップのクチコミ",
    "Reviews on Google Maps",
    "Avaliações no Google Maps",
    "Googleマップのクチコミ"
  ],
  [
    "Googleマップに寄せられたクチコミから掲載しています。",
    "Selected from reviews posted on Google Maps.",
    "Selecionadas entre as avaliações do Google Maps.",
    "Googleマップに書いてもらったクチコミから載せてるんさ。"
  ],
  [
    "前のクチコミ",
    "Previous review",
    "Avaliação anterior",
    "前のクチコミ"
  ],
  [
    "次のクチコミ",
    "Next review",
    "Próxima avaliação",
    "次のクチコミ"
  ],
  [
    "クチコミ一覧（横にスクロールできます）",
    "Reviews (scroll horizontally)",
    "Avaliações (role para o lado)",
    "クチコミ一覧（横にスクロールできるんさ）"
  ],
  [
    "星5つ",
    "5 out of 5 stars",
    "5 de 5 estrelas",
    "星5つ"
  ],
  [
    "Google マップ",
    "Google Maps",
    "Google Maps",
    "Google マップ"
  ],
  [
    "どなたでも障壁なく柔術が楽しめるいいジム",
    "A great gym where anyone can enjoy jiu-jitsu without barriers",
    "Uma ótima academia onde qualquer pessoa pode curtir o jiu-jitsu sem barreiras",
    "どなたでも障壁なく柔術が楽しめるいいジム"
  ],
  [
    "先生はとても細かく丁寧に教えてくれます。",
    "The instructor teaches in great detail and very carefully.",
    "O professor ensina com muitos detalhes e muito cuidado.",
    "先生はとても細かく丁寧に教えてくれます。"
  ],
  [
    "柔術について素晴らしい指導が受けられます",
    "Excellent guidance in jiu-jitsu",
    "uma super orientação sobre o jiu-jítsu",
    "柔術について素晴らしい指導が受けられます"
  ],
  [
    "月・水 10:00〜11:30 / 19:00〜22:00",
    "Mon & Wed 10:00–11:30 / 19:00–22:00",
    "Seg e Qua 10:00–11:30 / 19:00–22:00",
    "月・水 10:00〜11:30 / 19:00〜22:00"
  ],
  [
    "木・土 19:00〜22:00",
    "Thu & Sat 19:00–22:00",
    "Qui e Sáb 19:00–22:00",
    "木・土 19:00〜22:00"
  ],
  [
    "金 18:00〜22:30",
    "Fri 18:00–22:30",
    "Sex 18:00–22:30",
    "金 18:00〜22:30"
  ],
  [
    "※ 休館日：火曜・日曜（祝日・試合等により変動あり）",
    "* Closed: Tuesdays & Sundays (subject to change on holidays/tournaments)",
    "* Fechado: terças e domingos (sujeito a alterações em feriados/torneios)",
    "※ 休館日：火曜・日曜（祝日や試合などで変わることもあるんさ）"
  ],
  [
    "※ 指導中等で出られない場合があります。体験予約はWEBフォームやLINEもご利用いただけます。",
    "* We may not be able to answer during class instruction. Booking is also available via web form and LINE.",
    "* Podemos não atender durante as aulas. Você também pode agendar pelo formulário online ou LINE.",
    "※ 指導中などで出られねぇ時があるんさ。体験予約はWEBフォームやLINEも使ってくんないね。"
  ],
  [
    "※お電話・LINE・フォームからお気軽にどうぞ",
    "* Inquiries welcome via phone, LINE, or web form",
    "* Fale conosco por telefone, LINE ou formulário",
    "※お電話・LINE・フォームから気軽に連絡してくんない"
  ],
  [
    "〒367-0042 埼玉県本庄市けや木1丁目1-16（JR本庄駅北口徒歩6分・無料駐車場完備）",
    "1-1-16 Keyaki, Honjo, Saitama 367-0042 (6-min walk from JR Honjo Stn North Exit / Free parking)",
    "1-1-16 Keyaki, Honjo, Saitama 367-0042 (A 6 min a pé da saída norte da estação JR Honjo / Estacionamento gratuito)",
    "〒367-0042 埼玉県本庄市けや木1丁目1-16（JR本庄駅北口から歩いて6分・無料駐車場あるで）"
  ],
  [
    "プライバシーポリシー",
    "Privacy Policy",
    "Política de Privacidade",
    "プライバシーポリシー"
  ],
  [
    "言語を選択（各言語のトップへ）",
    "Select language (to top page)",
    "Selecionar idioma (página inicial)",
    "言葉を選ぶ（各言語のトップへ）"
  ]
];

// Reuse the existing full-review translations for its two disclosure paragraphs.
const expandableReview = rows.find(([ja]) => ja.startsWith('とても広いマットスペース'));
if (expandableReview) {
  for (const part of [0, 1]) {
    rows.push(expandableReview.map(text => text.split('\n\n')[part]));
  }
}
rows.push(
  ['続きを読む', 'Read more', 'Ler mais', '続きを読む'],
  ['閉じる', 'Close', 'Fechar', '閉じる'],
);

export const translations = Object.fromEntries(rows.map(([ja, en, pt, gunma]) => [ja, { en, pt, gunma: gunma || ja }]));
// The same seven questions supply HTML and JSON-LD in every build path.
for (const [index, item] of faqByLocale.ja.entries()) {
  for (const field of ['question', 'answer']) translations[item[field]] = Object.fromEntries(
    ['en','pt','gunma'].map(locale=>[locale,faqByLocale[locale][index][field]])
  );
}
const additions = [
  ['本庄駅徒歩6分・無料駐車場完備のブラジリアン柔術ジム「Over Limit 本庄」。世界大会王者が直接指導。未経験・初心者・女性・キッズ大歓迎！クラス・料金・見学無料体験をご案内。',
   'Over Limit Honjo is a Brazilian Jiu-Jitsu academy in Honjo, Saitama (6 min walk from Honjo Station, free parking). Led by a world champion black belt. Beginners, women, and kids welcome! Free trial available.',
   'Over Limit Honjo: academia de Jiu-Jitsu Brasileiro em Honjo, Saitama (a 6 min da estação de Honjo, estacionamento gratuito). Sob a liderança de um campeão mundial faixa-preta. Iniciantes, mulheres e crianças são bem-vindos! Aula experimental gratuita.',
   '本庄駅徒歩6分・無料駐車場完備のブラジリアン柔術道場「Over Limit 本庄」。世界王者が直々に教えるで！初心者も子どもも大歓迎。まずは無料体験してみるんべ！'],
  ['本庄市の柔術道場 Over Limit 本庄。クラス・料金・週間スケジュールをご案内。体験には動きやすい服装・タオル・飲み物をご用意ください。日程未定でも相談できます。',
   'Over Limit Honjo, a jiu-jitsu dojo in Honjo. Explore classes, fees and the weekly schedule. Bring comfortable clothing, a towel and a drink for a trial. You can enquire without a fixed date.',
   'Over Limit Honjo, dojo de jiu-jitsu em Honjo. Conheça as aulas, mensalidades e horários. Para a aula experimental, traga roupa confortável, toalha e uma bebida. Consulte mesmo sem data definida.',
   '本庄市の柔術道場 Over Limit 本庄。クラスや料金、週間スケジュールを案内してるんさ。体験には動きやすい服、タオル、飲み物を用意してくんない。日にちが決まってなくても相談できるよ。'],
  ['テスト版ホーム','Test Site Home','Início do Site de Teste','テスト版ホーム'],
  ['無料体験・お問い合わせ','Free Trial & Enquiries','Aula Experimental e Contato','無料体験・お問い合わせ']
];
for (const [ja,en,pt,gunma] of additions) translations[ja]={en,pt,gunma};

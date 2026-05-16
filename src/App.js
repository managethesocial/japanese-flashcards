import { useState } from "react";

const VOCAB = [
  { word: "こんにちは", hiragana: "こんにちは", romaji: "konnichiwa", english: "Hello", example: "こんにちは、お元気ですか？", example_english: "Hello, how are you?" },
  { word: "ありがとう", hiragana: "ありがとう", romaji: "arigatou", english: "Thank you", example: "ありがとうございます。", example_english: "Thank you very much." },
  { word: "すみません", hiragana: "すみません", romaji: "sumimasen", english: "Excuse me / Sorry", example: "すみません、トイレはどこですか？", example_english: "Excuse me, where is the restroom?" },
  { word: "はい", hiragana: "はい", romaji: "hai", english: "Yes", example: "はい、わかりました。", example_english: "Yes, I understand." },
  { word: "いいえ", hiragana: "いいえ", romaji: "iie", english: "No", example: "いいえ、けっこうです。", example_english: "No, thank you." },
  { word: "おはよう", hiragana: "おはよう", romaji: "ohayou", english: "Good morning", example: "おはようございます！", example_english: "Good morning!" },
  { word: "こんばんは", hiragana: "こんばんは", romaji: "konbanwa", english: "Good evening", example: "こんばんは、いいてんきですね。", example_english: "Good evening, nice weather." },
  { word: "おやすみ", hiragana: "おやすみ", romaji: "oyasumi", english: "Good night", example: "おやすみなさい。", example_english: "Good night." },
  { word: "さようなら", hiragana: "さようなら", romaji: "sayounara", english: "Goodbye", example: "さようなら、またね！", example_english: "Goodbye, see you!" },
  { word: "またね", hiragana: "またね", romaji: "mata ne", english: "See you later", example: "じゃあ、またね！", example_english: "Well then, see you later!" },
  { word: "水", hiragana: "みず", romaji: "mizu", english: "Water", example: "みずをください。", example_english: "Please give me water." },
  { word: "食べ物", hiragana: "たべもの", romaji: "tabemono", english: "Food", example: "このたべものはおいしい。", example_english: "This food is delicious." },
  { word: "ご飯", hiragana: "ごはん", romaji: "gohan", english: "Rice / Meal", example: "ごはんをたべましょう。", example_english: "Let's eat a meal." },
  { word: "パン", hiragana: "ぱん", romaji: "pan", english: "Bread", example: "あさごはんにパンをたべた。", example_english: "I ate bread for breakfast." },
  { word: "肉", hiragana: "にく", romaji: "niku", english: "Meat", example: "にくがすきです。", example_english: "I like meat." },
  { word: "魚", hiragana: "さかな", romaji: "sakana", english: "Fish", example: "さかなをやきます。", example_english: "I will grill the fish." },
  { word: "野菜", hiragana: "やさい", romaji: "yasai", english: "Vegetables", example: "やさいをたくさんたべてください。", example_english: "Please eat lots of vegetables." },
  { word: "お茶", hiragana: "おちゃ", romaji: "ocha", english: "Tea", example: "おちゃをいっぱいどうぞ。", example_english: "Please have a cup of tea." },
  { word: "コーヒー", hiragana: "こーひー", romaji: "koohii", english: "Coffee", example: "まいあさコーヒーをのみます。", example_english: "I drink coffee every morning." },
  { word: "一", hiragana: "いち", romaji: "ichi", english: "One", example: "いちまいください。", example_english: "One sheet please." },
  { word: "二", hiragana: "に", romaji: "ni", english: "Two", example: "にほんごをべんきょうします。", example_english: "I study Japanese." },
  { word: "三", hiragana: "さん", romaji: "san", english: "Three", example: "さんじにあいましょう。", example_english: "Let's meet at three o'clock." },
  { word: "四", hiragana: "し／よん", romaji: "shi / yon", english: "Four", example: "よんほんえんぴつがあります。", example_english: "There are four pencils." },
  { word: "五", hiragana: "ご", romaji: "go", english: "Five", example: "ごふんまってください。", example_english: "Please wait five minutes." },
  { word: "赤", hiragana: "あか", romaji: "aka", english: "Red", example: "あかいバラがきれいです。", example_english: "The red rose is beautiful." },
  { word: "青", hiragana: "あお", romaji: "ao", english: "Blue", example: "そらはあおい。", example_english: "The sky is blue." },
  { word: "白", hiragana: "しろ", romaji: "shiro", english: "White", example: "しろいゆきがふっています。", example_english: "White snow is falling." },
  { word: "黒", hiragana: "くろ", romaji: "kuro", english: "Black", example: "くろいねこがいます。", example_english: "There is a black cat." },
  { word: "お父さん", hiragana: "おとうさん", romaji: "otousan", english: "Father", example: "おとうさんはかいしゃにいます。", example_english: "Father is at the company." },
  { word: "お母さん", hiragana: "おかあさん", romaji: "okaasan", english: "Mother", example: "おかあさんはりょうりがじょうずです。", example_english: "Mother is good at cooking." },
  { word: "今日", hiragana: "きょう", romaji: "kyou", english: "Today", example: "きょうはいいてんきです。", example_english: "Today is good weather." },
  { word: "明日", hiragana: "あした", romaji: "ashita", english: "Tomorrow", example: "あしたまたきます。", example_english: "I will come again tomorrow." },
  { word: "昨日", hiragana: "きのう", romaji: "kinou", english: "Yesterday", example: "きのうえいがをみました。", example_english: "I watched a movie yesterday." },
  { word: "今", hiragana: "いま", romaji: "ima", english: "Now", example: "いまなんじですか？", example_english: "What time is it now?" },
  { word: "電車", hiragana: "でんしゃ", romaji: "densha", english: "Train", example: "でんしゃにのります。", example_english: "I will ride the train." },
  { word: "駅", hiragana: "えき", romaji: "eki", english: "Station", example: "えきはどこですか？", example_english: "Where is the station?" },
  { word: "空港", hiragana: "くうこう", romaji: "kuukou", english: "Airport", example: "くうこうまでタクシーでいきます。", example_english: "I will go to the airport by taxi." },
  { word: "ホテル", hiragana: "ほてる", romaji: "hoteru", english: "Hotel", example: "ホテルをよやくしました。", example_english: "I made a hotel reservation." },
  { word: "お店", hiragana: "おみせ", romaji: "omise", english: "Shop / Store", example: "このおみせはやすいです。", example_english: "This store is cheap." },
  { word: "いくら", hiragana: "いくら", romaji: "ikura", english: "How much?", example: "これはいくらですか？", example_english: "How much is this?" },
  { word: "高い", hiragana: "たかい", romaji: "takai", english: "Expensive / Tall", example: "このくつはたかいです。", example_english: "These shoes are expensive." },
  { word: "安い", hiragana: "やすい", romaji: "yasui", english: "Cheap", example: "このスーパーはやすいです。", example_english: "This supermarket is cheap." },
  { word: "晴れ", hiragana: "はれ", romaji: "hare", english: "Sunny", example: "きょうははれです。", example_english: "It is sunny today." },
  { word: "雨", hiragana: "あめ", romaji: "ame", english: "Rain", example: "あめがふっています。", example_english: "It is raining." },
  { word: "暑い", hiragana: "あつい", romaji: "atsui", english: "Hot", example: "なつはあつい。", example_english: "Summer is hot." },
  { word: "寒い", hiragana: "さむい", romaji: "samui", english: "Cold", example: "ふゆはさむいです。", example_english: "Winter is cold." },
  { word: "嬉しい", hiragana: "うれしい", romaji: "ureshii", english: "Happy", example: "プレゼントをもらってうれしい。", example_english: "I am happy to receive a gift." },
  { word: "悲しい", hiragana: "かなしい", romaji: "kanashii", english: "Sad", example: "わかれてかなしい。", example_english: "I am sad about the goodbye." },
  { word: "大丈夫", hiragana: "だいじょうぶ", romaji: "daijoubu", english: "It's okay / Are you okay?", example: "だいじょうぶですか？", example_english: "Are you okay?" },
  { word: "わかりません", hiragana: "わかりません", romaji: "wakarimasen", english: "I don't understand", example: "すみません、わかりません。", example_english: "Sorry, I don't understand." },
  { word: "わかりました", hiragana: "わかりました", romaji: "wakarimashita", english: "I understand", example: "はい、わかりました。", example_english: "Yes, I understand." },
  { word: "ください", hiragana: "ください", romaji: "kudasai", english: "Please give me", example: "みずをください。", example_english: "Please give me water." },
  { word: "どこ", hiragana: "どこ", romaji: "doko", english: "Where?", example: "トイレはどこですか？", example_english: "Where is the restroom?" },
  { word: "何", hiragana: "なに", romaji: "nani", english: "What?", example: "これはなんですか？", example_english: "What is this?" },
  { word: "誰", hiragana: "だれ", romaji: "dare", english: "Who?", example: "あのひとはだれですか？", example_english: "Who is that person?" },
  { word: "いつ", hiragana: "いつ", romaji: "itsu", english: "When?", example: "いつきますか？", example_english: "When will you come?" },
  { word: "なぜ", hiragana: "なぜ", romaji: "naze", english: "Why?", example: "なぜないているの？", example_english: "Why are you crying?" },
  { word: "好き", hiragana: "すき", romaji: "suki", english: "Like / Love", example: "ねこがすきです。", example_english: "I like cats." },
  { word: "嫌い", hiragana: "きらい", romaji: "kirai", english: "Dislike", example: "へびがきらいです。", example_english: "I dislike snakes." },
  { word: "友達", hiragana: "ともだち", romaji: "tomodachi", english: "Friend", example: "ともだちとえいがをみた。", example_english: "I watched a movie with a friend." },
  { word: "学校", hiragana: "がっこう", romaji: "gakkou", english: "School", example: "まいにちがっこうにいきます。", example_english: "I go to school every day." },
];

const MODES = [
  { id: "en-jp", label: "🇺🇸→🇯🇵", full: "English → Japanese" },
  { id: "jp-en", label: "🇯🇵→🇺🇸", full: "Japanese → English" },
  { id: "quiz",  label: "🧠 Quiz",   full: "Quiz Me" },
];

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function makeChoices(all, cur) {
  const others = all.filter(c => c.english !== cur.english);
  return shuffle([...shuffle(others).slice(0, 3), cur]);
}

export default function App() {
  const [mode, setMode] = useState("en-jp");
  const [deck, setDeck] = useState(() => shuffle(VOCAB));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [done, setDone] = useState(false);
  const [chosen, setChosen] = useState(null);
  const [choices, setChoices] = useState(() => makeChoices(shuffle(VOCAB), shuffle(VOCAB)[0]));

  const card = deck[idx];
  const total = deck.length;
  const progress = Math.round(((known.length + reviewList.length) / total) * 100);

  const switchMode = (m) => {
    setMode(m); setFlipped(false); setChosen(null);
    if (m === "quiz" && card) setChoices(makeChoices(deck, card));
  };

  const handleKnow = (knew) => {
    if (knew) setKnown(k => [...k, card]);
    else setReviewList(r => [...r, card]);
    const next = idx + 1;
    if (next >= total) { setDone(true); return; }
    setIdx(next); setFlipped(false); setChosen(null);
    if (mode === "quiz") setChoices(makeChoices(deck, deck[next]));
  };

  const handleChoice = (c) => { if (!chosen) setChosen(c); };

  const restart = (useReview = false) => {
    const d = shuffle(useReview ? reviewList : VOCAB);
    setDeck(d); setIdx(0); setFlipped(false);
    setKnown([]); setReviewList([]); setChosen(null); setDone(false);
    if (mode === "quiz") setChoices(makeChoices(d, d[0]));
  };

  const page = { minHeight: "100vh", background: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)", display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 16px", fontFamily: "'Segoe UI',sans-serif" };
  const wrap = { width: "100%", maxWidth: 460 };

  if (done) return (
    <div style={page}>
      <div style={{ ...wrap, textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 10 }}>🎉</div>
        <h2 style={{ color: "#e2e8f0", marginBottom: 6 }}>Session Complete!</h2>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", margin: "20px 0" }}>
          {[["✅", known.length, "#68d391", "Knew it"], ["🔁", reviewList.length, "#fc8181", "Review"]].map(([icon, n, color, label]) => (
            <div key={label} style={{ background: "#1a202c", borderRadius: 14, padding: "14px 28px", border: `2px solid ${color}` }}>
              <div style={{ fontSize: 28, fontWeight: 800, color }}>{n}</div>
              <div style={{ color: "#a0aec0", fontSize: 13 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {reviewList.length > 0 && <button onClick={() => restart(true)} style={{ padding: 14, borderRadius: 13, background: "#e94560", color: "#fff", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>🔁 Retry Missed ({reviewList.length})</button>}
          <button onClick={() => restart(false)} style={{ padding: 14, borderRadius: 13, background: "#2d3748", color: "#e2e8f0", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>🔄 Restart All 60 Words</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={page}>
      <h1 style={{ color: "#e94560", fontSize: 24, fontWeight: 800, margin: "0 0 2px", letterSpacing: 1 }}>🎌 Japanese Flashcards</h1>
      <p style={{ color: "#718096", margin: "0 0 16px", fontSize: 12 }}>60 common words • Beginner</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 22, background: "#1a202c", padding: "6px", borderRadius: 14, border: "1px solid #2d3748" }}>
        {MODES.map(m => (
          <button key={m.id} onClick={() => switchMode(m.id)}
            style={{ padding: "9px 18px", borderRadius: 10, border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer", background: mode === m.id ? "#e94560" : "transparent", color: mode === m.id ? "#fff" : "#718096" }}>
            {m.label}
          </button>
        ))}
      </div>
      <div style={wrap}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: "#a0aec0", fontSize: 12 }}>{MODES.find(m => m.id === mode)?.full}</span>
          <span style={{ color: "#a0aec0", fontSize: 12 }}>{idx + 1} / {total}</span>
        </div>
        <div style={{ height: 4, background: "#2d3748", borderRadius: 4, marginBottom: 20 }}>
          <div style={{ height: 4, background: "#e94560", borderRadius: 4, width: `${progress}%`, transition: "width 0.4s" }} />
        </div>
        {mode !== "quiz" && card && (
          <>
            <div onClick={() => setFlipped(f => !f)} style={{ cursor: "pointer", perspective: 1000, marginBottom: 16 }}>
              <div style={{ position: "relative", width: "100%", minHeight: 230, transition: "transform 0.5s", transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
                <div style={{ position: "absolute", width: "100%", minHeight: 230, backfaceVisibility: "hidden", background: "linear-gradient(135deg,#1a202c,#2d3748)", borderRadius: 20, border: "2px solid #e94560", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 28, boxSizing: "border-box", textAlign: "center" }}>
                  {mode === "en-jp"
                    ? <div style={{ fontSize: 30, fontWeight: 800, color: "#e2e8f0" }}>{card.english}</div>
                    : <><div style={{ fontSize: 46, fontWeight: 800, color: "#e2e8f0", marginBottom: 6 }}>{card.word}</div><div style={{ fontSize: 18, color: "#a0aec0", marginBottom: 2 }}>{card.hiragana}</div><div style={{ fontSize: 13, color: "#718096", letterSpacing: 2 }}>{card.romaji}</div></>}
                  <div style={{ marginTop: 20, color: "#4a5568", fontSize: 12 }}>tap to reveal</div>
                </div>
                <div style={{ position: "absolute", width: "100%", minHeight: 230, backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "linear-gradient(135deg,#e94560,#c62a47)", borderRadius: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 28, boxSizing: "border-box", textAlign: "center" }}>
                  {mode === "en-jp"
                    ? <><div style={{ fontSize: 44, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{card.word}</div><div style={{ fontSize: 18, color: "rgba(255,255,255,0.8)" }}>{card.hiragana}</div><div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", letterSpacing: 2 }}>{card.romaji}</div></>
                    : <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>{card.english}</div>}
                  <div style={{ marginTop: 14, fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
                    <div>{card.example}</div><div style={{ fontStyle: "italic", opacity: 0.8 }}>{card.example_english}</div>
                  </div>
                </div>
              </div>
            </div>
            {flipped && (
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => handleKnow(false)} style={{ flex: 1, padding: 13, borderRadius: 13, background: "#2d3748", border: "2px solid #4a5568", color: "#fc8181", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>🔁 Again</button>
                <button onClick={() => handleKnow(true)} style={{ flex: 1, padding: 13, borderRadius: 13, background: "#2d3748", border: "2px solid #4a5568", color: "#68d391", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>✅ Got it</button>
              </div>
            )}
          </>
        )}
        {mode === "quiz" && card && (
          <>
            <div style={{ background: "linear-gradient(135deg,#1a202c,#2d3748)", borderRadius: 20, border: "2px solid #e94560", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 28, marginBottom: 16, textAlign: "center" }}>
              <div style={{ fontSize: 44, fontWeight: 800, color: "#e2e8f0", marginBottom: 6 }}>{card.word}</div>
              <div style={{ fontSize: 18, color: "#a0aec0", marginBottom: 2 }}>{card.hiragana}</div>
              <div style={{ fontSize: 13, color: "#718096", letterSpacing: 2 }}>{card.romaji}</div>
            </div>
            <p style={{ color: "#718096", fontSize: 12, textAlign: "center", marginBottom: 10 }}>What does this mean in English?</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
              {choices.map((c, i) => {
                const isCorrect = c.english === card.english;
                const isChosen = chosen?.english === c.english;
                let bg = "#1a202c", border = "#2d3748", color = "#e2e8f0";
                if (chosen) {
                  if (isCorrect) { bg = "#1c3a2a"; border = "#68d391"; color = "#68d391"; }
                  else if (isChosen) { bg = "#3a1c1c"; border = "#fc8181"; color = "#fc8181"; }
                  else color = "#4a5568";
                }
                return <button key={i} onClick={() => handleChoice(c)} style={{ padding: "13px 18px", borderRadius: 12, border: `2px solid ${border}`, background: bg, color, fontWeight: 600, fontSize: 14, cursor: chosen ? "default" : "pointer", textAlign: "left" }}>{chosen && isCorrect ? "✓ " : chosen && isChosen ? "✗ " : ""}{c.english}</button>;
              })}
            </div>
            {chosen && (
              <div style={{ textAlign: "center" }}>
                <p style={{ color: chosen.english === card.english ? "#68d391" : "#fc8181", fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{chosen.english === card.english ? "🎉 Correct!" : `❌ It was: ${card.english}`}</p>
                <p style={{ color: "#718096", fontSize: 12, marginBottom: 12, fontStyle: "italic" }}>{card.example}<br />{card.example_english}</p>
                <button onClick={() => handleKnow(chosen.english === card.english)} style={{ width: "100%", padding: 13, borderRadius: 13, background: "#e94560", color: "#fff", border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Next →</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { getAnalysis } from "./data";
import Image from "next/image";
import AdSense from "./components/AdSense";


type AnalysisResult = ReturnType<typeof getAnalysis>;

const mbtiList = ["ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP", "ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ"];
const zodiacList = ["牡羊座", "牡牛座", "双子座", "蟹座", "獅子座", "乙女座", "天秤座", "蠍座", "射手座", "山羊座", "水瓶座", "魚座"];
const bloodList = ["A型", "B型", "O型", "AB型"];
const ageList = ["10代", "20代前半", "20代後半", "30代以上"];
const getCharacterImage = (mbti: string, blood: string) => {
  // 1. 血液型のサフィックス変換: O(1), A(2), B(3), AB(4)
  const bloodMap: Record<string, string> = {
    "O型": "(1)", "A型": "(2)", "B型": "(3)", "AB型": "(4)"
  };
  const suffix = bloodMap[blood] || "(1)";

  // 2. MBTIのプレフィックス変換
  const mbtiMap: Record<string, string> = {
    // N型 (直感)
    "INTJ": "int", "INTP": "int",
    "ENTJ": "ent", "ENTP": "ent",
    "INFJ": "inf", "INFP": "inf",
    "ENFJ": "enf", "ENFP": "enf",
    // S型 (感覚) - T/F統合
    "ISTJ": "isj", "ISFJ": "isj",
    "ESTJ": "esj", "ESFJ": "esj",
    "ISTP": "isp", "ISFP": "isp",
    "ESTP": "esp", "ESFP": "esp"
  };
  const prefix = mbtiMap[mbti] || "int";

  // 3. ファイル名結合 (例: int(2).png)
  return `/images/${prefix} ${suffix}.png`;
};
export default function Home() {
  const [step, setStep] = useState<"input" | "loading" | "result">("input");
  const [inputs, setInputs] = useState({ mbti: "INFP", zodiac: "牡羊座", blood: "A型", age: "20代前半" });
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loadingText, setLoadingText] = useState("初期化中...");

  const handleAnalyze = () => {
    setStep("loading");
    setLoadingText("行動ログを照合中...");
    setTimeout(() => setLoadingText("認知バイアスを検出中..."), 1200);
    setTimeout(() => setLoadingText("心理学的背景を分析中..."), 2500);

    setTimeout(() => {
      const data = getAnalysis(inputs);
      setResult(data);
      setStep("result");
    }, 3800);
  };

// app/page.tsx の後半（returnの中身）
  const characterImage = getCharacterImage(inputs.mbti, inputs.blood);

  return (
    <main className="min-h-dvh bg-[#f1f5f9] text-slate-800 p-4 flex flex-col items-center justify-center font-sans">      
      {/* 1. 入力画面と 2. ロード中は変更なし（前回のままでOKですが、念のため構造維持） */}
      {step === "input" && (
        // ... (入力画面のコードはそのまま)
        <div className="w-full max-w-md space-y-6 animate-fade-in">
           {/* 省略：前回の入力画面コードをご利用ください */}
           <div className="text-center space-y-3 mb-6">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              行動心理・傾向分析
            </h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              Behavioral Pattern Analysis
            </p>
           </div>
           
           <div className="bg-white p-6 rounded-xl shadow-xl space-y-5 border border-slate-200">
             {/* ...入力フォーム... */}
             {/* ※ここには前回と同じ入力フォームコードが入ります */}
             <div className="space-y-4">
               <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Age Group</label>
                  <select className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-lg p-3 font-bold" value={inputs.age} onChange={(e) => setInputs({...inputs, age: e.target.value})}>
                    {ageList.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
               </div>
               {/* MBTIなどの入力欄も同様に */}
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">MBTI</label>
                    <select className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-lg p-3 font-bold" value={inputs.mbti} onChange={(e) => setInputs({...inputs, mbti: e.target.value})}>
                      {mbtiList.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Blood Type</label>
                    <select className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-lg p-3 font-bold" value={inputs.blood} onChange={(e) => setInputs({...inputs, blood: e.target.value})}>
                      {bloodList.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
               </div>
               <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Zodiac</label>
                  <select className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-lg p-3 font-bold" value={inputs.zodiac} onChange={(e) => setInputs({...inputs, zodiac: e.target.value})}>
                    {zodiacList.map(z => <option key={z} value={z}>{z}</option>)}
                  </select>
               </div>
             </div>

             <button onClick={handleAnalyze} className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-lg shadow-lg transition-all transform active:scale-95 mt-2">
               分析を開始する
             </button>
           </div>
            <div className="pt-6">
                <div className="min-h-[100px] flex justify-center items-center bg-slate-50 rounded-lg overflow-hidden">
                    <AdSense />
                </div>
            </div>
        </div>
      )}

      {step === "loading" && (
        <div className="w-full max-w-md text-center space-y-8">
          {/* ...ローディングアニメーション... */}
          <div className="relative w-16 h-16 mx-auto">
             <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
             <div className="absolute inset-0 border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-sm font-mono text-slate-600 animate-pulse">{loadingText}</p>
          {/* 広告エリア：ここが正しい場所です */}
          <div className="w-full min-h-[250px] bg-slate-100/50 rounded-lg flex flex-col items-center justify-center relative border border-slate-200 overflow-hidden">
              <span className="absolute top-1 right-2 text-[10px] text-slate-400">Sponsored</span>
              <AdSense />
          </div>

        </div>
      )}

      {/* 3. 結果画面（ここを重点的に変更！） */}
      {step === "result" && result && (
        <div className="w-full max-w-md animate-fade-in-up pb-20">
          
          <div className="flex justify-between items-end px-2 mb-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Analysis Report</h2>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Reliability Score</span>
              <span className="text-3xl font-black text-blue-600">{result.reliability}%</span>
            </div>
          </div>

          <div className="mb-8 filter drop-shadow-xl transform transition-all hover:scale-[1.02]">
            <div className={`w-full aspect-[4/5] rounded-3xl bg-gradient-to-br ${result.design.color} p-6 text-white relative overflow-hidden flex flex-col justify-between`}>
                
                {/* 背景装飾 */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
                <div className="absolute top-20 -left-10 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>

                {/* 上部：タグ */}
                <div className="flex justify-between items-start z-10">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold opacity-80 uppercase tracking-wider">Type</span>
                        <span className="text-3xl font-black tracking-tighter">{inputs.mbti}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">{inputs.age}</span>
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">{inputs.blood}</span>
                    </div>
                </div>

                {/* 中央：画像表示エリア */}
                <div className="flex-1 w-full relative mt-4 mb-2 flex justify-center items-center">
                    <Image 
                      src={characterImage} 
                      alt={`${inputs.mbti} Character`}
                      fill                                      // 親要素に合わせて自動でサイズ調整
                      sizes="(max-width: 768px) 100vw, 400px" // スマホとPCで読み込むサイズを最適化
                      priority                                  // 最初に表示される重要な画像なので優先読み込み
                      className="object-contain filter drop-shadow-2xl"
                    />
                </div>

                {/* 下部：タイトルとコピー */}
                <div className="z-10 text-center">
                    <h2 className="text-2xl font-bold mb-2 text-white filter drop-shadow-md">
                        {result.design.title}
                    </h2>

                </div>
                
                <div className="absolute bottom-2 right-4 text-[9px] opacity-60 font-mono">
                    ID: {new Date().getTime().toString().slice(-6)}
                </div>
            </div>
            
            <p className="text-center text-[10px] text-slate-400 mt-3 font-bold tracking-widest animate-pulse">
                📸 TAKE A SCREENSHOT TO SHARE
            </p>
          </div>

          <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xl">
            {/* 1. 検出された傾向（断定） */}
            <div className="bg-slate-50 p-6 border-b border-slate-100">
                <h3 className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    あなたの特性
                </h3>
                <div className="text-lg font-bold text-slate-800 leading-relaxed">
                    {result.diagnosis}
                </div>
            </div>

            <div className="p-6 space-y-8">
                
                {/* --- ANALYSIS BASIS (根拠エリア) --- */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                    <div className="relative flex justify-center"><span className="bg-white px-3 text-[10px] font-bold text-slate-400 tracking-widest uppercase">Analysis Basis</span></div>
                </div>

                {/* 2. 世代的背景 */}
                <div className="space-y-2">
                    <h3 className="text-sm font-bold text-slate-700 border-l-4 border-blue-500 pl-3">
                        世代的背景と行動傾向
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed bg-blue-50/50 p-3 rounded-r-lg">
                        {result.generation}
                    </p>
                </div>

                {/* 3. 幼少期の形成要因（星座×生まれ月）★追加 */}
                <div className="space-y-2">
                    <h3 className="text-sm font-bold text-slate-700 border-l-4 border-green-500 pl-3">
                        形成要因
                    </h3>
                    <p className="text-sm text-slate-600 leading-7 font-medium">
                        {result.childhood}
                    </p>
                </div>

                {/* 4. 隠れ性格・恋愛特性（MBTI裏）★追加 */}
                <div className="space-y-2 pt-4">
                    <h3 className="text-sm font-bold text-slate-700 border-l-4 border-purple-500 pl-3">
                        隠れ性格・恋愛特性
                    </h3>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <p className="text-sm text-purple-900 leading-relaxed font-bold">
                            {result.hidden}
                        </p>
                    </div>
                </div>

                {/* --- MONTHLY FORECAST (行動予測) --- */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                    <div className="relative flex justify-center"><span className="bg-white px-3 text-[10px] font-bold text-slate-400 tracking-widest uppercase">Monthly Forecast</span></div>
                </div>
                {/* 5. 今月の行動予測 */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                            <span className="text-xl"></span> 今月の行動予測
                        </h3>
                        <div className="bg-slate-800 text-white px-3 py-1 rounded text-xs font-bold tracking-wider shadow-sm">
                            X-Day: {result.luckyDay}日
                        </div>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-lg border-l-4 border-slate-800 text-sm text-slate-700 leading-7 font-medium relative shadow-sm">
                        <span className="absolute top-2 left-2 text-4xl text-slate-200 font-serif leading-none">“</span>
                        <p className="relative z-10 pl-2">
                            {result.actionForecast}
                        </p>
                    </div>
                    
                    {/* ★ここを変更：算出ロジックの自然言語による解説 */}
                    <div className="mt-2 pt-3 border-t border-slate-100">
                        <div className="bg-slate-100 rounded p-3 text-xs text-slate-500 leading-relaxed">
                            <p className="font-bold text-slate-600 mb-1 flex items-center gap-1">
                                <span className="text-xs"></span> 算出ロジックについて
                            </p>
                            <p>
                                本予測は、<span className="font-bold text-slate-700">年代・MBTI・血液型・星座</span>の4大要素を統合解析し、今月のあなたにとって<span className="font-bold text-blue-600">「最も変化が起きやすいタイミング」</span>と<span className="font-bold text-blue-600">「波長」</span>を算出しています。
                            </p>
                            <div className="flex justify-end items-center gap-2 mt-2 pt-2 border-t border-slate-200/50">
                                <span className="text-[10px] text-slate-400">次回更新予定:</span>
                                <span className="text-[10px] font-bold text-slate-500">来月1日</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 6. 解決策アイテム */}
                <div className="mt-4 pt-4">
                    <div className="bg-slate-800 rounded-xl p-4 shadow-lg">
                        <div className="flex items-start gap-4 mb-3">
                            <div className="text-3xl bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                                {result.item.emoji}
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">Solution Tool</div>
                                <div className="font-bold text-white">{result.item.name}</div>
                                <p className="text-xs text-slate-300 mt-1 leading-tight">
                                    {result.item.reason}
                                </p>
                            </div>
                        </div>
                        <a href={result.item.link} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg text-xs tracking-wider uppercase shadow transition-colors">
                            Amazonで詳細を見る ↗
                        </a>
                    </div>
                </div>

            </div>
          </div>

          <div className="mt-8 text-center space-y-4">
            {/* ボタンの文言変更 */}
            <AdSense />
            <button 
                onClick={() => setStep("input")}
                className="text-slate-400 text-xs hover:text-slate-600 transition-colors uppercase tracking-widest font-bold border-b border-transparent hover:border-slate-400 pb-1"
            >
                Condition Change / Reset
            </button>
            
            <p className="text-[10px] text-slate-300">
                本レポートは統計的傾向に基づく分析結果であり、<br/>
                断定的な診断を保証するものではありません。
            </p>
          </div>
        </div>
      )}

    </main>
  );
}
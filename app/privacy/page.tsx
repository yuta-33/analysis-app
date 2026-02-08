// app/privacy/page.tsx
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans">
      <div className="max-w-3xl mx-auto bg-slate-900 p-8 rounded-xl shadow-lg border border-slate-800">
        <h1 className="text-2xl font-bold mb-8 text-white border-b border-slate-700 pb-4">プライバシーポリシー</h1>
        
        <div className="space-y-8">
            <section>
            <h2 className="text-lg font-semibold mb-3 text-blue-300">広告の配信について</h2>
            <p className="text-sm leading-relaxed text-slate-400">
                当サイトでは、第三者配信の広告サービス（Google AdSense、A8.net）を利用しています。
                このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報「Cookie」(氏名、住所、メール アドレス、電話番号は含まれません) を使用することがあります。
                <br /><br />
                また、Googleアドセンスに関して、このプロセスの詳細やこのような情報が広告配信事業者に使用されないようにする方法については、
                <a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">こちら</a>
                をご覧ください。
            </p>
            </section>

            <section>
            <h2 className="text-lg font-semibold mb-3 text-blue-300">アクセス解析ツールについて</h2>
            <p className="text-sm leading-relaxed text-slate-400">
                当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
                このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。
                このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
                この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
            </p>
            </section>

            <section>
            <h2 className="text-lg font-semibold mb-3 text-blue-300">免責事項</h2>
            <p className="text-sm leading-relaxed text-slate-400">
                当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
                当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。
                当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
            </p>
            </section>
        </div>
        
        <div className="mt-12 text-center">
            <Link href="/" className="inline-block px-6 py-2 rounded-full bg-slate-800 text-blue-400 hover:bg-slate-700 transition-colors text-sm">
                トップページに戻る
            </Link>
        </div>
      </div>
    </div>
  );
}
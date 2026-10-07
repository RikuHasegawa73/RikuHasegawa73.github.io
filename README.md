# Portfolio

長谷川 璃空のポートフォリオページ。Next.js の静的書き出し(`output: "export"`)で GitHub Pages に公開する。

デザインは [magicuidesign/portfolio](https://github.com/magicuidesign/portfolio)(MIT License, © 2024 Dillion Verma)をもとにしている。ライセンス全文は [LICENSE](./LICENSE)。元のテンプレートからブログ・ハッカソン欄・画像を外し、内容を差し替えた。

## 内容を直す

載せる内容はすべて `src/data/resume.tsx` にある。出典は職務経歴書なので、経歴書に無い実績は書かない。所在地と顔写真は載せない。

## 手元で確認する

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # out/ に静的ファイルを書き出す
```

## GitHub Pages に公開する

1. GitHub にリポジトリを作る
   - `RikuHasegawa73.github.io` という名前にすると `https://rikuhasegawa73.github.io/` で公開される
   - それ以外の名前(例: `portfolio`)だと `https://rikuhasegawa73.github.io/portfolio/` で公開される(パスは自動で設定される)
2. リポジトリの Settings → Pages → Source を「GitHub Actions」にする
3. main ブランチに push すると `.github/workflows/deploy.yml` がビルドして公開する

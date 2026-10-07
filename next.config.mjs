/**
 * GitHub Pages 向けの静的書き出し(next build で out/ に HTML を出力する)。
 * プロジェクトページ(https://<user>.github.io/<repo>/)で公開する場合は
 * ビルド時に PAGES_BASE_PATH=/<repo> を渡す(.github/workflows/deploy.yml が設定する)。
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "export",
  basePath: process.env.PAGES_BASE_PATH ?? "",
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;

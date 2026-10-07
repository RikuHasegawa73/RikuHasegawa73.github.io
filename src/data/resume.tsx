/**
 * ポートフォリオに載せる内容。出典は職務経歴書(2026年10月3日版)。
 * 書かれていない経歴・実績はここに足さない。所在地・顔写真は載せない。
 */
import { Icons } from "@/components/icons";
import {
  Award,
  BriefcaseBusiness,
  Building2,
  Cloud,
  CloudCog,
  LayoutDashboard,
  Wrench,
  FolderGit2,
  HomeIcon,
  type LucideIcon,
} from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";
import { makeSimpleIcon } from "@/components/ui/svgs/simple-icon";
import {
  siAngular,
  siGithubactions,
  siLaravel,
  siMysql,
  siNestjs,
  siPhp,
  siSpringboot,
  siTerraform,
} from "simple-icons";

export const DATA = {
  name: "長谷川 璃空",
  url: "https://rikuhasegawa73.github.io",
  description:
    "業務システムを、要件定義から運用まで。Web システムの受託開発をしています。",
  role: "Web システムの受託開発",
  tagline: "業務システムを、要件定義から運用まで。",
  heroNote: "成果物単位の請負でお手伝いします。",
  /** 発注する側に向けた「頼めること」。経歴書にある経験の範囲で書く */
  services: [
    {
      title: "管理画面・業務システムの新規開発",
      description:
        "申請・承認、勤怠、マスタ管理、帳票・CSV/PDF 出力など。Excel で回っている業務のシステム化から対応します。",
      icon: LayoutDashboard as LucideIcon,
    },
    {
      title: "既存システムの改修・機能追加",
      description:
        "機能追加や画面の改善、SQL 最適化などのパフォーマンス改善、古いフレームワークの移行(Spring Boot への移行経験あり)。",
      icon: Wrench as LucideIcon,
    },
    {
      title: "AWS の構築・クラウド移行",
      description:
        "ECS・RDS・CloudFront などの環境構築と、Terraform によるコード化。AWS と Azure の比較検証からのクラウド移行も。",
      icon: CloudCog as LucideIcon,
    },
  ],
  summary:
    "本業では社内 IT 部門で、8 年間業務システムを開発してきました。申請・勤怠・人事マスタなど、毎日数千人が使うシステムの設計から運用までを担当し、Excel で回っていた業務をシステムに置き換えてきました。\n\n2024 年からは個人事業主として、Next.js・NestJS・AWS のマルチテナント SaaS を要件定義から本番運用まで担当しています。範囲を見積書で決めてから着手し、成果物単位で納品します。",
  skills: [
    { name: "TypeScript", icon: Typescript },
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "NestJS", icon: makeSimpleIcon(siNestjs) },
    { name: "Angular", icon: makeSimpleIcon(siAngular) },
    { name: "PHP", icon: makeSimpleIcon(siPhp) },
    { name: "Laravel", icon: makeSimpleIcon(siLaravel) },
    { name: "Java", icon: Java },
    { name: "Spring Boot", icon: makeSimpleIcon(siSpringboot) },
    { name: "C#", icon: Csharp },
    { name: "Python", icon: Python },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "MySQL", icon: makeSimpleIcon(siMysql) },
    // AWS・Azure のロゴは Simple Icons に無い(ブランドの要望で削除)ため、ロゴではない雲のアイコンにする
    { name: "AWS", icon: Cloud },
    { name: "Azure", icon: Cloud },
    { name: "Terraform", icon: makeSimpleIcon(siTerraform) },
    { name: "Docker", icon: Docker },
    { name: "GitHub Actions", icon: makeSimpleIcon(siGithubactions) },
  ],
  navbar: [
    { href: "#hero", icon: HomeIcon, label: "トップ" },
    { href: "#work", icon: BriefcaseBusiness, label: "仕事" },
    { href: "#projects", icon: FolderGit2, label: "作ったもの" },
  ],
  contact: {
    email: "hasegawa2025.developer@gmail.com",
    social: {
      email: {
        name: "メール",
        url: "mailto:hasegawa2025.developer@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "スポーツ管理 Web アプリ(マルチテナント SaaS)",
      title: "個人事業主/リードエンジニア(4 名体制)",
      icon: BriefcaseBusiness as LucideIcon,
      start: "2024年1月",
      end: "現在",
      description:
        "Next.js・NestJS・AWS で、テーブル約 230、API 約 160 本、画面約 180 のシステムを要件定義からインフラ構築・本番運用まで担当。要配慮個人情報の暗号化保存と監査ログ、Stripe によるサブスクリプション課金と請求書払い、Socket.IO による同時編集、Amazon Bedrock を使った生成 AI 機能を実装。実 DB に対する統合テスト約 550 ファイルを CI に組み込み、開発・ステージング・本番の段階リリースを運用しています。",
    },
    {
      company: "人事マスタ管理システムのクラウド移行",
      title: "本業/SE",
      icon: Building2 as LucideIcon,
      start: "2025年2月",
      end: "現在",
      description:
        "日次 5,000 アクセス以上のシステムを止めずに、Spring 4 から Spring Boot へ移行。AWS と Azure を比較検証したうえで Azure App Service へ段階的に移行し、Terraform によるインフラのコード化と GitHub Actions での CI/CD を整備しました。",
    },
    {
      company: "大規模電子申請システム",
      title: "本業/開発リーダー(10 名)",
      icon: Building2 as LucideIcon,
      start: "2023年1月",
      end: "現在",
      description:
        "日次約 3,000 人が使う電子申請システム(C#・Angular・PostgreSQL)で、技術選定とアーキテクチャ設計を主導。SQL とインデックスの見直しで応答速度を 40% 改善し、セキュリティ監査で重大な脆弱性ゼロを達成しました。",
    },
    {
      company: "社内勤怠管理システム",
      title: "本業/開発メンバー",
      icon: Building2 as LucideIcon,
      start: "2018年4月",
      end: "2020年3月",
      description:
        "約 1,000 人の勤怠を Excel 管理からシステムへ移行し、業務効率を 30% 改善。ユーザーへのヒアリングによる要件整理から、リリース後の運用・サポートまで全工程を担当しました。",
    },
  ],
  education: [
    {
      school: "応用情報技術者試験",
      degree: "合格",
      icon: Award as LucideIcon,
      date: "2023年6月",
    },
    {
      school: "基本情報技術者試験",
      degree: "合格",
      icon: Award as LucideIcon,
      date: "2018年5月",
    },
  ],
  projects: [
    {
      title: "Shifna(シフナ)",
      illustration: "shift",
      featured: true,
      badge: "個人開発・公開中",
      href: "https://shifna.com",
      dates: "2024年6月 -",
      description:
        "飲食店・小売店向けのシフト管理アプリ。スタッフのシフト提出から、オーナーによる作成・確定・共有までを一元管理します。招待によるスタッフとの連携、提出状況の確認、カレンダーでの共有、修正依頼の承認まで、PC とスマホの両方で使えます。企画から設計・開発・公開まで一人で手がけ、無料で公開しています。",
      technologies: ["Next.js", "TypeScript", "Laravel", "MariaDB", "Redis", "Docker"],
      links: [
        {
          type: "サイトを見る",
          href: "https://shifna.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
    },
    {
      title: "帳票チェック・データ抽出ツール",
      illustration: "checker",
      dates: "2024年8月 -",
      description:
        "HTML や Excel の帳票からデータを抽出・検証し、CSV・Excel・PDF で出力する Web アプリ。PHP と Python を連携させて帳票データを処理します。",
      technologies: ["Laravel", "PHP", "Python", "MySQL"],
      links: [],
    },
    {
      title: "業界特化の文書管理クラウド",
      illustration: "docs",
      dates: "2023年8月 -",
      description:
        "事業所や作業場、取引先を一元管理する文書管理アプリ。3 階層の権限管理、階層ディレクトリのファイル管理、外部ストレージとの API 連携を実装しました。",
      technologies: ["Laravel", "PHP", "MySQL"],
      links: [],
    },
    {
      title: "緊急連絡用 QR コードシステム",
      illustration: "qr",
      dates: "2024年7月 -",
      description:
        "緊急時の連絡先などを QR コードで共有し、PDF 帳票として出力するアプリ。ロール別のアクセス制御と 2 段階認証を実装しました。",
      technologies: ["Laravel", "PHP", "MySQL"],
      links: [],
    },
  ],
} as const;

## 概要

- Next.jsを用いたコメント投稿ができる掲示板サイトです
  - 登録済みユーザのみ閲覧可能です
  - カテゴリ登録&トピック作成後、その投稿内容についてコメントできます
- 制作時間：約220時間


## 環境

| 言語・フレームワーク  | バージョン |
| --------------------- | ---------- |
| MySQL2                 | 3.6.3        |
| axios                 | 1.6.0        |
| Node.js               | 18.17.0    |
| Next.js                 | 14.0.1     |
| Next Auth                 | 4.24.4     |
| npm             |  9.6.7      |
| Tailwind CSS             |  3.3.5      |
| TypeScript             |  4.3.5      |


## 機能一覧

- ログイン機能
  - 登録されたユーザーのみ閲覧可能
- コメント投稿機能
  - 登録、更新日時表示
- トピック作成機能
- カテゴリ作成機能
  - カテゴリ別トピック一覧表示
- 検索機能
  - 絞り込み機能（タイトル、トピック本文、コメント）


## スクリーンショット

- ログイン画面

![ログイン画面](images/login.png)


- ログアウト画面

![ログアウト画面](images/logout.png)


- 最新投稿タイトル一覧

![最新投稿タイトル一覧](images/recent-titles.png)


- カテゴリ選択後

![カテゴリ選択後](images/titles.png)


- タイトル選択後

![タイトル選択後](images/comments.png)


- 検索結果

![検索結果](images/search.png)


- トピック作成画面

![トピック作成画面](images/create-topic.png)


## ディレクトリ構成
<pre>
.
├── .env.local
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── .vscode
|   └── settings.json
├── README.md
├── auth
|   └── [...nextauth].ts
├── docker-compose.yml
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
|   ├── next.svg
|   └── vercel.svg
├── src
|   ├── app
|   ├── components
|   ├── const
|   ├── features
|   ├── libs
|   ├── pages
|   └── styles
├── tailwind.config.js
├── tsconfig.json
├── utils
|   ├── configs
|   └── typeGuards.ts
└── yarn.lock
</pre>


## 開発環境構築

### コンテナの作成と起動

.env ファイルを作成後、以下のコマンドで開発環境を構築

npm run dev


## データベース設計

### usersテーブル
| Column             | Type       | Options                        |
| ------------------ | ---------- | ------------------------------ |
| user_id            | integer    | null: false, unique: true      |
| user_name          | string     | null: false                    |
| email              | string     | null: false                    |
| password           | string     | null: false                    |

### titlesテーブル
| Column             | Type       | Options                        |
| ------------------ | ---------- | ------------------------------ |
| title_id           | integer    | null: false, unique: true      |
| category_id        | integer    | null: false                    |
| user_id            | integer    | null: false                    |
| title_name         | string     | null: false                    |
| outline            | string     | null: false                    |

### commentsテーブル
| Column             | Type       | Options                        |
| ------------------ | ---------- | ------------------------------ |
| comment_id         | integer    | null: false, unique: true      |
| title_id           | integer    | null: false                    |
| user_id            | integer    | null: false                    |
| comment_content    | string     | null: false                    |
| created_at         | string     | null: false                    |

### categoriesテーブル
| Column             | Type       | Options                        |
| ------------------ | ---------- | ------------------------------ |
| category_id        | integer    | null: false, unique: true      |
| category_name      | string     | null: false                    |


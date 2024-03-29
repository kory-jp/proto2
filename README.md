# 💴 With Accountant

経理業界の初心者を応援する情報共有サイトです。  
日々の業務のキャッチアップと合わせて、毎年の法令改正や新規の補助金制度の新設なども把握しておかなければなりません。  
そんな状況から当サイトは情報収集の面からサポート致します！

~~URL: https://with-accountant.com/~~
*現在はサービスを終了しております

<img width="750" alt="8AFF07CD-EE41-4F6E-85CC-E958C8E97D1D" src="https://user-images.githubusercontent.com/66899822/135550922-bfc0b77a-47dc-415b-9e9c-2d3b147a88af.png">

## 開発経緯

前職の会計業務において、不明な点を検索する際に IT 業界における Qiita や Teratail のような大規模な情報共有サイトが
存在しておらず、法律の条文集を索引するのが慣習になっておりました。書籍では検索時に多くのコストが必要であり
(会計系の書籍は電子書籍化が進んでいない)、一方、ネット上で検索すると個人サイトが検索上位に表示され正確性に疑問が残ります。

そこでこのような情報共有サイトを通して、情報アクセスにおけるコスト削減、信頼性の担保をコンセプトに開発しました。

## 機能一覧

ログイン

- ログイン
- ログアウト

ユーザー

- 新規登録
- 詳細表示
- プロフィール情報更新
- アカウント削除
- キーワード検索

投稿

- 新規投稿
- 一覧表示
- 詳細表示
- 投稿記事編集
- お気に入り登録
- タグ検索
- キーワード検索

コメント

- 新規投稿
- 編集機能
- 一覧表示
- 削除機能

フォロー機能

- 新規フォロー
- フォロー解除
- フォロー、フォロワー一覧表示

ダイレクトメッセージ

- 新規ルーム作成
- ルーム一覧表示
- メッセージ投稿
- メッセージ表示

その他

- 通知機能
- 画像投稿

※削除、編集は作成者のみ行えます

## 技術・環境

### フロントエンド

- HTML/CSS
- React(create-react-app/Redux/Chakra-ui)

#### 主要ライブラリ

- Redux: State の一元管理するフレームワーク
- connected-react-router: react-router のルーティング状態を Redux で管理できるようにする
- redux-Thunk: Redux の Action Creator に非同期処理を実装するためのミドルウェア
- redux-logger: redux 内のログを表示
- axios: HTTP リクエストにてサーバからデータの取得、更新

### バックエンド

- Ruby on Rails(API mode/ Rspec)
- Nginx
- Unicorn

#### 主要 Gem

- BCrypt: パスワード管理
- jbuilder: API 通信における json データの作成
- rack-cors: フロントエンドとの API 通信において指定したドメインのアクセス許可
- kaminari: 一覧画面のページネーション機能実装
- carrierWave: 画像ファイルのアップロード機能
- dotenv-rails: 環境変数管理
- fog-aws: AWS の S3 への画像配信、保存
- pry-byebug: デバックツール
- annotate: モデルのスキーマ情報表示
- bullet: n+1 問題の発見ツール
- faker: 初期、テストデータの作成
- rspec-rails: テストの作成、実行
- factory_bot_rails: テストにおける仮データの作成

### インフラ

- AWS(EC2/RDS/ALB/Route53/S3/CloudFlont)
- Docker/docker-compose
- CircleCI

![AWS](https://user-images.githubusercontent.com/66899822/138204940-5e200de6-7e78-4554-aa90-5d094b7da68e.jpg)

## ER 図

![er](https://user-images.githubusercontent.com/66899822/135587724-5cd874c5-4b31-4777-916d-6c10edfbcaea.jpg)

## 技術選定理由

> バックエンド: Rails

役割

- API モードで認証、クエリ発行など

採用理由

- 言語自体の難易度が高すぎず、完成されたフレームワークが存在する
- 独学のため、ネット上に参考情報が多く情報をもっている方にアクセスし易い
- 求人数

> フロントエンド: React

役割

- SPA にて画面描写
- Redux を利用することでフロント側でステート管理

採用理由

- コンポーネント分割に重きをおくライブラリで、ある程度の分割が出来ていれば可読性が上がるのと同時にメンテナンス性が上がるため
- Vue との比較で、より深く JavaScript の理解が必要な React にキャリア初期から触れることで自己成長につながるのではないかと考えたため

> CSS フレームワーク: Chakra-UI

役割

- UI を整える
- レスポンシブに対応させる

採用理由

- React で使用率が高い Material-Ui と比較したところ、レスポンシブの場面において記載量を削減できるためメインフレームワークに採用

> 開発環境: Docker/Docker-compose

役割

- 仮装開発環境の構築

採用理由

- 1 度 Dockefile を記述してしまえば、環境構築が簡単
- 短時間で行える・コンテナ型の為、軽量

> インフラ: AWS

役割

- 本番環境の運用

採用理由

- クラウドサービスの中でシェア率 No.1。記事が豊富
- Heroku と比べてカスタマイズ性が高く、インフラのイメージを掴みつつ学習ができる

> CI ツール: CircleCI

役割

- GitHub へプッシュした際の Rspec によるテストの自動化

採用理由

- SaaS 型の CI/CD なので導入コストが低い
- 企業においても採用実績が増えてきている
- cofig.yml のみでの管理、設定なので基本的な動作であれば学習コストも高くない

## こだわった点

### n+1 問題

SQL 発行数を減らし、サーバー負荷の軽減からのユーザービリティ向上のために n+1 問題を意識しました。
バックエンドのログを確認して、SQL の発行数が多いところがあれば`find` メソッドなどから指定したデータを結合して関連テーブルのデータ配列を取得・キャッシュする`eager_load`メソッドに置き換えを意識しました。

### Rspec によるテストコード

コード品質を確認するために、70 ほどのテストコード(`Rspc`)を用意しました。
エラーの見逃しを防ぐために可能な限り小さい単位のテストを意識しました。

### React におけるコンポーネント分割

コードの可読性や、再利用性を高めるためにフロントエンド(`React`)側のディレクトリ構成を`Atomic Design`の考え方のもと作成しました。

- Atom - UI の最小単位。それ以上機能的に分割できないもの。ボタンとかテキストとか。
- Molecule - Atom を組み合わせて作られる要素。検索フォームとか。
- Organisms - Molecules や Atom を組み合わせて作られる要素。ヘッダーとかがイメージしやすい。
- Template - Organisms を組み合わせたもの。いわゆるワイヤーフレーム
- Pages - 実際の文言などのデータが Template に注ぎ込まれたもの。

### Redux による State 管理

View に表示されているデータや UI の状態などのアプリケーションが保持している情報の`state`を`Redux`でグローバル管理しております。
今回のアプリの規模であれば`Redux`を用いらなくても`state`管理は可能ですが、コードの可読性の向上や、`Atomic Design`においてより`state`管理を容易にする点、実務では主流である`state`管理方法の`Redux`を導入することでより実践的な知識を身につけることができると考え導入致しました。

---

## ローカル上での起動方法

```
git clone
```

ルートディレクトリへ移動

```
cd proto2
```

Rails 設定

```
docker-cmpose build
docker-compose run back rails db:create
docker-compose run back rails db:seed
```

React 設定

```
cd front/front-app
npm install
```

環境変数設定

```
[front-app]フォルダ下に新規ファイル作成
touch .env.development

以下を[.env.development]に貼り付け
REACT_APP_USERS_API_URL= http://localhost:3001/api/v1/user/
```

ルートディレクトリに戻り chakra-ui をインストール後に起動

```
cd ../../
docker-compose run front npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4
docker-compose up
```

### サンプルデータ

以下のアドレスとパスワードでログイン機能を試すことができます

```
メールアドレス: sample@example.com
パスワード: password
名前: 佐藤二郎
```

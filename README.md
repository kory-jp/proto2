# With Accountant

経理業界の初心者を応援する情報共有サイトです。  
日々の業務のキャッチアップと合わせて、毎年の法令改正や新規の補助金制度の新設なども把握しておかなければなりません。  
そんな状況から当サイトは情報収集の面からサポート致します！

URL: https://with-accountant.com/

<img width="750" alt="8AFF07CD-EE41-4F6E-85CC-E958C8E97D1D" src="https://user-images.githubusercontent.com/66899822/135550922-bfc0b77a-47dc-415b-9e9c-2d3b147a88af.png">

## 起動方法

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

### 投稿機能追加

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

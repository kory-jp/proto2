# React_Rails_Login

React と Rails を用いたログイン機能

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

- 一覧表示機能
- 投稿機能
- 詳細表示
- 編集機能
- 削除機能

※削除、編集は作成者のみ行えます

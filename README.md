## 本番URL
[https://www.maiami.me/](https://www.maiami.me)

## 環境構築

- プロジェクトのクローン
```bash
# http
git clone https://github.com/markinveng/react-tech-blog.git
# ssh
git clone git@github.com:markinveng/react-tech-blog.git
```

- .envファイルの設定

.envファイルをルートディレクトリに作成し、下記のフォーマットに沿って記載します
```env
# サービスドメイン(https://[当該箇所].microcms.io/api/v1/)
SERVICE_DOMAIN=[サービスドメイン]
# APIキー(APIプレビュー→「X-MICROCMS-API-KEY:」後の文字列)
API_KEY=[APIキー]
# メールアドレス(Contactページ)
GMAIL_ADDRESS=[メールアドレス]
GMAIL_PASSWORD=[Gmailパスワード(16桁)]
CONTACT_RECEIVE_ADDRESS=[受信用メールアドレス]
```

- localhostを建てる
```bash
# runコマンド
npm run dev
```

localhostを建てた後 [http://localhost:3000](http://localhost:3000) にアクセスすることで表示できます。
Post.create!([
  # 1
  {
    user_id: 1,
    title: '郵便為替証書の分類がわからない',
    content: "郵便局から発行されている「郵便為替証書」をどの勘定科目で処理すればいいのか迷っています。
              \n この証書によって為替金の払渡しの請求ができるようなのですが現金で良いのでしょうか？",
    image: File.open("db/fixures/seed/production/posts/kawaseshyoshyo.jpeg"),
  },
  # 2
  {
    user_id: 5,
    title: '見本品の仕分けについて',
    content: "決算仕分けのタイミングで見本品としての商品の払出があったことが判明しました。
              \n 得意先へは無償での提供されていたようです。見本分も期末の棚卸高に含めてしまっても問題無いのでしょうか?
              \n\n どなたか回答をお待ちしております。",
    image: File.open("db/fixures/seed/production/posts/tanaoroshi.jpeg"),
  },
  # 3
  {
    user_id: 2,
    title: '令和2年度における寄付金控除における注意',
    content: "令和2年度の所得税において共有すべき例外の取り扱いがありましたのでここで投稿します。
              \n\n あなたが、令和２年２月１日から令和2年12月31日までの期間において、新型コロナウイルス感染症及びそのまん延防止のための措置の影響により中止若しくは延期又はその規模の縮小を行った文化芸術又はスポーツに関する行事で一定のものの入場料金等の払い戻しを請求する権利の全部又は一部を放棄した場合、その払戻請求権相当額の合計額について、寄付金控除又は公益社団法人等寄附金特別控除の対象とすることができます。
              \n 以下が詳しい条件になります。
              \n\n 文部科学大臣の指定行事
              \n その時の合計額が20万円を超える場合には、20万円
              \n 申告の際、指定行事の主催者から受け取る「指定行事証明書の写し」及び「払戻請求権放棄証明書」の添付が必要です。
              \n\n ※さらに詳しい情報は国税庁のHPをご確認ください。
              ",
    image: File.open("db/fixures/seed/production/posts/covid19.jpeg"),
  },
  # 4
  {
    user_id: 3,
    title: 'テナントから領収するビルの共益費',
    content: 'ビル管理会社等がテナントから受け入れる水道光熱費等の共益費等は、いわゆる「通過勘定」という実費精算的な性格を有することから、課税の対象外としてよいでしょうか。',
    image: File.open("db/fixures/seed/production/posts/building.jpeg"),
  },
  # 5
  {
    user_id: 1,
    title: 'クレジットの手数料',
    content: "
              次のクレジット手数料は、消費税課税の対象となるのでしょうか。
              \n ①加盟店が信販会社へ支払うもの（債権譲渡の対価が安くなる部分）
              \n ②消費者が信販会社へ支払うもの
              ",
    image: File.open("db/fixures/seed/production/posts/consumption-tax.jpeg"),
  },
  # 6
  {
    user_id: 5,
    title: '過大役員給与の判定基準',
    content:"
              A社は、その創立総会において、役員給与の年額を総額1億円とすることとし、その各人別内訳は役員会で決定する旨を決議しました。
              \n この決議に伴い、役員会において、甲取締役（代表者）は月額100万円以内、乙及び丙取締役（いずれも非常勤）は月額10万円以内と定めました。その後、役員給与の年額（総額1億円）を改訂せずに甲に対する支給額を増額したため、甲については支給額が1,200万円（100万円×12ヶ月）を超えることとなっていますが、甲、乙、丙の合計額では1億円を超えていません。
              \n この場合において、役員給与が過大であるか否かは、次のいずれによることになるのでしょうか。
              \n\n ①創立総会決定の1億円を基準として判定する。
              \n ②役員会決定の1,200万円（月額100万円）を基準として、個別で判定する。
            ",
    image: File.open("db/fixures/seed/production/posts/consumption-tax.jpeg"),           
  },
  # 7
  {
    user_id: 3,
    title: "青色事業専業者",
    content: "
              当社の使用人Aの妻Bは、生計を一にする父Cの青色事業専従者として月額7万円(年間84万円)の給与の支給を受けています。
              \n この場合、Aは、Bを控除対象配偶者とすることができますか。
            ",
    image: File.open("db/fixures/seed/production/posts/blue.jpeg"),     
  },
])

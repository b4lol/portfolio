            
---
title: "Android'i De-Google'laştırma: Eksiksiz Gizlilik Kılavuzu"
description: "Kullanılabilirlikten ödün vermeden maksimum gizlilik ve güvenliğe sahip, de-google'lanmış bir Android telefon kurun. Önerilen uygulamalarla adım adım kılavuz."
summary: "Kullanılabilirlikten ödün vermeden maksimum gizlilik ve güvenliğe sahip, de-google'lanmış bir Android telefon kurun. Önerilen uygulamalarla adım adım kılavuz."
keywords: ["android gizlilik", "android de-google", "degoogle telefon", "android gizlilik kılavuzu", "graphene os", "özel android kurulumu", "degoogle edilmiş telefon", "android güvenlik kılavuzu"]
author: "b4lol"
date: 2026-03-04
lastmod: 2026-05-05
weight: 1
url: /tr/android
aliases: ["/tr/android.html"]
series: ["Dijital Gizlilik"]
topics: ["android"]
faq:
  - question: "De-google'lanmış telefon nedir ve neden kullanmalıyım?"
    answer: "De-google'lanmış telefon, üzerinden Google servislerinin kaldırıldığı bir Android cihazdır. Bu, Google'ın ve üçüncü taraf şirketlerin konum, kişiler ve aramalar gibi kişisel verilerinizi sessizce toplamasını engeller."
  - question: "Gizlilik için en iyi Android işletim sistemi hangisidir?"
    answer: "Desteklenen Pixel cihazlarda GrapheneOS en iyi seçenek olmayı sürdürüyor. Cihazınız uyumlu değilse, LineageOS gibi bir ROM Google'a bağımlılığı azaltmak için işe yarayabilir, ancak aynı seviyede hardening, verified boot ve donanım güvenliği sunmaz."
  - question: "Google Play Store olmadan nasıl uygulama yükleyebilirim?"
    answer: "Uygulamaların resmi sürümlerini doğrudan takip etmek için Obtainium'u, açık kaynak yazılımlar için Droid-ify'ı ve GrapheneOS üzerinde gerçekten gerektiğinde sandboxed Play Store'u kullanabilirsiniz. Aurora Store günümüzde daha kırılgan hale geldi ve sadece bir yedek çözüm olarak değerlendirilmelidir."
  - question: "Shelter ne işe yarar ve nasıl çalışır?"
    answer: "Shelter, telefonda izole bir iş profili oluşturarak güvendiğiniz uygulamaları sosyal medya ve bankacılık uygulamaları gibi takip eden uygulamalardan ayırmanızı sağlar. İki profil paralel çalışır ama aralarında veri paylaşmazlar."
  - question: "Telefonumun tüm trafiğini Tor üzerinden nasıl geçirebilirim?"
    answer: "F-Droid'den Invizible Pro'yu kurun, VPN modunu etkinleştirin ve ağ ayarlarınızda 'her zaman açık VPN' ile 'VPN olmadan bağlantıları engelle' seçeneklerini açın. Bu şekilde tüm trafik Tor üzerinden yönlendirilecektir."
  - question: "Gizliliğimi korumak için hangi uygulama izinlerini devre dışı bırakmalıyım?"
    answer: "Gerekli olmayan tüm izinleri, özellikle konum, kamera ve mikrofonu kaldırın. Klavye, hesap makinesi ve dosya yöneticisi gibi internet erişimine ihtiyacı olmayan uygulamalar için de internet erişimini devre dışı bırakın."
  - question: "Invizible Pro ile zaten Tor kullanıyorsam VPN'e ihtiyacım var mı?"
    answer: "Tor kullanılan ana profilde ek bir VPN'e gerek yoktur. Takip eden uygulamaların bulunduğu iş profilinde, Mullvad veya Proton gibi bir VPN trafiğinizi internet servis sağlayıcınızdan koruyabilir ve reklam/izleyicileri filtreleyebilir."
howto:
  name: "Android'i gizlilik ve de-google için nasıl yapılandırılır"
  description: "İşletim sistemini seçme, gizlilik dostu uygulamaları kurma, profilleri izole etme, izinleri yönetme ve Android trafiğini koruma prosedürü."
  totalTime: "PT2H"
  supply:
    - "Güncel bir Android telefon"
    - "Verilerin yedeği"
  tool:
    - "GrapheneOS"
    - "Shelter"
    - "Obtainium"
    - "Droid-ify"
    - "Invizible Pro"
  steps:
    - name: "İşletim sistemini seçin"
      text: "Desteklenen bir Pixel'de GrapheneOS'u tercih edin, veya net trade-off'lara sahip güncel stock Android ya da alternatif ROM'ları değerlendirin."
      url: "/tr/android#sistema-operativo"
    - name: "Sistemi yapılandırın"
      text: "Gereksiz servisleri azaltın, telefonu güncelleyin ve müdahaleci ayarları sınırlayın."
      url: "/tr/android#modifica-e-setup-del-sistema"
    - name: "Mağaza ve uygulamaları seçin"
      text: "Obtainium, Droid-ify gibi doğrulanabilir kaynaklardan veya gerektiğinde sandboxed Play Store'dan uygulama yükleyin."
      url: "/tr/android#store-per-il-download-delle-app"
    - name: "Takip eden uygulamaları izole edin"
      text: "Bankacılık uygulamalarını, sosyal medyayı ve daha müdahaleci servisleri ayırmak için Shelter veya kullanıcı profillerini kullanın."
      url: "/tr/android#shelter"
    - name: "İzinleri ve ağı yönetin"
      text: "Gerekli olmayan izinleri kaldırın ve profile göre Tor veya VPN ile trafiğinizi koruyun."
      url: "/tr/android#gestione-dei-permessi-delle-app"
---

> **TL;DR** - Bu kılavuzda şunları öğreneceksiniz:
> - GrapheneOS, iyi yapılandırılmış stock Android ve alternatif ROM'lar arasında nasıl seçim yapılır
> - Google servislerinin yerine hangi gizlilik dostu uygulamaların kullanılacağı
> - Takip eden uygulamaların Shelter ile nasıl izole edileceği ve veri trafiğinin Tor ile nasıl korunacağı
> - İzinlerin, VPN'lerin ve bulutun güvenli şekilde nasıl yönetileceği

## Özet

Android'i daha özel hale getirmek için mümkün olduğunda desteklenen bir Pixel'de GrapheneOS kullanmak, daha az uygulama yüklemek, izinleri ve internet erişimini sınırlamak, takip eden uygulamaları izole profillere ayırmak ve doğrulanabilir mağazalar seçmek işe yarar. De-google'laştırma gizliliği iyileştirir, ancak güncellemelerin, verified boot'un ve iyi operasyonel alışkanlıkların yerini tutmaz.

Akıllı telefonunuz hakkınızda her şeyi bilir: nereye gittiğinizi, kiminle konuştuğunuzu, ne aradığınızı. Android'inize yüklü uygulamalar her gün kişisel verilerinizi sessizce Google'a ve onlarca üçüncü taraf şirkete gönderir. Bu kılavuz, günlük kullanım kolaylığından ödün vermeden Google'a bağımlılığı ortadan kaldırarak ve gerçekten özel bir mobil ortam kurarak telefonunuzun kontrolünü nasıl geri alacağınızı gösterir.

Bu kılavuz iyileştirmelere ve önerilere açıktır; kullanılabilirlik/gizlilik açısından en iyi dengeyi bulduğum kurulumu anlatıyorum, zaman içinde belirli bir uygulama veya servisle anlaşamayanlar için alternatifler sunarak çeşitli bölümleri genişleteceğim. Bana önerilerde bulunmak veya kılavuza katkıda bulunmak isterseniz [GitHub](https://github.com/b4lol/portfolio) üzerinden bir pull request açabilirsiniz.

Bu kılavuz Android'i genel olarak ele alıyor; özellikle GrapheneOS için de bir kılavuz yazdım, [buradan](https://b4.lol/tr/graphene) bulabilirsiniz.
  

## İşletim sistemi {#sistema-operativo}

2026'da, gizlilik/güvenlik dengesiyle gerçekten ilgileniyorsanız pratik hiyerarşi şu şekilde: **desteklenen bir Pixel'de GrapheneOS** > **güncel ve iyi yapılandırılmış stock Android** > **bootloader'ı kilidi açılmış alternatif ROM'lar**. LineageOS, CalyxOS ve benzeri projeler uyumluluk, kontrol ve Google servislerini azaltma açısından faydalı olabilir, ancak hardening veya donanım güvenliği garantileri açısından GrapheneOS'a denk sayılmamalıdır.

Mümkünse bu yüzden GrapheneOS kullanmanızı öneriyorum. Cihazınız desteklenmiyorsa, LineageOS hâlâ mantıklı olabilir, ancak verified boot, hızlı yamalar ve fiziksel saldırılara karşı korumalar konusunda daha belirgin trade-off'ları kabul etmeniz gerekir.

Bu kılavuz, telefonunuzu kullanırken güvenlik ve gizlilik arasında mükemmel bir denge sunmak için tasarlandı; rooting ve bootloader kilidini açma gibi prosedürler cihazın güvenliğini önemli ölçüde azaltır ve bu nedenle şiddetle önerilmez.

Lineage kurulum adımlarını basitleştirmek için çok kısa bir özet yapalım:

1.  Bootloader'ın kilidini açın
2.  Bir recovery flaşlayın
3.  [Lineage OS](https://lineageos.org/) flaşlayın
4.  Cihazınızda mümkünse bootloader'ı yeniden kilitleyin

Dikkat: Google uygulamaları olmayan temel sürüm gizlilik için tercih edilir, ancak 2026'da trade-off'ları açık kafayla değerlendirmek gerekir. `microG` uyumluluğu iyileştirir, ama hâlâ bir uzlaşmadır. GrapheneOS üzerinde, Google'a bağımlı uygulamalara gerçekten ihtiyacınız varsa, her yerde kısmi çözümler aramak yerine ihtiyacınız olan profilde **sandboxed Google Play Services** kullanmak genellikle daha sağlam bir yaklaşımdır.
  

Bu noktada elimizde taze, az önce kurulmuş bir işletim sistemi olacak!

## Sistem değişiklikleri ve kurulum {#modifica-e-setup-del-sistema}

Gizlilik odaklı bir cihaza sahip olmak için işletim sisteminin çeşitli ayarlarını değiştirmeye başlayacağız; cihazdan cihaza değişebilse de başlıca ayarları ve önlemleri sıralayalım:

*   Bluetooth ve konumu kullanılmadığı her an devre dışı bırakın
*   Kilit ekranında gizliliği ve bir cihaz koruma yöntemini etkinleştirin (PIN ve telefon kilitliyken gizli bildirimler)
*   Tüm telemetri verilerini devre dışı bırakın
*   Devre dışıysa cihaz şifrelemesini etkinleştirin
*   Yedeklemeleri devre dışı bırakın
*   Yüklü tüm uygulamalarda, mümkünse, telemetri ve çökme verisi paylaşımını her zaman reddedin
*   Büyük güvenlik risklerine yol açtığı için USB hata ayıklamayı kullandığınız her an kapatmayı unutmayın (varsayılan olarak devre dışıdır)

Uygulama izinlerini daha sonra ele alacağız.
  

## Uygulama indirme mağazaları {#store-per-il-download-delle-app}

Artık Google dünyasından ayrı olduğumuz için uygulamaları indirmek için başka mağazalar bulmamız gerekecek, başlıca alternatifler şunlardır:

*   [Obtainium](https://obtainium.imranr.dev/): bir mağazadan ziyade bir uygulama güncelleyicidir, Linux paket yöneticilerine benzer şekilde çalışır. Mükemmel güvenlik ve gizlilik sunar; uygulamaları doğrudan GitHub'daki sürümlerden veya F-Droid depolarından indirip güncellemenizi sağlar.
*   [Droid-ify](https://www.f-droid.org/packages/com.looker.droidify/): daha şık bir arayüze ve bazı ek özelliklere sahip F-Droid fork'u. Bazı güvenlik trade-off'larına sahip olsa da çok iyi yapılmış bir açık kaynak uygulama mağazası.
*   **GrapheneOS** üzerinde, Google'a bağımlı veya tescilli uygulamalara ihtiyacınız olduğunda en sağlam yöntem GrapheneOS App Store'dan kurulan **sandboxed Play Store** olarak kalır.
*   [Aurora Store](https://files.auroraoss.com/AuroraStore/Stable/): hâlâ acil durum çözümü olarak işe yarayabilir, ancak günümüzde geçmişe kıyasla daha az güvenilirdir ve anonim paylaşılan hesaplar genellikle başarısız olur veya sınırlandırılır.

  

## Shelter {#shelter}



⚠️ Bu adım isteğe bağlıdır; esas olarak telefonunuzda birbirinden izole çeşitli "konteynerler" oluşturmakla ilgileniyorsanız işe yarar. Shelter kullanmanın avantajları ve dezavantajları vardır ve gerçekten iş profillerine ihtiyacınız varsa yapılmalıdır. Android 15+ üzerinde, birçok kullanım durumu için daha basit olan **Private Space** da bulunur; GrapheneOS üzerinde ise bölümlemenin en güçlü çözümü hâlâ **ikincil kullanıcı profilleri**dir.

Artık mağazalarımız yapılandırıldığına göre [Shelter](https://f-droid.org/packages/net.typeblog.shelter/)'ı indirmeye geçebiliriz.

Shelter, telefonda bir iş profili oluşturmamızı sağlayan açık kaynak bir uygulamadır; yani birinci profille aynı anda ama izole ve bağımsız şekilde çalışan ikinci bir profil.
  
Bir masa düşünün (işletim sistemimiz), üzerinde iki kapalı ve mühürlü kutu (iki profilimiz); bu ikisi tamamen bağımsız ve ayrı, ama ortak bir taban kullanıyor. Telefonumuzun işletim sistemi zaten kirli ve Google Play Services gibi takip eden uygulamalarla doluysa, Shelter kullanmak büyük ölçüde anlamsız hale gelir. ROM değiştirmek istemiyorsanız, en azından çoğu varsayılan işletim sisteminde bulunan gizlilik açısından zararlı başlıca uygulamaları birkaç basit dokunuşla devre dışı bırakmanızı sağlayan şu [Android Debloater](https://github.com/Universal-Debloater-Alliance/universal-android-debloater-next-generation)'ı kullanın (DİKKAT: uygulamaları devre dışı bırakın, kaldırmayın; aksi halde telefonunuz şifreliyse sistemi bozma riskiniz vardır).
  
Shelter'ı açtığınızda iş profili yapılandırma menüsü açılacak; etkinleştirildiğinde 2 bölüme ayrılmış uygulama arayüzüne erişeceğiz:

*   **Main**: sadece açık kaynaklı veya internet erişimi olmayan uygulamaları kuracağımız ana profil.
*   **Shelter**: sosyal medya, bankacılık uygulamaları veya kapalı kaynaklı uygulamalar gibi tüm kötü amaçlı ve takip eden uygulamaları izole edeceğimiz bölüm.

İki profil tamamen ayrıdır; ana profile yüklenen uygulamaları normal simgeler olarak göreceğiz, iş profiline yüklenenler ise onları diğerlerinden ayıran küçük bir rozet gösterecek, aynı başlatıcı içinde birlikte var olacaklar. Uygulamaları istediğiniz profile yüklemek için şu 3 yöntemden birini kullanmanız yeterli:
  

*   Shelter uygulamasından bir uygulamayı bir profilden diğerine klonlayın (veya ayarlardan APK yükle işlevini kullanın).
*   Uygulamaları o profile kurulu bir mağazadan indirin (örneğin temiz profilde Droid-ify/Obtainium ve, tescilli yazılıma ihtiyacınız varsa, daha "kirli" profilde Play Store veya Aurora).
*   İnternetten indirilen APK'ları kurun (mümkünse her zaman bir uygulama mağazası kullanın, bu çeşitli yazılımları indirmeyi ve güncellemeyi daha kolay ve güvenli hale getirir).

İki sistem izole olacak, bu da kişiler, galeri, dosyalar vb. yönetimi için oldukça elverişsiz olacaktır, çünkü her birinin kendine ait olanları olacak. Shelter ayarlarında, dosya paylaşımı için iki sistemin kısmen birbirleriyle "konuşmasını" sağlayan bir özelliği etkinleştirebilirsiniz. Buna rağmen, her şeyi yönetmek alıştırana kadar biraz elverişsiz kalacaktır.

## Profiller arası tehdit modelinin yönetimi

Artık tamamen farklı ve izole iki sistemimiz olduğuna göre, her ikisinde de farklı bir tehdit modeli uygulayacağız. Birincisinde (temiz ve açık kaynaklı), tüm veri trafiğini Tor ve DNSCrypt üzerinden geçirerek maksimum gizliliği hedefleyeceğiz; ikincisinde (kirli ve takip eden öğeler içeren) ise, kişisel verilerimizin muhtemelen zaten bu uygulamalarda olduğunun farkında olarak verilerimizin sızmasını mümkün olduğunca azaltmayı hedefleyeceğiz (yani reklamları ve izleyicileri mümkün olduğunca sınırlayacağız).
  
Önce ana profile odaklanalım ve tüm trafiği Tor altına yönlendiren ve DNS'i şifreleyen [Invizible Pro](https://www.f-droid.org/packages/pan.alexander.tordnscrypt.stable/)'yu indirelim.

Uygulamayı açtıktan sonra, sağ üstteki 3 nokta menüsünden VPN modunu etkinleştirelim. Ardından telefonun ayarlarına gidip **Ağ → Gelişmiş/VPN → Invizible Pro** bölümünde 'her zaman açık VPN' ve 'VPN olmadan bağlantıları engelle' modlarını etkinleştirelim; bu şekilde tüm trafik Invizible üzerinden geçecek ve her türlü veri sızıntısından kaçınacağız.
  
Ağı doğru şekilde ayarladığımıza göre, şimdi Invizible içindeki bazı ayarları değiştirelim; zaman içinde bu ayarlar bazen yer değiştiriyor, uygulamanın ayarlarına bir göz atın, her şeyi yine de bulacaksınız:

*   **DNSCrypt settings** içinde require_dnssec, nolog ve nofilter'ı etkinleştirelim; bu, her zaman mümkün olan en iyi DNS sunucularını kullanmamızı sağlayacak.
*   **Fast Settings** bölümünde 'açılışta DNSCrypt'i başlat' ve 'açılışta TOR'u başlat'ı etkinleştirelim, bu şekilde uygulama doğrudan açılışta otomatik olarak başlayacak.
*   Ayarlarda **Common Settings**'e gidip **MITM attack detection** bölümündeki 3 korumanın tamamını etkinleştirelim; bunlar açık Wi-Fi'lere bağlandığımızda cihazımızı koruyacak.
*   Son olarak **Firewall** kategorisine gidip ihtiyacı olmayan tüm uygulamaların internet erişimini devre dışı bırakalım (örneğin galeri, klavye, çevrimdışı oyunlar vb.)

Bu noktada ana profil kullanıma hazır, şimdi kapalı kaynaklı uygulamaların bulunduğu iş profiline geçebiliriz.

Burada veri korumak için iki farklı teknik benimseyebiliriz:

*   İnternet servis sağlayıcımıza karşı koruma arıyorsak bir VPN kullanmak (bu sayede reklamları ve izleyicileri de filtreleyebiliriz).
*   İhtiyacı olmayan uygulamaların internet erişimini engellemek ve reklam/izleyici engellemeyi eklemek için NetGuard veya RethinkDNS, NextDNS gibi bir uygulama kullanmak.

Tüm seçenekler geçerlidir, karar büyük ölçüde bir VPN servisi kullanmaya istekli olup olmamanıza bağlıdır. Konuyu daha derinlemesine incelemek isterseniz [ilgili bölüme](#cloud) önceden bir göz atabilirsiniz.

## Uygulamalar

Mağazalarımız ve ağlarımız iyi yapılandırıldığına göre, şiddetle önerilen bazı uygulamaları indirmeye geçelim:

*   [HeliBoard](https://github.com/Helium314/HeliBoard): Gboard ile tamamen aynı işlevlere sahip açık kaynaklı bir Android klavyesi; yazdıklarınızı çevrimiçi sunuculara iletmeyen çevrimdışı bir klavye kullanmak iyi bir güvenlik ve gizlilik için temeldir.
*   [Cromite](https://github.com/uazo/cromite): günlük tarama için harika bir tarayıcı; diğer alternatifler Brave veya Vanadium'dur (sonuncusu şu anda sadece GrapheneOS üzerinde mevcuttur). Yüksek güvenlik seviyeleri arıyorsanız Firefox tabanlı tarayıcılardan KAÇININ; mobilde çeşitli özelliklerden yoksunlar ve saldırı yüzeyleri çok daha büyük.
  

Bu noktada, hangi profile kurduğumuza dikkat ederek uygulamaları indirmeye geçebiliriz:

  
*   [Aegis](https://www.f-droid.org/packages/com.beemdevelopment.aegis/): Authy/Google Authenticator'a açık kaynaklı ve çevrimdışı bir alternatif
*   [AntennaPod](https://f-droid.org/packages/de.danoeh.antennapod/): kaynak olarak başlıca mevcut podcast okuyucularını kullanan, tamamen açık kaynaklı bir podcast oynatıcı
*   [Bitwarden](https://github.com/bitwarden/mobile/releases): en iyi parola yöneticisi, son derece güvenli, self-hosting'e de izin veriyor
*   [Crypto Prices](https://f-droid.org/packages/de.cloneapps.crypto_prices): CoinMarketCap'e bir alternatif
*   [Guerrilla Mail](https://f-droid.org/it/packages/cf.theonewiththebraid.guerrilla_mail/): spam için bir geçici e-posta servisi olan Guerrilla Mail için istemci
*   [LibreTorrent](https://www.f-droid.org/packages/org.proninyaroslav.libretorrent/): Android için basit, kullanışlı ve hızlı bir Torrent istemcisi
*   [KeePassDX](https://www.f-droid.org/packages/a.veux.keepassdx/): KeePass formatını (.kdbx) destekleyen, Android için hafif, güvenli ve açık kaynaklı bir çevrimdışı parola yöneticisi. Parolalarını bulut yerine yerel olarak saklamak isteyenler için mükemmeldir.
*   [Molly](https://molly.im/): Google kodundan temizlenmiş, hardened bir Signal sürümü; ülkenizde yasalsa belgesiz alınmış bir SIM ile kayıt olmak iyi bir fikir olabilir
*   [Nekogram](https://nekogram.app/): Play Services'e bağımlı olmayan kullanışlı bir Telegram istemcisi, ama unutmayın **Telegram normal sohbetlerde varsayılan olarak E2EE sunmaz**. Hassas konuşmalar için Signal/Molly veya SimpleX daha iyidir
*   [PipePipe](https://github.com/InfinityLoop1308/PipePipe): bir PeerTube istemcisi, tüm YouTube videoları ama Google olmadan!
*   [Nextcloud](https://f-droid.org/en/packages/com.nextcloud.client/): Nextcloud'u kullanmak ve senkronize etmek için istemci, bana göre evde kendi medya sunucunuzu kurmak için en iyi yazılım
*   [OpenKeychain](https://www.f-droid.org/packages/org.sufficientlysecure.keychain/): PGP anahtarlarınızı yönetmek veya bunları mesajlaşma/e-posta uygulamalarına entegre etmek için bir uygulama
*   [BlueWallet](https://www.f-droid.org/packages/io.bluewallet.bluewallet/): hem zincir üstü (on-chain) hem de Lightning Network işlemlerini destekleyen, özelliklerle dolu, güvenli ve aktif olarak geliştirilen açık kaynaklı bir Bitcoin cüzdanı.
*   [SimpleLogin](https://www.f-droid.org/packages/io.simplelogin.android.fdroid/): sitelere kaydolmak için sahte e-posta adresleri oluşturan bir tür spam karşıtı e-posta proxy'si; bu adresler otomatik olarak e-postaları sizin seçtiğiniz başka adreslere yönlendirir, böylece gerçek e-postanızı dış sitelere vermeniz gerekmez. Ayrıca istediğiniz zaman sahte adresleri silebilir veya askıya alabilir, böylece ana hesabınıza e-posta gelmesini durdurabilirsiniz
*   [Simple Crypto Widget](https://f-droid.org/packages/com.brentpanther.bitcoinwidget/): ana ekranınızda kripto... yani Bitcoin fiyatlarını güncel tutmak için
*   [Tor Browser](https://www.torproject.org/download/): Tor kütüphanesi entegre edilmiş resmi Tor tarayıcısı, IP adresinizi ifşa etmeden çevrimiçi gezinmek için kullanışlı. Mükemmel anonimlik garanti etmez, ama .onion sitelerinde gezinmek ve onları kullanmak için en kullanışlı araçlardan biridir
*   [Voice](https://www.f-droid.org/packages/de.ph1b.audiobook/): çevrimdışı ve açık kaynaklı bir sesli kitap oynatıcısı

Daha fazla gizlilik dostu uygulama, tarayıcı ve servis için [privacytools](https://www.privacytools.io/) (tarihi bir proje, günümüzde büyük ölçüde Privacy Guides ile değiştirildi), [privacyguides](https://privacyguides.org/providers/) veya Droid-ify'daki çeşitli kategorilere bakmanızı öneririm.

## E-posta istemcileri ve sağlayıcıları

Hangi e-posta istemcisinin ve sağlayıcısının en iyi olduğu konusu uzun ve karmaşıktır; hızlı ve kullanışlı, ama bir miktar güven duymanız gereken bir servis istiyorsanız [Proton Mail](https://github.com/ProtonMail/proton-mail-android/releases)'i öneririm; kullanıma hazır çeşitli çözümler arasında kesinlikle en iyi kullanılabilirlik/gizlilik dengesine sahip olanlardan biridir.

Çok geçerli bir seçenek, istemci olarak (yani e-postaları aldığınız uygulama) [Thunderbird](https://www.thunderbird.net/en-US/) ve sağlayıcı olarak (yani uygulamaya bağlanacak e-posta servisi) [Riseup](https://riseup.net/), [Esiliati](https://esiliati.org/) veya [Autistici](https://www.autistici.org/) gibi gizlilik dostu veya anarşist bir grup/kolektif kullanmaktır.

Thunderbird'ün ayarları içinde çok ilginç olan bir özellik de e-posta otomatik şifreleme seçeneğidir: OpenKeychain'den (yukarıda ele alınan uygulama) bir PGP anahtarı içe aktararak, karşı taraf da bir PGP anahtarı içe aktarmışsa, e-postaları otomatik olarak şifreleyebilirsiniz.

Kılavuzun bu noktasında, kişisel uygulamalarınızın ve benim belirttiğim veya önerdiğim uygulamaların tümünü kurmuş olmanız gerekir; artık çeşitli izinler üzerinde çalışabiliriz. İleride başka uygulamalar kurarsanız, bu prosedürü onlar için de uygulayın.

## Uygulama izinlerinin yönetimi {#gestione-dei-permessi-delle-app}

İlk adım olarak telefonunuzun ayarlarına gidip Uygulamalar → Gelişmiş → İzin Yöneticisi bölümüne girelim ve burada uygulamaların gereksiz tüm izinlerini kaldıralım (örneğin WhatsApp gibi bir uygulama, kişileri bulmak istiyorsak kişilerimize ihtiyaç duyar, bu yüzden düzgün çalışması için bu izni bırakmak mantıklıdır, ama mesajlara erişimi güvenle devre dışı bırakabiliriz, çünkü bu sadece ilk girişte hesabınıza giriş yaparken hızlandırma amacıyla kullanılır; etkin bırakılırsa WhatsApp'a tüm SMS'lerinizi okuma fırsatı verir).
  
Konum, kamera ve mikrofon izinlerine özellikle dikkat edelim.
  
Bir uygulama yararlı olmayan veya ara sıra kullanacağınızın farkında olduğunuz bir izin istediğinde, sürekli erişime sahip olmaması için iznini 'sadece bu kez' verin.
  
Tüm izinleri değiştirdikten sonra, ağ bağlantısına ihtiyacı olmayan tüm uygulamaların (örneğin çeşitli dosya yöneticileri, hesap makineleri, takvimler, notlar, klavyeler vb.) internet erişimini de devre dışı bırakalım. Bunu, bir uygulamanın bilgilerine gidip → Veri ve ağ → 'Ağ erişimi'ni devre dışı bırakarak rahatça yapabiliriz.
  
Bu uygulamalar için internetin engellendiğinden daha fazla emin olmak isterseniz, daha önce ele alınan NetGuard ve Invizible gibi servisleri bunları bir güvenlik duvarının arkasına almak için kullanabilirsiniz. Uygulamaların internet erişimini hafife almayın; çoğu, çalışmaları için buna ihtiyaç duymasalar da, verilerinizi paylaşmak için sürekli kullanır.

## Bulut

En iyi bulut çözümü Nextcloud ile self-hosting olurdu (bana göre en iyi seçim). Bu mümkün değilse, günümüzde **Proton Drive** birkaç yıl öncesine kıyasla çok daha olgunlaşmış durumda ve en sık önereceğim hosted çözüm haline geldi. [Mega.nz](https://mega.nz/) kolaylık ve ücretsiz alan arıyorsanız hâlâ mantıklı olabilir, ama gerçekten gizlilik odaklı bir kurulum için ilk seçim olarak değerlendirmezdim.

Bunun yerine ek bir güvenlik istiyorsak, bir bulutu [Cryptomator](https://cryptomator.org/) (dosyaları buluta yüklemeden önce şifreleyen bir program) ile birlikte kullanabiliriz.
  
## VPN
VPN konusu ise farklı bir durumdur; bir VPN trafiğimizi şifreler ve kendi düğümünden geçirerek kendisini bizimle internet servis sağlayıcımız arasına koyar, bu da bize ona karşı daha fazla gizlilik sağlar ama bizi VPN servisinin kendisine güvenmeye zorlar.

Bu sektördeki tüm şirketler gizlilik ve no-logging politikaları vaat eder, ama bu iddiaları doğrulamak mümkün değildir. Bana göre en ilginç servisler şunlardır:

* Mullvad
* Proton
* IVPN
* [Self-host](https://b4.lol/tr/vpn)
  
## Son düşünceler

Bu kılavuzu takip ederek kişisel verilerimizin paylaşımını ciddi şekilde azaltmış olacağız; bu hiçbir şekilde anonimlik garanti etmez, ama cihazı kullanırken gizliliği ve güvenliği kesinlikle artırır.
  
Gizlilik ve degoogle alanında güncel kalmak için diğer harika yerler çeşitli subreddit'lerdir:

*   [DEGOOGLE](https://www.reddit.com/r/degoogle/)
*   [PRIVACYTOOLS](https://www.reddit.com/r/privacytools/)
*   [PRIVACY](https://www.reddit.com/r/privacy/)

> "Gizliliğin gizleyecek bir şeyiniz olmadığı için gereksiz olduğunu söylemek, söyleyecek bir şeyiniz olmadığı için ifade özgürlüğünün gereksiz olduğunu söylemek gibidir."

---

## İlgili Kılavuzlar

- **[GrapheneOS Üzerine Eksiksiz Kılavuz](/tr/graphene)** - Mobil gizlilik için en iyi işletim sistemi, en ince ayrıntısına kadar incelendi
- **[Tehdit Modeli Nasıl Oluşturulur](/tr/threat-model)** - Gizliliğinizi korumanın ilk adımı: tehditleri tanımlamak
- **[AdBlock'lu Self-Hosted VPN](/tr/vpn)** - Reklamları ve izleyicileri engellemek için Wireguard ve Pi-Hole ile kendi kişisel VPN'inizi oluşturun
- **[Tor Düğümü Eğitimi](/tr/tor)** - Tor ağına katkıda bulunun ve anonim şekilde gezinin

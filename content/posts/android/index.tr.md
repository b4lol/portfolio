---
title: "Android'i Google Servislerinden Arındırma: Eksiksiz Gizlilik Kılavuzu"
description: "Kullanılabilirlikten ödün vermeden maksimum gizlilik ve güvenliğe sahip, Google servislerinden arındırılmış bir Android telefon kurun. Önerilen uygulamalarla adım adım kılavuz."
summary: "Kullanılabilirlikten ödün vermeden maksimum gizlilik ve güvenliğe sahip, Google servislerinden arındırılmış bir Android telefon kurun. Önerilen uygulamalarla adım adım kılavuz."
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
  - question: "Google servislerinden arındırılmış telefon nedir ve neden kullanılmalıdır?"
    answer: "Google servislerinden arındırılmış (de-googled) telefon, üzerinde Google servislerinin bulunmadığı bir Android cihazdır. Bu kurulum, Google'ın ve üçüncü taraf şirketlerin konum, kişiler ve arama geçmişi gibi kişisel verilerinizi arka planda toplamasını engeller."
  - question: "Gizlilik için en iyi Android işletim sistemi hangisidir?"
    answer: "Desteklenen Pixel cihazlarda GrapheneOS en iyi seçenek olmayı sürdürmektedir. Cihazınız uyumlu değilse, LineageOS gibi bir ROM Google'a bağımlılığı azaltmak için kullanılabilir; ancak aynı seviyede güvenlik sıkılaştırması (hardening), güvenli önyükleme (verified boot) ve donanım güvenliği sunmayacaktır."
  - question: "Google Play Store olmadan nasıl uygulama yüklenebilir?"
    answer: "Uygulamaların resmi sürümlerini doğrudan kaynaklarından takip etmek için Obtainium'u, açık kaynaklı yazılımlar için Droid-ify'ı ve GrapheneOS üzerinde gerçekten gerektiğinde yalıtılmış (sandboxed) Play Store'u kullanabilirsiniz. Aurora Store ise bir yedek çözüm olarak değerlendirilmelidir."
  - question: "Shelter ne işe yarar ve nasıl çalışır?"
    answer: "Shelter, telefonda izole bir iş profili oluşturarak güvendiğiniz uygulamaları, sosyal medya ve bankacılık gibi veri toplayan uygulamalardan ayırmanızı sağlar. İki profil paralel çalışır ancak aralarında veri paylaşımı yapmaz."
  - question: "Telefonun tüm trafiği Tor üzerinden nasıl geçirilir?"
    answer: "Invizible Pro uygulamasını kurarak VPN modunu etkinleştirebilir ve ağ ayarlarından 'her zaman açık VPN' ile 'VPN olmadan bağlantıları engelle' seçeneklerini açabilirsiniz. Bu sayede tüm trafik Tor üzerinden yönlendirilecektir."
  - question: "Gizliliği korumak için hangi uygulama izinleri devre dışı bırakılmalıdır?"
    answer: "Gerekli olmayan tüm izinleri, özellikle konum, kamera ve mikrofonu kapatın. Klavye, hesap makinesi ve dosya yöneticisi gibi internet erişimine ihtiyacı olmayan uygulamaların internet yetkisini de devre dışı bırakın."
  - question: "Invizible Pro ile zaten Tor kullanılıyorsa VPN'e ihtiyaç duyulur mu?"
    answer: "Tor kullanılan ana profilde ek bir VPN'e gerek yoktur. Ancak takip eden uygulamaların bulunduğu iş profilinde, Mullvad veya Proton gibi bir VPN trafiğinizi servis sağlayıcınızdan koruyabilir ve reklamlar ile izleyicileri filtreleyebilir."
howto:
  name: "Android'i gizlilik ve Google servislerinden arındırma için nasıl yapılandırılır"
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

> **TL;DR** - Bu kılavuzda öğrenecekleriniz:
> - GrapheneOS, iyi yapılandırılmış standart (stock) Android ve alternatif ROM'lar arasında nasıl seçim yapılacağı,
> - Google servislerinin yerine hangi gizlilik odaklı uygulamaların tercih edilebileceği,
> - Takip eden uygulamaların Shelter ile nasıl izole edileceği ve veri trafiğinin Tor ile nasıl korunacağı,
> - Uygulama izinlerinin, VPN servislerinin ve bulut depolamanın nasıl güvenli şekilde yönetileceği.

## Özet

Android cihazları daha gizli hale getirmek için desteklenen bir Google Pixel cihazda GrapheneOS kullanmak, yüklenen uygulama sayısını azaltmak, izinleri ve internet erişimini sınırlandırmak, takip eden uygulamaları izole profillere ayırmak ve güvenilir uygulama mağazalarını tercih etmek gerekir. Google servislerinden arındırma (de-googling), gizliliği önemli ölçüde artırsa da sistem güncellemelerinin, güvenli önyüklemenin (verified boot) ve güvenli kullanım alışkanlıklarının yerini tutamaz.

Akıllı telefonlar kullanıcılar hakkında neredeyse her şeyi bilir: gidilen yerler, iletişim kurulan kişiler ve yapılan aramalar bunlardan yalnızca birkaçıdır. Android cihazlara yüklü uygulamalar, her gün kişisel verileri sessizce Google'a ve onlarca üçüncü taraf şirkete gönderir. Bu kılavuz, günlük kullanım kolaylığından ödün vermeden Google'a bağımlılığı ortadan kaldırmayı ve gerçekten gizli bir mobil ortam kurarak cihazın kontrolünü nasıl geri alacağınızı açıklamaktadır.

Bu kılavuz, kullanıcıların geri bildirimlerine ve önerilerine açıktır. Burada, kullanılabilirlik ve gizlilik arasında en iyi dengeyi sunan bir kurulum ele alınmaktadır. İlerleyen süreçte, belirli uygulamalarla sorun yaşayanlar için alternatif çözümler eklenerek içerik genişletilecektir. Öneride bulunmak veya katkı sağlamak isterseniz [GitHub](https://github.com/b4lol/portfolio) üzerinden bir çekme isteği (pull request) gönderebilirsiniz.

Bu kılavuz Android'i genel olarak ele almaktadır. Özel olarak GrapheneOS işletim sistemini inceleyen rehbere [buradan](/tr/graphene) ulaşabilirsiniz.

## İşletim Sistemi {#sistema-operativo}

Güvenlik ve gizlilik dengesi açısından mobil işletim sistemleri arasında şu şekilde bir hiyerarşi mevcuttur: **desteklenen bir Pixel cihazda GrapheneOS** > **güncel ve iyi yapılandırılmış standart (stock) Android** > **bootloader kilidi açılmış alternatif ROM'lar**. LineageOS, CalyxOS ve benzeri projeler Google bağımlılığını azaltmak için faydalı olsa da güvenlik sıkılaştırması (hardening) ve donanım güvenliği standartları açısından GrapheneOS seviyesinde değildir.

Bu nedenle, mümkünse GrapheneOS kullanılması önerilmektedir. Cihazınız desteklenmiyorsa LineageOS gibi alternatifler değerlendirilebilir; ancak güvenli önyükleme (verified boot), hızlı güvenlik yamaları ve fiziksel saldırılara karşı koruma gibi konularda bazı ödünler verilmesi gerektiği unutulmamalıdır.

Bu kılavuz, cihazı kullanırken güvenlik ve gizlilik arasında en iyi dengeyi sağlamak amacıyla hazırlanmıştır. Root yetkisi alma (rooting) ve önyükleyici (bootloader) kilidini açma gibi işlemler cihazın temel güvenlik mekanizmalarını zayıflattığı için önerilmemektedir.

Alternatif bir ROM (örneğin LineageOS) kurulum adımlarının kısa özeti şu şekildedir:

1. Bootloader kilidini açın.
2. Özel bir kurtarma modu (recovery) yükleyin.
3. [LineageOS](https://lineageos.org/) yazılımını cihaza yükleyin (flash).
4. Cihazınız destekliyorsa bootloader kilidini tekrar kapatın.

**Dikkat:** Google uygulamalarını içermeyen temel sürümler gizlilik açısından önceliklidir. `microG` kullanımı uygulama uyumluluğunu artırsa da güvenlik açısından bir ödün niteliğindedir. GrapheneOS üzerinde, Google servislerine bağımlı uygulamaların çalıştırılması gerekiyorsa, kararsız alternatifler aramak yerine ilgili profilde yalıtılmış (sandboxed) Google Play servislerinin kullanılması daha kararlı ve güvenli bir yaklaşımdır.

## Sistem İnce Ayarları ve Kurulumu {#modifica-e-setup-del-sistema}

Gizlilik odaklı bir cihaza sahip olmak için işletim sisteminde bazı yapılandırma değişiklikleri yapılması gerekir. Cihaz modeline göre menü isimleri değişebilse de temel olarak şu önlemler alınmalıdır:

* Bluetooth ve konum servislerini kullanılmadığı zamanlarda kapalı tutun.
* Güvenli PIN kullanımı ve kilit ekranında bildirim içeriklerinin gizlenmesini sağlayın.
* Tüm telemetri verisi gönderimlerini devre dışı bırakın.
* Devre dışı ise cihaz şifrelemeyi (encryption) etkinleştirin.
* Google veya diğer üretici bulut yedeklemelerini kapatın.
* Yüklü uygulamaların ilk açılışında telemetri ve hata raporu paylaşım izinlerini reddedin.
* Ciddi güvenlik riskleri oluşturabileceğinden, USB hata ayıklama (USB debugging) özelliğini kullandıktan hemen sonra kapatın (varsayılan olarak kapalı tutulmalıdır).

## Uygulama Dağıtım Platformları {#store-per-il-download-delle-app}

Google Play Store kullanmadığımız bu kurulumda, uygulamaları güvenle indirebilmek için şu alternatif mağazalar tercih edilmelidir:

* [Obtainium](https://obtainium.imranr.dev/): Bir uygulama mağazasından ziyade, uygulamaları doğrudan kaynaklarından (GitHub, GitLab vb.) çekerek güncel tutmanızı sağlayan açık kaynaklı bir araçtır. Üçüncü taraf aracıları aradan kaldırdığı için oldukça güvenlidir.
* [Droid-ify](https://www.f-droid.org/packages/com.looker.droidify/): F-Droid deposu için geliştirilmiş modern ve hızlı bir arayüzdür. Geniş bir açık kaynaklı uygulama kütüphanesi sunar.
* **GrapheneOS** kullanıyorsanız, tescilli (proprietary) veya bankacılık gibi Google servislerine ihtiyaç duyan uygulamalar için en güvenli yol, yalıtılmış (sandboxed) Google Play Store kurulumudur.
* [Aurora Store](https://files.auroraoss.com/AuroraStore/Stable/): Google Play Store'daki uygulamaları anonim olarak indirmenizi sağlayan bir istemcidir. Ancak Google'ın kısıtlamaları nedeniyle zaman zaman bağlantı sorunları yaşayabilmektedir.

## Uygulama Yalıtımı (Shelter) {#shelter}

⚠️ **Not:** Bu adım isteğe bağlıdır ve yalnızca cihazınızda yalıtılmış alanlar (konteynerler) oluşturmak istiyorsanız gereklidir. Android 15 ve sonraki sürümlerde, benzer bir işlevi gören 'Özel Alan' (Private Space) özelliği yerleşik olarak sunulmaktadır. GrapheneOS üzerinde ise yalıtım sağlamanın en güvenli yöntemi ikincil kullanıcı profilleridir.

Uygulama mağazalarınızı yapılandırdıktan sonra dilerseniz [Shelter](https://f-droid.org/packages/net.typeblog.shelter/) uygulamasını kurabilirsiniz. Shelter, cihazda bir iş profili (work profile) oluşturarak ana profilden yalıtılmış ikinci bir çalışma alanı kurulmasını sağlayan açık kaynaklı bir uygulamadır.

Bu durum, aynı işletim sistemi üzerinde çalışan ancak birbirinin verilerine erişemeyen iki yalıtılmış alana benzer. Ancak cihazın orijinal işletim sistemi zaten Google servisleri ve izleyici uygulamalarla doluysa, Shelter kullanımı sınırlı bir koruma sağlayacaktır. İşletim sistemini değiştiremiyorsanız, en azından sistemle birlikte gelen istenmeyen uygulamaları devre dışı bırakmak için [Universal Android Debloater](https://github.com/Universal-Debloater-Alliance/universal-android-debloater-next-generation) aracı kullanılabilir. (**Dikkat:** Uygulamaları tamamen kaldırmak yerine devre dışı bırakmayı tercih edin; aksi takdirde şifrelenmiş sistemlerde kararlılık sorunları yaşanabilir).

Shelter başlatıldığında iş profili kurulum sihirbazı çalışacaktır. Kurulum tamamlandıktan sonra uygulama arayüzünde iki ana bölüm görünür:

* **Main (Ana Profil)**: Yalnızca güvenilir, açık kaynaklı veya internet erişimine ihtiyaç duymayan uygulamaların kurulacağı alan.
* **Shelter (İş Profili)**: Sosyal medya, bankacılık ve diğer kapalı kaynaklı uygulamaların yalıtılacağı alan.

Her iki profil de yalıtılmış durumdadır. Ana profildeki uygulamalar normal simgelerle görünürken, iş profilindekiler küçük bir çanta/profil rozetiyle ayırt edilir. Uygulamaları ilgili profile yüklemek için şu yöntemler kullanılabilir:

* Shelter arayüzünden bir uygulamayı profiller arasında klonlayabilirsiniz.
* Doğrudan ilgili profile kurulmuş olan uygulama mağazasını (örneğin iş profilinde Aurora Store veya Sandboxed Play Store) kullanabilirsiniz.
* İndirilen APK dosyalarını doğrudan ilgili profile yükleyebilirsiniz.

Profiller tamamen yalıtıldığı için rehber, galeri ve dosya yönetimi gibi işlemler başlangıçta alışkanlık gerektirebilir; çünkü her profil kendi veri depolama alanına sahiptir. Shelter ayarlarından dosya paylaşım izni etkinleştirilerek profiller arası sınırlı veri aktarımı sağlanabilir.

## Profiller Arası Tehdit Modeli Yönetimi

Birbirinden bağımsız iki profil oluşturulduktan sonra, her alan için farklı bir tehdit modeli uygulanabilir. Ana profilde (açık kaynaklı ve güvenli uygulamaların bulunduğu alan) veri trafiğini Tor ve DNSCrypt gibi protokollerle şifreleyerek üst düzey gizlilik sağlanabilir. İş profilinde ise (sosyal medya ve bankacılık gibi kapalı kaynaklı uygulamalar) verilerin izinsiz toplanmasını en aza indirmek amacıyla reklam ve izleyici engelleyiciler aktif hale getirilmelidir.

Öncelikle ana profildeki veri trafiğini korumak amacıyla tüm bağlantıları Tor ağı üzerinden yönlendirleyen ve DNS sorgularını şifreleyen [Invizible Pro](https://www.f-droid.org/packages/pan.alexander.tordnscrypt.stable/) uygulaması kurulmalıdır.

Uygulama açıldıktan sonra VPN modu aktif hale getirilmelidir. Ardından cihaz ayarlarından **Ağ ve İnternet → VPN → Invizible Pro** adımları takip edilerek 'Her zaman açık VPN' ve 'VPN dışındaki bağlantıları engelle' seçenekleri etkinleştirilmelidir. Böylece tüm veri trafiğinin yalıtılmış kanaldan geçmesi sağlanır.

İnce ayarlar için Invizible Pro içerisinde şu yapılandırmalar önerilir:

* **DNSCrypt Ayarları**: `require_dnssec`, `nolog` ve `nofilter` seçeneklerini etkinleştirerek güvenli ve kayıtsız DNS sunucuları tercih edilebilir.
* **Hızlı Ayarlar**: `Açılışta DNSCrypt'i başlat` ve `Açılışta Tor'u başlat` seçenekleri aktif edilerek sistem açılışında otomatik çalışma sağlanabilir.
* **Ortak Ayarlar (Common Settings)**: `MITM attack detection` altındaki koruma modları etkinleştirilerek güvensiz kablosuz ağlardaki (ortak Wi-Fi) tehditler engellenebilir.
* **Güvenlik Duvarı (Firewall)**: İnternet erişimine ihtiyaç duymayan uygulamaların (galeri, çevrimdışı not defteri vb.) erişimi engellenebilir.

Ana profil yapılandırıldıktan sonra, kapalı kaynaklı uygulamaların yer aldığı iş profilinin yönetimine geçebiliriz. Bu profilde veri sızıntılarını önlemek için şu yöntemler tercih edilebilir:

* Trafiği internet servis sağlayıcısından gizlemek ve izleyicileri engellemek amacıyla güvenilir bir VPN servisi kullanmak.
* Reklam ve izleyici engelleme amacıyla NetGuard, RethinkDNS veya NextDNS gibi araçlarla güvenlik duvarı oluşturmak.

## Önerilen Uygulamalar

Cihaz güvenliğini ve gizliliğini artırmak için tercih edebileceğiniz açık kaynaklı bazı temel uygulamalar şunlardır:

* [HeliBoard](https://github.com/Helium314/HeliBoard): Gboard'a mükemmel bir açık kaynak alternatif olan, tamamen çevrimdışı çalışan ve yazdıklarınızı hiçbir sunucuya göndermeyen güvenli klavye uygulaması.
* [Cromite](https://github.com/uazo/cromite): Chromium tabanlı, reklam engelleyicili gizlilik odaklı tarayıcı. Mobil platformlarda güvenlik mimarisi nedeniyle Chromium tabanlı tarayıcılar, Firefox türevlerine kıyasla daha kararlı koruma sunmaktadır.
* [Aegis](https://www.f-droid.org/packages/com.beemdevelopment.aegis/): İki adımlı doğrulamalarınız (2FA) için çevrimdışı çalışan, güvenli ve şifreli veri tabanı sunan açık kaynaklı bir alternatif.
* [AntennaPod](https://f-droid.org/packages/de.danoeh.antennapod/): Reklamsız ve üyelik gerektirmeyen açık kaynaklı podcast istemcisi.
* [Bitwarden](https://github.com/bitwarden/mobile/releases): Güvenli ve açık kaynaklı şifre yöneticisi (kendi sunucunuzda barındırma desteği de mevcuttur).
* [KeePassDX](https://www.f-droid.org/packages/a.veux.keepassdx/): Veritabanını tamamen yerel olarak saklamak isteyenler için KeePass (.kdbx) uyumlu şifre yöneticisi.
* [Molly](https://molly.im/): Signal uygulamasının güvenlik sıkılaştırması (hardening) yapılmış ve Google servislerinden arındırılmış sürümü.
* [Nekogram](https://nekogram.app/): Google servisleri olmadan da bildirim alabilen açık kaynaklı Telegram istemcisi (unutmayın, Telegram sohbetleri varsayılan olarak uçtan uca şifreli değildir).
* [PipePipe](https://github.com/InfinityLoop1308/PipePipe): YouTube ve PeerTube içeriklerini Google hesabı olmadan izlemenizi sağlayan istemci.
* [BlueWallet](https://www.f-droid.org/packages/io.bluewallet.bluewallet/): Bitcoin işlemlerinizi güvenle yönetebileceğiniz açık kaynaklı cüzdan.
* [SimpleLogin](https://www.f-droid.org/packages/io.simplelogin.android.fdroid/): Gerçek e-posta adresinizi gizlemek amacıyla geçici veya kalıcı e-posta yönlendiricileri oluşturan servis.
* [Tor Browser](https://www.torproject.org/download/): .onion uzantılı sitelere erişmek ve anonim gezinmek için resmi Tor tarayıcısı.

Daha fazla gizlilik dostu uygulama ve servis önerisi için [Privacy Guides](https://privacyguides.org/) platformunu ziyaret edebilirsiniz.

## E-posta İstemcileri ve Sağlayıcıları

E-posta sağlayıcısı seçimi güvenlik modelinize bağlıdır. Kullanım kolaylığı ve uçtan uca şifreli yapısı nedeniyle [Proton Mail](https://github.com/ProtonMail/proton-mail-android/releases) oldukça popüler ve güvenli bir seçenektir.

Daha bağımsız bir kurulum için istemci olarak [Thunderbird](https://www.thunderbird.net/en-US/) uygulamasını, sağlayıcı olarak ise [Riseup](https://riseup.net/) veya [Autistici/Inventati](https://www.autistici.org/) gibi gizlilik odaklı kolektifleri tercih edebilirsiniz. Thunderbird üzerinde PGP anahtarlarınızı kullanarak e-postalarınızı doğrudan şifreleyebilirsiniz.

## Uygulama İzinlerinin Yönetimi {#gestione-dei-permessi-delle-app}

Uygulamaların gizliliğinizi ihlal etmesini önlemek amacıyla cihaz ayarlarından izinleri düzenlemeniz gerekir:

1. **Ayarlar → Uygulamalar → İzin Yöneticisi** bölümüne giderek uygulamaların ihtiyaç duymadığı tüm yetkileri (özellikle rehber, SMS, konum, kamera ve mikrofon) kapatın.
2. Bir izin geçici olarak gerektiğinde, sürekli erişim sağlamak yerine "Yalnızca bu sefer" seçeneğini kullanın.
3. İnternet erişimine ihtiyaç duymayan uygulamaların (hesap makinesi, çevrimdışı not defteri vb.) internet yetkisini **Ayarlar → Uygulamalar → [Uygulama Adı] → Mobil Veri ve Wi-Fi → Ağ Erişimi** kısmından kapatın.

İnternet yetkisi bulunmayan uygulamalar, arka planda veri toplayıp harici sunuculara gönderemezler.

## Bulut Depolama

En güvenli bulut çözümü Nextcloud ile kendi sunucunuzu (self-hosting) barındırmaktır. Bu kurulum zor geliyorsa, şifreli yapısıyla öne çıkan **Proton Drive** oldukça iyi bir alternatiftir. Ek güvenlik için dosyalarınızı buluta yüklemeden önce yerel olarak şifreleyen [Cryptomator](https://cryptomator.org/) uygulamasını kullanabilirsiniz.

## VPN (Sanal Özel Ağ)

VPN trafiğinizi şifreleyerek internet servis sağlayıcınızdan gizler ancak tüm trafiğinizi VPN şirketine teslim ettiğiniz için sağlayıcının güvenilirliği kritik önem taşır. Sektörde öne çıkan ve bağımsız denetimlerden geçmiş bazı VPN servisleri şunlardır:

* Mullvad VPN
* Proton VPN
* IVPN
* [Kendi Sunucunuzda Barındırılan VPN](/tr/vpn)

## Son Düşünceler

Bu adımları izleyerek mobil cihazınızdaki veri sızıntılarını çok büyük oranda azaltabilirsiniz. Bu kurulum size tam bir görünmezlik sağlamasa da dijital güvenliğinizi ve kişisel gizliliğinizi en üst seviyeye çıkaracaktır.

Gizlilik ve Google bağımlılığından kurtulma konularında güncel kalmak için şu toplulukları takip edebilirsiniz:

* [r/degoogle](https://www.reddit.com/r/degoogle/)
* [r/privacy](https://www.reddit.com/r/privacy/)

> "Gizleyecek bir şeyim yok, bu yüzden gizliliğe önem vermiyorum demek; söyleyecek bir şeyim yok, bu yüzden ifade özgürlüğünü önemsemiyorum demekle aynıdır." - Edward Snowden

---

## İlgili Kılavuzlar

- **[GrapheneOS Üzerine Eksiksiz Kılavuz](/tr/graphene)** - Mobil gizlilik için en iyi işletim sisteminin detaylı incelemesi.
- **[Tehdit Modeli Nasıl Oluşturulur](/tr/threat-model)** - Güvenliğinizi sağlamak için risk ve tehdit analizi yapma yöntemleri.
- **[AdBlock'lu Self-Hosted VPN](/tr/vpn)** - Reklam engelleme özellikli kendi özel VPN sunucunuzu kurun.
- **[Tor Düğümü Kurulumu](/tr/tor)** - Tor ağına katkıda bulunma ve düğüm barındırma rehberi.

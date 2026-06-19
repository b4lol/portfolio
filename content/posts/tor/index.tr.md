---
title: "Tor Düğümü: Ağı Desteklemek İçin Eksiksiz Kurulum"
description: "VPS üzerinde veya yerel olarak bir Tor düğümü (middle relay veya exit) kurmayı öğrenin. Otomatik script dahildir. Eksiksiz rehber."
summary: "VPS üzerinde veya yerel olarak bir Tor düğümü (middle relay veya exit) kurmayı öğrenin. Otomatik script dahildir. Eksiksiz rehber."
keywords: ["Tor", "tor browser", "tor relay", "tor düğümü", "tor relay kurulumu", "tor rehberi", "tor node barındırma"]
author: "b4lol"
date: 2026-01-07
lastmod: 2026-05-05
url: /tr/tor
series: ["Güvenlik"]
topics: ["self-hosting"]
faq:
  - question: "Tor düğümü nedir ve ne işe yarar?"
    answer: "Tor düğümü, Tor ağındaki trafiği şifreleme katmanlarından geçirerek yönlendiren gönüllü bir sunucudur. Ne kadar çok düğüm olursa, ağ o kadar hızlı, güvenli ve sansüre dirençli olur."
  - question: "Middle relay ile exit relay arasındaki fark nedir?"
    answer: "Middle relay, şifrelenmiş trafiği diğer düğümler arasında iletir ve çalıştırması daha güvenlidir. Exit relay ise devrenin son düğümüdür ve trafiği doğrudan İnternet'e çıkarır; bu da daha fazla risk ve sorumluluk taşır."
  - question: "Bir Tor düğümünü evde mi yoksa VPS üzerinde mi kurmak daha iyidir?"
    answer: "Evde barındırılan bir düğüm daha fazla kontrol sağlar ve ağın merkeziyetsizliğine katkıda bulunur, ancak evde bir Tor düğümü çalıştırdığınızı açığa çıkarır. VPS daha fazla bant genişliği ve daha kolay kurulum sunar, ama maliyeti daha yüksektir ve donanım üzerindeki kontrolünüz daha azdır."
  - question: "Bir Tor düğümü için minimum gereksinimler nelerdir?"
    answer: "Middle relay için en az 1 çekirdek, 512 MB RAM ve aylık 2 TB bant genişliği gerekir. Exit relay için en az 1 çekirdek, 1 GB RAM ve aylık 2 TB bant genişliği gerekir."
  - question: "Tor düğümümün doğru çalıştığını nasıl kontrol edebilirim?"
    answer: "Başlattıktan birkaç saat sonra metrics.torproject.org üzerinde relay'inizin adını arayın. Ayrıca journalctl -xeu tor@default komutuyla logları kontrol edebilir ve nyx ile istatistikleri canlı olarak izleyebilirsiniz."
  - question: "Bir Tor düğümü kurmak için hangi işletim sistemleri destekleniyor?"
    answer: "Otomatik script Debian ve Ubuntu'yu destekler. Diğer işletim sistemleri için Tor Project'in resmi sitesi her OS için özel rehberler sunar."
  - question: "Tor düğümünün bant genişliği nasıl yapılandırılır?"
    answer: "/etc/tor/torrc dosyasında AccountingMax parametresiyle haftalık bant genişliği ayarlanır. Örneğin aylık 1 TB'lık bir bant genişliğiniz varsa haftalık 250 GB ayarlayabilirsiniz. Kabul edilen birimler MB, GB ve TB'dir."
howto:
  name: "Bir Tor relay düğümü nasıl kurulur"
  description: "Riskleri değerlendirme, VPS veya ev ağı arasında seçim yapma, Tor'u kurma ve relay'in ağda görünür olduğunu doğrulama prosedürü."
  totalTime: "PT1H"
  supply:
    - "VPS sunucu veya yerel makine"
    - "Kararlı bant genişliğine sahip bağlantı"
  tool:
    - "SSH"
    - "Tor"
    - "Nyx"
  steps:
    - name: "Riskleri ve düğümün konumunu değerlendirin"
      text: "VPS mi yoksa ev ağı mı kullanacağınıza karar verin ve tehdit modelinize göre middle relay ile exit relay arasında seçim yapın."
      url: "/tr/tor#set"
    - name: "Tor'u kurun"
      text: "Rehberin otomatik scriptini kullanın veya Tor'u Tor Project'in resmi deposundan kurun."
      url: "/tr/tor#shelter"
    - name: "torrc'yi yapılandırın"
      text: "Yapılandırma dosyasında relay'in takma adını, iletişim bilgisini, portlarını, bant genişliğini ve rolünü ayarlayın."
      url: "/tr/tor#app"
    - name: "Çalışıp çalışmadığını doğrulayın"
      text: "Sistem loglarını kontrol edin, relay'i Nyx ile izleyin ve birkaç saat sonra Tor Metrics üzerinde düğümü arayın."
      url: "/tr/tor#email"
---

> **TL;DR** - Bu rehberde öğrenecekleriniz:
> - Tor ağının ne olduğu ve onion routing'in nasıl çalıştığı
> - Evde barındırılan bir düğüm ile kiralık bir VPS arasındaki riskleri nasıl tartacağınız
> - Otomatik script veya Tor Project'in resmi paketleri kullanarak bir Tor düğümünün (middle veya exit relay) nasıl kurulacağı
> - Relay'inizin doğru çalıştığını nasıl doğrulayacağınız

## Özet

Tor düğümü, Tor ağında trafiği ileten gönüllü bir sunucudur. Sorumlu bir şekilde katkıda bulunmak için bir VPS veya özel bir makine üzerinde middle relay ile başlamak, gerçekçi bant genişliği sınırları belirlemek, sistemi güncel tutmak ve relay'i loglar, Nyx ve Tor Metrics aracılığıyla doğrulamak en iyisidir.

Tor ağı, çevrimiçi gizliliğin temel direklerinden biridir; gazeteciler, aktivistler ve gözetimden korunmak isteyen herkes tarafından kullanılır. Ancak Tor, yalnızca kendi düğümlerini sağlayan gönüllüler sayesinde çalışır. Ne kadar çok düğüm olursa, ağ o kadar hızlı, güvenli ve sansüre dirençli olur. Bu rehber, kendi relay düğümünüzü birkaç adımda kurarak Tor ağına nasıl aktif olarak katkıda bulunabileceğinizi gösterir.

Bu rehber, Tor ağını desteklemek için bir düğüm başlatmaya
yönelik eksiksiz bir kılavuz olmayı hedefliyor. Başlamadan önce bu
protokolün ne olduğunu kısaca açıklayalım:

"The Onion Router"ın kısaltması olan Tor ağı, İnternet'te
kullanıcıların gizliliğini ve güvenliğini artırmak için tasarlanmış
anonim bir iletişim ağıdır. Adını, çalışma prensibinin bir soğanın
katmanlarına benzer şekilde birden fazla şifreleme katmanına
dayanmasından, yani "onion" (soğan) kavramından alır.

Tor'un temel amacı, kullanıcıların çevrimiçi etkinliklerinin takip
edilmesini zorlaştırmak, kimliklerini ve konumlarını korumaktır. Ağ,
İnternet trafiğini dünyanın dört bir yanındaki gönüllüler tarafından
işletilen "Tor düğümleri" adı verilen bir dizi gönüllü sunucu üzerinden
yönlendirerek çalışır. Her Tor düğümü bir şifreleme katmanını kaldırır
ve yalnızca önceki düğümün IP adresini ortaya çıkarır, bu da trafiğin
kaynağına ulaşmayı zorlaştırır.

Bu katmanlı yaklaşım sayesinde Tor, kullanıcılara önemli düzeyde
anonimlik sağlar; ancak tam bir güvenlik sunmadığını ve belirli
senaryolarda saldırılara karşı zayıf kalabileceğini belirtmek önemlidir.
Buna rağmen Tor ağı, gazeteciler, insan hakları aktivistleri ve
çevrimiçi gizliliklerini korumaya çalışan kullanıcılar tarafından
yaygın olarak kullanılmaktadır.

Daha fazla bilgi için bu bölümü dinlemenizi şiddetle
öneririm:



## Hedef {#os style="color: greenyellow;"}

Bu rehberin nihai hedefi, çeşitli fayda ve riskleri değerlendirerek bir
Tor düğümünü (yerel olarak veya bir VPS üzerinde) barındırmaktır. Bu
rehberin sonunda, ağı daha güvenli ve saldırılara karşı daha dirençli
hale getirerek resmi olarak ağa yardım ediyor ve kendi katkınızı
sunuyor olacaksınız.
Bu rehberi takip etmek için 2 yol vardır:

-   Benim tarafımdan oluşturulan otomatik script ile (önerilen)
-   Tor Project'in resmi paketlerinden manuel kurulum ile

Asıl kuruluma geçmeden önce, bir
sonraki bölümde kendi ev ağınızda veya kiralık bir sunucuda düğüm
kurmanın risklerini ve faydalarını inceleyeceğiz.

## Risk değerlendirmesi {#set style="color: greenyellow;"}

Bir Tor düğümünün kurulumu, bir ev ağında ya da çevrimiçi
kiralık bir sunucuda olsun, bireysel ihtiyaçların dikkatli bir şekilde
değerlendirilmesini gerektirir. Ev ağı bağlamında, en önemli
avantajlardan biri altyapı üzerinde tam kontrole sahip olmaktır; bu da
yapılandırmaları kendi ihtiyaçlarınıza göre özelleştirmenize olanak
tanır. Ayrıca, evde bir Tor düğümü çalıştırmak, özellikle gerekli
donanıma zaten sahipseniz, daha ekonomik olabilir.

Bununla birlikte, göz önünde bulundurulması gereken bazı dezavantajlar
da vardır. Ev bağlantıları genellikle bant genişliği
sınırlarına sahiptir, bu da Tor düğümünün genel hızını etkiler. Ayrıca,
İnternet bağlantısı her zaman en iyi düzeyde güvenilirlik garanti
etmeyebilir ve sağlayıcılar tarafından atanan dinamik IP adresleri
düğümün zamanla daha az kararlı olmasına neden olabilir. Belirtilmesi
gereken son bir dezavantaj da, düğümü kendi ev ağınızda çalıştırmanın,
evde bir Tor düğümünüz olduğunu herkese açık şekilde göstermesidir; bu
da gizliliğe önem veren bazı kişiler için sıkıntılı bir konu olabilir.

Öte yandan, çevrimiçi kiralık bir sunucu kullanmak yüksek bant
genişliği, daha fazla güvenilirlik ve statik bir IP adresine sahip
olma gibi avantajlar sunar. Ancak bu seçenek daha yüksek aylık
maliyetler getirir ve ev kurulumuna kıyasla donanım üzerindeki
doğrudan kontrolünüzü sınırlayabilir.

Ayrıca, kiralık bir sunucuyu uzaktan yönetmenin, sunucunun barındırıldığı
ülkenin yasalarına ve politikalarına uyumu gerektirebileceği de göz
önünde bulundurulmalıdır. Sonuç olarak, ev ağında ve çevrimiçi kiralık
sunucuda Tor düğümü kurma arasındaki seçim, istenen yerel kontrol
düzeyi, mevcut bütçe, gereken bant genişliği ve yerel yasalara uyum
gibi çeşitli faktörlere bağlıdır.

Özetlemek gerekirse: evde barındırılan bir düğüm ağa daha fazla güvenlik
ve merkeziyetsizlik sağlar; başlıca dezavantajları, evinizde bir Tor
düğümü çalıştırdığınızın sızması ve yerel ağın izinlerini yönetirken
biraz daha fazla zorlukla karşılaşabilmenizdir. Çevrimiçi kiralık
sunuculardan bahsedildiğinde (rehberin ilerleyen kısımlarında bazılarını
önereceğim) kurulum daha kolay ve hızlı olacaktır, ancak bunun karşılığında
maliyetler daha yüksek olur ve donanım üzerindeki doğrudan kontrol azalır.

## Hosting sağlayıcısı seçimi {#store style="color: greenyellow;"}

Bir Tor düğümünü barındırmak için bir Virtual Private Server (VPS)
kiralamaya hazırlanırken, güvenilir ve güvenli bir deneyim sağlamak
için birçok parametreye dikkat etmek esastır:

İlk olarak, VPS'in sağladığı bant genişliği, düğümün hızını ve
kararlılığını doğrudan etkileyerek çok önemli bir rol oynar.
Tor ağındaki trafiği verimli bir şekilde yönetmek için yeterli bant
genişliği şarttır.

Sunucunun konumu, dikkatle değerlendirilmesi gereken başka bir
husustur. Stratejik bir coğrafi konum seçimi, düğüm üzerinden bağlanan
kullanıcılar için gecikmeyi azaltarak düğümün genel performansını
artırabilir. Bunun ayrıca önemli sonuçları vardır, çünkü yargı
yetkisine bağlı olarak sağlayıcınızın uyması gereken bilgisayar
yasaları da değişir.

VPS sağlayıcısının gizlilik politikası da aynı derecede kritiktir.
Sağlayıcının kullanıcıların gizliliğine saygı duyduğunu ve hassas
etkinlikleri kaydetmediğini veya izlemediğini doğrulamak, ağa faydalı
bir düğüm sürdürmek için esastır.
Ayrıca, statik bir IP adresine sahip bir VPS seçmek tavsiye edilir
(neredeyse hepsi bunu sağlar), çünkü bu Tor düğümünün uzun vadede
kararlı kalmasına yardımcı olacaktır.

Son olarak, sağlayıcının sunduğu güvenlik duvarı ve şifreleme gibi
güvenlik seçeneklerini incelemek, Tor düğümünü potansiyel dış
tehditlerden korumak için temel bir husustur.

Bu parametrelerin dikkatli bir şekilde değerlendirilmesi sayesinde, bir
Tor düğümünü güvenilir ve güvenli bir şekilde barındırmak için gereken
gereksinimleri karşılayan bir VPS seçebilirsiniz.

İşte bana göre bir düğümü barındırmak için en iyi seçeneklerin listesi:

-   [VPSbG](https://www.vpsbg.eu/aff/1e5d9e), bana göre güç, bant
    genişliği, gizlilik, kullanılabilirlik ve kabul edilen ödeme
    yöntemleri arasında en iyi dengeyi sunuyor. En ucuzu değil ama en
    iyi kullanım deneyimini sunan seçenek. Sunucuları Bulgaristan'da
    ve hem middle hem de exit node'ları kabul ediyorlar (doğru
    yapılandırıldığında, scriptim bunu zaten otomatik olarak yapıyor).
-   [UDN](https://www.urdn.com.ua/index.html), yani Ukrayna Veri Ağı
    (Ukrainian Data Network), gerçekten son derece gizlilik odaklı
    VPS'ler sunuyor; "son derece gizlilik odaklı" derken, bir VPS
    satın almanın tek yolunun yöneticilerden biriyle XMPP üzerinden
    yazışmak olduğunu kastediyorum — başka bir satın alma yolu yok ve
    oluşturulması gereken bir hesap da yok. Uygun fiyatlı, çok güçlü
    olmayan ama bol bant genişliğine sahip VPS'ler (10-15 TB).
-   [Trabia](https://www.trabia.com/), Moldova'da bir VPS sağlayıcısı;
    çok iyi fiyatları var, VPS'ler çok güçlü değil ama bant genişliği
    SINIRSIZ, bu fiyatlarda gerçek bir nadirlik. Gizlilik tarafında
    iyi ama mükemmel değil; bitcoin kabul ediyorlar ama bazı kişisel
    bilgiler girmenizi istiyorlar. Kişisel deneyimime göre bu bilgiler
    tamamen sahte olabilir ama inandırıcı görünmesi gerekiyor (gerçekçi
    görünen bir adres ve konum, inandırıcı ad ve soyadlar, vb.).

Tor düğümleri için gereksinim olarak şunlara sahip olmak tavsiye edilir:

-   Middle relay: en az 1 çekirdek, 512MB RAM ve ayda 2 TB bant
    genişliği, ancak en az 5 TB'a sahip olmak tavsiye edilir. Çok hızlı
    relay'ler için (40mb/s'nin üzerinde bağlantı hızı) en az 1GB RAM
    gerekir.
-   Exit node'lar: en az 1 çekirdek, 1GB RAM ve ayda 2 TB bant
    genişliği, ancak en az 5 TB'a sahip olmak tavsiye edilir. Çok hızlı
    relay'ler için (40mb/s'nin üzerinde bağlantı hızı) en az 2GB RAM
    gerekir.

Olası bir VPS'i satın aldıktan sonra doğrudan yapılandırmaya
geçebiliriz!

## Otomatik script ile düğüm kurulumu (önerilen) {#shelter style="color: greenyellow;"}

Rehbere, bana göre en hızlı ve verimli yöntemle, yani kendi geliştirdiğim
bash scripti ile başlayalım. Gereksinimler: herhangi bir PC, VPS veya
Raspberry Pi'nin hazır olması ve üzerinde Debian veya Ubuntu yüklü olması.
Makinenizin shell'ine bağlandıktan sonra (bundan sonra ev donanımı veya
VPS seçeneklerinden hangisini seçtiyseniz onu ifade edecek), eğer root
erişimine sahip çevrimiçi bir VPS kullanıyorsanız aşağıdaki satırların
başındaki sudo kelimesini atlamanız gerektiğini unutmayın. Şimdi
aşağıdaki komutları çalıştırabilirsiniz:
```
sudo apt-get update && sudo apt-get upgrade -y
sudo apt install git
git clone https://github.com/b4lol/Tor-node-script.git
cd Tor-node-script
chmod +x tor.sh 
sudo ./tor.sh
```                            

Bu kod satırları şu işlemleri gerçekleştirir: işletim sistemini
(Ubuntu veya türevlerini) güncellerler, Git'i kurarlar, depoyu
GitHub'dan klonlarlar, klonlanan dizine girerler, scripte çalıştırma
izni verirler ve son olarak tor.sh'ı çalıştırırlar.

Bu noktada tor scripti başlayacak, işletim sisteminizi güncelleyecek,
tüm bağımlılıkları kuracak, pgp imzalarını doğrulayacak, tor'u kuracak
ve deneyiminizi özelleştirmek için size bazı girdiler soracaktır:

1.  **Middle Relay mi Exit mi?**\
    Podcast bölümünde bu iki düğüm türü arasındaki farkları ele
    alıyorum; middle relay yönetmesi daha kolaydır, özel bir risk
    taşımaz ve sıradan kullanıcı için en önerilen seçenektir. Exit
    relay, önceki relay türüne kıyasla biraz daha deneyimli kullanıcılar
    için hardcore versiyondur. Deneyimli bir kullanıcı değilseniz,
    kendisine atanan numarayı yazarak middle relay seçeneğini seçin.
2.  **Nickname:**\
    Bu bölümde Tor düğümümüze vermek istediğimiz adı yazmamız
    gerekir. Çok uzun adlardan kaçının ve boşluk kullanmayın; izin
    verilen tek karakterler harfler, sayılar ve alt çizgidir.
3.  **Email:**\
    Bu bölüm, düğümünüzde çok ciddi sorunlar olması durumunda Tor
    Foundation'ın size ulaşabileceği bir iletişim bilgisi sağlamak
    için kullanılmalıdır. Dikkat edin, bir Tor düğümüne bağlı bir
    e-postayı çevrimiçi olarak ifşa ediyorsunuz. 3 seçenek şunlar
    olabilir: kendi iletişim bilginizi, çevrimiçi botların bunu
    e-posta olarak tanımaması için garip bir şekilde yazılmış olarak
    koymak (örnek
    [yourname][@][example].[com]), hiçbir veri koymamak için
    "redacted" yazmak veya bağışlar için bir bitcoin/lightning
    adresi bırakmak (büyük olasılıkla hiçbir bağış almayacaksınız).
4.  **Bandwidth:**\
    Bu alanda düğüme tahsis edilen haftalık bant genişliğini
    belirtmemiz gerekecek. Kullanılabilecek birimler (MB / GB / TB)
    şeklindedir; düğümünüzde 1 TB bant genişliğiniz varsa, bant
    genişliği alanına (haftalık olarak anlaşılır) 250 GB yazabilirsiniz
    (bu, 4 hafta için aylık 1 TB'a denk gelir). Sayı, boşluk, ölçü
    birimi biçimlendirmesine uyun.

Tebrikler, işiniz bitti! Script sırasında hata alırsanız [GitHub
sayfamda](https://github.com/b4lol/Tor-node-script) bir issue
açabilir veya etc/tor/torrc dosyasında yazılanların doğru olup
olmadığını yeniden kontrol edebilirsiniz. Şimdi doğrudan [kurulum
sonrası kontroller](#email) bölümüne geçebilirsiniz.

## Resmi depodan manuel kurulum {#app style="color: greenyellow;"}

Eğer bu yolu seçerseniz beni mazur görün ama size yardımcı olamayacağım,
çünkü bu süreçte yapabileceğiniz olası hatalar çok fazla ve bulunması
zor. Rehberin bu bölümünde, scriptimin otomatik olarak yaptığı her şeyi
elle yeniden yapacağız; bu rehber Debian tabanlı işletim sistemleri için
yazılmıştır, başka bir işletim sistemi kullanmak isterseniz [Tor
Project'in sitesinde](https://community.torproject.org/relay/setup/)
her sistem için rehberler bulunmaktadır.

**Not:** Tor'u yerel kaynak koddan derlemiyoruz. Aşağıdaki yol, Tor
Project'in **resmi paketlerini** kullanır; bunlar 2026'da Debian/Ubuntu
üzerinde güncellemeler ve düzenli bakım almak için hâlâ en akılcı
seçenektir.

Ön gereksinimler:

-   Kullanıma hazır, shell'i açık bir Debian tabanlı PC'ye sahip olmak
-   Bilgisayarın otomatik güncellemelerini etkinleştirin; bunları
    etkinleştirmek için [bu
    rehberi](https://community.torproject.org/relay/setup/guard/debian-ubuntu/updates)
    takip edebilirsiniz. Zorunlu bir adım değildir ama çok, çok,
    çoooook tavsiye edilir. Bu bölümü atlarsanız, her 1-2 ayda bir
    Tor düğümüne manuel olarak bağlanıp güncellemeniz gerekecektir.
-   depoyu ve PGP anahtarını ekleyerek tor'u kurmak:\
    1.  Bağımlılıkları kurun:
```
apt install apt-transport-https
 ```                                                           

    2.  dağıtımınızın adını kontrol edin ve not edin
        (örnekler: bookworm, focal-fossa, bullseye, vb.)
```
lsb_release -c
```                                                     

    3.  /etc/apt/sources.list.d/ klasöründe tor.list adında yeni bir
        dosya oluşturun (bunu yapmak için şu komutu kullanın: nano
        /etc/apt/sources.list.d/tor.list) ve distribution etiketini
        az önce not ettiğiniz adla değiştirmeyi unutmadan aşağıdaki
        satırları ekleyin.
```
deb     [signed-by=/usr/share/keyrings/tor-archive-keyring.gpg] https://deb.torproject.org/torproject.org <distribution> main
deb-src [signed-by=/usr/share/keyrings/tor-archive-keyring.gpg] https://deb.torproject.org/torproject.org <distribution> main
```                                                    

    4.  PGP anahtarlarını ve tor deposunu şu komutla ekleyin:
```
wget -qO- https://deb.torproject.org/torproject.org/A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89.asc | gpg --dearmor | tee /usr/share/keyrings/tor-archive-keyring.gpg >/dev/null
 ```                                                           

    5.  Depoları güncelleyin ve tor'u kurun:
```
apt update
apt install tor deb.torproject.org-keyring
```                                                          

Bu noktada, nano /etc/tor/torrc komutuyla tor'un yapılandırma
dosyasını düzenlemeye geçiyoruz; middle mi yoksa exit relay mi
yapmak istediğinize bağlı olarak aşağıdaki yapılandırmalardan
birini kopyalayın.

**Dikkat!!** Yapılandırmayı kopyalayıp yapıştırdıktan sonra
değiştirilmesi gereken parametreler vardır; bunlar aşağıdaki iki
örnekten sonra daha ileride listelenecektir.

-   **Middle relay**
```
Nickname $nickname
ContactInfo $contact_info
AccountingRule sum
AccountingStart week 1 10:00
AccountingMax $bandwidth
ORPort 443
ExitRelay 0
SocksPort 0 
```
-   **Exit relay**
```
Nickname $nickname
ContactInfo $contact_info
AccountingRule sum
AccountingStart week 1 10:00
AccountingMax $bandwidth
ORPort 443
ExitRelay 1
SocksPort 0
ExitPolicy accept *:22        # SSH
ExitPolicy accept *:23        # Telnet
ExitPolicy accept *:43        # WHOIS
ExitPolicy accept *:53        # DNS
ExitPolicy accept *:79        # finger
ExitPolicy accept *:80-81     # HTTP
ExitPolicy accept *:88        # kerberos
ExitPolicy accept *:110       # POP3
ExitPolicy accept *:143       # IMAP
ExitPolicy accept *:194       # IRC
ExitPolicy accept *:220       # IMAP3
ExitPolicy accept *:389       # LDAP
ExitPolicy accept *:443       # HTTPS
ExitPolicy accept *:464       # kpasswd
ExitPolicy accept *:465       # URD for SSM (more often: an alternative port, see 587)
ExitPolicy accept *:531       # IRC/AIM
ExitPolicy accept *:543-544   # Kerberos
ExitPolicy accept *:554       # RTSP
ExitPolicy accept *:563       # NNTP over SSL
ExitPolicy accept *:587       # SUBMISSION (authenticated clients send mail over STARTTLS SMTP here)
ExitPolicy accept *:636       # LDAP over SSL
ExitPolicy accept *:706       # SILC
ExitPolicy accept *:749       # kerberos
ExitPolicy accept *:853       # DNS over TLS
ExitPolicy accept *:873       # rsync
ExitPolicy accept *:902-904   # VMware
ExitPolicy accept *:981       # Remote HTTPS management for firewall
ExitPolicy accept *:989-990   # FTP over SSL
ExitPolicy accept *:991       # Netnews Administration System
ExitPolicy accept *:992       # TELNETS
ExitPolicy accept *:993       # IMAP over SSL
ExitPolicy accept *:994       # IRCS
ExitPolicy accept *:995       # POP3 over SSL
ExitPolicy accept *:1194      # OpenVPN
ExitPolicy accept *:1220      # QT Server Admin
ExitPolicy accept *:1293      # PKT-KRB-IPSec
ExitPolicy accept *:1500      # VLSI License Manager
ExitPolicy accept *:1533      # Sametime
ExitPolicy accept *:1677      # GroupWise
ExitPolicy accept *:1723      # PPTP
ExitPolicy accept *:1755      # RTSP
ExitPolicy accept *:1863      # MSNP
ExitPolicy accept *:2082      # Infowave Mobility Server
ExitPolicy accept *:2083      # Secure Radius Service (radsec)
ExitPolicy accept *:2086-2087 # GNUnet, ELI
ExitPolicy accept *:2095-2096 # NBX
ExitPolicy accept *:2102-2104 # Zephyr
ExitPolicy accept *:3128      # SQUID
ExitPolicy accept *:3389      # MS WBT
ExitPolicy accept *:3690      # SVN
ExitPolicy accept *:4321      # RWHOIS
ExitPolicy accept *:4643      # Virtuozzo
ExitPolicy accept *:5050      # MMCC
ExitPolicy accept *:5190      # ICQ
ExitPolicy accept *:5222-5223 # XMPP, XMPP over SSL
ExitPolicy accept *:5228      # Android Market
ExitPolicy accept *:5900      # VNC
ExitPolicy accept *:6660-6669 # IRC
ExitPolicy accept *:6679      # IRC SSL
ExitPolicy accept *:6697      # IRC SSL
ExitPolicy accept *:8000      # iRDMI
ExitPolicy accept *:8008      # HTTP alternate
ExitPolicy accept *:8074      # Gadu-Gadu
ExitPolicy accept *:8080      # HTTP Proxies
ExitPolicy accept *:8082      # HTTPS Electrum Bitcoin port
ExitPolicy accept *:8087-8088 # Simplify Media SPP Protocol, Radan HTTP
ExitPolicy accept *:8332-8333 # Bitcoin
ExitPolicy accept *:8443      # PCsync HTTPS
ExitPolicy accept *:8888      # HTTP Proxies, NewsEDGE
ExitPolicy accept *:9418      # git
ExitPolicy accept *:9999      # distinct
ExitPolicy accept *:10000     # Network Data Management Protocol
ExitPolicy accept *:11371     # OpenPGP hkp (http keyserver protocol)
ExitPolicy accept *:19294     # Google Voice TCP
ExitPolicy accept *:19638     # Ensim control panel
ExitPolicy accept *:50001-50002     # Electrum Bitcoin SSL
ExitPolicy accept *:64738     # Mumble
ExitPolicy reject *:*
```
Her iki yapılandırmada da elle değiştirilmesi gereken 3 alan
bulunmaktadır:

1.  **$Nickname:**\
    Bu bölümde Tor düğümümüze vermek istediğimiz adı yazmamız
    gerekir. Çok uzun adlardan kaçının ve boşluk kullanmayın; izin
    verilen tek karakterler harfler, sayılar ve alt çizgidir.\
    örnek: "Nickname TORtaruga".
2.  **$contact_info:**\
    Bu bölüm, düğümünüzde çok ciddi sorunlar olması durumunda Tor
    Foundation'ın size ulaşabileceği bir iletişim bilgisi sağlamak
    için kullanılmalıdır. Dikkat edin, bir Tor düğümüne bağlı bir
    e-postayı çevrimiçi olarak ifşa ediyorsunuz. 3 seçenek şunlar
    olabilir: kendi iletişim bilginizi, çevrimiçi botların bunu
    e-posta olarak tanımaması için garip bir şekilde yazılmış olarak
    koymak.\
    örnek: "[yourname][@][example].[com]" veya yayınlamak
    istemiyorsanız "redacted" yazmak.
3.  **$Bandwidth:**\
    Bu alanda düğüme tahsis edilen haftalık bant genişliğini
    belirtmemiz gerekecek. Kullanılabilecek birimler (MB / GB / TB)
    şeklindedir; düğümünüzde 1 TB bant genişliğiniz varsa, bant
    genişliği alanına (haftalık olarak anlaşılır) 250 GB yazabilirsiniz
    (bu, 4 hafta için aylık 1 TB'a denk gelir). Sayı, boşluk, ölçü
    birimi biçimlendirmesine uyun.\
    örnekler: "700 GB", "2 TB", "1200 GB", vb.

Tamam, sevgili küçük Tor düğümümüz hazır!

## Kurulum sonrası kontroller {#email style="color: greenyellow;"}

Aferin sana, kahraman!\
Her şeyi elle de yapsanız, otomatik scriptimi de kullansanız,
resmi olarak bir Tor düğümü oluşturdunuz! İlgili tüm kontrolleri
yapmadan önce, makinemizdeki Tor servisini yeniden başlatarak
başlayalım (her /etc/tor/torrc dosyasını düzenlediğimizde
değişikliklerin uygulanması için servisi yeniden başlatmamız gerekir):

` systemctl restart tor@default `

Bu işlem yapıldıktan sonra düğüm resmi olarak aktif olacaktır; bir
sorun olması durumunda şu komutu kullanabilirsiniz:

` journalctl -xeu tor@default `

logları incelemek için; bu pek kolay bir iş değildir ama sorunu
tespit etmek için faydalıdır: (vakaların %90'ında) /etc/tor/torrc
dosyasının içinde bir hata vardır.
Son olarak, ama önemi az değil, düğümünüzü htop'a benzer bir
arayüzle izlemek isterseniz şu komutla nyx'i kurabilirsiniz:

` apt install nyx `

nyx komutuyla çalıştırarak istatistikleri buna benzer bir
görünümle izleyebileceksiniz:



## Çalışma testi {#cloud style="color: greenyellow;"}

İşlerin doğru gittiğine dair son kontrol, Tor Foundation'ın tüm
relay'lerin bulunduğu [resmi
sitesinde](https://metrics.torproject.org/rs.html) **birkaç saat
sonra** kendi düğümünüzü, relay'inizin adını veya bir kısmını
arayarak bulabilip bulamadığınızı görmektir.



Doğru şekilde görünüyorsa, resmi olarak aktif bir Tor düğümünüz var!

## Sonuç {#conc style="color: greenyellow;"}

Bitirdiniz! Düğümünüz aktif ve efsanevi başarınızı tamamladınız!
Okuduğunuz için çok teşekkürler! Bu rehberi beğendiyseniz, sosyal
medyada ve arkadaşlarınızla paylaşın.

bir tor düğümü kurduysanız iyi bir kaplumbağasınız 🐢

---

## İlgili Rehberler

- **[Wireguard ile Self-Hosted VPN](/tr/vpn)** - Reklam engelleme özelliği dahili kendi özel VPN'inizi oluşturun
- **[Tehdit Modeli Nasıl Oluşturulur](/tr/threat-model)** - Gizliliğinizi korumanın ilk adımı
- **[GrapheneOS Üzerine Nihai Rehber](/tr/graphene)** - Mobil gizlilik için en iyi işletim sistemi

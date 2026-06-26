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
> - Tor ağının ne olduğu ve "onion routing" (soğan yönlendirmesi) sisteminin nasıl çalıştığını,
> - Evde barındırılan bir düğüm ile kiralık bir VPS arasındaki riskleri nasıl değerlendireceğinizi,
> - Otomatik kurulum betiği (script) veya Tor Project'in resmi paketlerini kullanarak bir Tor düğümünün (ara düğüm veya çıkış düğümü) nasıl kurulacağını,
> - Kurduğunuz düğümün doğru çalışıp çalışmadığını nasıl doğrulayacağınızı.

## Özet

Tor düğümü, Tor ağında trafiği ileten gönüllü bir sunucudur. Ağa sorumlu bir şekilde katkıda bulunmak için bir VPS veya özel bir makine üzerinde ara düğüm (middle relay) ile başlamak, gerçekçi bant genişliği sınırları belirlemek, sistemi güncel tutmak ve düğüm durumunu günlük kayıtları (logs), Nyx ve Tor Metrics aracılığıyla doğrulamak en iyi yaklaşımdır.

Tor ağı, çevrimiçi gizliliğin temel direklerinden biridir; gazeteciler, aktivistler ve gözetimden korunmak isteyen herkes tarafından kullanılır. Ancak Tor, yalnızca kendi düğümlerini sağlayan gönüllüler sayesinde çalışır. Ne kadar çok düğüm olursa, ağ o kadar hızlı, güvenli ve sansüre dirençli hale gelir. Bu rehber, kendi relay düğümünüzü birkaç adımda kurarak Tor ağına nasıl aktif olarak katkıda bulunabileceğinizi açıklamaktadır.

Bu rehber, Tor ağını desteklemek için bir düğüm başlatmaya yönelik kapsamlı bir kılavuzdur. Başlamadan önce bu protokolün çalışma prensibini kısaca açıklayalım:

"The Onion Router"ın kısaltması olan Tor ağı, internette kullanıcıların gizliliğini ve güvenliğini artırmak için tasarlanmış anonim bir iletişim ağıdır. Adını, çalışma prensibinin bir soğanın katmanlarına benzer şekilde birden fazla şifreleme katmanına dayanmasından, yani "onion" (soğan) kavramından alır.

Tor'un temel amacı, kullanıcıların çevrimiçi etkinliklerinin takip edilmesini zorlaştırmak, kimliklerini ve konumlarını korumaktır. Ağ, internet trafiğini dünyanın dört bir yanındaki gönüllüler tarafından işletilen "Tor düğümleri" adı verilen bir dizi sunucu üzerinden yönlendirerek çalışır. Her Tor düğümü bir şifreleme katmanını kaldırır ve yalnızca önceki düğümün IP adresini ortaya çıkarır, bu da trafiğin kaynağına ulaşmayı zorlaştırır.

Bu katmanlı yaklaşım sayesinde Tor, kullanıcılara önemli düzeyde anonimlik sağlar; ancak tam bir güvenlik sunmadığını ve belirli senaryolarda saldırılara karşı zayıf kalabileceğini belirtmek önemlidir. Buna rağmen Tor ağı; gazeteciler, insan hakları aktivistleri ve çevrimiçi gizliliklerini korumaya çalışan kullanıcılar tarafından yaygın olarak kullanılmaktadır.

Daha fazla bilgi için ilgili podcast bölümünü dinlemeniz önerilir:

## Hedef {#os style="color: greenyellow;"}

Bu rehberin nihai amacı, çeşitli fayda ve riskleri değerlendirerek yerel olarak veya bir VPS üzerinde bir Tor düğümü barındırmanızı sağlamaktır. Bu rehberi tamamladığınızda, ağı daha güvenli ve saldırılara karşı daha dirençli hale getirerek ağın gelişimine katkıda bulunmuş olacaksınız.

Bu rehber kapsamında iki farklı yöntem sunulmaktadır:

- Hazırlanan otomatik kurulum betiği (script) ile (önerilen)
- Tor Project'in resmi paketlerini kullanarak manuel kurulum ile

Asıl kuruluma geçmeden önce, bir sonraki bölümde kendi ev ağınızda veya kiralık bir sunucu üzerinde düğüm barındırmanın risklerini ve faydalarını inceleyeceğiz.

## Risk Değerlendirmesi {#set style="color: greenyellow;"}

Bir Tor düğümünün kurulumu, ev ağında ya da çevrimiçi kiralık bir sunucuda olsun, bireysel ihtiyaçların dikkatli bir şekilde değerlendirilmesini gerektirir. Ev ağı kullanmanın en önemli avantajlarından biri, altyapı üzerinde tam kontrole sahip olunmasıdır. Bu durum, yapılandırmaları kendi tercihlerinize göre özelleştirmenize olanak tanır. Ayrıca, evde bir Tor düğümü çalıştırmak, gerekli donanıma zaten sahipseniz daha ekonomik bir seçenek olabilir.

Bununla birlikte, göz önünde bulundurulması gereken bazı dezavantajlar da mevcuttur. Ev tipi internet bağlantıları genellikle bant genişliği sınırlarına sahiptir ve bu durum Tor düğümünün genel hızını etkileyebilir. Ayrıca ev interneti her zaman en yüksek düzeyde kesintisiz çalışmayı garanti etmeyebilir; servis sağlayıcılar tarafından atanan dinamik IP adresleri de düğümün ağdaki kararlılığını azaltabilir. Son bir dezavantaj ise düğümü kendi ev ağınızda çalıştırmanın, evinizde bir Tor düğümü barındırıldığını herkese açık şekilde ifşa etmesidir. Bu durum, gizliliğe üst düzeyde önem veren kişiler için istenmeyen bir durum olabilir.

Öte yandan, kiralık bir sanal sunucu (VPS) kullanmak yüksek bant genişliği, daha yüksek kesintisiz çalışma (uptime) oranı ve statik bir IP adresine sahip olma gibi avantajlar sağlar. Ancak bu seçenek aylık ek maliyet getirir ve ev kurulumuna kıyasla donanım üzerindeki doğrudan kontrolünüzü sınırlar.

Ayrıca, uzaktaki kiralık bir sunucuyu yönetirken, sunucunun barındırıldığı ülkenin yasal düzenlemelerine ve servis sağlayıcının politikalarına uyum sağlanması gerektiği göz önünde bulundurulmalıdır. Sonuç olarak, ev ağı ile kiralık sunucu arasında yapılacak seçim; kontrol düzeyi, bütçe, gereken bant genişliği ve yasal uyumluluk gibi çeşitli faktörlere bağlıdır.

Özetlemek gerekirse: Evde barındırılan bir düğüm, ağa daha yüksek düzeyde merkeziyetsizlik kazandırır; ancak evinizde Tor düğümü çalıştırıldığının açığa çıkması ve yerel ağ yönlendirmelerini yaparken yaşanabilecek teknik zorluklar temel dezavantajlarıdır. Kiralık sanal sunucularda ise kurulum çok daha kolay ve hızlıdır; fakat bu durum maliyeti artırırken donanım üzerindeki doğrudan kontrolünüzü azaltır.

## Hosting Sağlayıcısı Seçimi {#store style="color: greenyellow;"}

Tor düğümü barındırmak amacıyla sanal özel sunucu (VPS) kiralarken, güvenilir ve güvenli bir çalışma ortamı sağlamak için bazı kriterlere dikkat etmek büyük önem taşır:

İlk olarak, sunucunun sunduğu bant genişliği, düğümün veri iletim hızını doğrudan etkiler. Tor ağındaki trafiği verimli bir şekilde yönetebilmek için yüksek limitli veya sınırsız bant genişliği tercih edilmelidir.

Sunucunun fiziksel konumu da dikkatle değerlendirilmelidir. Stratejik bir coğrafi konum seçimi, düğüm üzerinden bağlanan kullanıcılar için gecikme sürelerini (ping) azaltarak performansı artırır. Ayrıca sunucunun bulunduğu ülkenin yasal düzenlemeleri ve gizlilik kanunları da bu doğrultuda değişiklik gösterecektir.

VPS sağlayıcısının gizlilik politikası da kritik bir öneme sahiptir. Sağlayıcının kullanıcı gizliliğine saygı duyduğunu ve veri kaydı (log) tutmadığını doğrulamak, ağın yapısını korumak açısından gereklidir. Ek olarak, Tor düğümünün ağda kalıcı ve kararlı bir şekilde tanınması için statik bir IP adresi içeren bir paket seçilmesi önerilir.

Son olarak, sunucunun güvenlik duvarı (firewall) yapılandırması ve sunucu güvenliği seçenekleri, düğümü dış tehditlere karşı korumak için incelenmelidir.

Bu kriterleri göz önünde bulundurarak, bir Tor düğümünü güvenle çalıştırabileceğiniz en uygun VPS paketini belirleyebilirsiniz.

Düğüm barındırmak için öne çıkan bazı güvenilir VPS sağlayıcıları şunlardır:

- **[VPSbG](https://www.vpsbg.eu/aff/1e5d9e)**: Donanım performansı, bant genişliği, gizlilik politikası ve ödeme yöntemleri açısından oldukça dengeli bir seçenek sunmaktadır. Sunucuları Bulgaristan lokasyonludur ve hem ara düğüm (middle relay) hem de çıkış düğümü (exit relay) kurulumuna izin vermektedirler (otomatik kurulum betiği bunu uygun şekilde yapılandırmaktadır).
- **[UDN (Ukrainian Data Network)](https://www.urdn.com.ua/index.html)**: Gizliliğe azami önem veren bir sağlayıcıdır. Öyle ki, bir sunucu kiralamak için yöneticilerle doğrudan XMPP üzerinden iletişime geçmeniz gerekir; web sitesinde klasik bir üyelik sistemi veya sepet adımı bulunmamaktadır. Performans olarak mütevazı ancak yüksek bant genişliği (10-15 TB) sunan ekonomik paketleri mevcuttur.
- **[Trabia](https://www.trabia.com/)**: Moldova merkezli bu sağlayıcı, oldukça uygun fiyatlarla sınırsız bant genişliği sunmasıyla bilinir. Gizlilik hassasiyeti ortalama düzeydedir; Bitcoin ile ödeme kabul etseler de kayıt esnasında bazı kişisel bilgiler talep etmektedirler. Bu bilgilerin doğruluğu sıkı biçimde denetlenmese de gerçekçi yapıda olması sürecin onaylanması açısından önemlidir.

Düğüm türlerine göre önerilen minimum sistem gereksinimleri şu şekildedir:

- **Ara Düğüm (Middle Relay)**: En az 1 CPU çekirdeği, 512 MB RAM ve aylık 2 TB bant genişliği (mümkünse 5 TB veya üzeri önerilir). Bağlantı hızı yüksek olan (40 MB/s üzeri) düğümler için en az 1 GB RAM tavsiye edilir.
- **Çıkış Düğümü (Exit Relay)**: En az 1 CPU çekirdeği, 1 GB RAM ve aylık 2 TB bant genişliği. Yüksek hızlı çıkış düğümleri için ise en az 2 GB RAM gereklidir.

Sanal sunucunuzu (VPS) satın aldıktan sonra doğrudan yapılandırma adımına geçebilirsiniz!

## Otomatik Kurulum Betiği ile Kurulum (Önerilen) {#shelter style="color: greenyellow;"}

Rehberimize, kurulum için en hızlı ve verimli yöntem olan Bash betiği ile başlayalım. Gereksinimler: Debian veya Ubuntu yüklü bir bilgisayar, sanal sunucu (VPS) veya Raspberry Pi. Sunucunuzun veya makinenizin terminaline (shell) bağlandıktan sonra, eğer doğrudan root yetkisine sahip bir VPS kullanıyorsanız aşağıdaki komutların başındaki `sudo` ifadesini yazmanıza gerek olmadığını unutmayın. Kuruluma başlamak için aşağıdaki komutları çalıştırabilirsiniz:

```bash
sudo apt-get update && sudo apt-get upgrade -y
sudo apt install git
git clone https://github.com/b4lol/Tor-node-script.git
cd Tor-node-script
chmod +x tor.sh 
sudo ./tor.sh
```

Bu komutlar sırasıyla; işletim sistemini günceller, Git sürüm kontrol sistemini yükler, ilgili depoyu GitHub'dan klonlar, klasörün içine girer, betiğe çalıştırma yetkisi verir ve son olarak `tor.sh` kurulum sihirbazını başlatır.

Bu aşamada kurulum betiği çalışmaya başlayarak işletim sistemini güncelleyecek, gerekli tüm bağımlılıkları yükleyecek, PGP imzalarını doğrulayacak, Tor servisini kuracak ve yapılandırmayı kişiselleştirmeniz için size birkaç soru yöneltecektir:

1. **Middle Relay mi Exit mi?**\
   Ara düğüm (middle relay) yönetimi oldukça kolaydır, herhangi bir yasal veya teknik risk taşımaz ve ağa katkı sağlamak isteyenler için en ideal seçenektir. Çıkış düğümü (exit relay) ise ağ trafiğini doğrudan dış internete taşıdığı için daha çok deneyimli kullanıcılara hitap eden, yasal sorumluluğu yüksek bir düğüm türüdür. Eğer bu konuda tecrübeniz yoksa, ilgili numarayı girerek **Middle Relay** seçeneğini tercih edin.
2. **Nickname (Takma Ad):**\
   Tor düğümünüze vermek istediğiniz ismi yazın. Çok uzun isimlerden kaçının ve Türkçe karakter ya da boşluk kullanmayın. Yalnızca harf, rakam ve alt çizgi (`_`) karakterlerini kullanabilirsiniz.
3. **Email (İletişim E-postası):**\
   Düğümünüzde teknik bir sorun yaşanması durumunda Tor Vakfı'nın (Tor Foundation) size ulaşabilmesi için bir iletişim adres girmeniz önerilir. Gireceğiniz adresin halka açık şekilde yayınlanacağını unutmayın. Adresinizi botların taramasından korumak için `isim[at]eposta[dot]com` gibi maskelenmiş şekilde yazabilir, hiçbir bilgi paylaşmak istemiyorsanız `redacted` olarak bırakabilir ya da bağış almak istiyorsanız bir Bitcoin/Lightning adresi ekleyebilirsiniz.
4. **Bandwidth (Bant Genişliği):**\
   Düğümünüzün kullanabileceği haftalık veri limitini belirleyin. MB, GB veya TB birimlerini kullanabilirsiniz. Örneğin, aylık 1 TB trafik limitiniz varsa haftalık sınırı `250 GB` olarak belirtebilirsiniz. Sayı ve birim arasındaki boşluk kuralına uymaya özen gösterin.

Tebrikler, kurulum tamamlandı! Betiğin çalışması sırasında bir hata ile karşılaşırsanız [GitHub sayfası üzerinden](https://github.com/b4lol/Tor-node-script) bir hata bildirimi (issue) açabilir veya `/etc/tor/torrc` dosyasını manuel kontrol edebilirsiniz. Şimdi doğrudan [kurulum sonrası kontroller](#email) bölümüne geçebilirsiniz.

## Resmi Depolar Üzerinden Manuel Kurulum (Alternatif) {#app style="color: greenyellow;"}

Eğer manuel kurulum yolunu tercih ederseniz, bu süreçte hata yapma olasılığının yüksek olduğunu ve sorun gidermenin vakit alabileceğini belirtmek isterim. Rehberin bu bölümünde, kurulum betiğimizin arka planda otomatik olarak yaptığı işlemleri adım adım elle gerçekleştireceğiz. Bu rehber Debian tabanlı sistemler için hazırlanmıştır. Farklı bir işletim sistemi kullanıyorsanız [Tor Projesi resmi kurulum belgelerini](https://community.torproject.org/relay/setup/) inceleyebilirsiniz.

**Not:** Tor'u kaynak koddan derlemek yerine, Debian/Ubuntu üzerinde düzenli güncellemeleri ve güvenlik yamalarını kolayca alabilmek için Tor Projesi'nin resmi paket depolarını kullanacağız.

Ön Gereksinimler:

- Kullanıma hazır, terminal bağlantısı kurulmuş Debian veya Ubuntu yüklü bir sunucu/bilgisayar.
- Sistem güvenlik güncellemelerinin otomatik yüklenmesini sağlayın. (Bu işlem zorunlu olmasa da kararlılık için şiddetle tavsiye edilir; aksi halde belirli aralıklarla sunucuya bağlanıp güncellemeleri elle yapmanız gerekir).
- Tor resmi depolarını ve PGP anahtarını ekleyerek kuruluma başlayın:

    1. Gerekli sistem bağımlılıklarını yükleyin:
```bash
apt install apt-transport-https
```

    2. Dağıtımınızın adını kontrol edin ve not edin (örnekler: bookworm, focal, bullseye, vb.)
```bash
lsb_release -c
```

    3. `/etc/apt/sources.list.d/` klasöründe `tor.list` adında yeni bir dosya oluşturun (`nano /etc/apt/sources.list.d/tor.list`) ve dağıtım ismini az önce not ettiğiniz adla değiştirmeyi unutmadan aşağıdaki satırları ekleyin:
```text
deb     [signed-by=/usr/share/keyrings/tor-archive-keyring.gpg] https://deb.torproject.org/torproject.org <distribution> main
deb-src [signed-by=/usr/share/keyrings/tor-archive-keyring.gpg] https://deb.torproject.org/torproject.org <distribution> main
```

    4. PGP anahtarlarını ve Tor deposunu şu komutla ekleyin:
```bash
wget -qO- https://deb.torproject.org/torproject.org/A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89.asc | gpg --dearmor | tee /usr/share/keyrings/tor-archive-keyring.gpg >/dev/null
```

    5. Depoları güncelleyin ve Tor'u kurun:
```bash
apt update
apt install tor deb.torproject.org-keyring
```

Bu noktada, `nano /etc/tor/torrc` komutuyla Tor'un yapılandırma dosyasını düzenlemeye geçiyoruz; ara düğüm mü yoksa çıkış düğümü mü yapmak istediğinize bağlı olarak aşağıdaki yapılandırmalardan birini kopyalayın.

**Dikkat!!** Yapılandırmayı kopyalayıp yapıştırdıktan sonra değiştirilmesi gereken parametreler vardır; bunlar aşağıdaki iki örnekten sonra listelenecektir.

- **Middle relay (Ara düğüm)**
```text
Nickname $nickname
ContactInfo $contact_info
AccountingRule sum
AccountingStart week 1 10:00
AccountingMax $bandwidth
ORPort 443
ExitRelay 0
SocksPort 0 
```
- **Exit relay (Çıkış düğümü)**
```text
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

Her iki yapılandırmada da elle değiştirilmesi gereken 3 alan bulunmaktadır:

1. **$nickname:**\
   Bu bölümde Tor düğümünüze vermek istediğimiz adı yazmanız gerekir. Çok uzun adlardan kaçının ve boşluk kullanmayın; izin verilen tek karakterler harfler, sayılar ve alt çizgidir.\
   Örnek: `Nickname TORtaruga`
2. **$contact_info:**\
   Bu bölüm, düğümünüzde çok ciddi sorunlar olması durumunda Tor Vakfı'nın size ulaşabileceği bir iletişim bilgisi sağlamak için kullanılmalıdır. Gireceğiniz adresin halka açık olarak yayınlanacağını unutmayın. Botların e-posta adresinizi taramasını zorlaştırmak için maskeleme yapabilir (örneğin `isim[@]alanadi[.]com`) veya bilgi paylaşmak istemiyorsanız `redacted` yazabilirsiniz.
3. **$bandwidth:**\
   Bu alanda düğüme tahsis edilen haftalık bant genişliğini belirtmeniz gerekecektir. Kullanılabilecek birimler MB, GB veya TB şeklindedir. Örneğin aylık 1 TB bant genişliği sınırınız varsa, haftalık limit alanına `250 GB` yazabilirsiniz. Sayı, boşluk ve ölçü birimi biçimlendirmesine uymaya özen gösterin.

## Kurulum Sonrası Yönetim {#email style="color: greenyellow;"}

Tebrikler! İster otomatik betiği kullanmış olun ister kurulumu elle yapmış olun, resmi olarak bir Tor düğümü oluşturdunuz. Yapılandırma değişikliklerinin uygulanması için öncelikle sistemimizdeki Tor servisini yeniden başlatalım:

```bash
sudo systemctl restart tor@default
```

Bu işlemden sonra düğümünüz aktif hale gelecektir. Herhangi bir sorun oluşması durumunda, hata tespiti yapmak için günlük kayıtlarını şu komutla inceleyebilirsiniz:

```bash
journalctl -xeu tor@default
```

Logları incelemek bazen karmaşık görünse de sorunları gidermek için en güvenli yoldur (çoğu zaman `/etc/tor/torrc` dosyasındaki küçük bir yazım hatası servisin başlamasını engeller).

Son olarak, düğümünüzün performans durumunu anlık olarak izlemek isterseniz `htop` benzeri bir terminal arayüzü sunan `nyx` aracını kurabilirsiniz:

```bash
sudo apt install nyx
```

Ardından sadece `nyx` komutunu çalıştırarak düğüm istatistiklerini izlemeye başlayabilirsiniz.

## Ağ Görünürlüğünü Doğrulama {#cloud style="color: greenyellow;"}

Her şeyin yolunda gittiğini doğrulamak için son adım, düğümünüzün aktifleşmesinden **birkaç saat sonra** Tor Vakfı'nın tüm aktif düğümleri listelediği [resmi Tor Metrics web sitesini](https://metrics.torproject.org/rs.html) ziyaret etmektir. Arama kutusuna belirlediğiniz düğüm adını veya IP adresinizi yazarak arama yapabilirsiniz.

Düğümünüz arama sonuçlarında doğru şekilde listeleniyorsa, artık ağa aktif olarak katkı sunan bir Tor düğümünüz var demektir!

## Sonuç {#conc style="color: greenyellow;"}

Tebrikler! Düğümünüz aktif hale geldi ve ağa değerli bir katkı sağladınız. İlginiz ve emeğiniz için teşekkürler! Bu rehberi faydalı bulduysanız, diğer kullanıcılarla paylaşarak daha fazla kişinin ağa destek olmasına yardımcı olabilirsiniz.

Ağa bir Tor düğümü kazandırarak harika bir katkıda bulundunuz! 🐢

---

## İlgili Rehberler

- **[WireGuard ile Self-Hosted VPN](/tr/vpn)** - Reklam engelleme özellikli, kendinize ait özel bir VPN oluşturun.
- **[Tehdit Modeli Nasıl Oluşturulur](/tr/threat-model)** - Dijital güvenliğinizi sağlamanın ilk adımı.
- **[GrapheneOS Hakkında Nihai Rehber](/tr/graphene)** - Mobil gizlilik ve güvenlik için en iyi mobil işletim sistemi.

---
title: "macOS Güvenlik ve Gizlilik için Eksiksiz Kılavuz"
description: "Mac'inizi sıkılaştırmak için detaylı kılavuz: ilk kurulumdan güvenlik duvarına, DNS'e, tarayıcıya, Tor'a, VPN'e, şifrelemeye ve sistem izlemeye kadar."
summary: "Mac'inizi sıkılaştırmak için detaylı kılavuz: ilk kurulumdan güvenlik duvarına, DNS'e, tarayıcıya, Tor'a, VPN'e, şifrelemeye ve sistem izlemeye kadar."
keywords: ["macos güvenlik", "macos gizlilik", "mac güvenliği", "mac gizliliği", "macos güvenlik kılavuzu", "macos gizlilik kılavuzu", "apple güvenlik", "macos sertleştirme", "mac güvenlik duvarı", "filevault", "mac güvenliğini sağlama", "macos gizlilik rehberi"]
author: "b4lol"
date: 2026-03-08
lastmod: 2026-05-05
url: /tr/macos-security
series: ["Dijital Gizlilik", "Güvenlik"]
topics: ["privacy-security"]
faq:
  - question: "Mac'te gizliliğimi nasıl korurum?"
    answer: "Disk şifrelemesi için FileVault'u etkinleştirin, yerleşik güvenlik duvarını ve gizli mod (stealth mode) özelliğini açın, şifrelenmiş DNS (DoH/DoT) kullanın, LuLu gibi giden trafiği denetleyen bir güvenlik duvarı kurun ve Firefox gibi gizlilik odaklı bir tarayıcı seçin."
  - question: "Apple Silicon Mac'lerde FileVault gerekli mi?"
    answer: "Apple Silicon Mac'ler varsayılan olarak şifrelidir, ancak FileVault başlangıçta parola istemesini sağlayarak ek bir koruma katmanı ekler. Aynı zamanda firmware parolası olarak da işlev görür; harici disklerden açılışı ve Recovery moduna erişimi engeller."
  - question: "macOS'ta güvenlik duvarı nasıl etkinleştirilir?"
    answer: "Sistem Ayarları'na gidin veya Terminal'den sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on komutunu kullanın. Kapalı portlara gelen ping ve probe isteklerini görmezden gelmek için gizli modu (stealth mode) da etkinleştirin."
  - question: "macOS Kilitleme Modu (Lockdown Mode) nedir ve kimler için kullanışlıdır?"
    answer: "Kilitleme Modu, saldırı yüzeyini büyük ölçüde azaltmak için çok sayıda özelliği devre dışı bırakır. Gazeteciler ve aktivistler gibi karmaşık saldırılara hedef olma riski taşıyan kullanıcılar için tasarlanmıştır, ancak Sistem Ayarları > Gizlilik ve Güvenlik üzerinden herkes etkinleştirebilir."
  - question: "Mac'ler virüs ve kötü amaçlı yazılım kapabilir mi?"
    answer: "Evet, Mac'ler kötü amaçlı yazılımlara karşı bağışık değildir. macOS; XProtect, Gatekeeper ve uygulama sandboxing gibi korumalar içerir, ancak yazılımları yalnızca resmi kaynaklardan indirmeniz, açık kaynaklı uygulamaları tercih etmeniz ve şüpheli dosyaları VirusTotal ile kontrol etmeniz önerilir."
  - question: "macOS için en güvenli tarayıcı hangisidir?"
    answer: "Firefox; açık kaynak kodu, yerleşik izleme korumaları ve arkenfox/user.js ile gelişmiş sertleştirme desteği sayesinde gizlilik açısından en iyi seçenek olarak kabul edilir. Safari ise Intelligent Tracking Prevention ve Kilitleme Modu desteğiyle iyi bir yerel alternatiftir."
  - question: "macOS'ta meta verileri ve dijital izleri nasıl silerim?"
    answer: "İndirilen dosyalardaki meta verileri kaldırmak için xattr -d, QuickLook önbelleğini temizlemek için qlmanage -r cache komutlarını kullanın ve yazım verilerini silmek için ~/Library içindeki LanguageModeling, Spelling ve Suggestions dizinlerini kaldırın."
howto:
  name: "macOS'ta gizlilik ve güvenlik nasıl korunur"
  description: "Bir tehdit modeli tanımlamak ve macOS'ta FileVault, güvenlik duvarı, DNS, tarayıcı, kimlik doğrulama, yedekleme ve izleme yapılandırmak için izlenecek prosedür."
  totalTime: "PT2H"
  supply:
    - "Güncellenmiş bir Mac"
    - "Standart bir kullanıcı hesabı"
    - "Yedekleme için bir disk veya hedef"
  tool:
    - "Sistem Ayarları"
    - "Terminal"
    - "FileVault"
    - "LuLu"
  steps:
    - name: "Tehdit modelinizi tanımlayın"
      text: "Gelişmiş yapılandırmalar uygulamadan önce varlıkları, düşmanları, yetenekleri ve önlemleri belirleyin."
      url: "/tr/macos-security#threat-modeling"
    - name: "Hesabınızı ve FileVault'u yapılandırın"
      text: "Günlük işler için standart bir hesap kullanın ve diski korumak için FileVault'u etkinleştirin."
      url: "/tr/macos-security#account"
    - name: "Ağ saldırı yüzeyinizi azaltın"
      text: "Güvenlik duvarını, gizli modu, şifrelenmiş DNS'i ve giden bağlantılar için bir güvenlik duvarını etkinleştirin."
      url: "/tr/macos-security#firewall"
    - name: "Tarayıcınızı ve iletişimlerinizi sıkılaştırın"
      text: "Gizlilik odaklı tarayıcılar seçin, gerektiğinde Tor'u yapılandırın ve uçtan uca şifrelenmiş mesajlaşma kullanın."
      url: "/tr/macos-security#browser"
    - name: "Parolaları, yedeklemeleri ve meta verileri yönetin"
      text: "Benzersiz parolalar, MFA, şifrelenmiş yedeklemeler ve dosyalardan meta veri kaldırma prosedürleri kullanın."
      url: "/tr/macos-security#password"
    - name: "Sistemi izleyin"
      text: "Anormal davranışları tespit etmek için süreçleri, ağı, günlükleri ve denetim araçlarını kontrol edin."
      url: "/tr/macos-security#monitoraggio"
---

> **TL;DR** - Bu kılavuzda öğrenecekleriniz:
> - Bir Apple Silicon Mac'i ilk açılışından itibaren güvenlik ve gizliliği en üst düzeye çıkaracak şekilde nasıl yapılandıracağınız
> - Ağ trafiğinizi güvenlik duvarı, şifrelenmiş DNS, VPN ve Tor ile nasıl koruyacağınız
> - Tarayıcınızı nasıl sıkılaştıracağınız, parolaları nasıl yöneteceğiniz ve verilerinizi FileVault ile GPG kullanarak nasıl şifreleyeceğiniz
> - Sistemi nasıl izleyeceğiniz, meta verileri nasıl sileceğiniz ve kötü amaçlı yazılımlara ile izlemeye karşı kendinizi nasıl koruyacağınız

## Özet

macOS'ta gizlilik ve güvenliği korumak için bir tehdit modeliyle başlamak, ardından FileVault'u, otomatik güncellemeleri, güvenlik duvarını, şifrelenmiş DNS'i, sertleştirilmiş bir tarayıcıyı, parola yöneticisini, şifrelenmiş yedeklemeleri ve yazılım kurulum kurallarını etkinleştirmek en doğrusudur. Kilitleme Modu veya VM ile yalıtım gibi daha aşırı önlemler ise sadece yüksek riskli profiller için gereklidir.

Mac'iniz kutudan çıktığı haliyle aşılamaz bir kale değildir. macOS sağlam bir işletim sistemidir, elbette, ama doğru yapılandırmalar olmadan düşündüğünüzden daha fazla açık kapı bırakır... ve her açık kapı, işlerinize burnunu sokmak isteyen biri için bir davettir.

Bu kılavuz, Mac'inizin gizliliğini ve güvenliğini ciddiye almak isteyen sizler için, kaplumbağalar için hazırlandı. Bilgisayar mühendisi olmanıza gerek yok: sadece öğrenme isteği ve biraz sabır yeterli. Donanım seçiminden ileri düzey sistem izlemesine kadar adım adım ilerleyeceğiz.

**UYARI!!** Bu kılavuz olduğu gibi sunulmaktadır, hiçbir türden garanti içermez. Sisteminizde yaptığınız değişikliklerden tamamen siz sorumlusunuz. Dikkatli ilerleyin ve şüpheye düştüğünüzde her zaman önce bir yedek alın.



## Tehdit Modellemesi: Nereden Başlamalı {#threat-modeling style="color: white;"}

İlk ve en önemli adım bir **tehdit modeli** (threat model) oluşturmaktır. Nasıl korunacağınızı bilmek için kime karşı korunduğunuzu anlamanız gerekir. Her kişinin ihtiyaçları farklıdır, dolayısıyla tehdit modeliniz de size özel olacaktır.

### Korumak istediğiniz varlıkları belirleyin

Korumak istediğiniz her şeyin bir listesini yapın: dizüstü bilgisayarınız, parolalarınız, gezinme geçmişiniz, finansal belgeleriniz, kişisel fotoğraflarınız... Bunları önem sırasına göre kategorize edin: **genel**, **hassas** veya **gizli**.

### Düşmanlarınızı belirleyin

Kime karşı korunuyorsunuz? Meraklı bir ev arkadaşına mı? Bir hırsıza mı? Verilerinizi pazarlama için isteyen bir şirkete mi? Bir devlete mi? Düşmanın motivasyonu, saldırının karmaşıklık düzeyini belirler.

### Yeteneklerini belirleyin

Düşmanınız ne yapabilir? Sıradan bir hırsız bir parola ve disk şifrelemesiyle durdurulabilir. Devlet destekli bir aktör ise kullanılmadığında cihazı tamamen kapatarak RAM'deki anahtarları silmek gibi aşırı önlemler gerektirebilir.

### Önlemleri belirleyin

Şimdi her bir tehdidi nasıl karşılayacağınıza karar verme zamanı. Güvenlik ile kullanılabilirlik arasında denge kurmak çok önemlidir: her önlem, düşmanlarınızın gerçek bir yeteneğine karşı koymalı, aksi halde hayatınızı sebepsiz yere zorlaştırırsınız.



İşte her varlık için oluşturmanız gereken örnek bir tablo:

| Düşman | Motivasyon | Yetenek | Önlem |
|---|---|---|---|
| Ev arkadaşı | Sohbetleri veya geçmişi görmek | Fiziksel yakınlık, ekrana göz atabilir | Biyometri, gizlilik filtresi, otomatik kilitleme |
| Hırsız | Kişisel verileri çalmak ve hesapları boşaltmak | Cihazı çalmak, parola yazarken izlemek | Mac'i her zaman görüş alanında tutmak, FileVault, Find My |
| Suçlu | Ekonomik kazanç | Sosyal mühendislik, kötü amaçlı yazılım, tekrar kullanılan parolalar | Sandboxing, otomatik güncellemeler, benzersiz parolalar |
| Şirket | Kullanıcı verisi pazarlaması | Telemetri ve davranışsal veri toplama | Ağ bağlantılarını engellemek, tanımlayıcıları sıfırlamak |
| Devlet/APT | Hedefli gözetim | İnternet altyapısının pasif gözetimi | Açık kaynaklı E2EE, uzun diceware parolalar, güvenli öğeli donanım |

## Donanım: Doğru Mac'i Seçmek {#hardware style="color: white;"}

macOS, **Apple Silicon'a sahip Apple donanımında** (M1, M2, M3, M4 ve sonrası) çalışırken daha güvenlidir. Intel işlemcili Mac'lerde Apple'ın yazılım güncellemeleriyle düzeltemediği [donanım açıkları](https://checkm8.info/blog/apple-t2-chip-vulnerability) bulunur. Çip ne kadar yeniyse o kadar iyidir.

Hackintosh'lardan ve macOS'un en son sürümünü desteklemeyen Mac'lerden kaçının: Apple eski sürümlerdeki her açığı düzeltmez.

Tehdit modelinize bağlı olarak, Mac'inizi **nakit ve şahsen** satın almak isteyebilirsiniz; çevrimiçi sipariş veya kart ödemesinden kaçınarak, satın alma işlemine herhangi bir kimliğe ilişkin bilgi bağlanmamış olur.

Kablosuz aksesuarlar (klavye, fare, kulaklık) için, bana göre en iyileri Apple'ın kendi ürünleridir: sistem tarafından otomatik olarak güncellenir ve Bluetooth donanım adresini takip edilmeyi önlemek için rastgeleleştiren **BLE Privacy** gibi en son Bluetooth özelliklerini destekler.

## macOS Kurulumu {#installazione style="color: white;"}

Mac'inizle uyumlu **her zaman** macOS'un en son sürümünü kurun. Daha yeni sürümler, eski sürümlerde bulunmayan güvenlik yamalarına ve iyileştirmelere sahiptir.

### Sistem etkinleştirmesi

Apple'ın hırsızlık önleme sisteminin bir parçası olarak, Apple Silicon Mac'ler macOS'u her yeniden kurduğunuzda, cihazın çalıntı veya kilitli olmadığını doğrulamak için Apple sunucularıyla etkinleştirme yapmak zorundadır.

### Apple Hesabı

macOS'u kullanmak için bir Apple Hesabı oluşturmak **zorunlu değildir**. Ancak bilmeniz gerekir ki bir Apple Hesabı varsayılan olarak çok fazla veriyi iCloud ile senkronize eder. Senkronizasyonu daha sonra devre dışı bırakabilir veya [Advanced Data Protection](https://support.apple.com/guide/security/advanced-data-protection-for-icloud-sec973254c5f) aracılığıyla **uçtan uca şifrelemeyi** etkinleştirebilirsiniz.

Bir Apple Hesabı yalnızca App Store'a ve iCloud, Apple Music gibi Apple hizmetlerine erişmek için gereklidir.

### Sanallaştırma

Apple Silicon'da sanallaştırma, Apple'ın Virtualization framework'ü sayesinde macOS'a entegre edilmiştir. Şu araçları kullanarak macOS ve Windows 11 ARM çalıştırabilirsiniz:

- **UTM** - [Web sitesinden](https://mac.getutm.app) ücretsiz. macOS ve Windows 11 ARM'ı destekler
- **VirtualBuddy** - Apple Silicon'da macOS 12+'ı sanallaştırmak için GUI. %100 ücretsiz. [GitHub](https://github.com/insidegui/VirtualBuddy)
- **VMware Fusion** - Broadcom altında şimdi ücretsiz. Temiz arayüz, Windows 11 ARM'ı destekler
- **tart** - Homebrew ile kurulabilen komut satırı VM kontrolü. [tart.run](https://tart.run)
- **Parallels** (ücretli) - Güçlü entegrasyona sahip ticari bir seçenek. [Web sitesi](https://www.parallels.com)

Güvenlik yapılandırmalarınızı önce bir VM üzerinde denemenizi şiddetle öneririm; böylece risksiz bir şekilde deneyebilirsiniz.

## İlk Açılış {#primo-avvio style="color: white;"}

İlk açılışta, Kurulum Yardımcısı sizden bir hesap oluşturmanızı isteyecek. **Güçlü bir parola** kullanın ve parola ipucu ayarlamayın: Mac'inize erişimi olan herkes bunu görebilir.

Dikkat: girdiğiniz gerçek ad, bilgisayar adında ve yerel ağ hostname'inde görünecektir. Daha sonra değiştirmek için:

```zsh
sudo scutil --set ComputerName adiniz
sudo scutil --set LocalHostName adiniz
```

## Yönetici Hesabı ve Standart Kullanıcı {#account style="color: white;"}

Oluşturulan ilk hesap her zaman bir **yönetici** (admin) hesabıdır. Yönetici hesapları `sudo` erişimine sahiptir, bu da sistemde her şeyi değiştirebilecekleri anlamına gelir. Bu önemli bir güvenlik riskidir.

İyi uygulama, günlük işler için **ayrı bir standart hesap** kullanmak ve yönetici hesabını yalnızca gerçekten gerektiren işlemler için saklamaktır.

### Nasıl yapılandırılır

1. Yönetici hesabına giriş yapın
2. **Sistem Ayarları > Kullanıcılar ve Gruplar** üzerinden yeni bir yönetici hesabı oluşturun
3. Çıkış yapın ve yeni yönetici hesabına giriş yapın
4. Orijinal hesabınızı şu komutla standarda düşürün:

```zsh
sudo dscl . -delete /Groups/admin GroupMembership kullanici_adiniz
```

**Standart hesabın kısıtlamaları:** `/Applications` içine uygulama kuramazsınız, `sudo` kullanamazsınız, bazı sistem yardımcı programları yönetici hesabını gerektirir. Büyük bir güvenlik kazanımı için küçük rahatsızlıklar.

## Firmware ve FileVault {#firmware-filevault style="color: white;"}

### Firmware

Firmware güvenliğinin varsayılan değer olan **"Tam Güvenlik"** (Full Security) olarak ayarlandığından emin olun. Bu, işletim sisteminin kurcalanmasını engeller.

### FileVault

Apple Silicon Mac'ler varsayılan olarak şifrelidir, ancak **FileVault** ek bir katman ekler: açılışta verilere erişmek için parola ister. FileVault parolası ayrıca firmware parolası olarak da işlev görür; diğer disklerden açılışı ve Recovery moduna erişimi engeller.

Etkinleştirmek için: **Sistem Ayarları > Gizlilik ve Güvenlik > FileVault > Etkinleştir**

**!UYARI!** Kurtarma anahtarını güvenli bir yerde saklayın. iCloud üzerinden kilit açma seçeneği mevcuttur ancak iCloud'unuz ele geçirilirse risk oluşturur.

## Kilitleme Modu {#lockdown style="color: white;"}

**Kilitleme Modu** (Lockdown Mode), saldırı yüzeyini büyük ölçüde azaltmak için çok sayıda özelliği devre dışı bırakan güçlü bir macOS özelliğidir. Karmaşık saldırılara hedef olabilecek kullanıcılar (gazeteciler, aktivistler, muhalifler) için tasarlanmıştır, ancak herkes etkinleştirebilir.

Safari'de tek tek web siteleri için devre dışı bırakılabilir, böylece güvendiğiniz sitelerde işlevsellik kaybetmezsiniz.

Etkinleştirmek için: **Sistem Ayarları > Gizlilik ve Güvenlik > Kilitleme Modu**

## Güvenlik Duvarı {#firewall style="color: white;"}

### Uygulama düzeyinde güvenlik duvarı

macOS, **gelen bağlantıları** engelleyen yerleşik bir güvenlik duvarı içerir. Etkinleştirmek önemlidir:

```zsh
# Güvenlik duvarını etkinleştir
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on

# Gizli modu etkinleştir (kapalı portlara gelen ping ve probe isteklerini görmezden gelir)
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setstealthmode on

# İmzalı uygulamaların otomatik olarak izin verilmesini engelle
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setallowsigned off
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setallowsignedapp off
```

### Üçüncü taraf güvenlik duvarları

Yerleşik güvenlik duvarı yalnızca gelen bağlantıları engeller. **Giden trafiği** de kontrol etmek (ve hangi uygulamaların "eve telefon ettiğini" görmek) için bunlardan birini şiddetle öneririm:

- **[Little Snitch](https://www.obdev.at/products/littlesnitch/)** - En eksiksiz olanı, ücretli
- **[LuLu](https://objective-see.org/products/lulu.html)** - Açık kaynaklı ve ücretsiz, Objective-See tarafından
- **[Radio Silence](https://radiosilenceapp.com/)** - Basit ve hafif

Bu güvenlik duvarları root yetkisine sahip süreçler tarafından atlatılabilir, ancak yine de son derece değerli bir araç olmaya devam ederler. Bazı kötü amaçlı yazılımlar bu güvenlik duvarlarının varlığını tespit ettiğinde kendini imha eder.

### Çekirdek düzeyinde paket filtreleme (pf)

Daha ayrıntılı kontrol için macOS, oldukça özelleştirilebilir bir çekirdek düzeyi güvenlik duvarı olan **pf**'yi (packet filter) içerir.

İşte `/etc/pf.rules` için temel bir yapılandırma örneği:

```
# Varsayılan arayüz
wifi = "en0"

# Varsayılan olarak tüm gelen trafiği engelle
block in all

# Giden trafiğe izin ver
pass out quick on $wifi proto { tcp, udp } from any to any

# Loopback trafiğine izin ver
pass quick on lo0

# Tüm arayüzlerde gelen trafiği engelle
block in quick on $wifi
```

Kuralları etkinleştirmek için:

```zsh
sudo pfctl -e -f /etc/pf.rules
```

Durumu kontrol etmek için: `sudo pfctl -s info`

## Servisler ve Daemon'lar {#servizi style="color: white;"}

macOS, sistem servislerini yönetmek için **launchd**'yi kullanır. Etkin servisleri şu şekilde inceleyebilirsiniz:

```zsh
# Yüklenmiş tüm servisleri listele
launchctl list

# Belirli bir servisi incele
launchctl list | grep -i apple
```

Sistem servisleri **System Integrity Protection (SIP)** tarafından korunur - onları değiştirmek için SIP'yi devre dışı bırakmayın. Olduğu gibi bırakmak çok daha güvenlidir.

Belirli bir servisin ne yaptığını incelemek için, `.plist` dosyasını şu konumlarda arayın:
- `/System/Library/LaunchDaemons/` (sistem daemon'ları)
- `/System/Library/LaunchAgents/` (sistem agent'ları)
- `/Library/LaunchDaemons/` (üçüncü taraf daemon'ları)
- `~/Library/LaunchAgents/` (kullanıcı agent'ları)

## Homebrew {#homebrew style="color: white;"}

[Homebrew](https://brew.sh), macOS'ta en çok kullanılan paket yöneticisidir, ancak gözünüz açık olsun: **App Management** veya **Full Disk Access** gerektirir, bu da TCC (Transparency, Consent and Control) korumalarını devre dışı bırakmaya neredeyse eşdeğerdir.

```zsh
# Düzenli olarak güncelle (güvenilir ağlarda!)
brew upgrade

# Homebrew telemetrisini devre dışı bırak
export HOMEBREW_NO_ANALYTICS=1
```

Kalıcı hale getirmek için `export HOMEBREW_NO_ANALYTICS=1` satırını `~/.zshrc` dosyanıza ekleyin.

## DNS: Sorgularınızı Korumak {#dns style="color: white;"}

DNS sorguları posta kartı gibidir: ağdaki herkes onları okuyabilir. Nasıl koruyacağımızı görelim.



### Şifrelenmiş DNS profilleri

macOS 11'den itibaren, şifrelenmiş DNS (DoH/DoT) için **yapılandırma profilleri** kurabilirsiniz. Önerilen bazı sağlayıcılar:

- **[Quad9](https://www.quad9.net/)** - Kötü amaçlı alan adlarını engeller, kâr amacı gütmeyen
- **[AdGuard DNS](https://adguard-dns.io/)** - Reklamları ve takip araçlarını engeller
- **[NextDNS](https://nextdns.io/)** - Engelleme listeleriyle son derece özelleştirilebilir

### Hosts dosyası

`/etc/hosts` dosyasına girdiler ekleyerek alan adlarını engelleyebilirsiniz:

```zsh
# Bir alan adını engelle
echo "0.0.0.0 facebook.com" | sudo tee -a /etc/hosts

# Değişiklikleri uygula
sudo dscacheutil -flushcache
```

Reklamları, kötü amaçlı yazılımları ve takip araçlarını engelleyen [StevenBlack'in](https://github.com/StevenBlack/hosts) listesi gibi, topluluk tarafından sürdürülen ve indirip entegre edebileceğiniz engelleme listeleri mevcuttur.

### DNSCrypt

**DNSCrypt**, DNS trafiğini şifreleyerek dinlemeyi ve kurcalamayı engeller:

```zsh
brew install dnscrypt-proxy
```

Eğer dnsmasq ile birlikte kullanıyorsanız, 53 dışında bir portu dinlemesini yapılandırın. Şifrelenmemiş tüm DNS trafiğini engellemek için **pf** kurallarını da kullanabilirsiniz.

### Dnsmasq

**Dnsmasq**, yerel bir DNS önbelleği olarak çalışır ve eksiksiz bir çözüm için DNSCrypt ile birleştirilebilir:

```zsh
brew install dnsmasq

# Yerel DNS olarak yapılandır
sudo networksetup -setdnsservers "Wi-Fi" 127.0.0.1
```

DNS kaynağının kimlik doğrulaması ve veri bütünlüğü için **DNSSEC**'i destekler.

## Sertifika Yetkilileri {#certificati style="color: white;"}

macOS, dünyanın dört bir yanındaki şirket ve devletlere ait **100'den fazla kök CA sertifikası** ile birlikte gelir. Bu, çok sayıda kuruluşun teknik olarak herhangi bir alan adı için geçerli sertifikalar verebileceği anlamına gelir.

Apple, güvenilmeyen CA'ları engeller ve sıkı gereksinimlere sahiptir, ancak sahte sertifikalar üzerinden MITM saldırıları (Man-in-the-Middle, yani sizinle site arasına "girip" araya giren bir saldırgan) riski düşük olsa da mevcuttur (DigiNotar vakasını hatırlıyor musunuz?).

Bir CA'dan güveni manuel olarak kaldırmak için: **Anahtar Zinciri Erişimi**'ni (Keychain Access) açın, kök sertifikayı bulun, üzerine çift tıklayın ve "Asla Güvenme" (Never Trust) olarak ayarlayın.

## Tarayıcı: Dünyaya Açılan Pencereniz {#browser style="color: white;"}

Tarayıcı, sisteminizin **en büyük saldırı yüzeyidir**. Dikkatlice seçin ve uzantıları kesinlikle gerekli olanla sınırlı tutun.

### Firefox

Bana göre, yaygın olarak kullanılanlar arasında gizlilik için en iyi tarayıcı:

- Bellek güvenliği için Rust kullanımının artmasıyla birlikte **açık kaynak**
- Yerleşik **izleme koruması**
- **Parmak izi rastgeleleştirmesi** (fingerprint randomization)
- Oturumları yalıtmak için **Multi-Account Containers**
- Gelişmiş sertleştirme için [arkenfox/user.js](https://github.com/arkenfox/user.js) desteği
- JavaScript'i seçici olarak engellemek için **NoScript** uzantısı

### Chrome

Google'ın tescilli bileşenleriyle Chromium tabanlı:

- **Sağlam sandboxing** ve sık güncellemeler
- Güvenlik araştırmacılarını çeken kazançlı bir bug bounty programı
- Saldırı yüzeyini azaltmak için deneysel JavaScript özelliklerini devre dışı bırakın: `chrome://flags/#disable-javascript-harmony-shipping`
- **uBlock Origin Lite**'ı (Manifest V3 sürümü) kullanın
- `chrome://settings/privacy` içinde DNS prefetching'i devre dışı bırakın

**Eksileri:** Google. Tarayıcı veri toplamak üzere tasarlanmıştır. Gizlilik önceliğinizse, Firefox veya Safari daha iyi seçimlerdir.

### Safari

macOS'un WebKit tabanlı yerel tarayıcısı:

- Tüm tarayıcılar arasında **en iyi pil ömrü**
- Yerleşik **Content Blockers** ve **Intelligent Tracking Prevention**
- **Parmak izi rastgeleleştirmesi** ve yalıtılmış Gizli Sekmeler
- **Kilitleme Modu** desteği
- iCloud Anahtar Zinciri üzerinden güvenli senkronizasyon

**Eksileri:** mevcut uzantı sayısı daha az (geliştirici lisansı yıllık 100$), bu nedenle ekosistem daha sınırlı.

### Tarayıcı gizliliği

Hangi tarayıcıyı seçerseniz seçin, unutmayın:

- **Navigator API**, sisteminiz hakkında bilgi açığa çıkarır
- **Canvas fingerprinting**, sizi tek başına benzersiz şekilde tanımlayabilir
- **Üçüncü taraf çerezlerini** devre dışı bırakın (artık çoğu tarayıcıda varsayılan)
- **WebRTC**, gerçek IP adresinizi açığa çıkarabilir - uzantılar veya Kilitleme Modu aracılığıyla devre dışı bırakın

## Tor: Anonim Gezinme {#tor style="color: white;"}

[Tor Browser](https://www.torproject.org/), trafiğinizi Tor ağı üzerinden yönlendiren ve verileri ardışık katmanlarda şifreleyen (bir soğanın katmanları gibi) değiştirilmiş bir Firefox'tur.

### Kurulum ve doğrulama

Tor Browser'ı indirdikten sonra, indirmenin **GPG imzasını doğrulamak** çok önemlidir:

```zsh
# Önce resmi web sitesindeki fingerprint ve güncel talimatları kontrol ederek Tor Project'in imza anahtarını içe aktarın
gpg --keyserver hkps://keys.openpgp.org --recv-keys TOR_PROJECT_TARAFINDAN_YAYINLANAN_ANAHTAR_ID

# İmzayı doğrula
gpg --verify TorBrowser-*.asc TorBrowser-*.dmg
```

Uygulamanın kod imzasını da doğrulayın:

```zsh
spctl --assess --verbose /Applications/Tor\ Browser.app
codesign -dvv /Applications/Tor\ Browser.app
```

### Tor hakkında bilmeniz gerekenler

- Tor, trafiği **çıkış düğümüne** kadar şifreler, ancak Tor kullanımı TLS hostname'leri üzerinden tespit edilebilir
- **Pluggable transports**, Tor trafiğini normal trafik gibi gizleyerek maskeleyebilir
- Ekstra güvenlik için Tor'u **bir VM içinde** kullanın
- Tor, **anonimliği** (kim olduğunuzu) korur, mutlaka **gizliliği** (ne yaptığınızı) korumaz - kendi hesabınızla giriş yaparsanız, Tor sizi korumaz
- Tor, ağın büyük bölümlerini kontrol eden düşmanların yapacağı **küresel trafik analizine** karşı zayıftır

> **Uyarı:** anonimlik ve gizliliği birbirine karıştırmayın. Tor sizi anonim yapar, ancak bir sitede kişisel bilgilerinizi girerseniz, bu anonimlik ortadan kalkar.

## VPN {#vpn style="color: white;"}



Bir VPN, sizinle VPN sunucusu arasındaki trafiği şifreler. Bazı temel noktalar:

- **PPTP'den kaçının** - eski ve güvensizdir
- **WireGuard** veya **OpenVPN**'i tercih edin
- VPN bağlantısı kesildiğinde **trafik sızıntısına** dikkat edin - bir kill switch (acil durum anahtarı) yapılandırın
- VPN sağlayıcısının **yargı bölgesini** (jurisdiction) göz önünde bulundurun

Maksimum kontrol istiyorsanız, **kendi VPN'inizi barındırmanızı** şiddetle öneririm. Bir VPS üzerinde WireGuard + Pi-hole mükemmel bir kombinasyondur.

İşte tüm trafiği VPN üzerinden zorlamak için örnek **pf** kuralları:

```
# VPN dışında her şeyi engelle
block all
pass on lo0
pass out on utun0   # VPN arayüzü
pass out on en0 proto udp to VPN_SUNUCU_IP port 51820  # WireGuard portu
```

## PGP/GPG: İletişimlerin Şifrelenmesi {#pgp style="color: white;"}

PGP (Pretty Good Privacy), e-posta ve dosyaların uçtan uca şifrelenmesi için standarttır. GPG (GNU Privacy Guard) ise açık kaynaklı uygulamasıdır.

```zsh
# GPG'yi kur
brew install gnupg

# Bir anahtar çifti oluştur
gpg --full-generate-key

# Açık anahtarı dışa aktar
gpg --armor --export eposta_adresiniz@ornek.com
```

Maksimum güvenlik için, özel anahtarlarınızı bir **YubiKey** üzerinde saklayın: anahtarlar donanım cihazını asla terk etmez.

`gpg.conf` dosyası için [drduh'un önerilen yapılandırmasını](https://github.com/drduh/config/blob/master/gpg.conf) kullanmanızı şiddetle öneririm.

## Güvenli Mesajlaşma {#messaggistica style="color: white;"}

### XMPP

Açık, federe ve çoklu platform destekleyen bir protokol. Varsayılan olarak uçtan uca şifreli değildir: şifreleme için **OMEMO** uzantısını kullanın.

### Signal

Bana göre anlık mesajlaşma için en iyi şifreleme protokolü. Gelişmiş uçtan uca şifreleme için **Double Ratchet Protocol**'ü kullanır. Kayıt için bir telefon numarası gerektirir.

### iMessage

Bir Apple Hesabı gerektirir. Kullanıyorsanız, kişilerinizin kimliğini doğrulamak için **Contact Key Verification**'ı (Kişi Anahtarı Doğrulaması) etkinleştirin.

**!UYARI!** Advanced Data Protection **olmadan** iCloud yedeklemesi kullanırsanız, Apple mesajlarınızın şifreleme anahtarlarını saklar. iMessage kullanıyorsanız bunu hemen etkinleştirin.

## Virüsler ve Kötü Amaçlı Yazılımlar {#malware style="color: white;"}

Mac'ler kötü amaçlı yazılımlara karşı **bağışık değildir**. Tehdit sayısı sürekli artmaktadır. Kendinizi nasıl koruyacağınızı görelim.

### Yazılımı güvenli şekilde indirmek

- **App Store**'u veya Apple tarafından **Notarize edilmiş** (notarized) uygulamaları tercih edin
- Her zaman HTTPS üzerinden **resmi** sitelerden indirin
- Aşırı izin isteyen uygulamalardan kaçının
- Mümkün olduğunda **açık kaynaklı yazılımları** tercih edin

### App Sandbox

Bir uygulamanın sandboxing kullanıp kullanmadığını kontrol edin:

```zsh
codesign --entitlements - /Applications/UygulamaAdi.app
```

App Store'daki tüm uygulamalar sandbox kullanmak zorundadır. **Etkinlik İzleyicisi**'ndeki (Activity Monitor) "Sandbox" sütununu da kontrol edebilirsiniz.

### Hardened Runtime

Bir uygulamanın Hardened Runtime kullanıp kullanmadığını kontrol edin:

```zsh
codesign --display --verbose /Applications/UygulamaAdi.app
```

Çıktıda `flags=0x10000(runtime)` ifadesini arayın. Notarize edilmiş uygulamalar bunu kullanmak zorundadır.

### Antivirüs

- Şüpheli dosyaları çalıştırmadan önce taramak için [VirusTotal](https://www.virustotal.com/)'ı kullanın
- macOS, arka planda otomatik olarak güncellenen **XProtect**'i içerir
- **[BlockBlock](https://objective-see.org/products/blockblock.html)**, kalıcı kötü amaçlı yazılım bileşenlerini tespit eder
- Yerel bir antivirüs iki uçlu bir kılıçtır: saldırı yüzeyini artırır ve genellikle verilerinizle "eve telefon eder"

### Gatekeeper

Gatekeeper, notarize edilmemiş uygulamaları engeller. Ayarlarda **Gizlilik ve Güvenlik** üzerinden bir uygulamaya manuel olarak izin verebilirsiniz, ancak bunu yalnızca tamamen güvendiğiniz uygulamalar için yapın.

Gatekeeper'ın yalnızca `.app` paketlerini koruduğunu, tüm çalıştırılabilir dosyaları korumadığını unutmayın.

## System Integrity Protection (SIP) {#sip style="color: white;"}

SIP, sistem dosyalarını root kullanıcısı dahil değişikliklerden korur. Etkin olduğunu kontrol edin:

```zsh
csrutil status
```

Devre dışı olarak görünüyorsa, Recovery modundan yeniden etkinleştirin. Tam olarak ne yaptığınızı ve nedenini bilmediğiniz sürece **SIP'yi asla devre dışı bırakmayın**.

## Meta Veriler ve Dijital İzler {#metadati style="color: white;"}

macOS, şaşırtıcı miktarda meta veri saklar. İşte en önemlileri ve nasıl silineceği.

### İndirme meta verileri

APFS, bir dosyayı nereden indirdiğinizi açığa çıkaran genişletilmiş öznitelikleri kaydeder:

```zsh
# İndirilen bir dosyanın meta verilerini görüntüle
xattr -l ~/Downloads/indirilen_dosya

# Kaynak meta verisini kaldır
xattr -d com.apple.metadata:kMDItemWhereFroms ~/Downloads/indirilen_dosya
xattr -d com.apple.quarantine ~/Downloads/indirilen_dosya
```

### Bluetooth geçmişi

Bağlanılan Bluetooth cihazlarının geçmişi `com.apple.Bluetooth.plist` içinde saklanır.

### QuickLook önbelleği

QuickLook, önbellekte saklanan dosya önizlemeleri oluşturur. Temizlemek için:

```zsh
qlmanage -r cache
```

### NVRAM'deki Wi-Fi kimlik bilgileri

Wi-Fi kimlik bilgileri NVRAM'de saklanabilir. Silmek için:

```zsh
sudo nvram -d 36C28AB5-6566-4C50-9EBD-CBB920F83843:current-network
```

### Klavye ve yazım verileri

macOS, yazım verilerinizi şu dizinlerde saklar:
- `~/Library/LanguageModeling/`
- `~/Library/Spelling/`
- `~/Library/Suggestions/`

Bu dizinleri silebilir ve yeniden oluşturulmalarını önlemek için kilitleyebilirsiniz:

```zsh
rm -rf ~/Library/LanguageModeling ~/Library/Spelling ~/Library/Suggestions
mkdir ~/Library/LanguageModeling ~/Library/Spelling ~/Library/Suggestions
chmod -R 000 ~/Library/LanguageModeling ~/Library/Spelling ~/Library/Suggestions
```

### Siri Analytics

Siri devre dışı bırakılmış olsa bile `SiriAnalytics.db` oluşturulur. Silinebilir ama yeniden oluşturulur.

### Kaydedilmiş uygulama durumu

macOS, yeniden başlatma sonrasında geri yüklemek için uygulama durumunu kaydeder:

```zsh
rm -rf ~/Library/Saved\ Application\ State/*
chmod -R 000 ~/Library/Saved\ Application\ State
```

## Parolalar ve Kimlik Doğrulama {#password style="color: white;"}

### Parola yönetimi

macOS'a yerleşik **Parolalar** uygulaması güvenli kimlik bilgileri üretir ve **passkey**'leri (FIDO) destekler. Akılda kalıcı parolalar için **diceware** yöntemini (sözlükten rastgele kelimeler) kullanın.

Daha teknik kullanıcılar için **GnuPG**, şifrelenmiş parola dosyalarını yönetebilir.

### Çok faktörlü kimlik doğrulama (MFA)

Tüm hesaplarınızda MFA'yı etkinleştirmek çok önemlidir. Güvenlik sırasına göre:

1. **WebAuthn/FIDO2** (YubiKey gibi donanım anahtarı) - en güvenlisi
2. **TOTP** (Aegis, 2FAS gibi uygulamalar) - çok iyi
3. **HOTP** - iyi
4. **SMS** - hiç yoktan iyi, ancak SIM swapping'e (SIM kart klonlamaya) karşı zayıf

WebAuthn için ve donanım GPG/SSH anahtarı olarak bir **YubiKey** kullanmanızı şiddetle öneririm.

## Yedeklemeler {#backup style="color: white;"}



**Yedeklemelerinizi kaydetmeden önce her zaman şifreleyin.** **3-2-1** kuralını izleyin: 3 kopya, 2 farklı ortam türü, 1 dış konumda kopya.

### Time Machine

Time Machine'i **şifrelenmiş** bir harici diskle kullanın:

**Sistem Ayarları > Genel > Time Machine > Yedekleme Diski Ekle** ("Yedeklemeyi şifrele" seçeneğini seçin)

### GPG ile manuel yedeklemeler

```zsh
# Şifrelenmiş bir arşiv oluştur
tar czf - ~/Documents | gpg --encrypt --recipient eposta_adresiniz > backup_docs.tar.gz.gpg

# Yedeklemenin şifresini çöz
gpg --decrypt backup_docs.tar.gz.gpg | tar xzf -
```

### Şifrelenmiş disk imajları

```zsh
hdiutil create -size 500m -encryption AES-256 -volname "Guvenli Yedek" -fs APFS ~/guvenli_yedek.dmg
```

Diğer seçenekler: şifrelenmiş artımlı yedeklemeler için **[restic](https://restic.net/)**, E2EE bulut depolama için **[Tresorit](https://tresorit.com/)**.

## Wi-Fi {#wifi style="color: white;"}

- **Gizli ağlardan kaçının**: cihazınız ağ adını içeren probe'lar göndermek zorundadır, bu da bağlandığınız ağların geçmişini açığa çıkarabilir
- Ev ağınızı **WPA3** olarak ayarlayın
- Her ağ için **rastgele MAC adresini** etkinleştirin: **Wi-Fi Ayarları > Ağ Detayları > Özel Wi-Fi Adresi**

## SSH {#ssh style="color: white;"}

### Giden bağlantılar

Parola ile korunan (ya da daha iyisi, bir YubiKey üzerinde saklanan) SSH anahtarları kullanın. `~/.ssh/config` dosyasında:

```
Host *
    HashKnownHosts yes
    IdentitiesOnly yes
```

### VPN alternatifi olarak SSH tüneli

SSH, hafif bir VPN gibi çalışabilir:

```zsh
# Yerel port yönlendirme
ssh -L 8080:dahili_site:80 kullanici@sunucu

# SOCKS proxy
ssh -D 1080 kullanici@sunucu
```

Ardından tarayıcınızı SOCKS proxy olarak `localhost:1080`'i kullanacak şekilde yapılandırın.

### SSH sunucusu (sshd)

macOS'ta sshd varsayılan olarak devre dışıdır (Uzaktan Oturum Açma). Etkinleştirmeniz gerekiyorsa:

- **Parola ile kimlik doğrulamayı devre dışı bırakın**
- Yalnızca SSH anahtarları kullanın
- fail2ban veya benzeri bir araç yapılandırın

## Fiziksel Güvenlik {#fisico style="color: white;"}

- **Mac'inizi asla gözetimsiz bırakmayın** - donanım keylogger'lar mevcuttur (yerleşik klavye veya Bluetooth kullanarak azaltılabilir)
- **[BusKill](https://www.buskill.in/)** ve **[swiftGuard](https://github.com/Lennolium/swiftGuard)** gibi anti-forensik araçlar, yetkisiz USB olayları veya fiziksel ayrılma tespit ettiklerinde sistemi otomatik olarak kapatabilir
- Halka açık yerlerde çalışırken ekranınızda bir **gizlilik filtresi** kullanın
- Fiziksel erişimi tespit etmek için kasa vidalarında **oje** veya kurcalamaya karşı koruyan mühürler kullanmayı düşünün

## Sistem İzleme {#monitoraggio style="color: white;"}

### OpenBSM Audit

macOS, süreç yürütmeyi ve ağ etkinliğini izlemek için OpenBSM içerir. **Not:** Apple, macOS 11 (Big Sur) itibarıyla OpenBSM'i Endpoint Security framework'ü yararına kullanımdan kaldırmıştır (deprecated). macOS'un son sürümlerinde tam olarak çalışmayabilir; [Objective-See](https://objective-see.org/)'ninkiler gibi Endpoint Security tabanlı araçları değerlendirin.

```zsh
# Audit günlüklerini gerçek zamanlı takip et
sudo praudit -l /dev/auditpipe
```

Dikkat: yapılandırma değişiklikleri yeniden başlatma gerektirir.

### Süreç yürütme

```zsh
# Tüm süreçleri listele
ps -ef

# Yüklenmiş tüm servisleri listele
launchctl list
```

Grafiksel bir görünüm için **Etkinlik İzleyicisi**'ni (Activity Monitor) kullanın.

### Ağ

```zsh
# Tüm etkin ağ bağlantılarını görüntüle
lsof -Pni

# Dinlemedeki portları listele
netstat -atln
```

DNS sorgularını, HTTP isteklerini ve TLS sertifikalarını izlemek için derinlemesine trafik analizi yapmak amacıyla **Wireshark** veya **tshark** kullanın.

## Çeşitli ve Son Öneriler {#varie style="color: white;"}

Mac'inizi güçlendirmek için ek yapılandırmalardan oluşan bir derleme:

```zsh
# Apple'a tanılama raporlarını devre dışı bırak
sudo defaults write /Library/Application\ Support/CrashReporter/DiagnosticMessagesHistory.plist AutoSubmit -bool false

# Ekran koruyucu ile ekranı anında kilitle
defaults write com.apple.screensaver askForPassword -int 1
defaults write com.apple.screensaver askForPasswordDelay -int 0

# Finder'da gizli dosyaları göster
defaults write com.apple.finder AppleShowAllFiles -bool true

# Tüm dosya uzantılarını göster
defaults write NSGlobalDomain AppleShowAllExtensions -bool true

# Varsayılan olarak iCloud'a kaydetme
defaults write NSGlobalDomain NSDocumentSaveNewDocumentsToCloud -bool false

# Terminal'de güvenli klavye girişini etkinleştir
defaults write com.apple.terminal SecureKeyboardEntry -bool true

# Çökme bildirimi iletişim kutusunu devre dışı bırak
defaults write com.apple.CrashReporter DialogType -string "none"

# Bonjour multicast duyurularını devre dışı bırak
sudo defaults write /Library/Preferences/com.apple.mDNSResponder.plist NoMulticastAdvertisements -bool true

# umask değerini 077 olarak ayarla (dosyalar yalnızca sahibi tarafından erişilebilir)
sudo launchctl config user umask 077
```

Şunları da hatırlayın:
- Medya için **QuickTime Player**'ı kullanın (sandboxlanmıştır ve Hardened Runtime kullanır)
- Kullanmıyorsanız **Handoff** ve **Bluetooth**'u devre dışı bırakın
- Diğer uygulamaların tuş vuruşlarınızı yakalamasını önlemek için Terminal'de **Secure Keyboard Entry**'yi etkinleştirin

## İlgili Yazılımlar {#software style="color: white;"}

- **[Lynis](https://cisofy.com/lynis/)** - Çoklu platform güvenlik denetimi
- **[osquery](https://osquery.io/)** - Sisteminizi SQL sorgularıyla sorgulayın
- **[Pareto Security](https://paretosecurity.com/)** - Temel güvenlik kontrolleri için menü çubuğu uygulaması

---

Aferin kahraman! Buraya kadar geldiyseniz, Mac'inizi "kutudan çıktığı haliyle" bir sistemden gerçek bir dijital kaleye dönüştürdünüz. Kolay bir yolculuk değildi, ama buna değdi. Şimdi çok az Mac kullanıcısının ulaştığı bir gizlilik ve güvenlik seviyesiyle gezinmek, çalışmak ve iletişim kurmak için gereken araçlara ve bilgiye sahipsiniz.

Okuduğunuz için çok teşekkürler! Bu kılavuz size yardımcı olduysa, Mac'lerini korumak isteyen diğer kaplumbağalarla paylaşın. Gizlilik bir haktır, gizlenecek bir şey değildir.

## İlgili Kılavuzlar

- **[Tehdit Modeli Kılavuzu](/tr/threat-model)** - Daha bilinçli güvenlik kararları almak için tehdit modeli kavramını daha derinlemesine inceleyin
- **[WireGuard ve Pi-hole ile Kendi Barındırılan VPN](/tr/vpn)** - Ağınız üzerinde maksimum kontrol için kendi kişisel VPN'inizi barındırın
- **[E-posta Güvenliği Kılavuzu](/tr/email-security)** - E-posta iletişimlerinizi DMARC, SPF ve şifreleme ile koruyun
- **[Android Gizliliği ve De-Google Kılavuzu](/tr/android)** - Aynı gizlilik ilkelerini Android telefonunuza da uygulayın

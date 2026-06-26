---
title: "Kendi Sunucunda VPN: WireGuard + Pi-hole + Unbound"
description: "WireGuard, Pi-hole ve Unbound DNS ile kendi özel VPN'ini kur. Ticari sağlayıcılara güvenmeden reklam ve takipçileri engelle. Eksiksiz rehber."
summary: "WireGuard, Pi-hole ve Unbound DNS ile kendi özel VPN'ini kur. Ticari sağlayıcılara güvenmeden reklam ve takipçileri engelle. Eksiksiz rehber."
keywords: ["kendi sunucunda vpn", "vpn rehberi", "wireguard kurulumu", "pi-hole", "unbound dns", "wireguard türkçe", "vpn gizlilik", "kişisel vpn sunucusu"]
author: "b4lol"
date: 2026-01-15
lastmod: 2026-05-05
url: /tr/vpn
series: ["Dijital Gizlilik", "Güvenlik"]
topics: ["self-hosting"]
faq:
  - question: "Ticari bir VPN kullanmak yerine neden kendi VPN'imi kurmalıyım?"
    answer: "Pek çok ticari VPN sağlayıcısı, kullanıcı verilerini işleyerek veya satarak gelir elde eder. Kendi sunucunuzda barındıracağınız bir VPN ile bağlantınız üzerinde tam kontrol sahibi olur, reklamlar ile izleyicilere karşı DNS düzeyinde engelleme yapabilir ve sunucu lokasyonunu kendiniz belirlersiniz."
  - question: "Bu kurulum için hangi bileşenlere ihtiyacım var?"
    answer: "Temel olarak üç ana bileşene ihtiyacınız vardır: İnternet trafiğinizi şifreli tünellerden geçirmek için WireGuard, reklamları ve izleyicileri engellemek için Pi-hole ve DNS sorgularınızı bağımsız çözmek için Unbound."
  - question: "Kendi sunucumda barındırılan bir VPN'i çalıştırmanın maliyeti nedir?"
    answer: "Maliyet, tercih edeceğiniz sanal sunucu (VPS) sağlayıcısına göre değişiklik gösterir. Genellikle giriş seviyesi bir sunucu aylık birkaç euro/dolar karşılığında kiralanabilir. Sunucu satın almadan önce güncel fiyatları ve trafik limitlerini incelemeniz önerilir."
  - question: "VPS sunucusuna hangi işletim sistemini kurmalıyım?"
    answer: "Debian veya Ubuntu gibi kararlı ve yaygın kullanılan dağıtımlar önerilir. WireGuard, Pi-hole ve Unbound kurulum araçları bu sistemlerde sorunsuz çalışmaktadır."
  - question: "Cihazlarımı VPN sunucusuna nasıl bağlayabilirim?"
    answer: "Mobil cihazınıza WireGuard uygulamasını yükledikten sonra sunucuda oluşturduğunuz QR kodunu taratarak kolayca bağlanabilirsiniz. Linux bilgisayarlarda ise yapılandırma dosyasını /etc/wireguard dizinine taşıyıp wg-quick aracıyla tüneli aktif edebilirsiniz."
  - question: "VPN'in ve reklam engellemenin düzgün çalıştığını nasıl kontrol ederim?"
    answer: "IP adresinizi ve sızıntıları kontrol etmek için vpntesting.com adresini kullanabilirsiniz. Reklam engelleme performansını ölçmek için ise d3ward.github.io/toolz/adblock.html adresindeki testi çalıştırabilirsiniz."
  - question: "Kendi sunucumda barındırılan bir VPN beni tamamen anonim yapar mı?"
    answer: "Hayır. Çıkış IP adresi yalnızca size özel olacağından, milyonlarca kullanıcının IP'sini paylaşan ticari VPN'lere kıyasla takibiniz daha kolay olabilir. Bu kurulum genel anonimlikten ziyade veri gizliliğinizi korumaya yöneliktir."
howto:
  name: "WireGuard, Pi-hole ve Unbound ile kendi sunucunda barındırılan bir VPN nasıl kurulur"
  description: "Bir VPS seçme, WireGuard kurma, Pi-hole ile DNS seviyesinde engelleme ekleme ve Unbound'u yerel çözümleyici olarak kullanma prosedürü."
  totalTime: "PT1H30M"
  supply:
    - "Debian veya Ubuntu VPS sunucusu"
    - "Alan adı veya genel IP adresi"
  tool:
    - "SSH"
    - "WireGuard"
    - "Pi-hole"
    - "Unbound"
  steps:
    - name: "VPS sağlayıcısını seçmek"
      text: "Sunucuyu satın almadan önce yargı yetkisini, maliyetleri, dahil edilen bant genişliğini, ödeme yöntemlerini ve sağlayıcının politikalarını değerlendir."
      url: "/tr/vpn#scelta-dellhosting-provider"
    - name: "Sunucuya SSH ile bağlanmak"
      text: "VPS'e SSH üzerinden bağlan, sistemi güncelle ve kurulum ortamını hazırla."
      url: "/tr/vpn#connessione-al-server-vps-con-ssh"
    - name: "WireGuard'ı kurmak"
      text: "WireGuard'ı VPN sunucusu olarak yapılandır ve tüneli kullanacak cihazlar için istemci profilleri oluştur."
      url: "/tr/vpn#setup-della-vpn"
    - name: "Pi-hole ve Unbound'u yapılandırmak"
      text: "Reklam ve takipçileri filtrelemek için Pi-hole'u kur, ardından Unbound'u yerel DNS çözümleyici olarak yapılandır."
      url: "/tr/vpn#configurazione-pihole-e-adlists"
    - name: "Yapılandırmaları dışa aktarmak ve test etmek"
      text: "WireGuard profillerini istemcilere aktar ve genel IP'yi, DNS sızıntılarını ve reklam engellemeyi kontrol et."
      url: "/tr/vpn#test-di-funzionamento"
---

> **TL;DR** - Bu rehberde öğrenecekleriniz:
> - Gizliliğe önem veren bir hosting sağlayıcısı nasıl seçilir
> - WireGuard VPN sunucusu olarak nasıl kurulur ve yapılandırılır
> - Reklam ve takipçileri DNS seviyesinde engellemek için Pi-hole nasıl eklenir
> - Üçüncü taraflara bağımlı kalmadan DNS çözümlemeyi kendi başına yapmak için Unbound nasıl yapılandırılır

## Özet

WireGuard, Pi-hole ve Unbound ile kendi sunucunuzda barındıracağınız bir VPN; cihazlarınız ile VPS arasındaki trafiği şifreler, reklam ve takipçilere yönelen isteklerin büyük bir kısmını DNS seviyesinde engeller ve alan adlarını ticari bir çözümleyiciye bağımlı kalmadan yerel olarak çözer. Sizi tamamen anonim yapmaz; yalnızca güven sınırınızı ticari VPN sağlayıcısından sunucuyu kiraladığınız VPS firmasına kaydırır.

Ticari VPN servisleri mutlak gizlilik vadeder ancak iş modelleri genellikle kullanıcı verilerini analiz etmeye veya toplamaya dayanır. En kararlı alternatif, kendi kişisel VPN sunucunuzu kurmaktır. WireGuard, Pi-hole ve Unbound entegrasyonu sayesinde; şifreli bir bağlantıya, yerleşik reklam/takipçi filtresine ve tamamen bağımsız bir DNS çözümleyicisine sahip olabilirsiniz. Üstelik her şey tamamen sizin kontrolünüzde olur. İşte adım adım yapılması gerekenler:

## Amaç

Bu rehberin nihai amacı; reklam ve takipçi engelleme filtresine sahip kendi özel VPN sunucunuzu barındırmaktır. Bu yaklaşım, hazır bir ticari VPN servisi kullanmaya kıyasla bazı avantajlar ve dezavantajlar barındırır:

### Avantajlar

* **Güven Sınırı:** İş modeli genellikle kullanıcı verilerini satmaya veya işlemeye dayalı olan ticari VPN sağlayıcılarına güvenmek zorunda kalmazsınız.
* **DNS Seviyesinde Filtreleme:** Reklamlar ve takipçiler için özel filtre listeleri ekleyebilirsiniz. Bazı ticari VPN'ler de bu özelliği sunar ancak genellikle filtre kalitesi oldukça düşüktür.
* **Tam Kontrol ve Esneklik:** Kurulumu tamamen kendi ihtiyaçlarınıza göre özelleştirebilirsiniz: Daha hızlı tüneller oluşturabilir, özel reklam engelleme listeleri tanımlayabilir ve bağlantıyı ailenizle paylaşabilirsiniz.
* **Yargı Yetkisi Seçimi:** Kiralayacağınız sunucunun lokasyonunu ve dolayısıyla tabi olacağı yasal çerçeveyi (dijital gizliliğe en çok önem veren ülkeleri tercih ederek) kendiniz belirleyebilirsiniz.

### Dezavantajlar

* **Dar Anonimlik Kümesi:** VPN sunucunuzu çok sayıda kişiyle paylaşmadığınız sürece, sunucunun çıkış IP adresini kullanan tek kişi siz olursunuz. Bu durum, IP adresinin doğrudan sizinle ilişkilendirilmesini kolaylaştıracağı için genel anonimlik düzeyinizi azaltır.
* **Sağlayıcıya Güven:** Ticari bir VPN firmasına veri akışını engelleseniz bile, sunucuyu kiraladığınız VPS sağlayıcısı teorik olarak trafiğin nereden gelip nereye gittiğini görebilir (güven sınırını VPN firmasından sunucu firmasına taşımış olursunuz). Bu nedenle sunucu kiralayacağınız şirketi dikkatli seçmeniz kritik önem taşır.

## Hosting Sağlayıcısı Seçimi {#scelta-dellhosting-provider}

Hosting sağlayıcısı, bu kurulumu gerçekleştireceğiniz sunucuyu kiralayacağınız şirket anlamına gelir. Gizliliğinizi koruyan bir yargı yetkisine (Five Eyes veya NATO dışı, ya da veri gizliliği yasaları güçlü olan İzlanda, İsveç, İsviçre gibi ülkeler) sahip bir şirket seçmek çok önemlidir. Tercih edilecek firmanın veri sızıntılarına karışmamış olması, resmi makamlarla minimum veri paylaşımı yapması ve kayıt sırasında minimum kişisel veri talep etmesi (Bitcoin ile ödeme, Tor adresi üzerinden erişim vb.) kritik kriterlerdir.

Bu rehberde size birkaç hosting sağlayıcısı önereceğim; genellikle gizlilik odaklı butik firmalar, büyük küresel sağlayıcılara göre biraz daha pahalıdır. İhtiyacınıza uygun sunucuyu seçerken CPU gücü, depolama ve trafik limitleri gibi teknik detaylara da dikkat etmelisiniz:

*   [VPSbG](https://www.vpsbg.eu/aff/1e5d9e): Bant genişliği limitleri, kullanım kolaylığı ve ödeme yöntemleri arasında iyi bir denge sunan, bu alanda tecrübeli bir sağlayıcıdır.
*   [1984 Hosting](https://1984.hosting/): İzlanda yargı yetkisine önem veriyorsanız ve geniş bir hizmet kataloğu arıyorsanız ideal bir seçenektir.
*   [Njalla](https://njal.la/): Gizlilik topluluğunda oldukça popüler olan, kayıt esnasında e-posta dışında bilgi istemeyen ve kripto para ile ödemeyi destekleyen bir alternatiftir.

**Önemli:** Sunucu fiyatları, donanım özellikleri ve kullanım politikaları zamanla değişebilir. Satın alım yapmadan önce sağlayıcının resmi web sitesindeki güncel limitleri inceleyin ve sunucuda VPN trafiği oluşturulmasına izin verildiğinden emin olun.

Hosting hizmetini seçtikten sonra, üzerine Debian tabanlı kararlı bir dağıtım (Debian veya Ubuntu) kurulu bir VPS satın almanızı ve güçlü bir giriş şifresi belirlemenizi öneririm.

## SSH ile VPS Sunucusuna Bağlanma {#connessione-al-server-vps-con-ssh}

Uzak sunucuları yönetmek için en yaygın kullanılan yöntem SSH (Secure Shell) protokolüdür. VPS sunucunuza bağlanmak için bilgisayarınızda bir terminal açıp şu komutu yazın:

`ssh [kullanici_adi]@[ip_adresi]`

Örnek: `ssh root@192.34.33.25` (Burada "root" varsayılan yönetici kullanıcı adını, ardından gelen sayılar ise sunucunuzun IP adresini temsil eder. Bu bilgileri sunucuyu satın aldığınız şirketin yönetim panelinde bulabilirsiniz). Komutu çalıştırdıktan sonra, sizden istenen yönetici şifresini girerek sunucuya erişim sağlayın.

Bağlantıyı sağladıktan sonra, öncelikle sistem paketlerini güncellemek için şu komutu çalıştırın:

`sudo apt update && sudo apt upgrade -y`

Bu rehberde sunucu güvenliği için herkesin kolayca uygulayabileceği temel adımları izleyeceğiz. Eğer daha güvenli bir altyapı kurmak isterseniz, şifre ile giriş yerine SSH anahtarları (public/private key) kullanarak kimlik doğrulamayı araştırmanızı öneririm.

Ardından, sunucuya yönelik kaba kuvvet (brute-force) saldırılarını engellemek ve şüpheli IP adreslerini kısıtlamak amacıyla fail2ban aracını kurun:

`sudo apt install fail2ban`

## VPN Sunucusu ve Filtreleme Kurulumu {#setup-della-vpn}

Sunucu güncellemelerini ve temel güvenliğini tamamladıktan sonra asıl kuruluma başlayabiliriz. Öncelikle WireGuard VPN sunucusunu kurmak için şu hazır betikten faydalanacağız:

*Bu betik üçüncü taraflarca geliştirilmiş ve güncellenen bir kolaylık aracıdır. Çalıştırmadan önce kaynak kodunu incelemeniz önerilir:*

```
curl -O https://raw.githubusercontent.com/angristan/wireguard-install/master/wireguard-install.sh
chmod +x wireguard-install.sh
./wireguard-install.sh
```

Ardından, DNS seviyesinde reklam ve takipçileri engelleyecek olan Pi-hole yazılımını kuralım:

`curl -sSL https://install.pi-hole.net | bash`

Kurulum sihirbazı sırasında ağ arayüzü olarak **"wg0"** seçeneğini belirleyin. Özel DNS sunucusu kısmını geçici bir değerle geçebilirsiniz (sonrasında bu ayarı güncelleyeceğiz). Kurulum tamamlandıktan sonra web yönetim paneline erişimde kullanacağınız şifreyi şu komutla tanımlayın:

`pihole setpassword`

Belirlediğiniz şifreyi güvenli bir yere not edin.

Şimdi, DNS sorgularımızı harici üçüncü taraf sunuculara göndermeden yerel olarak çözümlememizi sağlayacak olan Unbound yazılımını kuralım:

`sudo apt install unbound`

Unbound ayarlarını yapmak için şu komutla yeni bir yapılandırma dosyası oluşturun:

`nano /etc/unbound/unbound.conf.d/pi-hole.conf`

Aşağıdaki yapılandırma bloğunu dosyanın içerisine yapıştırıp kaydedin:

```
server:
    verbosity: 0
    interface: 127.0.0.1
    port: 5335
    do-ip4: yes
    do-udp: yes
    do-tcp: yes
    do-ip6: yes
    prefer-ip6: no
    harden-glue: yes
    harden-dnssec-stripped: yes
    use-caps-for-id: no
    edns-buffer-size: 1472
    prefetch: yes
    prefetch-key: yes
    minimal-responses: yes
    cache-min-ttl: 300
    cache-max-ttl: 86400
    serve-expired: yes
    msg-cache-size: 50m
    rrset-cache-size: 100m
    num-threads: 1
    so-reuseport: yes
    so-rcvbuf: 4m
    so-sndbuf: 4m
    private-address: 192.168.0.0/16
    private-address: 169.254.0.0/16
    private-address: 172.16.0.0/12
    private-address: 10.0.0.0/8
    private-address: fd00::/8
    private-address: fe80::/10
```

Unbound servisini yeniden başlatarak ayarları aktif hale getirin:

`sudo systemctl restart unbound`

Bu aşamada yerel DNS sunucumuz hazır durumdadır. Şimdi Pi-hole'u, DNS sorgularını çözümlerken Unbound'u kullanacak şekilde yapılandıralım. Pi-hole v6 üzerinde bu ayarlar CLI üzerinden şu komutlarla hızlıca yapılabilir:

```
sudo pihole-FTL --config dns.upstreams '["127.0.0.1#5335"]'
sudo pihole-FTL --config dns.listeningMode 'local'
sudo pihole-FTL --config dns.dnssec 'false'
```

Bu komutlar Pi-hole'a, tek yetkili DNS çözücü olarak yerel ağdaki Unbound'u (5335 portu) kullanmasını söyler.

## Pi-hole ve Reklam Listesi Yapılandırması {#configurazione-pihole-e-adlists}

Komut satırı üzerindeki işlemlerimiz tamamlandı! 🎉 Artık VPN bağlantısını aktif etmeden önce reklam ve takipçi filtrelerini ekleyebiliriz. Tarayıcınızın adres çubuğuna şunu yazın:

`http://{sunucu_ip_adresiniz}/admin`

Örnek: `http://84.177.121.221/admin`

Burada Pi-hole yönetim panelinin giriş ekranı ile karşılaşacaksınız. `pihole setpassword` komutuyla belirlediğiniz şifreyi kullanarak giriş yapın. Giriş yaptıktan sonra sol menüden **Adlists** bölümüne gidin. Bu kısma, engellenmesini istediğiniz alan adlarını içeren filtre listelerini ekleyeceğiz. Filtre listesi seçerken dikkatli olmak gerekir; zira çok fazla ve agresif listeler eklemek internetteki pek çok web sitesinin veya uygulamanın kararsız çalışmasına ya da tamamen açılmamasına yol açabilir. Güvenilir topluluklar tarafından güncellenen dengeli listeleri tercih etmek en sağlıklı yaklaşımdır. Başlangıç için aşağıdaki popüler listeleri ekleyebilirsiniz:

```
https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts
https://adaway.org/hosts.txt
https://v.firebog.net/hosts/AdguardDNS.txt
https://v.firebog.net/hosts/Easyprivacy.txt
https://winhelp2002.mvps.org/hosts.txt
```

Listeleri ekledikten sonra **Tools → Gravity** sayfasına giderek güncellemeyi başlatın. Bu işlem listelerdeki alan adlarını veritabanına işleyecektir. Bazı web sitelerinde veya uygulamalarda erişim sorunları yaşamanız durumunda (örneğin bazı engelleme listeleri Twitter'ın yönlendirme bağlantısı olan `t.co` adresini engelleyebilir), ilgili alan adlarını **Domains → Whitelist** (Beyaz Liste) bölümüne ekleyebilirsiniz. Yaptığınız değişikliklerin etkin olması için Gravity veritabanını güncellemeyi unutmayın.

## Yapılandırmaların Cihazlara Aktarılması

Şimdi oluşturduğumuz bu VPN yapılandırmasını cihazlarımızda aktif edelim.

**Mobil Cihazlar (iOS / Android):**
Cihazınıza resmi [WireGuard](https://www.wireguard.com/install/) uygulamasını yükleyin. Ardından sunucunuzun terminalinde şu komutu çalıştırın:

`bash wireguard-install.sh`

Menüden yeni bir istemci ekleme seçeneğini (Add new client) seçin, istemciye bir isim verin ve DNS ayarı sorulduğunda varsayılan çözücüyü belirtin. Terminalde oluşturulan QR kodunu telefonunuzdaki WireGuard uygulamasına okutun.

Uygulamadaki 'DNS Servers' kısmına VPS sunucunuzun IP adresini yazın. 'Endpoint' bölümünde ise sunucu IP adresiniz ve hemen ardından `:51820` port numarasının yer aldığını doğrulayın. Yapılandırmayı kaydedip VPN bağlantısını aktifleştirin.

**Bilgisayarlar (Windows / macOS / Linux):**
Bilgisayarınıza WireGuard istemcisini yükleyin. Sunucuda oluşturduğunuz `.conf` yapılandırma dosyasını bilgisayarınıza aktarın:
* **Windows/macOS:** `.conf` dosyasını doğrudan WireGuard grafik arayüzüne aktarabilirsiniz.
* **Linux:** Yapılandırma dosyasını `/etc/wireguard/` dizini altına (örneğin `vpn.conf` adıyla) kaydedin. Ardından bağlantıyı başlatmak için:
  `sudo wg-quick up vpn`
  Bağlantıyı kapatmak için ise:
  `sudo wg-quick down vpn`
  komutlarını kullanabilirsiniz.

Bilgisayar tarafında da DNS sunucusu ve Endpoint alanlarının sunucunuzun IP adresini gösterdiğinden emin olun.

## İşlevselliğin Doğrulanması {#test-di-funzionamento}

VPN kurulumumuz tamamlandığına göre her şeyin beklendiği gibi çalışıp çalışmadığını test edebiliriz:

1. Tarayıcınızdan [vpntesting.com](https://vpntesting.com/) adresini ziyaret ederek bir test başlatın. Tespit edilen dış IP adresinin ve konum bilgisinin kendi gerçek internetinize değil, kiraladığınız VPS sunucusuna ait olduğunu doğrulayın.
2. Reklam engelleyicinin performansını ölçmek için [d3ward.github.io/toolz/adblock.html](https://d3ward.github.io/toolz/adblock.html) adresindeki testi çalıştırın. Sonucun %70-80'in üzerinde çıkması, Pi-hole filtrelerinizin başarıyla devrede olduğunu gösterir. (Testi yaparken tarayıcınızdaki diğer reklam engelleyici eklentileri geçici olarak devre dışı bırakın ki Pi-hole'un performansını doğrudan gözlemleyebilesiniz).

Tüm bu adımları başarıyla tamamladıysanız tebrikler; kendi güvenli ve filtreli ağ geçidinizi kurdunuz! 🐉

## Sonuç

Kendi sunucunuzda barındıracağınız bir VPN; gizlilik, esneklik ve reklam engelleme yetenekleri açısından oldukça dengeli bir çözümdür. Sunucu limitlerinizi ve filtre listelerinizi zamanla kendi ihtiyaçlarınıza göre optimize edebilirsiniz. Bu kurulum, gizliliğinizi ticari bir sağlayıcının inisiyatifine bırakmak istemeyenler için en kararlı yoldur.

## İlgili Rehberler

- **[Tor Relay Kurulum Kılavuzu](/tr/tor)** - Kendi sunucunuz üzerinden Tor ağına katkıda bulunun.
- **[Tehdit Modeli Nasıl Oluşturulur?](/tr/threat-model)** - Dijital gizlilik yolculuğunun ilk ve en önemli adımı.
- **[Android'i Google Servislerinden Arındırma: Eksiksiz Gizlilik Kılavuzu](/tr/android)** - Mobil cihazınızı Google servislerinden tamamen arındırın.
- **[GrapheneOS Gelişmiş Kurulum Rehberi](/tr/graphene)** - Mobil gizlilik için en iyi işletim sistemi.

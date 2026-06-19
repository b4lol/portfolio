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
    answer: "Ticari VPN'ler genellikle verilerinizi satarak para kazanır. Kendi sunucunda barındırdığın bir VPN ile bağlantın üzerinde tam kontrol sahibi olursun, reklam ve takipçilere karşı filtre ekleyebilir ve sunucunun bulunduğu ülkeyi kendin seçebilirsin."
  - question: "Bu kurulum için hangi bileşenlere ihtiyacım var?"
    answer: "Üç bileşene ihtiyacın var: trafiği şifrelemek için VPN sunucusu olarak WireGuard, reklam ve takipçileri DNS seviyesinde engellemek için Pi-hole, ve üçüncü taraflara bağımlı kalmamak için yerel DNS çözümleyici olarak Unbound."
  - question: "Kendi sunucunda barındırılan bir VPN'i çalıştırmanın maliyeti nedir?"
    answer: "Maliyet seçtiğin VPS sağlayıcısına göre değişir ve sık sık değişebilir. Genellikle giriş seviyesi bir kurulum ayda birkaç euroya başlar, ama satın almadan önce her zaman güncel fiyatları, dahil edilen bant genişliğini ve politikaları kontrol etmekte fayda var."
  - question: "VPS sunucusuna hangi işletim sistemini kurmalıyım?"
    answer: "Debian veya Ubuntu gibi Debian tabanlı bir dağıtım önerilir. WireGuard ve Pi-hole kurulum betikleri bu dağıtımlar için optimize edilmiştir."
  - question: "Cihazlarımı VPN'e nasıl bağlayabilirim?"
    answer: "Cihazına WireGuard uygulamasını kur, VPS üzerinde betiği kullanarak yapılandırmayı oluştur ve telefonundan QR kodu tarat. Linux PC'lerde .conf dosyasını /etc/wireguard içine kaydet ve bağlantıyı etkinleştirmek için wg-quick kullan."
  - question: "VPN'in ve reklam engellemenin düzgün çalıştığını nasıl kontrol ederim?"
    answer: "IP adresinin VPN sunucusunun IP'siyle eşleştiğini kontrol etmek için vpntesting.com adresini ziyaret et. Ardından reklam engelleyiciyi d3ward.github.io/toolz/adblock.html üzerinde test et: %70-80'in üzerinde bir sonuç her şeyin çalıştığı anlamına gelir."
  - question: "Kendi sunucunda barındırılan bir VPN beni tamamen anonim yapar mı?"
    answer: "Hayır. Çıkış IP'si sadece sen kullandığın için, paylaşımlı bir VPN'e kıyasla takip edilmesi daha kolaydır. Ayrıca VPS sağlayıcısı gerçek IP'ni görebilir, bu yüzden sağlayıcıyı dikkatli seçmek önemlidir."
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

WireGuard, Pi-hole ve Unbound ile kendi sunucunda barındırılan bir VPN, cihazların ile bir VPS arasındaki trafiği şifreler, reklam ve takipçilere yönelen isteklerin büyük bir kısmını DNS seviyesinde engeller ve alan adlarını ticari bir çözümleyiciye bağımlı kalmadan çözer. Seni anonim yapmaz: güveni VPN sağlayıcısından VPS sağlayıcısına kaydırır.

Ticari VPN'ler gizlilik vadeder, ama iş modelleri genellikle tam olarak verilerini toplamaya dayanır. Alternatif? Kendi kişisel VPN'ini kurmak. WireGuard, Pi-hole ve Unbound ile şifreli bir bağlantı, yerleşik reklam/takipçi engelleme ve tamamen bağımsız bir DNS çözümlemesine sahip olabilirsin — hepsi senin kontrolünde. İşte nasıl yapılacağı.

Bu rehber, WireGuard kullanarak kendi VPN'ini kurmak ve Pi-hole ile oluşturulmuş bir AdBlocking filtresiyle reklam bağlantılarını ve takipçileri filtrelemek için eksiksiz bir kılavuz olmayı hedefliyor.

Bu rehber iyileştirme ve önerilere açıktır; kullanılabilirlik/gizlilik dengesi açısından en iyi bulduğum yapılandırmayı anlatacağım, ağ uzmanı değilim ve buradaki rehber seni sihirli bir şekilde anonim ve takip edilemez yapmayacaktır.

Bana öneride bulunmak, rehbere katkıda bulunmak veya çeviri yapmak istersen, [GitHub](https://github.com/b4lol/portfolio) üzerinden bir pull request açabilirsin.

## Hedef

Bu rehberin nihai hedefi, tamamen kendi başına, reklam ve takipçi filtresine sahip bir VPN'i kendi sunucunda barındırmaktır. Bu yaklaşım, normal bir ticari VPN kullanmaya kıyasla bazı avantaj ve dezavantajlar getirir:

### artılar

*   Ne yazık ki iş modeli genellikle kişisel verilerimizi satmak olan bir VPN sağlayıcısına güvenmek zorunda kalmamak
*   Reklam ve takipçiler için filtreler ekleyebilme; bazı VPN'ler bu hizmeti sunar, ama genellikle oldukça düşük kalitede
*   Deneyimi tamamen özelleştirme: daha hızlı bir VPN mi istiyorsun? Belirli reklam filtreleri mi? Tüm aileyle paylaşmak mı istiyorsun? Kendi VPN'inle istediğin gibi yönetebilirsin
*   Kiralayacağın sunucuların ülkesini ve dolayısıyla yasal yargı yetkisini seçebilme (ve dijital gizlilik için en uygun ülkelerden yararlanabilme)

### eksiler

*   IP adresinde daha küçük bir anonimlik kümesi: VPN'ini birçok aile üyesi ve arkadaşınla paylaşmadığın sürece, VPN'in çıkış IP adresini kullanan tek kişi sen olacaksın; bu bir dezavantajdır çünkü doğrudan sana bağlı olmasa da, sadece senin kullandığın benzersiz bir tanımlayıcıdır. Bu, seni takip etmeyi kolaylaştırdığı için gizlilik açısından pek iyi değildir
*   Bir VPN sağlayıcısına veri vermesen de, çoğu durumda bu kurulumu bir VPS'te (kiralık bir sunucuda) yapacaksın, yani güvenini ticari bir VPN sağlayıcısından sunucu kiralayan bir şirkete kaydıracaksın (bu şirket VPN'i kullandığında IP adresini görecek). Bu nedenle sunucu sağlayıcısını dikkatlice seçmek veya bu kurulumu kendi adına kayıtlı olmayan bir internet bağlantısına sahip bir makinede yapmak çok önemlidir

## Hosting sağlayıcısını seçmek {#scelta-dellhosting-provider}

Hosting sağlayıcısı, bu rehberdeki kurulumu yapacağın sunucuyu sana sağlayacak şirket anlamına gelir. Gizliliğini koruyan bir yargı yetkisine sahip bir host bulmak çok önemlidir (ilginç seçenekler arasında Five Eyes dışında, NATO dışında veya iyi veri politikalarına sahip ülkeler bulunur — İzlanda, İsveç, İsviçre, Cebelitarık vb. iyi örneklerdir), güvenilir görünen (önemsiz konularda veri sızdırmamış veya yetkililere mümkün olduğunca az veri vermek için gerçekten çabalıyor görünen) ve hizmetini kullanmak için mümkün olduğunca az kişisel veri isteyen (bitcoin ile ödeme, tor alan adı, telefon onayı olmadan giriş vb.) bir sağlayıcı.

Bu rehberde sana birkaç hosting sağlayıcısı önereceğim; genellikle küçük olanlar veya ilginç gizlilik politikalarına sahip olanlar, büyük hosting şirketlerinden daha pahalıdır. İhtiyaçlarına en uygun sunucuyu seçmek için hangi hizmetlerin sunulduğuna da dikkat etmek önemlidir (güç, depolama kapasitesi ve bant genişliği hızı vb.).

*   [VPSbG](https://www.vpsbg.eu/aff/1e5d9e): bant genişliği, kolaylık ve ödeme seçenekleri arasında genellikle iyi bir denge sunan köklü bir sağlayıcı.
*   [1984 Hosting](https://1984.hosting/): İzlanda yargı yetkisine ve oldukça geniş bir hizmet kataloğuna değer veriyorsan ilginç bir seçenek.
*   [Njalla](https://njal.la/): gizlilik alanında tanınan bir seçenek, bitcoin ile ödeme yapmak ve paylaşılan veriyi en aza indirmek istiyorsan kullanışlı.

**Önemli:** fiyatlar, CPU, dahil edilen trafik ve politikalar sık sık değişebilir. Satın almadan önce her zaman güncel fiyat listelerini kontrol et ve sağlayıcının oluşturmak istediğin trafik türüne gerçekten izin verdiğinden emin ol.

Gizlilik, güvenlik, maliyet vb. açısından farklı maliyet ve ödünleşimlere sahip birçok başka VPS hizmeti vardır. Kendin biraz araştırma yapabilirsin ve yukarıda bahsettiklerimi kullanmak zorunda değilsin.
Hosting hizmetini seçtikten sonra, üzerine Debian tabanlı bir dağıtım (Debian veya Ubuntu) kurulu bir makine satın almaya devam etmeni ve güçlü bir giriş şifresi belirlemeni şiddetle öneririm.

## SSH ile VPS sunucusuna bağlanmak {#connessione-al-server-vps-con-ssh}

Çoğu kişinin bildiği gibi, uzak sunuculara bağlanmak için genellikle SSH kullanılır: Linux terminaline entegre, uzak sunucu veya bilgisayarlara bağlanmak için kullanılan bir protokol. VPS'imize bağlanmak için herhangi bir bilgisayarımızda bir terminal açıp şu komutu veriyoruz:

`ssh [kullanıcı adı]@[ip adresi]`

bir örnek şu şekilde olabilir: ssh root@192.34.33.25 (root genellikle kullanıcı adıdır, ardından gelen sayı ise sunucunun IP adresidir; bunu genellikle satın aldığın makinenin hosting sitesindeki bilgilerinde bulabilirsin). Komutu verdikten sonra, sunucuya giriş yapmak için daha önce belirlediğin şifreyi girmen yeterli.

SSH ile bağlandıktan sonra şu komutu verebiliriz:

`sudo apt update && sudo apt upgrade -y`

böylece işletim sistemimizin tüm paketlerini güncelleriz.
Bu rehberde, sunucumuzun güvenliği için basit ve minimal bir kurulum izleyeceğiz (böylece tüm kullanıcılara uygun olsun); daha gelişmiş bir kurulum istersen, sunucuna SSH genel anahtarı kullanarak nasıl giriş yapacağını çevrimiçi araştırmanı öneririm.

Son olarak şu komutu verelim:

`sudo apt install fail2ban`

bu, sunucumuzda çok fazla yanlış şifre denemesi olduğunda erişimi sınırlamamızı sağlayan çok hafif bir yazılımı kurmak için (böylece sunucunun güvenliğini biraz daha artırırız).

## VPN'in kurulumu {#setup-della-vpn}

VPS'imizi daha güvenli ve güncel hale getirmek için tüm ön hazırlık işlemlerini tamamladığımıza göre artık gerçek kuruluma geçebiliriz; WireGuard'ı şu komutlarla kuralım:

Bu betik, üçüncü bir taraf tarafından sürdürülen bir kolaylık çözümüdür: çalıştırmadan önce, deponun hâlâ aktif olduğunu ve gerçekleştirmek istediğin kurulumla uyumlu olduğunu her zaman doğrula.

```
curl -O https://raw.githubusercontent.com/angristan/wireguard-install/master/wireguard-install.sh
chmod +x wireguard-install.sh
./wireguard-install.sh
```

bu noktada Pi-hole'u da kuralım (reklam, takipçi ve analitik filtresi olarak kullanacağımız yazılım):

`curl -sSL https://install.pi-hole.net | bash`

kurulum sırasında ağ arayüzü olarak "wg0" seçeneğini seç, özel dns seçeneğini kullan (çok önemli değil, sonradan zaten üzerine yazacağız) ve sihirbazı tamamla. Kurulum bittiğinde, web arayüzüne erişmek için şifreyi belirleyelim:

`pihole setpassword`

Seçtiğin şifreyi kaydet, daha sonra ihtiyacımız olacak.

Şimdi Unbound'u kuralım; bu, hızlı bir yerel DNS çözümleyiciye sahip olmamızı sağlayan bir yazılımdır (basitleştirmek gerekirse, son kurulumumuzun eksiksiz, verimli ve hızlı olmasını bu sağlayacak).

`sudo apt install unbound`

ve şununla yapılandıralım:

`nano /etc/unbound/unbound.conf.d/pi-hole.conf`

Bu yapılandırmayı dosyanın içine yapıştır:

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

şimdi Unbound'u yeniden başlatalım:

`sudo systemctl restart unbound`

bu noktada yerel DNS'imizi doğru şekilde hazırladık. Şimdi Pi-hole'u, upstream DNS olarak Unbound'u kullanacak şekilde yapılandıralım. Pi-hole v6'da bu yapılandırma `/etc/pihole/pihole.toml` dosyası, web arayüzü veya CLI üzerinden yönetilir. En basit yol FTL CLI'sini kullanmaktır:

```
sudo pihole-FTL --config dns.upstreams '["127.0.0.1#5335"]'
sudo pihole-FTL --config dns.listeningMode 'local'
sudo pihole-FTL --config dns.dnssec 'false'
```

Bu komutlar Pi-hole'a, tek upstream DNS olarak Unbound'u (port 5335) kullanmasını ve yalnızca yerel arayüzlerde dinlemesini söyler. İstersen aynı değeri web arayüzünden de ayarlayabilirsin, ama Pi-hole v6'da eski `pihole --config` sözdizimi artık doğru değildir.

## Pi-hole ve Adlists yapılandırması {#configurazione-pihole-e-adlists}

Komut satırı kısmı artık bitti, başardın savaşçı! 🎉
Teorik olarak şu anda her şey zaten çalışıyor, ama VPN'i kullanmadan önce reklam filtreleri ekleyelim!
Herhangi bir tarayıcı aç ve adres çubuğuna şunu yaz:

`http://{vpn ip adresi}/admin`
örnek: http://84.177.121.221/admin

Bu noktada Pi-hole'un (reklam, takipçi ve analitik filtreleme sistemimiz) giriş sayfasını görmelisin. `pihole setpassword` ile belirlediğin şifreyi kullan. Giriş yaptıktan sonra, yan menüdeki **Domains / Adlists** bölümüne git ve engellenecek çeşitli alan adı listeleri ekleyelim. Bu konu hakkında saatlerce konuşulabilir; temel fikir, eğer rastgele onlarca kaynak eklersek çok şeyi... fazlasını engelleyeceğimiz ve bu yüzden cihazlarımızdaki birçok web sitesinin veya uygulama özelliğinin çalışmayı durduracağıdır. En azından kısmen güvendiğimiz kişiler tarafından hazırlanmış az sayıda liste kullanmak daha iyidir. Aşağıda en önemli ve en bilinen birkaçını bırakıyorum; bu bölümü genişletmek istersen, yapılandırmaya bağlı olarak farklı artı ve eksiler olabileceğinden bunu kendi sorumluluğunda yapmanı öneririm.

```
https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts
https://adaway.org/hosts.txt
https://v.firebog.net/hosts/AdguardDNS.txt
https://v.firebog.net/hosts/Easyprivacy.txt
https://winhelp2002.mvps.org/hosts.txt
```

Çeşitli engelleme listelerini ekledikten sonra, **Tools → Gravity**'ye git ve listeleri etkinleştirmek için güncellemeyi başlat. Bazı sitelerde sorun yaşaman durumunda (ben örneğin geçmişte bazı listelerle Twitter'ın "t.co" bağlantılarında sorun yaşamıştım), siteyi engellenecekler listesinden hariç tutmak için **Domains → Whitelist** bölümüne eklemen yeterli olacak. Değişiklik yaptığında her zaman bunları etkili kılmak için gravity güncellemesi yap.

## Yapılandırmaların dışa aktarılması

Şimdi yapılandırmayı cihazlarımızda etkinleştirelim. Telefonlardan başlayalım:

Cihazımıza [WireGuard](https://www.wireguard.com/install/) uygulamasını kuralım, bunu yaptıktan sonra VPS'imizin terminalini açıp şu komutu verelim:

`bash wireguard-install.sh`

"add new client" seçeneğini seç, istediğin bir ad ver, DNS olarak "current system resolver" seçeneğini seç. Şimdi bize bir QR kod gösterilecek; mobil WireGuard uygulamamızla bunu tarayalım, bunu yaptıktan sonra bize şuna benzer bir ekran göstermelidir:



"DNS servers" bölümüne VPS'imizin IP adresini girelim, "Endpoint" bölümünde aynı IP adresinin ve portu belirten ":51820" yazısının bulunduğunu doğrulayalım; bunu yaptıktan sonra kaydetmek ve VPN'i etkinleştirmek yeterli olacak!

Bilgisayarlar için işlem benzerdir; WireGuard'ı kurmamız, yapılandırmayı VPS üzerinde oluşturmamız (yukarıda Android prosedüründe açıklanan komutu kullan) ve ardından bunu bilgisayara kopyalamamız yeterli olacak:

*   Windows'ta, yapılandırma WireGuard'ın grafik arayüzüne girilmelidir
*   Linux'ta, yapılandırma /etc/wireguard klasöründe .conf uzantılı bir dosyaya kaydedilmelidir (örneğin, vpn.conf), ardından VPN'i terminal komutuyla etkinleştirmek için:

    `sudo wg-quick up {.conf dosyasının adı}`

    kapatmak için ise:

    `sudo wg-quick down {.conf dosyasının adı}`

bilgisayarlarda da, 'DNS server' ve 'Endpoint' bölümlerini sunucumuzun IP adresiyle değiştirdiğimize dikkat edelim.

## Çalışma testi {#test-di-funzionamento}

VPN'imiz artık hazır ve etkin olduğuna göre, her şeyin doğru çalıştığını test edelim. Her şeyden önce herhangi bir tarayıcıda [VPN testing](https://vpntesting.com/) sitesini ziyaret edip bir test başlatalım. Ekranda gösterilen tüm IP adreslerinin ve konumların kendi ülkene ait değil, VPN sunucusuna ait olduğunu doğrula.

Her şey doğruysa, VPN'in kendisini değil, reklam engelleyiciyi test etmek için [AdBlock test](https://d3ward.github.io/toolz/adblock.html) sitesini ziyaret edelim. Sonuç %70-80'in üzerindeyse, her şeyin doğru çalıştığı anlamına gelir (Pi-hole'a daha fazla veya daha az kara liste eklemek bu testin sonuçlarını değiştirebilir). Yanlış sonuçlar almamak için tarayıcındaki AdBlock uzantılarını geçici olarak devre dışı bırakmaya dikkat et. Kullandığın tarayıcı da test sonuçlarını etkileyebilir.

Her iki testi de başarıyla geçersen, gerçek bir ejderhasın ve bu rehberi mükemmel bir şekilde takip etmeyi başardın!! 🐉

## Sonuçlar

Bu, kendi VPN sunucunuzu oluşturmak için mümkün olan birçok kurulumdan sadece biridir. Her yapılandırma türünde olduğu gibi, hizmeti kendi ödünleşimlerine uyacak şekilde değiştirebilirsin. Bu rehberde sunulan yapılandırma, bana göre güvenlik, işlevsellik ve gizlilik arasında iyi bir dengedir. İyileştirme önerilerin varsa veya hata bulduysan, [github deposu](https://github.com/b4lol/portfolio) üzerinden bana yardımcı olabilir ve sesini duyurabilirsin.

---

## İlgili Rehberler

- **[Tor Düğümü: Eksiksiz Kurulum](/tr/tor)** - Kendi röleni kurarak Tor ağına katkıda bulun
- **[Tehdit Modeli Nasıl Oluşturulur](/tr/threat-model)** - Gizliliğini korumanın ilk adımı
- **[Android'de Gizlilik](/tr/android)** - De-google edilmiş bir telefon için eksiksiz yapılandırma
- **[GrapheneOS Üzerine Kesin Rehber](/tr/graphene)** - Mobil gizlilik için en iyi işletim sistemi

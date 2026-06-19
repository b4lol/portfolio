---
title: "E-posta Güvenliği: Şifreleme, SPF, DKIM ve DMARC"
description: "E-posta güvenliğinin nasıl işlediğini keşfedin: STARTTLS'ten PGP'ye, SPF ve DKIM'den DMARC'a. E-postanızı korumak için pratik tavsiyeler içeren eksiksiz bir rehber."
summary: "E-posta güvenliğinin nasıl işlediğini keşfedin: STARTTLS'ten PGP'ye, SPF ve DKIM'den DMARC'a. E-postanızı korumak için pratik tavsiyeler içeren eksiksiz bir rehber."
keywords: ["e-posta güvenliği", "e-posta şifreleme", "PGP e-posta", "DKIM SPF DMARC", "e-posta gizliliği", "güvenli e-posta", "şifreli e-posta", "e-postanızı koruyun", "uçtan uca e-posta şifreleme", "proton mail", "e-posta kimlik doğrulama", "STARTTLS ve SMTPS farkı"]
author: "b4lol"
date: 2026-03-08
lastmod: 2026-05-05
url: /tr/email-security
series: ["Dijital Gizlilik", "Güvenlik"]
topics: ["privacy-security"]
faq:
  - question: "E-posta güvenli midir?"
    answer: "Varsayılan olarak güvenli değildir. E-posta, başlangıçta herhangi bir şifreleme mekanizması içermeyen bir protokol olarak tasarlanmıştır. Günümüzde STARTTLS, SMTPS ve PGP gibi korumalar yaygınlaşmış olsa da, e-postaların büyük kısmı hâlâ uçtan uca şifreleme olmadan iletilmektedir. Proton Mail gibi bazı özel sağlayıcılar ise kendi kullanıcıları arasında varsayılan olarak uçtan uca şifreleme (E2EE) sunmaktadır."
  - question: "SPF, DKIM ve DMARC nedir?"
    answer: "Bunlar e-posta gönderici kimliğini doğrulamak için kullanılan üç temel protokoldür. SPF, gönderen sunucunun yetkili olup olmadığını kontrol eder. DKIM, e-postaları kriptografik imza ile işaretleyerek yolda değiştirilip değiştirilmediğini doğrular. DMARC ise bu kontroller başarısız olduğunda alıcı sunucunun nasıl davranacağını (reddetme, spam'e gönderme veya kabul etme) belirler."
  - question: "STARTTLS ile SMTPS arasındaki fark nedir?"
    answer: "STARTTLS şifrelemeyi, bağlantı düz metin olarak başladıktan sonra müzakere eder. Bu durum, bağlantının araya girilerek şifresiz kalmaya zorlandığı 'sürüm düşürme' (downgrade) saldırılarına kapı aralar. SMTPS ise HTTPS protokolünde olduğu gibi doğrudan şifreli bir TLS bağlantısıyla başlar ve bu güvenlik açığını giderir."
  - question: "PGP e-posta güvenliği için hâlâ kullanılabilir mi?"
    answer: "PGP uçtan uca şifreleme sağlar ancak anahtar yönetiminin zorluğu, geçmişe dönük gizlilik (forward secrecy) sunmaması ve e-postanın konu, gönderici gibi meta verilerini şifreleyememesi gibi dezavantajları vardır. Çoğu kullanıcı için Proton Mail gibi yerleşik şifreleme sunan e-posta servisleri daha pratiktir."
  - question: "E-posta güvenliği nasıl artırılabilir?"
    answer: "Donanım anahtarı (FIDO2) ile iki faktörlü kimlik doğrulamayı (2FA) etkinleştirin, e-posta istemcinizde uzak görsellerin otomatik yüklenmesini ve HTML görünümünü kapatın, hesap kurtarma e-postası yerine çevrimdışı yedek kodları tercih edin."
  - question: "E-posta neden dijital güvenliğin en zayıf halkasıdır?"
    answer: "E-posta, neredeyse tüm çevrimiçi platformlarda varsayılan şifre sıfırlama ve kurtarma kanalıdır. Bir saldırgan e-posta hesabınızı ele geçirirse, bu hesaba bağlı tüm diğer üyeliklerin şifresini kolayca sıfırlayabilir."
howto:
  name: "Bir e-posta hesabı nasıl korunur"
  description: "Güvenilir bir sağlayıcı, MFA, güvenli bir istemci, ayrı hesap kurtarma ve alan adı kimlik doğrulaması ile e-posta riskini azaltmak için bir prosedür."
  totalTime: "PT1H"
  supply:
    - "E-posta hesabı"
    - "Parola yöneticisi"
    - "FIDO2 donanım anahtarı"
  tool:
    - "E-posta istemcisi"
    - "SPF"
    - "DKIM"
    - "DMARC"
  steps:
    - name: "Şifreleme seviyesini anlayın"
      text: "Aktarım sırasında TLS, depolamada şifreleme ve gerçek uçtan uca şifreleme arasındaki farkı ayırt edin."
      url: "/tr/email-security#crittografia-delle-email"
    - name: "Erişimi güvenceye alın"
      text: "SMS yerine benzersiz bir parola, parola yöneticisi ve donanım anahtarıyla 2FA kullanın."
      url: "/tr/email-security#lemail-come-punto-debole"
    - name: "İstemciyi yapılandırın"
      text: "Uzak görselleri ve gereksiz HTML'i devre dışı bırakın, eklenti veya üçüncü taraf istemci kullanımını azaltın."
      url: "/tr/email-security#client-di-terze-parti-e-superficie-dattacco"
    - name: "Alan adını kimlik doğrulamasından geçirin"
      text: "Kişisel veya kurumsal bir e-posta alan adı yönetiyorsanız SPF, DKIM ve DMARC'ı yapılandırın."
      url: "/tr/email-security#autenticazione-delle-email"
    - name: "Kurtarmayı kritik hesaplardan ayırın"
      text: "Tek bir e-posta hesabının tüm önemli hesapları sıfırlayabilmesine izin vermeyin."
      url: "/tr/email-security#passkey-e-il-futuro-dellautenticazione"
---

> **TL;DR** - Bu rehberde öğrenecekleriniz:
> - E-posta şifrelemesinin nasıl çalıştığı ve STARTTLS protokolünün neden yetersiz kaldığı,
> - SPF, DKIM ve DMARC protokollerinin ne olduğu ve e-posta sahteciliğini (spoofing) nasıl engelledikleri,
> - E-postanın, tüm dijital hesaplarınızın güvenliğinde neden en zayıf halka olduğu,
> - Gelecekteki e-posta güvenliği standartları: Uçtan uca şifreleme, DKIM2 ve şifrelenmemiş e-postalara veda süreci.

## Özet

E-posta varsayılan olarak güvenli bir iletişim yöntemi değildir: Meta verileri koruyamaz, çoğunlukla sunucular arası (hop-by-hop) geçici şifreleme kullanır ve neredeyse tüm dijital hesapların şifre sıfırlama noktasıdır. Güvenlik risklerini en aza indirmek için donanım tabanlı iki faktörlü kimlik doğrulama (2FA), güvenilir servis sağlayıcılar, uzak görsellerin yüklenmesinin devre dışı bırakılması, bağımsız hesap kurtarma yöntemleri ve SPF, DKIM ile DMARC alan adı kimlik doğrulamaları kullanılmalıdır.

E-posta, dijital hayatın temel omurgasını oluşturur. Oluşturulan tüm hesaplar, sıfırlanan şifreler ve kritik yazışmalar neredeyse her zaman e-posta adresi üzerinden gerçekleştirilir. Ancak bu iletişim kanalının gerçekte ne kadar güvenli olduğunu bilmek önem taşır.

E-posta, siber güvenliğin öncelikli olmadığı 1980'li yıllarda tasarlanmış bir protokoldür. Zaman içerisinde üzerine ek güvenlik katmanları eklenmiş olsa da, günümüzde karmaşık ve genellikle hatalı yapılandırılan bir mimariye dönüşmüştür.

Bu rehberde, veri aktarım şifrelemesinden alan adı doğrulamasına kadar e-posta güvenliğinin güncel durumunu inceleyecek ve gelecekte bizi nelerin beklediğini ele alacağız.

## E-posta Şifrelemesi {#crittografia-delle-email}

E-postalarınızın ağ üzerinde iletilirken ve sunucularda depolanırken nasıl korunduğunu detaylarıyla inceleyelim.

### STARTTLS: Sürüm Düşürme Riskleri

STARTTLS, e-postaları aktarım sırasında şifrelemek için en yaygın kullanılan mekanizmalardan biridir. Bu yöntemde e-posta istemcisi, mesajı göndermeden önce sunucuyla bir TLS (şifreli) bağlantı müzakere eder.

Temel zayıflığı, şifreleme müzakeresinin düz metin (cleartext) olarak başlamasıdır. Ortadaki adam (MITM) konumundaki bir saldırgan, ağ trafiğindeki STARTTLS komutunu engelleyerek bağlantıyı şifrelenmemiş olarak kalmaya zorlayabilir. Sürüm düşürme (downgrade) saldırısı olarak adlandırılan bu durumu e-posta istemcileri çoğunlukla fark edemez.

Ayrıca STARTTLS sorunsuz çalışsa bile şifreleme yalnızca sunucular arasında (hop-by-hop) gerçekleşir. Mesajın şifresi, uğradığı her ara sunucuda çözülür ve yeniden şifrelenir. Bu durum uçtan uca şifreleme (E2EE) sağlamaz; dolayısıyla veri iletim yolundaki sunucular içeriği okuyabilir.

### SMTPS: Doğrudan Şifreli Bağlantı

SMTPS (Implicit TLS), sürüm düşürme risklerini ortadan kaldırır. Bağlantı kurulduktan sonra şifrelemeyi müzakere etmek yerine, web sitelerindeki HTTPS bağlantısı gibi doğrudan şifreli bir kanal üzerinden iletişime başlar.

SMTPS protokolü varsayılan olarak **465** portunu kullanırken, STARTTLS ise **587** portunu tercih eder. Güvenlik standartları açısından SMTPS net bir gelişme olsa da, geçmişten günümüze süregelen port karmaşası sağlayıcılar arasında yapılandırma farklılıklarına neden olabilmektedir.

### POP3S ve IMAPS

Posta sunucusundan e-postaları almak için kullanılan protokoller de şifreli sürümleri desteklemektedir:

- **POP3S**, **995** portu üzerinden şifreli bağlantı kurar.
- **IMAPS**, **993** portunu kullanarak verileri TLS ile korur.

Bu protokoller e-postaların yerel istemcinize güvenle indirilmesini sağlasa da, mesajların sunucudaki depolama şifrelemesi sorununu tek başlarına çözemezler.

### OpenPGP: Güçlü Mimari, Zor Kullanılabilirlik

OpenPGP, e-posta şifrelemesinin en eski ve bilinen yöntemlerinden biridir. Açık ve gizli anahtar çiftine dayalı asimetrik şifreleme mimarisi sunar. Gönderici, alıcının açık anahtarı (public key) ile veriyi şifreler; alıcı ise kendi gizli anahtarı (private key) ile şifreyi çözer. Aracı konumundaki sunucular veriyi okuyamaz.

Ancak anahtar yönetiminin zorluğu kullanımı kısıtlamaktadır:

- Anahtar çifti oluşturma ve açık anahtarı güvenli şekilde paylaşma gereksinimi,
- Gizli anahtarın çalınması durumunda geçmişe dönük tüm şifreli yazışmaların ifşa olması (forward secrecy eksikliği),
- E-postanın meta verilerinin (gönderici, alıcı, gönderim tarihi ve konu başlığı) şifrelenememesi.

### S/MIME: Kurumsal Çözüm

S/MIME, e-postaları şifrelemek için X.509 dijital sertifikalarını kullanır. Sertifika yönetimi yetkili kuruluşlar (CA) üzerinden yürütüldüğü için PGP'ye kıyasla daha entegre bir yapı sunar. Ancak sertifika maliyetleri ve geçmişe dönük gizlilik sunmaması gibi nedenlerle genellikle merkezi yönetime sahip kurumsal şirketlerde tercih edilmektedir.

### Web Key Directory (WKD)

WKD, PGP açık anahtarlarının dağıtımını otomatikleştiren modern bir çözümdür. İstemciniz, alıcının açık anahtarını bulmak için harici sunucular yerine doğrudan alıcının e-posta alan adını sorgulayarak kriptografik anahtarı otomatik olarak çeker. Ancak henüz tüm sağlayıcılar tarafından desteklenmemektedir.

## E-posta Kimlik Doğrulama Protokolleri {#autenticazione-delle-email}

Şifreleme mesajın içeriğini korurken, kimlik doğrulama protokolleri ise gönderenin iddia ettiği kişi olup olmadığını denetler.

### SPF (Sender Policy Framework)

SPF, bir alan adının hangi sunucular üzerinden e-posta göndermeye yetkili olduğunu listeleyen bir DNS kaydıdır. Alıcı sunucu, gelen e-postanın yetkili sunucudan gelip gelmediğini bu DNS kaydı üzerinden doğrular.

SPF'nin sınırları:
- DNS protokolünün kendi güvenlik zaafiyetlerinden etkilenir.
- Gönderici bazlı değil, yalnızca sunucu bazlı doğrulama yapar.
- DNS kaydındaki politikanın gevşek tanımlanması (örneğin `~all` veya `+all`) koruma etkisini azaltır.

### DKIM (DomainKeys Identified Mail)

DKIM, giden e-postalara kriptografik bir dijital imza ekler. Gönderici sunucu giden mesajı kendi gizli anahtarıyla imzalar, alıcı sunucu ise DNS üzerinde yayınlanan açık anahtarı kullanarak mesajın yolda değiştirilmediğini doğrular. DKIM veriyi şifrelemez, yalnızca bütünlüğünü ve kaynağını garanti eder.

### DMARC (Domain-based Message Authentication)

DMARC, SPF ve DKIM protokollerini birleştiren ve yöneten üst katmandır. SPF veya DKIM doğrulamalarından geçemeyen şüpheli e-postalara alıcı sunucunun ne yapacağını belirler:

- **none:** Herhangi bir engelleme yapma (yalnızca raporla).
- **quarantine:** Şüpheli postayı gereksiz (spam) klasörüne taşı.
- **reject:** E-postayı tamamen reddet ve teslim etme.

Sıkı güvenlik politikasına sahip bir DMARC kaydı örneği:

```text
v=DMARC1; p=reject; adkim=s; aspf=s;
```

Burada `p=reject` doğrulanmayan postaların doğrudan reddedileceğini, `adkim=s` ve `aspf=s` ise sıkı eşleme kurallarının uygulanacağını gösterir.

### DNSSEC: DNS Protokolünü Güvenli Hale Getirme

E-posta doğrulama kayıtlarının (SPF, DKIM, DMARC) tamamı DNS sorgularına dayanır. Ancak standart DNS protokolü sorgu yanıtlarının değiştirilmesine (DNS önbellek zehirlenmesi - cache poisoning) karşı korumasızdır. DNSSEC, DNS yanıtlarını kriptografik olarak imzalayarak bu verilerin doğruluğunu garanti altına alır.

### DANE ve MTA-STS

Bu protokoller e-posta sunucuları arasındaki aktarım şifrelemesini (TLS) zorunlu kılmak için kullanılır:

- **DANE:** Güvenliğini DNSSEC altyapısına dayandırır ve TLSA kayıtları aracılığıyla sertifikaları doğrular.
- **MTA-STS:** Web platformundaki HSTS mantığına benzer şekilde çalışır. HTTPS protokolünü kullanarak sunucunun yalnızca şifreli TLS bağlantılarını kabul edeceğini bildirir.

## Güvenlik Zayıflığı Olarak E-posta Yetkilendirmesi {#lemail-come-punto-debole}

E-posta adresiniz, dijital dünyadaki hemen hemen tüm hesaplarınızın şifre sıfırlama kanalıdır. Bir saldırgan e-posta kutunuza erişim sağladığında, bu hesaba bağlı diğer tüm platformlardaki şifrelerinizi kolayca sıfırlayabilir.

Bu riskleri en aza indirmek için:

1. E-posta hesabınızın giriş güvenliğini donanım anahtarı (FIDO2) gibi güçlü iki faktörlü kimlik doğrulamalarla (2FA) koruyun.
2. Hesap kurtarma seçeneklerinde yedek e-posta adresi yerine yerel olarak saklanan çevrimdışı kurtarma kodlarını tercih edin.
3. E-posta adresinizi tüm üyeliklerinizde tek bir ortak anahtar gibi kullanmaktan kaçının.

### Üçüncü Taraf İstemcilerin Saldırı Yüzeyi {#client-di-terze-parti-e-superficie-dattacco}

Harici e-posta istemcileri kullanmak esneklik sunsa da sisteme yeni bir yazılım bağımlılığı ekler. E-posta istemcileri karmaşık HTML ve JavaScript kodlarını işleyebildiği için web tarayıcılarına benzer bir saldırı yüzeyi oluştururlar. Güvenliği artırmak için istemci ayarlarından HTML yerine düz metin (plain text) görünümünü seçmeniz ve uzak görsellerin otomatik yüklenmesini kapatmanız önerilir.

## E-posta Güvenliğinin Geleceği

E-posta mimarisini daha güvenli hale getirmek için geliştirilen yeni standartlar:

* **Kuantum Sonrası Kriptografi:** Gelecekteki kuantum bilgisayarların şifre çözme kapasitesine karşı PGP ve S/MIME standartlarının güncellenmesi.
* **DKIM2:** İmzalanmış e-postaların kopyalanarak farklı alan adları üzerinden spam amacıyla yeniden gönderilmesini (replay attack) önlemek için her sunucunun kendi imzasını eklemesini zorunlu kılan yeni sürüm.
* **MTA-STS Yaygınlaşması:** Sunucular arası şifresiz e-posta trafiğinin tamamen devre dışı bırakılması.
* **Passkey Kullanımı:** Parolasız kimlik doğrulama standartlarının yaygınlaşmasıyla, şifre sıfırlama işlemlerinde e-posta adreslerine olan ihtiyacın azalması.
* **Protokol Seviyesinde E2EE:** Farklı e-posta sağlayıcıları arasında da varsayılan olarak uçtan uca şifreli veri iletimi sağlayacak SMTP geliştirmeleri.

## Sonuç ve Öneriler

E-posta altyapısı eski standartlar üzerine kurulu olsa da doğru yapılandırmalarla güvenli hale getirilebilir. Alabileceğiniz temel önlemler:

1. Alan adınızın SPF, DKIM ve DMARC kayıtlarının doğru ve sıkı politikalarla yapılandırıldığından emin olun.
2. E-posta hesaplarınızda donanım anahtarı tabanlı 2FA kullanın.
3. İstemcinizde uzak görsellerin otomatik indirilmesini engelleyin.
4. Önemli hesap kurtarma işlemlerinde e-posta yerine çevrimdışı yedek kodları tercih edin.
5. Kritik yazışmalar için uçtan uca şifreli e-posta servislerini (örneğin Proton Mail) kullanın.

Bu doğrultuda bilinçli adımlar atarak dijital güvenliğinizi önemli ölçüde artırabilirsiniz. 🐢

---

## İlgili Rehberler

- **[Tehdit Modeli Nasıl Oluşturulur](/tr/threat-model)** - Güvenlik risklerini analiz etme ve koruma stratejisi belirleme.
- **[WireGuard ile Self-Hosted VPN](/tr/vpn)** - Kendi sunucunuzda reklam engelleme özellikli güvenli VPN kurun.
- **[GrapheneOS Hakkında Nihai Rehber](/tr/graphene)** - Güvenlik ve gizlilik odaklı mobil işletim sistemi.

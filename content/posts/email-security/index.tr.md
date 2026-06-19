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
  - question: "E-posta güvenli mi?"
    answer: "Varsayılan olarak değil. E-posta, hiçbir şifreleme içermeyen bir protokol olarak doğdu. Bugün STARTTLS, SMTPS ve PGP gibi korumalar mevcut, ancak e-postaların büyük çoğunluğu hâlâ uçtan uca şifreleme olmadan yol alıyor. Yalnızca Proton Mail gibi sağlayıcılar kendi kullanıcıları arasında E2EE sunuyor."
  - question: "SPF, DKIM ve DMARC nedir?"
    answer: "Bunlar üç e-posta kimlik doğrulama protokolüdür. SPF, gönderen sunucunun yetkili olup olmadığını doğrular, DKIM e-postaları dijital olarak imzalayarak değiştirilip değiştirilmediğini tespit eder, DMARC ise bu kontroller başarısız olduğunda ne yapılacağını belirler (reddetme, spam'e gönderme veya görmezden gelme)."
  - question: "STARTTLS ile SMTPS arasındaki fark nedir?"
    answer: "STARTTLS, şifrelemeyi bağlantı düz metin olarak başladıktan sonra müzakere eder ve bu da onu downgrade saldırılarına karşı zayıf kılar. SMTPS ise HTTPS gibi doğrudan şifreli bir bağlantıyla başlar ve bu zayıflığı ortadan kaldırır."
  - question: "PGP, e-posta için hâlâ işe yarar mı?"
    answer: "PGP uçtan uca şifreleme sunar, ancak ciddi sorunları vardır: karmaşık anahtar yönetimi, forward secrecy'nin olmaması ve şifrelenmemiş meta veriler. Çoğu kullanıcı için, Proton Mail gibi yerleşik E2EE'ye sahip bir sağlayıcı daha pratik ve daha güvenlidir."
  - question: "E-postamı bugün nasıl koruyabilirim?"
    answer: "Donanım anahtarıyla 2FA'yı etkinleştirin, e-posta istemcinizde HTML ve uzak görselleri devre dışı bırakın, hesap kurtarma yöntemi olarak e-postayı çevrimdışı kodlarla değiştirin ve Proton Mail gibi uçtan uca şifrelemeye sahip bir sağlayıcı kullanmayı düşünün."
  - question: "E-posta neden çevrimiçi güvenliğin zayıf noktası?"
    answer: "E-posta, hemen hemen her hesap için varsayılan şifre sıfırlama ve 2FA kurtarma yöntemidir. Bir saldırgan gelen kutunuza erişirse, bağlı tüm hizmetlerin şifrelerini sıfırlayabilir."
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
> - E-posta şifrelemesi nasıl işler ve STARTTLS neden yeterli değildir
> - SPF, DKIM ve DMARC nedir ve sahtecilikten nasıl korurlar
> - E-posta, tüm hesaplarınızın güvenliğinde neden zayıf nokta
> - Gelecekte bizi ne bekliyor: uçtan uca şifreleme, DKIM2 ve düz metin e-postalara elveda

## Özet

E-posta varsayılan olarak güvenli değildir: meta verileri kötü korur, genellikle yalnızca hop-by-hop şifreleme kullanır ve hâlâ hemen hemen her hesabın parola kurtarma noktasıdır. Riski azaltmak için donanım tabanlı 2FA, güvenilir bir sağlayıcı, devre dışı bırakılmış uzak görseller, ayrı hesap kurtarma ve SPF, DKIM ve DMARC ile alan adı kimlik doğrulaması gerekir.

E-posta, dijital hayatınızın görünmez omurgasıdır. Oluşturduğunuz her hesap, sıfırladığınız her parola, her önemli iletişim... neredeyse her zaman e-postadan geçer. Ama gerçekte ne kadar güvenli olduğunu hiç düşündünüz mü?

Cevap, ne yazık ki: düşündüğünüzden daha az. E-posta, siber güvenliğin tam olarak öncelik olmadığı 1980'lerde doğmuş bir protokoldür. O zamandan beri katman katman koruma eklendi, ancak sonuç karmaşık, parçalı ve genellikle yanlış yapılandırılmış bir sistem oldu.

Bu rehberde, şifrelemeden kimlik doğrulamaya kadar e-posta güvenliğinin güncel durumunu birlikte inceleyecek ve geleceğin bize ne sunduğuna bir göz atacağız. Gözlerinizi açık tutun, çünkü epey sürpriz var.

## E-posta Şifrelemesi {#crittografia-delle-email}

Temellerden başlayalım: e-postalarınız aktarım sırasında ve depolanırken nasıl korunuyor? Durumun... karmaşık olduğunu söyleyelim.

### STARTTLS: çıkarılabilen kilit

STARTTLS, e-postaları aktarım sırasında şifrelemek için en yaygın kullanılan mekanizmadır. Fikir basit: e-posta istemcisi, mesajı göndermeden önce sunucuyla bir TLS (şifreli) bağlantı müzakere eder.

Sorun ne mi? Müzakere aşaması **düz metin olarak** gerçekleşir. Bu, ağ üzerinde konumlanmış bir saldırganın trafikten STARTTLS komutunu tamamen çıkarabileceği ve bağlantıyı şifrelenmemiş halde tutmaya zorlayabileceği anlamına gelir. Buna *downgrade saldırısı* denir ve istemciniz bunu hiç fark etmeyebilir.

Şöyle düşünün: zırhlı bir kapıya vurmak gibi, ama siz içeri girmeden önce biri kapıyı söküp sizi korumasız bir açıklıkla karşı karşıya bırakabiliyor.

Ayrıca, STARTTLS doğru çalıştığında bile şifreleme yalnızca *hop-by-hop*'tur: mesaj her ara sunucuda şifresi çözülür ve yeniden şifrelenir. Bu uçtan uca şifreleme değildir — zincirdeki her sunucu içeriği okuyabilir.



### SMTPS: geliştirilmiş versiyon

SMTPS (Implicit TLS), downgrade sorununu çözer. Bağlantı kurulduktan sonra şifrelemeyi müzakere etmek yerine, web siteleri için HTTPS'nin yaptığı gibi doğrudan şifreli bir bağlantıyla başlar.

SMTPS için standart port **465**'tir, **587** ise STARTTLS için kalır. Teoride bu net bir iyileştirmedir; pratikte ise yıllar süren port karmaşası (25, 465, 587, 2525) sağlayıcılar arasında ciddi bir standardizasyon karmaşası yaratmıştır.

### POP3S ve IMAPS

Posta sunuculardan *indirmek* için kullanılan protokoller de şifrelemeyi destekler:

- **POP3S**, **995** portunda TLS kullanır
- **IMAPS**, **993** portunda TLS kullanır

Bunlar, e-postaların sunucudan alınmasının şifreli bir kanal üzerinden gerçekleşmesini garanti eder. İyi, ama içeriğin kendisinin şifrelenmesi sorununu çözmezler.

### OpenPGP: güçlü ama pratik değil

Pretty Good Privacy (PGP), e-posta şifrelemesinin büyükbabasıdır. 1991'de Phil Zimmermann tarafından oluşturulmuş, daha sonra OpenPGP olarak standartlaştırılmıştır.

Kavram sağlamdır: açık ve gizli anahtarlarla asimetrik şifreleme. Gönderen, alıcının açık anahtarıyla şifreler, alıcı da kendi gizli anahtarıyla şifreyi çözer. Hiçbir aracı mesajı okuyamaz.

**Sorun ne mi?** Anahtar yönetimi bir kabustur. Şunları yapmanız gerekir:
- Bir anahtar çifti oluşturmak
- Açık anahtarınızı dağıtmak
- Başkalarının anahtarlarını doğrulamak (ünlü *key signing party*'ler)
- Gizli anahtarınızı son derece dikkatli bir şekilde korumak



Gizli anahtarınız ele geçirilirse, **geçmişteki tüm mesajlar** okunabilir hale gelir. Bunun nedeni, OpenPGP'nin *forward secrecy*'yi desteklememesidir; bu özellik bence 2026'da olması gereken asgari standart olmalıdır.

Başka bir kritik nokta: OpenPGP **meta verileri şifrelemez**. Gönderen, alıcı, tarih, konu... hepsi düz metin olarak kalır. Bir gözlemci içeriği okuyamaz, ama kimin kiminle, ne zaman ve hangi konuda konuştuğunu tam olarak bilir.

### S/MIME: kullanıcı deneyimi daha iyi, cüzdan için daha kötü

S/MIME, e-postaları şifrelemek ve doğrulamak için X.509 dijital sertifikalarını (web'de kullanılanların aynısı) kullanır. Sertifika yönetimi sertifika yetkilileri (CA'lar) aracılığıyla kısmen otomatikleştirildiği için PGP'den daha kullanıcı dostudur.

Madalyonun diğer yüzü? Sertifikalar para tutar, süresi dolar ve yenilenmeleri gerekir. PGP gibi, S/MIME de forward secrecy'yi desteklemez. Pratikte, BT departmanının her şeyi merkezi olarak yönettiği kurumsal ortamlarda neredeyse münhasıran kullanılır.

### Web Key Directory

WKD, PGP anahtarlarının dağıtımı sorununa zarif bir çözümdür. Güvenilirliği şüpheli açık anahtar sunucularında anahtar aramak yerine, e-posta istemciniz alıcının açık anahtarını almak için doğrudan onun alan adını sorgular.

Kriptografik anahtarlar için otomatik bir telefon rehberi gibidir. Basit, merkeziyetsiz ve işe yarıyor. Ne yazık ki benimsenmesi hâlâ sınırlı.

## E-posta Kimlik Doğrulama {#autenticazione-delle-email}

Şifreleme *içeriği* korurken, kimlik doğrulama *kimliği* korur. `banka@ornek.com` adresinden gelen bir e-postanın gerçekten bankanızdan geldiğini ve bir dolandırıcıdan değil olduğunu nasıl bilebilirsiniz?

### SPF: davetli listesi

SPF (Sender Policy Framework), bir partideki davetli listesi gibi çalışır. Bir alan adının sahibi, o alan adı için e-posta göndermeye yetkili tüm sunucuları listeleyen bir DNS kaydı yayınlar.

Alıcının sunucusu bir e-posta aldığında şunu kontrol eder: "Bu sunucu yetkili listede mi?" Değilse, e-posta şüphelidir.

**SPF'nin sınırlamaları:**
- Kendi başına hiçbir kimlik doğrulama mekanizması olmayan DNS'e dayanır
- Tek tek kullanıcıyı değil, yalnızca sunucuyu doğrular
- İsteğe bağlı uygulama modları vardır: bir alan adı `-all` (listede olmayan her şeyi reddet), `~all` (uyarıyla birlikte yine de kabul et) veya hatta `+all` (her şeyi kabul et) şeklinde yapılandırılabilir. Güvenlik tamamen yapılandırmaya bağlıdır

### DKIM: dijital imza

DKIM (DomainKeys Identified Mail), e-postalara kriptografik bir imza ekler. Sağlayıcı bir anahtar çifti oluşturur, açık anahtarı DNS'de yayınlar ve giden her e-postayı gizli anahtarla imzalar.

Alıcı sunucu imzayı doğrular: mesaj aktarım sırasında değiştirildiyse, imza artık eşleşmez. Bu, kurcalamayı tespit etmek için etkili bir sistemdir.

**Ancak dikkat:** anahtarlar sizde değil, e-posta sağlayıcınızda. Sağlayıcınız teorik olarak bir mesajı imzalamadan önce değiştirebilir. Ayrıca, DKIM hiçbir şeyi şifrelemez, yalnızca alan adının bütünlüğünü ve özgünlüğünü doğrular.

### DMARC: fedai

DMARC (Domain-based Message Authentication, Reporting and Conformance), SPF ve DKIM'i bir araya getiren parçadır. Alıcı sunuculara şunu söyler: "Bir e-posta SPF ve DKIM kontrollerini geçemezse, yapılması gereken şu."

Olası politikalar şunlardır:
- **none**: hiçbir şey yapma (yalnızca izleme)
- **quarantine**: spam'e gönder
- **reject**: tamamen reddet

İyi yapılandırılmış bir DMARC kaydı şuna benzer:

```
v=DMARC1; p=reject; adkim=s; aspf=s;
```

Burada `p=reject` doğrulanmamış e-postaların reddedilmesini söyler, `adkim=s` / `aspf=s` ise sıkı (*strict*) hizalama uygular.



### DNSSEC: DNS'in kendisini doğrulamak

SPF, DKIM ve DMARC'ın tamamı DNS'e dayanır. Ancak DNS, 1980'lerde hiçbir güvenlik önlemi olmadan oluşturulmuştur. DNS yanıtlarını manipüle etmeyi başaran bir saldırgan (cache poisoning), bu kontrollerin tamamını atlayabilir.

Carnegie Mellon'un 2014 tarihli bir araştırması, görünüşte Gmail, Yahoo! ve Outlook.com'dan gelen e-postaların kötü amaçlı sunucular üzerinden ele geçirilebileceğini göstermiştir. Pek de güven verici değil.

DNSSEC, DNS yanıtlarını dijital olarak imzalayarak ve IANA tarafından yönetilen kök bölgeye (root zone) kadar uzanan bir güven zinciri oluşturarak bu sorunu çözer. Her DNS yanıtının özgün olduğunu onaylayan bir noter gibidir.

### DANE ve MTA-STS: şifrelemeyi zorunlu kılmak

Bu iki protokol aynı sorunla ilgilenir — e-posta sunucuları arasında TLS kullanımını zorunlu kılmak — ama farklı yaklaşımlarla:

- **DANE**, DNSSEC'e dayanır ve TLS sertifikalarını DNS adlarına bağlamak için TLSA kayıtlarını kullanarak geleneksel CA'ları atlar
- **MTA-STS**, web siteleri için HSTS'in nasıl çalıştığına benzer şekilde HTTPS'i ve mevcut web PKI'sini kullanır. Uygulanması daha kolaydır ama CA'lara ek bir bağımlılık getirir

İkisi de mevcut duruma kıyasla önemli bir ileri adımdır.

## Zayıf Nokta Olarak E-posta {#lemail-come-punto-debole}

Bence diğer hepsinden daha fazla ilgi gerektiren nokta budur.

E-posta, pratik olarak her çevrimiçi hesap için varsayılan kurtarma yöntemi haline geldi. Parolanızı mı unuttunuz? E-posta. İki faktörlü doğrulama mı? E-posta. Cihaz değişikliği mi? E-posta.

Bu, **tüm hesaplarınızın güvenliğinin e-postanızın güvenliğine bağlı olduğu** anlamına gelir. Birisi gelen kutunuza erişirse, kalenin anahtarlarına sahip olur.

Bu, SMS tabanlı 2FA'nın zayıflığına benzer bir durumdur; farkı, e-postanın tipik olarak uçtan uca şifrelemeye sahip olmaması nedeniyle daha da az güvenli olmasıdır.

**Bugün yapabilecekleriniz:**
1. E-posta hesabının kendisinde iki faktörlü kimlik doğrulamayı etkinleştirin (mümkünse SMS değil, donanım anahtarıyla)
2. Mümkün olduğunda, e-postayı kurtarma yöntemi olarak çevrimdışı saklanan **kurtarma kodlarıyla** değiştirin
3. E-postayı ne içinse onun için kullanın: mesajlaşma ve iletişim, evrensel bir anahtarlık değil

### Üçüncü Taraf İstemciler ve Saldırı Yüzeyi {#client-di-terze-parti-e-superficie-dattacco}

Üçüncü taraf bir e-posta istemcisi (Thunderbird, Apple Mail, vb.) kullanmak esneklik sağlar, ama güven zincirine bir halka daha ekler. Her ek istemci, güvenlik açıkları için potansiyel bir giriş noktasıdır.

E-posta istemcilerinin sürpriz derecede büyük bir saldırı yüzeyi vardır: çoğu JavaScript ve karmaşık HTML'i destekler, bu da onları neredeyse web tarayıcısı haline getirir, ama aynı düzeyde sıkılaştırma ve denetime sahip olmadan. Herkes size her an bir e-posta gönderebileceğinden, istemci potansiyel olarak kötü amaçlı içeriklere karşı sürekli kendini savunmak zorundadır.

Mümkün olduğunda uzak görsellerin yüklenmesini ve HTML/JavaScript çalıştırılmasını devre dışı bırakmanızı şiddetle öneririm. Pratik değil, ama daha güvenli.

## E-posta Güvenliğinin Geleceği

Şimdiye kadar tablo pek de pembe değildi. Ama ufukta, durumu önemli ölçüde değiştirebilecek umut verici gelişmeler var.

### OpenPGP'deki iyileştirmeler

IETF çalışma grubu önemli güncellemeler üzerinde çalışıyor:
- **Kuantum sonrası kriptografi**: gelecekteki kuantum bilgisayarlara karşı koruma
- **Forward secrecy**: nihayet! Bir anahtar ele geçirilirse, geçmiş mesajlar korunmaya devam eder
- **Key Transparency**: WhatsApp'ın uyguladığına benzer şekilde, anahtarlar için herkese açık, doğrulanabilir ve kurcalamaya karşı dayanıklı kayıtlar. Bu, anahtar doğrulamasını otomatik ve şeffaf hale getirebilir
- **QR kod ile doğrulama**: modern mesajlaşma uygulamalarındaki gibi, kişilerin kimliğini yüz yüze doğrulamak için

### S/MIME'deki iyileştirmeler

LAMPS çalışma grubu, geleneksel ve kuantum sonrası kriptografiyi birleştiren "çift imza" şemalarıyla kuantum sonrası kriptografiye odaklanıyor. Tedbirli bir yaklaşım: iki sistemden biri kırılırsa, diğeri yine de koruma sağlar.

### DKIM2: toplu spam'e son

DKIM'in mevcut sürümünün ciddi bir sorunu var: bir saldırgan, meşru bir şekilde imzalanmış bir e-postayı alıp farklı alan adlarından binlerce kez yeniden gönderebilir ve bu da orijinal alan adının itibarını mahveder.

DKIM2, **her hop'un mesajı imzalamasını** zorunlu kılarak bu sorunu çözer ve böylece kötüye kullanımın zincirdeki tam noktaya atfedilmesini sağlar. Ayrıca, kafa karıştırıcı seçenekleri ortadan kaldırarak ve en iyi uygulamalarla uyumlu, tutarlı bir imzalanacak başlık kümesi belirleyerek standardı basitleştirir.

### DMARCbis: daha fazla titizlik, daha az açık kapı

DMARC'ın yeni evrimi, mevcut standardın tarihsel belirsizliklerinden bazılarını azaltarak politika yönetimini daha açık ve daha titiz hale getirmeyi amaçlıyor. Ele alınan konular arasında var olmayan alt alan adlarının daha iyi yönetilmesi ve kontrolleri atlamak için kullanılan bazı teknikleri sınırlamak amacıyla daha açık test mekanizmaları bulunuyor.

### Düz metin e-postalara elveda

Her seviyede mevcut olan aktarım şifreleme protokolleriyle, sağlayıcıların **şifrelenmemiş e-posta desteğini tamamen ortadan kaldırması** için çalışması esastır. Aktarım şifrelemesi, bir seçenek olmaktan çıkıp asgari gereklilik haline gelmelidir.

### Passkey'ler ve Kimlik Doğrulamanın Geleceği {#passkey-e-il-futuro-dellautenticazione}

Passkey'lerin benimsenmesi, hesap kurtarma için e-postaya olan bağımlılığı sonunda kırabilir. Artık bir parolaya ihtiyacınız yoksa, onu sıfırlamak için bir e-postaya da ihtiyacınız yoktur.

Bu, e-postayı uygunsuz "ana anahtar" rolünden kurtarır ve onu doğal işlevine geri döndürür: iletişim kurmak. Passkey'leri destekleyen birçok hizmet hâlâ bir e-posta talep ediyor, ama gidilen yön doğru.

### SMTP'de yerleşik uçtan uca şifreleme

Bu, nihai hedeftir. Bugün, Proton Mail gibi sağlayıcılar Proton kullanıcıları arasındaki e-postaları otomatik olarak uçtan uca şifreliyor. Ama bu, yalnızca kendi sınırları içinde işleyen tescilli bir çözüm.

E2EE'yi doğrudan SMTP protokolüne entegre etmek, **herhangi bir** sağlayıcı arasındaki **herhangi bir** e-postanın varsayılan olarak uçtan uca şifrelenebileceği anlamına gelir. Bu yönde zaten RFC önerileri mevcut. Kolay olmayacak, ama hak ettiğimiz gelecek bu.

## Sonuç

E-posta güvenliği; protokollerden, kısaltmalardan ve ödünlerden oluşan bir labirenttir. Ama iyi haber şu ki durum iyileşiyor. DKIM2, DMARCbis, kuantum sonrası kriptografi ve SMTP'de yerleşik E2EE, hepsi bilim kurgu değil, somut gelişmeler.

**Bugün, hemen yapabilecekleriniz:**
1. E-posta sağlayıcınızın SPF, DKIM ve DMARC'ı sıkı politikalarla desteklediğini doğrulayın
2. E-posta hesabınızda donanım anahtarıyla 2FA'yı etkinleştirin
3. E-posta istemcinizde HTML ve uzak görselleri devre dışı bırakın
4. Mümkün olduğunda e-postayı kurtarma yöntemi olarak çevrimdışı kodlarla değiştirin
5. Hassas iletişimler için Proton Mail gibi yerleşik E2EE'ye sahip sağlayıcıları değerlendirin

Buraya kadar geldiyseniz, tebrikler: artık e-posta güvenliği konusunda dışarıdaki çoğu insandan daha fazla şey biliyorsunuz. Helal olsun, siz gerçek zırhlı kaplumbağalarsınız! 🐢

Okuduğunuz için çok teşekkürler! Bu rehber size yardımcı olduysa, ihtiyacı olabilecek kişilerle paylaşın.

---

## İlgili Rehberler

- **[Tehdit Modeli Nasıl Oluşturulur](/tr/threat-model)** - Çevrimiçi gizliliğinizi gerçekten korumanın ilk adımı
- **[Wireguard ile Kendi Barındırdığınız VPN](/tr/vpn)** - Yerleşik reklam engelleme özelliğiyle kendi kişisel VPN'inizi kurun
- **[GrapheneOS Üzerine Nihai Rehber](/tr/graphene)** - Dünyanın en güvenli mobil işletim sistemi

---
title: "Tehdit Modeli: Tehditlerinizi Nasıl Tanımlarsınız"
description: "Gizliliğinizi ve dijital güvenliğinizi korumak için etkili bir tehdit modeli oluşturmayı öğrenin. Yeni başlayanların yaptığı yaygın hataları önleyin."
summary: "Gizliliğinizi ve dijital güvenliğinizi korumak için etkili bir tehdit modeli oluşturmayı öğrenin. Yeni başlayanların yaptığı yaygın hataları önleyin."
keywords: ["tehdit modeli", "gizlilik", "güvenlik", "veri koruma", "threat modeling"]
author: "b4lol"
date: 2026-02-24
lastmod: 2026-05-05
url: /tr/threat-model
series: ["Dijital Gizlilik", "Güvenlik"]
topics: ["privacy-security"]
faq:
  - question: "Tehdit modeli nedir ve neden önemlidir?"
    answer: "Bir tehdit modeli, gerçek zayıf noktalarınızı belirlemenizi ve doğru karşı tedbirleri seçmenizi sağlayan bir süreçtir. Bu olmadan, yanlış risklere karşı kendinizi korumak için zaman ve para harcama riskiyle karşı karşıya kalırsınız."
  - question: "Gizlilik tehditlerinin temel kategorileri nelerdir?"
    answer: "Dört temel kategori şunlardır: kullanıcılarını gözetleyen servis sağlayıcılar, siteler arası takip yoluyla yapılan toplu gözetim, kötü amaçlı uygulama geliştiricileri ve cihazlarınıza erişmeye çalışan saldırganlar."
  - question: "Uçtan uca şifreleme mesajlarımı tamamen korur mu?"
    answer: "Uçtan uca şifreleme mesajlarınızın içeriğini korur, ancak kiminle, ne sıklıkla ve ne zaman konuştuğunuz gibi metadata'ları korumaz. Ayrıca sunucu taraflı saldırılara karşı daha zayıf olan web istemcileri yerine yerel uygulamaları kullanmak daha iyidir."
  - question: "Çevrimiçi takipten kendimi nasıl koruyabilirim?"
    answer: "Çevrimiçi kimliklerinizi ayırın, kalabalığa karışın ve paylaştığınız bilgileri sınırlayın. IP adresinizi gizlemek için VPN veya Tor, dosyalarınızı bulutta şifrelemek için Cryptomator ve ödemeler için ön ödemeli kartlar gibi araçlar kullanın."
  - question: "Açık kaynaklı yazılım otomatik olarak daha güvenli ve daha gizli midir?"
    answer: "Hayır. Açık kaynak kod, güvenlik açıkları içerebilir veya kötü niyetli katkıda bulunanlar tarafından tehlikeye atılabilir. Ayrıca, masaüstü Linux'un macOS'a kıyasla durumunda olduğu gibi, kapalı kaynak yazılımlara göre daha düşük güvenlik özelliklerine sahip olabilir."
  - question: "Neden sadece büyük teknoloji şirketlerini tehdit olarak görmemeliyim?"
    answer: "Tehdidi 'büyük teknoloji şirketleri' olarak tanımlamak, güveninizi sadece aynı derecede sorunlu olabilecek daha küçük şirketlere kaydırmaktan ibarettir. Doğru yaklaşım, şifreleme gibi teknik çözümler benimseyerek kendinizi servis sağlayıcıların bütününden korumaktır."
  - question: "Dijital güvenlikte bölmeleme (compartmentalization) ne anlama gelir?"
    answer: "Bölmeleme, bir ihlal durumunda zararı sınırlamak için dijital etkinliklerinizi birbirinden ayırmak anlamına gelir. Bunu farklı görevler için farklı bilgisayarlar, sanal makineler veya Qubes OS ya da GrapheneOS gibi güçlü sandboxing'e sahip işletim sistemleri kullanarak başarabilirsiniz."
howto:
  name: "Kişisel bir tehdit modeli nasıl oluşturulur"
  description: "Gizlilik ve dijital güvenlik için varlıkları, tehditleri, saldırganları, yetenekleri ve gerçekçi karşı tedbirleri belirleme prosedürü."
  totalTime: "PT45M"
  supply:
    - "Hesapların, cihazların ve önemli verilerin listesi"
    - "Kağıt veya dijital belge"
  tool:
    - "Şifre yöneticisi"
    - "Güvenlik kontrol listesi"
  steps:
    - name: "Neyi koruyacağınızı tanımlayın"
      text: "Korumanız gereken verileri, cihazları, hesapları, kimlikleri ve iletişimleri listeleyin."
      url: "/tr/threat-model#definizione-di-una-minaccia"
    - name: "Sağlayıcıları ve takibi belirleyin"
      text: "Hangi servislerin veri toplayabileceğini ve hangi etkinliklerin farklı kimlikleri birbirine bağladığını değerlendirin."
      url: "/tr/threat-model#privacy-dai-fornitori-di-servizi"
    - name: "Kamuya açık bilgileri azaltın"
      text: "Kamuya açık bilgileri sınırlayın, kimlikleri ayırın ve hesaplar arasındaki bağlantıları azaltın."
      url: "/tr/threat-model#limitare-le-informazioni-pubbliche"
    - name: "Kötü amaçlı yazılımlara ve saldırılara karşı korunun"
      text: "Kötü amaçlı yazılım, oltalama, cihaz hırsızlığı ve ele geçirilmeye karşı orantılı karşı tedbirler seçin."
      url: "/tr/threat-model#protezione-da-malware-e-hacker"
    - name: "Kötü uygulamalardan kaçının"
      text: "Rastgele araç satın almayın: her tedbir gerçek bir tehdidi azaltmalıdır."
      url: "/tr/threat-model#cattive-pratiche"
---

> **Özet** - Bu rehberde öğrenecekleriniz:
> - Bir tehdidi doğru şe## Özet

Tehdit modeli; neyi, kimden korumak istediğinizi, saldırganların hangi yeteneklere sahip olduğunu ve bu tehditlere karşı hangi gerçekçi önlemleri alacağınızı belirlediğiniz bir süreçtir. Doğru bir tehdit modeli olmadan, işe yaramaz araçlar satın alma, asıl riskleri göz ardı etme veya güvenliği gerçekten artırmadan dijital yaşamınızı gereksiz yere zorlaştırma riskiyle karşı karşıya kalırsınız.

Kime karşı korunduğunuzu bilmeden bir VPN kurmak veya Signal kullanmaya başlamak tek başına yeterli değildir. Birçok yeni başlayan kullanıcı, kendi tehdit modelini belirlemeden gizlilik araçlarına zaman ve bütçe harcamakta, sonuçta da yanlış risklere karşı önlem almaktadır. Tehdit modeli oluşturmak, dijital gizlilik yolculuğunun en temel ilk adımıdır; gerçek zayıf noktalarınızı fark etmenizi ve en doğru karşı tedbirleri seçmenizi sağlar.

Bir bireyin gizliliğini ve güvenliğini korumak için atması gereken ilk adım, kendi **Tehdit Modelini** oluşturmaktır.

## Bir Tehdidin Tanımı {#definizione-di-una-minaccia}

Tehdit modeli oluşturmak için öncelikle bir tehdidin ne olduğunu tanımlamamız gerekir. Gizlilik dünyasına yeni adım atanların yaptığı en yaygın hata, doğrudan "büyük teknoloji şirketlerini" birincil tehdit olarak görmektir. Oysa bu yaklaşım yapısal bir mantık hatası barındırır:

> **"Büyük teknoloji şirketlerine" güvenmiyoruz diye güvenimizi "küçük teknoloji şirketlerine" mi kaydıracağız? Peki ya bu "küçük teknoloji şirketleri" de kötü niyetli çıkarsa veya gelecekte devasa boyutlara ulaşırsa ne olacak?**

Burada tehdidi tanımlamanın doğru yolu, "büyük teknoloji şirketleri" gibi özel marka isimleri yerine genel olarak **"servis sağlayıcıları"**dır.

Genel olarak, bir bireyin kendisini korumak isteyebileceği dört temel tehdit kategorisi mevcuttur:

1. **Kullanıcı verilerini izleyen/gözetleyen servis sağlayıcıları**
2. **Siteler ve servisler arası takip ile veri paylaşımı (toplu gözetim)**
3. **Kullanıcıları kötü amaçlı yazılımlar aracılığıyla izleyen uygulama geliştiricileri**
4. **Cihazlara veya hesaplara yetkisiz erişim sağlamaya çalışan saldırganlar**

Bilinçli bir kullanıcı, tehdit modeline bu tehditlerin birkaçını dahil eder ve kendi önceliklerine göre bazılarına daha fazla ağırlık verir.

Örneğin, bir yazılım geliştiricisi öncelikle kaynak kodlarının, imzalama anahtarlarının ve API sırlarının çalınmasından endişe duyabilir; bunun yanı sıra internette gezinirken gizlilik de talep edecektir. Sıradan bir kullanıcı ise öncelikle toplu gözetim ve servis sağlayıcıların veri toplaması konusunda kaygılanabilir, fakat aynı zamanda cihaz güvenliğini de üst seviyede tutmak isteyecektir.

Muhbirler (whistleblowers) veya yüksek riskli profiller için tehdit modeli çok daha katıdır. Bu kişilerin yalnızca verilerini korumaları ve siber saldırılardan kaçınmaları yetmez, aynı zamanda internet üzerindeki tüm kimliklerini gizli tutmaları, yani tam bir **anonimlik** sağlamaları gerekir.

## Servis Sağlayıcılardan Gizlilik {#privacy-dai-fornitori-di-servizi}

Çoğu durumda; özel mesajlarımız, e-postalarımız ve sosyal etkileşimlerimiz bir servis sağlayıcının sunucularında barındırılır. Buradaki temel risk, servis sağlayıcının (veya sunucuyu ele geçiren bir saldırganın) bilginiz dışında bu verilere kolayca erişebilmesidir. Bu durum SMS, Telegram, Discord gibi pek çok yaygın platform için geçerlidir.

**Uçtan uca şifreleme (E2EE)** kullanarak, iletişimlerinizi sunucuya gönderilmeden önce kendi cihazınızda şifreleyebilir ve bu riski en aza indirebilirsiniz. Servis sağlayıcı özel anahtarlarınıza erişemediği sürece mesajlarınızın gizliliği korunur.

Pratikte, farklı uçtan uca şifreleme uygulamalarının güvenlik seviyeleri değişiklik gösterir. **Signal** gibi yerel çalışan uygulamalar, tüm cihazlarda aynı kod tabanını kullanır. Eğer servis sağlayıcı anahtarlarınızı çalmak amacıyla uygulamaya bir arka kapı (backdoor) eklemeye çalışırsa, bu durum tersine mühendislik çalışmalarıyla tespit edilebilir.

Buna karşın, **Proton Mail** web arayüzü veya **Bitwarden** web kasası gibi tarayıcı tabanlı uçtan uca şifreleme çözümleri, kriptografik işlemleri yönetmek için sunucudan gelen dinamik JavaScript kodlarına güvenir. Kötü niyetli bir sunucu, hedef aldığı belirli bir kullanıcıya anahtarlarını sızdıracak şekilde modifiye edilmiş JavaScript kodları gönderebilir ve kullanıcının bunu fark etmesi son derece zordur.

**Bu nedenle, uçtan uca şifreli servisleri kullanırken, mümkün mertebe web istemcileri yerine yerel (masaüstü/mobil) uygulamaları tercih etmelisiniz.**

Uçtan uca şifreleme kullanılsa dahi, servis sağlayıcılar korunmayan **üst veriler (metadata)** aracılığıyla hakkınızda profil oluşturabilir. Mesajlarınızın içeriğini okuyamasalar da kiminle iletişim kurduğunuzu, mesajlaşma sıklığınızı ve aktif olduğunuz saatleri analiz edebilirler. Üst verilerin korunması teknik olarak zordur; bu konuda endişeleriniz varsa kullandığınız yazılımın teknik belgelerini inceleyerek metadata azaltma özellikleri sunup sunmadığını kontrol etmelisiniz.

## Siteler ve Servisler Arası Takipten Korunma {#protezione-dal-tracciamento-cross-siteservice}

İnternette gezinirken şu tanımlayıcılar aracılığıyla sürekli olarak takip edilirsiniz:

- **IP adresiniz**
- **Tarayıcı çerezleri**
- **Tarayıcı parmak iziniz (fingerprint)**
- **Web sitelerine gönderdiğiniz form verileri**
- **Kişisel ödeme yöntemleriniz**

Bu takibi zorlaştırmak için hedefleriniz şunlar olmalıdır:

- **Çevrimiçi kimliklerinizi birbirinden ayırmak (bölmeleme)**
- **İnternet trafiğinde genel kullanıcı kalabalığına karışmak**
- **Mümkün olduğunca kimliği belirleyici bilgi vermekten kaçınmak**

Gizlilik sözleşmelerinin (çoğu zaman ihlal edilen) vaatlerine güvenmek yerine, sağlayıcıların verilerinizi ilişkilendirip profil oluşturmasını zorlaştıracak teknik önlemler almalısınız. Bu önlemler şunları içerebilir:

- Bulut servislerine veri yüklemeden önce **Cryptomator gibi şifreleme araçları kullanmak**
- Gerçek kredi/banka kartı bilgilerinizi gizlemek için **tek kullanımlık sanal kartlar veya gizlilik odaklı kripto paralar kullanmak**
- IP adresinizi maskelemek için **güvenilir bir VPN veya Tor ağı kullanmak**

> **Bir gizlilik sözleşmesi, tüm teknik gizlilik önlemlerini tükettiğinizde ve servis sağlayıcınıza tamamen güvenmek zorunda kaldığınızda başvuracağınız son çare olmalıdır.**

Şirketlerin gerçek sahiplik yapılarını gizleyebileceğini veya doğrudan reklamcılık yapmasalar bile bilgilerinizi veri simsarlarıyla (data broker) paylaşabileceğini unutmayın. Bu nedenle, tehdit modelinizde yalnızca "reklam teknolojisi" sektörüne odaklanmak yetersizdir. Kendinizi tüm servis sağlayıcılardan koruyacak genel bir strateji benimsemeniz daha mantıklıdır; böylece kurumsal gözetim tehditlerini de en başından bertaraf etmiş olursunuz.

## Kamuya Açık Bilgileri Sınırlandırma {#limitare-le-informazioni-pubbliche}

Verilerinizin gizliliğini sağlamanın en kesin yolu, **onları paylaşmamaktır**. İnternet üzerinde açıkta bulunan kişisel bilgilerinizi temizletmek, dijital gizliliğinizi geri kazanmak için atabileceğiniz en önemli adımdır.

Bilgi paylaştığınız platformlarda, verilerinizin yayılmasını sınırlamak için hesaplarınızın gizlilik ayarlarını yapılandırmanız son derece önemlidir. Örneğin, kullandığınız servisler bir "gizli profil" seçeneği sunuyorsa, profilinizin arama motorları tarafından dizine eklenmesini önlemek ve üçüncü şahıslar tarafından görüntülenmesini engellemek için bu seçeneği etkinleştirin.

Verilerinizin bulunmaması gereken çeşitli platformlara geçmişte gerçek bilgilerinizi verdiyseniz, mevcut gerçek bilgilerinizi sahte olanlarla karıştırmak ve ayırt edilemez hale getirmek amacıyla yanlış bilgilendirme (obfuscation) yöntemlerine başvurabilirsiniz.

## Kötü Amaçlı Yazılım ve Saldırganlardan Korunma {#protezione-da-malware-e-hacker}

Güvenlik, gizliliği sağlamak için temeldir. Özel görünen araçları kullanmak, bunlar saldırganlar tarafından kolayca istismar edilebiliyorsa anlamsızdır.

Uygulama güvenliği söz konusu olduğunda, kullandığımız yazılımın gelecekte kötü niyetli hale gelip gelmeyeceğini kesin olarak bilmemiz mümkün değildir. En güvenilir geliştiricilerin yazılımları bile istismar edilebilecek kritik güvenlik açıkları barındırabilir.

Kötü amaçlı yazılımların yol açabileceği potansiyel zararları en aza indirmek için **bölmelere ayırma (compartmentalization) yöntemini** benimsemelisiniz. Bu yöntem şunları içerebilir:

- **Farklı işler için tamamen farklı fiziksel bilgisayarlar kullanmak**
- Uygulama gruplarını izole etmek için **sanal makineler (VM) kullanmak**
- Uygulama sandboxing'i (yalıtımı) ve erişim kontrolüne odaklanan **güvenli bir işletim sistemi benimsemek**

Mobil işletim sistemleri, uygulama sandboxing'i açısından masaüstü sistemlere göre genellikle çok daha avantajlıdır. Uygulamalar sisteme doğrudan erişemez ve yalnızca izin verdiğiniz kaynakları kullanabilir.

Masaüstü işletim sistemleri ise bu konuda biraz geriden gelmektedir. **ChromeOS**, Android benzeri başarılı bir sandboxing sunarken, **macOS** sistem izinleri üzerinde sıkı bir kontrol uygular; ancak her iki sistem de üreticilerine telemetri verileri göndermektedir. **Linux** ise sistem üreticisine veri göndermez fakat varsayılan kurulumlarda kötü amaçlı yazılımlara karşı yalıtım özellikleri zayıftır. Bu durum, **Qubes OS** gibi sanal makine tabanlı özel dağıtımlarla aşılabilir.

Web tarayıcıları, e-posta istemcileri ve ofis yazılımları internetten gelen güvenilmeyen kodları çalıştırır. Bir güvenlik açığının tüm sistemi ele geçirmesini önlemek için bu uygulamaları ana sistemden izole etmek gerekir. **Qubes OS** veya **GrapheneOS** gibi işletim sistemleri bu yalıtımı kullanıcıya hissettirmeden uygulayabilen en başarılı örneklerdir.

Fiziksel saldırılara karşı koruma sağlamak için cihazınızda güvenli bir **secure boot** (güvenli önyükleme) mekanizması bulunmalıdır. Diskinizin şifrelendiğinden ve şifre çözme anahtarlarınızın tahmin edilmesini (kaba kuvvet saldırılarını) engellemek için **TPM**, **Secure Enclave** veya **Secure Element** gibi donanımsal koruyucuların kullanıldığından emin olun.

## Yanlış Yaklaşımlar {#cattive-pratiche}

Yeni başlayanların tehdit modeli oluştururken düştüğü bazı hatalı yaklaşımlar şunlardır:

- **Tüm veri akışını engellemek yerine yalnızca bilinen reklam ağlarına odaklanmak**
- **Gizlilik politikası vaatlerine gereğinden fazla güvenmek**
- **Güveni bir servis sağlayıcıdan diğerine sorgulamadan aktarmak**
- **Sorunları yapısal olarak çözmek yerine yalnızca bilinen zararlıları engellemeye (Badness Enumeration) çalışmak**
- **Açık kaynaklı yazılımlara koşulsuz ve körü körüne güvenmek**

Belirttiğimiz gibi, yalnızca reklam ağlarını hedef almak veya gizlilik politikası vaatlerine güvenmek etkili bir koruma sağlamaz. Servis sağlayıcınızı değiştirmek istediğinizde, öncelikle çözmek istediğiniz temel sorunu tanımlayın ve yeni sağlayıcının bu soruna teknik bir çözüm sunup sunmadığını kontrol edin.

Örneğin, Google Drive'ı verilerinize tam erişim sahibi olduğu için kullanmak istemeyebilirsiniz. Buradaki asıl sorun, verilerin uçtan uca şifrelenmemiş olmasıdır. Bu problemi Cryptomator gibi bir şifreleme aracıyla veya Proton Drive gibi dahili uçtan uca şifreleme sunan bir servise geçerek çözebilirsiniz. Google Drive'dan yine şifreleme sunmayan başka bir bulut sağlayıcısına geçmek anlamlı bir kazanç sağlamayacaktır.

Sadece belirli aktörleri (Google, Amazon, Meta vb.) kara listeye alıp onların servislerini engellemeye çalışmanın (Badness Enumeration/Kötülük Sayımı) kalıcı bir çözüm olmadığını unutmayın. Tehditler sürekli evrilir ve belirli bir düşman listesine odaklanmak sizi yeni aktörlerden veya farklı saldırı tekniklerinden korumaz. Savunma stratejinizi bir düşman listesi üzerine değil, veri sızıntılarını genel olarak önleyen sistemler üzerine kurun (asıl çözüm yalnızca Google'a veri vermemek değil, verilerinizi üçüncü şahıslarla paylaşmamaktır).

Bir diğer önemli husus ise açık kaynaklı yazılımların kendiliğinden güvenli veya gizlilik dostu olmadığıdır. Kötü amaçlı kodlar; projenin geliştiricileri, katkı sağlayanlar veya tedarik zincirindeki kütüphaneler aracılığıyla sisteme sızabilir. Ayrıca açık kaynaklı bir yazılım, masaüstü Linux dağıtımları ile macOS kıyaslamasında olduğu gibi, kapalı kaynaklı alternatiflerine kıyasla bazı modern güvenlik özelliklerinden (secure boot, katı sandboxing vb.) yoksun olabilir. Bir tehdit modeli oluştururken, yazılımlara körü körüne güvenmek yerine kendi güvenlik ve gizlilik ihtiyaçlarınızı temel alan rasyonel kararlar almalısınız.

## Sonuç {#conclusioni}

Tehdit modeli oluşturmak, çevrimiçi gizliliğinizi ve dijital güvenliğinizi korumanın ilk ve en önemli adımıdır. Karşı karşıya olduğunuz riskleri doğru analiz ederek ve buna uygun orantılı karşı tedbirler alarak, dijital dünyada kendinizi çok daha güvenli bir konuma taşıyabilirsiniz.

Unutmayın; güvenlik bir ürün değil, dinamik bir süreçtir.

---

Bu rehberi okuduğunuz için teşekkürler! Faydalı bulduysanız, dijital gizliliğe önem veren arkadaşlarınızla paylaşabilirsiniz.

---

## İlgili Rehberler

- **[Android'i Google Servislerinden Arındırma: Eksiksiz Gizlilik Kılavuzu](/tr/android)** - Google'dan arındırılmış bir telefon kurarak tehdit modelinizi mobil cihazınızda uygulayın.
- **[GrapheneOS Gelişmiş Kurulum Rehberi](/tr/graphene)** - En üst düzey güvenlik sunan mobil işletim sistemi rehberi.
- **[Reklam Engelleyicili Kişisel VPN Kurulumu](/tr/vpn)** - Kendi sunucunuz üzerinden internet trafiğinizi güvenceye alın.

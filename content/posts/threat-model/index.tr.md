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
> - Bir tehdidi doğru şekilde nasıl tanımlarsınız (sadece "büyük teknoloji şirketleri" değildir)
> - 4 temel tehdit kategorisi: servis sağlayıcılar, toplu gözetim, kötü amaçlı yazılım ve saldırganlar
> - Uçtan uca şifreleme, kimlik ayrımı ve bölmeleme ile kendinizi nasıl korursunuz
> - Tehdit modelinizi oluştururken kaçınmanız gereken kötü uygulamalar

## Özet

Bir tehdit modeli, ne korumak istediğinizi, kimden korumak istediğinizi, saldırganın hangi yeteneklere sahip olduğunu ve hangi gerçekçi karşı tedbirleri alacağınızı belirlediğiniz süreçtir. Bir tehdit modeli olmadan, işe yaramaz araçlar satın alma, somut riskleri göz ardı etme veya güvenliği gerçekten artırmadan dijital hayatınızı daha külfetli hale getirme riskiyle karşı karşıya kalırsınız.

Kimden korunduğunuzu bilmiyorsanız bir VPN kurmak veya Signal'e geçmek hiçbir işe yaramaz. Çok fazla yeni başlayan kişi, önce kendi tehdit modelini tanımlamadan gizlilik araçlarına zaman ve para harcıyor ve sonunda yanlış risklere karşı korunmuş oluyor. Bir tehdit modeli oluşturmak en temel ilk adımdır: gerçek zayıf noktalarınızı anlamanızı ve doğru karşı tedbirleri seçmenizi sağlar.

Bir kişinin gizliliğini ve güvenliğini korumak için atması gereken ilk adım bir **Tehdit modeli** oluşturmaktır.

## Bir Tehdidin Tanımı {#definizione-di-una-minaccia}

Bir tehdit modeli oluşturmak için önce bir tehdidin ne olduğunu tanımlamamız gerekir. Gizlilik dünyasına yeni adım atan kişilerin yaptığı yaygın bir hata, "büyük teknoloji şirketlerini" tehdit olarak görmektir. Bu yaklaşımın temel bir sorunu vardır:

> **"Büyük teknoloji şirketlerine" güvenmiyoruz, ama sonra güvenimizi "küçük teknoloji şirketlerine" mi kaydırıyoruz? Bu "küçük teknoloji şirketleri" kötü niyetli çıkarsa veya katlanarak büyürse ne olur?**

Burada tehdidi tanımlamanın doğru yolu **"servis sağlayıcı"**dır, "büyük teknoloji şirketleri" değil.

Genel olarak, bir kişinin kendini korumak isteyebileceği dört temel tehdit vardır:

1. **Kendi kullanıcılarını gözetleyen bir servis sağlayıcı**
2. **Siteler/servisler arası takip ve veri paylaşımı**, yani "toplu gözetim"
3. **Kullanıcıları kötü amaçlı yazılımı aracılığıyla gözetleyen bir uygulama geliştiricisi**
4. **Kullanıcıların bilgisayarlarına erişmeye çalışan bir saldırgan**

Tipik bir kişi, tehdit modeline bu tehditlerden birkaçını dahil eder ve bazılarına diğerlerinden daha fazla önem verir.

Örneğin, bir yazılım geliştiricisi öncelikle bir saldırganın kaynak kodunu, imzalama anahtarlarını ve sırlarını çalmasından korkabilir; ancak web'de gezinirken gizlilik de isteyecektir. Aynı şekilde, sıradan bir kişi öncelikle toplu gözetim ve servis sağlayıcılar konusunda kaygılanabilir, ama bir saldırganın verilerini çalmasını önlemek için iyi bir güvenliğe de ihtiyaç duyacaktır.

Muhbirler (whistleblower) için tehdit modeli çok daha uçtur. Yukarıda bahsedilenlere ek olarak **anonimliğe** ihtiyaçları vardır. Sadece ne yaptıklarını ve sahip oldukları verileri gizlemeleri, kötü niyetli kişiler veya hükümetler tarafından hacklenmekten kaçınmaları gerekmez, aynı zamanda kendi kimliklerini de gizlemeleri gerekir.

## Servis Sağlayıcılardan Gizlilik {#privacy-dai-fornitori-di-servizi}

Çoğu durumda, "özel" mesajlarımız, e-postalarımız ve sosyal etkileşimlerimiz bir yerdeki bir sunucuda saklanır. Açık olan sorun, servis sağlayıcının (veya sunucuyu ele geçirmiş bir saldırganın) sizin haberiniz olmadan istediği zaman ve şekilde özel konuşmalarınıza erişebilmesidir. Bu, SMS, Telegram, Discord ve diğerleri gibi birçok yaygın servis için geçerlidir.

**Uçtan uca şifreleme** ile, iletişimlerinizi sunucuya gönderilmeden önce siz ve alıcılarınız arasında şifreleyerek bu sorunu azaltabilirsiniz. Servis sağlayıcının her iki tarafın da özel anahtarlarına erişimi olmadığı sürece mesajlarınızın gizliliği garanti edilir.

Pratikte, farklı uçtan uca şifreleme uygulamalarının etkinliği değişir. **Signal** gibi uygulamalar cihazınızda yerel olarak çalışır ve uygulamanın her kopyası tüm kurulumlarda aynıdır. Servis sağlayıcı özel anahtarlarınızı çalmak için uygulamaya bir arka kapı (backdoor) eklerse, bu tersine mühendislik yoluyla tespit edilebilir.

Buna karşılık, **Proton Mail**'in webmail'i veya **Bitwarden**'ın web kasası gibi web tabanlı uçtan uca şifreleme uygulamaları, kriptografik işlemleri yönetmek için sunucunun tarayıcıya dinamik olarak JavaScript kodu sunmasına dayanır. Kötü niyetli bir sunucu belirli bir kullanıcıyı hedef alabilir ve şifreleme anahtarını çalmak için ona kötü amaçlı JavaScript kodu gönderebilir; kullanıcının bunu fark etmesi son derece zordur.

**Bu nedenle, uçtan uca şifrelemeye güvendiğinizde, mümkün olduğunda web istemcileri yerine yerel uygulamaları tercih etmelisiniz.**

Uçtan uca şifrelemeyle bile, servis sağlayıcılar genellikle korunmayan **metadata** aracılığıyla sizi profilleyebilir. Mesajlarınızı okuyamasalar da, kiminle iletişim kurduğunuzu, mesajlaşma sıklığınızı ve aktif olduğunuz saatleri gözlemleyebilirler. Metadata koruması oldukça nadirdir; bu konu sizi rahatsız ediyorsa, kullandığınız yazılımın metadata azaltma veya koruması sunup sunmadığını görmek için teknik belgelerini dikkatlice incelemelisiniz.

## Siteler/Servisler Arası Takipten Korunma {#protezione-dal-tracciamento-cross-siteservice}

Aşağıdakiler de dahil olmak üzere çeşitli tanımlayıcılar aracılığıyla web siteleri ve servisler üzerinde takip edilebilirsiniz:

- **IP adresiniz**
- **Tarayıcı çerezleri**
- **Tarayıcınızın parmak izi (fingerprint)**
- **Web sitelerine gönderdiğiniz veriler**
- **Ödeme yöntemlerinin ilişkilendirilmesi**

Hedefleriniz şunlar olmalı:

- **Çevrimiçi kimliklerinizi ayırmak**
- **Kalabalığa karışmak**
- **Mümkün olduğunca kimliği belirleyici bilgi vermekten kaçınmak**

Gizlilik politikalarına güvenmek (kesinlikle ihlal edilecek vaatler) yerine, çeşitli sağlayıcıların verileri ilişkilendirip sizinle ilgili bir profil oluşturmasını zorlaştıracak şekilde **bilgilerinizi belirsizleştirmeye** çalışın. Bu şunları içerebilir:

- Bulut servislerine veri yüklemeden önce **Cryptomator gibi şifreleme araçları kullanmak**
- Kredi/banka kartı bilgilerinizi korumak için **ön ödemeli kartlar veya kripto para kullanmak**
- IP adresinizi gizlemek için **VPN veya Tor kullanmak**

> **Bir gizlilik politikası, gerçek gizlilik için tüm seçenekleri tükettiğinizde ve servis sağlayıcınıza tam güven duymanız gerektiğinde, sadece son çare olarak değerlendirilmelidir** (verilerinizi korumak için elinizden geleni yaptıktan sonra, kullandığınız servislerin veya sunucuların bulunduğu yargı bölgesinin yasaları gibi konuları değerlendirmeyi düşünebilirsiniz, ama bu kesinlikle öncelik değildir).

Şirketlerin sahipliklerini gizleyebileceğini veya reklamcılık sektöründe faaliyet göstermeseler bile bilgilerinizi veri komisyoncularıyla (data broker) paylaşabileceğini unutmayın. Bu nedenle, tehdit modelinizde sadece "reklam teknolojisi" sektörüne odaklanmanın bir anlamı yoktur. Kendinizi **servis sağlayıcıların bütününden** korumak daha mantıklıdır; bunu yaptığınızda, çoğu insanın endişelendiği her tür kurumsal gözetim tehdidi aynı anda ele alınmış olur.

## Kamuya Açık Bilgileri Sınırlamak {#limitare-le-informazioni-pubbliche}

Verilerinizin gizliliğini sağlamanın en iyi yolu basitçe **onları paylaşmamaktır**. Çevrimiçi bulduğunuz kişisel bilgileri silmek, gizliliğinizi geri kazanmak için atabileceğiniz en iyi ilk adımlardan biridir.

Bilgi paylaştığınız sitelerde, verilerinizin yayılmasını sınırlamak için hesabınızın **gizlilik ayarlarını kontrol etmeniz** çok önemlidir. Örneğin, hesaplarınız bir "gizli mod" sunuyorsa, profilinizin arama motorları tarafından dizine eklenmemesini ve yetkisiz kişiler tarafından görüntülenememesini sağlamak için bunu etkinleştirin.

Sahip olmaması gereken çeşitli sitelere zaten gerçek bilgilerinizi verdiyseniz, gerçek bilgilerinizi sahte olanlardan ayırt edilemez hale getirmek için aynı çevrimiçi kimlikle ilişkilendirilmiş sahte bilgiler göndermek gibi **yanlış bilgilendirme taktikleri** kullanmayı düşünebilirsiniz.

## Kötü Amaçlı Yazılım ve Saldırganlardan Korunma {#protezione-da-malware-e-hacker}

Güvenlik, gizliliği sağlamak için temeldir: özel görünen araçları kullanmak, bunlar saldırganlar tarafından gelecekte verilerinizi ifşa etmek için kolayca istismar edilebiliyorsa anlamsızdır.

Uygulama güvenliği söz konusu olduğunda, genellikle kullandığımız yazılımın kötü niyetli olup olmadığını veya öyle hale gelip gelmeyeceğini bilemeyiz (bazen bilmemiz de mümkün değildir). En güvenilir geliştiriciler için bile, yazılımlarının daha sonra istismar edilebilecek ciddi güvenlik açıkları içermediğine dair bir garanti yoktur.

Kötü amaçlı yazılımın yol açabileceği potansiyel zararı en aza indirmek için **bölmeleme (compartmentalization) yoluyla güvenlik** benimsemelisiniz. Bu şunları içerebilir:

- **Farklı görevler için farklı bilgisayarlar kullanmak**
- İlgili uygulama gruplarını ayırmak için **sanal makineler kullanmak**
- Uygulama sandboxing'i ve erişim kontrolüne güçlü bir şekilde odaklanan **güvenli bir işletim sistemi benimsemek**

Mobil işletim sistemleri, uygulama sandboxing'i açısından genellikle masaüstü sistemlerden daha güvenlidir. Uygulamalar root erişimi elde edemez ve yalnızca onlara verdiğiniz sistem kaynaklarına erişebilir.

Masaüstü işletim sistemleri genellikle uygun sandboxing konusunda geride kalır. **ChromeOS**, Android'e benzer sandboxing özellikleri sunar ve **macOS**, sistem izinleri üzerinde tam kontrole ve (geliştiriciler için) isteğe bağlı uygulama sandboxing'ine sahiptir; ancak bu işletim sistemleri kendi OEM üreticilerine kimliği belirleyici bilgiler gönderir. **Linux**, sistem sağlayıcılarına bilgi göndermeme eğilimindedir, ama exploit'lere ve kötü amaçlı uygulamalara karşı sınırlı koruma sunar. Bu durum, **Qubes OS** gibi sanal makineleri veya konteynerleri yoğun şekilde kullanan özel dağıtımlarla kısmen azaltılabilir.

Web tarayıcıları, e-posta istemcileri ve ofis uygulamaları sık sık üçüncü taraflarca gönderilen güvenilmeyen kodları çalıştırır. Bu tür uygulamaları ana sistemden ve birbirlerinden ayırmak için birden fazla sanal makine çalıştırmak, bir exploit'in tüm sistemi ele geçirmesini önlemek için yararlı bir tekniktir. **Qubes OS** veya **GrapheneOS** gibi teknolojiler bu ayrımı şeffaf bir şekilde uygulamak için pratik yöntemler sunar.

Fiziksel saldırılar konusunda kaygılıysanız, **Android**, **iOS**, **ChromeOS** veya **macOS** gibi güvenli bir **secure boot** (doğrulanmış önyükleme) uygulamasına sahip bir işletim sistemi kullanmalısınız. Diskinizin şifrelendiğinden ve işletim sisteminin şifreleme parolanızı tahmin etme girişimlerini sınırlamak için bir **TPM**, **Secure Enclave** veya **Secure Element** kullandığından emin olun. Çoğu masaüstü işletim sistemi verileri kullanıcı bazında ayrı şifrelemediğinden, bilgisayarınızı güvenmediğiniz kişilerle paylaşmaktan kaçının.

## Kötü Uygulamalar {#cattive-pratiche}

Yeni başlayan biri olarak, bir tehdit modeli oluştururken şu kötü uygulamalara düşebilirsiniz:

- **Servis sağlayıcıların bütünü yerine yalnızca reklam ağlarına odaklanmak**
- **Gizlilik politikalarına büyük ölçüde güvenmek**
- **Güveni bir servis sağlayıcıdan diğerine körü körüne kaydırmak**
- **Sorunu sistematik olarak çözmek yerine Badness Enumeration'a (kötülük sayımı) aşırı güvenmek**
- **Açık kaynaklı yazılıma körü körüne güvenmek**

Tartışıldığı gibi, yalnızca reklam ağlarına odaklanmak ve sadece gizlilik politikalarına güvenmek etkili bir tehdit modeli oluşturmaz. Servis sağlayıcı değiştirdiğinizde, altta yatan sorunu belirleyin ve yeni sağlayıcının uygun bir teknik çözüm sunup sunmadığını kontrol edin.

Örneğin, **Google Drive**'ı sevmeyebilirsiniz çünkü Google'a tüm verilerinize erişim sağlar. Buradaki gerçek sorun **uçtan uca şifreleme eksikliğidir**; bunu **Cryptomator** gibi bir şifreleme aracı kullanarak veya **Proton Drive** gibi bunu yerel olarak sunan bir sağlayıcıya geçerek çözebilirsiniz. Google Drive'dan uçtan uca şifreleme sunmayan bir sağlayıcıya körü körüne geçmek mantıklı değildir.

Badness Enumeration'ın (kötülük sayımının) — yani kötü niyetli kabul edilen aktörlerin (Google, Amazon, Meta vb. gibi) bir listesini çıkarıp her bir eylemlerini engellemeye çalışmanın — işe yaramadığını, işe yaramayacağını ve hiçbir zaman işe yaramayacağını unutmayın. Bu yaklaşım etkisizdir çünkü tehditler sürekli evrim geçirir ve belirli bir listeye odaklanmak sizi bilinmeyen aktörlerden veya yeni saldırı tekniklerinden korumaz. Savunma stratejinizi bir düşman listesi üzerine değil, bir dizi saldırıyı durdurmaya yarayan genel bir yöntem üzerine kurun (çözüm sadece Google'a veri vermemek değil, genel olarak veri vermemektir!).

Önemli bir başka husus da **açık kaynaklı yazılımın** otomatik olarak gizli veya güvenli olmadığıdır. Kötü amaçlı kod, proje geliştiricileri, katkıda bulunanlar, kütüphane geliştiricileri veya kodu derleyen kişiler tarafından eklenebilir. Ayrıca, açık kaynaklı bir yazılım bazen kapalı kaynak karşılığına göre daha düşük güvenlik özelliklerine sahip olabilir.

Örneğin, çoğu geleneksel masaüstü Linux dağıtımı, macOS'a kıyasla varsayılan olarak secure boot, sistem bütünlüğü koruması veya uygulamalar için tam erişim kontrolünden yoksundur. Bir tehdit modeli oluştururken, kullandığınız her yazılımın gizlilik ve güvenlik özelliklerini değerlendirmek ve sadece açık kaynaklı olduğu için körü körüne güvenmek yerine kendi güvenlik ve gizlilik ihtiyaçlarınıza bağlı bir tehdit modeli oluşturmak çok önemlidir.

## Sonuç {#conclusioni}

Bir tehdit modeli oluşturmak, çevrimiçi gizliliğinizi ve güvenliğinizi korumak için temel bir adımdır. Farklı tehditleri anlayarak ve proaktif tedbirler alarak, gözetim, takip ve siber saldırılara karşı korumanızı önemli ölçüde artırabilirsiniz.

Unutmayın, anahtar, teknoloji seçimlerinizde bilgili, eleştirel ve proaktif olmaktır.

---

Bu rehberi okuduğunuz için teşekkürler! Faydalı bulduysanız, siber güvenlikle ilgilenen arkadaşlarınız ve meslektaşlarınızla paylaşın.

---

## İlgili Rehberler

- **[De-Google Android: Eksiksiz Gizlilik Rehberi](/tr/android)** - De-Google'lanmış bir kurulumla tehdit modelinizi telefonunuza uygulayın
- **[GrapheneOS: En İyi Gizlilik İşletim Sistemi Rehberi](/tr/graphene)** - En iyi güvenlik seviyesine sahip mobil işletim sistemi
- **[AdBlock ile Kendi Sunucunuzda VPN](/tr/vpn)** - Kişisel bir VPN ile ağ trafiğinizi koruyun

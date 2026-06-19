---
title: "GrapheneOS: En İyi Gizlilik İşletim Sistemi Rehberi"
description: "GrapheneOS hakkında bilmeniz gereken her şey: kurulum, yapılandırma, kullanıcı profilleri, sandboxed Play Services ve sorun giderme. Mevcut en eksiksiz rehber."
summary: "GrapheneOS hakkında bilmeniz gereken her şey: kurulum, yapılandırma, kullanıcı profilleri, sandboxed Play Services ve sorun giderme. Mevcut en eksiksiz rehber."
keywords: ["GrapheneOS","GrapheneOS rehberi","graphene os türkçe","android gizlilik","degoogle android","özel akıllı telefon","güvenli android işletim sistemi"]
author: "b4lol"
date: 2026-03-01
lastmod: 2026-05-05
weight: 2
url: /tr/graphene
series: ["Dijital Gizlilik"]
topics: ["android"]
faq:
  - question: "GrapheneOS sadece Google Pixel'de mi çalışır?"
    answer: "Evet, şu anda GrapheneOS resmi olarak yalnızca Google Pixel cihazlarını desteklemektedir; çünkü doğrulanmış önyükleme (verified boot) ve bellek etiketleme (memory tagging) gibi gerekli donanımsal güvenlik gereksinimlerini karşılayan tek cihazlar bunlardır."
  - question: "Gizlilik için bir Google telefonu kullanmak güvenli mi?"
    answer: "Evet. Pixel'ler Android geliştirme için referans cihazlardır, güvenlik araştırmacılarından büyük ilgi görürler ve kasıtlı bir arka kapı olduğuna dair hiçbir kanıt yoktur. GrapheneOS, Google servislerini kaldırır ve gelişmiş korumalar ekler."
  - question: "GrapheneOS için hangi Google Pixel'i seçmeliyim?"
    answer: "Maksimum güvenlik için desteklenen en güncel Pixel modelleri önerilmektedir. 2026 yılı itibarıyla öncelikle Pixel 9, Pixel 10 ve Pro modelleri tercih edilmelidir. Pixel 9a en uygun fiyatlı seçenektir. 16 GB RAM içeren Pro modeller ise çok sayıda kullanıcı profili çalıştırmak isteyenler için idealdir."
  - question: "Android uygulamaları ve Google Play Services GrapheneOS'ta çalışır mı?"
    answer: "GrapheneOS, Google servislerine ihtiyaç duyan uygulamaların, özel ayrıcalıkları olmayan bir sandbox (yalıtılmış alan) içinde çalışmasına olanak tanıyan sandboxed Google Play hizmetlerini destekler."
  - question: "GrapheneOS nasıl kurulur?"
    answer: "GrapheneOS; web tarayıcı üzerinden resmi web yükleyici aracılığıyla, komut satırından veya işletim sistemi önceden yüklenmiş bir cihaz satın alınarak kurulabilir."
  - question: "GrapheneOS'ta kullanıcı profilleri nedir?"
    answer: "Kullanıcı profilleri, aynı cihaz üzerinde her biri kendi uygulamalarına ve ayrı ayrı şifrelenmiş verilere sahip yalıtılmış ortamlar oluşturulmasını sağlar. Kişisel, iş ve hassas etkinliklerin birbirinden ayrılması için oldukça kullanışlıdır."
  - question: "GrapheneOS düzenli güvenlik güncellemeleri alıyor mu?"
    answer: "Evet, GrapheneOS arka planda otomatik olarak indirilip kurulan düzenli güncellemeler almaktadır. Güncellemeleri uygulamak için cihazın yeniden başlatılması yeterlidir."
howto:
  name: "GrapheneOS nasıl seçilir, kurulur ve yapılandırılır"
  description: "Uyumlu bir Pixel modeli seçme, GrapheneOS yükleme, güvenli önyüklemeyi doğrulama ve profilleri, uygulamaları ve güvenlik ayarlarını yapılandırmaya yönelik pratik adımlar."
  totalTime: "PT2H"
  supply:
    - "GrapheneOS tarafından desteklenen bir Google Pixel"
    - "Güvenilir bir USB-C kablosu"
    - "Kararlı bir internet bağlantısı"
  tool:
    - "WebUSB uyumlu bir tarayıcı"
    - "Resmi GrapheneOS web yükleyicisi"
  steps:
    - name: "Desteklenen bir Pixel seçin"
      text: "Desteklenen cihazların resmi tablosunu kontrol edin ve uzun güncelleme süresi olan güncel modelleri tercih edin."
      url: "/tr/graphene#quale-pixel-scegliere"
    - name: "GrapheneOS'u kurun"
      text: "GrapheneOS projesinin talimatlarını takip ederek resmi web yükleyicisini veya komut satırı prosedürünü kullanın."
      url: "/tr/graphene#installazione"
    - name: "Güvenli önyüklemeyi doğrulayın"
      text: "Doğrulanmış önyükleme anahtarı parmak izini kontrol edin ve yüklenen sistemin orijinalliğini doğrulamak için Auditor uygulamasını kullanın."
      url: "/tr/graphene#protezione-contro-manomissioni"
    - name: "Güvenlik ayarlarını yapılandırın"
      text: "Tehdit modelinize göre ekran kilidini, otomatik yeniden başlatmayı, USB kısıtlamalarını, kablosuz bağlantı güvenlik ayarlarını ve uygulama izinlerini yapılandırın."
      url: "/tr/graphene#hardening-attraverso-le-impostazioni"
    - name: "Kullanıcı profilleriyle etkinlikleri ayırın"
      text: "İş, günlük yaşam, Google Play hizmetleri gerektiren uygulamalar ve hassas etkinlikler için ayrı profiller oluşturun."
      url: "/tr/graphene#profili-utente-secondari"
    - name: "Uygulamaları kurun ve doğrulayın"
      text: "Güvenilir kaynakları tercih edin, uygulamaları düzenli olarak güncelleyin ve mümkünse App Verifier veya doğrulanabilir imzaya sahip mağazaları kullanın."
      url: "/tr/graphene#applicazioni"
---

Bu rehberde öğrenecekleriniz:
> - GrapheneOS'un neden mobil gizliliğin altın standardı olduğu ve hangi Pixel modelinin seçilmesi gerektiği
> - GrapheneOS'un sıfırdan nasıl kurulup yapılandırılacağı
> - Kullanıcı profillerinden, sandboxed Play hizmetlerinden ve gelişmiş güvenlik özelliklerinden nasıl en iyi şekilde yararlanılacağı

## GrapheneOS nedir ve kimler için uygundur?

GrapheneOS, gizlilik ve güvenliğe odaklanan açık kaynaklı bir Android işletim sistemidir. Veri toplanmasını azaltmak ve uygulama yalıtımını artırmak isteyen, aynı zamanda yalıtılmış bir sandbox içinde sistem yetkileri olmaksızın çalışan Google Play hizmetleri sayesinde Android uygulama uyumluluğunu korumak isteyen kullanıcılar için tasarlanmıştır.

| Soru | Kısa cevap |
|---|---|
| Hangi telefonlarda çalışır? | Sadece resmi olarak desteklenen Google Pixel cihazlarda. |
| Google uygulamalarından vazgeçmek mi gerekiyor? | Hayır, Google Play hizmetleri yalıtılmış (sandboxed) uygulamalar olarak yüklenebilir. |
| Yeni başlayanlar için uygun mu? | Evet, rehberli bir kurulumu takip etmeye ve kullanıcı profilleri hakkında bilgi edinmeye istekli olanlar için uygundur. |
| Varsayılan olarak anonim mi? | Hayır. Gizliliği ve güvenliği artırır, ancak nihai sonuç tehdit modelinize ve kullandığınız uygulamalara bağlıdır. |

Ana kaynaklar: Resmi GrapheneOS dokümantasyonu, projenin SSS sayfası, Android Açık Kaynak Projesi (AOSP) ve desteklenen Pixel cihazlar üzerinde yapılan testler.

Akıllı telefonunuz sahip olduğunuz en mahrem cihazdır: nereye gittiğinizi, kiminle konuştuğunuzu, alışkanlıklarınızı bilir. Stok Android ve iOS işletim sistemleri bu verileri sürekli olarak Google ve Apple ile paylaşır. GrapheneOS, gizliliğinizden ödün vermeden kurumsal düzeyde güvenlik sunan tek alternatiftir. Bu rehber cihaz seçiminden ileri düzey yapılandırmaya kadar her adımda size yol gösterecektir.

[GrapheneOS](https://grapheneos.org/), gizlilik ve güvenliği artırmaya odaklanan, [Android Open Source Project (AOSP)](https://www.android.com/) tabanlı özgür ve açık kaynaklı (FOSS) bir işletim sistemidir.

GrapheneOS şu anda Android işletim sistemleri arasında altın standardı temsil etmektedir ve bu rehberde işletim sisteminin tüm yönleri ve özellikleri ele alınacaktır.

Bu makale, GrapheneOS projesiyle ilgili mobil güvenlik ve gizlilik hakkındaki bilgi ve birikimi bir araya getirme girişimidir; bu rehbere ilham veren GrapheneOS hakkında bir makale yazdığı için [PatrickD](https://x.com/patrickd_de)'ye teşekkürlerimizi sunarız.

Bu rehberi hazırlamak büyük bir emek ve zaman gerektirmiştir. Yapabileceğiniz en büyük destek, bu rehberin daha fazla kişiye ulaşması için **gruplarda**, **Telegram kanallarında**, **X (Twitter)** platformunda ve diğer sosyal ağlarda paylaşılmasıdır. Paylaşımda bulunan herkese **içtenlikle teşekkür ederiz**. Bu içerik ticari bir amaç taşımamaktadır; sitemiz verilerinizi toplamaz, analitik araçlar kullanmaz, e-posta adresinizi veya kaydolmanızı talep etmez. Bu projenin sürdürülebilmesi için lütfen bu bilgiyi paylaşarak destek olun.

## Cihaz Seçimi

GrapheneOS projesini ilk kez inceleyenler için muhtemelen en sık sorulan soru şudur: Neden bu kadar az cihaz resmi olarak destekleniyor ve neden hepsi Google tarafından üretilen pahalı Pixel telefonları?

### Neden Sadece Pixel Cihazlar?



GrapheneOS'a göre, şu anda başka mantıklı bir seçenek bulunmamaktadır. GrapheneOS'un bu cihazlar için Google ile özel bir sözleşmesi yoktur. Bunun nedeni Pixel'lerin kusursuz derecede güvenli olması değil, aksine diğer tüm alternatiflerin güvenlik standartlarının yetersiz olmasıdır. GrapheneOS projesi, şu anda ve gelecekte potansiyel olarak desteklenecek cihazlar için bir [gereksinimler listesi](https://grapheneos.org/faq#future-devices) sunmaktadır ve ne yazık ki şu anda bu şartları sadece Pixel modelleri karşılayabilmektedir.

Pixel cihazları, Android geliştirme sürecinde referans platform olarak hizmet etmeleri sayesinde alternatif işletim sistemleri için tam destek sunar. Düzenli ve yeterli ürün yazılımı (firmware) güncellemeleri alırlar; ayrıca [bellek etiketleme (memory tagging)](https://discuss.grapheneos.org/d/10507-what-actually-is-the-memory-tagging-feature-and-is-it-worth-turning-on) gibi, üçüncü taraf işletim sistemleri yüklü olduğunda da kullanılabilen gelişmiş donanımsal güvenlik özellikleri sağlarlar.

Diğer çoğu üretici (OEM) ise alternatif işletim sistemleri için sadece kısmen işlevsel destek sunar ve bunu ikincil bir hobi özelliği olarak ele alır. Birçoğu temel güvenlik özelliklerini tamamen atlar ve yeterli güncellemeler sağlamakla uğraşmaz. Daha da kötüsü, sisteme yaptıkları özelleştirmelerle genellikle karmaşıklık ve buna bağlı olarak daha büyük bir saldırı yüzeyi eklerler.

Geçmişte GrapheneOS, diğer üreticilerle iş birliği yapmaya çalışmış ancak Pixel modelleriyle karşılaştırılabilir bir güvenlik düzeyine sahip bir cihaz geliştirmenin son derece zor olduğu görülmüştür.

Cihaz desteğinin genişletilmesi, GrapheneOS'un birçok güvenlik özelliğini donanımsal olarak destekleyemeyen güvensiz cihazlarla uyumluluk aranması anlamına gelecektir. Ayrıca bu durum, gizlilik ve güvenliği iyileştirme çalışmalarından önemli miktarda kaynak çalacaktır; çünkü bu özelliklerin çoğu donanıma özeldir. Ancak, gereksinimleri karşılayan başka cihazlar olsaydı, GrapheneOS projesi kesinlikle bunları da destekleme listesine eklerdi.

### Alternatifler var mı?

Android cihazlar için gizlilik ve güvenliğe odaklanan veya daha geniş cihaz desteği sunan çeşitli alternatif işletim sistemleri mevcuttur. Ancak, güvenlik özellikleri açısından ciddi açıklar barındırdıklarından, bunların hiçbiri tam bir alternatif olarak kabul edilemez.

GrapheneOS ekibinin bu projelerin neredeyse tümüne yönelttiği en temel eleştiri, Android'in tam açık kaynaklı sürümünü (AOSP) kullanan kullanıcıların yararlandığı kritik güvenlik yamalarının çok geç uygulanması veya bazı durumlarda tamamen atlanmasıdır.

[LineageOS](https://lineageos.org/) bunlardan biridir; ancak bu projenin odağının güvenlik değil, cihaz ömrünü uzatmak ve geniş uyumluluk sağlamak olduğu unutulmamalıdır. Doğrulanmış önyükleme (verified boot) sisteminin olmaması, yetkisiz fiziksel erişimleri kolaylaştırmaktadır. [/e/OS](https://e.foundation/e-os/) projesi, gizliliğe odaklanan tamamen Google servislerinden arındırılmış bir mobil ekosistem olarak kendini tanıtsa da LineageOS'un yetersiz temelleri üzerine inşa edilmiştir. e/OS, kullanıcılara sorgulanabilir bir gizlilik hissi veren uygulama ve servisler içerir; ancak bu servisler arka planda veri toplayabilen ve yetersiz tasarlanmış yapılardır.

GrapheneOS'un en büyük alternatifi olarak görülen [CalyxOS](https://calyxos.org/), yalnızca güncellemeleri geciktirmekle kalmamış, aynı zamanda yanlış Android güvenlik yama seviyeleri göstererek kullanıcıları yanıltmıştır. Ayrıca, tehlikeye atılmış verileri güvenilir şekilde silmesi beklenen acil durum silme özelliği gibi ciddi kusurları olan güvenlik özellikleri barındırmaktadır.

> Çeşitli Android tabanlı işletim sistemleri hakkında daha fazla bilgi için şu üçüncü taraf karşılaştırma tablosuna başvurabilirsiniz: <https://eylenburg.github.io/android_comparison.htm>

Sonrasında, GrapheneOS'un eski adı olan [CopperheadOS](https://copperhead.co/android/) bulunmaktadır. Projeyi finanse eden şirket ile yaşanan yönetimsel sorunların ve ayrılığın detaylarına burada değinilmeyecektir. Ancak, bu şirketin şu anda CopperheadOS'u kapalı kaynaklı bir çatal (fork) olarak sattığını belirtmekte fayda vardır (bu sürümün kullanılması tavsiye edilmemektedir).

Son olarak, ABD merkezli [Purism](https://puri.sm/), özel donanımı ve fiziksel kapatma anahtarları (kill switch) gibi özelliklerle gizlilik üzerinde kontrol vaat etmektedir. GrapheneOS ekibi ise bu cihazlarda tercih edilen güvenlik bileşenleri ve ürün yazılımı/mikrokod güncellemeleri için gereken karmaşık süreç konusunda farklı görüştedir. Librem 5 cihazı, aksine inanılmasına rağmen neredeyse tamamen kapalı kaynaklı donanım ve ürün yazılımına dayanmaktadır. GrapheneOS, bu projeleri kullanıcıları eski ve güvenlik açığı bulunan donanım ile yazılımlara yönlendiren pazarlama taktikleriyle suçlamaktadır. Hatta kullanıcıların, GrapheneOS'tan sonra gizlilik ve güvenlik için en iyi ikinci seçenek olarak (Kilitleme/Lockdown modunda) bir iPhone tercih etmelerinin daha doğru olacağını belirtmektedirler.

GrapheneOS projesi, işletim sisteminin hiçbir şekilde aşılamaz olduğunu iddia etmemekte; pazarlama söylemleri yerine işin özüne odaklanmaktadır. GrapheneOS [web sitesini](https://grapheneos.org/) diğer projelerle karşılaştırdığınızda bu durum açıkça görülebilir: Web sitesi tamamen teknik odaklıdır. Bu durum, kullanıcıları pazarlama söylemleri arasından teknik doğruları arama zahmetinden kurtarsa da ortalama bir kullanıcı için caydırıcı olabilir.

### Google cihazlarına güvenilebilir mi?

GrapheneOS'un şu anda sadece Pixel cihazlarını desteklediğini gördük; çünkü yeterli donanımsal güvenlik önlemlerine sahip tek cihazlar bunlardır. Ancak bu cihazlarda arka kapı (backdoor) bulunma ihtimali bu çabaları anlamsız kılmaz mıydı?

Belirtildiği gibi, Pixel cihazlar Android geliştirme sürecinde referans platform olarak hizmet eder, bu yüzden birçok güvenlik uzmanı tarafından incelenmektedir. Ayrıca Google, dışarıdan gelen güvenlik araştırmalarına açık bir yaklaşım sergilediği için Pixel'ler bu alanda büyük ilgi görmektedir. Bu koşullar altında cihazlara arka kapı gizlemek oldukça zor işlemdir.

Bir diğer argüman ise, üretimi dışarıdan temin eden küçük ölçekli şirketlerin tedarik zincirlerine sızmanın, küresel ölçekteki iPhone veya Pixel üretim hatlarını fark edilmeden sabote etmekten çok daha kolay olmasıdır. Bu kadar yaygın kullanılan cihazların kullanıcıları, bu cihazların tabi olduğu yüksek inceleme ve denetim seviyesinden yararlanır. Ayrıca, hükümetler tarafından yetkilendirilen adli bilişim firmalarından sızan bilgilerin, bu cihazlarda kasıtlı olarak bırakılmış herhangi bir arka kapıya dair kanıt sunmadığını belirtmek gerekir. Bununla birlikte, bazı kullanıcılar ilkesel olarak Google ile ilişkili hiçbir ürünü kullanmamayı tercih edebilir. Ancak bunu tam anlamıyla sağlamak için Apple ürünlerine yönelmek gerekir; zira Google, Linux çekirdeği dahil pek açık kaynaklı projenin geliştirilmesinde önemli bir rol oynamaktadır.

GrapheneOS'un misyonu, ne pahasına olursa olsun belirli bir şirketten kaçınmak değil, mevcut en iyi araçlarla en üst düzey gizlilik ve güvenliğe ulaşmaktır.

### Hangi Pixel'i seçmelisiniz? {#quale-pixel-scegliere}

Maksimum güvenlik için desteklenen en yeni Pixel modellerinden birinin tercih edilmesi şiddetle önerilir. Bu durum, öncelikle dokuzuncu veya onuncu nesil cihazları incelemeyi gerektirirken, halihazırda elinizde mevcutsa sekizinci nesil modeller de hâlâ iyi bir seçenektir. Cihazlar, GrapheneOS'un yararlandığı bellek etiketleme (memory tagging) gibi donanımsal özellikler sayesinde çok daha güvenli kabul edilir. En yeni nesiller ayrıca gelişmiş modemler ve radyo bileşenleri barındırır; dolayısıyla SIM kart ile kullanımda daha yüksek güvenlik ve pil ömrü elde edersiniz. 16 GB RAM içeren Pro modelleri, GrapheneOS'u birden fazla kullanıcı profiliyle çalıştırmak isteyenler için idealdir (bu özelliğin avantajları ilerleyen bölümlerde açıklanacaktır).

Fiyat/performans oranı açısından Pixel 9a en mantıklı giriş modelidir. Halihazırda Pixel 8 veya 8a kullanıyorsanız, geçiş yapmanıza gerek yoktur; bu cihazlar hâlâ güçlü bir temel sunmaktadır. Her durumda, ikinci el bir cihaz satın almadan önce resmi destek ömrü tablosu kontrol edilmelidir.

> Her cihazın destek ömrüne ilişkin bir tabloyu şu bağlantıda kontrol edebilirsiniz: <https://grapheneos.org/faq#device-lifetime>

Altıncı ve yedinci nesil Pixel cihazların destek sürelerinin bitmesine daha birkaç yıl vardır. Bu nedenle halihazırda elinizde bu cihazlar varsa kullanmaya devam edebilirsiniz; ancak bu modelleri yeni satın almanız önerilmez. Ayrıca GrapheneOS'un yalnızca yeni nesil donanımlarla etkinleştirebildiği bazı özel güvenlik özellikleri sunduğu unutulmamalıdır.

Daha eski modeller kullanım ömrünü tamamlamış (End-of-Life) kabul edilir. GrapheneOS ekibi, hangi işletim sistemi yüklü olursa olsun bu cihazların kullanılmamasını önemle tavsiye eder. GrapheneOS'un bu modeller için sunduğu uzatılmış destek yalnızca geçici risk azaltma amaçlıdır ve kullanıcılara yeni bir cihaza geçmeleri için zaman tanır. Örneğin, Pixel 5a modeli için artık ürün yazılımı (firmware) yaması veya sürücü desteği sunulmamaktadır; üstelik cihazda henüz kapatılmamış kritik bir uzaktan kod yürütme açığı bulunmaktadır.

| Model            | RAM     | Depolama (GB)     | İşlemci   | Eşzamanlı kullanıcı profili |
|--------------------|---------|------------------|--------------|------------------------------|
| Pixel 9 Pro Fold   | 16 GB   | 256-512          |  Tensor G4   |    14                           |
| Pixel 9 Pro XL     | 16 GB   | 128-1024         |  Tensor G4   |    14                           |
| Pixel 9 Pro        | 16 GB   | 128-1024         |  Tensor G4   |    14                           |
| Pixel 9            | 12 GB   | 128-256          |  Tensor G4   |    10                           |
| Pixel 8 Pro        | 12 GB   | 128-1024         |  Tensor G3   |    10                           |
| Pixel 8            | 8 GB    | 128-256          |  Tensor G3   |    6                            |
| Pixel 8a           | 8 GB    | 128-256          |  Tensor G3   |    6                            |

## Kurulum {#installazione}

GrapheneOS'u kurmanın birkaç yöntemi bulunmaktadır: İşletim sistemi önceden yüklenmiş cihazlar satın almak, komut satırından manuel olarak kurmak veya web yükleyicisi aracılığıyla yükleme yapmak. Bu işlemlerin nasıl gerçekleştirileceğine dair tüm rehberler ve belgeler, resmi GrapheneOS web sitesinin "install" bölümünde mevcuttur.

## Kurcalamaya Karşı Koruma {#protezione-contro-manomissioni}

### Doğrulanmış Önyükleme Anahtarı Hash'i

GrapheneOS kurulumunun ardından cihaz açılırken ekranda beliren uyarı mesajı sizi şaşırtabilir. Siyah bir ekranda, işletim sisteminin orijinal olmadığına dair bir uyarı gösterilecek ve altında, yüklü GrapheneOS sürümünün doğruluğunu onaylamanızı sağlayan benzersiz bir kriptografik parmak izi (hash) görüntülenecektir:

| Cihaz | Doğrulanmış Önyükleme Anahtarı Parmak İzi |
| ---------------- | ------------------------------------------------------------------ |
| Pixel 10 Pro Fold | `55a2d44103e56d5ec65496399c417987ba77730e6488fc60ba058d09fc3caee3` |
| Pixel 10 Pro XL | `141d7fc32af7958a416f2661b37cf6f27bfb376fb5ce616aeaa27a82c7a04f74` |
| Pixel 10 Pro | `4e8ee8f717754052198ca6d2d3aaa232e2461b4293c0d6f297e519cc778de093` |
| Pixel 10 | `3f7415ea26f5df5b14ea6d153256071a7a1af9ce7b0970b7311cc463c7ea02c7` |
| Pixel 9a | `0508de44ee00bfb49ece32c418af1896391abde0f05b64f41bc9a2dfb589445b` |
| Pixel 9 Pro Fold | `af4d2c6e62be0fec54f0271b9776ff061dd8392d9f51cf6ab1551d346679e24c` |
| Pixel 9 Pro XL | `55d3c2323db91bb91f20d38d015e85112d038f6b6b5738fe352c1a80dba57023` |
| Pixel 9 Pro | `f729cab861da1b83fdfab402fc9480758f2ae78ee0b61c1f2137dd1ab7076e86` |
| Pixel 9 | `9e6a8f3e0d761a780179f93acd5721ba1ab7c8c537c7761073c0a754b0e932de` |
| Pixel 8a | `096b8bd6d44527a24ac1564b308839f67e78202185cbff9cfdcb10e63250bc5e` |
| Pixel 8 Pro | `896db2d09d84e1d6bb747002b8a114950b946e5825772a9d48ba7eb01d118c1c` |
| Pixel 8 | `cd7479653aa88208f9f03034810ef9b7b0af8a9d41e2000e458ac403a2acb233` |
| Pixel Fold | `ee0c9dfef6f55a878538b0dbf7e78e3bc3f1a13c8c44839b095fe26dd5fe2842` |
| Pixel Tablet | `94df136e6c6aa08dc26580af46f36419b5f9baf46039db076f5295b91aaff230` |
| Pixel 7a | `508d75dea10c5cbc3e7632260fc0b59f6055a8a49dd84e693b6d8899edbb01e4` |
| Pixel 7 Pro | `bc1c0dd95664604382bb888412026422742eb333071ea0b2d19036217d49182f` |
| Pixel 7 | `3efe5392be3ac38afb894d13de639e521675e62571a8a9b3ef9fc8c44fd17fa1` |
| Pixel 6a | `08c860350a9600692d10c8512f7b8e80707757468e8fbfeea2a870c0a83d6031` |
| Pixel 6 Pro | `439b76524d94c40652ce1bf0d8243773c634d2f99ba3160d8d02aa5e29ff925c` |
| Pixel 6 | `f0a890375d1405e62ebfd87e8d3f475f948ef031bbf9ddd516d5f600a23677e8` |

Hash'ler cihaz modeline göre değişir ve yukarıdaki liste, yeni modeller eklenirse kanonik kaynak olmaya devam eden [web yükleyici sayfasından](https://grapheneos.org/install/web#verified-boot-key-hash) kopyalanmıştır. Pek olası olmasa da, GrapheneOS'un sunucu altyapısının tehlikeye atılmış olması ve saldırganların kurulum sırasında kullanılan işletim sistemi dosyalarını ve anahtar hash'leri listesini değiştirmiş olması mümkündür. Cihazınızda görüntülenen hash'leri yukarıdaki tabloyla karşılaştırarak GrapheneOS'un meşru bir sürümünü kurduğunuzdan emin olabilirsiniz.

### Auditor Uygulaması

GrapheneOS, işletim sisteminin gerçekliğini ve bütünlüğünü doğrulamanın, herhangi bir kurcalama olmadığından emin olmanın başka bir yolu olan Auditor App'i içerir. Auditor App kurulu ikinci bir cihazla manuel bir kontrol gerçekleştirebilirsiniz. Başka bir GrapheneOS cihazı olması gerekmez: uygulamayı [Google'ın Play Store'unda bulabilirsiniz](https://play.google.com/store/apps/details?id=app.attestation.auditor.play&hl=en).



Bu doğrulama, GrapheneOS projesinin bir parçası olan [attestation.app](https://attestation.app/) web sitesi kullanılarak otomatikleştirilebilir. Sitede kayıt olduktan ve cihazınızı eşleştirdikten sonra, cihaz zamanında geçerli doğrulamalar sağlayamazsa bir uyarı e-postası alacaksınız.



Ne yazık ki, şu anda kendi uzaktan doğrulama sunucunuzu barındırmak mümkün değil, çünkü bu özelliği kullanmak Auditor App'te değişiklik gerektirir.

## Ayarlar Üzerinden Hardening {#hardening-attraverso-le-impostazioni}

GrapheneOS, güvenlik açıklarına karşı üç temel yaklaşım sergiler: Saldırı yüzeyini (aktif özellikler ve kod miktarı) küçültür, olası açıkların suistimal edilmesini zorlaştırır ve bileşenleri yalıtarak (sandboxing) sızma girişimlerinin etkisini sınırlar. Bu güvenlik önlemleri cihazın kullanım kolaylığını ve performansını etkileyebileceğinden GrapheneOS; kullanıcıların kendi tercihlerini yapmalarına ve ihtiyaçlarına en uygun güvenlik dengesini kurmalarına olanak tanıyan geniş bir özelleştirme seçeneği sunar.

### Kilit Ekranı

Kullanıcı verileri, cihazın ekran kilidi yönteminden türetilen bir kriptografik anahtarla şifrelenmiş olarak saklanır. Bu yöntemler, donanımsal güvenlik çipi (secure element) tarafından uygulanan geciktirmeler sayesinde kaba kuvvet (brute-force) saldırılarıyla aşılamaz. Bu sayede, rastgele belirlenmiş 6 haneli bir PIN kodu dahi son derece yüksek bir koruma sağlar. Güvenlik çipinin korumasına ek olarak, 128 karaktere kadar karmaşık şifreler de kullanabilirsiniz.

Desen kilidi (Pattern Lock) GrapheneOS'tan kaldırılmıştır; zira bu yöntem PIN koduna kıyasla çok daha zayıftır ve kolayca tahmin edilebilir şablonların seçilmesine yol açar. Bunun yerine, en az 6 haneli bir PIN kodu tercih edilmesi ve ekranda parmak izi izlerinden şifrenin tahmin edilmesini zorlaştıran 'PIN karıştırma' (scrambled PIN) özelliğinin etkinleştirilmesi önerilir.

Parmak izi ile kilit açma kullanılabilir; ancak en yüksek güvenlik seviyesi için bu yöntem yalnızca uygulama içi kimlik doğrulamalarla sınırlandırılmalıdır (yani 'Ekran kilidini açmak için kullan' seçeneği kapatılmalıdır). GrapheneOS ekibi, hem parmak izi taramasını hem de PIN/şifre girişini zorunlu kılan iki faktörlü bir kilit açma sistemini de kullanıma sunmuştur.

Fiziksel SIM kart veya eSIM kullanılıyorsa, ekran kilidinden farklı bir SIM PIN kodu belirlenmesi güvenlik açısından önem taşır.



Son olarak, GrapheneOS bir acil durum şifresi veya PIN kodu (duress PIN) tanımlama seçeneği sunar. Bu şifre yapılandırıldıktan sonra, cihazın herhangi bir yerinde (ikincil profiller dahil) girilmesi durumunda cihazdaki ve tanımlı eSIM'lerdeki tüm veriler geri döndürülemez şekilde silinir. Şifre tetiklendiğinde şifre çözme anahtarları anında yok edilir ve cihaz kapatılır. Bir sonraki açılışta dosya sistemi geçersiz kalacağı için cihaz fabrika ayarlarına sıfırlanmış gibi yeniden kurulmak zorunda kalır. Bu işlemin verilerin kendisini sıfırlardan yazarak silmediğini belirtmek gerekir; çünkü bu işlem çok uzun sürer ve saldırganların müdahale etmesine olanak tanırdı.

### Otomatik Yeniden Başlatma

Cihaz açıldıktan sonra henüz ekran kilidi açılmamışken kullanıcı verileri tamamen şifrelenmiş haldedir. İlk kilit açma işleminden sonraki kullanım sürecinde ise şifre çözme anahtarları cihazın geçici belleğinde (RAM) tutulur; bu durum fiziksel erişim araçlarıyla verilerin sızdırılmasına yol açabilecek bir güvenlik açığı oluşturur. Otomatik Yeniden Başlatma özelliği, bellekten veri sızdırılmasını önlemek amacıyla geliştirilmiştir.

Uygulamaların cihaz kilitlendiğinde hassas verileri yeniden şifreleyerek askıya alması mümkün olsa da bu durum uygulama geliştiricilerinin inisiyatifindedir ve pratikte nadiren uygulanır. Örneğin, popüler mesajlaşma uygulaması Signal dahi bu özelliği doğrudan desteklemezken, Molly gibi çatallar bu özelliği daha başarılı bir şekilde sunmaktadır. Cihaz kilitlendikten belirli bir süre sonra otomatik olarak yeniden başlatılarak veriler henüz şifresi çözülmemiş 'ilk kilit açma öncesi' (Before First Unlock - BFU) durumuna geri döndürülür.

Yeniden başlatma zamanlayıcısı, cihaz her kilitlendiğinde devreye girer ve başarılı bir kilit açma işleminde sıfırlanır. Varsayılan süre 18 saattir; en güvenli ve en kısa değer ise 10 dakikadır. Zamanlayıcının çalışması için son yeniden başlatmadan sonra ekran kilidinin en az bir kez açılmış olması gerekir.

Varsayılan 18 saatlik ayarda, sürekli kullanım esnasında kilit açıldıkça sayaç sıfırlanacağı için kullanıcı deneyimi olumsuz etkilenmez. GrapheneOS'un sunduğu sık güncellemeler de cihazın yeniden başlatılmasını gerektirdiğinden, bu özellik telefon aktif değilken güncellemelerin otomatik uygulanmasına da yardımcı olur. Zamanlayıcı süresi 78 saate kadar uzatılabilir veya tamamen kapatılabilir; ancak güvenlik gerekçesiyle bu özelliğin kapatılması kesinlikle önerilmez.

İkincil kullanıcı profilleri kullanılıyorsa, bu özelliğin oturumları kapatarak cihazı ana kullanıcı (Owner) profiline döndüreceği unutulmamalıdır. Hedeflenen güvenlik düzeyine göre 4 veya 8 saatlik süreler makul birer seçenek olabilir.

### USB Kısıtlamaları

Cihazlara yetkisiz erişim sağlamaya çalışan adli bilişim araçları, geniş işlevselliği nedeniyle büyük bir saldırı yüzeyi sunan USB veri hattını kullanmayı tercih eder. Pixel modelleri, standart Android sürümlerinde bulunmayan fakat GrapheneOS için kritik öneme sahip olan, USB-C portunun donanımsal düzeyde denetlenmesine imkan tanır.


Varsayılan olarak GrapheneOS, cihaz kilitlendiği anda yeni USB veri bağlantılarını engeller. Cihaz kilidi açıkken veri aktarımı yapılabilir; ancak cihaz kilitlendikten ve kablo bağlantısı kesildikten sonra yeni bir veri bağlantısı kurulmasına izin verilmez. Bu koruma, DisplayPort gibi USB-C üzerinden çalışan görüntü aktarım modlarını da kapsar.<br><br>
En yüksek güvenlik sağlayan ancak kullanımı zorlaştırabilecek seçenek ise cihaz açıkken USB portunu veri iletişimi için tamamen kapatmaktır. Bu ayar, donanımın güç denetimindeki olası açıkları da kapatır; fakat cihazı şarj etmek istediğinizde bu engeli her seferinde manuel olarak devre dışı bırakmanızı gerektirir.

### Kablosuz Saldırı Yüzeyi

USB bağlantısı sınırlandırıldığında geriye Wi-Fi, Bluetooth ve hücresel ağlar gibi kablosuz veri iletim kanalları kalır. Ancak bu kablosuz kanallar üzerinden cihaza sızmak çok daha karmaşık ve zordur. Modern mobil cihazlarda donanımsal bileşen yalıtımı standart bir uygulamadır. Pixel modellerinde bu kablosuz birimlerin her biri için bağımsız yongalar bulunur.

Varsayılan olarak kapalı olsa da aktif bir bağlantı kesildiğinde Wi-Fi ve Bluetooth'u otomatik olarak kapatan bir zamanlayıcı ayarlanabilir. GrapheneOS ekibi bu özelliği gelecekte NFC için de sunmayı planlamaktadır.

Hücresel ağ bağlantıları ise daha karmaşık bir yapıya sahiptir. 5G, SMS, MMS ve sesli aramalar GrapheneOS üzerinde sorunsuz çalışır. GrapheneOS, saldırı yüzeyini küçültmek amacıyla hücresel ağ için bazı ek kontrol anahtarları sunsa da operatörünüze ve bölgenize bağlı olarak en kararlı ayarları deneme-yanılma yoluyla bulmanız gerekebilir.

> GrapheneOS ile eSIM kullanılabilir. eSIM özellikleri Google altyapısına ihtiyaç duyduğundan varsayılan olarak kapalı gelir. Geçmişte eSIM aktivasyonu için Google Play hizmetleri gerekirken günümüzde buna gerek kalmamıştır ve eSIM kullanımı Google ile veri paylaşımına yol açmaz. Acil durum PIN/şifresi tetiklendiğinde eSIM profillerinin de silineceğini, ancak standart fabrika sıfırlamasında bunun geçerli olmadığını unutmamak gerekir.

GrapheneOS geliştiricileri, mümkünse bağlantı türü olarak yalnızca LTE'nin (4G) seçilmesini önermektedir. LTE, eski 2G ve 3G protokollerine göre çok daha güvenli ve modern; yeni 5G protokolüne göre ise daha az karmaşık ve daha kararlıdır. Yalnızca LTE modunun tercih edilmesindeki temel amaç, eski ağ protokollerine ait geniş kod tabanını devre dışı bırakarak saldırı yüzeyini daraltmaktır.

### Hücresel Gizlilik

LTE ve 5G teknolojileri kendi içlerinde bir şifreleme sunar; ancak bu şifreleme öncelikle ağ üzerinden iletilen verileri korumak içindir, kişisel gizliliğinizi korumayı amaçlamaz. Kullanılan moddan bağımsız olarak, standart GSM aramalarından ve hücresel ağ üzerinden gönderilen SMS'lerden kaçınılmalı; bunun yerine Signal ve SimpleX gibi uçtan uca şifrelenmiş mesajlaşma platformları tercih edilmelidir.

Geleneksel telekomünikasyon altyapısı tarihsel olarak güvensizdir ve kullanıcı gizliliğini korumak amacıyla tasarlanmamıştır. Bu sistemi, yetkisiz bir erişim elde edildiğinde ağ üzerinde geniş bir denetim imkanı sunan kapalı bir ağ olarak düşünebilirsiniz. Bu tür erişimler ticari olarak satın alınabilmekte; telefon görüşmelerinin, SMS'lerin ve bazı durumlarda konum verilerinin takip edilmesini mümkün kılmaktadır. Saldırganların bu bilgilere erişmesi için SIM kartın benzersiz IMSI tanımlayıcısını elde etmesi yeterlidir ve bu tanımlayıcı genellikle telefon numaranız üzerinden tespit edilebilir. Bu yöntemle saldırganlar, telefonunuzda herhangi bir uyarı belirmeden iki faktörlü doğrulama kodlarını (SMS) ele geçirebilir.

Cihaz hücresel ağa bağlanırken hem SIM kart kimliğini hem de hücresel modem donanımına ait bilgileri ağa iletir. Telefonu ve SIM kartı anonim olarak satın almış olsanız dahi, donanım kimliği (IMEI) ağ tarafında kaydedildiği için yalnızca SIM kartı değiştirmek yeni bir kimlik elde etmek için yeterli değildir.

Cihaza SIM kart takmak yerine harici bir mobil Wi-Fi (hotspot) cihazı kullanılması düşünülebilir. Ancak bu durum gizliliği kısmen artırsa da güvenliği olumsuz etkileyecektir. Bu tür harici cihazlar genellikle yetersiz donanımsal yalıtıma sahiptir ve Pixel modellerinin izole hücresel modem donanımına kıyasla güncelleme desteği açısından çok geridedir. Bu durum, saldırganların harici cihazı ele geçirerek telefonunuza saldırmasını kolaylaştırır.

Bu harici cihazların bazıları, IMEI numarasını (donanım tanımlayıcısını) rastgele değerlerle değiştirmeye olanak tanır. Bu sayede aynı cihazı kullanmaya devam ederken yeni bir SIM kart ile birlikte IMEI numarasını da değiştirerek ağda yeni bir kimlik edinebilirsiniz. Ancak IMEI'nin, hücresel modemler tarafından iletilen tek donanım tanımlayıcısı olmadığını bilmeniz gerekir; üstelik değiştirilmiş tanımlayıcılara rağmen bu cihazların ağ üzerinden tespit edilmesini sağlayabilecek çeşitli yöntemler bulunmaktadır. Ayrıca sıra dışı IMEI değişiklikleri ağ operatörlerinin dikkatini çekerek şüphe uyandırabilir.

GrapheneOS ekibi, hücresel ağ erişimi için ikincil bir cihaz kullanılmasını önermez. Böyle bir yapı kurulacaksa dahi GrapheneOS yüklü ikinci bir Pixel modelinin tercih edilmesi daha güvenlidir. Wi-Fi üzerinden internet paylaşımı (tethering) yapıldığında, yakındaki kişilerin Wi-Fi sinyallerini analiz ederek hareketlerinizi takip edebileceği unutulmamalıdır.

**Uçak modu ne olacak?**

Uçak modu, cihazın hücresel modem iletimini, alımını ve hücresel takibi tamamen kapatmanın tek yoludur. Uçak modu açıldıktan sonra hücresel şebeke kapalı tutularak Wi-Fi bağlantısı tekrar etkinleştirilebilir. Cihazı yalnızca Wi-Fi üzerinden kullanmayı planlıyorsanız, yanlışlıkla hücresel şebekeyi açmamak için hızlı ayarlar panelindeki uçak modu düğmesini kaldırmayı düşünebilirsiniz.

Hücresel şebekenin, operatör hizmetlerinin kullanılabileceği tek kanal olmadığı unutulmamalıdır. Wi-Fi üzerinden arama (VoWi-Fi) ve mesajlaşma özellikleri de mevcuttur. SIM kartın operatörle kimlik doğrulamasını ve internet bağlantıları üzerinden ağ servislerini kullanmasını önlemek için SIM kart profili veya hattın kendisi sistem ayarlarından kapatılmalıdır.

Yeni nesil cihazlar, kayıp telefonları bulmak için tasarlanmış özel çevrimdışı takip sistemleri barındırır. GrapheneOS bu takip ağlarını desteklemez ve gelecekte de desteklemeyecektir. Sinyal takibinden tamamen kaçınmak için cihaz kullanılmadığı zamanlarda bir Faraday çantasında saklanabilir.

**Sadece veri SIM'leri ne olacak?**

Gizlilik açısından yalnızca veri odaklı (data-only) bir SIM kart kullanılması durumu değiştirmez; zira hücresel şebekede kimlik doğrulamanız devam eder. Ancak geleneksel çağrı ve SMS işlevlerinin bulunmaması, potansiyel güvenlik açıklarına karşı saldırı yüzeyini daraltır. GrapheneOS, gelecekte standart SIM kartları yalnızca veri hattı gibi çalıştıracak yazılımsal engeller getirmeyi planlamaktadır.

**VPN kullanmak ne olacak?**

VPN kullanmanın, operatör tabanlı sesli aramalar veya SMS'ler üzerinde herhangi bir etkisi yoktur. Bu işlevler, hücresel şebeke yerine Wi-Fi bağlantısı tercih edilse dahi VPN tünelinden geçmez. Ancak VPN araçları, diğer saldırı türlerine karşı korunmak ve internet trafiğini maskelemek için kritik önem taşır. Güvenilir VPN sağlayıcıları seçilmeli veya kişisel olarak barındırılan bir VPN hizmeti tercih edilmelidir (VPN kurulumuna dair hazırladığımız [kılavuza](https://b4.lol/tr/vpn) göz atabilirsiniz).

**Veri tasarrufu modu ne olacak?**

Veri Tasarrufu modunun tüm profillerde etkinleştirilmesi, uygulamaların arka planda hücresel veri tüketmesini engeller. Ancak ön planda aktif olarak çalışan veya bildirim panelinde kalıcı yer edinen servisler bu kısıtlamadan etkilenmez. Mobil veri kullanımını uygulama bazında kısıtlamak da mümkündür; ancak bu ayarlar tek başına sistem güvenliğini artıran kritik korumalar değildir.

**SIM olmadan kullanmak ne olacak?**

Cihazda SIM kart bulunmadığında uçak modu açık değilse, telefon hücresel baz istasyonlarına bağlanmaya devam eder ancak bir kimlik doğrulaması yapmaz ve donanım bilgilerini paylaşmaz. Bu durumdayken dahi acil durum aramaları yapılabilir ve acil durum uyarıları alınabilir.

> Acil durum araması yapmanın cihazınızın radyo tanımlayıcılarını paylaşacağını unutmayın.

**Acil durum uyarıları ne olacak?**

Acil durum uyarıları, SIM kart takılı olmasa dahi baz istasyonuna bağlı tüm cihazlara iletilir. Yalnızca uçak modunun açılması bu uyarıları engeller. GrapheneOS herhangi bir resmi kurum düzenlemesine bağlı olmadığından, en yüksek öncelikli uyarıları dahi kapatma seçeneği sunmaktadır. Acil durum uyarılarının, konum takibine veya veri sızdırılmasına yol açmadığı unutulmamalıdır.

### Uygulama İstismarlarına Karşı Koruma

Cihazı dış tehditlere karşı korumanın yanı sıra, yüklü uygulamaların sistemi içeriden sabote etmesini önlemek de kritik önem taşır. Android işletim sisteminde uygulamalar yalıtılmış alanlarda (sandbox) çalışarak yalnızca izin verilen kaynaklara erişebilir. Zararlı yazılımlar, işlevleriyle ilgisiz izinler talep edebilir veya yalıtılmış alandan kaçmaya (escape) çalışabilir. Çoğu zaman uygulamanın kendisi doğrudan zararlı olmasa da barındırdığı bir açık veya sunucu tarafındaki bir sızıntı, kullanıcı güvenliğini tehlikeye atabilir.

Ayarlardaki *'Uygulama İstismarı Koruması'* (Exploit Protection) bölümünde, uygulamaların yalıtılmış alandan sızmasını zorlaştıran çeşitli güvenlik ayarları yer alır. Bunların bir kısmı, uyumluluk sorunlarına veya çökmelere yol açabileceği için varsayılan olarak kapalı gelir. Bu korumaları genel olarak açmak ve yalnızca sorun yaşayan uygulamalar için seçici olarak kapatmak daha güvenli bir yaklaşımdır.

Sistemde varsayılan olarak etkin gelen korumalar da bulunur. Derleme performansını ve güvenliği optimize etmek için GrapheneOS, çalışma anında derleme (just-in-time) yerine önceden derleme (ahead-of-time) yöntemiyle uygulamaları çalıştırır. Bu yöntem pil ömrünü ve uygulama performansını artırırken önemli bir güvenlik bariyeri oluşturur. Ancak uygulamanın kurulması ve güncellenmesi standart Android sürümlerine göre daha uzun sürebilir.



### İzinler

Standart Android sürümlerinde izin denetimleri yalnızca Kamera, Mikrofon, Vücut Sensörleri ve Fiziksel Aktivite erişimleri için mevcuttur. İvmeölçer, jiroskop, pusula, barometre ve termometre gibi donanımsal sensörlere erişim izni ise uygulamalara varsayılan olarak doğrudan verilir. GrapheneOS, bu sensörlere erişimi engelleyen ek bir güvenlik seçeneği sunar. Bu kısıtlama, sensör verilerine bağımlı uygulamalarda çökmelere yol açabileceğinden varsayılan olarak açık gelmez. Özellik etkinleştirildiğinde, bir uygulama sensörlere erişmek istediğinde bildirim gösterilir ve seçici olarak izin verilmesi sağlanır.

Standart Android sürümlerinde tüm uygulamalara doğrudan verilen bir diğer izin ise internet/ağ erişimidir. Bu erişim, cihaz içi yerel ağ bağlantılarını da kapsar ve bazı durumlarda kullanıcı profili sınırlarını aşarak farklı profillerdeki uygulamaların birbiriyle haberleşmesi amacıyla suistimal edilebilir. GrapheneOS üzerinde bir uygulama yüklenirken ağ erişim izni isteğe bağlı olarak sunulur. Ağ izni kapatıldığında GrapheneOS, uygulamaya internet bağlantısı yokmuş gibi davranarak veri sızdırılmasını önler.

Uygulama istismarı korumalarında olduğu gibi, diğer izinleri de istediğiniz zaman uygulamalardan geri alabilirsiniz. Ancak varsayılan olarak yüklü gelen sistem uygulamalarının izinlerini kapatırken dikkatli olunmalıdır; zira bu durum sistem kararlılığını etkileyebilir.

Özellikle ağ erişimi (yalnızca internete ihtiyaç duyan uygulamalara izin verilmelidir), konum (GPS), dahili depolama, kamera ve mikrofon izinleri dikkatle yönetilmelidir. İzin ayarları belirli aralıklarla gözden geçirilerek gereksiz yetkiler sınırlandırılmalıdır.

### Kısıtlı erişim (storage scope)

Bazı popüler uygulamalar, kişi listesi veya tüm dosyalara erişim gibi kapsamlı izinler talep edebilir. GrapheneOS'un 'Storage Scopes' (Depolama Kapsamları) ve kişi sınırlama özellikleri, uygulamaya yalnızca sizin seçtiğiniz dosyaları veya kişileri gösterirken, uygulamanın tüm sisteme eriştiğini sanmasını sağlar.

Kişi sınırlama özelliği etkinleştirildiğinde, uygulama rehberi boş olarak görür; ardından seçtiğiniz belirli kişileri veya grupları uygulamayla paylaşabilirsiniz. Bu sayede rehberin tamamı yerine yalnızca gerekli kişilerin paylaşılması sağlanır.

Uygulamalara tüm depolama birimine erişim izni vermek yerine depolama kapsamı (Storage Scopes) açılabilir. Bu durumda uygulama, yalnızca kendisinin oluşturduğu veya sizin manuel olarak seçtiğiniz dosya/klasörleri görebilir; diğer uygulamaların verilerine erişemez.

GrapheneOS ekibi; konum, kamera ve mikrofon gibi diğer hassas donanımlar için de benzer kapsamlı ve sınırlı erişim özellikleri geliştirmeyi planlamaktadır.

### Mikrofon ve Kamera Anahtarları

Standart Android sürümlerinde de yer alan, mikrofon ve kamera erişimlerini sistem düzeyinde kapatan kontrol anahtarları hızlı ayarlar panelinde mevcuttur.

Bu donanımları sistem genelinde kapatıp yalnızca ihtiyaç anında açmak güvenli görünse de, kilit ekranından hızlıca fotoğraf çekmek veya bir aramayı yanıtlamak istediğinizde pratikliği olumsuz etkiler. Donanım anahtarlarını açmak için ekran kilidinin açılması gerektiğinden arayan kişi aramayı sonlandırabilir. Bu nedenle mikrofon ve kamera erişimlerini sistem genelinde açık bırakarak izinleri uygulama bazında ('Kullanırken izin ver' veya 'Her seferinde sor' şeklinde) yapılandırmak daha kullanışlı bir yöntemdir.

Bu sensörlere kesinlikle ihtiyaç duymayacağınızdan eminseniz, mikrofon ve kamera donanımları fiziksel olarak sökülmüş özel cihazları da tercih edebilirsiniz; ancak bu tür modifikasyonlar yüksek işçilik gerektirdiğinden maliyetleri oldukça yüksektir.

### Sistem Güncellemeleri

GrapheneOS güncellemeleri arka planda otomatik olarak indirilip kurulur. Güncellemenin uygulanması için cihazın yeniden başlatılması gerekir. İşletim sisteminin güncellenmiş sürümle açılmasında bir sorun yaşanırsa sistem otomatik olarak çalışan eski sürüme geri döner.

Güncelleme sonrası otomatik yeniden başlatmalar desteklense de aramaların bölünmemesi adına varsayılan olarak kapalıdır. Güncellemelerin hücresel veri paketini tüketmesini engellemek için sistem güncelleyici ayarlarından yalnızca sınırsız ağların (Wi-Fi) tercih edilmesi önerilir. Güncellemelerin hareket halindeyken pil tüketimini artırmasını önlemek için 'Cihazın şarj olması gerekir' seçeneği de açılabilir.



Sistem Güncelleyici uygulaması kapatılarak otomatik güncellemeler tamamen engellenebilir; ancak güvenlik açıklarının kapatılması ve kararlılık yamalarının alınması adına bu özelliğin açık tutulması kesinlikle tavsiye edilir.

Bazı kullanıcılar gelecekteki güncellemelerin sisteme güvenlik açıkları veya arka kapılar ekleyebileceğinden endişe duyabilir. Bu tür riskleri önlemek adına güncellemelerin hem istemci hem de önyükleme aşamasında doğrulanan kriptografik imzalar barındırması zorunludur. Ayrıca sürüm düşürme (downgrade) saldırıları da sistem tarafından engellenir.

GrapheneOS projesi ayrıca, yürürlükteki yasaların yalnızca belirli kullanıcıları hedef alabileceğini ve tüm GrapheneOS cihazlarına kötü amaçlı bir güncelleme yayınlanmasını zorlayamayacağını savunmaktadır. Güncelleme istemcisi, güncelleme talep ederken benzersiz bir cihaz bilgisi iletmediğinden, GrapheneOS'un belirli bir kullanıcıya arka kapılı güncelleme göndermesi teknik olarak mümkün değildir. Ancak güncelleme sunucusu, talepte bulunan cihazın IP adresini görebilir; bu durum bir VPN veya Tor kullanılarak maskelenebilir.

### Yedeklemeler

GrapheneOS, verileri yedeklemek veya başka bir cihaza aktarmak amacıyla *Ayarlar > Sistem > Yedekleme* kısmında yerleşik [Seedvault](https://github.com/seedvault-app/seedvault) aracını sunmaktadır. İkincil kullanıcı profilleri kullanılıyorsa, bu özelliğin her profil için ayrı ayrı yapılandırılması gerektiği unutulmamalıdır. Signal veya Molly gibi bazı uygulamalar, yalnızca kendi içlerinden gerçekleştirilebilen özel veri tabanı şifrelemeleri kullanır. Yedeklemeleri saklamak için bir USB sürücü kullanılması planlanıyorsa, yaygın bir yöntem olarak yedekleme önce dahili depolamada oluşturulmalı, işlem tamamlandıktan sonra harici sürücüye taşınmalıdır.

Seedvault yedeklemelerinin tüm dosyaları kapsamayabileceği bilinen bir sorundur. Bu nedenle, kritik dosyaların yedeği için yalnızca Seedvault'a güvenilmemelidir. Önemli verilerin ayrıca bir bilgisayara (USB bağlantısı üzerinden 'Dosya Aktarımı' seçeneğiyle) yedeklenmesi önerilir. Bu bağlantının da her kullanıcı profili için ayrı ayrı kurulması gerekecektir. GrapheneOS ekibi gelecekte Seedvault'u daha güvenilir bir alternatifle değiştirmeyi planlamaktadır, ancak şu anda öncelikli diğer konular üzerinde çalışılmaktadır.

## İkincil Kullanıcı Profilleri {#profili-utente-secondari}

Kullanıcı profilleri, aynı cihazın birden fazla kişi tarafından paylaşılmasına veya tek bir kullanıcının cihazında yalıtılmış bölümler oluşturulmasına imkan tanır. Aşağıda, uygulamaları birbirinden izole etmek ve kullanıcı verilerini bölümlere ayırmak için bu özelliğin nasıl kullanılacağı ele alınacaktır. Ancak uygulama yalıtımının (sandboxing) sağladığı güvenlik ve yukarıda değinilen 'Storage Scopes' özelliğinin sunduğu bölümlendirmenin pek çok kullanıcı için zaten yeterli olacağını belirtmek gerekir.

Yeni bir GrapheneOS kurulumunda, çoklu profil özelliği varsayılan olarak kapalıdır. Cihaz açılıp kilit açıldığında doğrudan ana kullanıcı olan 'Owner' (Sahip) profiline erişilir. Owner profili, Linux işletim sistemlerindeki yetkili 'root' kullanıcısı ile karıştırılmamalıdır. Owner profili cihaz üzerinde diğer kullanıcılara göre daha fazla yönetimsel yetkiye sahip olsa da, sıradan uygulamalar hem Owner hem de diğer kullanıcı profillerinde aynı kısıtlamalara tabidir.

Her profil, kendi ekran kilidi yöntemiyle korunan bağımsız anahtarlarla şifrelenir. Owner profilinin özel bir durumu vardır; zira sadece kendi verilerini değil, sisteme dair genel hassas verileri de barındırır. Bu nedenle, ikincil kullanıcı profillerine geçiş yapabilmek için öncelikle Owner profilinin kilidi en az bir kez açılmış olmalıdır. Owner profili ve bu profildeki uygulamalar, ikincil bir profile geçildiğinde de arka planda çalışmaya devam eder. Ancak, Owner profili diğer profillerde saklanan verilere erişemez.



### Profiller Arası Bildirimler

Arka planda çalışan diğer profillerden bildirim alınabilmesi önemli bir kolaylıktır. Bildirim içeriğinde yalnızca hangi profilde ve hangi uygulamada bildirim oluştuğu bilgisi gösterilse de bu özellik, ikincil kullanıcı profilleriyle sağlanan kullanıcı deneyimini önemli ölçüde artırmaktadır.

### Kullanım Örnekleri

Farklı kullanıcı profili türlerine değinmeden önce, yalnızca Owner profilini kullanmak yerine çoklu profil yapısını tercih etmenin avantajlarını ele alalım.

Öncelikle, yeni bir profil oluşturulduğunda cihaz tamamen sıfırlanmış gibi görünür. Halihazırda Owner profilinde kurulu olan uygulamalar bu yeni profilde yer almaz, her şey temiz bir şekilde başlar. Bu durum, aynı uygulamanın farklı hesaplarına erişmek istendiğinde oldukça yararlıdır. Örneğin, birden fazla hesap desteklemeyen bir mesajlaşma uygulamasını farklı profillerde ayrı ayrı kurarak kullanabilirsiniz.

Uygulamaları farklı profillerde çalıştırmak, birbirleriyle veri paylaşmalarını ve iletişim kurmalarını engeller. Örneğin, bir platformun ana uygulaması ile mesajlaşma uygulaması aynı profilde yüklüyse aralarında veri alışverişi yapabilirler; ancak farklı profillerde yer alıyorlarsa bu tür bir iletişim teknik olarak mümkün değildir.

Owner profilinde arka planda çalışan uygulamalar, manuel olarak durdurulmadığı sürece etkin kalır. Nadiren kullanılan uygulamaları ikincil bir kullanıcı profilinde çalıştırmak daha mantıklıdır. Bu profildeki işlemler tamamlandığında, oturum sonlandırılarak tüm uygulamaların kapatılması ve verilerin yeniden şifrelenmiş ('dinlenme' - At Rest) durumuna getirilmesi sağlanabilir.

Kullanıcı profilleri geçici olarak oluşturulup iş bitiminde silinebilir. Bir profildeki uygulamalar diğer profillerin varlığından habersizdir. Bu yapı, web tarayıcılarındaki gizli mod işlevine benzetilebilir. Her profilin dosya sistemi diğerlerinden tamamen bağımsızdır.

Otomatik Yeniden Başlatma özelliği, cihazın şifrelenmiş konumda kalmasını ve fiziksel erişim durumunda şifresi çözülmüş verilere ulaşılamamasını sağlar. Günlük kullanım için Owner profili yerine ikincil bir profil tercih edilirse güvenlik seviyesi artar: Owner profilinin verilerini 'dinlenme' durumuna getirmek için cihazın yeniden başlatılması gerekirken, ikincil bir profilin oturumunu sonlandırmak aynı güvenliği yeniden başlatmaya gerek kalmadan sağlar.

Profillerin en büyük avantajı, farklı gizlilik/güvenlik gereksinimlerine ve ağ yapılandırmalarına sahip yalıtılmış ortamlar oluşturabilmesidir. Örneğin, bir profilde Invizible Pro ile tamamen Tor ağını kullanırken, bir diğerinde WireGuard ile VPN tercih edebilir, üçüncü bir profili ise doğrudan (clearnet) internete açık bırakabilirsiniz.

### Kullanıcı Profili Sayısı

GrapheneOS, ikincil kullanıcı profili sınırını 4'ten 32'ye yükseltmektedir (bu profillerden biri misafir kullanıcı için ayrılmıştır). Ancak bu kadar çok profil oluşturulabilmesi, hepsinin aynı anda çalışabileceği anlamına gelmez; çünkü bu durum cihaz performansını olumsuz etkileyecektir. GrapheneOS, maksimum eş zamanlı profil sınırını cihazın RAM kapasitesine göre belirler.

| | Pixel 9 Pro Fold | Pixel 9 Pro XL | Pixel 9 Pro | Pixel 9 | Pixel 8 Pro | Pixel 8 & 8a |
| ------- | ---------------- | -------------- | ----------- | ------- | ----------- | ------------ |
| RAM | 16 GB | 16 GB | 16 GB | 12 GB | 12 GB | 8 GB |
| Profil | 14 | 14 | 14 | 10 | 10 | 6 |

### Kullanıcı Profilleri: İleri Düzey Yapılandırmalar

Arka planda çalışması gerekmeyen profiller için Owner profili üzerinden *'Arka planda çalışmaya izin ver'* seçeneği kapatılabilir. Bu sayede, oturumu manuel olarak sonlandırmaya gerek kalmadan, başka bir profile geçildiğinde önceki profil otomatik olarak askıya alınır; bu da RAM, işlemci ve pil tasarrufu sağlar.



### Profiller Arası Uygulama Kurulumu

Farklı kullanıcı profillerinin diğer profillerden uygulamaları güncelleyebilmesi veya Owner profilindeki bir uygulamayı ikincil bir profile yükleyebilmesi şaşırtıcı gelebilir. Dosya sistemlerinin yalıtılmış olmasına rağmen bu mümkündür; zira her profil tamamen ayrı bir işletim sisteminde çalışmaz. Uygulama kodları, sistem kaynaklarını korumak amacıyla profiller arasında güvenli bir şekilde paylaşılabilmektedir.

Uygulamaları profiller arasında klonlamaya ek olarak, her profil içinde ayrı ayrı uygulama mağazaları kurmak da mümkündür.

### Dezavantajlar

İkincil kullanıcı profillerini aktif olarak kullanmanın bazı zorlukları bulunmaktadır. Örneğin, Otomatik Yeniden Başlatma özelliği tüm kullanıcı oturumlarını sonlandırır ve öncelikle Owner profilinin kilidinin açılmasını zorunlu kılar. Bu durum, ikincil profillerdeki uygulamaların durdurulacağı ve o profile tekrar giriş yapılana kadar bildirim alınamayacağı anlamına gelir.

Dosya sistemleri tamamen yalıtılmış olduğundan, bir profildeki görsel veya dosyayı diğer profildeki bir uygulamaya doğrudan aktarmanın kolay bir yolu yoktur. Yaygın çözümler arasında Cryptomator gibi araçlarla bulut tabanlı dosya senkronizasyonu veya bir mesajlaşma uygulaması üzerinden dosya paylaşımı yer alsa da bunlar gizlilik açısından en iyi yöntemler olmayabilir. Syncthing veya yerel bir FTP sunucusu/istemcisi ile dosya senkronizasyonu kurulabilse de yapılandırmaları karmaşık gelebilir.

SMS doğrulaması gerektiren ikincil profillerde uygulama kurulumu yaparken, o profil için geçici olarak *'Telefon görüşmelerini ve SMS'i etkinleştir'* seçeneğinin açılması gerekebilir.

### Private Space (Özel Alan)

Özel Alan (Private Space), Android işletim sistemine eklenen yeni bir özelliktir. Teknik olarak Owner profili içine yerleştirilmiş ikincil bir kullanıcı profili gibi çalışır: Alan kilitlendiğinde bu özel profil durdurulur, kilidi açıldığında ise yeniden başlatılır. Owner profiliyle paylaşılan pano (kopyalama alanı) hariç, verileri ikincil bir kullanıcı profili gibi yalıtılmıştır.

Özel Alan kullanmanın ikincil bir profile göre avantajı, alan kilidi açıkken bildirimlerin ve ayarların ana arayüzle bütünleşik olarak gösterilmesidir. İkincil profillerde yalnızca hangi uygulamanın bildirim gönderdiği gösterilirken, Özel Alan bildirimleri Owner profilinde detaylı olarak görüntülenebilir. Bu durum yalıtım düzeyini biraz azaltsa da günlük kullanım kolaylığını artırır.

31 adede kadar oluşturulabilen ikincil profillerin aksine, cihazda yalnızca bir Özel Alan oluşturulabilir ve bu alan Owner profilinin bir parçası olmak zorundadır. GrapheneOS Özel Alan özelliklerini geliştirmeyi planlamaktadır. Özel Alan kullanıcısı standart kullanıcı yönetimi arayüzünde listelenmez; bu nedenle Owner profilindeki uygulamaları Özel Alan'a doğrudan kopyalama seçeneği sunulmaz. Ayrıca Özel Alanı kilitlemek, ikincil profildeki oturumu sonlandırmak gibi şifreleme anahtarlarını bellekten silmez.

Tam kullanıcı profillerine kıyasla Özel Alanın bir dezavantajı, bu alana *'telefon görüşmeleri ve SMS'* erişimi verilememesidir. Bu durum, SMS doğrulamasını engeller ve bazı uygulamaların kullanımını sınırlar.

### Work Profile (İş Profili)

İş Profilleri (Work Profile), kullanıcı deneyimi açısından Özel Alan özelliğine benzer. Bu özellik aslen kurumsal BYOD (Kendi Cihazını Getir) sistemleri için tasarlanmış olduğundan profili oluşturmak için ayrı bir cihaz yönetim uygulaması gerekir. Bu yönetici uygulama ve dolaylı olarak bağlı olduğu şirket, İş Profili içindeki verilerin denetimine ve sahipliğine sahiptir. Ancak harici bir sunucu bağlantısı olmadan İş Profili oluşturulmasına ve yönetilmesine olanak tanıyan [Shelter](https://f-droid.org/en/packages/net.typeblog.shelter/) gibi yerel yönetim araçları mevcuttur. Her durumda, İş Profili kullanmak için açık kaynaklı olsa da üçüncü taraf bir uygulamaya güvenmeniz gerekecektir.

Özel Alan özellikleri daha iyi yalıtıma, daha güçlü şifrelemeye ve Owner profiliyle daha başarılı arayüz entegrasyonuna sahiptir. İş Profili yöneticileri, ana profil ile İş Profili arasında geniş bir veri alışverişine izin verebilir. Örneğin, İş Profilleri profiller arası uygulama iletişimini engellemez; bu durum kullanım kolaylığını artırsa da gizlilik ve güvenliği olumsuz etkileyebilir.

Genel olarak bu araçlar oldukça kullanışlıdır; ihtiyaç duymuyorsanız kullanmamak güvenlik ve gizlilik açısından en doğrusudur. Ancak aynı anda iki farklı kimliği (örneğin iş ve özel hayat) ayırmanız gerekiyorsa son derece uygun bir seçenektirler.

### VPN

VPN kullanımı için en iyi yöntem, her kullanıcının/profilin farklı bir çıkış IP adresi alması amacıyla ayrı bir VPN bağlantısına sahip olmasıdır. Bu doğrultuda tüm profiller (İş Profilleri ve Özel Alan dahil) kendi VPN yapılandırmalarını barındırır. Bu durum, dış aktörlerin aynı IP adresi üzerinden profilleri birbiriyle ilişkilendirmesini önler.

*'Her zaman açık VPN'* ve *'VPN olmadan bağlantıları engelle'* seçenekleri etkinleştirilerek bir profilin doğrudan internete çıkması önlenebilir. GrapheneOS, VPN tünelinin dışına veri sızmasını önlemek amacıyla Android altyapısında pek çok iyileştirme gerçekleştirmiştir.

Günümüzde GrapheneOS projesi, yalnızca resmi WireGuard uygulamasını (herhangi bir ticari veya kişisel barındırılan VPN ile kullanılabilir) ve Mullvad istemcisini kullanmayı önermektedir.

## Uygulamalar {#applicazioni}

Yeni bir GrapheneOS kurulumu minimum sayıda uygulama ile gelir. Sisteme varsayılan olarak daha fazla uygulama eklemek saldırı yüzeyini genişletir. GrapheneOS, uygulama seçimini tamamen kullanıcının tercihine bırakır. Geliştirici ekip, doğrudan gizlilik ve güvenlik iyileştirmelerine odaklanmıştır; sisteme ek uygulamalar dahil etmek bu hedeflerle çelişecektir. Ayrıca üçüncü taraf uygulama ve servislerin entegrasyonundan da kaçınılmaktadır.

Sistemle birlikte gelen az sayıda araç arasında GrapheneOS'un kendi 'Uygulama Mağazası' (App Store) da yer alır. Bu mağaza, doğrudan GrapheneOS projesi tarafından geliştirilen uygulamaları veya güvenlik yönünden güçlendirilmiş açık kaynaklı sürümleri dağıtmayı amaçlar. Üçüncü taraf uygulamaların ise GrapheneOS'un desteklediği bağımsız mağaza olan Accrescent aracılığıyla kurulması hedeflenmektedir.

### Önceden Kurulu Uygulamalar

GrapheneOS'ta önceden yüklü gelen uygulamaların bir kısmı standart AOSP (Android Açık Kaynak Projesi) kaynaklıdır ve tasarım/işlevsellik açısından oldukça sadedir. Google zamanla bu uygulamaların açık kaynaklı sürümlerini geliştirmeyi bırakıp kendi kapalı kaynaklı modern versiyonlarına geçmiştir. GrapheneOS bu temel uygulamaları güncellemeyi planlamaktadır, ancak alternatif uygulamalarda lisanslama sorunları yaşanabilmektedir.

Google Kamera, Galeri ve Klavye gibi uygulamaları kullanmayı tercih ediyorsanız, internet erişimlerini kapatarak ve veri toplama izinlerini vermeyerek bu uygulamaları güvenle kullanabilirsiniz. Standart Android araçlarından bazıları (Markup ve Termometre gibi) GrapheneOS Uygulama Mağazası üzerinden edinilebilir.

GrapheneOS'un kendi geliştirdiği temel uygulamalar güvenlik ve gizlilik odaklı olarak optimize edilmiştir. Örneğin varsayılan kamera uygulaması çekilen fotoğraflardaki konum ve cihaz gibi meta verileri (EXIF) otomatik olarak temizler. Ayrıca tüm uygulamalar yalnızca çalışmak için gereken minimum izinleri talep eder.

### Kamera

GrapheneOS Kamera uygulaması modernize edilmiş, gizlilik ve güvenlik odaklı bir yapıya sahiptir. Fotoğraf, video ve QR/barkod tarama modları sunar. HDR+, Gece modu, çoklu kamera yakınlaştırma desteği ve dijital sabitleme (EIS) gibi özellikleri barındırır. Standart Android sürümlerine kıyasla fotoğraf kalitesinde herhangi bir kayıp yaşanmaz.

Ancak bu uygulama, orijinal 'Pixel Kamera' uygulamasının sunduğu bazı özel yazılımsal özellikleri barındırmaz. Google Kamera uygulaması, GrapheneOS üzerinde tüm lenslerden ve görüntü işleme donanımlarından tam performansla yararlanabilir. Güvenliği korumak amacıyla Google uygulamalarının donanım hızlandırıcılarına erişimi ek bir denetim anahtarı ile sınırlandırılmıştır; bu ayar varsayılan olarak açık gelse de herhangi bir veri paylaşımına neden olmaz.

Daha yüksek kaliteli fotoğraflar ve Pixel yazılım desteği isteniyorsa Google Kamera uygulaması kurulup ağ erişim izni (Network Permission) kapatılarak güvenle kullanılabilir.

### Galeri

GrapheneOS, mevcut varsayılan Galeri uygulamasını ileride değiştirmeyi planlamaktadır. Güçlü bir açık kaynaklı alternatif arayanlar için GrapheneOS geliştiricileri [IacobIonut01/Gallery](https://github.com/IacobIonut01/Gallery/blob/main/README.md) ve [Aves](https://github.com/deckerst/aves/blob/develop/README.md) uygulamalarını önermektedir. Ayrıca açık kaynaklı [Fossify Gallery](https://fossify.org) de son derece başarılı bir alternatiftir.

### Klavye

GrapheneOS'un varsayılan klavyesi, Google'ın 2014 yılındaki açık kaynaklı klavye sürümüne dayanır. Bu sürümde imleç denetimi için kaydırma, tek el modu ve kaydırarak yazma gibi modern Gboard özellikleri yer almamaktadır.

Google'ın modern Gboard klavyesi en başarılı yazım araçlarından biridir. İnternet erişimi kapatılarak ve veri toplama seçenekleri devre dışı bırakılarak kullanılmasında sakınca yoktur. Aktif klavye uygulamalarının ekrandaki tüm girdilere ve pano (kopyalama) verilerine erişebileceği unutulmamalıdır.

Açık kaynaklı bir alternatif arayanlar için günümüzdeki en başarılı bağımsız klavyelerden biri olan [HeliBoard](https://github.com/Helium314/HeliBoard) önerilir. Florisboard veya FUTO Keyboard gibi diğer projeler de gelişim aşamasındadır.

Diğer bir seçenek ise internet erişimi engellenmiş olarak orijinal Gboard klavyesini kullanmaktır.

### Vanadium Tarayıcısı

GrapheneOS, güvenlik ve gizlilik yönünden optimize edilmiş Chromium tabanlı Vanadium tarayıcısını barındırır. Bu tarayıcı hem varsayılan web tarayıcısı olarak hem de diğer uygulamaların web içeriklerini görüntülemesinde (WebView) kullanılır. Geliştiriciler, tarayıcının ek eklenti veya ayar değişikliği yapılmadan varsayılan haliyle kullanılmasını önermektedir; zira ek modifikasyonlar tarayıcı parmak izinizi belirginleştirerek takibinizi kolaylaştırabilir. Web sitelerinin sensör verilerine erişmesini engellemek için Vanadium'un 'Sensörler' izni kapatılabilir.

Vanadium günlük kullanım için son derece güvenli ve hızlı bir tarayıcıdır. Mobil platformlarda güvenlik mimarileri yetersiz olduğu gerekçesiyle Firefox tabanlı mobil tarayıcıların kullanılması önerilmez.

## Uygulama Uyumluluğu

Günümüzde çok az sayıda Android uygulaması GrapheneOS ile uyumluluk sorunu yaşamaktadır. Bu sorunlar genellikle, işletim sisteminin Google tarafından sertifikalandırılmış olmasını şart koşan 'Play Integrity API' denetiminden kaynaklanır. Bu durum bazı bankacılık uygulamalarını ve konum tabanlı oyunları etkileyebilmektedir. İlgili denetimleri uygulayan servisler, alternatif işletim sistemlerinde çalışmayı engelleyebilir.

Bu durum ayrıca Google Pay (NFC) temassız ödemelerinin de çalışmasını engeller. Ancak temassız ödeme uyumluluğu bankadan bankaya değişiklik göstermektedir; bazı yerel bankacılık uygulamaları sorunsuz çalışırken bazıları çalışmayabilir. Temassız ödeme desteğinin her uygulama için ayrı ayrı test edilmesi gerekmektedir.

GrapheneOS, standart Android ile aynı güvenlik düzeyini sunmasına rağmen Google, cihazları güvenlik kriterlerine göre değil ticari lisans durumuna göre sertifikalandırır. Bu engelleri aşmak için bazı geçici çözümler bulunsa da bunlar zamanla kapatılabilmektedir. GrapheneOS ekibine göre tek kalıcı çözüm, bu tekelci yaklaşıma karşı yasal adımların atılmasıdır.

### Play Services'e Bağımlılık

Uygulama uyumluluğunun diğer bir boyutu da bazı sosyal medya ve mesajlaşma araçlarının Google Play hizmetlerine (Play Services) ihtiyaç duymasıdır. Pek çok uygulama, bildirim gönderebilmek için Google'ın bulut mesajlaşma altyapısına (FCM) bağımlıdır. Bazı uygulamalar kendi bildirim servislerini arka planda çalıştırsa da bu durum pil tüketimini artırabilir.

Örneğin Signal, Google Play hizmetleri olmadığında kendi bildirim mekanizmasını devreye sokar; fakat bu durum arka planda sürekli veri kontrolü yapacağı için pil tüketimini artırabilir. Google servislerinden bağımsız kullanım için optimize edilmiş [Molly](https://molly.im/) uygulaması iyi bir alternatiftir.

Google Play servislerine bağımlı olan uygulamalar için, resmi Google Play hizmetlerini sisteme ayrıcalıksız birer uygulama olarak (sandboxed) yükleyebilirsiniz. GrapheneOS'un sunduğu bu özel uyumluluk katmanı sayesinde Google Play, sistem dosyalarına veya cihaz kimliklerine erişemez ve sıradan bir uygulama gibi yalıtılmış olarak çalışır. Bu yapı, uygulama içi satın alımlar ve bildirimler dahil olmak üzere Google bağımlı uygulamaların sorunsuz çalışmasını sağlar.

Bu katmanı etkinleştirmek için GrapheneOS Uygulama Mağazası üzerinden 'Google Play services' paketini yüklemeniz yeterlidir. Bu işlem, gerekli diğer Google bağımlılıklarını da otomatik olarak kuracaktır. Play Store üzerinden uygulama edinmek veya Google hesabı gerektiren servisleri kullanmak için bir Google hesabı ile giriş yapabilirsiniz.

Google Play hizmetleri kurulduktan sonra bildirim panelinde *'Eksik isteğe bağlı izin'* uyarısı belirebilir. Bu uyarıya dokunarak Google servislerinin arka planda sürekli çalışmasına izin verebilirsiniz. Arka planda çalışma izni verilmesi bildirimlerin gecikmesini önler ancak pil tüketimini artırabilir. Bildirim önceliğinize göre bu ayarı düzenleyebilirsiniz.

Google servislerini sistem genelinden uzak tutmak istiyorsanız, bu servisleri yalnızca ihtiyaç duyduğunuz ikincil bir kullanıcı profiline veya İş Profiline yükleyerek ana profilinizi tamamen temiz tutabilirsiniz.

### Android Auto

Android Auto özelliği normal şartlarda sistem düzeyinde geniş yetkiler talep etse de GrapheneOS'un yalıtılmış uyumluluk katmanı sayesinde sınırlı yetkilerle çalıştırılabilmektedir. Android Auto uygulamasını GrapheneOS Uygulama Mağazası üzerinden kurarak kullanabilirsiniz.

Kurulumun ardından *Ayarlar > Uygulamalar > Sandboxed Google Play > Android Auto* menüsünden kablolu/kablosuz Android Auto bağlantı izinlerini etkinleştirebilirsiniz. Ses ve bildirimlerin araç ekranına yansıtılması için gerekli ek izinler de bu menüden düzenlenebilir. Android Auto'nun şu an için Özel Alan veya İş Profili altından çalışmadığı unutulmamalıdır.

### Obtainium ve App Verifier

Android platformunda uygulama kurulum paketleri geliştirici tarafından kriptografik olarak imzalanır. Uygulama yüklendikten sonra bu imza kaydedilir ve gelecekteki güncellemelerin de aynı imza ile onaylanması gerekir. 'İlk Kullanımda Güven' (Trust-On-First-Use - TOFU) adı verilen bu güvenlik yapısı, uygulamaların yetkisiz kaynaklardan güncellenmesini engeller.

Ancak bu yapı, uygulamanın ilk kez kurulurken doğru kaynaktan edinildiğini garanti etmez. Uygulama mağazaları, yükleme öncesinde geliştirici imzalarını doğrulayarak bu sorunu çözer. Ancak harici bir uygulama mağazası kullanmak sisteme ek bir güven zinciri eklediğinden, bağımsız güncelleme aracı olan Obtainium iyi bir alternatif sunar.

[Obtainium](https://github.com/ImranR98/Obtainium), Android uygulamalarını doğrudan resmi kaynaklarından (örneğin GitHub sürümleri sayfası) indirmenizi ve güncel tutmanızı sağlar. [AppVerifier](https://github.com/soupslurpr/AppVerifier) aracı ile birlikte kullanıldığında, kuracağınız uygulamanın orijinal geliştiriciye ait olup olmadığını doğrulayabilirsiniz. Bu yapı, merkezi uygulama mağazalarına olan bağımlılığı azaltır.



### Accrescent

[Accrescent](https://accrescent.app/), güvenlik odaklı mimariye sahip modern bir uygulama mağazasıdır. GrapheneOS Uygulama Mağazası üzerinden kurulabilir. F-Droid'e kıyasla daha güçlü bir güvenlik denetimi ve imza doğrulama altyapısı sunar.

Accrescent projesinin yaygınlaşması hedeflense de henüz geliştirme aşamasındadır. GrapheneOS ekibi, güvenlik zafiyetleri barındırdığı gerekçesiyle F-Droid yerine Accrescent'in geliştirilmesini desteklemektedir.

Accrescent, uygulamaların ilk kurulumlarını doğrulanmış imzalı üst verilerle güvence altına alarak manuel kontrol ihtiyacını ortadan kaldırır.

### F-Droid

[F-Droid](https://f-droid.org/), açık kaynaklı Android uygulamalarının dağıtıldığı en popüler platformlardan biridir. Ancak GrapheneOS ekibi, F-Droid'in güvenlik altyapısındaki zafiyetler ve uygulamaların orijinal geliştirici imzaları yerine F-Droid imzalarıyla derlenmesi gibi gerekçelerle bu platformun kullanılmasını önermemektedir.

Orijinal geliştirici imzası taşıyan paketlerin kullanılması güvenlik açısından daha avantajlıdır; zira imza anahtarının ele geçirilmesi, kaynak koda dışarıdan müdahale edilmesine kıyasla çok daha zordur.

F-Droid yerine, onun sunduğu kaynakları daha modern ve güvenli bir arayüzle sunan [Droidify](https://droidify.eu.org/) istemcisinin kullanılması önerilir.

Uygulama mağazası seçiminde her yöntemin güvenlik, gizlilik ve kullanım kolaylığı açısından farklı avantaj ve dezavantajları bulunur. İhtiyaçlarınıza en uygun yöntemi tercih edebilirsiniz.

### Play Store ve Aurora Store

Resmi Google Play Store, tescilli (kapalı kaynaklı) uygulamaları edinmek için en güvenli yöntemdir ancak gizlilik yönünden dezavantajları bulunur. Google Play Store ve Play hizmetleri, GrapheneOS üzerinde herhangi bir özel yetkiye sahip olmadığından yalıtılmış profillerde güvenle çalıştırılabilir.

[Aurora Store](https://f-droid.org/en/packages/com.aurora.store/), Google Play mağazasına erişim sunan açık kaynaklı alternatif bir istemcidir. Resmi Google uygulamasını kurmadan anonim hesaplar üzerinden uygulama indirmenizi sağlar. Ancak GrapheneOS ekibi, güvenlik zafiyetleri ve Google hesap engellemeleri nedeniyle Aurora Store yerine tek kullanımlık bir hesapla resmi Play Store uygulamasının kullanılmasını tavsiye eder.

GrapheneOS üzerinde Google servislerinin kullanılması bazı çevrelerce çelişkili bulunsa da GrapheneOS projesinin temel amacı kullanıcı deneyiminden ödün vermeden en üst düzeyde güvenlik ve gizlilik sunabilmektir. Google servisleri için sağlanan uyumluluk katmanı GrapheneOS'un en çok kaynak ayırdığı özelliklerden biridir. Tercih tamamen kullanıcıya aittir.

### Çeşitli mağazalar hakkında düşünceler

Obtainium son derece kullanışlı bir güncelleme aracı olsa da uygulama keşfetme özelliği barındırmamaktadır; yalnızca adresini bildiğiniz uygulamaları indirmenize imkan tanır.

Özetle açık kaynaklı uygulamalar için **Droidify**, tescilli uygulamalar için ise doğrudan resmi **Google Play Store** en güvenli seçeneklerdir.

Google Play Store en yüksek güvenlik denetimini sunsa da kişisel hesap ve veri paylaşımı gibi gizlilik ödünleri gerektirir. Kullanım amacınıza ve tehdit modelinize göre uygun mağazaları tercih edebilirsiniz.

## Sorunlar ve Çözümler

### Konum Belirleme Sorunları

Konum servisleri normal şartlarda Google Play hizmetleri tarafından sağlanır. GrapheneOS ise konum taleplerini doğrudan cihazın yerleşik uydu alıcısına (GNSS) yönlendirir. Bu durum, kapalı alanlarda konum tespitinin gecikmesine veya yapılamamasına neden olabilir.

Cihazda SIM kart ve internet bağlantısı aktifse konum bulma hızını artırmak amacıyla A-GPS (hücresel baz istasyonu yardımlı konumlandırma) kullanılır. GrapheneOS, bu konum istekleri sırasında IP adresinizin operatörlerle paylaşılmasını önlemek amacıyla kendi proxy sunucularını kullanır.

Konum hassasiyetini artırmak için *Ayarlar > Konum > Konum Servisleri* menüsünden Wi-Fi ve Bluetooth taramaları etkinleştirilebilir. Bu özellik, yakındaki kablosuz ağlar üzerinden konum tespitini kolaylaştırır.

Yalıtılmış Google Play hizmetleri üzerinden Google'ın konum belirleme servislerini kullanmak istiyorsanız, *Ayarlar > Uygulamalar > Sandboxed Google Play* menüsünden konum yönlendirme seçeneğini kapatıp gerekli izinleri Google Play hizmetlerine vermeniz gerekmektedir.

Konum doğruluğuna ihtiyaç duyulan uygulamaları yalnızca ikincil bir profilde çalıştırarak ana profilinizin gizliliğini korumaya devam edebilirsiniz.

### Çökmeler/Çalışmayan Uygulamalar

GrapheneOS üzerinde bazı uygulamaların uyumluluk sorunları yaşaması veya çökmesi beklenebilir bir durumdur. Bu sorunları çözmek için öncelikle uygulama önbelleğini temizlemek, uygulamayı durdurmaya zorlamak veya cihazı yeniden başlatmak gibi temel adımlar uygulanmalıdır.

GrapheneOS'a özgü çözüm adımları arasında ise ilgili uygulama için Exploit Protection (İstismar Koruması) ayarlarını seçici olarak kapatmak, uygulamayı Özel Alan dışında kurmak veya Google Play hizmetlerinin yüklü olduğu yalıtılmış bir profile taşımak yer alır.

### Uygulama Kurulmayı Reddediyor

Uygulama yükleme hataları genellikle, aynı uygulamanın farklı bir imza/kaynaklı sürümünün diğer bir kullanıcı profilinde zaten yüklü olmasından kaynaklanır.

### Destek İsteme

GrapheneOS topluluğu son derece aktiftir. Karşılaştığınız sorunların çözümleri için [discuss.grapheneos.org](https://discuss.grapheneos.org/) resmi forumunu ve resmi [Discord](https://discord.com/invite/grapheneos) kanalını ziyaret edebilirsiniz. Ayrıca Telegram, X ve Matrix üzerinde de resmi topluluk kanalları mevcuttur.

## Projeyi Destekleyin

Bu rehber sizler için yararlı olduysa, destek olmak amacıyla rehberi sosyal mecralarda veya Telegram gruplarında paylaşabilirsiniz <3

Sorularınız veya geri bildirimleriniz için admin@b4.lol e-posta adresi üzerinden iletişime geçebilirsiniz. Okuduğunuz için teşekkür ederiz!

---

## İlgili Kılavuzlar

- **[De-Google Android: Eksiksiz Gizlilik Kılavuzu](/tr/android)** - Herhangi bir de-google'lanmış Android telefon için tam yapılandırma
- **[Tehdit Modeli Nasıl Oluşturulur](/tr/threat-model)** - Savunma araçlarınızı seçmeden önce tehditlerinizi tanımlayın
- **[AdBlock ile Kendi Sunucunuzda VPN](/tr/vpn)** - GrapheneOS trafiğinizi kişisel bir VPN ile koruyun
- **[Tor Düğümü Eğitimi](/tr/tor)** - Anonim olarak gezinin ve Tor ağına katkıda bulunun

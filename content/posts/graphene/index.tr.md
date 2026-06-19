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
    answer: "Evet, şu anda GrapheneOS resmi olarak yalnızca Google Pixel cihazlarını destekliyor, çünkü doğrulanmış önyükleme ve memory tagging gibi gerekli donanım güvenlik gereksinimlerini karşılayan tek cihazlar bunlar."
  - question: "Gizlilik için bir Google telefonu kullanmak güvenli mi?"
    answer: "Evet. Pixel'ler Android geliştirme için referans cihazlardır, güvenlik araştırmacılarından büyük ilgi görürler ve kasıtlı arka kapı olduğuna dair hiçbir kanıt yoktur. GrapheneOS, Google servislerini kaldırır ve gelişmiş korumalar ekler."
  - question: "GrapheneOS için hangi Google Pixel'i seçmeliyim?"
    answer: "Maksimum güvenlik için en yeni desteklenen Pixel'ler önerilir. 2026'da önce Pixel 9/10 ve Pro versiyonlarına bakardım; Pixel 9a en mantıklı bütçe seçeneğidir. 16 GB RAM'li Pro modeller, birçok kullanıcı profili kullanmak isteyenler için idealdir."
  - question: "Android uygulamaları ve Google Play Services GrapheneOS'ta çalışır mı?"
    answer: "GrapheneOS, Google servislerine ihtiyaç duyan uygulamaları, özel ayrıcalıkları olmayan bir sandbox içinde izole tutarak kullanmanıza izin veren sandboxed Google Play Services'i destekler."
  - question: "GrapheneOS nasıl kurulur?"
    answer: "GrapheneOS, tarayıcıdan resmi web yükleyicisi aracılığıyla, komut satırından veya sistem önceden kurulu bir cihaz satın alarak kurulabilir."
  - question: "GrapheneOS'ta kullanıcı profilleri nedir?"
    answer: "Kullanıcı profilleri, aynı cihazda her biri kendi uygulamalarına ve ayrı ayrı şifrelenmiş verilerine sahip izole ortamlar oluşturmanıza izin verir. Kişisel, iş ve hassas etkinlikleri bölmelemek için kullanışlıdırlar."
  - question: "GrapheneOS düzenli güvenlik güncellemeleri alıyor mu?"
    answer: "Evet, GrapheneOS arka planda otomatik olarak indirilip kurulan çok sık güncellemeler alır. Bunları uygulamak için sadece cihazı yeniden başlatmanız gerekir."
howto:
  name: "GrapheneOS nasıl seçilir, kurulur ve yapılandırılır"
  description: "Uyumlu bir Pixel seçme, GrapheneOS kurma, güvenli önyüklemeyi doğrulama ve profilleri, uygulamaları ve gizlilik ayarlarını yapılandırma için pratik prosedür."
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
      text: "Doğrulanmış önyükleme anahtarı hash'ini kontrol edin ve kurulu sistemin gerçek olduğunu onaylamak için Auditor'ı kullanın."
      url: "/tr/graphene#protezione-contro-manomissioni"
    - name: "Güvenlik ayarlarını yapılandırın"
      text: "Tehdit modelinize göre ekran kilidini, otomatik yeniden başlatmayı, USB kısıtlamalarını, kablosuz saldırı yüzeyini ve uygulama izinlerini yapılandırın."
      url: "/tr/graphene#hardening-attraverso-le-impostazioni"
    - name: "Kullanıcı profilleriyle etkinlikleri ayırın"
      text: "İş, özel hayat, Google Play Services gerektiren uygulamalar ve hassas etkinlikler için ayrı profiller oluşturun."
      url: "/tr/graphene#profili-utente-secondari"
    - name: "Uygulamaları kurun ve doğrulayın"
      text: "Güvenilir kaynakları tercih edin, uygulamaları düzenli olarak güncelleyin ve mümkün olduğunda App Verifier veya doğrulanabilir imzalara sahip mağazaları kullanın."
      url: "/tr/graphene#applicazioni"
---

> **TL;DR** - Bu rehberde öğrenecekleriniz:
> - GrapheneOS'un neden mobil gizliliğin altın standardı olduğu ve hangi Pixel'i seçmeniz gerektiği
> - GrapheneOS'u sıfırdan nasıl kurup yapılandıracağınız
> - Kullanıcı profillerinden, sandboxed Play Services'ten ve gelişmiş güvenlik özelliklerinden nasıl en iyi şekilde yararlanacağınız
> - Sorun giderme: en yaygın uygulama ve servis sorunlarının çözümü

## GrapheneOS nedir ve kimler için uygundur?

GrapheneOS, gizlilik ve güvenliğe odaklanan açık kaynaklı bir Android işletim sistemidir. Veri toplanmasını azaltmak, uygulama izolasyonunu artırmak isteyen, ama sandbox içine kurulabilen ve sistem ayrıcalıkları olmadan çalışan Google Play Services sayesinde birçok Android uygulamasıyla uyumluluğu korumak isteyen kişiler için tasarlanmıştır.

| Soru | Kısa cevap |
|---|---|
| Hangi telefonlarda çalışır? | Sadece resmi olarak desteklenen Google Pixel cihazlarda. |
| Google uygulamalarından vazgeçmem mi gerekiyor? | Hayır: Google Play Services sandboxed uygulamalar olarak kurulabilir. |
| Yeni başlayanlar için uygun mu? | Evet, yönlendirilen bir kuruluma uymaya ve kullanıcı profilleri hakkında bilgi edinmeye istekliyseniz. |
| Varsayılan olarak anonim mi? | Hayır. Gizliliği ve güvenliği artırır, ama sonuç tehdit modelinize ve kullandığınız uygulamalara bağlıdır. |

**Ana kaynaklar:** resmi GrapheneOS dokümantasyonu, projenin SSS'si, Android Open Source Project ve desteklenen Pixel cihazlarda yapılan uygulamalı testler.

Akıllı telefonunuz sahip olduğunuz en mahrem cihazdır: nereye gittiğinizi, kiminle konuştuğunuzu, alışkanlıklarınızı bilir. Stok Android ve iOS işletim sistemleri bu verileri sürekli olarak Google ve Apple ile paylaşır. GrapheneOS, gizliliğinizden ödün vermeden kurumsal düzeyde güvenlik sunan tek alternatiftir. Bu rehber sizi cihaz seçiminden ileri düzey yapılandırmaya kadar adım adım götürür.

[GrapheneOS](https://grapheneos.org/), gizlilik ve güvenliği artırmaya odaklanan, [Android Open Source Project (AOSP)](https://www.android.com/) tabanlı bir FOSS (Özgür ve Açık Kaynak Yazılım) işletim sistemidir.

GrapheneOS şu anda Android işletim sistemleri arasında altın standardı temsil ediyor ve bu rehber işletim sisteminin tüm yönlerini ve özelliklerini ele alacak.

Bu makale, GrapheneOS projesiyle ilgili mobil güvenlik ve gizlilik hakkındaki bilgi ve birikimi bir araya getirme girişimidir; bu rehbere ilham veren GrapheneOS hakkında bir makale yazdığı için [PatrickD](https://x.com/patrickd_de)'ye teşekkürler.

Bu rehberi yazmak uzun zaman ve büyük bir emek gerektirdi; yapabileceğiniz en büyük bağış, bunu mümkün olduğunca çok kişinin görebilmesi için **gruplarda**, **telegram kanallarında**, **twitter'da** ve çeşitli sosyal ağlarda paylaşmaktır. Bunu yapan herkese **içten bir teşekkür**. Bu içerik kâr amacı gütmemektedir: bu site verilerinizi istemez, analitik kullanmaz, e-postanızı veya kaydolmanızı istemez. Bu projeyi hayatta tutmak için haberi yayın.

## Cihaz Seçimi

GrapheneOS projesine ilk kez yaklaşanlar için muhtemelen en sık sorulan soru şudur: neden bu kadar az cihaz resmi olarak destekleniyor ve neden hepsi sözde kötü Google tarafından üretilen pahalı Pixel telefonlar?

### Neden Sadece Pixel Cihazlar?



GrapheneOS'a göre, şu anda basitçe başka mantıklı seçenek yok. GrapheneOS'un bu cihazlar için Google ile özel bir sözleşmesi yok, ve bunun nedeni Pixel'lerin inanılmaz derecede güvenli olması değil, aksine diğer tüm alternatiflerin kesinlikle kötü olmasıdır. GrapheneOS projesi, şu anda ve gelecekte potansiyel olarak desteklenecek cihazlar için bir [gereksinimler listesi](https://grapheneos.org/faq#future-devices) tutuyor ve ne yazık ki şu anda bunları sadece Pixel'ler karşılayabiliyor.

Pixel cihazları, Android geliştirme için referans platform olarak hizmet etmeleri sayesinde alternatif işletim sistemleri için tam destek sunar. Düzenli ve yeterli firmware güncellemeleri alırlar ve [memory tagging](https://discuss.grapheneos.org/d/10507-what-actually-is-the-memory-tagging-feature-and-is-it-worth-turning-on) gibi, stok olmayan işletim sistemleri kurulu olduğunda da kullanılabilir kalan gelişmiş donanım güvenlik özellikleri sunarlar.

Diğer çoğu OEM üreticisi ise, alternatif işletim sistemleri için sadece kısmen işlevsel destek sunar ve bunu profesyonel olmayan bir hobi özelliği olarak ele alır. Birçoğu temel güvenlik özelliklerini tamamen atlar ve yeterli güncellemeler sağlamakla uğraşmaz. Daha da kötüsü, sisteme yaptıkları değişikliklerle genellikle karmaşıklık ve onunla birlikte daha büyük bir saldırı yüzeyi eklerler.

Geçmişte GrapheneOS, OEM üreticileriyle işbirliği yapmaya çalıştı, ama Pixel'lerle karşılaştırılabilir bir güvenlik seviyesine sahip bir cihaz oluşturmanın inanılmaz derecede zor olduğu kanıtlandı.

Genişletilmiş cihaz desteği şu anda çok güvensiz, GrapheneOS'un birçok güvenlik özelliğini desteklemekten aciz cihazlarla uyumluluk anlamına gelirdi. Ayrıca bu, gizlilik ve güvenliği iyileştirme çalışmalarından önemli miktarda kaynak alırdı, çünkü bu özelliklerin çoğu donanıma özeldir. Ancak, gereksinimleri karşılayan başka cihazlar var olsaydı, GrapheneOS projesi kesinlikle bunları desteklemeyi planlardı.

### Alternatifler var mı?

Android cihazlar için gizlilik ve güvenliğe odaklanan veya en azından daha geniş cihaz desteği sunan çeşitli alternatif işletim sistemleri vardır. Ancak, güvenlik özellikleri her zaman büyük boşluklar içerdiğinden, bunların hiçbiri gerçek bir alternatif olarak kabul edilemez.

GrapheneOS ekibinin bu projelerin neredeyse tümüne yönelttiği en temel eleştiri, Android'in tam açık kaynaklı versiyonunu (AOSP) kullanan kullanıcıların yararlandığı önemli güvenlik yamalarındaki büyük gecikme veya bazı durumlarda tamamen atlanmasıyla ilgilidir.

[LineageOS](https://lineageos.org/) bunlardan biridir, ancak bu projenin odağının güvenlik değil cihaz ömrü ve geniş uyumluluk olduğu belirtilmelidir. Ancak, doğrulanmış önyükleme sistemi yoktur, bu da yetkisiz fiziksel erişimi önemsiz hale getirir. [/e/OS](https://e.foundation/e-os/) projesi, gizliliğe odaklanan tamamen "deGoogle'lanmış" bir mobil ekosistem olarak kendini tanıtıyor, ama Lineage'ın kırılgan temelleri üzerine inşa edilmiştir. e/OS, kullanıcılara sorgulanabilir bir gizlilik hissi veren uygulama ve servisler içerir, ama bu aynı servisler invaziftir ve kötü tasarlanmıştır.

GrapheneOS'un muhtemelen en büyük "rakibi" olan [CalyxOS](https://calyxos.org/), sadece yamalar konusunda düzenli olarak gecikmeli değil, aynı zamanda yanlış Android güvenlik yama seviyeleri sağlayarak kullanıcıları yanıltmıştır. Ayrıca, amaçlandığı gibi tehlikeye atılmış verileri güvenilir bir şekilde silmeyen acil durum silme özelliği gibi ciddi kusurları olan güvenlik özellikleri uygulamıştır.

> Çeşitli Android tabanlı işletim sistemleri hakkında daha fazla bilgi için şu üçüncü taraf karşılaştırma tablosuna başvurabilirsiniz: <https://eylenburg.github.io/android_comparison.htm>

Sonra, GrapheneOS'un daha önce bilindiği isim olan [CopperheadOS](https://copperhead.co/android/) var. Projeyi finanse etmesi gereken şirketten düşmanca ele geçirme ve sonraki ayrılığın ardındaki dramanın ayrıntılarına girmeyeceğim. Ancak, bu şirketin şu anda CopperheadOS'u kapalı kaynaklı bir fork olarak sattığını belirtmekte fayda var (bunu kişisel olarak şiddetle önermiyorum).

Son olarak, ABD'de üretilen özel donanımıyla [Purism](https://puri.sm/), (sorgulanabilir) donanım anahtarları gibi özelliklerle gizlilik üzerinde kontrol vaat ediyor. GrapheneOS ekibi, cihazları için benimsenen güvenlik bileşeni seçimi ve firmware ile mikrokod güncellemeleri için gereken karmaşık süreç konusunda kesinlikle farklı görüşte. Librem 5 cihazı, çoğu insanın aksine ikna edilmiş olmasına rağmen, neredeyse tamamen kapalı kaynaklı donanım ve firmware'e dayanıyor. GrapheneOS, bu projeleri kullanıcıları eski ve güvenlik açığı bulunan donanım ve yazılıma güvenmeye yönlendiren boş pazarlama sözcükleriyle suçluyor. Hatta kullanıcıların GrapheneOS'tan sonra gizlilik ve güvenlik için en iyi ikinci seçenek olarak (Lockdown modunda) bir iPhone kullanmasının daha iyi olacağını söylüyorlar.

Beni yanlış anlamayın: GrapheneOS projesi, işletim sisteminin hiçbir şekilde aşılamaz olduğunu iddia etmiyor, ama markalaşma ve pazarlama yerine özün üzerine odaklanıyor. Bu, GrapheneOS [web sitesini](https://grapheneos.org/) diğer projelerin web siteleriyle karşılaştırdığınızda oldukça açık hale gelir: GrapheneOS açıkça teknik bir projedir, ki bu beni teknik gerçekleri bulmak için pazarlamayı eşelemekten kurtardığı için kişisel olarak çok takdir ettiğim bir şey. Öte yandan, bunun ortalama bir kullanıcı için oldukça caydırıcı olabileceğini de anlayabiliyorum.

### Google cihazlarına güvenilebilir mi?

GrapheneOS'un şu anda sadece Pixel cihazlarını desteklediğini gördük, çünkü yeterli donanım güvenlik tedbirlerine sahip tek cihazlar onlar. Her şey açık, ama bu cihazların arka kapıları olsaydı bu anlamsız olmaz mıydı?

Belirtildiği gibi, Google'ın Pixel'leri Android geliştirme için referans cihaz olarak hizmet eder, bu da birçok uzmanın onlar üzerinde çalışmasına yol açar. Ayrıca, Google harici güvenlik araştırmalarına çok açık olmuştur, bu sayede Pixel'ler bu alanda büyük ilgi görmüştür. Bu koşullar altında, cihazlarda arka kapı gizlemek oldukça zor olurdu.

Başka bir argüman, üretimlerini dışarıdan temin eden küçük şirketlerin tedarik zincirlerine saldırmanın, fark edilmeden iPhone'ların veya Pixel'lerin küresel üretimini tehlikeye atmaktan çok daha basit olacağıdır. Bu kadar yaygın kullanılan cihazların kullanıcıları, bu cihazların tabi olduğu yüksek inceleme ve ilgi seviyesinden yararlanır. Ayrıca, genellikle hükümetler tarafından kiralanan ve akıllı telefonlara erişim konusunda uzmanlaşmış adli bilişim şirketlerinden gelen sızıntıların, kasıtlı olarak eklenmiş arka kapılara dair hiçbir kanıt sunmadığını belirtmek önemlidir. Bununla birlikte, bazıları ilke olarak Google'a ait herhangi bir şey kullanmamayı seçiyor. Ancak bunu sağlamak için Apple ürünlerine güvenmeleri gerekir, çünkü Google, Linux çekirdeğinin kendisi de dahil olmak üzere birçok açık kaynaklı projenin geliştirilmesinde büyük bir rol oynamaktadır.

GrapheneOS'un misyonu, herhangi bir bedelle belirli bir şirketten kaçınma fikrine tamamen odaklanmış değil, aksine mevcut en iyi araçlarla mümkün olan en iyi gizlilik ve güvenliğe ulaşmaktır.

### Hangi Pixel'i seçmelisiniz? {#quale-pixel-scegliere}

Maksimum güvenlik için, en yeni desteklenen Pixel'lerden birini kullanmanız şiddetle önerilir. 2026'da bu, öncelikle dokuzuncu veya onuncu nesle bakmak anlamına gelirken, sekizinci nesil özellikle zaten birine sahipseniz hâlâ mantıklı. Bu cihazlar, GrapheneOS'un yararlanabileceği memory tagging gibi donanım özellikleri sayesinde önemli ölçüde daha güvenli kabul edilir. En yeni nesiller ayrıca gelişmiş modemler ve radyo bileşenleri içerir, dolayısıyla bir SIM ile kullanmayı planlıyorsanız daha fazla güvenlik ve pil ömründen yararlanacaksınız. 16 GB RAM'li Pro modeller, GrapheneOS'u birden fazla kullanıcı profiliyle kullanmayı düşünüyorsanız özellikle kullanışlıdır (bu özelliğin avantajları daha sonra açıklanacaktır).

Bugün en iyi fiyat/performans oranını arıyorsanız, Pixel 9a muhtemelen en mantıklı giriş noktasıdır. Zaten bir Pixel 8/8a'ya sahipseniz onu rahatlıkla kullanmaya devam edebilirsiniz: hâlâ mükemmel bir temel oluşturur. Her durumda, kullanılmış bir cihaz satın almadan önce her zaman [resmi destek ömrü tablosunu](https://grapheneos.org/faq#device-lifetime) kontrol edin.

> Her cihazın destek ömrüne ilişkin bir tabloyu şu bağlantıda kontrol edebilirsiniz: <https://grapheneos.org/faq#device-lifetime>

Altıncı ve yedinci nesil Pixel cihazlarının hâlâ birkaç yıl desteği var, bu da zaten birine sahipseniz ve kullanmaya devam etmek istiyorsanız iyi bir seçim yapar. Ancak, bu nesillerden yeni bir cihaz satın almak tavsiye edilmez. Ayrıca, GrapheneOS'un sadece daha yeni nesillerin donanımıyla kullanabileceği çeşitli güvenlik özellikleri olduğunu unutmayın.

Daha eski olan her şey "Kullanım Ömrü Sonu" (End-Of-Life) olarak kabul edilir ve GrapheneOS projesi, kullanılan işletim sisteminden bağımsız olarak bunları kullanmaya devam etmeyi şiddetle önermez. Bu, GrapheneOS'un bazıları için hâlâ genişletilmiş destek sağlamasına rağmen geçerlidir, ki bu sadece riskleri azaltmak ve kullanıcılara tamamen desteklenen bir cihaza geçme zamanı vermek için yapılır. Örneğin, Pixel 5a için artık firmware yaması veya sürücü desteği yoktur ve cihazın kontrolünü almak için istismar edilebilecek bilinen, çözülmemiş bir uzaktan kod yürütme güvenlik açığı bile vardır.

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

GrapheneOS'u kurmanın birkaç yolu vardır: işletim sistemi önceden kurulu telefonlar satın almak, komut satırından manuel olarak veya web yükleyicisi aracılığıyla. Bunu nasıl yapacağınıza dair tüm rehberler ve dokümantasyon, resmi GrapheneOS web sitesinin "install" bölümünde mevcuttur.

## Kurcalamaya Karşı Koruma {#protezione-contro-manomissioni}

### Doğrulanmış Önyükleme Anahtarı Hash'i

Artık taze bir GrapheneOS kurulumuna sahip bir Pixel cihazın gururlu sahibi olduğunuzu varsayarsak, cihaz açılırken görünen uyarı sizi şaşırtabilir. Siyah bir ekran, işletim sisteminin artık orijinal olmadığını uyaracak ve altında, kurulu GrapheneOS sürümünün gerçek olduğunu doğrulamanızı sağlayan bir kriptografik hash olan bir karakter dizisi görüntülenecektir:

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

GrapheneOS, güvenlik açıklarına karşı üç temel yaklaşım kullanarak savunma yapar: saldırganlara açık olan "yüzeyi" (yani aktif özellikleri/kodu) azaltır, güvenlik açıklarından yararlanmayı olabildiğince zorlaştırır ve bileşenleri birbirinden izole eder (sandboxing), böylece herhangi bir istismarın etkisini azaltır. Bu önlemler cihazın kullanım kolaylığını ve performansını etkilediğinden, GrapheneOS kullanıcıların kendi tercihlerini seçmesine ve ihtiyaçlarına en uygun kurulumu oluşturmak için çok sayıda ayar aracılığıyla kullanıcı deneyimini özelleştirmesine izin verir.

### Kilit Ekranı

Kullanıcı verileri, diğer şeylerin yanı sıra seçilen ekran kilidi yönteminden türetilen bir anahtarla şifrelenmiş olarak saklanır. Bu yöntemler, "secure element" donanımının uyguladığı geciktirmeler sayesinde basitçe kaba kuvvet saldırılarıyla aşılamaz. Bu önlem sayesinde, rastgele bir 6 haneli PIN bile yüksek bir güvenlik seviyesi sunar. "Secure element"in güvenliğine bağlı kalmak istemiyorsanız, 128 karaktere kadar şifreler kullanabilirsiniz.

Desen kilidi GrapheneOS'tan kaldırılmıştır, çünkü PIN'in çok daha kötü bir versiyonunu temsil eder ve güvensiz desen seçimlerini teşvik eder. Bunun yerine, en az 6 haneli bir PIN kullanmalı ve bir gözlemcinin parmak izleri veya diğer kanallar aracılığıyla kombinasyonu bulmasını zorlaştıran PIN karıştırma özelliğini etkinleştirmeyi düşünmelisiniz.

Parmak İzi ile Kilit Açma ayarlanabilir, ama optimal güvenlik için bunu uygulama içi kimlik doğrulamayla sınırlamayı düşünmelisiniz (yani _"Ekranı açmak için kullan"_ı devre dışı bırakarak). GrapheneOS ekibi, hem parmak izi taramasını hem de PIN/şifreyi gerektirecek 2 faktörlü bir parmak izi kilidi sistemini henüz tanıttı.

Bir eSIM'iniz varsa veya özellikle fiziksel bir SIM'iniz varsa, kilidi açmak için kullanılandan farklı olması gereken bir SIM PIN'i ayarlamak mantıklıdır.



Son olarak, GrapheneOS bir acil durum şifresi veya PIN'i ayarlama seçeneği sunar. Bir kez yapılandırıldığında, ikincil kullanıcı profillerinde dahi olsa bir kilit açma PIN'i veya şifresi istenen herhangi bir yerde bunu kullanmak, cihazdaki (ve kurulu herhangi bir eSIM'deki) tüm verileri geri döndürülemez şekilde silecektir. Tetiklendiğinde, şifre çözme için gereken bilgiler silinir ve cihaz kapanır. Bir sonraki açılışta, geçersiz bir dosya sistemi tespit edilecek ve cihaz, fabrika ayarlarına sıfırlanmış gibi yeniden kurulabilecektir. Bu işlemin şifrelenmiş verinin kendisini silmediğini unutmayın, çünkü bu çok uzun sürer ve saldırganlara işlemi kesintiye uğratma fırsatı verirdi.

### Otomatik Yeniden Başlatma

Az önce açılmış ve henüz kilidi açılmamış bir cihazın kullanıcı verileri tamamen şifrelenmiştir. İlk kilit açmadan sonra devam eden kullanım, genellikle cihazın geçici belleğinde şifrelenmemiş veri birikmesine yol açar, bu da adli bilişim şirketlerinin istismar ettiği bir güvenlik açığıdır. Otomatik Yeniden Başlatma özelliği, şifrelenmemiş verilerin çıkarılmasına karşı korumak için tanıtılmıştır.

Uygulamaların cihaz kilitlendiğinde hassas verileri "dinlenme durumuna" almaları mümkün olsa da, bu özelliği gerçekten uygulamak geliştiricilere bağlıdır ve bu nadiren gerçekleşir. Gizlilik odaklı Signal mesajlaşma uygulamasının geliştiricileri bile bu özelliği uygulamaya pek ilgi göstermemiş, Molly gibi forklara bunu daha iyi ele alma fırsatı bırakmıştır. Cihazı belirli bir süre sonra otomatik olarak yeniden başlatarak, "ilk kilit açmadan önce" (BFU) durumuna geri döner.

Yeniden başlatma zamanlayıcısı cihaz her kilitlendiğinde başlar ve başarılı bir kilit açmada sıfırlanır. Varsayılan olarak, zamanlayıcı 18 saate ayarlanmıştır, mevcut en düşük ve daha güvenli değer ise 10 dakikadır. Zamanlayıcının yalnızca son yeniden başlatmadan sonra cihaz en az bir kez kilidi açılmışsa başlayacağını unutmayın.

18 saatlik varsayılan değerle, zamanlayıcı kullanıcı deneyimini etkilememek için sürekli kullanım sırasında iptal edilecektir. GrapheneOS'un hâlâ düzenli yeniden başlatmalar gerektiren çok sık güncellemeleri sayesinde, bu özelliğin telefon bir çekmecede beklerken bu güncellemeleri kurmak gibi ikincil bir kullanımı da vardır. Hâlâ çok sık yeniden başlatmalara neden oluyorsa, zamanlayıcı 78 saate kadar artırılabilir veya tamamen devre dışı bırakılabilir - ancak GrapheneOS bu seçeneğe karşı şiddetle uyarır.

İkincil kullanıcı profilleri kullanmayı planlıyorsanız, bu özelliğin oldukça can sıkıcı olabileceğini unutmayın, çünkü tüm kullanıcı oturumları kapatılacak ve cihaz varsayılan kullanıcıya (Owner) geri dönecektir. İstediğiniz güvenlik seviyesine bağlı olarak iyi bir zaman dilimi 4 veya 8 saat olabilir.

### USB Kısıtlamaları

Adli bilişim şirketleri akıllı telefonlara sızmaya çalıştıklarında, sunduğu birçok fonksiyon nedeniyle büyük bir saldırı yüzeyine sahip olan USB arayüzü üzerinden yapmayı tercih ederler. Pixel cihazları, stok Android tarafından henüz kullanılmayan ama GrapheneOS projesi için temel olan, USB-C bağlantı noktası üzerinde donanım seviyesinde kontrol sunar.


Varsayılan olarak, GrapheneOS cihaz kilitlenir kilitlenmez yeni USB-C bağlantılarını devre dışı bırakır. Başka bir deyişle, cihaz kilidi açıkken USB-C verisine bağlanabilir ve kullanabilirsiniz, ama kilitlendiğinde ve bağlantı kesildiğinde, yeni bağlantıları kabul etmeyecektir. Bu önlem, DisplayPort gibi USB-C alternatif modlarını devre dışı bırakmayı da içerir.<br><br>
En güvenli ama aynı zamanda en sıkıntılı seçenek, işletim sistemi çalışırken USB-C bağlantı noktasını tamamen devre dışı bırakmaktır. Bu, cihazın güç mantığında bulunan herhangi bir güvenlik açığını da engeller (varsa), ama cihazı şarj etmek istediğinizde ayarı her seferinde kapatmanızı gerektirecektir.

### Kablosuz Saldırı Yüzeyi

USB devre dışı bırakıldığında, geriye Wi-Fi, Bluetooth ve hücresel ağ gibi kablosuz saldırı vektörleri kalır. Ancak, bu yöntemlerden biri aracılığıyla bir cihaza erişmek çok daha zor ve karmaşık olacaktır. Donanım bileşeni izolasyonu mobil cihazlarda norm haline gelmiştir. Pixel'lerin bu radyoların her biri için ayrı çipleri vardır ve isterseniz çipleri tek tek çıkarabilirsiniz ve cihaz çalışmaya devam eder.

Varsayılan olarak etkin olmasa da, Wi-Fi ve Bluetooth'u otomatik olarak devre dışı bırakmak için bir zamanlayıcı ayarlamak mümkündür. Zamanlayıcı, artık aktif bir bağlantı olmadığı anda başlar. GrapheneOS projesi bu özelliği gelecekte NFC'ye de genişletmeyi planlıyor.

Hücresel bağlantı konusu çok daha karmaşıktır. Her şeyden önce, 5G, SMS, MMS ve aramalar genel olarak GrapheneOS'ta stok Android'de olduğu gibi düzgün çalışır. GrapheneOS, yine saldırı yüzeyini azaltmaya çalışan çeşitli anahtarlar ekler, ancak operatörünüze ve bulunduğunuz ülkeye bağlı olarak, neyin işe yaradığını görmek için denemeler yapmanız gerekebilir.

> GrapheneOS ile eSIM kullanabilirsiniz, ama tescilli Google özellikleri gerektirdiğinden varsayılan olarak tamamen devre dışıdır. Geçmişte, eSIM desteğini etkinleştirmek Google Play gerektiriyordu, ama bu artık geçerli değil ve eSIM kullanmak Google ile herhangi bir veri paylaşmaz. Acil durum PIN/şifresi yoluyla yapılan bir silmenin eSIM'leri de sildiğini, ama aynı şeyin normal bir fabrika sıfırlaması için geçerli olmadığını unutmayın.

GrapheneOS projesi, mümkün olduğunda yalnızca LTE seçeneğinin kullanılmasını önerir. Bazen 4G veya 5Ge olarak adlandırılan LTE, 2G ve 3G protokollerinden çok daha modern, ama daha yeni 5G protokolünden de daha az karmaşık ve daha kararlıdır. Bunun bazı engelleme biçimlerini daha zor hale getirebileceğini unutmayın, ama yalnızca LTE modunun tek amacı, bu eski protokollere ve en yenilerine bağlı büyük miktarda kodu devre dışı bırakmaktır.

### Hücresel Gizlilik

LTE ve 5G bir şifreleme biçimi sunar, ama bu öncelikle ağ üzerinden iletilen verileri korumak içindir, gizliliğinizi korumak için değil. Kullanılan moddan bağımsız olarak, geleneksel telefon görüşmelerinden ve hücresel ağ üzerinden SMS'ten kaçınmalı, bunun yerine Signal ve SimpleX gibi uçtan uca şifrelenmiş mesajlaşma platformlarını kullanmalısınız.

Geleneksel telefon sistemi tarihsel olarak güvensizdir ve kullanıcıların gizliliğini korumak için tasarlanmamıştır. Bunu, bir kez güvenilir taraf statüsü ve erişim elde ettiğinizde, önemli miktarda bilgi ve ağ üzerinde kontrol elde ettiğiniz duvarlarla çevrili bir bahçe olarak düşünebilirsiniz. Bu erişim ayda birkaç bin dolara satın alınabilir ve telefon görüşmelerini, SMS'leri ve bazı durumlarda bir kişinin konumunu yaklaşık olarak takip etmeyi bile mümkün kılar. Bunu yapmak için bir saldırganın SIM kartınızın benzersiz IMSI tanımlayıcısına ihtiyacı vardır, bu da genellikle telefon numaranızı bilerek bulunabilir. Bununla, saldırgan telefonunuz böyle bir SMS'in gönderildiğine dair hiçbir belirti vermeden iki faktörlü kimlik doğrulama SMS'ini ele geçirebilir.

Telefonunuz hücresel ağ ile kimlik doğrularken, bunu hem SIM kartınız hem de cihazınızın hücresel radyo donanımı hakkında bilgi sağlayarak yapar. Telefonu ve SIM'i anonim olarak satın aldıysanız, esasen kalıcı bir takma ad kullanıyorsunuz demektir. Donanım bilgisi paylaşıldığından, sadece SIM'i değiştirmek yeni bir kimlik elde etmek için yeterli değildir.

Bu noktada, cihazınıza bir SIM kart takmanın alternatifi olarak harici bir cihaz, örneğin özel bir mobil hotspot kullanmayı düşünebilirsiniz. Bu gizliliğinizi artırırken, güvenliğinizi kötüleştirecektir, çünkü bu cihazlar genellikle çok daha kötü donanım izolasyonuna sahiptir ve Pixel'inizin dahili izole hücresel radyosunu kullanmaya kıyasla güncellemeler konusunda çok gerideler; bu, bir saldırganın özel cihazın kontrolünü almasını ve telefonunuza saldırmak için büyük bir saldırı yüzeyine sahip olmasını çok daha kolaylaştırır.

Bu özel hücresel cihazlardan bazıları IMEI'yi sahtelemeye, yani donanım tanımlayıcısını rastgele bir değere değiştirmeye izin verir. Bu, aynı özel cihazı yeniden kullanmanıza ve ağda yeni bir kimlik elde etmek için sadece IMEI değerini yeni bir SIM kartla birlikte değiştirmenize izin verir. Ancak, IMEI'nin hücresel radyoların ilettiği tek cihaza özgü donanım tanımlayıcısı olmadığını ve dahası, değiştirilmiş tanımlayıcılarla bile bu cihazları yeniden tanımlamaya izin verebilecek "parmak izi çıkarma" yolları olduğunu bilmelisiniz. En kötü durumda, sahtecilik çok belirgin olursa kendinize çok fazla dikkat çekebilirsiniz bile.

GrapheneOS projesi, hücresel iletişim için ikincil bir cihaz kullanmayı önermez, ama gerçekten isterseniz, GrapheneOS kurulu başka bir Pixel cihazı kullanmak daha iyi olurdu. Wi-Fi üzerinden hücresel internet paylaşırsanız, yakındaki birinin Wi-Fi erişim noktanızdan gelen sinyalleri tespit ederek hareketlerinizi takip edebileceğini unutmayın.

**Uçak modu ne olacak?**

Uçak modu, cihazın hücresel radyo iletimini, alımını ve takip yeteneklerini tamamen devre dışı bırakmanın tek yoludur. Uçak modu etkinleştirildikten sonra, hücresel radyoyu geri açmadan Wi-Fi'yi yeniden açmak mümkündür. Pixel'inizi sadece bir Wi-Fi cihazı olarak kullanmayı düşünüyorsanız, yanlışlıkla yeniden açmamak için hızlı geçişi (durum çubuğunu aşağı kaydırarak görünen uçak modu düğmesi) kaldırmayı düşünebilirsiniz.

Hücresel ağın, operatör servislerinin kullanılabileceği tek yol olmadığının bilincinde olmalısınız. Wi-Fi üzerinden aramalar ve mesajlar da vardır. SIM'in operatörle kimlik doğrulamasını ve diğer internet bağlantıları üzerinden ağ servislerini kullanmasını önlemek için SIM'in kendisini devre dışı bırakmanız gerekir.

Daha yeni cihazlar, kayıp cihazları bulmak için tasarlanmış özel çevrimdışı takip sistemlerine sahiptir. GrapheneOS bu sistemleri desteklemez ve asla desteklemeyecektir. Kesinlikle emin olmak istiyorsanız, kullanmadığınız zamanlarda cihazı bir Faraday çantasında tutmayı düşünebilirsiniz.

**Sadece veri SIM'leri ne olacak?**

Gizlilik açısından, veri-yalnız bir SIM kullanırsanız çok şey değişmez: hâlâ hücresel ağda kimlik doğrulanmış durumdasınız. Ancak, mesaj ve aramaların olmaması, potansiyel istismarlar için saldırı yüzeyini azaltır. GrapheneOS gelecekte bu özellikleri devre dışı bırakma seçenekleri ekleyebilir, böylece normal SIM'leri esasen veri-yalnız eşdeğerlerine dönüştürebilir.

**VPN kullanmak ne olacak?**

Bir VPN kullanmak, operatör tabanlı aramalar veya mesajlar üzerinde hiçbir etkisi yoktur. Bu fonksiyonlar, hücresel ağ yerine bir Wi-Fi bağlantısı kullansanız bile VPN üzerinden geçmeyecektir. Ancak, diğer saldırı türlerine karşı savunma yapmak ve sizinle potansiyel dış saldırganlar arasına gizlilik koruması katmanları eklemek için yararlı araçlardır. Her zaman güvendiğiniz VPN sağlayıcılarını seçin veya kendi barındırdığınız bir VPN kullanmayı düşünün (bunu kendiniz nasıl kuracağınıza dair [bir rehber](https://b4.lol/tr/vpn) yazdım).

**Veri tasarrufu modu ne olacak?**

Genel veri tasarrufunu (yani tüm kullanıcı profillerinde) etkinleştirmek, uygulamaların arka planda hücresel veri kullanmasını önleyecektir. Kalıcı bir bildirim aracılığıyla ön planda aktif kalan veya kullanıcı tarafından kullanılan ön plan servislerini kullanan uygulamalar bu kısıtlamadan hariç tutulur. Mobil veri kullanımını uygulama bazında sınırlamak da mümkündür. Yani bu, cihazın güvenliğini artırmak için gerçekten yararlı bir yol değildir.

**SIM olmadan kullanmak ne olacak?**

Bir SIM kartınız yoksa ve uçak modunda değilseniz, cihazınız hâlâ hücresel ağa bağlanacak ama kimlik doğrulaması yapmayacak ve herhangi bir donanım tanımlayıcısı paylaşmayacaktır. Hâlâ acil durum aramaları yapabilecek ve acil durum uyarıları alabileceksiniz.

> Acil durum araması yapmanın cihazınızın radyo tanımlayıcılarını paylaşacağını unutmayın.

**Acil durum uyarıları ne olacak?**

Acil durum uyarıları, SIM'i olmasa bile hücresel ağ üzerinden bağlı tüm telefonlara gönderilir. Normalde, sadece uçak modu bunları almanızı önler. GrapheneOS yerel düzenlemelere tabi olmadığından, "başkanlık önceliği" uyarılarını bile devre dışı bırakma seçenekleri sunar. Acil durum uyarıları yine de kullanıcıların takip edilmesine veya verilerinin çalınmasına izin vermez.

### Uygulama İstismarlarına Karşı Koruma

Şimdiye kadar cihazı harici tehditlerden nasıl koruyacağımızı tartıştık, ama kurulu uygulamalardan hiçbirinin sistemi içeriden tehlikeye atamayacağından emin olmak da aynı derecede önemli. Android'de uygulamalar her zaman kendi sandbox'larında izole çalışır, erişebilecekleri kaynakları izin verilenlerle sınırlar. Kötü amaçlı uygulamalar, ana işlevleriyle ilgisi olmayan amaçlar için izin isteyip kullanabilir; diğerleri sandbox'larından kaçmaya çalışabilir. Genellikle uygulamanın kendisi kasıtlı olarak kötü niyetli değildir, ama bir güvenlik açığı vardır veya kendi sunucularına yapılan bir saldırıdan etkilenir ve bu da uygulamanın kullanıcılarına yansır.

Ayarların "**Uygulama istismar koruması**" bölümünde, bir uygulamanın sandbox'tan kaçmasını zorlaştıran çeşitli önlemler bulabilirsiniz. Bunların çoğu, çökme veya arızalara neden olabileceğinden, kullanıcı tarafından kurulan uygulamalar için varsayılan olarak etkin değildir. Ancak, bunları genel olarak etkinleştirip, sorun yaşayan uygulamalar için seçici olarak devre dışı bırakmak daha iyidir.

Her zaman örtük olarak etkin olan başka önlemler de vardır. Bunlardan biri, just-in-time derleme yerine ahead-of-time derleme kullanılmasıdır. Bu, pil ömrünü, birçok uygulamanın performansını iyileştirir ve önemli bir güvenlik özelliğini temsil eder. Ancak bir dezavantajı vardır: uygulama kurulumları ve güncellemeleri stok Android'e göre çok daha uzun sürer.



### İzinler

Stok Android'de, izinler sadece Kamera, Mikrofon, Vücut sensörleri ve Aktivite tanımaya erişim için mevcuttur. İvmeölçer, jiroskop, pusula, barometre, termometre ve diğer sensörlere erişim, açık bir onay gerektirmeden varsayılan olarak uygulamalara basitçe verilir. GrapheneOS, bu sensörlere varsayılan olarak erişimi önleyen bir seçenek ekler. Bu önlem, bu sensörlerden geçerli veri almayı bekleyen uygulamalarda çökmelere de neden olabilir, bu yüzden yeni bir GrapheneOS kurulumunda tüm uygulamalar için hemen etkinleştirilmez. Bunu etkinleştirerek, bir uygulama bu sensörlerden birine erişmeye çalıştığında her seferinde bir bildirim alacak ve bu izni seçici olarak verebileceksiniz.

Stok Android'in tüm uygulamalara örtük olarak verdiği başka bir izin, ağ fonksiyonlarına erişimdir. Bu, cihazın yerel ağını (localhost) içerir, bu da şu anda kullanıcı profili izolasyonunu atlamak için bilinen bir yöntemdir ve farklı profillerdeki uygulamaların birbirleriyle iletişim kurmasına izin verir. GrapheneOS'ta, bir uygulama kurarken bu izni vermek isteyip istemediğiniz sorulacaktır. Ağ izni verilmediğinde, GrapheneOS bir ağ bağlantısı eksikliğini simüle eder, bu da genellikle uygulamalar tarafından sorunsuz bir şekilde ele alınır.

Uygulama istismar korumalarını bireysel olarak devre dışı bırakabileceğiniz gibi, izinleri de kendi takdirinize göre uygulamalardan kaldırabilirsiniz. Ancak, varsayılan olarak kurulu sistem uygulamalarından izinleri kaldırmamaya dikkat edin, çünkü bu beklenmedik sorunlara neden olabilir.

Özellikle dikkatli yönetilmesi gerekenler ağ izinleri (sadece ihtiyacı olan uygulamalara verin; bir uygulamanın internet üzerinden iletişim kurmaması gerekiyorsa, bu izni kaldırın), konum (GPS erişimi), dahili depolama (dosya erişimi), kamera ve mikrofondur. Ayarlardan çeşitli uygulama izinlerini görebilirsiniz ve bunları ara sıra incelemek çok önemlidir.

### Kısıtlı erişim (storage scope)

Tüm kişilere veya cihazdaki tüm dosyalara erişim gibi oldukça invaziv izinler isteyen popüler uygulamalar vardır. GrapheneOS'un scoping özelliği, erişim vereceğiniz kişilerin veya dosyaların bir alt kümesini seçmenize izin verir, söz konusu uygulama ise her şeye erişimi olduğuna inanacaktır.

Varsayılan olarak, kişi scoping'i kişi listesi boşmuş gibi davranır ve kullanıcılar daha sonra belirli kişilere veya kişi gruplarına farklı erişim türleri verebilir. Veri erişimi oldukça ayrıntılıdır, bu da tam kişi bilgisi yerine uygulamayla sadece seçtiğiniz belirli verileri paylaşmanıza izin verir.

Kullanıcılar, uygulamalara tam depolama erişim izni vermek yerine depolama scoping'ini etkinleştirebilir. Bu, kullanıcı açıkça tam erişime izin verilmesi gereken dosyaları veya dizinleri belirtmedikçe, uygulamanın diğer yazılımlar tarafından oluşturulan herhangi bir dosyayı göremeyeceği anlamına gelir.

GrapheneOS projesi, Konum, Kamera ve Mikrofon gibi diğer alanlar için de benzer kapsamlı erişim özellikleri eklemeyi planlıyor.

### Mikrofon ve Kamera Anahtarları

Stok Android'de mevcut olsa da, mikrofon ve kameraya erişimi devre dışı bırakan anahtarlar olduğunu belirtmekte fayda var. Bunlar durum çubuğunu aşağı kaydırarak hızlı geçişler olarak da mevcuttur.

Bunları küresel olarak devre dışı bırakıp sadece gerektiğinde açmak yararlı görünse de, hızlıca bir fotoğraf çekmek (örneğin güç düğmesine iki kez basma kısayoluyla) veya telefon hâlâ kilitliyken bir aramaya cevap vermek istiyorsanız bu çok sıkıntılı olabilir. Bu durumlarda, önce telefonun kilidini açmanız ve uygun erişimi etkinleştirmeniz gerekir, ki bu arayanın aramayı kapatmaya karar verecek kadar uzun sürebilir. Bunun yerine, mikrofon ve kamera erişimini sistem seviyesinde etkin bırakıp bu izinleri uygulama bazında reddedebilirsiniz: telefon ve kamera uygulamaları için etkin bırakıp diğerlerini 'Her zaman sor' olarak ayarlayarak.

Bu sensörlere asla ihtiyacınız olmayacağından eminseniz, mikrofonları ve kameraları çıkarılmış cihazlar da satın alabilirsiniz, ancak sensör çıkarma sırasında parça hasarı riski çok yüksek olduğundan fiyatlar ortalama olarak AŞIRI derecede daha yüksektir.

### Sistem Güncellemeleri

GrapheneOS sistem güncellemeleri arka planda otomatik ve kesintisiz olarak indirilip kurulur. Ancak, bunları uygulamak için bir yeniden başlatma gerekir, ama bu süreç güncellenmiş işletim sisteminin ilk açılışı başarısız olursa otomatik geri alma sayesinde güvenlidir.

Bir güncellemeden sonra otomatik yeniden başlatmalar mümkündür ama varsayılan olarak devre dışıdır, çünkü bir aramanın ortasında gerçekleşebilirler. Güncellemelerin mobil veri kullanılarak indirilmesini önlemek istiyorsanız, _"İzin verilen ağlar"_ ayarını _"Sadece ölçülmeyen ağlar"_ olarak değiştirmeniz önerilir. Bazı kullanıcılar güncellemelerin özellikle dışarıdayken çok pil tüketebileceğini ve cihazın aşırı ısınmasına neden olabileceğini bildirmiştir. Bu gibi durumlardan kaçınmak için _"Cihazın şarj olması gerekir"_ seçeneğini etkinleştirebilirsiniz.



_"Sistem Güncelleyici"_ uygulamasını devre dışı bırakarak otomatik güncellemeleri tamamen devre dışı bırakabilirsiniz. Ancak, GrapheneOS projesi bu seçime şiddetle karşı çıkar, çünkü güvenlik açıklarını düzeltmek veya sistemi iyileştirmek için güvenlik ve gizlilik yamaları almazsınız.

Bazıları gelecekteki bir güncellemenin bir arka kapı tanıtabileceğinden korkabilir. Kötü amaçlı güncellemeleri önlemek için birkaç önlem mevcuttur: hem güncelleme istemcisi hem de doğrulanmış önyükleme mekanizması tarafından doğrulanan geçerli bir kriptografik imzaya sahip olmaları gerekir. Ayrıca, sürüm düşürme gibi saldırılar yerel olarak önlenir.

GrapheneOS projesi ayrıca, mevcut yasaların yalnızca bireysel kullanıcıları hedef alabileceğini ve tüm GrapheneOS cihazlarına kötü amaçlı güncelleme yayınlamayı zorlayamayacağını savunuyor. Güncelleme istemcisi, güncelleme talep ederken benzersiz şekilde tanımlanabilir cihaz bilgisi sağlamadığından, GrapheneOS belirli kullanıcılara arka kapılı güncellemeler gönderme talebine uyamaz. Ancak, güncelleme sunucusu talep edenin IP adresini görebilir, bu da bir VPN veya Tor kullanılarak maskelenebilir.

### Yedeklemeler

GrapheneOS, bir cihazdan diğerine yedekleme oluşturmak veya veri aktarmak için bir çözüm olarak _Ayarlar &raquo; Sistem &raquo; Yedekleme_'ye yerleşik [Seedvault](https://github.com/seedvault-app/seedvault)'u içerir. İkincil kullanıcı profilleri kullanıyorsanız, her profil için bunu ayrı ayrı kurmanız gerektiğini unutmayın. Signal veya Molly gibi bazı uygulamalar, yalnızca uygulamaların kendisi aracılığıyla gerçekleştirilebilen bir tür uygulama veritabanı şifrelemesi kullanır. Yedeklemeleri saklamak için bir USB sürücü kullanmayı planlıyorsanız, yaygın bir uygulama, yedeklemeyi önce cihazın dahili depolamasında oluşturmak ve süreç tamamlandıktan sonra sürücüye taşımaktır.

Kullanıcı dosya yedeklemesinin tüm dosyalarınızı içermeyebileceği bilinen bir sorun da vardır. Bu nedenle, tüm önemli dosyalarınızı yedeklemek için Seedvault'a güvenmemelisiniz. Önemli dosyaların ayrı bir yedeğini, örneğin USB bağlantısı üzerinden bir dizüstü bilgisayara (_USB'yi 'Dosya Aktarımı' için kullan_) almanız önerilir. Burada da, bağlantıyı her profil için ayrı ayrı kurmanız gerekecek. GrapheneOS projesi, gelecekte Seedvault'u daha iyi ve daha güvenilir bir çözümle değiştirmeyi umuyor, ancak şu anda başka öncelikler var.

## İkincil Kullanıcı Profilleri {#profili-utente-secondari}

Kullanıcı profilleri, aynı cihazı birden fazla kullanıcının paylaşmasına veya bir kullanıcının telefonunda bölmeleme oluşturmasına izin veren ayrı telefonlara sahip olmayı simüle eder. Aşağıda, uygulamaları birbirinden izole etmek ve kullanıcı verilerini bölmelemek için bu özelliğin nasıl kullanılacağını inceleyeceğiz. Bundan önce, uygulama sandboxing'in sağladığı izolasyonun ve daha önce tartışılan erişim "scope"larının sunduğu bölmelemenin birçok kullanıcı için zaten yeterli olacağını belirtmek gerekir.

Yeni bir GrapheneOS kurulumunda, birden fazla profil varsayılan olarak devre dışıdır. Yine de, açılıştan sonra telefonun kilidini açtığınızda, "Owner" profiline, yani "cihazın sahibi olan kullanıcı"ya erişiyorsunuz demektir. Owner profili, Linux'taki ayrıcalıklı bir "root" kullanıcısı gibi bir şeyle karıştırılmamalıdır. Owner'ın diğer kullanıcılara kıyasla cihaz üzerinde daha fazla yönetimsel kontrolü olsa da, normal uygulamalar Owner ve diğer herhangi bir kullanıcı profilinde aynı erişime sahiptir.

Her kullanıcı, kendi kilit yöntemiyle korunan kendi anahtarlarıyla şifrelenir. Owner profili özeldir, çünkü sadece Owner'ın verilerini değil, aynı zamanda hassas, sistem genelindeki işletim sistemi verilerini de saklar. Bu nedenle, başka herhangi bir kullanıcı profili kullanılabilmeden önce Owner profilinin her zaman kilidi açılmalıdır. Owner profili ve içinde çalışan uygulamalar, başka bir profili kullanırken arka planda etkin kalmaya devam edecektir. Ancak, Owner profili diğer profillerde saklanan verilere erişemez.



### Profiller Arası Bildirimler

Yukarıdaki ekran görüntüsünde görülebileceği gibi, arka planda çalışan başka bir profilden bildirim alabilmeniz ilginç bir noktadır. Bildirim sadece hangi profilde gerçekleştiğini ve hangi uygulamanın oluşturduğunu belirtse de, bu, ikincil kullanıcı profilleriyle kullanıcı deneyimini önemli ölçüde iyileştiren bir GrapheneOS eklentisidir.

### Kullanım Örnekleri

Farklı kullanıcı profili türlerine geçmeden önce, sadece Owner profilini kullanmaya kıyasla birden fazla profil kullanmanın faydalarını tartışalım.

Her şeyden önce, yeni bir kullanıcı kurduktan sonra, sanki ilk kez açılmış gibi görünen bir telefonla karşılaşacaksınız. Zaten kurduğunuz kullanıcı uygulamalarının hiçbiri mevcut olmayacak, her şey boş olacak. Bu, aynı uygulamanın farklı hesaplarına erişmek istiyorsanız çok yararlı olabilir. Örneğin, birden fazla hesapla bir mesajlaşma uygulaması kullanmak istiyorsanız ama uygulama bu özelliği desteklemiyorsa, sadece farklı profillerde iki kez kurabilirsiniz.

Uygulamaları farklı profiller arasında ayırmak, birbirleriyle kolayca iletişim kurmalarını önler. Örneğin, ana Facebook uygulaması var ama ayrı bir Facebook Messenger uygulaması da var. Her iki uygulama da kabul ederse, bilgi alışverişi yapmak için işlemler arası iletişime benzer bir şey kullanabilirler - ama bu yalnızca aynı kullanıcı profilinde çalışıyorlarsa mümkündür.

Owner profilinizde arka planda çalışan uygulamalarınız varsa, manuel olarak durdurmadığınız sürece her zaman etkin olacaklardır. Nadiren kullandığınız uygulamalarınız varsa, bunları ikincil bir kullanıcı profilinde kurmak mantıklıdır. İşiniz bittiğinde, güç düğmesine basılı tutarak o kullanıcının oturumunu sonlandırma seçeneği sunulur. Bu, o profildeki tüm uygulamaların durdurulmasını ve verilerinin dinlenme durumuna alınıp tamamen şifrelenmesini sağlayacaktır.

Kullanıcı profillerini sadece geçici olarak oluşturup hemen silebilirsiniz de. Bir profilde kurulu uygulamalar diğer profillerin varlığından habersiz olduğundan, profilleri bir tarayıcının gizli modu gibi kullanabilirsiniz. Bir profilin dosya sistemi diğer profillerden tamamen izoledir ve aynı sonucu elde etmek için bir depolama scope'u kurabilseniz de, geçici profiliniz boş olacağından bu gerekli olmayacaktır.

Yukarıda tartışıldığı gibi, Otomatik Yeniden Başlatma özelliği, verilerin dinlenme durumuna alındığından ve adli bilişim şirketleri için kullanılabilir şifrelenmemiş veri olmadığından emin olmak için eklenmiştir. Düzenli kullanımınız için Owner yerine ikincil bir kullanıcı profili kullanırsanız, bu sorun çok daha az görülecektir: Owner'ın verilerini dinlenme durumuna almak bir yeniden başlatma gerektirirken, ikincil bir kullanıcının verilerini dinlenme durumuna almak basitçe oturumunu sonlandırmayı gerektirir.

Profillerin en yararlı özelliği ise, farklı gizlilik/güvenlik dengeleri ve farklı ağ kurulumlarıyla bölmelenmiş ortamlar oluşturmaktır. Örneğin, [Invizible Pro](https://invizible.net/en/downloads/) gibi uygulamalar sayesinde tamamen Tor altında bir profil, [WireGuard](https://download.wireguard.com/android-client/) ile VPN altında bir profil ve tamamen clearnet'te bir profil oluşturmak mümkündür, böylece 3 farklı tehdit modeline sahip olursunuz.

### Kullanıcı Profili Sayısı

GrapheneOS, ikincil kullanıcı profili sayısı sınırını 4'ten 32'ye çıkarır, bunlardan biri her zaman misafir kullanıcı için ayrılmıştır. Ancak, bu kadar çok kullanıcı profili oluşturabilmek, hepsinin aynı anda çalışabileceği anlamına gelmez, çünkü bu cihaz performansını olumsuz etkiler. GrapheneOS, cihaza yerleşik RAM miktarına göre maksimum eşzamanlı kullanıcı sayısını ölçeklendirir.

| | Pixel 9 Pro Fold | Pixel 9 Pro XL | Pixel 9 Pro | Pixel 9 | Pixel 8 Pro | Pixel 8 & 8a |
| ------- | ---------------- | -------------- | ----------- | ------- | ----------- | ------------ |
| RAM | 16 GB | 16 GB | 16 GB | 12 GB | 12 GB | 8 GB |
| Profil | 14 | 14 | 14 | 10 | 10 | 6 |

### Kullanıcı Profilleri: İleri Düzey Yapılandırmalar

Asla arka planda etkin kalması gerekmeyen kullanım senaryoları için kullanıcı profilleriniz varsa, Owner profili üzerinden o profili düzenleyerek _"Arka planda çalışmaya izin ver"_ seçeneğini devre dışı bırakabilirsiniz. Bu şekilde, kullanıcının oturumunu açıkça sonlandırmanıza gerek kalmaz, çünkü sadece başka bir profile geçmek öncekini dinlenme durumuna alacak, RAM, CPU ve pil tasarrufu sağlayacaktır.



### Profiller Arası Uygulama Kurulumu

Kullanıcı profillerinin diğer profillerden uygulamaları güncelleyebildiğini ve Owner profilinin uygulamalarını başka bir profile kurabildiğini öğrenince şaşırabilirsiniz. Her profilin dosya sisteminin tamamen izole olduğunu söylemedik mi? Evet, doğru, ama bu her profilin tamamen bağımsız bir işletim sisteminde çalıştığı anlamına gelmiyor; uygulama kodu, birçok özelliği daha kullanışlı hale getiren iletişim katmanları kullanılarak profiller arasında paylaşılabilir.

Uygulamaları profiller arasında klonlamaya ek olarak, her profil içinde ayrı ayrı uygulama mağazaları kurmak da mümkündür.

### Dezavantajlar

İkincil kullanıcı profillerini aktif olarak kullanmanın bazı zorlukları vardır. Örneğin, Otomatik Yeniden Başlatma özelliği tüm kullanıcı oturumlarının sona ermesine neden olarak önce Owner profilinin kilidini açmanızı zorunlu kılar. Bu, ayrıca o profillerdeki tüm uygulamaların zorla durdurulacağı ve o profile geri giriş yapana kadar bildirim almayacağınız anlamına gelir. Otomatik Yeniden Başlatmalar için çok kısa bir süre belirlemediğinizi varsayarsak, bu çok sık gerçekleşmemelidir.

Belirtildiği gibi, profil dosya sistemleri tamamen izoledir, bu da örneğin sosyal medyada görülen bir mizah görselini bir profilde paylaşıp başka bir profildeki bir mesajlaşma uygulaması üzerinden paylaşmanın yerel bir yolu olmadığı anlamına gelir. Yaygın çözümler arasında [Cryptomator](https://cryptomator.org/) gibi bulut tabanlı dosya senkronizasyonu veya dosya alışverişi için bir mesajlaşma uygulamasına sahip olmak yer alır, ancak bu gizlilik açısından ideal olmayabilir. [Syncthing](https://github.com/Catfriend1/syncthing-android) gibi uygulamalar veya bir FTP sunucusu+istemci uygulaması kullanarak yerel dosya senkronizasyonu kurabilirsiniz, ama bunlar genellikle yapılandırması can sıkıcıdır.

SMS doğrulaması gerektiren ikincil profillere uygulama kuruyorsanız, o kullanıcı için geçici olarak _"Telefon görüşmelerini ve SMS'i etkinleştir"_i etkinleştirmeniz gerekebilir.

### Private Space (Özel Alan)

Private space özelliği, Android'e yapılan yeni bir eklemedir. Teknik olarak, sadece Owner profili içine yerleştirilmiş ikincil bir kullanıcı profilidir: alan kilitlendiğinde, özel profilin kullanıcısı durdurulur ve alanın kilidi açıldığında, kullanıcı profili başlatılır. Owner ile paylaşılan pano (clipboard) hariç, ikincil bir kullanıcı profilinin olduğu şekilde ayrılmıştır.

Private space kullanmanın ikincil bir kullanıcı profiline kıyasla avantajı, bildirimler ve ayarlar gibi yerlerde, alan kilidi açıkken arayüzün "birleştirilmiş" olmasıdır. Bu, private space'ten bir bildirim olduğunda, Owner profilinde tam olarak görüntüleneceği anlamına gelir (sadece uygulama adının ve kullanıcının gösterildiği normal ikincil profillerle karşılaştırıldığında). Bu, onu özel bir kullanıcıdan biraz daha az izole hale getirse de, private space'ler çok daha kullanışlı olabilir.

31 mevcut ikincil profille karşılaştırıldığında, bir cihaz sadece bir private space'e sahip olabilir ve bu her zaman Owner'ın bir parçası olmalıdır. GrapheneOS projesi, private space'leri iyileştirmek için değişiklikler düşünüyor. Private space kullanıcısının kullanıcı yönetimi arayüzünde listelenmediği belirtilmelidir, bu da Owner'ın uygulamalarını private space'e kurmak gibi özelliklerin mevcut olmadığı anlamına gelir. Ayrıca, private space'i kilitlemek, bir ikincil profilin oturumunu sonlandırmanın yaptığı gibi şifreleme anahtarlarını silmez.

Tam kullanıcı profillerine kıyasla private space'lerin bir dezavantajı, onlara _"telefon görüşmeleri ve SMS"_ erişimi veremezsiniz. Bu, SMS doğrulamasını önler ve bazı uygulamaların kullanımını sınırlar.

### Work Profile (İş Profili)

Work profile'lar, kullanıcı deneyimi açısından private space'lere benzer. Aslında kurumsal BYOD (Kendi Cihazını Getir) uygulamaları için tasarlanmıştır, bu yüzden bunları oluşturmak için ayrı bir cihaz yönetim uygulaması gerekir. Bu uygulama ve bunun aracılığıyla ait olduğu şirket, work profile içindeki verilerin kontrolüne ve sahipliğine sahiptir. Ancak, harici bir sahip olmadan bir work profile oluşturmaya ve yönetmeye izin veren [Shelter](https://f-droid.org/en/packages/net.typeblog.shelter/) gibi yerel yönetim uygulamaları vardır. Her durumda, work profile kullanmak için, kendi yazmadığınız veya Shelter'ın kodunu doğrulamadığınız sürece, açık kaynaklı olsa da üçüncü taraf bir uygulamaya güvenmeniz gerekecektir.

Private space'ler daha iyi izolasyona, daha sağlam şifrelemeye ve Owner profiliyle daha iyi arayüz entegrasyonuna sahiptir. Work profile yönetim uygulamaları, Owner profili ile iç içe geçmiş work profile arasında çok fazla iletişime izin verebilir. Örneğin, work profile'lar profiller arası uygulama iletişimini engellemez, bu da kullanışlılığı artırabilir ama gizlilik ve güvenliği olumsuz etkileyebilir.

Genel olarak, kullanışlı ve yararlı araçlardır; onlarsız yapabiliyorsanız bu güvenlik ve gizlilik için bir nimettir, ama aynı anda kullanmanız gereken iki "kimliği" bölmelemeniz gerekiyorsa ideal bir seçenektirler.

### VPN

VPN kullanımı için genel en iyi uygulama, her kullanıcının farklı bir çıkış IP adresi almak için ayrı bir VPN bağlantısına sahip olmasıdır. Bu nedenle, tüm profiller (work profile'lar ve private space'ler dahil) tasarım itibariyle kendi VPN yapılandırmasına sahiptir. Bu, dışarıdan bir tarafın bunları aynı çıkış IP adresine dayanarak birbirine bağlamasını önler.

_"Her zaman açık VPN"_ ve _"VPN olmadan bağlantıları engelle"_ geçişlerini etkinleştirerek bir profilin internete doğrudan erişmesini önleyebilirsiniz. GrapheneOS, veri sızıntılarını, yani VPN bağlantılarının atlanmasını önlemek için Android'de birçok iyileştirme yapmıştır.

Şu anda, GrapheneOS projesi sadece resmi WireGuard uygulamalarını (herhangi bir ticari veya kendi barındırılan VPN ile kullanılabilir) ve Mullvad'ı kullanmayı önerir.

## Uygulamalar {#applicazioni}

Yeni bir GrapheneOS kurulumu minimum sayıda uygulama içerir ve bunun birkaç nedeni vardır: işletim sistemine daha fazla uygulama dahil etmek saldırı yüzeyini başlangıçtan itibaren artırır. GrapheneOS, kurulacak uygulama seçimini kendi yargılarına göre kullanıcılara bırakmayı tercih eder. Proje, gizlilik ve güvenliğe yönelik anlamlı iyileştirmelere odaklanmıştır ve işletim sistemine daha fazla uygulama dahil etmek muhtemelen bu hedefe aykırı olacaktır. Ayrıca, GrapheneOS, çok azı gerçekten değerleri ve hedefleriyle uyumlu olacağından üçüncü taraf uygulama ve servisleri entegre etmekten kaçınır.

Mevcut az sayıda uygulama arasında, GrapheneOS kendi 'Uygulama Mağazası'nı içerir. Bu depo, esas olarak doğrudan GrapheneOS projesi tarafından geliştirilen uygulamaları ve açık kaynaklı uygulamaların güçlendirilmiş sürümlerini dağıtmak içindir. Mevcut uygulama listesi kasıtlı olarak minimal tutulacak, üçüncü taraf uygulamalar ise GrapheneOS'un resmi olarak onayladığı mağaza olan Accrescent'e dahil olmayı hedeflemeli, Graphene App Store üzerinden kurulabilir.

### Önceden Kurulu Uygulamalar

GrapheneOS'ta önceden kurulu az sayıda uygulama arasında, yaklaşık yarısı küçük değişikliklerle Android Open Source Project'ten (AOSP) gelir ve işlevsellik ve kullanıcı deneyimi açısından oldukça ilkeldir. Birçok AOSP uygulaması, Android'in kullanıcı arayüzünün daha basit ve beklentilerin daha düşük olduğu 10+ yıl önce harikaydı. Zamanla, Google bunları stok sistem için daha modern versiyonlarla değiştirdi ve açık kaynaklı versiyonları terk etti. GrapheneOS bunları yenilemeyi veya değiştirmeyi planlıyor, ancak olası alternatiflerle genellikle lisanslama sorunları var.

Kamera, Galeri ve Klavye gibi uygulamaların Google versiyonlarını tercih ediyorsanız, invaziv kullanım istatistiği toplamayı etkinleştirmeden veya fotoğrafları servislerine yüklemeden bunlara geçebilirsiniz. Ekran görüntüsü düzenleyici (Markup) ve Termometre (uygun sensöre sahip Pixel'ler için) gibi bazı stok Android uygulamaları, Play Store'da mevcut olmadıklarından GrapheneOS Uygulama Mağazası'nda mevcuttur.

GrapheneOS'un tüm stok uygulamalarının yine de yüksek kalitede olduğunu ve güvenlik ve gizlilik için optimize edildiğini belirtmekte fayda var: örneğin, stok kamera çektiğiniz fotoğraflardan metadata'yı kaldırır ve tüm uygulamalar çalışmak için yalnızca gereken minimum izinlere sahiptir.

### Kamera

GrapheneOS'a dahil olan Kamera uygulaması zaten modernize edilmiştir, gizlilik ve güvenliğe odaklanmıştır ve muhtemelen açık kaynaklı alternatiflerden veya çoğu ücretli uygulamadan daha iyidir. Fotoğraf, video çekme ve QR/barkod tarama modları içerir. HDR+, Gece modu, çoklu kamera yakınlaştırma, EIS vb. destekler. Stok Android'e kıyasla fotoğraf kalitesinde kayıp yoktur.

Ancak, stok 'Pixel Camera' uygulamasının tam özellik yelpazesini sunmaz. Eski adıyla Google Camera olan Pixel Camera, GrapheneOS'ta mevcut tüm kameralardan ve görüntü işleme donanımından tam olarak yararlanabilir. Saldırı yüzeyini azaltmak için, Google uygulamalarının doğrudan donanım erişimi ek bir anahtar aracılığıyla kontrol edilir. _'Google uygulamaları için donanım hızlandırıcılarına özel erişim'_ anahtarı varsayılan olarak etkindir ama herhangi bir ek veri erişimi vermez.

Daha yüksek kaliteli fotoğraflar istiyorsanız, Google Camera'yı kurup uygulama için internet erişimini devre dışı bırakabilirsiniz.

### Galeri

GrapheneOS, mevcut Galeri uygulamasını tamamen değiştirmeyi planlıyor, ama şu anda kabul edilebilir bir lisansa ve yeterli görüntü düzenleme kabiliyetine sahip bir uygulama yok. Sağlam bir açık kaynaklı alternatif arıyorsanız, GrapheneOS [IacobIonut01/Gallery](https://github.com/IacobIonut01/Gallery/blob/main/README.md) ve [Aves](https://github.com/deckerst/aves/blob/develop/README.md)'i öneriyor. Kişisel olarak, galerisi dahil tüm [Fossify](https://fossify.org) uygulama paketini de mükemmel buluyorum; stok alternatifi açık kaynaklı uygulamalar arıyorsanız, bunların hepsi harika.

### Klavye

GrapheneOS'un varsayılan klavyesi esasen Google'ın 2014'ten Gboard'udur. Bazı kapalı bileşenleri olan açık kaynaklı bir proje olarak başladı, ama tamamen kapalı kaynak hale geldi ve Gboard olarak yeniden markalandı. İmleci hareket ettirmek için boşluk çubuğunda kaydırma, tek el modu, daha iyi emoji işleme ve en önemlisi kaydırarak yazma gibi bazı özellikler eksiktir.

Google'ın modern Gboard'u şu anda kesinlikle mevcut en iyi klavyelerden biridir. Kullanım istatistikleri ve diğer invaziv seçenekleri etkinleştirmediğiniz sürece kullanmak sorun değildir. Aktif klavyelerin her zaman yazılan tüm metne, düzenlenen metne ve pano içeriğine erişimi olduğunu unutmayın.

Açık kaynaklı bir alternatif arıyorsanız, şu anda bence en iyi açık kaynaklı Android klavyesi olan [HeliBoard](https://github.com/Helium314/HeliBoard)'u düşünün. Florisboard veya FUTO Keyboard gibi başka alternatifler de var, ama bunları hâlâ oldukça olgunlaşmamış buluyorum.

Bir seçenek de ağ izinleri kaldırılmış Gboard kullanmak olabilir, ancak kişisel olarak bu seçeneği önermeme eğilimindeyim.

### Vanadium Tarayıcısı

GrapheneOS, gizlilik ve güvenlik iyileştirmeleriyle Chromium tabanlı Vanadium alt projesini içerir. Hem işletim sisteminin varsayılan tarayıcısı olarak hem de web içeriği görüntülemesi gereken diğer uygulamalar tarafından kullanılır. Proje, tarayıcıyı olduğu gibi kullanmayı önerir; ek uzantılar veya değişiklikler sizi sadece daha ayırt edilebilir hale getirebilir, bu da takip edilmenizi kolaylaştırır. Web sitelerinin standart sensörlere erişmesini önlemek için tarayıcı uygulaması için _'Sensörler'_ iznini devre dışı bırakabilirsiniz.

Günlük kullanım için şiddetle önerilen çok yüksek kaliteli bir tarayıcıdır. Mobil cihazlarda, Firefox tabanlı tarayıcılardan kesinlikle kaçının, çünkü çok daha düşük güvenlik seviyeleri sunuyorlar.

## Uygulama Uyumluluğu

Şu anda, çok küçük bir Android uygulaması alt kümesi GrapheneOS ile uyumsuzdur. Bunlar özellikle, işletim sisteminin Google tarafından resmi olarak sertifikalandırılmasını gerektiren Play Integrity API'sini kullanan uygulamalardır. Bu öncelikle bankacılık/finans uygulamalarını, Ingress gibi konum tabanlı yarışmalı oyunları ve McDonald's uygulaması, Authy ve Uber sürücü uygulaması gibi bazı tuhaf durumları etkiler. Bu özelliği uygulayarak, bu uygulamalar alternatif ve değiştirilmiş işletim sistemlerinin kullanımını yasaklamayı seçerler.

Bu, Google Pay üzerinden NFC ödemelerini de önler. Pratikte, durum bankadan bankaya çok değişir: bazı Avrupa bankacılık uygulamaları ve bazı tescilli cüzdanlar çalışır, diğerleri çalışmaz. GrapheneOS'ta temassız ödemeleri genel bir garanti olarak değil, vaka bazında doğrulanması gereken bir şey olarak düşünün.

GrapheneOS, stok Android ile aynı standart güvenlik modelini sunsa da, Google işletim sistemlerini güvenlik temelinde değil, lisanslanıp lisanslanmadığına göre sertifikalandırır. Bu kısıtlamaların bazılarını aşmanın yolları vardır, ama bunlar zamanla muhtemelen engellenir ve sadece geçici bir çözüm temsil eder. GrapheneOS projesine göre, tek kalıcı çözüm, bunun son derece anti-rekabetçi ve yasa dışı bir davranış olduğu gerçeğine dayanan düzenleyici veya yasal eylemdir. Kişisel olarak, bu kavgayı tamamen önemsiz buluyorum, çünkü Bitcoin veya nakit gibi daha iyi ödeme yöntemleri kullanabilirsiniz.

### Play Services'e Bağımlılık

Graphene'in uygulama uyumluluğunun bir başka yönü, bazı uygulamaların Google'ın Play Services'ine bağımlı olmasıdır, genellikle mesajlaşma ve sosyal medya için. Birçok uygulama, bildirim almak için Google'ın Firebase Cloud Messaging'ine (FCM) güvenir. Bazı uygulamalar kendi push veya sık yoklama mekanizmalarına geri dönebilir, ama bu genellikle uygulamayı bir ön plan servisiyle çalıştırmayı gerektirir.

Bir örnek, FCM mevcut olmadığında kendi push mekanizmasını kullanan Signal'dir. Ancak, kötü performans ve verimsizlik (aşırı pil tüketimi) raporları olmuştur. Alternatif olarak, Play Services olmadan kullanım için [Molly](https://molly.im/) istemcisi genellikle önerilir.

Play Services'e sıkı sıkıya bağımlı uygulamalar için, resmi Google Play Services'i standart uygulama sandbox'ıyla sınırlı olarak kurma ve kullanma seçeneğiniz vardır. Uyumluluk katmanı sayesinde, Google Play GrapheneOS'ta herhangi bir özel erişim veya ayrıcalık almaz. Henüz taşınmamış veya doğası gereği ayrıcalıklı olduğundan uygulanamayan küçük bir özellik alt kümesi dışında neredeyse tam uyumluluk sağlar. Play Store ve servisleri, uygulama içi satın alımlar ve uygulama/içerik lisans kontrolleri dahil olmak üzere tamamen kullanılabilir. Bir uygulama kaynağı olarak yetkilendirildiği ve her eylem için onay verildiği sürece, uygulamaları normal şekilde kurabilir, güncelleyebilir ve kaldırabilir.

Uyumluluk katmanını kullanmak için, GrapheneOS Uygulama Mağazası'ndan 'Google Play services'i kurun. Bu, Play Services'in bir bağımlılığı olan Play Store'u da kuracaktır. Android 15'ten önceki eski kurulumlarda, **Google Services Framework** da görünebilir: eğer oradaysa, kaldırmayın. Play Store'u kullanmak, yalnızca Play Store'dan uygulama kurmak veya hesaba bağlı özellikleri kullanmak istiyorsanız bir Google hesabına erişim gerektirir.

Play Services'i kurduktan sonra, uyumluluk katmanından bir _"Eksik isteğe bağlı izin"_ bildirimi alacaksınız. Buna dokunmak, Google Play Services'in her zaman arka planda çalışmasına izin vermek isteyip istemediğinizi soracak, bu Google'ın FCM sunucusuna güvenilir bildirimler için açık bir bağlantı tutar ama pil ömrünü azaltır. Kabul etmek, arka plan kullanımını 'Sınırsız' olarak ayarlayacaktır. 'Optimize Edilmiş' olarak bırakmak, ne kadar kullanıldığına bağlı olarak arka plan kullanımını ağır şekilde kısıtlayacak, devre dışı bırakmak ise arka plan kullanımını neredeyse tamamen önleyecektir. FCM push bildirimlerinin sizin için ne kadar önemli olduğuna göre seçim yapın.

Google'dan mümkün olduğunca kaçınmak istiyorsanız, sadece gerçekten ihtiyacınız olan profile kurabilirsiniz. En basit seçim genellikle Owner profili olarak kalır; eğer Google'a bağımlı uygulamaları bölmelemek istiyorsanız, Play Services'i ayrı bir kullanıcı veya work profile'a kurun ve cihazın kalanını temiz tutun.

### Android Auto

Android telefonunuzu arabanıza bağladıysanız, muhtemelen Android Auto'yu biliyorsunuzdur. Aslında ayrıcalıklı erişim gerektirir, ama GrapheneOS'un sandboxed uyumluluk katmanı, azaltılmış bir ayrıcalık seviyesiyle kullanılabilir hale getirir. Android Auto'nun resmi sürümlerini kurabilir ve kullanabilirsiniz, ama GrapheneOS Uygulama Mağazası üzerinden kurulması gerekir.

Kurulumdan sonra, _Ayarlar &raquo; Uygulamalar &raquo; Sandboxed Google Play &raquo; Android Auto_'yu açın ve en azından _"Kablolu Android Auto için izinlere izin ver"_i etkinleştirin. Sadece bu anahtarla çalışmazsa, kablosuz izinlerini de etkinleştirmeniz gerekebilir. Ses, telefon görüşmelerini ve bildirimleri Android Auto'ya yönlendirmek için ek izinler kendi takdirinize göre verilebilir. Android Auto'nun şu anda bir private space'ten veya work profile'dan çalışmadığını unutmayın.

### Obtainium ve App Verifier

Android'de, bir uygulamayı kurmak veya güncellemek için indirilen paket dosyaları kriptografik olarak imzalanır. Bir uygulama kurulduktan sonra, kurulum paketinin imzalayanı saklanır, bu da onu güncellemeye çalışan tüm gelecekteki paketlerin aynı geliştiricinin imzasına sahip olması gerektiği anlamına gelir. Bu ilkeye Trust-On-First-Use (TOFU) denir ve bir uygulamanın gelecekteki güncellemelerinin kötü niyetli kaynaklardan gelemeyeceğini garanti eder.

Ancak, bu, ilk kurulum için kullanılan paketin gerçekten sandığınız kaynaktan geldiğini garanti etmez. Burada, uygulama mağazaları, uygulama paketini indirmeden önce bile bir uygulamanın gerçek imzalayanının kim olması gerektiğini mağazanın kendi metadata'sı aracılığıyla belirleyerek yararlı bir rol oynar. Öte yandan, bir uygulama mağazası güvenilecek başka bir üçüncü taraf ekler ve burada Obtainium bir azaltma olarak yararlı olabilir.

[Obtainium](https://github.com/ImranR98/Obtainium), Android uygulamalarını doğrudan kaynaktan, örneğin bir GitHub releases sayfasından almanızı ve güncel tutmanızı sağlar. [AppVerifier](https://github.com/soupslurpr/AppVerifier) ile birleştirildiğinde, kurmak üzere olduğunuz paketin gerçekten uygulamanın gerçek geliştiricisinden geldiğinden emin olabilirsiniz. Bu, uygulama mağazalarının sunduğu önemli bir güvenlik özelliğinden ödün vermeden uygulama yönetimini daha merkeziyetsiz hale getirir. Ancak, GrapheneOS projesi en merkeziyetsiz çözümün Obtainium'u kendilerini güncelleyen uygulamalarla değiştirmek olacağını savunuyor.



### Accrescent

[Accrescent](https://accrescent.app/), GrapheneOS projesine katkıda bulunan biri tarafından yönetilen, güvenlik odaklı bir yaklaşıma sahip bir uygulama mağazasıdır. GrapheneOS Uygulama Mağazası'nda mevcuttur ve hâlâ sınırlı bir kataloğa sahip olsa da, F-Droid'den daha sağlam metadata ve dağıtımla uygulama edinmek için en ilginç yönlerden biridir. GrapheneOS projesi, Accrescent'e geniş bir üçüncü taraf uygulama yelpazesinin (kapalı kaynaklı ve açık kaynaklı) güvenli barındırılmasını devretmeyi amaçlıyor, işletim sisteminin kendi uygulama deposu ise birinci taraf uygulamalarla ve muhtemelen az sayıda yararlı, biraz değiştirilmiş ve güçlendirilmiş üçüncü taraf fork ile sınırlı olacak.

Accrescent'in en iyi uygulama edinme yollarından biri haline gelmesi umulurken, hâlâ önemli ölçüde büyümek için finansman ve katkıda bulunanlardan yoksun. GrapheneOS projesi, sorunlu güvenlik yaklaşımı nedeniyle birçok kez eleştirilmiş olan F-Droid'e bir alternatif olarak bu gelişimi aktif olarak destekliyor.

Accrescent, AppVerifier kullanmaya veya anahtar parmak izini manuel olarak kontrol etmeye gerek kalmadan, imzalı metadata aracılığıyla indirme ve ilk kurulumu düzgün şekilde güvence altına alır, ancak istenirse kurulumdan sonra bunu yapmak hâlâ mümkündür.

### F-Droid

[F-Droid](https://f-droid.org/), münhasıran açık kaynaklı Android uygulamaları için bir depo olarak bilinir. GrapheneOS projesi F-Droid'i eleştirmiştir ve üçüncü taraf uygulamalar için bir mağaza olarak önermez. Ana sebep, F-Droid'in çoğu uygulamayı eski altyapıda doğrudan kaynak koddan derlemesi ve ortaya çıkan paketlerin kendileri tarafından kriptografik olarak imzalanmasıdır, bu da F-Droid kullanıcılarının gelecekte toplu olarak ele geçirilmesine ilişkin kaygılar doğurur.

Geliştirici tarafından imzalanmış paketlerin bir avantajı, geçerli bir imzaya sahip kötü amaçlı bir paket oluşturmanın imzalama anahtarını ele geçirmeyi gerektirmesidir. Bu, F-Droid'in paketleri kör bir şekilde oluşturup imzalamak için kullanabileceği GitHub gibi platformlarda kaynak koda kötü amaçlı değişiklikler eklemekten muhtemelen daha zordur.

Genel olarak uygulama indirmek için mükemmel bir mağaza yoktur; F-Droid istemcisi [Droidify](https://droidify.eu.org/), bu uygulama mağazasının bazı sorunlarını çözer ve bu nedenle orijinal istemci yerine önerilir.

Ne yazık ki şu anda Graphene'de uygulama indirmek için kesin bir çözüm yok, aşağıda okuyacağınız gibi, her seçim güvenlik, gizlilik veya kolaylık avantajları sağlarken sırayla başka sorunlar getiriyor. İhtiyaçlarınıza en uygun çözümü kullanın.

### Play Store ve Aurora Store

Şu anda, resmi Google Play Store uygulaması, özellikle [APKPure](https://apkpure.com/apkpure-app.html) gibi tüm Play Store uygulama paketlerinin kopyalarına sahip olan ve genellikle bölgesel kısıtlamaları atlamak için kullanılan ayna sitelere kıyasla, kapalı kaynaklı uygulamaları kurmak için en güvenli (ama gizlilik dostu olmayan) yöntem olmaya devam ediyor. Tekrar belirtmek gerekirse, Google'ın Play Store ve Play Services uygulamaları GrapheneOS'ta özel ayrıcalıkları olmayan normal uygulamalar olarak ele alınır ve bunları ikincil bir profile ayırma kararı kullanıcıya bağlıdır.

[Aurora Store](https://f-droid.org/en/packages/com.aurora.store/), Google Store deposu için alternatif bir istemcidir. Resmi Play Store uygulamasını kurmaktan kaçınmanızı sağlar ve diğer Aurora kullanıcılarıyla paylaşılan anonim bir Google hesabı kullanma yeteneği sunar. GrapheneOS projesi, daha zayıf güvenliği ve bazı uygulamaların kaynağından olumsuz etkilenebileceği gerçeği nedeniyle Aurora kullanmaya karşı uyarıyor. Aurora'nın güvenilmez anonim seçeneğini kullanmak yerine, resmi Play Store'da tek kullanımlık bir telefon numarasıyla tanımlanamayan bir hesap her zaman oluşturabilirsiniz.

Birçok Google uygulaması, servisi ve altyapısı kullanmanın GrapheneOS kullanma amacıyla çelişebileceğine dair eleştiriler var. Bu noktada, proje GrapheneOS'un amacının özellikle Google'dan kaçınmak değil, kullanıcı deneyimi açısından büyük fedakarlık yapmak istemeyenler için de yüksek bir gizlilik ve güvenlik seviyesi sağlamak olduğunu açıklığa kavuşturuyor. Google servisleri için tamamen işlevsel bir uyumluluk katmanı sağlamak için yapılan süregelen çalışma önemsiz bir özellik değil, ama GrapheneOS'un büyük kaynak yatırdığı bir özellik. Her durumda, taze bir GrapheneOS kurulumu tamamen Google'dan arınmıştır ve uyumluluk katmanını kullanma veya ondan kaçınma seçimi tamamen sizindir.

### Çeşitli mağazalar hakkında düşünceler

Kişisel olarak, Obtainium'u harika bir uygulama buluyorum, ama ne yazık ki kullanıcıların yeni uygulamaları "keşfetmesine" izin vermemesi, sadece belirli uygulamaları indirmesine izin vermesi konusunda yetersiz kalıyor.

Droidify, Aurora ve Google Play'den bahsetmişken, bugün şöyle özetleyebilirim: **Droidify/F-Droid**, güvenlik dengelerini kabul ediyorsanız açık kaynaklı yazılım için mantıklı; **Google Play**, tescilli uygulamalar için en sağlam kaynak olarak kalıyor; **Aurora**'yı ana seçim olarak değil, ikincil veya acil durum seçeneği olarak tutardım.

Google'ın Play Store'u en güvenli çözümdür ama en büyük gizlilik dengeleri (izinler, bağımlılıklar, hesap ve kişisel veriler) gereklidir. Çok yüksek güvenlik istiyorsanız, bu dış saldırılara karşı en dirençli yöntem olarak kalır. Bana göre, tüm mağazalar farklı pazar taleplerini karşılıyor.

## Sorunlar ve Çözümler

### Konum Belirleme Sorunları

Konum belirleme, başlangıçta Google'ın Play Services tarafından sağlanan başka bir servistir. Bunun yerine, GrapheneOS konum isteklerini işletim sistemine yönlendirir, bu da sadece uydu konumlandırma (GNSS) kullanır ve uydu sinyalinin alınmasını gerektirir. Bu, gökyüzünün beton bir tavan tarafından engellendiği durumlarda güvenilmez olabilir, bu da konum tabanlı uygulamaların GrapheneOS'ta düzgün çalışmadığına dair birçok şikayete neden olur.

Bir hücresel operatörünüz ve internet bağlantınız varsa, cihaz yakındaki hücre kuleleri (SUPL) ve mevcut uydu durumları/yörüngeleri (PSDS) hakkında bilgi isteyerek desteklenen uydu konumlandırmasını (A-GNSS) kullanabilmelidir. Bunlar konum elde etme hızını büyük ölçüde artırır. Varsayılan olarak, GrapheneOS, SUPL/PSDS isteklerini IP adresinizle ilişkilendirmeyi önlemek için kendi proxy sunucularını kullanır.

İsteğe bağlı olarak _Ayarlar &raquo; Konum &raquo; Konum servisleri_'nde Wi-Fi ve Bluetooth taramasını etkinleştirebilirsiniz. Bu, _"Yakındaki cihazlar"_ iznine sahip uygulama ve servislerin, Wi-Fi ve Bluetooth kapalı olsa bile yakındaki Wi-Fi ağlarını ve Bluetooth cihazlarını taramasına izin verir, bu da potansiyel olarak konum tabanlı özellikleri iyileştirir. GrapheneOS projesi bunun kendi uygulamasını geliştirmek üzerinde çalışıyor, başlangıçta Apple'ın sunucuları için bir proxy olarak, daha sonra ise tescilli bir veritabanı olarak.

Sandboxed Play Services kurduysanız ve daha doğru konum tahminleri sağlamak için Google'ın ağ konum servisini kullanmak istiyorsanız, önce _Ayarlar &raquo; Uygulamalar &raquo; Sandboxed Google Play_'de _"Konum isteklerini işletim sistemine yönlendir"_ seçeneğini devre dışı bırakmanız gerekir. Ardından, Play Services'in konum iznini _"Her zaman izin ver"_ olarak değiştirmeniz ve _"Hassas konumu kullan"_ı etkinleştirmeniz gerekir. Ağ taramasının kullanılmasına izin vermek için, _"Yakındaki cihazlar"_ iznini de vermeniz gerekir (yukarıda bahsedilen Wi-Fi ve Bluetooth tarama anahtarlarının zaten etkin olması gerekir). Son olarak, _Ayarlar &raquo; Uygulamalar &raquo; Sandboxed Google Play_'e geri dönün, _"Google Konum Doğruluğu"_na dokunun ve _"Konum doğruluğunu iyileştir"_ seçeneğini etkinleştirin.

Yönlendirme seçeneği global değildir, bu yüzden Google'ın invaziv konum servislerini kullanmak için özel olarak ikincil bir kullanıcı profili kurmayı düşünebilirsiniz, sadece konum belirleme sorunları yaşadığınızda kullanılmak üzere.

### Çökmeler/Çalışmayan Uygulamalar

Daha önce belirtildiği gibi, GrapheneOS'ta bazı uygulamaların çökmesi veya düzgün çalışmayı reddetmesi sürpriz değildir, ama bu neredeyse her zaman çözülebilir. Her şeyden önce, uygulamanın önbelleğini temizlemek, uygulamayı zorla durdurup yeniden başlatmak, telefonu yeniden başlatmak veya uygulamayı yeniden kurmak gibi standart adımları deneyin.

GrapheneOS'a özgü çözümler arasında bazı istismar koruması önlemlerini devre dışı bırakmak, uygulamayı bir private space dışında yeniden kurmak (Owner veya diğer ikincil profiller) veya uygulamayı sandboxed Play Services'e sahip bir profile yeniden kurmak yer alır. Bazen uygulamalar, kurulu oldukları uygulama (örneğin uygulama mağazası) artık etkin veya kurulu olmadığı için çökmeye başlar, veya beklenen kaynaktan kurulmadıkları için düzgün çalışmayı reddederler.

### Uygulama Kurulmayı Reddediyor

Bu sorunun tipik nedenleri yukarıda açıklanmıştır: zaten daha yeni bir sürümde mevcut olan veya başka bir kullanıcı profilinde farklı bir kaynaktan gelen bir uygulamayı kurmaya çalışıyorsunuz.

### Destek İsteme

GrapheneOS çok aktif bir topluluğa sahiptir ve sosyal medyada hızlı yanıt verir. Sorunlarınıza mevcut çözümleri aramak için en kolay yerler muhtemelen [discuss.grapheneos.org](https://discuss.grapheneos.org/) forumu ve [Discord sunucusudur](https://discord.com/invite/grapheneos). GrapheneOS'un [Twitter/X](https://x.com/i/communities/1530455827949273094), [Telegram](https://t.me/GrapheneOS) ve [Matrix](https://matrix.to/#/%23community:grapheneos.org) üzerinde de toplulukları vardır.

## Projeyi Destekleyin

Bu rehber size yardımcı olduysa, bana teşekkür etmenin en iyi yolu bu makaleyi arkadaşlarınızla, ailenizle, sosyal medyada ve telegram gruplarıyla paylaşmaktır: bu, en çok takdir edilen jest olmaya devam ediyor <3

Sorularınız varsa, telegram profilim [@b4lolx](https://t.me/b4lolx) üzerinden veya admin@b4.lol e-posta adresinden benimle iletişime geçebilirsiniz. Okuduğunuz için teşekkürler!

---

## İlgili Kılavuzlar

- **[De-Google Android: Eksiksiz Gizlilik Kılavuzu](/tr/android)** - Herhangi bir de-google'lanmış Android telefon için tam yapılandırma
- **[Tehdit Modeli Nasıl Oluşturulur](/tr/threat-model)** - Savunma araçlarınızı seçmeden önce tehditlerinizi tanımlayın
- **[AdBlock ile Kendi Sunucunuzda VPN](/tr/vpn)** - GrapheneOS trafiğinizi kişisel bir VPN ile koruyun
- **[Tor Düğümü Eğitimi](/tr/tor)** - Anonim olarak gezinin ve Tor ağına katkıda bulunun

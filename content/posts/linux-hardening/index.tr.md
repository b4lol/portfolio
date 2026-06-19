---
title: "Linux Sertleştirme: Eksiksiz Güvenlik Kılavuzu"
description: "Eksiksiz Linux sertleştirme kılavuzu: güvenli dağıtım seçimi, LUKS disk şifreleme, güvenlik duvarı, çekirdek sertleştirme, Flatpak sandboxing ve Secure Boot."
summary: "Eksiksiz Linux sertleştirme kılavuzu: güvenli dağıtım seçimi, LUKS disk şifreleme, güvenlik duvarı, çekirdek sertleştirme, Flatpak sandboxing ve Secure Boot."
keywords: ["linux sertleştirme", "linux güvenlik", "linux güvenlik rehberi", "güvenli linux dağıtımı", "fedora hardening", "secureblue", "debian güvenlik", "qubes os", "qubes os güvenlik", "linux güvenlik duvarı", "linux disk şifreleme", "LUKS şifreleme", "flatpak güvenlik", "kernel hardening", "secure boot linux", "güvenli linux masaüstü", "linux çekirdek sertleştirme", "wayland güvenlik"]
author: "b4lol"
date: 2026-03-10
lastmod: 2026-05-05
url: /tr/linux-hardening
series: ["Güvenlik", "Dijital Gizlilik"]
topics: ["privacy-security"]
faq:
  - question: "En güvenli Linux dağıtımı hangisidir?"
    answer: "Evrensel bir cevap yok. Fedora Workstation ve Atomic varyantları güvenlik, güncelleme ve kullanılabilirlik arasında çok iyi bir denge sunar. SecureBlue, Fedora Atomic tabanlı daha da sertleştirilmiş bir seçenektir. Kararlılığı tercih ediyorsanız Debian en sağlam, en az bakım gerektiren temeldir. Bölümleme yoluyla aşırı izolasyon için Qubes OS, anonimlik için ise Whonix referans noktasıdır."
  - question: "Linux, Windows veya macOS'tan daha güvenli midir?"
    answer: "Linux daha fazla kontrol ve şeffaflık sunar, ama otomatik olarak daha güvenli değildir. Sertleştirme yapılmadan bir Linux masaüstü sistemi, güncel bir Windows 11 veya macOS kurulumundan daha az korunmuş olabilir. Güvenlik, yapılandırmaya ve kullanıcı alışkanlıklarına bağlıdır."
  - question: "Güvenlik için rolling release kullanmalı mıyım?"
    answer: "Genel olarak evet. Rolling release dağıtımlar, paketleri backport yapmak yerine doğrudan upstream sürümüne güncelledikleri için güvenlik yamalarını daha hızlı alır. Fedora ve openSUSE Tumbleweed bu yaklaşımla iyi seçimlerdir."
  - question: "Full disk encryption bilgisayarı yavaşlatır mı?"
    answer: "Modern donanımda performans etkisi ihmal edilebilir düzeydedir (%1-3). Güncel işlemcilerde donanımsal AES komutları bulunur ve bu da şifrelemeyi neredeyse şeffaf hale getirir. En önemli güvenlik adımlarından biridir ve getirdiği maliyet çok düşüktür."
  - question: "Sandboxing için Flatpak ile Firejail arasındaki fark nedir?"
    answer: "Flatpak, uygulamaları namespace'ler ve ayrıntılı izinlerle izole eder ve çoğu kullanıcı için önerilen çözümdür. Firejail, Flatpak olarak sunulmayan uygulamalar için kullanışlıdır ama daha büyük bir saldırı yüzeyine sahip bir SUID ikilik dosyasıdır. Mümkün olduğunda Flatpak kullanın."
  - question: "Linux sistemimin sertleştirilmiş olduğunu nasıl doğrularım?"
    answer: "Eksiksiz bir denetim için Lynis kullanın (sudo lynis audit system). Güvenlik duvarının aktif olduğunu, SELinux/AppArmor'un enforcing modda çalıştığını, çekirdek parametrelerinin uygulandığını (cat /proc/cmdline) ve gereksiz hizmetlerin dinlemede olmadığını (ss -tulnp) manuel olarak kontrol edin."
howto:
  name: "Masaüstü bir Linux sistemi nasıl sertleştirilir"
  description: "Güvenli bir dağıtım seçme, diski şifreleme, ağı, çekirdeği, sandboxing'i, Secure Boot'u, hizmetleri ve güvenlik kontrollerini yapılandırma prosedürü."
  totalTime: "PT3H"
  supply:
    - "Linux uyumlu bilgisayar"
    - "Güncel Linux dağıtımı"
    - "Veri yedeği"
  tool:
    - "LUKS"
    - "Güvenlik duvarı"
    - "Flatpak"
    - "Lynis"
  steps:
    - name: "Dağıtımı seçin"
      text: "Güncel, SELinux veya AppArmor destekli, iyi rollback özellikli ve Wayland destekli dağıtımları tercih edin."
      url: "/tr/linux-hardening#scelta-distro"
    - name: "Disk şifreleme ile kurulum yapın"
      text: "LUKS'u etkinleştirin, güvenli swap yapılandırın ve kimliği belli etmeyen bir kullanıcı adı ve hostname seçin."
      url: "/tr/linux-hardening#installazione"
    - name: "Ağ ve güvenlik duvarını yapılandırın"
      text: "Güvenlik duvarını, güvenli DNS'i, MAC randomizasyonunu ve güvenilir zaman senkronizasyonunu ayarlayın."
      url: "/tr/linux-hardening#rete"
    - name: "Çekirdek sertleştirmesi uygulayın"
      text: "sysctl, boot parametrelerini, çekirdek modüllerini ve bellek azaltımlarını yapılandırın."
      url: "/tr/linux-hardening#kernel"
    - name: "Uygulamaları izole edin"
      text: "Flatpak'i tercih edin, ayrıntılı izinler yapılandırın ve Firejail veya MAC'i yalnızca gerektiğinde değerlendirin."
      url: "/tr/linux-hardening#sandboxing"
    - name: "Kurulumu doğrulayın"
      text: "Güvenlik duvarını, hizmetleri, çekirdek parametrelerini, sandbox'ı ve özel araçlarla denetimi kontrol edin."
      url: "/tr/linux-hardening#verifica"
---

> **TL;DR** - Bu kılavuzda öğrenecekleriniz:
> - Güvenlik ve gizlilik gereksinimleriniz için doğru Linux dağıtımını nasıl seçeceğiniz
> - Kurulumdan itibaren disk şifreleme, güvenlik duvarı ve çekirdek sertleştirmesini nasıl yapılandıracağınız
> - Uygulamaları Flatpak, Firejail ve ileri düzey sandboxing ile nasıl izole edeceğiniz
> - Sisteminizin gerçekten korunduğunu pratik testlerle nasıl doğrulayacağınız

## Özet

Linux sertleştirme, saldırı yüzeyini ve olası bir ihlalin etkisini azaltmak demektir: güncel bir dağıtım, disk şifreleme, güvenlik duvarı, güvenli DNS, çekirdek sertleştirme, uygulama sandboxing'i, Secure Boot, hizmet kontrolü ve düzenli denetimler. Linux otomatik olarak güvenli değildir: bu önlemler tutarlı bir şekilde yapılandırıldığında daha dayanıklı hale gelir.

Linux dünyası genellikle bir güvenlik cenneti olarak resmedilir: herhangi bir dağıtımı kurarsınız ve sihirli bir şekilde her şeyden korunmuş olursunuz. Gerçek biraz farklı. Doğru yapılandırma olmadan bir Linux masaüstü sistemi şaşırtıcı derecede güvensiz olabilir. İyi haber şu ki, doğru bilgi ve biraz sabırla kurulumunuzu gerçek bir kaleye dönüştürebilirsiniz.

Bu kılavuz size adım adım eşlik edecek: doğru dağıtımı seçmekten her güvenlik yönünü yapılandırmaya kadar. Kolay olmayacak ama sonunda gerçekten güvenebileceğiniz bir sisteme sahip olacaksınız.

Güvenliğin bir ürün değil, bir süreç olduğunu unutmayın. Mükemmel bir kurulum yoktur, ama *size uygun* bir kurulum vardır. Bu kılavuzun her bölümü artıları ve eksileri sunar, böylece sizin durumunuz için neyin mantıklı olduğuna kendiniz karar verebilirsiniz.

Bu kılavuz iyileştirmelere ve önerilere açıktır. Katkıda bulunmak, hata bildirmek veya ekleme önermek isterseniz [GitHub](https://github.com/b4lol/portfolio) üzerinden bir pull request açın.



## Güvenlik için neden Linux kullanmalı? {#perche-linux style="color: white;"}

Her şeyden önce: Linux'u neden kullanmalısınız? Önyargıdan değil, somut nedenlerden dolayı.

### Şeffaflık ve kontrol

Linux açık kaynaklıdır. Bu, kaynak kodunun herkes tarafından görülebilir, doğrulanabilir ve değiştirilebilir olduğu anlamına gelir. Microsoft veya Apple "verilerinizi toplamıyoruz" dediğinde, onların sözüne güvenmek zorundasınızdır. Linux'ta doğrulayabilirsiniz. Bu mutlak bir garanti değildir (kimse hobi olarak milyonlarca satır kod okumaz), ama denetlenebilirlik imkânı büyük bir avantajdır.

Kontrol tamdır: sisteminizde neyin çalıştığına, hangi hizmetlerin aktif olduğuna, dışarıyla neyin iletişim kurduğuna siz karar verirsiniz. Zorunlu güncelleme yok, gizli telemetri yok, önceden yüklenmiş gereksiz yazılım yok.

### Bilinmesi gereken sınırlar

Gözler açık olsun: masaüstü Linux otomatik olarak Windows veya macOS'tan daha güvenli değildir. Aslında bazı açılardan kutudan çıktığı haliyle *daha az* korunmuştur:

- **Uygulama sandboxing'i**: macOS ve Windows'ta çok daha gelişmiş uygulama izolasyon mekanizmaları vardır. Geleneksel bir Linux masaüstünde bir uygulamanın sisteminize neredeyse tam erişimi olur
- **Secure Boot**: Linux'taki uygulaması Windows'a kıyasla hâlâ olgunlaşma sürecindedir
- **Sürücüler ve firmware**: donanım desteği daha sınırlı olabilir ve resmi olmayan sürücüler güvenlik açıkları getirebilir
- **Masaüstü saldırı yüzeyi**: X11 (artık çoğu dağıtımda Wayland ile değiştirilen eski grafik protokolü) güvenlik açısından bir kalburdu, çünkü herhangi bir pencere ekranı kaydedebilir, girişleri yakalayabilir ve diğer pencerelere komut enjekte edebilirdi

Bunu söylemekle birlikte, Linux size bütün bu sorunları çözecek araçları sunar. Sadece bunları sizin yapılandırmanız gerekir. Bu kılavuzda yapacağımız şey de tam olarak budur.

## Güvenli bir Linux dağıtımı seçmek {#scelta-distro style="color: white;"}

Dağıtım seçimi her şeyin temelidir. Burada yapılan yanlış bir seçim, sonraki tüm çalışmayı anlamsız kılabilir. Gerçekten önemli olan kriterleri ele alalım.

### Rolling release mi fixed release mi

Bu konuda çok fazla kafa karışıklığı var. Çoğu kişi "stable" dağıtımların (Debian stable gibi) daha az değiştikleri için daha güvenli olduğunu düşünür. Gerçekte genellikle tersi geçerlidir.

Fixed release dağıtımlar (Debian gibi) paket sürümlerini dondurur ve güvenlik yamalarını yalnızca backport yoluyla uygular. Sorun şu ki, her güvenlik düzeltmesi bir CVE (resmi bir tanımlayıcı) almaz ve bu nedenle hiçbir zaman dağıtıma taşınmaz. Ayrıca backport süreci kendisi de hata oluşturabilir. Debian'ın kendisinde, backport edilen bir yamanın güvenlik açığı yarattığı durumlar olmuştur (OpenSSL ile ünlü DSA-1571 vakası).

Rolling veya yarı-rolling dağıtımlar (Fedora, openSUSE Tumbleweed, Arch gibi) paketleri upstream sürümüne güncelleştirir. Bu, güvenlik düzeltmelerini orijinal geliştiricinin yazdığı haliyle, aradaki değişikliklerden etkilenmeden almanız demektir.



**Önerimiz**: Sık güncellemelerden çekiniyorsanız, geri alma (rollback) mekanizmaları sunan bir dağıtım seçiniz (dnf history ile Fedora veya Btrfs snapshot ile openSUSE gibi). Böylece her iki dünyanın en iyisini elde edersiniz: güncel paketler ve bir şey bozulursa geri dönebilme imkânı.

### Masaüstü ortamı: GNOME neden tercih edilmeli

Güvenlik açısından önerdiğim iki masaüstü ortamı **GNOME** ve **KDE Plasma**'dır ve ana neden ikisinin de **Wayland**'i tam olarak desteklemesidir.

İyi haber şu ki, artık başlıca dağıtımların çoğu (Fedora, Ubuntu, openSUSE, vb.) varsayılan grafik protokolü olarak Wayland kullanıyor. Wayland, X11'in halefidir ve Linux masaüstünün en ciddi güvenlik sorunlarından birini çözer: eski X11'de herhangi bir pencere ekranı kaydedebilir, tuş vuruşlarını yakalayabilir ve diğer pencerelere giriş enjekte edebilirdi, bu da herhangi bir sandboxing girişimini pratik olarak işe yaramaz hale getiriyordu.

Wayland ile uygulamalar grafik düzeyinde birbirinden izole edilir. Hem GNOME hem de KDE Plasma, ayrıcalıklı protokoller (ekran yakalama gibi) için bir izin sistemi uygular: uygulamalar izin istemeli ve kullanıcı bunları açıkça onaylamalıdır.

**GNOME** daha minimal, daha görüş sahibi bir seçimdir: daha az yapılandırma seçeneği ama güvenlik teknolojileriyle iyi entegre olmuş tutarlı bir deneyim sunar. Fedora Workstation ve Ubuntu'da varsayılandır.

**KDE Plasma** daha özelleştirilebilir ve özellik açısından zengin bir masaüstü tercih edenler için alternatiftir. KDE Plasma'daki Wayland desteği artık olgun ve kararlıdır, Fedora KDE Spin ve openSUSE'de varsayılandır. Masaüstünüzün görünümü ve davranışı üzerinde tam kontrole sahip olmayı seviyorsanız, KDE güvenlik açısından hiçbir taviz vermeden harika bir seçimdir.

**DİKKAT!** Herhangi bir nedenle hâlâ X11'li bir masaüstü ortamı kullanıyorsanız (bazı güncel olmayan dağıtımlar veya özel yapılandırmalar), bu kılavuzda açıklanan korumaların çoğu (özellikle sandboxing) önemli ölçüde daha az etkili olacaktır. `echo $XDG_SESSION_TYPE` komutuyla Wayland kullandığınızı doğrulayın (`wayland` döndürmelidir).

### Önerilen dağıtımlar

Düzinelerce dağıtım analiz edildikten sonra, farklı kullanıcı profillerine göre önerilen seçenekler şunlardır:

#### Fedora Workstation: dengeli seçim

Fedora yarı-rolling bir dağıtımdır: çekirdek ve önemli paketler sık güncellenirken, GNOME resmi sürüm döngüsünü takip eder. Her sürüm yaklaşık bir yıl desteklenir ve her altı ayda bir yeni sürüm çıkar.

**Fedora'yı seçme nedenleri:**
- "Upstream first" yaklaşımı: yamalar minimal ve mantıklıdır
- Modern teknolojileri (Wayland, PipeWire) ilk benimseyenler arasında
- `dnf` paket yöneticisi işlemler için rollback ve geri alma destekler
- SELinux varsayılan olarak aktif ve enforcing modda
- Büyük bir topluluk ve mükemmel dokümantasyon

**Eksileri:**
- Destek dışı kalmamak için her 6-12 ayda bir yeniden kurulum (veya yükseltme) gerektirir
- Bazı tescilli paketler ek depo (RPM Fusion) gerektirir

#### Debian: her zaman kullanıma hazır sağlam temel

Fedora denge ise, Debian sağlamlıktır. En iyi anlamıyla "sıkıcı" bir sistemdir: Kurulduktan sonra sorunsuz çalışır ve minimum bakımla yıllarca hizmet vermeye devam eder. Sürekli elini sokmak zorunda kalmadan güvenilir bir masaüstü arayan kullanıcılara önerilebilecek, güvenli ve her zaman kullanıma hazır temeldir.

**Debian'ı seçme nedenleri:**
- Efsanevi kararlılık: paketler stable'a girmeden önce kapsamlı şekilde test edilir, sürprizler nadirdir
- Debian Security Team, takip edilen güvenlik açıkları için güncelleme yayınlamada en duyarlı ekiplerden biridir
- Bakım en aza indirilmiştir: sık yeniden kurulum yok, sistemi bir günden ertesine bozan güncelleme yok
- AppArmor varsayılan olarak aktiftir ve Linux dünyasının en büyük, en iyi dokümante edilmiş topluluklarından birine sahiptir
- Çok sayıda başka projenin (Ubuntu, Whonix, Tails) temelidir, dolayısıyla güvenlik profilleri ve kılavuzları boldur

**Eksileri:**
- [Rolling ile fixed](#scelta-distro) bölümünde açıklandığı gibi, dondurulmuş paket modeli, CVE'si olmayan bazı güvenlik düzeltmelerinin asla stable'a girmemesi anlamına gelir
- Paketler daha eskidir: bir yazılımın en son sürümüne ihtiyacınız varsa backport'lara veya Flatpak'lere güvenmeniz gerekir

Upstream düzeltmelerindeki gecikmeyi yumuşatmak için en çok kullandığınız uygulamaları (özellikle tarayıcıyı) Flatpak ile kurmanız önerilir: Bu şekilde Debian'ın sürüm döngüsünden bağımsız olarak güncel kalırlar, temel sistem de aradığınız kararlılığı sağlar.

#### Fedora Atomic Desktops: değişmez gelecek

Fedora'nın Atomic varyantları (GNOME için Silverblue, KDE için Kinoite) değişmez bir yaklaşım kullanır: temel sistem salt okunurdur ve güncellemeler uygulanmadan önce eksiksiz imajlar olarak indirilir.

Bu, bir güncellemenin yarı yolda başarısız olup sizi bozuk bir sistemle baş başa bırakamayacağı anlamına gelir. Bir şeyler ters giderse, tek bir yeniden başlatma sizi önceki duruma geri döndürür. Uygulamalar esas olarak Flatpak (sandboxed) veya konteynerler (Toolbox/Distrobox) üzerinden kurulur.

**Eksileri:**
- Geleneksel Linux'tan farklı bir iş akışı (uyum süreci gerektirir)
- Flatpak olarak mevcut olmayan bazı yazılımlar geçici çözümler gerektirir
- GRUB'a bağımlılık, Unified Kernel Image kullanımını engeller (ileri düzey Secure Boot'u sınırlar)

#### SecureBlue: otomatik sertleştirme

SecureBlue, Fedora Atomic tabanlıdır ve önemli bir sertleştirme katmanı ekler:

- **Trivalent**: GrapheneOS Vanadium yamalarına sahip sertleştirilmiş bir Chromium tarayıcı
- **Hardened Malloc**: GrapheneOS'un bellek ayırıcısının tüm sisteme uygulanması
- Önceden uygulanmış çekirdek güvenlik yapılandırmaları
- Gereksiz çekirdek modüllerinin kara listesi

Manuel yapılandırma çabasını en aza indirip maksimum güvenlik isteyenler için önerdiğim dağıtım budur. Tek dezavantajı, Fedora'nın yanı sıra ek bir projeye daha güvenilmesini gerektirmesidir.

#### openSUSE Aeon: rolling ve değişmez

Değişmez dünyadaki rolling release alternatifi. İşlemsel snapshot'larla Btrfs kullanır: güncellemeler bir snapshot'a uygulanır ve yalnızca yeniden başlatmada etkinleştirilir, her zaman geri dönme imkânı vardır.

Minimal bir temel paket setine sahiptir (saldırı yüzeyini azaltır) ve sistem salt okunur olarak bağlanır.

#### Qubes OS: bölümleme yoluyla güvenlik

Qubes OS diğerlerinden farklı bir önermeyle başlar: tek bir sistemi sertleştirmek yerine, Xen hipervizörü sayesinde her etkinliği ayrı sanal makinelere ("qube" denir) izole eder. Bankacılık, iş, kişisel etkinlikler ve güvenilmeyen indirmeler için tarayıcı, birbirini görmeyen farklı bölmelerde çalışır.

Bir qube ele geçirilirse, zarar orada sınırlı kalır: kötü amaçlı yazılım diğer bölmelere veya alttaki sisteme ulaşamaz. Tek kullanımlık (disposable) qube'lar kapatıldığında kendilerini yok eder, şüpheli bir eki risksiz açmak için idealdir. İzolasyonu her şeyin önünde tutanlar için "kullanıma hazır" güvenli temeldir: önceden yapılandırılmış şablonlar ve tüm qube'ları Tor üzerinden yönlendirmek için Whonix entegrasyonu ile gelir.

**Qubes'i seçme nedenleri:**
- Tasarım gereği bölümleme: izolasyon bir eklenti değil, sistemin kalbidir
- Tüm türetilmiş qube'lar için bir kez güncellediğiniz kullanıma hazır şablonlar (Fedora, Debian)
- Tor trafiği için yerel Whonix entegrasyonu
- En yüksek güvenlik gereksinimlerine sahip kullanıcılar için önerilen sistemdir

**Eksileri:**
- Önemli donanım gereksinimleri: çok fazla RAM (16 GB makul minimum) ve sanallaştırma destekli bir CPU gerekir
- Zorlu öğrenme süreci: Qube modeli bir zihniyet değişikliği gerektirir
- Donanım desteği (özellikle GPU'lar ve özel çevre birimleri) sorun yaratabilir

#### Whonix: anonimlik için

Hedefiniz anonimlik ise (sadece gizlilik değil), Whonix referans noktasıdır. İki sanal makine olarak çalışır: çalıştığınız bir Workstation ve tüm trafiği Tor üzerinden yönlendiren bir Gateway.

Kötü amaçlı yazılım Workstation'ı ele geçirse bile, tüm ağ trafiği Gateway üzerinden geçtiği için gerçek IP adresinizi keşfedemez. Ayrıca tuş vuruşu anonimleştirme, boot saati randomizasyonu, şifrelenmiş swap ve sertleştirilmiş çekirdek parametreleri içerir.



**Eksileri:**
- Debian tabanlı (daha eski paketler)
- Sanallaştırma gerektirir (düşük performans)
- Birincil işletim sistemi olarak uygun değil



### Kaçınılması gereken dağıtımlar

Bazı dağıtımlar yanlış nedenlerle sıklıkla önerilir:

- **Kali Linux, BlackArch, Parrot OS**: bunlar penetrasyon testi araçlarıdır, günlük kullanım için *güvenli* sistemler değildir. Önceden kurulu saldırı araçlarına sahiptir ve genellikle root olarak çalışır. bu dağıtımları günlük masaüstü olarak kullanmak, markete gitmek için ambulans çağırmaya benzer.
- **Linux-libre çekirdekli dağıtımlar**: tescilli microcode için güvenlik azaltımlarını kaldırır ve CPU güvenlik açığı uyarılarını bastırır. İdeolojik nedenlerle gerçek güvenliğinizi feda etmektedirler.
- **Manjaro**: gerçek bir kararlılık avantajı sunmadan paketleri Arch'a kıyasla geride tutar ve gereksiz bir güvenlik açığı riski oluşturur.

## Disk şifreleme ile güvenli Linux kurulumu {#installazione style="color: white;"}

Tamam, dağıtımınızı seçtiniz. şimdi sıfırdan doğru bir şekilde nasıl kurulacağını inceleyelim. Bu yapılandırmalardan bazıları sonradan yapılamaz, bu yüzden son derece dikkatli olmak gerekir.

### Tam disk şifreleme (LUKS)

Kurulum sırasında tam disk şifrelemeyi etkinleştirmek esastır. LUKS (Linux Unified Key Setup) ile diskinizdeki tüm veriler şifrelenir: cihazınızın çalınması durumunda, parola girilmeden verilere erişilemez.

**DİKKAT!** Kurulum sırasında şifrelemeyi etkinleştirmezseniz, tüm verilerinizi yedeklemeniz ve sıfırdan yeniden kurulum yapmanız gerekecektir. Zaten kullanımda olan bir diski veri kaybı olmadan şifrelemek mümkün değildir.

Kurulum sırasında, bölümlendirme aşamasına gelindiğinde:

1. Disk şifreleme seçeneğini seçin (Fedora'da "Encrypt my data" denir)
2. Uzun ve karmaşık bir parola belirleyin (bu krallığınızın anahtarıdır)
3. Kurulum aracınız destekliyorsa, kimlik doğrulamalı şifreleme elde etmek için cryptsetup ile `--integrity` seçeneğini kullanın

En yüksek güvenliği hedefleyenler için: Kimlik doğrulamalı şifreleme, verilerin sadece okunamaz olduğunu değil, üzerinde oynama yapılmadığını da doğrular. Sofistike fiziksel saldırılara karşı ek bir koruma katmanıdır.



### Şifrelenmiş swap

Swap, RAM dolduğunda ek bellek olarak kullanılan disk alanıdır. Sorun şu ki, açık metin olarak hassas veriler (parolalar, şifreleme anahtarları, açık belgeler) içerebilir.

İki seçenek var:

- **Şifrelenmiş swap**: bölümlendirme sırasında LUKS ile birlikte yapılandırın
- **ZRAM**: disk yerine sıkıştırılmış RAM kullanır. Fedora bunu varsayılan olarak kullanır ve tercih edilen seçenektir, daha hızlıdır ve hiçbir hassas veri diske yazılmaz

### Güvenli bağlama seçenekleriyle bölümlendirme

Ek sertleştirme için, bazı bölümlerde kısıtlayıcı bağlama (mount) seçenekleri yapılandırabilirsiniz:

| Bölüm | Seçenekler | Etki |
|-----------|---------|---------|
| `/boot` | `nodev,noexec,nosuid` | Boot bölümünde kod çalıştırılmasını engeller |
| `/boot/efi` | `nodev,noexec,nosuid` | EFI bölümünü korur |
| `/var` | `nodev,nosuid` | Değişken veri bölümünde izinleri sınırlar |

> **Dikkat!** `noexec` parametresini `/home` veya `/root` dizinlerine eklemeyiniz; zira bu işlem Flatpak ve Snap uygulamalarını bozabilir. Benzer şekilde, Arch Linux kullanıyorsanız `/var/tmp` dizininde `noexec` seçeneğinden kaçınmanız gerekir (AUR derlemeleri başarısız olur).

Bu seçenekler kusursuz olmasa da (`noexec` nispeten kolay aşılabilir) otomatikleştirilmiş saldırıları engelleyebilen bir derinlemesine savunma katmanı eklerler.

### Genel kullanıcı adı ve hostname

Çoğu kişinin gözden kaçırdığı bir ayrıntı: kullanıcı adınız ve cihaz adınız (hostname) ağ üzerinde çeşitli şekillerde iletilebilir ve sizi tanımlamak için kullanılabilir.

- Adınız yerine `user` gibi genel bir kullanıcı adı kullanın
- Hostname'i `localhost` olarak ayarlayın:

```bash
sudo hostnamectl hostname "localhost"
```

## Kurulum sonrası sertleştirme: güncellemeler ve temel yapılandırma {#post-installazione style="color: white;"}

Kurulum tamamlandı, disk şifrelendi ve bölümler yapılandırıldı. Artık gerçek sertleştirme (hardening) işlemlerine başlanabilir.

### Güncellemeler ve microcode

Her şeyden önce sistemi güncelleyin:

```bash
# Fedora
sudo dnf upgrade --refresh

# Debian/Ubuntu
sudo apt update && sudo apt upgrade -y

# Arch
sudo pacman -Syu
```

Sonra CPU microcode'unun kurulu olduğundan emin olun. Microcode, hata ve güvenlik açıklarını doğrudan işlemcide düzelten ürün yazılımıdır (firmware). Bu güncelleme olmadan, donanımsal işlemci açıklarına (Spectre, Meltdown vb.) karşı savunmasız kalabilirsiniz.

```bash
# Fedora (varsayılan olarak dahil)
# Şununla doğrulayın:
dnf list installed | grep microcode

# Debian
sudo apt install intel-microcode   # Intel CPU'lar için
sudo apt install amd64-microcode   # AMD CPU'lar için

# Arch
sudo pacman -S intel-ucode   # Intel CPU'lar için
sudo pacman -S amd-ucode     # AMD CPU'lar için
```

### Firmware güncellemeleri

Cihazlarda güvenlik düzeltmeleri içeren ve güncellenebilir ürün yazılımları (firmware) bulunur. `fwupd` kullanın:

```bash
sudo fwupdmgr refresh
sudo fwupdmgr update
```

### Telemetriyi devre dışı bırakma

Bazı dağıtımlar kullanım hakkında anonim veri toplar. Niyetler iyi olsa da, ne kadar az veri paylaşılırsa o kadar güvenlidir:

```bash
# Fedora — kurulum sayımını devre dışı bırakır
echo "countme=false" | sudo tee -a /etc/dnf/dnf.conf

# openSUSE — anonim tanımlayıcıyı boşaltır
sudo truncate -s 0 /var/lib/zypp/AnonymousUniqueId
```

### Kısıtlayıcı umask yapılandırma

umask, yeni dosyaların varsayılan izinlerini kontrol eder. Varsayılan değer (`022`) sistemdeki tüm kullanıcılar tarafından okunabilir dosyalar oluşturur. `077` ile, oluşturduğunuz dosyaları yalnızca kendi kullanıcınız okuyabilir:

```bash
# /etc/profile veya /etc/bash.bashrc'ye ekleyin
umask 077
```

> **Dikkat!** openSUSE üzerinde bu Snapper aracını bozabilir. Ubuntu'da `/etc/apt/sources.list.d/` altındaki depo dosyalarının `600` yerine `644` izinlerine sahip olması gerekmektedir. İşlemi uyguladıktan sonra doğruluğunu kontrol ediniz.

## Ağ sertleştirme: güvenlik duvarı, DNS ve MAC randomizasyonu {#rete style="color: white;"}

Ağ, en yaygın saldırı vektörlerinden biridir. Şimdi ağın nasıl güvenli hale getirileceğini inceleyelim.

### MAC adresi randomizasyonu

MAC adresi, ağ kartınızın benzersiz bir tanımlayıcısıdır. bir Wi-Fi ağına her bağlandığınızda, yönlendirici (router) bu adresi görür ve cihazı izleyebilir. MAC adresi randomize edildiğinde, her bağlantı farklı bir cihaz gibi görünecektir.

`/etc/NetworkManager/conf.d/00-macrandomize.conf` dosyasını oluşturun:

```ini
[device]
wifi.scan-rand-mac-address=yes

[connection]
wifi.cloned-mac-address=random
ethernet.cloned-mac-address=random
```

Sonra NetworkManager'ı yeniden başlatın:

```bash
sudo systemctl restart NetworkManager
```

### Güvenlik duvarı

Güvenlik duvarı kullanımı kesinlikle zorunludur. Önerilen yapılandırma kısıtlayıcı olmalıdır: Açıkça izin verilmeyen tüm gelen trafik engellenmelidir.

#### Fedora/openSUSE (firewalld)

```bash
# Varsayılan bölgeyi "drop" olarak ayarla (her şeyi engeller)
sudo firewall-cmd --set-default-zone=drop

# ICMPv6'ya izin ver (IPv6'nın çalışması için gerekli)
sudo firewall-cmd --add-protocol=ipv6-icmp --permanent

# DHCPv6'ya izin ver (IPv6 adresi almak için gerekli)
sudo firewall-cmd --add-service=dhcpv6-client --permanent

# Kuralları uygula
sudo firewall-cmd --reload

# Lockdown'ı etkinleştir (polkit üzerinden bypass'ı önler)
sudo firewall-cmd --lockdown-on
```

#### Debian/Ubuntu (ufw)

```bash
sudo apt install ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw enable
```

`ufw` firewalld'den daha basit ama daha az esnektir. Bölgeleri desteklemez ve lockdown modu yoktur. Masaüstü bilgisayar için yine de fazlasıyla yeterlidir.



Yazılımsal bir güvenlik duvarının, sistemde yüksek yetkilerle çalışan zararlı yazılımlara karşı tek başına koruma sağlayamayacağı unutulmamalıdır. Bu yalnızca bir savunma katmanıdır, tam bir çözüm değildir.

### DNSSEC

Geleneksel DNS açık metin ve kimlik doğrulamasızdır: kullanıcı ile DNS sunucusu arasındaki bağlantıyı dinleyen herkes sorguları görebilir ve yanıtları değiştirebilir. DNSSEC, DNS yanıtlarına kriptografik bir imza ekler.

`systemd-resolved` kullanıyorsanız:

```bash
# /etc/systemd/resolved.conf'u düzenleyin
# Ayarlayın:
DNSSEC=yes

# Hizmeti yeniden başlatın
sudo systemctl restart systemd-resolved
```

DNSSEC destekli bir DNS sağlayıcısı kullandığınızdan emin olunuz. Ek bir gizlilik katmanı için DNS-over-TLS veya DNS-over-HTTPS protokollerini kullanmayı değerlendirebilirsiniz.

### Güvenli zaman senkronizasyonu

Zaman senkronizasyonu için standart protokol olan NTP, açık metin ve kimlik doğrulaması olmadan iletim yapar. Bir saldırgan, sistem saatini manipüle ederek TLS sertifikalarının ve sistem günlüklerinin doğruluğunu tehlikeye atabilir.

Çözüm, chronyd servisiyle Network Time Security (NTS) kullanmaktır:

```bash
# chrony'yi kurun (henüz yoksa)
# Fedora: zaten dahil
# Debian/Ubuntu:
sudo apt install chrony
```

`/etc/chrony.conf`'u düzenleyin ve NTS sunucuları kullanın. İyi bir referans GrapheneOS'un yapılandırmasıdır:

```
server time.cloudflare.com iburst nts
server ntppool1.time.nl iburst nts
server nts.netnod.se iburst nts
server ptbtime1.ptb.de iburst nts
minsources 2
```

`minsources 2` parametresi, en az iki bağımsız kaynağın saat bilgisi üzerinde mutabık olmasını gerektirir. Bu durum, olası zaman manipülasyonu saldırılarını zorlaştırır.

chrony için seccomp filtresini etkinleştirin:

```bash
# Fedora/Arch — /etc/sysconfig/chronyd'yi düzenleyin
OPTIONS="-F 1"

# Sonra yeniden başlatın
sudo systemctl restart chronyd
```

## Linux çekirdek sertleştirmesi: sysctl, boot ve modüller {#kernel style="color: white;"}

Çekirdek, işletim sisteminin kalbidir. Çekirdeğin sertleştirilmesi, olası zararlı yazılımların kullanabileceği saldırı yüzeyini önemli ölçüde daraltır.

### sysctl parametreleri

`sysctl` parametreleri, çekirdeğin çalışma zamanındaki davranışını kontrol eder. Aşağıdaki temel yapılandırmaları içeren bir `/etc/sysctl.d/99-hardening.conf` dosyası oluşturunuz:

```ini
# Ağ koruması
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0
net.ipv6.conf.all.accept_redirects = 0
net.ipv6.conf.default.accept_redirects = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.default.send_redirects = 0
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.default.accept_source_route = 0
net.ipv6.conf.all.accept_source_route = 0
net.ipv6.conf.default.accept_source_route = 0
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1
net.ipv4.icmp_echo_ignore_all = 1
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_timestamps = 0

# Çekirdek koruması
kernel.sysrq = 0
kernel.core_uses_pid = 1
kernel.kptr_restrict = 2
kernel.dmesg_restrict = 1
kernel.perf_event_paranoid = 3
kernel.yama.ptrace_scope = 2
kernel.unprivileged_bpf_disabled = 1
net.core.bpf_jit_harden = 2

# Bellek koruması
vm.mmap_rnd_bits = 32
vm.mmap_rnd_compat_bits = 16
vm.swappiness = 1

# Maksimum ASLR
kernel.randomize_va_space = 2
```

Şununla uygulayın:

```bash
sudo sysctl --system
```

Bu parametrelerin temel ihtiyaçları karşıladığını söyleyelim. Daha kapsamlı bir yapılandırma için, iş istasyonları (workstation) için güncel bir sysctl şablonu sunan [TommyTran732'nin deposuna](https://github.com/TommyTran732/Linux-Setup-Scripts/blob/main/etc/sysctl.d/99-workstation.conf) başvurabilirsiniz.

### Çekirdek boot parametreleri

Bu parametrelerin bootloader yapılandırmasına (GRUB veya systemd-boot) eklenmesi gerekir. rpm-ostree'li sistemlerde (Fedora Atomic), GRUB'u düzenlemek yerine `rpm-ostree kargs` kullanın.

#### CPU azaltımları

```
mitigations=auto,nosmt spectre_v2=on spectre_bhi=on spec_store_bypass_disable=on tsx=off kvm.nx_huge_pages=force nosmt=force l1d_flush=on spec_rstack_overflow=safe-ret gather_data_sampling=force reg_file_data_sampling=on
```

**DİKKAT!** SMT'yi (Simultaneous Multi-Threading / Hyper-Threading) devre dışı bırakmanın performans üzerinde önemli bir etkisi vardır. Yoğun iş yükleriyle (derleme, video düzenleme, oyun) çalışıyorsanız, risk seviyesini göz önünde bulundurarak `nosmt=force` parametresini kaldırmak isteyebilirsiniz.

#### Bellek ve çekirdek koruması

```
slab_nomerge init_on_alloc=1 init_on_free=1 pti=on vsyscall=none page_alloc.shuffle=1 randomize_kstack_offset=on debugfs=off oops=panic quiet loglevel=0
```

Bu parametreler:
- `slab_nomerge`: slab cache'lerinin birleştirilmesini önler (heap exploit'lerin etkinliğini azaltır)
- `init_on_alloc=1 init_on_free=1`: bellek tahsis edildiğinde ve serbest bırakıldığında sıfırlar (veri sızıntılarını önler)
- `pti=on`: çekirdek sayfa tablolarını kullanıcı tablolarından izole eder (Meltdown azaltımı)
- `vsyscall=none`: eski vsyscall'ları devre dışı bırakır (bilinen bir saldırı vektörü)
- `debugfs=off`: debug dosya sistemini devre dışı bırakır (saldırı yüzeyini azaltır)

#### DMA azaltımları

```
intel_iommu=on amd_iommu=force_isolation efi=disable_early_pci_dma iommu=force iommu.passthrough=0 iommu.strict=1
```

Bunlar donanım cihazlarından (Thunderbolt veya PCIe gibi) gelen DMA saldırılarına karşı korur. Bu parametrelerin tam bir koruma sunmadığı unutulmamalıdır: Erken önyükleme (early boot) aşamasındaki bir saldırı, IOMMU etkinleşmeden önce çekirdeği ele geçirebilir.

#### Fedora'da nasıl uygulanır (GRUB)

```bash
# /etc/default/grub'u düzenleyin
# Parametreleri GRUB_CMDLINE_LINUX'a ekleyin
sudo grub2-mkconfig -o /boot/grub2/grub.cfg
```

#### Fedora Atomic'te nasıl uygulanır (rpm-ostree)

```bash
rpm-ostree kargs --append="slab_nomerge" --append="init_on_alloc=1" --append="init_on_free=1" --append="pti=on"
# Her parametreyi tek tek ekleyin
```

### Çekirdek modülleri kara listesi

Birçok çekirdek modülü otomatik olarak yüklenir ama donanımınız için gerekli değildir. Yüklenen her modül, maksimum ayrıcalıklarla çalışan ek koddur, potansiyel bir saldırı yüzeyidir.

`/etc/modprobe.d/blacklist.conf` dosyasını oluşturun. İyi bir başlangıç noktası [SecureBlue'nun kara listesidir](https://github.com/secureblue/secureblue/blob/live/files/system/etc/modprobe.d/blacklist.conf).

Kullanılmıyorsa devre dışı bırakılması önerilen başlıca modüller şunlardır:

```bash
# Gereksiz dosya sistemleri
install cramfs /bin/false
install freevxfs /bin/false
install hfs /bin/false
install hfsplus /bin/false
install jffs2 /bin/false
install udf /bin/false

# Gereksiz ağ protokolleri
install dccp /bin/false
install sctp /bin/false
install rds /bin/false
install tipc /bin/false

# Bluetooth (kullanıyorsanız yorum satırına alın)
install bluetooth /bin/false
install btusb /bin/false

# Thunderbolt (kullanıyorsanız yorum satırına alın)
install thunderbolt /bin/false

# Webcam (kullanıyorsanız yorum satırına alın)
install uvcvideo /bin/false
```

> **Dikkat!** `hfsplus`'ı devre dışı bırakmadan önce, EFI bölümünüzün dosya sistemini kontrol edin. HFS+ ise, bu modülü devre dışı bırakmak sistemin açılmasını engeller. `df -T /boot/efi` ile kontrol edin.

### Hardened Memory Allocator

Varsayılan bellek ayırıcısı (glibc malloc) bellek bozulmasına dayalı exploit'lere karşı gelişmiş korumalara sahip değildir. GrapheneOS'un **hardened_malloc**'u, koruma alanları, randomizasyon ve bütünlük kontrolleri ekleyen bir alternatiftir.

```bash
# Fedora — SecureBlue'nun Copr deposundan
sudo dnf copr enable secureblue/hardened_malloc
sudo dnf install hardened_malloc

# Arch — AUR'dan
yay -S hardened_malloc-git
```

Genel olarak etkinleştirmek için `/etc/ld.so.preload`'a ekleyin:

```
/usr/lib64/libhardened_malloc.so
```

Veya tek bir uygulama için:

```bash
LD_PRELOAD=/usr/lib64/libhardened_malloc.so firefox
```

### Alternatif çekirdekler

Daha ileri gitmek isteyenler için, ek sertleştirme yamalarına sahip çekirdekler mevcuttur:

- **linux-hardened** (Arch Linux): güvenlik yamaları içerir, varsayılan olarak ayrıcalıksız user namespace'leri devre dışı bırakır (Podman/LXC/Flatpak'i bozabilir, uyumluluğu kontrol edin)
- **grsecurity**: çekirdek sertleştirmesinin altın standardı, ama tescillidir ve ücretli bir abonelik gerektirir

## Uygulama sandboxing'i: Flatpak, Firejail ve SELinux {#sandboxing style="color: white;"}

Standart bir Linux masaüstünde, herhangi bir uygulama neredeyse tüm kaynaklara (kullanıcı dosyaları, ağ bağlantıları, çevre birimleri ve diğer çalışan uygulamalar) erişebilir. Sandbox mimarisi bu erişimleri en aza indirir.

### Flatpak: önerilen seçenek

Flatpak, Linux masaüstünde yalıtım (sandboxing) için en gelişmiş paket yönetim sistemidir. Her uygulama, önceden tanımlanmış izinlerle yalıtılmış bir alanda çalışır.

Sorun şu ki, birçok Flatpak uygulaması varsayılan olarak çok geniş izinler talep eder. İşte bunları nasıl kısıtlayacağınız.



#### İzinlerin genel olarak kısıtlanması

Öncelikle tüm uygulamalara kısıtlayıcı bir global politika uygulanmalı, ardından ihtiyaç duyulan durumlarda özel izinler verilmelidir:

```bash
sudo flatpak override --system \
  --nosocket=x11 --nosocket=fallback-x11 \
  --nosocket=pulseaudio --nosocket=session-bus \
  --nosocket=system-bus --unshare=network \
  --unshare=ipc --nofilesystem=host:reset \
  --nodevice=input --nodevice=shm --nodevice=all \
  --no-talk-name=org.freedesktop.Flatpak \
  --no-talk-name=org.freedesktop.systemd1 \
  --no-talk-name=ca.desrt.dconf \
  --no-talk-name=org.gnome.Shell.Extensions
```

Sonra kullanıcı düzeyinde kurulum için aynısını yapın:

```bash
flatpak override --user \
  --nosocket=x11 --nosocket=fallback-x11 \
  --nosocket=pulseaudio --nosocket=session-bus \
  --nosocket=system-bus --unshare=network \
  --unshare=ipc --nofilesystem=host:reset \
  --nodevice=input --nodevice=shm --nodevice=all \
  --no-talk-name=org.freedesktop.Flatpak \
  --no-talk-name=org.freedesktop.systemd1 \
  --no-talk-name=ca.desrt.dconf \
  --no-talk-name=org.gnome.Shell.Extensions
```

#### Anlaşılması gereken kritik izinler

En tehlikeli izinlerin ne anlama geldiği şöyle:

| İzin | Risk |
|----------|---------|
| `--socket=session-bus` / `--socket=system-bus` | D-Bus üzerinden sandbox kaçışına izin verir |
| `--talk-name=org.freedesktop.Flatpak` | Flatpak'in D-Bus'u üzerinden sandbox kaçışına izin verir |
| `--talk-name=org.freedesktop.systemd1` | Keyfi systemd hizmetlerinin yüklenmesine izin verir |
| `--talk-name=ca.desrt.dconf` | Keybinding değiştirmeye izin verir (komut çalıştırma) |
| `--device=all` | Tüm cihazlara erişim (webcam, mikrofon, vb.) |
| `--filesystem=host` | Tüm dosya sistemine erişim |
| `--share=network` | Ağ erişimi |

Önerilen yöntem, öncelikle tüm izinleri kapatıp uygulamanın çalışmasını test etmektir. Uygulama hata verirse, çalışması için gereken en düşük izin seviyesini belirleyene kadar izinleri tek tek açabilirsiniz.

#### Flatseal: görsel izin yönetimi

Flatpak izinlerini grafiksel bir arayüz üzerinden kolayca yönetmek için Flatseal uygulamasını kurabilirsiniz:

```bash
flatpak install flathub com.github.tchx84.Flatseal

flatpak --user override com.github.tchx84.Flatseal \
  --filesystem=/var/lib/flatpak/app:ro \
  --filesystem=xdg-data/flatpak/app:ro \
  --filesystem=xdg-data/flatpak/overrides:create
```

Flatseal, her Flatpak uygulamasının tüm izinlerini açık ve basit bir grafik arayüzle gösterecektir.

**DİKKAT!** Otomatik Flatpak güncellemelerini açık bırakmayınız; zira bir uygulama güncellendiğinde talep ettiği yeni izinler onayınız olmadan sisteme tanımlanabilir. Güncellemeleri manuel olarak gerçekleştirip sürüm notlarını (changelog) incelemeniz önerilir.

### Firejail: yerel uygulamalar için

Dağıtımın depolarından kurulan uygulamalar (Flatpak değil) için Firejail, namespace ve seccomp tabanlı sandboxing sağlayabilir:

```bash
# Kurulum
sudo apt install firejail    # Debian/Ubuntu
sudo dnf install firejail    # Fedora
sudo pacman -S firejail      # Arch

# Profili olan tüm uygulamalar için otomatik etkinleştirme
sudo firecfg
```

`firecfg`, menüden başlattığınızda uygulamaları otomatik olarak Firejail üzerinden geçiren symlink'ler oluşturur.

**Firejail'in sınırlamaları:**
- Önemli bir saldırı yüzeyine sahip (yükseltilmiş ayrıcalıklar) çok büyük bir SUID ikilik dosyasıdır
- Uygulamayı menüden değil doğrudan `/usr/bin/uygulama_adı`'ndan başlatırsanız sandboxing aşılabilir
- Flatpak'e kıyasla ana avantajı: Xpra/Xephyr kullanarak X11 pencerelerini sınırlandırabilir

Flatpak paketleri öncelikli olarak tercih edilmelidir. Firejail ise yalnızca Flatpak sürümü bulunmayan uygulamalar için değerlendirilmelidir.

### Mandatory Access Control (MAC)

SELinux ve AppArmor gibi MAC sistemleri, geleneksel Unix izinlerinin ötesine geçen bir erişim kontrol katmanı ekler. Bir uygulama root olarak çalışsa bile, MAC onun politika tarafından yetkilendirilmemiş kaynaklara erişmesini engelleyebilir.

- **Fedora**: SELinux varsayılan olarak aktif ve enforcing modda. Devre dışı bırakmayın
- **openSUSE**: kurulum sırasında SELinux ve AppArmor arasında seçim yapabilirsiniz
- **Arch**: AppArmor'u manuel olarak kurmanız ve yapılandırmanız gerekir

Standart masaüstü dağıtımlarında MAC yapısının tüm uygulamaları değil, yalnızca belirli sistem servislerini (daemon) sınırladığı unutulmamalıdır.

## Secure Boot ve sistemin fiziksel güvenliği {#sicurezza-fisica style="color: white;"}

Cihaza fiziksel erişim sağlanabiliyorsa, yazılımsal güvenlik önlemlerinin etkisi büyük ölçüde azalacaktır.

### Özel anahtarlarla Secure Boot

Standart Secure Boot, önyükleyici (bootloader) ve çekirdeğin güvenilir anahtarlarla (genellikle Microsoft anahtarlarıyla) imzalandığını doğrular. Ancak Microsoft anahtarları, çok sayıda üçüncü taraf sürücüyü imzaladığı için geniş bir saldırı yüzeyi oluşturmaktadır.



sbctl aracı yardımıyla kendi kişisel imza anahtarlarınızı sisteme tanımlayabilirsiniz:

1. UEFI firmware'ine girin ve Secure Boot'u "setup mode"a alın
2. Linux'u başlatın ve sbctl'i kurun
3. Anahtarlarınızı oluşturun ve kaydedin:

```bash
# Kurulum (Arch)
sudo pacman -S sbctl

# Anahtar oluşturma
sudo sbctl create-keys

# Anahtar kaydı
sudo sbctl enroll-keys

# Çekirdek ve bootloader'ın imzalanması
sudo sbctl sign -s /boot/vmlinuz-linux
sudo sbctl sign -s /boot/EFI/BOOT/BOOTX64.EFI
```

Fedora üzerinde bu prosedür farklı adımlar gerektirebilir; dolayısıyla işlemlere başlamadan önce dağıtımın güncel belgeleri incelenmelidir.

**DİKKAT!** Bu işlem, uyumsuz bazı UEFI donanımları kullanılamaz hale (brick) getirebilir. İşlemlere başlamadan önce donanım uyumluluğunu araştırınız. Tedbir olarak bir EEPROM kurtarma yöntemi bulundurmanız önerilir.

### Unified Kernel Image (UKI)

Bir UKI, çekirdeği, initramfs yapısını ve mikro kodları tek bir imzalı imajda birleştirir. Bu yöntem, initramfs üzerinde oynama yapılmasını engelleyerek standart Secure Boot'un koruyamadığı bir saldırı vektörünü kapatır.

Yapılandırma her dağıtım ve bootloader için özeldir. systemd-boot ve dracut'lu Fedora'da süreç şunları içerir:

1. UKI oluşturmak için dracut'u yapılandırma
2. UKI'yi sbctl anahtarlarıyla imzalama
3. Şifreleme anahtarlarını TPM'in PCR'lerine bağlama (minimum PCR 7, ideal olarak PCR 0,1,2,3,5,7,14)

**Not**: UKI'ler şu anda Fedora Silverblue/Kinoite ile iyi çalışmıyor. Bu bilinen bir sınırlamadır.

### Kurulum sonrası korumalar

- **UEFI parolası**: boot ayarlarındaki değişiklikleri önlemek için UEFI firmware'inde bir supervisor/administrator parolası ayarlayın
- **USB'den boot'u devre dışı bırakma**: birinin donanımınızdan canlı bir sistem başlatmasını önler
- **USBGuard**: hangi USB cihazlarının yetkilendirildiğini kontrol ederek BadUSB ve Rubber Ducky saldırılarına karşı koruma sağlar

```bash
sudo dnf install usbguard    # Fedora
sudo apt install usbguard    # Debian/Ubuntu

# Şu anda bağlı cihazlara dayalı bir politika oluştur
sudo usbguard generate-policy > /etc/usbguard/rules.conf
sudo systemctl enable --now usbguard
```

### Medya otomatik bağlamayı devre dışı bırakma

USB bellek ve diğer çıkarılabilir medyaların otomatik bağlanması klasik bir saldırı vektörüdür. GNOME'da:

```bash
echo '[org/gnome/desktop/media-handling]
automount=false
automount-open=false' | sudo tee /etc/dconf/db/local.d/automount-disable

echo 'org/gnome/desktop/media-handling/automount
org/gnome/desktop/media-handling/automount-open' | sudo tee /etc/dconf/db/local.d/locks/automount-disable

sudo dconf update
```

## SSH sertleştirme, kimlik doğrulama ve erişim {#autenticazione style="color: white;"}

### SSH sertleştirme

SSH servisi aktif durumdaysa, doğru bir şekilde yapılandırılması kritik öneme sahiptir. `/etc/ssh/sshd_config`'i düzenleyin:

```bash
# Root olarak girişi devre dışı bırak
PermitRootLogin no

# Sadece public key kimlik doğrulaması
PasswordAuthentication no
PubkeyAuthentication yes

# Giriş denemelerini sınırla
MaxAuthTries 3

# Gereksiz yönlendirmeyi devre dışı bırak
X11Forwarding no
AllowTcpForwarding no
AllowAgentForwarding no

# İnaktif oturumlar için zaman aşımı
ClientAliveInterval 300
ClientAliveCountMax 2

# Bağlanabilecek kullanıcıları sınırla
AllowUsers kullanıcı_adınız
```

Değişikliklerden sonra:

```bash
sudo systemctl restart sshd
```

Kimlik doğrulama amacıyla şifre kullanımının tamamen kapatılması ve yalnızca SSH anahtarlarının tercih edilmesi önemle tavsiye edilir. Bir anahtar çifti oluşturmak için:

```bash
ssh-keygen -t ed25519 -a 100
```

### FIDO2 ile iki faktörlü kimlik doğrulama

Yerel giriş ve sudo için, bir FIDO2 anahtarı (YubiKey gibi) kullanarak ikinci bir faktör ekleyebilirsiniz:

```bash
# Kurulum
sudo dnf install pam-u2f      # Fedora
sudo apt install libpam-u2f   # Debian/Ubuntu

# Anahtarın kaydı
mkdir -p ~/.config/Yubico
pamu2fcfg > ~/.config/Yubico/u2f_keys
```

> **Dikkat!** `pam-u2f` modülü yapılandırılırken `origin` ve `appid` parametreleri için sabit (hardcoded) değerler kullanılmalıdır. Varsayılan `pam://$HOSTNAME` değerleri tercih edilmemelidir; aksi halde hostname değiştirildiğinde sisteme giriş yapılamayacaktır.

### PAM sertleştirme (Fedora/RHEL)

Red Hat tabanlı dağıtımlarda, `authselect` PAM sertleştirmesini basitleştirir:

```bash
# "profil_adi"nı şu anda kullanılan authselect profiliyle değiştirin
sudo authselect select profil_adi with-faillock without-nullok with-pamaccess
```

Bu şunları etkinleştirir:
- **faillock**: çok fazla başarısız denemeden sonra hesabı kilitler
- **without-nullok**: boş parolayla girişi önler
- **with-pamaccess**: `/etc/security/access.conf` üzerinden erişim kontrolünü etkinleştirir

### Kullanıcı ve ayrıcalık yönetimi

Sistem yönetiminde sıkça göz ardı edilen temel güvenlik kuralları:

- **Doğrudan root kullanmayın**: ayrıcalıklı komutlar için her zaman `sudo` (veya `run0`) kullanılmalıdır
- **sudo/wheel grubunu sınırlayın**: sadece gerçekten gerek duyan kullanıcılar
- **Parola politikası**: makul bir minimum uzunluk ve karmaşıklık ayarlayın
- **Hesapları denetleyin**: kullanılmayan hesapları kaldırın veya devre dışı bırakın

```bash
# Login shell'i olan kullanıcıları kontrol et
grep -v '/nologin\|/false' /etc/passwd

# Kullanılmayan bir hesabı kilitle
sudo usermod -L kullanici_adi

# sudo/wheel grubunda kimlerin olduğunu kontrol et
getent group sudo    # Debian/Ubuntu
getent group wheel   # Fedora/Arch
```

## Saldırı yüzeyini azaltma: gereksiz hizmetleri devre dışı bırakma {#servizi style="color: white;"}

Çalışan her hizmet potansiyel bir giriş noktasıdır. İlke basit: kullanılmıyorsa kapatılmalıdır.

```bash
# Tüm aktif hizmetleri listele
systemctl list-units --type=service --state=running

# Gereksiz bir hizmeti devre dışı bırak
sudo systemctl disable --now hizmet_adi
```

Bir masaüstünde genellikle gereksiz olan hizmetler:

| Hizmet | İşlevi | Ne zaman devre dışı bırakılır |
|----------|----------|---------------------|
| `cups` | Yazdırma | Yazıcınız yoksa |
| `avahi-daemon` | Ağ hizmeti keşfi (mDNS) | Bonjour/zeroconf kullanmıyorsanız |
| `bluetooth` | Bluetooth | Bluetooth cihazları kullanmıyorsanız |
| `sshd` | SSH sunucusu | Kimse bilgisayarınıza uzaktan bağlanmıyorsa |
| `rpcbind` | RPC/NFS | NFS paylaşımları kullanmıyorsanız |

Hangi portların dinlemede olduğunu kontrol etmek için:

```bash
sudo ss -tulnp
```

Tanımlanamayan veya şüpheli görünen dinleme portları varsa, devre dışı bırakılmadan önce araştırma yapılmalıdır.

## Wayland ile X11: ekran sunucusu güvenliği {#wayland style="color: white;"}

Daha önce bahsedildiği gibi, Wayland artık çoğu modern dağıtımda varsayılan grafik protokolüdür. Bu, güvenlik için büyük bir adımdır, çünkü eski X11'de pencereler arasında bir yalıtım mimarisi bulunmamaktaydı.

Bununla birlikte, sisteminizde hâlâ **XWayland** aktif olabilir. XWayland, eski X11 uygulamalarının Wayland altında çalışmasını sağlayan bir uyumluluk katmanıdır. Sorun şu ki, eski X11 protokolünün güvenlik açıklarını sisteme yeniden dahil edebilir: XWayland altında çalışan uygulamalar, diğer XWayland uygulamalarının (ama yerel Wayland uygulamalarının değil) girişini ve ekranını potansiyel olarak yakalayabilir.

XWayland'in aktif olup olmadığını kontrol etmek için:

```bash
# Sonuç döndürürse, XWayland kullanılıyor
xlsclients 2>/dev/null
```

Çoğu kullanıcı için mevcut durum zaten iyidir: temel uygulamaların (tarayıcılar, dosya yöneticileri, terminal emülatörleri ve editörler) neredeyse tamamı yerel Wayland desteği sunmaktadır. XWayland gerektiren az sayıdaki uygulama ise genellikle eski veya özel yazılımlardır.

Maksimum güvenlik istiyorsanız ve tüm uygulamalarınızın yerel Wayland üzerinde çalıştığından eminseniz, GNOME'da XWayland'i tamamen devre dışı bırakabilirsiniz. `/etc/systemd/user/org.gnome.Shell@wayland.service.d/override.conf` dosyasını oluşturun:

```ini
[Service]
ExecStart=
ExecStart=/usr/bin/gnome-shell --no-x11
```

Electron uygulamaları (VS Code, Discord, Slack, vb.) genellikle `--ozone-platform=wayland` bayrağını kullanarak Wayland ile çalışır.

## Günlükleme ve denetim: sistem güvenliğini izleme {#logging style="color: white;"}

Güvenli bir sistemin aynı zamanda izlenebilir ve denetlenebilir olması gerekir. Olası bir hata durumunda sistem günlükleri (loglar) durum tespiti için en önemli kaynaktır.

### journald yapılandırması

Systemd journal, varsayılan günlükleme sistemidir. Sistem günlüklerinin yeniden başlatmaların ardından da korunması için kalıcı (persistent) olarak yapılandırılması önerilir:

```bash
# Dizinin var olduğundan emin olun
sudo mkdir -p /var/log/journal

# /etc/systemd/journald.conf'u düzenleyin
# Ayarlayın:
Storage=persistent
Compress=yes
```

### Auditd

Sistem işlemlerinin daha ayrıntılı denetimi için auditd'yi kurun ve yapılandırın:

```bash
sudo dnf install audit        # Fedora
sudo apt install auditd       # Debian/Ubuntu

sudo systemctl enable --now auditd
```

Bir masaüstü için kullanışlı denetim kuralları:

```bash
# Kimlik doğrulama dosyalarındaki değişiklikleri izle
sudo auditctl -w /etc/passwd -p wa -k identity
sudo auditctl -w /etc/shadow -p wa -k identity
sudo auditctl -w /etc/group -p wa -k identity
sudo auditctl -w /etc/sudoers -p wa -k sudoers

# Ayrıcalıklı komutların çalıştırılmasını izle
sudo auditctl -w /usr/bin/sudo -p x -k privileged
sudo auditctl -w /usr/bin/su -p x -k privileged
```

Kuralları kalıcı hale getirmek için, bunları `/etc/audit/rules.d/hardening.rules`'a ekleyin.

## Kurulumun doğrulanması: güvenlik testleri ve denetimi {#verifica style="color: white;"}

Test etmediğiniz bir kuruluma asla güvenmeyin. İşte her şeyin çalıştığını nasıl doğrulayacağınız.

### Doğrulama kontrol listesi

Bu kılavuzdaki yapılandırmaları uyguladıktan sonra, her bileşeni doğrulayın:

**1. Disk şifreleme**
```bash
# LUKS'un aktif olduğunu doğrulayın
sudo cryptsetup status /dev/mapper/hacim_adi
# "active" ve şifreleme detaylarını göstermelidir
```

**2. Güvenlik duvarı**
```bash
# Fedora
sudo firewall-cmd --list-all
# Varsayılan bölge "drop" olmalıdır

# Ubuntu
sudo ufw status verbose
# "deny (incoming)" göstermelidir
```

**3. Çekirdek parametreleri**
```bash
# Boot parametrelerini kontrol edin
cat /proc/cmdline
# Eklediğiniz parametreleri görmelisiniz

# sysctl'leri kontrol edin
sudo sysctl kernel.kptr_restrict
# 2 döndürmelidir
sudo sysctl kernel.dmesg_restrict
# 1 döndürmelidir
```

**4. SELinux/AppArmor**
```bash
# SELinux (Fedora)
getenforce
# "Enforcing" döndürmelidir

# AppArmor (Debian/Ubuntu/openSUSE)
sudo aa-status
# Yüklü ve aktif profilleri gösterir
```

**5. Flatpak izinleri**
```bash
# Genel override'ları kontrol edin
flatpak override --show
# Uyguladığınız kısıtlamaları göstermelidir
```

**6. SSH**
```bash
# SSH yapılandırmasını test edin
sudo sshd -t
# Hata vermemelidir

# Root girişinin devre dışı olduğunu doğrulayın
grep "PermitRootLogin" /etc/ssh/sshd_config
# "no" göstermelidir
```

**7. Dinleyen hizmetler**
```bash
sudo ss -tulnp
# Beklenmeyen dinleyen hizmetlerin olmadığını doğrulayın
```

**8. MAC adresi**
```bash
# MAC'in randomize edildiğini kontrol edin
ip link show
# MAC her bağlantıda değişmelidir
```

### Otomatikleştirilmiş denetim araçları

Daha kapsamlı bir kontrol için şunları kullanabilirsiniz:

```bash
# Lynis — eksiksiz güvenlik denetimi
sudo dnf install lynis    # Fedora
sudo apt install lynis    # Debian/Ubuntu

sudo lynis audit system
```

Lynis size bir güvenlik puanı ve kurulumunuzu daha da iyileştirmek için ayrıntılı bir öneri listesi verecektir.

## Sonuç {#conclusioni style="color: white;"}

Tebrikler, sertleştirme adımlarını başarıyla tamamladınız! 🛡️

Standart bir Linux kurulumunu, aşağıdaki bileşenlerle sertleştirilmiş güvenli bir sisteme dönüştürmüş bulunmaktasınız:

- Bekleyen verileri korumak için **disk şifreleme**
- Ağ trafiğini kontrol etmek için **kısıtlayıcı güvenlik duvarı**
- Gelişmiş güvenlik parametreleriyle **sertleştirilmiş çekirdek**
- Uygulamaları izole etmek için **sandboxing**
- Sistem düzeyinde erişimi kontrol etmek için **MAC**
- Boot sürecini korumak için **özel Secure Boot**
- Sistemi izlemek için **günlükleme ve denetim**

Güvenliğin sürekli bir süreç olduğu unutulmamalıdır. Sistem güncel tutulmalı, loglar düzenli olarak incelenmeli ve yeni yazılımlar yüklendiğinde güvenlik ayarları gözden geçirilmelidir.

Okuduğunuz için teşekkür ederiz. Bu rehberin yararlı olduğunu düşünüyorsanız, diğer kullanıcılarla da paylaşabilirsiniz.

---

## İlgili Kılavuzlar

- **[Kendi Barındırdığın VPN: Wireguard + Pi-Hole + Unbound](/tr/vpn)** - Şifreli ve reklamsız bir bağlantı için kendi özel VPN'inizi kurun
- **[Tehdit Modeli Nasıl Oluşturulur](/tr/threat-model)** - Neyi ve kimden koruyacağınızı anlamanın ilk adımı
- **[macOS Güvenliği için Eksiksiz Kılavuz](/tr/macos-security)** - macOS da kullananlar için sertleştirme
- **[GrapheneOS Üzerine Nihai Kılavuz](/tr/graphene)** - Dünyanın en güvenli mobil işletim sistemi

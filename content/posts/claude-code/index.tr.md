---
title: "Claude Code: Sıfırdan İleri Seviyeye Eksiksiz Rehber (Kurulum, Güvenlik, CLAUDE.md)"
description: "Claude Code için eksiksiz rehber: kurulum, yapılandırma, izinler, güvenlik ve CLAUDE.md dosyası, ilk komuttan ileri seviye iş akışlarına kadar."
summary: "Claude Code için eksiksiz rehber: kurulum, yapılandırma, izinler, güvenlik ve CLAUDE.md dosyası, ilk komuttan ileri seviye iş akışlarına kadar."
keywords: ["claude code", "claude code rehberi", "claude code türkçe", "claude code kurulumu", "claude.md", "claude code güvenlik", "claude code izinler", "claude code mcp", "claude code subagent", "claude code hooks", "anthropic claude code", "claude code settings json", "claude code gizlilik", "claude code prompt injection", "claude code veri"]
author: "b4lol"
date: 2026-06-04
lastmod: 2026-06-04
url: /tr/claude-code
series: ["Güvenlik", "Araçlar"]
topics: ["ai", "developer-tools"]
faq:
  - question: "Claude Code nedir?"
    answer: "Claude Code, Anthropic'in terminalde çalışan ajan tabanlı programlama asistanıdır. Bir chatbot'tan farklı olarak projenizin dosyalarını okuyup değiştirebilir, komutlar çalıştırabilir, git kullanabilir ve karmaşık görevleri kendi başına tamamlayabilir; ancak hassas işlemlerden önce her zaman izin ister."
  - question: "Claude Code ücretsiz mi?"
    answer: "Hayır, Claude aboneliği (Pro veya Max planı) ya da Anthropic API üzerinden kullandıkça öde modeli gerektirir. Pro/Max aboneliği aylık sabit bir kullanım bütçesi içerir, API ise tüketilen token sayısına göre faturalandırılır. Fiyatlar değişiklik gösterebileceği için Anthropic'in resmi fiyat listesinin kontrol edilmesi önerilir."
  - question: "CLAUDE.md dosyası ne işe yarar?"
    answer: "CLAUDE.md, projenin hafıza dosyasıdır. Claude Code'un her oturum başında otomatik olarak okuduğu talimatları, kuralları ve bağlamı içerir. Aynı açıklamaları tekrar tekrar yapmanızı önler ve kod stili, test komutları ile güvenlik kısıtlamaları gibi proje kurallarınızın uygulanmasını sağlar."
  - question: "Claude Code güvenli mi? Dosyalarımı silebilir mi?"
    answer: "Claude Code her dosya değişikliğinden veya komut çalıştırmadan önce izin ister, dolayısıyla varsayılan olarak güvenlidir. Riskler, --dangerously-skip-permissions gibi parametrelerle bu kontrolleri devre dışı bıraktığınızda veya çok geniş izinler verdiğinizde ortaya çıkar. settings.json dosyasını engelleme (deny) kuralları ve kancalarla (hooks) iyi yapılandırarak kontrolü elinizde tutabilirsiniz."
  - question: "settings.json ile CLAUDE.md arasındaki fark nedir?"
    answer: "CLAUDE.md, Claude için doğal dilde talimatlar içerir (nasıl davranması gerektiği gibi). settings.json ise aracın teknik yapılandırmasını içerir (izinler, ortam değişkenleri, kancalar, model). İlki yönlendirici rol oynarken, ikincisi Claude'un göz ardı edemeyeceği katı kuralları uygular."
  - question: "Claude Code'da izinler nedir?"
    answer: "İzinler, Claude'un onay istemeden ne yapabileceğine karar veren yetkilerdir. settings.json içinde allow, ask ve deny kurallarıyla yapılandırılır ve /permissions komutuyla anlık olarak yönetilebilir. En önemli güvenlik mekanizmasıdır."
  - question: "Claude Code'da Model Context Protocol (MCP) nedir?"
    answer: "MCP, Claude Code'un veritabanları, tarayıcılar veya üçüncü taraf servisler gibi harici araç ve veri kaynaklarına MCP sunucuları aracılığıyla bağlanmasını sağlayan açık bir standarttır. Güçlü bir özelliktir ancak saldırı yüzeyini artırır; bu nedenle yalnızca güvendiğiniz MCP sunucularını kurmanız önemlidir."
  - question: "Claude Code kodumu Anthropic sunucularına gönderiyor mu?"
    answer: "Evet. Claude Code istekleri Anthropic sunucularında işler, dolayısıyla okuduğu kod ve dosyalar ağ üzerinden gönderilir. Bu verilerin işlenme şekli hesap türüne bağlıdır: tüketici ürünlerinde (opt-out yapılmadığı sürece) konuşmalar eğitim için kullanılabilirken, ticari API kullanımında bu genellikle yapılmaz. Kurumsal hesaplar ise daha sıkı saklama politikaları sunar."
  - question: "Prompt injection nedir ve Claude Code ile neden tehlikelidir?"
    answer: "Prompt injection, kötü amaçlı talimatların ajanın okuduğu dış içeriklerin (README, hata kayıtları, web sayfaları) içine gizlendiği bir saldırı türüdür. Ajan bunları meşru talimatlarla karıştırıp yetkisiz işlemler gerçekleştirebilir. Savunma için deny kuralları, komutların otomatik onaylanmaması ve yalıtılmış ortamlar kullanılmalıdır."
howto:
  name: "Claude Code güvenli şekilde nasıl kurulur ve yapılandırılır"
  description: "Claude Code'u kurmak, kimlik doğrulamak, izinleri yapılandırmak ve projeniz için bir CLAUDE.md dosyası oluşturmak için izlenecek adımlar."
  totalTime: "PT30M"
  supply:
    - "Claude hesabı (Pro/Max) veya Anthropic API anahtarı"
    - "macOS, Linux veya Windows (WSL) çalıştıran bir bilgisayar"
  tool:
    - "Node.js"
    - "Terminal"
    - "Git"
  steps:
    - name: "Claude Code'u kurun"
      text: "Claude Code'u, Node.js gerektirmeyen yerel kurulum betiğiyle (curl -fsSL https://claude.ai/install.sh | bash) ya da Node kullanmayı tercih ediyorsanız npm install -g @anthropic-ai/claude-code ile kurun."
      url: "/tr/claude-code#installazione-il-percorso-piu-semplice"
    - name: "Kimlik doğrulayın"
      text: "claude komutunu çalıştırın ve Claude Pro/Max hesabınızla giriş yapın veya Anthropic API anahtarınızı girin."
      url: "/tr/claude-code#autenticazione-abbonamento-o-api"
    - name: "İzinleri yapılandırın"
      text: "Claude'un onay istemeden ne yapabileceğine karar vermek için en az yetki ilkesini izleyerek settings.json içinde allow ve deny kuralları belirleyin."
      url: "/tr/claude-code#sicurezza-blindare-claude-code"
    - name: "CLAUDE.md dosyasını oluşturun"
      text: "/init komutunu çalıştırın veya projenizin kurallarını ve kısıtlamalarını içeren bir CLAUDE.md dosyasını elle yazın."
      url: "/tr/claude-code#claude-md-il-cervello-del-tuo-progetto"
    - name: "Yapılandırmayı doğrulayın"
      text: "Gerçek kod üzerinde çalışmaya başlamadan önce izinlerin ve hafızanın doğru yüklendiğini kontrol etmek için /permissions ve /memory komutlarını kullanın."
      url: "/tr/claude-code#verifica-finale-tutto-sotto-controllo"
---

> **TL;DR**: Bu rehberde öğrenecekleriniz:
> - **Claude Code**'un nasıl kurulacağını, kimlik doğrulamasının nasıl yapılacağını ve ilk adımların nasıl atılacağını,
> - Projenize bağlam ve kurallar kazandırmak için etkili bir **CLAUDE.md** dosyasının nasıl yazılacağını,
> - İzinler, engelleme (deny) kuralları, kancalar (hooks) ve yalıtılmış alanlar (sandbox) ile güvenliğin nasıl artırılacağını,
> - Alt ajanlar (subagents), kancalar (hooks) ve MCP sunucuları ile nasıl ileri seviye iş akışları oluşturulacağını.

## Özet {#sintesi style="color: white;"}

**Claude Code**, Anthropic'in terminalde çalışan ajan tabanlı programlama asistanıdır. Projenizin dosyalarını okur, kod yazar, komutlar çalıştırır ve git işlemlerini kendi başına gerçekleştirebilir; ancak her hassas işlemden önce onayınızı ister. Bu rehber, güvenlik önlemlerine ve `CLAUDE.md` dosyasına odaklanarak sizi kurulumdan ileri düzey iş akışlarına kadar taşıyacaktır.

Yazılım geliştiriciler için yapay zeka asistanları oldukça yaygınlaşmıştır; ancak bunların büyük kısmı yalnızca kod editöründe birkaç satırlık otomatik tamamlamalar sunmaktadır. Claude Code ise tamamen farklı bir sınıftadır: "ajan tabanlı" (agentic) yapısı sayesinde karmaşık görevleri kendi başına tamamlayabilir. Bu özellik onu son derece güçlü kılarken, hatalı yapılandırılması durumunda potansiyel güvenlik risklerini de beraberinde getirir. Bu rehberde, güvenlik önlemlerini elden bırakmadan, ilk kurulumdan ileri düzey kullanım tekniklerine kadar tüm detayları ele alacağız.

En baştan belirtmek gerekir ki, bu rehberin temel felsefesi şudur: **Yapay zeka harika bir asistandır, ancak üzerinde çalıştığınız konu hakkında yeterli bilgiye sahip değilseniz sizin yerinize mucize yaratamaz.** Bunu belirtmemizin nedeni, günümüzde bir yapay zekadan bir sunucu, uygulama veya özel bir sistem kurmasını istemenin ve ilk bakışta *çalışıyor gibi görünen* bir sonuç elde etmenin çok kolay olmasıdır. Zira bu tür hazır çözümler, genellikle yalnızca deneyimli bir gözün fark edebileceği ciddi güvenlik, gizlilik ve mimari açıklar barındırabilir. Claude Code, ne ürettiğini bilen deneyimli bir geliştiricinin elinde olağanüstü bir araca dönüşür. Bu senaryoda sunduğu hız, esneklik ve hatta savunma amaçlı güvenlik incelemeleri, beraberinde getirdiği küçük tavizleri fazlasıyla telafi eder. Ancak ne yaptığını bilmeden kullanıldığında, hataları hızla çoğaltan bir araca dönüşebilir. Bu durumun her zaman akılda tutulması gerekir.

Bu rehber, başlangıç düzeyinden ileri seviyeye kadar tüm süreçleri tek bir çatı altında toplamayı amaçlamaktadır. İçerik, geri bildirimlere ve önerilere açıktır. Burada, verimlilik ile güvenlik arasında en iyi dengeyi sağlayan yapılandırmalar sunulmaktadır. Resmi bir Anthropic çalışanı olmadığımı ve yapay zeka araçlarının hızla değiştiğini belirterek, güncel komutlar ve fiyatlandırma politikaları için her zaman resmi belgelere göz atmanızı öneririm.

Geri bildirimde bulunmak, katkı sağlamak veya çevirilere destek olmak isterseniz [GitHub](https://github.com/b4lol/portfolio) üzerinden bir çekme isteği (pull request) gönderebilirsiniz.

## Claude Code Nedir (ve Neden Farklıdır) {#cos-e-claude-code style="color: white;"}

Temellerden başlayalım. **Claude Code**, Anthropic tarafından geliştirilen, Claude modelini doğrudan terminalinize ve projelerinize taşıyan bir komut satırı (CLI) aracıdır. Klasik bir otomatik tamamlama (autocomplete) aracı olmanın ötesinde; belirlenen bir hedef doğrultusunda muhakeme yeteneğine sahip, kod tabanını analiz edebilen, yeni dosyalar oluşturabilen, testler çalıştırabilen ve kendi hatalarını otonom bir döngüde düzeltebilen bir yapay zeka ajanıdır.

Bir benzetmeyle açıklamak gerekirse: Geleneksel yapay zeka asistanları, siz yazı yazarken bir sonraki cümleyi öneren bir iş arkadaşı gibidir. Claude Code ise kendisine verilen bir görevi (örneğin 'bu modüle test kodları yaz') adım adım ne yaptığını göstererek ve kritik adımlarda onayınızı alarak tamamlayan yetenekli bir yardımcıya benzer.

Diğer araçlarla karşılaştırmalı özellikleri şu şekildedir:

| Özellik | Chatbot (örn. web arayüzü) | Otomatik Tamamlama (örn. IDE eklentisi) | **Claude Code** |
| --- | --- | --- | --- |
| Tüm projeyi okuma | Hayır (manuel kopyala-yapıştır) | Kısmen | **Evet, otonom olarak** |
| Dosyaları değiştirme | Hayır | Satır bazlı | **Evet, tüm dosyaları** |
| Komut ve test çalıştırma | Hayır | Hayır | **Evet, onayınızla** |
| Git kullanımı | Hayır | Hayır | **Evet** |
| Karmaşık görevleri tamamlama | Hayır | Hayır | **Evet** |
| Terminal entegrasyonu | Hayır | IDE odaklı | **Evet** |

Kısacası, bir chatbot size fikir verirken veya bir eklenti satırınızı tamamlarken, Claude Code **işi doğrudan üstlenir**. Bu özerklik onun en büyük gücüdür ancak aynı zamanda güvenliğin neden bu kadar kritik olduğunun da göstergesidir.

### Maliyet Yapısı

Claude Code kullanımı ücretsiz değildir. Kullanım maliyetlerini karşılamak için iki yöntem bulunur:

* **Claude Aboneliği (Pro veya Max):** Aylık sabit bir kullanım bütçesi sunar ve düzenli kullanıcılar için bütçe öngörülebilirliği açısından en iyi seçenektir.
* **Anthropic API (Kullandıkça Öde):** Gönderilen ve alınan token sayısına göre faturalandırılırsınız. Esneklik sağlar ancak büyük projelerde maliyetler hızla yükselebilir.

Güncel bilgiler için [Anthropic'in resmi fiyat listesini](https://www.anthropic.com/pricing) inceleyebilirsiniz. Yeni başlayanlar için Pro aboneliği, beklenmedik faturalarla karşılaşmamak adına en güvenli yoldur.

## Kurulum {#installazione-il-percorso-piu-semplice style="color: white;"}

Claude Code; **macOS, Linux ve Windows** (WSL - Windows Subsystem for Linux önerilir) üzerinde çalışabilir.

### Yerel Kurulum Betiği (Önerilen)

En hızlı yöntem resmi kurulum betiğini kullanmaktır. Bu yöntem yerel bir ikili dosya yükler ve **Node.js gereksinimi duymaz**:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Güvenlik Uyarısı:** İnternet üzerinden çekilen bir betiği doğrudan terminale yönlendirmek (`curl | bash`), kaynağa tamamen güvenmeyi gerektirir. Anthropic güvenilir bir kaynak olsa da, bu tür betikleri çalıştırmadan önce bilgisayarınıza indirip içeriğini incelemeniz genel bir güvenlik en iyi uygulamasıdır.

### Alternatif Yol: npm ile Kurulum

Node.js ortamını tercih ediyorsanız, Node.js (sürüm 18 veya üzeri) kurulu olduğundan emin olduktan sonra şu komutu kullanabilirsiniz:

```bash
npm install -g @anthropic-ai/claude-code
```

Kurulumun başarılı olduğunu doğrulamak için:

```bash
claude --version
```

## Kimlik Doğrulama {#autenticazione-abbonamento-o-api style="color: white;"}

Terminal üzerinden proje klasörünüze gidin ve şu komutu çalıştırın:

```bash
claude
```

İlk çalıştırmada karşınıza kimlik doğrulama seçenekleri çıkacaktır:

1. **Claude Hesabı (Pro/Max):** Tarayıcı üzerinden giriş yaparak hesabınızı bağlarsınız.
2. **Anthropic API Anahtarı:** API anahtarınızı girerek kullandıkça öde modelini aktif edersiniz.

⚠️ **Önemli Güvenlik Uyarısı:** API anahtarınız kişisel şifreniz kadar hassastır. Asla kod dosyalarına açık şekilde yazmayın, git geçmişine eklemeyin ve kimseyle paylaşmayın.

## İlk Adımlar: Etkileşimli Oturum {#primi-passi style="color: white;"}

Oturum açıldığında, terminal üzerinden Claude'a doğal dilde komutlar verebilirsiniz. Örneğin:

```text
> Proje dosyalarını inceleyerek bu projenin ne yaptığını açıkla.
```

Claude tüm proje yapısını otonom olarak inceleyip size bilgi sunacaktır. Kodları kopyalayıp yapay zekaya göndermenize gerek kalmaz.

Etkileşimli oturumda kullanabileceğiniz bazı temel slash komutları:

| Komut | Açıklama |
| --- | --- |
| `/help` | Kullanılabilir komutları listeler. |
| `/init` | Projeyi analiz eder ve ilk `CLAUDE.md` dosyasını oluşturur. |
| `/clear` | Sohbet geçmişini ve bağlamı (context) sıfırlar. |
| `/compact` | Bellek limitini aşmamak için geçmişi özetler. |
| `/context` | Tüketilen güncel bağlam miktarını gösterir. |
| `/rewind` | Yapılan hataları geri almak için önceki adıma döner. |
| `/permissions` | İzin ayarlarını yönetmenizi sağlar. |
| `/memory` | CLAUDE.md kurallarını düzenler. |
| `/cost` | Oturum boyunca harcanan maliyeti gösterir. |

**İpucu:** Karmaşık bir göreve başlamadan önce **Plan Modu**'nu aktif etmek yararlıdır (modlar arasında geçiş yapmak için `Shift+Tab` kullanabilirsiniz). Bu modda Claude kodlar üzerinde değişiklik yapmadan önce size yapacağı adımları içeren bir plan sunar ve onayınızı bekler.

## İzin Yönetimi {#capire-i-permessi style="color: white;"}

Claude Code güvenlik odaklı tasarlanmıştır. Dosya değişikliği yapmak veya komut çalıştırmak gibi sisteminizi etkileyecek her işlemden önce onayınızı ister.

İzin isteklerinde üç seçenek sunulur:

1. **Yes (Evet):** Sadece o işlem için onay verir.
2. **Yes to all (Hepsine Evet):** Benzer işlemler için tekrar sormamasını sağlar.
3. **No (Hayır):** İşlemi engeller.

settings.json içinde belirleyebileceğiniz temel izin modları:

* **default:** Her sistem etkileşimi için tek tek onay ister. En güvenli başlangıç modudur.
* **acceptEdits:** Dosya değişikliklerini otomatik onaylar ancak terminal komutları için sormaya devam eder.
* **plan:** Yalnızca okuma yetkisi verir; Claude sistemi değiştiremez, sadece öneri sunabilir.
* **bypassPermissions:** Hiçbir onay istemez. **Son derece risklidir.**

⚠️ **Dikkat:** Onay mekanizmasını tamamen kapatan `--dangerously-skip-permissions` parametresini kişisel bilgisayarınızda veya hassas projelerde kesinlikle kullanmayın. Otonom çalışma gerekiyorsa, bunu yalnızca tek kullanımlık, izole edilmiş bir sanal makine veya konteyner içerisinde tercih edin.

## Proje Hafızası: CLAUDE.md {#claude-md-il-cervello-del-tuo-progetto style="color: white;"}

**`CLAUDE.md`** dosyası, Claude Code'un projenize özel olarak uyduğu kalıcı kurallar kılavuzudur. Oturum başlangıcında otomatik olarak okunur ve yapay zekanın proje kurallarına sadık kalmasını sağlar.

Bu dosyayı projeye yeni dahil olan bir yazılımcıya verilen oryantasyon belgesi gibi düşünebilirsiniz.

### Hafıza Katmanları

Claude Code hafıza dosyalarını şu öncelik sırasına göre okur ve birleştirir:

| Dosya | Konum | Kapsam |
| --- | --- | --- |
| Global Hafıza | `~/.claude/CLAUDE.md` | Bilgisayarınızdaki **tüm** projeler |
| Proje Hafızası | `CLAUDE.md` (proje dizini) | Projeye özel, git ile paylaşılır |
| Yerel Hafıza | `CLAUDE.local.md` | Sadece sizin yerel bilgisayarınız (gitignore edilmelidir) |

Tüm projelerinizde geçerli olmasını istediğiniz kişisel kuralları (örneğin "Yorum satırlarını Türkçe yaz") global hafıza dosyasına; projeye özel yapılandırmaları ise proje kök dizinindeki `CLAUDE.md` dosyasına yazabilirsiniz.

### CLAUDE.md İçeriği Nasıl Olmalıdır?

Dosyayı olabildiğince sade ve net tutun. Gereksiz detaylar bağlam limitinizi dolduracak ve token tüketimini artıracaktır. İyi bir dosyada şunlar yer almalıdır:

* **Temel Komutlar:** Projeyi derleme (build), test etme ve linter çalıştırma yöntemleri.
* **Stil Kuralları:** Girinti (indentation), değişken isimlendirme kuralları vb.
* **Mimari Yapı:** Ana modüllerin yer aldığı klasör yolları.
* **Kısıtlamalar:** Yapay zekanın kesinlikle yapmaması gereken işlemler.

Örnek şablon:

```markdown
# Proje Kuralları

## Komutlar
- Derleme: `npm run build`
- Test: `npm test`
- Lint: `npm run lint`

## Kodlama Stili
- TypeScript kullanılmalı, `any` tipi yasaklanmalıdır.
- Değişken isimleri İngilizce, açıklamalar Türkçe yazılmalıdır.
- Küçük ve saf fonksiyonlar tercih edilmelidir.

## Güvenlik Kısıtlamaları
- .env dosyalarını veya hassas anahtarları asla okuma ve commit etme.
- Onay almadan `rm -rf` veya veritabanı sıfırlama komutları çalıştırma.
- Yeni paket yüklemeden önce mutlaka onay al.
```

Oturum esnasında `#` işaretiyle başlayan mesajlar göndererek bunları hızlıca hafıza dosyasına ekleyebilirsiniz:

```text
# Production ortamına sadece main dalından deploy yapıldığını unutma.
```

## İleri Düzey Yapılandırma: settings.json {#configurazione-avanzata-settings-json style="color: white;"}

CLAUDE.md doğal dilde kuralları belirlerken, **`settings.json`** dosyası yapay zekanın aşamayacağı katı güvenlik sınırlarını ve teknik ayarları tanımlar.

Ayarların okunma önceliği de yerelden globale doğrudur:

1. `.claude/settings.local.json` (Yerel ayarlarınız)
2. `.claude/settings.json` (Paylaşılan proje ayarları)
3. `~/.claude/settings.json` (Global ayarlar)

Örnek bir proje yapılandırması:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run test:*)",
      "Bash(npm run lint)",
      "Read(src/**)"
    ],
    "ask": [
      "Bash(git push:*)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Bash(curl:*)"
    ]
  },
  "env": {
    "DISABLE_TELEMETRY": "1"
  },
  "model": "claude-3-5-sonnet"
}
```

* **allow:** Belirtilen test ve okuma komutları onay istemeden çalıştırılabilir.
* **ask:** Git push işlemi öncesinde mutlaka onay istenir.
* **deny:** Belirtilen hassas dosyaların okunması ve curl komutlarının çalıştırılması tamamen engellenir. Engelleme (deny) kuralları her zaman önceliklidir.

## Güvenlik Sıkılaştırması {#sicurezza-blindare-claude-code style="color: white;"}

Sisteminize doğrudan erişebilen bir yapay zeka ajanını kontrol altında tutmak güvenlik açısından zorunludur. Alınabilecek temel önlemler:

### 1. Kimlik Bilgilerini ve Sırları Koruma

En büyük risklerden biri API anahtarlarının, özel şifrelerin veya token değerlerinin yanlışlıkla yapay zeka tarafından okunarak log dosyalarına veya git geçmişine sızmasıdır. Bunu önlemek için `settings.json` dosyanıza şu engelleme kurallarını mutlaka ekleyin:

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./**/*.pem)",
      "Read(./**/*.key)",
      "Read(./secrets/**)",
      "Read(./**/id_rsa)",
      "Read(./**/.aws/**)"
    ]
  }
}
```

### 2. Yıkıcı Komutları Engelleme

Sisteme zarar verebilecek tehlikeli komutları sınırlandırmak için engelleme kurallarından yararlanabilirsiniz:

```json
{
  "permissions": {
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(git push --force:*)",
      "Bash(sudo:*)",
      "Bash(:(){:|:&};:)"
    ]
  }
}
```

Ancak kalıp eşleştirme yöntemleri tek başına yeterli olmayabilir; bu nedenle güvenlik duvarınızı kancalar (hooks) ve yalıtılmış ortamlarla desteklemeniz önerilir.

### 3. Telemetri ve Veri Gönderimini Kapatma

Veri gizliliğinizi korumak amacıyla gereksiz arka plan bağlantılarını kapatabilirsiniz:

```json
{
  "env": {
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "DISABLE_TELEMETRY": "1",
    "DISABLE_ERROR_REPORTING": "1"
  }
}
```

`CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` parametresi tüm gereksiz telemetri ve hata raporlama trafiğini tek seferde kapatır. Temel kod işleme işlemlerinin yine de sunucular üzerinden gerçekleştiğini unutmayın.

### 4. Yalıtılmış Geliştirme Ortamı (Sandbox)

En güvenli yaklaşım, Claude Code'u doğrudan ana bilgisayarınızda çalıştırmak yerine izole edilmiş bir alanda barındırmaktır:

* **Dev Containers:** Projeye özel oluşturulmuş bir Docker konteyneri içinde çalışarak ana sisteminizi korur.
* **Sanal Makine (VM):** Otonom testler yapmak için geçici sanal makineler kurabilirsiniz.
* **Kısıtlı Kullanıcı:** İşletim sisteminde düşük yetkilere sahip ayrı bir kullanıcı hesabı açarak aracı bu hesap altında çalıştırabilirsiniz.

### 5. Kancalar (Hooks) ile Dinamik Kontrol

Kancalar (hooks), Claude bir işlemi gerçekleştirmeden hemen önce (`PreToolUse`) veya sonra (`PostToolUse`) sisteminizin çalıştıracağı özel betiklerdir. Bu sayede izin süreçlerini deterministik olarak kontrol edebilirsiniz.

Örneğin, çalıştırılan komutlarda `rm -rf` ifadesi geçtiğinde işlemi durduran bir hook tanımı:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "if grep -q 'rm -rf'; then echo 'Güvenlik kancası nedeniyle komut engellendi' >&2; exit 2; fi"
          }
        ]
      }
    ]
  }
}
```

Hook betiği `exit 2` ile sonlandığında Claude Code ilgili işlemi çalıştırmayı reddeder. Hook'lar kod biçimlendirme, test otomasyonu veya işlem günlüğü (audit log) tutma gibi senaryolarda da etkin olarak kullanılabilir.

### Güvenlik Katmanları Özeti

| Katman | Araç | Kapsadığı Alan |
| --- | --- | --- |
| 1 | İzin Modu (default) | Her işlem için kullanıcı onayı alma |
| 2 | settings.json Deny Kuralları | Hassas dosya yollarını ve tehlikeli komut kalıplarını engelleme |
| 3 | PreToolUse Kancaları | Dinamik kod analizleriyle işlem denetimi |
| 4 | Sandbox (Docker/VM) | Olası zararı izole bir ortamla sınırlandırma |
| 5 | CLAUDE.md | Davranışsal kurallar belirleme |

## Gizlilik ve Veri Sahipliği {#privacy-e-dati style="color: white;"}

Claude Code isteklerinizi bulut sunucuları üzerinde işler; bu nedenle üzerinde çalıştığınız kodlar, dosyalar ve komut çıktıları internet üzerinden Anthropic sunucularına iletilir. Bu durum tüm büyük yapay zeka tabanlı geliştirme araçları için geçerlidir.

Kişisel verilerinizin işlenme şekli hesap türünüze göre değişir:

* **Bireysel Abonelikler (Pro/Max):** Ayarlar bölümünden aksi belirtilmediği sürece verileriniz model eğitimi için kullanılabilir. Gizlilik ayarlarından eğitim izinlerini kapatmanız önerilir.
* **API Kullanımı:** API üzerinden gönderilen veriler modellerin eğitiminde kullanılmaz.
* **Kurumsal Paketler:** Daha sıkı saklama politikaları ve veri saklamama (Zero Data Retention) seçenekleri sunar.

⚠️ **Zihinsel Güvenlik Kuralı:** Yapay zekaya gönderdiğiniz her veri veya dosya içeriğini, gelecekte kamuya açık hale gelebilecekmiş gibi değerlendirin. Kritik ticari sırlar veya müşteri verileri barındıran projelerde veri gönderim limitlerine azami dikkat gösterilmelidir.

### Prompt Injection Riskleri

Yapay zeka harici kaynaklardan veri okurken (örneğin bir web sitesi içeriği, GitHub hata raporu veya üçüncü taraf kütüphane açıklaması), bu içeriklerin içine gizlenmiş kötü niyetli komutlarla karşılaşabilir. Bu durum "Prompt Injection" olarak adlandırılır. Katı `deny` kuralları ve manuel onay süreçleri bu riskleri en aza indirmek için tasarlanmıştır.

### Halüsinasyon ve "Slopsquatting" Tehdidi

Yapay zeka modelleri bazen var olmayan yazılım kütüphanelerini veya paket isimlerini uydurabilir. Saldırganların bu uydurulan paket isimlerini önceden tespit edip içlerine zararlı kod yerleştirerek yayınlaması durumuna "slopsquatting" denir.

* Yapay zekanın önerdiği her yeni kütüphaneyi kurmadan önce doğruluğunu kontrol edin.
* Yazılan kodları üretime almadan önce mutlaka gözden geçirin (code review).

## İleri Seviye İş Akışları: Alt Ajanlar ve MCP {#livello-avanzato style="color: white;"}

### Alt Ajanlar (Subagents)

Claude Code, karmaşık ve zaman alıcı işlemleri gerçekleştirmek için arka planda bağımsız alt ajanlar (`subagents`) başlatabilir. Bu sayede ana sohbet ekranınız temiz kalırken, araştırma veya kod analiz işlemleri arka planda paralel olarak yürütülür. `/agents` komutu ile alt ajanlarınızı yönetebilirsiniz.

### Model Context Protocol (MCP)

MCP, Claude'un harici araçlara ve API servislerine bağlanmasını sağlayan bir protokoldür. Bir veritabanını sorgulamak, Jira kayıtlarını güncellemek veya web tarayıcı kullanmak için MCP sunucularını entegre edebilirsiniz.

⚠️ **Uyarı:** Yüklediğiniz her MCP sunucusu sisteminizde yetkili kod çalıştırır. Yalnızca güvendiğiniz açık kaynaklı ve resmi kaynaklardan gelen MCP sunucularını tercih edin.

## Çalışma Alanı İş Akışları ve En İyi Pratikler {#workflow-consigli-pro style="color: white;"}

1. **Önce Planlayın:** Karmaşık işlerde mutlaka plan modunu (`Shift+Tab`) açarak yapılacak adımları önceden görün.
2. **Bağlamı Temiz Tutun:** Sohbet çok uzadığında yapay zekanın performansı düşebilir. `/clear` ile geçmişi sıfırlamak veya `/compact` ile özetlemek faydalıdır.
3. **Git Branch Kullanımı:** Her zaman yeni bir git dalı (branch) açarak çalışın ve sık sık commit yapın. Claude hata yaparsa kolayca eski sürüme dönebilirsiniz.
4. **Conventional Commits:** CLAUDE.md içine commit kuralları ekleyerek git geçmişinizi düzenli tutun.

## Örnek CLAUDE.md Yapılandırması {#claude-md-esempio style="color: white;"}

Projelerinizde temel alabileceğiniz örnek bir dosya yapısı:

```markdown
# CLAUDE.md: Proje Kuralları

## Bağlam
Next.js + TypeScript web uygulaması. PostgreSQL veritabanı.
Üretim kodları `src/` dizininde, testler `tests/` dizininde yer alır.

## Komutlar
- Yerel Sunucu: `npm run dev`
- Derleme: `npm run build`
- Test: `npm test`
- Lint: `npm run lint` (Commit öncesi çalıştırılması zorunludur)

## Stil Kuralları
- Sıkı TypeScript kuralları geçerlidir; `any` tipi kullanılamaz.
- Fonksiyonel React bileşenleri tercih edilmelidir.
- Değişken isimleri İngilizce, kod içi yorumlar Türkçe yazılmalıdır.

## Güvenlik Kuralları (Kritik)
- .env dosyalarını veya şifreleri asla okuma ve commit etme.
- Kullanıcı onayı olmadan veri silme komutları çalıştırma.
- Doğrudan `main` dalına push yapma, PR süreçlerini işlet.
```

## Son Kontrol Adımları {#verifica-finale-tutto-sotto-controllo style="color: white;"}

Kod yazmaya başlamadan önce kurulumunuzu doğrulayın:

1. `/permissions` komutunu çalıştırarak kuralların yüklenip yüklenmediğini inceleyin.
2. `/memory` komutuyla `CLAUDE.md` dosyasının doğru şekilde tanındığından emin olun.
3. settings.json içindeki engelleme kurallarının çalıştığını doğrulamak için Claude'dan `.env` dosyasını okumasını talep edin. Talebi reddetmesi gerekir.
4. Doğru git dalında çalıştığınızdan emin olun.

## Sonuç {#conclusioni style="color: white;"}

Bu rehberde Claude Code kurulumunu, yapılandırma süreçlerini, CLAUDE.md yapısını ve kritik güvenlik ayarlarını ele aldık. Yapay zeka ajanları geliştirme süreçlerinizi büyük ölçüde hızlandırsa da, sistem güvenliği ve kod doğruluğu üzerindeki son kontrolün her zaman sizde olduğunu unutmayın.

Ağ güvenliğinizi sıkılaştırmak, tehdit modelleri oluşturmak ve sisteminizi korumak için aşağıdaki ilgili rehberleri inceleyebilirsiniz. 🐢

---

## İlgili Rehberler

- **[Tehdit Modeli Nasıl Oluşturulur](/tr/threat-model)** - Güvenlik risklerini tanımlama ve koruma analizi yapma yöntemleri.
- **[Linux Hardening Kılavuzu](/tr/linux-hardening)** - Geliştirme yaptığınız Linux sistemlerini güvenli hale getirme adımları.
- **[macOS Güvenlik Rehberi](/tr/macos-security)** - macOS işletim sisteminde geliştirici güvenliği önlemleri.
- **[E-posta Güvenliği Kılavuzu](/tr/email-security)** - Giriş ve kurtarma işlemleri için e-posta kutunuzu koruma altına alma.

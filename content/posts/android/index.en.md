---
title: "De-Google Android: The Complete Privacy Guide"
description: "Set up a de-googled Android phone with maximum privacy and security without giving up usability. Step-by-step guide with recommended apps."
summary: "Set up a de-googled Android phone with maximum privacy and security without giving up usability. Step-by-step guide with recommended apps."
keywords: ["android privacy", "de-google android", "degoogle phone", "android privacy guide", "graphene os", "private android setup", "degoogled phone", "android security guide"]
author: "b4lol"
date: 2026-03-04
lastmod: 2026-05-05
weight: 1
url: /android
aliases: ["/android.html"]
series: ["Digital Privacy"]
topics: ["android"]
faq:
  - question: "What is a de-googled phone and why should I use one?"
    answer: "A de-googled phone is an Android device that has had Google services removed from it. This prevents Google and third-party companies from silently collecting your personal data such as location, contacts, and searches."
  - question: "Which Android operating system is best for privacy?"
    answer: "GrapheneOS remains the best choice on supported Pixel devices. If your device isn't compatible, a ROM like LineageOS can still help reduce your dependence on Google, but it doesn't offer the same level of hardening, verified boot, and hardware security."
  - question: "How can I install apps without the Google Play Store?"
    answer: "You can use Obtainium to follow apps' official releases directly, Droid-ify for open source software, and, on GrapheneOS, the sandboxed Play Store when you genuinely need it. Aurora Store is more fragile nowadays and should only be considered a fallback option."
  - question: "What is Shelter for and how does it work?"
    answer: "Shelter creates an isolated work profile on the phone, letting you separate trusted apps from tracker-heavy ones like social media and banking apps. The two profiles run in parallel but don't share data with each other."
  - question: "How can I route all of my phone's traffic through Tor?"
    answer: "Install Invizible Pro from F-Droid, enable VPN mode, and in your network settings turn on 'always-on VPN' and 'block connections without VPN'. This way all traffic will be routed through Tor."
  - question: "Which app permissions should I disable to protect my privacy?"
    answer: "Remove every non-essential permission, especially location, camera, and microphone. Also disable internet access for apps that don't need it, such as keyboards, calculators, and file managers."
  - question: "Do I need a VPN if I'm already using Tor with Invizible Pro?"
    answer: "In the main profile with Tor you don't need an additional VPN. In the work profile with tracker-heavy apps, a VPN such as Mullvad or Proton can protect your traffic from your ISP and filter ads and trackers."
howto:
  name: "How to set up Android for privacy and de-googling"
  description: "Procedure for choosing the operating system, installing privacy-friendly apps, isolating profiles, managing permissions, and protecting Android traffic."
  totalTime: "PT2H"
  supply:
    - "An up-to-date Android phone"
    - "A backup of your data"
  tool:
    - "GrapheneOS"
    - "Shelter"
    - "Obtainium"
    - "Droid-ify"
    - "Invizible Pro"
  steps:
    - name: "Choose the operating system"
      text: "Prefer GrapheneOS on a supported Pixel, or consider an updated stock Android or alternative ROMs with clear trade-offs."
      url: "/android#sistema-operativo"
    - name: "Configure the system"
      text: "Reduce unnecessary services, update the phone, and limit invasive settings."
      url: "/android#modifica-e-setup-del-sistema"
    - name: "Choose stores and apps"
      text: "Install apps from verifiable sources such as Obtainium, Droid-ify, or the sandboxed Play Store when needed."
      url: "/android#store-per-il-download-delle-app"
    - name: "Isolate tracker-heavy apps"
      text: "Use Shelter or user profiles to separate banking apps, social media, and the more invasive services."
      url: "/android#shelter"
    - name: "Manage permissions and network"
      text: "Remove non-essential permissions and protect your traffic with Tor or a VPN depending on the profile."
      url: "/android#gestione-dei-permessi-delle-app"
---

> **TL;DR** — In this guide, you will learn:
> - How to choose between GrapheneOS, a well-configured stock Android, and alternative custom ROMs.
> - Which privacy-friendly apps to use as replacements for Google services.
> - How to isolate tracker-heavy apps with Shelter and protect your network traffic with Tor.
> - How to manage permissions, VPNs, and cloud storage securely.

## Summary

To make Android more private, it is best to use GrapheneOS on a supported Pixel device, install fewer apps, restrict permissions and network access, isolate tracker-heavy apps into separate profiles, and download apps only from verifiable sources. While de-Googling improves privacy, it does not replace the need for regular updates, verified boot, and good operational security habits.

Your smartphone knows everything about you: where you go, whom you talk to, and what you search for. Every day, apps installed on your Android device silently transmit your personal data to Google and dozens of third-party companies. This guide shows you how to take back control of your phone, eliminate your dependence on Google, and build a genuinely private mobile environment—all without sacrificing day-to-day usability.

This guide is open to improvements and suggestions. I will describe the setup that I believe offers the best balance between usability and privacy. Over time, I will expand the various sections and introduce alternatives for those who might prefer different apps or services. If you would like to offer suggestions or contribute, you can open a pull request on [GitHub](https://github.com/b4lol/portfolio).

This guide covers Android in general; I have also written a guide specifically for GrapheneOS, which you can find [here](https://b4.lol/graphene).


## Operating System {#sistema-operativo}

In 2026, if you genuinely care about the balance between privacy and security, the practical hierarchy is: **GrapheneOS on a supported Pixel** > **a recent, well-configured stock Android** > **alternative custom ROMs with an unlocked bootloader**. LineageOS, CalyxOS, and similar projects are useful for extending device lifespan, gaining control, and removing Google services, but they should not be considered equivalent to GrapheneOS in terms of system hardening or hardware-level security guarantees.

Therefore, I highly recommend using GrapheneOS if possible. If your device is not supported, LineageOS is a reasonable alternative, but you must accept significant trade-offs regarding verified boot, timely security patches, and protection against physical access attacks.

This guide is designed to offer a practical balance between security and privacy for everyday use. Procedures like rooting or leaving your bootloader unlocked permanently reduce a device's security and are strongly discouraged.

To simplify the steps for installing LineageOS, here is a brief summary:

1. Unlock the bootloader.
2. Flash a custom recovery.
3. Flash [LineageOS](https://lineageos.org/).
4. Re-lock the bootloader (if supported by your device and the ROM).

*Note: The base version of any ROM without Google apps is preferable for privacy, but it is important to weigh the usability trade-offs. While `microG` improves app compatibility, it is still a compromise. On GrapheneOS, if you genuinely need apps that depend on Google, it is far more secure to use **sandboxed Google Play Services** in a dedicated profile rather than relying on custom ROMs with system-level integrations.*

At this point, you will have a fresh, newly installed operating system!

## System Tweaks and Setup {#modifica-e-setup-del-sistema}

To configure a privacy-oriented device, start by adjusting several operating system settings. While these options may vary depending on your device and ROM, here are the key recommendations:

* **Disable Bluetooth and Location Services** whenever they are not in use.
* **Enable Lock-Screen Privacy** by setting a strong PIN/passphrase and hiding notification content when the device is locked.
* **Disable Telemetry** and usage data sharing across the system.
* **Enable Device Encryption** if it is not active by default.
* **Disable Unencrypted Cloud Backups** (use local, encrypted backups instead).
* **Decline Data Sharing and Crash Reporting** whenever prompted by newly installed apps.
* **Turn Off USB Debugging** immediately after use (it is disabled by default), as leaving it active introduces major security vulnerabilities.

We will cover managing individual app permissions later in this guide.

## App Distribution Platforms {#store-per-il-download-delle-app}

Now that we have moved away from the Google ecosystem, we need alternative platforms to download and update apps. The primary recommendations are:

* **[Obtainium](https://obtainium.imranr.dev/)**: More of an app updater than a store, Obtainium acts like a package manager, allowing you to download and update apps directly from their official source releases (e.g., GitHub, GitLab, or F-Droid repositories). This provides excellent security and privacy by eliminating middleman repositories.
* **[Droid-ify](https://www.f-droid.org/packages/com.looker.droidify/)**: A modern, fast F-Droid client with a polished interface. It provides access to thousands of open-source applications, though you should be aware of F-Droid's general security trade-offs (such as delayed updates and repository-signed keys).
* **Sandboxed Google Play Store** (GrapheneOS only): When proprietary apps or services that depend on Google are absolute necessities, the most secure approach is using GrapheneOS's sandboxed Google Play Services. This runs Google services as standard, unprivileged apps without special system permissions.
* **[Aurora Store](https://files.auroraoss.com/AuroraStore/Stable/)**: An open-source frontend for the Google Play Store. It remains useful as a fallback for downloading proprietary apps, but it is increasingly unreliable due to Google rate-limiting anonymous accounts.

## Shelter {#shelter}

> [!WARNING]
> This step is optional. It is primarily useful if you want to create isolated "containers" on your device. Using Shelter has distinct pros and cons and should only be configured if you require a Work Profile. On Android 15 and later, the native **Private Space** feature is simpler for many use cases, while GrapheneOS's **secondary user profiles** remain the most secure solution for strict compartmentalization.

After configuring your app stores, you can download [Shelter](https://f-droid.org/packages/net.typeblog.shelter/).

Shelter is an open-source application that leverages Android's built-in Work Profile functionality to create an isolated sandbox environment on your device.

Imagine a table (your operating system) with two sealed boxes on it (your main profile and your Work Profile). These profiles run side-by-side but are isolated from one another. Note that if your base operating system is bloated with tracker-heavy pre-installed apps, using Shelter alone provides limited privacy. If you cannot install a clean ROM, consider using the [Universal Android Debloater](https://github.com/Universal-Debloater-Alliance/universal-android-debloater-next-generation) to disable invasive stock applications. *(Warning: Disable the apps instead of uninstalling them to prevent bootloops or system corruption on encrypted devices.)*

When you open Shelter, it will guide you through setting up a Work Profile. Once active, the Shelter interface will display two sections:

* **Main**: Your primary profile, where you should keep open-source and trusted applications.
* **Shelter (Work Profile)**: The isolated sandbox where you place invasive, closed-source, or tracker-heavy apps (such as social media and banking applications).

Applications in the Work Profile are marked with a small briefcase badge to distinguish them from your main apps, and they run concurrently within your existing launcher. You can install apps in either profile using the following methods:

1. **Cloning**: Clone an existing app from one profile to the other via the Shelter interface.
2. **Profile-Specific Stores**: Open a store (like Droid-ify/Obtainium in the clean profile, or Aurora/Play Store in the sandboxed profile) and download the app directly.
3. **Manual APK Installation**: Install downloaded APKs directly within the desired profile. (Always prefer using a package manager or store to ensure easy updates).

Because the two profiles are isolated, they do not share data by default. This means contacts, photos, and files are separate. While you can enable file sharing in Shelter's settings, managing data across profiles requires some adjustment.

## Managing Your Threat Model Across Profiles

With two isolated profiles, you can apply a distinct threat model to each:

1. **Main Profile (Clean & Open Source)**: Aim for maximum privacy and anonymity by routing all traffic through Tor and using DNSCrypt.
2. **Work Profile (Proprietary & Tracker-Heavy)**: Accept that these apps are linked to your real identity. Focus on reducing data leakage, blocking ads, and preventing background tracking.

### Configuring the Main Profile (Tor & DNSCrypt)

To secure network traffic in your primary profile, download [Invizible Pro](https://www.f-droid.org/packages/pan.alexander.tordnscrypt.stable/). It redirects all system traffic through the Tor network and encrypts your DNS queries.

1. Open the app, tap the three dots in the top-right corner, and enable **VPN Mode**.
2. Go to your Android system settings: **Network & Internet → VPN → Invizible Pro** (or gear icon next to it).
3. Enable **Always-on VPN** and **Block connections without VPN** to prevent accidental data leaks outside the secure tunnel.

Next, adjust these key settings within Invizible Pro:

* **DNSCrypt Settings**: Enable `require_dnssec`, `nolog`, and `nofilter` to ensure you connect only to secure, non-logging DNS servers.
* **Fast Settings**: Enable **Start DNSCrypt on boot** and **Start Tor on boot** so the protections start automatically.
* **Common Settings**: Enable all protections in the **MITM attack detection** section to protect against network snooping on public Wi-Fi.
* **Firewall**: Go to the firewall settings and block network access for all apps that do not require an active internet connection (e.g., gallery, keyboard, offline games).

### Configuring the Work Profile (Ad & Tracker Blocking)

For the profile containing proprietary apps, you can use one of two approaches:

* **Commercial VPN**: Protect your traffic from your ISP while routing through a trusted provider (e.g., Mullvad, Proton VPN) that offers built-in ad/tracker filtering.
* **Local Firewall/DNS Filter**: Use tools like NetGuard, RethinkDNS, or NextDNS to block network access for specific apps and filter trackers locally without routing through a VPN server.

The best option depends on whether you prefer a global VPN tunnel or fine-grained local firewall rules. You can read more in the [VPN and Cloud sections](#vpn).

## Recommended Applications

Here are the primary applications recommended for a privacy-focused Android setup:

* **[HeliBoard](https://github.com/Helium314/HeliBoard)**: An open-source keyboard that is functionally identical to Gboard but operates entirely offline. Preventing your keyboard from sending keystrokes to online servers is a critical step for privacy.
* **[Cromite](https://github.com/uazo/cromite)**: A hardened, Chromium-based browser with ad-blocking built-in. Excellent alternatives include Brave and, on GrapheneOS, Vanadium. Avoid Firefox-based browsers on Android; they lack modern sandboxing features and present a much larger attack surface on mobile.

When downloading the following apps, be mindful of which profile you install them in:

* **[Aegis](https://www.f-droid.org/packages/com.beemdevelopment.aegis/)**: An excellent, open-source, offline two-factor authenticator (2FA) to replace Google Authenticator or Authy.
* **[AntennaPod](https://f-droid.org/packages/de.danoeh.antennapod/)**: A fully open-source podcast manager and player.
* **[Bitwarden](https://github.com/bitwarden/mobile/releases)**: A secure, cross-platform password manager that supports end-to-end encryption and self-hosting.
* **[Crypto Prices](https://f-droid.org/packages/de.cloneapps.crypto_prices)**: A tracker for cryptocurrency prices, serving as a private alternative to CoinMarketCap.
* **[Guerrilla Mail](https://f-droid.org/it/packages/cf.theonewiththebraid.guerrilla_mail/)**: An Android client for the Guerrilla Mail temporary email service, useful for avoiding spam.
* **[LibreTorrent](https://www.f-droid.org/packages/org.proninyaroslav.libretorrent/)**: A lightweight, fast, and open-source torrent client.
* **[KeePassDX](https://www.f-droid.org/packages/a.veux.keepassdx/)**: A secure, offline password manager supporting the KeePass (.kdbx) format. Ideal if you prefer local control over cloud syncing.
* **[Molly](https://molly.im/)**: A hardened version of Signal with proprietary Google dependencies stripped out.
* **[Nekogram](https://nekogram.app/)**: A feature-rich Telegram client compiled without Google Play Services. Remember that **Telegram does not enable end-to-end encryption (E2EE) by default** in standard chats; use Signal/Molly or SimpleX for sensitive discussions.
* **[PipePipe](https://github.com/InfinityLoop1308/PipePipe)**: A frontend for YouTube, SoundCloud, and PeerTube, allowing you to watch videos without Google tracking.
* **[Nextcloud](https://f-droid.org/en/packages/com.nextcloud.client/)**: A mobile client for Nextcloud, which is the gold standard for self-hosted cloud storage.
* **[OpenKeychain](https://www.f-droid.org/packages/org.sufficientlysecure.keychain/)**: An open-source implementation of OpenPGP, allowing you to manage encryption keys and sign/decrypt messages.
* **[BlueWallet](https://www.f-droid.org/packages/io.bluewallet.bluewallet/)**: A secure, open-source Bitcoin wallet supporting both on-chain and Lightning Network transactions.
* **[SimpleLogin](https://www.f-droid.org/packages/io.simplelogin.android.fdroid/)**: An email aliasing service that creates decoy addresses. Emails sent to these aliases are forwarded to your real inbox, protecting your primary email from data breaches and tracking.
* **[Simple Crypto Widget](https://f-droid.org/packages/com.brentpanther.bitcoinwidget/)**: A home screen widget to display real-time Bitcoin prices.
* **[Tor Browser](https://www.torproject.org/download/)**: The official Android browser from the Tor Project, built to access the onion network and prevent tracking.
* **[Voice](https://www.f-droid.org/packages/de.ph1b.audiobook/)**: A clean, offline, open-source audiobook player.

For more resources and recommendations, visit [Privacy Guides](https://privacyguides.org/) or explore the curated categories in Droid-ify.

## Email Clients and Providers

Choosing the right email client and provider is a complex topic. If you are looking for a user-friendly service that requires minimal setup, [Proton Mail](https://github.com/ProtonMail/proton-mail-android/releases) is highly recommended. It offers one of the best balances between day-to-day usability and privacy.

Alternatively, you can use [Thunderbird](https://www.thunderbird.net/en-US/) as your client, paired with a privacy-focused or community-run email provider such as [Riseup](https://riseup.net/), [Esiliati](https://esiliati.org/), or [Autistici](https://www.autistici.org/).

Thunderbird also supports automated email encryption: by linking a PGP key from OpenKeychain, it will automatically encrypt outgoing messages to recipients who have published their public PGP keys.

Once you have installed your preferred applications, proceed to configure their permissions using the instructions below. Apply these same practices to any apps you install in the future.

## Managing App Permissions {#gestione-dei-permessi-delle-app}

To secure your apps, navigate to **Settings → Apps → Permission Manager** (exact paths may vary slightly depending on your ROM) and revoke any unnecessary permissions. 

For example, while an instant messenger like WhatsApp needs access to your contacts to find users, it does not need access to your SMS messages after the initial setup. Leaving SMS access enabled allows the app to read all incoming text messages.

* **Location, Camera, and Microphone**: Pay extra attention to these. Only grant access when strictly necessary.
* **One-Time Permissions**: When an app requests a sensitive permission that you only need occasionally, select "Only this time" to prevent it from accessing that sensor in the background later.
* **Restrict Network Access**: Disable internet access for apps that do not require online features (e.g., keyboards, calculators, file managers, notes apps). Go to **App Info → Mobile Data & Wi-Fi** and toggle off network access.
* **Firewall Blocking**: To guarantee that offline apps cannot access the internet, use NetGuard or Invizible Pro to block them behind a local firewall. Many offline apps silently send usage telemetry and user data when network access is left enabled.

## Cloud Storage

The most secure cloud storage solution is self-hosting [Nextcloud](https://nextcloud.com/). If self-hosting is not feasible, **Proton Drive** is a mature, end-to-end encrypted alternative that serves as an excellent hosted solution. While services like [Mega.nz](https://mega.nz/) offer convenient free tiers, they are not ideal for a strict privacy setup.

If you must use a mainstream provider (like Google Drive or OneDrive) due to work or school requirements, you can protect your files using [Cryptomator](https://cryptomator.org/). This open-source utility encrypts your files locally on your device before they are uploaded to the cloud, ensuring the provider cannot read your data.

## VPN Services

Using a VPN encrypts your traffic and routes it through a secure tunnel, hiding your browsing activity from your Internet Service Provider (ISP). However, this shifts trust from your ISP to the VPN provider.

While almost every VPN provider claims a "no-logs" policy, these claims are difficult to verify independently. Based on their transparency, track record, and technical implementation, the most recommended providers are:

* **Mullvad VPN**: Renowned for not requiring an email address or personal information to sign up, and accepting cash or cryptocurrency.
* **Proton VPN**: Integrates well with the Proton ecosystem and has open-source, audited clients.
* **IVPN**: A security-focused provider with excellent privacy standards and multi-hop capabilities.
* **[Self-Hosting Your VPN](https://b4.lol/vpn)**: Building your own WireGuard server to secure your connection on public networks.

## Final Thoughts

Following this guide will drastically reduce your personal data footprint. While it does not guarantee absolute anonymity, it significantly increases your everyday mobile privacy and security.

To stay updated on privacy, security, and de-Googling trends, consider visiting the following communities:

* [r/degoogle](https://www.reddit.com/r/degoogle/)
* [r/privacytoolsIO](https://www.reddit.com/r/privacytools/)
* [r/privacy](https://www.reddit.com/r/privacy/)

> "Arguing that you don't care about the right to privacy because you have nothing to hide is no different than saying you don't care about free speech because you have nothing to say."
> — *Edward Snowden*

---

## Related Guides

- **[The Definitive Guide to GrapheneOS](/graphene)** — The most secure operating system for mobile privacy, analyzed in full detail.
- **[How to Build a Threat Model](/threat-model)** — The first step in protecting your privacy: defining your threats and objectives.
- **[Self-Hosted VPN with Ad Blocking](/vpn)** — Build your own personal VPN with WireGuard and Pi-hole to block ads and trackers.
- **[Tor Node Tutorial](/tor)** — How to set up a Tor relay to support free communication and browse anonymously.

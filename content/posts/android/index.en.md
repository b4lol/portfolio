            
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

> **TL;DR** - In this guide you'll learn:
> - How to choose between GrapheneOS, a well-configured stock Android, and alternative ROMs
> - Which privacy-friendly apps to use to replace Google services
> - How to isolate tracker-heavy apps with Shelter and protect your data traffic with Tor
> - How to manage permissions, VPNs, and cloud storage securely

## Summary

To make Android more private, it's worth using GrapheneOS on a supported Pixel whenever possible, installing fewer apps, limiting permissions and internet access, separating tracker-heavy apps into isolated profiles, and choosing verifiable app stores. De-googling improves privacy, but it doesn't replace updates, verified boot, and good operational habits.

Your smartphone knows everything about you: where you go, who you talk to, what you search for. Every day, the apps installed on your Android silently send your personal data to Google and dozens of third-party companies. This guide shows you how to take back control of your phone, eliminating dependence on Google and building a genuinely private mobile environment, without sacrificing day-to-day usability.

This guide is open to improvements and suggestions; I'll describe the setup I find offers the best usability/privacy trade-off, and over time I'll expand the various sections by introducing alternatives for those who might not get along with a particular app or service. If you'd like to give me suggestions or contribute to the guide, you can open a pull request on [GitHub](https://github.com/b4lol/portfolio).

This guide covers Android in general; I've also written one specifically for GrapheneOS, which you can find [here](https://b4.lol/graphene).
  

## Operating system {#sistema-operativo}

In 2026, if you genuinely care about the privacy/security trade-off, the practical hierarchy is this: **GrapheneOS on a supported Pixel** > **a recent, well-configured stock Android** > **alternative ROMs with an unlocked bootloader**. LineageOS, CalyxOS, and similar projects can be useful for compatibility, control, and reducing Google services, but they shouldn't be considered equivalent to GrapheneOS in terms of hardening or hardware security guarantees.

If possible, I therefore recommend using GrapheneOS. If your device isn't supported, LineageOS can still make sense, but you'll have to accept more pronounced trade-offs on verified boot, timely patches, and protection against physical attacks.

This guide was designed and built to offer a great balance between security and privacy in everyday phone use; procedures such as rooting and unlocking the bootloader significantly reduce a device's security and are therefore strongly discouraged.

To simplify the steps for installing Lineage, here's a very brief summary:

1.  Unlock the bootloader
2.  Flash a recovery
3.  Flash [Lineage OS](https://lineageos.org/)
4.  If possible on your device, re-lock the bootloader

Note: the base version without Google apps is preferable for privacy, but in 2026 it's worth weighing the trade-offs clearly. `microG` improves compatibility, but it's still a compromise. On GrapheneOS, if you genuinely need apps that depend on Google, it's generally more solid to use the **sandboxed Google Play Services** in the profile where you need them, rather than chasing partial solutions everywhere.
  

At this point we'll have a fresh, just-installed operating system!

## System tweaks and setup {#modifica-e-setup-del-sistema}

To get a privacy-oriented device, we'll start by tweaking various operating system settings. Here are the main settings and precautions, although these may vary from device to device:

*   Disable Bluetooth and location whenever they're not in use
*   Enable lock-screen privacy and a device protection method (PIN and hidden notifications while the phone is locked)
*   Disable all telemetry data
*   Enable device encryption if it isn't already enabled
*   Disable backups
*   Decline data-sharing and crash telemetry every time you're prompted, if possible, in all installed apps
*   Remember to turn off USB debugging every time you use it (it's disabled by default), since it exposes you to major security risks

We'll handle app permissions later on.
  

## App download stores {#store-per-il-download-delle-app}

Now that we're separated from the Google world, we'll need to find other stores to download apps from. The main alternatives are:

*   [Obtainium](https://obtainium.imranr.dev/): more of an app updater than a store, it behaves similarly to a Linux package manager. Excellent security and privacy; it lets you download and update apps directly from the various releases on GitHub or F-Droid repositories.
*   [Droid-ify](https://www.f-droid.org/packages/com.looker.droidify/): a fork of F-Droid with a more polished interface and a few extra features. A very well-made open-source app store, even if it has some security trade-offs.
*   On **GrapheneOS**, when you need proprietary apps or ones that depend on Google, the most robust method remains the **sandboxed Play Store** installed from the GrapheneOS App Store.
*   [Aurora Store](https://files.auroraoss.com/AuroraStore/Stable/): can still be useful as an emergency solution, but it's less reliable today than it used to be, and anonymous shared accounts often fail or get rate-limited.

  

## Shelter {#shelter}



⚠️ This step is optional; it's mainly useful if you're interested in creating several mutually isolated "containers" on your phone. Using Shelter has advantages and drawbacks, and it should only be done if you genuinely need work profiles. On Android 15+ there's also **Private Space**, which is simpler for many use cases; on GrapheneOS, **secondary user profiles** remain the stronger solution for compartmentalization.

Now that we have our app stores set up, we can move on to downloading [Shelter](https://f-droid.org/packages/net.typeblog.shelter/).

Shelter is an open source application that lets us create a work profile — essentially a second profile on the phone that runs alongside the first one but in an isolated and independent way.
  
Picture a table (our operating system) with two sealed, closed boxes on it (our two profiles): these two are completely independent and separate, but they share a common base. If our phone's OS is itself dirty and full of tracker-heavy apps like Google Play Services, using Shelter becomes largely pointless. If you don't want to change ROM, at least use this [Android Debloater](https://github.com/Universal-Debloater-Alliance/universal-android-debloater-next-generation), which lets you disable, with a few simple taps, the main privacy-toxic apps included by default in most operating systems (WARNING: disable the apps, don't uninstall them, or you risk corrupting the system if your phone is encrypted).
  
Once you open Shelter, a work profile configuration menu will appear; once activated, you'll get access to the app's interface, which is divided into 2 sections:

*   **Main**: the main profile, where we'll only install open source apps or ones with no internet access.
*   **Shelter**: the section where we'll isolate all the malicious and tracker-heavy apps, such as social media, banking apps, or closed source software.

The 2 profiles are perfectly separated: apps installed in the main one will look like normal icons, while those installed in the work profile will display a small badge that distinguishes them from the others; they'll coexist within the same launcher. To install apps in the profile you want, all you need is one of these 3 methods:
  

*   From the Shelter app, clone an app from one profile to another (or from the settings, use the install APK function).
*   Download apps from a store installed in that profile (for example Droid-ify/Obtainium in the clean profile, and, if you need proprietary software, Play Store or Aurora in the more "dirty" profile).
*   Install APKs downloaded from the internet (if possible, always use an app store, as it makes downloading and updating software easier and safer).

The two systems will be isolated, which is fairly inconvenient for managing contacts, the gallery, files, etc., since each will have its own. In Shelter's settings you can enable a feature that lets the two systems partially talk to each other for file sharing. Even so, managing everything will remain a bit awkward until you get used to it.

## Managing the threat model across profiles

Now that we have two completely different and isolated systems, we'll apply a different threat model to each. In the first one (clean and open source) we'll aim for maximum privacy by routing all data traffic through Tor and DNSCrypt; in the second one (dirty, with tracker-heavy elements) we'll instead aim to reduce data leakage as much as possible, accepting that we're still using apps that probably already have our personal data (so we'll focus on limiting ads and trackers as much as we can).
  
First, let's focus on the main profile and download [Invizible Pro](https://www.f-droid.org/packages/pan.alexander.tordnscrypt.stable/), an app that redirects all traffic through Tor and encrypts DNS.

Once you've opened the app, from the top-right menu with the 3 dots, enable VPN mode. Then go to your phone's settings, in the **Network → Advanced/VPN → Invizible Pro** section, and enable 'always-on VPN' and 'block connections without VPN' here. This way, all traffic will pass through Invizible and we'll avoid any data leaks.
  
Now that we've set up the network correctly, let's tweak a few settings inside Invizible. Over time these settings occasionally get moved around, so take a look at the app's settings and you'll find everything anyway:

*   In **DNSCrypt settings**, enable require_dnssec, nolog, and nofilter; this will always let us use the best possible DNS servers.
*   In the **Fast Settings** section, enable 'start DNSCrypt on boot' and 'start TOR on boot', so the app will start automatically right at boot.
*   In the settings, go to **Common Settings** and enable all 3 protections in the **MITM attack detection** section; these will protect our device when connected to public Wi-Fi.
*   Finally, go to the **Firewall** category and disable internet access for all apps that don't need it (such as the gallery, the keyboard, offline games, etc.)

At this point, the main profile is ready to use, and we can move on to the work profile, the one with closed source apps.

Here we can adopt two different techniques for data protection:

*   Use a VPN if we're looking for protection against our ISP (it also lets us filter ads and trackers).
*   Use NetGuard or some kind of app like RethinkDNS or NextDNS to block internet access for apps that don't need it and add ad and tracker blocking.

All options are valid; the decision mainly depends on whether or not you're willing to use a VPN service. If you'd like to go deeper on the topic, you can take an early look at the [dedicated section.](#cloud)

## Applications

Now that our stores and networks are well configured, let's move on to downloading some strongly recommended apps:

*   [HeliBoard](https://github.com/Helium314/HeliBoard): an open source Android keyboard that's functionally identical to Gboard; using an offline keyboard that doesn't report what you type to online servers is essential for good security and privacy.
*   [Cromite](https://github.com/uazo/cromite): a great browser for everyday browsing; other alternatives are Brave or Vanadium (the latter currently only available on GrapheneOS). If you're after high levels of security, AVOID Firefox-based browsers — on mobile they're missing various features and have a much larger attack surface.
  

At this point we can move on to downloading apps, paying attention to which profile we install them in:

  
*   [Aegis](https://www.f-droid.org/packages/com.beemdevelopment.aegis/): an open source, offline alternative to Authy/Google Authenticator
*   [AntennaPod](https://f-droid.org/packages/de.danoeh.antennapod/): a fully open source podcast player that uses the main existing podcast players as sources
*   [Bitwarden](https://github.com/bitwarden/mobile/releases): the best password manager, extremely secure, and it also supports self-hosting
*   [Crypto Prices](https://f-droid.org/packages/de.cloneapps.crypto_prices): an alternative to CoinMarketCap
*   [Guerrilla Mail](https://f-droid.org/it/packages/cf.theonewiththebraid.guerrilla_mail/): a client for Guerrilla Mail, a temp mail service for spam
*   [LibreTorrent](https://www.f-droid.org/packages/org.proninyaroslav.libretorrent/): a simple, convenient, and fast Torrent client for Android
*   [KeePassDX](https://www.f-droid.org/packages/a.veux.keepassdx/): a lightweight, secure, open-source offline password manager for Android that supports the KeePass format (.kdbx). Perfect if you prefer local storage instead of cloud syncing.
*   [Molly](https://molly.im/): a hardened version of Signal with Google code stripped out; it might be a good idea to register with a SIM bought without documents, if legal in your country
*   [Nekogram](https://nekogram.app/): a convenient Telegram client with no dependency on Play Services, but remember that **Telegram doesn't offer E2EE by default** in normal chats. For sensitive conversations, Signal/Molly or SimpleX are better
*   [PipePipe](https://github.com/InfinityLoop1308/PipePipe): a PeerTube client — all of YouTube's videos, but without Google!
*   [Nextcloud](https://f-droid.org/en/packages/com.nextcloud.client/): a client for using and syncing Nextcloud, in my opinion the best software for setting up your own home media server
*   [OpenKeychain](https://www.f-droid.org/packages/org.sufficientlysecure.keychain/): an app for managing your PGP keys or integrating them into messaging/email apps
*   [BlueWallet](https://www.f-droid.org/packages/io.bluewallet.bluewallet/): a feature-rich, secure, and actively maintained open-source Bitcoin wallet supporting both on-chain and Lightning Network transactions.
*   [SimpleLogin](https://www.f-droid.org/packages/io.simplelogin.android.fdroid/): a kind of anti-spam email proxy that creates decoy email addresses to register on sites, which automatically forward emails to other addresses you choose; this way you never have to give your real email to external sites. You can also delete or pause decoy addresses whenever you want, stopping emails from reaching your main account
*   [Simple Crypto Widget](https://f-droid.org/packages/com.brentpanther.bitcoinwidget/): to keep updated prices for your crypto... ahem, Bitcoin, on your home screen
*   [Tor Browser](https://www.torproject.org/download/): the official Tor browser with the Tor library built in, useful for browsing online without revealing your IP address. It doesn't guarantee perfect anonymity, but it's one of the most useful tools for browsing and using .onion sites
*   [Voice](https://www.f-droid.org/packages/de.ph1b.audiobook/): an offline, open source audiobook player

For more privacy-friendly apps, browsers, and services, I recommend taking a look at [privacytools](https://www.privacytools.io/) (a historic project, now largely superseded by Privacy Guides), [privacyguides](https://privacyguides.org/providers/), or browsing the various categories on Droid-ify.

## Email clients and providers

The discussion of which is the best email client and provider is long and complex; if you want a quick and convenient service that nonetheless requires some trust, I recommend [Proton Mail](https://github.com/ProtonMail/proton-mail-android/releases) — among the various ready-to-use solutions, it definitely has one of the best usability/privacy trade-offs.

A very solid option is to use [Thunderbird](https://www.thunderbird.net/en-US/) as your client (i.e., the app you receive mail in) and, as a provider (i.e., the email service connected to the app), some privacy-friendly or anarchist group/collective such as [Riseup](https://riseup.net/), [Esiliati](https://esiliati.org/), or [Autistici](https://www.autistici.org/).

Very interesting, within Thunderbird's settings, is the email auto-encryption option: by importing a PGP key from OpenKeychain (the app covered above), you can automatically encrypt emails to people who have likewise imported a PGP key.

At this point in the guide, you should have already installed all your personal apps as well as the ones I've indicated or recommended; we can now move on to permissions. If you install other apps in the future, follow this same procedure for them too.

## Managing app permissions {#gestione-dei-permessi-delle-app}

As a first step, go to your phone's settings and into the Apps → Advanced → Permission Manager section, and here remove every superfluous permission from your apps (for example, an app like WhatsApp needs your contacts if you want to find them, so for it to work properly it's worth leaving that permission on, but you can safely disable access to messages, since it's only used the first time, during login, to speed up your first sign-in — if left enabled afterward, it gives WhatsApp the ability to read all your SMS).
  
Pay particular attention to location, camera, and microphone permissions.
  
When an app asks for a permission that isn't useful, or that you know you'll only use occasionally, grant the permission 'only this time', so it doesn't get continuous access.
  
After adjusting all the permissions, let's also disable internet access for all apps that don't need network connectivity (for example, the various file managers, calculators, calendars, notes apps, keyboards, etc.). We can do this conveniently by going into an app's info → Data and network → and disabling 'Network access'.
  
If you want to be even more certain that internet access is blocked for these apps, you can use services like the previously covered NetGuard and Invizible to block them behind a firewall. Don't underestimate apps' internet access: many, despite not needing it to function, use it constantly to share your data.

## Cloud

The best cloud solution would be self-hosting with Nextcloud (in my opinion, the best choice). If that's not possible, today **Proton Drive** has become much more mature than it was a few years ago, and it's the hosted solution I'd most often recommend. [Mega.nz](https://mega.nz/) can still make sense if you're looking for convenience and free storage, but I wouldn't consider it the first choice for a genuinely privacy-oriented setup.

If instead we want extra security, we can use a cloud service in combination with [Cryptomator](https://cryptomator.org/) (a program that encrypts files before uploading them to the cloud).
  
## VPN
The VPN discussion is a special case: a VPN encrypts our traffic and routes it through one of its nodes, placing itself between us and our ISP, giving us more privacy from the ISP but forcing us to trust the VPN service itself.

Every company in this industry promises privacy and no-logging policies, but it's not possible to verify these claims. In my opinion, the most interesting services are:

* Mullvad
* Proton
* IVPN
* [Self-hosting](https://b4.lol/vpn)
  
## Final thoughts

By following this guide, we'll have drastically reduced the sharing of our personal data; this in no way guarantees anonymity, but it definitely increases privacy and security when using the device.
  
Other great places to stay up to date on privacy and degoogling are various subreddits:

*   [DEGOOGLE](https://www.reddit.com/r/degoogle/)
*   [PRIVACYTOOLS](https://www.reddit.com/r/privacytools/)
*   [PRIVACY](https://www.reddit.com/r/privacy/)

> "Saying that privacy doesn't matter because you have nothing to hide is like saying that freedom of speech doesn't matter because you have nothing to say."

---

## Related guides

- **[The Definitive Guide to GrapheneOS](/graphene)** - The best operating system for mobile privacy, analyzed in full detail
- **[How to Build a Threat Model](/threat-model)** - The first step in protecting your privacy: defining the threats
- **[Self-Hosted VPN with AdBlock](/vpn)** - Build your own personal VPN with Wireguard and Pi-Hole to block ads and trackers
- **[Tor Node Tutorial](/tor)** - Contribute to the Tor network and browse anonymously

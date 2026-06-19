---
title: "GrapheneOS: The Complete Guide to the Best Privacy OS"
description: "Everything about GrapheneOS: installation, configuration, user profiles, sandboxed Play Services and troubleshooting. The most complete guide available."
summary: "Everything about GrapheneOS: installation, configuration, user profiles, sandboxed Play Services and troubleshooting. The most complete guide available."
keywords: ["GrapheneOS","GrapheneOS guide","graphene os","android privacy","degoogle android","private smartphone","secure android os"]
author: "b4lol"
date: 2026-03-01
lastmod: 2026-05-05
weight: 2
url: /graphene
series: ["Digital Privacy"]
topics: ["android"]
faq:
  - question: "Does GrapheneOS only work on Google Pixel?"
    answer: "Yes, at the moment GrapheneOS officially supports only Google Pixel devices because they are the only ones that meet the necessary hardware security requirements, such as verified boot and memory tagging."
  - question: "Is it safe to use a Google phone for privacy?"
    answer: "Yes. Pixels are the reference devices for Android development, receive a lot of attention from security researchers, and there is no evidence of intentional backdoors. GrapheneOS removes Google services and adds advanced protections."
  - question: "Which Google Pixel should I choose for GrapheneOS?"
    answer: "For maximum security, the most recent supported Pixels are recommended. In 2026 I would first look at the Pixel 9/10 and their Pro variants; the Pixel 9a is the most sensible budget choice. The Pro models with 16 GB of RAM are ideal if you want to use many user profiles."
  - question: "Do Android apps and Google Play Services work on GrapheneOS?"
    answer: "GrapheneOS supports sandboxed Google Play Services, which let you use apps that require Google services while keeping them isolated in a sandbox without special privileges."
  - question: "How do you install GrapheneOS?"
    answer: "GrapheneOS can be installed via the official web installer from the browser, from the command line, or by purchasing a device with the system already pre-installed."
  - question: "What are user profiles in GrapheneOS?"
    answer: "User profiles let you create isolated environments on the same device, each with its own apps and separately encrypted data. They are useful for compartmentalizing personal, work, and sensitive activities."
  - question: "Does GrapheneOS receive regular security updates?"
    answer: "Yes, GrapheneOS receives very frequent updates that are downloaded and installed automatically in the background. You just need to restart the device to apply them."
howto:
  name: "How to choose, install and configure GrapheneOS"
  description: "Practical procedure for choosing a compatible Pixel, installing GrapheneOS, verifying secure boot and configuring profiles, apps and privacy settings."
  totalTime: "PT2H"
  supply:
    - "Google Pixel supported by GrapheneOS"
    - "Reliable USB-C cable"
    - "Stable internet connection"
  tool:
    - "Browser compatible with WebUSB"
    - "Official GrapheneOS web installer"
  steps:
    - name: "Choose a supported Pixel"
      text: "Check the official table of supported devices and prefer recent models with a long update window."
      url: "/graphene#quale-pixel-scegliere"
    - name: "Install GrapheneOS"
      text: "Use the official web installer or the command-line procedure, following the instructions from the GrapheneOS project."
      url: "/graphene#installazione"
    - name: "Verify secure boot"
      text: "Check the verified boot key hash and use Auditor to attest that the installed system is genuine."
      url: "/graphene#protezione-contro-manomissioni"
    - name: "Configure security settings"
      text: "Set up screen lock, auto-reboot, USB restrictions, wireless attack surface and app permissions based on your threat model."
      url: "/graphene#hardening-attraverso-le-impostazioni"
    - name: "Separate activities with user profiles"
      text: "Create separate profiles for work, personal life, apps that need Google Play Services, and sensitive activities."
      url: "/graphene#profili-utente-secondari"
    - name: "Install and verify apps"
      text: "Prefer trustworthy sources, update apps regularly, and use App Verifier or stores with verifiable signatures when possible."
      url: "/graphene#applicazioni"
---

> **TL;DR** - In this guide you will learn:
> - Why GrapheneOS is the gold standard of mobile privacy and which Pixel to choose
> - How to install and configure GrapheneOS from scratch
> - How to make the most of user profiles, sandboxed Play Services and advanced security features
> - Troubleshooting: solving the most common app and service problems

## What is GrapheneOS and who is it for?

GrapheneOS is an open source Android operating system focused on privacy and security. It is designed for people who want to reduce data collection, increase app isolation, and still maintain compatibility with many Android apps thanks to Google Play Services that can be installed in a sandbox, without system privileges.

| Question | Short answer |
|---|---|
| Which phones does it work on? | Only on officially supported Google Pixel devices. |
| Do I have to give up Google apps? | No: Google Play Services can be installed as sandboxed apps. |
| Is it suitable for beginners? | Yes, if you're willing to follow a guided setup and learn about user profiles. |
| Is it anonymous by default? | No. It improves privacy and security, but the outcome depends on your threat model and the apps you use. |

**Main sources:** official GrapheneOS documentation, the project's FAQ, the Android Open Source Project, and hands-on testing on supported Pixel devices.

Your smartphone is the most intimate device you own: it knows where you go, who you talk to, your habits. Stock Android and iOS operating systems constantly share this data with Google and Apple. GrapheneOS is the only alternative that offers enterprise-grade security without compromising your privacy. This guide walks you from choosing the device all the way to advanced configuration.

[GrapheneOS](https://grapheneos.org/) is an FOSS (Free and Open Source Software) operating system based on the [Android
Open Source Project (AOSP)](https://www.android.com/), focused on improving privacy and security.

GrapheneOS currently represents the gold standard among Android operating systems, and this guide will go through all
the various aspects and features of the OS.

This article is an attempt to gather information and knowledge about mobile security and privacy related to the
GrapheneOS project; thanks to [PatrickD](https://x.com/patrickd_de) for writing an article about GrapheneOS that
inspired this guide.

Writing this guide took a long time and a lot of effort; the biggest donation you can make is sharing it on **groups**
and **telegram channels**, **twitter**, and various social networks so that as many people as possible can see it. A
**heartfelt thank you** to anyone who does. This content is not for profit: this site doesn't ask for any of your
data, has no analytics, doesn't ask for your email or registration. Share the word to keep this project alive.

## Choosing a Device

Probably the most common question for those approaching the GrapheneOS project for the first time is: why are so few
devices officially supported, and why are they all expensive Pixel phones made by the supposedly evil Google?

### Why only Pixel devices?



According to GrapheneOS, at the moment there simply aren't other reasonable choices. GrapheneOS has no exclusive
contract with Google for these devices, and it's not because Pixels are incredibly secure, but rather because all the
alternatives are decidedly bad. The GrapheneOS project maintains a [list of
requirements](https://grapheneos.org/faq#future-devices) for currently and potentially future supported devices, and
unfortunately, at the moment only Pixels are able to meet them.

Pixel devices offer full support for alternative operating systems thanks to the fact that they serve as the
reference platform for Android development. They receive regular and adequate firmware updates and offer advanced
hardware security features, such as [memory
tagging](https://discuss.grapheneos.org/d/10507-what-actually-is-the-memory-tagging-feature-and-is-it-worth-turning-on),
which remain available even when non-stock operating systems are installed.

Most other OEM manufacturers, on the other hand, offer only partially functional support for alternative operating
systems, treating it as a non-professional hobby feature. Many of them skip basic security features entirely and
don't bother providing adequate updates. To make things worse, they often add complexity and, with it, a larger
attack surface through their modifications to the system.

In the past, GrapheneOS attempted to collaborate with OEM manufacturers, but it proved incredibly difficult to build
a device with a level of security comparable to that of Pixels.

Extended device support would currently mean compatibility with very insecure devices, incapable of supporting many
of GrapheneOS's security features. Moreover, this would take a significant amount of resources away from the work on
improving privacy and security, since many of these features are hardware-specific. However, if other devices that
met the requirements existed, the GrapheneOS project would certainly plan to support them.

### Are there alternatives?

There are various alternative operating systems for Android devices that focus on privacy and security, or that at
least offer broader device support. However, none of these can be considered a true alternative, as their security
features always have major gaps.

The most basic criticism that the GrapheneOS team levels at almost all of these projects concerns the major delay or,
in some cases, the total omission of important security patches that users of the fully open source variant of
Android (AOSP) benefit from.

[LineageOS](https://lineageos.org/) is one of these, though it should be said that this project's focus is on device
longevity and broad compatibility rather than security. However, it lacks a verified boot system, making unauthorized
physical access trivial. The [/e/OS](https://e.foundation/e-os/) project presents itself as a fully "deGoogled"
mobile ecosystem focused on privacy, but it is built on the fragile foundations of Lineage. e/OS includes
applications and services that give users a questionable sense of privacy, while these same services are invasive
and poorly built.

GrapheneOS's possibly biggest "competitor," [CalyxOS](https://calyxos.org/), is not only regularly behind on patches,
but has also misled users by providing inaccurate Android security patch levels. It has also implemented security
features with serious flaws, such as the emergency wipe feature that did not reliably delete compromising data as
intended.

> For more information on the various Android-based operating systems, you can consult this third-party comparison
> table: <https://eylenburg.github.io/android_comparison.htm>

Then there's [CopperheadOS](https://copperhead.co/android/), the name under which GrapheneOS was previously known. I
won't go into the details of the drama behind the hostile takeover and the subsequent split from the company that was
supposed to fund the project. It is, however, worth noting that this company now sells CopperheadOS as a closed
source fork (which I personally strongly advise against).

Finally, [Purism](https://puri.sm/), with its custom hardware made in the United States, promises control over
privacy with features like (questionable) hardware switches. The GrapheneOS team strongly disagrees with the choice
of hardware security components adopted for their devices and the complicated process required for firmware and
microcode updates. The Librem 5 device is almost entirely based on closed source hardware and firmware, even though
many people have been led to believe otherwise. GrapheneOS accuses these projects of empty marketing with buzzwords
that lead users to trust outdated and vulnerable hardware and software. They even go as far as saying that users
would be better off using an iPhone (in Lockdown mode) as the second-best option for privacy and security after
GrapheneOS.

Don't get me wrong: the GrapheneOS project does not claim in any way that its operating system is impenetrable, but
it focuses on substance rather than branding and marketing. This becomes quite clear when comparing the GrapheneOS
[website](https://grapheneos.org/) with those of other projects: GrapheneOS is an openly technical project, which I
personally appreciate a lot because it saves me from having to dig through marketing to find the technical facts. On
the other hand, I can certainly understand how this can be quite intimidating for the average user.

### Can Google devices be considered trustworthy?

We've seen that GrapheneOS currently only supports Pixel devices, since they're the only ones with sufficient
hardware security measures. All clear, but wouldn't it be pointless if these devices had backdoors?

As mentioned, Google's Pixels serve as reference devices for Android development, leading many experts to work on
them. Moreover, Google has been very open to external security research, thanks to which Pixels have received great
attention in this field. Under these circumstances, it would be quite difficult to hide backdoors in the devices.

Another argument is that it would be much simpler to attack the supply chains of small companies that outsource their
manufacturing, rather than compromising the global production of iPhones or Pixels without being discovered. Users of
such widely used devices benefit from the high level of scrutiny and attention these devices are subjected to.
Furthermore, it's important to note that leaks from forensic companies, which specialize in accessing smartphones and
are often hired by governments, provide no evidence of intentionally inserted backdoors. However, some choose not to
use anything made by Google on principle. To achieve this, though, they would have to rely on Apple products, given
that Google plays a huge role in the development of many open source projects, including the Linux kernel itself.

GrapheneOS's mission is not entirely focused on the idea of avoiding a specific company at all costs, but rather on
achieving the best possible privacy and security with the best available tools.

### Which Pixel should you choose? {#quale-pixel-scegliere}

For maximum security, it is strongly recommended to use one of the most recent supported Pixels. In 2026 this means
looking primarily at the ninth or tenth generation, while the eighth still makes sense especially if you already own
one. These devices are considered significantly more secure thanks to the hardware features that GrapheneOS can take
advantage of, such as memory tagging. The most recent generations also include improved modems and radio components,
so if you plan to use it with a SIM, you'll benefit from greater security and battery life. The Pro models with 16 GB
of RAM are particularly useful if you intend to use GrapheneOS with multiple user profiles (the advantages of this
feature will be explained later).

If you're looking for the best value for money today, the Pixel 9a is probably the most sensible entry point. If you
already have a Pixel 8/8a you can still use it comfortably: it remains an excellent base. In any case, always check
the [official support lifetime table](https://grapheneos.org/faq#device-lifetime) before buying a used device.

> You can check a table on the support lifetime for each device at the following link:
> <https://grapheneos.org/faq#device-lifetime>

Sixth and seventh generation Pixel devices still have a few years of support left, which makes them a good choice if
you already own one and want to keep using it. However, it's not advisable to buy a new device of these generations.
Also keep in mind that there are various security features that GrapheneOS can only use with the hardware of the more
recent generations.

Anything older is considered "End-Of-Life," and the GrapheneOS project strongly advises against continuing to use
them, regardless of the operating system used. This is true even though GrapheneOS still provides extended support
for some of them, which is simply meant to reduce risks and give users time to migrate to a fully supported device.
For example, there are no more firmware patches or driver support for the Pixel 5a, and there's even a known,
unresolved remote code execution vulnerability that could be exploited to take control of the device.

| Model            | RAM     | Storage (GB)     | Processor   | Concurrent user profiles |
|--------------------|---------|------------------|--------------|------------------------------|
| Pixel 9 Pro Fold   | 16 GB   | 256-512          |  Tensor G4   |    14                           |
| Pixel 9 Pro XL     | 16 GB   | 128-1024         |  Tensor G4   |    14                           |
| Pixel 9 Pro        | 16 GB   | 128-1024         |  Tensor G4   |    14                           |
| Pixel 9            | 12 GB   | 128-256          |  Tensor G4   |    10                           |
| Pixel 8 Pro        | 12 GB   | 128-1024         |  Tensor G3   |    10                           |
| Pixel 8            | 8 GB    | 128-256          |  Tensor G3   |    6                            |
| Pixel 8a           | 8 GB    | 128-256          |  Tensor G3   |    6                            |

## Installation {#installazione}

There are several ways to install GrapheneOS: buying phones with the operating system pre-installed, manually from
the command line, or through the web installer. All the guides and documentation on how to do this are available on
the official GrapheneOS website in the "install" section.

## Protection Against Tampering {#protezione-contro-manomissioni}

### Verified Boot Key Hash

Assuming you are now the proud owner of a Pixel device with a fresh GrapheneOS installation, you might be surprised
by the warning that appears when the device boots. A black screen will be shown warning that the operating system is
no longer the original one, and below it a string of characters is displayed, which is a cryptographic hash that lets
you verify that the installed version of GrapheneOS is authentic:

| Device | Verified Boot Key Fingerprint |
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

The hashes vary depending on the device model, and the list above was copied from the [web installer
page](https://grapheneos.org/install/web#verified-boot-key-hash), which remains the canonical source if new models
are added. Although unlikely, it is possible that GrapheneOS's server infrastructure could be compromised and that
attackers have replaced both the operating system files used during installation and the list of key hashes. You can
compare the hashes shown on your device with the table above to make sure you've installed a legitimate version of
GrapheneOS.

### Auditor App

GrapheneOS includes the Auditor App, another way to validate the authenticity and integrity of the operating system,
making sure there has been no tampering. You can perform a manual check with a second device that has the Auditor App
installed. It doesn't need to be another GrapheneOS device: you can [find the app
on Google's Play Store](https://play.google.com/store/apps/details?id=app.attestation.auditor.play&hl=en).



This verification can be automated using the [attestation.app](https://attestation.app/) website, which is part of
the GrapheneOS project. After registering on the site and pairing your device, you'll receive a warning email if the
device fails to provide valid attestations in time.



Unfortunately, it's currently not possible to host your own remote attestation server, since using this feature would
require changes to the Auditor App.

## Hardening Through Settings {#hardening-attraverso-le-impostazioni}

GrapheneOS defends against security vulnerabilities using three fundamental approaches: it reduces the amount of
"surface" (i.e. active features/code) exposed to attackers, makes exploiting vulnerabilities as difficult as
possible, and isolates components from each other (sandboxing) to reduce the impact of any exploits. Since these
measures affect the ease of use and performance of the device, GrapheneOS lets users choose their own preferences and
customize the user experience through a huge number of settings, in order to create the setup best suited to their
needs.

### The Lock Screen

User data is stored encrypted with a key derived, among other things, from the chosen screen lock method. These
methods cannot simply be bypassed with brute force attacks, thanks to the delays imposed by the "secure element"
hardware. Thanks to this measure, even a random 6-digit PIN offers a high level of security. If you don't want to
depend on the security of the "secure element," you can use passwords up to 128 characters long.

Pattern unlock has been removed from GrapheneOS since it represents a much worse version of the PIN and encourages
insecure pattern choices. Instead, you should use at least a 6-digit PIN and consider enabling the PIN scrambling
feature, which makes it harder for an observer to figure out the combination through fingerprints or other channels.

It's possible to set up Fingerprint Unlock, but for optimal security you should consider limiting it to
authentication within apps (thus disabling _"Use to unlock screen"_). The GrapheneOS team has just introduced a
2-factor fingerprint unlock system, which will require both a fingerprint scan and the PIN/password.

If you have an eSIM or, especially, a physical SIM, it makes sense to set up a SIM PIN, which should however be
different from the one used for unlocking.



Finally, GrapheneOS offers the option to set up an emergency password or PIN. Once configured, using it anywhere an
unlock PIN or password is requested, even in secondary user profiles, will irreversibly wipe all data on the device
(and any installed eSIMs). When triggered, the information needed for decryption is deleted and the device shuts
down. On the next boot, an invalid file system will be detected and the device can be set up again as if it had been
reset to factory settings. Note that this does not erase the encrypted data itself, since that would take too long
and would give attackers an opportunity to interrupt the process.

### Auto Reboot

A device that has just been booted and not yet unlocked has its user data fully encrypted. Continued use after the
first unlock often leads to an accumulation of unencrypted data in the device's temporary memory, a vulnerability
exploited by forensic companies. The Auto Reboot feature was introduced to protect against the extraction of
unencrypted data.

Although it's possible for applications to put sensitive data "at rest" when the device locks, it's up to developers
to actually implement this feature, which rarely happens. Even the developers of the privacy-focused Signal
messenger have shown little interest in implementing this feature, leaving forks like Molly the opportunity to handle
it better. By automatically restarting the device after a certain period of time, it returns to a "before first
unlock" (BFU) state.

The reboot timer starts every time the device locks and resets upon a successful unlock. By default, the timer is set
to 18 hours, with the minimum, and more secure, available value being 10 minutes. Note that the timer will only start
if the device has been unlocked at least once since the last reboot.

With the default value of 18 hours, the timer will be cancelled during constant use to avoid impacting the user
experience. Thanks to GrapheneOS's very frequent updates that still require regular reboots, this feature also has a
secondary use, namely installing those updates if the phone is sitting idle in a drawer. If it still causes too
frequent reboots, the timer can be increased up to 78 hours or even disabled completely - though GrapheneOS strongly
advises against this option.

Note that if you plan to use secondary user profiles, this feature can be particularly annoying, since all user
sessions will be closed and the device will reset back to the default user (Owner). A good time frame to set might be
either 4 or 8 hours depending on the level of security you're after.

### USB Restrictions

When forensic companies try to break into smartphones, they prefer to do it through the USB interface, which has a
large attack surface due to the many functions it offers. Pixel devices offer hardware-level control over the USB-C
port, a feature not yet used even by stock Android, but one that is fundamental to the GrapheneOS project.


By default, GrapheneOS disables new USB-C connections as soon as the device is locked. In other words, you can
connect and use USB-C data while the device is unlocked, but once it's locked and disconnected, it will refuse new
connections. This measure includes disabling USB-C alternate modes like DisplayPort.<br><br>
The most secure, but also most inconvenient, option is to completely disable the USB-C port while the operating
system is running. This will also block any vulnerabilities present in the device's power logic (in case there are
any), but it will require turning off the setting every time you want to charge the device.

### Wireless Attack Surface

With USB out of the picture, what remains are wireless attack vectors like Wi-Fi, Bluetooth, and the cellular
network. However, accessing a device through one of these methods will be much more difficult and complex. Hardware
component isolation has become the norm on mobile devices. Pixels have separate chips for each of these radios, and
if you wanted to, you could remove the chips individually and the device would keep working.

Although not enabled by default, it's possible to set a timer to automatically disable Wi-Fi and Bluetooth. The timer
starts as soon as there's no longer an active connection. The GrapheneOS project is planning to extend this feature
to NFC in the future as well.

The matter of cellular connectivity is much more complex. First of all, 5G, SMS, MMS, and calls generally work fine
on GrapheneOS just as they would with stock Android. GrapheneOS adds various switches that, once again, attempt to
reduce the attack surface, though depending on your carrier and the country you're in, you might have to experiment
to see what works.

> You can use eSIM with GrapheneOS, but since it requires proprietary Google features, it's completely disabled by
> default. In the past, enabling eSIM support required Google Play, but that's no longer the case, and using eSIMs
> doesn't share any data with Google. Note that, while a wipe via emergency PIN/password also erases eSIMs, the same
> doesn't apply to a normal factory reset.

The GrapheneOS project recommends using the LTE-only option whenever possible. LTE, sometimes called 4G or 5Ge, is
much more modern than the 2G and 3G protocols, but also less complex and more stable than the newer 5G protocol. Note
that, while it can make some forms of interception more difficult, the sole purpose of LTE-only mode is to disable a
huge amount of code tied to both these legacy protocols and the newest ones.

### Cellular Privacy

LTE and 5G offer a form of encryption, but this is mainly meant to protect data transmitted over the network itself,
not to protect your privacy. Regardless of the mode used, you should avoid traditional phone calls and SMS over the
cellular network, and instead use end-to-end encrypted messaging platforms like Signal and SimpleX.

The traditional phone system is historically insecure and not designed to protect users' privacy. It can be imagined
as a walled garden where, once you obtain trusted-party status with access, you get a significant amount of
information and control over the network. This access can be purchased for a few thousand dollars a month and allows
intercepting phone calls, SMS, and, in some cases, even approximately tracking a person's location. To do this, an
attacker needs the unique IMSI identifier of your SIM card, which can often simply be found by knowing your phone
number. With this, the attacker would be able to intercept a two-factor authentication SMS without your phone giving
any indication that such an SMS was sent.

When your phone authenticates with the cellular network, it does so by providing information about both your SIM
card and the device's cellular radio hardware. If you bought both the phone and the SIM anonymously, you are
essentially using a persistent pseudonym. Since hardware information is shared, replacing just the SIM is not
enough to get a new identity.

At this point, you might consider using an external device, such as a dedicated mobile hotspot, as an alternative to
inserting a SIM card into your device. While this increases your privacy, it will worsen your security since these
devices typically have much worse hardware isolation and are far behind on updates compared to using your Pixel's
internal isolated cellular radio; this would make it much easier for an attacker to take control of the dedicated
device and have a huge attack surface to attack your phone.

Some of these dedicated cellular devices allow spoofing the IMEI, i.e. changing the hardware identifier to an
arbitrary value. This would let you reuse the same dedicated device and simply change the IMEI value along with a new
SIM card to get a new identity on the network. However, you should know that the IMEI is not the only
device-specific hardware identifier that cellular radios transmit, and moreover, there are ways to "fingerprint"
these devices that could allow re-identifying them even with modified identifiers. In the worst case, you might even
draw a lot of attention to yourself if the spoofing is too obvious.

The GrapheneOS project does not recommend using a secondary device for cellular communication, but if you really want
to, it would be better to use another Pixel device with GrapheneOS installed. Note that, if you share cellular
internet via Wi-Fi, it's possible for someone nearby to track your movements by detecting the signals from your Wi-Fi
access point.

**What about airplane mode?**

Airplane mode is the only way to completely disable the device's cellular radio transmission, reception, and
tracking capabilities. Once airplane mode is enabled, it's possible to turn Wi-Fi back on without turning the
cellular radio back on. If you intend to use your Pixel only as a Wi-Fi device, you might consider removing the quick
toggle (the airplane mode button visible by swiping down from the status bar) to avoid accidentally turning it back
on.

You should be aware that the cellular network is not the only way carrier services can be used. There are also calls
and messages over Wi-Fi. To prevent the SIM from authenticating with the carrier and using its network services
through other internet connections, you need to disable the SIM itself.

More recent devices have special offline tracking systems designed to locate lost devices. GrapheneOS does not and
will never support these systems. If you want to be absolutely certain, you might consider keeping the device in a
Faraday bag when not using it.

**What about data-only SIMs?**

In terms of privacy, not much changes if you use a data-only SIM: you're still authenticated on the cellular network.
However, not having messages and calls reduces the attack surface for potential exploits. GrapheneOS might in the
future add options to disable these features, essentially turning normal SIMs into data-only equivalents.

**What about using a VPN?**

Using a VPN has no influence on carrier-based calls or messages. These functions will not pass through the VPN, even
if you use a Wi-Fi connection instead of the cellular network. They are, however, useful tools for defending against
other types of attacks and for adding layers of privacy protection between you and potential external attackers.
Always choose VPN providers you trust, or consider using a self-hosted VPN (I've written [a guide](https://b4.lol/vpn) on how to set one up yourself).

**What about data saver mode?**

Enabling global data saver (i.e. across all user profiles) will prevent apps from using cellular data in the
background. Apps that use foreground services, i.e. those that stay active in the foreground via a persistent
notification or are used by the user, are excluded from this restriction. It's also possible to limit mobile data
usage on a per-app basis. So it's not really a useful way to improve the device's security.

**What about using it without a SIM?**

If you don't have a SIM card and are not in airplane mode, your device will still connect to the cellular network
but won't authenticate and won't share any hardware identifiers. You'll still be able to make emergency calls and
receive emergency alerts.

>Note that making an emergency call will share your device's radio identifiers.

**What about emergency alerts?**

Emergency alerts are sent over the cellular network to all connected phones, even if they don't have a SIM.
Normally, only airplane mode prevents you from receiving them. Since GrapheneOS isn't subject to local regulations,
it provides options to disable even "presidential priority" alerts. Emergency alerts still don't allow tracking or
stealing data from users.

### Protection against app exploits

So far we've discussed how to protect the device from external threats, but it's equally important to make sure that
none of the installed applications can compromise the system from within. Apps on Android always run isolated in
their own sandbox, limiting the resources they can access to those they've been granted permission for. Malicious
apps could request and use permissions for purposes unrelated to their main functionality; others might try to
escape their sandbox. Often the app itself is not intentionally malicious, but has a vulnerability or suffers an
attack on its own servers that then reflects onto the app's users.

In the "**App exploit protection**" section of the settings, you can find various measures that increase the
difficulty for an app to escape its sandbox. Many of these are not enabled by default for user-installed apps, since
they could cause crashes or malfunctions. However, it's preferable to enable them globally and then selectively
disable them for apps that run into problems.

There are other measures that are always implicitly active. One of these is the use of ahead-of-time compilation
instead of just-in-time compilation. This improves battery life, the performance of many apps, and represents an
important security feature. It does, however, have a downside: app installations and updates take much longer than
on stock Android.



### Permissions

On stock Android, permissions only exist to access the Camera, Microphone, Body sensors, and Activity recognition.
Access to the accelerometer, gyroscope, compass, barometer, thermometer, and other sensors is simply granted to apps
by default without requiring explicit consent. GrapheneOS adds an option to prevent access to these sensors by
default. This measure can also cause crashes in applications that expect to receive valid data from these sensors,
which is why it's not enabled right away for all apps on a fresh GrapheneOS installation. By enabling it, you'll
receive a notification every time an app tries to access one of these sensors and can grant this permission
selectively.

Another permission that stock Android implicitly grants to all applications is access to networking functions. This
includes the device's local network (localhost), which is currently a known method to bypass user profile isolation,
allowing apps from different profiles to communicate with each other. In GrapheneOS you'll be asked whether you want
to grant this permission when installing an app. When network permission is not granted, GrapheneOS simulates a lack
of network connection, which is generally handled gracefully by apps.

Just as you can disable app exploit protections on an individual basis, you can remove permissions from apps at your
own discretion. Be careful, though, not to remove permissions from default-installed system apps, as this could
cause unexpected problems.

Particularly important to manage carefully are network permissions (give them only to apps that need them; if an app
shouldn't be communicating over the internet, remove this permission), location (GPS access), internal storage (file
access), camera, and microphone. From the settings you can see the various app permissions, and it's very important
to review them occasionally.

### Restricted access (storage scope)

There are popular apps that request fairly invasive permissions, such as access to all contacts or all files on the
device. GrapheneOS's scoping feature lets you select a subset of contacts or files to grant access to, while the app
in question will believe it has access to everything.

By default, contact scoping behaves as if the contact list were empty, and users can then grant different types of
access to specific contacts or groups of contacts. Data access is fairly granular, allowing you to share only the
specific data you choose with the app instead of the full contact information.

Users can enable storage scoping instead of granting full storage access permission to apps. This means the
application can't see any files created by other software, unless the user explicitly specifies files or
directories that should be allowed full access.

The GrapheneOS project is planning to add similar scoped access features for other areas, such as Location, Camera,
and Microphone.

### Microphone and Camera Switches

Although available on stock Android, it might be worth noting that there are switches to disable access to the
microphone and camera. These are also available as quick toggles by swiping down from the status bar.

Although it might seem useful to disable access to these globally and only turn them on when needed, it could turn
out to be very inconvenient if you want to quickly take a photo (for example, via the double-press power button
shortcut) or answer a call while the phone is still locked. In these cases, you'd have to first unlock the phone and
enable the appropriate access, which could take so long that whoever is calling might decide to hang up. Instead, you
could leave microphone and camera access enabled at the system level and deny these permissions at the individual app
level: leaving them enabled for the phone and camera apps, and setting all others to 'Ask every time.'

If you're certain you'll never need these sensors, you could also buy devices with microphones and cameras removed,
although on average the prices are EXTREMELY higher since the risk of damaging parts during sensor removal is very
high.

### System Updates

GrapheneOS system updates are downloaded and installed automatically and seamlessly in the background. However, a
reboot is needed to apply them, but this process is safe thanks to automatic rollback in case the first boot of the
updated operating system fails.

Automatic reboots after an update are possible but disabled by default, since they could occur in the middle of a
call. If you want to avoid updates being downloaded using mobile data, it's advisable to change the _"Allowed
networks"_ setting to _"Unmetered networks only"_. Some users have reported that updates can drain a lot of battery
and cause the device to overheat, especially when out and about. You can enable the _"Require device to be
charging"_ option to avoid such situations.



You can completely disable automatic updates by disabling the _"System Updater"_ app. However, the GrapheneOS
project strongly advises against this choice, since you wouldn't receive security and privacy patches to fix
vulnerabilities or improve the system.

Some might worry that a future update could introduce a backdoor. There are several measures in place to prevent
malicious updates: they must have a valid cryptographic signature, verified both by the update client and by the
verified boot mechanism. In addition, attacks like downgrades are prevented locally.

The GrapheneOS project also argues that existing legislation can only target individual users and cannot force the
release of malicious updates to all GrapheneOS devices. Since the update client doesn't provide uniquely
identifiable device information when requesting updates, GrapheneOS cannot comply with government requests to send
backdoored updates to specific users. However, the update server can see the requester's IP address, which can be
masked using a VPN or Tor.

### Backups

GrapheneOS includes [Seedvault](https://github.com/seedvault-app/seedvault) built into _Settings &raquo; System
&raquo; Backup_ as a solution for creating backups or transferring data from one device to another. Keep in mind that
if you use secondary user profiles, you'll need to set it up separately for each profile. Some apps, like Signal or
Molly, use a type of application database encryption that can only be performed via the apps themselves. If you plan
to use a USB drive to store backups, a common practice is to initially create the backup on the device's internal
storage and move it to the drive only after the process is complete.

There's also a known issue where the user file backup might not include all your files. Therefore, you shouldn't
rely on Seedvault to back up all your important files. It's advisable to do a separate backup of important files, for
example to a laptop via USB connection (_Use USB for 'File Transfer'_). Here too, you'll need to set up the
connection separately for each profile. The GrapheneOS project hopes to replace Seedvault with a better and more
reliable solution in the future, although there are currently other priorities.

## Secondary User Profiles {#profili-utente-secondari}

User profiles simulate having separate phones, allowing multiple users to share the same device or to create
compartmentalization on a user's phone. Below we'll explore how to use this feature to isolate apps from each other
and compartmentalize user data. Before that, it should be noted that the isolation provided by app sandboxing and the
compartmentalization offered by the access "scopes" discussed earlier will already be sufficient for many users.

On a fresh GrapheneOS installation, multiple profiles are disabled by default. Even so, when you unlock the phone
after boot, you'll be accessing the "Owner" profile, i.e. "the user who owns the device." The Owner profile should
not be confused with something like a privileged "root" user on Linux. While the Owner has greater administrative
control over the device compared to other users, regular apps have the same access in both the Owner and any other
user profile.

Each user is encrypted with their own keys protected by their respective lock method. The Owner profile is special in
that it doesn't just store the Owner's data, but also sensitive system-wide operating system data. For this reason,
the Owner profile must always be unlocked before any other user profile can be used. The Owner profile and the apps
running in it will continue to be active in the background while you use another profile. However, the Owner profile
does not have access to data stored in other profiles.



### Notifications Across Profiles

As visible in the screenshot above, it's interesting to note that you can receive notifications from another profile
running in the background. While the notification only indicates which profile it occurred in and which app
generated it, this is a GrapheneOS addition that significantly improves the user experience with secondary user
profiles.

### Usage Examples

Before continuing with the different types of user profiles available, let's discuss the benefits of using multiple
profiles compared to using only the Owner profile.

First of all, after setting up a new user, you'll find yourself with a phone that looks like it was just started up
for the first time. None of the user apps you've already installed will be present, everything will be empty. This
can be very useful if you want to access different accounts of the same application. For example, if you want to use
a messenger with multiple accounts but the app doesn't support this feature, you can simply install it twice in
different profiles.

Separating apps between different profiles will prevent them from easily communicating with each other. For example,
there's the main Facebook app but also the separate Facebook Messenger app. If both apps agree, they can use
something similar to inter-process communication to exchange information - but only if both are running in the same
user profile.

If you have apps running in the background in your Owner profile, they will always be active unless you manually
stop them. If you have applications you rarely use, it makes sense to install them in a secondary user profile. Once
you're done, you can hold down the power button and you'll be offered the option to end that user's session. This
will ensure that all apps from that profile are stopped and their data is put to rest and fully encrypted.

You can also create and use user profiles only temporarily and then delete them immediately. Since apps installed in
a profile are unaware of the existence of other profiles, you can use profiles like a browser's incognito mode. A
profile's file system is completely isolated from other profiles, and although you could set up a storage scope to
achieve the same result, it won't be necessary since your temporary profile will be empty.

As discussed above, the Auto Reboot feature was added to ensure that data is put to rest and that there's no
unencrypted data available for forensic companies. If you use a secondary user profile instead of the Owner for your
regular use, this issue will be much less present: while putting the Owner's data to rest requires a reboot, putting
a secondary user's data to rest simply requires ending their session.

The most useful feature of profiles, though, is creating compartmentalized environments with different
privacy/security trade-offs and different network setups. For example, it's possible to create one profile entirely
under Tor thanks to apps like [Invizible Pro](https://invizible.net/en/downloads/), one under VPN with
[WireGuard](https://download.wireguard.com/android-client/), and one completely on clearnet, having 3 different
threat models.

### Number of User Profiles

GrapheneOS raises the limit on the number of secondary user profiles from 4 to 32, one of which is always reserved
for the guest user. However, being able to create so many user profiles doesn't mean they can all run at the same
time, since that would negatively affect device performance. GrapheneOS scales the maximum number of concurrent
users based on the amount of RAM built into the device.

| | Pixel 9 Pro Fold | Pixel 9 Pro XL | Pixel 9 Pro | Pixel 9 | Pixel 8 Pro | Pixel 8 & 8a |
| ------- | ---------------- | -------------- | ----------- | ------- | ----------- | ------------ |
| RAM | 16 GB | 16 GB | 16 GB | 12 GB | 12 GB | 8 GB |
| Profiles | 14 | 14 | 14 | 10 | 10 | 6 |

### User Profiles: Advanced Configurations

If you have user profiles for use cases where that profile never needs to remain active in the background, you can
disable the _"Allow running in background"_ option by editing that profile via the Owner profile. This way, you
won't need to explicitly end the user's session, since simply switching to another profile will put the previous one
to rest, saving RAM, CPU, and battery.



### Installing Apps Across Profiles

You might be surprised to learn that user profiles can update apps from other profiles, and that the Owner profile
can install its apps in another profile. Didn't we say each profile's file system is completely isolated? Well, yes,
but it's not as if each profile runs on a completely independent operating system; application code can be shared
between profiles using communication layers that make many features more convenient.

In addition to cloning apps between profiles, it's also possible to install app stores individually within each
profile.

### Drawbacks

There are some inconveniences in actively using secondary user profiles. For example, the Auto Reboot feature will
cause all user sessions to end, forcing you to unlock the Owner profile first. This also means that all the apps
from those profiles will be forcibly stopped and you won't receive notifications until you log back into that
profile. Assuming you haven't set too short a time for Auto Reboots, this shouldn't happen too often.

As mentioned, profile file systems are completely isolated, which means there's no native way to, for example, share
a meme seen on social media in one profile via a messenger in another profile. Common solutions include cloud-based
file syncing, like [Cryptomator](https://cryptomator.org/), or having a messaging app to exchange files with, though
that might not be ideal from a privacy standpoint. You could set up local file syncing using apps like
[Syncthing](https://github.com/Catfriend1/syncthing-android) or an FTP server+client app, but these are usually
annoying to configure.

If you're installing apps in secondary profiles that require SMS verification, you might need to temporarily enable
_"Enable phone calls and SMS"_ for that user.

### Private Space

The private space feature is a recent addition to Android. Technically, it's simply a secondary user profile nested
within the Owner profile: when the space is locked, the private profile's user is stopped, and when the space is
unlocked, the user profile is started. Except for the clipboard, which is shared with the Owner, it's separated the
same way a secondary user profile would be.

The advantage of using a private space over a secondary user profile is that the UI, in places like notifications
and settings, will be "merged" while the space is unlocked. This means that if there's a notification from the
private space, it will be fully displayed in the Owner profile (compared to regular secondary profiles, where only
the app name and user are shown). While this makes it slightly less isolated than a dedicated user, private spaces
can be much more convenient.

Compared to the 31 available secondary profiles, a device can only have one private space and it must always be part
of the Owner. The GrapheneOS project is considering changes to improve private spaces. It should be noted that the
private space user is not listed in the user management interface, which means features like installing the Owner's
apps into the private space are not available. Additionally, locking the private space does not delete the
encryption keys the way ending a secondary profile's session would.

A drawback of private spaces, compared to full user profiles, is that you cannot grant them access to _"phone calls
and SMS."_ This prevents SMS verification and limits the use of some apps.

### Work Profiles

Work profiles are similar to private spaces in terms of user experience. They were originally designed for corporate
BYOD (Bring Your Own Device) implementations, which is why a separate device management app is required to create
them. This app, and through it the company it belongs to, has control and ownership of the data within the work
profile. However, there are local management apps, like [Shelter](https://f-droid.org/en/packages/net.typeblog.shelter/),
that allow creating and managing a work profile without an external owner. In any case, you'll always have to trust
a third-party app to use work profiles, unless you write your own or verify Shelter's code, which is open source
anyway.

Private spaces have better isolation, more robust encryption, and better UI integration with the Owner profile. Work
profile management apps can allow a lot of communication between the Owner profile and the nested work profile. For
example, work profiles do not block application communication between profiles, which can increase convenience but
negatively affect privacy and security.

Generally, they're convenient and useful tools; if you can do without them it's a boon for security and privacy, but
they're an ideal option if you need to compartmentalize two "identities" that you need to use at the same time.

### VPN

For VPN usage, the general best practice is that each user should have a separate VPN connection to get a distinct
exit IP address. For this reason, all profiles (including work profiles and private spaces) have their own VPN
configuration by design. This prevents an outside party from linking them together based on the same exit IP
address.

You can prevent a profile from accessing the internet directly by enabling the _"Always-on VPN"_ and _"Block
connections without VPN"_ toggles. GrapheneOS has made many improvements to Android to prevent data leaks, i.e.
bypasses of VPN connections.

At the moment, the GrapheneOS project only recommends using the official WireGuard apps (usable with any commercial
or self-hosted VPN) and Mullvad.

## Applications {#applicazioni}

A fresh GrapheneOS installation includes a minimal number of applications, and there are several reasons for this:
including more apps in the operating system would increase the attack surface from the very start. GrapheneOS
prefers to leave the choice of apps to install up to the users, based on their own judgment. The project is focused
on meaningful improvements to privacy and security, and including more apps in the operating system would likely go
against that goal. Moreover, GrapheneOS avoids integrating third-party apps and services, since few of them would
actually align with its values and goals.

Among the few apps available, GrapheneOS includes its own 'App Store.' This repository is mainly intended for
distributing applications developed directly by the GrapheneOS project and hardened versions of open-source apps.
The list of available apps will deliberately be kept minimal, while third-party apps should aim to be included in
Accrescent, GrapheneOS's officially approved store, installable through the Graphene App Store.

### Preinstalled Applications

Among the few apps preinstalled on GrapheneOS, about half come from the Android Open Source Project (AOSP) with
minor modifications, and are quite primitive in terms of functionality and user experience. Many AOSP apps were
great 10+ years ago, when Android's user interface was simpler and expectations were lower. Over time, Google
replaced them with more modern versions for the stock system, abandoning the open-source versions. GrapheneOS plans
to renew or replace them, although there are often licensing issues with possible alternatives.

If you prefer Google's versions of apps like Camera, Gallery, and Keyboard, you can switch to these without enabling
invasive usage statistics collection or uploading photos to their services. Some stock Android apps, like the
screenshot editor (Markup) and the Thermometer (for Pixels with the appropriate sensor), are available in the
GrapheneOS App Store, since they're not available on the Play Store.

It's worth noting that all of Graphene's stock apps are nonetheless high quality and optimized for security and
privacy: for example, the stock camera removes metadata from the photos you take, and all the apps have only the
minimum permissions required to function.

### Camera

The Camera app included in GrapheneOS has already been modernized, is focused on privacy and security, and is
probably better than open-source alternatives or most paid apps. It includes modes for capturing photos, video, and
scanning QR/barcodes. It supports HDR+, Night mode, multi-camera zoom, EIS, etc. There's no loss in photo quality
compared to stock Android.

However, it doesn't offer the full range of features of the stock 'Pixel Camera' app. The Pixel Camera, formerly
Google Camera, can fully take advantage of all available cameras and image processing hardware on GrapheneOS. To
reduce the attack surface, direct hardware access by Google apps is controlled via an additional toggle. The _'Special
access to hardware accelerators for Google apps'_ toggle is enabled by default but doesn't grant any additional
data access.

If you want higher quality photos, you can install Google Camera and disable internet access for the application.

### Gallery

GrapheneOS plans to completely replace the current Gallery app, but at the moment there's no app available with an
acceptable license and adequate image editing capability. If you're looking for a solid open-source alternative,
GrapheneOS recommends [IacobIonut01/Gallery](https://github.com/IacobIonut01/Gallery/blob/main/README.md) and
[Aves](https://github.com/deckerst/aves/blob/develop/README.md). Personally, I also find the whole
[Fossify](https://fossify.org) suite of apps, including its gallery, excellent; if you're looking for stock-alternative
open source apps, these are all great.

### Keyboard

GrapheneOS's default keyboard is essentially Google's Gboard from 2014. It used to be an open-source project with
some closed components, but it became fully closed-source and was rebranded as Gboard. It's missing some features
like swiping on the space bar to move the cursor, one-handed mode, better emoji handling, and, most importantly,
swipe typing.

Google's modern Gboard is definitely one of the best keyboards available right now. Using it is fine as long as you
don't opt into usage statistics and other invasive options. Remember that active keyboards have access to all typed
text, text being edited, and clipboard contents at all times.

If you're looking for an open-source alternative, consider [HeliBoard](https://github.com/Helium314/HeliBoard),
which is currently, in my opinion, the best open source Android keyboard. There are also other alternatives like
Florisboard or FUTO Keyboard, but I still find them quite immature.

One option could also be using Gboard with network permissions removed, although personally I tend to advise against
this option.

### Vanadium Browser

GrapheneOS includes the Vanadium subproject, based on Chromium with privacy and security improvements. It's used both
as the operating system's default browser and by other apps that need to display web content. The project recommends
using the browser as-is; additional extensions or modifications might only make you more distinguishable, making you
easier to track. To prevent websites from accessing standard sensors, you can disable the _'Sensors'_ permission for
the browser app.

It's a very high quality browser, highly recommended for everyday use. On mobile devices, absolutely avoid
Firefox-based browsers, as they offer much lower levels of security.

## App Compatibility

Currently, only a very narrow subset of Android apps is incompatible with GrapheneOS. These are specifically apps
that use the Play Integrity API, which requires the operating system to be officially certified by Google. This
mainly affects banking/financial apps, location-based competitive games like Ingress, plus some odd cases like the
McDonald's app, Authy, and the Uber driver app. By implementing this feature, these apps choose to ban the use of
alternative and modified operating systems.

This also prevents NFC payments via Google Pay. In practice, the situation varies a lot from bank to bank: some
European banking apps and some proprietary wallets work, others don't. Think of contactless payments on GrapheneOS as
something to verify case by case, not as a general guarantee.

Even though GrapheneOS provides the same standard security model as stock Android, Google certifies operating systems
not based on security, but on whether they've been licensed. There are ways to work around some of these
restrictions, but they would likely be blocked over time and would only represent a temporary solution. According to
the GrapheneOS project, the only permanent solution is regulatory or legal action based on the fact that this is
highly anti-competitive and illegal behavior. Personally, I find this whole feud to be a non-issue, since you can use
better payment methods like Bitcoin or cash.

### Dependence on Play Services

Another aspect of Graphene's app compatibility is that some applications depend on Google's Play Services, often for
messaging and social media. Many apps rely on Google's Firebase Cloud Messaging (FCM) to receive notifications. Some
apps can fall back on their own push or frequent polling mechanisms, but this often requires running the app with a
foreground service.

One example is Signal, which uses its own push mechanism when FCM is unavailable. However, there have been reports of
poor performance and inefficiency (excessive battery consumption). As an alternative, the [Molly](https://molly.im/)
client is often recommended for use without Play Services.

For apps that strictly depend on Play Services, you have the option to install and use the official Google Play
Services limited to the standard app sandbox. Thanks to the compatibility layer, Google Play won't receive any
special access or privileges on GrapheneOS. It provides almost complete compatibility, except for a small subset of
features not yet ported or not implementable due to their inherently privileged nature. The Play Store and its
services are fully available, including in-app purchases and app/content license checks. It can install, update, and
uninstall apps as usual, as long as it's authorized as an app source and with consent for each action.

To use the compatibility layer, install 'Google Play services' from the GrapheneOS App Store. This will also install
the Play Store, which is a dependency of Play Services. On older setups, predating Android 15, **Google Services
Framework** might also appear: if it's there, don't remove it. Using the Play Store only requires access to a Google
account if you want to install apps from the Play Store or use account-dependent features.

After installing Play Services, you'll receive a _"Missing optional permission"_ notification from the compatibility
layer. Tapping it will ask whether you want to allow Google Play Services to always run in the background, keeping a
connection to Google's FCM server open for reliable notifications, but reducing battery life. Accepting will set
background usage to 'Unrestricted.' Leaving it on 'Optimized' will heavily restrict background usage based on how
much it's used, while disabling it will almost completely prevent background usage. Choose based on how important
FCM push notifications are to you.

If you want to avoid Google as much as possible, you can install it only in the profile where you actually need it.
The simplest choice often remains the Owner profile; if instead you want to compartmentalize apps that depend on
Google, install Play Services in a separate user or work profile and keep the rest of the device clean.

### Android Auto

If you've connected your Android phone to your car, you probably know about Android Auto. It originally requires
privileged access, but GrapheneOS's sandboxed compatibility layer makes it usable with a reduced level of
privileges. You can install and use the official versions of Android Auto, but it must be installed through the
GrapheneOS App Store.

After installation, open _Settings &raquo; Apps &raquo; Sandboxed Google Play &raquo; Android Auto_ and enable at
least _"Allow permissions for wired Android Auto."_ If it doesn't work with just this toggle, you might need to also
enable wireless permissions. Additional permissions for redirecting audio, phone calls, and notifications to Android
Auto can be granted at your discretion. Note that Android Auto currently doesn't work from a private space or work
profile.

### Obtainium and App Verifier

On Android, the package files downloaded to install or update an application are cryptographically signed. Once an
app is installed, the signer of the installation package is stored, which means all future packages attempting to
update it must have the same developer's signature. This principle is called Trust-On-First-Use (TOFU) and ensures
that future updates of an application cannot come from malicious sources.

However, this doesn't guarantee that the package used for the first installation actually came from the source you
thought it did. Here, app stores play a useful role by establishing who the real signer of an app should be through
the store's own metadata, even before downloading the app package. On the other hand, an app store adds another third
party to trust, and this is where Obtainium can be useful as a mitigation.

[Obtainium](https://github.com/ImranR98/Obtainium) lets you get Android apps and keep them updated directly from the
source, for example from a GitHub releases page. Combined with [AppVerifier](https://github.com/soupslurpr/AppVerifier),
you can ensure that the package you're about to install actually comes from the real developer of the application.
This makes app management more decentralized without sacrificing an important security feature offered by app
stores. However, the GrapheneOS project argues that the most decentralized solution would be to replace Obtainium
with apps that update themselves.



### Accrescent

[Accrescent](https://accrescent.app/) is an app store with a security-oriented approach, led by a contributor to the
GrapheneOS project. It's available in the GrapheneOS App Store and, although it still has a limited catalog, is one
of the most interesting directions for getting apps with more robust metadata and distribution than F-Droid. The
GrapheneOS project intends to delegate to Accrescent the secure hosting of a wide range of third-party applications,
both closed-source and open-source, while the operating system's own app repository will be limited to first-party
applications and, possibly, a small number of useful, slightly modified and hardened third-party forks.

While it's hoped that Accrescent will become one of the best ways to get apps on GrapheneOS, it still lacks funding
and contributors to expand significantly. The GrapheneOS project is actively supporting this development as an
alternative to F-Droid, which has been criticized many times for its problematic approach to security.

Accrescent properly secures the download and initial installation through signed metadata, without needing to use
AppVerifier or manually check the key fingerprint, although it's still possible to do so after installation if
desired.

### F-Droid

[F-Droid](https://f-droid.org/) is known as a repository exclusively for open-source Android applications. The
GrapheneOS project has expressed criticism of F-Droid and does not recommend it as a store for third-party
applications. The main reason is that F-Droid compiles most apps directly from source code on outdated
infrastructure, and the resulting packages are then cryptographically signed by them, raising concerns about a
future mass compromise of F-Droid users.

An advantage of developer-signed packages is that it requires compromising the signing key to create a malicious
package with a valid signature. This is probably harder than introducing malicious changes to the source code on
platforms like GitHub, which F-Droid might use to blindly build and sign packages.

Generally there's no perfect store for downloading apps; the F-Droid client [Droidify](https://droidify.eu.org/)
fixes some of the issues with this app store and is therefore recommended over the original client.

Unfortunately there's currently no definitive solution for downloading apps on Graphene, as you'll read below, every
choice brings security, privacy, or convenience advantages while in turn introducing other problems. Use the
solution that best fits your needs.

### Play Store & Aurora Store

Currently, the official Google Play Store app remains the most secure (though not privacy-friendly) method for
installing closed-source apps, especially compared to mirror sites like [APKPure](https://apkpure.com/apkpure-app.html),
which have copies of all Play Store application packages - often used to bypass regional restrictions. To reiterate,
Google's Play Store and Play Services apps are treated as regular apps without special privileges on GrapheneOS, and
the decision to separate them into a secondary profile is up to the user.

[Aurora Store](https://f-droid.org/en/packages/com.aurora.store/) is an alternative client for the Google Store
repository. It lets you avoid installing the official Play Store app and offers the ability to use an anonymous
Google account shared with other Aurora users. The GrapheneOS project advises against using Aurora due to its weaker
security and the fact that some apps might be negatively affected by its source. You can always create an
unidentifiable account with a disposable phone number on the official Play Store instead of using Aurora's unreliable
anonymous option.

There's criticism that using many Google apps, services, and infrastructure might contradict the purpose of using
GrapheneOS. On this point, the project clarifies that the purpose of GrapheneOS is not to specifically avoid Google,
but to provide a high level of privacy and security - even for those who don't want to make major sacrifices in
terms of user experience. The ongoing work to provide a fully functional compatibility layer for Google services is
not a trivial feature, but one that GrapheneOS is investing a lot of resources into. In any case, a fresh GrapheneOS
installation is completely free of Google, and the choice to use the compatibility layer or avoid it is entirely
yours.

### Thoughts on the various stores
Personally, I find Obtainium a great app, which unfortunately falls short in that it doesn't let users "discover" new
apps but only download specific ones.

Speaking of Droidify, Aurora, and Google Play, today I'd summarize it like this: **Droidify/F-Droid** make sense for
open source software if you accept the security trade-offs; **Google Play** remains the most robust source for
proprietary apps; **Aurora** I'd keep as a secondary or emergency option, not as the main choice.

Google's Play Store is the most secure solution but with the greatest privacy trade-offs required (permissions,
dependencies, account, and personal data). If you're after very high security, this remains the most resistant
method against external attacks. In my opinion, all the stores satisfy different market demands.

## Issues and Solutions

### Geolocation Issues

Determining location is another service originally provided by Google's Play Services. Instead, GrapheneOS redirects
location requests to the operating system, which exclusively uses satellite localization (GNSS), requiring
reception of the satellite signal. This can be unreliable in situations where the sky is obscured, for example by a
concrete ceiling, causing many complaints about location-based apps not working correctly on GrapheneOS.

If you have a cellular carrier and an internet connection, the device should be able to use assisted satellite
geolocation (A-GNSS) by requesting information about nearby cell towers (SUPL) and current satellite states/orbits
(PSDS). These greatly improve the speed of position acquisition. By default, GrapheneOS uses its own proxy servers
to prevent associating SUPL/PSDS requests with your IP address.

You can optionally enable Wi-Fi and Bluetooth scanning in _Settings &raquo; Location &raquo; Location services_. This
will allow apps and services with the _"Nearby devices"_ permission to scan nearby Wi-Fi networks and Bluetooth
devices even when Wi-Fi and Bluetooth are turned off, potentially improving location-based features. The GrapheneOS
project is working on its own implementation of this, initially as a proxy for Apple's servers and later as a
proprietary database.

If you've installed sandboxed Play Services and want to use Google's network location service to provide more
accurate position estimates, you first need to disable the _"Redirect location requests to the operating system"_
option in _Settings &raquo; Apps &raquo; Sandboxed Google Play_. Then, you'll need to change Play Services' location
permission to _"Allow all the time"_ and enable _"Use precise location."_ To allow the use of network scanning, you
also need to grant the _"Nearby devices"_ permission (the Wi-Fi and Bluetooth scanning toggles mentioned above must
already be enabled). Finally, go back to _Settings &raquo; Apps &raquo; Sandboxed Google Play_, tap on _"Google
Location Accuracy"_ and enable the _"Improve location accuracy"_ option.

The redirect option isn't global, so you might consider setting up a secondary user profile exclusively for using
Google's invasive location services, to be used only when you're having geolocation issues.

### Crashes/Apps Not Working

As already mentioned, it's not surprising that some applications on GrapheneOS crash or refuse to work properly, but
this is almost always solvable. First of all, try the standard steps like clearing the app's cache, force-stopping
and restarting the application, restarting the phone, or reinstalling the app.

GrapheneOS-specific solutions include disabling some exploit protection measures, reinstalling the application
outside of a private space (Owner or other secondary profiles), or reinstalling the app in a profile that has
sandboxed Play Services. Sometimes apps start crashing because the application (e.g. the app store) they were
installed from is no longer enabled or installed, or they refuse to work properly because they weren't installed
from the expected source.

### The App Refuses to Install

The typical reasons for this issue have been explained above: you're trying to install an application that's already
available in a newer version, or that came from a different source, in another user profile.

### Requesting Support

GrapheneOS has a very active community and is responsive on social media. The easiest places to look for existing
solutions to your problems are probably the forum at
[discuss.grapheneos.org](https://discuss.grapheneos.org/) and their [Discord
server](https://discord.com/invite/grapheneos). GrapheneOS also has communities on
[Twitter/X](https://x.com/i/communities/1530455827949273094), [Telegram](https://t.me/GrapheneOS) and
[Matrix](https://matrix.to/#/%23community:grapheneos.org).

## Support the Project

If this guide has been useful to you, the best way to thank me is to share this article with friends, family, social
media, and telegram groups: it remains the most appreciated gesture of all <3

If you have questions you can contact me on my telegram profile [@b4lolx](https://t.me/b4lolx) or via
email at admin@b4.lol. Thanks for reading!

---

## Related Guides

- **[De-Google Android: Complete Privacy Guide](/android)** - Full configuration for any de-googled Android phone
- **[How to Build a Threat Model](/threat-model)** - Define your threats before choosing your defense tools
- **[Self-Hosted VPN with AdBlock](/vpn)** - Protect your GrapheneOS traffic with a personal VPN
- **[Tor Node Tutorial](/tor)** - Browse anonymously and contribute to the Tor network

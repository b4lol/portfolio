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

> **TL;DR** — In this guide, you will learn:
> - Why GrapheneOS is the gold standard for mobile privacy and how to choose the right Pixel.
> - How to install and configure GrapheneOS from scratch.
> - How to leverage user profiles, sandboxed Google Play Services, and advanced security settings.
> - Troubleshooting: resolving common app compatibility and geolocation issues.

## What is GrapheneOS and who is it for?

GrapheneOS is a secure, open-source Android operating system focused on privacy and security. It is designed for individuals who want to minimize data collection, enhance application isolation, and maintain compatibility with standard Android apps. This compatibility is achieved by running Google Play Services inside an unprivileged sandbox.

| Question | Short Answer |
|---|---|
| Which phones does it work on? | Only officially supported Google Pixel devices. |
| Do I have to give up Google apps? | No; Google Play Services can be installed as unprivileged, sandboxed apps. |
| Is it suitable for beginners? | Yes, provided you follow a guided setup and learn to navigate user profiles. |
| Is it anonymous by default? | No. It improves privacy and security, but anonymity depends on your operational habits. |

**Primary Sources**: Official GrapheneOS documentation, project FAQs, the Android Open Source Project (AOSP), and hands-on testing on supported Pixel hardware.

Your smartphone is your most intimate device, tracking your location, communications, and daily habits. Stock Android and iOS operating systems constantly transmit telemetry to Google and Apple. GrapheneOS is the premier open-source alternative that offers enterprise-grade security without compromising user privacy. This guide covers everything from hardware selection to advanced configuration.

[GrapheneOS](https://grapheneos.org/) is a Free and Open Source Software (FOSS) operating system based on the [Android Open Source Project (AOSP)](https://www.android.com/), built to enhance privacy and security. It represents the current gold standard for custom mobile operating systems.

This guide compiles technical knowledge regarding mobile privacy and security as implemented by the GrapheneOS project, drawing inspiration from security researchers like [PatrickD](https://x.com/patrickd_de).

This resource is entirely free, non-profit, and does not track users or serve ads. If you find this guide helpful, please share it on Telegram channels, X (Twitter), or other communities to support privacy awareness.

## Choosing a Device

The most common question for newcomers is: why does GrapheneOS support so few devices, and why are they all Google Pixel phones?

### Why only Pixel devices?

According to GrapheneOS, Pixel devices are currently the only viable option. This is not due to an exclusive contract with Google, nor because Pixels are inherently flawless, but rather because all other OEM alternatives fail to meet GrapheneOS's hardware security requirements. The project maintains a list of requirements for supported devices; currently, only Pixels meet these standards.

Pixel devices provide robust support for custom operating systems because they serve as the reference platform for Android development. They receive regular firmware updates and offer advanced hardware security features, such as Memory Tagging (MTE) and custom key installation for verified boot, which remain functional even when running custom ROMs.

Most other OEM manufacturers treat alternative operating system support as a non-professional hobby feature. They frequently omit basic hardware security measures, delay critical firmware updates, and expand the device's attack surface through invasive proprietary system modifications.

Extended device support would force GrapheneOS to compromise on its security baseline by supporting devices that lack verified boot or hardware isolation. Developing hardware-specific security features for insecure devices would divert critical development resources away from hardening the core OS.

### Are there alternatives?

While there are various alternative operating systems for Android devices, none match GrapheneOS's security hardening.

A primary criticism leveled by the GrapheneOS team against other custom ROM projects is their delay in implementing upstream Android security patches.

*   **[LineageOS](https://lineageos.org/)**: Focuses on device longevity and broad compatibility rather than strict security. It typically lacks verified boot, leaving devices vulnerable to physical tampering.
*   **[/e/OS](https://e.foundation/e-os/)**: market-positioned as a "de-Googled" mobile ecosystem, but it is built on top of LineageOS and includes custom applications that introduce additional security risks.
*   **[CalyxOS](https://calyxos.org/)**: Frequently falls behind on security patches and has historically faced criticism for reporting incorrect patch levels. It also has had implementation bugs in core security features, such as emergency data-wipe routines.

*Note: For a detailed comparison of Android-based operating systems, consult this third-party [Android Comparison Table](https://eylenburg.github.io/android_comparison.htm).*

*   **[CopperheadOS](https://copperhead.co/android/)**: The commercial entity under which GrapheneOS was originally developed. Following a hostile internal split, GrapheneOS transitioned into an independent, fully open-source project. CopperheadOS is now a closed-source commercial fork, which is generally not recommended.
*   **[Purism (Librem 5)](https://puri.sm/)**: Promises hardware privacy via physical kill switches. However, GrapheneOS criticizes the Librem 5's hardware components, firmware update mechanisms, and dependency on closed-source blobs. GrapheneOS argues that a locked-down iOS device in Lockdown Mode provides a superior security posture compared to boutique Linux phones.

GrapheneOS focuses on substantive, verifiable security rather than marketing buzzwords, making it an openly technical project.

### Can Google hardware be trusted?

It may seem counterintuitive to use Google-manufactured hardware for a privacy-focused setup. However, because Pixels are the reference devices for Android security, they receive intense scrutiny from external security researchers. Under these circumstances, hiding intentional hardware backdoors without detection would be extremely difficult.

It is also easier for adversaries to compromise the supply chain of niche, boutique hardware manufacturers than to intercept the global logistics network of a major manufacturer like Google. Furthermore, leaks from forensic extraction firms (such as Cellebrite) show no evidence of hardware-level backdoors in modern Pixel chips. If you wish to avoid Google entirely, the next best alternative is an Apple iPhone configured in Lockdown Mode.

### Which Pixel should you choose? {#quale-pixel-scegliere}

For maximum security, select a recently released Pixel model. In 2026, this means choosing a model from the Pixel 9 or Pixel 10 family. These newer devices feature advanced hardware security mitigations like Memory Tagging (MTE), faster secure elements, and modern cellular modems. If you plan to use multiple concurrent user profiles, the Pro models equipped with 16 GB of RAM are highly recommended.

If you are looking for the best budget option, the Pixel 9a is a practical choice. The Pixel 8 series also remains a solid baseline if you already own one. Always check the official [Device Lifetime Table](https://grapheneos.org/faq#device-lifetime) before purchasing a device.

Once a device reaches its End-of-Life (EOL) date, it stops receiving critical proprietary firmware and driver patches from the chip manufacturers (like Google or Broadcom). Even if GrapheneOS continues to provide legacy OS updates, the device remains vulnerable to hardware-level exploits.

| Model            | RAM     | Storage (GB)     | Processor   | Concurrent User Profiles |
|--------------------|---------|------------------|--------------|------------------------------|
| Pixel 10 Pro XL    | 16 GB   | 128-1024         | Tensor G5    | 14                           |
| Pixel 10 Pro       | 16 GB   | 128-1024         | Tensor G5    | 14                           |
| Pixel 10           | 12 GB   | 128-256          | Tensor G5    | 10                           |
| Pixel 9 Pro XL     | 16 GB   | 128-1024         | Tensor G4    | 14                           |
| Pixel 9 Pro        | 16 GB   | 128-1024         | Tensor G4    | 14                           |
| Pixel 9            | 12 GB   | 128-256          | Tensor G4    | 10                           |
| Pixel 8 Pro        | 12 GB   | 128-1024         | Tensor G3    | 10                           |
| Pixel 8            | 8 GB    | 128-256          | Tensor G3    | 6                            |
| Pixel 8a           | 8 GB    | 128-256          | Tensor G3    | 6                            |

## Installation {#installazione}

GrapheneOS can be installed securely using the official [WebUSB Installer](https://grapheneos.org/install/web) from a compatible browser (like Chromium-based browsers on Linux, macOS, or Windows). The installer handles unlocking the bootloader, flashing the firmware, and re-locking the bootloader automatically.

## Protection Against Tampering {#protezione-contro-manomissioni}

### Verified Boot Key Hash

When your device boots with GrapheneOS, a warning screen will inform you that it is running a custom operating system. This screen displays a cryptographic fingerprint (hash) representing the public signing key used to sign the custom OS. You should match this hash against the official values to confirm the system's integrity:

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

Compare the hash displayed on your boot screen with the [Official Web Installer Reference Hash](https://grapheneos.org/install/web#verified-boot-key-hash) to ensure your system firmware has not been modified.

### Auditor App & Attestation

GrapheneOS includes a pre-installed **Auditor** app. This utility uses hardware-based attestation to cryptographically verify the integrity of the operating system. You can verify your device locally using a second phone, or automate the verification process using the official [attestation.app](https://attestation.app/) service. This service will notify you via email if your device fails to perform a scheduled remote attestation check, signaling potential tampering.

## Hardening Through Settings {#hardening-attraverso-le-impostazioni}

GrapheneOS provides extensive local controls to harden your system, minimize your attack surface, and sandbox applications.

### Secure Lock Screen

GrapheneOS encrypts user data with keys derived from your lock screen passcode. The hardware secure element (Titan M2) enforces escalating delays between incorrect attempts, making brute-force attacks infeasible.

*   **Passcode Strength**: Use a strong PIN (at least 6 digits) or an alphanumeric passphrase. GrapheneOS disables weak unlock patterns by default.
*   **PIN Scrambling**: Enable PIN scrambling to randomize the layout of the entry pad, preventing adversaries from guessing your code via fingerprint smudges or shoulder surfing.
*   **Biometrics**: Biometric unlock (fingerprint) can be enabled, but for high-security threat models, limit fingerprint access to in-app authentication and require a PIN/password to unlock the device. GrapheneOS also supports two-factor unlock (requiring both fingerprint and passcode).
*   **Panic Trigger**: You can define a "Panic PIN/Password" under the lock screen settings. Entering this specific passcode at the lock screen will trigger a hardware factory reset, purging all decryption keys and shutting down the device.

### Auto Reboot

When a device is unlocked, its decryption keys remain in memory. If the device is stolen in this state (After First Unlock or AFU), forensic tools can extract data from the device RAM. 

To mitigate this, GrapheneOS features an **Auto Reboot** timer. If the device remains locked without being opened for a specified duration (adjustable from 10 minutes to several hours), it will restart automatically. Restarting returns the device to the Before First Unlock (BFU) state, fully encrypting the filesystem.

### USB Port Restrictions

Forensic extraction tools often exploit vulnerabilities in USB interface drivers to bypass lock screens. GrapheneOS offers hardware-level control over the USB-C interface.

By default, the system rejects new USB data connections while the screen is locked. You can configure the USB port to be completely disabled at the data level while the OS is running, allowing only charging.

### Wireless Attack Surface

To minimize the wireless attack surface:

*   **Wi-Fi and Bluetooth Timers**: Configure Wi-Fi and Bluetooth to turn off automatically when disconnected for a set period.
*   **LTE-Only Mode**: Set your cellular preferences to LTE-only. This disables legacy 2G/3G protocols (which are vulnerable to fake cell tower IMSI-catcher attacks) and avoids the complex codebase of early 5G implementations.

### Cellular Privacy Limitations

Cellular networks require your SIM card to authenticate using a unique hardware identifier (IMSI) linked to your real identity. To prevent tracking:

*   **Avoid Cellular Calls and SMS**: Use end-to-end encrypted internet protocols (like Signal or SimpleX) instead of standard carrier routing.
*   **Cellular Hotspots**: Routing your traffic through a secondary Wi-Fi hotspot does not hide your location; it simply shifts the cellular tracking signature to the hotspot hardware, which is often less secure than your Pixel's isolated baseband processor.
*   **Airplane Mode**: Airplane mode completely disables the baseband transmitter. You can safely toggle Wi-Fi back on while cellular functions remain disabled.

### App Exploit Protection

Under **Settings &raquo; Security**, GrapheneOS offers advanced exploit mitigations:

*   **Memory Allocator Hardening**: Enforces strict memory protections for user applications, making buffer overflows harder to exploit.
*   **Disable JIT Compilation**: Forces Ahead-Of-Time (AOT) app compilation. This improves security by removing the Just-In-Time compiler attack surface, though it increases app installation and update times.

### Granular App Permissions

GrapheneOS enhances the standard Android permission model:

*   **Sensors Permission**: Android allows apps to read the accelerometer, gyroscope, and compass without permission. GrapheneOS lets you toggle off sensor access globally or per-app to prevent device fingerprinting.
*   **Network Permission**: You can revoke network access for local apps (like calculators or keyboards) during installation, preventing them from transmitting data.
*   **Storage Scoping**: Instead of granting an app access to your entire storage directory, you can enable Storage Scopes to allow access only to specific files or folders.
*   **Contact Scopes**: Allows you to share a curated list of contacts with an app rather than exposing your entire address book.

### Backups

GrapheneOS includes **Seedvault**, an encrypted backup utility that can save system configurations and application data to a local USB drive or self-hosted Nextcloud server. For files, it is recommended to perform manual backups directly to a laptop via USB file transfer.

## Secondary User Profiles {#profili-utente-secondari}

User profiles offer strict data compartmentalization. Each profile functions like a separate physical device, encrypting its data with its own unique keys.

*   **Background Profile Control**: You can disable "Allow running in background" for secondary profiles. When you switch away, the profile's user session ends, and its decryption keys are purged from memory.
*   **App Sharing**: You can clone application binaries between profiles to save disk space, but the application databases and user data remain isolated.
*   **Private Space**: A nested user profile inside the primary "Owner" profile. It integrates notifications and apps with the Owner profile while unlocked, but stops the user session and locks data when closed.
*   **Work Profiles**: Ideal for separating work apps using local management utilities like **Shelter** without requiring a corporate MDM server.

## Recommended Applications {#applicazioni}

GrapheneOS includes only a minimal set of secure, open-source default applications to limit the pre-installed attack surface.

*   **Camera**: GrapheneOS's default camera app is secure, offline, and automatically strips EXIF metadata from captured images.
*   **Pixel Camera**: If you prefer Google's proprietary camera features, you can install the Pixel Camera app from the Play Store and revoke its network permissions. Enable the _"Special access to hardware accelerators for Google apps"_ toggle to ensure full image processing capability.
*   **Keyboard**: GrapheneOS's default keyboard is a legacy offline client. For a modern, open-source alternative with glide typing, install **[HeliBoard](https://github.com/Helium314/HeliBoard)**.
*   **Vanadium Browser**: Based on Chromium, Vanadium is hardened against web exploits and is the recommended browser for GrapheneOS. Revoke its sensor permissions to prevent browser-based tracking.

## App Compatibility

Almost all Android apps run on GrapheneOS. The primary exceptions are apps requiring Google's **Play Integrity API** (formerly SafetyNet) with hardware-enforced certification. This may prevent some mobile banking apps and competitive multiplayer games (like Pokémon GO) from running. NFC payments via Google Pay are also unsupported.

### Sandboxed Google Play Services

If an app requires Google Play Services, you can install them directly from the GrapheneOS App Store. On GrapheneOS, Google Play Services run as **standard, unprivileged apps** inside the normal application sandbox. They cannot access your hardware identifiers (IMEI, serial numbers) or override system permissions.

You can configure Play Services' background network access under **Settings &raquo; Apps &raquo; Sandboxed Google Play** to balance notification reliability (via Firebase Cloud Messaging) with battery consumption.

### Application Stores

*   **[Accrescent](https://accrescent.app/)**: A security-focused app store designed for GrapheneOS, supporting developer-signed metadata and modern verification.
*   **[Obtainium](https://github.com/ImranR98/Obtainium)**: Tracks and downloads app updates directly from official developer source repositories (like GitHub releases). Pair it with **AppVerifier** to confirm package integrity.
*   **[Droid-ify](https://droidify.eu.org/)**: A modern, fast client for the F-Droid open-source repository.
*   **Aurora Store**: A private client for the Google Play Store, useful for downloading proprietary apps without logging into a Google account.

## Troubleshooting Common Issues

### Geolocation Issues

By default, GrapheneOS routes location requests to GNSS (satellite) receivers, which can be slow indoors. To improve speed:

1.  Enable A-GNSS assistance under **Settings &raquo; Location**.
2.  If Sandboxed Google Play is installed, you can enable Google Location Accuracy under the Sandboxed Google Play settings (this requires granting Play Services background location and network permissions).

### App Crashes

If an app crashes, check its permissions (such as network access) or temporarily disable exploit mitigations (like hardened memory allocation) for that specific app under its settings page.

## Support the Project

The GrapheneOS project relies entirely on community support and donations. If you find this guide valuable, consider supporting their development directly at [grapheneos.org/donate](https://grapheneos.org/donate).

---

## Related Guides

- **[De-Google Android: Complete Privacy Guide](/android)** — Complete configuration for secure Android platforms.
- **[How to Build a Threat Model](/threat-model)** — Define your assets and threat boundaries.
- **[Self-Hosted VPN with Ad Blocking](/vpn)** — Secure your mobile traffic using WireGuard and Pi-hole.
- **[Tor Relay Tutorial](/tor)** — Set up a Tor node to support anonymous communication.

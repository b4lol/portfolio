---
title: "Complete Guide to macOS Security and Privacy"
description: "A detailed guide to locking down your Mac: from initial setup to firewall, DNS, browser, Tor, VPN, encryption, and system monitoring."
summary: "A detailed guide to locking down your Mac: from initial setup to firewall, DNS, browser, Tor, VPN, encryption, and system monitoring."
keywords: ["macos security", "macos privacy", "mac security", "mac privacy", "macos security guide", "macos privacy guide", "apple security", "macos hardening", "mac firewall", "filevault", "secure your mac", "privacy guide macos"]
author: "b4lol"
date: 2026-03-08
lastmod: 2026-05-05
url: /macos-security
series: ["Digital Privacy", "Security"]
topics: ["privacy-security"]
faq:
  - question: "How do I protect my privacy on Mac?"
    answer: "Enable FileVault for disk encryption, turn on the built-in firewall and stealth mode, use encrypted DNS (DoH/DoT), install an outbound firewall such as LuLu, and choose a privacy-oriented browser like Firefox."
  - question: "Is FileVault necessary on Apple Silicon Macs?"
    answer: "Apple Silicon Macs are encrypted by default, but FileVault adds an extra layer by requiring a password at startup. It also acts as a firmware password, preventing booting from external disks and access to Recovery."
  - question: "How do I turn on the firewall on macOS?"
    answer: "Go to System Settings, or use the command sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on from Terminal. Also enable stealth mode to ignore pings and probes on closed ports."
  - question: "What is macOS Lockdown Mode and who is it for?"
    answer: "Lockdown Mode disables numerous features to reduce the attack surface. It's designed for users at risk of sophisticated attacks, such as journalists and activists, but anyone can enable it from System Settings > Privacy & Security."
  - question: "Can Macs get viruses and malware?"
    answer: "Yes, Macs are not immune to malware. macOS includes protections such as XProtect, Gatekeeper, and app sandboxing, but it's recommended to download software only from official sources, prefer open source apps, and check suspicious files with VirusTotal."
  - question: "What is the most secure browser for macOS?"
    answer: "Firefox is considered the best choice for privacy thanks to its open source code, built-in tracking protection, and support for advanced hardening with arkenfox/user.js. Safari is a good native alternative with Intelligent Tracking Prevention and support for Lockdown Mode."
  - question: "How do I remove metadata and digital traces on macOS?"
    answer: "Use xattr -d to remove metadata from downloaded files, qlmanage -r cache to clear the QuickLook cache, and delete the LanguageModeling, Spelling, and Suggestions directories in ~/Library to remove typing data."
howto:
  name: "How to protect your privacy and security on macOS"
  description: "A procedure for defining a threat model and configuring FileVault, firewall, DNS, browser, authentication, backups, and monitoring on macOS."
  totalTime: "PT2H"
  supply:
    - "An updated Mac"
    - "A standard user account"
    - "A disk or destination for backups"
  tool:
    - "System Settings"
    - "Terminal"
    - "FileVault"
    - "LuLu"
  steps:
    - name: "Define your threat model"
      text: "Identify assets, adversaries, capabilities, and mitigations before applying advanced configurations."
      url: "/macos-security#threat-modeling"
    - name: "Configure your account and FileVault"
      text: "Use a standard account for daily work and enable FileVault to protect the disk."
      url: "/macos-security#account"
    - name: "Reduce your network attack surface"
      text: "Turn on the firewall, stealth mode, encrypted DNS, and an outbound connection firewall."
      url: "/macos-security#firewall"
    - name: "Lock down your browser and communications"
      text: "Choose privacy-oriented browsers, configure Tor when needed, and use end-to-end encrypted messaging."
      url: "/macos-security#browser"
    - name: "Manage passwords, backups, and metadata"
      text: "Use unique passwords, MFA, encrypted backups, and procedures for removing metadata from files."
      url: "/macos-security#password"
    - name: "Monitor the system"
      text: "Check processes, network activity, logs, and auditing tools to detect anomalous behavior."
      url: "/macos-security#monitoraggio"
---

> **TL;DR** - In this guide you'll learn:
> - How to configure an Apple Silicon Mac to maximize security and privacy from the very first boot
> - How to protect your network traffic with a firewall, encrypted DNS, VPN, and Tor
> - How to lock down your browser, manage passwords, and encrypt your data with FileVault and GPG
> - How to monitor the system, remove metadata, and defend yourself against malware and tracking

## Summary

To protect your privacy and security on macOS, it's best to start with a threat model, then enable FileVault, automatic updates, a firewall, encrypted DNS, a hardened browser, a password manager, encrypted backups, and software installation rules. The more extreme measures, such as Lockdown Mode or VM isolation, are only needed for high-risk profiles.

Your Mac is not an impenetrable fortress straight out of the box. macOS is a robust operating system, sure, but without the right configuration it leaves more doors open than you'd think... and every open door is an invitation for anyone who wants to poke their nose into your business.

This guide is for you turtles who want to take your Mac's privacy and security seriously. You don't need to be a computer engineer: just a willingness to learn and a bit of patience. We'll go step by step, from choosing your hardware all the way to advanced system monitoring.

**WARNING!!** This guide is provided as-is, with no warranty of any kind. You alone are responsible for any changes you make to your system. Proceed with caution and, when in doubt, always make a backup first.



## Threat Modeling: Where to Start {#threat-modeling style="color: white;"}

The first, and most important, step is creating a **threat model**. You need to understand who you're defending against in order to know how to defend yourself. Everyone has different needs, so your threat model will be unique.

### Identify the assets you want to protect

Make a list of everything you want to protect: your laptop, your passwords, your browsing history, financial documents, personal photos... Categorize them by importance: **public**, **sensitive**, or **secret**.

### Identify your adversaries

Who are you defending against? A curious roommate? A thief? A company that wants your data for marketing? A government? The adversary's motivation determines the sophistication level of the attack.

### Identify their capabilities

What is your adversary capable of doing? A common thief will be stopped by a password and disk encryption. A state actor might require extreme measures, such as fully powering off the device when not in use to clear the keys from RAM.

### Identify mitigations

Now it's time to decide how to counter each threat. It's essential to balance security and usability: every mitigation should counter a real capability of your adversaries, otherwise you're just complicating your life for no reason.



Here's an example table you should create for every asset:

| Adversary | Motivation | Capability | Mitigation |
|---|---|---|---|
| Roommate | See chats or browsing history | Physical proximity, can peek at the screen | Biometrics, privacy filter, automatic lock |
| Thief | Steal personal data and empty accounts | Theft of the device, watching you type your password | Always keep your Mac in sight, FileVault, Find My |
| Criminal | Financial gain | Social engineering, malware, reused passwords | Sandboxing, automatic updates, unique passwords |
| Company | User data marketing | Telemetry and behavioral data collection | Block network connections, reset identifiers |
| State/APT | Targeted surveillance | Passive surveillance of internet infrastructure | Open source E2EE, long diceware passwords, hardware with secure element |

## Hardware: Choosing the Right Mac {#hardware style="color: white;"}

macOS is more secure when running on **Apple hardware with Apple Silicon** (M1, M2, M3, M4, and later). Intel Macs have [hardware vulnerabilities](https://checkm8.info/blog/apple-t2-chip-vulnerability) that Apple cannot fix with software updates. The newer the chip, the better.

Avoid hackintoshes and Macs that don't support the latest version of macOS: Apple doesn't fix every vulnerability on older versions.

Depending on your threat model, you might want to buy your Mac **in cash and in person**, avoiding online orders or card payments, so that no identifying information is linked to the purchase.

For wireless accessories (keyboard, mouse, headphones), in my opinion Apple's own are the best: they're updated automatically by the system and support the latest Bluetooth features such as **BLE Privacy**, which randomizes the Bluetooth hardware address to prevent tracking.

## Installing macOS {#installazione style="color: white;"}

**Always** install the latest version of macOS compatible with your Mac. Newer versions have security patches and improvements that older ones lack.

### System activation

As part of Apple's anti-theft system, Apple Silicon Macs must activate with Apple's servers every time you reinstall macOS, to verify that the device hasn't been stolen or locked.

### Apple Account

Creating an Apple Account is **not required** to use macOS. Keep in mind, though, that an Apple Account syncs a lot of data to iCloud by default. You can disable syncing later, or enable **end-to-end encryption** via [Advanced Data Protection](https://support.apple.com/guide/security/advanced-data-protection-for-icloud-sec973254c5f).

An Apple Account is only needed to access the App Store and Apple services such as iCloud, Apple Music, etc.

### Virtualization

On Apple Silicon, virtualization is built into macOS through Apple's Virtualization framework. You can run macOS and Windows 11 ARM using these tools:

- **UTM** - Free from the [website](https://mac.getutm.app). Supports macOS and Windows 11 ARM
- **VirtualBuddy** - GUI for virtualizing macOS 12+ on Apple Silicon. 100% free. [GitHub](https://github.com/insidegui/VirtualBuddy)
- **VMware Fusion** - Now free under Broadcom. Clean interface, supports Windows 11 ARM
- **tart** - Command-line VM control, installable via Homebrew. [tart.run](https://tart.run)
- **Parallels** (paid) - A commercial option with strong integration. [Website](https://www.parallels.com)

I strongly recommend testing your security configurations in a VM first, so you can experiment without risk.

## First Boot {#primo-avvio style="color: white;"}

On first boot, the Setup Assistant will ask you to create an account. Use a **strong password** and don't set a password hint: anyone with access to your Mac could see it.

Careful: the real name you enter will appear in the computer name and in the local network hostname. To change it later:

```zsh
sudo scutil --set ComputerName your_name
sudo scutil --set LocalHostName your_name
```

## Admin Account and Standard User {#account style="color: white;"}

The first account you create is always an **administrator** account. Admin accounts have access to `sudo`, which means they can modify anything on the system. This is a significant security risk.

Best practice is to use a **separate standard account** for daily work, and keep the admin account only for operations that genuinely require it.

### How to set it up

1. Log into the admin account
2. Create a new admin account in **System Settings > Users & Groups**
3. Log out and log into the new admin account
4. Demote your original account to standard with:

```zsh
sudo dscl . -delete /Groups/admin GroupMembership your_username
```

**Limitations of a standard account:** you can't install apps into `/Applications`, you can't use `sudo`, and some system utilities require the admin account. Small inconveniences for a big security gain.

## Firmware and FileVault {#firmware-filevault style="color: white;"}

### Firmware

Make sure firmware security is set to **"Full Security"**, which is the default value. This prevents tampering with the operating system.

### FileVault

Apple Silicon Macs are encrypted by default, but **FileVault** adds an extra layer: it requires a password to access the data at startup. The FileVault password also acts as the firmware password, preventing booting from other disks and access to Recovery mode.

To enable it: **System Settings > Privacy & Security > FileVault > Turn On**

**!WARNING!** Keep the recovery key in a safe place. The iCloud unlock option exists, but it creates a risk if your iCloud account is compromised.

## Lockdown Mode {#lockdown style="color: white;"}

**Lockdown Mode** is a powerful macOS feature that disables numerous functions to drastically reduce the attack surface. It's designed for users who might be the target of sophisticated attacks (journalists, activists, dissidents), but anyone can enable it.

It can be disabled for individual websites in Safari, so you don't lose functionality on sites you trust.

To enable it: **System Settings > Privacy & Security > Lockdown Mode**

## Firewall {#firewall style="color: white;"}

### Application-level firewall

macOS includes a built-in firewall that blocks **incoming connections**. It's essential to turn it on:

```zsh
# Turn on the firewall
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on

# Turn on stealth mode (ignores pings and probes on closed ports)
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setstealthmode on

# Prevent signed apps from being automatically allowed
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setallowsigned off
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setallowsignedapp off
```

### Third-party firewalls

The built-in firewall only blocks incoming connections. To also control **outbound traffic** (and see which apps are "phoning home"), I strongly recommend one of these:

- **[Little Snitch](https://www.obdev.at/products/littlesnitch/)** - The most complete, paid
- **[LuLu](https://objective-see.org/products/lulu.html)** - Open source and free, from Objective-See
- **[Radio Silence](https://radiosilenceapp.com/)** - Simple and lightweight

These firewalls can be bypassed by processes with root privileges, but they remain an extremely valuable tool. Some malware self-destructs when it detects the presence of these firewalls.

### Kernel-level packet filtering (pf)

For even more granular control, macOS includes **pf** (packet filter), a highly customizable kernel-level firewall.

Here's an example of a basic configuration for `/etc/pf.rules`:

```
# Default interface
wifi = "en0"

# Block all incoming traffic by default
block in all

# Allow outbound traffic
pass out quick on $wifi proto { tcp, udp } from any to any

# Allow loopback traffic
pass quick on lo0

# Block all incoming traffic on all interfaces
block in quick on $wifi
```

To activate the rules:

```zsh
sudo pfctl -e -f /etc/pf.rules
```

To check the status: `sudo pfctl -s info`

## Services and Daemons {#servizi style="color: white;"}

macOS uses **launchd** to manage system services. You can inspect active services with:

```zsh
# List all loaded services
launchctl list

# Examine a specific service
launchctl list | grep -i apple
```

System services are protected by **System Integrity Protection (SIP)** - don't disable SIP in order to modify them. It's far safer to leave them as they are.

To examine what a specific service does, look for its `.plist` file in:
- `/System/Library/LaunchDaemons/` (system daemons)
- `/System/Library/LaunchAgents/` (system agents)
- `/Library/LaunchDaemons/` (third-party daemons)
- `~/Library/LaunchAgents/` (user agents)

## Homebrew {#homebrew style="color: white;"}

[Homebrew](https://brew.sh) is the most widely used package manager on macOS, but keep your eyes open: it requires **App Management** or **Full Disk Access**, which is essentially equivalent to disabling TCC (Transparency, Consent and Control) protections.

```zsh
# Update periodically (on trusted networks!)
brew upgrade

# Disable Homebrew telemetry
export HOMEBREW_NO_ANALYTICS=1
```

Add `export HOMEBREW_NO_ANALYTICS=1` to your `~/.zshrc` to make it permanent.

## DNS: Protecting Your Queries {#dns style="color: white;"}

DNS queries are like postcards: anyone on the network can read them. Let's see how to protect them.



### Encrypted DNS profiles

From macOS 11 onward, you can install **configuration profiles** for encrypted DNS (DoH/DoT). Some recommended providers:

- **[Quad9](https://www.quad9.net/)** - Blocks malicious domains, non-profit
- **[AdGuard DNS](https://adguard-dns.io/)** - Blocks ads and trackers
- **[NextDNS](https://nextdns.io/)** - Highly customizable, with blocklists

### Hosts file

You can block domains by adding entries to the `/etc/hosts` file:

```zsh
# Block a domain
echo "0.0.0.0 facebook.com" | sudo tee -a /etc/hosts

# Apply the changes
sudo dscacheutil -flushcache
```

There are community-maintained blocklists you can download and integrate, such as [StevenBlack's](https://github.com/StevenBlack/hosts), which blocks ads, malware, and trackers.

### DNSCrypt

**DNSCrypt** encrypts DNS traffic, preventing interception and tampering:

```zsh
brew install dnscrypt-proxy
```

Configure it to listen on a port other than 53 if you're using it together with dnsmasq. You can also use **pf** rules to block all unencrypted DNS traffic.

### Dnsmasq

**Dnsmasq** works as a local DNS cache and can be combined with DNSCrypt for a complete solution:

```zsh
brew install dnsmasq

# Configure as local DNS
sudo networksetup -setdnsservers "Wi-Fi" 127.0.0.1
```

It supports **DNSSEC** for DNS origin authentication and data integrity.

## Certificate Authorities {#certificati style="color: white;"}

macOS ships with more than **100 root CA certificates** from companies and governments around the world. This means a large number of organizations are technically capable of issuing valid certificates for any domain.

Apple blocks untrustworthy CAs and has strict requirements, but the risk of MITM attacks (Man-in-the-Middle, i.e. an interceptor placing themselves "in the middle" between you and the site) via fraudulent certificates, while low, does exist (remember the DigiNotar case?).

To manually remove trust from a CA: open **Keychain Access**, find the root certificate, double-click it, and set it to "Never Trust".

## Browser: Your Window to the World {#browser style="color: white;"}

The browser is the **largest attack surface** on your system. Choose carefully and keep extensions to the bare minimum.

### Firefox

In my opinion the best browser for privacy among the mainstream options:

- **Open source**, with growing adoption of Rust for memory safety
- Built-in **tracking protection**
- **Fingerprint randomization**
- **Multi-Account Containers** to isolate sessions
- Support for [arkenfox/user.js](https://github.com/arkenfox/user.js) for advanced hardening
- **NoScript** extension to selectively block JavaScript

### Chrome

Based on Chromium with proprietary Google components:

- **Robust sandboxing** and frequent updates
- A lucrative bug bounty that attracts security researchers
- Disable experimental JavaScript features to reduce the attack surface: `chrome://flags/#disable-javascript-harmony-shipping`
- Use **uBlock Origin Lite** (the Manifest V3 version)
- Disable DNS prefetching in `chrome://settings/privacy`

**Cons:** Google. The browser is designed to collect data. If privacy is your priority, Firefox or Safari are better choices.

### Safari

macOS's native browser, based on WebKit:

- **Best battery life** of any browser
- Built-in **Content Blockers** and **Intelligent Tracking Prevention**
- **Fingerprint randomization** and isolated Private Tabs
- Support for **Lockdown Mode**
- Secure syncing via iCloud Keychain

**Cons:** fewer extensions available (the developer license costs $100/year), so the ecosystem is more limited.

### Browser privacy

Regardless of which browser you choose, remember:

- The **Navigator API** reveals information about your system
- **Canvas fingerprinting** can uniquely identify you
- Disable **third-party cookies** (now the default in most browsers)
- **WebRTC** can reveal your real IP address - disable it via extensions or Lockdown Mode

## Tor: Anonymous Browsing {#tor style="color: white;"}

[Tor Browser](https://www.torproject.org/) is a modified Firefox that routes your traffic through the Tor network, encrypting data in successive layers (like the layers of an onion).

### Installation and verification

After downloading Tor Browser, it's essential to **verify the GPG signature** of the download:

```zsh
# Import the Tor Project's signing key, first checking the fingerprint and up-to-date instructions on the official website
gpg --keyserver hkps://keys.openpgp.org --recv-keys KEY_ID_PUBLISHED_BY_THE_TOR_PROJECT

# Verify the signature
gpg --verify TorBrowser-*.asc TorBrowser-*.dmg
```

Also verify the code signature of the application:

```zsh
spctl --assess --verbose /Applications/Tor\ Browser.app
codesign -dvv /Applications/Tor\ Browser.app
```

### What to know about Tor

- Tor encrypts traffic up to the **exit node**, but the use of Tor itself is identifiable through TLS hostnames
- **Pluggable transports** can obfuscate Tor traffic, disguising it as normal traffic
- For extra security, use Tor **inside a VM**
- Tor protects your **anonymity** (who you are), not necessarily your **privacy** (what you do) - if you log into your own account, Tor won't protect you
- Tor is vulnerable to **global traffic analysis** by adversaries who control large portions of the network

> **Warning:** don't confuse anonymity with privacy. Tor makes you anonymous, but if you enter personal data on a site, that anonymity disappears.

## VPN {#vpn style="color: white;"}



A VPN encrypts traffic between you and the VPN server. Some key points:

- **Avoid PPTP** - it's obsolete and insecure
- Prefer **WireGuard** or **OpenVPN**
- Watch out for **traffic leaks** when the VPN disconnects - configure a kill switch
- Consider the VPN provider's **jurisdiction**

If you want maximum control, I strongly recommend **self-hosting your own VPN**. WireGuard + Pi-hole on a VPS is an excellent combination.

Here's an example of **pf** rules to force all traffic through the VPN:

```
# Block everything except VPN
block all
pass on lo0
pass out on utun0   # VPN interface
pass out on en0 proto udp to VPN_SERVER_IP port 51820  # WireGuard port
```

## PGP/GPG: Encrypting Communications {#pgp style="color: white;"}

PGP (Pretty Good Privacy) is the standard for end-to-end encryption of email and files. GPG (GNU Privacy Guard) is the open source implementation.

```zsh
# Install GPG
brew install gnupg

# Generate a key pair
gpg --full-generate-key

# Export the public key
gpg --armor --export your_email@example.com
```

For maximum security, keep your private keys on a **YubiKey**: the keys will never leave the hardware device.

I strongly recommend using [drduh's recommended configuration](https://github.com/drduh/config/blob/master/gpg.conf) for the `gpg.conf` file.

## Secure Messaging {#messaggistica style="color: white;"}

### XMPP

An open, federated, cross-platform protocol. It's not end-to-end encrypted by default: use the **OMEMO** extension for encryption.

### Signal

In my opinion the best encryption protocol for instant messaging. It uses the **Double Ratchet Protocol** for advanced end-to-end encryption. Requires a phone number to register.

### iMessage

Requires an Apple Account. If you use it, enable **Contact Key Verification** to verify your contacts' identities.

**!WARNING!** If you use iCloud backup **without** Advanced Data Protection, Apple retains the encryption keys for your messages. Enable it immediately if you use iMessage.

## Viruses and Malware {#malware style="color: white;"}

Macs are **not immune** to malware. The number of threats keeps growing. Here's how to protect yourself.

### Downloading software safely

- Prefer the **App Store** or apps **notarized** by Apple
- Always download from **official** sites via HTTPS
- Avoid apps that request excessive permissions
- Prefer **open source software** when possible

### App Sandbox

Check whether an app uses sandboxing:

```zsh
codesign --entitlements - /Applications/AppName.app
```

All App Store apps are required to use the sandbox. You can also check the "Sandbox" column in **Activity Monitor**.

### Hardened Runtime

Check whether an app uses Hardened Runtime:

```zsh
codesign --display --verbose /Applications/AppName.app
```

Look for `flags=0x10000(runtime)` in the output. Notarized apps are required to use it.

### Antivirus

- Use [VirusTotal](https://www.virustotal.com/) to scan suspicious files before running them
- macOS includes **XProtect**, which updates automatically in the background
- **[BlockBlock](https://objective-see.org/products/blockblock.html)** detects persistent malware components
- A local antivirus is a double-edged sword: it increases the attack surface and often "phones home" with your data

### Gatekeeper

Gatekeeper blocks non-notarized apps. You can manually authorize an app from **Privacy & Security** in Settings, but only do so for apps you fully trust.

Remember that Gatekeeper only protects `.app` bundles, not every executable binary.

## System Integrity Protection (SIP) {#sip style="color: white;"}

SIP protects system files from modification, even by the root user. Check that it's active:

```zsh
csrutil status
```

If it shows as disabled, re-enable it from Recovery mode. **Never disable SIP** unless you know exactly what you're doing and why.

## Metadata and Digital Traces {#metadati style="color: white;"}

macOS keeps a surprising amount of metadata. Here are the main ones and how to delete them.

### Download metadata

APFS saves extended attributes that reveal where you downloaded a file from:

```zsh
# View a downloaded file's metadata
xattr -l ~/Downloads/downloaded_file

# Remove provenance metadata
xattr -d com.apple.metadata:kMDItemWhereFroms ~/Downloads/downloaded_file
xattr -d com.apple.quarantine ~/Downloads/downloaded_file
```

### Bluetooth history

The history of connected Bluetooth devices is saved in `com.apple.Bluetooth.plist`.

### QuickLook cache

QuickLook generates file previews that are kept in a cache. To clear it:

```zsh
qlmanage -r cache
```

### Wi-Fi credentials in NVRAM

Wi-Fi credentials can be saved in NVRAM. To delete them:

```zsh
sudo nvram -d 36C28AB5-6566-4C50-9EBD-CBB920F83843:current-network
```

### Keyboard and typing data

macOS keeps data about your typing in these directories:
- `~/Library/LanguageModeling/`
- `~/Library/Spelling/`
- `~/Library/Suggestions/`

You can delete these directories and lock them to prevent them from being recreated:

```zsh
rm -rf ~/Library/LanguageModeling ~/Library/Spelling ~/Library/Suggestions
mkdir ~/Library/LanguageModeling ~/Library/Spelling ~/Library/Suggestions
chmod -R 000 ~/Library/LanguageModeling ~/Library/Spelling ~/Library/Suggestions
```

### Siri Analytics

`SiriAnalytics.db` is created even if Siri is disabled. It can be deleted, but it gets recreated.

### Saved application state

macOS saves app state so it can restore it after a restart:

```zsh
rm -rf ~/Library/Saved\ Application\ State/*
chmod -R 000 ~/Library/Saved\ Application\ State
```

## Passwords and Authentication {#password style="color: white;"}

### Password management

The built-in **Passwords** app on macOS generates secure credentials and supports **passkeys** (FIDO). For memorable passwords, use the **diceware** method (random words from a dictionary).

For more technical users, **GnuPG** can manage encrypted password files.

### Multi-factor authentication (MFA)

It's essential to enable MFA on all your accounts. In order of security:

1. **WebAuthn/FIDO2** (hardware key such as YubiKey) - the most secure
2. **TOTP** (apps like Aegis, 2FAS) - very good
3. **HOTP** - good
4. **SMS** - better than nothing, but vulnerable to SIM swapping

I strongly recommend a **YubiKey** for WebAuthn and as a hardware GPG/SSH key.

## Backups {#backup style="color: white;"}



**Always encrypt your backups before saving them.** Follow the **3-2-1** rule: 3 copies, 2 different types of media, 1 offsite copy.

### Time Machine

Use Time Machine with an **encrypted** external disk:

**System Settings > General > Time Machine > Add Backup Disk** (select "Encrypt backup")

### Manual backups with GPG

```zsh
# Create an encrypted archive
tar czf - ~/Documents | gpg --encrypt --recipient your_email > backup_docs.tar.gz.gpg

# Decrypt the backup
gpg --decrypt backup_docs.tar.gz.gpg | tar xzf -
```

### Encrypted disk images

```zsh
hdiutil create -size 500m -encryption AES-256 -volname "Secure Backup" -fs APFS ~/secure_backup.dmg
```

Other options: **[restic](https://restic.net/)** for encrypted incremental backups, **[Tresorit](https://tresorit.com/)** for E2EE cloud storage.

## Wi-Fi {#wifi style="color: white;"}

- **Avoid hidden networks**: your device has to send probes containing the network name, potentially revealing the history of networks you've connected to
- Set your home network to **WPA3**
- Enable a **random MAC address** for each network: **Wi-Fi Settings > Network Details > Private Wi-Fi Address**

## SSH {#ssh style="color: white;"}

### Outbound connections

Use SSH keys protected by a password (or even better, stored on a YubiKey). In your `~/.ssh/config` file:

```
Host *
    HashKnownHosts yes
    IdentitiesOnly yes
```

### SSH tunneling as a VPN alternative

SSH can work as a lightweight VPN:

```zsh
# Local port forwarding
ssh -L 8080:internal_site:80 user@server

# SOCKS proxy
ssh -D 1080 user@server
```

Then configure your browser to use `localhost:1080` as a SOCKS proxy.

### SSH server (sshd)

macOS has sshd disabled by default (Remote Login). If you need to enable it:

- **Disable password authentication**
- Use SSH keys only
- Configure fail2ban or similar

## Physical Security {#fisico style="color: white;"}

- **Never leave your Mac unattended** - hardware keyloggers exist (mitigated by using the built-in keyboard or Bluetooth)
- Anti-forensics tools such as **[BusKill](https://www.buskill.in/)** and **[swiftGuard](https://github.com/Lennolium/swiftGuard)** can automatically shut down the system when they detect unauthorized USB events or physical separation
- Use a **privacy filter** on your screen when working in public
- Consider **nail polish** or tamper-evident seals on the case screws to detect physical access

## System Monitoring {#monitoraggio style="color: white;"}

### OpenBSM Audit

macOS includes OpenBSM to monitor process execution and network activity. **Note:** Apple deprecated OpenBSM starting with macOS 11 (Big Sur) in favor of the Endpoint Security framework. On recent versions of macOS it may not work fully; consider tools based on Endpoint Security, such as those from [Objective-See](https://objective-see.org/).

```zsh
# Follow audit logs in real time
sudo praudit -l /dev/auditpipe
```

Note: configuration changes require a restart.

### Process execution

```zsh
# List all processes
ps -ef

# List all loaded services
launchctl list
```

Use **Activity Monitor** for a graphical view.

### Network

```zsh
# View all active network connections
lsof -Pni

# List listening ports
netstat -atln
```

For in-depth traffic analysis, use **Wireshark** or **tshark** to monitor DNS queries, HTTP requests, and TLS certificates.

## Miscellaneous and Final Tips {#varie style="color: white;"}

Here's a collection of additional configurations to harden your Mac:

```zsh
# Disable diagnostic reports to Apple
sudo defaults write /Library/Application\ Support/CrashReporter/DiagnosticMessagesHistory.plist AutoSubmit -bool false

# Lock the screen immediately with the screensaver
defaults write com.apple.screensaver askForPassword -int 1
defaults write com.apple.screensaver askForPasswordDelay -int 0

# Show hidden files in Finder
defaults write com.apple.finder AppleShowAllFiles -bool true

# Show all file extensions
defaults write NSGlobalDomain AppleShowAllExtensions -bool true

# Don't default to saving to iCloud
defaults write NSGlobalDomain NSDocumentSaveNewDocumentsToCloud -bool false

# Enable secure keyboard entry in Terminal
defaults write com.apple.terminal SecureKeyboardEntry -bool true

# Disable the crash reporter dialog
defaults write com.apple.CrashReporter DialogType -string "none"

# Disable Bonjour multicast advertisements
sudo defaults write /Library/Preferences/com.apple.mDNSResponder.plist NoMulticastAdvertisements -bool true

# Set umask to 077 (files accessible only by the owner)
sudo launchctl config user umask 077
```

Also remember to:
- Use **QuickTime Player** for media (it's sandboxed and uses Hardened Runtime)
- Disable **Handoff** and **Bluetooth** if you don't use them
- Enable **Secure Keyboard Entry** in Terminal to prevent other apps from intercepting your keystrokes

## Related Software {#software style="color: white;"}

- **[Lynis](https://cisofy.com/lynis/)** - Cross-platform security auditing
- **[osquery](https://osquery.io/)** - Query your system with SQL
- **[Pareto Security](https://paretosecurity.com/)** - Menu bar app for basic security checks

---

Great job, hero! If you've made it this far, you've transformed your Mac from an "out of the box" system into a true digital fortress. It wasn't a walk in the park, but it was worth it. You now have the tools and knowledge to browse, work, and communicate with a level of privacy and security that very few Mac users ever reach.

Thank you so much for reading! If this guide has been useful to you, share it with other turtles who want to protect their Mac. Privacy is a right, not something to hide.

## Related Guides

- **[Threat Model Guide](/threat-model)** - Dive deeper into the concept of a threat model to make more informed security decisions
- **[Self-Hosted VPN with WireGuard and Pi-hole](/vpn)** - Host your own personal VPN for maximum control over your network
- **[Email Security Guide](/email-security)** - Protect your email communications with DMARC, SPF, and encryption
- **[Android Privacy and De-Google Guide](/android)** - Apply the same privacy principles to your Android phone too

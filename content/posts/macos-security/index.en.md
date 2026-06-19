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

> **TL;DR** — In this guide, you will learn:
> - How to configure an Apple Silicon Mac for maximum security and privacy from the first boot.
> - How to secure network traffic using firewalls, encrypted DNS, VPNs, and Tor.
> - How to secure your browser, manage credentials, and encrypt files using FileVault and GPG.
> - How to audit system processes, purge metadata, and protect against tracking and malware.

## Summary

Securing macOS begins with establishing a threat model, followed by configuring FileVault disk encryption, enabling automatic security updates, activating the system firewall, implementing encrypted DNS, utilizing a hardened browser, and enforcing application download restrictions. Advanced mitigations—such as macOS Lockdown Mode or virtual machine compartmentalization—should be deployed selectively depending on your threat level.

Your Mac is not an impenetrable fortress straight out of the box. macOS is a robust operating system, sure, but without the right configuration it leaves more doors open than you'd think... and every open door is an invitation for anyone who wants to poke their nose into your business.

This guide is for you turtles who want to take your Mac's privacy and security seriously. You don't need to be a computer engineer: just a willingness to learn and a bit of patience. We'll go step by step, from choosing your hardware all the way to advanced system monitoring.

**WARNING!!** This guide is provided as-is, with no warranty of any kind. You alone are responsible for any changes you make to your system. Proceed with caution and, when in doubt, always make a backup first.

---

## Threat Modeling: Where to Start {#threat-modeling style="color: white;"}

The first and most critical step in securing any workstation is establishing a **threat model**. You must identify what assets you are trying to protect, who you are protecting them from, and what mitigations are necessary. Security is a trade-off with usability; your model should address realistic threats without introducing unnecessary friction.

### Identify the assets you want to protect

List the data and systems you need to protect: your physical device, passwords, browsing history, financial documents, private cryptographic keys, or personal photos. Categorize them as **Public**, **Sensitive**, or **Secret**.

### Identify your adversaries

Define who wants your data: a curious family member, a physical opportunistic thief, advertising networks, corporate data brokers, or targeted state actors.

### Identify their capabilities

Assess what your adversaries can do. An opportunistic thief can be stopped by full-disk encryption and a strong login password. A state actor or APT might employ firmware-level exploits or cold-boot attacks, requiring you to fully power down the device when not in use to clear decryption keys from RAM.

### Determine mitigations

Decide on proportional countermeasures:

| Target Asset | Adversary | Capability | Countermeasure / Mitigation |
|---|---|---|---|
| Communications & History | Local Observers | Physical access to unlocked device | Autolock, biometric authentication, privacy screen filters |
| Local Files & Accounts | Physical Thieves | Drive extraction, shoulder-surfing | FileVault 2, strong alphanumeric passwords, Find My Mac |
| System Integrity | Remote Cybercriminals | Social engineering, malware, credential stuffing | Application sandboxing, auto-updates, hardware security keys, password manager |
| Browsing Privacy | Advertisers / Data Brokers | Tracker injection, browser fingerprinting | Hardened browsers, DNS filtering, local firewalls |
| High-Value Secrets | Targeted State Actors (APTs) | Zero-day exploits, hardware tampering | End-to-end encrypted FOSS, hardware security tokens, air-gapped backups |

## Hardware: Selecting a Secure Platform {#hardware style="color: white;"}

For the highest security baseline, run macOS exclusively on **Apple Silicon hardware** (M1/M2/M3/M4 and later). Intel-based Macs contain hardware vulnerabilities (such as bootrom exploits on T2 security chips) that cannot be fully resolved via software patches.

Avoid "Hackintosh" custom builds or legacy Macs that do not support the latest macOS releases, as Apple backports security patches selectively to older versions.

Depending on your threat model, purchase hardware in-person using cash to prevent linking your physical machine identifier to your personal financial records.

For peripherals (keyboards, mice, headphones), use Apple's native accessories. They receive firmware updates directly through the OS and support **BLE (Bluetooth Low Energy) Privacy**, which randomizes the Bluetooth hardware address to prevent location tracking.

## Installing and Activating macOS {#installazione style="color: white;"}

Always install the latest major release of macOS.

### System Activation
Apple Silicon Macs must activate with Apple's servers during the initial setup phase. This verification step confirms the device is not flagged as stolen or locked via iCloud.

### Apple Account (Apple ID)
An Apple Account is **not required** to use macOS. If you register one, be aware that the system syncs local data to iCloud by default. If you require iCloud features, enable **Advanced Data Protection** to enforce end-to-end encryption for synced files, backups, and photos.

### Virtualization Compartmentalization
On Apple Silicon, virtualization runs with high performance using Apple's native Virtualization framework. Use these tools to isolate untrusted software:

- **UTM**: A free, open-source frontend for QEMU supporting macOS and Windows on ARM.
- **VirtualBuddy**: An open-source wizard designed specifically for running macOS VMs on Apple Silicon.
- **VMware Fusion**: Free for personal use, providing high-performance virtualization.
- **Tart**: A command-line utility for managing macOS and Linux VMs, installable via Homebrew.

Use a local virtual machine to test scripts and run untrusted binaries without exposing your host system.

## First Boot and Account Setup {#primo-avvio style="color: white;"}

During the initial boot setup, create your primary user account with a strong passphrase. Leave the password hint field empty, as this hint is visible to anyone at the lock screen.

By default, the installer uses your real name to define your network hostname. Clean your local network footprint using the Terminal:

```zsh
sudo scutil --set ComputerName "localhost"
sudo scutil --set LocalHostName "localhost"
```

## Enforcing a Standard User Account {#account style="color: white;"}

The default account created during installation is an **Administrator** account with root execution privileges via `sudo`. Running daily tasks as an administrator increases your vulnerability to malware.

Configure a **Standard User** account for daily work:

1. Navigate to **System Settings → Users & Groups**.
2. Create a secondary Administrator account with a secure passphrase.
3. Log out, then log into the new Administrator account.
4. Demote your original daily account to a **Standard User** by running:
    ```zsh
    sudo dscl . -delete /Groups/admin GroupMembership your_username
    ```

Log back into your daily Standard User account. When system modifications require administrative rights, macOS will prompt you to enter the credentials of your secondary Administrator account.

## Boot Security and FileVault {#firmware-filevault style="color: white;"}

### Secure Boot Baseline
Verify that your system's boot security is configured to **Full Security** in macOS Recovery. This validates the cryptographic signatures of the bootloader, kernel, and firmware before boot.

### FileVault 2 (Full-Disk Encryption)
While Apple Silicon devices encrypt data at rest natively, **FileVault** requires your user password to load the decryption key on boot (Before First Unlock). Enabling FileVault also locks down the boot firmware, preventing unauthorized users from booting from external media or accessing macOS Recovery.

To enable FileVault:
Go to **System Settings → Privacy & Security → FileVault** and select **Turn On**.

> [!WARNING]
> Store your FileVault recovery key securely in physical print or in an offline database. Do not store the recovery key in your iCloud account, as compromising your iCloud account would expose your disk decryption keys.

## macOS Lockdown Mode {#lockdown style="color: white;"}

**Lockdown Mode** is an extreme security configuration that reduces the macOS attack surface by disabling common execution vectors. It disables complex web technologies (such as JIT compilation in browsers), blocks incoming connection requests (like FaceTime calls from unknown accounts), and restricts access to local physical ports when the device is locked.

To activate:
Go to **System Settings → Privacy & Security → Lockdown Mode** and select **Turn On**.

## Firewall Hardening {#firewall style="color: white;"}

### Application-Level Firewall
Configure the native macOS Application Firewall to block incoming network requests:

```zsh
# Enable the application firewall
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on

# Enable Stealth Mode to ignore ICMP pings and scan probes
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setstealthmode on

# Revoke automatic rules for signed applications
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setallowsigned off
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setallowsignedapp off
```

### Outbound Connection Firewalls
The native firewall only monitors inbound connections. To control outbound traffic and prevent apps from transmitting telemetry, install an outbound firewall helper:

- **LuLu**: A free, open-source outbound firewall developed by Objective-See.
- **Little Snitch**: A highly granular, commercial outbound monitoring application.

Outbound firewalls alert you whenever an application attempts to establish a connection, allowing you to create rules to block telemetry or unauthorized updates.

### Packet Filter (pf) Configuration
For kernel-level packet filtering, use the native Unix **pf** tool. Create a basic rule set in `/etc/pf.conf` (or custom rule path `/etc/pf.rules`):

```text
# Define interface
wifi = "en0"

# Default drop rules
block in all
block out all

# Allow essential loopback
pass quick on lo0

# Allow outbound DNS and HTTPS over Wi-Fi
pass out quick on $wifi proto udp to any port 53
pass out quick on $wifi proto tcp to any port { 80, 443 }
```

Load the rule set:
```zsh
sudo pfctl -e -f /etc/pf.rules
```
Check active rules:
```zsh
sudo pfctl -s info
```

## Services, Daemons, and Package Management {#servizi style="color: white;"}

### Managing Launch Daemons
macOS manages background tasks using `launchd`. You can inspect active system services:

```zsh
# List all running launchd tasks
launchctl list
```

Background service configurations are located in the following directories:
- `/System/Library/LaunchDaemons/`: Native OS services.
- `/System/Library/LaunchAgents/`: Native OS user-space helpers.
- `/Library/LaunchDaemons/`: Global third-party services.
- `~/Library/LaunchAgents/`: User-specific third-party helpers.

*Note: Do not disable System Integrity Protection (SIP) to modify system-level plists; keep your customizations restricted to user-level directories.*

### Package Manager Security (Homebrew)
[Homebrew](https://brew.sh) requires administrative permissions to manage libraries under `/opt/homebrew` (on Apple Silicon).

Always opt out of Homebrew's telemetry analytics. Add this environment variable to your shell configuration (`~/.zshrc`):

```zsh
export HOMEBREW_NO_ANALYTICS=1
```

## Securing DNS Resolution {#dns style="color: white;"}

Unencrypted DNS queries expose your browsing activity to local network monitors and ISPs. Secure your resolution path:

### Encrypted DNS Configuration Profiles
macOS natively supports DNS-over-HTTPS (DoH) and DNS-over-TLS (DoT) via system-level configuration profiles. You can generate or download profiles from secure providers:

- **Quad9**: Non-profit resolver that blocks malicious domains.
- **NextDNS**: Allows custom blocklists, tracker blocking, and parental controls.

### Local Hosts Blocklist
You can block tracking domains locally by modifying `/etc/hosts`:

```zsh
# Redirect tracking domains to null interface
echo "0.0.0.0 telemetry-server.com" | sudo tee -a /etc/hosts

# Flush the local DNS cache to apply changes
sudo dscacheutil -flushcache
```

Use community-maintained blocklists (like [StevenBlack/hosts](https://github.com/StevenBlack/hosts)) to automate domain blocking.

### DNSCrypt and Local Caching
To encrypt DNS traffic and verify signatures using DNSSEC, run a local proxy:

```zsh
# Install DNSCrypt Proxy
brew install dnscrypt-proxy
```

Pair it with **dnsmasq** to cache records locally and point your system DNS server to localhost (`127.0.0.1`).

## Certificate Trust and Browser Hardening {#certificati style="color: white;"}

### Certificate Authorities (CAs)
macOS ships with a pre-installed trust store containing over 100 root certificates. If a certificate authority is compromised or coerced, it can issue fraudulent certificates to perform Man-in-the-Middle (MitM) attacks.

To audit or revoke trust from a CA:
1. Open the **Keychain Access** utility.
2. Locate the CA under the **System Roots** tab.
3. Double-click the certificate, expand **Trust**, and change the setting to **Never Trust**.

### Selecting and Hardening Your Browser

Your web browser is the largest attack surface on your workstation.

#### 1. Firefox (Recommended for Privacy)
Firefox is open source and features advanced privacy controls.
- **Hardening**: Implement the [arkenfox/user.js](https://github.com/arkenfox/user.js) profile to enforce strict anti-fingerprinting configurations.
- **Extensions**: Install **uBlock Origin** (to block scripts and trackers) and **NoScript** (to selectively manage JavaScript execution).

#### 2. Safari (Recommended for System Integration)
Safari features strong sandboxing and native hardware integration.
- Supports **Lockdown Mode**, which disables complex web engines (like compiler optimization) to block exploitation.
- Includes **Intelligent Tracking Prevention** to scramble fingerprinting attempts.

#### 3. Chromium / Google Chrome
While Chrome features robust sandboxing, it is built to collect telemetry. If you must use Chrome:
- Disable experimental JavaScript APIs:
  Set `#disable-javascript-harmony-shipping` to active under `chrome://flags`.
- Install **uBlock Origin Lite** to block tracking within the boundaries of Manifest V3.

## Anonymity and Transit Security (Tor & VPN) {#tor style="color: white;"}

### Tor Browser
[Tor Browser](https://www.torproject.org/) routes your traffic through three encrypted hops in the Tor network, preventing sites from identifying your IP address.

#### Installation Verification
Always verify the cryptographic signature of the downloaded DMG archive using GPG:

```zsh
# Import the Tor Project developer key (check official Tor site for active fingerprint)
gpg --keyserver hkps://keys.openpgp.org --recv-keys <TOR_SIGNING_KEY>

# Verify DMG integrity
gpg --verify TorBrowser-*.asc TorBrowser-*.dmg
```

Verify macOS notarization and code signature:
```zsh
codesign -dvv /Applications/Tor\ Browser.app
```

> [!IMPORTANT]
> Tor provides **Anonymity** (hiding your identity), not **Privacy** (securing what you do). If you log into your personal accounts while using Tor, your identity is exposed to that service.

### VPN Services
Using a VPN routes your network traffic through an encrypted tunnel to a provider's server.

- Avoid legacy, insecure protocols like PPTP. Use modern protocols like **WireGuard** or **OpenVPN**.
- **Kill Switch**: Ensure your VPN client blocks network connections if the tunnel drops to prevent data leaks.

To force all outbound traffic through your VPN interface (`utun0`) at the firewall level, define these rules in `/etc/pf.conf`:

```text
block all
pass on lo0
pass out on utun0 all
pass out on en0 proto udp to <VPN_SERVER_IP> port <VPN_PORT>
```

## Cryptographic Tools and File Security {#pgp style="color: white;"}

### PGP/GPG File Encryption
Use GNU Privacy Guard (GPG) to encrypt files and communications locally:

```zsh
# Install GPG suite
brew install gnupg

# Generate a strong key pair (Ed25519)
gpg --full-generate-key

# Export public key
gpg --armor --export your_email@example.com
```

*Note: For high-security environments, store your private key on a hardware token like a YubiKey, ensuring the key material cannot be extracted by local malware.*

### Secure Messaging Clients
- **Signal**: The recommended end-to-end encrypted messaging client. It utilizes the Double Ratchet cryptographic protocol for forward secrecy.
- **iMessage**: If using iMessage, go to your Apple Account settings and enable **Contact Key Verification** to authenticate recipient keys. Enable **Advanced Data Protection** to ensure your messaging database is encrypted using keys that Apple does not hold.

## Malware Protections {#malware style="color: white;"}

macOS contains built-in defenses against malware, but they must be configured correctly.

### App Sandboxing & Notarization
Ensure that user-installed applications run inside a sandbox, limiting their access to core OS folders. Verify application sandboxing entitlements using `codesign`:

```zsh
codesign --entitlements - /Applications/AppName.app
```

Verify if the application implements Apple's Hardened Runtime (required for notarization):
```zsh
codesign --display --verbose /Applications/AppName.app
```
Look for `runtime` flags in the output.

### Local Detection (Objective-See Utilities)
Rather than resource-intensive commercial antivirus software (which frequently transmits telemetry), use free, open-source security helpers:

- **BlockBlock**: Alerts you if a program attempts to install a persistent startup daemon.
- **LuLu**: Monitors outbound connections.
- **KnockKnock**: Scans your system for existing persistence components.

### System Integrity Protection (SIP)
SIP blocks modifications to system binaries and directories, preventing malware from compromising root folders. Ensure SIP is active:

```zsh
csrutil status
```
*Never disable SIP in production environments.*

## Purging Metadata and Digital Traces {#metadati style="color: white;"}

### 1. File Quarantine Extended Attributes
macOS tags downloaded files with extended attributes detailing download origins. Strip these attributes using `xattr`:

```zsh
# View metadata tags
xattr -l ~/Downloads/file.zip

# Delete quarantine and provenance attributes
xattr -d com.apple.metadata:kMDItemWhereFroms ~/Downloads/file.zip
xattr -d com.apple.quarantine ~/Downloads/file.zip
```

### 2. Clear QuickLook Previews
QuickLook caches document and image previews locally. Purge this cache regularly:
```zsh
qlmanage -r cache
```

### 3. Disable Typing Telemetry
macOS records typing profiles, spelling corrections, and keyboard predictions. Clear these folders and restrict access:

```zsh
rm -rf ~/Library/LanguageModeling ~/Library/Spelling ~/Library/Suggestions
mkdir ~/Library/LanguageModeling ~/Library/Spelling ~/Library/Suggestions
chmod -R 000 ~/Library/LanguageModeling ~/Library/Spelling ~/Library/Suggestions
```

### 4. Saved Application States
Disable the caching of window locations and document state:
```zsh
rm -rf ~/Library/Saved\ Application\ State/*
chmod -R 000 ~/Library/Saved\ Application\ State
```

## Passwords and Multi-Factor Authentication {#password style="color: white;"}

- **Password Managers**: Use the native macOS Passwords app (which supports Passkeys) or a cross-platform manager (like Bitwarden) with database files encrypted locally.
- **Hardware Authentication**: Secure your primary accounts using FIDO2 WebAuthn keys (such as YubiKeys). Avoid insecure SMS or email-based 2FA.

## Backup Strategy and Local Networking {#backup style="color: white;"}

### 1. Encrypted Backups (Time Machine)
Ensure backups are encrypted before writing to external storage:
Go to **System Settings → General → Time Machine → Add Backup Disk** and select **Encrypt Backup**.

### 2. Manual Archive Encryption
If writing backups manually, encrypt directories using GPG:

```zsh
# Create encrypted archive
tar czf - ~/Documents | gpg --encrypt --recipient your_email@example.com > backup.tar.gz.gpg

# Decrypt archive
gpg --decrypt backup.tar.gz.gpg | tar xzf -
```

### 3. Local Wi-Fi Configuration
- **Avoid Hidden Networks**: Hidden networks force your Mac to constantly broadcast probes searching for the network SSID, exposing your network history.
- **Private Wi-Fi Address**: Enable private MAC address generation for each network under **Wi-Fi Settings → Network Details → Private Wi-Fi Address**.

### 4. Hardening Outbound SSH Connections
In your `~/.ssh/config` file, hash hostnames and restrict identification keys:

```text
Host *
    HashKnownHosts yes
    IdentitiesOnly yes
```

## Physical Security Mitigations {#fisico style="color: white;"}

- **USB Intrusion Protection**: Never leave your Mac unlocked in public. Use utilities like **BusKill** to trigger a system shutdown or lock if your physical USB connection is severed.
- **Privacy Screen Filters**: Use physical polarization filters to prevent shoulder-surfing in public environments.
- **Tamper-Evident Seals**: Apply custom seals or specialized nail polish over the chassis screws to detect physical access attempts.

## System Monitoring {#monitoraggio style="color: white;"}

Audit system resource usage and open ports periodically:

```zsh
# List active network connections
lsof -Pni

# List listening TCP/UDP sockets
netstat -atln
```

Monitor process execution using the native **Activity Monitor** or SQL-based endpoint monitoring tools like **osquery**.

## Post-Installation Hardening Tweaks {#varie style="color: white;"}

Run these commands in Terminal to restrict diagnostics, enforce screensaver locks, and configure system preferences:

```zsh
# Disable diagnostic report submission to Apple
sudo defaults write /Library/Application\ Support/CrashReporter/DiagnosticMessagesHistory.plist AutoSubmit -bool false

# Enforce immediate password lock on screensaver activation
defaults write com.apple.screensaver askForPassword -int 1
defaults write com.apple.screensaver askForPasswordDelay -int 0

# Show hidden files in Finder
defaults write com.apple.finder AppleShowAllFiles -bool true

# Display all file extensions in Finder
defaults write NSGlobalDomain AppleShowAllExtensions -bool true

# Disable default saving to iCloud drive
defaults write NSGlobalDomain NSDocumentSaveNewDocumentsToCloud -bool false

# Enable Secure Keyboard Entry in Terminal to prevent keystroke sniffing
defaults write com.apple.terminal SecureKeyboardEntry -bool true

# Disable the visual crash reporter dialog
defaults write com.apple.CrashReporter DialogType -string "none"

# Disable Bonjour multicast advertisements
sudo defaults write /Library/Preferences/com.apple.mDNSResponder.plist NoMulticastAdvertisements -bool true

# Restrict default launchd user umask permissions to 077
sudo launchctl config user umask 077
```

---

## Recommended Security Software {#software style="color: white;"}

- **[osquery](https://osquery.io/)**: Open-source utility that exposes system metrics as SQL tables.
- **[Pareto Security](https://paretosecurity.com/)**: A lightweight menu bar application that audits macOS configuration settings.
- **[LuLu](https://objective-see.org/products/lulu.html)**: Free open-source outbound firewall.

---

You have successfully hardened your macOS workstation. Maintain operational vigilance: update software regularly, verify permissions, and monitor outbound connection requests. 🛡️

---

## Related Guides

- **[How to Build a Threat Model](/threat-model)** — Define your assets and adversarial boundaries.
- **[Self-Hosted VPN with Ad Blocking](/vpn)** — Secure your traffic using WireGuard and Pi-hole.
- **[Email Security Guide](/email-security)** — Configure secure email authentication.
- **[De-Google Android: Complete Privacy Guide](/android)** — Hardening guidelines for mobile devices.

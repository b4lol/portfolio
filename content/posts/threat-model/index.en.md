---
title: "Threat Model: How to Define Your Threats"
description: "Learn how to build an effective threat model to protect your privacy and digital security. Avoid the common mistakes beginners make."
summary: "Learn how to build an effective threat model to protect your privacy and digital security. Avoid the common mistakes beginners make."
keywords: ["threat model", "privacy", "security", "data protection", "threat modeling"]
author: "b4lol"
date: 2026-02-24
lastmod: 2026-05-05
url: /threat-model
series: ["Digital Privacy", "Security"]
topics: ["privacy-security"]
faq:
  - question: "What is a threat model and why does it matter?"
    answer: "A threat model is a process that lets you identify your real vulnerabilities and choose the right countermeasures. Without one, you risk protecting yourself against the wrong risks while wasting time and money."
  - question: "What are the main categories of privacy threats?"
    answer: "The four main categories are: service providers spying on users, mass surveillance through cross-site tracking, malicious app developers, and hackers trying to access your devices."
  - question: "Does end-to-end encryption fully protect my messages?"
    answer: "End-to-end encryption protects the content of your messages, but not metadata such as who you talk to, how often, and when. It's also better to use native apps rather than web clients, which are more vulnerable to server-side attacks."
  - question: "How can I protect myself from online tracking?"
    answer: "Separate your online identities, blend in with the crowd, and limit the information you share. Use tools like a VPN or Tor to hide your IP, Cryptomator to encrypt files in the cloud, and prepaid cards for payments."
  - question: "Is open-source software automatically more secure and private?"
    answer: "No. Open-source code can contain vulnerabilities or be compromised by malicious contributors. It can also have weaker security properties than proprietary software, as is the case with desktop Linux compared to macOS."
  - question: "Why shouldn't I focus only on big tech companies as the threat?"
    answer: "Defining the threat as 'big tech' just shifts your trust toward smaller companies, which can be just as problematic. The correct approach is to protect yourself from service providers as a whole, by adopting technical solutions like encryption."
  - question: "What does compartmentalization mean in digital security?"
    answer: "Compartmentalization means separating your digital activities to limit the damage in case of a compromise. You can achieve this by using different computers for different tasks, virtual machines, or operating systems with strong sandboxing such as Qubes OS or GrapheneOS."
howto:
  name: "How to build a personal threat model"
  description: "A procedure for identifying assets, threats, adversaries, capabilities, and realistic countermeasures for privacy and digital security."
  totalTime: "PT45M"
  supply:
    - "List of accounts, devices, and important data"
    - "Paper or digital document"
  tool:
    - "Password manager"
    - "Security checklist"
  steps:
    - name: "Define what to protect"
      text: "List the data, devices, accounts, identities, and communications you need to protect."
      url: "/threat-model#definizione-di-una-minaccia"
    - name: "Identify providers and tracking"
      text: "Assess which services can collect data and which activities link different identities together."
      url: "/threat-model#privacy-dai-fornitori-di-servizi"
    - name: "Reduce public exposure"
      text: "Limit public information, separate identities, and reduce links between accounts."
      url: "/threat-model#limitare-le-informazioni-pubbliche"
    - name: "Protect against malware and intrusions"
      text: "Choose proportionate countermeasures against malware, phishing, device theft, and compromise."
      url: "/threat-model#protezione-da-malware-e-hacker"
    - name: "Avoid bad practices"
      text: "Don't buy tools at random: every measure must mitigate a real threat."
      url: "/threat-model#cattive-pratiche"
---

> **TL;DR** — In this guide, you will learn:
> - How to correctly define a threat (moving beyond the vague \"Big Tech\" label).
> - The four primary threat vectors: service providers, mass surveillance, application developers, and malicious actors.
> - How to build defenses using end-to-end encryption, identity separation, and compartmentalization.
> - Common pitfalls and bad practices to avoid when constructing your threat model.

## Summary

A threat model is a structured methodology to identify what assets you need to protect, who your adversaries are, what their capabilities are, and what realistic mitigations you can deploy. Without a threat model, you risk purchasing unnecessary tools, neglecting actual threats, and making your digital life inconvenient without increasing your security.

Installing a VPN or switching to an encrypted messaging client is ineffective if you do not understand your threat vector. Many beginners spend time and money on security software without a clear plan, leaving them vulnerable to standard exploits. Developing a threat model is the essential first step: it clarifies your actual vulnerabilities and guides you toward the correct solutions.

The first step anyone should take to protect their privacy and security is to create a **Threat model**.

## Defining a Threat {#definizione-di-una-minaccia}

To construct a threat model, you must first define what a threat actually is. A common mistake for beginners is to define the adversary simply as \"Big Tech.\" This approach has a fundamental flaw:

> Why should we distrust a large technology company only to shift our absolute trust toward a smaller startup? What happens if that smaller provider is compromised, sold to a data broker, or scales up and changes its data collection policies?

Distrusting specific brands is ineffective. The correct approach is to define the threat as the **\"Service Provider\"** as a general category.

There are four primary threat vectors that most users should consider:

1. **Service Providers**: Providers monitoring, analyzing, or storing user communications and data on their servers.
2. **Mass Surveillance**: Advertising networks and data brokers tracking user activity across multiple websites and platforms.
3. **Invasive Application Developers**: Software developers harvesting device data or injecting tracker libraries into local applications.
4. **Malicious Actors (Hackers)**: Attackers seeking unauthorized access to your physical devices or online accounts.

Most users will address several of these threats simultaneously, prioritizing them based on their personal context. For example, a software engineer might focus on preventing unauthorized device access (protecting code signing keys and system credentials), while a standard user might prioritize blocking mass tracking and commercial profiling.

For whistleblowers, journalists, or activists, the requirements are more severe: they require true **anonymity** (hiding their identity) in addition to **confidentiality** (hiding their data), which demands a much more rigorous operational security posture.

## Mitigating Service Provider Exposure {#privacy-dai-fornitori-di-servizi}

Most communication platforms store messages, emails, and attachments on centralized databases. A service provider (or an attacker who compromises their servers) can access this unencrypted data at will. This is the default status for SMS, standard email, Telegram channels, and Discord servers.

### The Role of End-to-End Encryption (E2EE)
End-to-end encryption secures communications locally on your device before transmission. The service provider acts merely as a blind transit relay; they cannot decrypt the content because they do not hold your private keys.

However, the implementation details of E2EE matter:

* **Native Applications**: Clients like **Signal** compile code that runs locally on your device. This code can be audited and reverse-engineered to verify that key management is secure.
* **Web Applications**: Web-based E2EE tools (such as webmail interfaces or browser vaults) receive their cryptographic code dynamically from the provider's server during every session. A compromised server can push malicious JavaScript to a targeted user to extract their local decryption keys, making web-based E2EE harder to audit.

**Best Practice**: For sensitive communications and password management, prefer native, audited applications over web-based browser clients.

### Metadata Exposure
While E2EE protects the body of your messages, it rarely conceals metadata. Service providers can still record:
* Whom you communicate with.
* The timestamp and frequency of your connections.
* Your IP address and device fingerprint.

If metadata leakage is a concern under your threat model, look for platforms that implement metadata minimization or route traffic through decentralized networks (such as SimpleX or onion routing).

## Defending Against Mass Tracking {#protezione-dal-tracciamento-cross-siteservice}

Advertising networks correlate your activities across the web using several persistent tracking signals:

* Your public IP address.
* Persistent browser cookies and local storage tokens.
* Unique browser canvas and hardware fingerprints.
* Consistent telemetry shared during account creation.
* Credit card transactions and payment records.

To prevent tracking networks from aggregating your data:

1. **Compartmentalize Identities**: Use distinct, separated browser profiles or virtual machines for different tasks (e.g., separate personal browsing from online shopping).
2. **Blend in with the Crowd**: Avoid custom browser extensions or configurations that make your device signature unique. Enforce anti-fingerprinting configurations (like Firefox's `arkenfox` setup or Tor).
3. **Minimize Information Disclosure**: Obfuscate personal data using temporary email aliases (e.g., SimpleLogin) and virtual credit cards.
4. **Encrypt Files Locally**: Use tools like **Cryptomator** to encrypt files locally before uploading them to commercial cloud providers (like Google Drive or OneDrive).
5. **Secure Your Network Footprint**: Route traffic through a trusted VPN or the Tor network to hide your public IP address.

> [!IMPORTANT]
> A privacy policy is merely a legal promise, not a technical control. It should be treated as your last line of defense. Focus your efforts on deploying technical controls (like encryption and tracker blocking) rather than trusting corporate policies.

## Limiting Public Information {#limitare-le-informazioni-pubbliche}

The most effective way to protect your data is to **never disclose it**.

* **Audit Privacy Settings**: Go through your social media and email accounts and set permissions to the most restrictive options (e.g., hide profiles from search indexers).
* **Opt-Out from Data Brokers**: Submit removal requests to data brokers and public record indexers to remove your phone numbers, physical addresses, and email associations from search results.
* **Obfuscate Real Data**: If a platform requires information but does not verify it (such as a username or date of birth), use fake identifiers or randomized details to pollute their databases.

## Security Against Malware and Device Compromise {#protezione-da-malware-e-hacker}

Privacy is impossible without security. If an attacker compromises your device at the operating system level, they can bypass E2EE and capture your keystrokes.

Because you cannot guarantee that any third-party application is entirely secure or free of vulnerabilities, implement **security through compartmentalization**:

* **Dedicated Hardware**: Use separate physical devices for work and personal activities.
* **Virtualization**: Run untrusted software inside disposable virtual machines.
* **Hardened Operating Systems**: Run platforms that enforce strict sandboxing at the OS level (like Qubes OS for desktops or GrapheneOS for mobile devices).

### Sandbox Models across Platforms
* **Mobile OS (iOS, Android)**: Enforce a strong sandboxing model by default. Applications run as unprivileged users and cannot access other apps' data directories without permission.
* **Desktop OS (macOS, Windows 11)**: macOS provides robust application controls, runtime notarization, and opt-in sandboxing. Windows 11 implements virtualization-based security (VBS) and smart app control. Both, however, collect telemetry by default.
* **Linux Desktop**: Traditional Linux distributions provide limited native app sandboxing. A compromised application can easily read your entire home directory. You must configure sandboxing yourself using Flatpak overrides, virtualization, or MAC policies (SELinux/AppArmor).

### Physical Security Considerations
If your threat model includes physical theft or device seizure:
* Ensure **Full-Disk Encryption** is active.
* Use a hardware **TPM**, **Secure Enclave**, or **Secure Element** to enforce decryption delays, blocking automated passphrase cracking.
* Require a strong alphanumeric passcode instead of a simple 4-digit PIN.

## Common Threat Modeling Pitfalls {#cattive-pratiche}

Avoid these common mistakes when designing your security model:

### 1. Brand-Level Distrust vs. Technical Mitigation
Distrusting a specific brand (e.g., Google) without addressing the technical reason for your distrust is a pitfall. Simply migrating your files from Google Drive to another unencrypted hosting provider does not improve your security; it merely shifts trust to a different company. The correct mitigation is adopting **client-side encryption** (e.g., using Cryptomator or Proton Drive's native E2EE), making the hosting provider's identity irrelevant.

### 2. Over-Reliance on Privacy Policies
Privacy policies do not prevent data collection. Focus on implementing technical boundaries (like firewalls, local encryption, and Tor) that make compliance monitoring unnecessary.

### 3. \"Badness Enumeration\"
Do not focus on building infinite blacklists of \"bad actors\" or malicious tracking servers. Blocking specific domains is a losing battle because tracking servers change hostnames daily. Instead, configure **systemic blocks** (e.g., disable network access globally for local tools, block all unencrypted DNS, and enforce strict canvas scrambling).

### 4. Blind Trust in Open Source
While open-source software is transparent, it is not automatically secure. Project repositories can be compromised, developers can be coerced, and dependencies can introduce vulnerabilities. Furthermore, desktop Linux distributions (which are open source) often have a weaker hardware security and sandboxing baseline compared to commercial, closed-source operating systems like macOS. Always evaluate software based on its active security architecture and features, rather than its license alone.

## Conclusion {#conclusioni}

Developing a threat model is a fundamental step toward securing your digital identity. By defining your assets, identifying realistic adversaries, and implementing technical controls, you can protect your privacy without making your daily workflows unusable.

Stay informed, critically analyze new tools, and prioritize technical mitigations over marketing promises.

---

Thanks for reading this guide! If you found it helpful, please share it to promote digital security awareness.

---

## Related Guides

- **[De-Google Android: The Complete Privacy Guide](/android)** — Implement your threat model on a secure mobile device.
- **[GrapheneOS: The Definitive Guide](/graphene)** — Deep-dive into mobile OS hardening and profile isolation.
- **[Self-Hosted VPN with Ad Blocking](/vpn)** — Secure your network traffic on public systems.

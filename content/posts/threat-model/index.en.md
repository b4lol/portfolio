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

> **TL;DR** - In this guide you'll learn:
> - How to correctly define a threat (it's not just "big tech")
> - The 4 main threat categories: service providers, mass surveillance, malware, and hackers
> - How to protect yourself with end-to-end encryption, identity separation, and compartmentalization
> - The bad practices to avoid when building your threat model

## Summary

A threat model is the process by which you identify what you want to protect, from whom, with what adversary capabilities, and with which realistic countermeasures. Without a threat model you risk buying useless tools, ignoring concrete risks, or making your digital life more inconvenient without actually increasing your security.

Installing a VPN or switching to Signal is pointless if you don't know who you're protecting yourself from. Too many beginners spend time and money on privacy tools without first defining their own threat model, ending up protected against the wrong risks. Building a threat model is the fundamental first step: it lets you understand your real vulnerabilities and choose the right countermeasures.

The first step anyone should take to protect their privacy and security is to create a **Threat model**.

## Defining a Threat {#definizione-di-una-minaccia}

To build a threat model, we first need to define what a threat actually is. A common mistake made by people new to privacy is to think of "big tech companies" as the threat. This approach has a fundamental problem:

> **Why don't we trust "big tech companies," only to shift our trust toward "small tech companies"? What happens if those "small tech companies" turn out to be malicious or grow exponentially?**

The correct way to define the threat here is the **"service provider,"** not "big tech companies."

Generally speaking, there are four main threats a person would want to protect against:

1. **A service provider spying on its own users**
2. **Cross-site/service tracking and data sharing**, i.e. "mass surveillance"
3. **An app developer spying on users through malicious software**
4. **A hacker trying to access users' computers**

A typical person would include several of these threats in their threat model, weighing some more heavily than others.

For example, a software developer might mainly fear a hacker stealing their source code, signing keys, and secrets, but would also want privacy while browsing the web. Likewise, an average person might mainly worry about mass surveillance and service providers, but would also need good security to prevent a hacker from stealing their data.

For whistleblowers, the threat model is far more extreme. On top of everything mentioned above, they need **anonymity**. They must not only hide what they do and the data they hold, avoiding being hacked by bad actors or governments, but also conceal their own identity.

## Privacy from Service Providers {#privacy-dai-fornitori-di-servizi}

In most cases, our "private" messages, emails, and social interactions are stored on a server somewhere. The obvious problem is that the service provider (or a hacker who has compromised the server) can access your private conversations whenever and however they want, without your knowledge. This applies to many common services such as SMS, Telegram, Discord, and others.

With **end-to-end encryption**, you can mitigate this problem by encrypting communications between you and your recipients before they're sent to the server. The confidentiality of your messages is guaranteed, as long as the service provider doesn't have access to both parties' private keys.

In practice, the effectiveness of different end-to-end encryption implementations varies. Applications like **Signal** run natively on your device, and every copy of the app is identical across all installations. If the service provider inserted a backdoor into the app to steal your private keys, this could be detected through reverse engineering.

By contrast, web-based end-to-end encryption implementations, such as **Proton Mail**'s webmail or **Bitwarden**'s web vault, rely on the server dynamically serving JavaScript code to the browser to handle cryptographic operations. A malicious server could target a specific user and serve them malicious JavaScript code to steal their encryption key, and it's extremely hard for the user to notice.

**Therefore, when relying on end-to-end encryption, you should prefer native apps over web clients whenever possible.**

Even with end-to-end encryption, service providers can profile you through **metadata**, which is usually unprotected. While they can't read your messages, they can still observe who you talk to, how often you message, and when you're active. Metadata protection is fairly rare; if this concerns you, you should carefully check the technical documentation of the software you use to see whether it offers metadata minimization or protection.

## Protection from Cross-Site/Service Tracking {#protezione-dal-tracciamento-cross-siteservice}

You can be tracked across websites and services through various identifiers, including:

- **Your IP address**
- **Browser cookies**
- **Your browser's fingerprint**
- **The data you send to websites**
- **Correlation of payment methods**

Your goals should be:

- **Separating your online identities**
- **Blending in with the crowd**
- **Avoiding giving out identifying information as much as possible**

Instead of relying on privacy policies (promises that will almost certainly be broken), try to **obfuscate your information** so it becomes hard for various providers to correlate data and build a profile on you. This can include:

- **Using encryption tools like Cryptomator** before uploading data to cloud services
- **Using prepaid cards or cryptocurrencies** to protect your credit/debit card information
- **Using a VPN or Tor** to hide your IP address

> **A privacy policy should only be considered a last resort**, once you've exhausted every option for real privacy and must place full trust in your service provider (after doing everything you can to protect your data, you can consider things like the legislation of the services or servers you use, but that's certainly not the priority).

Remember that companies can hide their ownership or share your information with data brokers, even if they don't operate in the advertising industry. So it makes little sense to focus exclusively on the "ad-tech" industry as the threat in your threat model. It's more logical to protect yourself from **service providers as a whole**; doing so addresses any kind of corporate surveillance threat most people worry about, all at once.

## Limiting Public Information {#limitare-le-informazioni-pubbliche}

The best way to ensure the privacy of your data is simply **not to disclose it**. Removing personal information you find online is one of the best first steps toward reclaiming your privacy.

On sites where you share information, it's essential to **check your account's privacy settings** to limit how widely your data spreads. For example, if your accounts offer a "private mode," turn it on to make sure your profile isn't indexed by search engines and can't be viewed by unauthorized people.

If you've already given your real information to various sites that shouldn't have it, consider using **disinformation tactics**, such as submitting fake information tied to the same online identity, to make your real information indistinguishable from the fake.

## Protection from Malware and Hackers {#protezione-da-malware-e-hacker}

Security is essential for ensuring privacy: using tools that seem private is pointless if attackers can easily exploit them to leak your data later on.

When it comes to application security, we generally don't know (and sometimes can't know) whether the software we use is malicious or could become so. Even with the most trustworthy developers, there's no guarantee their software is free of serious vulnerabilities that could be exploited later.

To minimize the potential damage caused by malicious software, you should adopt **security through compartmentalization**. This can include:

- **Using different computers for different tasks**
- **Using virtual machines** to separate groups of related applications
- **Adopting a secure operating system** with a strong focus on application sandboxing and access control

Mobile operating systems are generally more secure than desktop ones in terms of application sandboxing. Apps can't gain root access and can only access the system resources you grant them.

Desktop operating systems generally lag behind in proper sandboxing. **ChromeOS** offers sandboxing properties similar to Android, and **macOS** has full control over system permissions and opt-in application sandboxing (for developers); however, these operating systems send identifying information to their respective OEMs. **Linux** tends not to send information to system vendors, but offers limited protection against exploits and malicious apps. This can be partly mitigated with specialized distributions that make heavy use of virtual machines or containers, such as **Qubes OS**.

Web browsers, email clients, and office applications frequently run untrusted code sent by third parties. Running multiple virtual machines to separate such applications from the main system, and from each other, is a useful technique to prevent an exploit from compromising the entire system. Technologies like **Qubes OS** or **GrapheneOS** provide practical ways to implement this separation transparently.

If you're concerned about physical attacks, you should use an operating system with a secure **secure boot** implementation, such as **Android**, **iOS**, **ChromeOS**, or **macOS**. Make sure your disk is encrypted and that the operating system uses a **TPM**, **Secure Enclave**, or **Secure Element** to limit the number of attempts at guessing your encryption passphrase. Avoid sharing your computer with people you don't trust, since most desktop operating systems don't encrypt data separately per user.

## Bad Practices {#cattive-pratiche}

As a beginner, you might fall into a few bad practices while building a threat model, including:

- **Focusing exclusively on advertising networks instead of service providers as a whole**
- **Relying heavily on privacy policies**
- **Blindly shifting trust from one service provider to another**
- **Over-relying on Badness Enumeration instead of systematically solving the problem**
- **Blindly trusting open-source software**

As discussed, focusing only on advertising networks and relying solely on privacy policies doesn't make for an effective threat model. When you switch service providers, identify the underlying problem and check whether the new provider offers an adequate technical solution.

For example, you might dislike **Google Drive** because it gives Google access to all your data. The actual problem here is the **lack of end-to-end encryption**, which you can solve by using an encryption tool like **Cryptomator** or by switching to a provider that offers it natively, such as **Proton Drive**. Blindly moving from Google Drive to a provider that doesn't offer end-to-end encryption makes no sense.

Remember that Badness Enumeration — i.e. drawing up a list of actors considered malicious (like Google, Amazon, Meta, etc.) and trying to block every single thing they do — doesn't work, can't work, and never will. This approach is ineffective because threats are constantly evolving, and focusing on a specific list won't protect you from unknown actors or new attack techniques. Build your defense strategy not around a list of enemies, but around a generic way to stop a whole range of attacks (the solution isn't to stop giving data to Google specifically, but to stop giving out data in general!).

Another important point is that **open-source software** isn't automatically private or secure. Malicious code can be introduced by project developers, contributors, library authors, or whoever compiles the code. Moreover, open-source software sometimes has weaker security properties than its proprietary counterpart.

For instance, most traditional desktop Linux distributions lack secure boot, system integrity protection, or full app access control by default compared to macOS. When building a threat model, it's essential to evaluate the privacy and security properties of every piece of software you use and build a threat model tied to your own security and privacy needs, instead of blindly trusting something just because it's open-source.

## Conclusion {#conclusioni}

Building a threat model is a fundamental step toward protecting your online privacy and security. By understanding the different threats and adopting proactive measures, you can significantly improve your protection against surveillance, tracking, and cyberattacks.

Remember, the key is to stay informed, critical, and proactive in your technology choices.

---

Thanks for reading this guide! If you found it useful, share it with friends and colleagues interested in digital security.

---

## Related Guides

- **[De-Google Android: The Complete Privacy Guide](/android)** - Apply your threat model to your phone with a de-googled setup
- **[GrapheneOS: The Complete Guide to the Best Privacy OS](/graphene)** - The mobile operating system with the best security level
- **[Self-Hosted VPN with AdBlock](/vpn)** - Protect your network traffic with a personal VPN

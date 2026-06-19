---
title: "Email Security: Encryption, SPF, DKIM and DMARC"
description: "Discover how email security really works: from STARTTLS to PGP, from SPF and DKIM to DMARC. A complete guide with practical tips to protect your email."
summary: "Discover how email security really works: from STARTTLS to PGP, from SPF and DKIM to DMARC. A complete guide with practical tips to protect your email."
keywords: ["email security", "email encryption", "PGP email", "DKIM SPF DMARC", "email privacy", "secure email", "encrypted email", "protect your email", "end to end email encryption", "proton mail", "email authentication", "STARTTLS vs SMTPS"]
author: "b4lol"
date: 2026-03-08
lastmod: 2026-05-05
url: /email-security
series: ["Digital Privacy", "Security"]
topics: ["privacy-security"]
faq:
  - question: "Is email secure?"
    answer: "Not by default. Email was born as a protocol with no encryption at all. Today protections like STARTTLS, SMTPS and PGP exist, but most email still travels without end-to-end encryption. Only providers like Proton Mail offer E2EE between their own users."
  - question: "What are SPF, DKIM and DMARC?"
    answer: "They are three email authentication protocols. SPF verifies that the sending server is authorized, DKIM digitally signs emails to detect tampering, and DMARC defines what to do when the checks fail (reject, send to spam, or ignore)."
  - question: "What is the difference between STARTTLS and SMTPS?"
    answer: "STARTTLS negotiates encryption after the connection starts in plaintext, which makes it vulnerable to downgrade attacks. SMTPS starts directly with an encrypted connection, like HTTPS, eliminating that vulnerability."
  - question: "Is PGP still useful for email?"
    answer: "PGP offers end-to-end encryption, but it has serious problems: complex key management, no forward secrecy, and unencrypted metadata. For most users, a provider with built-in E2EE like Proton Mail is more practical and secure."
  - question: "How can I protect my email today?"
    answer: "Enable 2FA with a hardware key, disable HTML and remote images in your client, replace email as an account recovery method with offline codes, and consider a provider with end-to-end encryption like Proton Mail."
  - question: "Why is email the weak link of online security?"
    answer: "Email is the default password-reset and 2FA recovery method for almost every account. If an attacker gets into your inbox, they can reset the passwords of every connected service."
howto:
  name: "How to protect an email account"
  description: "A procedure to reduce email risk with a trustworthy provider, MFA, a secure client, separate account recovery, and domain authentication."
  totalTime: "PT1H"
  supply:
    - "Email account"
    - "Password manager"
    - "FIDO2 hardware key"
  tool:
    - "Email client"
    - "SPF"
    - "DKIM"
    - "DMARC"
  steps:
    - name: "Understand the level of encryption"
      text: "Tell the difference between in-transit TLS, encryption at rest, and true end-to-end encryption."
      url: "/email-security#crittografia-delle-email"
    - name: "Secure access"
      text: "Use a unique password, a password manager, and 2FA with a hardware key instead of SMS."
      url: "/email-security#lemail-come-punto-debole"
    - name: "Configure the client"
      text: "Turn off remote images and unnecessary HTML, and reduce plugins or third-party clients."
      url: "/email-security#client-di-terze-parti-e-superficie-dattacco"
    - name: "Authenticate the domain"
      text: "Set up SPF, DKIM and DMARC if you manage a personal or professional email domain."
      url: "/email-security#autenticazione-delle-email"
    - name: "Separate recovery from critical accounts"
      text: "Avoid letting a single email account be able to reset every important account."
      url: "/email-security#passkey-e-il-futuro-dellautenticazione"
---

> **TL;DR** - In this guide you will learn:
> - How email encryption works and why STARTTLS isn't enough
> - What SPF, DKIM and DMARC are and how they protect against spoofing
> - Why email is the weak link in the security of all your accounts
> - What the future holds: end-to-end encryption, DKIM2, and the end of plaintext email

## Summary

Email is not secure by default: it protects metadata poorly, often uses only hop-by-hop encryption, and remains the password-recovery point for almost every account. To reduce the risk you need hardware 2FA, a trustworthy provider, remote images disabled, separate account recovery, and domain authentication with SPF, DKIM and DMARC.

Email is the invisible backbone of your digital life. Every account you create, every password you reset, every important communication... almost always passes through email. But have you ever wondered how secure it actually is?

The answer, unfortunately, is: less than you think. Email is a protocol born in the 1980s, when cybersecurity was not exactly a priority. Layer after layer of protections has been added since then, but the result is a complex, fragmented, and often misconfigured system.

In this guide we'll go through the current state of email security together, from encryption to authentication, and take a look at what the future holds. Keep your eyes open, because there are quite a few surprises.

## Email Encryption {#crittografia-delle-email}

Let's start with the basics: how are your emails protected during transport and at rest? Let's just say the situation is... complicated.

### STARTTLS: the lock you can remove

STARTTLS is the most common mechanism for encrypting email in transit. The idea is simple: the mail client negotiates a TLS (encrypted) connection with the server before sending the message.

The problem? The negotiation phase happens **in plaintext**. This means an attacker positioned on the network can literally strip the STARTTLS command out of the traffic, forcing the connection to stay unencrypted. It's called a *downgrade attack*, and your client might not notice at all.

Think of it this way: it's like knocking on an armored door, except someone could remove the door before you walk in, leaving you facing an unprotected opening.

Furthermore, even when STARTTLS works correctly, the encryption is only *hop-by-hop*: the message is decrypted and re-encrypted at every intermediate server. It is not end-to-end encryption — every server in the chain can read the content.



### SMTPS: the improved version

SMTPS (Implicit TLS) solves the downgrade problem. Instead of negotiating encryption after the connection is established, it starts directly with an encrypted connection, exactly like HTTPS does for websites.

The standard port for SMTPS is **465**, while **587** remains for STARTTLS. In theory this is a clear improvement; in practice, years of confusion between ports (25, 465, 587, 2525) have created quite a mess of standardization across providers.

### POP3S and IMAPS

The protocols used to *download* mail from servers also support encryption:

- **POP3S** uses TLS on port **995**
- **IMAPS** uses TLS on port **993**

These guarantee that retrieving email from the server happens over an encrypted channel. Good, but they don't solve the problem of encrypting the content itself.

### OpenPGP: powerful but impractical

Pretty Good Privacy (PGP) is the grandfather of email encryption. Created in 1991 by Phil Zimmermann, it was later standardized as OpenPGP.

The concept is solid: asymmetric encryption with public and private keys. The sender encrypts with the recipient's public key, and the recipient decrypts with their own private key. No intermediary can read the message.

**The problem?** Key management is a nightmare. You have to:
- Generate a key pair
- Distribute your public key
- Verify other people's keys (the famous *key signing parties*)
- Guard your private key with extreme care



If your private key is compromised, **every past message** becomes readable. That's because OpenPGP does not support *forward secrecy*, a property that, in my opinion, should be table stakes in 2026.

Another critical point: OpenPGP **does not encrypt metadata**. Sender, recipient, date, subject... all remain in plaintext. An observer can't read the content, but knows exactly who is talking to whom, when, and on what topic.

### S/MIME: better UX, worse for your wallet

S/MIME uses X.509 digital certificates (the same ones used on the web) to encrypt and authenticate emails. It's more user-friendly than PGP because certificate management is partially automated through certificate authorities (CAs).

The downside? Certificates cost money, expire, and need renewal. Like PGP, S/MIME doesn't support forward secrecy. In practice, it's used almost exclusively in corporate environments where IT manages everything centrally.

### Web Key Directory

WKD is an elegant solution to the problem of distributing PGP keys. Instead of looking up keys on unreliable public key servers, your email client queries the recipient's domain directly to get their public key.

It's like an automatic phone book for cryptographic keys. Simple, decentralized, and it works. Unfortunately, adoption is still limited.

## Email Authentication {#autenticazione-delle-email}

If encryption protects the *content*, authentication protects the *identity*. How do you know that an email from `bank@example.com` actually comes from your bank and not from a scammer?

### SPF: the guest list

SPF (Sender Policy Framework) works like a guest list at a party. The owner of a domain publishes a DNS record listing all the servers authorized to send email for that domain.

When the recipient's server receives an email, it checks: "Is this server on the authorized list?" If not, the email is suspicious.

**SPF's limitations:**
- It relies on DNS, which has no authentication mechanisms of its own
- It doesn't verify the individual user, only the server
- It has optional enforcement modes: a domain can configure `-all` (reject anything not on the list), `~all` (accept anyway with a warning), or even `+all` (accept everything). Security depends entirely on the configuration

### DKIM: the digital signature

DKIM (DomainKeys Identified Mail) adds a cryptographic signature to emails. The provider generates a key pair, publishes the public one in DNS, and signs every outgoing email with the private one.

The receiving server verifies the signature: if the message was altered in transit, the signature no longer matches. It's an effective system for detecting tampering.

**Be careful though:** the keys are held by your email provider, not by you. Your provider could theoretically modify a message before signing it. Also, DKIM doesn't encrypt anything — it only verifies the integrity and authenticity of the domain.

### DMARC: the bouncer

DMARC (Domain-based Message Authentication, Reporting and Conformance) is the piece that ties SPF and DKIM together. It tells receiving servers: "If an email fails SPF and DKIM checks, here's what to do."

The possible policies are:
- **none**: do nothing (monitoring only)
- **quarantine**: send to spam
- **reject**: reject completely

A well-configured DMARC record looks like this:

```
v=DMARC1; p=reject; adkim=s; aspf=s;
```

Where `p=reject` says to reject unauthenticated emails, and `adkim=s` / `aspf=s` enforce strict alignment.



### DNSSEC: authenticating DNS itself

SPF, DKIM and DMARC all rely on DNS. But DNS was created in the 1980s with no security whatsoever. An attacker who manages to manipulate DNS responses (cache poisoning) can bypass all of these checks.

A 2014 study from Carnegie Mellon showed that emails apparently coming from Gmail, Yahoo! and Outlook.com could be hijacked through malicious servers. Not exactly reassuring.

DNSSEC solves this problem by digitally signing DNS responses, creating a chain of trust that goes all the way up to the root zone, managed by IANA. It's like a notary certifying that every DNS response is authentic.

### DANE and MTA-STS: forcing encryption

These two protocols tackle the same problem — forcing the use of TLS between email servers — but with different approaches:

- **DANE** relies on DNSSEC and uses TLSA records to bind TLS certificates to DNS names, bypassing traditional CAs
- **MTA-STS** uses HTTPS and the existing web PKI, similar to how HSTS works for websites. It's easier to implement but introduces an additional dependency on CAs

Both are a significant step forward compared to the current situation.

## Email as the Weak Link {#lemail-come-punto-debole}

This is the point that, in my opinion, deserves more attention than any other.

Email has become the default recovery method for practically every online account. Forgot your password? Email. Two-factor verification? Email. Switching devices? Email.

This means **the security of all your accounts depends on the security of your email**. If someone gets into your inbox, they have the keys to the castle.

It's a situation similar to the vulnerability of SMS-based 2FA, with the difference that email is even less secure, because it typically has no end-to-end encryption.

**What you can do today:**
1. Enable two-factor authentication on the email account itself (ideally with a hardware key, not SMS)
2. Where possible, replace email as a recovery method with **recovery codes** stored offline
3. Use email for what it is: messaging and communication, not a universal keyring

### Third-Party Clients and Attack Surface {#client-di-terze-parti-e-superficie-dattacco}

Using a third-party email client (Thunderbird, Apple Mail, etc.) offers flexibility, but adds another link to the chain of trust. Every additional client is a potential entry point for vulnerabilities.

Email clients have a surprisingly large attack surface: many of them support JavaScript and complex HTML, making them almost like web browsers, but without the same level of hardening and scrutiny. And since anyone can send you an email at any time, the client has to constantly defend itself against potentially malicious content.

I strongly recommend disabling the loading of remote images and the execution of HTML/JavaScript wherever possible. It's not convenient, but it's safer.

## The Future of Email Security

So far the picture isn't exactly rosy. But there are promising developments on the horizon that could change things significantly.

### Improvements to OpenPGP

The IETF working group is working on important updates:
- **Post-quantum cryptography**: protection against future quantum computers
- **Forward secrecy**: finally! If a key is compromised, past messages remain protected
- **Key Transparency**: public, verifiable, tamper-proof logs for keys, similar to what WhatsApp has implemented. This could make key verification automatic and transparent
- **QR code verification**: like in modern messengers, to verify contacts' identity in person

### Improvements to S/MIME

The LAMPS working group is focused on post-quantum cryptography, with "dual signature" schemes that combine traditional and post-quantum cryptography. A cautious approach: if one of the two systems is broken, the other still protects you.

### DKIM2: putting a stop to mass spam

The current version of DKIM has a serious problem: an attacker can take a legitimately signed email and resend it thousands of times from different domains, ruining the reputation of the original domain.

DKIM2 solves this by requiring that **every hop signs the message**, making it possible to attribute the abuse to the exact point in the chain. It also simplifies the standard by removing confusing options and fixing a set of headers to sign consistent with best practices.

### DMARCbis: more rigor, fewer loopholes

The new evolution of DMARC aims to make policy management clearer and more rigorous, reducing some of the historical ambiguities of the current standard. Among the issues addressed are better handling of non-existent subdomains and more explicit testing mechanisms, in order to limit some of the techniques used to bypass the checks.

### Goodbye to plaintext email

With transport encryption protocols available at every level, it's essential that providers work to **completely eliminate support for unencrypted email**. Transport encryption should become the minimum requirement, not an option.

### Passkeys and the Future of Authentication {#passkey-e-il-futuro-dellautenticazione}

The adoption of passkeys could finally break the dependency on email for account recovery. If you no longer need a password, you don't need an email to reset it.

This would free email from its improper role as a "master key" and return it to its natural function: communication. Many services that support passkeys still require an email, but the direction is the right one.

### Native end-to-end encryption in SMTP

This is the final goal. Today, providers like Proton Mail automatically encrypt emails between Proton users with end-to-end encryption. But it's a proprietary solution that only works within the fence.

Integrating E2EE directly into the SMTP protocol would mean that **any** email, between **any** providers, could be end-to-end encrypted by default. RFC proposals already exist in this direction. It won't be a walk in the park, but it's the future we deserve.

## Conclusion

Email security is a maze of protocols, acronyms and trade-offs. But the good news is that the situation is improving. DKIM2, DMARCbis, post-quantum cryptography and native E2EE in SMTP are all concrete developments, not science fiction.

**What you can do today, right now:**
1. Check that your email provider supports SPF, DKIM and DMARC with strict policies
2. Enable 2FA on your email account with a hardware key
3. Disable HTML and remote images in your email client
4. Replace email as a recovery method with offline codes where possible
5. Consider providers with built-in E2EE like Proton Mail for sensitive communications

If you've made it this far, congratulations: you now know more about email security than most people out there. Well done, you're true armored turtles! 🐢

Thanks so much for reading! If this guide was useful to you, share it with anyone who might need it.

---

## Related Guides

- **[How to Build a Threat Model](/threat-model)** - The first step to actually protecting your online privacy
- **[Self-Hosted VPN with Wireguard](/vpn)** - Build your own personal VPN with built-in ad-blocking
- **[The Definitive Guide to GrapheneOS](/graphene)** - The most secure mobile operating system in the world

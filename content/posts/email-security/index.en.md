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

> **TL;DR** — In this guide, you will learn:
> - How email encryption works and why STARTTLS is insufficient.
> - How SPF, DKIM, and DMARC prevent spoofing.
> - Why email is the single point of failure (weakest link) for account security.
> - Future developments: native end-to-end encryption, DKIM2, and the deprecation of plaintext email.

## Summary

Email is not secure by design. It fails to protect metadata, relies on hop-by-hop encryption rather than end-to-end security, and acts as the master password-recovery key for almost all online accounts. To mitigate these risks, you should enable hardware-based multi-factor authentication (MFA), choose a secure provider, disable HTML and remote images in your email client, configure offline backup codes for third-party accounts, and secure your email domains using SPF, DKIM, and DMARC.

Email is the invisible backbone of your digital life. Every account you create, every password you reset, every important communication... almost always passes through email. But have you ever wondered how secure it actually is?

The answer, unfortunately, is: less than you think. Email is a protocol born in the 1980s, when cybersecurity was not exactly a priority. Layer after layer of protections has been added since then, but the result is a complex, fragmented, and often misconfigured system.

In this guide we'll go through the current state of email security together, from encryption to authentication, and take a look at what the future holds. Keep your eyes open, because there are quite a few surprises.

## Email Encryption {#crittografia-delle-email}

How are your emails protected in transit and at rest? The current standards are complex and often fall short of modern security expectations.

### STARTTLS: The Removable Lock

STARTTLS is the most common protocol for securing email in transit. It commands a plaintext SMTP connection to upgrade to a secure TLS tunnel.

The vulnerability is that the upgrade negotiation occurs **in plaintext**. An attacker positioned on your local network or path (MitM) can strip the STARTTLS command from the handshake, forcing the servers to fallback to unencrypted communication. This is known as a **downgrade attack**, and most clients will fail to warn you.

Furthermore, even when negotiation succeeds, STARTTLS only secures the connection **hop-by-hop** (from your client to your provider's server, then from server to server). Because the email is decrypted and re-encrypted at each hop, it is not end-to-end encrypted; any server in the transit path can access its contents.

### SMTPS (Implicit TLS)

SMTPS (Implicit TLS) fixes the downgrade vulnerability. Instead of starting in plaintext and upgrading, SMTPS establishes an encrypted TLS session immediately at connection startup, similar to HTTPS.

By default, SMTPS operates on port **465**, whereas STARTTLS uses port **587**. Despite being a superior security standard, legacy configurations and historic confusion over ports have slowed its universal adoption.

### POP3S and IMAPS

The retrieval protocols used to download mail from servers also support transport encryption:

*   **POP3S** enforces TLS on port **995**.
*   **IMAPS** enforces TLS on port **993**.

These protocols ensure that your mail client downloads messages over a secure channel, but they do not secure the emails themselves on the servers or in transit across third-party relays.

### OpenPGP: Secure but Complex

Pretty Good Privacy (PGP), created in 1991, remains the standard for true end-to-end email encryption. Using asymmetric cryptography, the sender encrypts the message using the recipient's public key, and the recipient decrypts it using their private key. No intermediate relay can read the message body.

However, PGP has major usability and design issues:

*   **Key Management Complexity**: Generating, distributing, and verifying public keys remains difficult for non-technical users.
*   **Lack of Forward Secrecy**: If your private key is compromised, an adversary who has recorded your network traffic can decrypt **all historical messages** encrypted with that key.
*   **Plaintext Metadata**: OpenPGP does not encrypt headers. The sender, recipient, date, and subject line remain visible to network observers.

### S/MIME: Corporate Verification

S/MIME uses X.509 digital certificates (similar to TLS web certificates) to sign and encrypt emails. It is integrated natively into many corporate email clients, making certificate handling automated.

However, S/MIME certificates are expensive, expire annually, and rely on centralized Certificate Authorities (CAs). Like OpenPGP, S/MIME does not support forward secrecy.

### Web Key Directory (WKD)

WKD is a decentralized standard for PGP public key discovery. Instead of searching key servers, your email client queries the recipient's domain directly (e.g., `https://example.com/.well-known/openpgpkey/...`) to fetch their public key automatically. While convenient, it requires domain-level configuration, and adoption remains low.

## Email Authentication {#autenticazione-delle-email}

If encryption secures your content, authentication verifies your identity. How can you verify that an email claiming to be from `bank@example.com` is legitimate?

### SPF: The Sender Guest List

Sender Policy Framework (SPF) is a DNS record where the domain owner lists all IP addresses and servers authorized to send emails on their behalf.

When a server receives an email, it looks up the SPF record of the sender's domain. If the sending IP is not on the list, the email fails authentication.

**Limitations**:
*   SPF does not verify the individual sender, only the sending server's IP address.
*   It breaks when emails are forwarded, as the forwarding server's IP will not match the original sender's domain SPF record.
*   Domain owners can configure varying enforcement flags: `~all` (soft fail, warning only) or `-all` (hard fail, reject). Many domains use soft fail, reducing the security benefit.

### DKIM: Cryptographic Signature

DomainKeys Identified Mail (DKIM) adds a cryptographic signature to the headers of outgoing emails. The domain owner publishes a public key in their DNS record and signs emails with a private key.

The receiving server fetches the public key and verifies the signature. If any part of the email body or headers was altered in transit, the signature validation fails.

*Note: DKIM signatures are applied by your mail provider, not by your client. While it guarantees domain integrity, it does not encrypt your message content.*

### DMARC: The Policy Enforcer

Domain-based Message Authentication, Reporting, and Conformance (DMARC) coordinates SPF and DKIM. It tells receiving mail servers how to handle emails that fail SPF and DKIM checks.

DMARC policy options include:
*   `p=none`: Monitor and log failed delivery reports only.
*   `p=quarantine`: Route failed emails to the spam folder.
*   `p=reject`: Block delivery of failed emails entirely.

A secure DMARC configuration looks like this:
```text
v=DMARC1; p=reject; adkim=s; aspf=s;
```
Here, `p=reject` blocks unauthenticated mail, and `adkim=s` / `aspf=s` enforce strict domain alignment for DKIM and SPF checks.

### DNSSEC: Securing the DNS Chain

Because SPF, DKIM, and DMARC query DNS, their security relies on the integrity of DNS records. If an attacker performs a DNS cache poisoning attack, they can spoof the DNS records and bypass authentication.

DNSSEC (Domain Name System Security Extensions) solves this by digitally signing DNS records. This creates a cryptographic chain of trust up to the root zone managed by IANA, ensuring your DNS queries are tamper-proof.

### DANE and MTA-STS: Enforcing Transit Security

These protocols prevent attackers from stripping transport security:

*   **DANE (DNS-based Authentication of Named Entities)**: Relies on DNSSEC to bind TLS certificates to mail servers, ensuring clients reject unencrypted or self-signed connections.
*   **MTA-STS (Mail Transfer Agent Strict Transport Security)**: Uses HTTPS and web PKI to declare that a mail server requires TLS. It is simpler to implement than DANE but relies on traditional Certificate Authorities."

## Email: The Weakest Link in Account Security {#lemail-come-punto-debole}

Because email is the default fallback for password resets and multi-factor authentication (MFA) recovery, **the security of almost all your online accounts depends entirely on the security of your inbox**. If an attacker gains access to your email account, they can reset the passwords of your banking, social media, and cloud hosting accounts.

### Recommendations to Secure Your Inbox:

1.  **Hardware Multi-Factor Authentication (MFA)**: Enable 2FA on your email account using a FIDO2 hardware key (like a YubiKey) rather than insecure SMS or authenticator apps.
2.  **Use Backup Codes**: For critical accounts, replace email-based recovery options with offline, physical backup codes stored in a secure location.
3.  **Use Email Solely for Communication**: Do not use your primary inbox as a master recovery vault.

### Client Attack Surfaces {#client-di-terze-parti-e-superficie-dattacco}

Using desktop email clients (e.g., Thunderbird, Apple Mail) increases your local attack surface. Because email clients process HTML, CSS, and occasionally JavaScript, they function like web browsers but without equivalent sandboxing.

Since anyone can send an email to your address at any time, a vulnerability in your mail client's parsing engine can lead to local code execution.

**Best Practice**: Configure your mail client to display emails in plaintext by default and disable the automatic loading of remote images. This prevents tracking pixels and blocks client exploits."

## The Future of Email Security

Several protocols are in development to address email's historical design flaws:

### OpenPGP Modernization

The IETF is developing updates to the OpenPGP standard:
*   **Post-Quantum Cryptography**: Upgrading encryption algorithms to resist future quantum attacks.
*   **Forward Secrecy**: Implementing ephemeral key exchanges so compromising a master key does not compromise historical traffic.
*   **Key Transparency**: Using public, append-only logs (similar to WhatsApp's cryptographic verification) to verify public keys automatically without manual key exchanges.

### S/MIME Updates

The LAMPS working group is standardizing hybrid signature systems, combining classical and post-quantum cryptography to ensure long-term message integrity.

### DKIM2: Mitigating Reply Attacks

Under the current DKIM standard, a malicious actor can take a signed message and resend it at scale (a reply attack) to damage the sender's reputation. DKIM2 will require **every intermediate transit hop to sign the message**, making mail routing fully auditable.

### DMARCbis: Eliminating Loopholes

DMARCbis clarifies policy ambiguities in the original DMARC specification, addressing subdomain spoofing and improving alignment verification to reduce deliverability bypasses.

### Deprecating Plaintext Transport

Major mail providers are moving toward **completely deprecating unencrypted email transport**. Encrypted TLS transit will eventually become a hard requirement rather than an optional negotiation.

### Passkeys: Decoupling Recovery

The adoption of WebAuthn passkeys allows users to register accounts without passwords. This reduces the need for email-based password resets, decoupling account recovery from your inbox.

### SMTP Native End-to-End Encryption

Currently, providers like Proton Mail encrypt emails natively only when both the sender and recipient use their service. The long-term goal is integrating native end-to-end encryption directly into the SMTP protocol itself, allowing cross-provider E2EE by default.

---

## Conclusion

Securing email requires managing a complex stack of legacy protocols. However, the adoption of modern authentication standards and the transition toward native E2EE are positive developments.

### Quick Action Items:

1.  Verify that your email provider enforces SPF, DKIM, and DMARC.
2.  Secure your mail account with a hardware FIDO2 key.
3.  Configure your client to block remote images and render plaintext.
4.  Remove email recovery methods from critical accounts, using offline backup codes instead.
5.  Use end-to-end encrypted mail services (like Proton Mail) for sensitive exchanges.

You are now equipped with the knowledge to protect your inbox and secure your digital identity. 🐢

---

## Related Guides

- **[How to Build a Threat Model](/threat-model)** — Define your assets, threats, and security boundaries.
- **[Self-Hosted VPN with Ad Blocking](/vpn)** — Build your own VPN with WireGuard and Pi-hole.
- **[The Definitive Guide to GrapheneOS](/graphene)** — Secure your mobile operating system.

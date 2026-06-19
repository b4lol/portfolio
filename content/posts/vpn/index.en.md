---
title: "Self-Hosted VPN: WireGuard + Pi-hole + Unbound"
description: "Build your own private VPN with WireGuard, Pi-hole and Unbound DNS. Block ads and trackers without trusting commercial providers. Full guide."
summary: "Build your own private VPN with WireGuard, Pi-hole and Unbound DNS. Block ads and trackers without trusting commercial providers. Full guide."
keywords: ["self-hosted vpn", "vpn guide", "wireguard setup", "pi-hole", "unbound dns", "wireguard tutorial", "vpn privacy", "personal vpn server"]
author: "b4lol"
date: 2026-01-15
lastmod: 2026-05-05
url: /vpn
series: ["Digital Privacy", "Security"]
topics: ["self-hosting"]
faq:
  - question: "Why build a self-hosted VPN instead of using a commercial VPN?"
    answer: "Commercial VPNs often make money by selling your data. With a self-hosted VPN you have full control over the connection, you can add filters for ads and trackers, and you can choose the country where the server is located."
  - question: "What components do I need for this setup?"
    answer: "You need three components: WireGuard as the VPN server to encrypt your traffic, Pi-hole to block ads and trackers at the DNS level, and Unbound as a local DNS resolver so you don't depend on third parties."
  - question: "How much does it cost to run a self-hosted VPN?"
    answer: "The cost depends on the VPS provider you choose and changes often. An entry-level setup typically starts at just a few euros a month, but it's always worth checking current pricing, included bandwidth and policies before buying."
  - question: "Which operating system should I install on the VPS server?"
    answer: "A Debian-based distribution such as Debian or Ubuntu is recommended. The WireGuard and Pi-hole installation scripts are optimized for these distributions."
  - question: "How do I connect my devices to the VPN?"
    answer: "Install the WireGuard app on your device, generate the configuration on the VPS using the script, and scan the QR code from your phone. On Linux PCs, save the .conf file in /etc/wireguard and use wg-quick to bring up the connection."
  - question: "How do I check that the VPN and ad blocking are working correctly?"
    answer: "Visit vpntesting.com to check that your IP matches the VPN server's IP. Then test the adblocker at d3ward.github.io/toolz/adblock.html: a result above 70-80% means everything is working."
  - question: "Does a self-hosted VPN make me completely anonymous?"
    answer: "No. The outgoing IP is used only by you, which makes it easier to track than a shared VPN IP. The VPS provider can also see your real IP, so it's important to choose it carefully."
howto:
  name: "How to build a self-hosted VPN with WireGuard, Pi-hole and Unbound"
  description: "Procedure for choosing a VPS, installing WireGuard, adding DNS-level blocking with Pi-hole, and using Unbound as a local resolver."
  totalTime: "PT1H30M"
  supply:
    - "Debian or Ubuntu VPS server"
    - "Domain name or public IP address"
  tool:
    - "SSH"
    - "WireGuard"
    - "Pi-hole"
    - "Unbound"
  steps:
    - name: "Choose the VPS provider"
      text: "Evaluate jurisdiction, costs, included bandwidth, payment methods and the provider's policies before buying the server."
      url: "/vpn#scelta-dellhosting-provider"
    - name: "Connect to the server via SSH"
      text: "Log in to the VPS over SSH, update the system and prepare the installation environment."
      url: "/vpn#connessione-al-server-vps-con-ssh"
    - name: "Install WireGuard"
      text: "Set up WireGuard as the VPN server and generate client profiles for the devices that will use the tunnel."
      url: "/vpn#setup-della-vpn"
    - name: "Configure Pi-hole and Unbound"
      text: "Install Pi-hole to filter ads and trackers, then configure Unbound as the local DNS resolver."
      url: "/vpn#configurazione-pihole-e-adlists"
    - name: "Export and test the configurations"
      text: "Import the WireGuard profiles on your clients and check the public IP, DNS leaks and ad blocking."
      url: "/vpn#test-di-funzionamento"
---

> **TL;DR** — In this guide, you will learn:
> - How to select a privacy-conscious VPS hosting provider.
> - How to install and configure WireGuard as a lightweight VPN server.
> - How to integrate Pi-hole to block ads, telemetry, and trackers at the DNS level.
> - How to configure Unbound as a recursive, local DNS resolver to eliminate third-party DNS dependencies.

## Summary

A self-hosted VPN combining WireGuard, Pi-hole, and Unbound encrypts the traffic between your local devices and your remote Virtual Private Server (VPS), blocks a significant portion of ads and tracking telemetry at the DNS level, and processes domain name resolution locally without relying on commercial third-party DNS providers. Note that a self-hosted VPN does not grant complete anonymity; it shifts your trust from a commercial VPN provider to your VPS host.

Commercial VPN services frequently monetize user metadata and logs. The alternative is hosting your own personal VPN tunnel. By deploying WireGuard, Pi-hole, and Unbound, you establish a secure connection with integrated ad blocking and independent recursive DNS resolution under your control.

This guide provides a comprehensive walkthrough for deploying this integrated stack on a Debian-based system.

This is meant to be a complete guide for setting up your own VPN using WireGuard, with ad and tracker filtering provided by an AdBlocking filter built with Pi-hole.

This guide is open to improvements and suggestions. I'll describe the configuration that I find offers the best balance between usability and privacy; I'm not a networking expert, and following this guide won't magically make you anonymous and untraceable.

If you'd like to give me suggestions, contribute to the guide, or help with translations, you can open a pull request on [GitHub](https://github.com/b4lol/portfolio).

## Objective

The objective of this deployment is to run a self-hosted VPN with DNS-level ad and tracker filtering. Consider these architectural trade-offs compared to commercial VPN solutions:

### Pros

* **Data Sovereignty**: You eliminate the risk of a commercial VPN provider logging your browsing metadata or selling your profile.
* **Custom Filtering**: You control the exact blocklists deployed on your DNS firewall.
* **Administrative Control**: You can share access with family members, configure routing tables, and choose the server's physical hosting location.
* **Jurisdiction Selection**: You can deploy the server in countries with strong legal protections for digital privacy (e.g., Iceland or Switzerland).

### Cons

* **Unique IP Footprint**: Unlike commercial VPNs that pool thousands of users under a single public IP, a self-hosted VPN assigns you a dedicated public IP address. Because you are the sole user of that IP, tracking networks can easily correlate your activity back to your physical device.
* **Shifting Trust**: You shift your trust from the VPN provider to your VPS hosting provider, who can monitor inbound traffic logs. To mitigate this, select a hosting provider that requires minimal personal data and supports anonymous payment methods.

## Choosing a Hosting Provider {#scelta-dellhosting-provider}

Select a VPS provider operating in a favorable legal jurisdiction (such as countries outside the Five Eyes alliance with robust data retention policies). Look for hosts that support anonymous registration (no phone verification) and cryptocurrency payments.

Recommended providers for personal VPN hosting:

* **[VPSbg](https://www.vpsbg.eu/aff/1e5d9e)**: A Bulgarian-based host with a strong reputation for privacy and support for Bitcoin payments.
* **[1984 Hosting](https://1984.hosting/)**: Located in Iceland, utilizing green energy and operating under strict Icelandic data protection laws.
* **[Njalla](https://njal.la/)**: A privacy-focused domain and hosting provider that acts as a proxy registration layer, requiring no personal identification.

Before purchasing, verify current pricing, monthly egress bandwidth limits, and confirm the provider's policies allow running personal VPN tunnels.

*Recommendation*: Purchase a Virtual Private Server (VPS) running a Debian-based distribution (Debian Stable or Ubuntu LTS).

## Establishing an SSH Connection {#connessione-al-server-vps-con-ssh}

To configure your server, connect over SSH from your local terminal:

```bash
ssh root@<YOUR_VPS_IP>
```

Enter your administrative password. Once connected, update the system package database:

```bash
sudo apt update && sudo apt upgrade -y
```

### Basic Security Hardening

To mitigate automated brute-force attacks on your SSH port, install `fail2ban`:

```bash
sudo apt install fail2ban -y
```

*Note: For production environments, configure key-based SSH authentication and disable password login entirely inside `/etc/ssh/sshd_config`.*

## System Configuration {#setup-della-vpn}

### 1. WireGuard Installation
Use an open-source installer script to automate the initial WireGuard network interface configuration and IP forwarding rules:

```bash
curl -O https://raw.githubusercontent.com/angristan/wireguard-install/master/wireguard-install.sh
chmod +x wireguard-install.sh
sudo ./wireguard-install.sh
```

Follow the prompts to configure your public IP, interface name, and port.

### 2. Pi-hole DNS Firewall Installation
Run the official Pi-hole installation script:

```bash
curl -sSL https://install.pi-hole.net | bash
```

During the wizard configuration:
* Set the active interface to **`wg0`** (the WireGuard interface).
* Choose a temporary upstream DNS provider (e.g., Cloudflare). We will configure our local recursive resolver next.

Once the setup completes, set a password for the web administrative dashboard:
```bash
pihole setpassword
```

### 3. Unbound Recursive Resolver Installation
Install Unbound to handle DNS resolution recursively directly from root name servers, eliminating dependencies on third-party resolvers:

```bash
sudo apt install unbound -y
```

Create a new configuration file `/etc/unbound/unbound.conf.d/pi-hole.conf`:
```bash
sudo nano /etc/unbound/unbound.conf.d/pi-hole.conf
```

Paste the following configuration:

```text
server:
    verbosity: 0
    interface: 127.0.0.1
    port: 5335
    do-ip4: yes
    do-udp: yes
    do-tcp: yes
    do-ip6: yes
    prefer-ip6: no
    harden-glue: yes
    harden-dnssec-stripped: yes
    use-caps-for-id: no
    edns-buffer-size: 1472
    prefetch: yes
    prefetch-key: yes
    minimal-responses: yes
    cache-min-ttl: 300
    cache-max-ttl: 86400
    serve-expired: yes
    msg-cache-size: 50m
    rrset-cache-size: 100m
    num-threads: 1
    so-reuseport: yes
    so-rcvbuf: 4m
    so-sndbuf: 4m
    private-address: 192.168.0.0/16
    private-address: 169.254.0.0/16
    private-address: 172.16.0.0/12
    private-address: 10.0.0.0/8
    private-address: fd00::/8
    private-address: fe80::/10
```

Restart Unbound to apply:
```bash
sudo systemctl restart unbound
```

Configure Pi-hole to route all upstream requests to Unbound locally on port `5335`:

```bash
sudo pihole-FTL --config dns.upstreams '["127.0.0.1#5335"]'
sudo pihole-FTL --config dns.listeningMode 'local'
sudo pihole-FTL --config dns.dnssec 'false'
```

## Configuring Pi-hole and Adlists {#configurazione-pihole-e-adlists}

Log into your administrative dashboard by navigating to:
```text
http://<YOUR_VPS_IP>/admin
```

Enter your administrative password.

### Adding Blocklists
1. Navigate to **Adlists** in the dashboard settings.
2. Add lists containing known tracking and advertising domains. The following lists are recommended for a balanced configuration:

```text
https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts
https://adaway.org/hosts.txt
https://v.firebog.net/hosts/AdguardDNS.txt
https://v.firebog.net/hosts/Easyprivacy.txt
https://winhelp2002.mvps.org/hosts.txt
```

3. Apply the lists by running the update command under **Tools → Gravity**.

## Connecting Client Devices

### 1. Mobile Devices (Android & iOS)
1. Install the official **WireGuard** app from your store.
2. On the VPS terminal, run the installer script to create a client profile:
    ```bash
    sudo ./wireguard-install.sh
    ```
3. Choose **Add new client** and name the profile.
4. The terminal will output a QR code. Scan the QR code using your mobile WireGuard application.
5. Edit the client tunnel in your app: set the **DNS server** to the internal IP address of your VPS (e.g., `10.0.0.1` or the default gateway assigned by the script).

### 2. Desktop Clients (Windows & Linux)
1. Generate a new client profile via the installer script.
2. Copy the resulting `.conf` profile file to your desktop client.
3. On Linux systems, save the configuration file under `/etc/wireguard/vpn.conf` and control the tunnel using `wg-quick`:

```bash
# Enable the tunnel connection
sudo wg-quick up vpn

# Disable the tunnel connection
sudo wg-quick down vpn
```

## Verification and Testing {#test-di-funzionamento}

Once connected, run the following verification checks:

1. **IP Leak Audit**: Visit [vpntesting.com](https://vpntesting.com/) to verify that your visible public IP matches your remote VPS server rather than your physical network location.
2. **Ad-Blocker Audit**: Visit [d3ward.github.io/toolz/adblock.html](https://d3ward.github.io/toolz/adblock.html) with local browser ad-blockers disabled. A success rate above 70-80% confirms that the DNS firewall is blocking advertising hosts correctly.

## Conclusions

This configuration provides a balanced baseline for secure, self-hosted web transit. You can add or modify DNS blocks and firewall rules to tailor the environment to your operational needs.

---

## Related Guides

- **[Tor Node: Setup Guide](/tor)** — Host a Tor relay to support the anonymous routing network.
- **[How to Build a Threat Model](/threat-model)** — Define your privacy parameters.
- **[GrapheneOS Guide](/graphene)** — Deep-dive into secure mobile environments.
- **[De-Google Android: Complete Privacy Guide](/android)** — Set up a secure mobile platform.

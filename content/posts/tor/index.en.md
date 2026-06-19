---
title: "Tor Node: Complete Setup to Support the Network"
description: "Learn how to set up a Tor node (middle relay or exit) on a VPS or locally. Automated script included. Complete guide."
summary: "Learn how to set up a Tor node (middle relay or exit) on a VPS or locally. Automated script included. Complete guide."
keywords: ["Tor", "tor browser", "tor relay", "tor node", "run a tor relay", "tor relay guide", "host a tor node"]
author: "b4lol"
date: 2026-01-07
lastmod: 2026-05-05
url: /tor
series: ["Security"]
topics: ["self-hosting"]
faq:
  - question: "What is a Tor node and what is it for?"
    answer: "A Tor node is a volunteer-run server that routes Tor network traffic through layers of encryption. The more nodes that exist, the faster, safer, and more censorship-resistant the network becomes."
  - question: "What's the difference between a middle relay and an exit relay?"
    answer: "A middle relay forwards encrypted traffic between other nodes and is safer to run. An exit relay is the last node in the circuit and sends traffic out to the regular Internet, which carries greater risk and responsibility."
  - question: "Is it better to run a Tor node at home or on a VPS?"
    answer: "A home node offers more control and contributes to decentralization, but it reveals that you're running a Tor node. A VPS offers more bandwidth and easier setup, but costs more and gives you less control over the hardware."
  - question: "What are the minimum requirements for a Tor node?"
    answer: "A middle relay needs at least 1 core, 512 MB of RAM, and 2 TB of monthly bandwidth. An exit relay needs at least 1 core, 1 GB of RAM, and 2 TB of monthly bandwidth."
  - question: "How can I check that my Tor node is working correctly?"
    answer: "A few hours after starting it, search for your relay's name on metrics.torproject.org. You can also check the logs with journalctl -xeu tor@default and monitor stats live with nyx."
  - question: "Which operating systems are supported for installing a Tor node?"
    answer: "The automated script supports Debian and Ubuntu. For other operating systems, the official Tor Project website provides specific guides for each OS."
  - question: "How do you configure the bandwidth of a Tor node?"
    answer: "In the /etc/tor/torrc file, you set the weekly bandwidth with the AccountingMax parameter. For example, with 1 TB available per month, you could set 250 GB per week. Accepted units are MB, GB, and TB."
howto:
  name: "How to set up a Tor relay node"
  description: "Procedure to assess the risks, choose between a VPS and a home network, install Tor, and verify that the relay is visible on the network."
  totalTime: "PT1H"
  supply:
    - "VPS server or local machine"
    - "Stable bandwidth connection"
  tool:
    - "SSH"
    - "Tor"
    - "Nyx"
  steps:
    - name: "Assess the risks and location of the node"
      text: "Decide whether to use a VPS or a home network, and choose between a middle relay and an exit relay based on your threat model."
      url: "/tor#set"
    - name: "Install Tor"
      text: "Use the guide's automated script, or install Tor from the official Tor Project repositories."
      url: "/tor#shelter"
    - name: "Configure torrc"
      text: "Set the nickname, contact info, ports, bandwidth, and role of the relay in the configuration file."
      url: "/tor#app"
    - name: "Verify it's working"
      text: "Check the system logs, monitor the relay with Nyx, and look for the node on Tor Metrics after a few hours."
      url: "/tor#email"
---

> **TL;DR** — In this guide, you will learn:
> - How the Tor network and onion routing function to protect user privacy.
> - The trade-offs and risks of running a Tor node on your home network versus a rented Virtual Private Server (VPS).
> - How to install and configure a Tor node (as a middle or exit relay) using an automated bash script or the official Tor Project repository.
> - How to monitor, maintain, and verify your active node.

## Summary

A Tor node is a volunteer-run relay that routes encrypted traffic within the Tor network. To host a relay responsibly, start by deploying a middle relay on a virtual private server (VPS) or a dedicated system, configure realistic bandwidth accounting limits, enable automated security updates, and verify your configuration using Nyx, system logs, and Tor Metrics.

The Tor network is a cornerstone of digital privacy, relied upon by journalists, human rights defenders, and everyday internet users. The network operates entirely on volunteer-run nodes. Increasing the number of active nodes directly enhances network speed, safety, and censorship resistance. This guide outlines how to deploy your own Tor relay node to support the network.

This is meant to be a complete guide to launching a node that supports the Tor network. Before we start, let's briefly explain what this protocol is:

The Tor network, short for \"The Onion Router,\" is an anonymous communication network designed to increase the privacy and security of users on the Internet. Its name comes from the concept of an \"onion,\" since it works by relying on several layers of encryption, similar to the layers of an onion.

Tor's main goal is to make it difficult to track users' online activity, protecting their identity and location. The network works by routing Internet traffic through a series of volunteer-run servers, known as \"Tor nodes,\" operated by volunteers distributed all over the world. Each Tor node strips away one layer of encryption, revealing only the IP address of the previous node, which makes it difficult to trace the traffic back to its origin.

Thanks to this layered approach, Tor provides a significant degree of anonymity to its users, but it's important to note that it doesn't offer total security and can be vulnerable to attacks in certain scenarios. Despite this, the Tor network is widely used by journalists, human rights activists, and users seeking to preserve their online privacy.

For more information, I highly recommend listening to this episode:

## Objective {#os style="color: greenyellow;"}

The goal of this guide is to configure and run a Tor node (locally or on a VPS) while managing the associated operational risks. By hosting a relay, you contribute directly to the speed and robustness of the Tor network.

We cover two setup methods:
1. **Automated Script (Recommended)**: Utilizes a custom Bash script to automate installation and security parameters.
2. **Manual Installation**: Outlines manual repository registration and configuration file overrides.

Before installing, review the security and privacy implications of hosting a node on your home network versus renting a remote server.

## Risk Assessment {#set style="color: greenyellow;"}

Running a Tor node requires matching your hardware configuration to your personal privacy objectives.

### Hosting on a Home Network
* **Pros**: You retain complete physical control over the server hardware and cryptographic keys, preventing third-party access. It is also cost-effective if you reuse existing home hardware (such as a Raspberry Pi).
* **Cons**: Home ISPs often enforce strict monthly bandwidth limits and asymmetric speeds (slower upload rates), limiting the node's throughput. Dynamic IP changes assigned by residential ISPs can also reduce relay stability.
* **Privacy Caveat**: Because Tor relays are public, running a node at home exposes your public residential IP address as associated with the Tor network. Some services or web shops actively block residential IPs that run Tor relays.

### Hosting on a Virtual Private Server (VPS)
* **Pros**: Rented servers offer static IP addresses, high bandwidth, and symmetric speeds. They run in highly reliable data centers with excellent uptime.
* **Cons**: VPS hosting introduces ongoing monthly costs and requires you to trust a third-party host with your data transit.
* **Legal/Policy Compliance**: Managing a rented server requires complying with the Terms of Service (ToS) of your provider and the local jurisdiction of the data center hosting your VPS.

In summary, hosting a home node increases network decentralization and security but leaks the association between your home IP and Tor. Renting a VPS simplifies setup and protects your home IP address, but requires ongoing subscription costs.

## Selecting a Hosting Provider {#store style="color: greenyellow;"}

If you choose to run your node on a VPS, evaluate these factors:

1. **Bandwidth Allocation**: Relays require substantial monthly egress limits. Look for providers offering unmetered ports or high bandwidth caps (5 TB or more).
2. **Server Location & Jurisdiction**: Choose jurisdictions with strong data protection policies and digital civil liberties, as server monitoring laws vary by country.
3. **Tor Compatibility Policies**: Not all VPS providers allow Tor nodes. Verify that your provider explicitly permits running middle or exit relays.

Recommended hosting providers for Tor relays:

* **[VPSbg](https://www.vpsbg.eu/aff/1e5d9e)**: Sofia-based provider with a strong privacy record. They support both middle and exit nodes (provided they are configured with a strict exit policy). They accept anonymous registration and cryptocurrency payments.
* **[Trabia](https://www.trabia.com/)**: Located in Moldova, offering affordable, unmetered bandwidth plans. Useful for hosting middle relays that consume high volumes of traffic.
* **[UDN (Ukrainian Data Network)](https://www.urdn.com.ua/index.html)**: A highly privacy-focused hosting service. Registration does not require web forms; configuration and sales are handled manually via encrypted communication channels.

### System Requirements

* **Middle Relay**: 1 CPU core, 512 MB RAM (1 GB RAM recommended for relay speeds exceeding 40 Mbps), and at least 2 TB (ideally 5 TB+) of monthly bandwidth.
* **Exit Node**: 1 CPU core, 1 GB RAM (2 GB RAM recommended for high-throughput exits), and 5 TB+ of monthly egress traffic.

## Setup via Automated Script (Recommended) {#shelter style="color: greenyellow;"}

This script automates repository configuration, package verification, and baseline hardening for Debian and Ubuntu systems.

Log into your target server via SSH. If you are logged in directly as root, omit the `sudo` command:

```bash
sudo apt-get update && sudo apt-get upgrade -y
sudo apt install git -y
git clone https://github.com/b4lol/Tor-node-script.git
cd Tor-node-script
chmod +x tor.sh 
sudo ./tor.sh
```

The script will fetch the official Tor repositories, check signatures, install dependencies, and prompt you for configuration details:

1. **Node Type**: Choose between a **Middle Relay** (recommended for most users) or an **Exit Node** (advanced users only, requires managing abuse complaints).
2. **Nickname**: A unique name for your relay. Use only letters, numbers, and underscores (no spaces).
3. **Contact Info**: An email address so the Tor Project team can reach you if your node goes offline or exhibits routing errors. To avoid spam, obfuscate the email (e.g., `yourname[at]example[dot]com`).
4. **Bandwidth Accounting**: Set a weekly bandwidth limit. For example, if your VPS cap is 1 TB per month, input `250 GB` (weekly) to ensure you do not exceed the limit.

Once complete, the service will start automatically. You can skip to the [Post-Installation Checks](#email) section.

## Manual Configuration (Alternative) {#app style="color: greenyellow;"}

If you prefer configuring the packages manually, use the official Tor Project repositories to receive timely security updates.

### 1. Enable Automated Security Updates
On any public-facing server, install `unattended-upgrades` to apply kernel patches and security fixes automatically:

```bash
sudo apt install unattended-upgrades apt-listchanges -y
```

### 2. Configure Repository Sources
Install transit dependencies:
```bash
sudo apt install apt-transport-https lsb-release -y
```

Identify your Debian/Ubuntu distribution codename:
```bash
lsb_release -c
```

Create a new sources list file `/etc/apt/sources.list.d/tor.list`:
```bash
sudo nano /etc/apt/sources.list.d/tor.list
```

Insert the following lines, replacing `<distribution>` with your active distribution codename (e.g., `bookworm` or `jammy`):
```text
deb     [signed-by=/usr/share/keyrings/tor-archive-keyring.gpg] https://deb.torproject.org/torproject.org <distribution> main
deb-src [signed-by=/usr/share/keyrings/tor-archive-keyring.gpg] https://deb.torproject.org/torproject.org <distribution> main
```

### 3. Import Tor Project GPG Key
```bash
wget -qO- https://deb.torproject.org/torproject.org/A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89.asc | gpg --dearmor | sudo tee /usr/share/keyrings/tor-archive-keyring.gpg >/dev/null
```

### 4. Install Tor
Update your package index and install the signing keyring along with the Tor daemon:
```bash
sudo apt update
sudo apt install tor deb.torproject.org-keyring -y
```

### 5. Configure torrc Options
Open the main configuration file:
```bash
sudo nano /etc/tor/torrc
```

Clear the contents or append one of the configurations below, replacing variables (`$nickname`, `$contact_info`, `$bandwidth`) with your values:

#### Configuration for a Middle Relay:
```text
Nickname $nickname
ContactInfo $contact_info
AccountingRule sum
AccountingStart week 1 10:00
AccountingMax $bandwidth
ORPort 443
ExitRelay 0
SocksPort 0
```

#### Configuration for an Exit Node (Strict Policy):
```text
Nickname $nickname
ContactInfo $contact_info
AccountingRule sum
AccountingStart week 1 10:00
AccountingMax $bandwidth
ORPort 443
ExitRelay 1
SocksPort 0
ExitPolicy accept *:22        # SSH
ExitPolicy accept *:23        # Telnet
ExitPolicy accept *:43        # WHOIS
ExitPolicy accept *:53        # DNS
ExitPolicy accept *:79        # Finger
ExitPolicy accept *:80-81     # HTTP
ExitPolicy accept *:88        # Kerberos
ExitPolicy accept *:110       # POP3
ExitPolicy accept *:143       # IMAP
ExitPolicy accept *:194       # IRC
ExitPolicy accept *:220       # IMAP3
ExitPolicy accept *:389       # LDAP
ExitPolicy accept *:443       # HTTPS
ExitPolicy accept *:464       # Kpasswd
ExitPolicy accept *:465       # SMTPS
ExitPolicy accept *:531       # IRC/AIM
ExitPolicy accept *:543-544   # Kerberos
ExitPolicy accept *:554       # RTSP
ExitPolicy accept *:563       # NNTP over SSL
ExitPolicy accept *:587       # SMTP submission
ExitPolicy accept *:636       # LDAP over SSL
ExitPolicy accept *:706       # SILC
ExitPolicy accept *:749       # Kerberos
ExitPolicy accept *:853       # DNS over TLS
ExitPolicy accept *:873       # Rsync
ExitPolicy accept *:902-904   # VMware
ExitPolicy accept *:981       # Firewall HTTPS management
ExitPolicy accept *:989-990   # FTP over SSL
ExitPolicy accept *:991       # Netnews
ExitPolicy accept *:992       # Telnet over SSL
ExitPolicy accept *:993       # IMAP over SSL
ExitPolicy accept *:994       # IRC over SSL
ExitPolicy accept *:995       # POP3 over SSL
ExitPolicy accept *:1194      # OpenVPN
ExitPolicy accept *:1220      # QuickTime Admin
ExitPolicy accept *:1293      # IPSec
ExitPolicy accept *:1500      # VLSI
ExitPolicy accept *:1533      # Sametime
ExitPolicy accept *:1677      # GroupWise
ExitPolicy accept *:1723      # PPTP
ExitPolicy accept *:1755      # RTSP
ExitPolicy accept *:1863      # MSNP
ExitPolicy accept *:2082      # Infowave
ExitPolicy accept *:2083      # RadSec
ExitPolicy accept *:2086-2087 # GNUnet
ExitPolicy accept *:2095-2096 # Webmail
ExitPolicy accept *:2102-2104 # Zephyr
ExitPolicy accept *:3128      # Squid
ExitPolicy accept *:3389      # RDP
ExitPolicy accept *:3690      # SVN
ExitPolicy accept *:4321      # RWHOIS
ExitPolicy accept *:4643      # Plesk
ExitPolicy accept *:5050      # Yahoo Messenger
ExitPolicy accept *:5190      # AOL
ExitPolicy accept *:5222-5223 # XMPP
ExitPolicy accept *:5228      # Google Play Store
ExitPolicy accept *:5900      # VNC
ExitPolicy accept *:6660-6669 # IRC
ExitPolicy accept *:6679      # IRC over SSL
ExitPolicy accept *:6697      # IRC over SSL
ExitPolicy accept *:8000      # SHOUTcast
ExitPolicy accept *:8008      # Alternative HTTP
ExitPolicy accept *:8074      # Gadu-Gadu
ExitPolicy accept *:8080      # Alternative HTTP
ExitPolicy accept *:8082      # Electrum HTTPS
ExitPolicy accept *:8087-8088 # Media servers
ExitPolicy accept *:8332-8333 # Bitcoin
ExitPolicy accept *:8443      # PCsync HTTPS
ExitPolicy accept *:8888      # Alternative HTTP
ExitPolicy accept *:9418      # Git
ExitPolicy accept *:9999      # Urchin
ExitPolicy accept *:10000     # Webmin
ExitPolicy accept *:11371     # OpenPGP HKP
ExitPolicy accept *:19294     # Google Voice
ExitPolicy accept *:19638     # Ensim
ExitPolicy accept *:50001-50002 # Electrum SSL
ExitPolicy accept *:64738     # Mumble
ExitPolicy reject *:*
```

## Post-Installation Management {#email style="color: greenyellow;"}

After editing `torrc`, restart the Tor service to apply the configuration:

```bash
sudo systemctl restart tor@default
```

### 1. Troubleshooting Logs
Check the system daemon logs to verify the initialization sequence and identify parsing errors:

```bash
sudo journalctl -xeu tor@default
```

### 2. Live Status Monitoring (Nyx)
Nyx is a command-line interface monitor that displays active connections, bandwidth usage, and node status. Install it using your package manager:

```bash
sudo apt install nyx -y
```

Launch the monitor:
```bash
sudo -u debian-tor nyx
```

## Verifying Network Visibility {#cloud style="color: greenyellow;"}

Within 2 to 4 hours of starting, your relay should be indexed on the Tor Project metrics server. Search for your node nickname or public IP address on:
[Tor Metrics Relay Search](https://metrics.torproject.org/rs.html)

If your node appears in the search index, it is routing traffic on the network.

## Conclusion {#conc style="color: greenyellow;"}

Your Tor relay is now active and routing encrypted traffic. Keep the host OS updated, check Nyx occasionally, and monitor your monthly egress limits to ensure you remain within your hosting bandwidth caps. 🐢

---

## Related Guides

- **[Self-Hosted VPN with WireGuard](/vpn)** — Build your own VPN with integrated DNS ad-blocking.
- **[How to Build a Threat Model](/threat-model)** — Define your assets and adversarial boundaries.
- **[GrapheneOS: The Definitive Guide](/graphene)** — Harden your mobile device.

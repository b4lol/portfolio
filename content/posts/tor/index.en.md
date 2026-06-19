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

> **TL;DR** - In this guide you'll learn:
> - What the Tor network is and how onion routing works
> - How to weigh the risks between a home node and a rented VPS
> - How to install a Tor node (middle or exit relay) using an automated script or the official Tor Project packages
> - How to verify that your relay is working correctly

## Summary

A Tor node is a volunteer-run server that forwards traffic on the Tor network. To contribute responsibly, it's best to start with a middle relay on a VPS or dedicated machine, set realistic bandwidth limits, keep the system updated, and verify the relay through logs, Nyx, and Tor Metrics.

The Tor network is one of the fundamental pillars of online privacy, used by journalists, activists, and anyone who wants to protect themselves from surveillance. But Tor only works thanks to the volunteers who make their own nodes available. The more nodes that exist, the faster, safer, and more censorship-resistant the network becomes. This guide shows you how to actively contribute to the Tor network by setting up your own relay node in just a few steps.

This is meant to be a complete guide to launching a node that supports
the Tor network. Before we start, let's briefly explain what this
protocol is:

The Tor network, short for "The Onion Router," is an anonymous
communication network designed to increase the privacy and security
of users on the Internet. Its name comes from the concept of an "onion,"
since it works by relying on several layers of encryption,
similar to the layers of an onion.

Tor's main goal is to make it difficult to track users' online
activity, protecting their identity and location. The network
works by routing Internet traffic through a series of volunteer-run
servers, known as "Tor nodes," operated by
volunteers distributed all over the world. Each Tor node strips away one
layer of encryption, revealing only the IP address of the
previous node, which makes it difficult to trace the traffic back to its origin.

Thanks to this layered approach, Tor provides a
significant degree of anonymity to its users, but it's important to note that it doesn't
offer total security and can be vulnerable to attacks in certain
scenarios. Despite this, the Tor network is widely used by
journalists, human rights activists, and users seeking to
preserve their online privacy.

For more information, I highly recommend listening to this
episode:



## Goal {#os style="color: greenyellow;"}

The ultimate goal of this guide is to host a Tor node
(locally or on a VPS) by weighing the various benefits and risks. By the end
of this guide you'll officially be helping the network, making your own
contribution to making it more secure and resistant to attacks.
There are 2 ways to follow this guide:

-   With an automated script created by me (recommended)
-   With a manual installation from the official Tor Project packages

Before moving on to the actual installation, in the
next section we'll go over the risks and benefits of running a node
on your own home network versus a rented server.

## Risk assessment {#set style="color: greenyellow;"}

Installing a Tor node, whether on a home network or a
rented server online, requires a careful assessment of
individual needs. In the context of a home network, one of the
main advantages is having complete control over the infrastructure,
allowing you to customize the configuration according to your
needs. Additionally, running a Tor node at
home can be cheaper, especially if you already have
the necessary hardware.

However, there are some downsides to consider.
Home connections often have bandwidth
limits, which affect the overall speed of the Tor node. Additionally,
the Internet connection might not always guarantee an optimal
level of reliability, and dynamic IP addresses assigned
by providers could make the node less stable over time. One
final downside worth noting is that running a node on your own
home network publicly admits that you have a Tor node at home, which
some privacy enthusiasts may find to be an annoying issue
to deal with.

On the other hand, using a rented server online offers
advantages such as high bandwidth, greater reliability, and the
possibility of having a static IP address. However, this option
comes with higher monthly costs and may limit your
direct control over the hardware compared to a home setup.

It's also worth considering that remotely managing a rented server
may require compliance with the laws and policies of the country
where the server is hosted. In conclusion, the choice between a Tor node
on a home network and on a rented server depends on various factors,
including the desired level of local control, your available
budget, the bandwidth needed, and compliance with local
laws.

To sum up: a home node provides greater security and
decentralization to the network, the main downsides being that it leaks
the fact that you're running a Tor node at your home, and
you might have a bit more trouble managing the various permissions
of your local network. When it comes to rented servers online
(I'll recommend a few later in the guide), setup will be
easier and faster, but at the cost of higher prices and less
direct control over the hardware.

## Choosing a hosting provider {#store style="color: greenyellow;"}

When you're about to rent a Virtual Private Server (VPS) to
host a Tor node, it's essential to pay attention to several
parameters in order to ensure a reliable and secure experience:

First of all, the bandwidth provided by the VPS plays a
crucial role, directly affecting the speed and stability of the node.
Adequate bandwidth is essential to efficiently handle
traffic on the Tor network.

The server's location is another aspect worth evaluating
carefully. Choosing a strategic geographic location can
improve the node's overall performance, reducing latency for
users connecting through it. It also has
important implications, since computer laws that your provider
must comply with change depending on jurisdiction.

The VPS provider's privacy policy is just as critical.
Verifying that the provider respects users' privacy and doesn't
log or monitor sensitive activity is essential to maintaining
a node that's useful to the network.
It's also advisable to opt for a VPS with a static IP address
(almost all of them provide one), since that will help ensure
the Tor node's long-term stability.

Finally, looking into the security options provided by the provider, such as
firewalls and encryption, is a fundamental aspect for
protecting the Tor node from potential external threats.

By carefully evaluating these parameters, you can
select a VPS that meets the requirements needed to reliably and
securely host a Tor node.

Here's a list of what I consider the best options for hosting a node:

-   [VPSbG](https://www.vpsbg.eu/aff/1e5d9e) in my opinion offers the best
    balance of power, bandwidth, privacy, usability, and accepted
    payment methods. Not the cheapest, but the one that offers the
    best overall experience. Servers in Bulgaria, and they accept both middle
    and exit nodes (if configured correctly, which my script already does
    automatically).
-   [UDN](https://www.urdn.com.ua/index.html), i.e. the Ukrainian Data
    Network, offers VPSs in a genuinely super privacy-friendly way, and by
    super privacy-friendly I mean that the only way to buy one is to message
    one of the admins on XMPP — there's no other way to purchase, and there's
    no account to create. Affordable VPSs, not very powerful, but
    with plenty of bandwidth available (10-15 TB).
-   [Trabia](https://www.trabia.com/) is a VPS provider in Moldova, with
    great prices, not very powerful VPSs but UNLIMITED bandwidth, a real
    rarity at these prices. Privacy-wise it's decent but not amazing,
    they accept bitcoin but ask you to provide some personal
    details. From personal experience, the details can all be
    fake but they need to look credible (use a real-looking address and location,
    believable first and last names, etc.).

As requirements for Tor nodes, it's advisable to have:

-   Middle relay: at least 1 core, 512MB of RAM, and 2 TB of bandwidth per
    month, although it's advisable to have at least 5 TB. For very
    fast relays (above 40mb/s connection speed you'll need at least
    1GB of RAM).
-   Exit nodes: at least 1 core, 1GB of RAM, and 2 TB of bandwidth per
    month, although it's advisable to have at least 5 TB. For very
    fast relays (above 40mb/s connection speed you'll need at least 2GB of
    RAM).

Once you've purchased a VPS (if applicable), we can move straight on to
configuration!

## Setting up the node with the automated script (recommended) {#shelter style="color: greenyellow;"}

Let's start the guide with what I think is the fastest and most efficient
method: the bash script I developed myself. The requirements are having
any PC, VPS, or Raspberry Pi ready, with Debian or Ubuntu installed.
Once you're connected to the shell of your machine (which from now on will refer to
whichever option you chose, home hardware or VPS),
remember that if you have an online VPS with root access you should omit
the word sudo at the beginning of the lines below. You can now run
the following commands:
```
sudo apt-get update && sudo apt-get upgrade -y
sudo apt install git
git clone https://github.com/b4lol/Tor-node-script.git
cd Tor-node-script
chmod +x tor.sh 
sudo ./tor.sh
```                            

These lines of code perform the following operations: update the
operating system (Ubuntu or derivatives), install Git, clone the
repository from GitHub, navigate into the cloned directory, grant
execution permissions to the script, and finally run tor.sh.

At this point the tor script will start, it will update your operating
system, install all the dependencies, verify the PGP signatures,
install tor, and ask you a few inputs to customize your
experience:

1.  **Middle Relay or Exit?**\
    In the podcast episode I go over the differences between these two types
    of nodes; the middle relay is easier to manage, doesn't carry particular
    risks, and is the recommended option for the average user. The exit
    relay is the hardcore version, for users who are a bit more experienced than the previous relay
    type. If you're not an experienced user, select the middle
    relay option by typing the number assigned to it.
2.  **Nickname:**\
    In this section we need to type the name we want to give to
    our Tor node. Avoid names that are too long and don't use spaces; the
    only allowed characters are letters, numbers, and underscores.
3.  **Email:**\
    This section should be used to provide a contact through which
    the Tor Foundation can reach you in case of very serious problems with your node. Be
    careful, you're exposing an email online linked to
    a Tor node. 3 options could be: putting your own contact
    but written in a strange way so that online bots don't recognize the
    text as an email (example
    [yourname][@][example].[com]), writing "redacted"
    to avoid giving any data, or leaving a bitcoin/lightning
    address for donations (you probably won't receive any).
4.  **Bandwidth:**\
    In this field we'll need to state the weekly bandwidth allotted to the
    node. The usable units are (MB / GB / TB); if you have 1 TB
    of bandwidth available on your node you could write in the bandwidth
    field (which is meant as weekly) 250 GB (which over 4 weeks
    comes out to 1 TB per month). Respect the number, space, unit of measure
    formatting.

Congratulations, you're done! If you run into errors during the script you can
open an issue on [my
GitHub](https://github.com/b4lol/Tor-node-script) or double-check
that the entries in the /etc/tor/torrc file are correct. You can now
jump straight to the section on [post-installation
checks](#email).

## Manual setup from the official repository {#app style="color: greenyellow;"}

If you go down this path, forgive me, but I won't be able to assist you,
since there are many possible mistakes you can make along the way and
they're hard to find. In this section of the guide we'll redo everything
that my script does automatically, but by hand. This guide is written for
Debian-based operating systems; if you want to use a different OS,
the [Tor Project's website](https://community.torproject.org/relay/setup/)
has guides for every system.

**Note:** we're not compiling Tor from local source. The path below uses the **official packages** from the Tor Project, which in 2026 remain the most sensible choice for getting updates and orderly maintenance on Debian/Ubuntu.

Prerequisites:

-   Have a Debian-based PC ready to use, with a shell open
-   Enable automatic updates on your machine; you can follow
    [this
    guide](https://community.torproject.org/relay/setup/guard/debian-ubuntu/updates)
    to set them up. It's not a mandatory step but it's very, very,
    veeeeery recommended. If you skip this section you'll have to
    manually log into the Tor node and update it by hand
    every 1-2 months.
-   install tor by adding the repository and the PGP key:\
    1.  Install the dependencies:
```
apt install apt-transport-https
 ```                                                           

    2.  check the name of your distribution and note it
        down (examples: bookworm, focal-fossa, bullseye, etc.)
```
lsb_release -c
```                                                     

    3.  Create a new file in the /etc/apt/sources.list.d/
        folder called tor.list (to do this, use the command: nano
        /etc/apt/sources.list.d/tor.list) and insert the lines
        below, remembering to replace the distribution tag with
        the name you noted down earlier.
```
deb     [signed-by=/usr/share/keyrings/tor-archive-keyring.gpg] https://deb.torproject.org/torproject.org <distribution> main
deb-src [signed-by=/usr/share/keyrings/tor-archive-keyring.gpg] https://deb.torproject.org/torproject.org <distribution> main
```                                                    

    4.  Add the PGP keys and the tor repository with this
        command:
```
wget -qO- https://deb.torproject.org/torproject.org/A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89.asc | gpg --dearmor | tee /usr/share/keyrings/tor-archive-keyring.gpg >/dev/null
 ```                                                           

    5.  Update the repositories and install tor:
```
apt update
apt install tor deb.torproject.org-keyring
```                                                          

Now let's edit the tor configuration file with
the command: nano /etc/tor/torrc and, depending on whether you want a middle or
exit relay, copy one of the configurations below.

**Watch out!!** After you've pasted in the configuration, there are
some parameters to change; they'll be listed further below, after the
section with the two examples below.

-   **Middle relay**
```
Nickname $nickname
ContactInfo $contact_info
AccountingRule sum
AccountingStart week 1 10:00
AccountingMax $bandwidth
ORPort 443
ExitRelay 0
SocksPort 0 
```
-   **Exit relay**
```
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
ExitPolicy accept *:79        # finger
ExitPolicy accept *:80-81     # HTTP
ExitPolicy accept *:88        # kerberos
ExitPolicy accept *:110       # POP3
ExitPolicy accept *:143       # IMAP
ExitPolicy accept *:194       # IRC
ExitPolicy accept *:220       # IMAP3
ExitPolicy accept *:389       # LDAP
ExitPolicy accept *:443       # HTTPS
ExitPolicy accept *:464       # kpasswd
ExitPolicy accept *:465       # URD for SSM (more often: an alternative port, see 587)
ExitPolicy accept *:531       # IRC/AIM
ExitPolicy accept *:543-544   # Kerberos
ExitPolicy accept *:554       # RTSP
ExitPolicy accept *:563       # NNTP over SSL
ExitPolicy accept *:587       # SUBMISSION (authenticated clients send mail over STARTTLS SMTP here)
ExitPolicy accept *:636       # LDAP over SSL
ExitPolicy accept *:706       # SILC
ExitPolicy accept *:749       # kerberos
ExitPolicy accept *:853       # DNS over TLS
ExitPolicy accept *:873       # rsync
ExitPolicy accept *:902-904   # VMware
ExitPolicy accept *:981       # Remote HTTPS management for firewall
ExitPolicy accept *:989-990   # FTP over SSL
ExitPolicy accept *:991       # Netnews Administration System
ExitPolicy accept *:992       # TELNETS
ExitPolicy accept *:993       # IMAP over SSL
ExitPolicy accept *:994       # IRCS
ExitPolicy accept *:995       # POP3 over SSL
ExitPolicy accept *:1194      # OpenVPN
ExitPolicy accept *:1220      # QT Server Admin
ExitPolicy accept *:1293      # PKT-KRB-IPSec
ExitPolicy accept *:1500      # VLSI License Manager
ExitPolicy accept *:1533      # Sametime
ExitPolicy accept *:1677      # GroupWise
ExitPolicy accept *:1723      # PPTP
ExitPolicy accept *:1755      # RTSP
ExitPolicy accept *:1863      # MSNP
ExitPolicy accept *:2082      # Infowave Mobility Server
ExitPolicy accept *:2083      # Secure Radius Service (radsec)
ExitPolicy accept *:2086-2087 # GNUnet, ELI
ExitPolicy accept *:2095-2096 # NBX
ExitPolicy accept *:2102-2104 # Zephyr
ExitPolicy accept *:3128      # SQUID
ExitPolicy accept *:3389      # MS WBT
ExitPolicy accept *:3690      # SVN
ExitPolicy accept *:4321      # RWHOIS
ExitPolicy accept *:4643      # Virtuozzo
ExitPolicy accept *:5050      # MMCC
ExitPolicy accept *:5190      # ICQ
ExitPolicy accept *:5222-5223 # XMPP, XMPP over SSL
ExitPolicy accept *:5228      # Android Market
ExitPolicy accept *:5900      # VNC
ExitPolicy accept *:6660-6669 # IRC
ExitPolicy accept *:6679      # IRC SSL
ExitPolicy accept *:6697      # IRC SSL
ExitPolicy accept *:8000      # iRDMI
ExitPolicy accept *:8008      # HTTP alternate
ExitPolicy accept *:8074      # Gadu-Gadu
ExitPolicy accept *:8080      # HTTP Proxies
ExitPolicy accept *:8082      # HTTPS Electrum Bitcoin port
ExitPolicy accept *:8087-8088 # Simplify Media SPP Protocol, Radan HTTP
ExitPolicy accept *:8332-8333 # Bitcoin
ExitPolicy accept *:8443      # PCsync HTTPS
ExitPolicy accept *:8888      # HTTP Proxies, NewsEDGE
ExitPolicy accept *:9418      # git
ExitPolicy accept *:9999      # distinct
ExitPolicy accept *:10000     # Network Data Management Protocol
ExitPolicy accept *:11371     # OpenPGP hkp (http keyserver protocol)
ExitPolicy accept *:19294     # Google Voice TCP
ExitPolicy accept *:19638     # Ensim control panel
ExitPolicy accept *:50001-50002     # Electrum Bitcoin SSL
ExitPolicy accept *:64738     # Mumble
ExitPolicy reject *:*
```
In both configurations there are 3 fields that need to be
changed manually:

1.  **$Nickname:**\
    In this section we need to type the name we want to give to
    our Tor node. Avoid names that are too long and don't use spaces; the
    only allowed characters are letters, numbers, and underscores.\
    example: "Nickname TORtaruga".
2.  **$contact_info:**\
    This section should be used to provide a contact through which
    the Tor Foundation can reach you in case of very serious problems with your node. Be
    careful, you're exposing an email online linked to
    a Tor node. 3 options could be: putting your own contact
    but written in a strange way so that online bots don't recognize the
    text as an email.\
    example: "[yourname][@][example].[com]" or
    write "redacted" if you don't want to publish anything.
3.  **$Bandwidth:**\
    In this field we'll need to state the weekly bandwidth allotted to the
    node. The usable units are (MB / GB / TB); if you have 1 TB
    of bandwidth available on your node you could write in the bandwidth
    field (which is meant as weekly) 250 GB (which over 4 weeks
    comes out to 1 TB per month). Respect the number, space, unit of measure
    formatting.\
    examples: "700 GB", "2 TB", "1200 GB", etc.

Done, our dear little Tor node is ready!

## Post-installation checks {#email style="color: greenyellow;"}

Great job, hero!\
Whether you did everything by hand or used my
automated script, you've officially created a Tor node! Before running
all the relevant checks, let's start by restarting the Tor service on
our machine (every time we edit the /etc/tor/torrc file we need to
restart the service to apply the changes):

` systemctl restart tor@default `

Once this is done, the node will be officially active; in case of problems you can
use the command:

` journalctl -xeu tor@default `

to go and analyze the logs, which isn't exactly easy, but useful for
identifying the problem: (in 90% of cases) it's an error inside the
/etc/tor/torrc file.
Last but not least, if you want to monitor your node with an
interface similar to htop, you can install nyx with the command:

` apt install nyx `

running it with the command nyx you'll be able to monitor the statistics with a
display similar to this one:



## Functionality test {#cloud style="color: greenyellow;"}

The final check to make sure everything works is to see whether, on the
[official website](https://metrics.torproject.org/rs.html) of the Tor Foundation
with all the relays, you can find **after a few hours** your own
node by searching for the name, or part of it, of your
relay.



If it shows up correctly, you officially have an active Tor node!

## Conclusion {#conc style="color: greenyellow;"}

You're done! Your node is active and you've pulled off your
legendary feat!
Thanks so much for reading! If you enjoyed this guide, share it
on social media and with friends.

if you've set up a tor node you're a good turtle 🐢

---

## Related Guides

- **[Self-Hosted VPN with Wireguard](/vpn)** - Build your own private VPN with built-in ad-blocking
- **[How to Build a Threat Model](/threat-model)** - The first step to protecting your privacy
- **[The Ultimate GrapheneOS Guide](/graphene)** - The best operating system for mobile privacy

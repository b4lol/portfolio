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

> **TL;DR** - In this guide you'll learn:
> - How to choose a privacy-conscious hosting provider
> - How to install and configure WireGuard as a VPN server
> - How to add Pi-hole to block ads and trackers at the DNS level
> - How to configure Unbound to resolve DNS on your own, without third parties

## Summary

A self-hosted VPN with WireGuard, Pi-hole and Unbound encrypts the traffic between your devices and a VPS, blocks a large share of ad and tracker requests at the DNS level, and resolves domains without relying on a commercial resolver. It doesn't make you anonymous: it just shifts trust from the VPN provider to the VPS provider.

Commercial VPNs promise privacy, but their business model is often based on collecting your data. The alternative? Build your own personal VPN. With WireGuard, Pi-hole and Unbound you get an encrypted connection, built-in ad/tracker blocking and fully independent DNS resolution — all under your own control. Here's how to do it.

This is meant to be a complete guide for setting up your own VPN using WireGuard, with ad and tracker filtering provided by an AdBlocking filter built with Pi-hole.

This guide is open to improvements and suggestions. I'll describe the configuration that I find offers the best balance between usability and privacy; I'm not a networking expert, and following this guide won't magically make you anonymous and untraceable.

If you'd like to give me suggestions, contribute to the guide, or help with translations, you can open a pull request on [GitHub](https://github.com/b4lol/portfolio).

## Goal

The end goal of this guide is to self-host a VPN with ad and tracker filtering, completely on your own. This approach comes with advantages and disadvantages compared to using a regular commercial VPN:

### pros

*   You don't have to trust a VPN provider whose business model, unfortunately, is often selling your personal data
*   You can add filters for ads and trackers; some VPNs offer this, but often with rather poor quality
*   Full customization of your experience: want a faster VPN? Specific ad filters? Want to share it with your whole family? With your own VPN you can manage it however you like
*   You can choose the country — and therefore the legal jurisdiction — of the servers you rent (and pick the countries best suited for digital privacy)

### cons

*   Smaller anonymity set on the IP address: unless you share your VPN with many family members and friends, you'll be the only one using the VPN's outgoing IP address; this is a disadvantage because, even though it's not directly tied to you, it's still a unique identifier that only you use. This isn't great for privacy, since it makes you easier to track
*   Even though you're not handing data to a VPN provider, in most cases you'll be setting this up on a VPS (a rented server), so you'll just be shifting your trust from a commercial VPN provider to a server-hosting company (which will see your IP address whenever you use the VPN). It's therefore essential to choose your server provider carefully, or to run this setup on a machine connected to an internet connection that isn't registered in your name

## Choosing the hosting provider {#scelta-dellhosting-provider}

By hosting provider we mean the company that will provide the server on which you'll set up everything in this guide. It's essential to find a host with a legal jurisdiction that protects your privacy (interesting options are countries outside the Five Eyes, outside NATO, or with good data-protection policies — good examples include Iceland, Sweden, Switzerland, Gibraltar, etc.), that appears trustworthy (hasn't leaked data over trivial issues, or seems to genuinely try to hand over as little data as possible to authorities), and that requires as little personal data as possible to use its service (bitcoin payments, a Tor onion domain, login without phone verification, etc.).

In this guide I'll recommend a couple of hosting providers; often the smaller ones, or those with interesting privacy policies, are more expensive than the big hosting companies. It's also important to check what services are offered so you can pick the server best suited to your needs (power, storage and bandwidth speed, etc.).

*   [VPSbG](https://www.vpsbg.eu/aff/1e5d9e): a long-standing provider that often offers a good balance of bandwidth, simplicity and payment options.
*   [1984 Hosting](https://1984.hosting/): interesting if you value Icelandic jurisdiction and a fairly broad catalog of services.
*   [Njalla](https://njal.la/): a well-known option in the privacy space, useful if you want to pay in bitcoin and minimize the data you share.

**Important:** prices, CPU, included traffic and policies can change frequently. Before buying, always check current pricing and make sure the provider genuinely allows the kind of traffic you intend to generate.

There are plenty of other VPS services out there with different costs and trade-offs in terms of privacy, security, cost, etc. Feel free to do some research of your own and you're under no obligation to use the ones I mentioned above.
Once you've chosen a hosting service, I strongly recommend proceeding by purchasing a machine running a Debian-based distribution (Debian or Ubuntu) and setting a strong login password.

## Connecting to the VPS server via SSH {#connessione-al-server-vps-con-ssh}

As many of you already know, connecting to remote servers is usually done via SSH: a protocol built into the Linux terminal used to connect to remote servers or computers. To connect to our VPS, open a terminal on any of our computers and run:

`ssh [username]@[ip address]`

an example might be: ssh root@192.34.33.25 (root is usually the username, and the following number is the server's IP address, which you can usually find in the machine's information on the hosting site). After running the command, just enter the password you set earlier to log in to the server.

Once connected over SSH, we can run:

`sudo apt update && sudo apt upgrade -y`

to update all the packages on our operating system.
In this guide we'll follow a simple, minimal security setup for our server (so that it suits all users); if you want a more advanced setup, I recommend searching online for how to log in to your server using an SSH public key.

Finally, let's run:

`sudo apt install fail2ban`

to install this very lightweight piece of software that limits access after too many wrong password attempts on our server (thereby slightly improving its security).

## Setting up the VPN {#setup-della-vpn}

Now that we've completed all the preliminary steps to make our VPS more secure and up to date, we can move on to the actual setup. Let's install WireGuard with the following commands:

This script is a convenience solution maintained by a third party: before running it, always verify that the repository is still active and consistent with the setup you want to achieve.

```
curl -O https://raw.githubusercontent.com/angristan/wireguard-install/master/wireguard-install.sh
chmod +x wireguard-install.sh
./wireguard-install.sh
```

at this point let's also install Pi-hole (the software we'll use as our ad, tracker and analytics filter):

`curl -sSL https://install.pi-hole.net | bash`

during installation, choose "wg0" as the network interface, use the custom DNS option (not too important, since we'll overwrite it later anyway) and complete the wizard. Once installation is done, let's set the password to access the web interface:

`pihole setpassword`

Save the password you chose, we'll need it later.

Now let's install Unbound, software that gives us a fast local DNS resolver (to simplify things, this is what will give us a complete, efficient and fast final setup).

`sudo apt install unbound`

and let's configure it with:

`nano /etc/unbound/unbound.conf.d/pi-hole.conf`

Paste this configuration into the file:

```
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

now let's restart Unbound:

`sudo systemctl restart unbound`

at this point we've correctly set up the local DNS. Let's configure Pi-hole to use Unbound as its upstream DNS. In Pi-hole v6 this is managed through the `/etc/pihole/pihole.toml` file, the web interface, or the CLI. The simplest way is to use the FTL CLI:

```
sudo pihole-FTL --config dns.upstreams '["127.0.0.1#5335"]'
sudo pihole-FTL --config dns.listeningMode 'local'
sudo pihole-FTL --config dns.dnssec 'false'
```

These commands tell Pi-hole to use Unbound (port 5335) as its only upstream DNS and to listen only on local interfaces. If you prefer, you can set the same values from the web UI, but in Pi-hole v6 the old `pihole --config` syntax is no longer correct.

## Configuring Pi-hole and Adlists {#configurazione-pihole-e-adlists}

The command-line part is now done — you made it, warrior! 🎉
In theory, everything is already working at this point, but before using the VPN, let's add some ad filters!
Open any browser and in the address bar type:

`http://{vpn ip address}/admin`
example: http://84.177.121.221/admin

At this point you should see Pi-hole's login page (our ad, tracker and analytics filtering system). Use the password you set with `pihole setpassword`. Once logged in, go to the **Domains / Adlists** section (in the side menu) and add some lists of domains to block. This topic could fill hours of discussion; the basic idea is that if we add dozens of random sources we'll block a huge amount... too much, breaking many websites or app features on our devices. It's better to use a few lists, ideally from people we trust at least somewhat. Below are some of the main, most well-known ones; if you want to expand this section, I'll leave that up to you, since depending on the configuration there can be various pros and cons.

```
https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts
https://adaway.org/hosts.txt
https://v.firebog.net/hosts/AdguardDNS.txt
https://v.firebog.net/hosts/Easyprivacy.txt
https://winhelp2002.mvps.org/hosts.txt
```

Once you've added the various blocklists, go to **Tools → Gravity** and start the update to activate the lists. If you run into problems with certain sites (for example, I've had issues in the past with some lists and Twitter's "t.co" links), just add the site to the **Domains → Whitelist** section to exclude it from blocking. Every time you make changes, run a Gravity update afterward to apply them.

## Exporting the configurations

Now let's activate the configuration on our devices. Let's start with phones:

Install the [WireGuard](https://www.wireguard.com/install/) app on your device; once that's done, open your VPS terminal and run:

`bash wireguard-install.sh`

select "add new client," give it any name you like, and select "current system resolver" as DNS. You'll now be shown a QR code; using the WireGuard mobile app, scan it, and afterward you should see a screen like this:



In the "DNS servers" section, enter your VPS's IP address, and check that the "Endpoint" section shows the same IP address followed by ":51820," which indicates the port. Once that's done, just save and activate the VPN!

For PCs the procedure is similar: just install WireGuard, generate the configuration on the VPS (use the command explained above, in the Android procedure), and then copy it to your PC:

*   On Windows, the configuration should be entered in WireGuard's graphical interface
*   On Linux, the configuration should be saved as a file with a .conf extension in the /etc/wireguard folder (for example, vpn.conf), and then the VPN can be activated from the terminal with:

    `sudo wg-quick up {name of the .conf file}`

    and to turn it off:

    `sudo wg-quick down {name of the .conf file}`

on PCs too, make sure you've updated the 'DNS server' and 'Endpoint' sections with your server's IP address.

## Testing that everything works {#test-di-funzionamento}

Now that our VPN is set up and active, let's test that everything works correctly. First, in any browser, visit [VPN testing](https://vpntesting.com/) and run a test. Check that all the IP addresses and locations shown on screen are not those of your home country, but of the VPN server.

If everything checks out, let's test — not the VPN itself, but the adblocker — by visiting [AdBlock test](https://d3ward.github.io/toolz/adblock.html). If the final result is above 70-80%, it means everything is working correctly (adding more or fewer blocklists to Pi-hole may change this test's results). Be sure to temporarily disable any AdBlock browser extensions so you don't get skewed results. The browser you use can also affect the test results.

If you pass both tests successfully, you're a true dragon and you've managed to follow this guide perfectly!! 🐉

## Conclusions

This is just one of many possible setups for building a VPN server. As with any configuration, you can make changes to adapt the service to your own trade-offs. The one presented in this guide is, in my opinion, a good balance of security, functionality and privacy. If you have suggestions for improvement or have found mistakes, you can help out and make your voice heard on the [GitHub repository](https://github.com/b4lol/portfolio).

---

## Related Guides

- **[Tor Node: Full Setup](/tor)** - Contribute to the Tor network by running your own relay
- **[How to Build a Threat Model](/threat-model)** - The first step to protecting your privacy
- **[Privacy on Android](/android)** - A complete setup for a de-googled phone
- **[The Ultimate GrapheneOS Guide](/graphene)** - The best operating system for mobile privacy

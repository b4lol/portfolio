---
title: "Linux Hardening: The Complete Security Guide"
description: "A complete Linux hardening guide: choosing a secure distro, LUKS disk encryption, firewall, kernel hardening, Flatpak sandboxing, and Secure Boot."
summary: "A complete Linux hardening guide: choosing a secure distro, LUKS disk encryption, firewall, kernel hardening, Flatpak sandboxing, and Secure Boot."
keywords: ["linux hardening", "linux security", "linux security guide", "secure linux distro", "fedora hardening", "secureblue", "debian security", "qubes os", "qubes os security", "linux firewall", "linux disk encryption", "LUKS encryption", "flatpak security", "kernel hardening", "secure boot linux", "secure linux desktop", "linux kernel hardening", "wayland security"]
author: "b4lol"
date: 2026-03-10
lastmod: 2026-05-05
url: /linux-hardening
series: ["Digital Privacy", "Security"]
topics: ["privacy-security"]
faq:
  - question: "What is the most secure Linux distribution?"
    answer: "There's no universal answer. Fedora Workstation and its Atomic variants offer a great balance of security, updates, and usability. SecureBlue is an even more hardened option based on Fedora Atomic. Debian is the most solid, low-maintenance base if you prefer stability. For extreme isolation through compartmentalization there's Qubes OS, while for anonymity Whonix remains the reference."
  - question: "Is Linux more secure than Windows or macOS?"
    answer: "Linux offers more control and transparency, but it isn't automatically more secure. Without hardening, a desktop Linux system can be less protected than an up-to-date Windows 11 or macOS install. Security depends on configuration and user habits."
  - question: "Should I use a rolling release for security?"
    answer: "Generally, yes. Rolling releases receive security patches faster because they update packages to the upstream version instead of backporting. Fedora and openSUSE Tumbleweed are good choices with this approach."
  - question: "Does full disk encryption slow down the computer?"
    answer: "The performance impact on modern hardware is negligible (1-3%). Recent processors have hardware AES instructions that make encryption almost transparent. It's one of the most important security setups with the smallest trade-off."
  - question: "What's the difference between Flatpak and Firejail for sandboxing?"
    answer: "Flatpak isolates applications using namespaces and granular permissions, and is the recommended solution for most users. Firejail is useful for apps not available as Flatpak, but it's a SUID binary with a larger attack surface. Use Flatpak wherever possible."
  - question: "How do I verify that my Linux system is hardened?"
    answer: "Use Lynis (sudo lynis audit system) for a full audit. Manually verify that the firewall is active, SELinux/AppArmor is in enforcing mode, kernel parameters are applied (cat /proc/cmdline), and there are no unnecessary services listening (ss -tulnp)."
howto:
  name: "How to harden a desktop Linux system"
  description: "Procedure to choose a secure distribution, encrypt the disk, configure networking, kernel, sandboxing, Secure Boot, services, and security checks."
  totalTime: "PT3H"
  supply:
    - "Linux-compatible computer"
    - "Updated Linux distribution"
    - "Data backup"
  tool:
    - "LUKS"
    - "Firewall"
    - "Flatpak"
    - "Lynis"
  steps:
    - name: "Choose the distribution"
      text: "Prefer up-to-date distributions with SELinux or AppArmor, good rollback support, and Wayland support."
      url: "/linux-hardening#scelta-distro"
    - name: "Install with disk encryption"
      text: "Enable LUKS, configure secure swap, and choose a non-identifying username and hostname."
      url: "/linux-hardening#installazione"
    - name: "Configure networking and firewall"
      text: "Set up the firewall, secure DNS, MAC randomization, and reliable time synchronization."
      url: "/linux-hardening#rete"
    - name: "Apply kernel hardening"
      text: "Configure sysctl, boot parameters, kernel modules, and memory mitigations."
      url: "/linux-hardening#kernel"
    - name: "Isolate applications"
      text: "Prefer Flatpak, configure granular permissions, and consider Firejail or MAC only where necessary."
      url: "/linux-hardening#sandboxing"
    - name: "Verify the setup"
      text: "Check the firewall, services, kernel parameters, sandbox, and audit with dedicated tools."
      url: "/linux-hardening#verifica"
---

> **TL;DR** - In this guide you will learn:
> - How to choose the right Linux distribution for your security and privacy needs
> - How to configure disk encryption, firewall, and kernel hardening right from installation
> - How to isolate applications with Flatpak, Firejail, and advanced sandboxing
> - How to verify that your system is actually protected with hands-on tests

## Summary

Linux hardening means reducing the attack surface and the impact of a compromise: an up-to-date distro, disk encryption, firewall, secure DNS, kernel hardening, app sandboxing, Secure Boot, service control, and periodic audits. Linux isn't secure automatically: it becomes more robust when these measures are configured consistently.

The Linux world is often painted as a security paradise: just install any distro and you're magically safe from everything. The reality is a bit different. A desktop Linux system, without the right configuration, can be surprisingly vulnerable. The good news? With the right knowledge and a bit of patience, you can turn your setup into a real fortress.

This guide will walk you through it step by step: from choosing the right distribution to configuring every aspect of security. It won't be a walk in the park, but in the end you'll have a system you can actually trust.

Remember that security is a process, not a product. There's no perfect setup, but there is a setup that's *right for you*. Every section of this guide lays out pros and cons, so you can decide what makes sense for your specific case.

This guide is open to improvements and suggestions. If you want to contribute, report errors, or propose additions, open a pull request on [GitHub](https://github.com/b4lol/portfolio).



## Why use Linux for security? {#perche-linux style="color: white;"}

First of all: why should you use Linux? Not out of bias, but for concrete reasons.

### Transparency and control

Linux is open source. This means the source code is visible, verifiable, and modifiable by anyone. When Microsoft or Apple say "we don't collect your data," you have to take their word for it. With Linux, you can verify it. It's not an absolute guarantee (nobody reads millions of lines of code for fun), but the possibility of an audit is a huge advantage.

Control is total: you decide what runs on your system, which services are active, what communicates with the outside world. No forced updates, no hidden telemetry, no preinstalled bloatware.

### Limits you should know about

Eyes open: desktop Linux is not automatically more secure than Windows or macOS. In fact, in some respects it's *less* protected out of the box:

- **Application sandboxing**: macOS and Windows have much more mature app isolation mechanisms. On a traditional Linux desktop, an application has almost complete access to your system
- **Secure Boot**: the implementation on Linux is still maturing compared to Windows
- **Drivers and firmware**: hardware support can be more limited, and unofficial drivers can introduce vulnerabilities
- **Desktop attack surface**: X11 (the old graphics protocol, now replaced by Wayland on most distros) was a sieve from a security standpoint, since any window could record the screen, capture input, and inject commands into other windows

That said, Linux gives you the tools to fix all of these problems. You just have to configure them yourself. And that's exactly what we'll do in this guide.

## Choosing a secure Linux distribution {#scelta-distro style="color: white;"}

Choosing the distribution is the foundation of everything. A wrong choice here can make all the subsequent work pointless. Let's look at the criteria that really matter.

### Rolling release vs fixed release

This is a point with a lot of confusion around it. Many think "stable" distributions (like Debian stable) are more secure because they change less. In reality it's often the opposite.

Fixed release distributions (like Debian) freeze package versions and apply only security patches via backporting. The problem? Not all security fixes get a CVE (an official identifier), and so they're never ported into the distribution. Furthermore, the backporting process itself can introduce bugs. Debian itself has had cases where a backported patch created a vulnerability (the famous DSA-1571 case with OpenSSL).

Rolling or semi-rolling distributions (like Fedora, openSUSE Tumbleweed, Arch) update packages to the upstream version. This means you receive security fixes exactly as the original developer wrote them, without intermediate changes.



**My advice**: if you're afraid of frequent updates, choose a distribution that offers rollback mechanisms (like Fedora with dnf history or openSUSE with Btrfs snapshots). That way you get the best of both worlds: up-to-date packages and the ability to roll back if something breaks.

### Desktop environment: why GNOME

The two desktop environments I recommend from a security standpoint are **GNOME** and **KDE Plasma**, and the main reason is that both fully support **Wayland**.

The good news is that most major distributions (Fedora, Ubuntu, openSUSE, etc.) now use Wayland as the default graphics protocol. Wayland is the successor to X11 and solves one of the most serious security problems of the Linux desktop: with the old X11, any window could record the screen, capture keystrokes, and inject input into other windows, making any attempt at sandboxing practically useless.

With Wayland, applications are isolated from each other at the graphics level. Both GNOME and KDE Plasma implement a permission system for privileged protocols (like screen capture): apps must request permission and the user must explicitly authorize them.

**GNOME** is the more minimal, opinionated choice: fewer configuration options but a coherent experience well integrated with security technologies. It's the default on Fedora Workstation and Ubuntu.

**KDE Plasma** is the alternative for those who prefer a more customizable, feature-rich desktop. Wayland support in KDE Plasma is now mature and stable, and it's the default on Fedora KDE Spin and openSUSE. If you like having total control over the look and behavior of your desktop, KDE is a great choice with no security compromises.

**WARNING!** If for some reason you're still using a desktop environment with X11 (some less up-to-date distros or custom configurations), many of the protections described in this guide (especially sandboxing) will be significantly less effective. Verify you're using Wayland with the command `echo $XDG_SESSION_TYPE` (it should return `wayland`).

### Recommended distributions

After analyzing dozens of distributions, here are the ones I recommend based on different user profiles.

#### Fedora Workstation: the balanced choice

Fedora is a semi-rolling distribution: the kernel and key packages are updated frequently, while GNOME follows the official release cycle. Each version is supported for about a year, with new releases every six months.

**Why Fedora:**
- "Upstream first" approach: patches are minimal and sensible
- Among the first to adopt modern technologies (Wayland, PipeWire)
- The `dnf` package manager supports rollback and undo of operations
- SELinux active and in enforcing mode by default
- Huge community and excellent documentation

**Cons:**
- Requires a reinstall (or upgrade) every 6-12 months to stay supported
- Some proprietary packages require additional repositories (RPM Fusion)

#### Debian: the solid, ready-to-use base

If Fedora is the balance, Debian is the solidity. It's the "boring" system in the best sense of the term: you install it, it works, and it keeps working for years with minimal maintenance. It's the secure, always-ready-to-use base to recommend to anyone who wants a reliable desktop without having to constantly tinker with it.

**Why Debian:**
- Legendary stability: packages are thoroughly tested before entering stable, surprises are rare
- Debian's Security Team is among the most responsive in releasing updates for tracked vulnerabilities
- Maintenance kept to a minimum: no frequent reinstalls, no updates that break the system overnight
- AppArmor active by default and one of the largest, best-documented communities in the Linux world
- It's the base of countless other projects (Ubuntu, Whonix, Tails), so security profiles and guides abound

**Cons:**
- As explained in the [rolling vs fixed](#scelta-distro) section, the frozen-package model means some security fixes without a CVE never make it into stable
- Packages are older: if you need the latest version of some software you'll have to rely on backports or Flatpak

To smooth over the lag on upstream fixes, install your most exposed applications (browsers above all) via Flatpak: that way they stay up to date independently of Debian's release cycle, while the base system gives you the stability you're looking for.

#### Fedora Atomic Desktops: the immutable future

Fedora's Atomic variants (Silverblue for GNOME, Kinoite for KDE) use an immutable approach: the base system is read-only and updates are downloaded as complete images before being applied.

This means an update can't fail halfway through and leave you with a broken system. If something goes wrong, a single reboot takes you back to the previous state. Applications are installed mainly via Flatpak (sandboxed) or containers (Toolbox/Distrobox).

**Cons:**
- Different workflow from traditional Linux (requires adjustment)
- Some software not available as Flatpak requires workarounds
- The dependency on GRUB prevents the use of Unified Kernel Images (limiting advanced Secure Boot)

#### SecureBlue: automatic hardening

SecureBlue is based on Fedora Atomic and adds a significant hardening layer:

- **Trivalent**: a hardened Chromium browser with GrapheneOS Vanadium patches
- **Hardened Malloc**: GrapheneOS's memory allocator applied to the whole system
- Pre-applied kernel security configurations
- Blacklist of unnecessary kernel modules

It's the distribution I recommend if you want maximum security with minimal manual configuration effort. The only trade-off is that you have to trust an additional project on top of Fedora.

#### openSUSE Aeon: rolling and immutable

The rolling release alternative in the immutable world. It uses Btrfs with transactional snapshots: updates are applied to a snapshot and activated only on reboot, with the ability to roll back at any time.

It has a minimal base package set (reduces the attack surface) and the system is mounted read-only.

#### Qubes OS: security through compartmentalization

Qubes OS starts from a different premise than all the others: instead of hardening a single system, it isolates every activity into separate virtual machines (called "qubes") thanks to the Xen hypervisor. The browser for banking, work, personal activities, and untrusted downloads run in distinct compartments that can't see each other.

If a qube is compromised, the damage stays confined there: the malware can't reach the other compartments or the underlying system. Disposable qubes destroy themselves on closing, ideal for opening a suspicious attachment without risk. It's the secure "ready-to-use" base for those who put isolation above everything: it ships with preconfigured templates and Whonix integration to route entire qubes through Tor.

**Why Qubes:**
- Compartmentalization by design: isolation isn't an add-on, it's the heart of the system
- Ready-to-use templates (Fedora, Debian) that you update once for all derived qubes
- Native Whonix integration for Tor traffic
- It's the recommended system for those with the most extreme security needs

**Cons:**
- Significant hardware requirements: you need a lot of RAM (16 GB the reasonable minimum) and a CPU with virtualization support
- Steep learning curve: the qube model requires a mindset shift
- Hardware support (especially GPUs and particular peripherals) can cause problems

#### Whonix: for anonymity

If your goal is anonymity (not just privacy), Whonix is the reference. It works as two virtual machines: a Workstation where you work and a Gateway that routes all traffic through Tor.

Even if malware compromises the Workstation, it can't discover your real IP address because all networking goes through the Gateway. It also includes keystroke anonymization, boot clock randomization, encrypted swap, and hardened kernel parameters.



**Cons:**
- Based on Debian (older packages)
- Requires virtualization (reduced performance)
- Not suitable as a primary operating system



### Distributions to avoid

Some distributions are often recommended for the wrong reasons:

- **Kali Linux, BlackArch, Parrot OS**: these are penetration testing tools, *not* secure systems for everyday use. They have offensive tools preinstalled and often run as root. Using them as a daily desktop is like driving an ambulance to go grocery shopping
- **Distributions with the Linux-libre kernel**: they remove security mitigations for proprietary microcode and suppress CPU vulnerability warnings. For ideological reasons they sacrifice your actual security
- **Manjaro**: holds packages back compared to Arch without a real stability advantage, creating an unnecessary vulnerability window

## Secure Linux installation with disk encryption {#installazione style="color: white;"}

Okay, you've chosen your distribution. Now let's see how to install it correctly from the start. Some of these configurations can't be done afterward, so keep your eyes open and pay maximum attention!

### Full disk encryption (LUKS)

It's essential to enable full disk encryption during installation. With LUKS (Linux Unified Key Setup) all the data on your disk gets encrypted: if someone steals your laptop, without the password they won't be able to read anything.

**WARNING!** If you don't enable encryption during installation, you'll have to back up all your data and reinstall from scratch. It's not possible to encrypt a disk already in use without losing the data.

During installation, when you reach partitioning:

1. Choose the disk encryption option (on Fedora it's called "Encrypt my data")
2. Set a long, complex passphrase (this is the key to your kingdom)
3. If your installer supports it, use the `--integrity` option with cryptsetup to get authenticated encryption

For those who want the most: authenticated encryption verifies that the data hasn't been tampered with, not just that it's unreadable. It's an additional protection layer against sophisticated physical attacks.



### Encrypted swap

Swap is an area of the disk used as additional memory when RAM is full. The problem? It can contain sensitive data (passwords, encryption keys, open documents) in plaintext.

There are two options:

- **Encrypted swap**: configure it during partitioning together with LUKS
- **ZRAM**: uses compressed RAM instead of disk. Fedora uses it by default and it's the preferable option, faster and no sensitive data ever ends up on disk

### Partitioning with secure mount options

For additional hardening, you can configure restrictive mount options on some partitions:

| Partition | Options | Effect |
|-----------|---------|---------|
| `/boot` | `nodev,noexec,nosuid` | Prevents code execution on the boot partition |
| `/boot/efi` | `nodev,noexec,nosuid` | Protects the EFI partition |
| `/var` | `nodev,nosuid` | Limits permissions on the variable data partition |

> **Warning!** Don't add `noexec` to `/home` or `/root` because it would break Flatpak and Snap. Likewise, avoid `noexec` on `/var/tmp` if you use Arch (AUR builds would fail).

These options aren't foolproof (`noexec` is relatively easy to bypass), but they add a defense-in-depth layer that can block automated attacks.

### Generic username and hostname

A detail many overlook: your username and hostname get transmitted in various ways over the network and can be used to identify you.

- Use a generic username like `user` instead of your name
- Set the hostname to `localhost`:

```bash
sudo hostnamectl hostname "localhost"
```

## Post-installation hardening: updates and basic configuration {#post-installazione style="color: white;"}

Installation complete, disk encrypted, partitions configured. Now the real hardening work begins.

### Updates and microcode

First of all, update the system:

```bash
# Fedora
sudo dnf upgrade --refresh

# Debian/Ubuntu
sudo apt update && sudo apt upgrade -y

# Arch
sudo pacman -Syu
```

Then make sure you have the CPU microcode installed. Microcode is firmware that fixes bugs and vulnerabilities directly in the processor. Without it, you're vulnerable to a whole range of hardware attacks (Spectre, Meltdown, and friends).

```bash
# Fedora (included by default)
# Verify with:
dnf list installed | grep microcode

# Debian
sudo apt install intel-microcode   # for Intel CPUs
sudo apt install amd64-microcode   # for AMD CPUs

# Arch
sudo pacman -S intel-ucode   # for Intel CPUs
sudo pacman -S amd-ucode     # for AMD CPUs
```

### Firmware updates

Many devices have updatable firmware that can contain security fixes. Use `fwupd`:

```bash
sudo fwupdmgr refresh
sudo fwupdmgr update
```

### Disabling telemetry

Some distributions collect anonymous usage data. Even if the intentions are good, the less data you share the better:

```bash
# Fedora — disables the install counting
echo "countme=false" | sudo tee -a /etc/dnf/dnf.conf

# openSUSE — empties the anonymous identifier
sudo truncate -s 0 /var/lib/zypp/AnonymousUniqueId
```

### Configuring a restrictive umask

The umask controls the default permissions of new files. The default value (`022`) creates files readable by all users on the system. With `077`, only your user can read the files you create:

```bash
# Add to /etc/profile or /etc/bash.bashrc
umask 077
```

> **Warning!** On openSUSE this can break Snapper. On Ubuntu, the repository files in `/etc/apt/sources.list.d/` need permissions of 644, not 600. Check after applying.

## Network hardening: firewall, DNS, and MAC randomization {#rete style="color: white;"}

The network is one of the most common attack vectors. Let's see how to lock it down.

### MAC address randomization

The MAC address is a unique identifier of your network card. Every time you connect to a WiFi network, the router sees it and can track your presence. By randomizing it, every connection appears as a different device.

Create the file `/etc/NetworkManager/conf.d/00-macrandomize.conf`:

```ini
[device]
wifi.scan-rand-mac-address=yes

[connection]
wifi.cloned-mac-address=random
ethernet.cloned-mac-address=random
```

Then restart NetworkManager:

```bash
sudo systemctl restart NetworkManager
```

### Firewall

A firewall is absolutely mandatory. The configuration I recommend is restrictive: block all incoming traffic except what's explicitly authorized.

#### Fedora/openSUSE (firewalld)

```bash
# Set the default zone to "drop" (blocks everything)
sudo firewall-cmd --set-default-zone=drop

# Allow ICMPv6 (needed for IPv6 to work)
sudo firewall-cmd --add-protocol=ipv6-icmp --permanent

# Allow DHCPv6 (needed to obtain the IPv6 address)
sudo firewall-cmd --add-service=dhcpv6-client --permanent

# Apply the rules
sudo firewall-cmd --reload

# Enable lockdown (prevents bypass via polkit)
sudo firewall-cmd --lockdown-on
```

#### Debian/Ubuntu (ufw)

```bash
sudo apt install ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw enable
```

`ufw` is simpler than firewalld but less flexible. It doesn't support zones and has no lockdown mode. For a desktop it's still more than sufficient.



**Remember that** a software firewall can't protect against malware running with elevated privileges on your system. It's a defense layer, not a complete solution.

### DNSSEC

Traditional DNS is plaintext and unauthenticated: anyone in the path between you and the DNS server can see your queries and potentially modify the responses. DNSSEC adds a cryptographic signature to DNS responses.

If you use `systemd-resolved`:

```bash
# Edit /etc/systemd/resolved.conf
# Set:
DNSSEC=yes

# Restart the service
sudo systemctl restart systemd-resolved
```

Make sure to use a DNS provider that supports DNSSEC. For an additional privacy layer, consider using DNS-over-TLS or DNS-over-HTTPS.

### Secure time synchronization

NTP, the standard protocol for time synchronization, transmits in plaintext and without authentication. An attacker could manipulate your system's clock, compromising TLS certificates and logs.

The solution is **Network Time Security (NTS)** with chronyd:

```bash
# Install chrony (if not already present)
# Fedora: already included
# Debian/Ubuntu:
sudo apt install chrony
```

Edit `/etc/chrony.conf` and use NTS servers. A good reference is GrapheneOS's configuration:

```
server time.cloudflare.com iburst nts
server ntppool1.time.nl iburst nts
server nts.netnod.se iburst nts
server ptbtime1.ptb.de iburst nts
minsources 2
```

The `minsources 2` parameter requires at least 2 independent sources to agree on the time, making an attack much harder.

Enable the seccomp filter for chrony:

```bash
# Fedora/Arch — edit /etc/sysconfig/chronyd
OPTIONS="-F 1"

# Then restart
sudo systemctl restart chronyd
```

## Linux kernel hardening: sysctl, boot, and modules {#kernel style="color: white;"}

The kernel is the heart of the operating system. Hardening it means drastically reducing the attack surface available to potential malware.

### sysctl parameters

sysctl parameters control kernel behavior at runtime. Create a file `/etc/sysctl.d/99-hardening.conf` with the following essential configurations:

```ini
# Network protection
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0
net.ipv6.conf.all.accept_redirects = 0
net.ipv6.conf.default.accept_redirects = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.default.send_redirects = 0
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.default.accept_source_route = 0
net.ipv6.conf.all.accept_source_route = 0
net.ipv6.conf.default.accept_source_route = 0
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1
net.ipv4.icmp_echo_ignore_all = 1
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_timestamps = 0

# Kernel protection
kernel.sysrq = 0
kernel.core_uses_pid = 1
kernel.kptr_restrict = 2
kernel.dmesg_restrict = 1
kernel.perf_event_paranoid = 3
kernel.yama.ptrace_scope = 2
kernel.unprivileged_bpf_disabled = 1
net.core.bpf_jit_harden = 2

# Memory protection
vm.mmap_rnd_bits = 32
vm.mmap_rnd_compat_bits = 16
vm.swappiness = 1

# Maximum ASLR
kernel.randomize_va_space = 2
```

Apply with:

```bash
sudo sysctl --system
```

Let's say these parameters cover the basics. For a more complete configuration, you can refer to [TommyTran732's repository](https://github.com/TommyTran732/Linux-Setup-Scripts/blob/main/etc/sysctl.d/99-workstation.conf), which maintains an up-to-date sysctl configuration for workstations.

### Kernel boot parameters

These parameters need to be added to the bootloader configuration (GRUB or systemd-boot). On systems with rpm-ostree (Fedora Atomic), use `rpm-ostree kargs` instead of editing GRUB.

#### CPU mitigations

```
mitigations=auto,nosmt spectre_v2=on spectre_bhi=on spec_store_bypass_disable=on tsx=off kvm.nx_huge_pages=force nosmt=force l1d_flush=on spec_rstack_overflow=safe-ret gather_data_sampling=force reg_file_data_sampling=on
```

**WARNING!** Disabling SMT (Simultaneous Multi-Threading / Hyper-Threading) has a significant performance impact. If you work with heavy workloads (compiling, video editing, gaming), you might want to remove `nosmt=force`, accepting a slightly higher risk.

#### Memory and kernel protection

```
slab_nomerge init_on_alloc=1 init_on_free=1 pti=on vsyscall=none page_alloc.shuffle=1 randomize_kstack_offset=on debugfs=off oops=panic quiet loglevel=0
```

These parameters:
- `slab_nomerge`: prevents merging of slab caches (reduces the effectiveness of heap exploits)
- `init_on_alloc=1 init_on_free=1`: zeroes memory when it's allocated and freed (prevents data leaks)
- `pti=on`: isolates kernel page tables from user ones (Meltdown mitigation)
- `vsyscall=none`: disables legacy vsyscalls (a known attack vector)
- `debugfs=off`: disables the debug filesystem (reduces the attack surface)

#### DMA mitigations

```
intel_iommu=on amd_iommu=force_isolation efi=disable_early_pci_dma iommu=force iommu.passthrough=0 iommu.strict=1
```

These protect against DMA attacks from hardware devices (like Thunderbolt or PCIe). Remember that they don't offer complete protection: an attack during early boot can still compromise the kernel before the IOMMU is active.

#### How to apply on Fedora (GRUB)

```bash
# Edit /etc/default/grub
# Add the parameters to GRUB_CMDLINE_LINUX
sudo grub2-mkconfig -o /boot/grub2/grub.cfg
```

#### How to apply on Fedora Atomic (rpm-ostree)

```bash
rpm-ostree kargs --append="slab_nomerge" --append="init_on_alloc=1" --append="init_on_free=1" --append="pti=on"
# Add each parameter individually
```

### Kernel module blacklist

Many kernel modules get loaded automatically but aren't necessary for your hardware. Every loaded module is extra code running with maximum privileges — a potential attack surface.

Create a file `/etc/modprobe.d/blacklist.conf`. A good starting point is [SecureBlue's blacklist](https://github.com/secureblue/secureblue/blob/live/files/system/etc/modprobe.d/blacklist.conf).

The most important modules to disable if you don't use them:

```bash
# Unnecessary filesystems
install cramfs /bin/false
install freevxfs /bin/false
install hfs /bin/false
install hfsplus /bin/false
install jffs2 /bin/false
install udf /bin/false

# Unnecessary network protocols
install dccp /bin/false
install sctp /bin/false
install rds /bin/false
install tipc /bin/false

# Bluetooth (comment out if you use it)
install bluetooth /bin/false
install btusb /bin/false

# Thunderbolt (comment out if you use it)
install thunderbolt /bin/false

# Webcam (comment out if you use it)
install uvcvideo /bin/false
```

> **Warning!** Before disabling `hfsplus`, check the filesystem of your EFI partition. If it's HFS+, disabling it would prevent booting. Check with `df -T /boot/efi`.

### Hardened Memory Allocator

The default memory allocator (glibc malloc) has no advanced protections against memory-corruption-based exploits. GrapheneOS's **hardened_malloc** is an alternative that adds guard pages, randomization, and integrity checks.

```bash
# Fedora — from SecureBlue's Copr repository
sudo dnf copr enable secureblue/hardened_malloc
sudo dnf install hardened_malloc

# Arch — from AUR
yay -S hardened_malloc-git
```

To enable it globally, add to `/etc/ld.so.preload`:

```
/usr/lib64/libhardened_malloc.so
```

Or for a single application:

```bash
LD_PRELOAD=/usr/lib64/libhardened_malloc.so firefox
```

### Alternative kernels

For those who want to go further, there are kernels with additional hardening patches:

- **linux-hardened** (Arch Linux): includes security patches, disables unprivileged user namespaces by default (can break Podman/LXC/Flatpak — check compatibility)
- **grsecurity**: the gold standard of kernel hardening, but it's proprietary and requires a paid subscription

## Application sandboxing: Flatpak, Firejail, and SELinux {#sandboxing style="color: white;"}

On a traditional Linux desktop, every application has access to almost everything: your files, the network, peripherals, the other running applications. Sandboxing limits this access to the bare minimum necessary.

### Flatpak: the recommended option

Flatpak is the most mature app distribution system for sandboxing on the Linux desktop. Each app runs in a sandbox with explicit permissions.

The problem? Many Flatpak apps request overly broad permissions by default. Here's how to restrict them.



#### Global permission restriction

First apply a restrictive policy to all apps, then grant specific permissions where necessary:

```bash
sudo flatpak override --system \
  --nosocket=x11 --nosocket=fallback-x11 \
  --nosocket=pulseaudio --nosocket=session-bus \
  --nosocket=system-bus --unshare=network \
  --unshare=ipc --nofilesystem=host:reset \
  --nodevice=input --nodevice=shm --nodevice=all \
  --no-talk-name=org.freedesktop.Flatpak \
  --no-talk-name=org.freedesktop.systemd1 \
  --no-talk-name=ca.desrt.dconf \
  --no-talk-name=org.gnome.Shell.Extensions
```

Then do the same for the user-level installation:

```bash
flatpak override --user \
  --nosocket=x11 --nosocket=fallback-x11 \
  --nosocket=pulseaudio --nosocket=session-bus \
  --nosocket=system-bus --unshare=network \
  --unshare=ipc --nofilesystem=host:reset \
  --nodevice=input --nodevice=shm --nodevice=all \
  --no-talk-name=org.freedesktop.Flatpak \
  --no-talk-name=org.freedesktop.systemd1 \
  --no-talk-name=ca.desrt.dconf \
  --no-talk-name=org.gnome.Shell.Extensions
```

#### Critical permissions to understand

Here's what the most dangerous permissions mean:

| Permission | Risk |
|----------|---------|
| `--socket=session-bus` / `--socket=system-bus` | Allows sandbox escape via D-Bus |
| `--talk-name=org.freedesktop.Flatpak` | Allows sandbox escape via Flatpak's D-Bus |
| `--talk-name=org.freedesktop.systemd1` | Allows loading arbitrary systemd services |
| `--talk-name=ca.desrt.dconf` | Allows modifying keybindings (command execution) |
| `--device=all` | Access to all devices (webcam, microphone, etc.) |
| `--filesystem=host` | Access to the entire filesystem |
| `--share=network` | Network access |

**The strategy is**: revoke everything first, then test if the app works. If it doesn't work, grant one permission at a time until you find the minimum necessary.

#### Flatseal: visual permission management

To manage permissions without going crazy on the command line, install Flatseal:

```bash
flatpak install flathub com.github.tchx84.Flatseal

flatpak --user override com.github.tchx84.Flatseal \
  --filesystem=/var/lib/flatpak/app:ro \
  --filesystem=xdg-data/flatpak/app:ro \
  --filesystem=xdg-data/flatpak/overrides:create
```

Flatseal will show you all the permissions of every Flatpak app with a clear, simple graphical interface.

**WARNING!** Don't enable unattended automatic Flatpak updates. When an app updates, new permissions get granted automatically without notification. Update manually and check the changelogs.

### Firejail: for native apps

For applications installed from the distribution's repositories (not Flatpak), Firejail can provide sandboxing based on namespaces and seccomp:

```bash
# Installation
sudo apt install firejail    # Debian/Ubuntu
sudo dnf install firejail    # Fedora
sudo pacman -S firejail      # Arch

# Automatic activation for all apps with a profile
sudo firecfg
```

`firecfg` creates symlinks that automatically route applications through Firejail when you launch them from the menu.

**Firejail's limitations:**
- It's a very large SUID binary, with a significant attack surface (elevated privileges)
- The sandboxing can be bypassed if you launch the app directly from `/usr/bin/app_name` instead of from the menu
- Its main advantage over Flatpak: it can confine X11 windows using Xpra/Xephyr

In my opinion, if you can use Flatpak, prefer it. Use Firejail only for apps not available as Flatpak.

### Mandatory Access Control (MAC)

MAC systems like SELinux and AppArmor add an access control layer that goes beyond traditional Unix permissions. Even if an application runs as root, MAC can prevent it from accessing resources not authorized by policy.

- **Fedora**: SELinux is active and in enforcing mode by default. Don't disable it
- **openSUSE**: you can choose between SELinux and AppArmor during installation
- **Arch**: you have to install and configure AppArmor manually

Remember that on traditional desktop distributions, MAC only confines some system daemons, not all applications. It's an important defense layer but not a complete one.

## Secure Boot and physical system security {#sicurezza-fisica style="color: white;"}

All the software hardening in the world is useless if someone can physically access your machine and tamper with it.

### Secure Boot with custom keys

Standard Secure Boot verifies that the bootloader and kernel are signed by trusted keys (usually Microsoft's). The problem? Microsoft's keys have a huge attack surface because they sign third-party drivers and bootloaders.



On **Arch Linux**, with **sbctl** you can enroll your own personal keys:

1. Enter UEFI firmware and put Secure Boot into "setup mode"
2. Boot Linux and install sbctl
3. Generate and enroll your keys:

```bash
# Installation (Arch)
sudo pacman -S sbctl

# Key generation
sudo sbctl create-keys

# Key enrollment
sudo sbctl enroll-keys

# Signing the kernel and bootloader
sudo sbctl sign -s /boot/vmlinuz-linux
sudo sbctl sign -s /boot/EFI/BOOT/BOOTX64.EFI
```

On Fedora the procedure requires different paths and packaging: check your distribution's up-to-date documentation before following equivalent steps.

**WARNING!** This procedure can brick some non-conformant UEFI implementations. Research your specific hardware before proceeding. Have an EEPROM reprogramming method ready as a fallback.

### Unified Kernel Image (UKI)

A UKI combines the kernel, initramfs, and microcode into a single signed image. This prevents tampering with the initramfs (an attack vector that standard Secure Boot doesn't cover).

The configuration is specific to each distribution and bootloader. On Fedora with systemd-boot and dracut, the process involves:

1. Configuring dracut to generate the UKI
2. Signing the UKI with the sbctl keys
3. Binding the encryption keys to the TPM's PCRs (minimum PCR 7, ideally PCRs 0,1,2,3,5,7,14)

**Note**: UKIs don't currently work well with Fedora Silverblue/Kinoite. This is a known limitation.

### Post-setup protections

- **UEFI password**: set a supervisor/administrator password in the UEFI firmware to prevent changes to boot settings
- **Disable USB boot**: prevents someone from booting a live system from your hardware
- **USBGuard**: protects against BadUSB and Rubber Ducky attacks by controlling which USB devices are authorized

```bash
sudo dnf install usbguard    # Fedora
sudo apt install usbguard    # Debian/Ubuntu

# Generate a policy based on currently connected devices
sudo usbguard generate-policy > /etc/usbguard/rules.conf
sudo systemctl enable --now usbguard
```

### Disabling media auto-mount

Auto-mounting USB drives and other removable media is a classic attack vector. On GNOME:

```bash
echo '[org/gnome/desktop/media-handling]
automount=false
automount-open=false' | sudo tee /etc/dconf/db/local.d/automount-disable

echo 'org/gnome/desktop/media-handling/automount
org/gnome/desktop/media-handling/automount-open' | sudo tee /etc/dconf/db/local.d/locks/automount-disable

sudo dconf update
```

## SSH hardening, authentication, and access {#autenticazione style="color: white;"}

### SSH hardening

If you have SSH active (maybe for remote access to your desktop), it's essential to configure it correctly. Edit `/etc/ssh/sshd_config`:

```bash
# Disable root login
PermitRootLogin no

# Public key authentication only
PasswordAuthentication no
PubkeyAuthentication yes

# Limit login attempts
MaxAuthTries 3

# Disable unnecessary forwarding
X11Forwarding no
AllowTcpForwarding no
AllowAgentForwarding no

# Timeout for inactive sessions
ClientAliveInterval 300
ClientAliveCountMax 2

# Limit which users can connect
AllowUsers your_username
```

After the changes:

```bash
sudo systemctl restart sshd
```

I strongly recommend using **only SSH keys** for authentication (disabling passwords completely). To generate a key pair:

```bash
ssh-keygen -t ed25519 -a 100
```

### Two-factor authentication with FIDO2

For local login and sudo, you can add a second factor using a FIDO2 key (like a YubiKey):

```bash
# Installation
sudo dnf install pam-u2f      # Fedora
sudo apt install libpam-u2f   # Debian/Ubuntu

# Registering the key
mkdir -p ~/.config/Yubico
pamu2fcfg > ~/.config/Yubico/u2f_keys
```

> **Warning!** When configuring pam-u2f, always use hardcoded values for `origin` and `appid` as described in the ArchWiki documentation. Don't use the `pam://$HOSTNAME` defaults, because if you change the hostname, login will stop working.

### PAM hardening (Fedora/RHEL)

On Red Hat-based distributions, `authselect` simplifies PAM hardening:

```bash
# Replace "profile_name" with the authselect profile currently in use
sudo authselect select profile_name with-faillock without-nullok with-pamaccess
```

This enables:
- **faillock**: locks the account after too many failed attempts
- **without-nullok**: prevents login with an empty password
- **with-pamaccess**: enables access control via `/etc/security/access.conf`

### User and privilege management

Some basic rules that are often ignored:

- **Don't use root directly**: always use `sudo` for privileged commands
- **Limit the sudo/wheel group**: only users who actually need it
- **Password policy**: set a reasonable minimum length and complexity
- **Audit accounts**: remove or disable unused accounts

```bash
# Check users with a login shell
grep -v '/nologin\|/false' /etc/passwd

# Lock an unused account
sudo usermod -L username

# Check who's in the sudo/wheel group
getent group sudo    # Debian/Ubuntu
getent group wheel   # Fedora/Arch
```

## Reducing the attack surface: disabling unnecessary services {#servizi style="color: white;"}

Every running service is a potential entry point. The principle is simple: if you don't use it, turn it off.

```bash
# List all active services
systemctl list-units --type=service --state=running

# Disable an unnecessary service
sudo systemctl disable --now service_name
```

Services commonly unnecessary on a desktop:

| Service | Function | When to disable |
|----------|----------|---------------------|
| `cups` | Printing | If you don't have printers |
| `avahi-daemon` | Network service discovery (mDNS) | If you don't use Bonjour/zeroconf |
| `bluetooth` | Bluetooth | If you don't use Bluetooth devices |
| `sshd` | SSH server | If no one connects to your PC remotely |
| `rpcbind` | RPC/NFS | If you don't use NFS shares |

To check which ports are listening:

```bash
sudo ss -tulnp
```

If you see listening services you don't recognize, investigate before disabling them.

## Wayland vs X11: display server security {#wayland style="color: white;"}

As mentioned earlier, Wayland is now the default graphics protocol on most modern distributions. This is a huge step forward for security, because the old X11 had no concept of isolation between windows at all.

That said, you might still have **XWayland** active on your system. XWayland is a compatibility layer that lets old X11 applications run under Wayland. The problem is that it reintroduces some of X11's security flaws: apps running under XWayland can potentially capture the input and screen of other XWayland apps (though not of native Wayland ones).

To check if XWayland is active:

```bash
# If it returns results, XWayland is in use
xlsclients 2>/dev/null
```

For most users, the current situation is already good: the main apps (browsers, file managers, terminals, editors) all support native Wayland. The few apps that still require XWayland are generally older or specialized ones.

If you want maximum security and you're sure all your apps run on native Wayland, you can completely disable XWayland on GNOME. Create the file `/etc/systemd/user/org.gnome.Shell@wayland.service.d/override.conf`:

```ini
[Service]
ExecStart=
ExecStart=/usr/bin/gnome-shell --no-x11
```

Electron apps (VS Code, Discord, Slack, etc.) generally work with Wayland using the `--ozone-platform=wayland` flag.

## Logging and auditing: monitoring system security {#logging style="color: white;"}

A secure system also needs to be observable. If something goes wrong, logs are your only source of information for understanding what happened.

### journald configuration

Systemd journal is the default logging system. Make sure it's configured to persist logs across reboots:

```bash
# Make sure the directory exists
sudo mkdir -p /var/log/journal

# Edit /etc/systemd/journald.conf
# Set:
Storage=persistent
Compress=yes
```

### Auditd

For more detailed auditing of system operations, install and configure auditd:

```bash
sudo dnf install audit        # Fedora
sudo apt install auditd       # Debian/Ubuntu

sudo systemctl enable --now auditd
```

Useful audit rules for a desktop:

```bash
# Monitor changes to authentication files
sudo auditctl -w /etc/passwd -p wa -k identity
sudo auditctl -w /etc/shadow -p wa -k identity
sudo auditctl -w /etc/group -p wa -k identity
sudo auditctl -w /etc/sudoers -p wa -k sudoers

# Monitor execution of privileged commands
sudo auditctl -w /usr/bin/sudo -p x -k privileged
sudo auditctl -w /usr/bin/su -p x -k privileged
```

To make the rules persistent, add them to `/etc/audit/rules.d/hardening.rules`.

## Verifying the setup: security tests and audits {#verifica style="color: white;"}

Never trust a setup you haven't tested. Here's how to verify everything works.

### Verification checklist

After applying the configurations in this guide, verify each component:

**1. Disk encryption**
```bash
# Verify that LUKS is active
sudo cryptsetup status /dev/mapper/volume_name
# Should show "active" and the encryption details
```

**2. Firewall**
```bash
# Fedora
sudo firewall-cmd --list-all
# The default zone must be "drop"

# Ubuntu
sudo ufw status verbose
# Should show "deny (incoming)"
```

**3. Kernel parameters**
```bash
# Check the boot parameters
cat /proc/cmdline
# You should see the parameters you added

# Check the sysctls
sudo sysctl kernel.kptr_restrict
# Should return 2
sudo sysctl kernel.dmesg_restrict
# Should return 1
```

**4. SELinux/AppArmor**
```bash
# SELinux (Fedora)
getenforce
# Should return "Enforcing"

# AppArmor (Debian/Ubuntu/openSUSE)
sudo aa-status
# Shows the loaded and active profiles
```

**5. Flatpak permissions**
```bash
# Check the global overrides
flatpak override --show
# Should show the restrictions you applied
```

**6. SSH**
```bash
# Test the SSH configuration
sudo sshd -t
# Should not return any errors

# Verify that root login is disabled
grep "PermitRootLogin" /etc/ssh/sshd_config
# Should show "no"
```

**7. Listening services**
```bash
sudo ss -tulnp
# Verify there are no unexpected services listening
```

**8. MAC address**
```bash
# Check that the MAC is randomized
ip link show
# The MAC should change with every connection
```

### Automated audit tools

For a more thorough check, you can use:

```bash
# Lynis — complete security audit
sudo dnf install lynis    # Fedora
sudo apt install lynis    # Debian/Ubuntu

sudo lynis audit system
```

Lynis will give you a security score and a detailed list of suggestions to further improve your setup.

## Conclusions {#conclusioni style="color: white;"}

You made it, great heroes! 🛡️

You've turned a standard Linux install into a hardened system with:

- **Disk encryption** to protect data at rest
- **Restrictive firewall** to control network traffic
- **Hardened kernel** with advanced security parameters
- **Sandboxing** to isolate applications
- **MAC** to control access at the system level
- **Custom Secure Boot** to protect the boot process
- **Logging and auditing** to monitor the system

Remember: security isn't a destination, it's a journey. Keep the system updated, check the logs periodically, review configurations whenever you add new software. And above all, never stop learning.

Thanks so much for reading! If this guide was useful to you, share it with anyone you think could benefit from it. The more aware turtles there are, the safer the sea is for everyone.

---

## Related Guides

- **[Self-Hosted VPN: Wireguard + Pi-Hole + Unbound](/vpn)** - Build your own private VPN for an encrypted, ad-free connection
- **[How to Create a Threat Model](/threat-model)** - The first step to understanding what to protect and from whom
- **[The Complete Guide to macOS Security](/macos-security)** - Hardening for those who also use macOS
- **[The Definitive Guide to GrapheneOS](/graphene)** - The most secure mobile operating system in the world

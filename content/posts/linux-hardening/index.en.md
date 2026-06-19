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

> **TL;DR** — In this guide, you will learn:
> - How to choose the right Linux distribution for your security and privacy objectives.
> - How to configure disk encryption, firewalls, and kernel hardening from initial installation.
> - How to isolate applications using Flatpak, Firejail, and advanced sandboxing techniques.
> - How to verify and audit your security posture using system verification tools.

## Summary

Linux hardening reduces your system's attack surface and limits the blast radius of a potential compromise. Achieving a secure desktop requires an up-to-date distribution, full-disk encryption, a restrictive firewall, secure DNS resolution, kernel hardening, application sandboxing, Secure Boot verification, service management, and periodic audits. Linux is not secure by default; it becomes secure only through consistent and intentional configuration.

The Linux ecosystem is often portrayed as a security paradise: just install any distribution and you are magically protected from all threats. The reality is far more nuanced. A desktop Linux installation left in its default configuration can be surprisingly vulnerable. Fortunately, with the right knowledge and a little patience, you can transform your setup into a secure digital fortress.

This guide walks you through the hardening process step-by-step, covering everything from distribution selection to local filesystem overrides. 

Security is a continuous process, not a static state. There is no single "perfect" configuration; there is only the configuration that meets your specific threat model. Every section in this guide weighs the trade-offs of each mitigation so you can make informed decisions.

This guide is open to improvements and suggestions. If you want to contribute, report errors, or propose additions, feel free to open a pull request on [GitHub](https://github.com/b4lol/portfolio).

---

## Why use Linux for security? {#perche-linux style="color: white;"}

Using Linux provides concrete advantages for security and privacy, though it comes with limitations you must understand.

### Transparency and Control

Linux is open source. The codebase is transparent and verifiable by anyone. When proprietary operating systems claim they do not collect telemetry or access your data, you must trust their claims blindly. On Linux, you can verify this behavior. While no single developer audits millions of lines of code daily, the public nature of the code makes backdoors difficult to hide.

Furthermore, control is absolute: you decide exactly what runs on your system, which ports are open, and what telemetry is allowed. There are no forced updates, hidden background services, or pre-installed bloatware.

### Inherent Desktop Security Gaps

Out-of-the-box, desktop Linux installations often lack modern endpoint security mitigations present in macOS or Windows 11:

*   **Application Sandboxing**: By default on a standard Linux desktop, user-installed applications have read/write access to your entire home directory and system sockets. Sandboxing is not enforced natively at the OS level.
*   **Secure Boot Integration**: While Linux supports Secure Boot, the default configuration relies on Microsoft's third-party keys rather than local, user-managed cryptographic signatures.
*   **Wayland vs. X11**: The historical X11 graphics protocol is insecure; any running graphical application can capture keystrokes, inject input, and record screen activity from other windows. Upgrading to Wayland is essential to enforce graphical app isolation.

The strength of Linux is that it provides the raw tools to resolve these gaps. The responsibility for configuring these protections rests with you.

---

## Choosing a Secure Linux Distribution {#scelta-distro style="color: white;"}

Selecting your distribution is the foundation of your security architecture. An incorrect choice here can undermine all subsequent hardening efforts.

### Release Models: Rolling vs. Fixed

A common misconception is that "stable" distributions (like Debian Stable) are more secure because their packages change less frequently. In practice, the opposite is often true for security patches.

Fixed-release distributions freeze package versions and backport security patches. The problem is that many security fixes are merged upstream without receiving an official CVE identifier, meaning they are rarely backported to legacy packages. Additionally, backporting complex patches can introduce regression vulnerabilities.

Rolling-release or rapid-release distributions (like Fedora, Arch, or openSUSE Tumbleweed) pull directly from upstream releases, ensuring you receive security fixes immediately as written by the original developers.

> [!TIP]
> If you are concerned about stability on a rolling-release system, select a distribution that supports transactional file systems (like openSUSE Aeon) or configure system rollbacks using Btrfs snapshots. This gives you the latest security updates with the ability to revert changes if an update causes issues.

### Desktop Environments: The Wayland Requirement

The primary security requirement for your desktop environment is native support for the **Wayland** graphics protocol. The two recommended desktop environments are **GNOME** and **KDE Plasma**.

Wayland isolates graphical applications from one another. Under Wayland, applications cannot record the screen, capture keystrokes from other windows, or inject inputs without explicit user consent mediated by the desktop compositor.

*   **GNOME**: A minimal, opinionated environment that integrates tightly with core security APIs. It is the default on Fedora Workstation and Ubuntu.
*   **KDE Plasma**: Highly customizable and feature-rich. Wayland support in modern KDE Plasma is stable and serves as the default on openSUSE and Fedora KDE Spin.

Verify your active display protocol by running:
```bash
echo $XDG_SESSION_TYPE
```
The output must return `wayland`. If it returns `x11`, application sandboxing cannot be enforced securely.

### Recommended Distributions

#### 1. Fedora Workstation (Recommended)
Fedora offers a rapid-release cycle with up-to-date kernels, SELinux enabled in enforcing mode by default, and quick adoption of modern security technologies (Wayland, PipeWire). It is the most balanced choice for everyday development.

#### 2. Debian Stable
Debian provides an incredibly stable, low-maintenance base. While packages are older, the Debian Security Team is highly responsive. To mitigate the lag on upstream package updates, run user-facing applications (like browsers) via Flatpak to keep them updated independently of the core OS.

#### 3. Fedora Atomic Desktops (Silverblue/Kinoite)
An immutable operating system variant where the root filesystem is mounted read-only. Updates are applied atomically as system images, ensuring you can roll back the entire OS to a prior state on boot if a failure occurs. Applications are isolated using containerization and Flatpak.

#### 4. SecureBlue
A hardened downstream variant of Fedora Atomic. It integrates `hardened_malloc` globally, enforces restrictive kernel configurations, blacklists unnecessary kernel modules, and packages security-hardened browsers (like Trivalent, featuring Vanadium patches). This is the best choice if you want pre-applied hardening out-of-the-box.

#### 5. Qubes OS (Advanced)
Qubes OS achieves security through virtualization-based compartmentalization using the Xen hypervisor. Instead of securing a single operating system, Qubes isolates activities (e.g., banking, work, untrusted downloads) into separate virtual machines ("qubes"). If an application in a specific qube is compromised, the malware cannot access other qubes or the host system.

#### 6. Whonix
Whonix is a specialized distribution focused on anonymity. It consists of two virtual machines: a Gateway that routes all traffic through Tor, and an isolated Workstation. Even if a local exploit compromises the Workstation, the malware cannot leak your public IP address because the Workstation has no direct access to the host network interface.

### Distributions to Avoid

*   **Pentesting OS (Kali, Parrot, BlackArch)**: These are offensive security distributions designed to run tools as root from a live environment. They are not hardened for daily desktop use.
*   **Libre Kernels (Guix, Parabola)**: Removing proprietary microcode updates prevents your CPU from receiving hardware-level security mitigations (such as patches for Spectre or Meltdown), leaving your physical hardware vulnerable.
*   **Manjaro**: Artificially holds back packages compared to Arch Linux, creating unnecessary windows of vulnerability for disclosed exploits.

---

## Secure Installation with Disk Encryption {#installazione style="color: white;"}

Several critical security configurations must be applied during the initial installation process.

### 1. Full Disk Encryption (LUKS)

Always encrypt your disk using LUKS (Linux Unified Key Setup) during installation. If your laptop is lost or stolen, your data remains unreadable without your decryption passphrase.

*   Select the encryption option in your installer's partitioning manager.
*   Configure a long, cryptographically strong passphrase.
*   If partitioning manually via the CLI, use the `--integrity` flag with `cryptsetup` to enable authenticated encryption, protecting against physical sector tampering.

### 2. Swap Space Security

Swap space can leak sensitive memory contents (including plaintext credentials and decryption keys) to your physical disk.

*   Ensure swap partitions are encrypted under the same LUKS volume.
*   Alternatively, disable disk swap entirely and use **ZRAM** (compressed swap inside RAM), which is the default on Fedora.

### 3. Restrictive Partition Mount Options

If configuring custom partition mounts, apply security flags in `/etc/fstab` to limit execution privileges:

| Partition | Mount Flags | Objective |
|-----------|-------------|-----------|
| `/boot` | `nodev,noexec,nosuid` | Prevents binary execution on the boot volume. |
| `/boot/efi` | `nodev,noexec,nosuid` | Prevents execution on the EFI partition. |
| `/var` | `nodev,nosuid` | Limits device creation and SUID execution on variable data. |

> [!WARNING]
> Do not apply `noexec` to `/home` or `/root`, as this will break Flatpak runtimes, local compilers, and virtual environments.

### 4. Generic Hostname and Usernames

Your username and hostname are transmitted in network requests and logs, which can be used to track you across networks.

*   Set a generic username (e.g., `user`).
*   Set your hostname to `localhost` using:
    ```bash
    sudo hostnamectl hostname "localhost"
    ```

---

## Post-Installation Hardening: Firmware & Updates {#post-installazione style="color: white;"}

### Update Firmware & Microcode

Ensure your CPU microcode is up-to-date to patch processor-level hardware vulnerabilities.

```bash
# Verify microcode on Fedora
dnf list installed | grep microcode

# Install microcode on Debian
sudo apt install intel-microcode     # Intel CPUs
sudo apt install amd64-microcode     # AMD CPUs

# Install microcode on Arch
sudo pacman -S intel-ucode           # Intel CPUs
sudo pacman -S amd-ucode             # AMD CPUs
```

Update system peripheral firmware (e.g., UEFI, SSD, controllers) using `fwupd`:
```bash
sudo fwupdmgr refresh
sudo fwupdmgr update
```

### Telemetry Deprecation

Disable analytics and tracking identifiers implemented by your distribution:

```bash
# Disable DNF install counting on Fedora
echo "countme=false" | sudo tee -a /etc/dnf/dnf.conf

# Reset unique client ID on openSUSE
sudo truncate -s 0 /var/lib/zypp/AnonymousUniqueId
```

### Restrictive Global Permissions (Umask)

Set a default umask of `077` so that files created by your user are not readable by other local accounts:
```bash
# Append to /etc/profile or /etc/bash.bashrc
umask 077
```

---

## Network Hardening {#rete style="color: white;"}

### 1. MAC Address Randomization

Prevent physical tracking across Wi-Fi networks by randomizing your MAC address. Create `/etc/NetworkManager/conf.d/00-macrandomize.conf`:

```ini
[device]
wifi.scan-rand-mac-address=yes

[connection]
wifi.cloned-mac-address=random
ethernet.cloned-mac-address=random
```

Restart NetworkManager to apply:
```bash
sudo systemctl restart NetworkManager
```

### 2. Restrictive Firewall

Configure your firewall to drop all incoming connections by default.

#### Using firewalld (Fedora/openSUSE):
```bash
# Route incoming traffic to drop zone
sudo firewall-cmd --set-default-zone=drop

# Permit essential IPv6 handshake protocols
sudo firewall-cmd --add-protocol=ipv6-icmp --permanent
sudo firewall-cmd --add-service=dhcpv6-client --permanent
sudo firewall-cmd --reload

# Enable lockdown to block unauthorized polkit updates
sudo firewall-cmd --lockdown-on
```

#### Using ufw (Debian/Ubuntu):
```bash
sudo apt install ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw enable
```

### 3. DNSSEC and DNS-over-TLS (DoT)

Secure your DNS queries against spoofing and interception. If using `systemd-resolved`, configure `/etc/systemd/resolved.conf`:

```ini
[Resolve]
DNS=1.1.1.1#cloudflare-dns.com 9.9.9.9#dns.quad9.net
DNSSEC=yes
DNSOverTLS=yes
```
Restart systemd-resolved:
```bash
sudo systemctl restart systemd-resolved
```

### 4. Network Time Security (NTS)

Standard NTP queries are unauthenticated, allowing attackers to perform time-spoofing attacks to invalidate TLS certificates. Secure your synchronization using Chrony with NTS enabled.

Edit `/etc/chrony.conf`:
```text
server time.cloudflare.com iburst nts
server ntppool1.time.nl iburst nts
server nts.netnod.se iburst nts
server ptbtime1.ptb.de iburst nts
minsources 2
```

Enable the seccomp system call filter for the Chrony daemon:
```bash
# Add to /etc/sysconfig/chronyd (Fedora/Arch)
OPTIONS="-F 1"
```
Restart chronyd:
```bash
sudo systemctl restart chronyd
```

---

## Kernel Hardening {#kernel style="color: white;"}

### 1. Runtime sysctl Hardening

Configure `/etc/sysctl.d/99-hardening.conf` to restrict system calls, protect memory, and mitigate network attacks:

```ini
# Network Security
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

# Kernel Protections
kernel.sysrq = 0
kernel.core_uses_pid = 1
kernel.kptr_restrict = 2
kernel.dmesg_restrict = 1
kernel.perf_event_paranoid = 3
kernel.yama.ptrace_scope = 2
kernel.unprivileged_bpf_disabled = 1
net.core.bpf_jit_harden = 2

# Memory & ASLR Enhancements
vm.mmap_rnd_bits = 32
vm.mmap_rnd_compat_bits = 16
vm.swappiness = 1
kernel.randomize_va_space = 2
```
Apply the configurations:
```bash
sudo sysctl --system
```

### 2. Kernel Boot Parameters

Add these flags to your bootloader configuration (e.g., `/etc/default/grub` under `GRUB_CMDLINE_LINUX` or via `rpm-ostree kargs`):

#### CPU Mitigations:
```text
mitigations=auto,nosmt spectre_v2=on spectre_bhi=on spec_store_bypass_disable=on tsx=off kvm.nx_huge_pages=force nosmt=force l1d_flush=on spec_rstack_overflow=safe-ret gather_data_sampling=force reg_file_data_sampling=on
```
*Note: Disabling Simultaneous Multi-Threading (`nosmt=force`) provides protection against side-channel exploits but reduces CPU performance on multi-core workloads.*

#### Memory Protection Parameters:
```text
slab_nomerge init_on_alloc=1 init_on_free=1 pti=on vsyscall=none page_alloc.shuffle=1 randomize_kstack_offset=on debugfs=off oops=panic quiet loglevel=0
```
*   `init_on_alloc=1` / `init_on_free=1`: Overwrites allocated and freed memory pages with zeroes, preventing data reuse leaks.
*   `slab_nomerge`: Blocks slab cache merging, reducing the exploitability of heap vulnerabilities.

#### Direct Memory Access (DMA) Mitigations:
```text
intel_iommu=on amd_iommu=force_isolation efi=disable_early_pci_dma iommu=force iommu.passthrough=0 iommu.strict=1
```
Protects against physical DMA attacks via external ports (like Thunderbolt).

Update your bootloader config:
```bash
# Update GRUB configuration
sudo grub2-mkconfig -o /boot/grub2/grub.cfg

# Or if using Fedora Atomic
rpm-ostree kargs --append="slab_nomerge" --append="init_on_alloc=1" --append="init_on_free=1" --append="pti=on"
```

### 3. Kernel Module Blacklist

Prevent the loading of unused legacy filesystems and network protocols to reduce kernel attack surface. Create `/etc/modprobe.d/blacklist.conf`:

```text
# Unused Filesystems
install cramfs /bin/false
install freevxfs /bin/false
install hfs /bin/false
install hfsplus /bin/false
install jffs2 /bin/false
install udf /bin/false

# Unused Protocols
install dccp /bin/false
install sctp /bin/false
install rds /bin/false
install tipc /bin/false

# Bluetooth (comment out if required)
install bluetooth /bin/false
install btusb /bin/false

# Hardware Sensors & Accessories
install thunderbolt /bin/false
install uvcvideo /bin/false
```

### 4. Hardened Memory Allocator

Replace the standard glibc memory allocator with GrapheneOS's `hardened_malloc` to mitigate memory-corruption vulnerabilities.

```bash
# Install on Fedora
sudo dnf copr enable secureblue/hardened_malloc
sudo dnf install hardened_malloc

# Install on Arch
yay -S hardened_malloc-git
```

Enable it globally by appending it to `/etc/ld.so.preload`:
```text
/usr/lib64/libhardened_malloc.so
```

---

## Application Sandboxing {#sandboxing style="color: white;"}

### Flatpak Permission Hardening

Flatpak runs applications inside sandbox namespaces. However, many desktop packages request permissive defaults. Use `flatpak override` to strip dangerous defaults globally:

```bash
# Harden system installations
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

# Harden user space overrides
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

#### Manage Sandbox Overrides Visually (Flatseal)
Install Flatseal to configure individual overrides via a graphical interface:
```bash
flatpak install flathub com.github.tchx84.Flatseal
```

#### Dangerous Flatpak Permissions to Revoke:
*   `--socket=session-bus` / `--socket=system-bus`: Allows D-Bus communication, which can be exploited to escape the sandbox.
*   `--filesystem=host`: Grants full read/write access to the host file system.
*   `--device=all`: Grants raw hardware access, including camera and microphone.

### Firejail Sandbox (Fallback)

For traditional applications that are not containerized via Flatpak, use Firejail to restrict their runtime access:
```bash
sudo dnf install firejail    # Fedora
sudo apt install firejail    # Debian
sudo pacman -S firejail      # Arch

# Enable globally for supported CLI/GUI tools
sudo firecfg
```

---

## Secure Boot & Physical Protection {#sicurezza-fisica style="color: white;"}

### Custom Secure Boot Signing (sbctl)

Instead of relying on Microsoft's third-party keys, generate and enroll your own Secure Boot keys to sign your kernel and bootloader.

On **Arch Linux**:
1.  Enter your BIOS/UEFI configuration page and toggle Secure Boot to **Setup Mode** (this clears Microsoft keys).
2.  Boot into Linux and generate your signature databases:
    ```bash
    sudo pacman -S sbctl
    sudo sbctl create-keys
    sudo sbctl enroll-keys
    ```
3.  Sign your boot files:
    ```bash
    sudo sbctl sign -s /boot/vmlinuz-linux
    sudo sbctl sign -s /boot/EFI/BOOT/BOOTX64.EFI
    ```
4.  Re-enable Secure Boot in the UEFI settings. The system will now boot only packages signed by your personal keys.

### BadUSB Protection (USBGuard)

Configure USBGuard to prevent unauthorized USB devices (such as malicious keystroke injection tools) from executing code when connected.

```bash
sudo dnf install usbguard    # Fedora
sudo apt install usbguard    # Debian

# Generate a policy containing currently connected devices
sudo usbguard generate-policy > /etc/usbguard/rules.conf

# Start and enable the service
sudo systemctl enable --now usbguard
```

### Disabling Media Auto-Mount

Ensure your desktop environment does not automatically execute files or parse directory contents upon USB connection.

On **GNOME**:
```bash
echo '[org/gnome/desktop/media-handling]
automount=false
automount-open=false' | sudo tee /etc/dconf/db/local.d/automount-disable

echo 'org/gnome/desktop/media-handling/automount
org/gnome/desktop/media-handling/automount-open' | sudo tee /etc/dconf/db/local.d/locks/automount-disable

sudo dconf update
```

---

## Access & SSH Hardening {#autenticazione style="color: white;"}

### SSH Configuration Security

If running an SSH daemon, edit `/etc/ssh/sshd_config` to secure remote entry:

```text
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
X11Forwarding no
AllowTcpForwarding no
AllowAgentForwarding no
ClientAliveInterval 300
ClientAliveCountMax 2
AllowUsers your_username
```
Restart the SSH daemon:
```bash
sudo systemctl restart sshd
```

Generate secure, modern keys using Ed25519:
```bash
ssh-keygen -t ed25519 -a 100
```

### Hardware Authentication (pam-u2f)

Integrate FIDO2 hardware keys into your PAM stack to require physical verification for `sudo` commands and local logins.

```bash
sudo dnf install pam-u2f      # Fedora
sudo apt install libpam-u2f   # Debian

# Bind your physical key
mkdir -p ~/.config/Yubico
pamu2fcfg > ~/.config/Yubico/u2f_keys
```

Configure PAM files under `/etc/pam.d/` (such as `system-auth` or `sudo`) to require the `pam_u2f.so` module for successful authentication.

---

## Disabling Unnecessary Services {#servizi style="color: white;"}

Minimize your local listening ports. Review active services:
```bash
systemctl list-units --type=service --state=running
```
Disable services that are not required for your system:
```bash
sudo systemctl disable --now cups              # Printing daemon
sudo systemctl disable --now avahi-daemon      # Multicast DNS (mDNS) discovery
sudo systemctl disable --now sshd              # Remote access SSH daemon
```

Verify active listening sockets:
```bash
sudo ss -tulnp
```

---

## Display Server Security: XWayland Isolation {#wayland style="color: white;"}

While Wayland is secure, legacy applications running via the **XWayland** compatibility layer are not isolated from one another. A compromised XWayland application can monitor keystrokes or scrape screen buffers from other legacy applications.

To audit if XWayland is active:
```bash
xlsclients 2>/dev/null
```
If it returns output, applications are executing inside XWayland.

For maximum security on native Wayland desktops, completely disable X11 fallback support in GNOME. Create `/etc/systemd/user/org.gnome.Shell@wayland.service.d/override.conf`:

```ini
[Service]
ExecStart=
ExecStart=/usr/bin/gnome-shell --no-x11
```

For Electron applications (VS Code, Slack, Discord), force native Wayland execution by appending these arguments:
```text
--ozone-platform=wayland
```

---

## Auditing and System Audits {#verifica style="color: white;"}

### Manual Audits

1.  **Encryption Verification**:
    ```bash
    sudo cryptsetup status /dev/mapper/volume_name
    ```
2.  **Firewall Verification**:
    ```bash
    sudo firewall-cmd --list-all      # firewalld
    sudo ufw status verbose           # ufw
    ```
3.  **Kernel Settings Verification**:
    ```bash
    cat /proc/cmdline
    sysctl kernel.yama.ptrace_scope   # Must return 2
    ```

### Automated Audits (Lynis)

Run a comprehensive security audit using Lynis to inspect configurations, directory permissions, and system services:
```bash
sudo dnf install lynis    # Fedora
sudo apt install lynis    # Debian

sudo lynis audit system
```

Review the output warnings and recommendations to further harden your system.

---

## Conclusions {#conclusioni style="color: white;"}

Your Linux workstation is now hardened with:
- **Full Disk Encryption** to secure data at rest.
- **Strict Local Firewall Rules** to block inbound connection vectors.
- **Hardened Sysctls and Boot Parameters** to mitigate kernel exploits.
- **Granular Flatpak Permissions** to run desktop apps securely.
- **Hardware-based U2F Keys** to secure logins and sudo access.
- **Audit Logging (auditd)** to monitor filesystem tampering.

Keep your system updated, monitor logs, and regularly audit application permissions to maintain your security posture. 🛡️

---

## Related Guides

- **[Self-Hosted VPN: WireGuard + Pi-hole + Unbound](/vpn)** — Secure your internet connection on public networks.
- **[How to Build a Threat Model](/threat-model)** — Identify assets and potential vulnerabilities.
- **[macOS Security Guide](/macos-security)** — Hardening steps for macOS development.
- **[GrapheneOS: The Definitive Guide](/graphene)** — Secure your mobile operating system.

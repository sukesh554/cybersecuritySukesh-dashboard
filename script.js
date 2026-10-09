/* ============================================================
   CyberShield – script.js
   All interactive features: quiz, tools, glossary, assessment
   ============================================================ */

'use strict';

// ============================================================
// NAVBAR – mobile toggle & smooth scroll active link
// ============================================================
(function initNavbar() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  // Close on link click (mobile)
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });

  // Active link highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 80) current = s.id;
    });
    links.querySelectorAll('a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
})();


// ============================================================
// MODAL – learn more cards
// ============================================================
const MODAL_CONTENT = {
  basics: {
    title: '🛡️ Cybersecurity Basics',
    body: `
      <p>Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These attacks usually aim to access, change, or destroy sensitive information; extort money; or interrupt normal business processes.</p>
      <h4>Core Security Goals</h4>
      <ul>
        <li><strong>Prevent</strong> unauthorized access to data and systems</li>
        <li><strong>Detect</strong> security incidents and anomalies quickly</li>
        <li><strong>Respond</strong> to incidents to minimize damage</li>
        <li><strong>Recover</strong> systems and data after an attack</li>
      </ul>
      <h4>Key Concepts</h4>
      <ul>
        <li><strong>Threat:</strong> Any potential danger to an asset</li>
        <li><strong>Vulnerability:</strong> A weakness that can be exploited</li>
        <li><strong>Risk:</strong> Threat × Vulnerability × Impact</li>
        <li><strong>Attack Surface:</strong> All possible entry points for attackers</li>
        <li><strong>Defense in Depth:</strong> Multiple layers of security controls</li>
        <li><strong>Zero Trust:</strong> Never trust, always verify — no implicit trust</li>
        <li><strong>Least Privilege:</strong> Grant only the access needed, nothing more</li>
      </ul>
      <h4>Security Domains (CISSP 8 Domains)</h4>
      <ul>
        <li>Security and Risk Management</li>
        <li>Asset Security</li>
        <li>Security Architecture and Engineering</li>
        <li>Communication and Network Security</li>
        <li>Identity and Access Management</li>
        <li>Security Assessment and Testing</li>
        <li>Security Operations</li>
        <li>Software Development Security</li>
      </ul>`
  },
  cia: {
    title: '🔺 The CIA Triad',
    body: `
      <p>The CIA Triad is the foundational model for information security policy. Every security control can be mapped to protecting one or more of these three properties.</p>
      <h4>🔒 Confidentiality</h4>
      <p>Ensures data is only accessible to authorized individuals. Mechanisms include encryption, access controls, and data classification.</p>
      <ul>
        <li>Encryption (AES-256, TLS)</li>
        <li>Role-based access control (RBAC)</li>
        <li>Multi-factor authentication (MFA)</li>
        <li>Data masking and tokenization</li>
      </ul>
      <h4>✅ Integrity</h4>
      <p>Ensures data has not been altered without authorization. Any modification is detectable.</p>
      <ul>
        <li>Hash functions (SHA-256, SHA-3)</li>
        <li>Digital signatures</li>
        <li>Checksums and MACs</li>
        <li>Version control and audit logs</li>
      </ul>
      <h4>⚡ Availability</h4>
      <p>Ensures systems and data are accessible when needed by authorized users.</p>
      <ul>
        <li>Redundancy and failover systems</li>
        <li>DDoS protection and load balancing</li>
        <li>Regular backups (3-2-1 rule)</li>
        <li>Disaster recovery planning (DRP/BCP)</li>
      </ul>
      <h4>Extensions: AAA</h4>
      <ul>
        <li><strong>Authentication:</strong> Who are you?</li>
        <li><strong>Authorization:</strong> What can you do?</li>
        <li><strong>Accounting:</strong> What did you do? (audit trails)</li>
      </ul>`
  },
  auth: {
    title: '🔑 Authentication',
    body: `
      <p>Authentication verifies the identity of a user, device, or system. It answers the question: <em>"Who are you?"</em></p>
      <h4>Authentication Factors</h4>
      <ul>
        <li><strong>Something you know:</strong> Password, PIN, security question</li>
        <li><strong>Something you have:</strong> Hardware token, smart card, phone (OTP)</li>
        <li><strong>Something you are:</strong> Fingerprint, face ID, retina scan</li>
        <li><strong>Somewhere you are:</strong> IP geolocation, GPS</li>
        <li><strong>Something you do:</strong> Typing pattern, gait analysis</li>
      </ul>
      <h4>Multi-Factor Authentication (MFA)</h4>
      <p>Combining two or more factors drastically reduces the risk of account compromise. Even if a password is stolen, the attacker cannot log in without the second factor.</p>
      <ul>
        <li>TOTP apps: Google Authenticator, Authy, Microsoft Authenticator</li>
        <li>Hardware keys: YubiKey (FIDO2/WebAuthn)</li>
        <li>Push notifications: Duo, Okta Verify</li>
        <li>SMS OTP (least secure — vulnerable to SIM swapping)</li>
      </ul>
      <h4>Password Best Practices</h4>
      <ul>
        <li>Minimum 16 characters, mixed character types</li>
        <li>Use a password manager (Bitwarden, 1Password, KeePass)</li>
        <li>Never reuse passwords across services</li>
        <li>Check haveibeenpwned.com for breached credentials</li>
      </ul>
      <h4>Modern Auth Protocols</h4>
      <ul>
        <li><code>OAuth 2.0</code> – Authorization framework (not authentication)</li>
        <li><code>OpenID Connect</code> – Identity layer on top of OAuth 2.0</li>
        <li><code>SAML 2.0</code> – XML-based SSO for enterprise</li>
        <li><code>FIDO2 / WebAuthn</code> – Passwordless authentication standard</li>
      </ul>`
  },
  authz: {
    title: '🚪 Authorization',
    body: `
      <p>Authorization determines what an authenticated user is permitted to do. It answers: <em>"What are you allowed to do?"</em></p>
      <h4>Access Control Models</h4>
      <ul>
        <li><strong>DAC (Discretionary):</strong> Owner controls access. Used in file systems (chmod).</li>
        <li><strong>MAC (Mandatory):</strong> System-enforced labels (e.g., Top Secret, Confidential). Used in government/military.</li>
        <li><strong>RBAC (Role-Based):</strong> Access based on job role. Most common in enterprise environments.</li>
        <li><strong>ABAC (Attribute-Based):</strong> Fine-grained policies based on user/resource/environment attributes.</li>
        <li><strong>ReBAC (Relationship-Based):</strong> Access based on relationships (e.g., Google Drive sharing).</li>
      </ul>
      <h4>Principle of Least Privilege</h4>
      <p>Grant each user, process, and system only the minimum access required to perform their function. Regularly audit and revoke unused permissions.</p>
      <h4>Zero Trust Authorization</h4>
      <ul>
        <li>Verify every request explicitly, regardless of location</li>
        <li>Use just-in-time (JIT) and just-enough-access (JEA)</li>
        <li>Segment microsystems and verify continuously</li>
        <li>Log all access for audit and forensics</li>
      </ul>
      <h4>Common Vulnerabilities</h4>
      <ul>
        <li>Broken access control (OWASP #1)</li>
        <li>Privilege escalation (horizontal and vertical)</li>
        <li>Insecure direct object references (IDOR)</li>
        <li>Missing function-level access control</li>
      </ul>`
  },
  encryption: {
    title: '🔐 Encryption',
    body: `
      <p>Encryption transforms readable plaintext into unreadable ciphertext using an algorithm and a key. Only those with the correct key can decrypt the data.</p>
      <h4>Symmetric Encryption</h4>
      <p>Same key for encryption and decryption. Fast, suitable for bulk data.</p>
      <ul>
        <li><code>AES-256</code> – Current gold standard (used by governments, banks)</li>
        <li><code>ChaCha20</code> – Fast symmetric cipher, used in TLS 1.3</li>
        <li><code>3DES</code> – Legacy, now deprecated</li>
      </ul>
      <h4>Asymmetric Encryption</h4>
      <p>Uses a public key (encrypt) and private key (decrypt). Slower but solves the key exchange problem.</p>
      <ul>
        <li><code>RSA-2048/4096</code> – Widely used for TLS, digital signatures</li>
        <li><code>ECDSA</code> – Elliptic curve, smaller key size, more efficient</li>
        <li><code>Ed25519</code> – Modern elliptic curve for SSH keys</li>
      </ul>
      <h4>How HTTPS/TLS Works</h4>
      <ul>
        <li>Asymmetric crypto is used to exchange a symmetric session key</li>
        <li>Symmetric key encrypts the bulk of the data transfer</li>
        <li>TLS 1.3 (2018) provides perfect forward secrecy</li>
      </ul>
      <h4>Encryption at Rest vs. in Transit</h4>
      <ul>
        <li><strong>In Transit:</strong> TLS/HTTPS, SSH, VPN (IPSec, WireGuard)</li>
        <li><strong>At Rest:</strong> Full disk encryption (BitLocker, VeraCrypt), database encryption</li>
        <li><strong>End-to-End (E2E):</strong> Only communicating users can read messages (Signal, WhatsApp)</li>
      </ul>`
  },
  hashing: {
    title: '🔢 Hashing',
    body: `
      <p>A cryptographic hash function takes any input and produces a fixed-size output (digest). It is <strong>one-way</strong> — you cannot reverse a hash to get the original input.</p>
      <h4>Properties of Good Hash Functions</h4>
      <ul>
        <li><strong>Deterministic:</strong> Same input always gives same output</li>
        <li><strong>Pre-image resistant:</strong> Cannot recover input from hash</li>
        <li><strong>Collision resistant:</strong> Extremely hard to find two inputs with same hash</li>
        <li><strong>Avalanche effect:</strong> Small change in input → completely different hash</li>
      </ul>
      <h4>Common Hash Functions</h4>
      <ul>
        <li><code>MD5</code> – 128-bit, BROKEN – do not use for security</li>
        <li><code>SHA-1</code> – 160-bit, DEPRECATED – collision found</li>
        <li><code>SHA-256</code> – 256-bit, widely used (Bitcoin, TLS, code signing)</li>
        <li><code>SHA-3</code> – NIST standard (2015), different algorithm from SHA-2</li>
        <li><code>bcrypt</code> – Designed for passwords: slow + adaptive + salt</li>
        <li><code>Argon2</code> – Password hashing champion (PHC winner 2015)</li>
        <li><code>BLAKE3</code> – Extremely fast, modern, secure</li>
      </ul>
      <h4>Password Hashing vs Data Hashing</h4>
      <p>For passwords, always use a <em>slow</em>, salted algorithm (bcrypt, Argon2, scrypt) to resist brute-force attacks. SHA-256 is too fast for passwords but perfect for data integrity checks and digital signatures.</p>
      <h4>Use Cases</h4>
      <ul>
        <li>Password storage (bcrypt/Argon2 + salt)</li>
        <li>File integrity verification (SHA-256 checksums)</li>
        <li>Digital signatures (hash then sign)</li>
        <li>Blockchain (SHA-256, Keccak-256)</li>
        <li>HMAC for message authentication</li>
      </ul>`
  },
  signatures: {
    title: '✍️ Digital Signatures',
    body: `
      <p>A digital signature provides proof of authenticity and integrity for digital messages, documents, and code. It uses asymmetric cryptography to sign with a private key and verify with the corresponding public key.</p>
      <h4>How Digital Signatures Work</h4>
      <ul>
        <li>Sender hashes the message (e.g., SHA-256)</li>
        <li>Sender encrypts the hash with their <strong>private key</strong> → signature</li>
        <li>Receiver hashes the received message</li>
        <li>Receiver decrypts the signature with sender's <strong>public key</strong></li>
        <li>If hashes match → signature is valid (authentic + intact)</li>
      </ul>
      <h4>Digital Signature Algorithms</h4>
      <ul>
        <li><code>RSA-PSS</code> – Standard for RSA signatures</li>
        <li><code>ECDSA</code> – Elliptic curve, used in TLS, Bitcoin</li>
        <li><code>EdDSA (Ed25519)</code> – Modern, fast, secure, used in SSH</li>
        <li><code>DSA</code> – Legacy government standard, being phased out</li>
      </ul>
      <h4>Public Key Infrastructure (PKI)</h4>
      <p>PKI is the system that manages digital certificates and public keys. Certificate Authorities (CAs) like DigiCert, Let's Encrypt, and GlobalSign issue X.509 certificates that bind a public key to an identity.</p>
      <ul>
        <li>TLS/HTTPS certificates (website authentication)</li>
        <li>Code signing certificates (trusted software delivery)</li>
        <li>Email signing (S/MIME, PGP)</li>
        <li>Document signing (PDF, DocuSign)</li>
      </ul>`
  },
  firewalls: {
    title: '🧱 Firewalls',
    body: `
      <p>A firewall is a network security device (hardware or software) that monitors and controls incoming and outgoing network traffic based on predetermined security rules.</p>
      <h4>Types of Firewalls</h4>
      <ul>
        <li><strong>Packet Filtering:</strong> Inspects IP/TCP headers only. Fast but limited. (Layer 3–4)</li>
        <li><strong>Stateful Inspection:</strong> Tracks connection state. Blocks packets that don't match established sessions. Most common.</li>
        <li><strong>Application-Layer (Proxy):</strong> Deep packet inspection at Layer 7. Understands protocols (HTTP, FTP, DNS).</li>
        <li><strong>Next-Gen Firewall (NGFW):</strong> Combines stateful + DPI + IPS + app awareness + user identity + SSL inspection.</li>
        <li><strong>Web Application Firewall (WAF):</strong> Protects web apps from SQLi, XSS, CSRF. Sits in front of web servers.</li>
      </ul>
      <h4>Firewall Rule Concepts</h4>
      <ul>
        <li><strong>Allowlist (Whitelist):</strong> Block everything, allow specific</li>
        <li><strong>Blocklist (Blacklist):</strong> Allow everything, block specific</li>
        <li><strong>Default Deny:</strong> Best practice — deny all, allow by exception</li>
        <li>Rules are processed top-to-bottom, first match wins</li>
      </ul>
      <h4>Popular Firewall Vendors</h4>
      <ul>
        <li>Palo Alto Networks (NGFW leader)</li>
        <li>Fortinet FortiGate (high performance)</li>
        <li>Cisco ASA / Firepower</li>
        <li>pfSense / OPNsense (open-source)</li>
        <li>AWS Security Groups, Azure NSG (cloud-native)</li>
      </ul>
      <h4>Network Zones</h4>
      <ul>
        <li><strong>Trusted (Internal):</strong> Corporate LAN, employee devices</li>
        <li><strong>Untrusted (External):</strong> Internet, third-party networks</li>
        <li><strong>DMZ:</strong> Isolated zone for public-facing servers (web, email, DNS)</li>
      </ul>`
  }
};

function openModal(topic) {
  const data = MODAL_CONTENT[topic];
  if (!data) return;
  const modal = document.getElementById('modal');
  document.getElementById('modalContent').innerHTML = `<h2>${data.title}</h2>${data.body}`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (!e || e.target === document.getElementById('modal') || e.type !== 'click' || e.currentTarget === document.querySelector('.modal-close')) {
    document.getElementById('modal').classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Explicit close button
document.querySelector('.modal-close') && document.querySelector('.modal-close').addEventListener('click', () => {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
});


// ============================================================
// TOOLS – Tab switching
// ============================================================
function showTool(id) {
  document.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById(id);
  if (panel) panel.classList.add('active');
  // Find matching button
  document.querySelectorAll('.tab-btn').forEach(b => {
    if (b.getAttribute('onclick') && b.getAttribute('onclick').includes(id)) {
      b.classList.add('active');
    }
  });
}


// ============================================================
// TOOL 1 – Password Strength Checker
// ============================================================
function checkPassword() {
  const val = document.getElementById('pwInput').value;
  const bar = document.getElementById('strengthBar');
  const label = document.getElementById('pwStrengthLabel');
  const feedback = document.getElementById('pwFeedback');

  if (!val) {
    bar.style.width = '0%';
    label.textContent = '';
    feedback.innerHTML = '';
    return;
  }

  let score = 0;
  const tips = [];

  if (val.length >= 8)  score++;
  if (val.length >= 12) score++;
  if (val.length >= 16) score++;
  else tips.push('Use at least 16 characters');

  if (/[a-z]/.test(val)) score++;
  else tips.push('Add lowercase letters (a–z)');

  if (/[A-Z]/.test(val)) score++;
  else tips.push('Add uppercase letters (A–Z)');

  if (/[0-9]/.test(val)) score++;
  else tips.push('Add numbers (0–9)');

  if (/[^a-zA-Z0-9]/.test(val)) score++;
  else tips.push('Add symbols (!@#$%^&*)');

  if (!/(.)\1{2,}/.test(val)) score++;
  else tips.push('Avoid repeated characters (aaa, 111)');

  const commonParts = ['password', '123456', 'qwerty', 'admin', 'letmein', 'abc123', 'iloveyou', 'welcome'];
  if (!commonParts.some(c => val.toLowerCase().includes(c))) score++;
  else tips.push('Avoid common password patterns');

  const levels = [
    { max: 3, label: '⛔ Very Weak', color: '#ff4757', pct: 10 },
    { max: 5, label: '🔴 Weak',      color: '#ff6b81', pct: 28 },
    { max: 6, label: '🟡 Fair',      color: '#ffa502', pct: 52 },
    { max: 7, label: '🟢 Strong',    color: '#2ed573', pct: 75 },
    { max: 9, label: '✅ Very Strong', color: '#00ff88', pct: 100 }
  ];

  const level = levels.find(l => score <= l.max) || levels[levels.length - 1];
  bar.style.width = level.pct + '%';
  bar.style.background = level.color;
  label.textContent = level.label;
  label.style.color = level.color;

  feedback.innerHTML = tips.length
    ? '<strong style="color:var(--orange)">Improve your password:</strong><ul style="margin-top:0.4rem;padding-left:1.2rem;list-style:disc">' + tips.map(t => `<li>${t}</li>`).join('') + '</ul>'
    : '<span style="color:var(--green)">✅ Excellent! Your password is very strong.</span>';
}

function togglePwVisibility(id, btn) {
  const input = document.getElementById(id);
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈 Hide';
  } else {
    input.type = 'password';
    btn.textContent = '👁 Show';
  }
}


// ============================================================
// TOOL 2 – Password Generator
// ============================================================
function updateLengthDisplay() {
  document.getElementById('lengthDisplay').textContent = document.getElementById('pwLength').value;
}

function generatePassword() {
  const len     = parseInt(document.getElementById('pwLength').value);
  const upper   = document.getElementById('inclUpper').checked;
  const lower   = document.getElementById('inclLower').checked;
  const nums    = document.getElementById('inclNums').checked;
  const symbols = document.getElementById('inclSymbols').checked;

  let charset = '';
  if (upper)   charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lower)   charset += 'abcdefghijklmnopqrstuvwxyz';
  if (nums)    charset += '0123456789';
  if (symbols) charset += '!@#$%^&*()-_=+[]{}|;:,.<>?';

  if (!charset) {
    document.getElementById('genPw').textContent = 'Select at least one character type.';
    return;
  }

  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);
  const pw = Array.from(arr).map(n => charset[n % charset.length]).join('');
  document.getElementById('genPw').textContent = pw;
  document.getElementById('genCopyMsg').textContent = '';
}

async function copyGenPw() {
  const pw = document.getElementById('genPw').textContent;
  if (!pw || pw === 'Click Generate to create a password') return;
  try {
    await navigator.clipboard.writeText(pw);
    document.getElementById('genCopyMsg').textContent = '✅ Copied to clipboard!';
    setTimeout(() => { document.getElementById('genCopyMsg').textContent = ''; }, 2500);
  } catch {
    document.getElementById('genCopyMsg').textContent = 'Press Ctrl+C to copy manually.';
  }
}


// ============================================================
// TOOL 3 – SHA-256 Hash Generator
// ============================================================
async function generateHash() {
  const text = document.getElementById('hashInput').value;
  const resultEl = document.getElementById('hashResult');

  if (!text.trim()) {
    resultEl.textContent = '⚠ Please enter some text to hash.';
    resultEl.style.color = 'var(--orange)';
    return;
  }

  const encoder = new TextEncoder();
  const data    = encoder.encode(text);
  const hashBuf = await crypto.subtle.digest('SHA-256', data);
  const hashArr = Array.from(new Uint8Array(hashBuf));
  const hashHex = hashArr.map(b => b.toString(16).padStart(2, '0')).join('');

  resultEl.innerHTML = `
    <div style="color:var(--text-dim);font-size:0.75rem;margin-bottom:0.4rem">SHA-256 Hash:</div>
    <div style="color:var(--green);word-break:break-all">${hashHex}</div>
    <div style="margin-top:0.6rem;font-size:0.72rem;color:var(--text-dim)">${hashArr.length * 8} bits &nbsp;|&nbsp; ${hashArr.length} bytes</div>`;
}


// ============================================================
// TOOL 4 – Security Checklist
// ============================================================
const CHECKLIST = [
  'I use unique passwords for every account',
  'I use a password manager (Bitwarden, 1Password, KeePass)',
  'I have enabled two-factor authentication on my email',
  'I have enabled 2FA on my bank / financial accounts',
  'My operating system receives automatic security updates',
  'My browser and extensions are up to date',
  'I have a reputable antivirus / endpoint protection installed',
  'My Wi-Fi uses WPA3 or WPA2 with a strong passphrase',
  'I have changed default router admin credentials',
  'I back up my data regularly (3-2-1 rule)',
  'I check URLs before clicking links in emails',
  'I verify email sender addresses before responding',
  'I use HTTPS sites for all sensitive transactions',
  'I avoid using public Wi-Fi for sensitive activities (or use VPN)',
  'I lock my screen when away from my device',
  'I review app permissions regularly',
  'I have a plan if my accounts are compromised',
  'My home IoT devices are on a separate guest network',
];

function initChecklist() {
  const container = document.getElementById('checklistItems');
  if (!container) return;

  container.innerHTML = CHECKLIST.map((item, i) => `
    <div class="checklist-item" id="ci-${i}" onclick="toggleCheck(${i})">
      <input type="checkbox" id="chk-${i}" />
      <label for="chk-${i}">${item}</label>
    </div>`).join('');

  updateChecklistScore();
}

function toggleCheck(i) {
  const item = document.getElementById(`ci-${i}`);
  const chk  = document.getElementById(`chk-${i}`);
  chk.checked = !chk.checked;
  item.classList.toggle('checked', chk.checked);
  updateChecklistScore();
}

function updateChecklistScore() {
  const checked = document.querySelectorAll('.checklist-item.checked').length;
  const total   = CHECKLIST.length;
  const pct     = Math.round((checked / total) * 100);
  let grade, color;

  if (pct >= 90)      { grade = '🏆 Excellent Security Posture!'; color = 'var(--green)'; }
  else if (pct >= 70) { grade = '✅ Good — Keep improving!'; color = 'var(--cyan)'; }
  else if (pct >= 50) { grade = '🟡 Fair — Significant gaps exist'; color = 'var(--orange)'; }
  else                { grade = '🔴 Needs Urgent Attention!'; color = 'var(--red)'; }

  const scoreEl = document.getElementById('checklistScore');
  if (scoreEl) {
    scoreEl.innerHTML = `<span style="color:${color}">${grade}</span> &nbsp;(${checked}/${total} completed — ${pct}%)`;
  }
}


// ============================================================
// TOOL 5 – URL Safety Checker
// ============================================================
function checkURL() {
  const raw = document.getElementById('urlInput').value.trim();
  const resultEl = document.getElementById('urlResult');

  if (!raw) {
    resultEl.className = 'url-result url-suspicious';
    resultEl.textContent = '⚠ Please enter a URL to analyze.';
    return;
  }

  const issues   = [];
  const warnings = [];
  const lc       = raw.toLowerCase();

  // Protocol check
  if (!raw.startsWith('http://') && !raw.startsWith('https://')) {
    issues.push('URL does not start with http:// or https://');
  }
  if (raw.startsWith('http://') && !raw.startsWith('https://')) {
    warnings.push('Uses insecure HTTP protocol (no encryption)');
  }

  // Suspicious TLDs
  const suspTLDs = ['.xyz', '.tk', '.ml', '.ga', '.cf', '.click', '.work', '.top', '.bid', '.loan'];
  if (suspTLDs.some(t => lc.includes(t))) {
    warnings.push('Domain uses a TLD commonly associated with free/disposable domains');
  }

  // Phishing keywords
  const phishKws = ['login', 'signin', 'account', 'verify', 'secure', 'update', 'confirm', 'password', 'bank', 'paypal', 'amazon', 'apple', 'microsoft', 'google', 'netflix'];
  const foundKws = phishKws.filter(k => lc.includes(k));
  if (foundKws.length >= 2) {
    warnings.push(`Contains multiple suspicious keywords: ${foundKws.slice(0,4).join(', ')}`);
  }

  // IP address in URL
  if (/https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(raw)) {
    issues.push('URL uses an IP address instead of a domain name (common in malicious links)');
  }

  // Very long URL
  if (raw.length > 200) {
    warnings.push('Unusually long URL — may be hiding the true destination');
  }

  // URL encoding / obfuscation
  if ((raw.match(/%[0-9a-f]{2}/gi) || []).length > 6) {
    warnings.push('Heavy URL encoding detected — may be obfuscating malicious content');
  }

  // Homograph / lookalike
  const lookalike = ['paypa1', 'googIe', 'arnazon', 'micros0ft', 'faceb00k', 'app1e'];
  if (lookalike.some(l => lc.includes(l))) {
    issues.push('Possible homograph/lookalike attack — domain may be impersonating a trusted brand');
  }

  // @ symbol (redirect trick)
  if (raw.includes('@')) {
    issues.push('Contains @ symbol — browser ignores everything before @, hiding the true domain');
  }

  // Multiple subdomains
  let hostPart = '';
  try { hostPart = new URL(raw).hostname; } catch { /* ignore */ }
  if (hostPart && (hostPart.match(/\./g) || []).length > 3) {
    warnings.push('Suspicious number of subdomains — common in phishing URLs');
  }

  // Render result
  if (issues.length > 0) {
    resultEl.className = 'url-result url-danger';
    resultEl.innerHTML = `<strong>🚨 DANGEROUS — Do not visit this URL!</strong><ul style="margin-top:0.6rem;padding-left:1.2rem;list-style:disc">${issues.map(i => `<li>${i}</li>`).join('')}${warnings.map(w => `<li style="color:var(--orange)">${w}</li>`).join('')}</ul>`;
  } else if (warnings.length > 0) {
    resultEl.className = 'url-result url-suspicious';
    resultEl.innerHTML = `<strong>⚠️ Suspicious — Proceed with caution</strong><ul style="margin-top:0.6rem;padding-left:1.2rem;list-style:disc">${warnings.map(w => `<li>${w}</li>`).join('')}</ul>`;
  } else {
    resultEl.className = 'url-result url-safe';
    resultEl.innerHTML = `<strong>✅ No common phishing indicators found</strong><br><small style="opacity:0.8">This tool checks static indicators only. Always use VirusTotal.com for comprehensive URL scanning.</small>`;
  }
}


// ============================================================
// TOOL 6 – Phishing Awareness Simulator
// ============================================================
const PHISHING_SCENARIOS = [
  {
    title: 'Scenario 1: Urgent Bank Alert',
    email: `<strong>From:</strong> security-alert@bankofamerica-secure.info<br>
<strong>Subject:</strong> ⚠️ URGENT: Your account has been suspended!<br><br>
Dear Valued Customer,<br><br>
We have detected unusual activity on your account. Your account access has been <strong>temporarily suspended</strong>. 
To restore access, you must verify your information within 24 hours or your account will be permanently closed.<br><br>
<span style="color:var(--cyan)">▶ Click here to verify your account immediately</span>`,
    options: [
      { text: 'Click the link to verify my account', isPhish: true },
      { text: 'Go directly to the official bank website or call the number on my card', isPhish: false },
      { text: 'Reply to the email with my account details', isPhish: true },
    ],
    explanation: '🎣 PHISHING: The domain "bankofamerica-secure.info" is NOT bankofamerica.com. Legitimate banks never ask you to verify via email links. Always go directly to official sites.'
  },
  {
    title: 'Scenario 2: Prize Winner Notification',
    email: `<strong>From:</strong> prizes@apple-reward-program.com<br>
<strong>Subject:</strong> 🎉 Congratulations! You've been selected to win an iPhone 15 Pro!<br><br>
You are our lucky winner! Apple has selected your email for a special promotional giveaway.<br><br>
To claim your prize, simply provide your shipping address and pay a small $5.99 processing fee using your credit card.<br><br>
<strong>⚡ Offer expires in 2 hours!</strong>`,
    options: [
      { text: 'Pay the $5.99 fee and claim my prize', isPhish: true },
      { text: 'Ignore and delete — Apple does not run this kind of lottery', isPhish: false },
      { text: 'Forward to friends so they can enter too', isPhish: true },
    ],
    explanation: '🎣 PHISHING: Apple never runs email lotteries. "Apple-reward-program.com" is not apple.com. Urgent timers and small fees are classic social engineering pressure tactics.'
  },
  {
    title: 'Scenario 3: IT Helpdesk Password Reset',
    email: `<strong>From:</strong> it-support@your-company-helpdesk.net<br>
<strong>Subject:</strong> Your password expires today — reset required<br><br>
Hi [Employee],<br><br>
This is your IT Department. Your corporate password expires <strong>today at 5PM</strong>. 
Failure to reset will lock you out of all company systems.<br><br>
Please use the link below to reset your password: <br>
<span style="color:var(--cyan)">http://reset.your-company-helpdesk.net/reset?token=a8f72</span>`,
    options: [
      { text: 'Click the link and reset my password immediately', isPhish: true },
      { text: 'Contact IT directly using the company directory number, not the email contact', isPhish: false },
      { text: 'Ignore it — if the password works, there is no problem', isPhish: false },
    ],
    explanation: '🎣 LIKELY PHISHING: "your-company-helpdesk.net" is an external domain, not your company\'s. Legitimate IT helpdesks use your official company domain. Verify all password reset requests via known-good contact channels.'
  }
];

function initPhishingSim() {
  const container = document.getElementById('phishingScenarios');
  if (!container) return;

  container.innerHTML = PHISHING_SCENARIOS.map((sc, si) => `
    <div class="phish-scenario">
      <h4>${sc.title}</h4>
      <div class="phish-email-body">${sc.email}</div>
      <div class="phish-choices" id="phish-choices-${si}">
        ${sc.options.map((opt, oi) => `
          <button class="phish-btn" onclick="answerPhish(${si}, ${oi})" id="phish-btn-${si}-${oi}">${opt.text}</button>
        `).join('')}
      </div>
      <div id="phish-feedback-${si}" class="phish-feedback" style="display:none"></div>
    </div>`).join('');
}

function answerPhish(si, oi) {
  const scenario = PHISHING_SCENARIOS[si];
  const opt      = scenario.options[oi];
  const feedback = document.getElementById(`phish-feedback-${si}`);

  // Disable all buttons for this scenario
  PHISHING_SCENARIOS[si].options.forEach((_, i) => {
    const btn = document.getElementById(`phish-btn-${si}-${i}`);
    btn.disabled = true;
    if (!scenario.options[i].isPhish) btn.classList.add('correct');
  });

  const clicked = document.getElementById(`phish-btn-${si}-${oi}`);
  if (opt.isPhish) {
    clicked.classList.add('wrong');
    feedback.className = 'phish-feedback wrong';
    feedback.innerHTML = `❌ That was a phishing action! <br><br>${scenario.explanation}`;
  } else {
    feedback.className = 'phish-feedback correct';
    feedback.innerHTML = `✅ Correct! Good job staying safe. <br><br>${scenario.explanation}`;
  }
  feedback.style.display = 'block';
}


// ============================================================
// QUIZ
// ============================================================
const QUIZ_QUESTIONS = [
  {
    q: 'What does the "C" in the CIA Triad stand for?',
    opts: ['Cyber', 'Confidentiality', 'Cryptography', 'Compliance'],
    ans: 1,
    exp: 'CIA Triad: Confidentiality, Integrity, and Availability.'
  },
  {
    q: 'Which protocol provides encrypted web communication?',
    opts: ['HTTP', 'FTP', 'HTTPS', 'SMTP'],
    ans: 2,
    exp: 'HTTPS (HTTP Secure) uses TLS to encrypt web traffic.'
  },
  {
    q: 'What type of attack involves an attacker intercepting communications between two parties?',
    opts: ['Phishing', 'DDoS', 'Man-in-the-Middle', 'Ransomware'],
    ans: 2,
    exp: 'MitM attacks intercept and potentially alter communications.'
  },
  {
    q: 'Which of the following is a one-way cryptographic function used to verify data integrity?',
    opts: ['AES', 'RSA', 'SHA-256', 'SSL'],
    ans: 2,
    exp: 'SHA-256 is a cryptographic hash function — one-way and collision-resistant.'
  },
  {
    q: 'What does 2FA stand for?',
    opts: ['Two-Factor Authentication', 'Two-Firewall Architecture', 'Trusted Functional Access', 'Transport and File Authentication'],
    ans: 0,
    exp: 'Two-Factor Authentication adds a second layer of security beyond a password.'
  },
  {
    q: 'What is the default port for HTTPS traffic?',
    opts: ['80', '22', '443', '8080'],
    ans: 2,
    exp: 'Port 443 is the standard port for HTTPS. Port 80 is HTTP.'
  },
  {
    q: 'What is "social engineering" in a security context?',
    opts: [
      'Writing secure code using best practices',
      'Manipulating people psychologically to divulge information',
      'Engineering social media platforms',
      'Using AI to improve network security'
    ],
    ans: 1,
    exp: 'Social engineering exploits human psychology rather than technical vulnerabilities.'
  },
  {
    q: 'Which type of malware encrypts files and demands payment?',
    opts: ['Spyware', 'Adware', 'Ransomware', 'Rootkit'],
    ans: 2,
    exp: 'Ransomware encrypts victim files and demands cryptocurrency payment for decryption.'
  },
  {
    q: 'What does "least privilege" mean in cybersecurity?',
    opts: [
      'Using the weakest encryption possible',
      'Granting the minimum access rights necessary',
      'Restricting systems to one user only',
      'Disabling all admin accounts'
    ],
    ans: 1,
    exp: 'Least privilege limits access to only what is needed, reducing the attack surface.'
  },
  {
    q: 'What is a "zero-day vulnerability"?',
    opts: [
      'A vulnerability patched within 24 hours',
      'A flaw known only to the vendor',
      'A vulnerability with no existing patch yet known publicly',
      'A system with no security software installed'
    ],
    ans: 2,
    exp: 'Zero-day vulnerabilities are unknown to the vendor and have no available patch.'
  },
  {
    q: 'Which of these is the MOST secure method for storing passwords in a database?',
    opts: ['Base64 encoding', 'MD5 hash', 'bcrypt/Argon2 with salt', 'AES encryption'],
    ans: 2,
    exp: 'bcrypt and Argon2 are slow, salted algorithms designed specifically for password hashing.'
  },
  {
    q: 'What does a VPN primarily do?',
    opts: [
      'Increases internet speed',
      'Creates an encrypted tunnel for network traffic',
      'Blocks all advertisements',
      'Provides antivirus protection'
    ],
    ans: 1,
    exp: 'VPNs encrypt traffic and create a secure tunnel, hiding data from eavesdroppers.'
  },
  {
    q: 'Which security framework defines a set of cybersecurity best practices organized in 18 controls?',
    opts: ['OWASP Top 10', 'CIS Controls', 'NIST SP 800-53', 'ISO 27001'],
    ans: 1,
    exp: 'CIS Controls (Center for Internet Security) provides 18 prioritized security actions.'
  },
  {
    q: 'What is the purpose of a DMZ in network architecture?',
    opts: [
      'To speed up internal network traffic',
      'To isolate public-facing servers from the internal network',
      'To store encrypted backups',
      'To manage user authentication'
    ],
    ans: 1,
    exp: 'A DMZ isolates public-facing services (web, email) from the internal trusted network.'
  },
  {
    q: 'What does "OSINT" stand for?',
    opts: [
      'Online Security Intelligence Network Tools',
      'Open Source Intelligence',
      'Operational Security Infrastructure',
      'Original Security Investigation Network Test'
    ],
    ans: 1,
    exp: 'OSINT (Open Source Intelligence) uses publicly available information for reconnaissance.'
  }
];

let quizState = { current: 0, score: 0, answered: [] };

function startQuiz() {
  quizState = { current: 0, score: 0, answered: [] };
  document.getElementById('quizStart').style.display = 'none';
  document.getElementById('quizResults').style.display = 'none';
  document.getElementById('quizMain').style.display = 'block';
  renderQuestion();
}

function renderQuestion() {
  const q = QUIZ_QUESTIONS[quizState.current];
  const total = QUIZ_QUESTIONS.length;

  document.getElementById('quizProgress').style.width = `${(quizState.current / total) * 100}%`;
  document.getElementById('quizCounter').textContent = `${quizState.current + 1} / ${total}`;
  document.getElementById('liveScore').textContent = quizState.score;
  document.getElementById('questionText').textContent = `Q${quizState.current + 1}. ${q.q}`;
  document.getElementById('nextBtn').style.display = 'none';

  const optsContainer = document.getElementById('optionsContainer');
  optsContainer.innerHTML = q.opts.map((o, i) => `
    <button class="option-btn" onclick="selectAnswer(${i})" id="opt-${i}">${String.fromCharCode(65 + i)}. ${o}</button>
  `).join('');
}

function selectAnswer(selected) {
  const q   = QUIZ_QUESTIONS[quizState.current];
  const btns = document.querySelectorAll('.option-btn');

  btns.forEach(b => b.disabled = true);
  btns[q.ans].classList.add('correct');

  if (selected === q.ans) {
    quizState.score++;
  } else {
    btns[selected].classList.add('wrong');
  }

  quizState.answered.push({ correct: selected === q.ans, exp: q.exp });
  document.getElementById('liveScore').textContent = quizState.score;

  // Show explanation
  const expDiv = document.createElement('div');
  expDiv.style.cssText = 'margin-top:0.8rem;padding:0.7rem 1rem;border-radius:8px;font-size:0.83rem;background:rgba(0,212,255,0.07);border:1px solid var(--border);color:var(--text-dim)';
  expDiv.innerHTML = `<strong style="color:var(--cyan)">💡 Explanation:</strong> ${q.exp}`;
  document.getElementById('optionsContainer').appendChild(expDiv);

  document.getElementById('nextBtn').style.display = 'inline-flex';
  if (quizState.current === QUIZ_QUESTIONS.length - 1) {
    document.getElementById('nextBtn').textContent = '🏁 See Results';
  }
}

function nextQuestion() {
  quizState.current++;
  if (quizState.current >= QUIZ_QUESTIONS.length) {
    showResults();
  } else {
    renderQuestion();
  }
}

function showResults() {
  document.getElementById('quizMain').style.display = 'none';
  const results = document.getElementById('quizResults');
  results.style.display = 'block';

  const total   = QUIZ_QUESTIONS.length;
  const score   = quizState.score;
  const pct     = Math.round((score / total) * 100);
  const wrong   = total - score;

  let icon, title, msg;
  if (pct >= 90) {
    icon = '🏆'; title = 'Cybersecurity Expert!'; msg = 'Outstanding! You have excellent cybersecurity knowledge.';
  } else if (pct >= 70) {
    icon = '🥈'; title = 'Security Savvy!'; msg = 'Great job! Review the topics you missed to reach expert level.';
  } else if (pct >= 50) {
    icon = '📚'; title = 'Keep Learning!'; msg = 'Good effort! There\'s room to grow. Explore the Learning Hub to deepen your knowledge.';
  } else {
    icon = '🔰'; title = 'Beginner — Start Learning!'; msg = 'Don\'t worry — cybersecurity takes time to master. Start with the basics in the Learning Hub.';
  }

  document.getElementById('resultIcon').textContent = icon;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultScore').textContent = `${score} / ${total}`;
  document.getElementById('resultMessage').textContent = msg;
  document.getElementById('resultBreakdown').innerHTML = `
    <div class="breakdown-item breakdown-correct"><div class="breakdown-num">${score}</div><div class="breakdown-label">Correct</div></div>
    <div class="breakdown-item breakdown-wrong"><div class="breakdown-num">${wrong}</div><div class="breakdown-label">Wrong</div></div>
    <div class="breakdown-item breakdown-pct"><div class="breakdown-num">${pct}%</div><div class="breakdown-label">Score</div></div>`;

  document.getElementById('quizProgress').style.width = '100%';
}

function restartQuiz() {
  startQuiz();
}


// ============================================================
// SECURITY ASSESSMENT
// ============================================================
const ASSESSMENT_QUESTIONS = [
  {
    q: 'How do you manage your passwords?',
    key: 'passwords',
    options: [
      { text: 'Use the same password everywhere', score: 0 },
      { text: 'Different passwords, memorized', score: 1 },
      { text: 'Password manager with unique passwords', score: 3 },
    ]
  },
  {
    q: 'Do you use two-factor authentication (2FA)?',
    key: '2fa',
    options: [
      { text: 'No, never', score: 0 },
      { text: 'Only on some accounts', score: 1 },
      { text: 'Yes, on all important accounts', score: 3 },
    ]
  },
  {
    q: 'How often do you update your software and OS?',
    key: 'updates',
    options: [
      { text: 'Rarely or never', score: 0 },
      { text: 'Manually when I remember', score: 1 },
      { text: 'Automatic updates enabled', score: 3 },
    ]
  },
  {
    q: 'Do you back up your important data?',
    key: 'backups',
    options: [
      { text: 'No backups at all', score: 0 },
      { text: 'Occasional local backup', score: 1 },
      { text: 'Regular automated cloud + local backups', score: 3 },
    ]
  },
  {
    q: 'How do you handle suspicious emails?',
    key: 'phishing',
    options: [
      { text: 'I open them and click links if they look official', score: 0 },
      { text: 'I\'m careful but sometimes click', score: 1 },
      { text: 'Always verify sender and never click unexpected links', score: 3 },
    ]
  },
  {
    q: 'Do you use antivirus / endpoint security?',
    key: 'antivirus',
    options: [
      { text: 'No protection installed', score: 0 },
      { text: 'Free basic protection', score: 1 },
      { text: 'Reputable antivirus with real-time protection', score: 2 },
    ]
  },
  {
    q: 'What is your Wi-Fi security configuration?',
    key: 'wifi',
    options: [
      { text: 'Default router settings / WEP', score: 0 },
      { text: 'WPA2 with an OK password', score: 1 },
      { text: 'WPA3 / WPA2 with strong password, changed admin credentials', score: 3 },
    ]
  },
];

let assessmentAnswers = {};

function initAssessment() {
  const container = document.getElementById('assessmentQuestions');
  if (!container) return;

  container.innerHTML = ASSESSMENT_QUESTIONS.map((q, qi) => `
    <div class="assess-q">
      <label>${qi + 1}. ${q.q}</label>
      <div class="assess-options" id="assess-opts-${qi}">
        ${q.options.map((opt, oi) => `
          <button class="assess-opt" onclick="selectAssessOpt(${qi}, ${oi}, ${opt.score})" id="aopt-${qi}-${oi}">${opt.text}</button>
        `).join('')}
      </div>
    </div>`).join('');
}

function selectAssessOpt(qi, oi, score) {
  document.querySelectorAll(`#assess-opts-${qi} .assess-opt`).forEach(b => b.classList.remove('selected'));
  document.getElementById(`aopt-${qi}-${oi}`).classList.add('selected');
  assessmentAnswers[qi] = { score, oi };
}

function runAssessment() {
  const answered = Object.keys(assessmentAnswers).length;
  if (answered < ASSESSMENT_QUESTIONS.length) {
    alert(`Please answer all ${ASSESSMENT_QUESTIONS.length} questions before running the assessment.`);
    return;
  }

  const totalScore = Object.values(assessmentAnswers).reduce((s, a) => s + a.score, 0);
  const maxScore   = ASSESSMENT_QUESTIONS.reduce((s, q) => s + Math.max(...q.options.map(o => o.score)), 0);
  const pct = Math.round((totalScore / maxScore) * 100);

  let grade, gradeClass, summary;
  if (pct >= 80) {
    grade = 'A'; gradeClass = 'green';
    summary = 'Excellent security posture! You are following most best practices.';
  } else if (pct >= 60) {
    grade = 'B'; gradeClass = 'orange';
    summary = 'Good awareness with some areas needing improvement.';
  } else {
    grade = 'C'; gradeClass = 'red';
    summary = 'Significant security gaps detected. Take immediate action.';
  }

  const recommendations = [];
  ASSESSMENT_QUESTIONS.forEach((q, qi) => {
    const ans = assessmentAnswers[qi];
    const maxQ = Math.max(...q.options.map(o => o.score));
    if (ans.score < maxQ) {
      const bestOpt = q.options[q.options.findIndex(o => o.score === maxQ)];
      recommendations.push({ icon: getRec(q.key).icon, text: getRec(q.key).text });
    }
  });

  const resultsEl = document.getElementById('assessmentResults');
  resultsEl.style.display = 'block';
  resultsEl.innerHTML = `
    <div class="assess-score-header">
      <h3>Your Security Assessment Results</h3>
      <div class="assess-grade ${gradeClass}">${grade}</div>
      <p style="color:var(--text-dim)">${summary} &nbsp;(${totalScore}/${maxScore} points — ${pct}%)</p>
    </div>
    <div class="assess-recommendations">
      <h4>📋 Personalized Recommendations</h4>
      ${recommendations.length ? recommendations.map(r => `
        <div class="rec-item"><span class="rec-icon">${r.icon}</span><span>${r.text}</span></div>
      `).join('') : '<div class="rec-item"><span class="rec-icon">🏆</span><span>Outstanding! You are already following all the top security practices.</span></div>'}
    </div>`;

  resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getRec(key) {
  const recs = {
    passwords: { icon: '🔑', text: 'Use a password manager (Bitwarden is free and open-source) to generate and store unique, random passwords for every account.' },
    '2fa':     { icon: '📱', text: 'Enable two-factor authentication on all critical accounts (email, banking, social). Use an authenticator app like Authy or Google Authenticator.' },
    updates:   { icon: '🔄', text: 'Enable automatic updates for your OS and applications. Most breaches exploit known, patched vulnerabilities.' },
    backups:   { icon: '💾', text: 'Implement the 3-2-1 backup rule: 3 copies of data, on 2 different media, with 1 copy offsite/cloud.' },
    phishing:  { icon: '🎣', text: 'Always hover over links to verify destinations. Check sender domains carefully. When in doubt, navigate to the website directly.' },
    antivirus: { icon: '🛡️', text: 'Install reputable endpoint protection such as Malwarebytes, Windows Defender (built-in), or Bitdefender.' },
    wifi:      { icon: '📶', text: 'Switch to WPA3 (or WPA2-AES minimum), set a strong passphrase, change your router\'s admin password, and keep firmware updated.' }
  };
  return recs[key] || { icon: '🔒', text: 'Follow cybersecurity best practices for this area.' };
}


// ============================================================
// GLOSSARY
// ============================================================
const GLOSSARY_TERMS = [
  { term: 'Access Control List (ACL)', def: 'A list specifying which users or system processes can access objects and what operations are allowed.' },
  { term: 'Advanced Persistent Threat (APT)', def: 'A prolonged, targeted cyberattack where an intruder gains access and remains undetected for an extended period.' },
  { term: 'Antivirus', def: 'Software designed to detect, prevent, and remove malicious software (malware) from computer systems.' },
  { term: 'Attack Surface', def: 'The total number of different points (vectors) where an attacker can try to enter or extract data from a system.' },
  { term: 'Authentication', def: 'The process of verifying the identity of a user, device, or other entity before granting access.' },
  { term: 'Authorization', def: 'Determining what permissions an authenticated entity has — what they are allowed to access or do.' },
  { term: 'Backdoor', def: 'A hidden method for bypassing normal authentication or encryption in a computer system, product, or device.' },
  { term: 'Biometrics', def: 'Authentication methods based on unique physical or behavioral characteristics (fingerprints, face, retina, voice).' },
  { term: 'Blue Team', def: 'The defensive security team that protects an organization against cyber threats and responds to incidents.' },
  { term: 'Botnet', def: 'A network of internet-connected devices infected with malware, controlled by a botmaster for malicious purposes (spam, DDoS).' },
  { term: 'Brute Force', def: 'An attack method that tries every possible combination of passwords or keys until the correct one is found.' },
  { term: 'Buffer Overflow', def: 'A vulnerability where a program writes more data to a buffer than it can hold, potentially allowing code execution.' },
  { term: 'CAPTCHA', def: 'A Completely Automated Public Turing test to tell Computers and Humans Apart — prevents automated bot attacks.' },
  { term: 'Certificate Authority (CA)', def: 'A trusted entity that issues digital certificates binding public keys to identities in PKI.' },
  { term: 'CIA Triad', def: 'Confidentiality, Integrity, and Availability — the three core principles of information security.' },
  { term: 'CISO', def: 'Chief Information Security Officer — the executive responsible for an organization\'s information security strategy.' },
  { term: 'Command & Control (C2)', def: 'Infrastructure used by attackers to communicate with and control compromised systems in a botnet or targeted attack.' },
  { term: 'Cross-Site Scripting (XSS)', def: 'A web vulnerability where attackers inject malicious scripts into web pages viewed by other users.' },
  { term: 'Cryptography', def: 'The science of securing communications and data using mathematical techniques like encryption and hashing.' },
  { term: 'CVE', def: 'Common Vulnerabilities and Exposures — a standardized identifier system for publicly known cybersecurity vulnerabilities.' },
  { term: 'CVSS', def: 'Common Vulnerability Scoring System — a framework for rating the severity of security vulnerabilities (0–10).' },
  { term: 'Cybersecurity', def: 'The practice of protecting systems, networks, and programs from digital attacks and unauthorized access.' },
  { term: 'Dark Web', def: 'Part of the internet accessible only via special software (Tor), often used for anonymous communication and illegal marketplaces.' },
  { term: 'Data Breach', def: 'An incident where sensitive, protected, or confidential data is copied, transmitted, or stolen by unauthorized parties.' },
  { term: 'DDoS (Distributed Denial of Service)', def: 'An attack using multiple systems to flood a target with traffic, making it unavailable to legitimate users.' },
  { term: 'Defense in Depth', def: 'A strategy using multiple overlapping security controls to protect assets if one layer fails.' },
  { term: 'DMZ (Demilitarized Zone)', def: 'A network segment isolating external-facing servers (web, email) from the internal corporate network.' },
  { term: 'DNS Poisoning', def: 'An attack that corrupts DNS cache to redirect users to malicious websites (also called DNS spoofing).' },
  { term: 'Encryption', def: 'Converting plaintext into unreadable ciphertext using an algorithm and key; only those with the key can decrypt.' },
  { term: 'Endpoint Security', def: 'Security measures applied to end-user devices (laptops, phones, tablets) to protect them from threats.' },
  { term: 'Exploit', def: 'A piece of software or technique that takes advantage of a vulnerability to perform unauthorized actions.' },
  { term: 'False Positive', def: 'A security alert triggered by legitimate activity, incorrectly identified as malicious (common in IDS/AV).' },
  { term: 'FIDO2', def: 'An open authentication standard enabling passwordless login using hardware security keys or device biometrics.' },
  { term: 'Firewall', def: 'A network security device that monitors and controls incoming/outgoing network traffic based on security rules.' },
  { term: 'Forensics (Digital)', def: 'The practice of collecting, preserving, and analyzing digital evidence from devices following a security incident.' },
  { term: 'Hash Function', def: 'A one-way function that converts data of any size into a fixed-size digest used for integrity verification.' },
  { term: 'Honeypot', def: 'A decoy system designed to attract and detect attackers, helping security teams study attack techniques.' },
  { term: 'IDS (Intrusion Detection System)', def: 'A system that monitors network or system activities for signs of malicious activity or policy violations.' },
  { term: 'Incident Response', def: 'A structured approach to handling and managing the aftermath of a security breach or cyberattack.' },
  { term: 'IPS (Intrusion Prevention System)', def: 'Like IDS but actively blocks detected threats in real time rather than just alerting.' },
  { term: 'Keylogger', def: 'Malware that records keystrokes to steal credentials, credit card numbers, and other sensitive input.' },
  { term: 'Lateral Movement', def: 'Techniques attackers use to progressively move through a network after initial compromise, seeking valuable assets.' },
  { term: 'Malware', def: 'Malicious software including viruses, worms, trojans, ransomware, spyware, and adware.' },
  { term: 'Man-in-the-Middle (MitM)', def: 'An attack where a third party secretly intercepts and potentially alters communication between two parties.' },
  { term: 'MFA (Multi-Factor Authentication)', def: 'Authentication requiring two or more verification factors to reduce the risk of compromise.' },
  { term: 'MITRE ATT&CK', def: 'A globally accessible knowledge base of adversary tactics and techniques based on real-world observations.' },
  { term: 'NIST', def: 'National Institute of Standards and Technology — develops cybersecurity frameworks (NIST CSF, SP 800 series).' },
  { term: 'OSINT', def: 'Open Source Intelligence — gathering information from publicly available sources for reconnaissance.' },
  { term: 'OWASP Top 10', def: 'A regularly updated list of the ten most critical web application security risks published by OWASP.' },
  { term: 'Patch Management', def: 'The process of identifying, testing, and applying software updates (patches) to fix vulnerabilities.' },
  { term: 'Penetration Testing', def: 'Authorized simulated attacks on a system to identify vulnerabilities before malicious actors do.' },
  { term: 'Phishing', def: 'A social engineering attack using deceptive emails or messages to trick users into revealing credentials or installing malware.' },
  { term: 'PKI (Public Key Infrastructure)', def: 'A system managing digital certificates and public keys to enable secure communications and authentication.' },
  { term: 'Privilege Escalation', def: 'Gaining higher-level permissions than initially granted, either vertically (user → admin) or horizontally.' },
  { term: 'Ransomware', def: 'Malware that encrypts victim files and demands payment (usually cryptocurrency) for the decryption key.' },
  { term: 'Red Team', def: 'A group of ethical hackers who simulate real-world attacks on an organization to test its defenses.' },
  { term: 'Rootkit', def: 'Malware that enables persistent, privileged access to a system while hiding its presence.' },
  { term: 'SIEM', def: 'Security Information and Event Management — a system aggregating and analyzing security events from multiple sources.' },
  { term: 'Social Engineering', def: 'Psychological manipulation of people to perform actions or divulge confidential information.' },
  { term: 'SOC (Security Operations Center)', def: 'A dedicated team and facility that monitors, detects, and responds to cybersecurity incidents around the clock.' },
  { term: 'SQL Injection', def: 'An attack that inserts malicious SQL code into input fields to manipulate databases or bypass authentication.' },
  { term: 'SSL/TLS', def: 'Secure Sockets Layer / Transport Layer Security — cryptographic protocols providing secure communication over networks.' },
  { term: 'Threat Intelligence', def: 'Evidence-based knowledge about existing or emerging threats that can be used to make security decisions.' },
  { term: 'Trojan', def: 'Malware disguised as legitimate software that performs malicious actions when executed.' },
  { term: 'Two-Factor Authentication (2FA)', def: 'Authentication using two different factor types: typically something you know + something you have.' },
  { term: 'Virus', def: 'Malware that attaches itself to legitimate programs and replicates by infecting other files when executed.' },
  { term: 'VPN (Virtual Private Network)', def: 'Creates an encrypted tunnel over the internet, protecting traffic from eavesdropping and masking IP addresses.' },
  { term: 'Vulnerability', def: 'A weakness in a system, application, or process that can be exploited by a threat actor.' },
  { term: 'WAF (Web Application Firewall)', def: 'A security solution that monitors and filters HTTP traffic to protect web applications from common attacks.' },
  { term: 'Whaling', def: 'A highly targeted phishing attack aimed at senior executives (CEO, CFO) to steal credentials or authorize fraud.' },
  { term: 'Worm', def: 'Self-replicating malware that spreads across networks without needing to attach to a host program.' },
  { term: 'XSS (Cross-Site Scripting)', def: 'A web vulnerability where attackers inject client-side scripts into pages viewed by other users.' },
  { term: 'Zero Day', def: 'A vulnerability unknown to the software vendor with no available patch; actively exploited by attackers.' },
  { term: 'Zero Trust', def: 'A security model that requires verification of every user and device on every request, with no implicit trust.' },
];

function renderGlossary(filter = '') {
  const container = document.getElementById('glossaryContainer');
  if (!container) return;

  const fl = filter.toLowerCase().trim();
  const filtered = GLOSSARY_TERMS.filter(t =>
    !fl || t.term.toLowerCase().includes(fl) || t.def.toLowerCase().includes(fl)
  );

  if (!filtered.length) {
    container.innerHTML = '<p style="color:var(--text-dim);text-align:center;padding:2rem">No terms found for your search.</p>';
    return;
  }

  // Group by letter
  const grouped = {};
  filtered.forEach(t => {
    const letter = t.term[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(t);
  });

  container.innerHTML = Object.keys(grouped).sort().map(letter => `
    <div class="glossary-letter">${letter}</div>
    ${grouped[letter].map(t => `
      <div class="glossary-term">
        <strong>${t.term}</strong>
        <p>${t.def}</p>
      </div>`).join('')}`
  ).join('');
}

function filterGlossary() {
  renderGlossary(document.getElementById('glossarySearch').value);
}


// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initChecklist();
  initAssessment();
  initPhishingSim();
  renderGlossary();
  generatePassword();   // Pre-generate first password
});

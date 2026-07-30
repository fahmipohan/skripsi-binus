const STORAGE_KEY = "plne-inventory-devices-v1";

const securityFields = [
  ["renamed", "Rename"],
  ["antiVirus", "Anti virus"],
  ["screenSaver", "Screen saver"],
  ["dlp", "DLP"],
  ["uem", "UEM"],
  ["edr", "EDR/XDR"],
  ["patchWindows", "Patch Windows"],
  ["ms365", "MS 365"],
];

const schemaFields = [
  ["serialNumber", "Serial Number"],
  ["ownership", "Kepemilikan"],
  ["receivedDate", "Tanggal diterima PLNE"],
  ["deviceType", "Jenis Perangkat"],
  ["brandSeries", "Merk - Seri"],
  ["processor", "Processor"],
  ["ram", "RAM"],
  ["storage", "Storage"],
  ["vga", "VGA"],
  ["condition", "Kondisi"],
  ["chargeCode", "Charge Code"],
  ["computerName", "Comp Name"],
  ["computerStatus", "Status Comp"],
  ["ipAddress", "IP Address"],
  ["macAddress1", "Mac Address 1"],
  ["macAddress2", "Mac Address 2"],
  ["antiVirus", "Anti Virus"],
  ["screenSaver", "Screen Saver 5 Minutes"],
  ["currentStatus", "Status Saat Ini"],
  ["nip", "NIP"],
  ["userName", "Nama"],
  ["email", "Email"],
  ["phone", "No HP"],
  ["division", "Bidang"],
  ["baReceive", "BA Terima"],
  ["baReturn", "BA Kembali"],
  ["dlp", "DLP"],
  ["uem", "UEM"],
  ["edr", "EDR/XDR"],
  ["patchWindows", "Patch Windows"],
  ["ms365", "MS 365"],
];

const seedDevices = [
  {
    id: crypto.randomUUID(),
    serialNumber: "PF45QP1G",
    ownership: "Sewa GSP Tahap 1",
    receivedDate: "2025-06-26",
    deviceType: "Laptop Basic",
    brandSeries: "Lenovo V14 G2 ITL",
    processor: "Intel i5-1135G7",
    ram: "8 GB",
    storage: "512 GB",
    vga: "GPU MX350",
    condition: "Normal",
    chargeCode: "KEU.25",
    nip: "KRY-001",
    userName: "Karyawan Keuangan 01",
    email: "user.keuangan01@example.local",
    phone: "",
    division: "Keuangan",
    computerName: "KEU-2001005O",
    computerStatus: "OK",
    ipAddress: "DYNAMIC",
    macAddress1: "AC:5A:FC:6D:0B:A5",
    macAddress2: "",
    baReceive: "P.1001.26-06-25",
    baReturn: "",
    currentStatus: "Terdistribusi",
    renamed: true,
    antiVirus: true,
    screenSaver: true,
    dlp: true,
    uem: true,
    edr: true,
    patchWindows: true,
    ms365: true,
    notes: "Contoh data anonim dari struktur database perangkat.",
  },
  {
    id: crypto.randomUUID(),
    serialNumber: "MP2GY2L3",
    ownership: "Sewa GSP Tahap 2",
    receivedDate: "2025-07-10",
    deviceType: "Laptop High",
    brandSeries: "Lenovo Legion Slim 5 82YA008LID",
    processor: "Core i7-13700H",
    ram: "16 GB",
    storage: "1 TB",
    vga: "RTX 4060 6GB",
    condition: "Normal",
    chargeCode: "E.9.I1.C1.23.01",
    nip: "",
    userName: "",
    email: "",
    phone: "",
    division: "Sub Bidang MUM",
    computerName: "",
    computerStatus: "Pending",
    ipAddress: "",
    macAddress1: "",
    macAddress2: "",
    baReceive: "",
    baReturn: "",
    currentStatus: "Staging IT",
    renamed: false,
    antiVirus: false,
    screenSaver: false,
    dlp: false,
    uem: false,
    edr: false,
    patchWindows: false,
    ms365: false,
    notes: "Menunggu instalasi awal dan rename komputer.",
  },
  {
    id: crypto.randomUUID(),
    serialNumber: "5CD4037W5L",
    ownership: "KHS GSP Tahap 1",
    receivedDate: "2025-07-15",
    deviceType: "Laptop Basic",
    brandSeries: "HP EliteBook 630",
    processor: "Intel Core i7-1355U",
    ram: "16 GB",
    storage: "1 TB",
    vga: "Intel UHD",
    condition: "Normal",
    chargeCode: "Z.0.I1.J0.23.07",
    nip: "KRY-128",
    userName: "Karyawan Enjiniring 02",
    email: "user.enjiniring02@example.local",
    phone: "",
    division: "Power System, Digital, dan TI",
    computerName: "PSD-8718013",
    computerStatus: "OK",
    ipAddress: "DYNAMIC",
    macAddress1: "60:45:2E:F6:EE:33",
    macAddress2: "",
    baReceive: "PLNE-LPT1-2025-03",
    baReturn: "",
    currentStatus: "Siap Distribusi",
    renamed: true,
    antiVirus: true,
    screenSaver: true,
    dlp: true,
    uem: true,
    edr: true,
    patchWindows: true,
    ms365: false,
    notes: "MS 365 belum dikonfirmasi.",
  },
  {
    id: crypto.randomUUID(),
    serialNumber: "CND4490JW5",
    ownership: "KHS GSP Tahap 2",
    receivedDate: "2025-08-08",
    deviceType: "Laptop Medium",
    brandSeries: "HP Pavilion 16 inch Laptop 16-af0888TX",
    processor: "Intel Core i7",
    ram: "16 GB",
    storage: "1 TB",
    vga: "RTX 2050",
    condition: "Gangguan",
    chargeCode: "PKPU23",
    nip: "KRY-386",
    userName: "Karyawan Korporat 03",
    email: "user.korporat03@example.local",
    phone: "",
    division: "Perencanaan Korporat dan Quality Control",
    computerName: "",
    computerStatus: "Perlu Cek",
    ipAddress: "",
    macAddress1: "",
    macAddress2: "",
    baReceive: "P.1006.27-05-25",
    baReturn: "",
    currentStatus: "Maintenance",
    renamed: false,
    antiVirus: false,
    screenSaver: false,
    dlp: false,
    uem: false,
    edr: false,
    patchWindows: false,
    ms365: false,
    notes: "Kondisi gangguan saat pemeriksaan awal.",
  },
  {
    id: crypto.randomUUID(),
    serialNumber: "MP2BQF9X",
    ownership: "KHS GSP Tahap 3",
    receivedDate: "2025-08-08",
    deviceType: "Laptop Medium",
    brandSeries: "Lenovo IdeaPad Slim 5",
    processor: "Intel Core i7-1255U",
    ram: "16 GB",
    storage: "1 TB",
    vga: "Nvidia GeForce MX550 2 GB",
    condition: "Normal",
    chargeCode: "SAR.25",
    nip: "KRY-506",
    userName: "Karyawan Pengadaan 04",
    email: "user.pengadaan04@example.local",
    phone: "",
    division: "Manajemen Kontrak dan Pengadaan",
    computerName: "SAR-9619049",
    computerStatus: "OK",
    ipAddress: "DYNAMIC",
    macAddress1: "9C:2F:9D:A0:47:01",
    macAddress2: "",
    baReceive: "P.10156.19-08-25",
    baReturn: "",
    currentStatus: "Terdistribusi",
    renamed: true,
    antiVirus: true,
    screenSaver: true,
    dlp: true,
    uem: true,
    edr: true,
    patchWindows: true,
    ms365: true,
    notes: "",
  },
];

let devices = loadDevices();
let currentView = "dashboard";
let currentFilter = "all";
let cameraStream = null;
let scanTimer = null;
let zxingReader = null;

const $ = (id) => document.getElementById(id);

function loadDevices() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return freshSeedDevices();
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : freshSeedDevices();
  } catch {
    return freshSeedDevices();
  }
}

function freshSeedDevices() {
  return seedDevices.map((device) => ({ ...device, id: crypto.randomUUID() }));
}

function saveDevices() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(devices));
}

function readyScore(device) {
  const done = securityFields.filter(([field]) => Boolean(device[field])).length;
  return Math.round((done / securityFields.length) * 100);
}

function statusClass(status) {
  if (status === "Siap Distribusi" || status === "Terdistribusi") return "ready";
  if (status === "Maintenance" || status === "Nonaktif") return "stop";
  if (status === "Staging IT") return "work";
  return "pending";
}

function filteredDevices() {
  const query = $("globalSearch").value.trim().toLowerCase();
  return devices.filter((device) => {
    const byFilter = currentFilter === "all" || device.currentStatus === currentFilter;
    const haystack = [
      device.serialNumber,
      device.userName,
      device.division,
      device.computerName,
      device.brandSeries,
      device.ownership,
    ].join(" ").toLowerCase();
    return byFilter && (!query || haystack.includes(query));
  });
}

function renderAll() {
  renderDashboard();
  renderInventory();
  renderProcurement();
  renderReports();
  if (window.lucide) window.lucide.createIcons();
}

function renderDashboard() {
  const total = devices.length;
  const ready = devices.filter((d) => d.currentStatus === "Siap Distribusi").length;
  const distributed = devices.filter((d) => d.currentStatus === "Terdistribusi").length;
  const staging = devices.filter((d) => d.currentStatus === "Staging IT").length;
  const incomplete = devices.filter((d) => readyScore(d) < 100).length;
  const metrics = [
    ["Total perangkat", total],
    ["Siap distribusi", ready],
    ["Terdistribusi ke pegawai", distributed],
    ["Dalam staging IT", staging],
    ["Checklist belum lengkap", incomplete],
  ];
  $("metricGrid").innerHTML = metrics.map(([label, value]) => `<article class="metric"><span>${label}</span><strong>${value}</strong></article>`).join("");

  const stages = ["Diterima", "Staging IT", "Siap Distribusi", "Terdistribusi", "Maintenance"];
  $("stageBoard").innerHTML = stages.map((stage) => {
    const items = devices.filter((d) => d.currentStatus === stage);
    const shown = items.slice(0, 3).map((d) => `<div class="mini-device"><strong>${escapeHtml(d.serialNumber)}</strong><span>${escapeHtml(d.brandSeries || d.deviceType)}</span></div>`).join("");
    return `<article class="stage"><header><span>${stage}</span><b>${items.length}</b></header>${shown || `<div class="empty-inline">Kosong</div>`}</article>`;
  }).join("");

  const sorted = [...devices].sort((a, b) => readyScore(a) - readyScore(b)).slice(0, 6);
  $("securityList").innerHTML = sorted.map((device) => {
    const score = readyScore(device);
    return `<div class="security-row">
      <div><strong>${escapeHtml(device.serialNumber)}</strong><small>${escapeHtml(device.brandSeries || "-")}</small><div class="progress"><span style="width:${score}%"></span></div></div>
      <span class="pill ${score === 100 ? "ready" : "pending"}">${score}%</span>
    </div>`;
  }).join("");
}

function renderInventory() {
  const rows = filteredDevices().map((device) => {
    const score = readyScore(device);
    return `<tr>
      <td><strong>${escapeHtml(device.serialNumber)}</strong><small>${escapeHtml(device.ownership || "-")}</small></td>
      <td>${escapeHtml(device.deviceType || "-")}<small>${escapeHtml(device.brandSeries || "-")}</small></td>
      <td>${escapeHtml(device.userName || "Belum dialokasi")}<small>${escapeHtml(device.division || "-")}</small></td>
      <td>${escapeHtml(device.computerName || "-")}<small>${escapeHtml(device.ipAddress || "-")}</small></td>
      <td><span class="pill ${statusClass(device.currentStatus)}">${escapeHtml(device.currentStatus)}</span></td>
      <td><span class="pill ${score === 100 ? "ready" : "pending"}">${score}% lengkap</span></td>
      <td><div class="row-actions">
        <button class="icon-btn" title="Edit" data-edit="${device.id}"><i data-lucide="pencil"></i></button>
        <button class="icon-btn" title="Duplikat" data-clone="${device.id}"><i data-lucide="copy"></i></button>
      </div></td>
    </tr>`;
  }).join("");
  $("deviceTable").innerHTML = rows || `<tr><td colspan="7" class="empty-state">Tidak ada data sesuai filter.</td></tr>`;
}

function renderProcurement() {
  const map = new Map();
  for (const device of devices) {
    const key = device.ownership || "Tanpa batch";
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(device);
  }
  $("procurementSummary").innerHTML = [...map.entries()].map(([batch, items]) => {
    const ready = items.filter((d) => ["Siap Distribusi", "Terdistribusi"].includes(d.currentStatus)).length;
    const percent = Math.round((ready / items.length) * 100);
    return `<article class="batch-card">
      <header><strong>${escapeHtml(batch)}</strong><span>${items.length} unit</span></header>
      <div class="progress"><span style="width:${percent}%"></span></div>
      <p>${ready} unit siap/aktif, ${items.length - ready} unit perlu tindak lanjut.</p>
    </article>`;
  }).join("");
}

function renderReports() {
  const total = devices.length;
  const distributed = devices.filter((device) => device.currentStatus === "Terdistribusi").length;

  $("reportSummary").innerHTML = `<article class="report-card distributed-card">
    <div>
      <span>Total laptop yang sudah didistribusikan</span>
      <strong>${distributed}</strong>
    </div>
    <small>${distributed} dari ${total} laptop berstatus Terdistribusi.</small>
  </article>`;
  $("schemaList").innerHTML = schemaFields.map(([field, label]) => `<div class="schema-item"><span>${label}</span><code>${field}</code></div>`).join("");
}

function openDeviceDialog(device = null) {
  $("deviceForm").reset();
  $("recordId").value = device?.id || "";
  $("dialogTitle").textContent = device ? "Edit Laptop" : "Tambah Laptop";
  $("deleteDeviceBtn").style.display = device ? "inline-flex" : "none";

  const source = device || {
    id: "",
    serialNumber: "",
    ownership: "",
    receivedDate: new Date().toISOString().slice(0, 10),
    deviceType: "Laptop Basic",
    condition: "Normal",
    computerStatus: "Pending",
    currentStatus: "Staging IT",
  };

  for (const [field] of schemaFields) {
    if ($(field) && typeof source[field] !== "boolean") $(field).value = source[field] || "";
  }
  for (const [field] of securityFields) {
    if ($(field)) $(field).checked = Boolean(source[field]);
  }
  $("notes").value = source.notes || "";
  $("deviceDialog").showModal();
  if (window.lucide) window.lucide.createIcons();
}

function collectFormData() {
  const data = {};
  for (const [field] of schemaFields) {
    if ($(field) && $(field).type !== "checkbox") data[field] = $(field).value.trim();
  }
  for (const [field] of securityFields) {
    data[field] = $(field).checked;
  }
  data.notes = $("notes").value.trim();
  return data;
}

async function persistDeviceToDatabase(device) {
  if (window.location.protocol === "file:") {
    throw new Error("Aplikasi dibuka langsung dari file. Jalankan jalankan-aplikasi.bat agar server database aktif.");
  }
  const response = await fetch("/api/devices", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(device),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) {
    throw new Error(result.error || "Gagal menyimpan ke database.");
  }
  return result;
}

function showToast(message, type = "success") {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  toast.className = `toast ${type} show`;
  toast.innerHTML = `<strong>${escapeHtml(type === "success" ? "Berhasil" : "Perlu dicek")}</strong><span>${escapeHtml(message)}</span>`;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 3400);
}

async function saveForm() {
  const id = $("recordId").value;
  const data = collectFormData();
  if (!data.serialNumber) {
    alert("Serial number wajib diisi.");
    return;
  }
  const duplicate = devices.find((d) => d.serialNumber.toLowerCase() === data.serialNumber.toLowerCase() && d.id !== id);
  if (duplicate) {
    alert("Serial number sudah ada di database.");
    return;
  }
  const saveButton = $("saveDeviceBtn");
  saveButton.disabled = true;
  saveButton.classList.add("is-loading");
  if (id) {
    devices = devices.map((d) => d.id === id ? { ...d, ...data } : d);
  } else {
    data.id = crypto.randomUUID();
    devices.unshift(data);
  }
  saveDevices();
  $("deviceDialog").close();
  renderAll();
  try {
    await persistDeviceToDatabase(data);
    showToast(`Data ${data.serialNumber} berhasil disimpan ke database PostgreSQL.`);
  } catch (error) {
    const message = error instanceof TypeError && error.message === "Failed to fetch"
      ? "server database lokal belum aktif. Tutup tab lama, jalankan ulang jalankan-aplikasi.bat, lalu buka http://127.0.0.1:5177/."
      : error.message;
    showToast(`Data tampil di Inventaris, tetapi belum masuk PostgreSQL: ${message}`, "error");
  } finally {
    saveButton.disabled = false;
    saveButton.classList.remove("is-loading");
  }
}

function deleteCurrentDevice() {
  const id = $("recordId").value;
  if (!id) return;
  const device = devices.find((d) => d.id === id);
  if (!confirm(`Hapus perangkat ${device?.serialNumber || ""}?`)) return;
  devices = devices.filter((d) => d.id !== id);
  saveDevices();
  $("deviceDialog").close();
  renderAll();
}

function processScan(value) {
  const raw = value.trim();
  if (!raw) return;
  const payload = parseBarcodePayload(raw);
  const serial = payload.serialNumber || raw;
  const validation = validateSerialNumber(serial);
  if (!validation.ok) {
    $("scanFeedback").textContent = validation.message;
    $("scanResult").classList.add("empty-state");
    $("scanResult").innerHTML = `Hasil scan "${escapeHtml(serial)}" belum diproses karena tidak terlihat seperti serial number laptop.`;
    return;
  }
  const existing = devices.find((d) => d.serialNumber.toLowerCase() === serial.toLowerCase());
  let device = existing;

  if (!device) {
    device = {
      id: crypto.randomUUID(),
      serialNumber: serial,
      ownership: payload.ownership || "Batch belum ditentukan",
      receivedDate: payload.receivedDate || new Date().toISOString().slice(0, 10),
      deviceType: payload.deviceType || "Laptop Basic",
      brandSeries: payload.brandSeries || "",
      processor: payload.processor || "",
      ram: payload.ram || "",
      storage: payload.storage || "",
      vga: payload.vga || "",
      condition: "Normal",
      chargeCode: "",
      nip: "",
      userName: "",
      email: "",
      phone: "",
      division: "",
      computerName: "",
      computerStatus: "Pending",
      ipAddress: "",
      macAddress1: "",
      macAddress2: "",
      baReceive: "",
      baReturn: "",
      currentStatus: "Staging IT",
      renamed: false,
      antiVirus: false,
      screenSaver: false,
      dlp: false,
      uem: false,
      edr: false,
      patchWindows: false,
      ms365: false,
      notes: "Dibuat otomatis dari scan barcode.",
    };
    devices.unshift(device);
    saveDevices();
  }

  $("scanInput").value = "";
  $("scanFeedback").textContent = existing ? `Serial ${serial} ditemukan. Form edit siap dibuka.` : `Serial ${serial} ditambahkan sebagai perangkat baru.`;
  $("scanResult").classList.remove("empty-state");
  $("scanResult").innerHTML = `<strong>${escapeHtml(device.serialNumber)}</strong>
    <p>${escapeHtml(device.brandSeries || "Spesifikasi belum diisi")}</p>
    <p><span class="pill ${statusClass(device.currentStatus)}">${escapeHtml(device.currentStatus)}</span> <span class="pill ${readyScore(device) === 100 ? "ready" : "pending"}">${readyScore(device)}% checklist</span></p>
    <button class="btn primary" data-edit="${device.id}"><i data-lucide="pencil"></i><span>Lengkapi Data IT</span></button>`;
  renderAll();
}

function parseBarcodePayload(raw) {
  try {
    const data = JSON.parse(raw);
    if (data && typeof data === "object") {
      return {
        ...data,
        serialNumber: data.serialNumber || data.serial || data.sn || data.SN || data["S/N"] || raw,
      };
    }
  } catch {
    const labelledSerial = raw.match(/(?:S\/N|SN|SERIAL(?:\s*NUMBER)?)\s*[:#-]?\s*([A-Z0-9-]{6,20})/i);
    return { serialNumber: labelledSerial ? labelledSerial[1] : raw };
  }
  return { serialNumber: raw };
}

function validateSerialNumber(serial) {
  const normalized = serial.trim().toUpperCase();
  const hasLetter = /[A-Z]/.test(normalized);
  const hasNumber = /\d/.test(normalized);
  const validShape = /^[A-Z0-9-]{6,20}$/.test(normalized);
  if (/^\d+$/.test(normalized)) {
    return {
      ok: false,
      message: `Hasil scan ${normalized} terlihat seperti kode numerik box/produk, bukan serial number. Arahkan kamera ke barcode tepat di samping label S/N.`,
    };
  }
  if (!validShape || !hasLetter || !hasNumber) {
    return {
      ok: false,
      message: `Hasil scan ${normalized} belum sesuai format serial laptop. Gunakan barcode S/N, misalnya format seperti 5CD344F03S.`,
    };
  }
  return { ok: true };
}

async function startCamera() {
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      $("scanFeedback").textContent = "Browser belum memberi akses kamera. Gunakan scanner USB atau input manual.";
      return;
    }

    const video = $("cameraPreview");
    video.style.display = "block";

    if ("BarcodeDetector" in window) {
      cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      video.srcObject = cameraStream;
      await video.play();
      const detector = new BarcodeDetector({ formats: ["code_128", "code_39", "ean_13", "qr_code"] });
      scanTimer = window.setInterval(async () => {
        const codes = await detector.detect(video);
        if (codes.length) {
          processScan(codes[0].rawValue);
          stopCamera();
        }
      }, 700);
      $("scanFeedback").textContent = "Kamera aktif. Arahkan ke barcode kotak laptop.";
      return;
    }

    if (window.ZXing && window.ZXing.BrowserMultiFormatReader) {
      zxingReader = new window.ZXing.BrowserMultiFormatReader();
      $("scanFeedback").textContent = "Kamera aktif dengan scanner fallback. Arahkan ke barcode kotak laptop.";
      const result = await zxingReader.decodeOnceFromVideoDevice(undefined, video);
      processScan(result.getText());
      stopCamera();
      return;
    }

    video.style.display = "none";
    $("scanFeedback").textContent = "Scanner kamera belum tersedia. Gunakan scanner USB atau input manual.";
  } catch (error) {
    $("scanFeedback").textContent = `Kamera tidak bisa dibuka: ${error.message}`;
    stopCamera();
  }
}

function stopCamera() {
  if (scanTimer) window.clearInterval(scanTimer);
  scanTimer = null;
  if (zxingReader) zxingReader.reset();
  zxingReader = null;
  if (cameraStream) cameraStream.getTracks().forEach((track) => track.stop());
  cameraStream = null;
  const video = $("cameraPreview");
  video.pause();
  video.srcObject = null;
  video.style.display = "none";
}

function exportJson() {
  downloadFile("inventaris-laptop-plne.json", JSON.stringify(devices, null, 2), "application/json");
}

function exportCsv() {
  const headers = schemaFields.map(([field]) => field);
  const rows = devices.map((device) => headers.map((field) => csvEscape(device[field])));
  downloadFile("inventaris-laptop-plne.csv", [headers.join(","), ...rows.map((r) => r.join(","))].join("\n"), "text/csv");
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function csvEscape(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

async function importFile(file) {
  const text = await file.text();
  if (file.name.toLowerCase().endsWith(".json")) {
    const imported = JSON.parse(text);
    if (!Array.isArray(imported)) throw new Error("JSON harus berupa array perangkat.");
    devices = imported.map((d) => ({ id: d.id || crypto.randomUUID(), ...d }));
  } else {
    devices = parseCsv(text).map((row) => ({ id: crypto.randomUUID(), ...row }));
  }
  saveDevices();
  renderAll();
}

function resetDemoData() {
  if (!confirm("Reset data demo ke contoh awal? Data lokal saat ini akan diganti.")) return;
  devices = freshSeedDevices();
  saveDevices();
  renderAll();
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  const headers = splitCsvLine(lines.shift());
  return lines.map((line) => {
    const values = splitCsvLine(line);
    return headers.reduce((acc, key, index) => {
      const value = values[index] || "";
      acc[key] = ["true", "false"].includes(value.toLowerCase()) ? value.toLowerCase() === "true" : value;
      return acc;
    }, {});
  });
}

function splitCsvLine(line) {
  const out = [];
  let current = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];
    if (char === '"' && quoted && next === '"') {
      current += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      out.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  out.push(current);
  return out;
}

function cloneDevice(id) {
  const device = devices.find((d) => d.id === id);
  if (!device) return;
  openDeviceDialog({
    ...device,
    id: "",
    serialNumber: `${device.serialNumber}-COPY`,
    computerName: "",
    currentStatus: "Staging IT",
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function bindEvents() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      currentView = button.dataset.view;
      document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item === button));
      document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active-view", view.id === `${currentView}View`));
      $("pageTitle").textContent = button.textContent.trim();
    });
  });

  document.querySelectorAll(".segment").forEach((button) => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter;
      document.querySelectorAll(".segment").forEach((item) => item.classList.toggle("active", item === button));
      renderInventory();
      if (window.lucide) window.lucide.createIcons();
    });
  });

  $("globalSearch").addEventListener("input", renderInventory);
  $("addDeviceBtn").addEventListener("click", () => openDeviceDialog());
  $("closeDialogBtn").addEventListener("click", () => $("deviceDialog").close());
  $("cancelDialogBtn").addEventListener("click", () => $("deviceDialog").close());
  $("saveDeviceBtn").addEventListener("click", async (event) => {
    event.preventDefault();
    await saveForm();
  });
  $("deleteDeviceBtn").addEventListener("click", deleteCurrentDevice);

  document.body.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-edit]");
    const cloneButton = event.target.closest("[data-clone]");
    if (editButton) openDeviceDialog(devices.find((d) => d.id === editButton.dataset.edit));
    if (cloneButton) cloneDevice(cloneButton.dataset.clone);
  });

  $("scanInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") processScan(event.currentTarget.value);
  });
  $("scanApplyBtn").addEventListener("click", () => processScan($("scanInput").value));
  $("cameraStartBtn").addEventListener("click", startCamera);
  $("cameraStopBtn").addEventListener("click", stopCamera);
  $("exportJsonBtn").addEventListener("click", exportJson);
  $("exportCsvBtn").addEventListener("click", exportCsv);
  $("resetDataBtn").addEventListener("click", resetDemoData);
  $("importFile").addEventListener("change", async (event) => {
    const file = event.currentTarget.files[0];
    if (!file) return;
    try {
      await importFile(file);
      alert("Impor data berhasil.");
    } catch (error) {
      alert(`Impor gagal: ${error.message}`);
    } finally {
      event.currentTarget.value = "";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (new URLSearchParams(window.location.search).get("reset") === "1") {
    devices = freshSeedDevices();
    saveDevices();
    window.history.replaceState({}, "", window.location.pathname);
  }
  bindEvents();
  renderAll();
});

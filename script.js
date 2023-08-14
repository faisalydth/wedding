const input = document.getElementById("name-input");
const submit = document.getElementById("submit");
const reset = document.getElementById("reset");
const lock = document.getElementById("lock");
const textArea = document.querySelector("textarea");

const whatsappEl = document.getElementById("whatsapp");

const originalText = `Bismillahirrahmanirrahim
Assalamu'alaikum Wr. Wb.

Yth. Bpk/Ibu/Sdr/i
{NAMA},

Dengan mengharap ridho dan rahmat Allah SWT, serta tanpa mengurangi rasa hormat, perkenankan kami mengundang Bpk/Ibu/Sdr/i untuk hadir di acara pernikahan kami pada :

Hari, tanggal : Sabtu, 02 September 2023
Pukul : 11.00 - 13.00
Lokasi : Hotel Kartika Abadi - Jl. Pahlawan, Pangongangan, Kec. Manguharjo, Kota Madiun

Untuk detail acara pernikahan kami dapat dilihat pada link berikut ini :
{LINK}

Suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami. Kami memohon maaf apabila tidak dapat mengirimkan undangan ini secara langsung karena adanya keterbatasan jarak dan waktu.

Atas waktu dan perhatiannya, kami ucapkan terima kasih.  

Wassalamualaikum Wr. Wb.

With Love,
Stella & Faisal`;

const generateName = () => {
  let weddingLink = "https://a.possiblewedding.com/faisal-stella/?u=";
  let text = ``;

  const name = input.value;
  weddingLink = weddingLink + name.replace(/\s/g, "+");

  if (nameIsValid() && textIsValid()) {
    textArea.value
      .trim()
      .split("\n")
      .forEach((line) => {
        text +=
          line.replaceAll("{NAMA}", name).replaceAll("{LINK}", weddingLink) +
          "%0a";
      });

    textArea.value = text.replaceAll("%0a", "\n");

    let whatsappText = text.replaceAll("+", "%2B").replaceAll("&", "%26");

    console.log(whatsappText);
    whatsappEl.href = "https://api.whatsapp.com/send/?text=" + whatsappText;
    whatsappEl.click();
  }
};

const nameIsValid = () => {
  if (input.value === "") {
    alert("Nama tidak boleh kosong");
    input.focus();
    return false;
  }

  return true;
};

const textIsValid = () => {
  if (textArea.value === "") {
    alert("Teks tidak boleh kosong");
    textArea.focus();
    return false;
  }

  if (textArea.value.toLowerCase().includes(`{NAMA}`.toLowerCase()) === false) {
    alert("Teks harus mengandung {NAMA}");
    textArea.focus();
    return false;
  }

  if (textArea.value.toLowerCase().includes(`{LINK}`.toLowerCase()) === false) {
    alert("Teks harus mengandung {LINK}");
    textArea.focus();
    return false;
  }

  return true;
};

const lockTextArea = (el) => {
  const checkbox = el.target;
  if (checkbox.checked) {
    textArea.setAttribute("readonly", true);
  } else {
    textArea.removeAttribute("readonly");
  }
};

const resetTextArea = () => {
  textArea.value = originalText;
  input.value = "";
  textArea.removeAttribute("readonly");
  lock.checked = false;
};

const pressEnter = () => {
  if (event.key === "Enter") {
    event.preventDefault();
    submit.click();
  }
};

input.addEventListener("keypress", pressEnter);
submit.addEventListener("click", generateName);
lock.addEventListener("click", lockTextArea);
reset.addEventListener("click", resetTextArea);

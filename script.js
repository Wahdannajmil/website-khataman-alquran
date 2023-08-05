function getData() {
  fetch('https://6445e9fcee791e1e29f332a7.mockapi.io/api/v1/login-register/user')
    .then(response => response.json())
    .then(data => {
      // Urutkan data berdasarkan nomor juz dari angka terkecil ke angka terbesar
      data.sort((a, b) => a.juz - b.juz);
      displayData(data);
    })
    .catch(error => {
      console.error('Terjadi kesalahan:', error);
      alert('Terjadi kesalahan saat mengambil data!');
    });
}


function displayData(data) {
  const dataContainer = document.getElementById('dataContainer');
  dataContainer.innerHTML = '';
  data.forEach(item => {
    const dataItem = document.createElement('div');
    dataItem.innerHTML = `
      <p>Juz: ${item.juz}, Nama: ${item.nama}</p>
      <hr>`;
    dataContainer.appendChild(dataItem);
  });
}

function addJuzAndNamaToAPI(juzData) {
  fetch('https://6445e9fcee791e1e29f332a7.mockapi.io/api/v1/login-register/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(juzData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Juz dan Nama berhasil ditambahkan:', data);
      alert('Juz dan Nama berhasil ditambahkan!');
      getData();
    })
    .catch(error => {
      console.error('Terjadi kesalahan:', error);
      alert('Terjadi kesalahan saat menambahkan Juz dan Nama!');
    });
}

const juzForm = document.getElementById('juzForm');
juzForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const juzInput = document.getElementById('juz').value;
  const namaInput = document.getElementById('nama').value;
  const juzData = {
    juz: juzInput,
    nama: namaInput,
  };

  addJuzAndNamaToAPI(juzData);
});

// Panggil fungsi getData() saat halaman pertama kali dimuat untuk menampilkan data dari API
getData();

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


function deleteJuz(juzId) {
  Swal.fire({
    icon: 'warning',
    title: 'Anda yakin ingin menghapus data ini?',
    showCancelButton: true,
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Tidak',
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`https://6445e9fcee791e1e29f332a7.mockapi.io/api/v1/login-register/user/${juzId}`, {
        method: 'DELETE',
      })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil dihapus!',
            text: 'Data juz dan nama berhasil dihapus.',
          });
          getData(); // Refresh data after deletion
        })
        .catch((error) => {
          console.error('Terjadi kesalahan:', error);
          Swal.fire({
            icon: 'error',
            title: 'Terjadi kesalahan!',
            text: 'Terjadi kesalahan saat menghapus data!',
          });
        });
    }
  });
}

function displayData(data) {
  const dataContainer = document.getElementById('dataContainer');
  dataContainer.innerHTML = '';
  data.forEach((item) => {
    const dataItem = document.createElement('div');
    dataItem.innerHTML = `
      <p>Juz: ${item.juz}, Nama: ${item.nama} <i class="fas fa-trash-alt delete-icon" onclick="deleteJuz(${item.id})"></i></p>
      <hr>`;
    dataContainer.appendChild(dataItem);
  });
}
function addJuzAndNamaToAPI(juzData) {
  // Fetch the data from the API
  fetch('https://6445e9fcee791e1e29f332a7.mockapi.io/api/v1/login-register/user')
    .then(response => response.json())
    .then(data => {
      const isJuzAlreadyExists = data.some(item => item.nama === juzData.nama);
      if (isJuzAlreadyExists) {
        Swal.fire({
          icon: 'error',
          title: 'Data sudah diinputkan!',
          text: 'Data yang sama sudah ada',
        });
      } else {
        // If Juz name is unique, add it to the API
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
            Swal.fire({
              icon: 'success',
              title: 'Data berhasil dikirim!',
              text: 'Juz dan Nama berhasil ditambahkan!',
            });
            getData(); // Optional: Refresh data after adding a new entry
          })
          .catch(error => {
            console.error('Terjadi kesalahan:', error);
            Swal.fire({
              icon: 'error',
              title: 'Terjadi kesalahan!',
              text: 'Terjadi kesalahan saat menambahkan Juz dan Nama!',
            });
          });
      }
    })
    .catch(error => {
      console.error('Terjadi kesalahan:', error);
      alert('Terjadi kesalahan saat memeriksa data!');
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

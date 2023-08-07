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
      <p>
        Juz: ${item.juz}, Nama: ${item.nama}
        <i class="fas fa-trash-alt delete-icon" onclick="deleteJuz(${item.id})"></i>
        ${
          item.isDone
            ? '<i class="fas fa-check-circle ml-2 text-success"></i>'
            : `<button class="btn btn-success btn-sm ml-2" onclick="markAsDone(${item.id})">Tombol Selesai</button>`
        }
      </p>
      <hr>`;
    dataContainer.appendChild(dataItem);
  });
}


function addJuzAndNamaToAPI(juzData) {
  // Fetch the data from the API
  fetch('https://6445e9fcee791e1e29f332a7.mockapi.io/api/v1/login-register/user')
    .then(response => response.json())
    .then(data => {
      const isJuzAlreadyExists = data.some(item => item.juz === juzData.juz);
      if (isJuzAlreadyExists) {
        Swal.fire({
          icon: 'error',
          title: 'Data sudah diinputkan!',
          text: 'Data yang sama sudah ada',
        });
      } else {
        // If Juz is unique, add it to the API
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

// Rest of the code remains the same

function markAsDone(juzId) {
  // Fetch the data from the API
  fetch(`https://6445e9fcee791e1e29f332a7.mockapi.io/api/v1/login-register/user/${juzId}`)
    .then((response) => response.json())
    .then((data) => {
      // Update the isDone property to true
      data.isDone = true;
      // Send the updated data to the API
      fetch(`https://6445e9fcee791e1e29f332a7.mockapi.io/api/v1/login-register/user/${juzId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Berhasil menandai sudah selesai!',
            text: 'Juz dan Nama telah ditandai sebagai sudah selesai.',
          });
          getData(); // Refresh data after marking as done
        })
        .catch((error) => {
          console.error('Terjadi kesalahan:', error);
          Swal.fire({
            icon: 'error',
            title: 'Terjadi kesalahan!',
            text: 'Terjadi kesalahan saat menandai sudah selesai!',
          });
        });
    })
    .catch((error) => {
      console.error('Terjadi kesalahan:', error);
      Swal.fire({
        icon: 'error',
        title: 'Terjadi kesalahan!',
        text: 'Terjadi kesalahan saat mengambil data!',
      });
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

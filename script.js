function getData() {
  fetch(
    "https://6445e9fcee791e1e29f332a7.mockapi.io/api/v1/login-register/user",
  )
    .then((response) => response.json())
    .then((data) => {
      // Urutkan data berdasarkan nomor juz dari angka terkecil ke angka terbesar
      data.sort((a, b) => a.juz - b.juz);
      displayData(data);
    })
    .catch((error) => {
      console.error("Terjadi kesalahan:", error);
      alert("Terjadi kesalahan saat mengambil data!");
    });
}

function deleteJuz(juzId) {
  Swal.fire({
    icon: "warning",
    title: "Anda yakin ingin menghapus data ini?",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Tidak",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(
        `https://6445e9fcee791e1e29f332a7.mockapi.io/api/v1/login-register/user/${juzId}`,
        {
          method: "DELETE",
        },
      )
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Data berhasil dihapus!",
            text: "Data juz dan nama berhasil dihapus.",
          });
          getData(); // Refresh data after deletion
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
          Swal.fire({
            icon: "error",
            title: "Terjadi kesalahan!",
            text: "Terjadi kesalahan saat menghapus data!",
          });
        });
    }
  });
}

// ... Kode lainnya ...

// function displayData(data) {
//   const dataContainer = document.getElementById('dataContainer');
//   const juzStatsElement = document.getElementById('juzStats');
//   dataContainer.innerHTML = '';

//   // Calculate the number of completed and total juz
//   const completedJuzCount = data.filter(item => item.isDone).length;
//   const totalJuzCount = data.length;

//   // Update the juz stats text
//   juzStatsElement.textContent = `Juz yang sudah selesai: ${completedJuzCount} / Total juz: ${totalJuzCount}`;

//   const rotatingData = data.filter(item => item.juz >= 1 && item.juz <= 29);
//   const juz30Data = data.find(item => item.juz === 30);

//   rotatingData.forEach((item, index) => {
//     const dataItem = document.createElement('div');
//     const prevIndex = (index - 1 + rotatingData.length) % rotatingData.length;
//     const prevItem = rotatingData[prevIndex];

//     dataItem.innerHTML = `
//     <div class="card-icon">
//       <p>
//         <span class="checkbox" onclick="toggleDone(${item.id})">
//           ${item.isDone ? '<i class="fas  fa-check-circle"></i>' : '<i class="far fa-circle"></i>'}
//         </span>
//         Juz: ${item.juz}  ,    ${prevItem.nama}
//       </p>
//     </div>`;

//     dataContainer.appendChild(dataItem);
//   });

//   if (juz30Data) {
//     const dataItem = document.createElement('div');
//     dataItem.innerHTML = `
//     <div class="card-icon">
//       <p>
//         <span class="checkbox" onclick="toggleDone(${juz30Data.id})">
//           ${juz30Data.isDone ? '<i class="fas  fa-check-circle"></i>' : '<i class="far fa-circle"></i>'}
//         </span>
//         Juz: ${juz30Data.juz} ,  ${juz30Data.nama}

//       </p>
//     </div>
//     <hr>`;

//     dataContainer.appendChild(dataItem);
//   }
// }
function displayData(data) {
  const dataContainer = document.getElementById("dataContainer");
  const juzStatsElement = document.getElementById("juzStats");
  dataContainer.innerHTML = "";

  // Calculate the number of completed and total juz
  const completedJuzCount = data.filter((item) => item.isDone).length;

  // Update the juz stats text with a better format
  juzStatsElement.innerHTML = `
    <div class="juz-stats">
      <p class="completed-juz">Juz sudah dibaca : <span>${completedJuzCount}</span></p>
    </div>
  `;

  // Create a function to generate the HTML for each data item
  function createDataItemHTML(item) {
    const checkboxIcon = item.isDone
      ? '<i class="fas fa-heart checked"></i>'
      : '<i class="far fa-heart unchecked"></i>';
    const juzNamaStyle = item.isDone
      ? "text-decoration: line-through; opacity: 0.5;"
      : "";

    return `
      <div class="d-flex justify-content-between card-icon align-items-center">
        <div>
          <p style="${juzNamaStyle}">
            Juz: ${item.juz}, ${item.nama}
          </p>
        </div>
        <div>
          <span class="checkbox" onclick="toggleDone(${item.id})">
            ${checkboxIcon}
          </span>
        </div>
      </div>
    `;
  }

  // Create and append HTML for each data item
  data.forEach((item) => {
    const dataItem = document.createElement("div");
    dataItem.innerHTML = createDataItemHTML(item);
    dataContainer.appendChild(dataItem);
  });
}

//     dataItem.innerHTML = `
//     <div class="card-icon">
//       <p>
//         <span class="checkbox" onclick="toggleDone(${item.id})">
//           ${item.isDone ? '<i class="fas  fa-check-circle"></i>' : '<i class="far fa-circle"></i>'}
//         </span>
//         Juz: ${item.juz}  ,    ${prevItem.nama}
//       </p>
//     </div>`;
// ... Kode lainnya ...

function toggleDone(juzId) {
  // Fetch the data from the API
  fetch(
    `https://6445e9fcee791e1e29f332a7.mockapi.io/api/v1/login-register/user/${juzId}`,
  )
    .then((response) => response.json())
    .then((data) => {
      // Toggle the isDone property
      data.isDone = !data.isDone;
      // Send the updated data to the API
      fetch(
        `https://6445e9fcee791e1e29f332a7.mockapi.io/api/v1/login-register/user/${juzId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      )
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Berhasil mengubah status!",
            text: data.isDone
              ? "Juz dan Nama telah selesai."
              : "Juz dan Nama belum selesai.",
          });
          getData(); // Refresh data after changing status
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
          Swal.fire({
            icon: "error",
            title: "Terjadi kesalahan!",
            text: "Terjadi kesalahan saat mengubah status!",
          });
        });
    })
    .catch((error) => {
      console.error("Terjadi kesalahan:", error);
      Swal.fire({
        icon: "error",
        title: "Terjadi kesalahan!",
        text: "Terjadi kesalahan saat mengambil data!",
      });
    });
}

// ... Kode lainnya ...

//button hapus         <i class="fas fa-trash-alt delete-icon" onclick="deleteJuz(${item.id})"></i>

// ... Kode selanjutnya ...

// Panggil fungsi getData() saat halaman pertama kali dimuat untuk menampilkan data dari API
getData();

function addJuzAndNamaToAPI(juzData) {
  const juzInput = parseInt(juzData.juz, 10);

  // Validate the input for Juz
  if (isNaN(juzInput) || juzInput < 1 || juzInput > 30) {
    Swal.fire({
      icon: "error",
      title: "Input Juz Salah!",
      text: "Masukkan angka Juz antara 1 dan 30.",
    });
    return; // Stop the function if the input is invalid
  }

  // Fetch the data from the API
  fetch(
    "https://6445e9fcee791e1e29f332a7.mockapi.io/api/v1/login-register/user",
  )
    .then((response) => response.json())
    .then((data) => {
      const isJuzAlreadyExists = data.some((item) => item.juz === juzInput);
      if (isJuzAlreadyExists) {
        Swal.fire({
          icon: "error",
          title: "Data sudah diinputkan!",
          text: "Data yang sama sudah ada",
        });
      } else {
        // If Juz is unique, add it to the API
        fetch(
          "https://6445e9fcee791e1e29f332a7.mockapi.io/api/v1/login-register/user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...juzData, juz: juzInput }), // Update the juz value to the parsed integer
          },
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Juz dan Nama berhasil ditambahkan:", data);
            Swal.fire({
              icon: "success",
              title: "Data berhasil dikirim!",
              text: "Juz dan Nama berhasil ditambahkan!",
            });
            getData(); // Optional: Refresh data after adding a new entry
          })
          .catch((error) => {
            console.error("Terjadi kesalahan:", error);
            Swal.fire({
              icon: "error",
              title: "Terjadi kesalahan!",
              text: "Terjadi kesalahan saat menambahkan Juz dan Nama!",
            });
          });
      }
    })
    .catch((error) => {
      console.error("Terjadi kesalahan:", error);
      alert("Terjadi kesalahan saat memeriksa data!");
    });
}

// Rest of the code remains the same

function markAsDone(juzId) {
  // Fetch the data from the API
  fetch(
    `https://6445e9fcee791e1e29f332a7.mockapi.io/api/v1/login-register/user/${juzId}`,
  )
    .then((response) => response.json())
    .then((data) => {
      // Update the isDone property to true
      data.isDone = true;
      // Send the updated data to the API
      fetch(
        `https://6445e9fcee791e1e29f332a7.mockapi.io/api/v1/login-register/user/${juzId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      )
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Berhasil menandai sudah selesai!",
            text: "Juz dan Nama telah ditandai sebagai sudah selesai.",
          });
          getData(); // Refresh data after marking as done
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
          Swal.fire({
            icon: "error",
            title: "Terjadi kesalahan!",
            text: "Terjadi kesalahan saat menandai sudah selesai!",
          });
        });
    })
    .catch((error) => {
      console.error("Terjadi kesalahan:", error);
      Swal.fire({
        icon: "error",
        title: "Terjadi kesalahan!",
        text: "Terjadi kesalahan saat mengambil data!",
      });
    });
}
function cancelAllDoneStatus() {
  const confirmation = confirm(
    "Anda yakin ingin membatalkan semua status selesai?",
  );
  if (!confirmation) {
    return;
  }

  fetch(
    "https://6445e9fcee791e1e29f332a7.mockapi.io/api/v1/login-register/user",
  )
    .then((response) => response.json())
    .then((data) => {
      const promises = data.map((item) => {
        if (item.isDone) {
          item.isDone = false;
          return fetch(
            `https://6445e9fcee791e1e29f332a7.mockapi.io/api/v1/login-register/user/${item.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(item),
            },
          );
        }
      });

      Promise.all(promises)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Status selesai berhasil dibatalkan untuk semua entri!",
            text: "Status selesai diubah menjadi belum selesai.",
          });
          getData(); // Refresh data after cancelling all done statuses
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
          Swal.fire({
            icon: "error",
            title: "Terjadi kesalahan!",
            text: "Terjadi kesalahan saat membatalkan status selesai!",
          });
        });
    })
    .catch((error) => {
      console.error("Terjadi kesalahan:", error);
      alert("Terjadi kesalahan saat memeriksa data!");
    });
}

const juzForm = document.getElementById("juzForm");
juzForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const juzInput = document.getElementById("juz").value;
  const namaInput = document.getElementById("nama").value;
  const juzData = {
    juz: juzInput,
    nama: namaInput,
  };

  addJuzAndNamaToAPI(juzData);
});

// Panggil fungsi getData() saat halaman pertama kali dimuat untuk menampilkan data dari API
getData();

$(document).ready(function () {
  $("#imageCarousel").carousel({
    interval: 3500, // Waktu dalam milidetik (2 detik)
  });
});

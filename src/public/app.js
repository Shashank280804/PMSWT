const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    //toggle nav
    nav.classList.toggle("nav-active");

    //animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade ease forwards ${index / 7 + 1}s`;
      }
    });
    burger.classList.toggle("toggle");
  });
};

navSlide();

window.addEventListener("load", () => {
  const rock = document.querySelector(".rock");
  rock.classList.add("rock-finish");
});


document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('vehicleForm');
  const snackbar = document.getElementById('snackbar');
  const vehicleListContainer = document.getElementById('vehicleList'); // Add this line

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    fetch('/addVehicle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then(response => response.text())
      .then(data => {
        console.log('Server Response:', data);
        showSnackbar();
        getVehiclesPresent(); // Add this line to update the vehicle list
      })
      .catch(error => {
        console.error('Error:', error);
      });

    form.reset();
  });

  function showSnackbar() {
    snackbar.classList.add('show');
    setTimeout(() => {
      snackbar.classList.remove('show');
    }, 3000);
  }

  // Function to fetch and display vehicles present in the parking lot
  async function getVehiclesPresent() {
    try {
      const response = await fetch('/getVehiclesAll');
      const vehiclesPresent = await response.json();

      if (vehiclesPresent.length > 0) {
        let tableHtml = '<table border="1"><thead><tr><th>Name</th><th>Vehicle Name</th><th>Vehicle Number</th><th>Entry Date</th><th>Exit Date</th></tr></thead><tbody>';

        vehiclesPresent.forEach(vehicle => {
          tableHtml += `<tr>
            <td>${vehicle.name}</td>
            <td>${vehicle.vehicle_name}</td>
            <td>${vehicle.vehicle_number}</td>
            <td>${vehicle.entry_date}</td>
            <td>${vehicle.exit_date}</td>
          </tr>`;
        });

        tableHtml += '</tbody></table>';
        vehicleListContainer.innerHTML = tableHtml;
      } else {
        vehicleListContainer.innerHTML = '<p>No vehicles present in the parking lot.</p>';
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  }

  // Fetch and display vehicles on page load
  getVehiclesPresent();
});


//   function AddVehicleInParkingLot() {
//     console.log("Hi");
//     // Get form data
//     var formData = new FormData(document.getElementById("vehicleForm"));
//     console.log(formData);
//     // Convert form data to JSON
//     var jsonData = {};
//     formData.forEach((value, key) => {
//       jsonData[key] = value;
//     });

//     // Send JSON data to the server
//     fetch('/addVehicle', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(jsonData),
//     })
//     .then(response => response.text())
//     .then(data => {
//       console.log('Server Response:', data);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });

//     // Clear form fields after submission
//     document.getElementById("vehicleForm").reset();


//     /// --- Static Code

//     var AddRown = document.getElementById("show");
//     var NewRow = AddRown.insertRow(n);
//     list1[x] = document.getElementById("name").value;
//     list2[x] = document.getElementById("vname").value;
//     list3[x] = document.getElementById("vnum").value;
//     list4[x] = document.getElementById("endate").value;
//     list5[x] = document.getElementById("exdate").value;
//     var cel1 = NewRow.insertCell(0);
//     var cel2 = NewRow.insertCell(1);
//     var cel3 = NewRow.insertCell(2);
//     var cel4 = NewRow.insertCell(3);
//     var cel5 = NewRow.insertCell(4);
//     cel1.innerHTML = list1[x];
//     cel2.innerHTML = list2[x];
//     cel3.innerHTML = list3[x];
//     cel4.innerHTML = list4[x];
//     cel5.innerHTML = list5[x];
//     n++;
//     x++;
//   }


// var list1 = [];
// var list2 = [];
// var list3 = [];
// var list4 = [];
// var list5 = [];
// var n = 1;
// var x = 0;
// function AddVehicleInParkingLot() {
//     var AddRown = document.getElementById("show");
//     var NewRow = AddRown.insertRow(n);
//     list1[x] = document.getElementById("name").value;
//     list2[x] = document.getElementById("vname").value;
//     list3[x] = document.getElementById("vnum").value;
//     list4[x] = document.getElementById("endate").value;
//     list5[x] = document.getElementById("exdate").value;
//     var cel1 = NewRow.insertCell(0);
//     var cel2 = NewRow.insertCell(1);
//     var cel3 = NewRow.insertCell(2);
//     var cel4 = NewRow.insertCell(3);
//     var cel5 = NewRow.insertCell(4);
//     cel1.innerHTML = list1[x];
//     cel2.innerHTML = list2[x];
//     cel3.innerHTML = list3[x];
//     cel4.innerHTML = list4[x];
//     cel5.innerHTML = list5[x];
//     n++;
//     x++;
// }

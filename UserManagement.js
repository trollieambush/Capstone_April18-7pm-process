document.addEventListener("DOMContentLoaded", function () {
    const table = document.querySelector(".admin-table");
    const headers = table.querySelectorAll("th");
    const rows = Array.from(table.querySelectorAll("tbody tr"));

    const globalSearch = document.querySelector(".top-controls input[placeholder='Search...']");
    const nameSearch = document.querySelector(".top-controls input[placeholder='Name']");
    const lastNameSearch = document.querySelector(".top-controls input[placeholder='Last Name']");

    let sortDirection = {};

    // SORTING
    headers.forEach((header, index) => {
      header.addEventListener("click", () => {
        const icon = header.querySelector("i");
        const currentDirection = sortDirection[index] === "asc" ? "desc" : "asc";
        sortDirection = {};
        sortDirection[index] = currentDirection;

        headers.forEach((h) => {
          const icon = h.querySelector("i");
          if (icon) icon.className = "fa-solid fa-sort";
        });

        if (icon) {
          icon.className =
            currentDirection === "asc"
              ? "fa-solid fa-arrow-up-short-wide"
              : "fa-solid fa-arrow-down-wide-short";
        }

        rows.sort((a, b) => {
          const cellA = a.children[index].textContent.toLowerCase();
          const cellB = b.children[index].textContent.toLowerCase();
          if (!isNaN(cellA) && !isNaN(cellB)) {
            return currentDirection === "asc" ? cellA - cellB : cellB - cellA;
          }
          return currentDirection === "asc"
            ? cellA.localeCompare(cellB)
            : cellB.localeCompare(cellA);
        });

        const tbody = table.querySelector("tbody");
        tbody.innerHTML = "";
        rows.forEach((row) => tbody.appendChild(row));
      });
    });

    // SEARCHING
    function filterRows() {
      const globalVal = globalSearch.value.toLowerCase();
      const nameVal = nameSearch.value.toLowerCase();
      const lastNameVal = lastNameSearch.value.toLowerCase();

      rows.forEach(row => {
        const userId = row.children[0].textContent.toLowerCase();
        const name = row.children[1].textContent.toLowerCase();
        const email = row.children[2].textContent.toLowerCase();
        const role = row.children[4].textContent.toLowerCase();

        const fullNameParts = name.split(" ");
        const firstName = fullNameParts[0] || "";
        const lastName = fullNameParts.slice(1).join(" ");

        const globalMatch =
          userId.includes(globalVal) ||
          name.includes(globalVal) ||
          email.includes(globalVal) ||
          role.includes(globalVal);

        const nameMatch = nameVal === "" || firstName.includes(nameVal);
        const lastNameMatch = lastNameVal === "" || lastName.includes(lastNameVal);

        if (globalMatch && nameMatch && lastNameMatch) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    }

    globalSearch.addEventListener("input", filterRows);
    nameSearch.addEventListener("input", filterRows);
    lastNameSearch.addEventListener("input", filterRows);
  });
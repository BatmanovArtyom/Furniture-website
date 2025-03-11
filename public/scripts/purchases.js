
document.addEventListener("DOMContentLoaded", () => {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "600",
        "timeOut": "5000",
        "extendedTimeOut": "700",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "slideDown",
        "hideMethod": "slideUp"
    };
    const itemModal = document.getElementById("itemModal");
    const closeModalButton = document.getElementById("closeModal");
    const addItemButton = document.getElementById("addItem");
    const shoppingTable = document.getElementById("shoppingTable").querySelector("tbody");
    const preloader = document.getElementById("preloader");
    const errorMessage = document.getElementById("errorMessage");

    let currentItemName = "";

    loadLocalStorageData();


    loadServerData();

    document.getElementById("openModal").addEventListener("click", () => {
        currentItemName = document.getElementById("itemName").value.trim();
        if (!currentItemName) {
            toastr.error("Пожалуйста, введите наименование товара!");
            return;
        }
        itemModal.classList.remove("hidden");
    });

    closeModalButton.addEventListener("click", () => {
        itemModal.classList.add("hidden");
    });

    addItemButton.addEventListener("click", () => {
        const itemQuantity = document.getElementById("itemQuantity").value;
        const itemColor = document.getElementById("itemColor").value.trim();
        const itemLocation = document.getElementById("itemLocation").value;

        if (!itemQuantity || !itemColor) {
            toastr.error("Пожалуйста, заполните все поля!");
            return;
        }

        const newRow = {
            name: currentItemName,
            quantity: itemQuantity,
            color: itemColor,
            location: itemLocation
        };

        addTableRow(newRow);
        saveRowToLocalStorage(newRow);

        itemModal.classList.add("hidden");
        document.getElementById("itemName").value = "";
        toastr.success("Товар успешно добавлен!");
    });

    function addTableRow(rowData) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${rowData.name}</td>
            <td>${rowData.quantity}</td>
            <td>${rowData.color}</td>
            <td>${rowData.location}</td>
            <td class="no-border"><button class="delete-btn">Удалить</button></td>
        `;

        row.querySelector(".delete-btn").addEventListener("click", () => {
            row.remove();
            removeRowFromLocalStorage(rowData);
            toastr.success("Товар удалён!");
        });

        shoppingTable.appendChild(row);
    }

    async function loadServerData() {
        preloader.classList.remove("hidden");
        const id = Math.floor(Math.random() * 3) + 1;
        try {
            const response = await fetch(`https://7fa01cccc50a0693.mokky.dev/itemsList${id}`);
            if (!response.ok) {
                throw new Error(`Ошибка загрузки: ${response.status}`);
            }
            const items = await response.json();
            items.forEach(addTableRow);
            toastr.success("Данные успешно загружены!");
        } catch (error) {
            console.error("Ошибка при загрузке данных с сервера:", error);
            errorMessage.style.display = "block";
            toastr.error("Ошибка загрузки данных с сервера!");
        } finally {
            preloader.classList.add("hidden");
        }
    }

    function saveRowToLocalStorage(rowData) {
        const savedData = JSON.parse(localStorage.getItem("shoppingTableData")) || [];
        savedData.push(rowData);
        localStorage.setItem("shoppingTableData", JSON.stringify(savedData));
    }

    function removeRowFromLocalStorage(rowData) {
        const savedData = JSON.parse(localStorage.getItem("shoppingTableData")) || [];
        const updatedData = savedData.filter(
            item =>
                item.name !== rowData.name ||
                item.quantity !== rowData.quantity ||
                item.color !== rowData.color ||
                item.location !== rowData.location
        );
        localStorage.setItem("shoppingTableData", JSON.stringify(updatedData));
    }


    function loadLocalStorageData() {
        const savedData = JSON.parse(localStorage.getItem("shoppingTableData")) || [];
        savedData.forEach(addTableRow);
    }
});

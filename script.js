document.addEventListener("DOMContentLoaded", function() {
    
    fetchData();

    
    setInterval(fetchData, 60 * 60 * 1000);
});


function fetchData() {

    fetch('fetch_data.php')
        .then(response => response.json())
        .then(data => displayTable(data))
        .catch(error => console.error('Error fetching data:', error));
}

function displayTable(data) {
    const tableContainer = document.getElementById('table-container');
    
    
    tableContainer.innerHTML = '';

    
    const table = document.createElement('table');
    table.style.border = '1px solid black';

    
    const headerRow = document.createElement('tr');
    const headers = ['Task', 'Title', 'Description', 'Color Code'];
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    
    data.forEach(task => {
        const row = document.createElement('tr');

        
        ['task', 'title', 'description', 'colorCode'].forEach(key => {
            const cell = document.createElement('td');
            cell.textContent = task[key] || 'Null'; 
           
            
            if (key === 'colorCode') {
                cell.style.backgroundColor = task[key] || 'white'; 
            }

            row.appendChild(cell);
        });

        table.appendChild(row);
    });

    
    tableContainer.appendChild(table);
}

function searchTable() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const table = document.querySelector('table');
    const rows = table.getElementsByTagName('tr');

    
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let found = false;

        for (let j = 0; j < cells.length; j++) {
            const cellValue = cells[j].textContent || cells[j].innerText;

            if (cellValue.toUpperCase().indexOf(filter) > -1) {
                found = true;
                break;
            }
        }

        if (found) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

function openModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

function displaySelectedImage() {
    const input = document.getElementById('imageInput');
    const selectedImageContainer = document.getElementById('selectedImage');

    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            
            const image = document.createElement('img');
            image.src = e.target.result;
            selectedImageContainer.innerHTML = '';
            selectedImageContainer.appendChild(image);
        };
        reader.readAsDataURL(file);
    }
}
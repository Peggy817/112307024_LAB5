document.getElementById('submit').addEventListener('click', function () {
    const mathInput = document.getElementById('math');
    const englishInput = document.getElementById('english');

    const math = parseFloat(mathInput.value);
    const english = parseFloat(englishInput.value);

    // Validation: Ensure valid numeric inputs
    if (isNaN(math) || isNaN(english)) {
        alert('Please enter valid numbers for both Math and English.');
        return;
    }

    const tbody = document.querySelector('#grades-table tbody');
    const newRow = document.createElement('tr');

    // Determine the row index
    const rowIndex = tbody.rows.length + 1;

    // Calculate the average for the row
    const rowAverage = ((math + english) / 2).toFixed(2);

    // Append a new row with data
    newRow.innerHTML = `
        <td>${rowIndex}</td>
        <td>${math}</td>
        <td>${english}</td>
        <td>${rowAverage}</td>
    `;

    tbody.appendChild(newRow);

    // Clear input fields
    mathInput.value = '';
    englishInput.value = '';

    // Update column-wise and overall averages
    updateAverages();
});

function updateAverages() {
    const tbody = document.querySelector('#grades-table tbody');
    const rows = tbody.rows;

    let mathTotal = 0;
    let englishTotal = 0;
    let overallTotal = 0;

    // Loop through rows to calculate totals
    for (let row of rows) {
        const math = parseFloat(row.cells[1].textContent);
        const english = parseFloat(row.cells[2].textContent);
        const average = parseFloat(row.cells[3].textContent);

        mathTotal += math;
        englishTotal += english;
        overallTotal += average;
    }

    const rowCount = rows.length;

    // Update footer with averages
    document.getElementById('math-average').textContent = rowCount ? (mathTotal / rowCount).toFixed(2) : '0.00';
    document.getElementById('english-average').textContent = rowCount ? (englishTotal / rowCount).toFixed(2) : '0.00';
    document.getElementById('overall-average').textContent = rowCount ? (overallTotal / rowCount).toFixed(2) : '0.00';
}

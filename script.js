document.addEventListener("DOMContentLoaded", () => {
    const dayInput      = document.getElementById('day');
    const monthSelect   = document.getElementById('month');
    const yearSelect    = document.getElementById('year');
    const topicSelect    = document.getElementById('topic');

    // Generar los meses:
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "November", "Dicember"
    ];

    // Iterar sobre los meses, crear elemento option e insertarlo en el select
    months.forEach(month => {
        const opt = document.createElement("option");
        opt.value = month;
        opt.textContent = month;
        monthSelect.appendChild(opt)
    });

    for( let year = 2024; year <= 2040; year++ ) {
        const opt = document.createElement("option");
        opt.value = year;
        opt.textContent = year;
        yearSelect.appendChild(opt);
    }


})
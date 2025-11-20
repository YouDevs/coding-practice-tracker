document.addEventListener("DOMContentLoaded", () => {
    const form          = document.getElementById('practice-form');
    const dayInput      = document.getElementById('day');
    const monthSelect   = document.getElementById('month');
    const yearSelect    = document.getElementById('year');
    const topicSelect   = document.getElementById('topic');
    const countInput    = document.getElementById('count');
    const chartCanvas   = document.getElementById('practice-chart');

    let selectedMonth, selectedYear, myChart;

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

    const defaultTopics = {
        leetcode: 0,
        laravel: 0,
        reactjs: 0,
        OOP: 0,
        other: 0
    };

    const practice = {}

    // Load from LocalStorage
    function load(month, year) {
        const key = `practice-${month}-${year}`;
        return JSON.parse(localStorage.getItem(key)) || { ...defaultTopics };
    }

    // Save to LocalStorage
    function save(month, year, data) {
        const key = `practice-${month}-${year}`;
        localStorage.setItem(key, JSON.stringify(data));
    }

    function updateChart() {
        selectedMonth = monthSelect.value;
        selectedYear = yearSelect.value;

        const data = load(selectedMonth, selectedYear);

        const ctx = chartCanvas.getContext("2d");

        if (myChart) myChart.destroy();

        myChart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: Object.keys(data),
                datasets: [
                    {
                        data: Object.values(data),
                        backgroundColor: [
                            "#3b82f6",
                            "#22c55e",
                            "#ef4444",
                            "#eab308",
                            "#a855f7",
                        ],
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        position: "top",
                        labels: { color: "#e2e8f0" },
                    },
                },
            },
        });
    }


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // 1. Obtener valores del formulario
        const day               = dayInput.value;
        const selectedMonth     = monthSelect.value;
        const selectedYear      = yearSelect.value;
        const topic             = topicSelect.value;
        const count             = countInput.value;

        currentData = load(selectedMonth, selectedYear);
        currentData[topic] += count;

        save(selectedMonth, selectedYear, currentData);
        updateChart();

    });

    updateChart();


})
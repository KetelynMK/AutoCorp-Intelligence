/* =========================================================
AUTOCORP INTELLIGENCE
Dashboard Corporativo
========================================================= */

/* =========================
ELEMENTOS PRINCIPAIS
========================= */

const sidebar = document.getElementById("sidebar");
const mobileMenu = document.getElementById("mobileMenu");

const menuItems = document.querySelectorAll(".menu-item");
const modules = document.querySelectorAll(".module-card");

const notification = document.querySelector(".notification");
const primaryButton = document.querySelector(".primary-button");

const chartSelect = document.querySelector(".chart-panel select");
const bars = document.querySelectorAll(".bar");

/* =========================
MENU MOBILE
========================= */

if (mobileMenu && sidebar) {

```
mobileMenu.addEventListener("click", () => {

    sidebar.classList.toggle("open");

});
```

}

/* =========================
FECHAR MENU AO CLICAR
EM UM LINK NO CELULAR
========================= */

menuItems.forEach(item => {

```
item.addEventListener("click", () => {

    if (window.innerWidth <= 900) {
        sidebar.classList.remove("open");
    }

});
```

});

/* =========================
MENU ATIVO
========================= */

menuItems.forEach(item => {

```
item.addEventListener("click", () => {

    menuItems.forEach(menu => {
        menu.classList.remove("active");
    });

    item.classList.add("active");

});
```

});

/* =========================
MÓDULOS ATIVOS
========================= */

modules.forEach(module => {

```
module.addEventListener("click", () => {

    modules.forEach(item => {
        item.classList.remove("selected");
    });

    module.classList.add("selected");

});
```

});

/* =========================
NOTIFICAÇÕES
========================= */

if (notification) {

```
notification.addEventListener("click", () => {

    alert(
        "Você possui 3 notificações:\n\n" +
        "• Relatório financeiro disponível\n" +
        "• 18 notas fiscais processadas\n" +
        "• Processo ETL concluído"
    );

});
```

}

/* =========================
BOTÃO NOVA AUTOMAÇÃO
========================= */

if (primaryButton) {

```
primaryButton.addEventListener("click", () => {

    alert(
        "Nova automação\n\n" +
        "Esse módulo será conectado ao backend Python " +
        "nas próximas etapas do projeto."
    );

});
```

}

/* =========================
GRÁFICO
========================= */

const chartData = {

```
"Últimos 6 meses": [
    48,
    61,
    54,
    72,
    68,
    86
],

"Este ano": [
    42,
    51,
    58,
    64,
    73,
    86
],

"Últimos 12 meses": [
    38,
    44,
    48,
    52,
    57,
    61,
    64,
    68,
    71,
    75,
    81,
    88
]
```

};

function updateChart(period) {

```
const values = chartData[period];

if (!values) return;

const chartBars = document.querySelector(".chart-bars");

if (!chartBars) return;

chartBars.innerHTML = "";

values.forEach((value, index) => {

    const bar = document.createElement("div");

    bar.classList.add("bar");

    if (index === values.length - 1) {
        bar.classList.add("active-bar");
    }

    bar.style.height = `${value}%`;

    const label = document.createElement("span");

    label.textContent = getMonthLabel(
        index,
        values.length
    );

    bar.appendChild(label);

    chartBars.appendChild(bar);

});
```

}

function getMonthLabel(index, total) {

```
const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez"
];

const currentMonth = new Date().getMonth();

if (total === 12) {
    return months[index];
}

const start =
    (currentMonth - total + 1 + 12) % 12;

return months[
    (start + index) % 12
];
```

}

if (chartSelect) {

```
chartSelect.addEventListener("change", event => {

    updateChart(event.target.value);

});
```

}

/* =========================
ANIMAÇÃO DOS GRÁFICOS
========================= */

function animateBars() {

```
const currentBars =
    document.querySelectorAll(".bar");

currentBars.forEach(bar => {

    const finalHeight = bar.style.height;

    bar.style.height = "0";

    setTimeout(() => {

        bar.style.height = finalHeight;

    }, 100);

});
```

}

/* =========================
SCROLL REVEAL
========================= */

const animatedElements = document.querySelectorAll(
".metric-card, .panel, .module-card"
);

const observer = new IntersectionObserver(
entries => {

```
    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

},
{
    threshold: 0.08
}
```

);

animatedElements.forEach(element => {

```
observer.observe(element);
```

});

/* =========================
HORA ATUAL
========================= */

function updateTime() {

```
const now = new Date();

const time = now.toLocaleTimeString(
    "pt-BR",
    {
        hour: "2-digit",
        minute: "2-digit"
    }
);

const timeElements =
    document.querySelectorAll(".process-time");

if (timeElements.length > 0) {

    /*
     * O primeiro horário representa
     * a execução mais recente.
     */

    timeElements[0].setAttribute(
        "title",
        `Última atualização: ${time}`
    );

}
```

}

/* =========================
STATUS DO SISTEMA
========================= */

function systemStatus() {

```
const statusDot =
    document.querySelector(".status-dot");

const statusText =
    document.querySelector(".system-status small");

if (!statusDot || !statusText) return;

statusText.textContent =
    "Todos os serviços ativos";
```

}

/* =========================
CONFIRMAÇÃO DE PROCESSOS
========================= */

const processItems =
document.querySelectorAll(".process-item");

processItems.forEach(process => {

```
process.addEventListener("click", () => {

    const title =
        process.querySelector(
            ".process-info strong"
        );

    if (!title) return;

    console.log(
        `Processo selecionado: ${title.textContent}`
    );

});
```

});

/* =========================
RESPONSIVIDADE
========================= */

window.addEventListener("resize", () => {

```
if (
    window.innerWidth > 900 &&
    sidebar
) {

    sidebar.classList.remove("open");

}
```

});

/* =========================
ESC FECHA SIDEBAR
========================= */

document.addEventListener("keydown", event => {

```
if (event.key === "Escape") {

    if (sidebar) {
        sidebar.classList.remove("open");
    }

}
```

});

/* =========================
INICIALIZAÇÃO
========================= */

document.addEventListener("DOMContentLoaded", () => {

```
systemStatus();

updateTime();

animateBars();

console.log(
    "AutoCorp Intelligence iniciado com sucesso."
);
```

});

/* =========================
FUTURO BACKEND
========================= */

/*
Aqui futuramente vamos conectar o Python.

```
Exemplo:

fetch("http://localhost:8000/api/dashboard")
    .then(response => response.json())
    .then(data => {

        console.log(data);

    });

O backend FastAPI poderá fornecer:

- faturamento
- notas fiscais
- funcionários
- documentos
- processos ETL
- relatórios
- notificações
- dados do chatbot
```

*/

/* =========================
API BASE
========================= */

const API_URL =
"http://localhost:8000/api";

/*
Função preparada para
futuras requisições ao Python.
*/

async function apiRequest(
endpoint,
options = {}
) {

```
try {

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers: {
                "Content-Type":
                    "application/json",

                ...options.headers
            }
        }
    );


    if (!response.ok) {

        throw new Error(
            `Erro HTTP: ${response.status}`
        );

    }


    return await response.json();

}

catch (error) {

    console.error(
        "Erro na API:",
        error
    );

    return null;

}
```

}

/* =========================
FINAL
========================= */

console.log(
"🚀 AutoCorp Intelligence | Front-end carregado."
);


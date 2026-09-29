document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();
    initNavigation();
    initNotifications();
    initAutomationButton();
    initChart();
    initModules();
    initProcessInteractions();
    initKeyboard();
    initSystemStatus();
    initAnimations();

});


/* =========================================================
   ELEMENTOS PRINCIPAIS
========================================================= */

const sidebar = document.getElementById("sidebar");
const mobileMenu = document.getElementById("mobileMenu");

const notificationBtn = document.getElementById("notificationBtn");
const newAutomationBtn = document.getElementById("newAutomationBtn");

const chartPeriod = document.getElementById("chartPeriod");
const revenueChart = document.getElementById("revenueChart");


/* =========================================================
   MENU MOBILE
========================================================= */

function initMobileMenu() {

    if (!mobileMenu || !sidebar) return;

    mobileMenu.addEventListener("click", () => {

        sidebar.classList.toggle("open");

        const isOpen = sidebar.classList.contains("open");

        mobileMenu.setAttribute(
            "aria-expanded",
            isOpen
        );

        mobileMenu.setAttribute(
            "aria-label",
            isOpen
                ? "Fechar menu"
                : "Abrir menu"
        );

    });


    /* Fecha o menu ao clicar fora */

    document.addEventListener("click", (event) => {

        const clickedInsideSidebar =
            sidebar.contains(event.target);

        const clickedMenu =
            mobileMenu.contains(event.target);

        if (
            window.innerWidth <= 900 &&
            sidebar.classList.contains("open") &&
            !clickedInsideSidebar &&
            !clickedMenu
        ) {

            closeMobileMenu();

        }

    });

}


/* FECHAR MENU */

function closeMobileMenu() {

    if (!sidebar) return;

    sidebar.classList.remove("open");

    if (mobileMenu) {

        mobileMenu.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenu.setAttribute(
            "aria-label",
            "Abrir menu"
        );

    }

}


/* =========================================================
   NAVEGAÇÃO
========================================================= */

function initNavigation() {

    const navLinks =
        document.querySelectorAll(".nav-link");

    if (!navLinks.length) return;


    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");


            /* Fecha menu no celular */

            if (window.innerWidth <= 900) {
                closeMobileMenu();
            }

        });

    });

}


/* =========================================================
   NOTIFICAÇÕES
========================================================= */

function initNotifications() {

    if (!notificationBtn) return;

    notificationBtn.addEventListener("click", () => {

        const count =
            notificationBtn.querySelector(
                ".notification-count"
            );

        if (count) {

            count.textContent = "0";

            count.style.background =
                "#94a3b8";

        }

        showToast(
            "Você não possui novas notificações."
        );

    });

}


/* =========================================================
   NOVA AUTOMAÇÃO
========================================================= */

function initAutomationButton() {

    if (!newAutomationBtn) return;

    newAutomationBtn.addEventListener("click", () => {

        showToast(
            "Módulo de automações preparado para integração com o backend."
        );

    });

}


/* =========================================================
   SISTEMA DE TOAST
========================================================= */

function showToast(message) {

    const oldToast =
        document.querySelector(".system-toast");

    if (oldToast) {
        oldToast.remove();
    }


    const toast =
        document.createElement("div");

    toast.className = "system-toast";

    toast.innerHTML = `
        <span class="toast-icon">✓</span>
        <span>${message}</span>
    `;


    Object.assign(toast.style, {

        position: "fixed",
        right: "24px",
        bottom: "24px",

        display: "flex",
        alignItems: "center",
        gap: "10px",

        maxWidth: "360px",

        padding: "13px 16px",

        background: "#111827",
        color: "#fff",

        borderRadius: "10px",

        fontSize: "12px",

        boxShadow:
            "0 10px 30px rgba(0,0,0,.18)",

        zIndex: "9999",

        opacity: "0",
        transform: "translateY(15px)",

        transition:
            "opacity .25s ease, transform .25s ease"

    });


    document.body.appendChild(toast);


    requestAnimationFrame(() => {

        toast.style.opacity = "1";
        toast.style.transform =
            "translateY(0)";

    });


    setTimeout(() => {

        toast.style.opacity = "0";
        toast.style.transform =
            "translateY(15px)";

        setTimeout(() => {
            toast.remove();
        }, 250);

    }, 3000);

}


/* =========================================================
   DADOS DO GRÁFICO
========================================================= */

const chartData = {

    "6": [
        {
            label: "Jan",
            value: 62000
        },
        {
            label: "Fev",
            value: 71000
        },
        {
            label: "Mar",
            value: 68000
        },
        {
            label: "Abr",
            value: 79000
        },
        {
            label: "Mai",
            value: 82400
        },
        {
            label: "Jun",
            value: 85430
        }
    ],


    "12": [
        {
            label: "Jul",
            value: 54000
        },
        {
            label: "Ago",
            value: 58000
        },
        {
            label: "Set",
            value: 61000
        },
        {
            label: "Out",
            value: 59000
        },
        {
            label: "Nov",
            value: 65000
        },
        {
            label: "Dez",
            value: 70000
        },
        {
            label: "Jan",
            value: 62000
        },
        {
            label: "Fev",
            value: 71000
        },
        {
            label: "Mar",
            value: 68000
        },
        {
            label: "Abr",
            value: 79000
        },
        {
            label: "Mai",
            value: 82400
        },
        {
            label: "Jun",
            value: 85430
        }
    ],


    "year": [
        {
            label: "Jan",
            value: 62000
        },
        {
            label: "Fev",
            value: 71000
        },
        {
            label: "Mar",
            value: 68000
        },
        {
            label: "Abr",
            value: 79000
        },
        {
            label: "Mai",
            value: 82400
        },
        {
            label: "Jun",
            value: 85430
        }
    ]

};


/* =========================================================
   INICIALIZAÇÃO DO GRÁFICO
========================================================= */

function initChart() {

    if (!revenueChart) return;


    if (chartPeriod) {

        chartPeriod.addEventListener(
            "change",
            () => {

                updateChart(
                    chartPeriod.value
                );

            }
        );

    }


    updateChart("6");

}


/* =========================================================
   ATUALIZAR GRÁFICO
========================================================= */

function updateChart(period) {

    if (!revenueChart) return;


    const data =
        chartData[period] ||
        chartData["6"];


    const maxValue = 100000;


    revenueChart.innerHTML = "";


    data.forEach(item => {

        const group =
            document.createElement("div");

        group.className =
            "bar-group";


        const bar =
            document.createElement("div");

        bar.className = "bar";


        const height =
            Math.min(
                (item.value / maxValue) * 100,
                100
            );


        bar.style.height = "0%";

        bar.dataset.value =
            item.value;


        const label =
            document.createElement("span");

        label.textContent =
            item.label;


        group.appendChild(bar);
        group.appendChild(label);

        revenueChart.appendChild(group);


        /* Animação */

        requestAnimationFrame(() => {

            setTimeout(() => {

                bar.style.height =
                    `${height}%`;

            }, 50);

        });


        /* Tooltip */

        bar.title =
            formatCurrency(item.value);

    });

}


/* =========================================================
   FORMATAÇÃO DE VALORES
========================================================= */

function formatCurrency(value) {

    return new Intl.NumberFormat(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    ).format(value);

}


/* =========================================================
   MÓDULOS
========================================================= */

function initModules() {

    const modules =
        document.querySelectorAll(
            ".module-card"
        );

    if (!modules.length) return;


    modules.forEach(module => {

        module.addEventListener(
            "click",
            () => {

                modules.forEach(item => {
                    item.classList.remove("selected");
                });

                module.classList.add("selected");

            }
        );

    });

}


/* =========================================================
   PROCESSOS
========================================================= */

function initProcessInteractions() {

    const processes =
        document.querySelectorAll(
            ".process-item"
        );

    if (!processes.length) return;


    processes.forEach(process => {

        process.style.cursor = "pointer";


        process.addEventListener(
            "click",
            () => {

                const title =
                    process.querySelector(
                        ".process-info strong"
                    );


                if (title) {

                    showToast(
                        `Processo selecionado: ${title.textContent}`
                    );

                }

            }
        );

    });

}


/* =========================================================
   TECLADO
========================================================= */

function initKeyboard() {

    document.addEventListener(
        "keydown",
        event => {

            /* ESC fecha o menu */

            if (
                event.key === "Escape" &&
                window.innerWidth <= 900
            ) {

                closeMobileMenu();

            }

        }
    );

}


/* =========================================================
   STATUS DO SISTEMA
========================================================= */

function initSystemStatus() {

    const status =
        document.querySelector(
            ".system-status"
        );

    if (!status) return;


    status.setAttribute(
        "title",
        "Todos os serviços estão operacionais"
    );

}


/* =========================================================
   ANIMAÇÕES DOS CARDS
========================================================= */

function initAnimations() {

    const elements =
        document.querySelectorAll(
            ".metric-card, .panel, .module-card"
        );

    if (!elements.length) return;


    /* Caso o navegador não tenha
       IntersectionObserver */

    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(element => {

            element.style.opacity = "1";
            element.style.transform =
                "translateY(0)";

        });

        return;

    }


    elements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(12px)";

        element.style.transition =
            "opacity .45s ease, transform .45s ease";

    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;


                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: .08
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   RESPONSIVIDADE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 900
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   API — PREPARAÇÃO PARA FASTAPI
========================================================= */

const API_URL =
    "http://localhost:8000/api";


/**
 * Função base para chamadas
 * ao backend FastAPI.
 *
 * Ainda não é necessário utilizar.
 * Será usada quando começarmos
 * a criar o backend Python.
 */

async function apiRequest(
    endpoint,
    options = {}
) {

    try {

        const response =
            await fetch(
                `${API_URL}${endpoint}`,
                {
                    headers: {
                        "Content-Type":
                            "application/json",

                        ...(options.headers || {})
                    },

                    ...options
                }
            );


        if (!response.ok) {

            throw new Error(
                `Erro HTTP: ${response.status}`
            );

        }


        return await response.json();

    } catch (error) {

        console.error(
            "Erro na API:",
            error
        );

        throw error;

    }

}


/* =========================================================
   LOG DE INICIALIZAÇÃO
========================================================= */

console.log(
    "%cAutoCorp Intelligence",
    "font-size:18px;font-weight:bold;color:#2563eb;"
);

console.log(
    "Dashboard carregado com sucesso."
);

console.log(
    "Backend preparado para integração com FastAPI."
);

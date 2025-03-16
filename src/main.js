// ==UserScript==
// @name        GeoSwitch
// @namespace   gb.ianni
// @version     1.0.0
// @description Selector flotante de idiomas para Google basado en 'Language Switcher for Google' de shunf4
// @include     *://www.google.*/*
// @grant       none
// ==/UserScript==

(() => {
    'use strict';

    const config = {
        languages: [
            { label: "English", code: "en", domain: "com" },
            { label: "Español", code: "es", domain: "es" },
            { label: "Français", code: "fr", domain: "fr" },
            { label: "Deutsch", code: "de", domain: "de" },
            { label: "日本語", code: "ja", domain: "co.jp" }
        ]
    };

    const css = `
    .ls-box {
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 9999;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        font: 14px Arial;
    }
    .ls-btn {
        padding: 8px 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    .ls-menu {
        display: none;
        padding: 5px 0;
    }
    .ls-item {
        padding: 8px 12px;
        cursor: pointer;
        white-space: nowrap;
    }
    .ls-item:hover {
        background: #f8f9fa;
    }
    .show {
        display: block;
    }`;

    document.head.appendChild(Object.assign(document.createElement('style'), {textContent: css}));

    // Crear elementos
    const container = Object.assign(document.createElement('div'), {
        className: 'ls-box',
        innerHTML: `
        <div class="ls-btn">🌍 ${document.documentElement.lang.toUpperCase()}</div>
        <div class="ls-menu"></div>`
    });

    const [btn, menu] = container.children;

    // Llenar menú
    config.languages.forEach(lang => {
        menu.appendChild(Object.assign(document.createElement('div'), {
            className: 'ls-item',
            textContent: lang.label,
            onclick: () => {
                const url = new URL(window.location.href);
                url.hostname = `www.google.${lang.domain}`;
                url.searchParams.set('hl', lang.code);
                window.location.href = url.toString();
            }
        }));
    });

    // Eventos
    btn.onclick = e => {
        e.stopPropagation();
        menu.classList.toggle('show');
    };

    document.onclick = () => menu.classList.remove('show');

    // Inyectar componente
    document.body.prepend(container);
})();


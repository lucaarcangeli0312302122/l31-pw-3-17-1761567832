# Project Work AA. 2025-2026 Tema n. 3 - Traccia 17

Pagina web statica (HTML + CSS + JS vanilla) che sintetizza il Bilancio di Sostenibilità dell'azienda vinicola **Ruffino**, in formato accessibile (WCAG), responsive e bilingue (Italiano/Inglese), con tema chiaro/scuro selezionabile.

## Struttura del progetto

```
├── index.html                          # Pagina principale
├── css/
│   ├── style.css                       # Foglio di stile personalizzato del progetto
│   ├── bootstrap.min.css               # Bootstrap 5 (self-hosted)
│   ├── all.min.css                     # Font Awesome 6 (self-hosted)
│   ├── flag-icons.min.css              # Flag Icons (self-hosted)
│   └── google-fonts.css                # Dichiarazioni @font-face per Inter e Playfair Display
├── js/
│   ├── main.js                         # Logica applicativa: i18n, tema, nav attiva, reveal on scroll
│   └── bootstrap.bundle.min.js         # Bootstrap 5 JS
└── asset/
    ├── fa/                             # Web font Font Awesome (woff2/ttf)
    ├── fonts/                          # Web font Google Fonts (woff2)
    ├── flags/                          # Icone SVG delle bandiere (IT/EN)
    ├── img/                            # Immagini editoriali (tenute, vigneti, cantina, ecc.)
    ├── ReportSostenibilita-2023.pdf    # Bilancio di Sostenibilità FY 2023
    └── RuffinoCares.pdf                # Documento di programma Ruffino Cares
```

Tutte le librerie di terze parti sono **self-hosted** (nessuna dipendenza da CDN esterni), per garantire funzionamento offline, maggiore velocità di caricamento e indipendenza da servizi terzi.

## Librerie e tecnologie principali

| Libreria / Tecnologia | Versione | Utilizzo |
|---|---|---|
| [Bootstrap](https://getbootstrap.com/) | 5.3.x | Framework CSS/JS per il layout a grid, componenti responsive (navbar, collapse, tabelle) |
| [Font Awesome](https://fontawesome.com/) | 6.5.x | Set di icone vettoriali (leaf, wine-glass, chart, ecc.) |
| [Flag Icons](https://github.com/lipis/flag-icons) |  | Icone SVG delle bandiere per il selettore di lingua (evita problemi di rendering degli emoji) |
| [Google Fonts](https://fonts.google.com/) |  | Font per testo (Inter) e titoli (Playfair Display), self-hosted in formato woff2 |
| JavaScript vanilla (ES5+) |  | Nessun framework: gestione i18n, tema chiaro/scuro, animazioni "reveal on scroll" (Intersection Observer) |
| HTML5 semantico |  | Accessibilità (WCAG 2.1) + ARIA: skip link, focus visibile |

## Funzionalità principali

- **Bilinguismo IT/EN**: selettore lingua nella barra superiore, traduzioni gestite via attributi `data-i18n` e dizionario JavaScript, con persistenza della preferenza in `localStorage`.
- **Tema chiaro/scuro**: toggle selezionabile dall'utente, basato su variabili CSS semantiche e rispetto della preferenza di sistema (`prefers-color-scheme`) al primo accesso.
- **Contenuti scaricabili**: Bilancio di Sostenibilità e documento Ruffino Cares disponibili come PDF locali nella cartella `asset/`.

## Come visualizzare il progetto

Aprire [https://lucaarcangeli0312302122.github.io/l31-pw-1761567832](https://lucaarcangeli0312302122.github.io/l31-pw-1761567832)

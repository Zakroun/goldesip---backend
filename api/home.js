// api/home.js
module.exports = (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Café Goldensip — API</title>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400&family=Jost:wght@200;300;400&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
            --gold:        #C9973A;
            --gold-dim:    #7a5a1e;
            --gold-pale:   rgba(201,151,58,0.12);
            --gold-border: rgba(201,151,58,0.25);
            --cream:       #F5EFE4;
            --dark:        #13100C;
            --surface:     #1A1510;
            --surface-2:   #221C14;
            --border:      rgba(245,239,228,0.06);
            --text-mute:   rgba(245,239,228,0.35);
        }

        html, body {
            height: 100%;
            background: var(--dark);
            color: var(--cream);
            font-family: 'Jost', sans-serif;
            font-weight: 300;
            overflow-x: hidden;
        }

        /* — Grain overlay — */
        body::before {
            content: '';
            position: fixed;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
            opacity: 0.032;
            pointer-events: none;
            z-index: 100;
        }

        /* — Gold top rule — */
        body::after {
            content: '';
            position: fixed;
            top: 0; left: 0; right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--gold), transparent);
            z-index: 99;
        }

        .page {
            min-height: 100vh;
            display: grid;
            grid-template-rows: auto 1fr auto;
            max-width: 880px;
            margin: 0 auto;
            padding: 0 36px;
        }

        /* ─── Header ─── */
        header {
            padding: 40px 0 28px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 0.5px solid var(--border);
            animation: fadeDown 0.65s ease both;
        }

        .wordmark {
            display: flex;
            align-items: center;
            gap: 14px;
        }

        .logo-mark {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 1px solid var(--gold-border);
            background: var(--gold-pale);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .logo-mark svg {
            width: 18px;
            height: 18px;
            fill: var(--gold);
        }

        .wordmark-text {
            display: flex;
            flex-direction: column;
            gap: 1px;
        }

        .wordmark-top {
            font-size: 9px;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: var(--text-mute);
            font-weight: 300;
        }

        .wordmark-brand {
            font-family: 'Cormorant Garamond', serif;
            font-size: 20px;
            font-weight: 600;
            letter-spacing: 2px;
            color: var(--cream);
            line-height: 1;
        }

        .wordmark-brand em {
            font-style: italic;
            color: var(--gold);
            font-weight: 300;
        }

        .status-pill {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(201,151,58,0.06);
            border: 0.5px solid var(--gold-border);
            padding: 7px 14px;
            border-radius: 2px;
            font-family: 'DM Mono', monospace;
            font-size: 10px;
            font-weight: 300;
            color: var(--gold);
            letter-spacing: 1.5px;
        }

        .pulse-dot {
            width: 6px; height: 6px;
            border-radius: 50%;
            background: var(--gold);
            flex-shrink: 0;
            animation: pulse 2.5s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(201,151,58,0.5); }
            50%       { opacity: 0.6; box-shadow: 0 0 0 5px rgba(201,151,58,0); }
        }

        /* ─── Hero ─── */
        main {
            padding: 72px 0 56px;
            animation: fadeUp 0.7s 0.1s ease both;
        }

        .eyebrow {
            font-family: 'DM Mono', monospace;
            font-size: 10px;
            letter-spacing: 5px;
            text-transform: uppercase;
            color: var(--gold);
            margin-bottom: 22px;
            font-weight: 300;
        }

        .hero-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: clamp(52px, 9vw, 90px);
            font-weight: 300;
            line-height: 0.95;
            letter-spacing: -0.5px;
            color: var(--cream);
            margin-bottom: 32px;
        }

        .hero-title em {
            font-style: italic;
            color: rgba(245,239,228,0.18);
        }

        .hero-sub {
            font-size: 13px;
            font-weight: 300;
            color: var(--text-mute);
            letter-spacing: 0.4px;
            line-height: 1.8;
            max-width: 360px;
            margin-bottom: 60px;
            border-left: 1.5px solid var(--gold);
            padding-left: 16px;
        }

        /* ─── Section label ─── */
        .section-label {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 16px;
        }

        .section-label span {
            font-family: 'DM Mono', monospace;
            font-size: 9px;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: rgba(245,239,228,0.2);
            white-space: nowrap;
        }

        .section-label::after {
            content: '';
            flex: 1;
            height: 0.5px;
            background: var(--border);
        }

        /* ─── Endpoints ─── */
        .endpoints {
            display: flex;
            flex-direction: column;
            gap: 1px;
            background: var(--border);
            border: 0.5px solid var(--border);
            border-radius: 3px;
            overflow: hidden;
            margin-bottom: 48px;
        }

        .endpoint {
            background: var(--surface);
            padding: 20px 24px;
            display: grid;
            grid-template-columns: 60px 1fr auto;
            align-items: center;
            gap: 20px;
            transition: background 0.2s ease;
            cursor: default;
            position: relative;
        }

        .endpoint::before {
            content: '';
            position: absolute;
            left: 0; top: 0; bottom: 0;
            width: 2px;
            background: transparent;
            transition: background 0.25s ease;
        }

        .endpoint:hover { background: var(--surface-2); }
        .endpoint:hover::before { background: var(--gold); }

        .method {
            font-family: 'DM Mono', monospace;
            font-size: 10px;
            font-weight: 400;
            letter-spacing: 0.8px;
            padding: 4px 0;
            text-align: center;
            border-radius: 2px;
        }

        .method-get {
            color: #7ecba8;
            background: rgba(126,203,168,0.07);
            border: 0.5px solid rgba(126,203,168,0.2);
        }

        .method-post {
            color: #82b4f5;
            background: rgba(130,180,245,0.07);
            border: 0.5px solid rgba(130,180,245,0.2);
        }

        .endpoint-info { display: flex; flex-direction: column; gap: 5px; }

        .endpoint-path {
            font-family: 'DM Mono', monospace;
            font-size: 13px;
            font-weight: 300;
            color: var(--cream);
            letter-spacing: 0.2px;
        }

        .endpoint-desc {
            font-size: 11px;
            color: rgba(245,239,228,0.28);
            font-weight: 300;
            letter-spacing: 0.3px;
        }

        .endpoint-arrow {
            font-size: 14px;
            color: rgba(245,239,228,0.1);
            transition: color 0.2s, transform 0.2s;
        }

        .endpoint:hover .endpoint-arrow {
            color: var(--gold);
            transform: translateX(4px);
        }

        /* ─── Stats ─── */
        .stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1px;
            background: var(--border);
            border: 0.5px solid var(--border);
            border-radius: 3px;
            overflow: hidden;
        }

        .stat {
            background: var(--surface);
            padding: 22px 24px;
            display: flex;
            flex-direction: column;
            gap: 7px;
        }

        .stat-value {
            font-family: 'Cormorant Garamond', serif;
            font-size: 28px;
            font-weight: 600;
            color: var(--cream);
            line-height: 1;
        }

        .stat-value span { color: var(--gold); }

        .stat-label {
            font-family: 'DM Mono', monospace;
            font-size: 9px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: rgba(245,239,228,0.22);
            font-weight: 300;
        }

        /* ─── Footer ─── */
        footer {
            padding: 24px 0 36px;
            border-top: 0.5px solid var(--border);
            display: flex;
            justify-content: space-between;
            align-items: center;
            animation: fadeUp 0.7s 0.25s ease both;
        }

        .footer-copy {
            font-family: 'DM Mono', monospace;
            font-size: 10px;
            letter-spacing: 2px;
            color: rgba(245,239,228,0.18);
            font-weight: 300;
        }

        .footer-loc {
            display: flex;
            align-items: center;
            gap: 7px;
            font-family: 'DM Mono', monospace;
            font-size: 10px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: rgba(245,239,228,0.18);
        }

        .footer-loc::before {
            content: '';
            display: inline-block;
            width: 5px; height: 5px;
            border-radius: 50%;
            background: var(--gold);
            opacity: 0.7;
        }

        /* ─── Animations ─── */
        @keyframes fadeDown {
            from { opacity: 0; transform: translateY(-10px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(14px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        /* ─── Responsive ─── */
        @media (max-width: 560px) {
            .page { padding: 0 20px; }
            .stats { grid-template-columns: 1fr 1fr; }
            .stats .stat:last-child { display: none; }
            header { flex-direction: column; align-items: flex-start; gap: 16px; }
            .endpoint { grid-template-columns: 50px 1fr auto; gap: 12px; }
        }
    </style>
</head>
<body>
    <div class="page">

        <header>
            <div class="wordmark">
                <div class="logo-mark">
                    <!-- Coffee cup icon -->
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 21h18v-2H2v2zm16-9c1.1 0 2-.9 2-2s-.9-2-2-2h-2V6H4v8c0 2.21 1.79 4 4 4h6c1.87 0 3.43-1.28 3.87-3H18zm0-2h-2V10h2c.55 0 1 .45 1 1s-.45 1-1 1zM7 3c0-.55.45-1 1-1s1 .45 1 1v1H7V3zm4 0c0-.55.45-1 1-1s1 .45 1 1v1h-2V3z"/>
                    </svg>
                </div>
                <div class="wordmark-text">
                    <span class="wordmark-top">REST Interface</span>
                    <span class="wordmark-brand">Café <em>Goldensip</em></span>
                </div>
            </div>
            <div class="status-pill">
                <span class="pulse-dot"></span>
                OPERATIONAL
            </div>
        </header>

        <main>
            <p class="eyebrow">// API Reference</p>

            <h1 class="hero-title">
                Warm.<br>
                <em>Crafted.</em><br>
                Served.
            </h1>

            <p class="hero-sub">
                Production API for Café Goldensip — serving reservations,
                contact requests, and dining flows from the heart of the Medina.
            </p>

            <div class="section-label">
                <span>Endpoints</span>
            </div>

            <div class="endpoints">

                <div class="endpoint">
                    <span class="method method-get">GET</span>
                    <div class="endpoint-info">
                        <span class="endpoint-path">/api/testDB</span>
                        <span class="endpoint-desc">Database connectivity check</span>
                    </div>
                    <span class="endpoint-arrow">→</span>
                </div>

                <div class="endpoint">
                    <span class="method method-post">POST</span>
                    <div class="endpoint-info">
                        <span class="endpoint-path">/api/contact</span>
                        <span class="endpoint-desc">Submit reservation or contact request</span>
                    </div>
                    <span class="endpoint-arrow">→</span>
                </div>

            </div>

            <div class="section-label">
                <span>Service</span>
            </div>

            <div class="stats">
                <div class="stat">
                    <span class="stat-value">v<span>1</span>.0</span>
                    <span class="stat-label">API Version</span>
                </div>
                <div class="stat">
                    <span class="stat-value"><span>99</span>.9%</span>
                    <span class="stat-label">Uptime SLA</span>
                </div>
                <div class="stat">
                    <span class="stat-value">Med<span>.</span></span>
                    <span class="stat-label">Medina, MA</span>
                </div>
            </div>
        </main>

        <footer>
            <span class="footer-copy">&copy; 2026 Café Goldensip</span>
            <span class="footer-loc">Meknès, Morocco</span>
        </footer>

    </div>
</body>
</html>
    `);
};
'use strict';

// ─────────────────────────────────────────
// 🔒 Security helpers
// ─────────────────────────────────────────
const escapeHTML = (str = '') =>
    String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

// ─────────────────────────────────────────
// 🎨 Design tokens  (single source of truth)
// ─────────────────────────────────────────
const T = {
    brown:      '#2C1A0E',   // deepest espresso
    brownMid:   '#4A2C1A',   // header bg
    gold:       '#C9973A',   // primary accent
    goldLight:  '#E8B96A',   // highlights
    cream:      '#FAF6F0',   // page bg
    cardBg:     '#FFFFFF',
    mutedText:  '#6B5744',
    borderColor:'#E8DDD0',
    successGreen:'#2D7A4A',
    whatsapp:   '#25D366',
};

// ─────────────────────────────────────────
// 🖋  Shared base shell
// ─────────────────────────────────────────
const shell = (headerAccent, bodyContent) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Café Goldensip</title>
</head>
<body style="margin:0;padding:0;background-color:${T.cream};font-family:'Georgia',serif;">

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
         style="background:${T.cream};padding:32px 16px;">
    <tr><td align="center">

      <!-- Card -->
      <table role="presentation" width="100%" style="max-width:600px;border-radius:16px;
             overflow:hidden;border:1px solid ${T.borderColor};background:${T.cardBg};">

        <!-- ══ TOP ORNAMENT BAR ══ -->
        <tr>
          <td style="background:${T.gold};height:4px;font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- ══ HEADER ══ -->
        <tr>
          <td style="background:${T.brownMid};padding:36px 40px;text-align:center;">
            ${headerAccent}
            <!-- Logo word-mark -->
            <h1 style="margin:14px 0 4px;font-family:'Georgia',serif;font-size:30px;
                        letter-spacing:2px;color:${T.gold};font-weight:normal;">
              Café Goldensip
            </h1>
            <!-- Decorative rule -->
            <table role="presentation" align="center" cellpadding="0" cellspacing="0"
                   style="margin:8px auto;">
              <tr>
                <td style="width:40px;height:1px;background:${T.gold};opacity:.5;"></td>
                <td style="width:8px;height:8px;background:${T.gold};border-radius:50%;
                            margin:0 6px;"></td>
                <td style="width:40px;height:1px;background:${T.gold};opacity:.5;"></td>
              </tr>
            </table>
            <p style="margin:8px 0 0;font-family:Arial,sans-serif;font-size:11px;
                       letter-spacing:3px;color:${T.goldLight};text-transform:uppercase;">
              Meknès · Maroc
            </p>
          </td>
        </tr>

        <!-- ══ BODY ══ -->
        <tr>
          <td style="padding:36px 40px 28px;background:${T.cardBg};">
            ${bodyContent}
          </td>
        </tr>

        <!-- ══ FOOTER ══ -->
        <tr>
          <td style="background:${T.brown};padding:20px 40px;text-align:center;">
            <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:12px;
                       color:${T.goldLight};letter-spacing:1px;">
              Café Goldensip &mdash; Réservation en ligne
            </p>
            <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;
                       color:${T.mutedText};">
              Meknès, Maroc &nbsp;|&nbsp; +212 600 000 000
            </p>
          </td>
        </tr>

        <!-- ══ BOTTOM ORNAMENT BAR ══ -->
        <tr>
          <td style="background:${T.gold};height:4px;font-size:0;line-height:0;">&nbsp;</td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;

// ─────────────────────────────────────────
// 🧩 Shared UI blocks
// ─────────────────────────────────────────

/** Section heading with left gold border */
const sectionHeading = (text) =>
    `<p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:11px;
               letter-spacing:2px;text-transform:uppercase;color:${T.gold};
               border-left:3px solid ${T.gold};padding-left:10px;">${escapeHTML(text)}</p>`;

/** A single info row inside the booking card */
const infoRow = (icon, label, value) => {
    if (!value) return '';
    return `
    <tr>
      <td style="padding:9px 0;border-bottom:1px solid ${T.borderColor};">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width:28px;font-size:16px;vertical-align:middle;">${icon}</td>
            <td style="font-family:Arial,sans-serif;font-size:13px;
                        color:${T.mutedText};vertical-align:middle;">${escapeHTML(label)}</td>
            <td align="right" style="font-family:Arial,sans-serif;font-size:14px;
                        font-weight:bold;color:${T.brown};vertical-align:middle;">
              ${escapeHTML(value)}
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
};

/** Booking summary card */
const bookingCard = (rows) =>
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
            style="background:${T.cream};border-radius:12px;padding:4px 16px;
                   border:1px solid ${T.borderColor};margin:0 0 24px;">
       <tbody>${rows}</tbody>
     </table>`;

/** CTA button */
const ctaButton = (href, label, bgColor = T.gold, textColor = T.brown) =>
    `<a href="${escapeHTML(href)}"
        style="display:inline-block;background:${bgColor};color:${textColor};
               padding:13px 28px;border-radius:8px;font-family:Arial,sans-serif;
               font-size:14px;font-weight:bold;text-decoration:none;
               letter-spacing:.5px;">
       ${label}
     </a>`;

/** Optional message box */
const messageBox = (label, text) => {
    if (!text) return '';
    return `
    <div style="background:${T.cream};border-left:3px solid ${T.gold};
                border-radius:4px;padding:14px 16px;margin:0 0 24px;">
      <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:11px;
                 letter-spacing:2px;text-transform:uppercase;color:${T.gold};">
        ${escapeHTML(label)}
      </p>
      <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;
                 color:${T.brown};line-height:1.6;">
        ${escapeHTML(text)}
      </p>
    </div>`;
};

/** Decorative icon circle in header */
const headerIcon = (emoji) =>
    `<div style="display:inline-block;background:${T.brown};border:2px solid ${T.gold};
                  border-radius:50%;width:52px;height:52px;line-height:52px;
                  font-size:22px;text-align:center;">
       ${emoji}
     </div>`;

// ─────────────────────────────────────────
// ✉️  1 — OWNER NOTIFICATION
// ─────────────────────────────────────────
const ownerTemplate = (data) => {
    const header = `
      ${headerIcon('📋')}
      <p style="margin:6px 0 0;font-family:Arial,sans-serif;font-size:11px;
                 letter-spacing:3px;color:#fff;text-transform:uppercase;opacity:.8;">
        New Reservation
      </p>`;

    const body = `
      <h2 style="margin:0 0 6px;font-family:'Georgia',serif;font-size:20px;
                  font-weight:normal;color:${T.brown};">
        New Booking Received
      </h2>
      <p style="margin:0 0 24px;font-family:Arial,sans-serif;font-size:13px;
        color:${T.mutedText};line-height:1.6;">
        A customer just submitted a reservation through your website.
      </p>

      ${sectionHeading('Customer Details')}
      ${bookingCard(`
        ${infoRow('👤', 'Name', data.name)}
        ${infoRow('✉️', 'Email', data.email)}
        ${infoRow('📞', 'Phone', data.phone)}
      `)}

      ${sectionHeading('Booking Details')}
      ${bookingCard(`
        ${infoRow('👥', 'Guests', data.guests)}
        ${infoRow('📅', 'Date', data.date)}
        ${infoRow('⏰', 'Time', data.time)}
      `)}

      ${messageBox('Customer Message', data.message)}

      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding-right:12px;">
            ${ctaButton(
                `mailto:${data.email || ''}`,
                '✉ Reply by Email'
            )}
          </td>
          <td>
            ${ctaButton(
                `https://wa.me/${(data.phone || '').replace(/\D/g, '')}`,
                '💬 WhatsApp',
                T.whatsapp,
                '#fff'
            )}
          </td>
        </tr>
      </table>`;

    return shell(header, body);
};

// ─────────────────────────────────────────
// 🇫🇷  2 — CLIENT CONFIRMATION (FR)
// ─────────────────────────────────────────
const clientTemplateFR = (data) => {
    const header = `
      ${headerIcon('☕')}
      <p style="margin:6px 0 0;font-family:Arial,sans-serif;font-size:11px;
                 letter-spacing:3px;color:#fff;text-transform:uppercase;opacity:.8;">
        Saveurs Authentiques Marocaines
      </p>`;

    const body = `
      <h2 style="margin:0 0 6px;font-family:'Georgia',serif;font-size:20px;
                  font-weight:normal;color:${T.brown};">
        Bonjour, ${escapeHTML(data.name)}&nbsp;!
      </h2>
      <p style="margin:0 0 24px;font-family:Arial,sans-serif;font-size:14px;
                 color:${T.mutedText};line-height:1.7;">
        Nous avons bien reçu votre demande de réservation. Notre équipe vous
        contactera très bientôt pour confirmer votre table. Nous serons ravis de
        vous accueillir dans notre café.
      </p>

      ${sectionHeading('Résumé de votre réservation')}
      ${bookingCard(`
        ${infoRow('👥', 'Nombre de personnes', data.guests)}
        ${infoRow('📅', 'Date', data.date)}
        ${infoRow('⏰', 'Heure', data.time)}
      `)}

      <!-- Confirmation badge -->
      <div style="background:#F0FAF4;border:1px solid #A8DDB8;border-radius:10px;
                   padding:14px 18px;margin:0 0 28px;display:flex;align-items:center;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width:24px;font-size:18px;vertical-align:middle;">✅</td>
            <td style="font-family:Arial,sans-serif;font-size:13px;
                        color:${T.successGreen};padding-left:10px;vertical-align:middle;">
              <strong>Demande envoyée avec succès.</strong> Confirmation à suivre.
            </td>
          </tr>
        </table>
      </div>

      <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:13px;
                 color:${T.mutedText};">
        Une question ? Contactez-nous directement sur WhatsApp :
      </p>
      ${ctaButton(
          'https://wa.me/212600000000',
          '💬 Nous écrire sur WhatsApp',
          T.whatsapp,
          '#fff'
      )}

      <hr style="border:none;border-top:1px solid ${T.borderColor};margin:28px 0 20px;">
      <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;
                 color:${T.mutedText};line-height:1.6;text-align:center;">
        Café Goldensip &mdash; Meknès, Maroc<br>
        Cet e-mail a été envoyé automatiquement suite à votre réservation en ligne.
      </p>`;

    return shell(header, body);
};

// ─────────────────────────────────────────
// 🇬🇧  3 — CLIENT CONFIRMATION (EN)
// ─────────────────────────────────────────
const clientTemplateEN = (data) => {
    const header = `
      ${headerIcon('☕')}
      <p style="margin:6px 0 0;font-family:Arial,sans-serif;font-size:11px;
                 letter-spacing:3px;color:#fff;text-transform:uppercase;opacity:.8;">
        Authentic Moroccan Flavors
      </p>`;

    const body = `
      <h2 style="margin:0 0 6px;font-family:'Georgia',serif;font-size:20px;
                  font-weight:normal;color:${T.brown};">
        Hello, ${escapeHTML(data.name)}&nbsp;!
      </h2>
      <p style="margin:0 0 24px;font-family:Arial,sans-serif;font-size:14px;
                 color:${T.mutedText};line-height:1.7;">
        Thank you for your reservation request at Café Goldensip. Our team will
        reach out shortly to confirm your table. We look forward to welcoming you!
      </p>

      ${sectionHeading('Your Booking Summary')}
      ${bookingCard(`
        ${infoRow('👥', 'Guests', data.guests)}
        ${infoRow('📅', 'Date', data.date)}
        ${infoRow('⏰', 'Time', data.time)}
      `)}

      <!-- Confirmation badge -->
      <div style="background:#F0FAF4;border:1px solid #A8DDB8;border-radius:10px;
                   padding:14px 18px;margin:0 0 28px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width:24px;font-size:18px;vertical-align:middle;">✅</td>
            <td style="font-family:Arial,sans-serif;font-size:13px;
                        color:${T.successGreen};padding-left:10px;vertical-align:middle;">
              <strong>Request received successfully.</strong> Confirmation coming soon.
            </td>
          </tr>
        </table>
      </div>

      <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:13px;
                 color:${T.mutedText};">
        Have a question? Reach us directly on WhatsApp:
      </p>
      ${ctaButton(
          'https://wa.me/212600000000',
          '💬 Message us on WhatsApp',
          T.whatsapp,
          '#fff'
      )}

      <hr style="border:none;border-top:1px solid ${T.borderColor};margin:28px 0 20px;">
      <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;
                 color:${T.mutedText};line-height:1.6;text-align:center;">
        Café Goldensip &mdash; Meknès, Morocco<br>
        This email was sent automatically following your online reservation.
      </p>`;

    return shell(header, body);
};

// ─────────────────────────────────────────
// 🚀 Smart dispatcher — picks FR or EN client
//    template based on data.language
// ─────────────────────────────────────────
const clientTemplate = (data) =>
    (data.language === 'fr') ? clientTemplateFR(data) : clientTemplateEN(data);

module.exports = {
    ownerTemplate,
    clientTemplateFR,
    clientTemplateEN,
    clientTemplate,   // convenience auto-dispatcher
};
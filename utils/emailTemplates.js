// 🔒 Prevent HTML injection
const escapeHTML = (str = '') => {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

// 🎯 Helper
const renderField = (label, value) => {
    if (!value) return '';
    return `
    <tr>
        <td style="padding:8px 0;color:#555;font-size:14px;">
            <strong style="color:#222">${label}:</strong> ${escapeHTML(value)}
        </td>
    </tr>`;
};

// ==========================
// ✉️ OWNER EMAIL
// ==========================
const ownerTemplate = (data) => {
    return `
    <div style="font-family:Arial,sans-serif;background:#f5f2ee;padding:20px">
      <div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;overflow:hidden">

        <!-- HEADER -->
        <div style="background:#3b2414;padding:25px;text-align:center">
          <h1 style="color:#d4af37;margin:0;font-size:24px">
            Café Goldensip
          </h1>
          <p style="color:#fff;font-size:12px;letter-spacing:2px;margin-top:5px">
            NEW RESERVATION
          </p>
        </div>

        <!-- CONTENT -->
        <div style="padding:25px">
          <h2 style="margin-top:0;color:#3b2414">New Booking Received</h2>

          <table style="width:100%;border-collapse:collapse">
            ${renderField('Name', data.name)}
            ${renderField('Email', data.email)}
            ${renderField('Phone', data.phone)}
            ${renderField('Guests', data.guests)}
            ${renderField('Date', data.date)}
            ${renderField('Time', data.time)}
          </table>

          ${data.message
            ? `<p style="margin-top:15px;color:#555">
                        <strong>Message:</strong><br>
                        ${escapeHTML(data.message)}
                    </p>`
            : ''
        }
        </div>

        <!-- FOOTER -->
        <div style="background:#3b2414;padding:15px;text-align:center">
          <p style="color:#c7a97c;font-size:12px;margin:0">
            Reservation sent from website
          </p>
        </div>

      </div>
    </div>
    `;
};

// ==========================
// 🇫🇷 CLIENT EMAIL (FR)
// ==========================
const clientTemplateFR = (data) => {
    return `
    <div style="font-family:Arial,sans-serif;background:#f5f2ee;padding:20px">
      <div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;overflow:hidden">

        <!-- HEADER -->
        <div style="background:#3b2414;padding:25px;text-align:center">
          <h1 style="color:#d4af37;margin:0">Café Goldensip</h1>
          <p style="color:#fff;font-size:12px">
            SAVEURS AUTHENTIQUES MAROCAINES
          </p>
        </div>

        <!-- CONTENT -->
        <div style="padding:25px">
          <h2 style="color:#3b2414">Bonjour ${escapeHTML(data.name)},</h2>

          <p style="color:#555;line-height:1.6">
            Nous avons bien reçu votre demande de réservation.
            Notre équipe vous contactera très bientôt pour confirmation.
          </p>

          <table style="width:100%;margin-top:10px">
            ${renderField('Nombre de personnes', data.guests)}
            ${renderField('Date', data.date)}
            ${renderField('Heure', data.time)}
          </table>

          <!-- BUTTON -->
          <div style="margin-top:20px">
            <a href="https://wa.me/212600000000"
              style="background:#d4af37;color:#3b2414;padding:12px 20px;
                     text-decoration:none;border-radius:6px;font-weight:bold">
              Nous contacter sur WhatsApp
            </a>
          </div>
        </div>

        <!-- FOOTER -->
        <div style="background:#3b2414;padding:15px;text-align:center">
          <p style="color:#c7a97c;font-size:12px;margin:0">
            Café Goldensip — Meknès, Maroc
          </p>
        </div>

      </div>
    </div>
    `;
};

// ==========================
// 🇬🇧 CLIENT EMAIL (EN)
// ==========================
const clientTemplateEN = (data) => {
    return `
    <div style="font-family:Arial,sans-serif;background:#f5f2ee;padding:20px">
      <div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;overflow:hidden">

        <!-- HEADER -->
        <div style="background:#3b2414;padding:25px;text-align:center">
          <h1 style="color:#d4af37;margin:0">Café Goldensip</h1>
          <p style="color:#fff;font-size:12px">
            AUTHENTIC MOROCCAN FLAVORS
          </p>
        </div>

        <!-- CONTENT -->
        <div style="padding:25px">
          <h2 style="color:#3b2414">Hello ${escapeHTML(data.name)},</h2>

          <p style="color:#555;line-height:1.6">
            We have received your reservation request.
            Our team will contact you shortly to confirm your booking.
          </p>

          <table style="width:100%;margin-top:10px">
            ${renderField('Guests', data.guests)}
            ${renderField('Date', data.date)}
            ${renderField('Time', data.time)}
          </table>

          <!-- BUTTON -->
          <div style="margin-top:20px">
            <a href="https://wa.me/212600000000"
              style="background:#d4af37;color:#3b2414;padding:12px 20px;
                     text-decoration:none;border-radius:6px;font-weight:bold">
              Contact on WhatsApp
            </a>
          </div>
        </div>

        <!-- FOOTER -->
        <div style="background:#3b2414;padding:15px;text-align:center">
          <p style="color:#c7a97c;font-size:12px;margin:0">
            Café Goldensip — Meknès, Morocco
          </p>
        </div>

      </div>
    </div>
    `;
};

module.exports = {
    ownerTemplate,
    clientTemplateFR,
    clientTemplateEN
};
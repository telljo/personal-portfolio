const { onRequest } = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');

const CONTACT_TO_EMAIL = 'jtell1997@gmail.com';
const CONTACT_FROM_EMAIL = 'Portfolio Contact <onboarding@resend.dev>';
const MAX_FIELD_LENGTH = 4000;

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildPayload({ name, email, subject, message }) {
  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedSubject = escapeHtml(subject);
  const escapedMessage = escapeHtml(message).replaceAll('\n', '<br>');

  return {
    from: CONTACT_FROM_EMAIL,
    to: [CONTACT_TO_EMAIL],
    subject: `Portfolio contact: ${subject}`,
    text: [
      'New message from your portfolio contact form.',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      '',
      message
    ].join('\n'),
    html: `
      <h2>New portfolio contact message</h2>
      <p><strong>Name:</strong> ${escapedName}</p>
      <p><strong>Email:</strong> ${escapedEmail}</p>
      <p><strong>Subject:</strong> ${escapedSubject}</p>
      <hr>
      <p>${escapedMessage}</p>
    `
  };
}

exports.sendContactEmail = onRequest(
  {
    region: 'asia-southeast2',
    secrets: ['RESEND_API_KEY']
  },
  async (request, response) => {
    if (request.method !== 'POST') {
      response.set('Allow', 'POST');
      response.status(405).json({ error: 'Method not allowed.' });
      return;
    }

    const name = normalizeString(request.body?.name);
    const email = normalizeString(request.body?.email);
    const subject = normalizeString(request.body?.subject);
    const message = normalizeString(request.body?.message);

    if (!name || !email || !subject || !message) {
      response.status(400).json({ error: 'All fields are required.' });
      return;
    }

    if (!isValidEmail(email)) {
      response.status(400).json({ error: 'Please provide a valid email address.' });
      return;
    }

    if ([name, email, subject, message].some(value => value.length > MAX_FIELD_LENGTH)) {
      response.status(400).json({ error: 'One or more fields are too long.' });
      return;
    }

    try {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(buildPayload({ name, email, subject, message }))
      });

      if (!resendResponse.ok) {
        const resendError = await resendResponse.text();
        logger.error('Resend request failed.', {
          status: resendResponse.status,
          resendError
        });
        response.status(502).json({
          error: 'Unable to send your message right now. Please try again shortly.'
        });
        return;
      }

      response.status(200).json({ ok: true });
    } catch (error) {
      logger.error('Unexpected contact form failure.', error);
      response.status(500).json({
        error: 'Unexpected error while sending your message.'
      });
    }
  }
);
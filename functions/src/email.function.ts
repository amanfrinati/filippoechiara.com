import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";

/**
 * Here we're using custom SMTP to send
 */
const transporter = nodemailer.createTransport({
  host: "mail.filippoechiara.com",
  port: 587,
  secure: false,
  auth: {
    user: functions.config().email.username,
    pass: functions.config().email.password,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendMailOnRSVPCreation = functions.firestore
  .document("rsvps/{rsvpId}")
  .onCreate((snapshot, context) => {
    const rsvp: any = snapshot.data();

    const mailOptions = {
      from: `Modulo RSVP di Filippo e Chiara <${
        functions.config().email.sender
      }>`,
      to: rsvp.email,
      subject: "Grazie per aver confermato la tua partecipazione!",
      html: `
        <p>
          Grazie ${rsvp.fullName},<br />
          abbiamo ricevuto il tuo RSVP.</p>
        <p>Nella conferma hai indicato le seguenti informazioni:</p>
        <ul>
          <li>Nomi: <strong>${rsvp.fullName}</strong></li>
          <li>Email: <strong>${rsvp.email}</strong></li>
          <li>Conferma presenza: <strong>${
            rsvp.attendanceOption ? "Si" : "No"
          }</strong></li>
        </ul>
        <p>A presto,</p>
        <p>Filippo e Chiara</p>
      `,
    };

    const mail2Options = {
      from: `Modulo RSVP di Filippo e Chiara <${
        functions.config().email.sender
      }>`,
      to: `<${functions.config().email.filippo}>,<${
        functions.config().email.chiara
      }>`,
      // to: `<${functions.config().email.alberto}>`,
      subject: `E' stato aggiunto un nuovo RSVP`,
      html: `
        <p>
          Ciao,<br />
          è stato aggiunto un nuovo RSVP.
        </p>
        <p>Nella conferma sono state indicate le seguenti informazioni:</p>
        <ul>
          <li>Presenza confermata: <strong>${
            rsvp.attendanceOption ? "Si" : "No"
          }</strong></li>
          <li>Nomi: <strong>${rsvp.fullName}</strong></li>
          <li>Email: <strong>${rsvp.email}</strong></li>
        </ul>
        <p>Il tuo modulo RSVP</p>
      `,
    };

    // returning result
    return Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(mail2Options),
    ])
      .then((res: any) => {
        console.log({ result: "ok", message: JSON.stringify(res) });
      })
      .catch((err: any) => {
        console.log({ result: "error", message: err.toString() });
      });
  });

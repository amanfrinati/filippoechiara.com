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
    rejectUnauthorized: false
  }
});

export const sendMailOnRSVPCreation = functions.firestore
  .document("rsvps/{rsvpId}")
  .onCreate((snapshot, context) => {
    const rsvp: any = snapshot.data();

    const mailOptions = {
      from: `Modulo RSVP di Filippo e Chiara <${functions.config().email.sender}>`,
      to: rsvp.email,
      subject: "Grazie per aver confermato la tua partecipazione! 🎉",
      html: `
        <p>
          Grazie ${rsvp.fullName},<br />
          abbiamo ricevuto la conferma della tua partecipazione.</p>
        <p>Nella conferma hai indicati i seguenti dati:</p>
        <ul>
          <li>Presenza confermata: <strong>${rsvp.attendanceOption ? 'Si' : 'No'}</strong></li>
          <li>Numero di adulti: <strong>${rsvp.numberOfAdults}</strong></li>
          <li>Numero di bambini: <strong>${rsvp.numberOfChildren}</strong></li>
          <li>Allergie: <strong>${rsvp.allergies}</strong></li>
          <li>Messaggio: <strong>${rsvp.message}</strong></li>
        </ul>
        <p>Ti ringraziamo di cuore per il tuo affetto e non vediamo l’ora di vederti presto.</p>
        <p>Filippo e Chiara</p>
      `,
    };

    const mail2Options = {
      from: `Modulo RSVP di Filippo e Chiara <${functions.config().email.sender}>`,
      to: `<${functions.config().email.filippo}>,<${functions.config().email.chiara}>`,
      subject: `🤖 Ehi! ${rsvp.fullName.toUpperCase()} ha confermato la sua partecipazione!`,
      html: `
        <p>
          Ciao,<br />
          abbiamo ricevuto la conferma della partecipazione di <strong>${rsvp.fullName}</strong>.
        </p>
        <p>Nella conferma sono stati indicati i seguenti dati:</p>
        <ul>
          <li>Nome: <strong>${rsvp.fullName}</strong></li>
          <li>Presenza confermata: <strong>${rsvp.attendanceOption ? 'Si' : 'No'}</strong></li>
          <li>Numero di adulti: <strong>${rsvp.numberOfAdults}</strong></li>
          <li>Numero di bambini: <strong>${rsvp.numberOfChildren}</strong></li>
          <li>Allergie: <strong>${rsvp.allergies}</strong></li>
          <li>Messaggio: <strong>${rsvp.message}</strong></li>
        </ul>
        <p>Your faithful robot</p>
      `,
    };

    // returning result
    return Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(mail2Options)
    ])
      .then((res: any) => {
        console.log({ result: "ok", message: JSON.stringify(res) });
      })
      .catch((err: any) => {
        console.log({ result: "error", message: err.toString() });
      });
  });

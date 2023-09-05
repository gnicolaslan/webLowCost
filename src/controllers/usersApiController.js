const db = require("../database/models");
const CreateResponseError = require("../helpers/createResponseError");
const transporter = require("../helpers/mailer");
const bcrypt = require("bcryptjs"); // Import the bcryptjs library

const {
  getUserById,
  verifyUserByEmail,
  updateInfoUser,
} = require("../services/userServices");

module.exports = {
  detail: async (req, res) => {
    try {
      const id = req.params.id;

      const user = await getUserById(id);
      const address = await user.getAddress();

      if (!user) {
        return res.status(400).json({
          ok: false,
          error: {
            status: 404,
            message: `The User with that ${id} was not found`,
          },
        });
      }

      return res.status(200).json({
        ok: true,
        user: {
          ...user.dataValues,
          address: address.dataValues,
        },
        meta: {
          status: 200,
          total: 1,
          url: `/api/user/${id}`,
        },
      });
    } catch (error) {
      console.log(error);
      CreateResponseError(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      //console.log(id);
      const { name, surname, phone, address } = req.body;
      const userUpdated = await updateInfoUser(id, { name, surname, phone });

      if (address) {
        await userUpdated.setAddress(address);
      }

      return res.status(200).json({
        ok: true,
        data: {
          message: "User modified success",
          user: {
            id: userUpdated.id,
            name: userUpdated.name,
            surname: userUpdated.surname,
            phone: userUpdated.phone,
          },
        },
        meta: {
          status: 200,
          total: 1,
          url: `/api/users/profile/${userUpdated.id}`,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        error: "Internal server error",
      });
    }
  },
  verifyByEmail: async (req, res) => {
    try {
      const userExist = await verifyUserByEmail(req.body.email, req.body);

      if (!userExist) {
        return res.status(400).json({
          ok: false,
          error: {
            status: 404,
            message: `The User with that ${email} was not found!`,
          },
        });
      }

      return res.status(200).json({
        ok: true,
        data: {
          userExist,
        },
      });
    } catch (error) {
      console.log(error);
      return CreateResponseError(res, error);
    }
  },
  getCodeToResetPassword: async (req, res) => {
    const { email } = req.params;
    const user = await db.User.findOne({
      where: { email: email },
    });
    if (!user) {
      return res
        .status(400)
        .json({ ok: false, message: "Credenciales Invalidas" });
    }

    let codeVerify = "";

    for (let index = 0; index <= 5; index++) {
      let character = Math.floor(Math.random() * 9);
      codeVerify += character;
    }

    user.resetCode = codeVerify;
    await user.save();

    const mailOptions = {
      from: `LowCost ${process.env.EMAIL}`,
      to: email,
      subject: "LowCost Web Codigo de verificacion",
      html: `<!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>LowCost Web - Plantilla de Correo Electrónico para Restablecimiento de Contraseña</title>
      </head>
      <body>
      <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
        <div style="margin: 50px auto; width: 70%; padding: 20px 0">
          <div style="border-bottom: 1px solid #eee">
            <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600">LowCost Web</a>
          </div>
          <p style="font-size: 1.1em">Hola,</p>
          <p>Gracias por elegir LowCost Web. Utiliza el siguiente código OTP para completar tu Procedimiento de Recuperación de Contraseña. El OTP es válido durante 5 minutos.</p>
          <h2 style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">${codeVerify}</h2>
          <p style="font-size: 0.9em;">Saludos,<br />LowCost Web</p>
          <hr style="border: none; border-top: 1px solid #eee" />
          <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300">
            <p>LowCost Web Inc</p>
            <p>Pilar</p>
            <p>Buenos Aires</p>
          </div>
        </div>
      </div>
      </body>
      </html>
      `,
    };

    try {
      const result = await transporter.sendMail(mailOptions);
      console.log(result);
      res.status(200).json({ ok: true, message: "Mensaje enviado!" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ ok: false, message: "Error al enviar el correo electrónico" });
    }
  },
  resetPassword: async (req, res) => {
    const { email } = req.params;
    const decodedEmail = decodeURIComponent(email.trim());
    const { code, newPassword } = req.body;
    const trimmedCode = code.trim();

    const user = await db.User.findOne({
      where: { email: decodedEmail, resetCode: trimmedCode },
    });

    if (!user) {
      return res
        .status(400)
        .json({ ok: false, message: "Credenciales Invalidas" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetCode = null;
    await user.save();

    res
      .status(200)
      .json({ ok: true, message: "Contraseña restablecida exitosamente" });
  },
  finishPurchase: async (req, res) => {
    try {
      const { email, cartItems } = req.body;

      const userEmail = email;
      const sellerEmail = process.env.OWNER_EMAIL;
      const cartDetails = cartItems
        .map((item) => `${item.name} (${item.quantity})`)
        .join(", ");

      const mailOptionsUser = {
        from: `LowCost ${process.env.EMAIL}`,
        to: userEmail,
        subject: "LowCost Web, ¡Gracias por comprar en nuestro sitio!",
        html: `<p>Se ha realizado una nueva compra en tu tienda en línea.</p>
               <p>Detalles de la compra: ${cartDetails}</p>`,      };
      await transporter.sendMail(mailOptionsUser);

      const mailOptionsSeller = {
        from: `LowCost ${process.env.EMAIL}`,
        to: sellerEmail,
        subject: "Nueva Compra Realizada",
        html: `<p>Se ha realizado una nueva compra en tu tienda en línea.</p>
               <p>Detalles de la compra: ${cartDetails}</p>`,
      };
      await transporter.sendMail(mailOptionsSeller);

      res.status(200).json({
        ok: true,
        data: {
          userEmail: userEmail,
        },
        message: "Compra finalizada y correos enviados correctamente",
      });
    } catch {
      console.log(error);
      return CreateResponseError(res, error);
    }
  },
};

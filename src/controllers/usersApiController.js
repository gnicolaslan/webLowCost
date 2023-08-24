const db = require("../database/models");
const CreateResponseError = require("../helpers/createResponseError");
const transporter = require("../helpers/mailer");
const bcrypt = require('bcryptjs'); // Import the bcryptjs library

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
      where: { email: email }
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
      subject: "Codigo de verificacion: " + codeVerify,
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Restablecimiento de Contraseña</title>
          <!-- Agrega el enlace al archivo CSS de Bootstrap -->
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
      </head>
      <body style="font-family: 'Poppins', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
          <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#f4f4f4" class="center p-2 m-2">
              <tr>
                  <td>
                      <table align="center" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; margin-top: 20px; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
                          <tr>
                              <td class="text-center py-4">
                                  <img src="https://example.com/logo.png" alt="Logo" class="img-fluid" style="max-width: 150px;">
                                  <h2 class="mt-4">Cambio de Contraseña</h2>
                                  <p style="padding: 0 20px;">Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Utiliza el siguiente código para completar el proceso:</p>
                                  <h1 class="display-4" style="font-weight: bold; color: #007bff; margin-top: 10px;">${codeVerify}</h1>
                                  <p style="padding: 0 20px;">Si no solicitaste este cambio, puedes ignorar este correo.</p>
                                  <p>¡Gracias!</p>
                              </td>
                          </tr>
                          <tr>
                              <td class="bg-light py-3 text-center">
                                  <p class="m-0">Si tienes alguna pregunta, por favor contáctanos en <a href="mailto:soporte@example.com">soporte@example.com</a></p>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
    `,
    };

    try {
      const result = await transporter.sendMail(mailOptions);
      console.log(result);
      res.status(200).json({ ok: true, message: 'Mensaje enviado!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, message: 'Error al enviar el correo electrónico' });
    }
  },
  resetPassword: async (req,res) => {
    const { email } = req.params;
    const decodedEmail = decodeURIComponent(email.trim()); 
    const { code, newPassword } = req.body;
    const trimmedCode = code.trim(); 

    const user = await db.User.findOne({
      where: { email: decodedEmail, resetCode: trimmedCode }
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

    res.status(200).json({ ok: true, message: "Contraseña restablecida exitosamente" });

    
  }
};

const express = require('express');
const mercadopago = require('mercadopago');
const transporter = require("../helpers/mailer");
const db = require("../database/models");
require('dotenv').config()

const sendEmailsOnPurchase = async (values, cartItems) => {
    const userEmail = values.email;
    const sellerEmail = process.env.OWNER_EMAIL;

    const cartDetails = cartItems.map((item) => {
        return `
        Producto: ${item.name}
        Precio: ${item.price}
        Cantidad: ${item.quantity}
      `;
    }).join("\n\n");

    if (!userEmail || !sellerEmail) {
        throw new Error("No se ha definido el destinatario del correo electrónico");
    }

    const mailOptionsUser = {
        from: `LowCost ${process.env.EMAIL}`,
        to: userEmail,
        subject: "Gracias por comprar en LowCost Web",
        html: `
        <p>Hola ${values.name},</p>
        <p>Gracias por comprar en nuestro sitio. Aquí están los detalles de tu compra:</p>
        <pre>${cartDetails}</pre>
        <p>Esperamos que disfrutes tus productos.<br>
        Nuestro equipo de ventas se pondrá en contacto contigo para coordinar la logística del envío.</p>
      `,
    };

    await transporter.sendMail(mailOptionsUser);

    const mailOptionsSeller = {
        from: `LowCost ${process.env.EMAIL}`,
        to: sellerEmail,
        subject: "Nueva Compra Realizada en LowCost Web",
        html: `
        <p>Hola Vendedor,</p>
        <p>Se ha realizado una nueva compra en tu tienda en línea. Aquí están los detalles:</p>
        <p>Detalles del Comprador:</p>
        <pre>
          Nombre: ${values.name}
          Apellido: ${values.surname}
          Email: ${values.email}
          Teléfono: ${values.phone}
          DNI: ${values.dni}
          Dirección: ${values.street} ${values.numberAddress}, ${values.postCode}
        </pre>
        <p>Detalles de la Compra:</p>
        <pre>${cartDetails}</pre>
      `,
    };

    await transporter.sendMail(mailOptionsSeller);
};

let userDataAndCart = null;

module.exports = {

    createPreference: async (req, res) => {
        mercadopago.configure({
            access_token: "TEST-2938245235269496-091414-6edd5c1f1294b94467a89c6b720d2d7f-1479550679"
        });

        const { description, price, quantity, values, cartItems } = req.body;
        console.log("Datos recibidos del cuerpo:", req.body);
        console.log('datos de usuario y compra', values, cartItems)

        try {
            const result = await mercadopago.preferences.create({
                items: [
                    {
                        title: description,
                        unit_price: Number(price),
                        quantity: Number(quantity),
                        currency_id: "ARS"
                    },
                ],
                back_urls: {
                    "success": "https://gabriellanzillotti.wnpower.host/mp/success",
                    "failure": "https://gabriellanzillotti.wnpower.host/purchase-denied",
                    "pending": "https://gabriellanzillotti.wnpower.host/pending"
                },
                auto_return: "approved",
            });
            console.log("Respuesta de MercadoPago:", result);

            res.json(result.body)
        } catch (error) {
            return res.status(500).json({ message: 'Something goes wrong' })
        }
    },

    buyerInfo: async (req, res) => {
        const { values, cartItems } = req.body;

        userDataAndCart = { values, cartItems };

        console.log('Datos recibidos en el servidor:', userDataAndCart);
    },

    buySuccess: async (req, res) => {
        try {
            const { collection_status, status } = req.query;

            if (status === 'approved' || collection_status === 'approved') {
                if (userDataAndCart) {
                    const { values, cartItems } = userDataAndCart;
                    const userEmail = values.email;

                    const user = await db.User.findOne({
                        where: {
                            email: userEmail,
                        },
                    });

                    if (user) {
                        const totalPurchasedItems = cartItems.reduce(
                            (total, item) => total + item.quantity,
                            0
                        );
                        user.shopping += totalPurchasedItems;
                        await user.save();
                    } else {
                        return res.status(400).json({
                            ok: false,
                            error: "Usuario no encontrado",
                        });
                    }

                    await sendEmailsOnPurchase(values, cartItems);

                    res.redirect("https://gabriellanzillotti.wnpower.host/purchase-accepted");
                } else {
                    return res.status(400).json({
                        ok: false,
                        error: "Datos de usuario o carrito faltantes",
                    });
                }
            } else {
                return res.redirect("https://gabriellanzillotti.wnpower.host/purchase-denied");
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Something goes wrong' });
        }
    }

}
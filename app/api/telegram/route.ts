const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;


export async function POST(req: Request) {
  try {

    console.log("TOKEN EXIST:", !!token);
    console.log("CHAT ID:", chatId);


    const data = await req.json();


    const message = `
🔴 RED Supermarket

🛒 Նոր պատվեր

📦 Պատվեր №${data.id}

👤 ${data.name}

📞 ${data.phone}

📍 ${data.address}

💳 ${data.payment}

🛍 Ապրանքներ:
${data.items}

━━━━━━━━━━━━

💰 Ընդհանուր՝ ${data.total}

📝 Նշումներ՝ ${data.notes}
`;


    const telegram = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          chat_id: chatId,

          text: message,


          reply_markup: {
            inline_keyboard: [

              [
                {
                  text: "✅ Հաստատված",
                  callback_data: `confirmed|${data.id}`,
                }
              ],

              [
                {
                  text: "📦 Պատրաստվում է",
                  callback_data: `preparing|${data.id}`,
                }
              ],

              [
                {
                  text: "🚚 Առաքման ճանապարհին",
                  callback_data: `out_for_delivery|${data.id}`,
                }
              ],

              [
                {
                  text: "🎉 Առաքված",
                  callback_data: `delivered|${data.id}`,
                }
              ]

            ],
          },

        }),
      }
    );


    const result = await telegram.json();


    console.log(
      "TELEGRAM RESPONSE:",
      result
    );


    return Response.json(result);


  } catch (error) {

    console.error(
      "ERROR:",
      error
    );


    return Response.json(
      {
        error: "failed"
      },
      {
        status: 500
      }
    );

  }
}
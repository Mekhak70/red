import { createClient } from "@supabase/supabase-js";

const token = process.env.TELEGRAM_BOT_TOKEN;

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);


export async function POST(req: Request) {

  try {

    const body = await req.json();

    console.log("TELEGRAM UPDATE:", body);


    if (body.callback_query) {

      const callback = body.callback_query.data;

      const messageId =
        body.callback_query.message.message_id;

      const chatId =
        body.callback_query.message.chat.id;


      const callbackQueryId =
        body.callback_query.id;


      const [status, orderId] =
        callback.split("|");


      console.log("STATUS:", status);
      console.log("ORDER ID:", orderId);



      // UPDATE DATABASE

      const { data, error } =
        await supabaseAdmin
          .from("orders")
          .update({
            status: status
          })
          .eq("id", orderId)
          .select();


      console.log(
        "UPDATED DATA:",
        data
      );


      console.log(
        "UPDATE ERROR:",
        error
      );



      // Telegram popup

      await fetch(
        `https://api.telegram.org/bot${token}/answerCallbackQuery`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({

            callback_query_id:
              callbackQueryId,

            text:
              `Պատվեր ${orderId} → ${status}`

          })
        }
      );



      // Update buttons

      await fetch(
        `https://api.telegram.org/bot${token}/editMessageReplyMarkup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({

            chat_id: chatId,

            message_id: messageId,


            reply_markup: {

              inline_keyboard: [

                [
                  {
                    text:
                      status === "confirmed"
                        ? "✅ Հաստատված"
                        : "Հաստատված",

                    callback_data:
                      `confirmed|${orderId}`
                  }
                ],


                [
                  {
                    text:
                      status === "preparing"
                        ? "✅ Պատրաստվում է"
                        : "Պատրաստվում է",

                    callback_data:
                      `preparing|${orderId}`
                  }
                ],


                [
                  {
                    text:
                      status === "out_for_delivery"
                        ? "✅ Առաքման ճանապարհին"
                        : "Առաքման ճանապարհին",

                    callback_data:
                      `out_for_delivery|${orderId}`
                  }
                ],


                [
                  {
                    text:
                      status === "delivered"
                        ? "✅ Առաքված"
                        : "Առաքված",

                    callback_data:
                      `delivered|${orderId}`
                  }
                ]

              ]

            }

          })
        }
      );

    }


    return Response.json({
      ok: true
    });


  } catch(error) {

    console.error(
      "WEBHOOK ERROR:",
      error
    );


    return Response.json(
      {
        ok:false
      },
      {
        status:500
      }
    );

  }

}
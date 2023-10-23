const Telegram = require("node-telegram-bot-api");
const token = "6561027053:AAG1eoSkMF53Dp_Wu1g7YYmLWiILlTipR8A";
const bot = new Telegram(token, { polling: true });

const mainKeyboard = {
  reply_markup: {
    keyboard: [
      ["Inventory System", "Collection System"],
      ["Attendance System", "Employee Score"],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};

// Define the IMS keyboard
const imsKeyboard = {
  reply_markup: {
    keyboard: [
      ["Danger Stock Level", "Excess Stock Level"],
      ["Reports", "Closing Stock Balance"],
      ["Back To Main Menu"],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};
//report
const imsReport = {
  reply_markup: {
    keyboard: [["Inward Report", "Outward Report"], ["Back To Main Menu"]],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};

const dangerStock = `<b>Hello Sir,</b> \n\n<b>Product SKU: </b>L1\n<b>Available Stock: </b>256\n<b>Percentage: </b>28%\n<b>Status: </b>Danger Level\n\n<b>Remark: </b>Kindly Place Purchase Order Asap!\n\n<b>Touchtek Pvt Ltd.</b>`;
const excessStock = `<b>Hello Sir,</b> \n\n<b>Product SKU: </b>L1\n<b>Available Stock: </b>2563\n<b>Percentage: </b>143%\n<b>Status: </b>Excess Level\n\n<b>Remark: </b>Kindly Place Sale Order Asap!\n\n<b>Touchtek Pvt Ltd.</b>`;
const closingStock = `<pre>
   Inventory Closing Stock
   -----------------------

| # |Product        | Qty.|
|---|--------------:|----:|
| 1 |Ladies Earing  | 245 |
| 2 |Ladies Watch   |  26 |
| 3 |Battery        | 200 |

    Touchtek Pvt Ltd.
</pre>`;

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Handle main keyboard buttons
  if (text === "Inventory System") {
    bot.sendMessage(chatId, "ok", imsKeyboard);
  } else if (text === "Danger Stock Level") {
    bot.sendMessage(chatId, dangerStock, {
      parse_mode: "HTML",
    });
  } else if (text === "Excess Stock Level") {
    bot.sendMessage(chatId, excessStock, {
      parse_mode: "HTML",
    });
  } else if (text === "Closing Stock Balance") {
    bot.sendMessage(chatId, closingStock, {
      parse_mode: "HTML",
    });
  } else if (text === "Back To Main Menu") {
    bot.sendMessage(chatId, "ok", mainKeyboard);
  } else if (text === "Reports") {
    bot.sendMessage(chatId, "ok", imsReport);
  } else if (text === "Inward Report") {
    bot.sendMessage(chatId, "Generating Report...");
    bot.sendDocument(chatId, "./Faridabad.pdf", {
      caption: "Here is Your Inward Report",
      contentType: "application/pdf", // Specify the content-type
    });
  } else if (text === "Outward Report") {
    bot.sendMessage(chatId, "Generating Report...");
    bot.sendDocument(chatId, "./Faridabad.pdf", {
      caption: "Here is Your Outward Report",
      contentType: "application/pdf", // Specify the content-type
    });
  }
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Welcome to the Main Menu! Please select an option:",
    mainKeyboard
  );
});

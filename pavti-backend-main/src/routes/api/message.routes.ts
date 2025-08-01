import { Router } from "express";
import { WhatsAppService } from "../../services/whatsapp.service";
import { msgData } from "../../data/msgData";
import {
  getUserByNumber,
  saveUser,
  User,
  getUserById,
} from "../../modules/user";
import { saveMessage, getMessagesByUserId } from "../../modules/message";
import { Message } from "../../modules/message/types/message";
import { MessageModel } from "../../modules/message";

const router = Router();
const whatsappService = WhatsAppService.getInstance();

/**
 * @swagger
 * tags:
 *   - name: Messages
 *     description: Message management
 */

/**
 * @swagger
 * /api/msg:
 *   get:
 *     summary: Send bulk messages
 *     description: Sends messages to multiple contacts from a predefined data source.
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: Messages sent successfully
 *       400:
 *         description: Invalid message data
 *       500:
 *         description: Failed to send messages
 */
// router.get("/msg", async (req, res) => {
//   try {
//     const messages = msgData["DATA"]?.["MSGRPT"];
//     if (!Array.isArray(messages)) {
//       return res.status(400).json({ error: "Invalid message data" });
//     }

//     for (const contact of messages) {
//       const contactNo = contact["ISD"].split("+")[1] + contact["Mobile No"];
//       const chatId = `${contactNo}@c.us`;

//       let user = await getUserByNumber(contactNo);
//       if (!user) {
//         user = await saveUser(
//           new User({
//             fullName: contact.Name,
//             email: "",
//             contactNo,
//             isApprove: "approved",
//             isActive: true,
//             isTempName: false,
//           })
//         );
//       }

//       await whatsappService.sendMessage(chatId, contact["Message"]);

//     }

//     res.status(200).json({ message: "Messages sent successfully" });
//   } catch (error) {
//     console.error("Message sending error:", error);
//     res.status(500).json({ error: "Failed to send messages" });
//   }
// });

//New Code
// ✅ GET version (static msgData)
// ✅ GET version (static msgData)
// ✅ GET from mock static file or DB
router.get("/msg", async (req, res) => {
  try {
    const messages = msgData["DATA"]?.["MSGRPT"];
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid message data" });
    }

    await sendMessages(messages);
    res.status(200).json({ message: "Messages sent successfully (GET)" });
  } catch (error) {
    console.error("GET Message sending error:", error);
    res.status(500).json({ error: "Failed to send messages (GET)" });
  }
});

// ✅ POST version (dynamic input)
router.post("/msg", async (req, res) => {
  try {
    const messages = req.body?.messages;
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid message data" });
    }

    await sendMessages(messages);
    res.status(200).json({ message: "Messages sent successfully (POST)" });
  } catch (error) {
    console.error("POST Message sending error:", error);
    res.status(500).json({ error: "Failed to send messages (POST)" });
  }
});

// ✅ Shared function for both GET and POST
async function sendMessages(messages: any[]) {
  for (const contact of messages) {
    const contactNo = contact["ISD"].replace("+", "") + contact["Mobile No"];
    const chatId = `${contactNo}@c.us`;

    let user = await getUserByNumber(contactNo);
    if (!user) {
      user = await saveUser(
        new User({
          fullName: contact.Name,
          email: "",
          contactNo,
          isApprove: "approved",
          isActive: true,
          isTempName: false,
        })
      );
    }

    const templateMessagesToSend: {
      type: "template";
      template: any;
      renderedText: string; // 💡 this is for saving in history
    }[] = [];

    // ✅ Rasoi Template
    if (contact.SendRasoi) {
      const name = contact.Name;
      const place = contact.RasoiPlace;

      const template = {
        name: "rasoi_msg",
        language: { code: "gu" },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: name },
              { type: "text", text: place },
              { type: "text", text: place },
            ],
          },
        ],
      };

      const renderedText = `જય સ્વામિનારાયણ ${name},\nઆજે તમારી ${place} માં રસોઈ હતી.\nમહારાજ, પૂ.ગુરૂજી અને સંતો વગેરે ખૂબ જમ્યા અને જમાડયાં.\nરસોઇ આપનાર માટે પૂ.ગુરૂજી અને સંતો વગેરે પ્રાર્થના કરીએ છીએ કે શ્રીહરિ તમારૂં ખૂબ સારૂ કરે.\nFrom - ${place}`;

      templateMessagesToSend.push({
        type: "template",
        template,
        renderedText,
      });
    }

    // ✅ Payout Template
    if (contact.SendPayout) {
      const name = contact.Name;
      const payoutId = contact.PayoutId;
      const date = contact.PayoutDate;
      const amount = contact.PayoutAmount;
      const utr = contact.UTR;
      const org = contact.RasoiPlace;

      const template = {
        name: "payout_msg",
        language: { code: "en" },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: name },
              { type: "text", text: payoutId },
              { type: "text", text: date },
              { type: "text", text: amount },
              { type: "text", text: utr },
              { type: "text", text: org },
            ],
          },
        ],
      };

      const renderedText = `🙏🏻 JAY SWAMINARAYAN 🙏🏻\nFROM ${org}\n\nDear, ${name} Your Invoice No. ${payoutId} dated ${date} for ₹${amount} has been cleared by This ${utr}`;

      templateMessagesToSend.push({
        type: "template",
        template,
        renderedText,
      });
    }

    // ✅ Send Messages and Save to History
    for (const msgContent of templateMessagesToSend) {
      let messageId: string | null = null;
      let isError = false;

      try {
        messageId = await whatsappService.sendMessage(chatId, {
          type: "template",
          template: msgContent.template,
        });
      } catch (err) {
        console.error(`❌ Failed to send to ${contactNo}:`, err);
        isError = true;
      }

      await saveMessage(
        new Message({
          messageId: messageId || `error-${Date.now()}`,
          message: msgContent.renderedText, // 💾 Save actual full text
          mobileNumber: parseInt(contactNo),
          senderName: contact.Name,
          isReceived: false,
          isSend: true,
          isDelivered: false,
          isSeen: false,
          hasAttachment: false,
          isRasoi: !!contact.SendRasoi,
          isError,
          sendedAt: new Date(),
          createdAt: new Date(),
          userId: user._id.toString(),
        })
      );
    }
  }
}

/**
 * @swagger
 * /api/messages/{userId}:
 *   get:
 *     summary: Get paginated messages for a user
 *     description: Get paginated messages for a specific user, ordered by creation date.
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve messages for.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of messages per page.
 *     responses:
 *       200:
 *         description: A paginated list of messages.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       500:
 *         description: Failed to get messages.
 */
router.get("/messages/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const data = await getMessagesByUserId(userId, page, limit);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Get messages error:", error);
    return res.status(500).json({ error: "Failed to get messages" });
  }
});

/**
 * @swagger
 * /api/messages/send/user/{userId}:
 *   post:
 *     summary: Send a message to a user by ID
 *     description: Sends a text message to a user's WhatsApp number using their user ID.
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to send the message to.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Hello, this is a test message from the API."
 *             required:
 *               - message
 *     responses:
 *       200:
 *         description: Message sent successfully.
 *       400:
 *         description: Message content cannot be empty.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Failed to send message.
 */
// router.post("/messages/send/user/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { message } = req.body;

//     if (!message) {
//       return res.status(400).json({ message: "Message cannot be empty" });
//     }

//     const user = await getUserById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const chatId = `${user.contactNo}@c.us`;
//     await whatsappService.sendMessage(chatId, message);

//     return res.status(200).json({ message: "Message sent successfully" });
//   } catch (error) {
//     console.error("Send message error:", error);
//     return res.status(500).json({ error: "Failed to send message" });
//   }
// });

//**** new updated code *** */

router.post("/messages/send/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const chatId = `${user.contactNo}@c.us`;
    await whatsappService.sendMessage(chatId, message);

    // ✅ Save the message to MongoDB
    await MessageModel.create({
      userId: user._id,
      user: Number(user.contactNo?.slice(-4)), // optional logic
      messageId: `msg-${Date.now()}`,
      message: message,
      isSend: true,
      sendedAt: new Date(),
      createdAt: new Date(), // ✅ added
      senderName: user.fullName || "System",
      mobileNumber: Number(user.contactNo),
    });

    return res.status(200).json({ message: "Message sent and saved" });
  } catch (error) {
    console.error("Send message error:", error);
    return res.status(500).json({ error: "Failed to send message" });
  }
});

/**
 * @swagger
 * tags:
 *   - name: Message
 *     description: Message management
 */

/**
 * @swagger
 * /api/messages/send/number:
 *   post:
 *     summary: Send a message via phone number
 *     description: Sends a text message to a WhatsApp number. If the user doesn't exist, a temporary one is created.
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contactNo:
 *                 type: string
 *                 example: "911234567890"
 *               message:
 *                 type: string
 *                 example: "Hello, this is a test message from the API."
 *             required:
 *               - contactNo
 *               - message
 *     responses:
 *       200:
 *         description: Message sent successfully.
 *       400:
 *         description: Contact number and message are required.
 *       500:
 *         description: Failed to send message.
 */
// router.post("/messages/send/number", async (req, res) => {
//   try {
//     const { contactNo, message } = req.body;

//     if (!contactNo || !message) {
//       return res
//         .status(400)
//         .json({ message: "Contact number and message are required" });
//     }

//     const chatId = `${contactNo}@c.us`;
//     let user = await getUserByNumber(contactNo);

//     if (!user) {
//       user = await saveUser(
//         new User({
//           fullName: "Unknown",
//           email: "",
//           contactNo,
//           isApprove: "approved",
//           isActive: true,
//           isTempName: true,
//         })
//       );
//     }

//     await whatsappService.sendMessage(chatId, message);
//     return res.status(200).json({ message: "Message sent successfully" });
//   } catch (error) {
//     console.error("Send message error:", error);
//     return res.status(500).json({ error: "Failed to send message" });
//   }
// });

//**** New Updated Code **** */

router.post("/messages/send/number", async (req, res) => {
  try {
    const { contactNo, message, originalMessageId } = req.body; // ⬅️ NEW

    if (!contactNo || !message) {
      return res
        .status(400)
        .json({ message: "Contact number and message are required" });
    }

    const chatId = `${contactNo}@c.us`;
    let user = await getUserByNumber(contactNo);

    if (!user) {
      user = await saveUser(
        new User({
          fullName: "Unknown",
          email: "",
          contactNo,
          isApprove: "approved",
          isActive: true,
          isTempName: true,
        })
      );
    }

    // ✅ Try sending message
    const messageId: string = await whatsappService.sendMessage(
      chatId,
      message
    );

    const systemId = "system";
    const recipientId = String(user.contactNo);

    // ✅ Create new message in DB
    const senderMessage = await MessageModel.create({
      userId: user._id,
      user: Number(user.contactNo?.slice(-4)),
      messageId: messageId || "error-" + Date.now(),
      message,
      isSend: true,
      isError: false,
      sendedAt: new Date(),
      createdAt: new Date(),
      from_user: systemId,
      to_user: recipientId,
      senderName: "System",
      mobileNumber: recipientId,
    });

    // ✅ Update previous failed message
    if (originalMessageId) {
      await MessageModel.findByIdAndUpdate(originalMessageId, {
        isError: false,
      });
    }

    return res.status(200).json({ message: senderMessage });
  } catch (error) {
    console.error("Send message error:", error);
    return res.status(500).json({ error: "Failed to send message" });
  }
});

router.get("/messages/send/number/:contactNo", async (req, res) => {
  try {
    const { contactNo } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const user = await getUserByNumber(contactNo);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const data = await getMessagesByUserId(user._id.toString(), page, limit);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Get messages by contactNo error:", error);
    return res.status(500).json({ error: "Failed to get messages" });
  }
});

router.post("/messages/mark-seen", async (req, res) => {
  try {
    const { contactNo } = req.body;

    if (!contactNo) {
      return res.status(400).json({ message: "Contact number is required" });
    }

    const user = await getUserByNumber(contactNo);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update all unseen received messages for that user
    await MessageModel.updateMany(
      {
        userId: user._id,
        isReceived: true,
        isSeen: false,
      },
      { $set: { isSeen: true } }
    );

    return res.status(200).json({ message: "Messages marked as seen" });
  } catch (error) {
    console.error("Error marking messages seen:", error);
    return res.status(500).json({ error: "Failed to mark messages as seen" });
  }
});

router.post("/messages/send/bulk", async (req, res) => {
  try {
    const { message, messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: "No messages to send" });
    }

    const results = [];

    for (const entry of messages) {
      const { fullName, contactNo, message: individualMessage } = entry;
      const msgToSend = individualMessage || message;

      if (!contactNo || !msgToSend || !fullName) continue;

      let user = await getUserByNumber(contactNo);
      if (!user) {
        user = await saveUser(
          new User({
            fullName,
            email: "",
            contactNo,
            isApprove: "approved",
            isActive: true,
            isTempName: true,
          })
        );
      }

      const chatId = `${contactNo}@c.us`;

      // 💬 Handle dynamic {{name}} replacement in text messages
      let personalizedMsg = msgToSend;
      if (typeof msgToSend === "string" && msgToSend.includes("{{name}}")) {
        personalizedMsg = msgToSend.replace(/{{\s*name\s*}}/gi, fullName);
      }

      // 📤 Send via WhatsApp (text or template both)
      const messageId = await whatsappService.sendMessage(chatId, msgToSend);

      // 🧠 Decide what to store in Mongo
      const storedMessage =
        typeof personalizedMsg === "string"
          ? personalizedMsg.trim()
          : msgToSend; // keep template object if any

      const senderMessage = await MessageModel.create({
        userId: user._id,
        user: Number(String(contactNo).slice(-4)),
        messageId: messageId || "error-" + Date.now(),
        message: storedMessage || "[TEMPLATE]",
        isSend: true,
        sendedAt: new Date(),
        createdAt: new Date(),
        from_user: "system",
        to_user: contactNo,
        senderName: fullName,
        mobileNumber: contactNo,
        isError: !messageId,
      });

      results.push({ contactNo, status: messageId ? "sent" : "failed" });
    }

    return res.status(200).json({ success: true, results });
  } catch (error) {
    console.error("Bulk message error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Bulk send failed" });
  }
});

export default router;

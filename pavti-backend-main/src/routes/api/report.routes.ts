import { Router, Request, Response } from "express";
import { MessageModel } from "../../modules/message";

const router = Router();

const mainCities = ["Vadodara", "Kundal", "Trust"];

// Weekly report
router.get("/report/weekly", async (req: Request, res: Response) => {
  try {
    const startDateRaw = req.query.startDate as string | undefined;
    const endDateRaw = req.query.endDate as string | undefined;

    const end = endDateRaw ? new Date(endDateRaw) : new Date();
    const start = startDateRaw
      ? new Date(startDateRaw)
      : new Date(new Date().setDate(end.getDate() - 6));

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const messages = await MessageModel.find({
      sendedAt: { $gte: start, $lte: end },
      $or: [
        { isRasoi: true },
        { isPavti: true },
        { isPayoutMsg: true },
        { isError: true },
      ],
    })
      .sort({ sendedAt: -1 })
      .lean();

    // Group by date
    const grouped: Record<string, any[]> = {};
    for (const msg of messages) {
      if (!msg.sendedAt) continue;
      const dateKey = new Date(msg.sendedAt).toISOString().split("T")[0];
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(msg);
    }

    // City counts per date
    const cityCounts: Record<string, any> = {};

    for (const dateKey in grouped) {
      cityCounts[dateKey] = {};
      const dailyMessages = grouped[dateKey];
      let otherCounts = { rasoi: 0, pavti: 0, payout: 0, error: 0 };

      mainCities.forEach((city) => {
        const msgs = dailyMessages.filter((m) => m.rasoiPlace === city);
        cityCounts[dateKey][city] = {
          rasoi: msgs.filter((m) => m.isRasoi && !m.isError).length,
          pavti: msgs.filter((m) => m.isPavti && !m.isError).length,
          payout: msgs.filter((m) => m.isPayoutMsg && !m.isError).length,
          error: msgs.filter((m) => m.isError).length,
        };
      });

      // Other messages
      dailyMessages.forEach((m) => {
        if (!mainCities.includes(m.rasoiPlace)) {
          otherCounts.rasoi += m.isRasoi && !m.isError ? 1 : 0;
          otherCounts.pavti += m.isPavti && !m.isError ? 1 : 0;
          otherCounts.payout += m.isPayoutMsg && !m.isError ? 1 : 0;
          otherCounts.error += m.isError ? 1 : 0;
        }
      });
      if (
        otherCounts.rasoi ||
        otherCounts.pavti ||
        otherCounts.payout ||
        otherCounts.error
      ) {
        cityCounts[dateKey]["Other"] = otherCounts;
      }
    }

    res.status(200).json({
      success: true,
      message: "Weekly report generated",
      data: grouped,
      cityCounts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 📅 Daily Report (Filtered same as weekly)
router.get("/report/weekly/:date", async (req, res) => {
  try {
    const { date } = req.params;

    const startOfDay = new Date(`${date}T00:00:00.000Z`);
    const endOfDay = new Date(`${date}T23:59:59.999Z`);

    const messages = await MessageModel.find({
      sendedAt: { $gte: startOfDay, $lte: endOfDay },
      $or: [
        { isRasoi: true },
        { isPavti: true },
        { isPayoutMsg: true },
        { isError: true },
      ],
    })
      .sort({ sendedAt: -1 })
      .lean();

    // Daily total count by RasoiPlace
    const rasoiPlaceCounts = {
      Vadodara: messages.filter((m) => m.rasoiPlace === "Vadodara").length,
      Kundal: messages.filter((m) => m.rasoiPlace === "Kundal").length,
      Trust: messages.filter((m) => m.rasoiPlace === "Trust").length,
    };

    res.status(200).json({
      success: true,
      message: "Daily report (Rasoi, Pavti, Payout, Error) fetched",
      data: messages,
      rasoiPlaceCounts,
    });
  } catch (err) {
    console.error("Daily report error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;

import { Request, Response } from "express";
import Schedule from "../models/Schedule";
import Station from "../models/Station";
import User from "../models/User";
import * as Yup from "yup";
import moment from "moment";

class ScheduleController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user = await User.findById(res.locals["user"].id);

    const schedules = await Schedule.find({
      user,
    })
      .select("-user")
      .populate("game")
      .populate("station");

    return res.json(schedules);
  }

  public async indexByStation(req: Request, res: Response): Promise<Response> {
    const station = await Station.findById(req.params.id);

    if (!station)
      return res.status(404).send({ error: "Estação não encontrada" });

    const schedules = await Schedule.find({
      station,
    })
      .populate("user")
      .populate("game");

    return res.json(schedules);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      date: Yup.date().required("Date is required"),
      station: Yup.string().required("Station is required"),
      game: Yup.string().required("Game is required"),
      time: Yup.number()
        .positive("The time needs to be positive")
        .oneOf(
          [15, 30, 45, 60],
          "The time needs to be 15, 30, 45 or 60 minutes"
        ),
    });

    try {
      await schema.validate(req.body, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      return res.status(400).send(errors);
    }

    const { date, station, game, time } = req.body;

    try {
      const nextSchedule = await Schedule.findOne({
        date: { $gte: date },
      }).select("date");

      const previousSchedule = await Schedule.findOne({
        date: { $lte: date },
      }).select("date time");

      if (nextSchedule) {
        const currentDate = moment(date);
        const nextDate = moment(nextSchedule.date);

        currentDate.add(time, "minutes");

        if (currentDate > nextDate) {
          return res.status(400).send({ error: "Invalid schedule time" });
        }
      }

      if (previousSchedule) {
        const currentDate = moment(date);
        const previousDate = moment(previousSchedule.date);

        previousDate.add(Number(previousSchedule.time), "minutes");

        if (previousDate > currentDate) {
          return res.status(400).send({ error: "Invalid schedule time" });
        }
      }

      if (await Schedule.findOne({ date }))
        return res.status(400).send({ error: "Schedule already exists" });

      const user = await User.findById(res.locals["user"].id);

      const schedule = await Schedule.create({
        date,
        station,
        game,
        user,
        time,
      });

      return res.json(schedule);
    } catch (err) {
      return res.status(400).send({ error: "Schedule failed" });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const user = await User.findById(res.locals["user"].id);

    try {
      await Schedule.findOneAndDelete({
        user,
        _id: req.params.id,
      });

      return res.status(201).send("Schedule deleted.");
    } catch (err) {
      return res.status(400).send({ error: "Schedule not found." });
    }
  }
}

export default new ScheduleController();

import { getNow } from "../method/method";
import moment from "moment";
import { Session } from "koishi";

export const sendMorning = (session:Session) => {
    return session.send(`<おはねす🌞`);
}

export const sendNight = (session:Session) => {
    return session.send(`おやねす🐑💤💭`)
}
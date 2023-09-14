import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./router/auth.js"
import FAQRouter from "./router/FAQ.js"
import answerRouter from "./router/answer.js"
import favoriteRouter from "./router/favorite.js"
import managerRouter from "./router/manager.js"
import addressRouter from "./router/address.js"
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js";
import { sequelize } from "./db/database.js";
import convRouter from "./router/subway_detail.js"
import doorRouter from "./router/subway_door.js"
import wheelchailrRouter from "./router/wheelchair_door.js"

const app = express();



app.use(express.json());
app.use(cors());
app.use(morgan('tiny')); // 사용자가 들어오면 로그를 찍어줌

app.use('/auth', authRouter);
app.use('/FAQ', FAQRouter);
app.use('/answer', answerRouter )
app.use('/favorite', favoriteRouter)
app.use('/manager', managerRouter)
app.use('/address', addressRouter)
app.use('/conv', convRouter)
app.use('/wheel', wheelchailrRouter)
app.use('/door', doorRouter)


app.use((req, res) => {
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500);
});

sequelize.sync().then(() => {
    const server =app.listen(config.host.port);
initSocket(server);
})

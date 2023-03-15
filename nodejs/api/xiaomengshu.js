const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.get("/toDayKnowLedge", (req, res) => {
    if (req.query.pet_type == "dog" || req.query.pet_type == "cat") {
        res.json = {
            data: {
                everyday_tips: createNewKnowledge(req.query.pet_type),
            }
        }
    }
    console.log("收到请求知识模块", req.query.pet_type);
})
app.listen(8081, () => {
    console.log("服务器启动");
})
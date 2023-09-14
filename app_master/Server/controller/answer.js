import * as answerRepository from '../data/answer.js';
import { getSocketIO } from '../connection/socket.js';

export async function createAnswer(req, res, next) {
    try {
        const { ui_userid, ui_name, ua_title, ua_contents } = req.body;

        if (!ui_userid || !ui_name || !ua_title || !ua_contents) {
            return res.status(400).json({ message: 'Incomplete data provided' });
        }

        const answer = await answerRepository.create(ui_userid, ui_name, ua_title, ua_contents);

        res.status(201).json(answer);
    } catch (error) {
        console.error('Error creating answer:', error);
        res.status(500).json({ message: 'Failed to create answer' });
    }
}


// export async function getAnswer(req, res, next) {
//     const id = req.params.ui_userid;
//     console.log(id)
//     const answer = await answerRepository.findByUserid(id);
//     if (answer) {
//         res.status(200).json(answer);
//     } else {
//         res.status(404).json({ message: `answer id(${id})not found` })
//     }
// }

export async function getAnswer(req, res, next) {
    try {
        const ui_userid = req.params.ui_userid;
        console.log(ui_userid);
        const answer = await answerRepository.findByUserid(ui_userid);
        if (answer) {
            res.status(200).json(answer);
        } else {
            res.status(404).json({ message: `Answer with id(${ui_userid}) not found` });
        }
    } catch (error) {
        console.error('Error getting answer:', error);
        res.status(500).json({ message: 'Failed to get answer' });
    }
}

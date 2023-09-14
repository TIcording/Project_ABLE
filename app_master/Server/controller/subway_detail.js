import * as detailRepository from '../data/subway_detail.js';
import { getSocketIO } from '../connection/socket.js';

export async function findAllConv(req, res) {
    const station = req.query.station;
    // console.log(station)
    const conv = await (station
        ? detailRepository.getDetailsbyStation(station)
        : detailRepository.getAllDetails())
    // console.log(conv.dataValues)
    res.status(200).json(conv)
}

export async function findToiletCnt(req, res){
    const station = req.params.station;
    const info = await(detailRepository.getToiletCnt(station));
    if(info){
        const parsedToiletCnt = parseInt(info.toilet, 10);
        const parsedWheelchairCnt = parseInt(info.wheelchair_lift, 10)
        console.log(parsedWheelchairCnt)
        res.status(200).json({ toiletCnt: parsedToiletCnt, wheelchairCnt: parsedWheelchairCnt });
    }else{
        res.status(404).json({message: `Error`})
    }
}

// export async function findWheelchairChargerCnt(req, res){
//     const station = req.params.station;
//     const charget_cnt = await(detailRepository.getWheelchairChargerCnt(station));
//     if(charget_cnt){
//         res.status(200).json(charget_cnt)
//     }else{
//         res.status(404).json({message: `Error2`})
//     }
// }
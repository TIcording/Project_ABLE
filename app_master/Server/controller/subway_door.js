import * as doorRepository from '../data/subway_door.js';
import { getSocketIO } from '../connection/socket.js';

export async function findAllDoor(req, res) {
    const station = req.query.station;
    // console.log(station)
    const door = await (station
        ? doorRepository.getWSubDoorbyStation(station)
        : doorRepository.getAllWSubwayDoor())
    // console.log(conv.dataValues)
    res.status(200).json(door)
}

export async function findDoorInfo(req, res){
    const station = req.params.station;
    const info = await(detailRepository.getWSubDoorbyStation(station));
    if(info){
        const direction = info.direction;
        const door = info.door;
        res.status(200).json({ direction, door});
    }else{
        res.status(404).json({message: `Error`})
    }
}
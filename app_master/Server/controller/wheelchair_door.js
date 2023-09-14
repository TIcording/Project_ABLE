import * as wheelchairRepository from '../data/wheelchair_door.js'

export async function findLoca(req, res){
    const station = req.query.station;
    const wheelDoor = await (station
        ? wheelchairRepository.getWheelDoorbyStation(station)
        : wheelchairRepository.getAllWheelDoor())
    // console.log(conv.dataValues)
    res.status(200).json(wheelDoor)
}
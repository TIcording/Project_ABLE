import SQ, { Sequelize } from 'sequelize';
import { sequelize } from '../db/database.js';

// const INCLUDE_DETAILS = {
//     attributes: [
//         'line', 'station_nm', 'elevator', 'escalator', 'horizonal_walker', 'wheelchair_lift', 'movable_safety', 'toilet', 'voice_inducer', 'telephone'],
//     }


const Sub_conv = sequelize.define('sub_conv', {
    // 스키마의 테이블 구조와 일치하는 필드를 여기에 정의해야 합니다.
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    line: {
      type: Sequelize.INTEGER,
    },
    station_nm: {
      type: Sequelize.STRING,
    },
    elevator: {
        type: Sequelize.STRING,
    },
    escalator: {
        type: Sequelize.STRING,
    },
    horizonal_walker: {
        type: Sequelize.STRING,
    },
    wheelchair_lift: {
        type: Sequelize.STRING,
    },
    movable_safety: {
        type: Sequelize.STRING,
    },
    toilet: {
        type: Sequelize.STRING,
    },
    voice_inducer: {
        type: Sequelize.STRING,
    },
    telephone: {
        type: Sequelize.STRING,
    },
  }, {
    // 기존 테이블과 연결
    tableName: 'sub_conv',
    timestamps:false
  });
  
  // 데이터 가져오기
export async function getAllDetails() {
    return Sub_conv.findAll()
    .then((conv) => {
        console.log(conv)
    })
    .catch((error) => console.log(error))
};

// //호선별 데이터 가져오기
// export async function getDetailsbyLine(line){
//     return Sub_conv.findAll({ where:{line} })
// }

//역사명으로 데이터 가져오기
export async function getDetailsbyStation(station_nm){
    return Sub_conv.findAll({
        attributes: [
            'line', 'station_nm', 'elevator', 'escalator', 'horizonal_walker', 'wheelchair_lift', 'movable_safety', 'toilet', 'voice_inducer', 'telephone'],
        where: {station_nm},
    })
}

//화장실 개수 데이터가 있으면 가져오기
export async function getToiletCnt(station_nm){
    return Sub_conv.findOne({
        attributes: [
            'line', 'station_nm', 'elevator', 'escalator', 'horizonal_walker', 'wheelchair_lift', 'movable_safety', 'toilet', 'voice_inducer', 'telephone'],
        where: {
            station_nm,
            toilet: {
                [Sequelize.Op.ne]: null
            },
        }
    })
}

//휠체어 충전소 개수 데이터가 있으면 가져오기
// export async function getWheelchairChargerCnt(station_nm){
//     return Sub_conv.findOne({
//         attributes: [
//             'line', 'station_nm', 'elevator', 'escalator', 'horizonal_walker', 'wheelchair_lift', 'movable_safety', 'toilet', 'voice_inducer', 'telephone'],
//         where: {
//             station_nm,
//             wheelchair_lift: {
//                 [Sequelize.Op.ne]: null
//             },
//         }
//     })
// }
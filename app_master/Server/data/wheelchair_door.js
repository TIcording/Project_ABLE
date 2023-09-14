import SQ, { Sequelize } from 'sequelize';
import { sequelize } from '../db/database.js';



const Wheel_door = sequelize.define('wheelchairdoor', {
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
    loca: {
        type: Sequelize.STRING,
    },
  }, {
    // 기존 테이블과 연결
    tableName: 'wheelchairdoor',
    timestamps:false
  });
  
  // 데이터 가져오기
export async function getAllWheelDoor() {
    return Wheel_door.findAll()
    .then((conv) => {
        console.log(conv)
    })
    .catch((error) => console.log(error))
};

//역사명으로 데이터 가져오기
export async function getWheelDoorbyStation(station_nm){
    return Wheel_door.findAll({
        attributes: [
            'line', 'station_nm', 'loca'],
        where: {station_nm},
    })
}


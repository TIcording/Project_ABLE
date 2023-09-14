import SQ, { Sequelize } from 'sequelize';
import { sequelize } from '../db/database.js';



const Sub_door = sequelize.define('sub_door', {
    // 스키마의 테이블 구조와 일치하는 필드를 여기에 정의해야 합니다.
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    line: {
      type: Sequelize.INTEGER,
    },
    station: {
      type: Sequelize.STRING,
    },
    direction: {
        type: Sequelize.STRING,
    },
    door: {
        type: Sequelize.STRING,
    },
  }, {
    // 기존 테이블과 연결
    tableName: 'sub_door',
    timestamps:false
  });
  
  // 데이터 가져오기
export async function getAllWSubwayDoor() {
    return Sub_door.findAll()
    .then((door) => {
        console.log(door)
    })
    .catch((error) => console.log(error))
};

//역사명으로 데이터 가져오기
export async function getWSubDoorbyStation(station){
    return Sub_door.findAll({
        attributes: [
            'line', 'station', 'direction', 'door'],
        where: {station},
    })
}


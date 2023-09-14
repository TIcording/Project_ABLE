// 데이터와 데이터를 처리하는 로직
// 즐겨찾기 데이터를 조회, 추가, 삭제 할 수있음
import SQ, { Sequelize } from 'sequelize'
import { sequelize } from '../db/database.js';
import { User } from './auth.js';
// import moment from 'moment-timezone';

const DataTypes = SQ.DataTypes; // 데이터 형식을 지정해줄 수 있음

const INCLUDE_FAVORITE = {
    // select 뒤에 보고싶은 필드만 적듯이 attributes에 보고싶은 애들만 적어줌
    attributes: [
        'uf_idx',
        'uf_location',
        // users 테이블에 있는 요소들 -> 한단계 안에 있는 요소들을 한단계 밖으로 꺼냄
        [Sequelize.col('user.ui_idx'), 'ui_idx'],  
        [Sequelize.col('user.ui_userid'), 'ui_userid'],   
    ],
    include : {
        model: User,
        as: 'user',
        attributes: [],  
    }
}


const ORDER_DESC = {
    order: [['createdAt', 'DESC']]
}

export const Favorite  = sequelize.define(
    'User_favorite',
    {
        // user 테이블에서 필드명 확인해야함
        ui_idx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '유저 idx값'
        },
        uf_idx: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment:'즐겨찾기 인덱스'
        },
        // uf_category: {
        //     type: DataTypes.STRING(10),
        //     allowNull: false,
        //     comment: '즐겨찾기의 종류(장소)'
        // },
        uf_location: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '장소의 이름'
        },

        uf_address: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: '장소의 주소'
        }
    },
    { timestamps: true, freezeTableName:true }  
)


Favorite.belongsTo(User, { foreignKey: 'ui_idx' , as:'user'});

// 전체 데이터 반환
export async function getAll(){
    return Favorite.findAll({...INCLUDE_FAVORITE, ...ORDER_DESC})
}

// ui_idx(회원의 아이디값)으로 데이터 반환
export async function findByUserIdx(ui_idx){
    return Favorite.findOne({ where: {ui_idx}})
}

export async function findAllfavorite(ui_idx) {
    try {
        const favorite = await Favorite.findAll({
            where: { ui_idx },
            attributes: ['uf_location', 'uf_address'],
        });
        return favorite;
    } catch (error) {
        console.error('favorite 조회 중 오류가 발생했습니다.', error);
        throw error;
    }
}


// uf_idx로 데이터 반환
export async function findByUfIdx(uf_idx){
    return Favorite.findOne({
        attributes: ['uf_location'],
        where:{uf_idx}
    })
}

// Post 
// User_Routes테이블(User_route)에 새로운 객체로 즐겨찾기를 생성
export async function create(ui_idx, uf_location, uf_address){
    return Favorite.create({ ui_idx, uf_location, uf_address})
    .then((data) => {
        return data
    })
}

//delete
//id로 지우고싶은 tweet 지움
export async function remove(ui_idx, uf_location){
    return Favorite.findOne({where: {ui_idx, uf_location}}).then((favorite) => {favorite.destroy()   // 아이디로 찾은 해당 favorite 삭제함
    })
}   

// export async function removeall(ui_idx){
//     return Favorite.findAll({
//         where: {ui_idx}
//     }).then((favorite) => {favorite.destroy()   // 아이디로 찾은 해당 favorite 삭제함
//     })
// }   

export async function removeAll(ui_idx) {
    try {
        const favorites = await Favorite.findAll({
            where: { ui_idx }
        });
        
        for (const favorite of favorites) {
            await favorite.destroy();
        }
        
        return true; // 성공적으로 삭제되었음을 반환
    } catch (error) {
        console.error('즐겨찾기 삭제 중 오류 발생:', error);
        throw error;
    }
}

export async function removeByLocation(ui_idx, uf_address) {
    try {
        await Favorite.destroy({
            where: {
                ui_idx,
                uf_address
            }
        });
    } catch (error) {
        console.error('Error deleting favorite by location:', error);
        throw error;
    }
}
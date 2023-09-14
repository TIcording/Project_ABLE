import { User } from './auth.js';
import SQ, { Sequelize } from 'sequelize';
import { sequelize } from '../db/database.js';


const DataTypes = SQ.DataTypes;

const INCLUDE_ADDRESS = {
    // select 뒤에 보고싶은 필드만 적듯이 attributes에 보고싶은 애들만 적어줌
    attributes: [
        'uad_idx',
        'uad_category',
        'uad_location',
        'uad_address',
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

const Address = sequelize.define(
    'User_address',
    {
        ui_idx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '유저 idx값'
        },
        uad_idx: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment:'주소관리 인덱스'
        },
        uad_category: {
            type: DataTypes.STRING(45),
            allowNull: false,
            comment: '주소관리 카테고리'
        },
        uad_location: {
            type: DataTypes.STRING(128),
            allowNull: false,
            comment: '주소관리 장소명'
        },
        uad_address: {
            type:DataTypes.STRING(300),
            allowNull: false,
            comment: '주소관리 장소에 대한 주소'
        }
    },
    { timestamps: false ,freezeTableName:true }
)

Address.belongsTo(User, {foreignKey: 'ui_idx', as:'user'})

// 전체 데이터 반환
export async function getAll(){
    return Address.findAll({...INCLUDE_ADDRESS, ...ORDER_DESC})
}

// ui_idx로 주소관리 데이터 반환
export async function findByUserIdx(ui_idx) {
    return Address.findOne({ where: { ui_idx } });
};

// uad_idx로 데이터 반환
export async function findByUiIdx(ui_idx){
    return Address.findAll({
        where:{ ui_idx }
    })
}

export async function findByUadIdx(uad_idx){
    return Address.findOne({
        where:{ uad_idx }
    })
}

//uad_category로 데이터 반환
export async function findByUadCategory(uad_category){
    return Address.findAll({
        attributes: ['ui_idx', 'uad_category', 'uad_location', 'uad_address'], 
        where:{ uad_category },
    })
}

// 생성
export async function create(ui_idx, uad_category, uad_location, uad_address) {
    return Address.create({ ui_idx, uad_category, uad_location, uad_address })
        .then((data) => {
            return data;
        });
}



export async function update(ui_idx, uad_idx, uad_location, uad_address) {
    return Address.findOne({ where: { ui_idx,uad_idx }})
        .then((address) => {
            
            address.uad_location = uad_location;
            address.uad_address = uad_address;
            return address.save();
        });
}


export async function remove(uad_idx) {
    return Address.findOne({where:{uad_idx}})
        .then((address) => {
            address.destroy();
        })
}

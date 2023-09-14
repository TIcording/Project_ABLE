import SQ from 'sequelize';
import { sequelize } from '../db/database.js';

const DataTypes = SQ.DataTypes;

export const Manager = sequelize.define(
    'Manager_info',
    {
        'mi_idx': {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
            comment:"관리자 인덱스"
        },
        'mi_userid': {
            type: DataTypes.STRING(20),
            allowNull:false,
            comment:"관리자 아이디"
        },
        'mi_password': {
            type: DataTypes.STRING(20),
            allowNull:false,
            comment:"관리자 비밀번호"
        },
        'mi_name': {
            type: DataTypes.STRING(20),
            allowNull:false,
            comment:"관리자 이름"
        },
        'mi_hp': {
            type: DataTypes.STRING(20),
            allowNull:false,
            comment:"관리자 전화 번호"
        },
        'mi_join': {
            type: DataTypes.TINYINT,
            allowNull:false,
            defaultValue: 1,
            comment:"탈퇴 관리자:0 가입 관리자:1"
        },
        'mi_department': {
            type: DataTypes.STRING(20),
            allowNull:false,
            comment:"관리자 부서"
        },
        'mi_regdate': {
            type: DataTypes.DATE(),
            defaultValue: DataTypes.NOW(),
            allowNull: false,
        },
        'mi_update': {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
            onUpdate: DataTypes.NOW
        },
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)

export async function create(mi_userid, mi_password, mi_name, mi_hp, mi_department){
    return Manager.create({mi_userid, mi_password, mi_name, mi_hp, mi_department})
    .then((data) => {
        return data
    })
}


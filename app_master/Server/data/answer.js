import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth.js';


const DataTypes = SQ.DataTypes;

export const Answer = sequelize.define(
    'User_answer', // table name
    {
        ua_idx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: '고객센터 인덱스',
        },
        ui_userid: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '유저 아이디',
        },
        ui_name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '유저 이름',
        },
        mi_name: {
            type: DataTypes.STRING(20),
            comment: '관리자 이름',
        },
        ua_title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '문의 제목',
        },
        ua_contents: {
            type: DataTypes.TEXT,
            comment: '문의 내용',
        },
        ua_answer: {
            type: DataTypes.TEXT,
            comment: '답변 내용',
        },
        ua_type: {
            type: DataTypes.INTEGER,
            defaultValue: 0, // 기본값 0으로 설정
            comment: '0:기타, 1:불편사항, 2:고장접수',
        },
        ua_resolution: {
            type: DataTypes.INTEGER,
            defaultValue: 0, // 기본값 0으로 설정
            comment: '0:미해결, 1:해결',
        },
        ua_regdate: {
            type: DataTypes.DATE(),
            defaultValue: DataTypes.NOW(),
            allowNull: false
        },
        ua_update: {
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
Answer.belongsTo(User, { foreignKey: 'ui_userid' , as:'user'});

export async function findByUserid(ui_userid) {
    return Answer.findAll({ where: { ui_userid } });
};

export async function create(ui_userid, ui_name, ua_title, ua_contents) {
    return Answer.create({ ui_userid, ui_name, ua_contents, ua_title })
        .then((data) => {
            return data;
        });
}


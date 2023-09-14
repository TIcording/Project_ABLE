import SQ from 'sequelize';
import { sequelize } from '../db/database.js';

const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
    'User_info', // table name
    {
        ui_idx: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        ui_userid: {
            type: DataTypes.STRING(20),
            allowNull: false
        },

        ui_password: {
            type: DataTypes.STRING(128),
            allowNull: false
        },

        ui_name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },

        ui_address: {
            type: DataTypes.STRING(45),
            allowNull: false
        },

        ui_hp: {
            type: DataTypes.STRING(20),
            allowNull: false
        },

        ui_email: {
            type: DataTypes.STRING(128),
            allowNull: false
        },

        ui_regdate: {
            type: DataTypes.DATE(),
            defaultValue: DataTypes.NOW(),
            allowNull: false
        },

        ui_update: {
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



export async function findByMyPage(ui_userid) {
    return User.findOne({
        attributes: ['ui_name', 'ui_address','ui_email', 'ui_hp', 'ui_password'],
        where: {
            ui_userid
        }
    });
};

export async function findByUserid(ui_userid) {
    return User.findOne({ where: { ui_userid } });
};

export async function findByUsername(ui_name) {
    return User.findOne({ where: { ui_name } });
};

export async function findByUseraddress(ui_address) {
    return User.findOne({ where: { ui_address } });
};

export async function findByUserhp(ui_hp) {
    return User.findOne({ where: { ui_hp } });
};

export async function findByUserpassword(ui_password) {
    return User.findOne({ where: { ui_password } });
};

export async function createUser(user) {
    return User.create(user)
        .then((data) => data.dataValues.id);
};

export async function findById(ui_idx) {
    return User.findByPk(ui_idx);
};

export async function updateByMyPage(ui_userid, updatedFields) {
    const user = await User.findOne({ where: { ui_userid } });

    if (!user) { 
        return 0; // 또는 null, false 등으로 사용자가 존재하지 않는 경우를 나타냄
    }

    const { ui_name, ui_address, ui_hp,ui_email, ui_password } = updatedFields;
    const updatedUser = await user.update({
        ui_name: ui_name || user.ui_name,
        ui_address: ui_address || user.ui_address,
        ui_hp: ui_hp || user.ui_hp,
        ui_email: ui_email || user.ui_email,
        ui_password: ui_password || user.ui_password,
    });

    return 1; // 또는 true 등으로 사용자 업데이트 성공을 나타냄
}


export async function findOneIDByEmail(ui_name,ui_email) {
    return User.findOne({ where: { ui_name, ui_email} });
};

export async function findOneIDByHp(ui_name,ui_hp) {
    return User.findOne({ where: { ui_name, ui_hp} });
};

export async function findByUserPw(ui_userid, ui_name, ui_hp) {
    return User.findOne({ where: { ui_userid,  ui_name, ui_hp } });
};

export async function findBySearchUserPw(ui_userid, ui_name, ui_hp) {
    return User.findOne({ where: { ui_userid,  ui_name, ui_hp } });
};
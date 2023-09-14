import SQ from 'sequelize';
import { sequelize } from '../db/database.js';

const DataTypes = SQ.DataTypes;

export const Faq = sequelize.define(
    'FAQ_info', // table name
    {
        fi_idx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: 'FAQ 인덱스',
        },
        fi_detail: {
            type: DataTypes.TEXT,
            comment: '문의 내용',
        },
        mi_name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '관리자 이름',
        },
        fi_answer: {
            type: DataTypes.TEXT,
            comment: '답변 내용',
        },
        fi_regdate: {
            type: DataTypes.DATE(),
            defaultValue: DataTypes.NOW(),
            allowNull: false
        },

    },
    {
        timestamps: false,
        freezeTableName: true
    }

)



export async function findAllFAQ() {
    try {
        const faqs = await Faq.findAll({
            attributes: ['fi_detail', 'mi_name', 'fi_answer'],
        });
        return faqs;
    } catch (error) {
        console.error('FAQ 조회 중 오류가 발생했습니다.', error);
        throw error;
    }
}

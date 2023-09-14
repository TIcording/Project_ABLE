import * as ManagerRepository from '../data/manager.js';

export async function createManager(req, res){
    const {mi_userid, mi_password, mi_name, mi_hp, mi_department} = req.body

    const manager = await ManagerRepository.create(mi_userid, mi_password, mi_name, mi_hp, mi_department)
    if(manager){
        res.status(201).json(manager);
    }
}
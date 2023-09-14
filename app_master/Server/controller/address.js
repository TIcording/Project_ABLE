import * as addressRepository from '../data/address.js';
import { getSocketIO } from '../connection/socket.js';


export async function getAddress(req, res, next) {
    const ui_idx = req.query.ui_idx
    const data = await (ui_idx
        ? addressRepository.findById(ui_idx)
        : addressRepository.getAll())
    res.status(200).json(data)
}

// ui_idx로 데이터 찾기 
export async function getAddressByAddressId(req, res) {
    const ui_idx = req.params.ui_idx;
    const address = await addressRepository.findByUiIdx(ui_idx);
    if (address) {
        res.status(200).json(address)
    } else {
        res.status(404).json({ message: `ui_idx ${ui_idx} not found!` })
    }
}

// uad_category로 데이터 찾기 
export async function getAddressByAddressCategory(req, res) {
    const uad_category = req.params.uad_category;
    const address = await (addressRepository.findByUadCategory(uad_category));
    if (address) {
        res.status(200).json(address)
    } else {
        res.status(404).json({ message: `uad_category ${uad_category} not found!` })
    }
}

// 주소관리 등록
export async function createAddress(req, res, next) {
    const { ui_idx, uad_category, uad_location, uad_address } = req.body;
    const address = await addressRepository.create(ui_idx, uad_category, uad_location, uad_address);
    res.status(201).json(address);
    getSocketIO().emit('Address', address);
}


export async function updateAddress(req, res) {
    const ui_idx = req.params.ui_idx;
    const { uad_idx, uad_location, uad_address } = req.body;
    const address = await addressRepository.findByUadIdx(ui_idx);
    if (!address) {
        res.status(404).json({ message: `address ui_idx (${ui_idx})not found` })
    }
    if (address.ui_idx !== ui_idx) {
        return res.sendStatus(403);
    }
    const updated = await addressRepository.update(ui_idx, uad_idx, uad_location, uad_address);
    res.status(200).json(updated);
}


export async function deleteAddress(req, res, next) {
    try {
        const { uad_idx } = req.params;
        console.log(uad_idx)
        const address = await addressRepository.findByUadIdx(uad_idx);
        console.log(address.uad_idx)
        console.log(req.params.uad_idx)

        if (!address) {
            return res.status(404).json({ message: `address uad_idx ${uad_idx} not found` });
        }

        if (address.uad_idx != req.params.uad_idx) {
            return res.sendStatus(403);
        }

        await addressRepository.remove(uad_idx);
        res.sendStatus(204);
    } catch (error) {
        // 오류 처리
        console.error('주소 삭제 오류:', error);
        next(error); // 다음 미들웨어로 오류 전달
    }
}



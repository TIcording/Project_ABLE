// 모델과 뷰를 연결하는 역할
import * as favoriteRepository from '../data/favorite.js'
import { getSocketIO } from '../connection/socket.js';


export async function getFavorites(req, res) {
    const ui_idx = req.query.ui_idx
    const data = await (ui_idx
        ? favoriteRepository.findByUserIdx(ui_idx)
        : favoriteRepository.getAll())
    res.status(200).json(data)
}

// ui_userid로 데이터 찾기
// export async function getFavoritesByUserId(req, res) {
//     const ui_userid = req.params.ui_userid; 
//     const favorite = await (favoriteRepository.findByUserId(ui_userid));
//     if (favorite) {
//         res.status(200).json(favorite)
//     }else {
//         res.status(404).json({ message : `ui_userid ${ui_userid} not found!`})
//     }
// }

// ui_idx로 데이터 찾기 
export async function getFavoritesByFavoriteId(req, res) {
    try {
        const ui_idx = req.params.ui_idx;
        const favorite = await favoriteRepository.findAllfavorite(ui_idx);

        if (favorite) {
            res.status(200).json(favorite);
        } else {
            res.status(404).json({ message: `ui_idx ${ui_idx} not found!` });
        }
    } catch (error) {
        console.error('Error creating favorite:', error);
        res.status(500).json({ message: 'server error' });
    }
}


// Post
// 즐겨찾기 등록하기
export async function createFavorites(req, res) {
    try {
        const { ui_idx, uf_location, uf_address } = req.body;
        const favorite = await favoriteRepository.create(ui_idx, uf_location, uf_address);
        res.status(201).json(favorite);
        getSocketIO().emit('Favorite', favorite);
    } catch (error) {
        console.error('Error creating favorite:', error);
        res.status(500).json({ message: 'Failed to create favorite' });
    }
}



//Delete
export async function deleteFavorites(req, res, next) {
    try {
        const ui_idx = req.params.ui_idx;
        const { uf_location } = req.body;
        const favorite = await favoriteRepository.findByUserIdx(ui_idx);
        if (!favorite) {
            return res.status(404).json({ message: `Favorite not found` });
        }
        if (favorite.ui_idx != req.params.ui_idx) {
            return res.status(403).json({ message: `Forbidden to delete favorite` });
        }

        await favoriteRepository.remove(ui_idx, uf_location);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting favorite:', error);
        res.status(500).json({ message: 'Failed to delete favorite' });
    }
}


export async function deleteFavoritesAll(req, res, next) {
    try {
        const {ui_idx} = req.params;

        const favorite = await favoriteRepository.findByUserIdx(ui_idx);
        
        if (!favorite) {
            return res.status(404).json({ message: `Favorite not found` });
        }
        if (favorite.ui_idx != req.params.ui_idx) {
            return res.status(403).json({ message: `Forbidden to delete favorite` });
        }

        await favoriteRepository.removeAll(ui_idx);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting favorite:', error);
        res.status(500).json({ message: 'Failed to delete favorite' });
    }
}

export async function deleteSelectedFavorites(req, res, next) {
    try {
        const { ui_idx } = req.params;
        const selectedFavorites = req.body;

        const favorite = await favoriteRepository.findByUserIdx(ui_idx);
        
        if (!favorite) {
            return res.status(404).json({ message: `Favorite not found` });
        }
        if (favorite.ui_idx != ui_idx) {
            return res.status(403).json({ message: `Forbidden to delete favorite` });
        }

        for (const selectedFavorite of selectedFavorites) {
            const { uf_address } = selectedFavorite;
            
            // 선택된 즐겨찾기 항목 삭제 로직을 수행
            await favoriteRepository.removeByLocation(ui_idx, uf_address);
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting selected favorites:', error);
        res.status(500).json({ message: 'Failed to delete selected favorites' });
    }
}

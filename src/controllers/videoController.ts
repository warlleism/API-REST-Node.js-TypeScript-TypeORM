import { Request, Response } from "express"
import { videoRepository } from "../repositories/videoRepository"
import { roomRepository } from "../repositories/roomRepository"

export class VideoController {

    async create(req: Request, res: Response) {
        const { title, url, room_id } = req.body

        try {
            const room = await roomRepository.findOneBy({ id: room_id })
            if (!room) {
                return res.status(404).json({ message: 'Aula não existe' })
            }
            
            const newVideo = videoRepository.create({ title: title, url: url, room: room })
            await videoRepository.save(newVideo)
            return res.status(201).json(newVideo)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    async get(req: Request, res: Response) {
        try {
            const allVideos = await videoRepository.find();
            return res.status(200).json({ message: 'Busca feita com sucesso!', data: allVideos });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

}
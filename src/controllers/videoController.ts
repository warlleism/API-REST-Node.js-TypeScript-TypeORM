import { Request, Response } from "express"
import { videoRepository } from "../repositories/videoRepository"

export class VideoController {

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
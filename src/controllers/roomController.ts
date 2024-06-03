import { Request, Response } from "express"
import { roomRepository } from "../repositories/roomRepository"

export class RoomController {

    async create(req: Request, res: Response) {
        const { name, description } = req.body

        try {
            const newRoom = roomRepository.create({ name: name, description: description })
            await roomRepository.save(newRoom)
            return res.status(201).json(newRoom)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }

    }

    async get(req: Request, res: Response) {
        try {
            const allRoom = await roomRepository.find();
            return res.status(200).json({ message: 'Busca feita com sucesso!', data: allRoom });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
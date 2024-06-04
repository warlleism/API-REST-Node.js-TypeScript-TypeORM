import { Request, Response } from "express"
import { roomRepository } from "../repositories/roomRepository"
import { subjectRepository } from "../repositories/subjectRepository"
import { videoRepository } from "../repositories/videoRepository"

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

    async createVideo(req: Request, res: Response) {
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


    async roomSubject(req: Request, res: Response) {
        const { subject_id } = req.body
        const { idRoom } = req.body

        try {
            const room = await roomRepository.findOneBy({ id: Number(idRoom) })

            if (!room) {
                return res.status(404).json({ message: 'Aula não existe' })
            }

            const subject = await subjectRepository.findOneBy({
                id: Number(subject_id),
            })

            if (!subject) {
                return res.status(404).json({ message: 'Disciplina não existe' })
            }

            const roomUpdate = {
                ...room,
                subjects: [subject],
            }

            await roomRepository.save(roomUpdate)
            return res.status(200).json({ message: 'Sucesso' })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Sever Error' })
        }
    }

    async list(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const skip = (page - 1) * limit;

            const [rooms, total] = await roomRepository.findAndCount({
                relations: {
                    subjects: true,
                    videos: true,
                },
                skip: skip,
                take: limit,
            });

            const totalPages = Math.ceil(total / limit);
            return res.json({
                data: rooms,
                meta: {
                    totalItems: total,
                    itemCount: rooms.length,
                    itemsPerPage: limit,
                    totalPages: totalPages,
                    currentPage: page,
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
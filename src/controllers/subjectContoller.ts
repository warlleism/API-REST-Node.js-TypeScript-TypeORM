import { Request, Response } from "express"
import { subjectRepository } from "../repositories/subjectRepository"

export class SubjectController {
    
    async create(req: Request, res: Response) {
        const { name } = req.body

        if (!name) {
            return res.status(400).json({ message: "O nome é obrigatória" })
        }

        try {
            const newSubject = subjectRepository.create({ name: name })
            await subjectRepository.save(newSubject)
            return res.status(200).json({ message: 'Subject salvo com sucesso!' })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    async get(req: Request, res: Response) {
        try {
            const newSubject = await subjectRepository.find();
            return res.status(200).json({ message: 'Busca feita com sucesso!', data: newSubject });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.body

        try {
            const result = await subjectRepository.delete(id)

            if (result.affected === 0) {
                return res.status(404).json({ message: 'Subject not found' });
            }

            return res.status(200).json({ message: 'Subject deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async findOne(req: Request, res: Response) {
        const { id } = req.body;

        try {
            const subject = await subjectRepository.findOne({ where: { id: id } });

            if (!subject) {
                return res.status(404).json({ message: 'Subject not found' });
            }

            return res.status(200).json({ message: 'Subject found successfully', data: subject });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async update(req: Request, res: Response) {
        const { id, name } = req.body;

        try {
            const subject = await subjectRepository.findOne({ where: { id: id } });

            if (!subject) {
                return res.status(404).json({ message: 'Subject not found' });
            }

            subject.name = name;
            await subjectRepository.save(subject);
            return res.status(200).json({ message: 'Subject updated successfully', data: subject });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
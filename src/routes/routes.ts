import { Router } from "express";
import { SubjectController } from "../controllers/subjectContoller";
import { RoomController } from "../controllers/roomController";
import { VideoController } from "../controllers/videoController";
import { UserController } from "../controllers/userContoller";
import { authMiddleware } from "../middlewares/authMiddleware";
const routes = Router()

routes.post('/user', new UserController().create)
routes.post('/login', new UserController().login)
routes.post('/allUsers', authMiddleware, new UserController().getProfile)

routes.post('/subject', new SubjectController().create)
routes.get('/getSubject', new SubjectController().get)
routes.delete('/deleteSubject', new SubjectController().delete)
routes.post('/findOneSubject', new SubjectController().findOne)
routes.put('/updateOneSubject', new SubjectController().update)

routes.post('/room', new RoomController().create)
routes.get('/getRoom', new RoomController().get)

routes.post('/video', new VideoController().create)
routes.post('/allVideos', new VideoController().get)

export default routes;
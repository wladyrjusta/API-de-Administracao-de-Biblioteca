import { Request, Router, Response } from 'express';
import BookController from '../controllers/BookController';
import Validations from '../middlewares/Validations';

const bookcontroller = new BookController();

const bookRouter = Router();

bookRouter.post(
  '/',
  Validations.validateBook,
  (req: Request, res: Response) => bookcontroller.createBook(req, res),
);

bookRouter.get('/', (req: Request, res: Response) => bookcontroller.getAllBooks(req, res));
bookRouter.get('/:id', (req: Request, res: Response) => bookcontroller.getBookById(req, res));
bookRouter.put(
  '/:id',
  Validations.validateBook, // aproveitamos a validação já criada para o cadastro
  (req: Request, res: Response) =>
    bookcontroller.updateBook(req, res),
);
bookRouter.delete(
  '/:id',
  (req: Request, res: Response) => bookcontroller.deleteBook(req, res),
);
bookRouter.get(
  '/author/search',
  (req: Request, res: Response) => bookcontroller.getBookByQuery(req, res),
);
bookRouter.patch(
  '/:id/discount',
  Validations.validateBook,
  (req: Request, res: Response) => bookcontroller.discountBook(req, res),
);

export default bookRouter;

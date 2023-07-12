import SequelizeBook from '../database/models/SequelizeBook';
import { IBook } from '../interfaces/books/IBook';
import { IBookModel } from '../interfaces/books/IBookModel';
import { NewEntity } from '../interfaces';

export default class BookModel implements IBookModel {
  private model = SequelizeBook;

  async create(data: NewEntity<IBook>): Promise<IBook> {
    const dbData = await this.model.create(data);

    const { id, title, price, author, isbn }: IBook = dbData;
    return { id, title, price, author, isbn };
  }

  async findAll(): Promise<IBook[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, title, price, author, isbn }) => ({
      id, title, price, author, isbn,
    }));
  }

  async findById(id: number): Promise<IBook | null> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) return null;
  
    const { title, price, author, isbn } = dbData;

    return { id, title, price, author, isbn };
  }

  async update(id: number, data: Partial<NewEntity<IBook>>): Promise<IBook | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (affectedRows === 0) return null;

    return this.findById(id);
  }

  async delete(id: number): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}

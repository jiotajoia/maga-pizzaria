import { AppDataSource } from "../data-source";
import { Size } from "../models/size.entity";

export class SizeService {

    static async createSize(s_size: string, s_price: number) {
        const sizeRepository = AppDataSource.getRepository(Size);

        const size = sizeRepository.create({ s_size, s_price });
        await sizeRepository.save(size);

        return size;
    }

    static async getAllSizes() {
        const sizeRepository = AppDataSource.getRepository(Size);
        return await sizeRepository.find();
    }

    static async getSizeById(s_id: number) {
        const sizeRepository = AppDataSource.getRepository(Size);
        const size = await sizeRepository.findOne({ where: { s_id } });

        if (!size) {
            throw new Error("Tamanho não encontrado");
        }

        return size;
    }
}

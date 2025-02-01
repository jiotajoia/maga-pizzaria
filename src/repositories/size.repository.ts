import { AppDataSource } from "../data-source";
import { Size } from "../models/size.entity";

export const SizeRepository = AppDataSource.getRepository(Size);
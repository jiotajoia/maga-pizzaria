import { AppDataSource } from "../data-source";
import { Admin } from "../models/admin.entity";

export const AdminRepository = AppDataSource.getRepository(Admin);
import { AdminRepository } from "../repositories/admin.repository";
import { Admin } from "../models/admin.entity";

export class AdminService {
  static async createAdmin(name: string, email: string, password: string) {
    const Admin = await AdminRepository.create({ name: name, email: email, password: password });
    await AdminRepository.save(Admin);
    return Admin;
  }

  static async login(email: string, password: string) {
    let admin: Admin | null = await AdminRepository.findOne({ where: { email } });

    if (!admin) {
      admin = null;
    } else {
      if (password !== admin.password) {
        admin = null;
      }
    }

    return admin;

  }
}
import { AdminRepository } from "../repositories/admin.repository";
import { Admin } from "../models/admin.entity";

export class AdminService {
    static async createAdmin(name: string, email: string, password: string) {
        const Admin = await AdminRepository.create({ name: name, email: email, password: password });
        await AdminRepository.save(Admin);
        return Admin;
    }

    static async login(email: string, password: string) {
        try {
          const admin: Admin = await AdminRepository.findOne({ where: { email } });
    
          if (!admin) {
            return('Administrador não encontrado');
          }
    
          if (password !== admin.password) {
            return('Senha incorreta');
          }
    
          return admin;
    
        } catch (err: any) {
          throw new Error(err.message || 'Erro ao realizar login');
        }
      }
}
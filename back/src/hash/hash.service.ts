import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  // ===============================
  //        HASH
  // ===============================

  async hash(toHash: string): Promise<string> {
    // Hash un mot de passe pour le sécuriser avant stockage
    return await bcrypt.hash(toHash, Number(process.env.SALT));
    // bcrypt transforme le texte en chaîne sécurisée (illisible) SALT + sécurisé / + lent
  }

  // ===============================
  //        COMPARE HASH
  // ===============================

  async compareHashOrThrow(notHashed: string, hashed: string): Promise<void> {
    // ici on vérifie la comparaison du hash et non hashé (donc true ou false)
    if (!(await bcrypt.compare(notHashed, hashed))) {
      throw new UnauthorizedException('erreur de comparaison');
    }
  }
}

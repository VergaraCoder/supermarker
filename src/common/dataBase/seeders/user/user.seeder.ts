import { User } from "src/user/entities/user.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import * as encryptar from 'bcrypt';

export class seederUser implements Seeder{
    async run(dataSource: DataSource): Promise<any> {
        const repoUser=dataSource.getRepository(User);
        const dataInitialy=[
            {
                name:"jesus",
                email:"jesus@gmail.com",
                password:"jesus12",
                roleId:2
            },
            {
                name:"pedro",
                email:"pedro@gmail.com",
                password:"pedro12",
                roleId:2
            },
            {
                name:"juan",
                email:"juan@gmail.com",
                password:"juan12",
                roleId:1
            }
        ];

        for(const register of dataInitialy){
            const query=await repoUser.findOne({where:{email:register.email}});
            if(!query || !await encryptar.compare(register.password,query.password)){

                const hashPassword= await encryptar.hash(register.password,10);
                const update=repoUser.create({...register,password:hashPassword});
                await repoUser.save(update);
            }
        }
    }
}
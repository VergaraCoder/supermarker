import { Role } from "src/role/entities/role.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";


export class seederRole implements Seeder{
    async run(dataSource: DataSource): Promise<any> {
        const repoRole=dataSource.getRepository(Role);
        const dataInitialy=[
            {nameRole:"client"},
            {nameRole:"admin"},
        ];

        for(const register of dataInitialy){
            const query=await repoRole.findOne({where:{nameRole:register.nameRole}});

            if(!query){
                const data=repoRole.create(register);
                await repoRole.save(data);
            }
        }
    }
}
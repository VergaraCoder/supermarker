import { SetMetadata } from "@nestjs/common";

export const KEY_VALUES="roles";

export const roles=(...roles:string[])=> SetMetadata(KEY_VALUES,roles);
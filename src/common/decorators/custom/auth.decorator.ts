import { applyDecorators, UseGuards } from "@nestjs/common";
import { jwtGuard } from "src/auth/jwt/guard/jwt.guard";
import { RoleGuard } from "../guard/role.guard";
import { roles } from "../role.decorator";


export function Auth(...rolesAsigned: string[]) {
    return applyDecorators(
      roles(...rolesAsigned),
      UseGuards(jwtGuard,RoleGuard ),
    );
  }
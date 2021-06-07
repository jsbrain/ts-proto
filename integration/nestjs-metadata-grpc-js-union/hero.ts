/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'hero';

export interface HeroById {
  id: number;
}

export interface VillainById {
  id: number;
}

export interface Hero {
  id: number;
  name?: string | undefined;
}

export interface Villain {
  id: number;
  name?: string | undefined;
}

export type HeroOrVillainById_oneof_base = {};
export type HeroOrVillainById_oneof_choice =
  | { hero: HeroById; villain?: never }
  | { villain: VillainById; hero?: never };
export type HeroOrVillainById = HeroOrVillainById_oneof_base & HeroOrVillainById_oneof_choice;

export type HeroOrVillainResult_oneof_base = {
  code: number;
};
export type HeroOrVillainResult_oneof_result = { hero: Hero; villain?: never } | { villain: Villain; hero?: never };
export type HeroOrVillainResult_oneof_meta =
  | { details: string; error?: never; count?: never }
  | { error: string; details?: never; count?: never }
  | { count: number; details?: never; error?: never };
export type HeroOrVillainResult = HeroOrVillainResult_oneof_base &
  HeroOrVillainResult_oneof_result &
  HeroOrVillainResult_oneof_meta;

export const HERO_PACKAGE_NAME = 'hero';

export interface HeroServiceClient {
  findOneHero(request: HeroById, metadata?: Metadata): Observable<Hero>;

  findOneVillain(request: VillainById, metadata?: Metadata): Observable<Villain>;

  findManyVillain(request: Observable<VillainById>, metadata?: Metadata): Observable<Villain>;

  findHeroOrVillain(request: HeroOrVillainById, metadata?: Metadata): Observable<HeroOrVillainResult>;
}

export interface HeroServiceController {
  findOneHero(request: HeroById, metadata?: Metadata): Promise<Hero> | Observable<Hero> | Hero;

  findOneVillain(request: VillainById, metadata?: Metadata): Promise<Villain> | Observable<Villain> | Villain;

  findManyVillain(request: Observable<VillainById>, metadata?: Metadata): Observable<Villain>;

  findHeroOrVillain(
    request: HeroOrVillainById,
    metadata?: Metadata
  ): Promise<HeroOrVillainResult> | Observable<HeroOrVillainResult> | HeroOrVillainResult;
}

export function HeroServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['findOneHero', 'findOneVillain', 'findHeroOrVillain'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('HeroService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ['findManyVillain'];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('HeroService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const HERO_SERVICE_NAME = 'HeroService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}

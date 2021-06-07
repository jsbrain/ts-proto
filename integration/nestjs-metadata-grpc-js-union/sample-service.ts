import {
  HeroServiceController,
  HeroById,
  Hero,
  Villain,
  VillainById,
  HeroOrVillainById,
  HeroOrVillainResult,
} from './hero';
import { Metadata } from 'grpc';
import { Observable, Subject } from 'rxjs';

export class SampleService implements HeroServiceController {
  findOneHero(request: HeroById, metadata?: Metadata): Promise<Hero> {
    return Promise.resolve({ id: 1, name: 'test' });
  }

  findOneVillain(request: VillainById, metadata?: Metadata): Promise<Villain> {
    return Promise.resolve({ id: 1, name: 'test' });
  }

  findManyVillain(request: Observable<VillainById>): Observable<Villain> {
    const hero$ = new Subject<Villain>();

    const onNext = (villainById: VillainById) => {
      hero$.next({ id: 1, name: 'test' });
    };
    const onComplete = () => hero$.complete();
    request.subscribe(onNext, null, onComplete);

    return hero$.asObservable();
  }

  findHeroOrVillain(request: HeroOrVillainById, metadata?: Metadata): Promise<HeroOrVillainResult> {
    return Promise.resolve({ code: 200, hero: { id: 1, name: 'test' }, count: 1 });
  }
}

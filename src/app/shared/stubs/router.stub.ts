import { of } from "rxjs";

export const routerStub = {
    navigateByUrl: jest.fn(() => new Promise<boolean>(() => true)),
    events: { pipe: jest.fn(() => of(new Event(''))) }
}
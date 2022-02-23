import { of } from "rxjs";

export const httpClient = {
    get: jest.fn(() => of({})),
}
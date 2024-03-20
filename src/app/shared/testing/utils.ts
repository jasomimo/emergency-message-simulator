/**
 * A powerful helper for generating mock services.
 * This helper will remove lots of injection to be done in each spec files.
 * Extending from the reference: https://christianlydemann.com/all-you-need-to-know-about-mocking-in-angular-tests/
 */
import { Provider, Type } from '@angular/core';

export type Mock<T> = T & { [P in keyof T]: T[P] & jasmine.Spy };
/**
 * Service mock for mocking services.
 * @param type
 */
export function createMock<T>(type: Type<T>): Mock<T> {
    const target: any = {};

    function installProtoMethods(proto: any) {
        if (proto === null || proto === Object.prototype) {
            return;
        }

        for (const key of Object.getOwnPropertyNames(proto)) {
            // tslint:disable-next-line: no-non-null-assertion
            const descriptor = Object.getOwnPropertyDescriptor(proto, key);

            if (typeof descriptor?.value === 'function' && key !== 'constructor') {
                target[key] = jasmine.createSpy(key);
            }
        }

        installProtoMethods(Object.getPrototypeOf(proto));
    }

    installProtoMethods(type.prototype);

    return target;
}

/**
 * Provider mock for any service.
 * @param type
 */
export function provideMock<T>(type: Type<T>): Provider {
    return {
        provide: type,
        useFactory: () => createMock(type),
    };
}

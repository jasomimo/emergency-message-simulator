import { Inject, Injectable } from '@angular/core';
import { STORAGE } from '../../app.config';
import { FindFn, IStorageService } from '../model/storage.model';

// Service to work directly with Storage (local storage in this example)
@Injectable({
    providedIn: 'root',
})
export class StorageService implements IStorageService {
    constructor(@Inject(STORAGE) private storage: Storage) {}

    getAllItems<T>(key: string): T[] {
        const value = this.storage.getItem(key);
        const items = this.tryParseArray<T>(value);

        if (!items) {
            return [];
        }

        return items;
    }

    createItem<T>(key: string, item: T): void {
        const value = this.storage.getItem(key);
        const items = this.tryParseArray<T>(value);

        let newValue: string;

        if (!items) {
            newValue = this.tryStringify([item]);
        } else {
            items.push(item);
            newValue = this.tryStringify(items);
        }

        this.storage.setItem(key, newValue);
    }

    updateItem<T>(key: string, item: T, findFn: FindFn<T>): void {
        const value = this.storage.getItem(key);
        const items = this.tryParseArray<T>(value);

        let newValue: string;

        if (!items) {
            newValue = this.tryStringify([item]);
        } else {
            // replace existing item with new one
            const index = items.findIndex(findFn);

            if (index === -1) {
                console.warn(`Cannot update item under key: '${key}', item:`, item, 'Item not found.');
                return;
            }

            items.splice(index, 1, item);
            newValue = this.tryStringify(items);
        }

        this.storage.setItem(key, newValue);
    }

    deleteItem<T>(key: string, findFn: FindFn<T>): void {
        const value = this.storage.getItem(key);
        const items = this.tryParseArray<T>(value);

        if (!items) {
            // nothing to delete
            return;
        }

        const index = items.findIndex(findFn);

        if (index === -1) {
            console.warn(`Cannot delete item under key: '${key}. Item not found.`);
            return;
        }

        items.splice(index, 1);
        let newValue = this.tryStringify(items);

        this.storage.setItem(key, newValue);
    }

    setItems<T>(key: string, items: T[]): void {
        let newValue = this.tryStringify(items);

        this.storage.setItem(key, newValue);
    }

    private tryParseArray<T>(value: string | null): T[] | null {
        let parsedValue: T[] | null = null;

        if (!value) {
            return null;
        }

        try {
            parsedValue = JSON.parse(value);
        } catch (error) {
            console.warn('Cannot parse value: ', value, error);
        }

        if (Array.isArray(parsedValue)) {
            return parsedValue;
        }

        return null;
    }

    private tryStringify<T>(items: T[]): string {
        let stringVal: string = '';

        try {
            stringVal = JSON.stringify(items);
        } catch (error) {
            console.warn('Cannot stringify items: ', items, error);
        }

        return stringVal;
    }
}

export type FindFn<T> = (item: T) => boolean;

export interface IStorageService {
    getAllItems<T>(key: string): T[];
    createItem<T>(key: string, item: T): void;
    updateItem<T>(key: string, item: T, findFn: FindFn<T>): void;
    deleteItem<T>(key: string, findFn: FindFn<T>): void;
}
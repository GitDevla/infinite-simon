export interface IImageRepository {
    save(base64: string, name: string): Promise<string>;
    delete(uri: string): Promise<void>;
    exists(uri: string): Promise<boolean>;
}

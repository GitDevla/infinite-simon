import { IImageRepository } from "../../interfaces/repositories/IImageRepository";
import * as fs from "fs/promises";
import * as path from "path";
import sharp from "sharp";

export class ProfilePictureRepository implements IImageRepository {
    private readonly defaultPath: string;
    private readonly defaultExtension = 'webp';

    constructor(defaultPath: string) {
        this.defaultPath = defaultPath;
    }

    async save(base64: string, name: string): Promise<string> {
        let contentType = 'image/png';
        let rawBase64Data = base64;
        const dataUrlMatch = /^data:(image\/[a-zA-Z+.-]+);base64,(.*)$/.exec(base64); // holy regex
        if (dataUrlMatch) {
            contentType = dataUrlMatch[1];
            rawBase64Data = dataUrlMatch[2];
        }
        if (!/^image\/[a-zA-Z+.-]+$/.test(contentType)) {
            throw new Error("Invalid image content type");
        }

        const buffer = Buffer.from(rawBase64Data, 'base64');
        const safeName = (name || 'file').replace(/[^a-zA-Z0-9._-]/g, '_').trim();
        const baseName = path.basename(safeName, path.extname(safeName));
        const filename = `${Date.now()}_${baseName}.${this.defaultExtension}`;
        const fullPath = path.join(this.defaultPath, filename);

        if (!await this.exists(this.defaultPath)) {
            await fs.mkdir(this.defaultPath, { recursive: true });
        }

        const sharpResult = await sharp(buffer).resize(256,256)
                .webp()
                .toFile(fullPath);

        return fullPath;
    }

    async delete(uri: string): Promise<void> {
        return fs.unlink(uri).catch((err: NodeJS.ErrnoException) => {
            if (err && err.code === 'ENOENT') {
                return Promise.resolve();
            } else {
                return Promise.reject(err);
            }
        });
    }
    
    async exists(uri: string): Promise<boolean> {
        return fs.access(uri)
            .then(() => true)
            .catch(() => false);
    }
}
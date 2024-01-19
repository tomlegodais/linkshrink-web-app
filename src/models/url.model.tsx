import {Expose} from "class-transformer";

export default class Url {
    @Expose({name: 'long_url'}) longUrl: string;
    @Expose({name: 'short_url'}) shortUrl: string;
    @Expose({name: 'created_at'}) createdAt: string;

    constructor(longUrl: string, shortUrl: string, createdAt: string) {
        this.longUrl = longUrl;
        this.shortUrl = shortUrl;
        this.createdAt = createdAt;
    }
}
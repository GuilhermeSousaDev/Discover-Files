export interface ICreateFile {
    name: string;
    file: string;
    buffer?: Buffer;
    type?: string;
    size?: number;
}
export interface ICreateAvatar {
    avatar: {
        filename: string;
        buffer: Buffer;
    },
    id: number;
}
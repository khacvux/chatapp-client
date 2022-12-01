export interface ISocketStore {
    socket: any,
    setSocket: (data: any) => void,
    createVideoCall: (recipientId: number) => void,
}
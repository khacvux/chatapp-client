export interface IPeerStore {
  peerClient: any;
  peerId?: string;
  currentGuestId?: string;
  fetching: Boolean;
  setPeer: (peer: any) => void;
  setPeerId: (peerId: string) => void;
  clearPeerId: () => void;
  pushPeerId: (access_token: string, peerId: string) => void;
  getPeerId: (access_token: string, userId: number) => Promise<number | undefined | null>
}

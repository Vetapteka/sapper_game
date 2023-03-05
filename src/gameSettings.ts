export interface GameSettings {
    x: number;
    y: number;
    bombCount: number;
    bombRadius: number;
}
const gameSettings: GameSettings = {
    x: 16,
    y: 16,
    bombCount: 1,
    bombRadius: 1,
};

export default gameSettings;

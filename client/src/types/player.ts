import { enumEquipPosition } from '@/enums/equip';

import { CharacterTemplate } from './character';
import {
    Card,
    Equip,
} from './core';

export interface GameRecord {
    id: number;
    opponent: Player;
    /** 戰鬥開始時間 */
    battleStartAt: Date;
    /** 戰鬥結束時間 */
    battleEndAt: Date | null;
    /** 使用了幾張卡牌 */
    cardsUsed: number;
    /** 產生攻擊點數 */
    harm: number;
    /** 受到傷害點數 */
    damaged: number;
    /** 防禦點數 */
    defense: number;
    /** 治療點數 */
    heal: number;
}

export interface Player {
    id: number;
    createdAt: Date;
    character: CharacterTemplate;
    status: {
        /** 目前等級 */
        level: number;
        /** 目前經驗值 */
        exp: number;
        /** 升到下一級所需經驗值 */
        expToNextLevel: number;
        health: number;
        attack: number;
        defense: number;
        maxHealth: number;
    };
    equipment: {
        [key in enumEquipPosition]: Equip | null;
    };
    backpack: {
        equips: Equip[];
        cards: Card[];
        coin: number;
    };
    records: GameRecord[];
}

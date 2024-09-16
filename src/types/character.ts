import { enumCard } from '@/enums/card';
import { enumCharacter } from '@/enums/character';
import { enumEquip } from '@/enums/equip';
import { enumMumbleType } from '@/enums/mumble';

export interface CharacterTemplate {
    type: enumCharacter;
    avatar: string;
    name: string;
    description: string;
    backpackLimit: number;
    mumbleList: {
        [key in enumMumbleType]: string[];
    };
    init: {
        healthRange: [number, number];
        attackRange: [number, number];
        defenseRange: [number, number];
        cards: enumCard[];
        equips: enumEquip[];
        coin: number;
    };
}
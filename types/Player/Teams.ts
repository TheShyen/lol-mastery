interface Ban {
    championId: number;
    pickTurn: number;
}

interface Objective {
    first: boolean;
    kills: number;
}

interface Objectives {
    baron: Objective;
    champion: Objective;
    dragon: Objective;
    horde: Objective;
    inhibitor: Objective;
    riftHerald: Objective;
    tower: Objective;
}

export interface Teams {
    bans: Ban[];
    objectives: Objectives;
    teamId: number;
    win: boolean;
}
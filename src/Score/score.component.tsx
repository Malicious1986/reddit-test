import React from 'react';
import { IShipState } from '../Ship/ship-state.interface';
import ShipScore from './ship-score.component';

export interface IScore {
    shipsState: IShipState[];
}

const Score: React.FC<IScore> = state => {
    return <div>
        {state.shipsState.map(ship => <ShipScore {...ship}/>)}
    </div>
}

export default Score;
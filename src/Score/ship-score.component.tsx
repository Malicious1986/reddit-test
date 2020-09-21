import React from 'react';
import { IShipState } from '../Ship/ship-state.interface';
import HitPoint from './hit-point.component';

const ShipScore: React.FC<IShipState> = prop => {
    return <div className='ship-score-field'>
        <div className={`ship-score-shape ${prop.name}`}></div>
        <div className='hit-points'>
            {Array(prop.size).fill(null).map((item, index) => <span key={index}>{ <HitPoint isHit={index < prop.damagedCount} />}</span>)}
        </div>
    </div>
}

export default ShipScore;
import React from 'react';

const HitPoint: React.FC<{isHit: boolean}> = prop => {
    return <div className={prop.isHit ? 'hit' : 'not-hit'}></div>
}

export default HitPoint;
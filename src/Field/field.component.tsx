import React, { useState, useEffect } from 'react';
import Score from '../Score/score.component';
import { IShipState } from '../Ship/ship-state.interface';
import FieldItem, { fieldItemCoordinates, IFieldItem } from './field-item.component';
import { IFieldState } from './field-state.interface';

const Field: React.FC = () => {
    const data : {shipTypes: any, layout: any} = { 

          "shipTypes": { 
        
            "carrier": { "size": 5, "count": 1 }, 
        
            "battleship": { "size": 4, "count": 1 }, 
        
            "cruiser": { "size": 3, "count": 1 }, 
        
            "submarine": { "size": 3, "count": 1 }, 
        
            "destroyer": { "size": 2, "count": 1 }, 
        
          }, 
        
          "layout": [ 
        
            { "ship": "carrier", "positions": [[2,9], [3,9], [4,9], [5,9], [6,9]] }, 
        
            { "ship": "battleship", "positions": [[5,2], [5,3], [5,4], [5,5]] }, 
        
            { "ship": "cruiser", "positions": [[8,1], [8,2], [8,3]] }, 
        
            { "ship": "submarine", "positions": [[3,0], [3,1], [3,2]] }, 
        
            { "ship": "destroyer", "positions": [[0,0], [1,0]] } 
        
          ] 
        
        } 
    
    const checkIfGameOver = () => {
        let sunkShipsCount = 0;
        for(const shipState of field.shipsState) {
            if (shipState.isDead) {
                sunkShipsCount += 1;
            }
        }
        return sunkShipsCount === field.shipsState.length;
    }


    const onClick = (item: IFieldItem) => {
        let nextShipDamageCount = 0;
        let isShipDead = false;
        if (!item.isVisited) {
            
            setField(prevField => {
                let newShipsState: IShipState[] = prevField.shipsState;
                let newFieldState: IFieldItem[] = prevField.fieldItemsState;

                if (item.type === 'ship') {
                    newShipsState = newShipsState.map(shipState => {
                        let currentShip;
                        if(shipState.name === item.shipName) {
                            currentShip = prevField.shipsState.find(s => s.name === item.shipName);
                        }
                        if(currentShip) {
                            nextShipDamageCount = currentShip.damagedCount + 1;
                            isShipDead = nextShipDamageCount === currentShip.size;
                            if (isShipDead) {
                                setMessage(`${currentShip.name} sunk!`);
                            } else {
                                setMessage(`You hit ${currentShip.name}!`);
                            }
                            setTimeout(() => {
                                setMessage('');
                            }, 5000);

                            return {
                                ...shipState,
                                damagedCount: nextShipDamageCount,
                                isDead: isShipDead
                            }
                        }
                        return shipState;
                    })

                    newFieldState = newFieldState.map(fieldState => {
                        if (item.coordinates.x === fieldState.coordinates.x && item.coordinates.y === fieldState.coordinates.y) {
                            return {
                                ...fieldState,
                                isVisited: true,
                                state: 'damaged'
                            }
                        }
                        return fieldState
                    })
                } else {
                    newFieldState = newFieldState.map(fieldState => {
                        if (item.coordinates.x === fieldState.coordinates.x && item.coordinates.y === fieldState.coordinates.y) {
                            return {
                                ...fieldState,
                                isVisited: true,
                                state: 'missed'
                            }
                        }
                        return fieldState
                    })
                }

                return {
                    fieldItemsState: newFieldState,
                    shipsState: newShipsState
                }
            })

        }
    }

    const getShipByCoordinates = (coordinates: fieldItemCoordinates) => {
        for(const ship of data.layout) {
            for(const shipPart of ship.positions) {
                if (shipPart[0] === coordinates.x && shipPart[1] === coordinates.y) {
                    return ship.ship;
                }
            }
        }
        return '';
    }

    const initField = (): IFieldState => {
        const field:IFieldItem[] = [];
        let shipsState: IShipState[] = [];
        for (let i = 0; i < 10; i++) {
            for (let k = 0; k < 10; k++) {
                const shipPart = getShipByCoordinates({x: k, y: i});

                field.push({
                    coordinates: {x: k, y: i},
                    isVisited: false,
                    state: 'alive',
                    type: shipPart ? 'ship' : 'cell',
                    shipName: shipPart,
                    onClick
                })
            }
        }
        for (const ship in data.shipTypes) {
            shipsState.push({
                damagedCount: 0,
                name: ship,
                size: data.shipTypes[ship].size,
                isDead: false
            })
        }
        return {
            fieldItemsState: field,
            shipsState: shipsState
        };
    }

    const [field, setField] = useState<IFieldState> (() => initField());
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        if(checkIfGameOver()) {
            setMessage('Game Over!');
        }
    }, [field])

    
return <div className='game-field'>
    <Score shipsState={field.shipsState.sort((a, b) => {
        return b.size - a.size;
    })}/>
    <div className='battle-field'>{field.fieldItemsState.map(item => <FieldItem key={`${item.coordinates.x}${item.coordinates.y}`} {...item} />)}</div>
    <div className='message'>{message}</div>
</div> 
}

export default Field;
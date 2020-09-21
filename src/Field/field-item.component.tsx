import React from 'react';

export type fieldItemType = 'cell' | 'ship';
export type fieldItemState = 'alive'| 'missed' | 'damaged';
export type fieldItemCoordinates = { x: number, y: number };

export interface IFieldItem {
    coordinates: fieldItemCoordinates;
    type: fieldItemType;
    state: fieldItemState;
    isVisited: boolean;
    shipName: string;
    onClick?: (fieldItem: IFieldItem) => void;
}

const FieldItem: React.FC<IFieldItem> = props => {
    const { children, onClick, ...fieldItem } = props;
return <div className={`field-item ${props.state}`} onClick={() => props.onClick!(fieldItem)}></div>
}

export default FieldItem;
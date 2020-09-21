import { IShipState } from "../Ship/ship-state.interface";
import { IFieldItem } from "./field-item.component";

export interface IFieldState {
    shipsState: IShipState[],
    fieldItemsState: IFieldItem[]
}
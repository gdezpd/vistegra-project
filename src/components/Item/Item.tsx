import React from 'react';
import s from "./item.module.scss";

interface ItemType {
    title:string

}
const Item = ({title}:ItemType) => {

    return (
        <div>
            <div>{title}</div>
        </div>
    );
};

export default Item;
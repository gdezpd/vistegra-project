import React from 'react';
import { useAppSelector } from "../../store";

import s from "./outputData.module.scss";


export const OutputData = () => {
    const { pipe, list, lists, pipes, fixes, listsPrice, pipesPrice, fixesPrice} = useAppSelector(state => state.calc)

    return (
        <table className={s.tableOutput}>
            <caption><h2>Расчёт данных</h2></caption>
            <thead>
            <tr>
                <th scope="col">Наименование</th>
                <th scope="col">ед.</th>
                <th scope="col">кол-во</th>
                <th scope="col">сумм.</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">{list}</th>
                <td>м2</td>
                <td>{lists}</td>
                <td>{listsPrice}</td>
            </tr>
            <tr>
                <th scope="row">{pipe}</th>
                <td>мп</td>
                <td>{pipes}</td>
                <td>{pipesPrice}</td>
            </tr>

            <tr>
                <th scope="row">Саморез</th>
                <td>шт</td>
                <td>{fixes}</td>
                <td>{fixesPrice}</td>
            </tr>
            </tbody>
        </table>
    );
};

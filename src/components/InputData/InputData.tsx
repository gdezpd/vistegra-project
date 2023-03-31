import React from 'react';
import data from "../../data/data.json";
import config from "../../data/config.json";
import {useAppDispatch, useAppSelector} from "../../store";
import {InputMenu} from "../InputMenu/InputMenu";
import {setCalculatedData, setInitialState} from "../../store/calc";

import s from './inputData.module.scss'

export const InputData = () => {
    const dispatch = useAppDispatch()
    const {width, height, material, frame, pipe, list} = useAppSelector(state => state.calc)

    const buttonHandler = () => {
        const currentList = data.filter(el => el.name === list && el)[0]?.width
        const currentListPrice = data.filter(el => el.name === list && el)[0]?.price
        const currentFixPrice = data.filter(el => el.type === 'fix' && el)[0]?.price
        const currentPipe = data.filter(el => el.name === pipe && el)[0]?.width
        const currentPipePrice = data.filter(el => el.name === pipe && el)[0]?.price
        const currentStep = config.filter(el => el.name === frame && el)[0]?.step

        // calculator
        if (currentList && currentPipe && currentStep && material) {
            // площадь
            const area = +width * +height
            //периметр
            const perimeter = +width * 2 + +height * 2

            //сколько листов нужно
            const lists = Math.ceil(area / currentList)
            //стоимость листов
            const sheetsPrice = lists * currentListPrice

            //сколько трубы нужно
            //шаг с учётом трубы
            const step = currentStep - currentPipe / 1000
            //считаем количество трубы по длинне
            const pipeForHeight = +height / step - 1
            //считаем количество трубы по ширине
            const pipeForWidth = +width / step - 1
            //считаем количество трубы внутри каркаса
            const allPipeWidthAndHeight = pipeForHeight * +height + pipeForWidth * +width
            //считаем количество трубы
            const allPipe = Math.ceil(perimeter + allPipeWidthAndHeight)
            //считаем стоимость трубы
            const priseAllPipe = allPipe * currentPipePrice

            //сколько саморезов нужно
            let fixesForSheet;
            material === 'metal' ? fixesForSheet = 5 : fixesForSheet = 10
            const fixesForSheets = fixesForSheet * lists
            //стоимость саморезов
            const fixesPrice = Math.ceil(fixesForSheets * currentFixPrice)

            dispatch(setCalculatedData([lists, sheetsPrice, allPipe, priseAllPipe, fixesForSheets, fixesPrice]))
            dispatch(setInitialState())
        }
    }

    const disabledFunction = () => {
        if (+width === Number(+width) &&
            +height === Number(+height) &&
            material !== "Материал" &&
            frame !== "Прочность" &&
            list !== "Лист" &&
            pipe !== "Труба") {
            return false
        } else return true
    }
    return (
        <div>
            <InputMenu/>
            <button onClick={buttonHandler} className={s.button} disabled={disabledFunction()}>Рассчитать</button>
        </div>
    );
};

import React from 'react';
import cn from 'classnames'
import data from "../../data/data.json";
import config from "../../data/config.json";
import {useAppDispatch, useAppSelector} from "../../store";
import Arrow from '../../data/arrow.png'

import s from "./inputMenu.module.scss";

import {
    setCurrentFrame,
    setCurrentHeight,
    setCurrentList,
    setCurrentMaterial,
    setCurrentPipe,
    setCurrentWidth
} from "../../store/calc";


export const InputMenu = () => {

    const dispatch = useAppDispatch()
    const {width, height, material, frame, list, pipe} = useAppSelector(state => state.calc)

    const navMenu = ['Материалл', 'Прочность', 'Лист', 'Труба',]
    const materialArray = ['Металл', 'Пластик']
    const lists = data.filter(el => el.type === 'list').filter(el => el.material === material)
    const pipes = data.filter(el => el.type === 'pipe')
    const frames = config.filter(el => el.type === 'frame')

    const materialHandler = (el: string) => {
        if (el === 'Металл') {
            dispatch(setCurrentMaterial('metal'))
        } else dispatch(setCurrentMaterial('plastic'))
    }

    const inputOnBlurHandler = () => {
        if (+width < 5 || +width > 25) {
            alert('Допустимая ширина от 5м до 25м')
            dispatch(dispatch(setCurrentWidth('null')))
        } else dispatch(setCurrentWidth(width.trim().replace(/,/, '.')))
        if (+height < 5 || +height > 50) {
            alert('Допустимая длинна от 5м до 50')
            dispatch(dispatch(setCurrentHeight('null')))
        } else dispatch(setCurrentHeight(height.trim().replace(/,/, '.')))
    }

    return (
        <>
            <h1> Выберите материаллы </h1>
            <div className={s.wrapper}>
                <ul className={s.containerMenu}>
                    {navMenu.map((el, index) =>
                        <li key={index} className={s.itemMenu}>
                            <a href="#" className={s.menu}>
                                <div className={s.titleItem}>
                                    <h2 className={s.titleMenu}>{el}</h2>
                                    <img src={Arrow} className={s.arrowImg}/>
                                </div>
                                <ul className={s.dropdownMenu}>
                                    {el === navMenu[0] && materialArray.map((el, index) => <li key={index}
                                                                                               onClick={() => materialHandler(el)}>
                                        <span>{el}</span>
                                    </li>)}
                                    {el === navMenu[1] && frames.map(el => <li key={el.name}
                                                                               className={cn({[s.disabled]: material === 'metal'})}
                                                                               onClick={() => dispatch(setCurrentFrame(el.name))}>
                                        <span>{el.name}</span>
                                    </li>)}
                                    {el === navMenu[2] && lists.map(el => <li key={el.name}
                                        // className={cn( frame ===  s.disabled)}
                                                                              onClick={() => dispatch(setCurrentList(el.name))}>
                                        <span>{el.name}</span>
                                    </li>)}
                                    {el === navMenu[3] && pipes.map(el => <li key={el.name}
                                                                              onClick={() => dispatch(setCurrentPipe(el.name))}>
                                        <span>{el.name}</span>
                                    </li>)}
                                </ul>
                            </a>
                        </li>
                    )}
                </ul>
                <div className={s.input}>Ширина, м
                    <br/>
                    <input
                        type="number"
                        placeholder={'Впишите ширину'}
                        value={width}
                        onChange={(e) => dispatch(setCurrentWidth(e.currentTarget.value))}
                        onBlur={inputOnBlurHandler}
                    />
                </div>
                <div className={s.input}>Длинна, м
                    <br/>
                    <input
                        type="number"
                        placeholder={'Впишите длинну'}
                        value={height}
                        onChange={(e) => dispatch(setCurrentHeight(e.currentTarget.value))}
                        onBlur={inputOnBlurHandler}
                    />
                </div>
            </div>
            <div className={s.titleMenu}>
                <h3 className={s.title}>{material}</h3>
                <h3 className={s.title}>{frame}</h3>
                <h3 className={s.title}>{list}</h3>
                <h3 className={s.title}>{pipe}</h3>
            </div>
        </>
    );
};

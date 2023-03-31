import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export interface CalcType {
    material: string
    list: string
    pipe: string
    frame: string
    width: string
    height: string
    lists: number
    pipes: number,
    fixes: number,
    listsPrice: number,
    pipesPrice: number,
    fixesPrice: number,
}

const initialState: CalcType = {
    material: 'Материал',
    list: 'Лист',
    pipe: 'Труба',
    frame: 'Прочность',
    width: 'Ширина',
    height: 'Длинна',
    lists: 0,
    pipes: 0,
    fixes: 0,
    listsPrice: 0,
    pipesPrice: 0,
    fixesPrice: 0,
}


export const calc = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        setCurrentMaterial: (state, action: PayloadAction<string>) => {
            state.material = action.payload
            state.list = initialState.list
        },
        setCurrentList: (state, action: PayloadAction<string>) => {
            state.list = action.payload
        },
        setCurrentPipe: (state, action: PayloadAction<string>) => {
            state.pipe = action.payload
        },
        setCurrentFrame: (state, action: PayloadAction<string>) => {
            state.frame = action.payload
        },
        setCurrentWidth: (state, action: PayloadAction<string>) => {
            state.width = action.payload
        },
        setCurrentHeight: (state, action: PayloadAction<string>) => {
            state.height = action.payload
        },
        setCalculatedData: (state, action: PayloadAction<number[]>) => {
            state.lists = action.payload[0]
            state.listsPrice = action.payload[1]
            state.pipes = action.payload[2]
            state.pipesPrice = action.payload[3]
            state.fixes = action.payload[4]
            state.fixesPrice = action.payload[5]
        },
        setInitialState: (state) => {
            state.material = initialState.material
            state.list = initialState.list
            state.pipe = initialState.pipe
            state.frame = initialState.frame
            state.width = initialState.width
            state.height = initialState.height
        },
    },
})

export const {
    setCurrentMaterial,
    setCurrentList,
    setCurrentPipe,
    setCurrentFrame,
    setCurrentHeight,
    setCurrentWidth,
    setCalculatedData,
    setInitialState
} = calc.actions

export default calc.reducer

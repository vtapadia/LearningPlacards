import * as FileSystem from 'expo-file-system';
import { Dictionary, DictionaryItem } from '../../types';
import * as React from 'react';


const dataFile = FileSystem.documentDirectory + "dictionary.v1.json";

// export let [data, setData] = React.useState<Dictionary>([]);
export const data:Dictionary = [];

export const loadAsync = async () => {
    const result = await FileSystem.getInfoAsync(dataFile);
    if (result.exists) {
        const dataAsString = await FileSystem.readAsStringAsync(dataFile);
        data.push(JSON.parse(dataAsString));
    }
}

const saveAsync = async() => {
    await FileSystem.writeAsStringAsync(dataFile, JSON.stringify(data))
}

export const addAsync = async (item: DictionaryItem) => {
    if (data.findIndex(i => i.unknown == item.unknown) == -1) {
        data.push(item)
        // saveAsync();
    }
}

export const deleteAsync = async (key: string) => {
    const index = data.findIndex(i => i.unknown==key)
    if (index>-1) {
        data.slice(index, 1);
        // saveAsync();
    }
}
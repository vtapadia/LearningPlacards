import * as FileSystem from 'expo-file-system';
import { Dictionary, DictionaryItem } from '../../types';
import * as React from 'react';


const dataFile = FileSystem.documentDirectory + "dictionary.v1.json";

// export let [data, setData] = React.useState<Dictionary>([]);
export const data:Dictionary = [];
const saveEnabled = false;

export const loadAsync = async () => {
    const result = await FileSystem.getInfoAsync(dataFile);
    if (result.exists) {
        const dataAsString = await FileSystem.readAsStringAsync(dataFile);
        data.push(JSON.parse(dataAsString));
    }
}

const saveAsync = async() => {
    if (saveEnabled) {
        await FileSystem.writeAsStringAsync(dataFile, JSON.stringify(data))
    }
}

export const addAsync = async (item: DictionaryItem) => {
    if (data.findIndex(i => i.unknown == item.unknown) == -1) {
        data.push(item)
        await saveAsync();
    }
}

export const addOrUpdateAsync = async (item: DictionaryItem) => {
    let index = data.findIndex(i => i.unknown == item.unknown)
    if (index != -1) {
        data[index] = item;
    } else {
        data.push(item)
    }
    await saveAsync();
}

export const deleteAsync = async (key: string) => {
    const index = data.findIndex(i => i.unknown==key)
    if (index>-1) {
        data.slice(index, 1);
        await saveAsync();
    }
}
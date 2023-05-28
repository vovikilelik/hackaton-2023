import { allIcons } from "./icons";

const hdata = ['Просмотр', 'Банана', 'Супер', 'Воблер', 'Конфернор', 'Файлов'];
const tdata = ['Карл', 'у', 'клары', 'украл', 'корраллы', 'и', 'а', 'на', 'заборе', 'написано', 'при', 'ехал', 'через', 'реку'];

export const randomText = (data: string[], count: number) => Array(Math.floor(count)).fill(0).map(() => data[Math.floor(Math.random() * data.length)]).join(' ');

export const randomTitle = (count: number = 1 + Math.random() * 2) => randomText(hdata, count);
export const randomDescription = (count: number = 20 + Math.random() * 40) => randomText(tdata, count);

export const randomIcon = <P = string>(additions: P[] = []) => {
    const length = allIcons.length + additions.length;
    return [...allIcons, ...additions][Math.round(Math.random() * length) - 1];
}


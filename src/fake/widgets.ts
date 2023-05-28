import { Widget, WidgetValue } from "../api/v1/dto/widget";
import { randomDescription, randomIcon, randomTitle } from "./generators";

let guid = 0;
const defaultValue: WidgetValue = { type: 'text', data: 'Test text here' }

export const generateWidget = <P, V extends WidgetValue = WidgetValue>(properties: P = {} as P, value: V = { ...defaultValue as any }): Widget<P, V> => {
    const loid = ++guid;

    return (
        {
            info: {
                uuid: `UUID ${loid}`,
                icon: randomIcon(),
                title: `${randomTitle()} ${loid}`,
                version: '1.0.0',
                vendor: 'Foo Inc ©',
                description: randomDescription()
            },
            context: { name: 'any', properties: properties },
            value
        }
    );
};

export const allWidgets = Array(20).fill({}).map(p => generateWidget(p));
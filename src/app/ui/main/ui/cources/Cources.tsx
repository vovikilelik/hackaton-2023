import React from "react";
import cn from "classnames";

import { Component } from '../../../../../share/react';

import styles from './Cources.module.less';
import { Form } from '../form';
import { SiderSection } from '../../../../share/ui';
import { Poster } from '../user-account/ui';
import { allIcons } from '../../../../../fake/icons';

export interface CourcesProps extends Component {

}

const schools = [
  {
    title: 'ГБУДО г.Москвы "ДХШ №6"',
    description: 'у. Гончарова',
    image: allIcons[2]
  },
  {
    title: 'ГБУДО г.Москвы "ДХШ №7"',
    description: 'ул. Нижняя Первомайская',
    image: allIcons[3]
  },
  {
    title: 'ГБУДО г.Москвы "ДХШ №9"',
    description: 'Зеленоград, Центральный просп., корп. 435',
    image: allIcons[4]
  }
]

const getPosterRenderer = (onClick) => (value, index) => {
  return (
    <div key={index} onClick={() => onClick(value)}>
      <Poster value={value} />
    </div>
  );
}

export const Cources: React.FC<CourcesProps> = ({ className, children }) => {
  return (
    <Form title='Курсы' color='#9b5b9e'>
      <SiderSection title='Рекомендованные курсы'>
        Курсы отсутствуют
      </SiderSection>
      <SiderSection title='Все курсы'>
        Курсы отсутствуют
      </SiderSection>
      <SiderSection title='Школы'>
        {schools.map(getPosterRenderer(() => {}))}
      </SiderSection>
    </Form>
  );
}
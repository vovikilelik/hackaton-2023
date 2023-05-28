import React from "react";
import cn from "classnames";

import { Component } from '../../../../../share/react';

import styles from './Cources.module.less';
import { Form } from '../form';

export interface CourcesProps extends Component {

}

export const Cources: React.FC<CourcesProps> = ({ className, children }) => {
  return (
    <Form title='Курсы' color='#9b5b9e'>
      ...
    </Form>
  );
}
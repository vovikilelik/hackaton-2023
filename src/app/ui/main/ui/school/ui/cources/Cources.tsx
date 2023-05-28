import React, { useCallback, useState } from "react";
import cn from "classnames";
import { Component } from '../../../../../../../share/react';
import { SiderSection } from '../../../../../../share/ui';
import { LoadingOutlined, OrderedListOutlined } from '@ant-design/icons';
import { Button, Modal, Progress, Radio, RadioChangeEvent, Timeline, Tooltip } from 'antd';

import styles from './Cources.module.less';
import { quiz } from './data';
import { QuizElementDto, QuizVariantsElementDto, isQuizVariantsElementDto } from '../../../../../../../api/v1/dto';

export interface CourcesProps extends Component {

}

const VariantElement: React.FC<{ item: QuizVariantsElementDto }> = ({ item }) => {
  const [checked, setChecked] = useState(-1);
  const onChange = useCallback((e: RadioChangeEvent) => {
    setChecked(e.target.value);
  }, []);

  return (
    <div className={styles.quizElement}>
      <div>{item.text}</div>
      <Radio.Group onChange={onChange} value={checked} className={styles.quizElement}>
        {item.variants.map((variant, index) => {
          const correct = index === checked && variant.correct;
          const className = checked === index && (correct ? styles.variantCorrect : styles.variantIncorrect);

          return (
            <Tooltip title={variant.push} open={!!variant.push && checked > -1}>
              <Radio className={cn(checked > -1 && variant.correct && styles.variantCorrect, className)} value={index}>{variant.data}</Radio>
            </Tooltip>
          );
        })}
      </Radio.Group>
    </div>
  );
}

const quizElementRenderer = (item: QuizElementDto) => {
  if (isQuizVariantsElementDto(item)) {
    return <VariantElement key={item.text} item={item} />;
  }

  return 'unsupported';
}

const Test: React.FC = () => {
  const [index, setIndex] = useState(0);

  const onNext = useCallback(() => {
    setIndex(index + 1);
  }, [index]);

  return (
    <div className={styles.quizElement}>
      <div>
        {quizElementRenderer(quiz.elements[index])}
      </div>
      <div>
        {index < quiz.elements.length - 1 && <Button onClick={onNext}>Далее</Button>}
      </div>
    </div>
  );
}

export const Cources: React.FC<CourcesProps> = ({ className, children }) => {
  const [testOpen, setTestOpen] = useState(false);

  const onTestOpen = useCallback(() => setTestOpen(true), []);
  const onTestClose = useCallback(() => setTestOpen(false), []);

  return (
    <div>
      <SiderSection title='Текущий курс'>
        <p>
          Живопись, техника быстрого мазка<br />
          <span style={{ opacity: 0.5 }}>Автор: Пушок Петрович</span><br />
          <span style={{ opacity: 0.5 }}>10 уроков, 3 теста</span>
        </p>
      </SiderSection>
      <SiderSection title='Завершено'>
        <p style={{ textAlign: 'center' }}>
          <Progress type="circle" percent={75} />
        </p>
      </SiderSection>
      <SiderSection title='Пройденные этапы'>
        <Timeline
          mode='left'
          items={[
            {
              label: '2015-09-01',
              children: 'Вводный урок',
            },
            {
              label: '2015-09-01',
              children: 'Колористика',
            },
            {
              children: (
                <Button
                  style={{ padding: 0 }} icon={<OrderedListOutlined />}
                  type='link'
                  ghost
                  onClick={onTestOpen}
                >
                  Тест
                </Button>
              ),
              pending: true,
              dot: <LoadingOutlined />,
              color: 'red',
            },
            {
              label: '2015-09-01',
              children: 'Первый натюрморт',
            },
          ]}
        />
      </SiderSection>
      <Modal title='Тест' open={testOpen} onCancel={onTestClose} onOk={onTestClose} destroyOnClose>
        <Test />
      </Modal>
    </div>
  );
}
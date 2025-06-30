import Heading from '@theme/Heading';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '依赖注入',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        通过装饰器将依赖项注入到类、属性和方法中，使代码更加模块化、可测试和可维护。
      </>
    ),
  },
  {
    title: 'IoC 容器',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>通过强大的控制反转容器管理依赖项，支持绑定值、类、提供者等多种方式。</>
    ),
  },
  {
    title: '上下文层次',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        创建上下文之间的父子关系，实现依赖项的继承和作用域控制，适合复杂应用程序。
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

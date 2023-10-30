import React, { ComponentProps } from 'react';
import { DzTitlePage } from './DzTitlePage';
import { DzTitleSection } from './DzTitleSection';
import { DzTitleMol } from './DzTitleMol';
export { DzMoleculeLinkCTA } from './DzTitleSection';
export { DzMoleculeTitleCTA } from './DzTitlePage';

export enum DzTitleMoleculeTypes {
  PAGE = 'page',
  SECTION = 'section',
  MOLECULE = 'molecule',
  EXHIBITION = 'exhibition',
  EXCEPTIONAL = 'exceptional',
}

type DzTitleSectionData = Omit<
  ComponentProps<typeof DzTitleSection>,
  'LinkElement'
>;
type DzTitlePageData = Omit<ComponentProps<typeof DzTitlePage>, 'LinkElement'>;

export type DzTitleMoleculeProps = {
  data: DzTitlePageData | DzTitleSectionData;
  type: DzTitleMoleculeTypes;
  LinkElement: any;
};

export const DzTitleMolecule = ({
  type = DzTitleMoleculeTypes.PAGE,
  data,
  LinkElement = 'a',
}: DzTitleMoleculeProps) => {
  if (type === DzTitleMoleculeTypes.PAGE) {
    return (
      <DzTitlePage {...(data as DzTitlePageData)} LinkElement={LinkElement} />
    );
  }

  if (type === DzTitleMoleculeTypes.SECTION) {
    return (
      <DzTitleSection
        {...(data as DzTitleSectionData)}
        LinkElement={LinkElement}
      />
    );
  }

  if (type === DzTitleMoleculeTypes.MOLECULE) {
    return (
      <DzTitleMol {...(data as DzTitleSectionData)} LinkElement={LinkElement} />
    );
  }

  return <div>Not supported type</div>;
};

export default DzTitleMolecule;

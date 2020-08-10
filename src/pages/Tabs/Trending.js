import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
// files
import LargeHeader from '../../components/Header/LargeHeader';
import SmallHeader from '../../components/Header/SmallHeader';
import LinkList from '../../components/Link/LinkList';

const Trending = (props) => {
  return (
    <IonPage>
      <SmallHeader title="Trending" />

      <IonContent fullscreen>
        <LargeHeader title="Trending" />

        <LinkList location={props.location} />
      </IonContent>
    </IonPage>
  );
};

export default Trending;

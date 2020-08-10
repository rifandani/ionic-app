import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
// files
import LargeHeader from '../../components/Header/LargeHeader';
import SmallHeader from '../../components/Header/SmallHeader';
import LinkList from '../../components/Link/LinkList';

const News = (props) => {
  return (
    <IonPage>
      <SmallHeader title="Compass News" />

      <IonContent fullscreen>
        <LargeHeader title="Compass News" />

        <LinkList location={props.location} />
      </IonContent>
    </IonPage>
  );
};

export default News;

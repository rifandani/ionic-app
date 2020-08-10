import React from 'react';
import { IonTitle, IonToolbar, IonHeader } from '@ionic/react';

const SmallHeader = ({ title }) => {
  return (
    <IonHeader>
      <IonToolbar color="primary" style={{ background: '#3880ff' }}>
        <IonTitle size="large">{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default SmallHeader;

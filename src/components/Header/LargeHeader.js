import React from 'react';
import { IonTitle, IonToolbar, IonHeader } from '@ionic/react';

const LargeHeader = ({ title }) => {
  return (
    <IonHeader collapse="condense">
      <IonToolbar color="primary" style={{ background: '#3880ff' }}>
        <IonTitle size="large">{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default LargeHeader;

import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonButton,
  IonLoading,
} from '@ionic/react';
// files
import LargeHeader from '../../components/Header/LargeHeader';
import SmallHeader from '../../components/Header/SmallHeader';
import useForm from '../../hooks/useForm';
import validateCreateLink from '../../validators/validateCreateLink';
import firebase from '../../config';
import UserContext from '../../contexts/UserContext';
import { toast } from '../../helpers/toast';

const INITIAL_STATE = {
  description: '',
  url: '',
};

const Submit = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);

  const { values, handleChange, handleSubmit } = useForm(
    INITIAL_STATE,
    validateCreateLink,
    handleCreateLink,
  );

  const [busy, setBusy] = useState(false);

  async function handleCreateLink() {
    setBusy(true);
    // check if user authenticated
    if (!user) {
      return history.push('/login');
    }

    try {
      const { description, url } = values;
      const newLink = {
        url,
        description,
        voteCount: 0,
        votes: [],
        comments: [],
        created: Date.now(),
        postedBy: {
          id: user.uid,
          name: user.displayName,
        },
      };
      // save to firestore
      await firebase.db.collection('links').add(newLink);
      toast('Link created successfully');
      history.push('/');
    } catch (err) {
      console.error('Error submit new link', err);
      toast(err.messsage);
    }

    setBusy(false);
  }

  return (
    <IonPage>
      <SmallHeader title="Submit" />

      <IonLoading message={'Submitting...'} isOpen={busy} />

      <IonContent fullscreen>
        <LargeHeader title="Submit" />

        <IonItem lines="full">
          <IonLabel position="floating">Description</IonLabel>
          <IonInput
            name="description"
            type="text"
            required
            value={values.description}
            onIonChange={handleChange}
          ></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">URL</IonLabel>
          <IonInput
            name="url"
            type="url"
            required
            value={values.url}
            onIonChange={handleChange}
          ></IonInput>
        </IonItem>

        <IonRow>
          <IonCol>
            <IonButton
              type="submit"
              color="primary"
              expand="block"
              onClick={handleSubmit}
            >
              Submit
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Submit;

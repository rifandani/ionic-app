import React, { useState } from 'react';
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
import NavHeader from '../../components/Header/NavHeader';
import { toast } from '../../helpers/toast';
import useForm from '../../hooks/useForm';
import firebase from '../../config';
import validateSignup from '../../validators/validateSignup';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
};

const Signup = () => {
  const history = useHistory();
  const { handleChange, handleSubmit, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validateSignup,
    authenticateUser,
  );
  const [busy, setBusy] = useState(false);

  async function authenticateUser() {
    // set loading
    setBusy(true);
    // get name, email, password
    const { name, email, password } = values;

    try {
      // save to firebase
      await firebase.register(name, email, password);
      // toast
      toast('You have signed up successfully');
      // back to home page
      history.push('/');
    } catch (err) {
      console.error('Auth error', err);
      toast(err.message);
    }

    setBusy(false);
  }

  return (
    <IonPage>
      <NavHeader title="Sign Up" />

      <IonLoading message={'Loading...'} isOpen={busy} />

      <IonContent>
        <IonItem lines="full">
          <IonLabel position="floating">Username</IonLabel>
          <IonInput
            name="name"
            type="text"
            required
            value={values.name}
            onIonChange={handleChange}
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            name="email"
            type="text"
            required
            value={values.email}
            onIonChange={handleChange}
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            name="password"
            type="password"
            required
            value={values.password}
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
              disabled={isSubmitting}
            >
              Signup
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Signup;

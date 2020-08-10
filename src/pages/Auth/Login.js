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
  IonRouterLink,
  IonButton,
  IonLoading,
} from '@ionic/react';
// files
import NavHeader from '../../components/Header/NavHeader';
import validateLogin from '../../validators/validateLogin';
import useForm from '../../hooks/useForm';
import firebase from '../../config';
import { toast } from '../../helpers/toast';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const Login = () => {
  const history = useHistory();
  const { handleChange, handleSubmit, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validateLogin,
    authenticateUser,
  );
  const [busy, setBusy] = useState(false);

  async function authenticateUser() {
    setBusy(true);
    // get email and password dari state
    const { email, password } = values;

    try {
      await firebase.login(email, password);
      toast('Login success');
      history.push('/');
    } catch (err) {
      console.error('Auth error', err);
      toast(err.message);
    }

    setBusy(false);
  }

  return (
    <IonPage>
      <NavHeader title="Login" />

      <IonLoading message={'Loading...'} isOpen={busy} />

      <IonContent>
        <IonItem lines="full">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            name="email"
            type="email"
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
              Login
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol class="ion-text-center ion-padding-vertical">
            <IonRouterLink routerLink={'/forgot'}>
              Forgot password?
            </IonRouterLink>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol class="ion-text-center ion-padding-vertical">
            <IonRouterLink routerLink={'/register'}>
              Don't have any account?
            </IonRouterLink>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Login;

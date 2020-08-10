import React, { useState } from 'react';
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
import useForm from '../../hooks/useForm';
import validatePasswordReset from '../../validators/validatePasswordReset';
import { toast } from '../../helpers/toast';
import firebase from '../../config';

const INITIAL_STATE = {
  email: '',
};

const Forgot = () => {
  const { handleChange, handleSubmit, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validatePasswordReset,
    handleResetPassword,
  );
  const [busy, setBusy] = useState(false);

  async function handleResetPassword() {
    setBusy(true);

    try {
      await firebase.resetPassword(values.email);
      toast('Check your email to reset your password');
    } catch (err) {
      console.error('Password reset error: ', err);
      toast(err.message);
    }

    setBusy(false);
  }

  return (
    <IonPage>
      <NavHeader title="Password Reset" />

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
        <IonRow>
          <IonCol>
            <IonButton
              type="submit"
              color="primary"
              expand="block"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Get Reset Link
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Forgot;

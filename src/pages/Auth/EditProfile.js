import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonPage,
  IonLoading,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonButton,
} from '@ionic/react';
// files
import firebase from '../../config';
import { toast } from '../../helpers/toast';
import useForm from '../../hooks/useForm';
import UserContext from '../../contexts/UserContext';
import NavHeader from '../../components/Header/NavHeader';
import validateEditProfile from '../../validators/validateEditProfile';

const EditProfile = () => {
  const history = useHistory();
  const [busy, setBusy] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const INITIAL_STATE = {
    name: user && user.displayName,
    email: user && user.email,
    newPassword: '',
    currentPassword: '',
  };

  const {
    values,
    setValues,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useForm(INITIAL_STATE, validateEditProfile, authenticateUser);

  async function reauthenticate(email, currentPassword) {
    // get the user credentials
    const credential = firebase.app.auth.EmailAuthProvider.credential(
      email,
      currentPassword,
    );
    // check if user valid
    try {
      await user.reauthenticateWithCredential(credential);
      console.log('Reauthenticate success');
    } catch (err) {
      console.error('Reauthenticate error', err);
      toast(err.message);
    }
  }

  async function updateProfileItems(name, email, newPassword) {
    try {
      await user.updateProfile({
        displayName: name,
      });
      await user.updateEmail(email);

      if (newPassword) {
        await user.updatePassword(newPassword);
      }
    } catch (err) {
      console.error('Update profile items error', err);
      toast(err.message);
    }
  }

  async function authenticateUser() {
    setBusy(true);
    // destructure state
    const { name, email, currentPassword, newPassword } = values;

    try {
      await reauthenticate(user.email, currentPassword);
      await updateProfileItems(name, email, newPassword);

      const result = await firebase.login(
        email,
        newPassword || currentPassword,
      );

      setValues({
        name: user && user.displayName,
        email: user && user.email,
        newPassword: '',
        currentPassword: '',
      });

      setUser(result.user);
      toast('Profile update success');
      history.push('/profile');
    } catch (err) {
      console.error('Auth error', err);
      toast(err.message);
    }

    setBusy(false);
  }

  return (
    <IonPage>
      <NavHeader title="Edit Profile" />
      <IonLoading message={'Please wait...'} isOpen={busy} />
      <IonContent>
        <IonItem lines="full">
          <IonLabel position="floating">New Username</IonLabel>
          <IonInput
            name="name"
            type="text"
            value={values.name}
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">New Email</IonLabel>
          <IonInput
            name="email"
            type="text"
            value={values.email}
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">New Password</IonLabel>
          <IonInput
            name="newPassword"
            type="password"
            value={values.newPassword}
            onIonChange={handleChange}
          ></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">Current Password</IonLabel>
          <IonInput
            name="currentPassword"
            type="password"
            value={values.currentPassword}
            onIonChange={handleChange}
            required
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
              Save
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;

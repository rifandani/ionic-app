import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonLabel,
  IonIcon,
  IonRow,
  IonCol,
  IonButton,
  IonGrid,
  IonItem,
} from '@ionic/react';
import { personCircleOutline, mailOutline } from 'ionicons/icons';
// files
import LargeHeader from '../../components/Header/LargeHeader';
import SmallHeader from '../../components/Header/SmallHeader';
import { toast } from '../../helpers/toast';
import firebase from '../../config';
import UserContext from '../../contexts/UserContext';

const Profile = () => {
  const history = useHistory();
  // UserContext isinya {user, setUser}
  const { user } = useContext(UserContext);

  async function logoutUser() {
    try {
      await firebase.logout();
      history.push('/');
      toast('You have logged out successfully');
    } catch (err) {
      console.error('Error logging out ', err);
      toast(err.message);
    }
  }

  return (
    <IonPage>
      <SmallHeader title="Profile" />

      <IonContent fullscreen>
        <LargeHeader title="Profile" />

        {user ? (
          <>
            <IonCard>
              <IonCardContent>
                <IonList lines="none">
                  <IonItem>
                    <IonIcon icon={personCircleOutline} slot="start"></IonIcon>
                    <IonLabel>
                      <strong>{user.displayName}</strong>
                      <p>Username</p>
                    </IonLabel>
                  </IonItem>

                  <IonItem>
                    <IonIcon icon={mailOutline} slot="start"></IonIcon>
                    <IonLabel>
                      <strong>{user.email}</strong>
                      <p>Email</p>
                    </IonLabel>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>

            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  routerLink={'/edit-profile'}
                  color="warning"
                  fill="outline"
                >
                  Edit Profile
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonButton expand="block" color="danger" onClick={logoutUser}>
                  Logout
                </IonButton>
              </IonCol>
            </IonRow>
          </>
        ) : (
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  routerLink={'/register'}
                  color="primary"
                >
                  Signup
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  routerLink={'/login'}
                  color="primary"
                  fill="outline"
                >
                  Login
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Profile;

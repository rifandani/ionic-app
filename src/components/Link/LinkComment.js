import React, { useContext, useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonText,
} from '@ionic/react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { personCircleOutline, timeOutline } from 'ionicons/icons';
// files
import UserContext from '../../contexts/UserContext';
import CommentModal from './CommentModal';
import firebase from '../../config';
import { toast } from '../../helpers/toast';

const LinkComment = ({ comment, link, setLink }) => {
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const postedByAuthUser = user && user.uid === comment.postedBy.id;

  function handleCloseModal() {
    setShowModal(false);
  }

  async function handleEditComment(commentText) {
    try {
      const linkRef = firebase.db.collection('links').doc(link.id);
      const doc = await linkRef.get();

      if (doc.exists) {
        const previousComments = doc.data().comments;
        const newComment = {
          postedBy: {
            id: user.uid,
            name: user.displayName,
          },
          created: Date.now(),
          text: commentText,
        };
        const updatedComments = previousComments.map((el) =>
          el.created === comment.created ? newComment : el,
        );

        // update comment
        await linkRef.update({
          comments: updatedComments,
        });
        setLink((prevState) => ({
          ...prevState,
          comments: updatedComments,
        }));
        // close modal and toast
        setShowModal(false);
        toast('Comment edited');
      }
    } catch (err) {
      console.error('Edit comment error', err);
      toast(err.message);
    }
  }

  async function handleDeleteComment() {
    try {
      const linkRef = firebase.db.collection('links').doc(link.id);
      const doc = await linkRef.get();

      if (doc.exists) {
        const previousComments = doc.data().comments;
        // delete comment
        const updatedComments = previousComments.filter(
          (el) => el.created !== comment.created,
        );
        // update the comment after the deletion
        await linkRef.update({
          comments: updatedComments,
        });
        setLink((prevState) => ({
          ...prevState,
          comments: updatedComments,
        }));
        // close modal and toast
        setShowModal(false);
        toast('Comment deleted');
      }
    } catch (err) {
      console.error('Delete comment error', err);
      toast(err.message);
    }
  }

  return (
    <>
      <CommentModal
        isOpen={showModal}
        title="Edit Comment"
        sendAction={handleEditComment}
        closeAction={handleCloseModal}
        comment={comment}
      />

      <IonCard>
        <IonCardContent>
          <IonList lines="none">
            <IonItem>
              <IonLabel class="ion-text-wrap ">
                <p
                  style={{
                    alignItems: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 'normal',
                  }}
                >
                  <IonIcon
                    icon={personCircleOutline}
                    style={{ verticalAlign: 'middle' }}
                  />{' '}
                  <IonText>{comment.postedBy.name}</IonText>
                  {' | '}
                  <IonIcon
                    icon={timeOutline}
                    style={{
                      verticalAlign: 'middle',
                    }}
                  />{' '}
                  <IonText
                    style={{
                      verticalAlign: 'middle',
                    }}
                  >
                    {formatDistanceToNow(comment.created)}
                  </IonText>
                </p>

                <div className="ion-padding-vertical">{comment.text}</div>

                {postedByAuthUser && (
                  <IonButton
                    size="small"
                    color="warning"
                    onClick={() => setShowModal(true)}
                  >
                    Edit
                  </IonButton>
                )}

                {postedByAuthUser && (
                  <IonButton
                    size="small"
                    color="danger"
                    onClick={handleDeleteComment}
                  >
                    Delete
                  </IonButton>
                )}
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default LinkComment;

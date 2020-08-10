import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Plugins } from '@capacitor/core';
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';
// files
import firebase from '../config';
import UserContext from '../contexts/UserContext';
import NavHeader from '../components/Header/NavHeader';
import { toast } from '../helpers/toast';
import LinkItem from '../components/Link/LinkItem';
import LinkComment from '../components/Link/LinkComment';
import CommentModal from '../components/Link/CommentModal';

const { Browser } = Plugins;

const Link = (props) => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [link, setLink] = useState(null);
  // get the linkId params
  const linkId = props.match.params.linkId;
  // get the link reference
  const linkRef = firebase.db.collection('links').doc(linkId);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkId]);

  async function getLink() {
    try {
      const doc = await linkRef.get();
      setLink({
        ...doc.data(),
        id: doc.id,
      });
    } catch (err) {
      console.error('Error get specific link', err);
      toast(err.message);
    }
  }

  function postedByAuthUser(link) {
    return user && user.uid === link.postedBy.id;
  }

  // delete the link
  async function handleDeleteLink() {
    try {
      await linkRef.delete();
      toast('Link deleted successfully');
      history.push('/');
    } catch (err) {
      console.error('Error deleting link', err);
      toast(err.message);
    }
  }

  // open in browser
  async function openBrowser() {
    await Browser.open({
      url: link.url,
    });
  }

  // add Vote
  async function handleAddVote() {
    // if not authenticated, back to login
    if (!user) {
      toast('Please login first');
      return history.push('/login');
    }

    try {
      const doc = await linkRef.get();

      if (doc.exists) {
        const previousVotes = doc.data().votes; // array of votes
        const vote = {
          votedBy: {
            id: user.uid,
            name: user.displayName,
          },
        };
        const updatedVotes = [...previousVotes, vote];
        const voteCount = updatedVotes.length;

        // check if already voted
        const votedById = doc.data().votes.map((el) => el.votedBy.id);
        const isVoted = votedById.includes(user.uid);
        if (isVoted) {
          return toast('Already voted');
        }

        // update linkRef
        await linkRef.update({
          votes: updatedVotes, // array
          voteCount,
        });
        // setLink
        setLink((prevState) => ({
          ...prevState,
          votes: updatedVotes,
          voteCount,
        }));
        toast('Upvoted');
      }
    } catch (err) {
      console.error('Voting error', err);
    }
  }

  // open Modal
  function handleOpenModal() {
    if (!user) {
      toast('Please login first');
      return history.push('/login');
    }

    setShowModal(true);
  }

  // close Modal
  function handleCloseModal() {
    setShowModal(false);
  }

  // add comment
  async function handleAddComment(commentText) {
    if (!user) return history.push('/login');

    try {
      const doc = await linkRef.get();

      if (doc.exists) {
        const previousComments = doc.data().comments; // array of comments
        const newComment = {
          postedBy: {
            id: user.uid,
            name: user.displayName,
          },
          created: Date.now(),
          text: commentText,
        };
        const updatedComments = [...previousComments, newComment];

        // update linkRef
        await linkRef.update({
          comments: updatedComments,
        });
        setLink((prevState) => ({
          ...prevState,
          comments: updatedComments,
        }));
        // close modal and toast
        setShowModal(false);
        toast('Comment added');
      }
    } catch (err) {
      console.error('Add comment error', err);
      toast(err.message);
    }
  }

  return (
    <IonPage>
      <NavHeader
        title={link && link.description}
        option={link && postedByAuthUser(link)}
        icon={closeCircleOutline}
        action={handleDeleteLink}
      />

      <IonContent>
        <CommentModal
          isOpen={showModal}
          title="New Comment"
          sendAction={handleAddComment}
          closeAction={handleCloseModal}
        />

        {link && (
          <>
            <IonGrid>
              <IonRow>
                <IonCol class="ion-text-center">
                  <LinkItem link={link} browser={openBrowser} />

                  <IonButton
                    size="small"
                    color="primary"
                    onClick={handleAddVote}
                  >
                    Upvote
                  </IonButton>

                  <IonButton
                    size="small"
                    color="primary"
                    onClick={handleOpenModal}
                  >
                    Comment
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>

            {link.comments.map((comment, i) => (
              <LinkComment
                key={i}
                comment={comment}
                link={link}
                setLink={setLink}
              />
            ))}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Link;

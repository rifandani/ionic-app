import React, { useState, useEffect } from 'react';
// files
import LinkItem from './LinkItem';
import firebase from '../../config';

const LinkList = (props) => {
  const [links, setLinks] = useState([]);
  // check jika location path nya == /trending
  const isTrending = props.location.pathname.includes('trending');

  function getLinks() {
    if (isTrending) {
      return firebase.db
        .collection('links')
        .orderBy('voteCount', 'desc')
        .onSnapshot(handleSnapshot);
    }

    return firebase.db
      .collection('links')
      .orderBy('created', 'desc')
      .onSnapshot(handleSnapshot);
  }

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setLinks(links);
  }

  useEffect(() => {
    getLinks();
    // cleanup
    return () => getLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTrending]);

  return (
    <>
      {(links || []).map((link, i) => (
        <LinkItem
          key={link.id}
          index={i + 1}
          link={link}
          showCount={true}
          url={`/link/${link.id}`}
        />
      ))}
    </>
  );
};

export default LinkList;

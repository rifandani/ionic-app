import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonSearchbar } from '@ionic/react';
// files
import LargeHeader from '../../components/Header/LargeHeader';
import SmallHeader from '../../components/Header/SmallHeader';
import LinkItem from '../../components/Link/LinkItem';
import firebase from '../../config';

const Search = () => {
  const [links, setLinks] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredLinks, setFilteredLinks] = useState([]);

  function handleChange(e) {
    if (e.key === 'Enter') {
      setFilter(e.target.value);
    }
  }

  function handleSearch() {
    const query = filter.toLowerCase();
    // filtering the links based on the query
    const matchedLinks = links.filter((link) => {
      return (
        link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.postedBy.name.toLowerCase().includes(query)
      );
    });

    setFilteredLinks(matchedLinks); // array
  }

  async function getInitialLinks() {
    const snapshot = await firebase.db.collection('links').get();
    // get the link's array
    const links = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setLinks(links);
  }

  useEffect(() => {
    getInitialLinks();
  }, []);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <IonPage>
      <SmallHeader title="Search" />

      <IonContent>
        <LargeHeader title="Search" />

        <IonSearchbar
          placeholder="Search"
          spellcheck="false"
          type="url"
          value={filter}
          onKeyPress={handleChange}
          animated
        />

        {filteredLinks.map((filteredLink, index) => (
          <LinkItem
            key={filteredLink.id}
            showCount={false}
            link={filteredLink}
            index={index}
            url={`/link/${filteredLink.id}`}
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Search;

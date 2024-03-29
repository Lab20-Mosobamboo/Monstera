// 기본 import
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

// 공동 컴포넌트 import
import { Title } from '../../components/Title/Title';
import { Card } from '../../components/Card/Card';
import { Input } from '../../components/Input/Input';
import { PaginationC } from '../../components/Pagination/Pagination';
import { Button } from '../../components/Button/Button';

// firebase import
import { db } from '../../firebase-config';

import {
  collection,
  getDocs,
  onSnapshot,
  getFirestore,
  doc,
  getDoc,
} from 'firebase/firestore';

// css import
import './plantList.css';

export const PlantList = ({}) => {
  const itemsCollectionRef = collection(db, 'items');
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(itemsCollectionRef);
      const itemsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItems(itemsData.slice(0, 8)); // set the initial page of items
    } catch (error) {
      console.log('Error getting documents: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const LAST_PAGE =
    items.length % 8 === 0
      ? parseInt(items.length / 8)
      : parseInt(items.length / 8) + 1; // 마지막 페이지
  const [page, setPage] = useState(1); // 처음 페이지는 1이다.

  const handlePage = (event) => {
    const nowPageInt = parseInt(event.target.outerText);
    setPage(nowPageInt);
  };

  useEffect(() => {
    const start = (page - 1) * 8;
    const end = start + 8;
    setItems(items.slice(start, end));
  }, [page]);

  return (
    <div className="plantList">
      {/* 제목 */}
      <Title className="plantTitle" type={2} label="반려식물"></Title>
      <div className="plantCategory">
        {/* 카테고리 필터 */}
        <Title
          className="categoryFilter"
          type={3}
          label="카테고리 필터"
        ></Title>
        <Button option={1} label="관역식물" width={110}></Button>
        <Button option={2} label="허브류" width={90}></Button>
        <Button option={2} label="공기정화식물" width={130}></Button>
        <Button option={2} label="다육식물" width={110}></Button>
        <Button option={2} label="야생화" width={90}></Button>
        <Button option={2} label="기타" width={80}></Button>
      </div>
      {/* 상품 리스트 */}

      <div className="cardContainer">
        {items.length > 0 ? (
          items.map((list) => {
            return (
              <Card
                key={list.id}
                containerWidth="276px"
                containerHeight="489px"
                componentGap="24px"
                src={list.imageUrl}
                alt="test"
                imageWidth="276px"
                imageHeight="240px"
                contentWidth="276px"
                contentHeight="225px"
                categoryTitle={list.category}
                productTitle={list.name}
                score={list.score}
                reviewsNumber={list.reviews}
                newItem="신상품"
                prevPrice={list.prevPrice}
                currentPrice={list.currentPrice}
              />
            );
          })
        ) : (
          <p>Loading...</p>
        )}
        <div className="page">
          <PaginationC
            lastPageNum={LAST_PAGE}
            onChange={(e) => handlePage(e)}
          />
        </div>
      </div>
    </div>
  );
};

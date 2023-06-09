import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../config";
import styled from "styled-components";
import ContentSection from "./ContentSection";
import NovelFreeContent from "./NovelFreeContent";

const SubContent = () => {
  const [novel, setNovel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(API.GET_NOVELS)
      .then(response => {
        const novelData = response.data.novels;
        setNovel(novelData);
      })
      .catch(error => {
        console.log("Error >>", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Div>
      {isLoading ? (
        <LoadingText>Loading...</LoadingText>
      ) : (
        <>
          <Section>
            <TopicTitle>최근 본 작품</TopicTitle>
            <ContentSection contentData={novel} arrowCheck={false} />
          </Section>
          <Section>
            <TopicTitle>실시간 랭킹</TopicTitle>
            <ContentSection
              contentData={novel}
              sort={"ranking"}
              arrowCheck={true}
            />
          </Section>
          <Section>
            <NovelFreeContent />
          </Section>
          <Section>
            <TopicTitle>지금 시리즈가 추천해요</TopicTitle>
            <ContentSection contentData={novel} arrowCheck={false} />
          </Section>
        </>
      )}
    </Div>
  );
};

export default SubContent;

const Div = styled.div``;

const TopicTitle = styled.p`
  margin-left: 3.44%;
  margin-right: 31.63%;
  margin-top: 0%;
  margin-bottom: 3.73%;

  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 22px;

  color: #000000;
`;

const Section = styled.div`
  margin-bottom: 52px;
`;

const LoadingText = styled.p`
  text-align: center;
  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
`;

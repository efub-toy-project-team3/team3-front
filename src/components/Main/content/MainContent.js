import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../config";
import styled from "styled-components";
import ContentSection from "./ContentSection";

const MainContent = () => {
  const [novel, setNovel] = useState([]);
  const [comix, setComix] = useState([]);
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
      });

    axios
      .get(API.GET_COMICS)
      .then(response => {
        const comixData = response.data.comics;
        setComix(comixData);
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
            <TopicTitle>실시간 랭킹</TopicTitle>
            <ContentSection
              topicTitle={"NOVEL"}
              contentData={novel}
              sort={"ranking"}
              arrowCheck={true}
            />
            <ContentSection
              topicTitle={"COMIX"}
              contentData={comix}
              sort={"ranking"}
              arrowCheck={true}
            />
          </Section>
          <Section>
            <TopicTitle>지금 시리즈가 추천해요</TopicTitle>
            <ContentSection
              topicTitle={"NOVEL"}
              contentData={novel}
              arrowCheck={false}
            />
            <ContentSection
              topicTitle={"COMIX"}
              contentData={comix}
              arrowCheck={false}
            />
          </Section>
        </>
      )}
    </Div>
  );
};

export default MainContent;

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

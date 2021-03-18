import React from "react";
import Header from "../../../Components/Header/Header";
import "./About.css";

const About = () => {
  return (
    <>
      <Header />
      <div className="about-cover">
        <h1>About ECPLC</h1>
      </div>
      <div className="about">
        <div className="philosophy">
          <div className="title">
            <h2> PHILOSOPHY </h2>
          </div>
          <div className="body">
            <p>
              The institution believes that when a child has gained proficiency
              in listening, expressing oneself, reading, writing, solve simple
              true life problems and uses his multiple intelligence to help him
              grow strong, wiser and God-fearing individual, the he can help
              build a strong Philipine Society.
            </p>
          </div>
        </div>
        <div className="mission">
          <div className="title">
            <h2> VISION/MISSION </h2>
          </div>
          <div className="body">
            <p>
              Early Childhood Prep Learning Center envisions itself as a
              quality-learning institution for school-aged children 3 - 13 years
              old using their multi-intelligence in all levels of learning. This
              will be an institution where the weak grow strong and the strong
              grow great.
            </p>
          </div>
        </div>
        <div className="goals">
          <div className="title3">
            <h2> GOALS AND OBJECTIVES </h2>
          </div>
          <div className="body3">
            <p className="ecp">Early Childhood Prep Learning Center will:</p>

            <p>
              1. Cater to all school-aged children from 3 - 13 years old of the
              village and the neighboring communities.
            </p>

            <p>
              2. Provide instructions in conformity with the course requirement
              of the Department of Education (DepEd).
            </p>
            <p>
              3. Provide a healthy and safe environment where the pupils will
              develop a wholesome activity that will enhance their physical,
              social, mental and aesthetic skills and abilities.
            </p>
            <p>
              4. Develop the multi-intelligence skills of pupils towards a
              well-rounded personality; and
            </p>
            <p>
              5. Train pupils to be independent of adults and put into practice
              what they have learned in order to live a useful and purposeful
              life as they move to the next level.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

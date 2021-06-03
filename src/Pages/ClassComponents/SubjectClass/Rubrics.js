import React, { useState } from "react";
import "./Rubrics.css";

const Rubrics = (props) => {
  const [rubric, setRubric] = useState("");
  const [total, setTotal] = useState("/0");
  const [criterion, setCriterion] = useState([
    // {
    //   title: "",
    //   description: "",
    //   level: [
    //     {
    //       level: 0,
    //       levelTitle: "",
    //       levelDescription: "",
    //     },
    //   ],
    // },
  ]);

  return (
    <>
      <div className="rubrics-wrapper">
        <div className="rubrics-wrapper-header">
          <h3 onClick={() => props.setShowRubrics(false)}>Create Rubric</h3>
        </div>
        <div className="rubrics-wrapper-body">
          <div className="rubric-name">
            <div>
              <p> Rubric name: </p>
              <input
                type="text"
                value={rubric}
                onChange={(e) => setRubric(e.target.value)}
              />
            </div>

            <div>
              <p> Total points: </p>
              <input
                style={{ border: "none" }}
                type="text"
                value={total}
                onChange={(e) => setRubric(e.target.value)}
              />
            </div>
          </div>

          <div className="rubric-criterion">
            {criterion.length !== 0 && (
              <>
                {criterion.map((e) => {
                  return (
                    <>
                      <div className="criterion-wrapper">
                        <input
                          value={criterion.title}
                          placeholder="Title"
                          className="criterion-title"
                        />
                        <textarea placeholder="Description"></textarea>
                        <div className="level-wrapper">
                          <div className="level-wrapper-item">
                            <input type="text" placeholder="Level points" />
                            <input type="text" placeholder="Level title" />
                            <textarea
                              stlye={{ marginBottom: "none" }}
                              placeholder="Level description "
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            )}

            <div
              onClick={() => {
                setCriterion([
                  ...criterion,
                  {
                    title: "sd",
                    description: "",
                    level: [
                      {
                        level: 0,
                        levelTitle: "",
                        levelDescription: "",
                      },
                    ],
                  },
                ]);
              }}
              className="add-criterion-btn"
            >
              Add criterion
            </div>
          </div>
          <div className="create-rubric-btn">
            <input type="submit" value="Save" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Rubrics;

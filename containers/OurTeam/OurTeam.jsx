import React from "react";
import { TeamCard } from "../../components";
import Style from "./OurTeam.module.scss";

function OurTeam() {
  let teamMembers = [1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <div className={Style.OurTeam}>
      <div className={Style.title}>
        Our <span className="gradient__Text">Team</span>
      </div>
      <hr />

      <div className={Style.teamContainer}>
        {teamMembers.map((data, index) => (
          <div className={Style.teamBox} key={index}>
            <TeamCard index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurTeam;

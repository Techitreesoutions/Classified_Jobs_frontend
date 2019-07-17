import CityList from "../data/cityList.json";

function getIndiaCityList() {
  return CityList;
}

export const getSkillsArray = jobList => {
  let skillsArr = [];
  jobList.map(jobItem => {
    jobItem.skills.map(skillsItem => {
      skillsArr.push({
        label: skillsItem,
        value: skillsItem
      });
    });
  });
  console.log("getSkillsArray", skillsArr);
  return getUniqueValues(skillsArr);
};

export const getAllSkillsArray = skillList => {
  let skillsArr = [];
  skillList.map(skillsItem => {
      skillsArr.push({
        label: skillsItem,
        value: skillsItem
      });
  });
  return getUniqueValues(skillsArr);
};

export const getLocationArray = jobList => {
  let localArr = [];
  jobList.map(jobItem => {
    jobItem.location.map(locationItem => {
      localArr.push({
        label: locationItem,
        value: locationItem
      });
    });
  });

  console.log("getLocationArray", getUniqueValues(localArr));
  return getUniqueValues(localArr);
};

export const getUniqueValues = arrayParam => {
  const uniqueArray = arrayParam.filter((value, index) => {
    return (
      index ===
      arrayParam.findIndex(obj => {
        return JSON.stringify(obj) === JSON.stringify(value);
      })
    );
  });
  return uniqueArray;
};

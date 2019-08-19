import CityList from "../data/cityList.json";

function getIndiaCityList() {
  return CityList;
}

export const getSkillsArray = jobList => {
  let skillsArr = [];
  if(jobList !== undefined)
  {
    jobList.map(jobItem => {
      if(jobItem !== undefined && jobItem.skills !== undefined){
        jobItem.skills.map(skillsItem => {
          skillsArr.push({
            label: skillsItem,
            value: skillsItem
          });
        });
      }
    });
  }
  console.log("getSkillsArray", skillsArr);
  return getUniqueValues(skillsArr);
};

export const getAllSkillsArray = (skillList,jobList,candidateList) => {
  let skillsArr = [];
  skillList.map(skillsItem => {
      skillsArr.push({
        label: skillsItem,
        value: skillsItem
      });
  });
  jobList.map(jobItem => {
    jobItem.skills.map(skillsItem => {
      skillsArr.push({
        label: skillsItem,
        value: skillsItem
      });
    });
  });
if(candidateList !== undefined)
{
  candidateList.map(jobItem => {
    jobItem.skills.map(skillsItem => {
      skillsArr.push({
        label: skillsItem,
        value: skillsItem
      });
    });
  });
}
  
  return getUniqueValues(skillsArr);
};

export const getLocationArray = jobList => {
  let localArr = [];
  if(jobList !== undefined){
    jobList.map(jobItem => {
      if(jobItem.location !== undefined){
        jobItem.location.map(locationItem => {
          localArr.push({
            label: locationItem,
            value: locationItem
          });
        });
      }
    });
  }
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

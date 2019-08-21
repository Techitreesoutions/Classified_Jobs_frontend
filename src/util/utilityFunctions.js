export const getSkillsArray = jobList => {
  let skillsArr = [];
  if (jobList !== undefined) {
    jobList.map(jobItem => {
      if (jobItem !== undefined && jobItem.skills !== undefined) {
        jobItem.skills.map(skillsItem => {
          skillsArr.push({
            label: skillsItem,
            value: skillsItem
          });
        });
      }
      return;
    });
  }
  return getUniqueValues(skillsArr);
};

export const getAllSkillsArray = skillList => {
  let skillsArr = [];
  if(skillList !== undefined)
  {
    skillList.map(skillsItem => {
      skillsArr.push({
        label: skillsItem,
        value: skillsItem
      });
    });
  }

  return getUniqueValues(skillsArr);
};

export const getLocationArray = jobList => {
  let localArr = [];
  if (jobList !== undefined) {
    jobList.map(jobItem => {
      if (jobItem.location !== undefined) {
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

export const deleteEmptyFromObject = obj => {
  Object.keys(obj).forEach(
    key =>
      (obj[key] == null || obj[key] == undefined || obj[key] == "") &&
      delete obj[key]
  );
  return obj;
};

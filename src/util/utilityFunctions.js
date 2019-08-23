export const getSkillsArray = jobList => {
  let skillsArr = [];
  if (jobList !== undefined) {
    jobList.forEach(jobItem => {
      if (jobItem !== undefined && jobItem.skills !== undefined) {
        jobItem.skills.forEach(skillsItem => {
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
    skillList.forEach(skillsItem => {
      skillsArr.push({
        label: skillsItem,
        value: skillsItem
      });
    });
  }

  return getUniqueValues(skillsArr);
};

export const getAllLocationArray = locationList => {
  let localArr = [];
  if(locationList !== undefined)
  {
    locationList.forEach(item => {
      localArr.push({
        label: item,
        value: item
      });
    });
  }
  localArr.push({ label: "Anywhere", value: "Anywhere" });
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
      (obj[key] === null || obj[key] === undefined || obj[key] === "") &&
      delete obj[key]
  );
  return obj;
};

import axios from "axios";

/**
 * Axios Interceptor used for conditional handling of responses
 */
export const setupAxiosInterceptors = unauthorisedCallback => {
  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      //const log = pilog.getLogger("SecurePlatformAPIUtils interceptor");
      if (error.response && error.response.status === 401) {
        //log.error("Unauthorised access, redirecting to Login");
        unauthorisedCallback && unauthorisedCallback();
      }
      return Promise.reject(error);
    }
  );
};

/**
 * A collection of utilities to help securely connect to the platform
 */

export const handleSecureAjaxError = (
  error,
  className,
  dispatch,
  customerMessage = ""
) => {
  let formattedMessage = customerMessage;
  let platformResponse = undefined;

  try {
    if (error.response) {
      const { data, status, statusText, config } = error.response;
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(`Platform request failed: ${config.url}`);
      //log.error(data);
      //log.error(`Platform HTTP Status ${status} ${statusText}`);
      if (error.response.data) {
        platformResponse = data;
      }
      if (status) {
        platformResponse = Object.assign({}, platformResponse, {
          "Status Code": status
        });
      }
      if (statusText) {
        platformResponse = Object.assign({}, platformResponse, {
          Status: statusText
        });
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      //log.error("Platform request error", error);
      formattedMessage.concat(" - Unexpected error occurred");
    } else {
      // Something happened in setting up the request that triggered an Error
      /// log.error("Error", error);
    }
  } catch (error) {
    //log.error("Failed to process Error! whoops", error.message);
  }
  // log.debug(`Formatted Message ${formattedMessage}`);

  if (dispatch) {
    console.log(`platformResponse  ${platformResponse}`);
    // dispatch(addNotification({ title: formattedMessage, variant: "error", platformResponse }));
  }
};

export const getAccessKeysFromStorage = () => {
  let n = 0;
  let localStorageData = {};
  while (n < localStorage.length) {
    localStorageData[localStorage.key(n)] = localStorage.getItem(
      localStorage.key(n)
    );
    n++;
  }

  return localStorageData;
};

/**
 * Creates the Application public API URL based on environment variables.
 *
 * @param {string} api
 */
export const createPlatformURL = api => {
  let publicUrl = `${"https://sf52c0lym7.execute-api.ap-south-1.amazonaws.com/dev/"}${api}`; //`${process.env.REACT_APP_BASE_PLATFORM_URL}${process.env.REACT_APP_STAGE}/${api}`;
  console.log("HC createPlatformURL " + publicUrl);

  return encodeURI(publicUrl);
};

/**
 * Creates the headers needed for a mution AJAX call (POST/PUT)
 *
 *
 * @param {string} accessKey
 */
export const createMutationHeaders = (additionalParams, additionalHeaders) => {
  const storage = getAccessKeysFromStorage();
  let token = "";

  token =
    storage[
      `CognitoIdentityServiceProvider.${process.env.REACT_APP_CLIENT_ID}.${
        storage[
          `CognitoIdentityServiceProvider.${
            process.env.REACT_APP_CLIENT_ID
          }.LastAuthUser`
        ]
      }.idToken`
    ];

  return {
    //headers: Object.assign({ Authorization: token }, additionalHeaders),
    //timeout: parseInt(process.env.REACT_APP_HTTP_POST_TIMEOUT),
    params: Object.assign({}, additionalParams)
  };
};

export const createAttachmentHeaders = contentType => {
  return {
    headers: Object.assign({ "Content-Type": contentType })
  };
};

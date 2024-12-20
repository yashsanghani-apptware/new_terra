/**
 * It returns the data from the given url
 * @param url - The URL to make the request to.
 * @returns a promise.
 */
import axios from "axios";
import { refreshAccessToken } from "./postData";
import { BASE_URL } from "@/config/apiBaseUrls";
import { toast } from "react-toastify";

export async function getData(url) {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error("Error", error);
  }
}


export async function getAPIData(url){
  try{
  return await axios.get( url, { headers: {  Authorization: `Bearer ${localStorage.getItem("token")}` } }
  )
  .then(async (response) => {
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 401){
      try {
        const newToken = await refreshAccessToken(localStorage.getItem("token"));
        if (newToken && newToken !== null) {
          localStorage.setItem("token", newToken);
          const retryResponse = await axios.get( url, { headers: {  Authorization: `Bearer ${newToken}` } });
          if (retryResponse.status === 200) {
            return retryResponse.data;
          }
        }
        
      } catch (error) {
      }
    }
  })
  }
  catch (error) {
    console.error("Error", error);
    if (error.response.status == 401) {
      try {
        const newToken = await refreshAccessToken(localStorage.getItem("token"));
        if (newToken && newToken !== null) {
          localStorage.setItem("token", newToken);
          const retryResponse = await axios.get( url, { headers: {  Authorization: `Bearer ${newToken}` } });
          if (retryResponse.status === 200) {
            return retryResponse.data;
          }
        }
        
      } catch (error) {
      }
    }
  }
}

export async function getListingCardsData(endpoint) {
  try {
    return await axios
      .get(`${BASE_URL.LISTING}${endpoint}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then(async (response) => {
        if (response.status === 200) {
          
          return response.data;
        } else if (response.status === 401){
          try {
            const newToken = await refreshAccessToken(localStorage.getItem("token"));
            if (newToken && newToken !== null) {
              localStorage.setItem("token", newToken);
              const retryResponse = await axios.get(`${BASE_URL.LISTING}${endpoint}`, { headers: { Authorization: `Bearer ${newToken}` } });
              if (retryResponse.status === 200) {
                return retryResponse.data;
              }
            }
        
          } catch (error) {
            localStorage.clear();
            window.location.href = "/auth/login";
          }
        }
      });
  } catch (error) {
    if (error.response.status == 401) {
      try {
        const newToken = await refreshAccessToken(localStorage.getItem("token"));
        if (newToken && newToken !== null) {
          localStorage.setItem("token", newToken);
          const retryResponse = await axios.get(`${BASE_URL.LISTING}${endpoint}`, { headers: { Authorization: `Bearer ${newToken}` } });
          if (retryResponse.status === 200) {
            return retryResponse.data;
          }
        }
      } catch (error) {
      }
    }
    console.error("Error", error);
  }
}
export async function getListingMedia(url) {
  try {
    return await axios.post(`${BASE_URL.LISTING}${url}`, {}, {headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}});
  } catch (error) {
    if (error.response.status === 401) {
      try {
        const newToken = await refreshAccessToken(localStorage.getItem("token"));
        if (newToken && newToken !== null) {
          localStorage.setItem("token", newToken);
          const retryResponse = await axios.post(`${BASE_URL.LISTING}${url}`, {}, {headers: { Authorization: `Bearer ${newToken}`}});
          if (retryResponse.status === 200) {
            return retryResponse.data;
          }
        }
      } catch (error) {
      }
    }
    return error.response;
  }
}

export async function getBlogsData(idDetails, id) {
  try{
    if (idDetails == "category" && id) {
      return await axios.get( `${BASE_URL.BLOGS}/posts?category=${id}`).then((response) => {
        return response.data;
      })
    }
    if (idDetails == "tag" && id) {
      return await axios.get( `${BASE_URL.BLOGS}/posts?tag=${id}`).then((response) => {
        return response.data;
      })
    }
    if (idDetails == "postId" && id) {
      return await axios.get( `${BASE_URL.BLOGS}/posts/${id}`).then((response) => {
        return response.data;
      })
    }
    return await axios.get( `${BASE_URL.BLOGS}/posts`).then((response) => {
        return response.data;
    })
    }
    catch (error) {
      console.error("Error", error);
      return error.response;
    }
  
}

export async function getBlogComments(url) {
  try {
    return await axios.get(`${url}`).then((response) => {
      return response;
    });
  } catch (error) {
    return error.response;
  }
}

export async function searchBlogs(search) {
  try {
    return await axios.get(`${BASE_URL.BLOGS}/posts?search=${search}`).then((response) => {
      return response;
    });
  } catch (error) {
    return error.response;
  }
}

export async function getAllPostsCategoriesTags(endpoint) {
  try {
    return await axios.get(`${BASE_URL.BLOGS}/${endpoint}`).then((response) => {
      return response;
    });
  } catch (error) {
    return error.response;
  }
}

export async function getOfferDetails(endpoint) {
  try {
    return await axios.get(`${BASE_URL.OFFERING}${endpoint}`, {headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}});
  } catch (error) {
    return error.response;
  }
}

export async function socialLogin(loginFrom) {
  try {
    return await axios.get(`${BASE_URL.POLICY}/users/socialLogin/${loginFrom}`).then((response) => {
      console.log("response => ", response);
      if (response.status === 200) {
        return response;        
      } else {
        toast.error(response.data.message);
      }
    });
  } catch (error) {
    toast.error("Failed to login. Please try again.");
    return error.response;
  }
}
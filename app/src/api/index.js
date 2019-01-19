import axios from 'axios';
import {
  HOST
} from '../commons/js/config';
export function getRecommendList (updateTime = null){
  let url = '';
  if (updateTime) {
    url = HOST + `/top/playlist/highquality?before=${updateTime}&limit=30`;
  } else {
    url = HOST + '/top/playlist/highquality?limit=30';
  }
  return axios.get(url);
}
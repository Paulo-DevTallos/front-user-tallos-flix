import { http } from './http';

export default {
  getPeopleByName: (name: string) => {
    return http.get(`peoples/${name}`);
  },
};

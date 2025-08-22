import { getToken, openWindow, router } from 'viy-menu';
import { isArray } from 'lodash-es';

/**
 * overwrite components prop default value globally
 */
export default {
  VueInputLinkColumn: {
    editRender: {
      openWindowMethod: (config) => {
        if (isArray(config)) {
          openWindow(...config);
          return;
        }
        openWindow(config);
      },
      openTabMethod: (config) => {
        router.push(config);
      },
    },
  },
  VueUpload: {
    headers: () => ({ 'X-Auth-Token': getToken()?.accessToken }),
    baseUrl: import.meta.env.VITE_REQUEST_BASE_URL,
  },
  VueTable:{
        rowConfig:{
            rowStatus:true,
            rowStatusInsert:'NEW',
            rowStatusDefault:'NOT-MODIFIED',
            rowStatusRemove:'DELETED',
            rowStatusUpdate:'MODIFIED',
            rowStatusInsertUpdate:'NEW-MODIFIED',
        },
    },
};
